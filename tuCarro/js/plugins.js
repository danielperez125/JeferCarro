(function (window, undefined) {
    ! function (t, e) {
        "object" == typeof exports && "undefined" != typeof module ? e(exports, require("jquery")) : "function" == typeof define && define.amd ? define(["exports", "jquery"], e) : e(t.bootstrap = {}, t.jQuery)
    }(this, function (t, e) {
        "use strict";

        function n(t, e) {
            for (var n = 0; n < e.length; n++) {
                var i = e[n];
                i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
            }
        }

        function i(t, e, i) {
            return e && n(t.prototype, e), i && n(t, i), t
        }

        function r() {
            return (r = Object.assign || function (t) {
                for (var e = 1; e < arguments.length; e++) {
                    var n = arguments[e];
                    for (var i in n) Object.prototype.hasOwnProperty.call(n, i) && (t[i] = n[i])
                }
                return t
            }).apply(this, arguments)
        }

        function B(t) {
            return t && "[object Function]" === {}.toString.call(t)
        }

        function F(t, e) {
            if (1 !== t.nodeType) return [];
            var n = getComputedStyle(t, null);
            return e ? n[e] : n
        }

        function K(t) {
            return "HTML" === t.nodeName ? t : t.parentNode || t.host
        }

        function V(t) {
            if (!t) return document.body;
            switch (t.nodeName) {
                case "HTML":
                case "BODY":
                    return t.ownerDocument.body;
                case "#document":
                    return t.body
            }
            var e = F(t),
                n = e.overflow,
                i = e.overflowX,
                r = e.overflowY;
            return /(auto|scroll)/.test(n + r + i) ? t : V(K(t))
        }

        function Q(t) {
            var e = t && t.offsetParent,
                n = e && e.nodeName;
            return n && "BODY" !== n && "HTML" !== n ? -1 !== ["TD", "TABLE"].indexOf(e.nodeName) && "static" === F(e, "position") ? Q(e) : e : t ? t.ownerDocument.documentElement : document.documentElement
        }

        function Y(t) {
            return null !== t.parentNode ? Y(t.parentNode) : t
        }

        function G(t, e) {
            if (!(t && t.nodeType && e && e.nodeType)) return document.documentElement;
            var n = t.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_FOLLOWING,
                i = n ? t : e,
                r = n ? e : t,
                o = document.createRange();
            o.setStart(i, 0), o.setEnd(r, 0);
            var s, a, l = o.commonAncestorContainer;
            if (t !== l && e !== l || i.contains(r)) return "BODY" === (a = (s = l).nodeName) || "HTML" !== a && Q(s.firstElementChild) !== s ? Q(l) : l;
            var c = Y(t);
            return c.host ? G(c.host, e) : G(t, Y(e).host)
        }

        function q(t) {
            var e = "top" === (arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "top") ? "scrollTop" : "scrollLeft",
                n = t.nodeName;
            if ("BODY" === n || "HTML" === n) {
                var i = t.ownerDocument.documentElement;
                return (t.ownerDocument.scrollingElement || i)[e]
            }
            return t[e]
        }

        function z(t, e) {
            var n = "x" === e ? "Left" : "Top",
                i = "Left" === n ? "Right" : "Bottom";
            return parseFloat(t["border" + n + "Width"], 10) + parseFloat(t["border" + i + "Width"], 10)
        }

        function J(t, e, n, i) {
            return Math.max(e["offset" + t], e["scroll" + t], n["client" + t], n["offset" + t], n["scroll" + t], Z() ? n["offset" + t] + i["margin" + ("Height" === t ? "Top" : "Left")] + i["margin" + ("Height" === t ? "Bottom" : "Right")] : 0)
        }

        function $() {
            var t = document.body,
                e = document.documentElement,
                n = Z() && getComputedStyle(e);
            return {
                height: J("Height", t, e, n),
                width: J("Width", t, e, n)
            }
        }

        function rt(t) {
            return it({}, t, {
                right: t.left + t.width,
                bottom: t.top + t.height
            })
        }

        function ot(t) {
            var e = {};
            if (Z()) try {
                e = t.getBoundingClientRect();
                var n = q(t, "top"),
                    i = q(t, "left");
                e.top += n, e.left += i, e.bottom += n, e.right += i
            } catch (t) { } else e = t.getBoundingClientRect();
            var r = {
                left: e.left,
                top: e.top,
                width: e.right - e.left,
                height: e.bottom - e.top
            },
                o = "HTML" === t.nodeName ? $() : {},
                s = o.width || t.clientWidth || r.right - r.left,
                a = o.height || t.clientHeight || r.bottom - r.top,
                l = t.offsetWidth - s,
                c = t.offsetHeight - a;
            if (l || c) {
                var h = F(t);
                l -= z(h, "x"), c -= z(h, "y"), r.width -= l, r.height -= c
            }
            return rt(r)
        }

        function st(t, e) {
            var n = Z(),
                i = "HTML" === e.nodeName,
                r = ot(t),
                o = ot(e),
                s = V(t),
                a = F(e),
                l = parseFloat(a.borderTopWidth, 10),
                c = parseFloat(a.borderLeftWidth, 10),
                h = rt({
                    top: r.top - o.top - l,
                    left: r.left - o.left - c,
                    width: r.width,
                    height: r.height
                });
            if (h.marginTop = 0, h.marginLeft = 0, !n && i) {
                var f = parseFloat(a.marginTop, 10),
                    u = parseFloat(a.marginLeft, 10);
                h.top -= l - f, h.bottom -= l - f, h.left -= c - u, h.right -= c - u, h.marginTop = f, h.marginLeft = u
            }
            return (n ? e.contains(s) : e === s && "BODY" !== s.nodeName) && (h = function (t, e) {
                var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
                    i = q(e, "top"),
                    r = q(e, "left"),
                    o = n ? -1 : 1;
                return t.top += i * o, t.bottom += i * o, t.left += r * o, t.right += r * o, t
            }(h, e)), h
        }

        function at(t, e, n, i) {
            var r, o, s, a, l, c, h, f = {
                top: 0,
                left: 0
            },
                u = G(t, e);
            if ("viewport" === i) o = (r = u).ownerDocument.documentElement, s = st(r, o), a = Math.max(o.clientWidth, window.innerWidth || 0), l = Math.max(o.clientHeight, window.innerHeight || 0), c = q(o), h = q(o, "left"), f = rt({
                top: c - s.top + s.marginTop,
                left: h - s.left + s.marginLeft,
                width: a,
                height: l
            });
            else {
                var d = void 0;
                "scrollParent" === i ? "BODY" === (d = V(K(e))).nodeName && (d = t.ownerDocument.documentElement) : d = "window" === i ? t.ownerDocument.documentElement : i;
                var p = st(d, u);
                if ("HTML" !== d.nodeName || function t(e) {
                        var n = e.nodeName;
                        return "BODY" !== n && "HTML" !== n && ("fixed" === F(e, "position") || t(K(e)))
                }(u)) f = p;
                else {
                    var g = $(),
                        m = g.height,
                        _ = g.width;
                    f.top += p.top - p.marginTop, f.bottom = m + p.top, f.left += p.left - p.marginLeft, f.right = _ + p.left
                }
            }
            return f.left += n, f.top += n, f.right -= n, f.bottom -= n, f
        }

        function lt(t, e, n, i, r) {
            var o = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : 0;
            if (-1 === t.indexOf("auto")) return t;
            var s = at(n, i, o, r),
                a = {
                    top: {
                        width: s.width,
                        height: e.top - s.top
                    },
                    right: {
                        width: s.right - e.right,
                        height: s.height
                    },
                    bottom: {
                        width: s.width,
                        height: s.bottom - e.bottom
                    },
                    left: {
                        width: e.left - s.left,
                        height: s.height
                    }
                },
                l = Object.keys(a).map(function (t) {
                    return it({
                        key: t
                    }, a[t], {
                        area: (e = a[t], e.width * e.height)
                    });
                    var e
                }).sort(function (t, e) {
                    return e.area - t.area
                }),
                c = l.filter(function (t) {
                    var e = t.width,
                        i = t.height;
                    return e >= n.clientWidth && i >= n.clientHeight
                }),
                h = c.length > 0 ? c[0].key : l[0].key,
                f = t.split("-")[1];
            return h + (f ? "-" + f : "")
        }

        function ct(t, e, n) {
            return st(n, G(e, n))
        }

        function ht(t) {
            var e = getComputedStyle(t),
                n = parseFloat(e.marginTop) + parseFloat(e.marginBottom),
                i = parseFloat(e.marginLeft) + parseFloat(e.marginRight);
            return {
                width: t.offsetWidth + i,
                height: t.offsetHeight + n
            }
        }

        function ft(t) {
            var e = {
                left: "right",
                right: "left",
                bottom: "top",
                top: "bottom"
            };
            return t.replace(/left|right|bottom|top/g, function (t) {
                return e[t]
            })
        }

        function ut(t, e, n) {
            n = n.split("-")[0];
            var i = ht(t),
                r = {
                    width: i.width,
                    height: i.height
                },
                o = -1 !== ["right", "left"].indexOf(n),
                s = o ? "top" : "left",
                a = o ? "left" : "top",
                l = o ? "height" : "width",
                c = o ? "width" : "height";
            return r[s] = e[s] + e[l] / 2 - i[l] / 2, r[a] = n === a ? e[a] - i[c] : e[ft(a)], r
        }

        function dt(t, e) {
            return Array.prototype.find ? t.find(e) : t.filter(e)[0]
        }

        function pt(t, e, n) {
            return (void 0 === n ? t : t.slice(0, function (t, e, n) {
                if (Array.prototype.findIndex) return t.findIndex(function (t) {
                    return t[e] === n
                });
                var i = dt(t, function (t) {
                    return t[e] === n
                });
                return t.indexOf(i)
            }(t, "name", n))).forEach(function (t) {
                t.function && console.warn("`modifier.function` is deprecated, use `modifier.fn`!");
                var n = t.function || t.fn;
                t.enabled && B(n) && (e.offsets.popper = rt(e.offsets.popper), e.offsets.reference = rt(e.offsets.reference), e = n(e, t))
            }), e
        }

        function gt(t, e) {
            return t.some(function (t) {
                var n = t.name;
                return t.enabled && n === e
            })
        }

        function mt(t) {
            for (var e = [!1, "ms", "Webkit", "Moz", "O"], n = t.charAt(0).toUpperCase() + t.slice(1), i = 0; i < e.length - 1; i++) {
                var r = e[i],
                    o = r ? "" + r + n : t;
                if ("undefined" != typeof document.body.style[o]) return o
            }
            return null
        }

        function _t(t) {
            var e = t.ownerDocument;
            return e ? e.defaultView : window
        }

        function vt(t, e, n, i) {
            n.updateBound = i, _t(t).addEventListener("resize", n.updateBound, {
                passive: !0
            });
            var r = V(t);
            return function t(e, n, i, r) {
                var o = "BODY" === e.nodeName,
                    s = o ? e.ownerDocument.defaultView : e;
                s.addEventListener(n, i, {
                    passive: !0
                }), o || t(V(s.parentNode), n, i, r), r.push(s)
            }(r, "scroll", n.updateBound, n.scrollParents), n.scrollElement = r, n.eventsEnabled = !0, n
        }

        function Et() {
            var t, e;
            this.state.eventsEnabled && (cancelAnimationFrame(this.scheduleUpdate), this.state = (t = this.reference, e = this.state, _t(t).removeEventListener("resize", e.updateBound), e.scrollParents.forEach(function (t) {
                t.removeEventListener("scroll", e.updateBound)
            }), e.updateBound = null, e.scrollParents = [], e.scrollElement = null, e.eventsEnabled = !1, e))
        }

        function yt(t) {
            return "" !== t && !isNaN(parseFloat(t)) && isFinite(t)
        }

        function bt(t, e) {
            Object.keys(e).forEach(function (n) {
                var i = ""; -1 !== ["width", "height", "top", "right", "bottom", "left"].indexOf(n) && yt(e[n]) && (i = "px"), t.style[n] = e[n] + i
            })
        }

        function Tt(t, e, n) {
            var i = dt(t, function (t) {
                return t.name === e
            }),
                r = !!i && t.some(function (t) {
                    return t.name === n && t.enabled && t.order < i.order
                });
            if (!r) {
                var o = "`" + e + "`",
                    s = "`" + n + "`";
                console.warn(s + " modifier is required by " + o + " modifier in order to work, be sure to include it before " + o + "!")
            }
            return r
        }

        function It(t) {
            var e = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
                n = wt.indexOf(t),
                i = wt.slice(n + 1).concat(wt.slice(0, n));
            return e ? i.reverse() : i
        }

        function Dt(t, e, n, i) {
            var r = [0, 0],
                o = -1 !== ["right", "left"].indexOf(i),
                s = t.split(/(\+|\-)/).map(function (t) {
                    return t.trim()
                }),
                a = s.indexOf(dt(s, function (t) {
                    return -1 !== t.search(/,|\s/)
                }));
            s[a] && -1 === s[a].indexOf(",") && console.warn("Offsets separated by white space(s) are deprecated, use a comma (,) instead.");
            var l = /\s*,\s*|\s+/,
                c = -1 !== a ? [s.slice(0, a).concat([s[a].split(l)[0]]), [s[a].split(l)[1]].concat(s.slice(a + 1))] : [s];
            return (c = c.map(function (t, i) {
                var r = (1 === i ? !o : o) ? "height" : "width",
                    s = !1;
                return t.reduce(function (t, e) {
                    return "" === t[t.length - 1] && -1 !== ["+", "-"].indexOf(e) ? (t[t.length - 1] = e, s = !0, t) : s ? (t[t.length - 1] += e, s = !1, t) : t.concat(e)
                }, []).map(function (t) {
                    return function (t, e, n, i) {
                        var r = t.match(/((?:\-|\+)?\d*\.?\d*)(.*)/),
                            o = +r[1],
                            s = r[2];
                        if (!o) return t;
                        if (0 === s.indexOf("%")) {
                            var a = void 0;
                            switch (s) {
                                case "%p":
                                    a = n;
                                    break;
                                case "%":
                                case "%r":
                                default:
                                    a = i
                            }
                            return rt(a)[e] / 100 * o
                        }
                        return "vh" === s || "vw" === s ? ("vh" === s ? Math.max(document.documentElement.clientHeight, window.innerHeight || 0) : Math.max(document.documentElement.clientWidth, window.innerWidth || 0)) / 100 * o : o
                    }(t, r, e, n)
                })
            })).forEach(function (t, e) {
                t.forEach(function (n, i) {
                    yt(n) && (r[e] += n * ("-" === t[i - 1] ? -1 : 1))
                })
            }), r
        }
        for (var o, s, a, l, c, h, f, u, d, p, g, m, _, v, E, y, b, T, C, w, I, A, D, S, O, N, k = function (t) {
                function n(e) {
                    var n = this,
                        r = !1;
                    return t(this).one(i.TRANSITION_END, function () {
                        r = !0
        }), setTimeout(function () {
                        r || i.triggerTransitionEnd(n)
        }, e), this
        }
                var e = !1,
                    i = {
            TRANSITION_END: "bsTransitionEnd",
            getUID: function (t) {
                            do t += ~~(1e6 * Math.random()); while (document.getElementById(t));
                            return t
        },
            getSelectorFromElement: function (e) {
                            var n, i = e.getAttribute("data-target");
                            i && "#" !== i || (i = e.getAttribute("href") || ""), "#" === i.charAt(0) && (n = i, i = n = "function" == typeof t.escapeSelector ? t.escapeSelector(n).substr(1) : n.replace(/(:|\.|\[|\]|,|=|@)/g, "\\$1"));
                            try {
                                return t(document).find(i).length > 0 ? i : null
        } catch (t) {
                                return null
        }
        },
            reflow: function (t) {
                            return t.offsetHeight
        },
            triggerTransitionEnd: function (n) {
                            t(n).trigger(e.end)
        },
            supportsTransitionEnd: function () {
                            return Boolean(e)
        },
            isElement: function (t) {
                            return (t[0] || t).nodeType
        },
            typeCheckConfig: function (t, e, n) {
                            for (var r in n)
                                if (Object.prototype.hasOwnProperty.call(n, r)) {
                                    var o = n[r],
                                        s = e[r],
                                        a = s && i.isElement(s) ? "element" : (l = s, {}.toString.call(l).match(/\s([a-zA-Z]+)/)[1].toLowerCase());
                                    if (!new RegExp(o).test(a)) throw new Error(t.toUpperCase() + ': Option "' + r + '" provided type "' + a + '" but expected type "' + o + '".')
        } var l
        }
        };
                return e = ("undefined" == typeof window || !window.QUnit) && {
            end: "transitionend"
        }, t.fn.emulateTransitionEnd = n, i.supportsTransitionEnd() && (t.event.special[i.TRANSITION_END] = {
            bindType: e.end,
            delegateType: e.end,
            handle: function (e) {
                        return t(e.target).is(this) ? e.handleObj.handler.apply(this, arguments) : void 0
        }
        }), i
        }(e = e && e.hasOwnProperty("default") ? e.default : e), L = (s = "alert", l = "." + (a = "bs.alert"), c = (o = e).fn[s], h = {
            CLOSE: "close" + l,
            CLOSED: "closed" + l,
            CLICK_DATA_API: "click" + l + ".data-api"
        }, f = "alert", u = "fade", d = "show", p = function () {
                function t(t) {
                    this._element = t
        }
                var e = t.prototype;
                return e.close = function (t) {
                    t = t || this._element;
                    var e = this._getRootElement(t);
                    this._triggerCloseEvent(e).isDefaultPrevented() || this._removeElement(e)
        }, e.dispose = function () {
                    o.removeData(this._element, a), this._element = null
        }, e._getRootElement = function (t) {
                    var e = k.getSelectorFromElement(t),
                        n = !1;
                    return e && (n = o(e)[0]), n || (n = o(t).closest("." + f)[0]), n
        }, e._triggerCloseEvent = function (t) {
                    var e = o.Event(h.CLOSE);
                    return o(t).trigger(e), e
        }, e._removeElement = function (t) {
                    var e = this;
                    o(t).removeClass(d), k.supportsTransitionEnd() && o(t).hasClass(u) ? o(t).one(k.TRANSITION_END, function (n) {
                        return e._destroyElement(t, n)
        }).emulateTransitionEnd(150) : this._destroyElement(t)
        }, e._destroyElement = function (t) {
                    o(t).detach().trigger(h.CLOSED).remove()
        }, t._jQueryInterface = function (e) {
                    return this.each(function () {
                        var n = o(this),
                            i = n.data(a);
                        i || (i = new t(this), n.data(a, i)), "close" === e && i[e](this)
        })
        }, t._handleDismiss = function (t) {
                    return function (e) {
                        e && e.preventDefault(), t.close(this)
        }
        }, i(t, null, [{
            key: "VERSION",
            get: function () {
                        return "4.0.0"
        }
        }]), t
        }(), o(document).on(h.CLICK_DATA_API, '[data-dismiss="alert"]', p._handleDismiss(new p)), o.fn[s] = p._jQueryInterface, o.fn[s].Constructor = p, o.fn[s].noConflict = function () {
                return o.fn[s] = c, p._jQueryInterface
        }, p), P = (m = "button", v = "." + (_ = "bs.button"), E = ".data-api", y = (g = e).fn[m], b = "active", T = "btn", C = "focus", w = '[data-toggle^="button"]', I = '[data-toggle="buttons"]', A = "input", D = ".active", S = ".btn", O = {
            CLICK_DATA_API: "click" + v + E,
            FOCUS_BLUR_DATA_API: "focus" + v + E + " blur" + v + E
        }, N = function () {
                function t(t) {
                    this._element = t
        }
                var e = t.prototype;
                return e.toggle = function () {
                    var t = !0,
                        e = !0,
                        n = g(this._element).closest(I)[0];
                    if (n) {
                        var i = g(this._element).find(A)[0];
                        if (i) {
                            if ("radio" === i.type)
                                if (i.checked && g(this._element).hasClass(b)) t = !1;
        else {
                                    var r = g(n).find(D)[0];
                                    r && g(r).removeClass(b)
        } if (t) {
                                if (i.hasAttribute("disabled") || n.hasAttribute("disabled") || i.classList.contains("disabled") || n.classList.contains("disabled")) return;
                                i.checked = !g(this._element).hasClass(b), g(i).trigger("change")
        }
                            i.focus(), e = !1
        }
        }
                    e && this._element.setAttribute("aria-pressed", !g(this._element).hasClass(b)), t && g(this._element).toggleClass(b)
        }, e.dispose = function () {
                    g.removeData(this._element, _), this._element = null
        }, t._jQueryInterface = function (e) {
                    return this.each(function () {
                        var n = g(this).data(_);
                        n || (n = new t(this), g(this).data(_, n)), "toggle" === e && n[e]()
        })
        }, i(t, null, [{
            key: "VERSION",
            get: function () {
                        return "4.0.0"
        }
        }]), t
        }(), g(document).on(O.CLICK_DATA_API, w, function (t) {
                t.preventDefault();
                var e = t.target;
                g(e).hasClass(T) || (e = g(e).closest(S)), N._jQueryInterface.call(g(e), "toggle")
        }).on(O.FOCUS_BLUR_DATA_API, w, function (t) {
                var e = g(t.target).closest(S)[0];
                g(e).toggleClass(C, /^focus(in)?$/.test(t.type))
        }), g.fn[m] = N._jQueryInterface, g.fn[m].Constructor = N, g.fn[m].noConflict = function () {
                return g.fn[m] = y, N._jQueryInterface
        }, N), x = (function (t) {
                var e = "carousel",
                    n = "bs.carousel",
                    o = "." + n,
                    s = t.fn[e],
                    a = {
            interval: 5e3,
            keyboard: !0,
            slide: !1,
            pause: "hover",
            wrap: !0
        },
                    l = {
            interval: "(number|boolean)",
            keyboard: "boolean",
            slide: "(boolean|string)",
            pause: "(string|boolean)",
            wrap: "boolean"
        },
                    c = "next",
                    h = "prev",
                    f = "left",
                    u = "right",
                    d = {
            SLIDE: "slide" + o,
            SLID: "slid" + o,
            KEYDOWN: "keydown" + o,
            MOUSEENTER: "mouseenter" + o,
            MOUSELEAVE: "mouseleave" + o,
            TOUCHEND: "touchend" + o,
            LOAD_DATA_API: "load" + o + ".data-api",
            CLICK_DATA_API: "click" + o + ".data-api"
        },
                    p = "carousel",
                    g = "active",
                    m = "slide",
                    _ = "carousel-item-right",
                    v = "carousel-item-left",
                    E = "carousel-item-next",
                    y = "carousel-item-prev",
                    b = {
            ACTIVE: ".active",
            ACTIVE_ITEM: ".active.carousel-item",
            ITEM: ".carousel-item",
            NEXT_PREV: ".carousel-item-next, .carousel-item-prev",
            INDICATORS: ".carousel-indicators",
            DATA_SLIDE: "[data-slide], [data-slide-to]",
            DATA_RIDE: '[data-ride="carousel"]'
        },
                    T = function () {
                        function s(e, n) {
                            this._items = null, this._interval = null, this._activeElement = null, this._isPaused = !1, this._isSliding = !1, this.touchTimeout = null, this._config = this._getConfig(n), this._element = t(e)[0], this._indicatorsElement = t(this._element).find(b.INDICATORS)[0], this._addEventListeners()
        }
                        var T = s.prototype;
                        return T.next = function () {
                            this._isSliding || this._slide(c)
        }, T.nextWhenVisible = function () {
                            !document.hidden && t(this._element).is(":visible") && "hidden" !== t(this._element).css("visibility") && this.next()
        }, T.prev = function () {
                            this._isSliding || this._slide(h)
        }, T.pause = function (e) {
                            e || (this._isPaused = !0), t(this._element).find(b.NEXT_PREV)[0] && k.supportsTransitionEnd() && (k.triggerTransitionEnd(this._element), this.cycle(!0)), clearInterval(this._interval), this._interval = null
        }, T.cycle = function (t) {
                            t || (this._isPaused = !1), this._interval && (clearInterval(this._interval), this._interval = null), this._config.interval && !this._isPaused && (this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval))
        }, T.to = function (e) {
                            var n = this;
                            this._activeElement = t(this._element).find(b.ACTIVE_ITEM)[0];
                            var i = this._getItemIndex(this._activeElement);
                            if (!(e > this._items.length - 1 || 0 > e))
                                if (this._isSliding) t(this._element).one(d.SLID, function () {
                                    return n.to(e)
        });
        else {
                                    if (i === e) return this.pause(), void this.cycle();
                                    var r = e > i ? c : h;
                                    this._slide(r, this._items[e])
        }
        }, T.dispose = function () {
                            t(this._element).off(o), t.removeData(this._element, n), this._items = null, this._config = null, this._element = null, this._interval = null, this._isPaused = null, this._isSliding = null, this._activeElement = null, this._indicatorsElement = null
        }, T._getConfig = function (t) {
                            return t = r({}, a, t), k.typeCheckConfig(e, t, l), t
        }, T._addEventListeners = function () {
                            var e = this;
                            this._config.keyboard && t(this._element).on(d.KEYDOWN, function (t) {
                                return e._keydown(t)
        }), "hover" === this._config.pause && (t(this._element).on(d.MOUSEENTER, function (t) {
                                return e.pause(t)
        }).on(d.MOUSELEAVE, function (t) {
                                return e.cycle(t)
        }), "ontouchstart" in document.documentElement && t(this._element).on(d.TOUCHEND, function () {
                                e.pause(), e.touchTimeout && clearTimeout(e.touchTimeout), e.touchTimeout = setTimeout(function (t) {
                                    return e.cycle(t)
        }, 500 + e._config.interval)
        }))
        }, T._keydown = function (t) {
                            if (!/input|textarea/i.test(t.target.tagName)) switch (t.which) {
                                case 37:
                                    t.preventDefault(), this.prev();
                                    break;
                                case 39:
                                    t.preventDefault(), this.next()
        }
        }, T._getItemIndex = function (e) {
                            return this._items = t.makeArray(t(e).parent().find(b.ITEM)), this._items.indexOf(e)
        }, T._getItemByDirection = function (t, e) {
                            var n = t === c,
                                i = t === h,
                                r = this._getItemIndex(e),
                                o = this._items.length - 1;
                            if ((i && 0 === r || n && r === o) && !this._config.wrap) return e;
                            var s = (r + (t === h ? -1 : 1)) % this._items.length;
                            return -1 === s ? this._items[this._items.length - 1] : this._items[s]
        }, T._triggerSlideEvent = function (e, n) {
                            var i = this._getItemIndex(e),
                                r = this._getItemIndex(t(this._element).find(b.ACTIVE_ITEM)[0]),
                                o = t.Event(d.SLIDE, {
            relatedTarget: e,
            direction: n,
            from: r,
            to: i
        });
                            return t(this._element).trigger(o), o
        }, T._setActiveIndicatorElement = function (e) {
                            if (this._indicatorsElement) {
                                t(this._indicatorsElement).find(b.ACTIVE).removeClass(g);
                                var n = this._indicatorsElement.children[this._getItemIndex(e)];
                                n && t(n).addClass(g)
        }
        }, T._slide = function (e, n) {
                            var i, r, o, s = this,
                                a = t(this._element).find(b.ACTIVE_ITEM)[0],
                                l = this._getItemIndex(a),
                                h = n || a && this._getItemByDirection(e, a),
                                p = this._getItemIndex(h),
                                T = Boolean(this._interval);
                            if (e === c ? (i = v, r = E, o = f) : (i = _, r = y, o = u), h && t(h).hasClass(g)) this._isSliding = !1;
        else if (!this._triggerSlideEvent(h, o).isDefaultPrevented() && a && h) {
                                this._isSliding = !0, T && this.pause(), this._setActiveIndicatorElement(h);
                                var C = t.Event(d.SLID, {
            relatedTarget: h,
            direction: o,
            from: l,
            to: p
        });
                                k.supportsTransitionEnd() && t(this._element).hasClass(m) ? (t(h).addClass(r), k.reflow(h), t(a).addClass(i), t(h).addClass(i), t(a).one(k.TRANSITION_END, function () {
                                    t(h).removeClass(i + " " + r).addClass(g), t(a).removeClass(g + " " + r + " " + i), s._isSliding = !1, setTimeout(function () {
                                        return t(s._element).trigger(C)
        }, 0)
        }).emulateTransitionEnd(600)) : (t(a).removeClass(g), t(h).addClass(g), this._isSliding = !1, t(this._element).trigger(C)), T && this.cycle()
        }
        }, s._jQueryInterface = function (e) {
                            return this.each(function () {
                                var i = t(this).data(n),
                                    o = r({}, a, t(this).data());
                                "object" == typeof e && (o = r({}, o, e));
                                var l = "string" == typeof e ? e : o.slide;
                                if (i || (i = new s(this, o), t(this).data(n, i)), "number" == typeof e) i.to(e);
        else if ("string" == typeof l) {
                                    if ("undefined" == typeof i[l]) throw new TypeError('No method named "' + l + '"');
                                    i[l]()
        } else o.interval && (i.pause(), i.cycle())
        })
        }, s._dataApiClickHandler = function (e) {
                            var i = k.getSelectorFromElement(this);
                            if (i) {
                                var o = t(i)[0];
                                if (o && t(o).hasClass(p)) {
                                    var a = r({}, t(o).data(), t(this).data()),
                                        l = this.getAttribute("data-slide-to");
                                    l && (a.interval = !1), s._jQueryInterface.call(t(o), a), l && t(o).data(n).to(l), e.preventDefault()
        }
        }
        }, i(s, null, [{
            key: "VERSION",
            get: function () {
                                return "4.0.0"
        }
        }, {
            key: "Default",
            get: function () {
                                return a
        }
        }]), s
        }();
                return t(document).on(d.CLICK_DATA_API, b.DATA_SLIDE, T._dataApiClickHandler), t(window).on(d.LOAD_DATA_API, function () {
                    t(b.DATA_RIDE).each(function () {
                        var e = t(this);
                        T._jQueryInterface.call(e, e.data())
        })
        }), t.fn[e] = T._jQueryInterface, t.fn[e].Constructor = T, t.fn[e].noConflict = function () {
                    return t.fn[e] = s, T._jQueryInterface
        }, T
        }(e)), R = function (t) {
                var e = "collapse",
                    n = "bs.collapse",
                    o = "." + n,
                    s = t.fn[e],
                    a = {
            toggle: !0,
            parent: ""
        },
                    l = {
            toggle: "boolean",
            parent: "(string|element)"
        },
                    c = {
            SHOW: "show" + o,
            SHOWN: "shown" + o,
            HIDE: "hide" + o,
            HIDDEN: "hidden" + o,
            CLICK_DATA_API: "click" + o + ".data-api"
        },
                    h = "show",
                    f = "collapse",
                    u = "collapsing",
                    d = "collapsed",
                    p = "width",
                    g = "height",
                    m = {
            ACTIVES: ".show, .collapsing",
            DATA_TOGGLE: '[data-toggle="collapse"]'
        },
                    _ = function () {
                        function o(e, n) {
                            this._isTransitioning = !1, this._element = e, this._config = this._getConfig(n), this._triggerArray = t.makeArray(t('[data-toggle="collapse"][href="#' + e.id + '"],[data-toggle="collapse"][data-target="#' + e.id + '"]'));
                            for (var i = t(m.DATA_TOGGLE), r = 0; r < i.length; r++) {
                                var o = i[r],
                                    s = k.getSelectorFromElement(o);
                                null !== s && t(s).filter(e).length > 0 && (this._selector = s, this._triggerArray.push(o))
        }
                            this._parent = this._config.parent ? this._getParent() : null, this._config.parent || this._addAriaAndCollapsedClass(this._element, this._triggerArray), this._config.toggle && this.toggle()
        }
                        var s = o.prototype;
                        return s.toggle = function () {
                            t(this._element).hasClass(h) ? this.hide() : this.show()
        }, s.show = function () {
                            var e, i, r = this;
                            if (!(this._isTransitioning || t(this._element).hasClass(h) || (this._parent && 0 === (e = t.makeArray(t(this._parent).find(m.ACTIVES).filter('[data-parent="' + this._config.parent + '"]'))).length && (e = null), e && (i = t(e).not(this._selector).data(n)) && i._isTransitioning))) {
                                var s = t.Event(c.SHOW);
                                if (t(this._element).trigger(s), !s.isDefaultPrevented()) {
                                    e && (o._jQueryInterface.call(t(e).not(this._selector), "hide"), i || t(e).data(n, null));
                                    var a = this._getDimension();
                                    t(this._element).removeClass(f).addClass(u), this._element.style[a] = 0, this._triggerArray.length > 0 && t(this._triggerArray).removeClass(d).attr("aria-expanded", !0), this.setTransitioning(!0);
                                    var l = function () {
                                        t(r._element).removeClass(u).addClass(f).addClass(h), r._element.style[a] = "", r.setTransitioning(!1), t(r._element).trigger(c.SHOWN)
        };
                                    if (k.supportsTransitionEnd()) {
                                        var p = "scroll" + (a[0].toUpperCase() + a.slice(1));
                                        t(this._element).one(k.TRANSITION_END, l).emulateTransitionEnd(600), this._element.style[a] = this._element[p] + "px"
        } else l()
        }
        }
        }, s.hide = function () {
                            var e = this;
                            if (!this._isTransitioning && t(this._element).hasClass(h)) {
                                var n = t.Event(c.HIDE);
                                if (t(this._element).trigger(n), !n.isDefaultPrevented()) {
                                    var i = this._getDimension();
                                    if (this._element.style[i] = this._element.getBoundingClientRect()[i] + "px", k.reflow(this._element), t(this._element).addClass(u).removeClass(f).removeClass(h), this._triggerArray.length > 0)
                                        for (var r = 0; r < this._triggerArray.length; r++) {
                                            var o = this._triggerArray[r],
                                                s = k.getSelectorFromElement(o);
                                            null !== s && (t(s).hasClass(h) || t(o).addClass(d).attr("aria-expanded", !1))
        }
                                    this.setTransitioning(!0);
                                    var a = function () {
                                        e.setTransitioning(!1), t(e._element).removeClass(u).addClass(f).trigger(c.HIDDEN)
        };
                                    this._element.style[i] = "", k.supportsTransitionEnd() ? t(this._element).one(k.TRANSITION_END, a).emulateTransitionEnd(600) : a()
        }
        }
        }, s.setTransitioning = function (t) {
                            this._isTransitioning = t
        }, s.dispose = function () {
                            t.removeData(this._element, n), this._config = null, this._parent = null, this._element = null, this._triggerArray = null, this._isTransitioning = null
        }, s._getConfig = function (t) {
                            return (t = r({}, a, t)).toggle = Boolean(t.toggle), k.typeCheckConfig(e, t, l), t
        }, s._getDimension = function () {
                            return t(this._element).hasClass(p) ? p : g
        }, s._getParent = function () {
                            var e = this,
                                n = null;
                            k.isElement(this._config.parent) ? (n = this._config.parent, "undefined" != typeof this._config.parent.jquery && (n = this._config.parent[0])) : n = t(this._config.parent)[0];
                            var i = '[data-toggle="collapse"][data-parent="' + this._config.parent + '"]';
                            return t(n).find(i).each(function (t, n) {
                                e._addAriaAndCollapsedClass(o._getTargetFromElement(n), [n])
        }), n
        }, s._addAriaAndCollapsedClass = function (e, n) {
                            if (e) {
                                var i = t(e).hasClass(h);
                                n.length > 0 && t(n).toggleClass(d, !i).attr("aria-expanded", i)
        }
        }, o._getTargetFromElement = function (e) {
                            var n = k.getSelectorFromElement(e);
                            return n ? t(n)[0] : null
        }, o._jQueryInterface = function (e) {
                            return this.each(function () {
                                var i = t(this),
                                    s = i.data(n),
                                    l = r({}, a, i.data(), "object" == typeof e && e);
                                if (!s && l.toggle && /show|hide/.test(e) && (l.toggle = !1), s || (s = new o(this, l), i.data(n, s)), "string" == typeof e) {
                                    if ("undefined" == typeof s[e]) throw new TypeError('No method named "' + e + '"');
                                    s[e]()
        }
        })
        }, i(o, null, [{
            key: "VERSION",
            get: function () {
                                return "4.0.0"
        }
        }, {
            key: "Default",
            get: function () {
                                return a
        }
        }]), o
        }();
                return t(document).on(c.CLICK_DATA_API, m.DATA_TOGGLE, function (e) {
                    "A" === e.currentTarget.tagName && e.preventDefault();
                    var i = t(this),
                        r = k.getSelectorFromElement(this);
                    t(r).each(function () {
                        var e = t(this),
                            r = e.data(n) ? "toggle" : i.data();
                        _._jQueryInterface.call(e, r)
        })
        }), t.fn[e] = _._jQueryInterface, t.fn[e].Constructor = _, t.fn[e].noConflict = function () {
                    return t.fn[e] = s, _._jQueryInterface
        }, _
        }(e), j = "undefined" != typeof window && "undefined" != typeof document, H = ["Edge", "Trident", "Firefox"], M = 0, W = 0; W < H.length; W += 1)
            if (j && navigator.userAgent.indexOf(H[W]) >= 0) {
                M = 1;
                break
            } var U = j && window.Promise ? function (t) {
                var e = !1;
                return function () {
                    e || (e = !0, window.Promise.resolve().then(function () {
                        e = !1, t()
                    }))
                }
            } : function (t) {
                var e = !1;
                return function () {
                    e || (e = !0, setTimeout(function () {
                        e = !1, t()
                    }, M))
                }
            },
            X = void 0,
            Z = function () {
                return void 0 === X && (X = -1 !== navigator.appVersion.indexOf("MSIE 10")), X
            },
            tt = function (t, e) {
                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
            },
            et = function () {
                function t(t, e) {
                    for (var n = 0; n < e.length; n++) {
                        var i = e[n];
                        i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
                    }
                }
                return function (e, n, i) {
                    return n && t(e.prototype, n), i && t(e, i), e
                }
            }(),
            nt = function (t, e, n) {
                return e in t ? Object.defineProperty(t, e, {
                    value: n,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : t[e] = n, t
            },
            it = Object.assign || function (t) {
                for (var e = 1; e < arguments.length; e++) {
                    var n = arguments[e];
                    for (var i in n) Object.prototype.hasOwnProperty.call(n, i) && (t[i] = n[i])
                }
                return t
            },
            Ct = ["auto-start", "auto", "auto-end", "top-start", "top", "top-end", "right-start", "right", "right-end", "bottom-end", "bottom", "bottom-start", "left-end", "left", "left-start"],
            wt = Ct.slice(3),
            At = {
                FLIP: "flip",
                CLOCKWISE: "clockwise",
                COUNTERCLOCKWISE: "counterclockwise"
            },
            St = {
                placement: "bottom",
                eventsEnabled: !0,
                removeOnDestroy: !1,
                onCreate: function () { },
                onUpdate: function () { },
                modifiers: {
                    shift: {
                        order: 100,
                        enabled: !0,
                        fn: function (t) {
                            var e = t.placement,
                                n = e.split("-")[0],
                                i = e.split("-")[1];
                            if (i) {
                                var r = t.offsets,
                                    o = r.reference,
                                    s = r.popper,
                                    a = -1 !== ["bottom", "top"].indexOf(n),
                                    l = a ? "left" : "top",
                                    c = a ? "width" : "height",
                                    h = {
                                        start: nt({}, l, o[l]),
                                        end: nt({}, l, o[l] + o[c] - s[c])
                                    };
                                t.offsets.popper = it({}, s, h[i])
                            }
                            return t
                        }
                    },
                    offset: {
                        order: 200,
                        enabled: !0,
                        fn: function (t, e) {
                            var n = e.offset,
                                i = t.placement,
                                r = t.offsets,
                                o = r.popper,
                                s = r.reference,
                                a = i.split("-")[0],
                                l = void 0;
                            return l = yt(+n) ? [+n, 0] : Dt(n, o, s, a), "left" === a ? (o.top += l[0], o.left -= l[1]) : "right" === a ? (o.top += l[0], o.left += l[1]) : "top" === a ? (o.left += l[0], o.top -= l[1]) : "bottom" === a && (o.left += l[0], o.top += l[1]), t.popper = o, t
                        },
                        offset: 0
                    },
                    preventOverflow: {
                        order: 300,
                        enabled: !0,
                        fn: function (t, e) {
                            var n = e.boundariesElement || Q(t.instance.popper);
                            t.instance.reference === n && (n = Q(n));
                            var i = at(t.instance.popper, t.instance.reference, e.padding, n);
                            e.boundaries = i;
                            var r = e.priority,
                                o = t.offsets.popper,
                                s = {
                                    primary: function (t) {
                                        var n = o[t];
                                        return o[t] < i[t] && !e.escapeWithReference && (n = Math.max(o[t], i[t])), nt({}, t, n)
                                    },
                                    secondary: function (t) {
                                        var n = "right" === t ? "left" : "top",
                                            r = o[n];
                                        return o[t] > i[t] && !e.escapeWithReference && (r = Math.min(o[n], i[t] - ("right" === t ? o.width : o.height))), nt({}, n, r)
                                    }
                                };
                            return r.forEach(function (t) {
                                var e = -1 !== ["left", "top"].indexOf(t) ? "primary" : "secondary";
                                o = it({}, o, s[e](t))
                            }), t.offsets.popper = o, t
                        },
                        priority: ["left", "right", "top", "bottom"],
                        padding: 5,
                        boundariesElement: "scrollParent"
                    },
                    keepTogether: {
                        order: 400,
                        enabled: !0,
                        fn: function (t) {
                            var e = t.offsets,
                                n = e.popper,
                                i = e.reference,
                                r = t.placement.split("-")[0],
                                o = Math.floor,
                                s = -1 !== ["top", "bottom"].indexOf(r),
                                a = s ? "right" : "bottom",
                                l = s ? "left" : "top",
                                c = s ? "width" : "height";
                            return n[a] < o(i[l]) && (t.offsets.popper[l] = o(i[l]) - n[c]), n[l] > o(i[a]) && (t.offsets.popper[l] = o(i[a])), t
                        }
                    },
                    arrow: {
                        order: 500,
                        enabled: !0,
                        fn: function (t, e) {
                            var n;
                            if (!Tt(t.instance.modifiers, "arrow", "keepTogether")) return t;
                            var i = e.element;
                            if ("string" == typeof i) {
                                if (!(i = t.instance.popper.querySelector(i))) return t
                            } else if (!t.instance.popper.contains(i)) return console.warn("WARNING: `arrow.element` must be child of its popper element!"), t;
                            var r = t.placement.split("-")[0],
                                o = t.offsets,
                                s = o.popper,
                                a = o.reference,
                                l = -1 !== ["left", "right"].indexOf(r),
                                c = l ? "height" : "width",
                                h = l ? "Top" : "Left",
                                f = h.toLowerCase(),
                                u = l ? "left" : "top",
                                d = l ? "bottom" : "right",
                                p = ht(i)[c];
                            a[d] - p < s[f] && (t.offsets.popper[f] -= s[f] - (a[d] - p)), a[f] + p > s[d] && (t.offsets.popper[f] += a[f] + p - s[d]), t.offsets.popper = rt(t.offsets.popper);
                            var g = a[f] + a[c] / 2 - p / 2,
                                m = F(t.instance.popper),
                                _ = parseFloat(m["margin" + h], 10),
                                v = parseFloat(m["border" + h + "Width"], 10),
                                E = g - t.offsets.popper[f] - _ - v;
                            return E = Math.max(Math.min(s[c] - p, E), 0), t.arrowElement = i, t.offsets.arrow = (nt(n = {}, f, Math.round(E)), nt(n, u, ""), n), t
                        },
                        element: "[x-arrow]"
                    },
                    flip: {
                        order: 600,
                        enabled: !0,
                        fn: function (t, e) {
                            if (gt(t.instance.modifiers, "inner")) return t;
                            if (t.flipped && t.placement === t.originalPlacement) return t;
                            var n = at(t.instance.popper, t.instance.reference, e.padding, e.boundariesElement),
                                i = t.placement.split("-")[0],
                                r = ft(i),
                                o = t.placement.split("-")[1] || "",
                                s = [];
                            switch (e.behavior) {
                                case At.FLIP:
                                    s = [i, r];
                                    break;
                                case At.CLOCKWISE:
                                    s = It(i);
                                    break;
                                case At.COUNTERCLOCKWISE:
                                    s = It(i, !0);
                                    break;
                                default:
                                    s = e.behavior
                            }
                            return s.forEach(function (a, l) {
                                if (i !== a || s.length === l + 1) return t;
                                i = t.placement.split("-")[0], r = ft(i);
                                var c, h = t.offsets.popper,
                                    f = t.offsets.reference,
                                    u = Math.floor,
                                    d = "left" === i && u(h.right) > u(f.left) || "right" === i && u(h.left) < u(f.right) || "top" === i && u(h.bottom) > u(f.top) || "bottom" === i && u(h.top) < u(f.bottom),
                                    p = u(h.left) < u(n.left),
                                    g = u(h.right) > u(n.right),
                                    m = u(h.top) < u(n.top),
                                    _ = u(h.bottom) > u(n.bottom),
                                    v = "left" === i && p || "right" === i && g || "top" === i && m || "bottom" === i && _,
                                    E = -1 !== ["top", "bottom"].indexOf(i),
                                    y = !!e.flipVariations && (E && "start" === o && p || E && "end" === o && g || !E && "start" === o && m || !E && "end" === o && _);
                                (d || v || y) && (t.flipped = !0, (d || v) && (i = s[l + 1]), y && (o = "end" === (c = o) ? "start" : "start" === c ? "end" : c), t.placement = i + (o ? "-" + o : ""), t.offsets.popper = it({}, t.offsets.popper, ut(t.instance.popper, t.offsets.reference, t.placement)), t = pt(t.instance.modifiers, t, "flip"))
                            }), t
                        },
                        behavior: "flip",
                        padding: 5,
                        boundariesElement: "viewport"
                    },
                    inner: {
                        order: 700,
                        enabled: !1,
                        fn: function (t) {
                            var e = t.placement,
                                n = e.split("-")[0],
                                i = t.offsets,
                                r = i.popper,
                                o = i.reference,
                                s = -1 !== ["left", "right"].indexOf(n),
                                a = -1 === ["top", "left"].indexOf(n);
                            return r[s ? "left" : "top"] = o[n] - (a ? r[s ? "width" : "height"] : 0), t.placement = ft(e), t.offsets.popper = rt(r), t
                        }
                    },
                    hide: {
                        order: 800,
                        enabled: !0,
                        fn: function (t) {
                            if (!Tt(t.instance.modifiers, "hide", "preventOverflow")) return t;
                            var e = t.offsets.reference,
                                n = dt(t.instance.modifiers, function (t) {
                                    return "preventOverflow" === t.name
                                }).boundaries;
                            if (e.bottom < n.top || e.left > n.right || e.top > n.bottom || e.right < n.left) {
                                if (!0 === t.hide) return t;
                                t.hide = !0, t.attributes["x-out-of-boundaries"] = ""
                            } else {
                                if (!1 === t.hide) return t;
                                t.hide = !1, t.attributes["x-out-of-boundaries"] = !1
                            }
                            return t
                        }
                    },
                    computeStyle: {
                        order: 850,
                        enabled: !0,
                        fn: function (t, e) {
                            var n = e.x,
                                i = e.y,
                                r = t.offsets.popper,
                                o = dt(t.instance.modifiers, function (t) {
                                    return "applyStyle" === t.name
                                }).gpuAcceleration;
                            void 0 !== o && console.warn("WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!");
                            var s = void 0 !== o ? o : e.gpuAcceleration,
                                a = ot(Q(t.instance.popper)),
                                l = {
                                    position: r.position
                                },
                                c = {
                                    left: Math.floor(r.left),
                                    top: Math.floor(r.top),
                                    bottom: Math.floor(r.bottom),
                                    right: Math.floor(r.right)
                                },
                                h = "bottom" === n ? "top" : "bottom",
                                f = "right" === i ? "left" : "right",
                                u = mt("transform"),
                                d = void 0,
                                p = void 0;
                            if (p = "bottom" === h ? -a.height + c.bottom : c.top, d = "right" === f ? -a.width + c.right : c.left, s && u) l[u] = "translate3d(" + d + "px, " + p + "px, 0)", l[h] = 0, l[f] = 0, l.willChange = "transform";
                            else {
                                var g = "bottom" === h ? -1 : 1,
                                    m = "right" === f ? -1 : 1;
                                l[h] = p * g, l[f] = d * m, l.willChange = h + ", " + f
                            }
                            var _ = {
                                "x-placement": t.placement
                            };
                            return t.attributes = it({}, _, t.attributes), t.styles = it({}, l, t.styles), t.arrowStyles = it({}, t.offsets.arrow, t.arrowStyles), t
                        },
                        gpuAcceleration: !0,
                        x: "bottom",
                        y: "right"
                    },
                    applyStyle: {
                        order: 900,
                        enabled: !0,
                        fn: function (t) {
                            var e, n;
                            return bt(t.instance.popper, t.styles), e = t.instance.popper, n = t.attributes, Object.keys(n).forEach(function (t) {
                                !1 !== n[t] ? e.setAttribute(t, n[t]) : e.removeAttribute(t)
                            }), t.arrowElement && Object.keys(t.arrowStyles).length && bt(t.arrowElement, t.arrowStyles), t
                        },
                        onLoad: function (t, e, n) {
                            var o = ct(0, e, t),
                                s = lt(n.placement, o, e, t, n.modifiers.flip.boundariesElement, n.modifiers.flip.padding);
                            return e.setAttribute("x-placement", s), bt(e, {
                                position: "absolute"
                            }), n
                        },
                        gpuAcceleration: void 0
                    }
                }
            },
            Ot = function () {
                function t(e, n) {
                    var i = this,
                        r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                    tt(this, t), this.scheduleUpdate = function () {
                        return requestAnimationFrame(i.update)
                    }, this.update = U(this.update.bind(this)), this.options = it({}, t.Defaults, r), this.state = {
                        isDestroyed: !1,
                        isCreated: !1,
                        scrollParents: []
                    }, this.reference = e && e.jquery ? e[0] : e, this.popper = n && n.jquery ? n[0] : n, this.options.modifiers = {}, Object.keys(it({}, t.Defaults.modifiers, r.modifiers)).forEach(function (e) {
                        i.options.modifiers[e] = it({}, t.Defaults.modifiers[e] || {}, r.modifiers ? r.modifiers[e] : {})
                    }), this.modifiers = Object.keys(this.options.modifiers).map(function (t) {
                        return it({
                            name: t
                        }, i.options.modifiers[t])
                    }).sort(function (t, e) {
                        return t.order - e.order
                    }), this.modifiers.forEach(function (t) {
                        t.enabled && B(t.onLoad) && t.onLoad(i.reference, i.popper, i.options, t, i.state)
                    }), this.update();
                    var o = this.options.eventsEnabled;
                    o && this.enableEventListeners(), this.state.eventsEnabled = o
                }
                return et(t, [{
                    key: "update",
                    value: function () {
                        return function () {
                            if (!this.state.isDestroyed) {
                                var t = {
                                    instance: this,
                                    styles: {},
                                    arrowStyles: {},
                                    attributes: {},
                                    flipped: !1,
                                    offsets: {}
                                };
                                t.offsets.reference = ct(this.state, this.popper, this.reference), t.placement = lt(this.options.placement, t.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding), t.originalPlacement = t.placement, t.offsets.popper = ut(this.popper, t.offsets.reference, t.placement), t.offsets.popper.position = "absolute", t = pt(this.modifiers, t), this.state.isCreated ? this.options.onUpdate(t) : (this.state.isCreated = !0, this.options.onCreate(t))
                            }
                        }.call(this)
                    }
                }, {
                    key: "destroy",
                    value: function () {
                        return function () {
                            return this.state.isDestroyed = !0, gt(this.modifiers, "applyStyle") && (this.popper.removeAttribute("x-placement"), this.popper.style.left = "", this.popper.style.position = "", this.popper.style.top = "", this.popper.style[mt("transform")] = ""), this.disableEventListeners(), this.options.removeOnDestroy && this.popper.parentNode.removeChild(this.popper), this
                        }.call(this)
                    }
                }, {
                    key: "enableEventListeners",
                    value: function () {
                        return function () {
                            this.state.eventsEnabled || (this.state = vt(this.reference, this.options, this.state, this.scheduleUpdate))
                        }.call(this)
                    }
                }, {
                    key: "disableEventListeners",
                    value: function () {
                        return Et.call(this)
                    }
                }]), t
            }();
        Ot.Utils = ("undefined" != typeof window ? window : global).PopperUtils, Ot.placements = Ct, Ot.Defaults = St;
        var Nt = function (t) {
            var e = "dropdown",
                n = "bs.dropdown",
                o = "." + n,
                s = t.fn[e],
                a = new RegExp("38|40|27"),
                l = {
                    HIDE: "hide" + o,
                    HIDDEN: "hidden" + o,
                    SHOW: "show" + o,
                    SHOWN: "shown" + o,
                    CLICK: "click" + o,
                    CLICK_DATA_API: "click" + o + ".data-api",
                    KEYDOWN_DATA_API: "keydown" + o + ".data-api",
                    KEYUP_DATA_API: "keyup" + o + ".data-api"
                },
                c = "disabled",
                h = "show",
                f = "dropup",
                u = "dropright",
                d = "dropleft",
                p = "dropdown-menu-right",
                g = "dropdown-menu-left",
                m = "position-static",
                _ = '[data-toggle="dropdown"]',
                v = ".dropdown form",
                E = ".dropdown-menu",
                y = ".navbar-nav",
                b = ".dropdown-menu .dropdown-item:not(.disabled)",
                T = "top-start",
                C = "top-end",
                w = "bottom-start",
                I = "bottom-end",
                A = "right-start",
                D = "left-start",
                S = {
                    offset: 0,
                    flip: !0,
                    boundary: "scrollParent"
                },
                O = {
                    offset: "(number|string|function)",
                    flip: "boolean",
                    boundary: "(string|element)"
                },
                N = function () {
                    function s(t, e) {
                        this._element = t, this._popper = null, this._config = this._getConfig(e), this._menu = this._getMenuElement(), this._inNavbar = this._detectNavbar(), this._addEventListeners()
                    }
                    var v = s.prototype;
                    return v.toggle = function () {
                        if (!this._element.disabled && !t(this._element).hasClass(c)) {
                            var e = s._getParentFromElement(this._element),
                                n = t(this._menu).hasClass(h);
                            if (s._clearMenus(), !n) {
                                var i = {
                                    relatedTarget: this._element
                                },
                                    r = t.Event(l.SHOW, i);
                                if (t(e).trigger(r), !r.isDefaultPrevented()) {
                                    if (!this._inNavbar) {
                                        if ("undefined" == typeof Ot) throw new TypeError("Bootstrap dropdown require Popper.js (https://popper.js.org)");
                                        var o = this._element;
                                        t(e).hasClass(f) && (t(this._menu).hasClass(g) || t(this._menu).hasClass(p)) && (o = e), "scrollParent" !== this._config.boundary && t(e).addClass(m), this._popper = new Ot(o, this._menu, this._getPopperConfig())
                                    }
                                    "ontouchstart" in document.documentElement && 0 === t(e).closest(y).length && t("body").children().on("mouseover", null, t.noop), this._element.focus(), this._element.setAttribute("aria-expanded", !0), t(this._menu).toggleClass(h), t(e).toggleClass(h).trigger(t.Event(l.SHOWN, i))
                                }
                            }
                        }
                    }, v.dispose = function () {
                        t.removeData(this._element, n), t(this._element).off(o), this._element = null, this._menu = null, null !== this._popper && (this._popper.destroy(), this._popper = null)
                    }, v.update = function () {
                        this._inNavbar = this._detectNavbar(), null !== this._popper && this._popper.scheduleUpdate()
                    }, v._addEventListeners = function () {
                        var e = this;
                        t(this._element).on(l.CLICK, function (t) {
                            t.preventDefault(), t.stopPropagation(), e.toggle()
                        })
                    }, v._getConfig = function (n) {
                        return n = r({}, this.constructor.Default, t(this._element).data(), n), k.typeCheckConfig(e, n, this.constructor.DefaultType), n
                    }, v._getMenuElement = function () {
                        if (!this._menu) {
                            var e = s._getParentFromElement(this._element);
                            this._menu = t(e).find(E)[0]
                        }
                        return this._menu
                    }, v._getPlacement = function () {
                        var e = t(this._element).parent(),
                            n = w;
                        return e.hasClass(f) ? (n = T, t(this._menu).hasClass(p) && (n = C)) : e.hasClass(u) ? n = A : e.hasClass(d) ? n = D : t(this._menu).hasClass(p) && (n = I), n
                    }, v._detectNavbar = function () {
                        return t(this._element).closest(".navbar").length > 0
                    }, v._getPopperConfig = function () {
                        var t = this,
                            e = {};
                        return "function" == typeof this._config.offset ? e.fn = function (e) {
                            return e.offsets = r({}, e.offsets, t._config.offset(e.offsets) || {}), e
                        } : e.offset = this._config.offset, {
                            placement: this._getPlacement(),
                            modifiers: {
                                offset: e,
                                flip: {
                                    enabled: this._config.flip
                                },
                                preventOverflow: {
                                    boundariesElement: this._config.boundary
                                }
                            }
                        }
                    }, s._jQueryInterface = function (e) {
                        return this.each(function () {
                            var i = t(this).data(n);
                            if (i || (i = new s(this, "object" == typeof e ? e : null), t(this).data(n, i)), "string" == typeof e) {
                                if ("undefined" == typeof i[e]) throw new TypeError('No method named "' + e + '"');
                                i[e]()
                            }
                        })
                    }, s._clearMenus = function (e) {
                        if (!e || 3 !== e.which && ("keyup" !== e.type || 9 === e.which))
                            for (var i = t.makeArray(t(_)), r = 0; r < i.length; r++) {
                                var o = s._getParentFromElement(i[r]),
                                    a = t(i[r]).data(n),
                                    c = {
                                        relatedTarget: i[r]
                                    };
                                if (a) {
                                    var f = a._menu;
                                    if (t(o).hasClass(h) && !(e && ("click" === e.type && /input|textarea/i.test(e.target.tagName) || "keyup" === e.type && 9 === e.which) && t.contains(o, e.target))) {
                                        var u = t.Event(l.HIDE, c);
                                        t(o).trigger(u), u.isDefaultPrevented() || ("ontouchstart" in document.documentElement && t("body").children().off("mouseover", null, t.noop), i[r].setAttribute("aria-expanded", "false"), t(f).removeClass(h), t(o).removeClass(h).trigger(t.Event(l.HIDDEN, c)))
                                    }
                                }
                            }
                    }, s._getParentFromElement = function (e) {
                        var n, i = k.getSelectorFromElement(e);
                        return i && (n = t(i)[0]), n || e.parentNode
                    }, s._dataApiKeydownHandler = function (e) {
                        if (!((/input|textarea/i.test(e.target.tagName) ? 32 === e.which || 27 !== e.which && (40 !== e.which && 38 !== e.which || t(e.target).closest(E).length) : !a.test(e.which)) || (e.preventDefault(), e.stopPropagation(), this.disabled || t(this).hasClass(c)))) {
                            var n = s._getParentFromElement(this),
                                i = t(n).hasClass(h);
                            if ((i || 27 === e.which && 32 === e.which) && (!i || 27 !== e.which && 32 !== e.which)) {
                                var r = t(n).find(b).get();
                                if (0 !== r.length) {
                                    var o = r.indexOf(e.target);
                                    38 === e.which && o > 0 && o--, 40 === e.which && o < r.length - 1 && o++, 0 > o && (o = 0), r[o].focus()
                                }
                            } else {
                                if (27 === e.which) {
                                    var l = t(n).find(_)[0];
                                    t(l).trigger("focus")
                                }
                                t(this).trigger("click")
                            }
                        }
                    }, i(s, null, [{
                        key: "VERSION",
                        get: function () {
                            return "4.0.0"
                        }
                    }, {
                        key: "Default",
                        get: function () {
                            return S
                        }
                    }, {
                        key: "DefaultType",
                        get: function () {
                            return O
                        }
                    }]), s
                }();
            return t(document).on(l.KEYDOWN_DATA_API, _, N._dataApiKeydownHandler).on(l.KEYDOWN_DATA_API, E, N._dataApiKeydownHandler).on(l.CLICK_DATA_API + " " + l.KEYUP_DATA_API, N._clearMenus).on(l.CLICK_DATA_API, _, function (e) {
                e.preventDefault(), e.stopPropagation(), N._jQueryInterface.call(t(this), "toggle")
            }).on(l.CLICK_DATA_API, v, function (t) {
                t.stopPropagation()
            }), t.fn[e] = N._jQueryInterface, t.fn[e].Constructor = N, t.fn[e].noConflict = function () {
                return t.fn[e] = s, N._jQueryInterface
            }, N
        }(e),
            kt = function (t) {
                var e = "bs.modal",
                    n = "." + e,
                    o = t.fn.modal,
                    s = {
                        backdrop: !0,
                        keyboard: !0,
                        focus: !0,
                        show: !0
                    },
                    a = {
                        backdrop: "(boolean|string)",
                        keyboard: "boolean",
                        focus: "boolean",
                        show: "boolean"
                    },
                    l = {
                        HIDE: "hide" + n,
                        HIDDEN: "hidden" + n,
                        SHOW: "show" + n,
                        SHOWN: "shown" + n,
                        FOCUSIN: "focusin" + n,
                        RESIZE: "resize" + n,
                        CLICK_DISMISS: "click.dismiss" + n,
                        KEYDOWN_DISMISS: "keydown.dismiss" + n,
                        MOUSEUP_DISMISS: "mouseup.dismiss" + n,
                        MOUSEDOWN_DISMISS: "mousedown.dismiss" + n,
                        CLICK_DATA_API: "click.bs.modal.data-api"
                    },
                    c = "modal-scrollbar-measure",
                    h = "modal-backdrop",
                    f = "modal-open",
                    u = "fade",
                    d = "show",
                    p = {
                        DIALOG: ".modal-dialog",
                        DATA_TOGGLE: '[data-toggle="modal"]',
                        DATA_DISMISS: '[data-dismiss="modal"]',
                        FIXED_CONTENT: ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",
                        STICKY_CONTENT: ".sticky-top",
                        NAVBAR_TOGGLER: ".navbar-toggler"
                    },
                    g = function () {
                        function o(e, n) {
                            this._config = this._getConfig(n), this._element = e, this._dialog = t(e).find(p.DIALOG)[0], this._backdrop = null, this._isShown = !1, this._isBodyOverflowing = !1, this._ignoreBackdropClick = !1, this._originalBodyPadding = 0, this._scrollbarWidth = 0
                        }
                        var g = o.prototype;
                        return g.toggle = function (t) {
                            return this._isShown ? this.hide() : this.show(t)
                        }, g.show = function (e) {
                            var n = this;
                            if (!this._isTransitioning && !this._isShown) {
                                k.supportsTransitionEnd() && t(this._element).hasClass(u) && (this._isTransitioning = !0);
                                var i = t.Event(l.SHOW, {
                                    relatedTarget: e
                                });
                                t(this._element).trigger(i), this._isShown || i.isDefaultPrevented() || (this._isShown = !0, this._checkScrollbar(), this._setScrollbar(), this._adjustDialog(), t(document.body).addClass(f), this._setEscapeEvent(), this._setResizeEvent(), t(this._element).on(l.CLICK_DISMISS, p.DATA_DISMISS, function (t) {
                                    return n.hide(t)
                                }), t(this._dialog).on(l.MOUSEDOWN_DISMISS, function () {
                                    t(n._element).one(l.MOUSEUP_DISMISS, function (e) {
                                        t(e.target).is(n._element) && (n._ignoreBackdropClick = !0)
                                    })
                                }), this._showBackdrop(function () {
                                    return n._showElement(e)
                                }))
                            }
                        }, g.hide = function (e) {
                            var n = this;
                            if (e && e.preventDefault(), !this._isTransitioning && this._isShown) {
                                var i = t.Event(l.HIDE);
                                if (t(this._element).trigger(i), this._isShown && !i.isDefaultPrevented()) {
                                    this._isShown = !1;
                                    var r = k.supportsTransitionEnd() && t(this._element).hasClass(u);
                                    r && (this._isTransitioning = !0), this._setEscapeEvent(), this._setResizeEvent(), t(document).off(l.FOCUSIN), t(this._element).removeClass(d), t(this._element).off(l.CLICK_DISMISS), t(this._dialog).off(l.MOUSEDOWN_DISMISS), r ? t(this._element).one(k.TRANSITION_END, function (t) {
                                        return n._hideModal(t)
                                    }).emulateTransitionEnd(300) : this._hideModal()
                                }
                            }
                        }, g.dispose = function () {
                            t.removeData(this._element, e), t(window, document, this._element, this._backdrop).off(n), this._config = null, this._element = null, this._dialog = null, this._backdrop = null, this._isShown = null, this._isBodyOverflowing = null, this._ignoreBackdropClick = null, this._scrollbarWidth = null
                        }, g.handleUpdate = function () {
                            this._adjustDialog()
                        }, g._getConfig = function (t) {
                            return t = r({}, s, t), k.typeCheckConfig("modal", t, a), t
                        }, g._showElement = function (e) {
                            var n = this,
                                i = k.supportsTransitionEnd() && t(this._element).hasClass(u);
                            this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE || document.body.appendChild(this._element), this._element.style.display = "block", this._element.removeAttribute("aria-hidden"), this._element.scrollTop = 0, i && k.reflow(this._element), t(this._element).addClass(d), this._config.focus && this._enforceFocus();
                            var r = t.Event(l.SHOWN, {
                                relatedTarget: e
                            }),
                                o = function () {
                                    n._config.focus && n._element.focus(), n._isTransitioning = !1, t(n._element).trigger(r)
                                };
                            i ? t(this._dialog).one(k.TRANSITION_END, o).emulateTransitionEnd(300) : o()
                        }, g._enforceFocus = function () {
                            var e = this;
                            t(document).off(l.FOCUSIN).on(l.FOCUSIN, function (n) {
                                document !== n.target && e._element !== n.target && 0 === t(e._element).has(n.target).length && e._element.focus()
                            })
                        }, g._setEscapeEvent = function () {
                            var e = this;
                            this._isShown && this._config.keyboard ? t(this._element).on(l.KEYDOWN_DISMISS, function (t) {
                                27 === t.which && (t.preventDefault(), e.hide())
                            }) : this._isShown || t(this._element).off(l.KEYDOWN_DISMISS)
                        }, g._setResizeEvent = function () {
                            var e = this;
                            this._isShown ? t(window).on(l.RESIZE, function (t) {
                                return e.handleUpdate(t)
                            }) : t(window).off(l.RESIZE)
                        }, g._hideModal = function () {
                            var e = this;
                            this._element.style.display = "none", this._element.setAttribute("aria-hidden", !0), this._isTransitioning = !1, this._showBackdrop(function () {
                                t(document.body).removeClass(f), e._resetAdjustments(), e._resetScrollbar(), t(e._element).trigger(l.HIDDEN)
                            })
                        }, g._removeBackdrop = function () {
                            this._backdrop && (t(this._backdrop).remove(), this._backdrop = null)
                        }, g._showBackdrop = function (e) {
                            var n = this,
                                i = t(this._element).hasClass(u) ? u : "";
                            if (this._isShown && this._config.backdrop) {
                                var r = k.supportsTransitionEnd() && i;
                                if (this._backdrop = document.createElement("div"), this._backdrop.className = h, i && t(this._backdrop).addClass(i), t(this._backdrop).appendTo(document.body), t(this._element).on(l.CLICK_DISMISS, function (t) {
                                        n._ignoreBackdropClick ? n._ignoreBackdropClick = !1 : t.target === t.currentTarget && ("static" === n._config.backdrop ? n._element.focus() : n.hide())
                                }), r && k.reflow(this._backdrop), t(this._backdrop).addClass(d), !e) return;
                                if (!r) return void e();
                                t(this._backdrop).one(k.TRANSITION_END, e).emulateTransitionEnd(150)
                            } else if (!this._isShown && this._backdrop) {
                                t(this._backdrop).removeClass(d);
                                var o = function () {
                                    n._removeBackdrop(), e && e()
                                };
                                k.supportsTransitionEnd() && t(this._element).hasClass(u) ? t(this._backdrop).one(k.TRANSITION_END, o).emulateTransitionEnd(150) : o()
                            } else e && e()
                        }, g._adjustDialog = function () {
                            var t = this._element.scrollHeight > document.documentElement.clientHeight;
                            !this._isBodyOverflowing && t && (this._element.style.paddingLeft = this._scrollbarWidth + "px"), this._isBodyOverflowing && !t && (this._element.style.paddingRight = this._scrollbarWidth + "px")
                        }, g._resetAdjustments = function () {
                            this._element.style.paddingLeft = "", this._element.style.paddingRight = ""
                        }, g._checkScrollbar = function () {
                            var t = document.body.getBoundingClientRect();
                            this._isBodyOverflowing = t.left + t.right < window.innerWidth, this._scrollbarWidth = this._getScrollbarWidth()
                        }, g._setScrollbar = function () {
                            var e = this;
                            if (this._isBodyOverflowing) {
                                t(p.FIXED_CONTENT).each(function (n, i) {
                                    var r = t(i)[0].style.paddingRight,
                                        o = t(i).css("padding-right");
                                    t(i).data("padding-right", r).css("padding-right", parseFloat(o) + e._scrollbarWidth + "px")
                                }), t(p.STICKY_CONTENT).each(function (n, i) {
                                    var r = t(i)[0].style.marginRight,
                                        o = t(i).css("margin-right");
                                    t(i).data("margin-right", r).css("margin-right", parseFloat(o) - e._scrollbarWidth + "px")
                                }), t(p.NAVBAR_TOGGLER).each(function (n, i) {
                                    var r = t(i)[0].style.marginRight,
                                        o = t(i).css("margin-right");
                                    t(i).data("margin-right", r).css("margin-right", parseFloat(o) + e._scrollbarWidth + "px")
                                });
                                var n = document.body.style.paddingRight,
                                    i = t("body").css("padding-right");
                                t("body").data("padding-right", n).css("padding-right", parseFloat(i) + this._scrollbarWidth + "px")
                            }
                        }, g._resetScrollbar = function () {
                            t(p.FIXED_CONTENT).each(function (e, n) {
                                var i = t(n).data("padding-right");
                                "undefined" != typeof i && t(n).css("padding-right", i).removeData("padding-right")
                            }), t(p.STICKY_CONTENT + ", " + p.NAVBAR_TOGGLER).each(function (e, n) {
                                var i = t(n).data("margin-right");
                                "undefined" != typeof i && t(n).css("margin-right", i).removeData("margin-right")
                            });
                            var e = t("body").data("padding-right");
                            "undefined" != typeof e && t("body").css("padding-right", e).removeData("padding-right")
                        }, g._getScrollbarWidth = function () {
                            var t = document.createElement("div");
                            t.className = c, document.body.appendChild(t);
                            var e = t.getBoundingClientRect().width - t.clientWidth;
                            return document.body.removeChild(t), e
                        }, o._jQueryInterface = function (n, i) {
                            return this.each(function () {
                                var s = t(this).data(e),
                                    a = r({}, o.Default, t(this).data(), "object" == typeof n && n);
                                if (s || (s = new o(this, a), t(this).data(e, s)), "string" == typeof n) {
                                    if ("undefined" == typeof s[n]) throw new TypeError('No method named "' + n + '"');
                                    s[n](i)
                                } else a.show && s.show(i)
                            })
                        }, i(o, null, [{
                            key: "VERSION",
                            get: function () {
                                return "4.0.0"
                            }
                        }, {
                            key: "Default",
                            get: function () {
                                return s
                            }
                        }]), o
                    }();
                return t(document).on(l.CLICK_DATA_API, p.DATA_TOGGLE, function (n) {
                    var i, o = this,
                        s = k.getSelectorFromElement(this);
                    s && (i = t(s)[0]);
                    var a = t(i).data(e) ? "toggle" : r({}, t(i).data(), t(this).data());
                    "A" !== this.tagName && "AREA" !== this.tagName || n.preventDefault();
                    var c = t(i).one(l.SHOW, function (e) {
                        e.isDefaultPrevented() || c.one(l.HIDDEN, function () {
                            t(o).is(":visible") && o.focus()
                        })
                    });
                    g._jQueryInterface.call(t(i), a, this)
                }), t.fn.modal = g._jQueryInterface, t.fn.modal.Constructor = g, t.fn.modal.noConflict = function () {
                    return t.fn.modal = o, g._jQueryInterface
                }, g
            }(e),
            Lt = function (t) {
                var e = "tooltip",
                    n = "bs.tooltip",
                    o = "." + n,
                    s = t.fn[e],
                    a = new RegExp("(^|\\s)bs-tooltip\\S+", "g"),
                    l = {
                        animation: "boolean",
                        template: "string",
                        title: "(string|element|function)",
                        trigger: "string",
                        delay: "(number|object)",
                        html: "boolean",
                        selector: "(string|boolean)",
                        placement: "(string|function)",
                        offset: "(number|string)",
                        container: "(string|element|boolean)",
                        fallbackPlacement: "(string|array)",
                        boundary: "(string|element)"
                    },
                    c = {
                        AUTO: "auto",
                        TOP: "top",
                        RIGHT: "right",
                        BOTTOM: "bottom",
                        LEFT: "left"
                    },
                    h = {
                        animation: !0,
                        template: '<div class="tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>',
                        trigger: "hover focus",
                        title: "",
                        delay: 0,
                        html: !1,
                        selector: !1,
                        placement: "top",
                        offset: 0,
                        container: !1,
                        fallbackPlacement: "flip",
                        boundary: "scrollParent"
                    },
                    f = "show",
                    u = "out",
                    d = {
                        HIDE: "hide" + o,
                        HIDDEN: "hidden" + o,
                        SHOW: "show" + o,
                        SHOWN: "shown" + o,
                        INSERTED: "inserted" + o,
                        CLICK: "click" + o,
                        FOCUSIN: "focusin" + o,
                        FOCUSOUT: "focusout" + o,
                        MOUSEENTER: "mouseenter" + o,
                        MOUSELEAVE: "mouseleave" + o
                    },
                    p = "fade",
                    g = "show",
                    m = ".tooltip-inner",
                    _ = ".arrow",
                    v = "hover",
                    E = "focus",
                    y = "click",
                    b = "manual",
                    T = function () {
                        function s(t, e) {
                            if ("undefined" == typeof Ot) throw new TypeError("Bootstrap tooltips require Popper.js (https://popper.js.org)");
                            this._isEnabled = !0, this._timeout = 0, this._hoverState = "", this._activeTrigger = {}, this._popper = null, this.element = t, this.config = this._getConfig(e), this.tip = null, this._setListeners()
                        }
                        var T = s.prototype;
                        return T.enable = function () {
                            this._isEnabled = !0
                        }, T.disable = function () {
                            this._isEnabled = !1
                        }, T.toggleEnabled = function () {
                            this._isEnabled = !this._isEnabled
                        }, T.toggle = function (e) {
                            if (this._isEnabled)
                                if (e) {
                                    var n = this.constructor.DATA_KEY,
                                        i = t(e.currentTarget).data(n);
                                    i || (i = new this.constructor(e.currentTarget, this._getDelegateConfig()), t(e.currentTarget).data(n, i)), i._activeTrigger.click = !i._activeTrigger.click, i._isWithActiveTrigger() ? i._enter(null, i) : i._leave(null, i)
                                } else {
                                    if (t(this.getTipElement()).hasClass(g)) return void this._leave(null, this);
                                    this._enter(null, this)
                                }
                        }, T.dispose = function () {
                            clearTimeout(this._timeout), t.removeData(this.element, this.constructor.DATA_KEY), t(this.element).off(this.constructor.EVENT_KEY), t(this.element).closest(".modal").off("hide.bs.modal"), this.tip && t(this.tip).remove(), this._isEnabled = null, this._timeout = null, this._hoverState = null, this._activeTrigger = null, null !== this._popper && this._popper.destroy(), this._popper = null, this.element = null, this.config = null, this.tip = null
                        }, T.show = function () {
                            var e = this;
                            if ("none" === t(this.element).css("display")) throw new Error("Please use show on visible elements");
                            var n = t.Event(this.constructor.Event.SHOW);
                            if (this.isWithContent() && this._isEnabled) {
                                t(this.element).trigger(n);
                                var i = t.contains(this.element.ownerDocument.documentElement, this.element);
                                if (n.isDefaultPrevented() || !i) return;
                                var r = this.getTipElement(),
                                    o = k.getUID(this.constructor.NAME);
                                r.setAttribute("id", o), this.element.setAttribute("aria-describedby", o), this.setContent(), this.config.animation && t(r).addClass(p);
                                var a = "function" == typeof this.config.placement ? this.config.placement.call(this, r, this.element) : this.config.placement,
                                    l = this._getAttachment(a);
                                this.addAttachmentClass(l);
                                var c = !1 === this.config.container ? document.body : t(this.config.container);
                                t(r).data(this.constructor.DATA_KEY, this), t.contains(this.element.ownerDocument.documentElement, this.tip) || t(r).appendTo(c), t(this.element).trigger(this.constructor.Event.INSERTED), this._popper = new Ot(this.element, r, {
                                    placement: l,
                                    modifiers: {
                                        offset: {
                                            offset: this.config.offset
                                        },
                                        flip: {
                                            behavior: this.config.fallbackPlacement
                                        },
                                        arrow: {
                                            element: _
                                        },
                                        preventOverflow: {
                                            boundariesElement: this.config.boundary
                                        }
                                    },
                                    onCreate: function (t) {
                                        t.originalPlacement !== t.placement && e._handlePopperPlacementChange(t)
                                    },
                                    onUpdate: function (t) {
                                        e._handlePopperPlacementChange(t)
                                    }
                                }), t(r).addClass(g), "ontouchstart" in document.documentElement && t("body").children().on("mouseover", null, t.noop);
                                var h = function () {
                                    e.config.animation && e._fixTransition();
                                    var n = e._hoverState;
                                    e._hoverState = null, t(e.element).trigger(e.constructor.Event.SHOWN), n === u && e._leave(null, e)
                                };
                                k.supportsTransitionEnd() && t(this.tip).hasClass(p) ? t(this.tip).one(k.TRANSITION_END, h).emulateTransitionEnd(s._TRANSITION_DURATION) : h()
                            }
                        }, T.hide = function (e) {
                            var n = this,
                                i = this.getTipElement(),
                                r = t.Event(this.constructor.Event.HIDE),
                                o = function () {
                                    n._hoverState !== f && i.parentNode && i.parentNode.removeChild(i), n._cleanTipClass(), n.element.removeAttribute("aria-describedby"), t(n.element).trigger(n.constructor.Event.HIDDEN), null !== n._popper && n._popper.destroy(), e && e()
                                };
                            t(this.element).trigger(r), r.isDefaultPrevented() || (t(i).removeClass(g), "ontouchstart" in document.documentElement && t("body").children().off("mouseover", null, t.noop), this._activeTrigger[y] = !1, this._activeTrigger[E] = !1, this._activeTrigger[v] = !1, k.supportsTransitionEnd() && t(this.tip).hasClass(p) ? t(i).one(k.TRANSITION_END, o).emulateTransitionEnd(150) : o(), this._hoverState = "")
                        }, T.update = function () {
                            null !== this._popper && this._popper.scheduleUpdate()
                        }, T.isWithContent = function () {
                            return Boolean(this.getTitle())
                        }, T.addAttachmentClass = function (e) {
                            t(this.getTipElement()).addClass("bs-tooltip-" + e)
                        }, T.getTipElement = function () {
                            return this.tip = this.tip || t(this.config.template)[0], this.tip
                        }, T.setContent = function () {
                            var e = t(this.getTipElement());
                            this.setElementContent(e.find(m), this.getTitle()), e.removeClass(p + " " + g)
                        }, T.setElementContent = function (e, n) {
                            var i = this.config.html;
                            "object" == typeof n && (n.nodeType || n.jquery) ? i ? t(n).parent().is(e) || e.empty().append(n) : e.text(t(n).text()) : e[i ? "html" : "text"](n)
                        }, T.getTitle = function () {
                            var t = this.element.getAttribute("data-original-title");
                            return t || (t = "function" == typeof this.config.title ? this.config.title.call(this.element) : this.config.title), t
                        }, T._getAttachment = function (t) {
                            return c[t.toUpperCase()]
                        }, T._setListeners = function () {
                            var e = this;
                            this.config.trigger.split(" ").forEach(function (n) {
                                if ("click" === n) t(e.element).on(e.constructor.Event.CLICK, e.config.selector, function (t) {
                                    return e.toggle(t)
                                });
                                else if (n !== b) {
                                    var i = n === v ? e.constructor.Event.MOUSEENTER : e.constructor.Event.FOCUSIN,
                                        r = n === v ? e.constructor.Event.MOUSELEAVE : e.constructor.Event.FOCUSOUT;
                                    t(e.element).on(i, e.config.selector, function (t) {
                                        return e._enter(t)
                                    }).on(r, e.config.selector, function (t) {
                                        return e._leave(t)
                                    })
                                }
                                t(e.element).closest(".modal").on("hide.bs.modal", function () {
                                    return e.hide()
                                })
                            }), this.config.selector ? this.config = r({}, this.config, {
                                trigger: "manual",
                                selector: ""
                            }) : this._fixTitle()
                        }, T._fixTitle = function () {
                            var t = typeof this.element.getAttribute("data-original-title");
                            (this.element.getAttribute("title") || "string" !== t) && (this.element.setAttribute("data-original-title", this.element.getAttribute("title") || ""), this.element.setAttribute("title", ""))
                        }, T._enter = function (e, n) {
                            var i = this.constructor.DATA_KEY;
                            (n = n || t(e.currentTarget).data(i)) || (n = new this.constructor(e.currentTarget, this._getDelegateConfig()), t(e.currentTarget).data(i, n)), e && (n._activeTrigger["focusin" === e.type ? E : v] = !0), t(n.getTipElement()).hasClass(g) || n._hoverState === f ? n._hoverState = f : (clearTimeout(n._timeout), n._hoverState = f, n.config.delay && n.config.delay.show ? n._timeout = setTimeout(function () {
                                n._hoverState === f && n.show()
                            }, n.config.delay.show) : n.show())
                        }, T._leave = function (e, n) {
                            var i = this.constructor.DATA_KEY;
                            (n = n || t(e.currentTarget).data(i)) || (n = new this.constructor(e.currentTarget, this._getDelegateConfig()), t(e.currentTarget).data(i, n)), e && (n._activeTrigger["focusout" === e.type ? E : v] = !1), n._isWithActiveTrigger() || (clearTimeout(n._timeout), n._hoverState = u, n.config.delay && n.config.delay.hide ? n._timeout = setTimeout(function () {
                                n._hoverState === u && n.hide()
                            }, n.config.delay.hide) : n.hide())
                        }, T._isWithActiveTrigger = function () {
                            for (var t in this._activeTrigger)
                                if (this._activeTrigger[t]) return !0;
                            return !1
                        }, T._getConfig = function (n) {
                            return "number" == typeof (n = r({}, this.constructor.Default, t(this.element).data(), n)).delay && (n.delay = {
                                show: n.delay,
                                hide: n.delay
                            }), "number" == typeof n.title && (n.title = n.title.toString()), "number" == typeof n.content && (n.content = n.content.toString()), k.typeCheckConfig(e, n, this.constructor.DefaultType), n
                        }, T._getDelegateConfig = function () {
                            var t = {};
                            if (this.config)
                                for (var e in this.config) this.constructor.Default[e] !== this.config[e] && (t[e] = this.config[e]);
                            return t
                        }, T._cleanTipClass = function () {
                            var e = t(this.getTipElement()),
                                n = e.attr("class").match(a);
                            null !== n && n.length > 0 && e.removeClass(n.join(""))
                        }, T._handlePopperPlacementChange = function (t) {
                            this._cleanTipClass(), this.addAttachmentClass(this._getAttachment(t.placement))
                        }, T._fixTransition = function () {
                            var e = this.getTipElement(),
                                n = this.config.animation;
                            null === e.getAttribute("x-placement") && (t(e).removeClass(p), this.config.animation = !1, this.hide(), this.show(), this.config.animation = n)
                        }, s._jQueryInterface = function (e) {
                            return this.each(function () {
                                var i = t(this).data(n),
                                    r = "object" == typeof e && e;
                                if ((i || !/dispose|hide/.test(e)) && (i || (i = new s(this, r), t(this).data(n, i)), "string" == typeof e)) {
                                    if ("undefined" == typeof i[e]) throw new TypeError('No method named "' + e + '"');
                                    i[e]()
                                }
                            })
                        }, i(s, null, [{
                            key: "VERSION",
                            get: function () {
                                return "4.0.0"
                            }
                        }, {
                            key: "Default",
                            get: function () {
                                return h
                            }
                        }, {
                            key: "NAME",
                            get: function () {
                                return e
                            }
                        }, {
                            key: "DATA_KEY",
                            get: function () {
                                return n
                            }
                        }, {
                            key: "Event",
                            get: function () {
                                return d
                            }
                        }, {
                            key: "EVENT_KEY",
                            get: function () {
                                return o
                            }
                        }, {
                            key: "DefaultType",
                            get: function () {
                                return l
                            }
                        }]), s
                    }();
                return t.fn[e] = T._jQueryInterface, t.fn[e].Constructor = T, t.fn[e].noConflict = function () {
                    return t.fn[e] = s, T._jQueryInterface
                }, T
            }(e),
            Pt = function (t) {
                var e = "popover",
                    n = "bs.popover",
                    o = "." + n,
                    s = t.fn[e],
                    a = new RegExp("(^|\\s)bs-popover\\S+", "g"),
                    l = r({}, Lt.Default, {
                        placement: "right",
                        trigger: "click",
                        content: "",
                        template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'
                    }),
                    c = r({}, Lt.DefaultType, {
                        content: "(string|element|function)"
                    }),
                    h = "fade",
                    f = "show",
                    u = ".popover-header",
                    d = ".popover-body",
                    p = {
                        HIDE: "hide" + o,
                        HIDDEN: "hidden" + o,
                        SHOW: "show" + o,
                        SHOWN: "shown" + o,
                        INSERTED: "inserted" + o,
                        CLICK: "click" + o,
                        FOCUSIN: "focusin" + o,
                        FOCUSOUT: "focusout" + o,
                        MOUSEENTER: "mouseenter" + o,
                        MOUSELEAVE: "mouseleave" + o
                    },
                    g = function (r) {
                        function m() {
                            return r.apply(this, arguments) || this
                        }
                        var s, g;
                        g = r, (s = m).prototype = Object.create(g.prototype), s.prototype.constructor = s, s.__proto__ = g;
                        var _ = m.prototype;
                        return _.isWithContent = function () {
                            return this.getTitle() || this._getContent()
                        }, _.addAttachmentClass = function (e) {
                            t(this.getTipElement()).addClass("bs-popover-" + e)
                        }, _.getTipElement = function () {
                            return this.tip = this.tip || t(this.config.template)[0], this.tip
                        }, _.setContent = function () {
                            var e = t(this.getTipElement());
                            this.setElementContent(e.find(u), this.getTitle());
                            var n = this._getContent();
                            "function" == typeof n && (n = n.call(this.element)), this.setElementContent(e.find(d), n), e.removeClass(h + " " + f)
                        }, _._getContent = function () {
                            return this.element.getAttribute("data-content") || this.config.content
                        }, _._cleanTipClass = function () {
                            var e = t(this.getTipElement()),
                                n = e.attr("class").match(a);
                            null !== n && n.length > 0 && e.removeClass(n.join(""))
                        }, m._jQueryInterface = function (e) {
                            return this.each(function () {
                                var i = t(this).data(n),
                                    r = "object" == typeof e ? e : null;
                                if ((i || !/destroy|hide/.test(e)) && (i || (i = new m(this, r), t(this).data(n, i)), "string" == typeof e)) {
                                    if ("undefined" == typeof i[e]) throw new TypeError('No method named "' + e + '"');
                                    i[e]()
                                }
                            })
                        }, i(m, null, [{
                            key: "VERSION",
                            get: function () {
                                return "4.0.0"
                            }
                        }, {
                            key: "Default",
                            get: function () {
                                return l
                            }
                        }, {
                            key: "NAME",
                            get: function () {
                                return e
                            }
                        }, {
                            key: "DATA_KEY",
                            get: function () {
                                return n
                            }
                        }, {
                            key: "Event",
                            get: function () {
                                return p
                            }
                        }, {
                            key: "EVENT_KEY",
                            get: function () {
                                return o
                            }
                        }, {
                            key: "DefaultType",
                            get: function () {
                                return c
                            }
                        }]), m
                    }(Lt);
                return t.fn[e] = g._jQueryInterface, t.fn[e].Constructor = g, t.fn[e].noConflict = function () {
                    return t.fn[e] = s, g._jQueryInterface
                }, g
            }(e),
            xt = function (t) {
                var e = "scrollspy",
                    n = "bs.scrollspy",
                    o = "." + n,
                    s = t.fn[e],
                    a = {
                        offset: 10,
                        method: "auto",
                        target: ""
                    },
                    l = {
                        offset: "number",
                        method: "string",
                        target: "(string|element)"
                    },
                    c = {
                        ACTIVATE: "activate" + o,
                        SCROLL: "scroll" + o,
                        LOAD_DATA_API: "load" + o + ".data-api"
                    },
                    h = "dropdown-item",
                    f = "active",
                    u = {
                        DATA_SPY: '[data-spy="scroll"]',
                        ACTIVE: ".active",
                        NAV_LIST_GROUP: ".nav, .list-group",
                        NAV_LINKS: ".nav-link",
                        NAV_ITEMS: ".nav-item",
                        LIST_ITEMS: ".list-group-item",
                        DROPDOWN: ".dropdown",
                        DROPDOWN_ITEMS: ".dropdown-item",
                        DROPDOWN_TOGGLE: ".dropdown-toggle"
                    },
                    d = "offset",
                    p = "position",
                    g = function () {
                        function s(e, n) {
                            var i = this;
                            this._element = e, this._scrollElement = "BODY" === e.tagName ? window : e, this._config = this._getConfig(n), this._selector = this._config.target + " " + u.NAV_LINKS + "," + this._config.target + " " + u.LIST_ITEMS + "," + this._config.target + " " + u.DROPDOWN_ITEMS, this._offsets = [], this._targets = [], this._activeTarget = null, this._scrollHeight = 0, t(this._scrollElement).on(c.SCROLL, function (t) {
                                return i._process(t)
                            }), this.refresh(), this._process()
                        }
                        var g = s.prototype;
                        return g.refresh = function () {
                            var e = this,
                                n = this._scrollElement === this._scrollElement.window ? d : p,
                                i = "auto" === this._config.method ? n : this._config.method,
                                r = i === p ? this._getScrollTop() : 0;
                            this._offsets = [], this._targets = [], this._scrollHeight = this._getScrollHeight(), t.makeArray(t(this._selector)).map(function (e) {
                                var n, o = k.getSelectorFromElement(e);
                                if (o && (n = t(o)[0]), n) {
                                    var s = n.getBoundingClientRect();
                                    if (s.width || s.height) return [t(n)[i]().top + r, o]
                                }
                                return null
                            }).filter(function (t) {
                                return t
                            }).sort(function (t, e) {
                                return t[0] - e[0]
                            }).forEach(function (t) {
                                e._offsets.push(t[0]), e._targets.push(t[1])
                            })
                        }, g.dispose = function () {
                            t.removeData(this._element, n), t(this._scrollElement).off(o), this._element = null, this._scrollElement = null, this._config = null, this._selector = null, this._offsets = null, this._targets = null, this._activeTarget = null, this._scrollHeight = null
                        }, g._getConfig = function (n) {
                            if ("string" != typeof (n = r({}, a, n)).target) {
                                var i = t(n.target).attr("id");
                                i || (i = k.getUID(e), t(n.target).attr("id", i)), n.target = "#" + i
                            }
                            return k.typeCheckConfig(e, n, l), n
                        }, g._getScrollTop = function () {
                            return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop
                        }, g._getScrollHeight = function () {
                            return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
                        }, g._getOffsetHeight = function () {
                            return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height
                        }, g._process = function () {
                            var t = this._getScrollTop() + this._config.offset,
                                e = this._getScrollHeight(),
                                n = this._config.offset + e - this._getOffsetHeight();
                            if (this._scrollHeight !== e && this.refresh(), t >= n) {
                                var i = this._targets[this._targets.length - 1];
                                this._activeTarget !== i && this._activate(i)
                            } else {
                                if (this._activeTarget && t < this._offsets[0] && this._offsets[0] > 0) return this._activeTarget = null, void this._clear();
                                for (var r = this._offsets.length; r--;) this._activeTarget !== this._targets[r] && t >= this._offsets[r] && ("undefined" == typeof this._offsets[r + 1] || t < this._offsets[r + 1]) && this._activate(this._targets[r])
                            }
                        }, g._activate = function (e) {
                            this._activeTarget = e, this._clear();
                            var n = this._selector.split(",");
                            n = n.map(function (t) {
                                return t + '[data-target="' + e + '"],' + t + '[href="' + e + '"]'
                            });
                            var i = t(n.join(","));
                            i.hasClass(h) ? (i.closest(u.DROPDOWN).find(u.DROPDOWN_TOGGLE).addClass(f), i.addClass(f)) : (i.addClass(f), i.parents(u.NAV_LIST_GROUP).prev(u.NAV_LINKS + ", " + u.LIST_ITEMS).addClass(f), i.parents(u.NAV_LIST_GROUP).prev(u.NAV_ITEMS).children(u.NAV_LINKS).addClass(f)), t(this._scrollElement).trigger(c.ACTIVATE, {
                                relatedTarget: e
                            })
                        }, g._clear = function () {
                            t(this._selector).filter(u.ACTIVE).removeClass(f)
                        }, s._jQueryInterface = function (e) {
                            return this.each(function () {
                                var i = t(this).data(n);
                                if (i || (i = new s(this, "object" == typeof e && e), t(this).data(n, i)), "string" == typeof e) {
                                    if ("undefined" == typeof i[e]) throw new TypeError('No method named "' + e + '"');
                                    i[e]()
                                }
                            })
                        }, i(s, null, [{
                            key: "VERSION",
                            get: function () {
                                return "4.0.0"
                            }
                        }, {
                            key: "Default",
                            get: function () {
                                return a
                            }
                        }]), s
                    }();
                return t(window).on(c.LOAD_DATA_API, function () {
                    for (var e = t.makeArray(t(u.DATA_SPY)), n = e.length; n--;) {
                        var i = t(e[n]);
                        g._jQueryInterface.call(i, i.data())
                    }
                }), t.fn[e] = g._jQueryInterface, t.fn[e].Constructor = g, t.fn[e].noConflict = function () {
                    return t.fn[e] = s, g._jQueryInterface
                }, g
            }(e),
            Rt = function (t) {
                var e = ".bs.tab",
                    n = t.fn.tab,
                    r = {
                        HIDE: "hide" + e,
                        HIDDEN: "hidden" + e,
                        SHOW: "show" + e,
                        SHOWN: "shown" + e,
                        CLICK_DATA_API: "click.bs.tab.data-api"
                    },
                    o = "dropdown-menu",
                    s = "active",
                    a = "disabled",
                    l = "fade",
                    c = "show",
                    h = ".dropdown",
                    f = ".nav, .list-group",
                    u = ".active",
                    d = "> li > .active",
                    p = '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]',
                    g = ".dropdown-toggle",
                    m = "> .dropdown-menu .active",
                    _ = function () {
                        function e(t) {
                            this._element = t
                        }
                        var n = e.prototype;
                        return n.show = function () {
                            var e = this;
                            if (!(this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && t(this._element).hasClass(s) || t(this._element).hasClass(a))) {
                                var n, i, o = t(this._element).closest(f)[0],
                                    l = k.getSelectorFromElement(this._element);
                                if (o) {
                                    var c = "UL" === o.nodeName ? d : u;
                                    i = (i = t.makeArray(t(o).find(c)))[i.length - 1]
                                }
                                var h = t.Event(r.HIDE, {
                                    relatedTarget: this._element
                                }),
                                    p = t.Event(r.SHOW, {
                                        relatedTarget: i
                                    });
                                if (i && t(i).trigger(h), t(this._element).trigger(p), !p.isDefaultPrevented() && !h.isDefaultPrevented()) {
                                    l && (n = t(l)[0]), this._activate(this._element, o);
                                    var g = function () {
                                        var n = t.Event(r.HIDDEN, {
                                            relatedTarget: e._element
                                        }),
                                            o = t.Event(r.SHOWN, {
                                                relatedTarget: i
                                            });
                                        t(i).trigger(n), t(e._element).trigger(o)
                                    };
                                    n ? this._activate(n, n.parentNode, g) : g()
                                }
                            }
                        }, n.dispose = function () {
                            t.removeData(this._element, "bs.tab"), this._element = null
                        }, n._activate = function (e, n, i) {
                            var r = this,
                                o = ("UL" === n.nodeName ? t(n).find(d) : t(n).children(u))[0],
                                s = i && k.supportsTransitionEnd() && o && t(o).hasClass(l),
                                a = function () {
                                    return r._transitionComplete(e, o, i)
                                };
                            o && s ? t(o).one(k.TRANSITION_END, a).emulateTransitionEnd(150) : a()
                        }, n._transitionComplete = function (e, n, i) {
                            if (n) {
                                t(n).removeClass(c + " " + s);
                                var r = t(n.parentNode).find(m)[0];
                                r && t(r).removeClass(s), "tab" === n.getAttribute("role") && n.setAttribute("aria-selected", !1)
                            }
                            if (t(e).addClass(s), "tab" === e.getAttribute("role") && e.setAttribute("aria-selected", !0), k.reflow(e), t(e).addClass(c), e.parentNode && t(e.parentNode).hasClass(o)) {
                                var a = t(e).closest(h)[0];
                                a && t(a).find(g).addClass(s), e.setAttribute("aria-expanded", !0)
                            }
                            i && i()
                        }, e._jQueryInterface = function (n) {
                            return this.each(function () {
                                var i = t(this),
                                    r = i.data("bs.tab");
                                if (r || (r = new e(this), i.data("bs.tab", r)), "string" == typeof n) {
                                    if ("undefined" == typeof r[n]) throw new TypeError('No method named "' + n + '"');
                                    r[n]()
                                }
                            })
                        }, i(e, null, [{
                            key: "VERSION",
                            get: function () {
                                return "4.0.0"
                            }
                        }]), e
                    }();
                return t(document).on(r.CLICK_DATA_API, p, function (e) {
                    e.preventDefault(), _._jQueryInterface.call(t(this), "show")
                }), t.fn.tab = _._jQueryInterface, t.fn.tab.Constructor = _, t.fn.tab.noConflict = function () {
                    return t.fn.tab = n, _._jQueryInterface
                }, _
            }(e);
        ! function (t) {
            if ("undefined" == typeof t) throw new TypeError("Bootstrap's JavaScript requires jQuery. jQuery must be included before Bootstrap's JavaScript.");
            var e = t.fn.jquery.split(" ")[0].split(".");
            if (e[0] < 2 && e[1] < 9 || 1 === e[0] && 9 === e[1] && e[2] < 1 || e[0] >= 4) throw new Error("Bootstrap's JavaScript requires at least jQuery v1.9.1 but less than v4.0.0")
        }(e), t.Util = k, t.Alert = L, t.Button = P, t.Carousel = x, t.Collapse = R, t.Dropdown = Nt, t.Modal = kt, t.Popover = Pt, t.Scrollspy = xt, t.Tab = Rt, t.Tooltip = Lt, Object.defineProperty(t, "__esModule", {
            value: !0
        })
    }),
    function (factory) {
        "function" == typeof define && define.amd ? define(["jquery"], factory) : "object" == typeof module && module.exports ? module.exports = factory(require("jquery")) : factory(jQuery)
    }(function ($) {
        var slice = Array.prototype.slice,
            splice = Array.prototype.splice,
            defaults = {
                topSpacing: 0,
                bottomSpacing: 0,
                className: "is-sticky",
                wrapperClassName: "sticky-wrapper",
                center: !1,
                getWidthFrom: "",
                widthFromWrapper: !0,
                responsiveWidth: !1
            },
            $window = $(window),
            $document = $(document),
            sticked = [],
            windowHeight = $window.height(),
            scroller = function () {
                for (var scrollTop = $window.scrollTop(), documentHeight = $document.height(), dwh = documentHeight - windowHeight, extra = scrollTop > dwh ? dwh - scrollTop : 0, i = 0, l = sticked.length; l > i; i++) {
                    var s = sticked[i],
                        elementTop = s.stickyWrapper.offset().top,
                        etse = elementTop - s.topSpacing - extra;
                    if (s.stickyWrapper.css("height", s.stickyElement.outerHeight()), etse >= scrollTop) null !== s.currentTop && (s.stickyElement.css({
                        width: "",
                        position: "",
                        top: ""
                    }), s.stickyElement.parent().removeClass(s.className), s.stickyElement.trigger("sticky-end", [s]), s.currentTop = null);
                    else {
                        var newTop = documentHeight - s.stickyElement.outerHeight() - s.topSpacing - s.bottomSpacing - scrollTop - extra;
                        if (0 > newTop ? newTop += s.topSpacing : newTop = s.topSpacing, s.currentTop !== newTop) {
                            var newWidth;
                            s.getWidthFrom ? newWidth = $(s.getWidthFrom).width() || null : s.widthFromWrapper && (newWidth = s.stickyWrapper.width()), null == newWidth && (newWidth = s.stickyElement.width()), s.stickyElement.css("width", newWidth).css("position", "fixed").css("top", newTop), s.stickyElement.parent().addClass(s.className), null === s.currentTop ? s.stickyElement.trigger("sticky-start", [s]) : s.stickyElement.trigger("sticky-update", [s]), s.currentTop === s.topSpacing && s.currentTop > newTop || null === s.currentTop && newTop < s.topSpacing ? s.stickyElement.trigger("sticky-bottom-reached", [s]) : null !== s.currentTop && newTop === s.topSpacing && s.currentTop < newTop && s.stickyElement.trigger("sticky-bottom-unreached", [s]), s.currentTop = newTop
                        }
                        var stickyWrapperContainer = s.stickyWrapper.parent(),
                            unstick = s.stickyElement.offset().top + s.stickyElement.outerHeight() >= stickyWrapperContainer.offset().top + stickyWrapperContainer.outerHeight() && s.stickyElement.offset().top <= s.topSpacing;
                        unstick ? s.stickyElement.css("position", "absolute").css("top", "").css("bottom", 0) : (s.stickyElement.css("position", "fixed").css("top", newTop).css("bottom", ""), $("body").removeClass("nav-not-sticky").addClass("nav-is-sticky"))
                    }
                }
            },
            resizer = function () {
                windowHeight = $window.height();
                for (var i = 0, l = sticked.length; l > i; i++) {
                    var s = sticked[i],
                        newWidth = null;
                    s.getWidthFrom ? s.responsiveWidth && (newWidth = $(s.getWidthFrom).width()) : s.widthFromWrapper && (newWidth = s.stickyWrapper.width()), null != newWidth && s.stickyElement.css("width", newWidth)
                }
            },
            methods = {
                init: function (options) {
                    var o = $.extend({}, defaults, options);
                    return this.each(function () {
                        var stickyElement = $(this),
                            stickyId = stickyElement.attr("id"),
                            wrapperId = stickyId ? stickyId + "-" + defaults.wrapperClassName : defaults.wrapperClassName,
                            wrapper = $("<div></div>").attr("id", wrapperId).addClass(o.wrapperClassName);
                        stickyElement.wrapAll(wrapper), $("body").addClass("sticky-nav nav-not-sticky");
                        var stickyWrapper = stickyElement.parent();
                        o.center && stickyWrapper.css({
                            width: stickyElement.outerWidth(),
                            marginLeft: "auto",
                            marginRight: "auto"
                        }), "right" === stickyElement.css("float") && stickyElement.css({
                            "float": "none"
                        }).parent().css({
                            "float": "right"
                        }), o.stickyElement = stickyElement, o.stickyWrapper = stickyWrapper, o.currentTop = null, sticked.push(o), methods.setWrapperHeight(this), methods.setupChangeListeners(this)
                    })
                },
                setWrapperHeight: function (stickyElement) {
                    var element = $(stickyElement),
                        stickyWrapper = element.parent();
                    stickyWrapper && stickyWrapper.css("height", element.outerHeight())
                },
                setupChangeListeners: function (stickyElement) {
                    if (window.MutationObserver) {
                        var mutationObserver = new window.MutationObserver(function (mutations) {
                            (mutations[0].addedNodes.length || mutations[0].removedNodes.length) && methods.setWrapperHeight(stickyElement)
                        });
                        mutationObserver.observe(stickyElement, {
                            subtree: !0,
                            childList: !0
                        })
                    } else stickyElement.addEventListener("DOMNodeInserted", function () {
                        methods.setWrapperHeight(stickyElement)
                    }, !1), stickyElement.addEventListener("DOMNodeRemoved", function () {
                        methods.setWrapperHeight(stickyElement)
                    }, !1)
                },
                update: scroller,
                unstick: function () {
                    return this.each(function () {
                        for (var that = this, unstickyElement = $(that), removeIdx = -1, i = sticked.length; i-- > 0;) sticked[i].stickyElement.get(0) === that && (splice.call(sticked, i, 1), removeIdx = i); -1 !== removeIdx && (unstickyElement.unwrap(), unstickyElement.css({
                            width: "",
                            position: "",
                            top: "",
                            "float": "",
                            "z-index": ""
                        }))
                    })
                }
            };
        window.addEventListener ? (window.addEventListener("scroll", scroller, !1), window.addEventListener("resize", resizer, !1)) : window.attachEvent && (window.attachEvent("onscroll", scroller), window.attachEvent("onresize", resizer)), $.fn.sticky = function (method) {
            return methods[method] ? methods[method].apply(this, slice.call(arguments, 1)) : "object" != typeof method && method ? void $.error("Method " + method + " does not exist on jQuery.sticky") : methods.init.apply(this, arguments)
        }, $.fn.unstick = function (method) {
            return methods[method] ? methods[method].apply(this, slice.call(arguments, 1)) : "object" != typeof method && method ? void $.error("Method " + method + " does not exist on jQuery.sticky") : methods.unstick.apply(this, arguments)
        }, $(function () {
            setTimeout(scroller, 0)
        })
    }),
    function () {
        function initTest() {
            options.keyboardSupport && addEvent("keydown", keydown)
        }

        function init() {
            if (!initDone && document.body) {
                initDone = !0;
                var body = document.body,
                    html = document.documentElement,
                    windowHeight = window.innerHeight,
                    scrollHeight = body.scrollHeight;
                if (root = document.compatMode.indexOf("CSS") >= 0 ? html : body, activeElement = body, initTest(), top != self) isFrame = !0;
                else if (scrollHeight > windowHeight && (body.offsetHeight <= windowHeight || html.offsetHeight <= windowHeight)) {
                    var fullPageElem = document.createElement("div");
                    fullPageElem.style.cssText = "position:absolute; z-index:-10000; top:0; left:0; right:0; height:" + root.scrollHeight + "px", document.body.appendChild(fullPageElem);
                    var pendingRefresh;
                    refreshSize = function () {
                        pendingRefresh || (pendingRefresh = setTimeout(function () {
                            isExcluded || (fullPageElem.style.height = "0", fullPageElem.style.height = root.scrollHeight + "px", pendingRefresh = null)
                        }, 500))
                    }, setTimeout(refreshSize, 10), addEvent("resize", refreshSize);
                    var config = {
                        attributes: !0,
                        childList: !0,
                        characterData: !1
                    };
                    if (observer = new MutationObserver(refreshSize), observer.observe(body, config), root.offsetHeight <= windowHeight) {
                        var clearfix = document.createElement("div");
                        clearfix.style.clear = "both", body.appendChild(clearfix)
                    }
                }
                options.fixedBackground || isExcluded || (body.style.backgroundAttachment = "scroll", html.style.backgroundAttachment = "scroll")
            }
        }

        function cleanup() {
            observer && observer.disconnect(), removeEvent(wheelEvent, wheel), removeEvent("mousedown", mousedown), removeEvent("keydown", keydown), removeEvent("resize", refreshSize), removeEvent("load", init)
        }

        function scrollArray(elem, left, top) {
            if (directionCheck(left, top), 1 != options.accelerationMax) {
                var now = Date.now(),
                    elapsed = now - lastScroll;
                if (elapsed < options.accelerationDelta) {
                    var factor = (1 + 50 / elapsed) / 2;
                    factor > 1 && (factor = Math.min(factor, options.accelerationMax), left *= factor, top *= factor)
                }
                lastScroll = Date.now()
            }
            if (que.push({
                x: left,
                y: top,
                lastX: 0 > left ? .99 : -.99,
                lastY: 0 > top ? .99 : -.99,
                start: Date.now()
            }), !pending) {
                var scrollWindow = elem === document.body,
                    step = function () {
                        for (var now = Date.now(), scrollX = 0, scrollY = 0, i = 0; i < que.length; i++) {
                            var item = que[i],
                                elapsed = now - item.start,
                                finished = elapsed >= options.animationTime,
                                position = finished ? 1 : elapsed / options.animationTime;
                            options.pulseAlgorithm && (position = pulse(position));
                            var x = item.x * position - item.lastX >> 0,
                                y = item.y * position - item.lastY >> 0;
                            scrollX += x, scrollY += y, item.lastX += x, item.lastY += y, finished && (que.splice(i, 1), i--)
                        }
                        scrollWindow ? window.scrollBy(scrollX, scrollY) : (scrollX && (elem.scrollLeft += scrollX), scrollY && (elem.scrollTop += scrollY)), left || top || (que = []), que.length ? requestFrame(step, elem, 1e3 / options.frameRate + 1) : pending = !1
                    };
                requestFrame(step, elem, 0), pending = !0
            }
        }

        function wheel(event) {
            initDone || init();
            var target = event.target,
                overflowing = overflowingAncestor(target);
            if (!overflowing || event.defaultPrevented || event.ctrlKey) return !0;
            if (isNodeName(activeElement, "embed") || isNodeName(target, "embed") && /\.pdf/i.test(target.src) || isNodeName(activeElement, "object")) return !0;
            var deltaX = -event.wheelDeltaX || event.deltaX || 0,
                deltaY = -event.wheelDeltaY || event.deltaY || 0;
            return isMac && (event.wheelDeltaX && isDivisible(event.wheelDeltaX, 120) && (deltaX = -120 * (event.wheelDeltaX / Math.abs(event.wheelDeltaX))), event.wheelDeltaY && isDivisible(event.wheelDeltaY, 120) && (deltaY = -120 * (event.wheelDeltaY / Math.abs(event.wheelDeltaY)))), deltaX || deltaY || (deltaY = -event.wheelDelta || 0), 1 === event.deltaMode && (deltaX *= 40, deltaY *= 40), !options.touchpadSupport && isTouchpad(deltaY) ? !0 : (Math.abs(deltaX) > 1.2 && (deltaX *= options.stepSize / 120), Math.abs(deltaY) > 1.2 && (deltaY *= options.stepSize / 120), scrollArray(overflowing, deltaX, deltaY), event.preventDefault(), void scheduleClearCache())
        }

        function keydown(event) {
            var target = event.target,
                modifier = event.ctrlKey || event.altKey || event.metaKey || event.shiftKey && event.keyCode !== key.spacebar;
            document.body.contains(activeElement) || (activeElement = document.activeElement);
            var inputNodeNames = /^(textarea|select|embed|object)$/i,
                buttonTypes = /^(button|submit|radio|checkbox|file|color|image)$/i;
            if (inputNodeNames.test(target.nodeName) || isNodeName(target, "input") && !buttonTypes.test(target.type) || isNodeName(activeElement, "video") || isInsideYoutubeVideo(event) || target.isContentEditable || event.defaultPrevented || modifier) return !0;
            if ((isNodeName(target, "button") || isNodeName(target, "input") && buttonTypes.test(target.type)) && event.keyCode === key.spacebar) return !0;
            var shift, x = 0,
                y = 0,
                elem = overflowingAncestor(activeElement),
                clientHeight = elem.clientHeight;
            switch (elem == document.body && (clientHeight = window.innerHeight), event.keyCode) {
                case key.up:
                    y = -options.arrowScroll;
                    break;
                case key.down:
                    y = options.arrowScroll;
                    break;
                case key.spacebar:
                    shift = event.shiftKey ? 1 : -1, y = -shift * clientHeight * .9;
                    break;
                case key.pageup:
                    y = .9 * -clientHeight;
                    break;
                case key.pagedown:
                    y = .9 * clientHeight;
                    break;
                case key.home:
                    y = -elem.scrollTop;
                    break;
                case key.end:
                    var damt = elem.scrollHeight - elem.scrollTop - clientHeight;
                    y = damt > 0 ? damt + 10 : 0;
                    break;
                case key.left:
                    x = -options.arrowScroll;
                    break;
                case key.right:
                    x = options.arrowScroll;
                    break;
                default:
                    return !0
            }
            scrollArray(elem, x, y), event.preventDefault(), scheduleClearCache()
        }

        function mousedown(event) {
            activeElement = event.target
        }

        function scheduleClearCache() {
            clearTimeout(clearCacheTimer), clearCacheTimer = setInterval(function () {
                cache = {}
            }, 1e3)
        }

        function setCache(elems, overflowing) {
            for (var i = elems.length; i--;) cache[uniqueID(elems[i])] = overflowing;
            return overflowing
        }

        function overflowingAncestor(el) {
            var elems = [],
                body = document.body,
                rootScrollHeight = root.scrollHeight;
            do {
                var cached = cache[uniqueID(el)];
                if (cached) return setCache(elems, cached);
                if (elems.push(el), rootScrollHeight === el.scrollHeight) {
                    var topOverflowsNotHidden = overflowNotHidden(root) && overflowNotHidden(body),
                        isOverflowCSS = topOverflowsNotHidden || overflowAutoOrScroll(root);
                    if (isFrame && isContentOverflowing(root) || !isFrame && isOverflowCSS) return setCache(elems, getScrollRoot())
                } else if (isContentOverflowing(el) && overflowAutoOrScroll(el)) return setCache(elems, el)
            } while (el = el.parentElement)
        }

        function isContentOverflowing(el) {
            return el.clientHeight + 10 < el.scrollHeight
        }

        function overflowNotHidden(el) {
            var overflow = getComputedStyle(el, "").getPropertyValue("overflow-y");
            return "hidden" !== overflow
        }

        function overflowAutoOrScroll(el) {
            var overflow = getComputedStyle(el, "").getPropertyValue("overflow-y");
            return "scroll" === overflow || "auto" === overflow
        }

        function addEvent(type, fn) {
            window.addEventListener(type, fn, !1)
        }

        function removeEvent(type, fn) {
            window.removeEventListener(type, fn, !1)
        }

        function isNodeName(el, tag) {
            return (el.nodeName || "").toLowerCase() === tag.toLowerCase()
        }

        function directionCheck(x, y) {
            x = x > 0 ? 1 : -1, y = y > 0 ? 1 : -1, (direction.x !== x || direction.y !== y) && (direction.x = x, direction.y = y, que = [], lastScroll = 0)
        }

        function isTouchpad(deltaY) {
            return deltaY ? (deltaBuffer.length || (deltaBuffer = [deltaY, deltaY, deltaY]), deltaY = Math.abs(deltaY), deltaBuffer.push(deltaY), deltaBuffer.shift(), clearTimeout(deltaBufferTimer), deltaBufferTimer = setTimeout(function () {
                window.localStorage && (localStorage.SS_deltaBuffer = deltaBuffer.join(","))
            }, 1e3), !allDeltasDivisableBy(120) && !allDeltasDivisableBy(100)) : void 0
        }

        function isDivisible(n, divisor) {
            return Math.floor(n / divisor) == n / divisor
        }

        function allDeltasDivisableBy(divisor) {
            return isDivisible(deltaBuffer[0], divisor) && isDivisible(deltaBuffer[1], divisor) && isDivisible(deltaBuffer[2], divisor)
        }

        function isInsideYoutubeVideo(event) {
            var elem = event.target,
                isControl = !1;
            if (-1 != document.URL.indexOf("www.youtube.com/watch"))
                do
                    if (isControl = elem.classList && elem.classList.contains("html5-video-controls")) break; while (elem = elem.parentNode);
            return isControl
        }

        function pulse_(x) {
            var val, start, expx;
            return x *= options.pulseScale, 1 > x ? val = x - (1 - Math.exp(-x)) : (start = Math.exp(-1), x -= 1, expx = 1 - Math.exp(-x), val = start + expx * (1 - start)), val * options.pulseNormalize
        }

        function pulse(x) {
            return x >= 1 ? 1 : 0 >= x ? 0 : (1 == options.pulseNormalize && (options.pulseNormalize /= pulse_(1)), pulse_(x))
        }

        function SmoothScroll(optionsToSet) {
            for (var key in optionsToSet) defaultOptions.hasOwnProperty(key) && (options[key] = optionsToSet[key])
        }
        var activeElement, observer, refreshSize, clearCacheTimer, deltaBufferTimer, defaultOptions = {
            frameRate: 150,
            animationTime: 400,
            stepSize: 100,
            pulseAlgorithm: !0,
            pulseScale: 4,
            pulseNormalize: 1,
            accelerationDelta: 50,
            accelerationMax: 3,
            keyboardSupport: !0,
            arrowScroll: 50,
            touchpadSupport: !1,
            fixedBackground: !0,
            excluded: ""
        },
            options = defaultOptions,
            isExcluded = !1,
            isFrame = !1,
            direction = {
                x: 0,
                y: 0
            },
            initDone = !1,
            root = document.documentElement,
            deltaBuffer = [],
            isMac = /^Mac/.test(navigator.platform),
            key = {
                left: 37,
                up: 38,
                right: 39,
                down: 40,
                spacebar: 32,
                pageup: 33,
                pagedown: 34,
                end: 35,
                home: 36
            },
            que = [],
            pending = !1,
            lastScroll = Date.now(),
            uniqueID = function () {
                var i = 0;
                return function (el) {
                    return el.uniqueID || (el.uniqueID = i++)
                }
            }(),
            cache = {};
        window.localStorage && localStorage.SS_deltaBuffer && (deltaBuffer = localStorage.SS_deltaBuffer.split(","));
        var wheelEvent, requestFrame = function () {
            return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback, element, delay) {
                window.setTimeout(callback, delay || 1e3 / 60)
            }
        }(),
            MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver,
            getScrollRoot = function () {
                var SCROLL_ROOT;
                return function () {
                    if (!SCROLL_ROOT) {
                        var dummy = document.createElement("div");
                        dummy.style.cssText = "height:10000px;width:1px;", document.body.appendChild(dummy); {
                            var bodyScrollTop = document.body.scrollTop;
                            document.documentElement.scrollTop
                        }
                        window.scrollBy(0, 3), SCROLL_ROOT = document.body.scrollTop != bodyScrollTop ? document.body : document.documentElement, window.scrollBy(0, -3), document.body.removeChild(dummy)
                    }
                    return SCROLL_ROOT
                }
            }(),
            userAgent = window.navigator.userAgent,
            isEdge = /Edge/.test(userAgent),
            isChrome = /chrome/i.test(userAgent) && !isEdge,
            isSafari = /safari/i.test(userAgent) && !isEdge,
            isMobile = /mobile/i.test(userAgent),
            isIEWin7 = /Windows NT 6.1/i.test(userAgent) && /rv:11/i.test(userAgent),
            isEnabledForBrowser = (isChrome || isSafari || isIEWin7) && !isMobile;
        "onwheel" in document.createElement("div") ? wheelEvent = "wheel" : "onmousewheel" in document.createElement("div") && (wheelEvent = "mousewheel"), wheelEvent && isEnabledForBrowser && (addEvent(wheelEvent, wheel), addEvent("mousedown", mousedown), addEvent("load", init)), SmoothScroll.destroy = cleanup, window.SmoothScrollOptions && SmoothScroll(window.SmoothScrollOptions), "function" == typeof define && define.amd ? define(function () {
            return SmoothScroll
        }) : "object" == typeof exports ? module.exports = SmoothScroll : window.SmoothScroll = SmoothScroll
    }(),
    function ($) {
        function appeared(selector) {
            return $(selector).filter(function () {
                return $(this).is(":appeared")
            })
        }

        function process() {
            check_lock = !1;
            for (var index = 0, selectorsLength = selectors.length; selectorsLength > index; index++) {
                var $appeared = appeared(selectors[index]);
                if ($appeared.trigger("appear", [$appeared]), $prior_appeared[index]) {
                    var $disappeared = $prior_appeared[index].not($appeared);
                    $disappeared.trigger("disappear", [$disappeared])
                }
                $prior_appeared[index] = $appeared
            }
        }

        function add_selector(selector) {
            selectors.push(selector), $prior_appeared.push()
        }
        var selectors = [],
            check_binded = !1,
            check_lock = !1,
            defaults = {
                interval: 250,
                force_process: !1
            },
            $window = $(window),
            $prior_appeared = [];
        $.expr[":"].appeared = function (element) {
            var $element = $(element);
            if (!$element.is(":visible")) return !1;
            var window_left = $window.scrollLeft(),
                window_top = $window.scrollTop(),
                offset = $element.offset(),
                left = offset.left,
                top = offset.top;
            return top + $element.height() >= window_top && top - ($element.data("appear-top-offset") || 0) <= window_top + $window.height() && left + $element.width() >= window_left && left - ($element.data("appear-left-offset") || 0) <= window_left + $window.width() ? !0 : !1
        }, $.fn.extend({
            appear: function (options) {
                var opts = $.extend({}, defaults, options || {}),
                    selector = this.selector || this;
                if (!check_binded) {
                    var on_check = function () {
                        check_lock || (check_lock = !0, setTimeout(process, opts.interval))
                    };
                    $(window).scroll(on_check).resize(on_check), check_binded = !0
                }
                return opts.force_process && setTimeout(process, opts.interval), add_selector(selector), $(selector)
            }
        }), $.extend({
            force_appear: function () {
                return check_binded ? (process(), !0) : !1
            }
        })
    }(function () {
        return "undefined" != typeof module ? require("jquery") : jQuery
    }()),
    function () {
        var a, b, c, d, e, f = function (a, b) {
            return function () {
                return a.apply(b, arguments)
            }
        },
            g = [].indexOf || function (a) {
                for (var b = 0, c = this.length; c > b; b++)
                    if (b in this && this[b] === a) return b;
                return -1
            };
        b = function () {
            function a() { }
            return a.prototype.extend = function (a, b) {
                var c, d;
                for (c in b) d = b[c], null == a[c] && (a[c] = d);
                return a
            }, a.prototype.isMobile = function (a) {
                return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(a)
            }, a.prototype.createEvent = function (a, b, c, d) {
                var e;
                return null == b && (b = !1), null == c && (c = !1), null == d && (d = null), null != document.createEvent ? (e = document.createEvent("CustomEvent"), e.initCustomEvent(a, b, c, d)) : null != document.createEventObject ? (e = document.createEventObject(), e.eventType = a) : e.eventName = a, e
            }, a.prototype.emitEvent = function (a, b) {
                return null != a.dispatchEvent ? a.dispatchEvent(b) : b in (null != a) ? a[b]() : "on" + b in (null != a) ? a["on" + b]() : void 0
            }, a.prototype.addEvent = function (a, b, c) {
                return null != a.addEventListener ? a.addEventListener(b, c, !1) : null != a.attachEvent ? a.attachEvent("on" + b, c) : a[b] = c
            }, a.prototype.removeEvent = function (a, b, c) {
                return null != a.removeEventListener ? a.removeEventListener(b, c, !1) : null != a.detachEvent ? a.detachEvent("on" + b, c) : delete a[b]
            }, a.prototype.innerHeight = function () {
                return "innerHeight" in window ? window.innerHeight : document.documentElement.clientHeight
            }, a
        }(), c = this.WeakMap || this.MozWeakMap || (c = function () {
            function a() {
                this.keys = [], this.values = []
            }
            return a.prototype.get = function (a) {
                var b, c, d, e, f;
                for (f = this.keys, b = d = 0, e = f.length; e > d; b = ++d)
                    if (c = f[b], c === a) return this.values[b]
            }, a.prototype.set = function (a, b) {
                var c, d, e, f, g;
                for (g = this.keys, c = e = 0, f = g.length; f > e; c = ++e)
                    if (d = g[c], d === a) return void (this.values[c] = b);
                return this.keys.push(a), this.values.push(b)
            }, a
        }()), a = this.MutationObserver || this.WebkitMutationObserver || this.MozMutationObserver || (a = function () {
            function a() {
                "undefined" != typeof console && null !== console && console.warn("MutationObserver is not supported by your browser."), "undefined" != typeof console && null !== console && console.warn("WOW.js cannot detect dom mutations, please call .sync() after loading new content.")
            }
            return a.notSupported = !0, a.prototype.observe = function () { }, a
        }()), d = this.getComputedStyle || function (a) {
            return this.getPropertyValue = function (b) {
                var c;
                return "float" === b && (b = "styleFloat"), e.test(b) && b.replace(e, function (a, b) {
                    return b.toUpperCase()
                }), (null != (c = a.currentStyle) ? c[b] : void 0) || null
            }, this
        }, e = /(\-([a-z]){1})/g, this.WOW = function () {
            function e(a) {
                null == a && (a = {}), this.scrollCallback = f(this.scrollCallback, this), this.scrollHandler = f(this.scrollHandler, this), this.resetAnimation = f(this.resetAnimation, this), this.start = f(this.start, this), this.scrolled = !0, this.config = this.util().extend(a, this.defaults), null != a.scrollContainer && (this.config.scrollContainer = document.querySelector(a.scrollContainer)), this.animationNameCache = new c, this.wowEvent = this.util().createEvent(this.config.boxClass)
            }
            return e.prototype.defaults = {
                boxClass: "wow",
                animateClass: "animated",
                offset: 0,
                mobile: !0,
                live: !0,
                callback: null,
                scrollContainer: null
            }, e.prototype.init = function () {
                var a;
                return this.element = window.document.documentElement, "interactive" === (a = document.readyState) || "complete" === a ? this.start() : this.util().addEvent(document, "DOMContentLoaded", this.start), this.finished = []
            }, e.prototype.start = function () {
                var b, c, d, e;
                if (this.stopped = !1, this.boxes = function () {
                        var a, c, d, e;
                        for (d = this.element.querySelectorAll("." + this.config.boxClass), e = [], a = 0, c = d.length; c > a; a++) b = d[a], e.push(b);
                        return e
                }.call(this), this.all = function () {
                        var a, c, d, e;
                        for (d = this.boxes, e = [], a = 0, c = d.length; c > a; a++) b = d[a], e.push(b);
                        return e
                }.call(this), this.boxes.length)
                    if (this.disabled()) this.resetStyle();
                    else
                        for (e = this.boxes, c = 0, d = e.length; d > c; c++) b = e[c], this.applyStyle(b, !0);
                return this.disabled() || (this.util().addEvent(this.config.scrollContainer || window, "scroll", this.scrollHandler), this.util().addEvent(window, "resize", this.scrollHandler), this.interval = setInterval(this.scrollCallback, 50)), this.config.live ? new a(function (a) {
                    return function (b) {
                        var c, d, e, f, g;
                        for (g = [], c = 0, d = b.length; d > c; c++) f = b[c], g.push(function () {
                            var a, b, c, d;
                            for (c = f.addedNodes || [], d = [], a = 0, b = c.length; b > a; a++) e = c[a], d.push(this.doSync(e));
                            return d
                        }.call(a));
                        return g
                    }
                }(this)).observe(document.body, {
                    childList: !0,
                    subtree: !0
                }) : void 0
            }, e.prototype.stop = function () {
                return this.stopped = !0, this.util().removeEvent(this.config.scrollContainer || window, "scroll", this.scrollHandler), this.util().removeEvent(window, "resize", this.scrollHandler), null != this.interval ? clearInterval(this.interval) : void 0
            }, e.prototype.sync = function () {
                return a.notSupported ? this.doSync(this.element) : void 0
            }, e.prototype.doSync = function (a) {
                var b, c, d, e, f;
                if (null == a && (a = this.element), 1 === a.nodeType) {
                    for (a = a.parentNode || a, e = a.querySelectorAll("." + this.config.boxClass), f = [], c = 0, d = e.length; d > c; c++) b = e[c], g.call(this.all, b) < 0 ? (this.boxes.push(b), this.all.push(b), this.stopped || this.disabled() ? this.resetStyle() : this.applyStyle(b, !0), f.push(this.scrolled = !0)) : f.push(void 0);
                    return f
                }
            }, e.prototype.show = function (a) {
                return this.applyStyle(a), a.className = a.className + " " + this.config.animateClass, null != this.config.callback && this.config.callback(a), this.util().emitEvent(a, this.wowEvent), this.util().addEvent(a, "animationend", this.resetAnimation), this.util().addEvent(a, "oanimationend", this.resetAnimation), this.util().addEvent(a, "webkitAnimationEnd", this.resetAnimation), this.util().addEvent(a, "MSAnimationEnd", this.resetAnimation), a
            }, e.prototype.applyStyle = function (a, b) {
                var c, d, e;
                return d = a.getAttribute("data-wow-duration"), c = a.getAttribute("data-wow-delay"), e = a.getAttribute("data-wow-iteration"), this.animate(function (f) {
                    return function () {
                        return f.customStyle(a, b, d, c, e)
                    }
                }(this))
            }, e.prototype.animate = function () {
                return "requestAnimationFrame" in window ? function (a) {
                    return window.requestAnimationFrame(a)
                } : function (a) {
                    return a()
                }
            }(), e.prototype.resetStyle = function () {
                var a, b, c, d, e;
                for (d = this.boxes, e = [], b = 0, c = d.length; c > b; b++) a = d[b], e.push(a.style.visibility = "visible");
                return e
            }, e.prototype.resetAnimation = function (a) {
                var b;
                return a.type.toLowerCase().indexOf("animationend") >= 0 ? (b = a.target || a.srcElement, b.className = b.className.replace(this.config.animateClass, "").trim()) : void 0
            }, e.prototype.customStyle = function (a, b, c, d, e) {
                return b && this.cacheAnimationName(a), a.style.visibility = b ? "hidden" : "visible", c && this.vendorSet(a.style, {
                    animationDuration: c
                }), d && this.vendorSet(a.style, {
                    animationDelay: d
                }), e && this.vendorSet(a.style, {
                    animationIterationCount: e
                }), this.vendorSet(a.style, {
                    animationName: b ? "none" : this.cachedAnimationName(a)
                }), a
            }, e.prototype.vendors = ["moz", "webkit"], e.prototype.vendorSet = function (a, b) {
                var c, d, e, f;
                d = [];
                for (c in b) e = b[c], a["" + c] = e, d.push(function () {
                    var b, d, g, h;
                    for (g = this.vendors, h = [], b = 0, d = g.length; d > b; b++) f = g[b], h.push(a["" + f + c.charAt(0).toUpperCase() + c.substr(1)] = e);
                    return h
                }.call(this));
                return d
            }, e.prototype.vendorCSS = function (a, b) {
                var c, e, f, g, h, i;
                for (h = d(a), g = h.getPropertyCSSValue(b), f = this.vendors, c = 0, e = f.length; e > c; c++) i = f[c], g = g || h.getPropertyCSSValue("-" + i + "-" + b);
                return g
            }, e.prototype.animationName = function (a) {
                var b;
                try {
                    b = this.vendorCSS(a, "animation-name").cssText
                } catch (c) {
                    b = d(a).getPropertyValue("animation-name")
                }
                return "none" === b ? "" : b
            }, e.prototype.cacheAnimationName = function (a) {
                return this.animationNameCache.set(a, this.animationName(a))
            }, e.prototype.cachedAnimationName = function (a) {
                return this.animationNameCache.get(a)
            }, e.prototype.scrollHandler = function () {
                return this.scrolled = !0
            }, e.prototype.scrollCallback = function () {
                var a;
                return !this.scrolled || (this.scrolled = !1, this.boxes = function () {
                    var b, c, d, e;
                    for (d = this.boxes, e = [], b = 0, c = d.length; c > b; b++) a = d[b], a && (this.isVisible(a) ? this.show(a) : e.push(a));
                    return e
                }.call(this), this.boxes.length || this.config.live) ? void 0 : this.stop()
            }, e.prototype.offsetTop = function (a) {
                for (var b; void 0 === a.offsetTop;) a = a.parentNode;
                for (b = a.offsetTop; a = a.offsetParent;) b += a.offsetTop;
                return b
            }, e.prototype.isVisible = function (a) {
                var b, c, d, e, f;
                return c = a.getAttribute("data-wow-offset") || this.config.offset, f = this.config.scrollContainer && this.config.scrollContainer.scrollTop || window.pageYOffset, e = f + Math.min(this.element.clientHeight, this.util().innerHeight()) - c, d = this.offsetTop(a), b = d + a.clientHeight, e >= d && b >= f
            }, e.prototype.util = function () {
                return null != this._util ? this._util : this._util = new b
            }, e.prototype.disabled = function () {
                return !this.config.mobile && this.util().isMobile(navigator.userAgent)
            }, e
        }()
    }.call(this),
        function () {
            var t = [].indexOf || function (t) {
                for (var e = 0, n = this.length; n > e; e++)
                    if (e in this && this[e] === t) return e;
                return -1
            },
                e = [].slice;
            ! function (t, e) {
                return "function" == typeof define && define.amd ? define("waypoints", ["jquery"], function (n) {
                    return e(n, t)
                }) : e(t.jQuery, t)
            }(window, function (n, r) {
                var i, o, l, s, f, u, c, a, h, d, p, y, v, w, g, m;
                return i = n(r), a = t.call(r, "ontouchstart") >= 0, s = {
                    horizontal: {},
                    vertical: {}
                }, f = 1, c = {}, u = "waypoints-context-id", p = "resize.waypoints", y = "scroll.waypoints", v = 1, w = "waypoints-waypoint-ids", g = "waypoint", m = "waypoints", o = function () {
                    function t(t) {
                        var e = this;
                        this.$element = t, this.element = t[0], this.didResize = !1, this.didScroll = !1, this.id = "context" + f++, this.oldScroll = {
                            x: t.scrollLeft(),
                            y: t.scrollTop()
                        }, this.waypoints = {
                            horizontal: {},
                            vertical: {}
                        }, this.element[u] = this.id, c[this.id] = this, t.bind(y, function () {
                            var t;
                            return e.didScroll || a ? void 0 : (e.didScroll = !0, t = function () {
                                return e.doScroll(), e.didScroll = !1
                            }, r.setTimeout(t, n[m].settings.scrollThrottle))
                        }), t.bind(p, function () {
                            var t;
                            return e.didResize ? void 0 : (e.didResize = !0, t = function () {
                                return n[m]("refresh"), e.didResize = !1
                            }, r.setTimeout(t, n[m].settings.resizeThrottle))
                        })
                    }
                    return t.prototype.doScroll = function () {
                        var t, e = this;
                        return t = {
                            horizontal: {
                                newScroll: this.$element.scrollLeft(),
                                oldScroll: this.oldScroll.x,
                                forward: "right",
                                backward: "left"
                            },
                            vertical: {
                                newScroll: this.$element.scrollTop(),
                                oldScroll: this.oldScroll.y,
                                forward: "down",
                                backward: "up"
                            }
                        }, !a || t.vertical.oldScroll && t.vertical.newScroll || n[m]("refresh"), n.each(t, function (t, r) {
                            var i, o, l;
                            return l = [], o = r.newScroll > r.oldScroll, i = o ? r.forward : r.backward, n.each(e.waypoints[t], function (t, e) {
                                var n, i;
                                return r.oldScroll < (n = e.offset) && n <= r.newScroll ? l.push(e) : r.newScroll < (i = e.offset) && i <= r.oldScroll ? l.push(e) : void 0
                            }), l.sort(function (t, e) {
                                return t.offset - e.offset
                            }), o || l.reverse(), n.each(l, function (t, e) {
                                return e.options.continuous || t === l.length - 1 ? e.trigger([i]) : void 0
                            })
                        }), this.oldScroll = {
                            x: t.horizontal.newScroll,
                            y: t.vertical.newScroll
                        }
                    }, t.prototype.refresh = function () {
                        var t, e, r, i = this;
                        return r = n.isWindow(this.element), e = this.$element.offset(), this.doScroll(), t = {
                            horizontal: {
                                contextOffset: r ? 0 : e.left,
                                contextScroll: r ? 0 : this.oldScroll.x,
                                contextDimension: this.$element.width(),
                                oldScroll: this.oldScroll.x,
                                forward: "right",
                                backward: "left",
                                offsetProp: "left"
                            },
                            vertical: {
                                contextOffset: r ? 0 : e.top,
                                contextScroll: r ? 0 : this.oldScroll.y,
                                contextDimension: r ? n[m]("viewportHeight") : this.$element.height(),
                                oldScroll: this.oldScroll.y,
                                forward: "down",
                                backward: "up",
                                offsetProp: "top"
                            }
                        }, n.each(t, function (t, e) {
                            return n.each(i.waypoints[t], function (t, r) {
                                var i, o, l, s, f;
                                return i = r.options.offset, l = r.offset, o = n.isWindow(r.element) ? 0 : r.$element.offset()[e.offsetProp], n.isFunction(i) ? i = i.apply(r.element) : "string" == typeof i && (i = parseFloat(i), r.options.offset.indexOf("%") > -1 && (i = Math.ceil(e.contextDimension * i / 100))), r.offset = o - e.contextOffset + e.contextScroll - i, r.options.onlyOnScroll && null != l || !r.enabled ? void 0 : null !== l && l < (s = e.oldScroll) && s <= r.offset ? r.trigger([e.backward]) : null !== l && l > (f = e.oldScroll) && f >= r.offset ? r.trigger([e.forward]) : null === l && e.oldScroll >= r.offset ? r.trigger([e.forward]) : void 0
                            })
                        })
                    }, t.prototype.checkEmpty = function () {
                        return n.isEmptyObject(this.waypoints.horizontal) && n.isEmptyObject(this.waypoints.vertical) ? (this.$element.unbind([p, y].join(" ")), delete c[this.id]) : void 0
                    }, t
                }(), l = function () {
                    function t(t, e, r) {
                        var i, o;
                        "bottom-in-view" === r.offset && (r.offset = function () {
                            var t;
                            return t = n[m]("viewportHeight"), n.isWindow(e.element) || (t = e.$element.height()), t - n(this).outerHeight()
                        }), this.$element = t, this.element = t[0], this.axis = r.horizontal ? "horizontal" : "vertical", this.callback = r.handler, this.context = e, this.enabled = r.enabled, this.id = "waypoints" + v++, this.offset = null, this.options = r, e.waypoints[this.axis][this.id] = this, s[this.axis][this.id] = this, i = null != (o = this.element[w]) ? o : [], i.push(this.id), this.element[w] = i
                    }
                    return t.prototype.trigger = function (t) {
                        return this.enabled ? (null != this.callback && this.callback.apply(this.element, t), this.options.triggerOnce ? this.destroy() : void 0) : void 0
                    }, t.prototype.disable = function () {
                        return this.enabled = !1
                    }, t.prototype.enable = function () {
                        return this.context.refresh(), this.enabled = !0
                    }, t.prototype.destroy = function () {
                        return delete s[this.axis][this.id], delete this.context.waypoints[this.axis][this.id], this.context.checkEmpty()
                    }, t.getWaypointsByElement = function (t) {
                        var e, r;
                        return (r = t[w]) ? (e = n.extend({}, s.horizontal, s.vertical), n.map(r, function (t) {
                            return e[t]
                        })) : []
                    }, t
                }(), d = {
                    init: function (t, e) {
                        var r;
                        return e = n.extend({}, n.fn[g].defaults, e), null == (r = e.handler) && (e.handler = t), this.each(function () {
                            var t, r, i, s;
                            return t = n(this), i = null != (s = e.context) ? s : n.fn[g].defaults.context, n.isWindow(i) || (i = t.closest(i)), i = n(i), r = c[i[0][u]], r || (r = new o(i)), new l(t, r, e)
                        }), n[m]("refresh"), this
                    },
                    disable: function () {
                        return d._invoke.call(this, "disable")
                    },
                    enable: function () {
                        return d._invoke.call(this, "enable")
                    },
                    destroy: function () {
                        return d._invoke.call(this, "destroy")
                    },
                    prev: function (t, e) {
                        return d._traverse.call(this, t, e, function (t, e, n) {
                            return e > 0 ? t.push(n[e - 1]) : void 0
                        })
                    },
                    next: function (t, e) {
                        return d._traverse.call(this, t, e, function (t, e, n) {
                            return e < n.length - 1 ? t.push(n[e + 1]) : void 0
                        })
                    },
                    _traverse: function (t, e, i) {
                        var o, l;
                        return null == t && (t = "vertical"), null == e && (e = r), l = h.aggregate(e), o = [], this.each(function () {
                            var e;
                            return e = n.inArray(this, l[t]), i(o, e, l[t])
                        }), this.pushStack(o)
                    },
                    _invoke: function (t) {
                        return this.each(function () {
                            var e;
                            return e = l.getWaypointsByElement(this), n.each(e, function (e, n) {
                                return n[t](), !0
                            })
                        }), this
                    }
                }, n.fn[g] = function () {
                    var t, r;
                    return r = arguments[0], t = 2 <= arguments.length ? e.call(arguments, 1) : [], d[r] ? d[r].apply(this, t) : n.isFunction(r) ? d.init.apply(this, arguments) : n.isPlainObject(r) ? d.init.apply(this, [null, r]) : n.error(r ? "The " + r + " method does not exist in jQuery Waypoints." : "jQuery Waypoints needs a callback function or handler option.")
                }, n.fn[g].defaults = {
                    context: r,
                    continuous: !0,
                    enabled: !0,
                    horizontal: !1,
                    offset: 0,
                    triggerOnce: !1
                }, h = {
                    refresh: function () {
                        return n.each(c, function (t, e) {
                            return e.refresh()
                        })
                    },
                    viewportHeight: function () {
                        var t;
                        return null != (t = r.innerHeight) ? t : i.height()
                    },
                    aggregate: function (t) {
                        var e, r, i;
                        return e = s, t && (e = null != (i = c[n(t)[0][u]]) ? i.waypoints : void 0), e ? (r = {
                            horizontal: [],
                            vertical: []
                        }, n.each(r, function (t, i) {
                            return n.each(e[t], function (t, e) {
                                return i.push(e)
                            }), i.sort(function (t, e) {
                                return t.offset - e.offset
                            }), r[t] = n.map(i, function (t) {
                                return t.element
                            }), r[t] = n.unique(r[t])
                        }), r) : []
                    },
                    above: function (t) {
                        return null == t && (t = r), h._filter(t, "vertical", function (t, e) {
                            return e.offset <= t.oldScroll.y
                        })
                    },
                    below: function (t) {
                        return null == t && (t = r), h._filter(t, "vertical", function (t, e) {
                            return e.offset > t.oldScroll.y
                        })
                    },
                    left: function (t) {
                        return null == t && (t = r), h._filter(t, "horizontal", function (t, e) {
                            return e.offset <= t.oldScroll.x
                        })
                    },
                    right: function (t) {
                        return null == t && (t = r), h._filter(t, "horizontal", function (t, e) {
                            return e.offset > t.oldScroll.x
                        })
                    },
                    enable: function () {
                        return h._invoke("enable")
                    },
                    disable: function () {
                        return h._invoke("disable")
                    },
                    destroy: function () {
                        return h._invoke("destroy")
                    },
                    extendFn: function (t, e) {
                        return d[t] = e
                    },
                    _invoke: function (t) {
                        var e;
                        return e = n.extend({}, s.vertical, s.horizontal), n.each(e, function (e, n) {
                            return n[t](), !0
                        })
                    },
                    _filter: function (t, e, r) {
                        var i, o;
                        return (i = c[n(t)[0][u]]) ? (o = [], n.each(i.waypoints[e], function (t, e) {
                            return r(i, e) ? o.push(e) : void 0
                        }), o.sort(function (t, e) {
                            return t.offset - e.offset
                        }), n.map(o, function (t) {
                            return t.element
                        })) : []
                    }
                }, n[m] = function () {
                    var t, n;
                    return n = arguments[0], t = 2 <= arguments.length ? e.call(arguments, 1) : [], h[n] ? h[n].apply(null, t) : h.aggregate.call(null, n)
                }, n[m].settings = {
                    resizeThrottle: 100,
                    scrollThrottle: 30
                }, i.on("load.waypoints", function () {
                    return n[m]("refresh")
                })
            })
        }.call(this),
        function ($) {
            function formatter(value, settings) {
                return value.toFixed(settings.decimals)
            }
            $.fn.countTo = function (options) {
                return options = options || {}, $(this).each(function () {
                    function updateTimer() {
                        value += increment, loopCount++, render(value), "function" == typeof settings.onUpdate && settings.onUpdate.call(self, value), loopCount >= loops && ($self.removeData("countTo"), clearInterval(data.interval), value = settings.to, "function" == typeof settings.onComplete && settings.onComplete.call(self, value))
                    }

                    function render(value) {
                        var formattedValue = settings.formatter.call(self, value, settings);
                        $self.text(formattedValue)
                    }
                    var settings = $.extend({}, $.fn.countTo.defaults, {
                        from: $(this).data("from"),
                        to: $(this).data("to"),
                        speed: $(this).data("speed"),
                        refreshInterval: $(this).data("refresh-interval"),
                        decimals: $(this).data("decimals")
                    }, options),
                        loops = Math.ceil(settings.speed / settings.refreshInterval),
                        increment = (settings.to - settings.from) / loops,
                        self = this,
                        $self = $(this),
                        loopCount = 0,
                        value = settings.from,
                        data = $self.data("countTo") || {};
                    $self.data("countTo", data), data.interval && clearInterval(data.interval), data.interval = setInterval(updateTimer, settings.refreshInterval), render(value)
                })
            }, $.fn.countTo.defaults = {
                from: 0,
                to: 0,
                speed: 1e3,
                refreshInterval: 100,
                decimals: 0,
                formatter: formatter,
                onUpdate: null,
                onComplete: null
            }
        }(jQuery), ! function (a, b, c, d) {
            function e(b, c) {
                this.settings = null, this.options = a.extend({}, e.Defaults, c), this.$element = a(b), this.drag = a.extend({}, m), this.state = a.extend({}, n), this.e = a.extend({}, o), this._plugins = {}, this._supress = {}, this._current = null, this._speed = null, this._coordinates = [], this._breakpoint = null, this._width = null, this._items = [], this._clones = [], this._mergers = [], this._invalidated = {}, this._pipe = [], a.each(e.Plugins, a.proxy(function (a, b) {
                    this._plugins[a[0].toLowerCase() + a.slice(1)] = new b(this)
                }, this)), a.each(e.Pipe, a.proxy(function (b, c) {
                    this._pipe.push({
                        filter: c.filter,
                        run: a.proxy(c.run, this)
                    })
                }, this)), this.setup(), this.initialize()
            }

            function f(a) {
                if (a.touches !== d) return {
                    x: a.touches[0].pageX,
                    y: a.touches[0].pageY
                };
                if (a.touches === d) {
                    if (a.pageX !== d) return {
                        x: a.pageX,
                        y: a.pageY
                    };
                    if (a.pageX === d) return {
                        x: a.clientX,
                        y: a.clientY
                    }
                }
            }

            function g(a) {
                var b, d, e = c.createElement("div"),
                    f = a;
                for (b in f)
                    if (d = f[b], "undefined" != typeof e.style[d]) return e = null, [d, b];
                return [!1]
            }

            function h() {
                return g(["transition", "WebkitTransition", "MozTransition", "OTransition"])[1]
            }

            function i() {
                return g(["transform", "WebkitTransform", "MozTransform", "OTransform", "msTransform"])[0]
            }

            function j() {
                return g(["perspective", "webkitPerspective", "MozPerspective", "OPerspective", "MsPerspective"])[0]
            }

            function k() {
                return "ontouchstart" in b || !!navigator.msMaxTouchPoints
            }

            function l() {
                return b.navigator.msPointerEnabled
            }
            var m, n, o;
            m = {
                start: 0,
                startX: 0,
                startY: 0,
                current: 0,
                currentX: 0,
                currentY: 0,
                offsetX: 0,
                offsetY: 0,
                distance: null,
                startTime: 0,
                endTime: 0,
                updatedX: 0,
                targetEl: null
            }, n = {
                isTouch: !1,
                isScrolling: !1,
                isSwiping: !1,
                direction: !1,
                inMotion: !1
            }, o = {
                _onDragStart: null,
                _onDragMove: null,
                _onDragEnd: null,
                _transitionEnd: null,
                _resizer: null,
                _responsiveCall: null,
                _goToLoop: null,
                _checkVisibile: null
            }, e.Defaults = {
                items: 3,
                loop: !1,
                center: !1,
                mouseDrag: !0,
                touchDrag: !0,
                pullDrag: !0,
                freeDrag: !1,
                margin: 0,
                stagePadding: 0,
                merge: !1,
                mergeFit: !0,
                autoWidth: !1,
                startPosition: 0,
                rtl: !1,
                smartSpeed: 250,
                fluidSpeed: !1,
                dragEndSpeed: !1,
                responsive: {},
                responsiveRefreshRate: 200,
                responsiveBaseElement: b,
                responsiveClass: !1,
                fallbackEasing: "swing",
                info: !1,
                nestedItemSelector: !1,
                itemElement: "div",
                stageElement: "div",
                themeClass: "owl-theme",
                baseClass: "owl-carousel",
                itemClass: "owl-item",
                centerClass: "center",
                activeClass: "active"
            }, e.Width = {
                Default: "default",
                Inner: "inner",
                Outer: "outer"
            }, e.Plugins = {}, e.Pipe = [{
                filter: ["width", "items", "settings"],
                run: function (a) {
                    a.current = this._items && this._items[this.relative(this._current)]
                }
            }, {
                filter: ["items", "settings"],
                run: function () {
                    var a = this._clones,
                        b = this.$stage.children(".cloned");
                    (b.length !== a.length || !this.settings.loop && a.length > 0) && (this.$stage.children(".cloned").remove(), this._clones = [])
                }
            }, {
                filter: ["items", "settings"],
                run: function () {
                    var a, b, c = this._clones,
                        d = this._items,
                        e = this.settings.loop ? c.length - Math.max(2 * this.settings.items, 4) : 0;
                    for (a = 0, b = Math.abs(e / 2) ; b > a; a++) e > 0 ? (this.$stage.children().eq(d.length + c.length - 1).remove(), c.pop(), this.$stage.children().eq(0).remove(), c.pop()) : (c.push(c.length / 2), this.$stage.append(d[c[c.length - 1]].clone().addClass("cloned")), c.push(d.length - 1 - (c.length - 1) / 2), this.$stage.prepend(d[c[c.length - 1]].clone().addClass("cloned")))
                }
            }, {
                filter: ["width", "items", "settings"],
                run: function () {
                    var a, b, c, d = this.settings.rtl ? 1 : -1,
                        e = (this.width() / this.settings.items).toFixed(3),
                        f = 0;
                    for (this._coordinates = [], b = 0, c = this._clones.length + this._items.length; c > b; b++) a = this._mergers[this.relative(b)], a = this.settings.mergeFit && Math.min(a, this.settings.items) || a, f += (this.settings.autoWidth ? this._items[this.relative(b)].width() + this.settings.margin : e * a) * d, this._coordinates.push(f)
                }
            }, {
                filter: ["width", "items", "settings"],
                run: function () {
                    var b, c, d = (this.width() / this.settings.items).toFixed(3),
                        e = {
                            width: Math.abs(this._coordinates[this._coordinates.length - 1]) + 2 * this.settings.stagePadding,
                            "padding-left": this.settings.stagePadding || "",
                            "padding-right": this.settings.stagePadding || ""
                        };
                    if (this.$stage.css(e), e = {
                        width: this.settings.autoWidth ? "auto" : d - this.settings.margin
                    }, e[this.settings.rtl ? "margin-left" : "margin-right"] = this.settings.margin, !this.settings.autoWidth && a.grep(this._mergers, function (a) {
                            return a > 1
                    }).length > 0)
                        for (b = 0, c = this._coordinates.length; c > b; b++) e.width = Math.abs(this._coordinates[b]) - Math.abs(this._coordinates[b - 1] || 0) - this.settings.margin, this.$stage.children().eq(b).css(e);
                    else this.$stage.children().css(e)
                }
            }, {
                filter: ["width", "items", "settings"],
                run: function (a) {
                    a.current && this.reset(this.$stage.children().index(a.current))
                }
            }, {
                filter: ["position"],
                run: function () {
                    this.animate(this.coordinates(this._current))
                }
            }, {
                filter: ["width", "position", "items", "settings"],
                run: function () {
                    var a, b, c, d, e = this.settings.rtl ? 1 : -1,
                        f = 2 * this.settings.stagePadding,
                        g = this.coordinates(this.current()) + f,
                        h = g + this.width() * e,
                        i = [];
                    for (c = 0, d = this._coordinates.length; d > c; c++) a = this._coordinates[c - 1] || 0, b = Math.abs(this._coordinates[c]) + f * e, (this.op(a, "<=", g) && this.op(a, ">", h) || this.op(b, "<", g) && this.op(b, ">", h)) && i.push(c);
                    this.$stage.children("." + this.settings.activeClass).removeClass(this.settings.activeClass), this.$stage.children(":eq(" + i.join("), :eq(") + ")").addClass(this.settings.activeClass), this.settings.center && (this.$stage.children("." + this.settings.centerClass).removeClass(this.settings.centerClass), this.$stage.children().eq(this.current()).addClass(this.settings.centerClass))
                }
            }], e.prototype.initialize = function () {
                if (this.trigger("initialize"), this.$element.addClass(this.settings.baseClass).addClass(this.settings.themeClass).toggleClass("owl-rtl", this.settings.rtl), this.browserSupport(), this.settings.autoWidth && this.state.imagesLoaded !== !0) {
                    var b, c, e;
                    if (b = this.$element.find("img"), c = this.settings.nestedItemSelector ? "." + this.settings.nestedItemSelector : d, e = this.$element.children(c).width(), b.length && 0 >= e) return this.preloadAutoWidthImages(b), !1
                }
                this.$element.addClass("owl-loading"), this.$stage = a("<" + this.settings.stageElement + ' class="owl-stage"/>').wrap('<div class="owl-stage-outer">'), this.$element.append(this.$stage.parent()), this.replace(this.$element.children().not(this.$stage.parent())), this._width = this.$element.width(), this.refresh(), this.$element.removeClass("owl-loading").addClass("owl-loaded"), this.eventsCall(), this.internalEvents(), this.addTriggerableEvents(), this.trigger("initialized")
            }, e.prototype.setup = function () {
                var b = this.viewport(),
                    c = this.options.responsive,
                    d = -1,
                    e = null;
                c ? (a.each(c, function (a) {
                    b >= a && a > d && (d = Number(a))
                }), e = a.extend({}, this.options, c[d]), delete e.responsive, e.responsiveClass && this.$element.attr("class", function (a, b) {
                    return b.replace(/\b owl-responsive-\S+/g, "")
                }).addClass("owl-responsive-" + d)) : e = a.extend({}, this.options), (null === this.settings || this._breakpoint !== d) && (this.trigger("change", {
                    property: {
                        name: "settings",
                        value: e
                    }
                }), this._breakpoint = d, this.settings = e, this.invalidate("settings"), this.trigger("changed", {
                    property: {
                        name: "settings",
                        value: this.settings
                    }
                }))
            }, e.prototype.optionsLogic = function () {
                this.$element.toggleClass("owl-center", this.settings.center), this.settings.loop && this._items.length < this.settings.items && (this.settings.loop = !1), this.settings.autoWidth && (this.settings.stagePadding = !1, this.settings.merge = !1)
            }, e.prototype.prepare = function (b) {
                var c = this.trigger("prepare", {
                    content: b
                });
                return c.data || (c.data = a("<" + this.settings.itemElement + "/>").addClass(this.settings.itemClass).append(b)), this.trigger("prepared", {
                    content: c.data
                }), c.data
            }, e.prototype.update = function () {
                for (var b = 0, c = this._pipe.length, d = a.proxy(function (a) {
                        return this[a]
                }, this._invalidated), e = {}; c > b;) (this._invalidated.all || a.grep(this._pipe[b].filter, d).length > 0) && this._pipe[b].run(e), b++;
                this._invalidated = {}
            }, e.prototype.width = function (a) {
                switch (a = a || e.Width.Default) {
                    case e.Width.Inner:
                    case e.Width.Outer:
                        return this._width;
                    default:
                        return this._width - 2 * this.settings.stagePadding + this.settings.margin
                }
            }, e.prototype.refresh = function () {
                return 0 === this._items.length ? !1 : ((new Date).getTime(), this.trigger("refresh"), this.setup(), this.optionsLogic(), this.$stage.addClass("owl-refresh"), this.update(), this.$stage.removeClass("owl-refresh"), this.state.orientation = b.orientation, this.watchVisibility(), this.trigger("refreshed"), void 0)
            }, e.prototype.eventsCall = function () {
                this.e._onDragStart = a.proxy(function (a) {
                    this.onDragStart(a)
                }, this), this.e._onDragMove = a.proxy(function (a) {
                    this.onDragMove(a)
                }, this), this.e._onDragEnd = a.proxy(function (a) {
                    this.onDragEnd(a)
                }, this), this.e._onResize = a.proxy(function (a) {
                    this.onResize(a)
                }, this), this.e._transitionEnd = a.proxy(function (a) {
                    this.transitionEnd(a)
                }, this), this.e._preventClick = a.proxy(function (a) {
                    this.preventClick(a)
                }, this)
            }, e.prototype.onThrottledResize = function () {
                b.clearTimeout(this.resizeTimer), this.resizeTimer = b.setTimeout(this.e._onResize, this.settings.responsiveRefreshRate)
            }, e.prototype.onResize = function () {
                return this._items.length ? this._width === this.$element.width() ? !1 : this.trigger("resize").isDefaultPrevented() ? !1 : (this._width = this.$element.width(), this.invalidate("width"), this.refresh(), void this.trigger("resized")) : !1
            }, e.prototype.eventsRouter = function (a) {
                var b = a.type;
                "mousedown" === b || "touchstart" === b ? this.onDragStart(a) : "mousemove" === b || "touchmove" === b ? this.onDragMove(a) : "mouseup" === b || "touchend" === b ? this.onDragEnd(a) : "touchcancel" === b && this.onDragEnd(a)
            }, e.prototype.internalEvents = function () {
                var c = (k(), l());
                this.settings.mouseDrag ? (this.$stage.on("mousedown", a.proxy(function (a) {
                    this.eventsRouter(a)
                }, this)), this.$stage.on("dragstart", function () {
                    return !1
                }), this.$stage.get(0).onselectstart = function () {
                    return !1
                }) : this.$element.addClass("owl-text-select-on"), this.settings.touchDrag && !c && this.$stage.on("touchstart touchcancel", a.proxy(function (a) {
                    this.eventsRouter(a)
                }, this)), this.transitionEndVendor && this.on(this.$stage.get(0), this.transitionEndVendor, this.e._transitionEnd, !1), this.settings.responsive !== !1 && this.on(b, "resize", a.proxy(this.onThrottledResize, this))
            }, e.prototype.onDragStart = function (d) {
                var e, g, h, i;
                if (e = d.originalEvent || d || b.event, 3 === e.which || this.state.isTouch) return !1;
                if ("mousedown" === e.type && this.$stage.addClass("owl-grab"), this.trigger("drag"), this.drag.startTime = (new Date).getTime(), this.speed(0), this.state.isTouch = !0, this.state.isScrolling = !1, this.state.isSwiping = !1, this.drag.distance = 0, g = f(e).x, h = f(e).y, this.drag.offsetX = this.$stage.position().left, this.drag.offsetY = this.$stage.position().top, this.settings.rtl && (this.drag.offsetX = this.$stage.position().left + this.$stage.width() - this.width() + this.settings.margin), this.state.inMotion && this.support3d) i = this.getTransformProperty(), this.drag.offsetX = i, this.animate(i), this.state.inMotion = !0;
                else if (this.state.inMotion && !this.support3d) return this.state.inMotion = !1, !1;
                this.drag.startX = g - this.drag.offsetX, this.drag.startY = h - this.drag.offsetY, this.drag.start = g - this.drag.startX, this.drag.targetEl = e.target || e.srcElement, this.drag.updatedX = this.drag.start, ("IMG" === this.drag.targetEl.tagName || "A" === this.drag.targetEl.tagName) && (this.drag.targetEl.draggable = !1), a(c).on("mousemove.owl.dragEvents mouseup.owl.dragEvents touchmove.owl.dragEvents touchend.owl.dragEvents", a.proxy(function (a) {
                    this.eventsRouter(a)
                }, this))
            }, e.prototype.onDragMove = function (a) {
                var c, e, g, h, i, j;
                this.state.isTouch && (this.state.isScrolling || (c = a.originalEvent || a || b.event, e = f(c).x, g = f(c).y, this.drag.currentX = e - this.drag.startX, this.drag.currentY = g - this.drag.startY, this.drag.distance = this.drag.currentX - this.drag.offsetX, this.drag.distance < 0 ? this.state.direction = this.settings.rtl ? "right" : "left" : this.drag.distance > 0 && (this.state.direction = this.settings.rtl ? "left" : "right"), this.settings.loop ? this.op(this.drag.currentX, ">", this.coordinates(this.minimum())) && "right" === this.state.direction ? this.drag.currentX -= (this.settings.center && this.coordinates(0)) - this.coordinates(this._items.length) : this.op(this.drag.currentX, "<", this.coordinates(this.maximum())) && "left" === this.state.direction && (this.drag.currentX += (this.settings.center && this.coordinates(0)) - this.coordinates(this._items.length)) : (h = this.coordinates(this.settings.rtl ? this.maximum() : this.minimum()), i = this.coordinates(this.settings.rtl ? this.minimum() : this.maximum()), j = this.settings.pullDrag ? this.drag.distance / 5 : 0, this.drag.currentX = Math.max(Math.min(this.drag.currentX, h + j), i + j)), (this.drag.distance > 8 || this.drag.distance < -8) && (c.preventDefault !== d ? c.preventDefault() : c.returnValue = !1, this.state.isSwiping = !0), this.drag.updatedX = this.drag.currentX, (this.drag.currentY > 16 || this.drag.currentY < -16) && this.state.isSwiping === !1 && (this.state.isScrolling = !0, this.drag.updatedX = this.drag.start), this.animate(this.drag.updatedX)))
            }, e.prototype.onDragEnd = function (b) {
                var d, e, f;
                if (this.state.isTouch) {
                    if ("mouseup" === b.type && this.$stage.removeClass("owl-grab"), this.trigger("dragged"), this.drag.targetEl.removeAttribute("draggable"), this.state.isTouch = !1, this.state.isScrolling = !1, this.state.isSwiping = !1, 0 === this.drag.distance && this.state.inMotion !== !0) return this.state.inMotion = !1, !1;
                    this.drag.endTime = (new Date).getTime(), d = this.drag.endTime - this.drag.startTime, e = Math.abs(this.drag.distance), (e > 3 || d > 300) && this.removeClick(this.drag.targetEl), f = this.closest(this.drag.updatedX), this.speed(this.settings.dragEndSpeed || this.settings.smartSpeed), this.current(f), this.invalidate("position"), this.update(), this.settings.pullDrag || this.drag.updatedX !== this.coordinates(f) || this.transitionEnd(), this.drag.distance = 0, a(c).off(".owl.dragEvents")
                }
            }, e.prototype.removeClick = function (c) {
                this.drag.targetEl = c, a(c).on("click.preventClick", this.e._preventClick), b.setTimeout(function () {
                    a(c).off("click.preventClick")
                }, 300)
            }, e.prototype.preventClick = function (b) {
                b.preventDefault ? b.preventDefault() : b.returnValue = !1, b.stopPropagation && b.stopPropagation(), a(b.target).off("click.preventClick")
            }, e.prototype.getTransformProperty = function () {
                var a, c;
                return a = b.getComputedStyle(this.$stage.get(0), null).getPropertyValue(this.vendorName + "transform"), a = a.replace(/matrix(3d)?\(|\)/g, "").split(","), c = 16 === a.length, c !== !0 ? a[4] : a[12]
            }, e.prototype.closest = function (b) {
                var c = -1,
                    d = 30,
                    e = this.width(),
                    f = this.coordinates();
                return this.settings.freeDrag || a.each(f, a.proxy(function (a, g) {
                    return b > g - d && g + d > b ? c = a : this.op(b, "<", g) && this.op(b, ">", f[a + 1] || g - e) && (c = "left" === this.state.direction ? a + 1 : a), -1 === c
                }, this)), this.settings.loop || (this.op(b, ">", f[this.minimum()]) ? c = b = this.minimum() : this.op(b, "<", f[this.maximum()]) && (c = b = this.maximum())), c
            }, e.prototype.animate = function (b) {
                this.trigger("translate"), this.state.inMotion = this.speed() > 0, this.support3d ? this.$stage.css({
                    transform: "translate3d(" + b + "px,0px, 0px)",
                    transition: this.speed() / 1e3 + "s"
                }) : this.state.isTouch ? this.$stage.css({
                    left: b + "px"
                }) : this.$stage.animate({
                    left: b
                }, this.speed() / 1e3, this.settings.fallbackEasing, a.proxy(function () {
                    this.state.inMotion && this.transitionEnd()
                }, this))
            }, e.prototype.current = function (a) {
                if (a === d) return this._current;
                if (0 === this._items.length) return d;
                if (a = this.normalize(a), this._current !== a) {
                    var b = this.trigger("change", {
                        property: {
                            name: "position",
                            value: a
                        }
                    });
                    b.data !== d && (a = this.normalize(b.data)), this._current = a, this.invalidate("position"), this.trigger("changed", {
                        property: {
                            name: "position",
                            value: this._current
                        }
                    })
                }
                return this._current
            }, e.prototype.invalidate = function (a) {
                this._invalidated[a] = !0
            }, e.prototype.reset = function (a) {
                a = this.normalize(a), a !== d && (this._speed = 0, this._current = a, this.suppress(["translate", "translated"]), this.animate(this.coordinates(a)), this.release(["translate", "translated"]))
            }, e.prototype.normalize = function (b, c) {
                var e = c ? this._items.length : this._items.length + this._clones.length;
                return !a.isNumeric(b) || 1 > e ? d : b = this._clones.length ? (b % e + e) % e : Math.max(this.minimum(c), Math.min(this.maximum(c), b))
            }, e.prototype.relative = function (a) {
                return a = this.normalize(a), a -= this._clones.length / 2, this.normalize(a, !0)
            }, e.prototype.maximum = function (a) {
                var b, c, d, e = 0,
                    f = this.settings;
                if (a) return this._items.length - 1;
                if (!f.loop && f.center) b = this._items.length - 1;
                else if (f.loop || f.center)
                    if (f.loop || f.center) b = this._items.length + f.items;
                    else {
                        if (!f.autoWidth && !f.merge) throw "Can not detect maximum absolute position.";
                        for (revert = f.rtl ? 1 : -1, c = this.$stage.width() - this.$element.width() ;
                            (d = this.coordinates(e)) && !(d * revert >= c) ;) b = ++e
                    }
                else b = this._items.length - f.items;
                return b
            }, e.prototype.minimum = function (a) {
                return a ? 0 : this._clones.length / 2
            }, e.prototype.items = function (a) {
                return a === d ? this._items.slice() : (a = this.normalize(a, !0), this._items[a])
            }, e.prototype.mergers = function (a) {
                return a === d ? this._mergers.slice() : (a = this.normalize(a, !0), this._mergers[a])
            }, e.prototype.clones = function (b) {
                var c = this._clones.length / 2,
                    e = c + this._items.length,
                    f = function (a) {
                        return a % 2 === 0 ? e + a / 2 : c - (a + 1) / 2
                    };
                return b === d ? a.map(this._clones, function (a, b) {
                    return f(b)
                }) : a.map(this._clones, function (a, c) {
                    return a === b ? f(c) : null
                })
            }, e.prototype.speed = function (a) {
                return a !== d && (this._speed = a), this._speed
            }, e.prototype.coordinates = function (b) {
                var c = null;
                return b === d ? a.map(this._coordinates, a.proxy(function (a, b) {
                    return this.coordinates(b)
                }, this)) : (this.settings.center ? (c = this._coordinates[b], c += (this.width() - c + (this._coordinates[b - 1] || 0)) / 2 * (this.settings.rtl ? -1 : 1)) : c = this._coordinates[b - 1] || 0, c)
            }, e.prototype.duration = function (a, b, c) {
                return Math.min(Math.max(Math.abs(b - a), 1), 6) * Math.abs(c || this.settings.smartSpeed)
            }, e.prototype.to = function (c, d) {
                if (this.settings.loop) {
                    var e = c - this.relative(this.current()),
                        f = this.current(),
                        g = this.current(),
                        h = this.current() + e,
                        i = 0 > g - h ? !0 : !1,
                        j = this._clones.length + this._items.length;
                    h < this.settings.items && i === !1 ? (f = g + this._items.length, this.reset(f)) : h >= j - this.settings.items && i === !0 && (f = g - this._items.length, this.reset(f)), b.clearTimeout(this.e._goToLoop), this.e._goToLoop = b.setTimeout(a.proxy(function () {
                        this.speed(this.duration(this.current(), f + e, d)), this.current(f + e), this.update()
                    }, this), 30)
                } else this.speed(this.duration(this.current(), c, d)), this.current(c), this.update()
            }, e.prototype.next = function (a) {
                a = a || !1, this.to(this.relative(this.current()) + 1, a)
            }, e.prototype.prev = function (a) {
                a = a || !1, this.to(this.relative(this.current()) - 1, a)
            }, e.prototype.transitionEnd = function (a) {
                return a !== d && (a.stopPropagation(), (a.target || a.srcElement || a.originalTarget) !== this.$stage.get(0)) ? !1 : (this.state.inMotion = !1, void this.trigger("translated"))
            }, e.prototype.viewport = function () {
                var d;
                if (this.options.responsiveBaseElement !== b) d = a(this.options.responsiveBaseElement).width();
                else if (b.innerWidth) d = b.innerWidth;
                else {
                    if (!c.documentElement || !c.documentElement.clientWidth) throw "Can not detect viewport width.";
                    d = c.documentElement.clientWidth
                }
                return d
            }, e.prototype.replace = function (b) {
                this.$stage.empty(), this._items = [], b && (b = b instanceof jQuery ? b : a(b)), this.settings.nestedItemSelector && (b = b.find("." + this.settings.nestedItemSelector)), b.filter(function () {
                    return 1 === this.nodeType
                }).each(a.proxy(function (a, b) {
                    b = this.prepare(b), this.$stage.append(b), this._items.push(b), this._mergers.push(1 * b.find("[data-merge]").andSelf("[data-merge]").attr("data-merge") || 1)
                }, this)), this.reset(a.isNumeric(this.settings.startPosition) ? this.settings.startPosition : 0), this.invalidate("items")
            }, e.prototype.add = function (a, b) {
                b = b === d ? this._items.length : this.normalize(b, !0), this.trigger("add", {
                    content: a,
                    position: b
                }), 0 === this._items.length || b === this._items.length ? (this.$stage.append(a), this._items.push(a), this._mergers.push(1 * a.find("[data-merge]").andSelf("[data-merge]").attr("data-merge") || 1)) : (this._items[b].before(a), this._items.splice(b, 0, a), this._mergers.splice(b, 0, 1 * a.find("[data-merge]").andSelf("[data-merge]").attr("data-merge") || 1)), this.invalidate("items"), this.trigger("added", {
                    content: a,
                    position: b
                })
            }, e.prototype.remove = function (a) {
                a = this.normalize(a, !0), a !== d && (this.trigger("remove", {
                    content: this._items[a],
                    position: a
                }), this._items[a].remove(), this._items.splice(a, 1), this._mergers.splice(a, 1), this.invalidate("items"), this.trigger("removed", {
                    content: null,
                    position: a
                }))
            }, e.prototype.addTriggerableEvents = function () {
                var b = a.proxy(function (b, c) {
                    return a.proxy(function (a) {
                        a.relatedTarget !== this && (this.suppress([c]), b.apply(this, [].slice.call(arguments, 1)), this.release([c]))
                    }, this)
                }, this);
                a.each({
                    next: this.next,
                    prev: this.prev,
                    to: this.to,
                    destroy: this.destroy,
                    refresh: this.refresh,
                    replace: this.replace,
                    add: this.add,
                    remove: this.remove
                }, a.proxy(function (a, c) {
                    this.$element.on(a + ".owl.carousel", b(c, a + ".owl.carousel"))
                }, this))
            }, e.prototype.watchVisibility = function () {
                function c(a) {
                    return a.offsetWidth > 0 && a.offsetHeight > 0
                }

                function d() {
                    c(this.$element.get(0)) && (this.$element.removeClass("owl-hidden"), this.refresh(), b.clearInterval(this.e._checkVisibile))
                }
                c(this.$element.get(0)) || (this.$element.addClass("owl-hidden"), b.clearInterval(this.e._checkVisibile), this.e._checkVisibile = b.setInterval(a.proxy(d, this), 500))
            }, e.prototype.preloadAutoWidthImages = function (b) {
                var c, d, e, f;
                c = 0, d = this, b.each(function (g, h) {
                    e = a(h), f = new Image, f.onload = function () {
                        c++, e.attr("src", f.src), e.css("opacity", 1), c >= b.length && (d.state.imagesLoaded = !0, d.initialize())
                    }, f.src = e.attr("src") || e.attr("data-src") || e.attr("data-src-retina")
                })
            }, e.prototype.destroy = function () {
                this.$element.hasClass(this.settings.themeClass) && this.$element.removeClass(this.settings.themeClass), this.settings.responsive !== !1 && a(b).off("resize.owl.carousel"), this.transitionEndVendor && this.off(this.$stage.get(0), this.transitionEndVendor, this.e._transitionEnd);
                for (var d in this._plugins) this._plugins[d].destroy();
                (this.settings.mouseDrag || this.settings.touchDrag) && (this.$stage.off("mousedown touchstart touchcancel"), a(c).off(".owl.dragEvents"), this.$stage.get(0).onselectstart = function () { }, this.$stage.off("dragstart", function () {
                    return !1
                })), this.$element.off(".owl"), this.$stage.children(".cloned").remove(), this.e = null, this.$element.removeData("owlCarousel"), this.$stage.children().contents().unwrap(), this.$stage.children().unwrap(), this.$stage.unwrap()
            }, e.prototype.op = function (a, b, c) {
                var d = this.settings.rtl;
                switch (b) {
                    case "<":
                        return d ? a > c : c > a;
                    case ">":
                        return d ? c > a : a > c;
                    case ">=":
                        return d ? c >= a : a >= c;
                    case "<=":
                        return d ? a >= c : c >= a
                }
            }, e.prototype.on = function (a, b, c, d) {
                a.addEventListener ? a.addEventListener(b, c, d) : a.attachEvent && a.attachEvent("on" + b, c)
            }, e.prototype.off = function (a, b, c, d) {
                a.removeEventListener ? a.removeEventListener(b, c, d) : a.detachEvent && a.detachEvent("on" + b, c)
            }, e.prototype.trigger = function (b, c, d) {
                var e = {
                    item: {
                        count: this._items.length,
                        index: this.current()
                    }
                },
                    f = a.camelCase(a.grep(["on", b, d], function (a) {
                        return a
                    }).join("-").toLowerCase()),
                    g = a.Event([b, "owl", d || "carousel"].join(".").toLowerCase(), a.extend({
                        relatedTarget: this
                    }, e, c));
                return this._supress[b] || (a.each(this._plugins, function (a, b) {
                    b.onTrigger && b.onTrigger(g)
                }), this.$element.trigger(g), this.settings && "function" == typeof this.settings[f] && this.settings[f].apply(this, g)), g
            }, e.prototype.suppress = function (b) {
                a.each(b, a.proxy(function (a, b) {
                    this._supress[b] = !0
                }, this))
            }, e.prototype.release = function (b) {
                a.each(b, a.proxy(function (a, b) {
                    delete this._supress[b]
                }, this))
            }, e.prototype.browserSupport = function () {
                if (this.support3d = j(), this.support3d) {
                    this.transformVendor = i();
                    var a = ["transitionend", "webkitTransitionEnd", "transitionend", "oTransitionEnd"];
                    this.transitionEndVendor = a[h()], this.vendorName = this.transformVendor.replace(/Transform/i, ""), this.vendorName = "" !== this.vendorName ? "-" + this.vendorName.toLowerCase() + "-" : ""
                }
                this.state.orientation = b.orientation
            }, a.fn.owlCarousel = function (b) {
                return this.each(function () {
                    a(this).data("owlCarousel") || a(this).data("owlCarousel", new e(this, b))
                })
            }, a.fn.owlCarousel.Constructor = e
        }(window.Zepto || window.jQuery, window, document),
        function (a, b) {
            var c = function (b) {
                this._core = b, this._loaded = [], this._handlers = {
                    "initialized.owl.carousel change.owl.carousel": a.proxy(function (b) {
                        if (b.namespace && this._core.settings && this._core.settings.lazyLoad && (b.property && "position" == b.property.name || "initialized" == b.type))
                            for (var c = this._core.settings, d = c.center && Math.ceil(c.items / 2) || c.items, e = c.center && -1 * d || 0, f = (b.property && b.property.value || this._core.current()) + e, g = this._core.clones().length, h = a.proxy(function (a, b) {
                                    this.load(b)
                            }, this) ; e++ < d;) this.load(g / 2 + this._core.relative(f)), g && a.each(this._core.clones(this._core.relative(f++)), h)
                    }, this)
                }, this._core.options = a.extend({}, c.Defaults, this._core.options), this._core.$element.on(this._handlers)
            };
            c.Defaults = {
                lazyLoad: !1
            }, c.prototype.load = function (c) {
                var d = this._core.$stage.children().eq(c),
                    e = d && d.find(".owl-lazy");
                !e || a.inArray(d.get(0), this._loaded) > -1 || (e.each(a.proxy(function (c, d) {
                    var e, f = a(d),
                        g = b.devicePixelRatio > 1 && f.attr("data-src-retina") || f.attr("data-src");
                    this._core.trigger("load", {
                        element: f,
                        url: g
                    }, "lazy"), f.is("img") ? f.one("load.owl.lazy", a.proxy(function () {
                        f.css("opacity", 1), this._core.trigger("loaded", {
                            element: f,
                            url: g
                        }, "lazy")
                    }, this)).attr("src", g) : (e = new Image, e.onload = a.proxy(function () {
                        f.css({
                            "background-image": "url(" + g + ")",
                            opacity: "1"
                        }), this._core.trigger("loaded", {
                            element: f,
                            url: g
                        }, "lazy")
                    }, this), e.src = g)
                }, this)), this._loaded.push(d.get(0)))
            }, c.prototype.destroy = function () {
                var a, b;
                for (a in this.handlers) this._core.$element.off(a, this.handlers[a]);
                for (b in Object.getOwnPropertyNames(this)) "function" != typeof this[b] && (this[b] = null)
            }, a.fn.owlCarousel.Constructor.Plugins.Lazy = c
        }(window.Zepto || window.jQuery, window, document),
        function (a) {
            var b = function (c) {
                this._core = c, this._handlers = {
                    "initialized.owl.carousel": a.proxy(function () {
                        this._core.settings.autoHeight && this.update()
                    }, this),
                    "changed.owl.carousel": a.proxy(function (a) {
                        this._core.settings.autoHeight && "position" == a.property.name && this.update()
                    }, this),
                    "loaded.owl.lazy": a.proxy(function (a) {
                        this._core.settings.autoHeight && a.element.closest("." + this._core.settings.itemClass) === this._core.$stage.children().eq(this._core.current()) && this.update()
                    }, this)
                }, this._core.options = a.extend({}, b.Defaults, this._core.options), this._core.$element.on(this._handlers)
            };
            b.Defaults = {
                autoHeight: !1,
                autoHeightClass: "owl-height"
            }, b.prototype.update = function () {
                this._core.$stage.parent().height(this._core.$stage.children().eq(this._core.current()).height()).addClass(this._core.settings.autoHeightClass)
            }, b.prototype.destroy = function () {
                var a, b;
                for (a in this._handlers) this._core.$element.off(a, this._handlers[a]);
                for (b in Object.getOwnPropertyNames(this)) "function" != typeof this[b] && (this[b] = null)
            }, a.fn.owlCarousel.Constructor.Plugins.AutoHeight = b
        }(window.Zepto || window.jQuery, window, document),
        function (a, b, c) {
            var d = function (b) {
                this._core = b, this._videos = {}, this._playing = null, this._fullscreen = !1, this._handlers = {
                    "resize.owl.carousel": a.proxy(function (a) {
                        this._core.settings.video && !this.isInFullScreen() && a.preventDefault()
                    }, this),
                    "refresh.owl.carousel changed.owl.carousel": a.proxy(function () {
                        this._playing && this.stop()
                    }, this),
                    "prepared.owl.carousel": a.proxy(function (b) {
                        var c = a(b.content).find(".owl-video");
                        c.length && (c.css("display", "none"), this.fetch(c, a(b.content)))
                    }, this)
                }, this._core.options = a.extend({}, d.Defaults, this._core.options), this._core.$element.on(this._handlers), this._core.$element.on("click.owl.video", ".owl-video-play-icon", a.proxy(function (a) {
                    this.play(a)
                }, this))
            };
            d.Defaults = {
                video: !1,
                videoHeight: !1,
                videoWidth: !1
            }, d.prototype.fetch = function (a, b) {
                var c = a.attr("data-vimeo-id") ? "vimeo" : "youtube",
                    d = a.attr("data-vimeo-id") || a.attr("data-youtube-id"),
                    e = a.attr("data-width") || this._core.settings.videoWidth,
                    f = a.attr("data-height") || this._core.settings.videoHeight,
                    g = a.attr("href");
                if (!g) throw new Error("Missing video URL.");
                if (d = g.match(/(http:|https:|)\/\/(player.|www.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/), d[3].indexOf("youtu") > -1) c = "youtube";
                else {
                    if (!(d[3].indexOf("vimeo") > -1)) throw new Error("Video URL not supported.");
                    c = "vimeo"
                }
                d = d[6], this._videos[g] = {
                    type: c,
                    id: d,
                    width: e,
                    height: f
                }, b.attr("data-video", g), this.thumbnail(a, this._videos[g])
            }, d.prototype.thumbnail = function (b, c) {
                var d, e, f, g = c.width && c.height ? 'style="width:' + c.width + "px;height:" + c.height + 'px;"' : "",
                    h = b.find("img"),
                    i = "src",
                    j = "",
                    k = this._core.settings,
                    l = function (a) {
                        e = '<div class="owl-video-play-icon"></div>', d = k.lazyLoad ? '<div class="owl-video-tn ' + j + '" ' + i + '="' + a + '"></div>' : '<div class="owl-video-tn" style="opacity:1;background-image:url(' + a + ')"></div>', b.after(d), b.after(e)
                    };
                return b.wrap('<div class="owl-video-wrapper"' + g + "></div>"), this._core.settings.lazyLoad && (i = "data-src", j = "owl-lazy"), h.length ? (l(h.attr(i)), h.remove(), !1) : void ("youtube" === c.type ? (f = "http://img.youtube.com/vi/" + c.id + "/hqdefault.jpg", l(f)) : "vimeo" === c.type && a.ajax({
                    type: "GET",
                    url: "http://vimeo.com/api/v2/video/" + c.id + ".json",
                    jsonp: "callback",
                    dataType: "jsonp",
                    success: function (a) {
                        f = a[0].thumbnail_large, l(f)
                    }
                }))
            }, d.prototype.stop = function () {
                this._core.trigger("stop", null, "video"), this._playing.find(".owl-video-frame").remove(), this._playing.removeClass("owl-video-playing"), this._playing = null
            }, d.prototype.play = function (b) {
                this._core.trigger("play", null, "video"), this._playing && this.stop();
                var c, d, e = a(b.target || b.srcElement),
                    f = e.closest("." + this._core.settings.itemClass),
                    g = this._videos[f.attr("data-video")],
                    h = g.width || "100%",
                    i = g.height || this._core.$stage.height();
                "youtube" === g.type ? c = '<iframe width="' + h + '" height="' + i + '" src="http://www.youtube.com/embed/' + g.id + "?autoplay=1&v=" + g.id + '" frameborder="0" allowfullscreen></iframe>' : "vimeo" === g.type && (c = '<iframe src="http://player.vimeo.com/video/' + g.id + '?autoplay=1" width="' + h + '" height="' + i + '" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>'), f.addClass("owl-video-playing"), this._playing = f, d = a('<div style="height:' + i + "px; width:" + h + 'px" class="owl-video-frame">' + c + "</div>"), e.after(d)
            }, d.prototype.isInFullScreen = function () {
                var d = c.fullscreenElement || c.mozFullScreenElement || c.webkitFullscreenElement;
                return d && a(d).parent().hasClass("owl-video-frame") && (this._core.speed(0), this._fullscreen = !0), d && this._fullscreen && this._playing ? !1 : this._fullscreen ? (this._fullscreen = !1, !1) : this._playing && this._core.state.orientation !== b.orientation ? (this._core.state.orientation = b.orientation, !1) : !0
            }, d.prototype.destroy = function () {
                var a, b;
                this._core.$element.off("click.owl.video");
                for (a in this._handlers) this._core.$element.off(a, this._handlers[a]);
                for (b in Object.getOwnPropertyNames(this)) "function" != typeof this[b] && (this[b] = null)
            }, a.fn.owlCarousel.Constructor.Plugins.Video = d
        }(window.Zepto || window.jQuery, window, document),
        function (a, b, c, d) {
            var e = function (b) {
                this.core = b, this.core.options = a.extend({}, e.Defaults, this.core.options), this.swapping = !0, this.previous = d, this.next = d, this.handlers = {
                    "change.owl.carousel": a.proxy(function (a) {
                        "position" == a.property.name && (this.previous = this.core.current(), this.next = a.property.value)
                    }, this),
                    "drag.owl.carousel dragged.owl.carousel translated.owl.carousel": a.proxy(function (a) {
                        this.swapping = "translated" == a.type
                    }, this),
                    "translate.owl.carousel": a.proxy(function () {
                        this.swapping && (this.core.options.animateOut || this.core.options.animateIn) && this.swap()
                    }, this)
                }, this.core.$element.on(this.handlers)
            };
            e.Defaults = {
                animateOut: !1,
                animateIn: !1
            }, e.prototype.swap = function () {
                if (1 === this.core.settings.items && this.core.support3d) {
                    this.core.speed(0);
                    var b, c = a.proxy(this.clear, this),
                        d = this.core.$stage.children().eq(this.previous),
                        e = this.core.$stage.children().eq(this.next),
                        f = this.core.settings.animateIn,
                        g = this.core.settings.animateOut;
                    this.core.current() !== this.previous && (g && (b = this.core.coordinates(this.previous) - this.core.coordinates(this.next), d.css({
                        left: b + "px"
                    }).addClass("animated owl-animated-out").addClass(g).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", c)), f && e.addClass("animated owl-animated-in").addClass(f).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", c))
                }
            }, e.prototype.clear = function (b) {
                a(b.target).css({
                    left: ""
                }).removeClass("animated owl-animated-out owl-animated-in").removeClass(this.core.settings.animateIn).removeClass(this.core.settings.animateOut), this.core.transitionEnd()
            }, e.prototype.destroy = function () {
                var a, b;
                for (a in this.handlers) this.core.$element.off(a, this.handlers[a]);
                for (b in Object.getOwnPropertyNames(this)) "function" != typeof this[b] && (this[b] = null)
            }, a.fn.owlCarousel.Constructor.Plugins.Animate = e
        }(window.Zepto || window.jQuery, window, document),
        function (a, b, c) {
            var d = function (b) {
                this.core = b, this.core.options = a.extend({}, d.Defaults, this.core.options), this.handlers = {
                    "translated.owl.carousel refreshed.owl.carousel": a.proxy(function () {
                        this.autoplay()
                    }, this),
                    "play.owl.autoplay": a.proxy(function (a, b, c) {
                        this.play(b, c)
                    }, this),
                    "stop.owl.autoplay": a.proxy(function () {
                        this.stop()
                    }, this),
                    "mouseover.owl.autoplay": a.proxy(function () {
                        this.core.settings.autoplayHoverPause && this.pause()
                    }, this),
                    "mouseleave.owl.autoplay": a.proxy(function () {
                        this.core.settings.autoplayHoverPause && this.autoplay()
                    }, this)
                }, this.core.$element.on(this.handlers)
            };
            d.Defaults = {
                autoplay: !1,
                autoplayTimeout: 5e3,
                autoplayHoverPause: !1,
                autoplaySpeed: !1
            }, d.prototype.autoplay = function () {
                this.core.settings.autoplay && !this.core.state.videoPlay ? (b.clearInterval(this.interval), this.interval = b.setInterval(a.proxy(function () {
                    this.play()
                }, this), this.core.settings.autoplayTimeout)) : b.clearInterval(this.interval)
            }, d.prototype.play = function () {
                return c.hidden === !0 || this.core.state.isTouch || this.core.state.isScrolling || this.core.state.isSwiping || this.core.state.inMotion ? void 0 : this.core.settings.autoplay === !1 ? void b.clearInterval(this.interval) : void this.core.next(this.core.settings.autoplaySpeed)
            }, d.prototype.stop = function () {
                b.clearInterval(this.interval)
            }, d.prototype.pause = function () {
                b.clearInterval(this.interval)
            }, d.prototype.destroy = function () {
                var a, c;
                b.clearInterval(this.interval);
                for (a in this.handlers) this.core.$element.off(a, this.handlers[a]);
                for (c in Object.getOwnPropertyNames(this)) "function" != typeof this[c] && (this[c] = null)
            }, a.fn.owlCarousel.Constructor.Plugins.autoplay = d
        }(window.Zepto || window.jQuery, window, document),
        function (a) {
            "use strict";
            var b = function (c) {
                this._core = c, this._initialized = !1, this._pages = [], this._controls = {}, this._templates = [], this.$element = this._core.$element, this._overrides = {
                    next: this._core.next,
                    prev: this._core.prev,
                    to: this._core.to
                }, this._handlers = {
                    "prepared.owl.carousel": a.proxy(function (b) {
                        this._core.settings.dotsData && this._templates.push(a(b.content).find("[data-dot]").andSelf("[data-dot]").attr("data-dot"))
                    }, this),
                    "add.owl.carousel": a.proxy(function (b) {
                        this._core.settings.dotsData && this._templates.splice(b.position, 0, a(b.content).find("[data-dot]").andSelf("[data-dot]").attr("data-dot"))
                    }, this),
                    "remove.owl.carousel prepared.owl.carousel": a.proxy(function (a) {
                        this._core.settings.dotsData && this._templates.splice(a.position, 1)
                    }, this),
                    "change.owl.carousel": a.proxy(function (a) {
                        if ("position" == a.property.name && !this._core.state.revert && !this._core.settings.loop && this._core.settings.navRewind) {
                            var b = this._core.current(),
                                c = this._core.maximum(),
                                d = this._core.minimum();
                            a.data = a.property.value > c ? b >= c ? d : c : a.property.value < d ? c : a.property.value
                        }
                    }, this),
                    "changed.owl.carousel": a.proxy(function (a) {
                        "position" == a.property.name && this.draw()
                    }, this),
                    "refreshed.owl.carousel": a.proxy(function () {
                        this._initialized || (this.initialize(), this._initialized = !0), this._core.trigger("refresh", null, "navigation"), this.update(), this.draw(), this._core.trigger("refreshed", null, "navigation")
                    }, this)
                }, this._core.options = a.extend({}, b.Defaults, this._core.options), this.$element.on(this._handlers)
            };
            b.Defaults = {
                nav: !1,
                navRewind: !0,
                navText: ["prev", "next"],
                navSpeed: !1,
                navElement: "div",
                navContainer: !1,
                navContainerClass: "owl-nav",
                navClass: ["owl-prev", "owl-next"],
                slideBy: 1,
                dotClass: "owl-dot",
                dotsClass: "owl-dots",
                dots: !0,
                dotsEach: !1,
                dotData: !1,
                dotsSpeed: !1,
                dotsContainer: !1,
                controlsClass: "owl-controls"
            }, b.prototype.initialize = function () {
                var b, c, d = this._core.settings;
                d.dotsData || (this._templates = [a("<div>").addClass(d.dotClass).append(a("<span>")).prop("outerHTML")]), d.navContainer && d.dotsContainer || (this._controls.$container = a("<div>").addClass(d.controlsClass).appendTo(this.$element)), this._controls.$indicators = d.dotsContainer ? a(d.dotsContainer) : a("<div>").hide().addClass(d.dotsClass).appendTo(this._controls.$container), this._controls.$indicators.on("click", "div", a.proxy(function (b) {
                    var c = a(b.target).parent().is(this._controls.$indicators) ? a(b.target).index() : a(b.target).parent().index();
                    b.preventDefault(), this.to(c, d.dotsSpeed)
                }, this)), b = d.navContainer ? a(d.navContainer) : a("<div>").addClass(d.navContainerClass).prependTo(this._controls.$container), this._controls.$next = a("<" + d.navElement + ">"), this._controls.$previous = this._controls.$next.clone(), this._controls.$previous.addClass(d.navClass[0]).html(d.navText[0]).hide().prependTo(b).on("click", a.proxy(function () {
                    this.prev(d.navSpeed)
                }, this)), this._controls.$next.addClass(d.navClass[1]).html(d.navText[1]).hide().appendTo(b).on("click", a.proxy(function () {
                    this.next(d.navSpeed)
                }, this));
                for (c in this._overrides) this._core[c] = a.proxy(this[c], this)
            }, b.prototype.destroy = function () {
                var a, b, c, d;
                for (a in this._handlers) this.$element.off(a, this._handlers[a]);
                for (b in this._controls) this._controls[b].remove();
                for (d in this.overides) this._core[d] = this._overrides[d];
                for (c in Object.getOwnPropertyNames(this)) "function" != typeof this[c] && (this[c] = null)
            }, b.prototype.update = function () {
                var a, b, c, d = this._core.settings,
                    e = this._core.clones().length / 2,
                    f = e + this._core.items().length,
                    g = d.center || d.autoWidth || d.dotData ? 1 : d.dotsEach || d.items;
                if ("page" !== d.slideBy && (d.slideBy = Math.min(d.slideBy, d.items)), d.dots || "page" == d.slideBy)
                    for (this._pages = [], a = e, b = 0, c = 0; f > a; a++) (b >= g || 0 === b) && (this._pages.push({
                        start: a - e,
                        end: a - e + g - 1
                    }), b = 0, ++c), b += this._core.mergers(this._core.relative(a))
            }, b.prototype.draw = function () {
                var b, c, d = "",
                    e = this._core.settings,
                    f = (this._core.$stage.children(), this._core.relative(this._core.current()));
                if (!e.nav || e.loop || e.navRewind || (this._controls.$previous.toggleClass("disabled", 0 >= f), this._controls.$next.toggleClass("disabled", f >= this._core.maximum())), this._controls.$previous.toggle(e.nav), this._controls.$next.toggle(e.nav), e.dots) {
                    if (b = this._pages.length - this._controls.$indicators.children().length, e.dotData && 0 !== b) {
                        for (c = 0; c < this._controls.$indicators.children().length; c++) d += this._templates[this._core.relative(c)];
                        this._controls.$indicators.html(d)
                    } else b > 0 ? (d = new Array(b + 1).join(this._templates[0]), this._controls.$indicators.append(d)) : 0 > b && this._controls.$indicators.children().slice(b).remove();
                    this._controls.$indicators.find(".active").removeClass("active"), this._controls.$indicators.children().eq(a.inArray(this.current(), this._pages)).addClass("active")
                }
                this._controls.$indicators.toggle(e.dots)
            }, b.prototype.onTrigger = function (b) {
                var c = this._core.settings;
                b.page = {
                    index: a.inArray(this.current(), this._pages),
                    count: this._pages.length,
                    size: c && (c.center || c.autoWidth || c.dotData ? 1 : c.dotsEach || c.items)
                }
            }, b.prototype.current = function () {
                var b = this._core.relative(this._core.current());
                return a.grep(this._pages, function (a) {
                    return a.start <= b && a.end >= b
                }).pop()
            }, b.prototype.getPosition = function (b) {
                var c, d, e = this._core.settings;
                return "page" == e.slideBy ? (c = a.inArray(this.current(), this._pages), d = this._pages.length, b ? ++c : --c, c = this._pages[(c % d + d) % d].start) : (c = this._core.relative(this._core.current()), d = this._core.items().length, b ? c += e.slideBy : c -= e.slideBy), c
            }, b.prototype.next = function (b) {
                a.proxy(this._overrides.to, this._core)(this.getPosition(!0), b)
            }, b.prototype.prev = function (b) {
                a.proxy(this._overrides.to, this._core)(this.getPosition(!1), b)
            }, b.prototype.to = function (b, c, d) {
                var e;
                d ? a.proxy(this._overrides.to, this._core)(b, c) : (e = this._pages.length, a.proxy(this._overrides.to, this._core)(this._pages[(b % e + e) % e].start, c))
            }, a.fn.owlCarousel.Constructor.Plugins.Navigation = b
        }(window.Zepto || window.jQuery, window, document),
        function (a, b) {
            "use strict";
            var c = function (d) {
                this._core = d, this._hashes = {}, this.$element = this._core.$element, this._handlers = {
                    "initialized.owl.carousel": a.proxy(function () {
                        "URLHash" == this._core.settings.startPosition && a(b).trigger("hashchange.owl.navigation")
                    }, this),
                    "prepared.owl.carousel": a.proxy(function (b) {
                        var c = a(b.content).find("[data-hash]").andSelf("[data-hash]").attr("data-hash");
                        this._hashes[c] = b.content
                    }, this)
                }, this._core.options = a.extend({}, c.Defaults, this._core.options), this.$element.on(this._handlers), a(b).on("hashchange.owl.navigation", a.proxy(function () {
                    var a = b.location.hash.substring(1),
                        c = this._core.$stage.children(),
                        d = this._hashes[a] && c.index(this._hashes[a]) || 0;
                    return a ? void this._core.to(d, !1, !0) : !1
                }, this))
            };
            c.Defaults = {
                URLhashListener: !1
            }, c.prototype.destroy = function () {
                var c, d;
                a(b).off("hashchange.owl.navigation");
                for (c in this._handlers) this._core.$element.off(c, this._handlers[c]);
                for (d in Object.getOwnPropertyNames(this)) "function" != typeof this[d] && (this[d] = null)
            }, a.fn.owlCarousel.Constructor.Plugins.Hash = c
        }(window.Zepto || window.jQuery, window, document), ! function (t, e) {
            "function" == typeof define && define.amd ? define("jquery-bridget/jquery-bridget", ["jquery"], function (i) {
                return e(t, i)
            }) : "object" == typeof module && module.exports ? module.exports = e(t, require("jquery")) : t.jQueryBridget = e(t, t.jQuery)
        }(window, function (t, e) {
            "use strict";

            function i(i, s, a) {
                function u(t, e, n) {
                    var o, s = "$()." + i + '("' + e + '")';
                    return t.each(function (t, u) {
                        var h = a.data(u, i);
                        if (!h) return void r(i + " not initialized. Cannot call methods, i.e. " + s);
                        var d = h[e];
                        if (!d || "_" == e.charAt(0)) return void r(s + " is not a valid method");
                        var l = d.apply(h, n);
                        o = void 0 === o ? l : o
                    }), void 0 !== o ? o : t
                }

                function h(t, e) {
                    t.each(function (t, n) {
                        var o = a.data(n, i);
                        o ? (o.option(e), o._init()) : (o = new s(n, e), a.data(n, i, o))
                    })
                }
                a = a || e || t.jQuery, a && (s.prototype.option || (s.prototype.option = function (t) {
                    a.isPlainObject(t) && (this.options = a.extend(!0, this.options, t))
                }), a.fn[i] = function (t) {
                    if ("string" == typeof t) {
                        var e = o.call(arguments, 1);
                        return u(this, t, e)
                    }
                    return h(this, t), this
                }, n(a))
            }

            function n(t) {
                !t || t && t.bridget || (t.bridget = i)
            }
            var o = Array.prototype.slice,
                s = t.console,
                r = "undefined" == typeof s ? function () { } : function (t) {
                    s.error(t)
                };
            return n(e || t.jQuery), i
        }),
        function (t, e) {
            "function" == typeof define && define.amd ? define("ev-emitter/ev-emitter", e) : "object" == typeof module && module.exports ? module.exports = e() : t.EvEmitter = e()
        }("undefined" != typeof window ? window : this, function () {
            function t() { }
            var e = t.prototype;
            return e.on = function (t, e) {
                if (t && e) {
                    var i = this._events = this._events || {},
                        n = i[t] = i[t] || [];
                    return -1 == n.indexOf(e) && n.push(e), this
                }
            }, e.once = function (t, e) {
                if (t && e) {
                    this.on(t, e);
                    var i = this._onceEvents = this._onceEvents || {},
                        n = i[t] = i[t] || {};
                    return n[e] = !0, this
                }
            }, e.off = function (t, e) {
                var i = this._events && this._events[t];
                if (i && i.length) {
                    var n = i.indexOf(e);
                    return -1 != n && i.splice(n, 1), this
                }
            }, e.emitEvent = function (t, e) {
                var i = this._events && this._events[t];
                if (i && i.length) {
                    var n = 0,
                        o = i[n];
                    e = e || [];
                    for (var s = this._onceEvents && this._onceEvents[t]; o;) {
                        var r = s && s[o];
                        r && (this.off(t, o), delete s[o]), o.apply(this, e), n += r ? 0 : 1, o = i[n]
                    }
                    return this
                }
            }, t
        }),
        function (t, e) {
            "use strict";
            "function" == typeof define && define.amd ? define("get-size/get-size", [], function () {
                return e()
            }) : "object" == typeof module && module.exports ? module.exports = e() : t.getSize = e()
        }(window, function () {
            "use strict";

            function t(t) {
                var e = parseFloat(t),
                    i = -1 == t.indexOf("%") && !isNaN(e);
                return i && e
            }

            function e() { }

            function i() {
                for (var t = {
                    width: 0,
                    height: 0,
                    innerWidth: 0,
                    innerHeight: 0,
                    outerWidth: 0,
                    outerHeight: 0
                }, e = 0; h > e; e++) {
                    var i = u[e];
                    t[i] = 0
                }
                return t
            }

            function n(t) {
                var e = getComputedStyle(t);
                return e || a("Style returned " + e + ". Are you running this code in a hidden iframe on Firefox? See http://bit.ly/getsizebug1"), e
            }

            function o() {
                if (!d) {
                    d = !0;
                    var e = document.createElement("div");
                    e.style.width = "200px", e.style.padding = "1px 2px 3px 4px", e.style.borderStyle = "solid", e.style.borderWidth = "1px 2px 3px 4px", e.style.boxSizing = "border-box";
                    var i = document.body || document.documentElement;
                    i.appendChild(e);
                    var o = n(e);
                    s.isBoxSizeOuter = r = 200 == t(o.width), i.removeChild(e)
                }
            }

            function s(e) {
                if (o(), "string" == typeof e && (e = document.querySelector(e)), e && "object" == typeof e && e.nodeType) {
                    var s = n(e);
                    if ("none" == s.display) return i();
                    var a = {};
                    a.width = e.offsetWidth, a.height = e.offsetHeight;
                    for (var d = a.isBorderBox = "border-box" == s.boxSizing, l = 0; h > l; l++) {
                        var f = u[l],
                            m = s[f],
                            c = parseFloat(m);
                        a[f] = isNaN(c) ? 0 : c
                    }
                    var p = a.paddingLeft + a.paddingRight,
                        y = a.paddingTop + a.paddingBottom,
                        g = a.marginLeft + a.marginRight,
                        v = a.marginTop + a.marginBottom,
                        _ = a.borderLeftWidth + a.borderRightWidth,
                        I = a.borderTopWidth + a.borderBottomWidth,
                        z = d && r,
                        S = t(s.width);
                    S !== !1 && (a.width = S + (z ? 0 : p + _));
                    var x = t(s.height);
                    return x !== !1 && (a.height = x + (z ? 0 : y + I)), a.innerWidth = a.width - (p + _), a.innerHeight = a.height - (y + I), a.outerWidth = a.width + g, a.outerHeight = a.height + v, a
                }
            }
            var r, a = "undefined" == typeof console ? e : function (t) {
                console.error(t)
            },
                u = ["paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth"],
                h = u.length,
                d = !1;
            return s
        }),
        function (t, e) {
            "use strict";
            "function" == typeof define && define.amd ? define("desandro-matches-selector/matches-selector", e) : "object" == typeof module && module.exports ? module.exports = e() : t.matchesSelector = e()
        }(window, function () {
            "use strict";
            var t = function () {
                var t = window.Element.prototype;
                if (t.matches) return "matches";
                if (t.matchesSelector) return "matchesSelector";
                for (var e = ["webkit", "moz", "ms", "o"], i = 0; i < e.length; i++) {
                    var n = e[i],
                        o = n + "MatchesSelector";
                    if (t[o]) return o
                }
            }();
            return function (e, i) {
                return e[t](i)
            }
        }),
        function (t, e) {
            "function" == typeof define && define.amd ? define("fizzy-ui-utils/utils", ["desandro-matches-selector/matches-selector"], function (i) {
                return e(t, i)
            }) : "object" == typeof module && module.exports ? module.exports = e(t, require("desandro-matches-selector")) : t.fizzyUIUtils = e(t, t.matchesSelector)
        }(window, function (t, e) {
            var i = {};
            i.extend = function (t, e) {
                for (var i in e) t[i] = e[i];
                return t
            }, i.modulo = function (t, e) {
                return (t % e + e) % e
            }, i.makeArray = function (t) {
                var e = [];
                if (Array.isArray(t)) e = t;
                else if (t && "object" == typeof t && "number" == typeof t.length)
                    for (var i = 0; i < t.length; i++) e.push(t[i]);
                else e.push(t);
                return e
            }, i.removeFrom = function (t, e) {
                var i = t.indexOf(e); -1 != i && t.splice(i, 1)
            }, i.getParent = function (t, i) {
                for (; t != document.body;)
                    if (t = t.parentNode, e(t, i)) return t
            }, i.getQueryElement = function (t) {
                return "string" == typeof t ? document.querySelector(t) : t
            }, i.handleEvent = function (t) {
                var e = "on" + t.type;
                this[e] && this[e](t)
            }, i.filterFindElements = function (t, n) {
                t = i.makeArray(t);
                var o = [];
                return t.forEach(function (t) {
                    if (t instanceof HTMLElement) {
                        if (!n) return void o.push(t);
                        e(t, n) && o.push(t);
                        for (var i = t.querySelectorAll(n), s = 0; s < i.length; s++) o.push(i[s])
                    }
                }), o
            }, i.debounceMethod = function (t, e, i) {
                var n = t.prototype[e],
                    o = e + "Timeout";
                t.prototype[e] = function () {
                    var t = this[o];
                    t && clearTimeout(t);
                    var e = arguments,
                        s = this;
                    this[o] = setTimeout(function () {
                        n.apply(s, e), delete s[o]
                    }, i || 100)
                }
            }, i.docReady = function (t) {
                var e = document.readyState;
                "complete" == e || "interactive" == e ? setTimeout(t) : document.addEventListener("DOMContentLoaded", t)
            }, i.toDashed = function (t) {
                return t.replace(/(.)([A-Z])/g, function (t, e, i) {
                    return e + "-" + i
                }).toLowerCase()
            };
            var n = t.console;
            return i.htmlInit = function (e, o) {
                i.docReady(function () {
                    var s = i.toDashed(o),
                        r = "data-" + s,
                        a = document.querySelectorAll("[" + r + "]"),
                        u = document.querySelectorAll(".js-" + s),
                        h = i.makeArray(a).concat(i.makeArray(u)),
                        d = r + "-options",
                        l = t.jQuery;
                    h.forEach(function (t) {
                        var i, s = t.getAttribute(r) || t.getAttribute(d);
                        try {
                            i = s && JSON.parse(s)
                        } catch (a) {
                            return void (n && n.error("Error parsing " + r + " on " + t.className + ": " + a))
                        }
                        var u = new e(t, i);
                        l && l.data(t, o, u)
                    })
                })
            }, i
        }),
        function (t, e) {
            "function" == typeof define && define.amd ? define("outlayer/item", ["ev-emitter/ev-emitter", "get-size/get-size"], e) : "object" == typeof module && module.exports ? module.exports = e(require("ev-emitter"), require("get-size")) : (t.Outlayer = {}, t.Outlayer.Item = e(t.EvEmitter, t.getSize))
        }(window, function (t, e) {
            "use strict";

            function i(t) {
                for (var e in t) return !1;
                return e = null, !0
            }

            function n(t, e) {
                t && (this.element = t, this.layout = e, this.position = {
                    x: 0,
                    y: 0
                }, this._create())
            }

            function o(t) {
                return t.replace(/([A-Z])/g, function (t) {
                    return "-" + t.toLowerCase()
                })
            }
            var s = document.documentElement.style,
                r = "string" == typeof s.transition ? "transition" : "WebkitTransition",
                a = "string" == typeof s.transform ? "transform" : "WebkitTransform",
                u = {
                    WebkitTransition: "webkitTransitionEnd",
                    transition: "transitionend"
                }[r],
                h = {
                    transform: a,
                    transition: r,
                    transitionDuration: r + "Duration",
                    transitionProperty: r + "Property",
                    transitionDelay: r + "Delay"
                },
                d = n.prototype = Object.create(t.prototype);
            d.constructor = n, d._create = function () {
                this._transn = {
                    ingProperties: {},
                    clean: {},
                    onEnd: {}
                }, this.css({
                    position: "absolute"
                })
            }, d.handleEvent = function (t) {
                var e = "on" + t.type;
                this[e] && this[e](t)
            }, d.getSize = function () {
                this.size = e(this.element)
            }, d.css = function (t) {
                var e = this.element.style;
                for (var i in t) {
                    var n = h[i] || i;
                    e[n] = t[i]
                }
            }, d.getPosition = function () {
                var t = getComputedStyle(this.element),
                    e = this.layout._getOption("originLeft"),
                    i = this.layout._getOption("originTop"),
                    n = t[e ? "left" : "right"],
                    o = t[i ? "top" : "bottom"],
                    s = this.layout.size,
                    r = -1 != n.indexOf("%") ? parseFloat(n) / 100 * s.width : parseInt(n, 10),
                    a = -1 != o.indexOf("%") ? parseFloat(o) / 100 * s.height : parseInt(o, 10);
                r = isNaN(r) ? 0 : r, a = isNaN(a) ? 0 : a, r -= e ? s.paddingLeft : s.paddingRight, a -= i ? s.paddingTop : s.paddingBottom, this.position.x = r, this.position.y = a
            }, d.layoutPosition = function () {
                var t = this.layout.size,
                    e = {},
                    i = this.layout._getOption("originLeft"),
                    n = this.layout._getOption("originTop"),
                    o = i ? "paddingLeft" : "paddingRight",
                    s = i ? "left" : "right",
                    r = i ? "right" : "left",
                    a = this.position.x + t[o];
                e[s] = this.getXValue(a), e[r] = "";
                var u = n ? "paddingTop" : "paddingBottom",
                    h = n ? "top" : "bottom",
                    d = n ? "bottom" : "top",
                    l = this.position.y + t[u];
                e[h] = this.getYValue(l), e[d] = "", this.css(e), this.emitEvent("layout", [this])
            }, d.getXValue = function (t) {
                var e = this.layout._getOption("horizontal");
                return this.layout.options.percentPosition && !e ? t / this.layout.size.width * 100 + "%" : t + "px"
            }, d.getYValue = function (t) {
                var e = this.layout._getOption("horizontal");
                return this.layout.options.percentPosition && e ? t / this.layout.size.height * 100 + "%" : t + "px"
            }, d._transitionTo = function (t, e) {
                this.getPosition();
                var i = this.position.x,
                    n = this.position.y,
                    o = parseInt(t, 10),
                    s = parseInt(e, 10),
                    r = o === this.position.x && s === this.position.y;
                if (this.setPosition(t, e), r && !this.isTransitioning) return void this.layoutPosition();
                var a = t - i,
                    u = e - n,
                    h = {};
                h.transform = this.getTranslate(a, u), this.transition({
                    to: h,
                    onTransitionEnd: {
                        transform: this.layoutPosition
                    },
                    isCleaning: !0
                })
            }, d.getTranslate = function (t, e) {
                var i = this.layout._getOption("originLeft"),
                    n = this.layout._getOption("originTop");
                return t = i ? t : -t, e = n ? e : -e, "translate3d(" + t + "px, " + e + "px, 0)"
            }, d.goTo = function (t, e) {
                this.setPosition(t, e), this.layoutPosition()
            }, d.moveTo = d._transitionTo, d.setPosition = function (t, e) {
                this.position.x = parseInt(t, 10), this.position.y = parseInt(e, 10)
            }, d._nonTransition = function (t) {
                this.css(t.to), t.isCleaning && this._removeStyles(t.to);
                for (var e in t.onTransitionEnd) t.onTransitionEnd[e].call(this)
            }, d.transition = function (t) {
                if (!parseFloat(this.layout.options.transitionDuration)) return void this._nonTransition(t);
                var e = this._transn;
                for (var i in t.onTransitionEnd) e.onEnd[i] = t.onTransitionEnd[i];
                for (i in t.to) e.ingProperties[i] = !0, t.isCleaning && (e.clean[i] = !0);
                if (t.from) {
                    this.css(t.from);
                    var n = this.element.offsetHeight;
                    n = null
                }
                this.enableTransition(t.to), this.css(t.to), this.isTransitioning = !0
            };
            var l = "opacity," + o(a);
            d.enableTransition = function () {
                if (!this.isTransitioning) {
                    var t = this.layout.options.transitionDuration;
                    t = "number" == typeof t ? t + "ms" : t, this.css({
                        transitionProperty: l,
                        transitionDuration: t,
                        transitionDelay: this.staggerDelay || 0
                    }), this.element.addEventListener(u, this, !1)
                }
            }, d.onwebkitTransitionEnd = function (t) {
                this.ontransitionend(t)
            }, d.onotransitionend = function (t) {
                this.ontransitionend(t)
            };
            var f = {
                "-webkit-transform": "transform"
            };
            d.ontransitionend = function (t) {
                if (t.target === this.element) {
                    var e = this._transn,
                        n = f[t.propertyName] || t.propertyName;
                    if (delete e.ingProperties[n], i(e.ingProperties) && this.disableTransition(), n in e.clean && (this.element.style[t.propertyName] = "", delete e.clean[n]), n in e.onEnd) {
                        var o = e.onEnd[n];
                        o.call(this), delete e.onEnd[n]
                    }
                    this.emitEvent("transitionEnd", [this])
                }
            }, d.disableTransition = function () {
                this.removeTransitionStyles(), this.element.removeEventListener(u, this, !1), this.isTransitioning = !1
            }, d._removeStyles = function (t) {
                var e = {};
                for (var i in t) e[i] = "";
                this.css(e)
            };
            var m = {
                transitionProperty: "",
                transitionDuration: "",
                transitionDelay: ""
            };
            return d.removeTransitionStyles = function () {
                this.css(m)
            }, d.stagger = function (t) {
                t = isNaN(t) ? 0 : t, this.staggerDelay = t + "ms"
            }, d.removeElem = function () {
                this.element.parentNode.removeChild(this.element), this.css({
                    display: ""
                }), this.emitEvent("remove", [this])
            }, d.remove = function () {
                return r && parseFloat(this.layout.options.transitionDuration) ? (this.once("transitionEnd", function () {
                    this.removeElem()
                }), void this.hide()) : void this.removeElem()
            }, d.reveal = function () {
                delete this.isHidden, this.css({
                    display: ""
                });
                var t = this.layout.options,
                    e = {},
                    i = this.getHideRevealTransitionEndProperty("visibleStyle");
                e[i] = this.onRevealTransitionEnd, this.transition({
                    from: t.hiddenStyle,
                    to: t.visibleStyle,
                    isCleaning: !0,
                    onTransitionEnd: e
                })
            }, d.onRevealTransitionEnd = function () {
                this.isHidden || this.emitEvent("reveal")
            }, d.getHideRevealTransitionEndProperty = function (t) {
                var e = this.layout.options[t];
                if (e.opacity) return "opacity";
                for (var i in e) return i
            }, d.hide = function () {
                this.isHidden = !0, this.css({
                    display: ""
                });
                var t = this.layout.options,
                    e = {},
                    i = this.getHideRevealTransitionEndProperty("hiddenStyle");
                e[i] = this.onHideTransitionEnd, this.transition({
                    from: t.visibleStyle,
                    to: t.hiddenStyle,
                    isCleaning: !0,
                    onTransitionEnd: e
                })
            }, d.onHideTransitionEnd = function () {
                this.isHidden && (this.css({
                    display: "none"
                }), this.emitEvent("hide"))
            }, d.destroy = function () {
                this.css({
                    position: "",
                    left: "",
                    right: "",
                    top: "",
                    bottom: "",
                    transition: "",
                    transform: ""
                })
            }, n
        }),
        function (t, e) {
            "use strict";
            "function" == typeof define && define.amd ? define("outlayer/outlayer", ["ev-emitter/ev-emitter", "get-size/get-size", "fizzy-ui-utils/utils", "./item"], function (i, n, o, s) {
                return e(t, i, n, o, s)
            }) : "object" == typeof module && module.exports ? module.exports = e(t, require("ev-emitter"), require("get-size"), require("fizzy-ui-utils"), require("./item")) : t.Outlayer = e(t, t.EvEmitter, t.getSize, t.fizzyUIUtils, t.Outlayer.Item)
        }(window, function (t, e, i, n, o) {
            "use strict";

            function s(t, e) {
                var i = n.getQueryElement(t);
                if (!i) return void (u && u.error("Bad element for " + this.constructor.namespace + ": " + (i || t)));
                this.element = i, h && (this.$element = h(this.element)), this.options = n.extend({}, this.constructor.defaults), this.option(e);
                var o = ++l;
                this.element.outlayerGUID = o, f[o] = this, this._create();
                var s = this._getOption("initLayout");
                s && this.layout()
            }

            function r(t) {
                function e() {
                    t.apply(this, arguments)
                }
                return e.prototype = Object.create(t.prototype), e.prototype.constructor = e, e
            }

            function a(t) {
                if ("number" == typeof t) return t;
                var e = t.match(/(^\d*\.?\d*)(\w*)/),
                    i = e && e[1],
                    n = e && e[2];
                if (!i.length) return 0;
                i = parseFloat(i);
                var o = c[n] || 1;
                return i * o
            }
            var u = t.console,
                h = t.jQuery,
                d = function () { },
                l = 0,
                f = {};
            s.namespace = "outlayer", s.Item = o, s.defaults = {
                containerStyle: {
                    position: "relative"
                },
                initLayout: !0,
                originLeft: !0,
                originTop: !0,
                resize: !0,
                resizeContainer: !0,
                transitionDuration: "0.4s",
                hiddenStyle: {
                    opacity: 0,
                    transform: "scale(0.001)"
                },
                visibleStyle: {
                    opacity: 1,
                    transform: "scale(1)"
                }
            };
            var m = s.prototype;
            n.extend(m, e.prototype), m.option = function (t) {
                n.extend(this.options, t)
            }, m._getOption = function (t) {
                var e = this.constructor.compatOptions[t];
                return e && void 0 !== this.options[e] ? this.options[e] : this.options[t]
            }, s.compatOptions = {
                initLayout: "isInitLayout",
                horizontal: "isHorizontal",
                layoutInstant: "isLayoutInstant",
                originLeft: "isOriginLeft",
                originTop: "isOriginTop",
                resize: "isResizeBound",
                resizeContainer: "isResizingContainer"
            }, m._create = function () {
                this.reloadItems(), this.stamps = [], this.stamp(this.options.stamp), n.extend(this.element.style, this.options.containerStyle);
                var t = this._getOption("resize");
                t && this.bindResize()
            }, m.reloadItems = function () {
                this.items = this._itemize(this.element.children)
            }, m._itemize = function (t) {
                for (var e = this._filterFindItemElements(t), i = this.constructor.Item, n = [], o = 0; o < e.length; o++) {
                    var s = e[o],
                        r = new i(s, this);
                    n.push(r)
                }
                return n
            }, m._filterFindItemElements = function (t) {
                return n.filterFindElements(t, this.options.itemSelector)
            }, m.getItemElements = function () {
                return this.items.map(function (t) {
                    return t.element
                })
            }, m.layout = function () {
                this._resetLayout(), this._manageStamps();
                var t = this._getOption("layoutInstant"),
                    e = void 0 !== t ? t : !this._isLayoutInited;
                this.layoutItems(this.items, e), this._isLayoutInited = !0
            }, m._init = m.layout, m._resetLayout = function () {
                this.getSize()
            }, m.getSize = function () {
                this.size = i(this.element)
            }, m._getMeasurement = function (t, e) {
                var n, o = this.options[t];
                o ? ("string" == typeof o ? n = this.element.querySelector(o) : o instanceof HTMLElement && (n = o), this[t] = n ? i(n)[e] : o) : this[t] = 0
            }, m.layoutItems = function (t, e) {
                t = this._getItemsForLayout(t), this._layoutItems(t, e), this._postLayout()
            }, m._getItemsForLayout = function (t) {
                return t.filter(function (t) {
                    return !t.isIgnored
                })
            }, m._layoutItems = function (t, e) {
                if (this._emitCompleteOnItems("layout", t), t && t.length) {
                    var i = [];
                    t.forEach(function (t) {
                        var n = this._getItemLayoutPosition(t);
                        n.item = t, n.isInstant = e || t.isLayoutInstant, i.push(n)
                    }, this), this._processLayoutQueue(i)
                }
            }, m._getItemLayoutPosition = function () {
                return {
                    x: 0,
                    y: 0
                }
            }, m._processLayoutQueue = function (t) {
                this.updateStagger(), t.forEach(function (t, e) {
                    this._positionItem(t.item, t.x, t.y, t.isInstant, e)
                }, this)
            }, m.updateStagger = function () {
                var t = this.options.stagger;
                return null === t || void 0 === t ? void (this.stagger = 0) : (this.stagger = a(t), this.stagger)
            }, m._positionItem = function (t, e, i, n, o) {
                n ? t.goTo(e, i) : (t.stagger(o * this.stagger), t.moveTo(e, i))
            }, m._postLayout = function () {
                this.resizeContainer()
            }, m.resizeContainer = function () {
                var t = this._getOption("resizeContainer");
                if (t) {
                    var e = this._getContainerSize();
                    e && (this._setContainerMeasure(e.width, !0), this._setContainerMeasure(e.height, !1))
                }
            }, m._getContainerSize = d, m._setContainerMeasure = function (t, e) {
                if (void 0 !== t) {
                    var i = this.size;
                    i.isBorderBox && (t += e ? i.paddingLeft + i.paddingRight + i.borderLeftWidth + i.borderRightWidth : i.paddingBottom + i.paddingTop + i.borderTopWidth + i.borderBottomWidth), t = Math.max(t, 0), this.element.style[e ? "width" : "height"] = t + "px"
                }
            }, m._emitCompleteOnItems = function (t, e) {
                function i() {
                    o.dispatchEvent(t + "Complete", null, [e])
                }

                function n() {
                    r++, r == s && i()
                }
                var o = this,
                    s = e.length;
                if (!e || !s) return void i();
                var r = 0;
                e.forEach(function (e) {
                    e.once(t, n)
                })
            }, m.dispatchEvent = function (t, e, i) {
                var n = e ? [e].concat(i) : i;
                if (this.emitEvent(t, n), h)
                    if (this.$element = this.$element || h(this.element), e) {
                        var o = h.Event(e);
                        o.type = t, this.$element.trigger(o, i)
                    } else this.$element.trigger(t, i)
            }, m.ignore = function (t) {
                var e = this.getItem(t);
                e && (e.isIgnored = !0)
            }, m.unignore = function (t) {
                var e = this.getItem(t);
                e && delete e.isIgnored
            }, m.stamp = function (t) {
                t = this._find(t), t && (this.stamps = this.stamps.concat(t), t.forEach(this.ignore, this))
            }, m.unstamp = function (t) {
                t = this._find(t), t && t.forEach(function (t) {
                    n.removeFrom(this.stamps, t), this.unignore(t)
                }, this)
            }, m._find = function (t) {
                return t ? ("string" == typeof t && (t = this.element.querySelectorAll(t)), t = n.makeArray(t)) : void 0
            }, m._manageStamps = function () {
                this.stamps && this.stamps.length && (this._getBoundingRect(), this.stamps.forEach(this._manageStamp, this))
            }, m._getBoundingRect = function () {
                var t = this.element.getBoundingClientRect(),
                    e = this.size;
                this._boundingRect = {
                    left: t.left + e.paddingLeft + e.borderLeftWidth,
                    top: t.top + e.paddingTop + e.borderTopWidth,
                    right: t.right - (e.paddingRight + e.borderRightWidth),
                    bottom: t.bottom - (e.paddingBottom + e.borderBottomWidth)
                }
            }, m._manageStamp = d, m._getElementOffset = function (t) {
                var e = t.getBoundingClientRect(),
                    n = this._boundingRect,
                    o = i(t),
                    s = {
                        left: e.left - n.left - o.marginLeft,
                        top: e.top - n.top - o.marginTop,
                        right: n.right - e.right - o.marginRight,
                        bottom: n.bottom - e.bottom - o.marginBottom
                    };
                return s
            }, m.handleEvent = n.handleEvent, m.bindResize = function () {
                t.addEventListener("resize", this), this.isResizeBound = !0
            }, m.unbindResize = function () {
                t.removeEventListener("resize", this), this.isResizeBound = !1
            }, m.onresize = function () {
                this.resize()
            }, n.debounceMethod(s, "onresize", 100), m.resize = function () {
                this.isResizeBound && this.needsResizeLayout() && this.layout()
            }, m.needsResizeLayout = function () {
                var t = i(this.element),
                    e = this.size && t;
                return e && t.innerWidth !== this.size.innerWidth
            }, m.addItems = function (t) {
                var e = this._itemize(t);
                return e.length && (this.items = this.items.concat(e)), e
            }, m.appended = function (t) {
                var e = this.addItems(t);
                e.length && (this.layoutItems(e, !0), this.reveal(e))
            }, m.prepended = function (t) {
                var e = this._itemize(t);
                if (e.length) {
                    var i = this.items.slice(0);
                    this.items = e.concat(i), this._resetLayout(), this._manageStamps(), this.layoutItems(e, !0), this.reveal(e), this.layoutItems(i)
                }
            }, m.reveal = function (t) {
                if (this._emitCompleteOnItems("reveal", t), t && t.length) {
                    var e = this.updateStagger();
                    t.forEach(function (t, i) {
                        t.stagger(i * e), t.reveal()
                    })
                }
            }, m.hide = function (t) {
                if (this._emitCompleteOnItems("hide", t), t && t.length) {
                    var e = this.updateStagger();
                    t.forEach(function (t, i) {
                        t.stagger(i * e), t.hide()
                    })
                }
            }, m.revealItemElements = function (t) {
                var e = this.getItems(t);
                this.reveal(e)
            }, m.hideItemElements = function (t) {
                var e = this.getItems(t);
                this.hide(e)
            }, m.getItem = function (t) {
                for (var e = 0; e < this.items.length; e++) {
                    var i = this.items[e];
                    if (i.element == t) return i
                }
            }, m.getItems = function (t) {
                t = n.makeArray(t);
                var e = [];
                return t.forEach(function (t) {
                    var i = this.getItem(t);
                    i && e.push(i)
                }, this), e
            }, m.remove = function (t) {
                var e = this.getItems(t);
                this._emitCompleteOnItems("remove", e), e && e.length && e.forEach(function (t) {
                    t.remove(), n.removeFrom(this.items, t)
                }, this)
            }, m.destroy = function () {
                var t = this.element.style;
                t.height = "", t.position = "", t.width = "", this.items.forEach(function (t) {
                    t.destroy()
                }), this.unbindResize();
                var e = this.element.outlayerGUID;
                delete f[e], delete this.element.outlayerGUID, h && h.removeData(this.element, this.constructor.namespace)
            }, s.data = function (t) {
                t = n.getQueryElement(t);
                var e = t && t.outlayerGUID;
                return e && f[e]
            }, s.create = function (t, e) {
                var i = r(s);
                return i.defaults = n.extend({}, s.defaults), n.extend(i.defaults, e), i.compatOptions = n.extend({}, s.compatOptions), i.namespace = t, i.data = s.data, i.Item = r(o), n.htmlInit(i, t), h && h.bridget && h.bridget(t, i), i
            };
            var c = {
                ms: 1,
                s: 1e3
            };
            return s.Item = o, s
        }),
        function (t, e) {
            "function" == typeof define && define.amd ? define("isotope/js/item", ["outlayer/outlayer"], e) : "object" == typeof module && module.exports ? module.exports = e(require("outlayer")) : (t.Isotope = t.Isotope || {}, t.Isotope.Item = e(t.Outlayer))
        }(window, function (t) {
            "use strict";

            function e() {
                t.Item.apply(this, arguments)
            }
            var i = e.prototype = Object.create(t.Item.prototype),
                n = i._create;
            i._create = function () {
                this.id = this.layout.itemGUID++, n.call(this), this.sortData = {}
            }, i.updateSortData = function () {
                if (!this.isIgnored) {
                    this.sortData.id = this.id, this.sortData["original-order"] = this.id, this.sortData.random = Math.random();
                    var t = this.layout.options.getSortData,
                        e = this.layout._sorters;
                    for (var i in t) {
                        var n = e[i];
                        this.sortData[i] = n(this.element, this)
                    }
                }
            };
            var o = i.destroy;
            return i.destroy = function () {
                o.apply(this, arguments), this.css({
                    display: ""
                })
            }, e
        }),
        function (t, e) {
            "function" == typeof define && define.amd ? define("isotope/js/layout-mode", ["get-size/get-size", "outlayer/outlayer"], e) : "object" == typeof module && module.exports ? module.exports = e(require("get-size"), require("outlayer")) : (t.Isotope = t.Isotope || {}, t.Isotope.LayoutMode = e(t.getSize, t.Outlayer))
        }(window, function (t, e) {
            "use strict";

            function i(t) {
                this.isotope = t, t && (this.options = t.options[this.namespace], this.element = t.element, this.items = t.filteredItems, this.size = t.size)
            }
            var n = i.prototype,
                o = ["_resetLayout", "_getItemLayoutPosition", "_manageStamp", "_getContainerSize", "_getElementOffset", "needsResizeLayout", "_getOption"];
            return o.forEach(function (t) {
                n[t] = function () {
                    return e.prototype[t].apply(this.isotope, arguments)
                }
            }), n.needsVerticalResizeLayout = function () {
                var e = t(this.isotope.element),
                    i = this.isotope.size && e;
                return i && e.innerHeight != this.isotope.size.innerHeight
            }, n._getMeasurement = function () {
                this.isotope._getMeasurement.apply(this, arguments)
            }, n.getColumnWidth = function () {
                this.getSegmentSize("column", "Width")
            }, n.getRowHeight = function () {
                this.getSegmentSize("row", "Height")
            }, n.getSegmentSize = function (t, e) {
                var i = t + e,
                    n = "outer" + e;
                if (this._getMeasurement(i, n), !this[i]) {
                    var o = this.getFirstItemSize();
                    this[i] = o && o[n] || this.isotope.size["inner" + e]
                }
            }, n.getFirstItemSize = function () {
                var e = this.isotope.filteredItems[0];
                return e && e.element && t(e.element)
            }, n.layout = function () {
                this.isotope.layout.apply(this.isotope, arguments)
            }, n.getSize = function () {
                this.isotope.getSize(), this.size = this.isotope.size
            }, i.modes = {}, i.create = function (t, e) {
                function o() {
                    i.apply(this, arguments)
                }
                return o.prototype = Object.create(n), o.prototype.constructor = o, e && (o.options = e), o.prototype.namespace = t, i.modes[t] = o, o
            }, i
        }),
        function (t, e) {
            "function" == typeof define && define.amd ? define("masonry/masonry", ["outlayer/outlayer", "get-size/get-size"], e) : "object" == typeof module && module.exports ? module.exports = e(require("outlayer"), require("get-size")) : t.Masonry = e(t.Outlayer, t.getSize)
        }(window, function (t, e) {
            var i = t.create("masonry");
            return i.compatOptions.fitWidth = "isFitWidth", i.prototype._resetLayout = function () {
                this.getSize(), this._getMeasurement("columnWidth", "outerWidth"), this._getMeasurement("gutter", "outerWidth"), this.measureColumns(), this.colYs = [];
                for (var t = 0; t < this.cols; t++) this.colYs.push(0);
                this.maxY = 0
            }, i.prototype.measureColumns = function () {
                if (this.getContainerWidth(), !this.columnWidth) {
                    var t = this.items[0],
                        i = t && t.element;
                    this.columnWidth = i && e(i).outerWidth || this.containerWidth
                }
                var n = this.columnWidth += this.gutter,
                    o = this.containerWidth + this.gutter,
                    s = o / n,
                    r = n - o % n,
                    a = r && 1 > r ? "round" : "floor";
                s = Math[a](s), this.cols = Math.max(s, 1)
            }, i.prototype.getContainerWidth = function () {
                var t = this._getOption("fitWidth"),
                    i = t ? this.element.parentNode : this.element,
                    n = e(i);
                this.containerWidth = n && n.innerWidth
            }, i.prototype._getItemLayoutPosition = function (t) {
                t.getSize();
                var e = t.size.outerWidth % this.columnWidth,
                    i = e && 1 > e ? "round" : "ceil",
                    n = Math[i](t.size.outerWidth / this.columnWidth);
                n = Math.min(n, this.cols);
                for (var o = this._getColGroup(n), s = Math.min.apply(Math, o), r = o.indexOf(s), a = {
                    x: this.columnWidth * r,
                    y: s
                }, u = s + t.size.outerHeight, h = this.cols + 1 - o.length, d = 0; h > d; d++) this.colYs[r + d] = u;
                return a
            }, i.prototype._getColGroup = function (t) {
                if (2 > t) return this.colYs;
                for (var e = [], i = this.cols + 1 - t, n = 0; i > n; n++) {
                    var o = this.colYs.slice(n, n + t);
                    e[n] = Math.max.apply(Math, o)
                }
                return e
            }, i.prototype._manageStamp = function (t) {
                var i = e(t),
                    n = this._getElementOffset(t),
                    o = this._getOption("originLeft"),
                    s = o ? n.left : n.right,
                    r = s + i.outerWidth,
                    a = Math.floor(s / this.columnWidth);
                a = Math.max(0, a);
                var u = Math.floor(r / this.columnWidth);
                u -= r % this.columnWidth ? 0 : 1, u = Math.min(this.cols - 1, u);
                for (var h = this._getOption("originTop"), d = (h ? n.top : n.bottom) + i.outerHeight, l = a; u >= l; l++) this.colYs[l] = Math.max(d, this.colYs[l])
            }, i.prototype._getContainerSize = function () {
                this.maxY = Math.max.apply(Math, this.colYs);
                var t = {
                    height: this.maxY
                };
                return this._getOption("fitWidth") && (t.width = this._getContainerFitWidth()), t
            }, i.prototype._getContainerFitWidth = function () {
                for (var t = 0, e = this.cols; --e && 0 === this.colYs[e];) t++;
                return (this.cols - t) * this.columnWidth - this.gutter
            }, i.prototype.needsResizeLayout = function () {
                var t = this.containerWidth;
                return this.getContainerWidth(), t != this.containerWidth
            }, i
        }),
        function (t, e) {
            "function" == typeof define && define.amd ? define("isotope/js/layout-modes/masonry", ["../layout-mode", "masonry/masonry"], e) : "object" == typeof module && module.exports ? module.exports = e(require("../layout-mode"), require("masonry-layout")) : e(t.Isotope.LayoutMode, t.Masonry)
        }(window, function (t, e) {
            "use strict";
            var i = t.create("masonry"),
                n = i.prototype,
                o = {
                    _getElementOffset: !0,
                    layout: !0,
                    _getMeasurement: !0
                };
            for (var s in e.prototype) o[s] || (n[s] = e.prototype[s]);
            var r = n.measureColumns;
            n.measureColumns = function () {
                this.items = this.isotope.filteredItems, r.call(this)
            };
            var a = n._getOption;
            return n._getOption = function (t) {
                return "fitWidth" == t ? void 0 !== this.options.isFitWidth ? this.options.isFitWidth : this.options.fitWidth : a.apply(this.isotope, arguments)
            }, i
        }),
        function (t, e) {
            "function" == typeof define && define.amd ? define("isotope/js/layout-modes/fit-rows", ["../layout-mode"], e) : "object" == typeof exports ? module.exports = e(require("../layout-mode")) : e(t.Isotope.LayoutMode)
        }(window, function (t) {
            "use strict";
            var e = t.create("fitRows"),
                i = e.prototype;
            return i._resetLayout = function () {
                this.x = 0, this.y = 0, this.maxY = 0, this._getMeasurement("gutter", "outerWidth")
            }, i._getItemLayoutPosition = function (t) {
                t.getSize();
                var e = t.size.outerWidth + this.gutter,
                    i = this.isotope.size.innerWidth + this.gutter;
                0 !== this.x && e + this.x > i && (this.x = 0, this.y = this.maxY);
                var n = {
                    x: this.x,
                    y: this.y
                };
                return this.maxY = Math.max(this.maxY, this.y + t.size.outerHeight), this.x += e, n
            }, i._getContainerSize = function () {
                return {
                    height: this.maxY
                }
            }, e
        }),
        function (t, e) {
            "function" == typeof define && define.amd ? define("isotope/js/layout-modes/vertical", ["../layout-mode"], e) : "object" == typeof module && module.exports ? module.exports = e(require("../layout-mode")) : e(t.Isotope.LayoutMode)
        }(window, function (t) {
            "use strict";
            var e = t.create("vertical", {
                horizontalAlignment: 0
            }),
                i = e.prototype;
            return i._resetLayout = function () {
                this.y = 0
            }, i._getItemLayoutPosition = function (t) {
                t.getSize();
                var e = (this.isotope.size.innerWidth - t.size.outerWidth) * this.options.horizontalAlignment,
                    i = this.y;
                return this.y += t.size.outerHeight, {
                    x: e,
                    y: i
                }
            }, i._getContainerSize = function () {
                return {
                    height: this.y
                }
            }, e
        }),
        function (t, e) {
            "function" == typeof define && define.amd ? define(["outlayer/outlayer", "get-size/get-size", "desandro-matches-selector/matches-selector", "fizzy-ui-utils/utils", "isotope/js/item", "isotope/js/layout-mode", "isotope/js/layout-modes/masonry", "isotope/js/layout-modes/fit-rows", "isotope/js/layout-modes/vertical"], function (i, n, o, s, r, a) {
                return e(t, i, n, o, s, r, a)
            }) : "object" == typeof module && module.exports ? module.exports = e(t, require("outlayer"), require("get-size"), require("desandro-matches-selector"), require("fizzy-ui-utils"), require("isotope/js/item"), require("isotope/js/layout-mode"), require("isotope/js/layout-modes/masonry"), require("isotope/js/layout-modes/fit-rows"), require("isotope/js/layout-modes/vertical")) : t.Isotope = e(t, t.Outlayer, t.getSize, t.matchesSelector, t.fizzyUIUtils, t.Isotope.Item, t.Isotope.LayoutMode)
        }(window, function (t, e, i, n, o, s, r) {
            function a(t, e) {
                return function (i, n) {
                    for (var o = 0; o < t.length; o++) {
                        var s = t[o],
                            r = i.sortData[s],
                            a = n.sortData[s];
                        if (r > a || a > r) {
                            var u = void 0 !== e[s] ? e[s] : e,
                                h = u ? 1 : -1;
                            return (r > a ? 1 : -1) * h
                        }
                    }
                    return 0
                }
            }
            var u = t.jQuery,
                h = String.prototype.trim ? function (t) {
                    return t.trim()
                } : function (t) {
                    return t.replace(/^\s+|\s+$/g, "")
                },
                d = e.create("isotope", {
                    layoutMode: "masonry",
                    isJQueryFiltering: !0,
                    sortAscending: !0
                });
            d.Item = s, d.LayoutMode = r;
            var l = d.prototype;
            l._create = function () {
                this.itemGUID = 0, this._sorters = {}, this._getSorters(), e.prototype._create.call(this), this.modes = {}, this.filteredItems = this.items, this.sortHistory = ["original-order"];
                for (var t in r.modes) this._initLayoutMode(t)
            }, l.reloadItems = function () {
                this.itemGUID = 0, e.prototype.reloadItems.call(this)
            }, l._itemize = function () {
                for (var t = e.prototype._itemize.apply(this, arguments), i = 0; i < t.length; i++) {
                    var n = t[i];
                    n.id = this.itemGUID++
                }
                return this._updateItemsSortData(t), t
            }, l._initLayoutMode = function (t) {
                var e = r.modes[t],
                    i = this.options[t] || {};
                this.options[t] = e.options ? o.extend(e.options, i) : i, this.modes[t] = new e(this)
            }, l.layout = function () {
                return !this._isLayoutInited && this._getOption("initLayout") ? void this.arrange() : void this._layout()
            }, l._layout = function () {
                var t = this._getIsInstant();
                this._resetLayout(), this._manageStamps(), this.layoutItems(this.filteredItems, t), this._isLayoutInited = !0
            }, l.arrange = function (t) {
                this.option(t), this._getIsInstant();
                var e = this._filter(this.items);
                this.filteredItems = e.matches, this._bindArrangeComplete(), this._isInstant ? this._noTransition(this._hideReveal, [e]) : this._hideReveal(e), this._sort(), this._layout()
            }, l._init = l.arrange, l._hideReveal = function (t) {
                this.reveal(t.needReveal), this.hide(t.needHide)
            }, l._getIsInstant = function () {
                var t = this._getOption("layoutInstant"),
                    e = void 0 !== t ? t : !this._isLayoutInited;
                return this._isInstant = e, e
            }, l._bindArrangeComplete = function () {
                function t() {
                    e && i && n && o.dispatchEvent("arrangeComplete", null, [o.filteredItems])
                }
                var e, i, n, o = this;
                this.once("layoutComplete", function () {
                    e = !0, t()
                }), this.once("hideComplete", function () {
                    i = !0, t()
                }), this.once("revealComplete", function () {
                    n = !0, t()
                })
            }, l._filter = function (t) {
                var e = this.options.filter;
                e = e || "*";
                for (var i = [], n = [], o = [], s = this._getFilterTest(e), r = 0; r < t.length; r++) {
                    var a = t[r];
                    if (!a.isIgnored) {
                        var u = s(a);
                        u && i.push(a), u && a.isHidden ? n.push(a) : u || a.isHidden || o.push(a)
                    }
                }
                return {
                    matches: i,
                    needReveal: n,
                    needHide: o
                }
            }, l._getFilterTest = function (t) {
                return u && this.options.isJQueryFiltering ? function (e) {
                    return u(e.element).is(t)
                } : "function" == typeof t ? function (e) {
                    return t(e.element)
                } : function (e) {
                    return n(e.element, t)
                }
            }, l.updateSortData = function (t) {
                var e;
                t ? (t = o.makeArray(t), e = this.getItems(t)) : e = this.items, this._getSorters(), this._updateItemsSortData(e)
            }, l._getSorters = function () {
                var t = this.options.getSortData;
                for (var e in t) {
                    var i = t[e];
                    this._sorters[e] = f(i)
                }
            }, l._updateItemsSortData = function (t) {
                for (var e = t && t.length, i = 0; e && e > i; i++) {
                    var n = t[i];
                    n.updateSortData()
                }
            };
            var f = function () {
                function t(t) {
                    if ("string" != typeof t) return t;
                    var i = h(t).split(" "),
                        n = i[0],
                        o = n.match(/^\[(.+)\]$/),
                        s = o && o[1],
                        r = e(s, n),
                        a = d.sortDataParsers[i[1]];
                    return t = a ? function (t) {
                        return t && a(r(t))
                    } : function (t) {
                        return t && r(t)
                    }
                }

                function e(t, e) {
                    return t ? function (e) {
                        return e.getAttribute(t)
                    } : function (t) {
                        var i = t.querySelector(e);
                        return i && i.textContent
                    }
                }
                return t
            }();
            d.sortDataParsers = {
                parseInt: function (t) {
                    return parseInt(t, 10)
                },
                parseFloat: function (t) {
                    return parseFloat(t)
                }
            }, l._sort = function () {
                if (this.options.sortBy) {
                    var t = o.makeArray(this.options.sortBy);
                    this._getIsSameSortBy(t) || (this.sortHistory = t.concat(this.sortHistory));
                    var e = a(this.sortHistory, this.options.sortAscending);
                    this.filteredItems.sort(e)
                }
            }, l._getIsSameSortBy = function (t) {
                for (var e = 0; e < t.length; e++)
                    if (t[e] != this.sortHistory[e]) return !1;
                return !0
            }, l._mode = function () {
                var t = this.options.layoutMode,
                    e = this.modes[t];
                if (!e) throw new Error("No layout mode: " + t);
                return e.options = this.options[t], e
            }, l._resetLayout = function () {
                e.prototype._resetLayout.call(this), this._mode()._resetLayout()
            }, l._getItemLayoutPosition = function (t) {
                return this._mode()._getItemLayoutPosition(t)
            }, l._manageStamp = function (t) {
                this._mode()._manageStamp(t)
            }, l._getContainerSize = function () {
                return this._mode()._getContainerSize()
            }, l.needsResizeLayout = function () {
                return this._mode().needsResizeLayout()
            }, l.appended = function (t) {
                var e = this.addItems(t);
                if (e.length) {
                    var i = this._filterRevealAdded(e);
                    this.filteredItems = this.filteredItems.concat(i)
                }
            }, l.prepended = function (t) {
                var e = this._itemize(t);
                if (e.length) {
                    this._resetLayout(), this._manageStamps();
                    var i = this._filterRevealAdded(e);
                    this.layoutItems(this.filteredItems), this.filteredItems = i.concat(this.filteredItems), this.items = e.concat(this.items)
                }
            }, l._filterRevealAdded = function (t) {
                var e = this._filter(t);
                return this.hide(e.needHide), this.reveal(e.matches), this.layoutItems(e.matches, !0), e.matches
            }, l.insert = function (t) {
                var e = this.addItems(t);
                if (e.length) {
                    var i, n, o = e.length;
                    for (i = 0; o > i; i++) n = e[i], this.element.appendChild(n.element);
                    var s = this._filter(e).matches;
                    for (i = 0; o > i; i++) e[i].isLayoutInstant = !0;
                    for (this.arrange(), i = 0; o > i; i++) delete e[i].isLayoutInstant;
                    this.reveal(s)
                }
            };
            var m = l.remove;
            return l.remove = function (t) {
                t = o.makeArray(t);
                var e = this.getItems(t);
                m.call(this, t);
                for (var i = e && e.length, n = 0; i && i > n; n++) {
                    var s = e[n];
                    o.removeFrom(this.filteredItems, s)
                }
            }, l.shuffle = function () {
                for (var t = 0; t < this.items.length; t++) {
                    var e = this.items[t];
                    e.sortData.random = Math.random()
                }
                this.options.sortBy = "random", this._sort(), this._layout()
            }, l._noTransition = function (t, e) {
                var i = this.options.transitionDuration;
                this.options.transitionDuration = 0;
                var n = t.apply(this, e);
                return this.options.transitionDuration = i, n
            }, l.getFilteredItemElements = function () {
                return this.filteredItems.map(function (t) {
                    return t.element
                })
            }, d
        }), ! function (t, e) {
            "function" == typeof define && define.amd ? define("ev-emitter/ev-emitter", e) : "object" == typeof module && module.exports ? module.exports = e() : t.EvEmitter = e()
        }("undefined" != typeof window ? window : this, function () {
            function t() { }
            var e = t.prototype;
            return e.on = function (t, e) {
                if (t && e) {
                    var i = this._events = this._events || {},
                        n = i[t] = i[t] || [];
                    return -1 == n.indexOf(e) && n.push(e), this
                }
            }, e.once = function (t, e) {
                if (t && e) {
                    this.on(t, e);
                    var i = this._onceEvents = this._onceEvents || {},
                        n = i[t] = i[t] || {};
                    return n[e] = !0, this
                }
            }, e.off = function (t, e) {
                var i = this._events && this._events[t];
                if (i && i.length) {
                    var n = i.indexOf(e);
                    return -1 != n && i.splice(n, 1), this
                }
            }, e.emitEvent = function (t, e) {
                var i = this._events && this._events[t];
                if (i && i.length) {
                    var n = 0,
                        o = i[n];
                    e = e || [];
                    for (var r = this._onceEvents && this._onceEvents[t]; o;) {
                        var s = r && r[o];
                        s && (this.off(t, o), delete r[o]), o.apply(this, e), n += s ? 0 : 1, o = i[n]
                    }
                    return this
                }
            }, t
        }),
        function (t, e) {
            "use strict";
            "function" == typeof define && define.amd ? define(["ev-emitter/ev-emitter"], function (i) {
                return e(t, i)
            }) : "object" == typeof module && module.exports ? module.exports = e(t, require("ev-emitter")) : t.imagesLoaded = e(t, t.EvEmitter)
        }(window, function (t, e) {
            function i(t, e) {
                for (var i in e) t[i] = e[i];
                return t
            }

            function n(t) {
                var e = [];
                if (Array.isArray(t)) e = t;
                else if ("number" == typeof t.length)
                    for (var i = 0; i < t.length; i++) e.push(t[i]);
                else e.push(t);
                return e
            }

            function o(t, e, r) {
                return this instanceof o ? ("string" == typeof t && (t = document.querySelectorAll(t)), this.elements = n(t), this.options = i({}, this.options), "function" == typeof e ? r = e : i(this.options, e), r && this.on("always", r), this.getImages(), h && (this.jqDeferred = new h.Deferred), void setTimeout(function () {
                    this.check()
                }.bind(this))) : new o(t, e, r)
            }

            function r(t) {
                this.img = t
            }

            function s(t, e) {
                this.url = t, this.element = e, this.img = new Image
            }
            var h = t.jQuery,
                a = t.console;
            o.prototype = Object.create(e.prototype), o.prototype.options = {}, o.prototype.getImages = function () {
                this.images = [], this.elements.forEach(this.addElementImages, this)
            }, o.prototype.addElementImages = function (t) {
                "IMG" == t.nodeName && this.addImage(t), this.options.background === !0 && this.addElementBackgroundImages(t);
                var e = t.nodeType;
                if (e && d[e]) {
                    for (var i = t.querySelectorAll("img"), n = 0; n < i.length; n++) {
                        var o = i[n];
                        this.addImage(o)
                    }
                    if ("string" == typeof this.options.background) {
                        var r = t.querySelectorAll(this.options.background);
                        for (n = 0; n < r.length; n++) {
                            var s = r[n];
                            this.addElementBackgroundImages(s)
                        }
                    }
                }
            };
            var d = {
                1: !0,
                9: !0,
                11: !0
            };
            return o.prototype.addElementBackgroundImages = function (t) {
                var e = getComputedStyle(t);
                if (e)
                    for (var i = /url\((['"])?(.*?)\1\)/gi, n = i.exec(e.backgroundImage) ; null !== n;) {
                        var o = n && n[2];
                        o && this.addBackground(o, t), n = i.exec(e.backgroundImage)
                    }
            }, o.prototype.addImage = function (t) {
                var e = new r(t);
                this.images.push(e)
            }, o.prototype.addBackground = function (t, e) {
                var i = new s(t, e);
                this.images.push(i)
            }, o.prototype.check = function () {
                function t(t, i, n) {
                    setTimeout(function () {
                        e.progress(t, i, n)
                    })
                }
                var e = this;
                return this.progressedCount = 0, this.hasAnyBroken = !1, this.images.length ? void this.images.forEach(function (e) {
                    e.once("progress", t), e.check()
                }) : void this.complete()
            }, o.prototype.progress = function (t, e, i) {
                this.progressedCount++, this.hasAnyBroken = this.hasAnyBroken || !t.isLoaded, this.emitEvent("progress", [this, t, e]), this.jqDeferred && this.jqDeferred.notify && this.jqDeferred.notify(this, t), this.progressedCount == this.images.length && this.complete(), this.options.debug && a && a.log("progress: " + i, t, e)
            }, o.prototype.complete = function () {
                var t = this.hasAnyBroken ? "fail" : "done";
                if (this.isComplete = !0, this.emitEvent(t, [this]), this.emitEvent("always", [this]), this.jqDeferred) {
                    var e = this.hasAnyBroken ? "reject" : "resolve";
                    this.jqDeferred[e](this)
                }
            }, r.prototype = Object.create(e.prototype), r.prototype.check = function () {
                var t = this.getIsImageComplete();
                return t ? void this.confirm(0 !== this.img.naturalWidth, "naturalWidth") : (this.proxyImage = new Image, this.proxyImage.addEventListener("load", this), this.proxyImage.addEventListener("error", this), this.img.addEventListener("load", this), this.img.addEventListener("error", this), void (this.proxyImage.src = this.img.src))
            }, r.prototype.getIsImageComplete = function () {
                return this.img.complete && void 0 !== this.img.naturalWidth
            }, r.prototype.confirm = function (t, e) {
                this.isLoaded = t, this.emitEvent("progress", [this, this.img, e])
            }, r.prototype.handleEvent = function (t) {
                var e = "on" + t.type;
                this[e] && this[e](t)
            }, r.prototype.onload = function () {
                this.confirm(!0, "onload"), this.unbindEvents()
            }, r.prototype.onerror = function () {
                this.confirm(!1, "onerror"), this.unbindEvents()
            }, r.prototype.unbindEvents = function () {
                this.proxyImage.removeEventListener("load", this), this.proxyImage.removeEventListener("error", this), this.img.removeEventListener("load", this), this.img.removeEventListener("error", this)
            }, s.prototype = Object.create(r.prototype), s.prototype.check = function () {
                this.img.addEventListener("load", this), this.img.addEventListener("error", this), this.img.src = this.url;
                var t = this.getIsImageComplete();
                t && (this.confirm(0 !== this.img.naturalWidth, "naturalWidth"), this.unbindEvents())
            }, s.prototype.unbindEvents = function () {
                this.img.removeEventListener("load", this), this.img.removeEventListener("error", this)
            }, s.prototype.confirm = function (t, e) {
                this.isLoaded = t, this.emitEvent("progress", [this, this.element, e])
            }, o.makeJQueryPlugin = function (e) {
                e = e || t.jQuery, e && (h = e, h.fn.imagesLoaded = function (t, e) {
                    var i = new o(this, t, e);
                    return i.jqDeferred.promise(h(this))
                })
            }, o.makeJQueryPlugin(), o
        }), ! function (a, b, c) {
            "use strict";

            function e(b, d) {
                if (this.el = b, this.$el = a(b), this.s = a.extend({}, f, d), this.s.dynamic && "undefined" !== this.s.dynamicEl && this.s.dynamicEl.constructor === Array && !this.s.dynamicEl.length) throw "When using dynamic mode, you must also define dynamicEl as an Array.";
                return this.modules = {}, this.lGalleryOn = !1, this.lgBusy = !1, this.hideBartimeout = !1, this.isTouch = "ontouchstart" in c.documentElement, this.s.slideEndAnimatoin && (this.s.hideControlOnEnd = !1), this.$items = this.s.dynamic ? this.s.dynamicEl : "this" === this.s.selector ? this.$el : "" !== this.s.selector ? this.s.selectWithin ? a(this.s.selectWithin).find(this.s.selector) : this.$el.find(a(this.s.selector)) : this.$el.children(), this.$slide = "", this.$outer = "", this.init(), this
            }
            var f = {
                mode: "lg-slide",
                cssEasing: "ease",
                easing: "linear",
                speed: 600,
                height: "100%",
                width: "100%",
                addClass: "",
                startClass: "lg-start-zoom",
                backdropDuration: 150,
                hideBarsDelay: 6e3,
                useLeft: !1,
                closable: !0,
                loop: !0,
                escKey: !0,
                keyPress: !0,
                controls: !0,
                slideEndAnimatoin: !0,
                hideControlOnEnd: !1,
                mousewheel: !0,
                getCaptionFromTitleOrAlt: !0,
                appendSubHtmlTo: ".lg-sub-html",
                preload: 1,
                showAfterLoad: !0,
                selector: "",
                selectWithin: "",
                nextHtml: "",
                prevHtml: "",
                index: !1,
                iframeMaxWidth: "100%",
                download: !0,
                counter: !0,
                appendCounterTo: ".lg-toolbar",
                swipeThreshold: 50,
                enableSwipe: !0,
                enableDrag: !0,
                dynamic: !1,
                dynamicEl: [],
                galleryId: 1
            };
            e.prototype.init = function () {
                var c = this;
                c.s.preload > c.$items.length && (c.s.preload = c.$items.length);
                var d = b.location.hash;
                d.indexOf("lg=" + this.s.galleryId) > 0 && (c.index = parseInt(d.split("&slide=")[1], 10), a("body").addClass("lg-from-hash"), a("body").hasClass("lg-on") || setTimeout(function () {
                    c.build(c.index), a("body").addClass("lg-on")
                })), c.s.dynamic ? (c.$el.trigger("onBeforeOpen.lg"), c.index = c.s.index || 0, a("body").hasClass("lg-on") || setTimeout(function () {
                    c.build(c.index), a("body").addClass("lg-on")
                })) : c.$items.on("click.lgcustom", function (b) {
                    try {
                        b.preventDefault(), b.preventDefault()
                    } catch (d) {
                        b.returnValue = !1
                    }
                    c.$el.trigger("onBeforeOpen.lg"), c.index = c.s.index || c.$items.index(this), a("body").hasClass("lg-on") || (c.build(c.index), a("body").addClass("lg-on"))
                })
            }, e.prototype.build = function (b) {
                var c = this;
                c.structure(), a.each(a.fn.lightGallery.modules, function (b) {
                    c.modules[b] = new a.fn.lightGallery.modules[b](c.el)
                }), c.slide(b, !1, !1), c.s.keyPress && c.keyPress(), c.$items.length > 1 && (c.arrow(), setTimeout(function () {
                    c.enableDrag(), c.enableSwipe()
                }, 50), c.s.mousewheel && c.mousewheel()), c.counter(), c.closeGallery(), c.$el.trigger("onAfterOpen.lg"), c.$outer.on("mousemove.lg click.lg touchstart.lg", function () {
                    c.$outer.removeClass("lg-hide-items"), clearTimeout(c.hideBartimeout), c.hideBartimeout = setTimeout(function () {
                        c.$outer.addClass("lg-hide-items")
                    }, c.s.hideBarsDelay)
                })
            }, e.prototype.structure = function () {
                var c, d = "",
                    e = "",
                    f = 0,
                    g = "",
                    h = this;
                for (a("body").append('<div class="lg-backdrop"></div>'), a(".lg-backdrop").css("transition-duration", this.s.backdropDuration + "ms"), f = 0; f < this.$items.length; f++) d += '<div class="lg-item"></div>';
                if (this.s.controls && this.$items.length > 1 && (e = '<div class="lg-actions"><div class="lg-prev lg-icon">' + this.s.prevHtml + '</div><div class="lg-next lg-icon">' + this.s.nextHtml + "</div></div>"), ".lg-sub-html" === this.s.appendSubHtmlTo && (g = '<div class="lg-sub-html"></div>'), c = '<div class="lg-outer ' + this.s.addClass + " " + this.s.startClass + '"><div class="lg" style="width:' + this.s.width + "; height:" + this.s.height + '"><div class="lg-inner">' + d + '</div><div class="lg-toolbar group"><span class="lg-close lg-icon"></span></div>' + e + g + "</div></div>", a("body").append(c), this.$outer = a(".lg-outer"), this.$slide = this.$outer.find(".lg-item"), this.s.useLeft ? (this.$outer.addClass("lg-use-left"), this.s.mode = "lg-slide") : this.$outer.addClass("lg-use-css3"), h.setTop(), a(b).on("resize.lg orientationchange.lg", function () {
                        setTimeout(function () {
                            h.setTop()
                }, 100)
                }), this.$slide.eq(this.index).addClass("lg-current"), this.doCss() ? this.$outer.addClass("lg-css3") : (this.$outer.addClass("lg-css"), this.s.speed = 0), this.$outer.addClass(this.s.mode), this.s.enableDrag && this.$items.length > 1 && this.$outer.addClass("lg-grab"), this.s.showAfterLoad && this.$outer.addClass("lg-show-after-load"), this.doCss()) {
                    var i = this.$outer.find(".lg-inner");
                    i.css("transition-timing-function", this.s.cssEasing), i.css("transition-duration", this.s.speed + "ms")
                }
                a(".lg-backdrop").addClass("in"), setTimeout(function () {
                    h.$outer.addClass("lg-visible")
                }, this.s.backdropDuration), this.s.download && this.$outer.find(".lg-toolbar").append('<a id="lg-download" target="_blank" download class="lg-download lg-icon"></a>'), this.prevScrollTop = a(b).scrollTop()
            }, e.prototype.setTop = function () {
                if ("100%" !== this.s.height) {
                    var c = a(b).height(),
                        d = (c - parseInt(this.s.height, 10)) / 2,
                        e = this.$outer.find(".lg");
                    c >= parseInt(this.s.height, 10) ? e.css("top", d + "px") : e.css("top", "0px")
                }
            }, e.prototype.doCss = function () {
                var a = function () {
                    var a = ["transition", "MozTransition", "WebkitTransition", "OTransition", "msTransition", "KhtmlTransition"],
                        b = c.documentElement,
                        d = 0;
                    for (d = 0; d < a.length; d++)
                        if (a[d] in b.style) return !0
                };
                return !!a()
            }, e.prototype.isVideo = function (a, b) {
                var c;
                if (c = this.s.dynamic ? this.s.dynamicEl[b].html : this.$items.eq(b).attr("data-html"), !a && c) return {
                    html5: !0
                };
                var d = a.match(/\/\/(?:www\.)?youtu(?:\.be|be\.com)\/(?:watch\?v=|embed\/)?([a-z0-9\-\_\%]+)/i),
                    e = a.match(/\/\/(?:www\.)?vimeo.com\/([0-9a-z\-_]+)/i),
                    f = a.match(/\/\/(?:www\.)?dai.ly\/([0-9a-z\-_]+)/i),
                    g = a.match(/\/\/(?:www\.)?(?:vk\.com|vkontakte\.ru)\/(?:video_ext\.php\?)(.*)/i);
                return d ? {
                    youtube: d
                } : e ? {
                    vimeo: e
                } : f ? {
                    dailymotion: f
                } : g ? {
                    vk: g
                } : void 0
            }, e.prototype.counter = function () {
                this.s.counter && a(this.s.appendCounterTo).append('<div id="lg-counter"><span id="lg-counter-current">' + (parseInt(this.index, 10) + 1) + '</span> / <span id="lg-counter-all">' + this.$items.length + "</span></div>")
            }, e.prototype.addHtml = function (b) {
                var c, d = null;
                if (this.s.dynamic ? this.s.dynamicEl[b].subHtmlUrl ? c = this.s.dynamicEl[b].subHtmlUrl : d = this.s.dynamicEl[b].subHtml : this.$items.eq(b).attr("data-sub-html-url") ? c = this.$items.eq(b).attr("data-sub-html-url") : (d = this.$items.eq(b).attr("data-sub-html"), this.s.getCaptionFromTitleOrAlt && !d && (d = this.$items.eq(b).attr("title") || this.$items.eq(b).find("img").first().attr("alt"))), !c)
                    if ("undefined" != typeof d && null !== d) {
                        var e = d.substring(0, 1);
                        "." !== e && "#" !== e || (d = a(d).html())
                    } else d = "";
                ".lg-sub-html" === this.s.appendSubHtmlTo ? c ? this.$outer.find(this.s.appendSubHtmlTo).load(c) : this.$outer.find(this.s.appendSubHtmlTo).html(d) : c ? this.$slide.eq(b).load(c) : this.$slide.eq(b).append(d), "undefined" != typeof d && null !== d && ("" === d ? this.$outer.find(this.s.appendSubHtmlTo).addClass("lg-empty-html") : this.$outer.find(this.s.appendSubHtmlTo).removeClass("lg-empty-html")), this.$el.trigger("onAfterAppendSubHtml.lg", [b])
            }, e.prototype.preload = function (a) {
                var b = 1,
                    c = 1;
                for (b = 1; b <= this.s.preload && !(b >= this.$items.length - a) ; b++) this.loadContent(a + b, !1, 0);
                for (c = 1; c <= this.s.preload && !(0 > a - c) ; c++) this.loadContent(a - c, !1, 0)
            }, e.prototype.loadContent = function (c, d, e) {
                var f, g, h, i, j, k, l = this,
                    m = !1,
                    n = function (c) {
                        for (var d = [], e = [], f = 0; f < c.length; f++) {
                            var h = c[f].split(" ");
                            "" === h[0] && h.splice(0, 1), e.push(h[0]), d.push(h[1])
                        }
                        for (var i = a(b).width(), j = 0; j < d.length; j++)
                            if (parseInt(d[j], 10) > i) {
                                g = e[j];
                                break
                            }
                    };
                if (l.s.dynamic) {
                    if (l.s.dynamicEl[c].poster && (m = !0, h = l.s.dynamicEl[c].poster), k = l.s.dynamicEl[c].html, g = l.s.dynamicEl[c].src, l.s.dynamicEl[c].responsive) {
                        var o = l.s.dynamicEl[c].responsive.split(",");
                        n(o)
                    }
                    i = l.s.dynamicEl[c].srcset, j = l.s.dynamicEl[c].sizes
                } else {
                    if (l.$items.eq(c).attr("data-poster") && (m = !0, h = l.$items.eq(c).attr("data-poster")), k = l.$items.eq(c).attr("data-html"), g = l.$items.eq(c).attr("href") || l.$items.eq(c).attr("data-src"), l.$items.eq(c).attr("data-responsive")) {
                        var p = l.$items.eq(c).attr("data-responsive").split(",");
                        n(p)
                    }
                    i = l.$items.eq(c).attr("data-srcset"), j = l.$items.eq(c).attr("data-sizes")
                }
                var q = !1;
                l.s.dynamic ? l.s.dynamicEl[c].iframe && (q = !0) : "true" === l.$items.eq(c).attr("data-iframe") && (q = !0);
                var r = l.isVideo(g, c);
                if (!l.$slide.eq(c).hasClass("lg-loaded")) {
                    if (q) l.$slide.eq(c).prepend('<div class="lg-video-cont" style="max-width:' + l.s.iframeMaxWidth + '"><div class="lg-video"><iframe class="lg-object" frameborder="0" src="' + g + '"  allowfullscreen="true"></iframe></div></div>');
                    else if (m) {
                        var s = "";
                        s = r && r.youtube ? "lg-has-youtube" : r && r.vimeo ? "lg-has-vimeo" : "lg-has-html5", l.$slide.eq(c).prepend('<div class="lg-video-cont ' + s + ' "><div class="lg-video"><span class="lg-video-play"></span><img class="lg-object lg-has-poster" src="' + h + '" /></div></div>')
                    } else r ? (l.$slide.eq(c).prepend('<div class="lg-video-cont "><div class="lg-video"></div></div>'), l.$el.trigger("hasVideo.lg", [c, g, k])) : l.$slide.eq(c).prepend('<div class="lg-img-wrap"><img class="lg-object lg-image" src="' + g + '" /></div>');
                    if (l.$el.trigger("onAferAppendSlide.lg", [c]), f = l.$slide.eq(c).find(".lg-object"), j && f.attr("sizes", j), i) {
                        f.attr("srcset", i);
                        try {
                            picturefill({
                                elements: [f[0]]
                            })
                        } catch (t) {
                            console.error("Make sure you have included Picturefill version 2")
                        }
                    }
                    ".lg-sub-html" !== this.s.appendSubHtmlTo && l.addHtml(c), l.$slide.eq(c).addClass("lg-loaded")
                }
                l.$slide.eq(c).find(".lg-object").on("load.lg error.lg", function () {
                    var b = 0;
                    e && !a("body").hasClass("lg-from-hash") && (b = e), setTimeout(function () {
                        l.$slide.eq(c).addClass("lg-complete"), l.$el.trigger("onSlideItemLoad.lg", [c, e || 0])
                    }, b)
                }), r && r.html5 && !m && l.$slide.eq(c).addClass("lg-complete"), d === !0 && (l.$slide.eq(c).hasClass("lg-complete") ? l.preload(c) : l.$slide.eq(c).find(".lg-object").on("load.lg error.lg", function () {
                    l.preload(c)
                }))
            }, e.prototype.slide = function (b, c, d) {
                var e = this.$outer.find(".lg-current").index(),
                    f = this;
                if (!f.lGalleryOn || e !== b) {
                    var g = this.$slide.length,
                        h = f.lGalleryOn ? this.s.speed : 0,
                        i = !1,
                        j = !1;
                    if (!f.lgBusy) {
                        if (this.s.download) {
                            var k;
                            k = f.s.dynamic ? f.s.dynamicEl[b].downloadUrl !== !1 && (f.s.dynamicEl[b].downloadUrl || f.s.dynamicEl[b].src) : "false" !== f.$items.eq(b).attr("data-download-url") && (f.$items.eq(b).attr("data-download-url") || f.$items.eq(b).attr("href") || f.$items.eq(b).attr("data-src")), k ? (a("#lg-download").attr("href", k), f.$outer.removeClass("lg-hide-download")) : f.$outer.addClass("lg-hide-download")
                        }
                        if (this.$el.trigger("onBeforeSlide.lg", [e, b, c, d]), f.lgBusy = !0, clearTimeout(f.hideBartimeout), ".lg-sub-html" === this.s.appendSubHtmlTo && setTimeout(function () {
                                f.addHtml(b)
                        }, h), this.arrowDisable(b), c) {
                            var l = b - 1,
                                m = b + 1;
                            0 === b && e === g - 1 ? (m = 0, l = g - 1) : b === g - 1 && 0 === e && (m = 0, l = g - 1), this.$slide.removeClass("lg-prev-slide lg-current lg-next-slide"), f.$slide.eq(l).addClass("lg-prev-slide"), f.$slide.eq(m).addClass("lg-next-slide"), f.$slide.eq(b).addClass("lg-current")
                        } else f.$outer.addClass("lg-no-trans"), this.$slide.removeClass("lg-prev-slide lg-next-slide"), e > b ? (j = !0, 0 !== b || e !== g - 1 || d || (j = !1, i = !0)) : b > e && (i = !0, b !== g - 1 || 0 !== e || d || (j = !0, i = !1)), j ? (this.$slide.eq(b).addClass("lg-prev-slide"), this.$slide.eq(e).addClass("lg-next-slide")) : i && (this.$slide.eq(b).addClass("lg-next-slide"), this.$slide.eq(e).addClass("lg-prev-slide")), setTimeout(function () {
                            f.$slide.removeClass("lg-current"), f.$slide.eq(b).addClass("lg-current"), f.$outer.removeClass("lg-no-trans")
                        }, 50);
                        f.lGalleryOn ? (setTimeout(function () {
                            f.loadContent(b, !0, 0)
                        }, this.s.speed + 50), setTimeout(function () {
                            f.lgBusy = !1, f.$el.trigger("onAfterSlide.lg", [e, b, c, d])
                        }, this.s.speed)) : (f.loadContent(b, !0, f.s.backdropDuration), f.lgBusy = !1, f.$el.trigger("onAfterSlide.lg", [e, b, c, d])), f.lGalleryOn = !0, this.s.counter && a("#lg-counter-current").text(b + 1)
                    }
                }
            }, e.prototype.goToNextSlide = function (a) {
                var b = this;
                b.lgBusy || (b.index + 1 < b.$slide.length ? (b.index++, b.$el.trigger("onBeforeNextSlide.lg", [b.index]), b.slide(b.index, a, !1)) : b.s.loop ? (b.index = 0, b.$el.trigger("onBeforeNextSlide.lg", [b.index]), b.slide(b.index, a, !1)) : b.s.slideEndAnimatoin && (b.$outer.addClass("lg-right-end"), setTimeout(function () {
                    b.$outer.removeClass("lg-right-end")
                }, 400)))
            }, e.prototype.goToPrevSlide = function (a) {
                var b = this;
                b.lgBusy || (b.index > 0 ? (b.index--, b.$el.trigger("onBeforePrevSlide.lg", [b.index, a]), b.slide(b.index, a, !1)) : b.s.loop ? (b.index = b.$items.length - 1, b.$el.trigger("onBeforePrevSlide.lg", [b.index, a]), b.slide(b.index, a, !1)) : b.s.slideEndAnimatoin && (b.$outer.addClass("lg-left-end"), setTimeout(function () {
                    b.$outer.removeClass("lg-left-end")
                }, 400)))
            }, e.prototype.keyPress = function () {
                var c = this;
                this.$items.length > 1 && a(b).on("keyup.lg", function (a) {
                    c.$items.length > 1 && (37 === a.keyCode && (a.preventDefault(), c.goToPrevSlide()), 39 === a.keyCode && (a.preventDefault(), c.goToNextSlide()))
                }), a(b).on("keydown.lg", function (a) {
                    c.s.escKey === !0 && 27 === a.keyCode && (a.preventDefault(), c.$outer.hasClass("lg-thumb-open") ? c.$outer.removeClass("lg-thumb-open") : c.destroy())
                })
            }, e.prototype.arrow = function () {
                var a = this;
                this.$outer.find(".lg-prev").on("click.lg", function () {
                    a.goToPrevSlide()
                }), this.$outer.find(".lg-next").on("click.lg", function () {
                    a.goToNextSlide()
                })
            }, e.prototype.arrowDisable = function (a) {
                !this.s.loop && this.s.hideControlOnEnd && (a + 1 < this.$slide.length ? this.$outer.find(".lg-next").removeAttr("disabled").removeClass("disabled") : this.$outer.find(".lg-next").attr("disabled", "disabled").addClass("disabled"), a > 0 ? this.$outer.find(".lg-prev").removeAttr("disabled").removeClass("disabled") : this.$outer.find(".lg-prev").attr("disabled", "disabled").addClass("disabled"))
            }, e.prototype.setTranslate = function (a, b, c) {
                this.s.useLeft ? a.css("left", b) : a.css({
                    transform: "translate3d(" + b + "px, " + c + "px, 0px)"
                })
            }, e.prototype.touchMove = function (b, c) {
                var d = c - b;
                Math.abs(d) > 15 && (this.$outer.addClass("lg-dragging"), this.setTranslate(this.$slide.eq(this.index), d, 0), this.setTranslate(a(".lg-prev-slide"), -this.$slide.eq(this.index).width() + d, 0), this.setTranslate(a(".lg-next-slide"), this.$slide.eq(this.index).width() + d, 0))
            }, e.prototype.touchEnd = function (a) {
                var b = this;
                "lg-slide" !== b.s.mode && b.$outer.addClass("lg-slide"), this.$slide.not(".lg-current, .lg-prev-slide, .lg-next-slide").css("opacity", "0"), setTimeout(function () {
                    b.$outer.removeClass("lg-dragging"), 0 > a && Math.abs(a) > b.s.swipeThreshold ? b.goToNextSlide(!0) : a > 0 && Math.abs(a) > b.s.swipeThreshold ? b.goToPrevSlide(!0) : Math.abs(a) < 5 && b.$el.trigger("onSlideClick.lg"), b.$slide.removeAttr("style")
                }), setTimeout(function () {
                    b.$outer.hasClass("lg-dragging") || "lg-slide" === b.s.mode || b.$outer.removeClass("lg-slide")
                }, b.s.speed + 100)
            }, e.prototype.enableSwipe = function () {
                var a = this,
                    b = 0,
                    c = 0,
                    d = !1;
                a.s.enableSwipe && a.isTouch && a.doCss() && (a.$slide.on("touchstart.lg", function (c) {
                    a.$outer.hasClass("lg-zoomed") || a.lgBusy || (c.preventDefault(), a.manageSwipeClass(), b = c.originalEvent.targetTouches[0].pageX)
                }), a.$slide.on("touchmove.lg", function (e) {
                    a.$outer.hasClass("lg-zoomed") || (e.preventDefault(), c = e.originalEvent.targetTouches[0].pageX, a.touchMove(b, c), d = !0)
                }), a.$slide.on("touchend.lg", function () {
                    a.$outer.hasClass("lg-zoomed") || (d ? (d = !1, a.touchEnd(c - b)) : a.$el.trigger("onSlideClick.lg"))
                }))
            }, e.prototype.enableDrag = function () {
                var c = this,
                    d = 0,
                    e = 0,
                    f = !1,
                    g = !1;
                c.s.enableDrag && !c.isTouch && c.doCss() && (c.$slide.on("mousedown.lg", function (b) {
                    c.$outer.hasClass("lg-zoomed") || (a(b.target).hasClass("lg-object") || a(b.target).hasClass("lg-video-play")) && (b.preventDefault(), c.lgBusy || (c.manageSwipeClass(), d = b.pageX, f = !0, c.$outer.scrollLeft += 1, c.$outer.scrollLeft -= 1, c.$outer.removeClass("lg-grab").addClass("lg-grabbing"), c.$el.trigger("onDragstart.lg")))
                }), a(b).on("mousemove.lg", function (a) {
                    f && (g = !0, e = a.pageX, c.touchMove(d, e), c.$el.trigger("onDragmove.lg"))
                }), a(b).on("mouseup.lg", function (b) {
                    g ? (g = !1, c.touchEnd(e - d), c.$el.trigger("onDragend.lg")) : (a(b.target).hasClass("lg-object") || a(b.target).hasClass("lg-video-play")) && c.$el.trigger("onSlideClick.lg"), f && (f = !1, c.$outer.removeClass("lg-grabbing").addClass("lg-grab"))
                }))
            }, e.prototype.manageSwipeClass = function () {
                var a = this.index + 1,
                    b = this.index - 1,
                    c = this.$slide.length;
                this.s.loop && (0 === this.index ? b = c - 1 : this.index === c - 1 && (a = 0)), this.$slide.removeClass("lg-next-slide lg-prev-slide"), b > -1 && this.$slide.eq(b).addClass("lg-prev-slide"), this.$slide.eq(a).addClass("lg-next-slide")
            }, e.prototype.mousewheel = function () {
                var a = this;
                a.$outer.on("mousewheel.lg", function (b) {
                    b.deltaY && (b.deltaY > 0 ? a.goToPrevSlide() : a.goToNextSlide(), b.preventDefault())
                })
            }, e.prototype.closeGallery = function () {
                var b = this,
                    c = !1;
                this.$outer.find(".lg-close").on("click.lg", function () {
                    b.destroy()
                }), b.s.closable && (b.$outer.on("mousedown.lg", function (b) {
                    c = !!(a(b.target).is(".lg-outer") || a(b.target).is(".lg-item ") || a(b.target).is(".lg-img-wrap"))
                }), b.$outer.on("mouseup.lg", function (d) {
                    (a(d.target).is(".lg-outer") || a(d.target).is(".lg-item ") || a(d.target).is(".lg-img-wrap") && c) && (b.$outer.hasClass("lg-dragging") || b.destroy())
                }))
            }, e.prototype.destroy = function (c) {
                var d = this;
                c || d.$el.trigger("onBeforeClose.lg"), a(b).scrollTop(d.prevScrollTop), c && (d.s.dynamic || this.$items.off("click.lg click.lgcustom"), a.removeData(d.el, "lightGallery")), this.$el.off(".lg.tm"), a.each(a.fn.lightGallery.modules, function (a) {
                    d.modules[a] && d.modules[a].destroy()
                }), this.lGalleryOn = !1, clearTimeout(d.hideBartimeout), this.hideBartimeout = !1, a(b).off(".lg"), a("body").removeClass("lg-on lg-from-hash"), d.$outer && d.$outer.removeClass("lg-visible"), a(".lg-backdrop").removeClass("in"), setTimeout(function () {
                    d.$outer && d.$outer.remove(), a(".lg-backdrop").remove(), c || d.$el.trigger("onCloseAfter.lg")
                }, d.s.backdropDuration + 50)
            }, a.fn.lightGallery = function (b) {
                return this.each(function () {
                    if (a.data(this, "lightGallery")) try {
                        a(this).data("lightGallery").init()
                    } catch (c) {
                        console.error("lightGallery has not initiated properly")
                    } else a.data(this, "lightGallery", new e(this, b))
                })
            }, a.fn.lightGallery.modules = {}
        }(jQuery, window, document),
        function (a) {
            "use strict";
            var e = {
                autoplay: !1,
                pause: 5e3,
                progressBar: !0,
                fourceAutoplay: !1,
                autoplayControls: !0,
                appendAutoplayControlsTo: ".lg-toolbar"
            },
                f = function (b) {
                    return this.core = a(b).data("lightGallery"), this.$el = a(b), this.core.$items.length < 2 ? !1 : (this.core.s = a.extend({}, e, this.core.s), this.interval = !1, this.fromAuto = !0, this.canceledOnTouch = !1, this.fourceAutoplayTemp = this.core.s.fourceAutoplay, this.core.doCss() || (this.core.s.progressBar = !1), this.init(), this)
                };
            f.prototype.init = function () {
                var a = this;
                a.core.s.autoplayControls && a.controls(), a.core.s.progressBar && a.core.$outer.find(".lg").append('<div class="lg-progress-bar"><div class="lg-progress"></div></div>'), a.progress(), a.core.s.autoplay && a.startlAuto(), a.$el.on("onDragstart.lg.tm touchstart.lg.tm", function () {
                    a.interval && (a.cancelAuto(), a.canceledOnTouch = !0)
                }), a.$el.on("onDragend.lg.tm touchend.lg.tm onSlideClick.lg.tm", function () {
                    !a.interval && a.canceledOnTouch && (a.startlAuto(), a.canceledOnTouch = !1)
                })
            }, f.prototype.progress = function () {
                var a, b, c = this;
                c.$el.on("onBeforeSlide.lg.tm", function () {
                    c.core.s.progressBar && c.fromAuto && (a = c.core.$outer.find(".lg-progress-bar"), b = c.core.$outer.find(".lg-progress"), c.interval && (b.removeAttr("style"), a.removeClass("lg-start"), setTimeout(function () {
                        b.css("transition", "width " + (c.core.s.speed + c.core.s.pause) + "ms ease 0s"), a.addClass("lg-start")
                    }, 20))), c.fromAuto || c.core.s.fourceAutoplay || c.cancelAuto(), c.fromAuto = !1
                })
            }, f.prototype.controls = function () {
                var b = this,
                    c = '<span class="lg-autoplay-button lg-icon"></span>';
                a(this.core.s.appendAutoplayControlsTo).append(c), b.core.$outer.find(".lg-autoplay-button").on("click.lg", function () {
                    a(b.core.$outer).hasClass("lg-show-autoplay") ? (b.cancelAuto(), b.core.s.fourceAutoplay = !1) : b.interval || (b.startlAuto(), b.core.s.fourceAutoplay = b.fourceAutoplayTemp)
                })
            }, f.prototype.startlAuto = function () {
                var a = this;
                a.core.$outer.find(".lg-progress").css("transition", "width " + (a.core.s.speed + a.core.s.pause) + "ms ease 0s"), a.core.$outer.addClass("lg-show-autoplay"), a.core.$outer.find(".lg-progress-bar").addClass("lg-start"), a.interval = setInterval(function () {
                    a.core.index = a.core.index + 1 < a.core.$items.length ? a.core.index : -1, a.core.index++, a.fromAuto = !0, a.core.slide(a.core.index, !1, !1)
                }, a.core.s.speed + a.core.s.pause)
            }, f.prototype.cancelAuto = function () {
                clearInterval(this.interval), this.interval = !1, this.core.$outer.find(".lg-progress").removeAttr("style"), this.core.$outer.removeClass("lg-show-autoplay"), this.core.$outer.find(".lg-progress-bar").removeClass("lg-start")
            }, f.prototype.destroy = function () {
                this.cancelAuto(), this.core.$outer.find(".lg-progress-bar").remove()
            }, a.fn.lightGallery.modules.autoplay = f
        }(jQuery, window, document),
        function (a, b, c) {
            "use strict";
            var e = {
                fullScreen: !0
            },
                f = function (b) {
                    return this.core = a(b).data("lightGallery"), this.$el = a(b), this.core.s = a.extend({}, e, this.core.s), this.init(), this
                };
            f.prototype.init = function () {
                var a = "";
                if (this.core.s.fullScreen) {
                    if (!(c.fullscreenEnabled || c.webkitFullscreenEnabled || c.mozFullScreenEnabled || c.msFullscreenEnabled)) return;
                    a = '<span class="lg-fullscreen lg-icon"></span>', this.core.$outer.find(".lg-toolbar").append(a), this.fullScreen()
                }
            }, f.prototype.requestFullscreen = function () {
                var a = c.documentElement;
                a.requestFullscreen ? a.requestFullscreen() : a.msRequestFullscreen ? a.msRequestFullscreen() : a.mozRequestFullScreen ? a.mozRequestFullScreen() : a.webkitRequestFullscreen && a.webkitRequestFullscreen()
            }, f.prototype.exitFullscreen = function () {
                c.exitFullscreen ? c.exitFullscreen() : c.msExitFullscreen ? c.msExitFullscreen() : c.mozCancelFullScreen ? c.mozCancelFullScreen() : c.webkitExitFullscreen && c.webkitExitFullscreen()
            }, f.prototype.fullScreen = function () {
                var b = this;
                a(c).on("fullscreenchange.lg webkitfullscreenchange.lg mozfullscreenchange.lg MSFullscreenChange.lg", function () {
                    b.core.$outer.toggleClass("lg-fullscreen-on")
                }), this.core.$outer.find(".lg-fullscreen").on("click.lg", function () {
                    c.fullscreenElement || c.mozFullScreenElement || c.webkitFullscreenElement || c.msFullscreenElement ? b.exitFullscreen() : b.requestFullscreen()
                })
            }, f.prototype.destroy = function () {
                this.exitFullscreen(), a(c).off("fullscreenchange.lg webkitfullscreenchange.lg mozfullscreenchange.lg MSFullscreenChange.lg")
            }, a.fn.lightGallery.modules.fullscreen = f
        }(jQuery, window, document),
        function (a) {
            "use strict";
            var e = {
                pager: !1
            },
                f = function (b) {
                    return this.core = a(b).data("lightGallery"), this.$el = a(b), this.core.s = a.extend({}, e, this.core.s), this.core.s.pager && this.core.$items.length > 1 && this.init(), this
                };
            f.prototype.init = function () {
                var b, c, d, e = this,
                    f = "";
                if (e.core.$outer.find(".lg").append('<div class="lg-pager-outer"></div>'), e.core.s.dynamic)
                    for (var g = 0; g < e.core.s.dynamicEl.length; g++) f += '<span class="lg-pager-cont"> <span class="lg-pager"></span><div class="lg-pager-thumb-cont"><span class="lg-caret"></span> <img src="' + e.core.s.dynamicEl[g].thumb + '" /></div></span>';
                else e.core.$items.each(function () {
                    f += e.core.s.exThumbImage ? '<span class="lg-pager-cont"> <span class="lg-pager"></span><div class="lg-pager-thumb-cont"><span class="lg-caret"></span> <img src="' + a(this).attr(e.core.s.exThumbImage) + '" /></div></span>' : '<span class="lg-pager-cont"> <span class="lg-pager"></span><div class="lg-pager-thumb-cont"><span class="lg-caret"></span> <img src="' + a(this).find("img").attr("src") + '" /></div></span>'
                });
                c = e.core.$outer.find(".lg-pager-outer"), c.html(f), b = e.core.$outer.find(".lg-pager-cont"), b.on("click.lg touchend.lg", function () {
                    var b = a(this);
                    e.core.index = b.index(), e.core.slide(e.core.index, !1, !1)
                }), c.on("mouseover.lg", function () {
                    clearTimeout(d), c.addClass("lg-pager-hover")
                }), c.on("mouseout.lg", function () {
                    d = setTimeout(function () {
                        c.removeClass("lg-pager-hover")
                    })
                }), e.core.$el.on("onBeforeSlide.lg.tm", function (a, c, d) {
                    b.removeClass("lg-pager-active"), b.eq(d).addClass("lg-pager-active")
                })
            }, f.prototype.destroy = function () { }, a.fn.lightGallery.modules.pager = f
        }(jQuery, window, document),
        function (a, b) {
            "use strict";
            var e = {
                thumbnail: !0,
                animateThumb: !0,
                currentPagerPosition: "middle",
                thumbWidth: 100,
                thumbContHeight: 100,
                thumbMargin: 5,
                exThumbImage: !1,
                showThumbByDefault: !0,
                toogleThumb: !0,
                pullCaptionUp: !0,
                enableThumbDrag: !0,
                enableThumbSwipe: !0,
                swipeThreshold: 50,
                loadYoutubeThumbnail: !0,
                youtubeThumbSize: 1,
                loadVimeoThumbnail: !0,
                vimeoThumbSize: "thumbnail_small",
                loadDailymotionThumbnail: !0
            },
                f = function (b) {
                    return this.core = a(b).data("lightGallery"), this.core.s = a.extend({}, e, this.core.s), this.$el = a(b), this.$thumbOuter = null, this.thumbOuterWidth = 0, this.thumbTotalWidth = this.core.$items.length * (this.core.s.thumbWidth + this.core.s.thumbMargin), this.thumbIndex = this.core.index, this.left = 0, this.init(), this
                };
            f.prototype.init = function () {
                var a = this;
                this.core.s.thumbnail && this.core.$items.length > 1 && (this.core.s.showThumbByDefault && setTimeout(function () {
                    a.core.$outer.addClass("lg-thumb-open")
                }, 700), this.core.s.pullCaptionUp && this.core.$outer.addClass("lg-pull-caption-up"), this.build(), this.core.s.animateThumb ? (this.core.s.enableThumbDrag && !this.core.isTouch && this.core.doCss() && this.enableThumbDrag(), this.core.s.enableThumbSwipe && this.core.isTouch && this.core.doCss() && this.enableThumbSwipe(), this.thumbClickable = !1) : this.thumbClickable = !0, this.toogle(), this.thumbkeyPress())
            }, f.prototype.build = function () {
                function c(a, b, c) {
                    var d, h = e.core.isVideo(a, c) || {},
                        i = "";
                    h.youtube || h.vimeo || h.dailymotion ? h.youtube ? d = e.core.s.loadYoutubeThumbnail ? "//img.youtube.com/vi/" + h.youtube[1] + "/" + e.core.s.youtubeThumbSize + ".jpg" : b : h.vimeo ? e.core.s.loadVimeoThumbnail ? (d = "//i.vimeocdn.com/video/error_" + g + ".jpg", i = h.vimeo[1]) : d = b : h.dailymotion && (d = e.core.s.loadDailymotionThumbnail ? "//www.dailymotion.com/thumbnail/video/" + h.dailymotion[1] : b) : d = b, f += '<div data-vimeo-id="' + i + '" class="lg-thumb-item" style="width:' + e.core.s.thumbWidth + "px; margin-right: " + e.core.s.thumbMargin + 'px"><img src="' + d + '" /></div>', i = ""
                }
                var d, e = this,
                    f = "",
                    g = "",
                    h = '<div class="lg-thumb-outer"><div class="lg-thumb group"></div></div>';
                switch (this.core.s.vimeoThumbSize) {
                    case "thumbnail_large":
                        g = "640";
                        break;
                    case "thumbnail_medium":
                        g = "200x150";
                        break;
                    case "thumbnail_small":
                        g = "100x75"
                }
                if (e.core.$outer.addClass("lg-has-thumb"), e.core.$outer.find(".lg").append(h), e.$thumbOuter = e.core.$outer.find(".lg-thumb-outer"), e.thumbOuterWidth = e.$thumbOuter.width(), e.core.s.animateThumb && e.core.$outer.find(".lg-thumb").css({
                    width: e.thumbTotalWidth + "px",
                    position: "relative"
                }), this.core.s.animateThumb && e.$thumbOuter.css("height", e.core.s.thumbContHeight + "px"), e.core.s.dynamic)
                    for (var i = 0; i < e.core.s.dynamicEl.length; i++) c(e.core.s.dynamicEl[i].src, e.core.s.dynamicEl[i].thumb, i);
                else e.core.$items.each(function (b) {
                    e.core.s.exThumbImage ? c(a(this).attr("href") || a(this).attr("data-src"), a(this).attr(e.core.s.exThumbImage), b) : c(a(this).attr("href") || a(this).attr("data-src"), a(this).find("img").attr("src"), b)
                });
                e.core.$outer.find(".lg-thumb").html(f), d = e.core.$outer.find(".lg-thumb-item"), d.each(function () {
                    var b = a(this),
                        c = b.attr("data-vimeo-id");
                    c && a.getJSON("//www.vimeo.com/api/v2/video/" + c + ".json?callback=?", {
                        format: "json"
                    }, function (a) {
                        b.find("img").attr("src", a[0][e.core.s.vimeoThumbSize])
                    })
                }), d.eq(e.core.index).addClass("active"), e.core.$el.on("onBeforeSlide.lg.tm", function () {
                    d.removeClass("active"), d.eq(e.core.index).addClass("active")
                }), d.on("click.lg touchend.lg", function () {
                    var b = a(this);
                    setTimeout(function () {
                        (e.thumbClickable && !e.core.lgBusy || !e.core.doCss()) && (e.core.index = b.index(), e.core.slide(e.core.index, !1, !0))
                    }, 50)
                }), e.core.$el.on("onBeforeSlide.lg.tm", function () {
                    e.animateThumb(e.core.index)
                }), a(b).on("resize.lg.thumb orientationchange.lg.thumb", function () {
                    setTimeout(function () {
                        e.animateThumb(e.core.index), e.thumbOuterWidth = e.$thumbOuter.width()
                    }, 200)
                })
            }, f.prototype.setTranslate = function (a) {
                this.core.$outer.find(".lg-thumb").css({
                    transform: "translate3d(-" + a + "px, 0px, 0px)"
                })
            }, f.prototype.animateThumb = function (a) {
                var b = this.core.$outer.find(".lg-thumb");
                if (this.core.s.animateThumb) {
                    var c;
                    switch (this.core.s.currentPagerPosition) {
                        case "left":
                            c = 0;
                            break;
                        case "middle":
                            c = this.thumbOuterWidth / 2 - this.core.s.thumbWidth / 2;
                            break;
                        case "right":
                            c = this.thumbOuterWidth - this.core.s.thumbWidth
                    }
                    this.left = (this.core.s.thumbWidth + this.core.s.thumbMargin) * a - 1 - c, this.left > this.thumbTotalWidth - this.thumbOuterWidth && (this.left = this.thumbTotalWidth - this.thumbOuterWidth), this.left < 0 && (this.left = 0), this.core.lGalleryOn ? (b.hasClass("on") || this.core.$outer.find(".lg-thumb").css("transition-duration", this.core.s.speed + "ms"), this.core.doCss() || b.animate({
                        left: -this.left + "px"
                    }, this.core.s.speed)) : this.core.doCss() || b.css("left", -this.left + "px"), this.setTranslate(this.left)
                }
            }, f.prototype.enableThumbDrag = function () {
                var c = this,
                    d = 0,
                    e = 0,
                    f = !1,
                    g = !1,
                    h = 0;
                c.$thumbOuter.addClass("lg-grab"), c.core.$outer.find(".lg-thumb").on("mousedown.lg.thumb", function (a) {
                    c.thumbTotalWidth > c.thumbOuterWidth && (a.preventDefault(), d = a.pageX, f = !0, c.core.$outer.scrollLeft += 1, c.core.$outer.scrollLeft -= 1, c.thumbClickable = !1, c.$thumbOuter.removeClass("lg-grab").addClass("lg-grabbing"))
                }), a(b).on("mousemove.lg.thumb", function (a) {
                    f && (h = c.left, g = !0, e = a.pageX, c.$thumbOuter.addClass("lg-dragging"), h -= e - d, h > c.thumbTotalWidth - c.thumbOuterWidth && (h = c.thumbTotalWidth - c.thumbOuterWidth), 0 > h && (h = 0), c.setTranslate(h))
                }), a(b).on("mouseup.lg.thumb", function () {
                    g ? (g = !1, c.$thumbOuter.removeClass("lg-dragging"), c.left = h, Math.abs(e - d) < c.core.s.swipeThreshold && (c.thumbClickable = !0)) : c.thumbClickable = !0, f && (f = !1, c.$thumbOuter.removeClass("lg-grabbing").addClass("lg-grab"))
                })
            }, f.prototype.enableThumbSwipe = function () {
                var a = this,
                    b = 0,
                    c = 0,
                    d = !1,
                    e = 0;
                a.core.$outer.find(".lg-thumb").on("touchstart.lg", function (c) {
                    a.thumbTotalWidth > a.thumbOuterWidth && (c.preventDefault(), b = c.originalEvent.targetTouches[0].pageX, a.thumbClickable = !1)
                }), a.core.$outer.find(".lg-thumb").on("touchmove.lg", function (f) {
                    a.thumbTotalWidth > a.thumbOuterWidth && (f.preventDefault(), c = f.originalEvent.targetTouches[0].pageX, d = !0, a.$thumbOuter.addClass("lg-dragging"), e = a.left, e -= c - b, e > a.thumbTotalWidth - a.thumbOuterWidth && (e = a.thumbTotalWidth - a.thumbOuterWidth), 0 > e && (e = 0), a.setTranslate(e))
                }), a.core.$outer.find(".lg-thumb").on("touchend.lg", function () {
                    a.thumbTotalWidth > a.thumbOuterWidth && d ? (d = !1, a.$thumbOuter.removeClass("lg-dragging"), Math.abs(c - b) < a.core.s.swipeThreshold && (a.thumbClickable = !0), a.left = e) : a.thumbClickable = !0
                })
            }, f.prototype.toogle = function () {
                var a = this;
                a.core.s.toogleThumb && (a.core.$outer.addClass("lg-can-toggle"), a.$thumbOuter.append('<span class="lg-toogle-thumb lg-icon"></span>'), a.core.$outer.find(".lg-toogle-thumb").on("click.lg", function () {
                    a.core.$outer.toggleClass("lg-thumb-open")
                }))
            }, f.prototype.thumbkeyPress = function () {
                var c = this;
                a(b).on("keydown.lg.thumb", function (a) {
                    38 === a.keyCode ? (a.preventDefault(), c.core.$outer.addClass("lg-thumb-open")) : 40 === a.keyCode && (a.preventDefault(), c.core.$outer.removeClass("lg-thumb-open"))
                })
            }, f.prototype.destroy = function () {
                this.core.s.thumbnail && this.core.$items.length > 1 && (a(b).off("resize.lg.thumb orientationchange.lg.thumb keydown.lg.thumb"), this.$thumbOuter.remove(), this.core.$outer.removeClass("lg-has-thumb"))
            }, a.fn.lightGallery.modules.Thumbnail = f
        }(jQuery, window, document),
        function (a) {
            "use strict";
            var e = {
                videoMaxWidth: "855px",
                youtubePlayerParams: !1,
                vimeoPlayerParams: !1,
                dailymotionPlayerParams: !1,
                vkPlayerParams: !1,
                videojs: !1,
                videojsOptions: {}
            },
                f = function (b) {
                    return this.core = a(b).data("lightGallery"), this.$el = a(b), this.core.s = a.extend({}, e, this.core.s), this.videoLoaded = !1, this.init(), this
                };
            f.prototype.init = function () {
                var b = this;
                b.core.$el.on("hasVideo.lg.tm", function (a, c, d, e) {
                    if (b.core.$slide.eq(c).find(".lg-video").append(b.loadVideo(d, "lg-object", !0, c, e)), e)
                        if (b.core.s.videojs) try {
                            videojs(b.core.$slide.eq(c).find(".lg-html5").get(0), b.core.s.videojsOptions, function () {
                                b.videoLoaded || this.play()
                            })
                        } catch (f) {
                            console.error("Make sure you have included videojs")
                        } else b.core.$slide.eq(c).find(".lg-html5").get(0).play()
                }), b.core.$el.on("onAferAppendSlide.lg.tm", function (a, c) {
                    b.core.$slide.eq(c).find(".lg-video-cont").css("max-width", b.core.s.videoMaxWidth), b.videoLoaded = !0
                });
                var c = function (a) {
                    if (a.find(".lg-object").hasClass("lg-has-poster") && a.find(".lg-object").is(":visible"))
                        if (a.hasClass("lg-has-video")) {
                            var c = a.find(".lg-youtube").get(0),
                                d = a.find(".lg-vimeo").get(0),
                                e = a.find(".lg-dailymotion").get(0),
                                f = a.find(".lg-html5").get(0);
                            if (c) c.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', "*");
                            else if (d) try {
                                $f(d).api("play")
                            } catch (g) {
                                console.error("Make sure you have included froogaloop2 js")
                            } else if (e) e.contentWindow.postMessage("play", "*");
                            else if (f)
                                if (b.core.s.videojs) try {
                                    videojs(f).play()
                                } catch (g) {
                                    console.error("Make sure you have included videojs")
                                } else f.play();
                            a.addClass("lg-video-playing")
                        } else {
                            a.addClass("lg-video-playing lg-has-video");
                            var h, i, j = function (c, d) {
                                if (a.find(".lg-video").append(b.loadVideo(c, "", !1, b.core.index, d)), d)
                                    if (b.core.s.videojs) try {
                                        videojs(b.core.$slide.eq(b.core.index).find(".lg-html5").get(0), b.core.s.videojsOptions, function () {
                                            this.play()
                                        })
                                    } catch (e) {
                                        console.error("Make sure you have included videojs")
                                    } else b.core.$slide.eq(b.core.index).find(".lg-html5").get(0).play()
                            };
                            b.core.s.dynamic ? (h = b.core.s.dynamicEl[b.core.index].src, i = b.core.s.dynamicEl[b.core.index].html, j(h, i)) : (h = b.core.$items.eq(b.core.index).attr("href") || b.core.$items.eq(b.core.index).attr("data-src"), i = b.core.$items.eq(b.core.index).attr("data-html"), j(h, i));
                            var k = a.find(".lg-object");
                            a.find(".lg-video").append(k), a.find(".lg-video-object").hasClass("lg-html5") || (a.removeClass("lg-complete"), a.find(".lg-video-object").on("load.lg error.lg", function () {
                                a.addClass("lg-complete")
                            }))
                        }
                };
                b.core.doCss() && b.core.$items.length > 1 && (b.core.s.enableSwipe && b.core.isTouch || b.core.s.enableDrag && !b.core.isTouch) ? b.core.$el.on("onSlideClick.lg.tm", function () {
                    var a = b.core.$slide.eq(b.core.index);
                    c(a)
                }) : b.core.$slide.on("click.lg", function () {
                    c(a(this))
                }), b.core.$el.on("onBeforeSlide.lg.tm", function (c, d, e) {
                    var f = b.core.$slide.eq(d),
                        g = f.find(".lg-youtube").get(0),
                        h = f.find(".lg-vimeo").get(0),
                        i = f.find(".lg-dailymotion").get(0),
                        j = f.find(".lg-vk").get(0),
                        k = f.find(".lg-html5").get(0);
                    if (g) g.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', "*");
                    else if (h) try {
                        $f(h).api("pause")
                    } catch (l) {
                        console.error("Make sure you have included froogaloop2 js")
                    } else if (i) i.contentWindow.postMessage("pause", "*");
                    else if (k)
                        if (b.core.s.videojs) try {
                            videojs(k).pause()
                        } catch (l) {
                            console.error("Make sure you have included videojs")
                        } else k.pause();
                    j && a(j).attr("src", a(j).attr("src").replace("&autoplay", "&noplay"));
                    var m;
                    m = b.core.s.dynamic ? b.core.s.dynamicEl[e].src : b.core.$items.eq(e).attr("href") || b.core.$items.eq(e).attr("data-src");
                    var n = b.core.isVideo(m, e) || {};
                    (n.youtube || n.vimeo || n.dailymotion || n.vk) && b.core.$outer.addClass("lg-hide-download")
                }), b.core.$el.on("onAfterSlide.lg.tm", function (a, c) {
                    b.core.$slide.eq(c).removeClass("lg-video-playing")
                })
            }, f.prototype.loadVideo = function (b, c, d, e, f) {
                var g = "",
                    h = 1,
                    i = "",
                    j = this.core.isVideo(b, e) || {};
                if (d && (h = this.videoLoaded ? 0 : 1), j.youtube) i = "?wmode=opaque&autoplay=" + h + "&enablejsapi=1", this.core.s.youtubePlayerParams && (i = i + "&" + a.param(this.core.s.youtubePlayerParams)), g = '<iframe class="lg-video-object lg-youtube ' + c + '" width="560" height="315" src="//www.youtube.com/embed/' + j.youtube[1] + i + '" frameborder="0" allowfullscreen></iframe>';
                else if (j.vimeo) i = "?autoplay=" + h + "&api=1", this.core.s.vimeoPlayerParams && (i = i + "&" + a.param(this.core.s.vimeoPlayerParams)), g = '<iframe class="lg-video-object lg-vimeo ' + c + '" width="560" height="315"  src="//player.vimeo.com/video/' + j.vimeo[1] + i + '" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>';
                else if (j.dailymotion) i = "?wmode=opaque&autoplay=" + h + "&api=postMessage", this.core.s.dailymotionPlayerParams && (i = i + "&" + a.param(this.core.s.dailymotionPlayerParams)), g = '<iframe class="lg-video-object lg-dailymotion ' + c + '" width="560" height="315" src="//www.dailymotion.com/embed/video/' + j.dailymotion[1] + i + '" frameborder="0" allowfullscreen></iframe>';
                else if (j.html5) {
                    var k = f.substring(0, 1);
                    "." !== k && "#" !== k || (f = a(f).html()), g = f
                } else j.vk && (i = "&autoplay=" + h, this.core.s.vkPlayerParams && (i = i + "&" + a.param(this.core.s.vkPlayerParams)), g = '<iframe class="lg-video-object lg-vk ' + c + '" width="560" height="315" src="http://vk.com/video_ext.php?' + j.vk[1] + i + '" frameborder="0" allowfullscreen></iframe>');
                return g
            }, f.prototype.destroy = function () {
                this.videoLoaded = !1
            }, a.fn.lightGallery.modules.video = f
        }(jQuery, window, document),
        function (a, b) {
            "use strict";
            var e = {
                scale: 1,
                zoom: !0,
                actualSize: !0,
                enableZoomAfter: 300
            },
                f = function (c) {
                    return this.core = a(c).data("lightGallery"), this.core.s = a.extend({}, e, this.core.s), this.core.s.zoom && this.core.doCss() && (this.init(), this.zoomabletimeout = !1, this.pageX = a(b).width() / 2, this.pageY = a(b).height() / 2 + a(b).scrollTop()), this
                };
            f.prototype.init = function () {
                var c = this,
                    d = '<span id="lg-zoom-in" class="lg-icon"></span><span id="lg-zoom-out" class="lg-icon"></span>';
                c.core.s.actualSize && (d += '<span id="lg-actual-size" class="lg-icon"></span>'), this.core.$outer.find(".lg-toolbar").append(d), c.core.$el.on("onSlideItemLoad.lg.tm.zoom", function (b, d, e) {
                    var f = c.core.s.enableZoomAfter + e;
                    a("body").hasClass("lg-from-hash") && e ? f = 0 : a("body").removeClass("lg-from-hash"), c.zoomabletimeout = setTimeout(function () {
                        c.core.$slide.eq(d).addClass("lg-zoomable")
                    }, f + 30)
                });
                var e = 1,
                    f = function (d) {
                        var e, f, g = c.core.$outer.find(".lg-current .lg-image"),
                            h = (a(b).width() - g.width()) / 2,
                            i = (a(b).height() - g.height()) / 2 + a(b).scrollTop();
                        e = c.pageX - h, f = c.pageY - i;
                        var j = (d - 1) * e,
                            k = (d - 1) * f;
                        g.css("transform", "scale3d(" + d + ", " + d + ", 1)").attr("data-scale", d), g.parent().css({
                            left: -j + "px",
                            top: -k + "px"
                        }).attr("data-x", j).attr("data-y", k)
                    },
                    g = function () {
                        e > 1 ? c.core.$outer.addClass("lg-zoomed") : c.resetZoom(), 1 > e && (e = 1), f(e)
                    },
                    h = function (d, f, h, i) {
                        var j, k = f.width();
                        j = c.core.s.dynamic ? c.core.s.dynamicEl[h].width || f[0].naturalWidth || k : c.core.$items.eq(h).attr("data-width") || f[0].naturalWidth || k;
                        var l;
                        c.core.$outer.hasClass("lg-zoomed") ? e = 1 : j > k && (l = j / k, e = l || 2), i ? (c.pageX = a(b).width() / 2, c.pageY = a(b).height() / 2 + a(b).scrollTop()) : (c.pageX = d.pageX || d.originalEvent.targetTouches[0].pageX, c.pageY = d.pageY || d.originalEvent.targetTouches[0].pageY), g(), setTimeout(function () {
                            c.core.$outer.removeClass("lg-grabbing").addClass("lg-grab")
                        }, 10)
                    },
                    i = !1;
                c.core.$el.on("onAferAppendSlide.lg.tm.zoom", function (a, b) {
                    var d = c.core.$slide.eq(b).find(".lg-image");
                    d.on("dblclick", function (a) {
                        h(a, d, b)
                    }), d.on("touchstart", function (a) {
                        i ? (clearTimeout(i), i = null, h(a, d, b)) : i = setTimeout(function () {
                            i = null
                        }, 300), a.preventDefault()
                    })
                }), a(b).on("resize.lg.zoom scroll.lg.zoom orientationchange.lg.zoom", function () {
                    c.pageX = a(b).width() / 2, c.pageY = a(b).height() / 2 + a(b).scrollTop(), f(e)
                }), a("#lg-zoom-out").on("click.lg", function () {
                    c.core.$outer.find(".lg-current .lg-image").length && (e -= c.core.s.scale, g())
                }), a("#lg-zoom-in").on("click.lg", function () {
                    c.core.$outer.find(".lg-current .lg-image").length && (e += c.core.s.scale, g())
                }), a("#lg-actual-size").on("click.lg", function (a) {
                    h(a, c.core.$slide.eq(c.core.index).find(".lg-image"), c.core.index, !0)
                }), c.core.$el.on("onBeforeSlide.lg.tm", function () {
                    e = 1, c.resetZoom()
                }), c.core.isTouch || c.zoomDrag(), c.core.isTouch && c.zoomSwipe()
            }, f.prototype.resetZoom = function () {
                this.core.$outer.removeClass("lg-zoomed"), this.core.$slide.find(".lg-img-wrap").removeAttr("style data-x data-y"), this.core.$slide.find(".lg-image").removeAttr("style data-scale"), this.pageX = a(b).width() / 2, this.pageY = a(b).height() / 2 + a(b).scrollTop()
            }, f.prototype.zoomSwipe = function () {
                var a = this,
                    b = {},
                    c = {},
                    d = !1,
                    e = !1,
                    f = !1;
                a.core.$slide.on("touchstart.lg", function (c) {
                    if (a.core.$outer.hasClass("lg-zoomed")) {
                        var d = a.core.$slide.eq(a.core.index).find(".lg-object");
                        f = d.outerHeight() * d.attr("data-scale") > a.core.$outer.find(".lg").height(), e = d.outerWidth() * d.attr("data-scale") > a.core.$outer.find(".lg").width(), (e || f) && (c.preventDefault(), b = {
                            x: c.originalEvent.targetTouches[0].pageX,
                            y: c.originalEvent.targetTouches[0].pageY
                        })
                    }
                }), a.core.$slide.on("touchmove.lg", function (g) {
                    if (a.core.$outer.hasClass("lg-zoomed")) {
                        var h, i, j = a.core.$slide.eq(a.core.index).find(".lg-img-wrap");
                        g.preventDefault(), d = !0, c = {
                            x: g.originalEvent.targetTouches[0].pageX,
                            y: g.originalEvent.targetTouches[0].pageY
                        }, a.core.$outer.addClass("lg-zoom-dragging"), i = f ? -Math.abs(j.attr("data-y")) + (c.y - b.y) : -Math.abs(j.attr("data-y")), h = e ? -Math.abs(j.attr("data-x")) + (c.x - b.x) : -Math.abs(j.attr("data-x")), (Math.abs(c.x - b.x) > 15 || Math.abs(c.y - b.y) > 15) && j.css({
                            left: h + "px",
                            top: i + "px"
                        })
                    }
                }), a.core.$slide.on("touchend.lg", function () {
                    a.core.$outer.hasClass("lg-zoomed") && d && (d = !1, a.core.$outer.removeClass("lg-zoom-dragging"), a.touchendZoom(b, c, e, f))
                })
            }, f.prototype.zoomDrag = function () {
                var c = this,
                    d = {},
                    e = {},
                    f = !1,
                    g = !1,
                    h = !1,
                    i = !1;
                c.core.$slide.on("mousedown.lg.zoom", function (b) {
                    var e = c.core.$slide.eq(c.core.index).find(".lg-object");
                    i = e.outerHeight() * e.attr("data-scale") > c.core.$outer.find(".lg").height(), h = e.outerWidth() * e.attr("data-scale") > c.core.$outer.find(".lg").width(), c.core.$outer.hasClass("lg-zoomed") && a(b.target).hasClass("lg-object") && (h || i) && (b.preventDefault(), d = {
                        x: b.pageX,
                        y: b.pageY
                    }, f = !0, c.core.$outer.scrollLeft += 1, c.core.$outer.scrollLeft -= 1, c.core.$outer.removeClass("lg-grab").addClass("lg-grabbing"))
                }), a(b).on("mousemove.lg.zoom", function (a) {
                    if (f) {
                        var b, j, k = c.core.$slide.eq(c.core.index).find(".lg-img-wrap");
                        g = !0, e = {
                            x: a.pageX,
                            y: a.pageY
                        }, c.core.$outer.addClass("lg-zoom-dragging"), j = i ? -Math.abs(k.attr("data-y")) + (e.y - d.y) : -Math.abs(k.attr("data-y")), b = h ? -Math.abs(k.attr("data-x")) + (e.x - d.x) : -Math.abs(k.attr("data-x")), k.css({
                            left: b + "px",
                            top: j + "px"
                        })
                    }
                }), a(b).on("mouseup.lg.zoom", function (a) {
                    f && (f = !1, c.core.$outer.removeClass("lg-zoom-dragging"), !g || d.x === e.x && d.y === e.y || (e = {
                        x: a.pageX,
                        y: a.pageY
                    }, c.touchendZoom(d, e, h, i)), g = !1), c.core.$outer.removeClass("lg-grabbing").addClass("lg-grab")
                })
            }, f.prototype.touchendZoom = function (a, b, c, d) {
                var e = this,
                    f = e.core.$slide.eq(e.core.index).find(".lg-img-wrap"),
                    g = e.core.$slide.eq(e.core.index).find(".lg-object"),
                    h = -Math.abs(f.attr("data-x")) + (b.x - a.x),
                    i = -Math.abs(f.attr("data-y")) + (b.y - a.y),
                    j = (e.core.$outer.find(".lg").height() - g.outerHeight()) / 2,
                    k = Math.abs(g.outerHeight() * Math.abs(g.attr("data-scale")) - e.core.$outer.find(".lg").height() + j),
                    l = (e.core.$outer.find(".lg").width() - g.outerWidth()) / 2,
                    m = Math.abs(g.outerWidth() * Math.abs(g.attr("data-scale")) - e.core.$outer.find(".lg").width() + l);
                (Math.abs(b.x - a.x) > 15 || Math.abs(b.y - a.y) > 15) && (d && (-k >= i ? i = -k : i >= -j && (i = -j)), c && (-m >= h ? h = -m : h >= -l && (h = -l)), d ? f.attr("data-y", Math.abs(i)) : i = -Math.abs(f.attr("data-y")), c ? f.attr("data-x", Math.abs(h)) : h = -Math.abs(f.attr("data-x")), f.css({
                    left: h + "px",
                    top: i + "px"
                }))
            }, f.prototype.destroy = function () {
                var c = this;
                c.core.$el.off(".lg.zoom"), a(b).off(".lg.zoom"), c.core.$slide.off(".lg.zoom"), c.core.$el.off(".lg.tm.zoom"), c.resetZoom(), clearTimeout(c.zoomabletimeout), c.zoomabletimeout = !1
            }, a.fn.lightGallery.modules.zoom = f
        }(jQuery, window, document),
        function (a, b, c) {
            "use strict";
            var e = {
                hash: !0
            },
                f = function (c) {
                    return this.core = a(c).data("lightGallery"), this.core.s = a.extend({}, e, this.core.s), this.core.s.hash && (this.oldHash = b.location.hash, this.init()), this
                };
            f.prototype.init = function () {
                var c, d = this;
                d.core.$el.on("onAfterSlide.lg.tm", function (a, c, e) {
                    b.location.hash = "lg=" + d.core.s.galleryId + "&slide=" + e
                }), a(b).on("hashchange.lg.hash", function () {
                    c = b.location.hash;
                    var a = parseInt(c.split("&slide=")[1], 10);
                    c.indexOf("lg=" + d.core.s.galleryId) > -1 ? d.core.slide(a, !1, !1) : d.core.lGalleryOn && d.core.destroy()
                })
            }, f.prototype.destroy = function () {
                this.core.s.hash && (this.oldHash && this.oldHash.indexOf("lg=" + this.core.s.galleryId) < 0 ? b.location.hash = this.oldHash : history.pushState ? history.pushState("", c.title, b.location.pathname + b.location.search) : b.location.hash = "", this.core.$el.off(".lg.hash"))
            }, a.fn.lightGallery.modules.hash = f
        }(jQuery, window, document), ! function (e) {
            "use strict";
            "function" == typeof define && define.amd ? define(["jquery"], e) : e("undefined" != typeof jQuery ? jQuery : window.Zepto)
        }(function (e) {
            "use strict";

            function t(t) {
                var r = t.data;
                t.isDefaultPrevented() || (t.preventDefault(), e(t.target).ajaxSubmit(r))
            }

            function r(t) {
                var r = t.target,
                    a = e(r);
                if (!a.is("[type=submit],[type=image]")) {
                    var n = a.closest("[type=submit]");
                    if (0 === n.length) return;
                    r = n[0]
                }
                var i = this;
                if (i.clk = r, "image" == r.type)
                    if (void 0 !== t.offsetX) i.clk_x = t.offsetX, i.clk_y = t.offsetY;
                    else if ("function" == typeof e.fn.offset) {
                        var o = a.offset();
                        i.clk_x = t.pageX - o.left, i.clk_y = t.pageY - o.top
                    } else i.clk_x = t.pageX - r.offsetLeft, i.clk_y = t.pageY - r.offsetTop;
                setTimeout(function () {
                    i.clk = i.clk_x = i.clk_y = null
                }, 100)
            }

            function a() {
                if (e.fn.ajaxSubmit.debug) {
                    var t = "[jquery.form] " + Array.prototype.join.call(arguments, "");
                    window.console && window.console.log ? window.console.log(t) : window.opera && window.opera.postError && window.opera.postError(t)
                }
            }
            var n = {};
            n.fileapi = void 0 !== e("<input type='file'/>").get(0).files, n.formdata = void 0 !== window.FormData;
            var i = !!e.fn.prop;
            e.fn.attr2 = function () {
                if (!i) return this.attr.apply(this, arguments);
                var e = this.prop.apply(this, arguments);
                return e && e.jquery || "string" == typeof e ? e : this.attr.apply(this, arguments)
            }, e.fn.ajaxSubmit = function (t) {
                function r(r) {
                    var a, n, i = e.param(r, t.traditional).split("&"),
                        o = i.length,
                        s = [];
                    for (a = 0; o > a; a++) i[a] = i[a].replace(/\+/g, " "), n = i[a].split("="), s.push([decodeURIComponent(n[0]), decodeURIComponent(n[1])]);
                    return s
                }

                function o(a) {
                    for (var n = new FormData, i = 0; i < a.length; i++) n.append(a[i].name, a[i].value);
                    if (t.extraData) {
                        var o = r(t.extraData);
                        for (i = 0; i < o.length; i++) o[i] && n.append(o[i][0], o[i][1])
                    }
                    t.data = null;
                    var s = e.extend(!0, {}, e.ajaxSettings, t, {
                        contentType: !1,
                        processData: !1,
                        cache: !1,
                        type: u || "POST"
                    });
                    t.uploadProgress && (s.xhr = function () {
                        var r = e.ajaxSettings.xhr();
                        return r.upload && r.upload.addEventListener("progress", function (e) {
                            var r = 0,
                                a = e.loaded || e.position,
                                n = e.total;
                            e.lengthComputable && (r = Math.ceil(a / n * 100)), t.uploadProgress(e, a, n, r)
                        }, !1), r
                    }), s.data = null;
                    var c = s.beforeSend;
                    return s.beforeSend = function (e, r) {
                        r.data = t.formData ? t.formData : n, c && c.call(this, e, r)
                    }, e.ajax(s)
                }

                function s(r) {
                    function n(e) {
                        var t = null;
                        try {
                            e.contentWindow && (t = e.contentWindow.document)
                        } catch (r) {
                            a("cannot get iframe.contentWindow document: " + r)
                        }
                        if (t) return t;
                        try {
                            t = e.contentDocument ? e.contentDocument : e.document
                        } catch (r) {
                            a("cannot get iframe.contentDocument: " + r), t = e.document
                        }
                        return t
                    }

                    function o() {
                        function t() {
                            try {
                                var e = n(g).readyState;
                                a("state = " + e), e && "uninitialized" == e.toLowerCase() && setTimeout(t, 50)
                            } catch (r) {
                                a("Server abort: ", r, " (", r.name, ")"), s(k), j && clearTimeout(j), j = void 0
                            }
                        }
                        var r = f.attr2("target"),
                            i = f.attr2("action"),
                            o = "multipart/form-data",
                            c = f.attr("enctype") || f.attr("encoding") || o;
                        w.setAttribute("target", p), (!u || /post/i.test(u)) && w.setAttribute("method", "POST"), i != m.url && w.setAttribute("action", m.url), m.skipEncodingOverride || u && !/post/i.test(u) || f.attr({
                            encoding: "multipart/form-data",
                            enctype: "multipart/form-data"
                        }), m.timeout && (j = setTimeout(function () {
                            T = !0, s(D)
                        }, m.timeout));
                        var l = [];
                        try {
                            if (m.extraData)
                                for (var d in m.extraData) m.extraData.hasOwnProperty(d) && l.push(e.isPlainObject(m.extraData[d]) && m.extraData[d].hasOwnProperty("name") && m.extraData[d].hasOwnProperty("value") ? e('<input type="hidden" name="' + m.extraData[d].name + '">').val(m.extraData[d].value).appendTo(w)[0] : e('<input type="hidden" name="' + d + '">').val(m.extraData[d]).appendTo(w)[0]);
                            m.iframeTarget || v.appendTo("body"), g.attachEvent ? g.attachEvent("onload", s) : g.addEventListener("load", s, !1), setTimeout(t, 15);
                            try {
                                w.submit()
                            } catch (h) {
                                var x = document.createElement("form").submit;
                                x.apply(w)
                            }
                        } finally {
                            w.setAttribute("action", i), w.setAttribute("enctype", c), r ? w.setAttribute("target", r) : f.removeAttr("target"), e(l).remove()
                        }
                    }

                    function s(t) {
                        if (!x.aborted && !F) {
                            if (M = n(g), M || (a("cannot access response document"), t = k), t === D && x) return x.abort("timeout"), void S.reject(x, "timeout");
                            if (t == k && x) return x.abort("server abort"), void S.reject(x, "error", "server abort");
                            if (M && M.location.href != m.iframeSrc || T) {
                                g.detachEvent ? g.detachEvent("onload", s) : g.removeEventListener("load", s, !1);
                                var r, i = "success";
                                try {
                                    if (T) throw "timeout";
                                    var o = "xml" == m.dataType || M.XMLDocument || e.isXMLDoc(M);
                                    if (a("isXml=" + o), !o && window.opera && (null === M.body || !M.body.innerHTML) && --O) return a("requeing onLoad callback, DOM not available"), void setTimeout(s, 250);
                                    var u = M.body ? M.body : M.documentElement;
                                    x.responseText = u ? u.innerHTML : null, x.responseXML = M.XMLDocument ? M.XMLDocument : M, o && (m.dataType = "xml"), x.getResponseHeader = function (e) {
                                        var t = {
                                            "content-type": m.dataType
                                        };
                                        return t[e.toLowerCase()]
                                    }, u && (x.status = Number(u.getAttribute("status")) || x.status, x.statusText = u.getAttribute("statusText") || x.statusText);
                                    var c = (m.dataType || "").toLowerCase(),
                                        l = /(json|script|text)/.test(c);
                                    if (l || m.textarea) {
                                        var f = M.getElementsByTagName("textarea")[0];
                                        if (f) x.responseText = f.value, x.status = Number(f.getAttribute("status")) || x.status, x.statusText = f.getAttribute("statusText") || x.statusText;
                                        else if (l) {
                                            var p = M.getElementsByTagName("pre")[0],
                                                h = M.getElementsByTagName("body")[0];
                                            p ? x.responseText = p.textContent ? p.textContent : p.innerText : h && (x.responseText = h.textContent ? h.textContent : h.innerText)
                                        }
                                    } else "xml" == c && !x.responseXML && x.responseText && (x.responseXML = X(x.responseText));
                                    try {
                                        E = _(x, c, m)
                                    } catch (y) {
                                        i = "parsererror", x.error = r = y || i
                                    }
                                } catch (y) {
                                    a("error caught: ", y), i = "error", x.error = r = y || i
                                }
                                x.aborted && (a("upload aborted"), i = null), x.status && (i = x.status >= 200 && x.status < 300 || 304 === x.status ? "success" : "error"), "success" === i ? (m.success && m.success.call(m.context, E, "success", x), S.resolve(x.responseText, "success", x), d && e.event.trigger("ajaxSuccess", [x, m])) : i && (void 0 === r && (r = x.statusText), m.error && m.error.call(m.context, x, i, r), S.reject(x, "error", r), d && e.event.trigger("ajaxError", [x, m, r])), d && e.event.trigger("ajaxComplete", [x, m]), d && !--e.active && e.event.trigger("ajaxStop"), m.complete && m.complete.call(m.context, x, i), F = !0, m.timeout && clearTimeout(j), setTimeout(function () {
                                    m.iframeTarget ? v.attr("src", m.iframeSrc) : v.remove(), x.responseXML = null
                                }, 100)
                            }
                        }
                    }
                    var c, l, m, d, p, v, g, x, y, b, T, j, w = f[0],
                        S = e.Deferred();
                    if (S.abort = function (e) {
                            x.abort(e)
                    }, r)
                        for (l = 0; l < h.length; l++) c = e(h[l]), i ? c.prop("disabled", !1) : c.removeAttr("disabled");
                    if (m = e.extend(!0, {}, e.ajaxSettings, t), m.context = m.context || m, p = "jqFormIO" + (new Date).getTime(), m.iframeTarget ? (v = e(m.iframeTarget), b = v.attr2("name"), b ? p = b : v.attr2("name", p)) : (v = e('<iframe name="' + p + '" src="' + m.iframeSrc + '" />'), v.css({
                        position: "absolute",
                        top: "-1000px",
                        left: "-1000px"
                    })), g = v[0], x = {
                        aborted: 0,
                        responseText: null,
                        responseXML: null,
                        status: 0,
                        statusText: "n/a",
                        getAllResponseHeaders: function () { },
                        getResponseHeader: function () { },
                        setRequestHeader: function () { },
                        abort: function (t) {
                                var r = "timeout" === t ? "timeout" : "aborted";
                                a("aborting upload... " + r), this.aborted = 1;
                                try {
                                    g.contentWindow.document.execCommand && g.contentWindow.document.execCommand("Stop")
                    } catch (n) { }
                                v.attr("src", m.iframeSrc), x.error = r, m.error && m.error.call(m.context, x, r, t), d && e.event.trigger("ajaxError", [x, m, r]), m.complete && m.complete.call(m.context, x, r)
                    }
                    }, d = m.global, d && 0 === e.active++ && e.event.trigger("ajaxStart"), d && e.event.trigger("ajaxSend", [x, m]), m.beforeSend && m.beforeSend.call(m.context, x, m) === !1) return m.global && e.active--, S.reject(), S;
                    if (x.aborted) return S.reject(), S;
                    y = w.clk, y && (b = y.name, b && !y.disabled && (m.extraData = m.extraData || {}, m.extraData[b] = y.value, "image" == y.type && (m.extraData[b + ".x"] = w.clk_x, m.extraData[b + ".y"] = w.clk_y)));
                    var D = 1,
                        k = 2,
                        A = e("meta[name=csrf-token]").attr("content"),
                        L = e("meta[name=csrf-param]").attr("content");
                    L && A && (m.extraData = m.extraData || {}, m.extraData[L] = A), m.forceSync ? o() : setTimeout(o, 10);
                    var E, M, F, O = 50,
                        X = e.parseXML || function (e, t) {
                            return window.ActiveXObject ? (t = new ActiveXObject("Microsoft.XMLDOM"), t.async = "false", t.loadXML(e)) : t = (new DOMParser).parseFromString(e, "text/xml"), t && t.documentElement && "parsererror" != t.documentElement.nodeName ? t : null
                        },
                        C = e.parseJSON || function (e) {
                            return window.eval("(" + e + ")")
                        },
                        _ = function (t, r, a) {
                            var n = t.getResponseHeader("content-type") || "",
                                i = "xml" === r || !r && n.indexOf("xml") >= 0,
                                o = i ? t.responseXML : t.responseText;
                            return i && "parsererror" === o.documentElement.nodeName && e.error && e.error("parsererror"), a && a.dataFilter && (o = a.dataFilter(o, r)), "string" == typeof o && ("json" === r || !r && n.indexOf("json") >= 0 ? o = C(o) : ("script" === r || !r && n.indexOf("javascript") >= 0) && e.globalEval(o)), o
                        };
                    return S
                }
                if (!this.length) return a("ajaxSubmit: skipping submit process - no element selected"), this;
                var u, c, l, f = this;
                "function" == typeof t ? t = {
                    success: t
                } : void 0 === t && (t = {}), u = t.type || this.attr2("method"), c = t.url || this.attr2("action"), l = "string" == typeof c ? e.trim(c) : "", l = l || window.location.href || "", l && (l = (l.match(/^([^#]+)/) || [])[1]), t = e.extend(!0, {
                    url: l,
                    success: e.ajaxSettings.success,
                    type: u || e.ajaxSettings.type,
                    iframeSrc: /^https/i.test(window.location.href || "") ? "javascript:false" : "about:blank"
                }, t);
                var m = {};
                if (this.trigger("form-pre-serialize", [this, t, m]), m.veto) return a("ajaxSubmit: submit vetoed via form-pre-serialize trigger"), this;
                if (t.beforeSerialize && t.beforeSerialize(this, t) === !1) return a("ajaxSubmit: submit aborted via beforeSerialize callback"), this;
                var d = t.traditional;
                void 0 === d && (d = e.ajaxSettings.traditional);
                var p, h = [],
                    v = this.formToArray(t.semantic, h);
                if (t.data && (t.extraData = t.data, p = e.param(t.data, d)), t.beforeSubmit && t.beforeSubmit(v, this, t) === !1) return a("ajaxSubmit: submit aborted via beforeSubmit callback"), this;
                if (this.trigger("form-submit-validate", [v, this, t, m]), m.veto) return a("ajaxSubmit: submit vetoed via form-submit-validate trigger"), this;
                var g = e.param(v, d);
                p && (g = g ? g + "&" + p : p), "GET" == t.type.toUpperCase() ? (t.url += (t.url.indexOf("?") >= 0 ? "&" : "?") + g, t.data = null) : t.data = g;
                var x = [];
                if (t.resetForm && x.push(function () {
                        f.resetForm()
                }), t.clearForm && x.push(function () {
                        f.clearForm(t.includeHidden)
                }), !t.dataType && t.target) {
                    var y = t.success || function () { };
                    x.push(function (r) {
                        var a = t.replaceTarget ? "replaceWith" : "html";
                        e(t.target)[a](r).each(y, arguments)
                    })
                } else t.success && x.push(t.success);
                if (t.success = function (e, r, a) {
                        for (var n = t.context || this, i = 0, o = x.length; o > i; i++) x[i].apply(n, [e, r, a || f, f])
                }, t.error) {
                    var b = t.error;
                    t.error = function (e, r, a) {
                        var n = t.context || this;
                        b.apply(n, [e, r, a, f])
                    }
                }
                if (t.complete) {
                    var T = t.complete;
                    t.complete = function (e, r) {
                        var a = t.context || this;
                        T.apply(a, [e, r, f])
                    }
                }
                var j = e("input[type=file]:enabled", this).filter(function () {
                    return "" !== e(this).val()
                }),
                    w = j.length > 0,
                    S = "multipart/form-data",
                    D = f.attr("enctype") == S || f.attr("encoding") == S,
                    k = n.fileapi && n.formdata;
                a("fileAPI :" + k);
                var A, L = (w || D) && !k;
                t.iframe !== !1 && (t.iframe || L) ? t.closeKeepAlive ? e.get(t.closeKeepAlive, function () {
                    A = s(v)
                }) : A = s(v) : A = (w || D) && k ? o(v) : e.ajax(t), f.removeData("jqxhr").data("jqxhr", A);
                for (var E = 0; E < h.length; E++) h[E] = null;
                return this.trigger("form-submit-notify", [this, t]), this
            }, e.fn.ajaxForm = function (n) {
                if (n = n || {}, n.delegation = n.delegation && e.isFunction(e.fn.on), !n.delegation && 0 === this.length) {
                    var i = {
                        s: this.selector,
                        c: this.context
                    };
                    return !e.isReady && i.s ? (a("DOM not ready, queuing ajaxForm"), e(function () {
                        e(i.s, i.c).ajaxForm(n)
                    }), this) : (a("terminating; zero elements found by selector" + (e.isReady ? "" : " (DOM not ready)")), this)
                }
                return n.delegation ? (e(document).off("submit.form-plugin", this.selector, t).off("click.form-plugin", this.selector, r).on("submit.form-plugin", this.selector, n, t).on("click.form-plugin", this.selector, n, r), this) : this.ajaxFormUnbind().bind("submit.form-plugin", n, t).bind("click.form-plugin", n, r)
            }, e.fn.ajaxFormUnbind = function () {
                return this.unbind("submit.form-plugin click.form-plugin")
            }, e.fn.formToArray = function (t, r) {
                var a = [];
                if (0 === this.length) return a;
                var i, o = this[0],
                    s = this.attr("id"),
                    u = t ? o.getElementsByTagName("*") : o.elements;
                if (u && !/MSIE [678]/.test(navigator.userAgent) && (u = e(u).get()), s && (i = e(':input[form="' + s + '"]').get(), i.length && (u = (u || []).concat(i))), !u || !u.length) return a;
                var c, l, f, m, d, p, h;
                for (c = 0, p = u.length; p > c; c++)
                    if (d = u[c], f = d.name, f && !d.disabled)
                        if (t && o.clk && "image" == d.type) o.clk == d && (a.push({
                            name: f,
                            value: e(d).val(),
                            type: d.type
                        }), a.push({
                            name: f + ".x",
                            value: o.clk_x
                        }, {
                            name: f + ".y",
                            value: o.clk_y
                        }));
                        else if (m = e.fieldValue(d, !0), m && m.constructor == Array)
                            for (r && r.push(d), l = 0, h = m.length; h > l; l++) a.push({
                                name: f,
                                value: m[l]
                            });
                        else if (n.fileapi && "file" == d.type) {
                            r && r.push(d);
                            var v = d.files;
                            if (v.length)
                                for (l = 0; l < v.length; l++) a.push({
                                    name: f,
                                    value: v[l],
                                    type: d.type
                                });
                            else a.push({
                                name: f,
                                value: "",
                                type: d.type
                            })
                        } else null !== m && "undefined" != typeof m && (r && r.push(d), a.push({
                            name: f,
                            value: m,
                            type: d.type,
                            required: d.required
                        }));
                if (!t && o.clk) {
                    var g = e(o.clk),
                        x = g[0];
                    f = x.name, f && !x.disabled && "image" == x.type && (a.push({
                        name: f,
                        value: g.val()
                    }), a.push({
                        name: f + ".x",
                        value: o.clk_x
                    }, {
                        name: f + ".y",
                        value: o.clk_y
                    }))
                }
                return a
            }, e.fn.formSerialize = function (t) {
                return e.param(this.formToArray(t))
            }, e.fn.fieldSerialize = function (t) {
                var r = [];
                return this.each(function () {
                    var a = this.name;
                    if (a) {
                        var n = e.fieldValue(this, t);
                        if (n && n.constructor == Array)
                            for (var i = 0, o = n.length; o > i; i++) r.push({
                                name: a,
                                value: n[i]
                            });
                        else null !== n && "undefined" != typeof n && r.push({
                            name: this.name,
                            value: n
                        })
                    }
                }), e.param(r)
            }, e.fn.fieldValue = function (t) {
                for (var r = [], a = 0, n = this.length; n > a; a++) {
                    var i = this[a],
                        o = e.fieldValue(i, t);
                    null === o || "undefined" == typeof o || o.constructor == Array && !o.length || (o.constructor == Array ? e.merge(r, o) : r.push(o))
                }
                return r
            }, e.fieldValue = function (t, r) {
                var a = t.name,
                    n = t.type,
                    i = t.tagName.toLowerCase();
                if (void 0 === r && (r = !0), r && (!a || t.disabled || "reset" == n || "button" == n || ("checkbox" == n || "radio" == n) && !t.checked || ("submit" == n || "image" == n) && t.form && t.form.clk != t || "select" == i && -1 == t.selectedIndex)) return null;
                if ("select" == i) {
                    var o = t.selectedIndex;
                    if (0 > o) return null;
                    for (var s = [], u = t.options, c = "select-one" == n, l = c ? o + 1 : u.length, f = c ? o : 0; l > f; f++) {
                        var m = u[f];
                        if (m.selected) {
                            var d = m.value;
                            if (d || (d = m.attributes && m.attributes.value && !m.attributes.value.specified ? m.text : m.value), c) return d;
                            s.push(d)
                        }
                    }
                    return s
                }
                return e(t).val()
            }, e.fn.clearForm = function (t) {
                return this.each(function () {
                    e("input,select,textarea", this).clearFields(t)
                })
            }, e.fn.clearFields = e.fn.clearInputs = function (t) {
                var r = /^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i;
                return this.each(function () {
                    var a = this.type,
                        n = this.tagName.toLowerCase();
                    r.test(a) || "textarea" == n ? this.value = "" : "checkbox" == a || "radio" == a ? this.checked = !1 : "select" == n ? this.selectedIndex = -1 : "file" == a ? /MSIE/.test(navigator.userAgent) ? e(this).replaceWith(e(this).clone(!0)) : e(this).val("") : t && (t === !0 && /hidden/.test(a) || "string" == typeof t && e(this).is(t)) && (this.value = "")
                })
            }, e.fn.resetForm = function () {
                return this.each(function () {
                    ("function" == typeof this.reset || "object" == typeof this.reset && !this.reset.nodeType) && this.reset()
                })
            }, e.fn.enable = function (e) {
                return void 0 === e && (e = !0), this.each(function () {
                    this.disabled = !e
                })
            }, e.fn.selected = function (t) {
                return void 0 === t && (t = !0), this.each(function () {
                    var r = this.type;
                    if ("checkbox" == r || "radio" == r) this.checked = t;
                    else if ("option" == this.tagName.toLowerCase()) {
                        var a = e(this).parent("select");
                        t && a[0] && "select-one" == a[0].type && a.find("option").selected(!1), this.selected = t
                    }
                })
            }, e.fn.ajaxSubmit.debug = !1
        }), $(function () {
            var form = "#contactForm";
            $(form).on("submit", function (e) {
                function validate(nm, em, msg) {
                    return $(target).removeClass("alert-success"), "" == nm ? ($("input#name").parent("div").addClass("has-error"), $(target).removeClass("hidden").addClass("alert-danger"), $(target).text(nameError), $("input#name").focus(), resetSubmit(), !1) : ($("input#name").parent("div").removeClass("has-error"), "" == em ? ($("input#email").parent("div").addClass("has-error"), $(target).removeClass("hidden").addClass("alert-danger"), $(target).text(emailError), $("input#email").focus(), resetSubmit(), !1) : ($("input#email").parent("div").removeClass("has-error"), "" == msg ? ($("textarea#message").parent("div").addClass("has-error"), $(target).removeClass("hidden").addClass("alert-danger"), $(target).text(messageError), $("textarea#message").focus(), resetSubmit(), !1) : msg.length < 10 ? ($(target).removeClass("hidden").addClass("alert-danger"), $(target).text(messageShortError), $("textarea#message").focus(), resetSubmit(), !1) : ($("#message").parent("div").removeClass("has-error"), $(target).removeClass("alert-danger").addClass("hidden"), $(target).text(""), !0)))
                }

                function resetSubmit() {
                    $("input#submit").attr("value", "SEND MESSAGE")
                }
                e.preventDefault(), $("input#submit").attr("value", "Processing..");
                var name = $("input#name").val(),
                    email = $("input#email").val(),
                    company = $("input#company").val(),
                    phone = $("input#phone").val(),
                    message = $("textarea#message").val(),
                    route = "process.php",
                    target = "#alert",
                    errMsg = "Error! Could not contact server",
                    sucMsg = "Thanks! Your message has been received. Someone will get back to you.",
                    nameError = "Name is required",
                    emailError = "Email is required",
                    messageError = "Message is required",
                    messageShortError = "Message is too short";
                if (1 == validate(name, email, message, company, phone)) {
                    $.ajax({
                        type: "POST",
                        dataType: "json",
                        url: route,
                        data: {
                            name: name,
                            email: email,
                            company: company,
                            phone: phone,
                            message: message
                        },
                        success: function (data, textStatus, jqXHR) {
                            jqXHR.responseJSON.status ? data.mailSent && ($(form)[0].reset(), resetSubmit(), $(target).removeClass("hidden").removeClass("alert-danger").addClass("alert-success"), $(target).text(sucMsg)) : alert(jqXHR.responseJSON.message)
                        },
                        error: function () {
                            resetSubmit(), $(target).removeClass("hidden").removeClass("alert-success").addClass("alert-danger"), $(target).text(errMsg)
                        }
                    })
                }
            })
        });
})(window);