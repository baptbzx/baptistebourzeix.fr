!function () {
    return function t(e, n, i) {
        function r(a, s) {
            if (!n[a]) {
                if (!e[a]) {
                    var h = "function" == typeof require && require;
                    if (!s && h) return h(a, !0);
                    if (o) return o(a, !0);
                    var c = new Error("Cannot find module '" + a + "'");
                    throw c.code = "MODULE_NOT_FOUND", c
                }
                var u = n[a] = {exports: {}};
                e[a][0].call(u.exports, function (t) {
                    return r(e[a][1][t] || t)
                }, u, u.exports, t, e, n, i)
            }
            return n[a].exports
        }

        for (var o = "function" == typeof require && require, a = 0; a < i.length; a++) r(i[a]);
        return r
    }
}()({
    1: [function (t, e, n) {
        (function (e) {
            const n = t("canvas-sketch"), i = t("nice-color-palettes"), r = t("canvas-sketch-util/random"),
                o = t("improved-noise");
            e.THREE = t("three"), t("three/examples/js/controls/OrbitControls");
            r.pick(i);
            n(({context: t}) => {
                r.pick(i);
                console.log("lightColor", "#ffd200");
                const e = new THREE.WebGLRenderer({context: t}), n = new THREE.Raycaster, a = new THREE.Vector2;
                var s, h;
                e.setClearColor("#090909", 1);
                const c = new THREE.PerspectiveCamera(45, 1, 1, 2e4);
                c.position.set(0, 0, window.innerWidth);
                const u = new THREE.Scene;
                u.background = new THREE.Color(131586), u.fog = new THREE.FogExp2(4737096, 1e-4);
                var l = function (t, e) {
                    for (var n = t * e, i = new Uint8Array(n), r = new o, a = .2, s = 100 * Math.random(), h = 0; h < 4; h++) {
                        for (var c = 0; c < n; c++) {
                            var u = c % t, l = ~~(c / t);
                            i[c] += Math.abs(r.noise(u / a, l / a, s) * a * 1.75)
                        }
                        a *= 5
                    }
                    return i
                }(512, 512);
                console.log("Camera", c);
                var f = new THREE.PlaneBufferGeometry(1e4, 1e4, 511, 511), p = new THREE.PlaneGeometry(1e4, 1e4),
                    d = new THREE.Mesh(p, new THREE.MeshBasicMaterial({transparent: !0, opacity: 0}));
                d.is_raycastable = !0, f.rotateX(-Math.PI / 2), console.log("raycastMesh", d), d.position.x = 0, d.position.y = 0, d.position.z = -7e3, u.add(d);
                for (var m = f.attributes.position.array, v = 0, g = 0, y = m.length; v < y; v++, g += 3) m[g + 1] = 10 * l[v];
                var w = -(10 * l[131328] + 500);
                (s = new THREE.CanvasTexture(function (t, e, n) {
                    var i, r, o, a, s, h, c, u;
                    h = new THREE.Vector3(0, 0, 0), (c = new THREE.Vector3(.5, .5, .5)).normalize(), (i = document.createElement("canvas")).width = e, i.height = n, (o = i.getContext("2d")).fillStyle = "#000", o.fillRect(0, 0, e, n), a = o.getImageData(0, 0, i.width, i.height);
                    for (var l = 0, f = 0, p = (s = a.data).length; l < p; l += 4, f++) h.x = t[f - 2] - t[f + 2], h.y = 2, h.z = t[f - 2 * e] - t[f + 2 * e], h.normalize(), u = h.dot(c), s[l] = (5 + 96 * u) * (.05 + .007 * t[f]), s[l + 1] = (5 + 96 * u) * (.05 + .007 * t[f]), s[l + 2] = (5 + 96 * u) * (.05 + .007 * t[f]);
                    o.putImageData(a, 0, 0), (r = document.createElement("canvas")).width = 4 * e, r.height = 4 * n, (o = r.getContext("2d")).scale(4, 4), o.drawImage(i, 0, 0), a = o.getImageData(0, 0, r.width, r.height);
                    for (var l = 0, p = (s = a.data).length; l < p; l += 4) {
                        var d = ~~(5 * Math.random());
                        s[l] += d, s[l + 1] += d, s[l + 2] += d
                    }
                    return o.putImageData(a, 0, 0), r
                }(l, 512, 512))).wrapS = THREE.ClampToEdgeWrapping, s.wrapT = THREE.ClampToEdgeWrapping, (h = new THREE.Mesh(f, new THREE.MeshPhysicalMaterial({
                    map: s,
                    metalness: .7,
                    wireframe: !0,
                    color: 16777215,
                    emissive: 0,
                    fog: !0
                }))).position.y = w, console.log("terrainMesh", h);
                const x = new THREE.Mesh(f, new THREE.MeshBasicMaterial({map: s}));
                console.log("terrainMeshCopy", x), x.material.opacity = 0, x.material.transparent = !0, x.position.y = w + 50, x.is_raycastable = !0, u.add(h), u.add(x);
                const M = new THREE.Mesh(new THREE.BoxGeometry(200, 200, 200), new THREE.MeshStandardMaterial({
                        color: 2631720,
                        emissive: 0,
                        roughness: .5,
                        metalness: .75,
                        refractionRatio: 0,
                        flatShading: !0,
                        wireframe: !1
                    })),
                    _ = new THREE.Mesh(new THREE.BoxGeometry(5e3, 5e3, 300), new THREE.MeshPhysicalMaterial({color: 8912896}));
                M.position.y = 75, M.position.z = -1500, M.position.x = 0, _.position.y = 2400, _.position.z = -1400, _.position.x = 0, _.material.opacity = 0, _.material.transparent = !0, _.is_raycastable = !0, _.is_cube = !0, console.log("Mesh", M), u.add(M), u.add(_), u.add(new THREE.AmbientLight(4210752));
                const E = new THREE.SphereGeometry(10, 50, 50), S = new THREE.PointLight("#ffd200", 1, 1e3, 2);
                return S.position.set(0, 0, -1500), S.power = 40, S.intensity = 1, S.castShadow = !0, S.add(new THREE.Mesh(E, new THREE.MeshBasicMaterial({color: "#ffd200"}))), console.log(S), u.add(S), {
                    resize({
                               pixelRatio: t,
                               viewportWidth: n,
                               viewportHeight: i
                           }) {
                        e.setPixelRatio(t), e.setSize(n, i), c.aspect = n / i, c.updateProjectionMatrix()
                    }, render({time: t}) {
                        window.addEventListener("mousemove", b, !1), n.setFromCamera(a, c);
                        for (var i = n.intersectObjects(u.children), r = 0; r < i.length; r++) if (i[r].object.is_raycastable) {
                            S.position.copy(i[r].point), i[r].object.is_cube ? (S.distance = 2500, S.intensity = 1) : (S.distance = 2e3, S.intensity = .5);
                            break
                        }
                        M.rotation.y = t * (10 * Math.PI / 180), e.render(u, c)
                    }, unload() {
                        e.dispose()
                    }
                };

                function b(t) {
                    a.x = t.clientX / window.innerWidth * 2 - 1, a.y = -t.clientY / window.innerHeight * 2 + 1
                }
            }, {animate: !0, context: "webgl", attributes: {antialias: !0}})
        }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }, {
        "canvas-sketch": 3,
        "canvas-sketch-util/random": 2,
        "improved-noise": 6,
        "nice-color-palettes": 7,
        three: 10,
        "three/examples/js/controls/OrbitControls": 11
    }], 2: [function (t, e, n) {
        var i = t("seed-random"), r = t("simplex-noise"), o = t("defined");
        e.exports = function t(e) {
            e = o(e, null);
            var n, a, s, h = Math.random, c = null, u = !1;
            return l(e), {
                value: f, createRandom: function (e) {
                    return t(e)
                }, setSeed: l, getSeed: function () {
                    return n
                }, getRandomSeed: function () {
                    return String(Math.floor(1e6 * Math.random()))
                }, valueNonZero: function () {
                    for (var t = 0; 0 === t;) t = f();
                    return t
                }, permuteNoise: function () {
                    s = p()
                }, noise1D: function (t, e, n) {
                    if (!isFinite(t)) throw new TypeError("x component for noise() must be finite");
                    return e = o(e, 1), (n = o(n, 1)) * s.noise2D(t * e, 0)
                }, noise2D: function (t, e, n, i) {
                    if (!isFinite(t)) throw new TypeError("x component for noise() must be finite");
                    if (!isFinite(e)) throw new TypeError("y component for noise() must be finite");
                    return n = o(n, 1), (i = o(i, 1)) * s.noise2D(t * n, e * n)
                }, noise3D: function (t, e, n, i, r) {
                    if (!isFinite(t)) throw new TypeError("x component for noise() must be finite");
                    if (!isFinite(e)) throw new TypeError("y component for noise() must be finite");
                    if (!isFinite(n)) throw new TypeError("z component for noise() must be finite");
                    return i = o(i, 1), (r = o(r, 1)) * s.noise3D(t * i, e * i, n * i)
                }, noise4D: function (t, e, n, i, r, a) {
                    if (!isFinite(t)) throw new TypeError("x component for noise() must be finite");
                    if (!isFinite(e)) throw new TypeError("y component for noise() must be finite");
                    if (!isFinite(n)) throw new TypeError("z component for noise() must be finite");
                    if (!isFinite(i)) throw new TypeError("w component for noise() must be finite");
                    return r = o(r, 1), (a = o(a, 1)) * s.noise4D(t * r, e * r, n * r, i * r)
                }, sign: function () {
                    return d() ? 1 : -1
                }, boolean: d, chance: function (t) {
                    if ("number" != typeof (t = o(t, .5))) throw new TypeError("expected n to be a number");
                    return f() < t
                }, range: m, rangeFloor: v, pick: function (t) {
                    return 0 === t.length ? void 0 : t[v(0, t.length)]
                }, shuffle: function (t) {
                    if (!Array.isArray(t)) throw new TypeError("Expected Array, got " + typeof t);
                    for (var e, n, i = t.length, r = t.slice(); i;) e = Math.floor(f() * i--), n = r[i], r[i] = r[e], r[e] = n;
                    return r
                }, onCircle: g, insideCircle: function (t, e) {
                    t = o(t, 1), g(1, e = e || []);
                    var n = t * Math.sqrt(f());
                    return e[0] *= n, e[1] *= n, e
                }, onSphere: function (t, e) {
                    t = o(t, 1), e = e || [];
                    var n = f() * Math.PI * 2, i = 2 * f() - 1, r = n, a = Math.acos(i);
                    return e[0] = t * Math.sin(a) * Math.cos(r), e[1] = t * Math.sin(a) * Math.sin(r), e[2] = t * Math.cos(a), e
                }, insideSphere: function (t, e) {
                    t = o(t, 1), e = e || [];
                    var n = f() * Math.PI * 2, i = 2 * f() - 1, r = f(), a = n, s = Math.acos(i), h = t * Math.cbrt(r);
                    return e[0] = h * Math.sin(s) * Math.cos(a), e[1] = h * Math.sin(s) * Math.sin(a), e[2] = h * Math.cos(s), e
                }, quaternion: function (t) {
                    t = t || [];
                    var e = f(), n = f(), i = f(), r = Math.sqrt(1 - e), o = Math.sqrt(e), a = 2 * Math.PI * n,
                        s = 2 * Math.PI * i, h = Math.sin(a) * r, c = Math.cos(a) * r, u = Math.sin(s) * o,
                        l = Math.cos(s) * o;
                    return t[0] = h, t[1] = c, t[2] = u, t[3] = l, t
                }, weighted: w, weightedSet: function (t) {
                    return 0 === (t = t || []).length ? null : t[y(t)].value
                }, weightedSetIndex: y, gaussian: function (t, e) {
                    if (t = o(t, 0), e = o(e, 1), u) {
                        u = !1;
                        var n = c;
                        return c = null, t + e * n
                    }
                    var i = 0, r = 0, a = 0;
                    do {
                        i = 2 * f() - 1, r = 2 * f() - 1, a = i * i + r * r
                    } while (a >= 1 || 0 === a);
                    var s = Math.sqrt(-2 * Math.log(a) / a);
                    return c = r * s, u = !0, t + e * (i * s)
                }
            };

            function l(t, e) {
                "number" == typeof t || "string" == typeof t ? a = i(n = t, e) : (n = void 0, a = h), s = p(), c = null, u = !1
            }

            function f() {
                return a()
            }

            function p() {
                return new r(a)
            }

            function d() {
                return f() > .5
            }

            function m(t, e) {
                if (void 0 === e && (e = t, t = 0), "number" != typeof t || "number" != typeof e) throw new TypeError("Expected all arguments to be numbers");
                return f() * (e - t) + t
            }

            function v(t, e) {
                if (void 0 === e && (e = t, t = 0), "number" != typeof t || "number" != typeof e) throw new TypeError("Expected all arguments to be numbers");
                return Math.floor(m(t, e))
            }

            function g(t, e) {
                t = o(t, 1), e = e || [];
                var n = 2 * f() * Math.PI;
                return e[0] = t * Math.cos(n), e[1] = t * Math.sin(n), e
            }

            function y(t) {
                return 0 === (t = t || []).length ? -1 : w(t.map(function (t) {
                    return t.weight
                }))
            }

            function w(t) {
                if (0 === (t = t || []).length) return -1;
                var e, n = 0;
                for (e = 0; e < t.length; e++) n += t[e];
                if (n <= 0) throw new Error("Weights must sum to > 0");
                var i = f() * n;
                for (e = 0; e < t.length; e++) {
                    if (i < t[e]) return e;
                    i -= t[e]
                }
                return 0
            }
        }()
    }, {defined: 5, "seed-random": 8, "simplex-noise": 9}], 3: [function (t, e, n) {
        (function (i) {
            !function (i, r) {
                "object" == typeof n && void 0 !== e ? e.exports = r(t("convert-length")) : "function" == typeof define && define.amd ? define(["convert-length"], r) : i.canvasSketch = r(null)
            }(this, function (t) {
                t = t && t.hasOwnProperty("default") ? t.default : t;
                var e = function () {
                        for (var t = 0; t < arguments.length; t++) if (void 0 !== arguments[t]) return arguments[t]
                    }, n = Object.getOwnPropertySymbols, r = Object.prototype.hasOwnProperty,
                    o = Object.prototype.propertyIsEnumerable;
                var a = function () {
                        try {
                            if (!Object.assign) return !1;
                            var t = new String("abc");
                            if (t[5] = "de", "5" === Object.getOwnPropertyNames(t)[0]) return !1;
                            for (var e = {}, n = 0; n < 10; n++) e["_" + String.fromCharCode(n)] = n;
                            if ("0123456789" !== Object.getOwnPropertyNames(e).map(function (t) {
                                return e[t]
                            }).join("")) return !1;
                            var i = {};
                            return "abcdefghijklmnopqrst".split("").forEach(function (t) {
                                i[t] = t
                            }), "abcdefghijklmnopqrst" === Object.keys(Object.assign({}, i)).join("")
                        } catch (t) {
                            return !1
                        }
                    }() ? Object.assign : function (t, e) {
                        for (var i, a, s = function (t) {
                            if (null == t) throw new TypeError("Object.assign cannot be called with null or undefined");
                            return Object(t)
                        }(t), h = 1; h < arguments.length; h++) {
                            for (var c in i = Object(arguments[h])) r.call(i, c) && (s[c] = i[c]);
                            if (n) {
                                a = n(i);
                                for (var u = 0; u < a.length; u++) o.call(i, a[u]) && (s[a[u]] = i[a[u]])
                            }
                        }
                        return s
                    },
                    s = "undefined" != typeof window ? window : void 0 !== i ? i : "undefined" != typeof self ? self : {};

                function h(t, e) {
                    return t(e = {exports: {}}, e.exports), e.exports
                }

                var c = s.performance && s.performance.now ? function () {
                    return performance.now()
                } : Date.now || function () {
                    return +new Date
                }, u = function (t) {
                    return !!t && ("object" == typeof t || "function" == typeof t) && "function" == typeof t.then
                };
                var l = function (t) {
                    return !(!t || "object" != typeof t) && ("object" == typeof window && "object" == typeof window.Node ? t instanceof window.Node : "number" == typeof t.nodeType && "string" == typeof t.nodeName)
                };

                function f() {
                    return "undefined" != typeof window && window["canvas-sketch-cli"]
                }

                function p() {
                    return "undefined" != typeof document
                }

                var d, m = h(function (t, e) {
                    function n(t) {
                        var e = [];
                        for (var n in t) e.push(n);
                        return e
                    }

                    (t.exports = "function" == typeof Object.keys ? Object.keys : n).shim = n
                }), v = h(function (t, e) {
                    var n = "[object Arguments]" == function () {
                        return Object.prototype.toString.call(arguments)
                    }();

                    function i(t) {
                        return "[object Arguments]" == Object.prototype.toString.call(t)
                    }

                    function r(t) {
                        return t && "object" == typeof t && "number" == typeof t.length && Object.prototype.hasOwnProperty.call(t, "callee") && !Object.prototype.propertyIsEnumerable.call(t, "callee") || !1
                    }

                    (e = t.exports = n ? i : r).supported = i, e.unsupported = r
                }), g = h(function (t) {
                    var e = Array.prototype.slice, n = t.exports = function (t, o, a) {
                        return a || (a = {}), t === o || (t instanceof Date && o instanceof Date ? t.getTime() === o.getTime() : !t || !o || "object" != typeof t && "object" != typeof o ? a.strict ? t === o : t == o : function (t, o, a) {
                            var s, h;
                            if (i(t) || i(o)) return !1;
                            if (t.prototype !== o.prototype) return !1;
                            if (v(t)) return !!v(o) && (t = e.call(t), o = e.call(o), n(t, o, a));
                            if (r(t)) {
                                if (!r(o)) return !1;
                                if (t.length !== o.length) return !1;
                                for (s = 0; s < t.length; s++) if (t[s] !== o[s]) return !1;
                                return !0
                            }
                            try {
                                var c = m(t), u = m(o)
                            } catch (t) {
                                return !1
                            }
                            if (c.length != u.length) return !1;
                            for (c.sort(), u.sort(), s = c.length - 1; s >= 0; s--) if (c[s] != u[s]) return !1;
                            for (s = c.length - 1; s >= 0; s--) if (!n(t[h = c[s]], o[h], a)) return !1;
                            return typeof t == typeof o
                        }(t, o, a))
                    };

                    function i(t) {
                        return null == t
                    }

                    function r(t) {
                        return !(!t || "object" != typeof t || "number" != typeof t.length) && ("function" == typeof t.copy && "function" == typeof t.slice && !(t.length > 0 && "number" != typeof t[0]))
                    }
                }), y = h(function (t, e) {
                    !function (e) {
                        var n, i, r,
                            o = (n = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZWN]|"[^"]*"|'[^']*'/g, i = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g, r = /[^-+\dA-Z]/g, function (t, e, s, h) {
                                if (1 !== arguments.length || "string" !== (null === (c = t) ? "null" : void 0 === c ? "undefined" : "object" != typeof c ? typeof c : Array.isArray(c) ? "array" : {}.toString.call(c).slice(8, -1).toLowerCase()) || /\d/.test(t) || (e = t, t = void 0), (t = t || new Date) instanceof Date || (t = new Date(t)), isNaN(t)) throw TypeError("Invalid date");
                                var c, u = (e = String(o.masks[e] || e || o.masks.default)).slice(0, 4);
                                "UTC:" !== u && "GMT:" !== u || (e = e.slice(4), s = !0, "GMT:" === u && (h = !0));
                                var l = s ? "getUTC" : "get", f = t[l + "Date"](), p = t[l + "Day"](),
                                    d = t[l + "Month"](), m = t[l + "FullYear"](), v = t[l + "Hours"](),
                                    g = t[l + "Minutes"](), y = t[l + "Seconds"](), w = t[l + "Milliseconds"](),
                                    x = s ? 0 : t.getTimezoneOffset(), M = function (t) {
                                        var e = new Date(t.getFullYear(), t.getMonth(), t.getDate());
                                        e.setDate(e.getDate() - (e.getDay() + 6) % 7 + 3);
                                        var n = new Date(e.getFullYear(), 0, 4);
                                        n.setDate(n.getDate() - (n.getDay() + 6) % 7 + 3);
                                        var i = e.getTimezoneOffset() - n.getTimezoneOffset();
                                        return e.setHours(e.getHours() - i), 1 + Math.floor((e - n) / 6048e5)
                                    }(t), _ = function (t) {
                                        var e = t.getDay();
                                        return 0 === e && (e = 7), e
                                    }(t), E = {
                                        d: f,
                                        dd: a(f),
                                        ddd: o.i18n.dayNames[p],
                                        dddd: o.i18n.dayNames[p + 7],
                                        m: d + 1,
                                        mm: a(d + 1),
                                        mmm: o.i18n.monthNames[d],
                                        mmmm: o.i18n.monthNames[d + 12],
                                        yy: String(m).slice(2),
                                        yyyy: m,
                                        h: v % 12 || 12,
                                        hh: a(v % 12 || 12),
                                        H: v,
                                        HH: a(v),
                                        M: g,
                                        MM: a(g),
                                        s: y,
                                        ss: a(y),
                                        l: a(w, 3),
                                        L: a(Math.round(w / 10)),
                                        t: v < 12 ? o.i18n.timeNames[0] : o.i18n.timeNames[1],
                                        tt: v < 12 ? o.i18n.timeNames[2] : o.i18n.timeNames[3],
                                        T: v < 12 ? o.i18n.timeNames[4] : o.i18n.timeNames[5],
                                        TT: v < 12 ? o.i18n.timeNames[6] : o.i18n.timeNames[7],
                                        Z: h ? "GMT" : s ? "UTC" : (String(t).match(i) || [""]).pop().replace(r, ""),
                                        o: (x > 0 ? "-" : "+") + a(100 * Math.floor(Math.abs(x) / 60) + Math.abs(x) % 60, 4),
                                        S: ["th", "st", "nd", "rd"][f % 10 > 3 ? 0 : (f % 100 - f % 10 != 10) * f % 10],
                                        W: M,
                                        N: _
                                    };
                                return e.replace(n, function (t) {
                                    return t in E ? E[t] : t.slice(1, t.length - 1)
                                })
                            });

                        function a(t, e) {
                            for (t = String(t), e = e || 2; t.length < e;) t = "0" + t;
                            return t
                        }

                        o.masks = {
                            default: "ddd mmm dd yyyy HH:MM:ss",
                            shortDate: "m/d/yy",
                            mediumDate: "mmm d, yyyy",
                            longDate: "mmmm d, yyyy",
                            fullDate: "dddd, mmmm d, yyyy",
                            shortTime: "h:MM TT",
                            mediumTime: "h:MM:ss TT",
                            longTime: "h:MM:ss TT Z",
                            isoDate: "yyyy-mm-dd",
                            isoTime: "HH:MM:ss",
                            isoDateTime: "yyyy-mm-dd'T'HH:MM:sso",
                            isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'",
                            expiresHeaderFormat: "ddd, dd mmm yyyy HH:MM:ss Z"
                        }, o.i18n = {
                            dayNames: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                            monthNames: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                            timeNames: ["a", "p", "am", "pm", "A", "P", "AM", "PM"]
                        }, t.exports = o
                    }()
                }), w = "", x = function (t, e) {
                    if ("string" != typeof t) throw new TypeError("expected a string");
                    if (1 === e) return t;
                    if (2 === e) return t + t;
                    var n = t.length * e;
                    if (d !== t || void 0 === d) d = t, w = ""; else if (w.length >= n) return w.substr(0, n);
                    for (; n > w.length && e > 1;) 1 & e && (w += t), e >>= 1, t += t;
                    return w = (w += t).substr(0, n)
                };
                var M, _ = function (t, e, n) {
                    return t = t.toString(), void 0 === e ? t : (n = 0 === n ? "0" : n ? n.toString() : " ", x(n, e - t.length) + t)
                }, E = function () {
                }, S = ["image/png", "image/jpeg", "image/webp"];

                function b(t, e) {
                    return void 0 === e && (e = {}), function (t) {
                        return new Promise(function (e) {
                            var n = t.indexOf(",");
                            if (-1 !== n) {
                                for (var i = t.slice(n + 1), r = window.atob(i), o = /data:([^;+]);/.exec(t), a = (o ? o[1] : "") || void 0, s = new ArrayBuffer(r.length), h = new Uint8Array(s), c = 0; c < r.length; c++) h[c] = r.charCodeAt(c);
                                e(new window.Blob([s], {type: a}))
                            } else e(new window.Blob)
                        })
                    }(t).then(function (t) {
                        return T(t, e)
                    })
                }

                function T(t, e) {
                    return void 0 === e && (e = {}), new Promise(function (n) {
                        var i = function (t) {
                            void 0 === t && (t = {});
                            if ("function" == typeof (t = a({}, t)).file) return t.file(t);
                            if (t.file) return t.file;
                            var e = null, n = "";
                            "string" == typeof t.extension && (n = t.extension);
                            if ("number" == typeof t.frame) {
                                var i;
                                i = "number" == typeof t.totalFrames ? t.totalFrames : Math.max(1e3, t.frame), e = _(String(t.frame), String(i).length, "0")
                            }
                            var r = isFinite(t.totalLayers) && isFinite(t.layer) && t.totalLayers > 1 ? "" + t.layer : "";
                            if (null != e) return [r, e].filter(Boolean).join("-") + n;
                            var o = t.timeStamp;
                            return [t.prefix, t.name || o, r, t.hash, t.suffix].filter(Boolean).join("-") + n
                        }(e = a({extension: "", prefix: "", suffix: ""}, e)), r = f();
                        if (r && "function" == typeof r.saveBlob && r.output) return r.saveBlob(t, a({}, e, {filename: i})).then(function (t) {
                            return n(t)
                        });
                        M || ((M = document.createElement("a")).style.visibility = "hidden", M.target = "_blank"), M.download = i, M.href = window.URL.createObjectURL(t), document.body.appendChild(M), M.onclick = function () {
                            M.onclick = E, setTimeout(function () {
                                window.URL.revokeObjectURL(t), document.body.removeChild(M), M.removeAttribute("href"), n({
                                    filename: i,
                                    client: !1
                                })
                            })
                        }, M.click()
                    })
                }

                var L = [["postcard", 101.6, 152.4], ["poster-small", 280, 430], ["poster", 460, 610], ["poster-large", 610, 910], ["business-card", 50.8, 88.9], ["a0", 841, 1189], ["a1", 594, 841], ["a2", 420, 594], ["a3", 297, 420], ["a4", 210, 297], ["a5", 148, 210], ["a6", 105, 148], ["a7", 74, 105], ["a8", 52, 74], ["a9", 37, 52], ["a10", 26, 37], ["2a0", 1189, 1682], ["4a0", 1682, 2378], ["b0", 1e3, 1414], ["b1", 707, 1e3], ["b1+", 720, 1020], ["b2", 500, 707], ["b2+", 520, 720], ["b3", 353, 500], ["b4", 250, 353], ["b5", 176, 250], ["b6", 125, 176], ["b7", 88, 125], ["b8", 62, 88], ["b9", 44, 62], ["b10", 31, 44], ["b11", 22, 32], ["b12", 16, 22], ["c0", 917, 1297], ["c1", 648, 917], ["c2", 458, 648], ["c3", 324, 458], ["c4", 229, 324], ["c5", 162, 229], ["c6", 114, 162], ["c7", 81, 114], ["c8", 57, 81], ["c9", 40, 57], ["c10", 28, 40], ["c11", 22, 32], ["c12", 16, 22], ["half-letter", 5.5, 8.5, "in"], ["letter", 8.5, 11, "in"], ["legal", 8.5, 14, "in"], ["junior-legal", 5, 8, "in"], ["ledger", 11, 17, "in"], ["tabloid", 11, 17, "in"], ["ansi-a", 8.5, 11, "in"], ["ansi-b", 11, 17, "in"], ["ansi-c", 17, 22, "in"], ["ansi-d", 22, 34, "in"], ["ansi-e", 34, 44, "in"], ["arch-a", 9, 12, "in"], ["arch-b", 12, 18, "in"], ["arch-c", 18, 24, "in"], ["arch-d", 24, 36, "in"], ["arch-e", 36, 48, "in"], ["arch-e1", 30, 42, "in"], ["arch-e2", 26, 38, "in"], ["arch-e3", 27, 39, "in"]].reduce(function (t, e) {
                    var n = {units: e[3] || "mm", dimensions: [e[1], e[2]]};
                    return t[e[0]] = n, t[e[0].replace(/-/g, " ")] = n, t
                }, {});

                function C(e, n, i, r) {
                    return void 0 === n && (n = "px"), void 0 === i && (i = "px"), void 0 === r && (r = 72), t(e, n, i, {
                        pixelsPerInch: r,
                        precision: 4,
                        roundPixel: !0
                    })
                }

                function R(t, n) {
                    var i, r, o, a, s, h, c, u, l = n.dimensions, f = function (t) {
                            return !(!t.dimensions || "string" != typeof t.dimensions && !(Array.isArray(t.dimensions) && t.dimensions.length >= 2))
                        }(n), d = t.exporting, m = !!f && !1 !== n.scaleToFit, v = !(!d && f) || n.scaleToView, g = n.units,
                        y = "number" == typeof n.pixelsPerInch && isFinite(n.pixelsPerInch) ? n.pixelsPerInch : 72,
                        w = e(n.bleed, 0), x = p() ? window.devicePixelRatio : 1, M = v ? x : 1;
                    "number" == typeof n.pixelRatio && isFinite(n.pixelRatio) ? u = e(n.exportPixelRatio, c = n.pixelRatio) : f ? (c = M, u = e(n.exportPixelRatio, 1)) : u = e(n.exportPixelRatio, c = x), "number" == typeof n.maxPixelRatio && isFinite(n.maxPixelRatio) && (c = Math.min(n.maxPixelRatio, c), u = Math.min(n.maxPixelRatio, u)), d && (c = u);
                    var _, E, S = function (t, e) {
                        if (!p) return [300, 150];
                        var n = e.parent || window;
                        if (n === window || n === document || n === document.body) return [window.innerWidth, window.innerHeight];
                        var i = n.getBoundingClientRect();
                        return [i.width, i.height]
                    }(0, n), b = S[0], T = S[1];
                    if (f) {
                        var R = function (t, e, n) {
                            if (void 0 === e && (e = "px"), void 0 === n && (n = 72), "string" == typeof t) {
                                var i = t.toLowerCase();
                                if (!(i in L)) throw new Error('The dimension preset "' + t + '" is not supported or could not be found; try using a4, a3, postcard, letter, etc.');
                                var r = L[i];
                                return r.dimensions.map(function (t) {
                                    return C(t, r.units, e, n)
                                })
                            }
                            return t
                        }(l, g, y), A = Math.max(R[0], R[1]), P = Math.min(R[0], R[1]);
                        if (n.orientation) {
                            var N = "landscape" === n.orientation;
                            i = N ? A : P, r = N ? P : A
                        } else i = R[0], r = R[1];
                        _ = i, E = r, i += 2 * w, r += 2 * w
                    } else _ = i = b, E = r = T;
                    var z = i, U = r;
                    if (f && g && (z = C(i, g, "px", y), U = C(r, g, "px", y)), o = Math.round(z), a = Math.round(U), m && !d && f) {
                        var H = i / r, G = b / T, O = e(n.scaleToFitPadding, 40), I = Math.round(b - 2 * O),
                            F = Math.round(T - 2 * O);
                        (o > I || a > F) && (G > H ? (a = F, o = Math.round(a * H)) : (o = I, a = Math.round(o / H)))
                    }
                    return {
                        bleed: w,
                        pixelRatio: c,
                        width: i,
                        height: r,
                        dimensions: [i, r],
                        units: g || "px",
                        scaleX: (s = v ? Math.round(c * o) : Math.round(u * z)) / i,
                        scaleY: (h = v ? Math.round(c * a) : Math.round(u * U)) / r,
                        viewportWidth: v ? Math.round(o) : Math.round(z),
                        viewportHeight: v ? Math.round(a) : Math.round(U),
                        canvasWidth: s,
                        canvasHeight: h,
                        trimWidth: _,
                        trimHeight: E,
                        styleWidth: o,
                        styleHeight: a
                    }
                }

                var A = function (t, e) {
                    if ("string" != typeof t) throw new TypeError("must specify type string");
                    if (e = e || {}, "undefined" == typeof document && !e.canvas) return null;
                    var n = e.canvas || document.createElement("canvas");
                    "number" == typeof e.width && (n.width = e.width);
                    "number" == typeof e.height && (n.height = e.height);
                    var i, r = e;
                    try {
                        var o = [t];
                        0 === t.indexOf("webgl") && o.push("experimental-" + t);
                        for (var a = 0; a < o.length; a++) if (i = n.getContext(o[a], r)) return i
                    } catch (t) {
                        i = null
                    }
                    return i || null
                };

                function P(t) {
                    var e, n;
                    void 0 === t && (t = {});
                    var i = !1;
                    if (!1 !== t.canvas) {
                        if (!(e = t.context) || "string" == typeof e) {
                            var r = t.canvas;
                            r || (r = function () {
                                if (!p()) throw new Error("It appears you are runing from Node.js or a non-browser environment. Try passing in an existing { canvas } interface instead.");
                                return document.createElement("canvas")
                            }(), i = !0);
                            var o = e || "2d";
                            if ("function" != typeof r.getContext) throw new Error("The specified { canvas } element does not have a getContext() function, maybe it is not a <canvas> tag?");
                            if (!(e = A(o, a({}, t.attributes, {canvas: r})))) throw new Error("Failed at canvas.getContext('" + o + "') - the browser may not support this context, or a different context may already be in use with this canvas.")
                        }
                        if (n = e.canvas, t.canvas && n !== t.canvas) throw new Error("The { canvas } and { context } settings must point to the same underlying canvas element");
                        t.pixelated && (e.imageSmoothingEnabled = !1, e.mozImageSmoothingEnabled = !1, e.oImageSmoothingEnabled = !1, e.webkitImageSmoothingEnabled = !1, e.msImageSmoothingEnabled = !1, n.style["image-rendering"] = "pixelated")
                    }
                    return {canvas: n, context: e, ownsCanvas: i}
                }

                var N = function () {
                    var t = this;
                    this._settings = {}, this._props = {}, this._sketch = void 0, this._raf = null, this._lastRedrawResult = void 0, this._isP5Resizing = !1, this._keyboardShortcuts = function (t) {
                        void 0 === t && (t = {});
                        var e = function (e) {
                            if (t.enabled()) {
                                var n = f();
                                83 !== e.keyCode || e.altKey || !e.metaKey && !e.ctrlKey ? 32 === e.keyCode ? t.togglePlay(e) : n && !e.altKey && 75 === e.keyCode && (e.metaKey || e.ctrlKey) && (e.preventDefault(), t.commit(e)) : (e.preventDefault(), t.save(e))
                            }
                        };
                        return {
                            attach: function () {
                                window.addEventListener("keydown", e)
                            }, detach: function () {
                                window.removeEventListener("keydown", e)
                            }
                        }
                    }({
                        enabled: function () {
                            return !1 !== t.settings.hotkeys
                        }, save: function (e) {
                            e.shiftKey ? t.props.recording ? (t.endRecord(), t.run()) : t.record() : t.exportFrame()
                        }, togglePlay: function () {
                            t.props.playing ? t.pause() : t.play()
                        }, commit: function (e) {
                            t.exportFrame({commit: !0})
                        }
                    }), this._animateHandler = function () {
                        return t.animate()
                    }, this._resizeHandler = function () {
                        t.resize() && t.render()
                    }
                }, z = {sketch: {configurable: !0}, settings: {configurable: !0}, props: {configurable: !0}};
                z.sketch.get = function () {
                    return this._sketch
                }, z.settings.get = function () {
                    return this._settings
                }, z.props.get = function () {
                    return this._props
                }, N.prototype._computePlayhead = function (t, e) {
                    return "number" == typeof e && isFinite(e) ? t / e : 0
                }, N.prototype._computeFrame = function (t, e, n, i) {
                    return isFinite(n) && n > 1 ? Math.floor(t * (n - 1)) : Math.floor(i * e)
                }, N.prototype._computeCurrentFrame = function () {
                    return this._computeFrame(this.props.playhead, this.props.time, this.props.totalFrames, this.props.fps)
                }, N.prototype._getSizeProps = function () {
                    var t = this.props;
                    return {
                        width: t.width,
                        height: t.height,
                        pixelRatio: t.pixelRatio,
                        canvasWidth: t.canvasWidth,
                        canvasHeight: t.canvasHeight,
                        viewportWidth: t.viewportWidth,
                        viewportHeight: t.viewportHeight
                    }
                }, N.prototype.run = function () {
                    if (!this.sketch) throw new Error("should wait until sketch is loaded before trying to play()");
                    return !1 !== this.settings.playing && this.play(), "function" == typeof this.sketch.dispose && console.warn("In canvas-sketch@0.0.23 the dispose() event has been renamed to unload()"), this.props.started || (this._signalBegin(), this.props.started = !0), this.tick(), this.render(), this
                }, N.prototype.play = function () {
                    var t = this.settings.animate;
                    "animation" in this.settings && (t = !0, console.warn("[canvas-sketch] { animation } has been renamed to { animate }")), t && (p() ? this.props.playing || (this.props.started || (this._signalBegin(), this.props.started = !0), this.props.playing = !0, null != this._raf && window.cancelAnimationFrame(this._raf), this._lastTime = c(), this._raf = window.requestAnimationFrame(this._animateHandler)) : console.error("[canvas-sketch] WARN: Using { animate } in Node.js is not yet supported"))
                }, N.prototype.pause = function () {
                    this.props.recording && this.endRecord(), this.props.playing = !1, null != this._raf && p() && window.cancelAnimationFrame(this._raf)
                }, N.prototype.togglePlay = function () {
                    this.props.playing ? this.pause() : this.play()
                }, N.prototype.stop = function () {
                    this.pause(), this.props.frame = 0, this.props.playhead = 0, this.props.time = 0, this.props.deltaTime = 0, this.props.started = !1, this.render()
                }, N.prototype.record = function () {
                    var t = this;
                    if (!this.props.recording) if (p()) {
                        this.stop(), this.props.playing = !0, this.props.recording = !0;
                        var e = 1 / this.props.fps;
                        null != this._raf && window.cancelAnimationFrame(this._raf);
                        var n = function () {
                            return t.props.recording ? (t.props.deltaTime = e, t.tick(), t.exportFrame({sequence: !0}).then(function () {
                                t.props.recording && (t.props.deltaTime = 0, t.props.frame++, t.props.frame < t.props.totalFrames ? (t.props.time += e, t.props.playhead = t._computePlayhead(t.props.time, t.props.duration), t._raf = window.requestAnimationFrame(n)) : (console.log("Finished recording"), t._signalEnd(), t.endRecord(), t.stop(), t.run()))
                            })) : Promise.resolve()
                        };
                        this.props.started || (this._signalBegin(), this.props.started = !0), this._raf = window.requestAnimationFrame(n)
                    } else console.error("[canvas-sketch] WARN: Recording from Node.js is not yet supported")
                }, N.prototype._signalBegin = function () {
                    var t = this;
                    this.sketch && "function" == typeof this.sketch.begin && this._wrapContextScale(function (e) {
                        return t.sketch.begin(e)
                    })
                }, N.prototype._signalEnd = function () {
                    var t = this;
                    this.sketch && "function" == typeof this.sketch.end && this._wrapContextScale(function (e) {
                        return t.sketch.end(e)
                    })
                }, N.prototype.endRecord = function () {
                    null != this._raf && p() && window.cancelAnimationFrame(this._raf), this.props.recording = !1, this.props.deltaTime = 0, this.props.playing = !1
                }, N.prototype.exportFrame = function (t) {
                    var e = this;
                    if (void 0 === t && (t = {}), !this.sketch) return Promise.all([]);
                    "function" == typeof this.sketch.preExport && this.sketch.preExport();
                    var n = a({
                        sequence: t.sequence,
                        frame: t.sequence ? this.props.frame : void 0,
                        file: this.settings.file,
                        name: this.settings.name,
                        prefix: this.settings.prefix,
                        suffix: this.settings.suffix,
                        encoding: this.settings.encoding,
                        encodingQuality: this.settings.encodingQuality,
                        timeStamp: y(new Date, "yyyy.mm.dd-HH.MM.ss"),
                        totalFrames: isFinite(this.props.totalFrames) ? Math.max(100, this.props.totalFrames) : 1e3
                    }), i = f(), r = Promise.resolve();
                    if (i && t.commit && "function" == typeof i.commit) {
                        var o = a({}, n), s = i.commit(o);
                        r = u(s) ? s : Promise.resolve(s)
                    }
                    return r.then(function (t) {
                        return e._doExportFrame(a({}, n, {hash: t || ""}))
                    })
                }, N.prototype._doExportFrame = function (t) {
                    var n = this;
                    void 0 === t && (t = {}), this._props.exporting = !0, this.resize();
                    var i = this.render();
                    return void 0 === i && (i = [this.props.canvas]), i = (i = [].concat(i).filter(Boolean)).map(function (n) {
                        var i, r = "object" == typeof n && n && ("data" in n || "dataURL" in n), o = r ? n.data : n,
                            s = r ? a({}, n, {data: o}) : {data: o};
                        if (l(i = o) && /canvas/i.test(i.nodeName) && "function" == typeof i.getContext) {
                            var h = function (t, e) {
                                void 0 === e && (e = {});
                                var n = e.encoding || "image/png";
                                if (!S.includes(n)) throw new Error("Invalid canvas encoding " + n);
                                var i = (n.split("/")[1] || "").replace(/jpeg/i, "jpg");
                                return i && (i = ("." + i).toLowerCase()), {
                                    extension: i,
                                    type: n,
                                    dataURL: t.toDataURL(n, e.encodingQuality)
                                }
                            }(o, {
                                encoding: s.encoding || t.encoding,
                                encodingQuality: e(s.encodingQuality, t.encodingQuality, .95)
                            });
                            return Object.assign(s, {dataURL: h.dataURL, extension: h.extension, type: h.type})
                        }
                        return s
                    }), this._props.exporting = !1, this.resize(), this.render(), Promise.all(i.map(function (e, n, i) {
                        var r = a({}, t, e, {layer: n, totalLayers: i.length}), o = e.data;
                        if (e.dataURL) {
                            var s = e.dataURL;
                            return delete r.dataURL, b(s, r)
                        }
                        return function (t, e) {
                            void 0 === e && (e = {});
                            var n = Array.isArray(t) ? t : [t];
                            return T(new window.Blob(n, {type: e.type || ""}), e)
                        }(o, r)
                    })).then(function (e) {
                        if (e.length > 0) {
                            var i, r = e.find(function (t) {
                                return t.outputName
                            }), o = e.some(function (t) {
                                return t.client
                            });
                            i = e.length > 1 ? e.length : r ? r.outputName + "/" + e[0].filename : "" + e[0].filename;
                            var a = "";
                            if (t.sequence) a = isFinite(n.props.totalFrames) ? " (frame " + (t.frame + 1) + " / " + n.props.totalFrames + ")" : " (frame " + t.frame + ")"; else e.length > 1 && (a = " files");
                            console.log("%c[" + (o ? "canvas-sketch-cli" : "canvas-sketch") + "]%c Exported %c" + i + "%c" + a, "color: #8e8e8e;", "color: initial;", "font-weight: bold;", "font-weight: initial;")
                        }
                        "function" == typeof n.sketch.postExport && n.sketch.postExport()
                    })
                }, N.prototype._wrapContextScale = function (t) {
                    this._preRender(), t(this.props), this._postRender()
                }, N.prototype._preRender = function () {
                    var t = this.props;
                    this.props.gl || !t.context || t.p5 ? t.p5 && t.p5.scale(t.scaleX / t.pixelRatio, t.scaleY / t.pixelRatio) : (t.context.save(), !1 !== this.settings.scaleContext && t.context.scale(t.scaleX, t.scaleY))
                }, N.prototype._postRender = function () {
                    var t = this.props;
                    this.props.gl || !t.context || t.p5 || t.context.restore(), t.gl && !1 !== this.settings.flush && !t.p5 && t.gl.flush()
                }, N.prototype.tick = function () {
                    this.sketch && "function" == typeof this.sketch.tick && (this._preRender(), this.sketch.tick(this.props), this._postRender())
                }, N.prototype.render = function () {
                    return this.props.p5 ? (this._lastRedrawResult = void 0, this.props.p5.redraw(), this._lastRedrawResult) : this.submitDrawCall()
                }, N.prototype.submitDrawCall = function () {
                    if (this.sketch) {
                        var t, e = this.props;
                        return this._preRender(), "function" == typeof this.sketch ? t = this.sketch(e) : "function" == typeof this.sketch.render && (t = this.sketch.render(e)), this._postRender(), t
                    }
                }, N.prototype.update = function (t) {
                    var e = this;
                    void 0 === t && (t = {});
                    var n = ["animate"];
                    Object.keys(t).forEach(function (t) {
                        if (n.indexOf(t) >= 0) throw new Error("Sorry, the { " + t + " } option is not yet supported with update().")
                    });
                    var i = this._settings.canvas, r = this._settings.context;
                    for (var o in t) {
                        var a = t[o];
                        void 0 !== a && (e._settings[o] = a)
                    }
                    var s = Object.assign({}, this._settings, t);
                    if ("time" in t && "frame" in t) throw new Error("You should specify { time } or { frame } but not both");
                    if ("time" in t ? delete s.frame : "frame" in t && delete s.time, "duration" in t && "totalFrames" in t) throw new Error("You should specify { duration } or { totalFrames } but not both");
                    "duration" in t ? delete s.totalFrames : "totalFrames" in t && delete s.duration;
                    var h = this.getTimeProps(s);
                    if (Object.assign(this._props, h), i !== this._settings.canvas || r !== this._settings.context) {
                        var c = P(this._settings), u = c.context;
                        this.props.canvas = c.canvas, this.props.context = u, this._setupGLKey(), this._appendCanvasIfNeeded()
                    }
                    return t.p5 && "function" != typeof t.p5 && (this.props.p5 = t.p5, this.props.p5.draw = function () {
                        e._isP5Resizing || (e._lastRedrawResult = e.submitDrawCall())
                    }), "playing" in t && (t.playing ? this.play() : this.pause()), this.resize(), this.render(), this.props
                }, N.prototype.resize = function () {
                    var t = this._getSizeProps(), e = this.settings, n = this.props, i = R(n, e);
                    Object.assign(this._props, i);
                    var r = this.props, o = r.pixelRatio, a = r.canvasWidth, s = r.canvasHeight, h = r.styleWidth,
                        c = r.styleHeight, u = this.props.canvas;
                    u && !1 !== e.resizeCanvas && (n.p5 ? u.width === a && u.height === s || (this._isP5Resizing = !0, n.p5.pixelDensity(o), n.p5.resizeCanvas(a / o, s / o, !1), this._isP5Resizing = !1) : (u.width !== a && (u.width = a), u.height !== s && (u.height = s)), p() && !1 !== e.styleCanvas && (u.style.width = h + "px", u.style.height = c + "px"));
                    var l = this._getSizeProps(), f = !g(t, l);
                    return f && this._sizeChanged(), f
                }, N.prototype._sizeChanged = function () {
                    this.sketch && "function" == typeof this.sketch.resize && this.sketch.resize(this.props)
                }, N.prototype.animate = function () {
                    if (this.props.playing) if (p()) {
                        this._raf = window.requestAnimationFrame(this._animateHandler);
                        var t = c(), e = 1e3 / this.props.fps, n = t - this._lastTime, i = this.props.duration,
                            r = "number" == typeof i && isFinite(i), o = !0, a = this.settings.playbackRate;
                        "fixed" === a ? n = e : "throttle" === a ? n > e ? this._lastTime = t -= n % e : o = !1 : this._lastTime = t;
                        var s = n / 1e3, h = this.props.time + s * this.props.timeScale;
                        h < 0 && r && (h = i + h);
                        var u = !1, l = !1;
                        if (r && h >= i && (!1 !== this.settings.loop ? (o = !0, h %= i, l = !0) : (o = !1, h = i, u = !0), this._signalEnd()), o) {
                            this.props.deltaTime = s, this.props.time = h, this.props.playhead = this._computePlayhead(h, i);
                            var f = this.props.frame;
                            this.props.frame = this._computeCurrentFrame(), l && this._signalBegin(), f !== this.props.frame && this.tick(), this.render(), this.props.deltaTime = 0
                        }
                        u && this.pause()
                    } else console.error("[canvas-sketch] WARN: Animation in Node.js is not yet supported")
                }, N.prototype.dispatch = function (t) {
                    if ("function" != typeof t) throw new Error("must pass function into dispatch()");
                    t(this.props), this.render()
                }, N.prototype.mount = function () {
                    this._appendCanvasIfNeeded()
                }, N.prototype.unmount = function () {
                    p() && (window.removeEventListener("resize", this._resizeHandler), this._keyboardShortcuts.detach()), this.props.canvas.parentElement && this.props.canvas.parentElement.removeChild(this.props.canvas)
                }, N.prototype._appendCanvasIfNeeded = function () {
                    p() && (!1 !== this.settings.parent && this.props.canvas && !this.props.canvas.parentElement && (this.settings.parent || document.body).appendChild(this.props.canvas))
                }, N.prototype._setupGLKey = function () {
                    var t;
                    this.props.context && ("function" == typeof (t = this.props.context).clear && "function" == typeof t.clearColor && "function" == typeof t.bufferData ? this._props.gl = this.props.context : delete this._props.gl)
                }, N.prototype.getTimeProps = function (t) {
                    void 0 === t && (t = {});
                    var n = t.duration, i = t.totalFrames, r = e(t.timeScale, 1), o = e(t.fps, 24),
                        a = "number" == typeof n && isFinite(n), s = "number" == typeof i && isFinite(i),
                        h = a ? Math.floor(o * n) : void 0, c = s ? i / o : void 0;
                    if (a && s && h !== i) throw new Error("You should specify either duration or totalFrames, but not both. Or, they must match exactly.");
                    void 0 === t.dimensions && void 0 !== t.units && console.warn("You've specified a { units } setting but no { dimension }, so the units will be ignored."), i = e(i, h, Infinity), n = e(n, c, Infinity);
                    var u = t.time, l = t.frame, f = "number" == typeof u && isFinite(u),
                        p = "number" == typeof l && isFinite(l), d = 0, m = 0, v = 0;
                    if (f && p) throw new Error("You should specify either start frame or time, but not both.");
                    return f ? (v = this._computePlayhead(d = u, n), m = this._computeFrame(v, d, i, o)) : p && (v = this._computePlayhead(d = (m = l) / o, n)), {
                        playhead: v,
                        time: d,
                        frame: m,
                        duration: n,
                        totalFrames: i,
                        fps: o,
                        timeScale: r
                    }
                }, N.prototype.setup = function (t, e) {
                    var n = this;
                    if (void 0 === t && (t = {}), void 0 === e && (e = {}), this.sketch) throw new Error("Multiple setup() calls not yet supported.");
                    this._settings = Object.assign({}, t, this._settings);
                    var i = P(this._settings), r = i.context, o = i.canvas, a = this.getTimeProps(this._settings);
                    this._props = Object.assign({}, a, {
                        canvas: o,
                        context: r,
                        deltaTime: 0,
                        started: !1,
                        exporting: !1,
                        playing: !1,
                        recording: !1,
                        settings: this.settings,
                        render: function () {
                            return n.render()
                        },
                        togglePlay: function () {
                            return n.togglePlay()
                        },
                        dispatch: function (t) {
                            return n.dispatch(t)
                        },
                        tick: function () {
                            return n.tick()
                        },
                        resize: function () {
                            return n.resize()
                        },
                        update: function (t) {
                            return n.update(t)
                        },
                        exportFrame: function (t) {
                            return n.exportFrame(t)
                        },
                        record: function () {
                            return n.record()
                        },
                        play: function () {
                            return n.play()
                        },
                        pause: function () {
                            return n.pause()
                        },
                        stop: function () {
                            return n.stop()
                        }
                    }), this._setupGLKey(), this.resize()
                }, N.prototype.loadAndRun = function (t, e) {
                    var n = this;
                    return this.load(t, e).then(function () {
                        return n.run(), n
                    })
                }, N.prototype.unload = function () {
                    var t = this;
                    this.pause(), this.sketch && ("function" == typeof this.sketch.unload && this._wrapContextScale(function (e) {
                        return t.sketch.unload(e)
                    }), this._sketch = null)
                }, N.prototype.destroy = function () {
                    this.unload(), this.unmount()
                }, N.prototype.load = function (t, e) {
                    var n = this;
                    if ("function" != typeof t) throw new Error("The function must take in a function as the first parameter. Example:\n  canvasSketcher(() => { ... }, settings)");
                    this.sketch && this.unload(), void 0 !== e && this.update(e), this._preRender();
                    var i = Promise.resolve();
                    if (this.settings.p5) {
                        if (!p()) throw new Error("[canvas-sketch] ERROR: Using p5.js in Node.js is not supported");
                        i = new Promise(function (t) {
                            var e, i = n.settings.p5;
                            i.p5 && (e = i.preload, i = i.p5);
                            var r = function (i) {
                                e && (i.preload = function () {
                                    return e(i)
                                }), i.setup = function () {
                                    var e = n.props, r = "webgl" === n.settings.context, o = r ? i.WEBGL : i.P2D;
                                    i.noLoop(), i.pixelDensity(e.pixelRatio), i.createCanvas(e.viewportWidth, e.viewportHeight, o), r && n.settings.attributes && i.setAttributes(n.settings.attributes), n.update({
                                        p5: i,
                                        canvas: i.canvas,
                                        context: i._renderer.drawingContext
                                    }), t()
                                }
                            };
                            if ("function" == typeof i) new i(r); else {
                                if ("function" != typeof window.createCanvas) throw new Error("{ p5 } setting is passed but can't find p5.js in global (window) scope. Maybe you did not create it globally?\nnew p5(); // <-- attaches to global scope");
                                r(window)
                            }
                        })
                    }
                    return i.then(function () {
                        var e = t(n.props);
                        return u(e) || (e = Promise.resolve(e)), e
                    }).then(function (t) {
                        return t || (t = {}), n._sketch = t, p() && (n._keyboardShortcuts.attach(), window.addEventListener("resize", n._resizeHandler)), n._postRender(), n._sizeChanged(), n
                    }).catch(function (t) {
                        throw console.warn("Could not start sketch, the async loading function rejected with an error:\n    Error: " + t.message), t
                    })
                }, Object.defineProperties(N.prototype, z);
                var U = "hot-id-cache", H = [];

                function G(t, n) {
                    if (void 0 === n && (n = {}), n.p5) {
                        if (n.canvas || n.context && "string" != typeof n.context) throw new Error('In { p5 } mode, you can\'t pass your own canvas or context, unless the context is a "webgl" or "2d" string');
                        n = Object.assign({}, n, {canvas: !1, context: "string" == typeof n.context && n.context})
                    }
                    var i, r, o = (i = f()) && i.hot;
                    o && (r = e(n.id, "$__DEFAULT_CANVAS_SKETCH_ID__$"));
                    var a = o && "string" == typeof r;
                    a && H.includes(r) && (console.warn("Warning: You have multiple calls to canvasSketch() in --hot mode. You must pass unique { id } strings in settings to enable hot reload across multiple sketches. ", r), a = !1);
                    var s = Promise.resolve();
                    if (a) {
                        H.push(r);
                        var h = function (t) {
                            var e = f();
                            if (e) return e[U] = e[U] || {}, e[U][t]
                        }(r);
                        if (h) {
                            var c = function () {
                                var t, e = (t = h.manager, n.animate ? {time: t.props.time} : void 0);
                                return h.manager.destroy(), e
                            };
                            s = h.load.then(c).catch(c)
                        }
                    }
                    return s.then(function (e) {
                        var i, o, s, h, c = new N;
                        return t ? (n = Object.assign({}, n, e), c.setup(n), c.mount(), i = c.loadAndRun(t)) : i = Promise.resolve(c), a && (o = r, s = {
                            load: i,
                            manager: c
                        }, (h = f()) && (h[U] = h[U] || {}, h[U][o] = s)), i
                    })
                }

                return G.canvasSketch = G, G.PaperSizes = L, G
            })
        }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }, {"convert-length": 4}], 4: [function (t, e, n) {
        var i = t("defined"), r = ["mm", "cm", "m", "pc", "pt", "in", "ft", "px"], o = {
            m: {system: "metric", factor: 1},
            cm: {system: "metric", factor: .01},
            mm: {system: "metric", factor: .001},
            pt: {system: "imperial", factor: 1 / 72},
            pc: {system: "imperial", factor: 1 / 6},
            in: {system: "imperial", factor: 1},
            ft: {system: "imperial", factor: 12}
        };
        const a = {metric: {unit: "m", ratio: 1 / .0254}, imperial: {unit: "in", ratio: .0254}};
        e.exports = function (t, e, n, s) {
            if ("number" != typeof t || !isFinite(t)) throw new Error("Value must be a finite number");
            if (!e || !n) throw new Error("Must specify from and to units");
            var h = i((s = s || {}).pixelsPerInch, 96), c = s.precision, u = !1 !== s.roundPixel;
            if (e = e.toLowerCase(), n = n.toLowerCase(), -1 === r.indexOf(e)) throw new Error('Invalid from unit "' + e + '", must be one of: ' + r.join(", "));
            if (-1 === r.indexOf(n)) throw new Error('Invalid from unit "' + n + '", must be one of: ' + r.join(", "));
            if (e === n) return t;
            var l = 1, f = 1, p = !1;
            "px" === e && (f = 1 / h, e = "in"), "px" === n && (p = !0, l = h, n = "in");
            var d = o[e], m = o[n], v = t * d.factor * f;
            d.system !== m.system && (v *= a[d.system].ratio);
            var g = v / m.factor * l;
            return p && u ? g = Math.round(g) : "number" == typeof c && isFinite(c) && (g = function (t, e) {
                return Number(Math.round(t + "e" + e) + "e-" + e)
            }(g, c)), g
        }, e.exports.units = r
    }, {defined: 5}], 5: [function (t, e, n) {
        e.exports = function () {
            for (var t = 0; t < arguments.length; t++) if (void 0 !== arguments[t]) return arguments[t]
        }
    }, {}], 6: [function (t, e, n) {
        e.exports = function () {
            for (var t = [151, 160, 137, 91, 90, 15, 131, 13, 201, 95, 96, 53, 194, 233, 7, 225, 140, 36, 103, 30, 69, 142, 8, 99, 37, 240, 21, 10, 23, 190, 6, 148, 247, 120, 234, 75, 0, 26, 197, 62, 94, 252, 219, 203, 117, 35, 11, 32, 57, 177, 33, 88, 237, 149, 56, 87, 174, 20, 125, 136, 171, 168, 68, 175, 74, 165, 71, 134, 139, 48, 27, 166, 77, 146, 158, 231, 83, 111, 229, 122, 60, 211, 133, 230, 220, 105, 92, 41, 55, 46, 245, 40, 244, 102, 143, 54, 65, 25, 63, 161, 1, 216, 80, 73, 209, 76, 132, 187, 208, 89, 18, 169, 200, 196, 135, 130, 116, 188, 159, 86, 164, 100, 109, 198, 173, 186, 3, 64, 52, 217, 226, 250, 124, 123, 5, 202, 38, 147, 118, 126, 255, 82, 85, 212, 207, 206, 59, 227, 47, 16, 58, 17, 182, 189, 28, 42, 223, 183, 170, 213, 119, 248, 152, 2, 44, 154, 163, 70, 221, 153, 101, 155, 167, 43, 172, 9, 129, 22, 39, 253, 19, 98, 108, 110, 79, 113, 224, 232, 178, 185, 112, 104, 218, 246, 97, 228, 251, 34, 242, 193, 238, 210, 144, 12, 191, 179, 162, 241, 81, 51, 145, 235, 249, 14, 239, 107, 49, 192, 214, 31, 181, 199, 106, 157, 184, 84, 204, 176, 115, 121, 50, 45, 127, 4, 150, 254, 138, 236, 205, 93, 222, 114, 67, 29, 24, 72, 243, 141, 128, 195, 78, 66, 215, 61, 156, 180], e = 0; e < 256; e++) t[256 + e] = t[e];

            function n(t) {
                return t * t * t * (t * (6 * t - 15) + 10)
            }

            function i(t, e, n) {
                return e + t * (n - e)
            }

            function r(t, e, n, i) {
                var r = 15 & t, o = r < 8 ? e : n, a = r < 4 ? n : 12 == r || 14 == r ? e : i;
                return (0 == (1 & r) ? o : -o) + (0 == (2 & r) ? a : -a)
            }

            return {
                noise: function (e, o, a) {
                    var s = Math.floor(e), h = Math.floor(o), c = Math.floor(a), u = 255 & s, l = 255 & h, f = 255 & c,
                        p = (e -= s) - 1, d = (o -= h) - 1, m = (a -= c) - 1, v = n(e), g = n(o), y = n(a),
                        w = t[u] + l, x = t[w] + f, M = t[w + 1] + f, _ = t[u + 1] + l, E = t[_] + f, S = t[_ + 1] + f;
                    return i(y, i(g, i(v, r(t[x], e, o, a), r(t[E], p, o, a)), i(v, r(t[M], e, d, a), r(t[S], p, d, a))), i(g, i(v, r(t[x + 1], e, o, m), r(t[E + 1], p, o, a - 1)), i(v, r(t[M + 1], e, d, m), r(t[S + 1], p, d, m))))
                }
            }
        }
    }, {}], 7: [function (t, e, n) {
        e.exports = [["#69d2e7", "#a7dbd8", "#e0e4cc", "#f38630", "#fa6900"], ["#fe4365", "#fc9d9a", "#f9cdad", "#c8c8a9", "#83af9b"], ["#ecd078", "#d95b43", "#c02942", "#542437", "#53777a"], ["#556270", "#4ecdc4", "#c7f464", "#ff6b6b", "#c44d58"], ["#774f38", "#e08e79", "#f1d4af", "#ece5ce", "#c5e0dc"], ["#e8ddcb", "#cdb380", "#036564", "#033649", "#031634"], ["#490a3d", "#bd1550", "#e97f02", "#f8ca00", "#8a9b0f"], ["#594f4f", "#547980", "#45ada8", "#9de0ad", "#e5fcc2"], ["#00a0b0", "#6a4a3c", "#cc333f", "#eb6841", "#edc951"], ["#e94e77", "#d68189", "#c6a49a", "#c6e5d9", "#f4ead5"], ["#3fb8af", "#7fc7af", "#dad8a7", "#ff9e9d", "#ff3d7f"], ["#d9ceb2", "#948c75", "#d5ded9", "#7a6a53", "#99b2b7"], ["#ffffff", "#cbe86b", "#f2e9e1", "#1c140d", "#cbe86b"], ["#efffcd", "#dce9be", "#555152", "#2e2633", "#99173c"], ["#343838", "#005f6b", "#008c9e", "#00b4cc", "#00dffc"], ["#413e4a", "#73626e", "#b38184", "#f0b49e", "#f7e4be"], ["#ff4e50", "#fc913a", "#f9d423", "#ede574", "#e1f5c4"], ["#99b898", "#fecea8", "#ff847c", "#e84a5f", "#2a363b"], ["#655643", "#80bca3", "#f6f7bd", "#e6ac27", "#bf4d28"], ["#00a8c6", "#40c0cb", "#f9f2e7", "#aee239", "#8fbe00"], ["#351330", "#424254", "#64908a", "#e8caa4", "#cc2a41"], ["#554236", "#f77825", "#d3ce3d", "#f1efa5", "#60b99a"], ["#ff9900", "#424242", "#e9e9e9", "#bcbcbc", "#3299bb"], ["#5d4157", "#838689", "#a8caba", "#cad7b2", "#ebe3aa"], ["#8c2318", "#5e8c6a", "#88a65e", "#bfb35a", "#f2c45a"], ["#fad089", "#ff9c5b", "#f5634a", "#ed303c", "#3b8183"], ["#ff4242", "#f4fad2", "#d4ee5e", "#e1edb9", "#f0f2eb"], ["#d1e751", "#ffffff", "#000000", "#4dbce9", "#26ade4"], ["#f8b195", "#f67280", "#c06c84", "#6c5b7b", "#355c7d"], ["#1b676b", "#519548", "#88c425", "#bef202", "#eafde6"], ["#bcbdac", "#cfbe27", "#f27435", "#f02475", "#3b2d38"], ["#5e412f", "#fcebb6", "#78c0a8", "#f07818", "#f0a830"], ["#452632", "#91204d", "#e4844a", "#e8bf56", "#e2f7ce"], ["#eee6ab", "#c5bc8e", "#696758", "#45484b", "#36393b"], ["#f0d8a8", "#3d1c00", "#86b8b1", "#f2d694", "#fa2a00"], ["#f04155", "#ff823a", "#f2f26f", "#fff7bd", "#95cfb7"], ["#2a044a", "#0b2e59", "#0d6759", "#7ab317", "#a0c55f"], ["#bbbb88", "#ccc68d", "#eedd99", "#eec290", "#eeaa88"], ["#b9d7d9", "#668284", "#2a2829", "#493736", "#7b3b3b"], ["#b3cc57", "#ecf081", "#ffbe40", "#ef746f", "#ab3e5b"], ["#a3a948", "#edb92e", "#f85931", "#ce1836", "#009989"], ["#67917a", "#170409", "#b8af03", "#ccbf82", "#e33258"], ["#e8d5b7", "#0e2430", "#fc3a51", "#f5b349", "#e8d5b9"], ["#aab3ab", "#c4cbb7", "#ebefc9", "#eee0b7", "#e8caaf"], ["#300030", "#480048", "#601848", "#c04848", "#f07241"], ["#ab526b", "#bca297", "#c5ceae", "#f0e2a4", "#f4ebc3"], ["#607848", "#789048", "#c0d860", "#f0f0d8", "#604848"], ["#a8e6ce", "#dcedc2", "#ffd3b5", "#ffaaa6", "#ff8c94"], ["#3e4147", "#fffedf", "#dfba69", "#5a2e2e", "#2a2c31"], ["#b6d8c0", "#c8d9bf", "#dadabd", "#ecdbbc", "#fedcba"], ["#fc354c", "#29221f", "#13747d", "#0abfbc", "#fcf7c5"], ["#1c2130", "#028f76", "#b3e099", "#ffeaad", "#d14334"], ["#edebe6", "#d6e1c7", "#94c7b6", "#403b33", "#d3643b"], ["#cc0c39", "#e6781e", "#c8cf02", "#f8fcc1", "#1693a7"], ["#dad6ca", "#1bb0ce", "#4f8699", "#6a5e72", "#563444"], ["#a7c5bd", "#e5ddcb", "#eb7b59", "#cf4647", "#524656"], ["#fdf1cc", "#c6d6b8", "#987f69", "#e3ad40", "#fcd036"], ["#5c323e", "#a82743", "#e15e32", "#c0d23e", "#e5f04c"], ["#230f2b", "#f21d41", "#ebebbc", "#bce3c5", "#82b3ae"], ["#b9d3b0", "#81bda4", "#b28774", "#f88f79", "#f6aa93"], ["#3a111c", "#574951", "#83988e", "#bcdea5", "#e6f9bc"], ["#5e3929", "#cd8c52", "#b7d1a3", "#dee8be", "#fcf7d3"], ["#1c0113", "#6b0103", "#a30006", "#c21a01", "#f03c02"], ["#382f32", "#ffeaf2", "#fcd9e5", "#fbc5d8", "#f1396d"], ["#e3dfba", "#c8d6bf", "#93ccc6", "#6cbdb5", "#1a1f1e"], ["#000000", "#9f111b", "#b11623", "#292c37", "#cccccc"], ["#c1b398", "#605951", "#fbeec2", "#61a6ab", "#accec0"], ["#8dccad", "#988864", "#fea6a2", "#f9d6ac", "#ffe9af"], ["#f6f6f6", "#e8e8e8", "#333333", "#990100", "#b90504"], ["#1b325f", "#9cc4e4", "#e9f2f9", "#3a89c9", "#f26c4f"], ["#5e9fa3", "#dcd1b4", "#fab87f", "#f87e7b", "#b05574"], ["#951f2b", "#f5f4d7", "#e0dfb1", "#a5a36c", "#535233"], ["#413d3d", "#040004", "#c8ff00", "#fa023c", "#4b000f"], ["#eff3cd", "#b2d5ba", "#61ada0", "#248f8d", "#605063"], ["#2d2d29", "#215a6d", "#3ca2a2", "#92c7a3", "#dfece6"], ["#cfffdd", "#b4dec1", "#5c5863", "#a85163", "#ff1f4c"], ["#4e395d", "#827085", "#8ebe94", "#ccfc8e", "#dc5b3e"], ["#9dc9ac", "#fffec7", "#f56218", "#ff9d2e", "#919167"], ["#a1dbb2", "#fee5ad", "#faca66", "#f7a541", "#f45d4c"], ["#ffefd3", "#fffee4", "#d0ecea", "#9fd6d2", "#8b7a5e"], ["#a8a7a7", "#cc527a", "#e8175d", "#474747", "#363636"], ["#ffedbf", "#f7803c", "#f54828", "#2e0d23", "#f8e4c1"], ["#f8edd1", "#d88a8a", "#474843", "#9d9d93", "#c5cfc6"], ["#f38a8a", "#55443d", "#a0cab5", "#cde9ca", "#f1edd0"], ["#4e4d4a", "#353432", "#94ba65", "#2790b0", "#2b4e72"], ["#0ca5b0", "#4e3f30", "#fefeeb", "#f8f4e4", "#a5b3aa"], ["#a70267", "#f10c49", "#fb6b41", "#f6d86b", "#339194"], ["#9d7e79", "#ccac95", "#9a947c", "#748b83", "#5b756c"], ["#edf6ee", "#d1c089", "#b3204d", "#412e28", "#151101"], ["#046d8b", "#309292", "#2fb8ac", "#93a42a", "#ecbe13"], ["#4d3b3b", "#de6262", "#ffb88c", "#ffd0b3", "#f5e0d3"], ["#fffbb7", "#a6f6af", "#66b6ab", "#5b7c8d", "#4f2958"], ["#ff003c", "#ff8a00", "#fabe28", "#88c100", "#00c176"], ["#fcfef5", "#e9ffe1", "#cdcfb7", "#d6e6c3", "#fafbe3"], ["#9cddc8", "#bfd8ad", "#ddd9ab", "#f7af63", "#633d2e"], ["#30261c", "#403831", "#36544f", "#1f5f61", "#0b8185"], ["#d1313d", "#e5625c", "#f9bf76", "#8eb2c5", "#615375"], ["#ffe181", "#eee9e5", "#fad3b2", "#ffba7f", "#ff9c97"], ["#aaff00", "#ffaa00", "#ff00aa", "#aa00ff", "#00aaff"], ["#c2412d", "#d1aa34", "#a7a844", "#a46583", "#5a1e4a"]]
    }, {}], 8: [function (t, e, n) {
        (function (t) {
            "use strict";
            var n = 256, i = [], r = void 0 === t ? window : t, o = Math.pow(n, 6), a = Math.pow(2, 52), s = 2 * a,
                h = n - 1, c = Math.random;

            function u(t) {
                var e, i = t.length, r = this, o = 0, a = r.i = r.j = 0, s = r.S = [];
                for (i || (t = [i++]); o < n;) s[o] = o++;
                for (o = 0; o < n; o++) s[o] = s[a = h & a + t[o % i] + (e = s[o])], s[a] = e;
                (r.g = function (t) {
                    for (var e, i = 0, o = r.i, a = r.j, s = r.S; t--;) e = s[o = h & o + 1], i = i * n + s[h & (s[o] = s[a = h & a + e]) + (s[a] = e)];
                    return r.i = o, r.j = a, i
                })(n)
            }

            function l(t, e) {
                for (var n, i = t + "", r = 0; r < i.length;) e[h & r] = h & (n ^= 19 * e[h & r]) + i.charCodeAt(r++);
                return f(e)
            }

            function f(t) {
                return String.fromCharCode.apply(0, t)
            }

            e.exports = function (t, h) {
                if (h && !0 === h.global) return h.global = !1, Math.random = e.exports(t, h), h.global = !0, Math.random;
                var c = [], p = (l(function t(e, n) {
                    var i, r = [], o = (typeof e)[0];
                    if (n && "o" == o) for (i in e) try {
                        r.push(t(e[i], n - 1))
                    } catch (t) {
                    }
                    return r.length ? r : "s" == o ? e : e + "\0"
                }(h && h.entropy || !1 ? [t, f(i)] : 0 in arguments ? t : function (t) {
                    try {
                        return r.crypto.getRandomValues(t = new Uint8Array(n)), f(t)
                    } catch (t) {
                        return [+new Date, r, r.navigator && r.navigator.plugins, r.screen, f(i)]
                    }
                }(), 3), c), new u(c));
                return l(f(p.S), i), function () {
                    for (var t = p.g(6), e = o, i = 0; t < a;) t = (t + i) * n, e *= n, i = p.g(1);
                    for (; t >= s;) t /= 2, e /= 2, i >>>= 1;
                    return (t + i) / e
                }
            }, e.exports.resetGlobal = function () {
                Math.random = c
            }, l(Math.random(), i)
        }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }, {}], 9: [function (t, e, n) {
        !function () {
            "use strict";
            var t = .5 * (Math.sqrt(3) - 1), i = (3 - Math.sqrt(3)) / 6, r = 1 / 6, o = (Math.sqrt(5) - 1) / 4,
                a = (5 - Math.sqrt(5)) / 20;

            function s(t) {
                var e;
                e = "function" == typeof t ? t : t ? function () {
                    var t = 0, e = 0, n = 0, i = 1, r = (o = 4022871197, function (t) {
                        t = t.toString();
                        for (var e = 0; e < t.length; e++) {
                            var n = .02519603282416938 * (o += t.charCodeAt(e));
                            n -= o = n >>> 0, o = (n *= o) >>> 0, o += 4294967296 * (n -= o)
                        }
                        return 2.3283064365386963e-10 * (o >>> 0)
                    });
                    var o;
                    t = r(" "), e = r(" "), n = r(" ");
                    for (var a = 0; a < arguments.length; a++) (t -= r(arguments[a])) < 0 && (t += 1), (e -= r(arguments[a])) < 0 && (e += 1), (n -= r(arguments[a])) < 0 && (n += 1);
                    return r = null, function () {
                        var r = 2091639 * t + 2.3283064365386963e-10 * i;
                        return t = e, e = n, n = r - (i = 0 | r)
                    }
                }(t) : Math.random, this.p = h(e), this.perm = new Uint8Array(512), this.permMod12 = new Uint8Array(512);
                for (var n = 0; n < 512; n++) this.perm[n] = this.p[255 & n], this.permMod12[n] = this.perm[n] % 12
            }

            function h(t) {
                var e, n = new Uint8Array(256);
                for (e = 0; e < 256; e++) n[e] = e;
                for (e = 0; e < 255; e++) {
                    var i = e + ~~(t() * (256 - e)), r = n[e];
                    n[e] = n[i], n[i] = r
                }
                return n
            }

            s.prototype = {
                grad3: new Float32Array([1, 1, 0, -1, 1, 0, 1, -1, 0, -1, -1, 0, 1, 0, 1, -1, 0, 1, 1, 0, -1, -1, 0, -1, 0, 1, 1, 0, -1, 1, 0, 1, -1, 0, -1, -1]),
                grad4: new Float32Array([0, 1, 1, 1, 0, 1, 1, -1, 0, 1, -1, 1, 0, 1, -1, -1, 0, -1, 1, 1, 0, -1, 1, -1, 0, -1, -1, 1, 0, -1, -1, -1, 1, 0, 1, 1, 1, 0, 1, -1, 1, 0, -1, 1, 1, 0, -1, -1, -1, 0, 1, 1, -1, 0, 1, -1, -1, 0, -1, 1, -1, 0, -1, -1, 1, 1, 0, 1, 1, 1, 0, -1, 1, -1, 0, 1, 1, -1, 0, -1, -1, 1, 0, 1, -1, 1, 0, -1, -1, -1, 0, 1, -1, -1, 0, -1, 1, 1, 1, 0, 1, 1, -1, 0, 1, -1, 1, 0, 1, -1, -1, 0, -1, 1, 1, 0, -1, 1, -1, 0, -1, -1, 1, 0, -1, -1, -1, 0]),
                noise2D: function (e, n) {
                    var r, o, a = this.permMod12, s = this.perm, h = this.grad3, c = 0, u = 0, l = 0, f = (e + n) * t,
                        p = Math.floor(e + f), d = Math.floor(n + f), m = (p + d) * i, v = e - (p - m), g = n - (d - m);
                    v > g ? (r = 1, o = 0) : (r = 0, o = 1);
                    var y = v - r + i, w = g - o + i, x = v - 1 + 2 * i, M = g - 1 + 2 * i, _ = 255 & p, E = 255 & d,
                        S = .5 - v * v - g * g;
                    if (S >= 0) {
                        var b = 3 * a[_ + s[E]];
                        c = (S *= S) * S * (h[b] * v + h[b + 1] * g)
                    }
                    var T = .5 - y * y - w * w;
                    if (T >= 0) {
                        var L = 3 * a[_ + r + s[E + o]];
                        u = (T *= T) * T * (h[L] * y + h[L + 1] * w)
                    }
                    var C = .5 - x * x - M * M;
                    if (C >= 0) {
                        var R = 3 * a[_ + 1 + s[E + 1]];
                        l = (C *= C) * C * (h[R] * x + h[R + 1] * M)
                    }
                    return 70 * (c + u + l)
                },
                noise3D: function (t, e, n) {
                    var i, o, a, s, h, c, u, l, f, p, d = this.permMod12, m = this.perm, v = this.grad3,
                        g = (t + e + n) * (1 / 3), y = Math.floor(t + g), w = Math.floor(e + g), x = Math.floor(n + g),
                        M = (y + w + x) * r, _ = t - (y - M), E = e - (w - M), S = n - (x - M);
                    _ >= E ? E >= S ? (h = 1, c = 0, u = 0, l = 1, f = 1, p = 0) : _ >= S ? (h = 1, c = 0, u = 0, l = 1, f = 0, p = 1) : (h = 0, c = 0, u = 1, l = 1, f = 0, p = 1) : E < S ? (h = 0, c = 0, u = 1, l = 0, f = 1, p = 1) : _ < S ? (h = 0, c = 1, u = 0, l = 0, f = 1, p = 1) : (h = 0, c = 1, u = 0, l = 1, f = 1, p = 0);
                    var b = _ - h + r, T = E - c + r, L = S - u + r, C = _ - l + 2 * r, R = E - f + 2 * r,
                        A = S - p + 2 * r, P = _ - 1 + .5, N = E - 1 + .5, z = S - 1 + .5, U = 255 & y, H = 255 & w,
                        G = 255 & x, O = .6 - _ * _ - E * E - S * S;
                    if (O < 0) i = 0; else {
                        var I = 3 * d[U + m[H + m[G]]];
                        i = (O *= O) * O * (v[I] * _ + v[I + 1] * E + v[I + 2] * S)
                    }
                    var F = .6 - b * b - T * T - L * L;
                    if (F < 0) o = 0; else {
                        var B = 3 * d[U + h + m[H + c + m[G + u]]];
                        o = (F *= F) * F * (v[B] * b + v[B + 1] * T + v[B + 2] * L)
                    }
                    var k = .6 - C * C - R * R - A * A;
                    if (k < 0) a = 0; else {
                        var V = 3 * d[U + l + m[H + f + m[G + p]]];
                        a = (k *= k) * k * (v[V] * C + v[V + 1] * R + v[V + 2] * A)
                    }
                    var W = .6 - P * P - N * N - z * z;
                    if (W < 0) s = 0; else {
                        var D = 3 * d[U + 1 + m[H + 1 + m[G + 1]]];
                        s = (W *= W) * W * (v[D] * P + v[D + 1] * N + v[D + 2] * z)
                    }
                    return 32 * (i + o + a + s)
                },
                noise4D: function (t, e, n, i) {
                    var r, s, h, c, u, l, f, p, d, m, v, g, y, w, x, M, _, E = this.perm, S = this.grad4,
                        b = (t + e + n + i) * o, T = Math.floor(t + b), L = Math.floor(e + b), C = Math.floor(n + b),
                        R = Math.floor(i + b), A = (T + L + C + R) * a, P = t - (T - A), N = e - (L - A),
                        z = n - (C - A), U = i - (R - A), H = 0, G = 0, O = 0, I = 0;
                    P > N ? H++ : G++, P > z ? H++ : O++, P > U ? H++ : I++, N > z ? G++ : O++, N > U ? G++ : I++, z > U ? O++ : I++;
                    var F = P - (l = H >= 3 ? 1 : 0) + a, B = N - (f = G >= 3 ? 1 : 0) + a,
                        k = z - (p = O >= 3 ? 1 : 0) + a, V = U - (d = I >= 3 ? 1 : 0) + a,
                        W = P - (m = H >= 2 ? 1 : 0) + 2 * a, D = N - (v = G >= 2 ? 1 : 0) + 2 * a,
                        X = z - (g = O >= 2 ? 1 : 0) + 2 * a, Y = U - (y = I >= 2 ? 1 : 0) + 2 * a,
                        Z = P - (w = H >= 1 ? 1 : 0) + 3 * a, J = N - (x = G >= 1 ? 1 : 0) + 3 * a,
                        Q = z - (M = O >= 1 ? 1 : 0) + 3 * a, K = U - (_ = I >= 1 ? 1 : 0) + 3 * a, q = P - 1 + 4 * a,
                        $ = N - 1 + 4 * a, j = z - 1 + 4 * a, tt = U - 1 + 4 * a, et = 255 & T, nt = 255 & L,
                        it = 255 & C, rt = 255 & R, ot = .6 - P * P - N * N - z * z - U * U;
                    if (ot < 0) r = 0; else {
                        var at = E[et + E[nt + E[it + E[rt]]]] % 32 * 4;
                        r = (ot *= ot) * ot * (S[at] * P + S[at + 1] * N + S[at + 2] * z + S[at + 3] * U)
                    }
                    var st = .6 - F * F - B * B - k * k - V * V;
                    if (st < 0) s = 0; else {
                        var ht = E[et + l + E[nt + f + E[it + p + E[rt + d]]]] % 32 * 4;
                        s = (st *= st) * st * (S[ht] * F + S[ht + 1] * B + S[ht + 2] * k + S[ht + 3] * V)
                    }
                    var ct = .6 - W * W - D * D - X * X - Y * Y;
                    if (ct < 0) h = 0; else {
                        var ut = E[et + m + E[nt + v + E[it + g + E[rt + y]]]] % 32 * 4;
                        h = (ct *= ct) * ct * (S[ut] * W + S[ut + 1] * D + S[ut + 2] * X + S[ut + 3] * Y)
                    }
                    var lt = .6 - Z * Z - J * J - Q * Q - K * K;
                    if (lt < 0) c = 0; else {
                        var ft = E[et + w + E[nt + x + E[it + M + E[rt + _]]]] % 32 * 4;
                        c = (lt *= lt) * lt * (S[ft] * Z + S[ft + 1] * J + S[ft + 2] * Q + S[ft + 3] * K)
                    }
                    var pt = .6 - q * q - $ * $ - j * j - tt * tt;
                    if (pt < 0) u = 0; else {
                        var dt = E[et + 1 + E[nt + 1 + E[it + 1 + E[rt + 1]]]] % 32 * 4;
                        u = (pt *= pt) * pt * (S[dt] * q + S[dt + 1] * $ + S[dt + 2] * j + S[dt + 3] * tt)
                    }
                    return 27 * (r + s + h + c + u)
                }
            }, s._buildPermutationTable = h, "undefined" != typeof define && define.amd && define(function () {
                return s
            }), void 0 !== n ? n.SimplexNoise = s : "undefined" != typeof window && (window.SimplexNoise = s), void 0 !== e && (e.exports = s)
        }()
    }, {}], 10: [function (t, e, n) {
        var i, r;
        i = this, r = function (t) {
            "use strict";

            function e() {
            }

            void 0 === Number.EPSILON && (Number.EPSILON = Math.pow(2, -52)), void 0 === Number.isInteger && (Number.isInteger = function (t) {
                return "number" == typeof t && isFinite(t) && Math.floor(t) === t
            }), void 0 === Math.sign && (Math.sign = function (t) {
                return t < 0 ? -1 : t > 0 ? 1 : +t
            }), "name" in Function.prototype == !1 && Object.defineProperty(Function.prototype, "name", {
                get: function () {
                    return this.toString().match(/^\s*function\s*([^\(\s]*)/)[1]
                }
            }), void 0 === Object.assign && (Object.assign = function (t) {
                if (null == t) throw new TypeError("Cannot convert undefined or null to object");
                for (var e = Object(t), n = 1; n < arguments.length; n++) {
                    var i = arguments[n];
                    if (null != i) for (var r in i) Object.prototype.hasOwnProperty.call(i, r) && (e[r] = i[r])
                }
                return e
            }), Object.assign(e.prototype, {
                addEventListener: function (t, e) {
                    void 0 === this._listeners && (this._listeners = {});
                    var n = this._listeners;
                    void 0 === n[t] && (n[t] = []), -1 === n[t].indexOf(e) && n[t].push(e)
                }, hasEventListener: function (t, e) {
                    if (void 0 === this._listeners) return !1;
                    var n = this._listeners;
                    return void 0 !== n[t] && -1 !== n[t].indexOf(e)
                }, removeEventListener: function (t, e) {
                    if (void 0 !== this._listeners) {
                        var n = this._listeners[t];
                        if (void 0 !== n) {
                            var i = n.indexOf(e);
                            -1 !== i && n.splice(i, 1)
                        }
                    }
                }, dispatchEvent: function (t) {
                    if (void 0 !== this._listeners) {
                        var e = this._listeners[t.type];
                        if (void 0 !== e) {
                            t.target = this;
                            for (var n = e.slice(0), i = 0, r = n.length; i < r; i++) n[i].call(this, t)
                        }
                    }
                }
            });
            var n, i, r, o, a, s, h, c, u, l, f, p = "98", d = 0, m = 1, v = 2, g = 1, y = 2, w = 0, x = 1, M = 2,
                _ = 0, E = 1, S = 2, b = 0, T = 1, L = 2, C = 3, R = 4, A = 5, P = 100, N = 101, z = 102, U = 103,
                H = 104, G = 200, O = 201, I = 202, F = 203, B = 204, k = 205, V = 206, W = 207, D = 208, X = 209,
                Y = 210, Z = 0, J = 1, Q = 2, K = 3, q = 4, $ = 5, j = 6, tt = 7, et = 0, nt = 1, it = 2, rt = 0,
                ot = 1, at = 2, st = 3, ht = 4, ct = 301, ut = 302, lt = 303, ft = 304, pt = 305, dt = 306, mt = 307,
                vt = 1e3, gt = 1001, yt = 1002, wt = 1003, xt = 1004, Mt = 1005, _t = 1006, Et = 1007, St = 1008,
                bt = 1009, Tt = 1010, Lt = 1011, Ct = 1012, Rt = 1013, At = 1014, Pt = 1015, Nt = 1016, zt = 1017,
                Ut = 1018, Ht = 1019, Gt = 1020, Ot = 1021, It = 1022, Ft = 1023, Bt = 1024, kt = 1025, Vt = Ft,
                Wt = 1026, Dt = 1027, Xt = 1028, Yt = 33776, Zt = 33777, Jt = 33778, Qt = 33779, Kt = 35840, qt = 35841,
                $t = 35842, jt = 35843, te = 36196, ee = 37808, ne = 37809, ie = 37810, re = 37811, oe = 37812,
                ae = 37813, se = 37814, he = 37815, ce = 37816, ue = 37817, le = 37818, fe = 37819, pe = 37820,
                de = 37821, me = 2201, ve = 2400, ge = 0, ye = 1, we = 2, xe = 3e3, Me = 3001, _e = 3007, Ee = 3002,
                Se = 3004, be = 3005, Te = 3006, Le = 3200, Ce = 3201, Re = 0, Ae = 1, Pe = {
                    DEG2RAD: Math.PI / 180, RAD2DEG: 180 / Math.PI, generateUUID: function () {
                        for (var t = [], e = 0; e < 256; e++) t[e] = (e < 16 ? "0" : "") + e.toString(16);
                        return function () {
                            var e = 4294967295 * Math.random() | 0, n = 4294967295 * Math.random() | 0,
                                i = 4294967295 * Math.random() | 0, r = 4294967295 * Math.random() | 0;
                            return (t[255 & e] + t[e >> 8 & 255] + t[e >> 16 & 255] + t[e >> 24 & 255] + "-" + t[255 & n] + t[n >> 8 & 255] + "-" + t[n >> 16 & 15 | 64] + t[n >> 24 & 255] + "-" + t[63 & i | 128] + t[i >> 8 & 255] + "-" + t[i >> 16 & 255] + t[i >> 24 & 255] + t[255 & r] + t[r >> 8 & 255] + t[r >> 16 & 255] + t[r >> 24 & 255]).toUpperCase()
                        }
                    }(), clamp: function (t, e, n) {
                        return Math.max(e, Math.min(n, t))
                    }, euclideanModulo: function (t, e) {
                        return (t % e + e) % e
                    }, mapLinear: function (t, e, n, i, r) {
                        return i + (t - e) * (r - i) / (n - e)
                    }, lerp: function (t, e, n) {
                        return (1 - n) * t + n * e
                    }, smoothstep: function (t, e, n) {
                        return t <= e ? 0 : t >= n ? 1 : (t = (t - e) / (n - e)) * t * (3 - 2 * t)
                    }, smootherstep: function (t, e, n) {
                        return t <= e ? 0 : t >= n ? 1 : (t = (t - e) / (n - e)) * t * t * (t * (6 * t - 15) + 10)
                    }, randInt: function (t, e) {
                        return t + Math.floor(Math.random() * (e - t + 1))
                    }, randFloat: function (t, e) {
                        return t + Math.random() * (e - t)
                    }, randFloatSpread: function (t) {
                        return t * (.5 - Math.random())
                    }, degToRad: function (t) {
                        return t * Pe.DEG2RAD
                    }, radToDeg: function (t) {
                        return t * Pe.RAD2DEG
                    }, isPowerOfTwo: function (t) {
                        return 0 == (t & t - 1) && 0 !== t
                    }, ceilPowerOfTwo: function (t) {
                        return Math.pow(2, Math.ceil(Math.log(t) / Math.LN2))
                    }, floorPowerOfTwo: function (t) {
                        return Math.pow(2, Math.floor(Math.log(t) / Math.LN2))
                    }
                };

            function Ne(t, e) {
                this.x = t || 0, this.y = e || 0
            }

            function ze() {
                this.elements = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1], arguments.length > 0 && console.error("THREE.Matrix4: the constructor no longer reads arguments. use .set() instead.")
            }

            function Ue(t, e, n, i) {
                this._x = t || 0, this._y = e || 0, this._z = n || 0, this._w = void 0 !== i ? i : 1
            }

            function He(t, e, n) {
                this.x = t || 0, this.y = e || 0, this.z = n || 0
            }

            function Ge() {
                this.elements = [1, 0, 0, 0, 1, 0, 0, 0, 1], arguments.length > 0 && console.error("THREE.Matrix3: the constructor no longer reads arguments. use .set() instead.")
            }

            Object.defineProperties(Ne.prototype, {
                width: {
                    get: function () {
                        return this.x
                    }, set: function (t) {
                        this.x = t
                    }
                }, height: {
                    get: function () {
                        return this.y
                    }, set: function (t) {
                        this.y = t
                    }
                }
            }), Object.assign(Ne.prototype, {
                isVector2: !0, set: function (t, e) {
                    return this.x = t, this.y = e, this
                }, setScalar: function (t) {
                    return this.x = t, this.y = t, this
                }, setX: function (t) {
                    return this.x = t, this
                }, setY: function (t) {
                    return this.y = t, this
                }, setComponent: function (t, e) {
                    switch (t) {
                        case 0:
                            this.x = e;
                            break;
                        case 1:
                            this.y = e;
                            break;
                        default:
                            throw new Error("index is out of range: " + t)
                    }
                    return this
                }, getComponent: function (t) {
                    switch (t) {
                        case 0:
                            return this.x;
                        case 1:
                            return this.y;
                        default:
                            throw new Error("index is out of range: " + t)
                    }
                }, clone: function () {
                    return new this.constructor(this.x, this.y)
                }, copy: function (t) {
                    return this.x = t.x, this.y = t.y, this
                }, add: function (t, e) {
                    return void 0 !== e ? (console.warn("THREE.Vector2: .add() now only accepts one argument. Use .addVectors( a, b ) instead."), this.addVectors(t, e)) : (this.x += t.x, this.y += t.y, this)
                }, addScalar: function (t) {
                    return this.x += t, this.y += t, this
                }, addVectors: function (t, e) {
                    return this.x = t.x + e.x, this.y = t.y + e.y, this
                }, addScaledVector: function (t, e) {
                    return this.x += t.x * e, this.y += t.y * e, this
                }, sub: function (t, e) {
                    return void 0 !== e ? (console.warn("THREE.Vector2: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."), this.subVectors(t, e)) : (this.x -= t.x, this.y -= t.y, this)
                }, subScalar: function (t) {
                    return this.x -= t, this.y -= t, this
                }, subVectors: function (t, e) {
                    return this.x = t.x - e.x, this.y = t.y - e.y, this
                }, multiply: function (t) {
                    return this.x *= t.x, this.y *= t.y, this
                }, multiplyScalar: function (t) {
                    return this.x *= t, this.y *= t, this
                }, divide: function (t) {
                    return this.x /= t.x, this.y /= t.y, this
                }, divideScalar: function (t) {
                    return this.multiplyScalar(1 / t)
                }, applyMatrix3: function (t) {
                    var e = this.x, n = this.y, i = t.elements;
                    return this.x = i[0] * e + i[3] * n + i[6], this.y = i[1] * e + i[4] * n + i[7], this
                }, min: function (t) {
                    return this.x = Math.min(this.x, t.x), this.y = Math.min(this.y, t.y), this
                }, max: function (t) {
                    return this.x = Math.max(this.x, t.x), this.y = Math.max(this.y, t.y), this
                }, clamp: function (t, e) {
                    return this.x = Math.max(t.x, Math.min(e.x, this.x)), this.y = Math.max(t.y, Math.min(e.y, this.y)), this
                }, clampScalar: (n = new Ne, i = new Ne, function (t, e) {
                    return n.set(t, t), i.set(e, e), this.clamp(n, i)
                }), clampLength: function (t, e) {
                    var n = this.length();
                    return this.divideScalar(n || 1).multiplyScalar(Math.max(t, Math.min(e, n)))
                }, floor: function () {
                    return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this
                }, ceil: function () {
                    return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this
                }, round: function () {
                    return this.x = Math.round(this.x), this.y = Math.round(this.y), this
                }, roundToZero: function () {
                    return this.x = this.x < 0 ? Math.ceil(this.x) : Math.floor(this.x), this.y = this.y < 0 ? Math.ceil(this.y) : Math.floor(this.y), this
                }, negate: function () {
                    return this.x = -this.x, this.y = -this.y, this
                }, dot: function (t) {
                    return this.x * t.x + this.y * t.y
                }, cross: function (t) {
                    return this.x * t.y - this.y * t.x
                }, lengthSq: function () {
                    return this.x * this.x + this.y * this.y
                }, length: function () {
                    return Math.sqrt(this.x * this.x + this.y * this.y)
                }, manhattanLength: function () {
                    return Math.abs(this.x) + Math.abs(this.y)
                }, normalize: function () {
                    return this.divideScalar(this.length() || 1)
                }, angle: function () {
                    var t = Math.atan2(this.y, this.x);
                    return t < 0 && (t += 2 * Math.PI), t
                }, distanceTo: function (t) {
                    return Math.sqrt(this.distanceToSquared(t))
                }, distanceToSquared: function (t) {
                    var e = this.x - t.x, n = this.y - t.y;
                    return e * e + n * n
                }, manhattanDistanceTo: function (t) {
                    return Math.abs(this.x - t.x) + Math.abs(this.y - t.y)
                }, setLength: function (t) {
                    return this.normalize().multiplyScalar(t)
                }, lerp: function (t, e) {
                    return this.x += (t.x - this.x) * e, this.y += (t.y - this.y) * e, this
                }, lerpVectors: function (t, e, n) {
                    return this.subVectors(e, t).multiplyScalar(n).add(t)
                }, equals: function (t) {
                    return t.x === this.x && t.y === this.y
                }, fromArray: function (t, e) {
                    return void 0 === e && (e = 0), this.x = t[e], this.y = t[e + 1], this
                }, toArray: function (t, e) {
                    return void 0 === t && (t = []), void 0 === e && (e = 0), t[e] = this.x, t[e + 1] = this.y, t
                }, fromBufferAttribute: function (t, e, n) {
                    return void 0 !== n && console.warn("THREE.Vector2: offset has been removed from .fromBufferAttribute()."), this.x = t.getX(e), this.y = t.getY(e), this
                }, rotateAround: function (t, e) {
                    var n = Math.cos(e), i = Math.sin(e), r = this.x - t.x, o = this.y - t.y;
                    return this.x = r * n - o * i + t.x, this.y = r * i + o * n + t.y, this
                }
            }), Object.assign(ze.prototype, {
                isMatrix4: !0, set: function (t, e, n, i, r, o, a, s, h, c, u, l, f, p, d, m) {
                    var v = this.elements;
                    return v[0] = t, v[4] = e, v[8] = n, v[12] = i, v[1] = r, v[5] = o, v[9] = a, v[13] = s, v[2] = h, v[6] = c, v[10] = u, v[14] = l, v[3] = f, v[7] = p, v[11] = d, v[15] = m, this
                }, identity: function () {
                    return this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this
                }, clone: function () {
                    return (new ze).fromArray(this.elements)
                }, copy: function (t) {
                    var e = this.elements, n = t.elements;
                    return e[0] = n[0], e[1] = n[1], e[2] = n[2], e[3] = n[3], e[4] = n[4], e[5] = n[5], e[6] = n[6], e[7] = n[7], e[8] = n[8], e[9] = n[9], e[10] = n[10], e[11] = n[11], e[12] = n[12], e[13] = n[13], e[14] = n[14], e[15] = n[15], this
                }, copyPosition: function (t) {
                    var e = this.elements, n = t.elements;
                    return e[12] = n[12], e[13] = n[13], e[14] = n[14], this
                }, extractBasis: function (t, e, n) {
                    return t.setFromMatrixColumn(this, 0), e.setFromMatrixColumn(this, 1), n.setFromMatrixColumn(this, 2), this
                }, makeBasis: function (t, e, n) {
                    return this.set(t.x, e.x, n.x, 0, t.y, e.y, n.y, 0, t.z, e.z, n.z, 0, 0, 0, 0, 1), this
                }, extractRotation: (l = new He, function (t) {
                    var e = this.elements, n = t.elements, i = 1 / l.setFromMatrixColumn(t, 0).length(),
                        r = 1 / l.setFromMatrixColumn(t, 1).length(), o = 1 / l.setFromMatrixColumn(t, 2).length();
                    return e[0] = n[0] * i, e[1] = n[1] * i, e[2] = n[2] * i, e[3] = 0, e[4] = n[4] * r, e[5] = n[5] * r, e[6] = n[6] * r, e[7] = 0, e[8] = n[8] * o, e[9] = n[9] * o, e[10] = n[10] * o, e[11] = 0, e[12] = 0, e[13] = 0, e[14] = 0, e[15] = 1, this
                }), makeRotationFromEuler: function (t) {
                    t && t.isEuler || console.error("THREE.Matrix4: .makeRotationFromEuler() now expects a Euler rotation rather than a Vector3 and order.");
                    var e = this.elements, n = t.x, i = t.y, r = t.z, o = Math.cos(n), a = Math.sin(n), s = Math.cos(i),
                        h = Math.sin(i), c = Math.cos(r), u = Math.sin(r);
                    if ("XYZ" === t.order) {
                        var l = o * c, f = o * u, p = a * c, d = a * u;
                        e[0] = s * c, e[4] = -s * u, e[8] = h, e[1] = f + p * h, e[5] = l - d * h, e[9] = -a * s, e[2] = d - l * h, e[6] = p + f * h, e[10] = o * s
                    } else if ("YXZ" === t.order) {
                        var m = s * u, v = h * c;
                        e[0] = (g = s * c) + (y = h * u) * a, e[4] = v * a - m, e[8] = o * h, e[1] = o * u, e[5] = o * c, e[9] = -a, e[2] = m * a - v, e[6] = y + g * a, e[10] = o * s
                    } else if ("ZXY" === t.order) {
                        var g, y;
                        m = s * u, v = h * c;
                        e[0] = (g = s * c) - (y = h * u) * a, e[4] = -o * u, e[8] = v + m * a, e[1] = m + v * a, e[5] = o * c, e[9] = y - g * a, e[2] = -o * h, e[6] = a, e[10] = o * s
                    } else if ("ZYX" === t.order) {
                        l = o * c, f = o * u, p = a * c, d = a * u;
                        e[0] = s * c, e[4] = p * h - f, e[8] = l * h + d, e[1] = s * u, e[5] = d * h + l, e[9] = f * h - p, e[2] = -h, e[6] = a * s, e[10] = o * s
                    } else if ("YZX" === t.order) {
                        var w = o * s, x = o * h, M = a * s, _ = a * h;
                        e[0] = s * c, e[4] = _ - w * u, e[8] = M * u + x, e[1] = u, e[5] = o * c, e[9] = -a * c, e[2] = -h * c, e[6] = x * u + M, e[10] = w - _ * u
                    } else if ("XZY" === t.order) {
                        w = o * s, x = o * h, M = a * s, _ = a * h;
                        e[0] = s * c, e[4] = -u, e[8] = h * c, e[1] = w * u + _, e[5] = o * c, e[9] = x * u - M, e[2] = M * u - x, e[6] = a * c, e[10] = _ * u + w
                    }
                    return e[3] = 0, e[7] = 0, e[11] = 0, e[12] = 0, e[13] = 0, e[14] = 0, e[15] = 1, this
                }, makeRotationFromQuaternion: (c = new He(0, 0, 0), u = new He(1, 1, 1), function (t) {
                    return this.compose(c, t, u)
                }), lookAt: (a = new He, s = new He, h = new He, function (t, e, n) {
                    var i = this.elements;
                    return h.subVectors(t, e), 0 === h.lengthSq() && (h.z = 1), h.normalize(), a.crossVectors(n, h), 0 === a.lengthSq() && (1 === Math.abs(n.z) ? h.x += 1e-4 : h.z += 1e-4, h.normalize(), a.crossVectors(n, h)), a.normalize(), s.crossVectors(h, a), i[0] = a.x, i[4] = s.x, i[8] = h.x, i[1] = a.y, i[5] = s.y, i[9] = h.y, i[2] = a.z, i[6] = s.z, i[10] = h.z, this
                }), multiply: function (t, e) {
                    return void 0 !== e ? (console.warn("THREE.Matrix4: .multiply() now only accepts one argument. Use .multiplyMatrices( a, b ) instead."), this.multiplyMatrices(t, e)) : this.multiplyMatrices(this, t)
                }, premultiply: function (t) {
                    return this.multiplyMatrices(t, this)
                }, multiplyMatrices: function (t, e) {
                    var n = t.elements, i = e.elements, r = this.elements, o = n[0], a = n[4], s = n[8], h = n[12],
                        c = n[1], u = n[5], l = n[9], f = n[13], p = n[2], d = n[6], m = n[10], v = n[14], g = n[3],
                        y = n[7], w = n[11], x = n[15], M = i[0], _ = i[4], E = i[8], S = i[12], b = i[1], T = i[5],
                        L = i[9], C = i[13], R = i[2], A = i[6], P = i[10], N = i[14], z = i[3], U = i[7], H = i[11],
                        G = i[15];
                    return r[0] = o * M + a * b + s * R + h * z, r[4] = o * _ + a * T + s * A + h * U, r[8] = o * E + a * L + s * P + h * H, r[12] = o * S + a * C + s * N + h * G, r[1] = c * M + u * b + l * R + f * z, r[5] = c * _ + u * T + l * A + f * U, r[9] = c * E + u * L + l * P + f * H, r[13] = c * S + u * C + l * N + f * G, r[2] = p * M + d * b + m * R + v * z, r[6] = p * _ + d * T + m * A + v * U, r[10] = p * E + d * L + m * P + v * H, r[14] = p * S + d * C + m * N + v * G, r[3] = g * M + y * b + w * R + x * z, r[7] = g * _ + y * T + w * A + x * U, r[11] = g * E + y * L + w * P + x * H, r[15] = g * S + y * C + w * N + x * G, this
                }, multiplyScalar: function (t) {
                    var e = this.elements;
                    return e[0] *= t, e[4] *= t, e[8] *= t, e[12] *= t, e[1] *= t, e[5] *= t, e[9] *= t, e[13] *= t, e[2] *= t, e[6] *= t, e[10] *= t, e[14] *= t, e[3] *= t, e[7] *= t, e[11] *= t, e[15] *= t, this
                }, applyToBufferAttribute: function () {
                    var t = new He;
                    return function (e) {
                        for (var n = 0, i = e.count; n < i; n++) t.x = e.getX(n), t.y = e.getY(n), t.z = e.getZ(n), t.applyMatrix4(this), e.setXYZ(n, t.x, t.y, t.z);
                        return e
                    }
                }(), determinant: function () {
                    var t = this.elements, e = t[0], n = t[4], i = t[8], r = t[12], o = t[1], a = t[5], s = t[9],
                        h = t[13], c = t[2], u = t[6], l = t[10], f = t[14];
                    return t[3] * (+r * s * u - i * h * u - r * a * l + n * h * l + i * a * f - n * s * f) + t[7] * (+e * s * f - e * h * l + r * o * l - i * o * f + i * h * c - r * s * c) + t[11] * (+e * h * u - e * a * f - r * o * u + n * o * f + r * a * c - n * h * c) + t[15] * (-i * a * c - e * s * u + e * a * l + i * o * u - n * o * l + n * s * c)
                }, transpose: function () {
                    var t, e = this.elements;
                    return t = e[1], e[1] = e[4], e[4] = t, t = e[2], e[2] = e[8], e[8] = t, t = e[6], e[6] = e[9], e[9] = t, t = e[3], e[3] = e[12], e[12] = t, t = e[7], e[7] = e[13], e[13] = t, t = e[11], e[11] = e[14], e[14] = t, this
                }, setPosition: function (t) {
                    var e = this.elements;
                    return e[12] = t.x, e[13] = t.y, e[14] = t.z, this
                }, getInverse: function (t, e) {
                    var n = this.elements, i = t.elements, r = i[0], o = i[1], a = i[2], s = i[3], h = i[4], c = i[5],
                        u = i[6], l = i[7], f = i[8], p = i[9], d = i[10], m = i[11], v = i[12], g = i[13], y = i[14],
                        w = i[15], x = p * y * l - g * d * l + g * u * m - c * y * m - p * u * w + c * d * w,
                        M = v * d * l - f * y * l - v * u * m + h * y * m + f * u * w - h * d * w,
                        _ = f * g * l - v * p * l + v * c * m - h * g * m - f * c * w + h * p * w,
                        E = v * p * u - f * g * u - v * c * d + h * g * d + f * c * y - h * p * y,
                        S = r * x + o * M + a * _ + s * E;
                    if (0 === S) {
                        var b = "THREE.Matrix4: .getInverse() can't invert matrix, determinant is 0";
                        if (!0 === e) throw new Error(b);
                        return console.warn(b), this.identity()
                    }
                    var T = 1 / S;
                    return n[0] = x * T, n[1] = (g * d * s - p * y * s - g * a * m + o * y * m + p * a * w - o * d * w) * T, n[2] = (c * y * s - g * u * s + g * a * l - o * y * l - c * a * w + o * u * w) * T, n[3] = (p * u * s - c * d * s - p * a * l + o * d * l + c * a * m - o * u * m) * T, n[4] = M * T, n[5] = (f * y * s - v * d * s + v * a * m - r * y * m - f * a * w + r * d * w) * T, n[6] = (v * u * s - h * y * s - v * a * l + r * y * l + h * a * w - r * u * w) * T, n[7] = (h * d * s - f * u * s + f * a * l - r * d * l - h * a * m + r * u * m) * T, n[8] = _ * T, n[9] = (v * p * s - f * g * s - v * o * m + r * g * m + f * o * w - r * p * w) * T, n[10] = (h * g * s - v * c * s + v * o * l - r * g * l - h * o * w + r * c * w) * T, n[11] = (f * c * s - h * p * s - f * o * l + r * p * l + h * o * m - r * c * m) * T, n[12] = E * T, n[13] = (f * g * a - v * p * a + v * o * d - r * g * d - f * o * y + r * p * y) * T, n[14] = (v * c * a - h * g * a - v * o * u + r * g * u + h * o * y - r * c * y) * T, n[15] = (h * p * a - f * c * a + f * o * u - r * p * u - h * o * d + r * c * d) * T, this
                }, scale: function (t) {
                    var e = this.elements, n = t.x, i = t.y, r = t.z;
                    return e[0] *= n, e[4] *= i, e[8] *= r, e[1] *= n, e[5] *= i, e[9] *= r, e[2] *= n, e[6] *= i, e[10] *= r, e[3] *= n, e[7] *= i, e[11] *= r, this
                }, getMaxScaleOnAxis: function () {
                    var t = this.elements;
                    return Math.sqrt(Math.max(t[0] * t[0] + t[1] * t[1] + t[2] * t[2], t[4] * t[4] + t[5] * t[5] + t[6] * t[6], t[8] * t[8] + t[9] * t[9] + t[10] * t[10]))
                }, makeTranslation: function (t, e, n) {
                    return this.set(1, 0, 0, t, 0, 1, 0, e, 0, 0, 1, n, 0, 0, 0, 1), this
                }, makeRotationX: function (t) {
                    var e = Math.cos(t), n = Math.sin(t);
                    return this.set(1, 0, 0, 0, 0, e, -n, 0, 0, n, e, 0, 0, 0, 0, 1), this
                }, makeRotationY: function (t) {
                    var e = Math.cos(t), n = Math.sin(t);
                    return this.set(e, 0, n, 0, 0, 1, 0, 0, -n, 0, e, 0, 0, 0, 0, 1), this
                }, makeRotationZ: function (t) {
                    var e = Math.cos(t), n = Math.sin(t);
                    return this.set(e, -n, 0, 0, n, e, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this
                }, makeRotationAxis: function (t, e) {
                    var n = Math.cos(e), i = Math.sin(e), r = 1 - n, o = t.x, a = t.y, s = t.z, h = r * o, c = r * a;
                    return this.set(h * o + n, h * a - i * s, h * s + i * a, 0, h * a + i * s, c * a + n, c * s - i * o, 0, h * s - i * a, c * s + i * o, r * s * s + n, 0, 0, 0, 0, 1), this
                }, makeScale: function (t, e, n) {
                    return this.set(t, 0, 0, 0, 0, e, 0, 0, 0, 0, n, 0, 0, 0, 0, 1), this
                }, makeShear: function (t, e, n) {
                    return this.set(1, e, n, 0, t, 1, n, 0, t, e, 1, 0, 0, 0, 0, 1), this
                }, compose: function (t, e, n) {
                    var i = this.elements, r = e._x, o = e._y, a = e._z, s = e._w, h = r + r, c = o + o, u = a + a,
                        l = r * h, f = r * c, p = r * u, d = o * c, m = o * u, v = a * u, g = s * h, y = s * c,
                        w = s * u, x = n.x, M = n.y, _ = n.z;
                    return i[0] = (1 - (d + v)) * x, i[1] = (f + w) * x, i[2] = (p - y) * x, i[3] = 0, i[4] = (f - w) * M, i[5] = (1 - (l + v)) * M, i[6] = (m + g) * M, i[7] = 0, i[8] = (p + y) * _, i[9] = (m - g) * _, i[10] = (1 - (l + d)) * _, i[11] = 0, i[12] = t.x, i[13] = t.y, i[14] = t.z, i[15] = 1, this
                }, decompose: (r = new He, o = new ze, function (t, e, n) {
                    var i = this.elements, a = r.set(i[0], i[1], i[2]).length(), s = r.set(i[4], i[5], i[6]).length(),
                        h = r.set(i[8], i[9], i[10]).length();
                    this.determinant() < 0 && (a = -a), t.x = i[12], t.y = i[13], t.z = i[14], o.copy(this);
                    var c = 1 / a, u = 1 / s, l = 1 / h;
                    return o.elements[0] *= c, o.elements[1] *= c, o.elements[2] *= c, o.elements[4] *= u, o.elements[5] *= u, o.elements[6] *= u, o.elements[8] *= l, o.elements[9] *= l, o.elements[10] *= l, e.setFromRotationMatrix(o), n.x = a, n.y = s, n.z = h, this
                }), makePerspective: function (t, e, n, i, r, o) {
                    void 0 === o && console.warn("THREE.Matrix4: .makePerspective() has been redefined and has a new signature. Please check the docs.");
                    var a = this.elements, s = 2 * r / (n - i), h = (e + t) / (e - t), c = (n + i) / (n - i),
                        u = -(o + r) / (o - r), l = -2 * o * r / (o - r);
                    return a[0] = 2 * r / (e - t), a[4] = 0, a[8] = h, a[12] = 0, a[1] = 0, a[5] = s, a[9] = c, a[13] = 0, a[2] = 0, a[6] = 0, a[10] = u, a[14] = l, a[3] = 0, a[7] = 0, a[11] = -1, a[15] = 0, this
                }, makeOrthographic: function (t, e, n, i, r, o) {
                    var a = this.elements, s = 1 / (e - t), h = 1 / (n - i), c = 1 / (o - r), u = (e + t) * s,
                        l = (n + i) * h, f = (o + r) * c;
                    return a[0] = 2 * s, a[4] = 0, a[8] = 0, a[12] = -u, a[1] = 0, a[5] = 2 * h, a[9] = 0, a[13] = -l, a[2] = 0, a[6] = 0, a[10] = -2 * c, a[14] = -f, a[3] = 0, a[7] = 0, a[11] = 0, a[15] = 1, this
                }, equals: function (t) {
                    for (var e = this.elements, n = t.elements, i = 0; i < 16; i++) if (e[i] !== n[i]) return !1;
                    return !0
                }, fromArray: function (t, e) {
                    void 0 === e && (e = 0);
                    for (var n = 0; n < 16; n++) this.elements[n] = t[n + e];
                    return this
                }, toArray: function (t, e) {
                    void 0 === t && (t = []), void 0 === e && (e = 0);
                    var n = this.elements;
                    return t[e] = n[0], t[e + 1] = n[1], t[e + 2] = n[2], t[e + 3] = n[3], t[e + 4] = n[4], t[e + 5] = n[5], t[e + 6] = n[6], t[e + 7] = n[7], t[e + 8] = n[8], t[e + 9] = n[9], t[e + 10] = n[10], t[e + 11] = n[11], t[e + 12] = n[12], t[e + 13] = n[13], t[e + 14] = n[14], t[e + 15] = n[15], t
                }
            }), Object.assign(Ue, {
                slerp: function (t, e, n, i) {
                    return n.copy(t).slerp(e, i)
                }, slerpFlat: function (t, e, n, i, r, o, a) {
                    var s = n[i + 0], h = n[i + 1], c = n[i + 2], u = n[i + 3], l = r[o + 0], f = r[o + 1],
                        p = r[o + 2], d = r[o + 3];
                    if (u !== d || s !== l || h !== f || c !== p) {
                        var m = 1 - a, v = s * l + h * f + c * p + u * d, g = v >= 0 ? 1 : -1, y = 1 - v * v;
                        if (y > Number.EPSILON) {
                            var w = Math.sqrt(y), x = Math.atan2(w, v * g);
                            m = Math.sin(m * x) / w, a = Math.sin(a * x) / w
                        }
                        var M = a * g;
                        if (s = s * m + l * M, h = h * m + f * M, c = c * m + p * M, u = u * m + d * M, m === 1 - a) {
                            var _ = 1 / Math.sqrt(s * s + h * h + c * c + u * u);
                            s *= _, h *= _, c *= _, u *= _
                        }
                    }
                    t[e] = s, t[e + 1] = h, t[e + 2] = c, t[e + 3] = u
                }
            }), Object.defineProperties(Ue.prototype, {
                x: {
                    get: function () {
                        return this._x
                    }, set: function (t) {
                        this._x = t, this.onChangeCallback()
                    }
                }, y: {
                    get: function () {
                        return this._y
                    }, set: function (t) {
                        this._y = t, this.onChangeCallback()
                    }
                }, z: {
                    get: function () {
                        return this._z
                    }, set: function (t) {
                        this._z = t, this.onChangeCallback()
                    }
                }, w: {
                    get: function () {
                        return this._w
                    }, set: function (t) {
                        this._w = t, this.onChangeCallback()
                    }
                }
            }), Object.assign(Ue.prototype, {
                isQuaternion: !0, set: function (t, e, n, i) {
                    return this._x = t, this._y = e, this._z = n, this._w = i, this.onChangeCallback(), this
                }, clone: function () {
                    return new this.constructor(this._x, this._y, this._z, this._w)
                }, copy: function (t) {
                    return this._x = t.x, this._y = t.y, this._z = t.z, this._w = t.w, this.onChangeCallback(), this
                }, setFromEuler: function (t, e) {
                    if (!t || !t.isEuler) throw new Error("THREE.Quaternion: .setFromEuler() now expects an Euler rotation rather than a Vector3 and order.");
                    var n = t._x, i = t._y, r = t._z, o = t.order, a = Math.cos, s = Math.sin, h = a(n / 2),
                        c = a(i / 2), u = a(r / 2), l = s(n / 2), f = s(i / 2), p = s(r / 2);
                    return "XYZ" === o ? (this._x = l * c * u + h * f * p, this._y = h * f * u - l * c * p, this._z = h * c * p + l * f * u, this._w = h * c * u - l * f * p) : "YXZ" === o ? (this._x = l * c * u + h * f * p, this._y = h * f * u - l * c * p, this._z = h * c * p - l * f * u, this._w = h * c * u + l * f * p) : "ZXY" === o ? (this._x = l * c * u - h * f * p, this._y = h * f * u + l * c * p, this._z = h * c * p + l * f * u, this._w = h * c * u - l * f * p) : "ZYX" === o ? (this._x = l * c * u - h * f * p, this._y = h * f * u + l * c * p, this._z = h * c * p - l * f * u, this._w = h * c * u + l * f * p) : "YZX" === o ? (this._x = l * c * u + h * f * p, this._y = h * f * u + l * c * p, this._z = h * c * p - l * f * u, this._w = h * c * u - l * f * p) : "XZY" === o && (this._x = l * c * u - h * f * p, this._y = h * f * u - l * c * p, this._z = h * c * p + l * f * u, this._w = h * c * u + l * f * p), !1 !== e && this.onChangeCallback(), this
                }, setFromAxisAngle: function (t, e) {
                    var n = e / 2, i = Math.sin(n);
                    return this._x = t.x * i, this._y = t.y * i, this._z = t.z * i, this._w = Math.cos(n), this.onChangeCallback(), this
                }, setFromRotationMatrix: function (t) {
                    var e, n = t.elements, i = n[0], r = n[4], o = n[8], a = n[1], s = n[5], h = n[9], c = n[2],
                        u = n[6], l = n[10], f = i + s + l;
                    return f > 0 ? (e = .5 / Math.sqrt(f + 1), this._w = .25 / e, this._x = (u - h) * e, this._y = (o - c) * e, this._z = (a - r) * e) : i > s && i > l ? (e = 2 * Math.sqrt(1 + i - s - l), this._w = (u - h) / e, this._x = .25 * e, this._y = (r + a) / e, this._z = (o + c) / e) : s > l ? (e = 2 * Math.sqrt(1 + s - i - l), this._w = (o - c) / e, this._x = (r + a) / e, this._y = .25 * e, this._z = (h + u) / e) : (e = 2 * Math.sqrt(1 + l - i - s), this._w = (a - r) / e, this._x = (o + c) / e, this._y = (h + u) / e, this._z = .25 * e), this.onChangeCallback(), this
                }, setFromUnitVectors: function () {
                    var t, e = new He;
                    return function (n, i) {
                        return void 0 === e && (e = new He), (t = n.dot(i) + 1) < 1e-6 ? (t = 0, Math.abs(n.x) > Math.abs(n.z) ? e.set(-n.y, n.x, 0) : e.set(0, -n.z, n.y)) : e.crossVectors(n, i), this._x = e.x, this._y = e.y, this._z = e.z, this._w = t, this.normalize()
                    }
                }(), angleTo: function (t) {
                    return 2 * Math.acos(Math.abs(Pe.clamp(this.dot(t), -1, 1)))
                }, rotateTowards: function (t, e) {
                    var n = this.angleTo(t);
                    if (0 === n) return this;
                    var i = Math.min(1, e / n);
                    return this.slerp(t, i), this
                }, inverse: function () {
                    return this.conjugate()
                }, conjugate: function () {
                    return this._x *= -1, this._y *= -1, this._z *= -1, this.onChangeCallback(), this
                }, dot: function (t) {
                    return this._x * t._x + this._y * t._y + this._z * t._z + this._w * t._w
                }, lengthSq: function () {
                    return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w
                }, length: function () {
                    return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w)
                }, normalize: function () {
                    var t = this.length();
                    return 0 === t ? (this._x = 0, this._y = 0, this._z = 0, this._w = 1) : (this._x = this._x * (t = 1 / t), this._y = this._y * t, this._z = this._z * t, this._w = this._w * t), this.onChangeCallback(), this
                }, multiply: function (t, e) {
                    return void 0 !== e ? (console.warn("THREE.Quaternion: .multiply() now only accepts one argument. Use .multiplyQuaternions( a, b ) instead."), this.multiplyQuaternions(t, e)) : this.multiplyQuaternions(this, t)
                }, premultiply: function (t) {
                    return this.multiplyQuaternions(t, this)
                }, multiplyQuaternions: function (t, e) {
                    var n = t._x, i = t._y, r = t._z, o = t._w, a = e._x, s = e._y, h = e._z, c = e._w;
                    return this._x = n * c + o * a + i * h - r * s, this._y = i * c + o * s + r * a - n * h, this._z = r * c + o * h + n * s - i * a, this._w = o * c - n * a - i * s - r * h, this.onChangeCallback(), this
                }, slerp: function (t, e) {
                    if (0 === e) return this;
                    if (1 === e) return this.copy(t);
                    var n = this._x, i = this._y, r = this._z, o = this._w,
                        a = o * t._w + n * t._x + i * t._y + r * t._z;
                    if (a < 0 ? (this._w = -t._w, this._x = -t._x, this._y = -t._y, this._z = -t._z, a = -a) : this.copy(t), a >= 1) return this._w = o, this._x = n, this._y = i, this._z = r, this;
                    var s = 1 - a * a;
                    if (s <= Number.EPSILON) {
                        var h = 1 - e;
                        return this._w = h * o + e * this._w, this._x = h * n + e * this._x, this._y = h * i + e * this._y, this._z = h * r + e * this._z, this.normalize()
                    }
                    var c = Math.sqrt(s), u = Math.atan2(c, a), l = Math.sin((1 - e) * u) / c, f = Math.sin(e * u) / c;
                    return this._w = o * l + this._w * f, this._x = n * l + this._x * f, this._y = i * l + this._y * f, this._z = r * l + this._z * f, this.onChangeCallback(), this
                }, equals: function (t) {
                    return t._x === this._x && t._y === this._y && t._z === this._z && t._w === this._w
                }, fromArray: function (t, e) {
                    return void 0 === e && (e = 0), this._x = t[e], this._y = t[e + 1], this._z = t[e + 2], this._w = t[e + 3], this.onChangeCallback(), this
                }, toArray: function (t, e) {
                    return void 0 === t && (t = []), void 0 === e && (e = 0), t[e] = this._x, t[e + 1] = this._y, t[e + 2] = this._z, t[e + 3] = this._w, t
                }, onChange: function (t) {
                    return this.onChangeCallback = t, this
                }, onChangeCallback: function () {
                }
            }), Object.assign(He.prototype, {
                isVector3: !0, set: function (t, e, n) {
                    return this.x = t, this.y = e, this.z = n, this
                }, setScalar: function (t) {
                    return this.x = t, this.y = t, this.z = t, this
                }, setX: function (t) {
                    return this.x = t, this
                }, setY: function (t) {
                    return this.y = t, this
                }, setZ: function (t) {
                    return this.z = t, this
                }, setComponent: function (t, e) {
                    switch (t) {
                        case 0:
                            this.x = e;
                            break;
                        case 1:
                            this.y = e;
                            break;
                        case 2:
                            this.z = e;
                            break;
                        default:
                            throw new Error("index is out of range: " + t)
                    }
                    return this
                }, getComponent: function (t) {
                    switch (t) {
                        case 0:
                            return this.x;
                        case 1:
                            return this.y;
                        case 2:
                            return this.z;
                        default:
                            throw new Error("index is out of range: " + t)
                    }
                }, clone: function () {
                    return new this.constructor(this.x, this.y, this.z)
                }, copy: function (t) {
                    return this.x = t.x, this.y = t.y, this.z = t.z, this
                }, add: function (t, e) {
                    return void 0 !== e ? (console.warn("THREE.Vector3: .add() now only accepts one argument. Use .addVectors( a, b ) instead."), this.addVectors(t, e)) : (this.x += t.x, this.y += t.y, this.z += t.z, this)
                }, addScalar: function (t) {
                    return this.x += t, this.y += t, this.z += t, this
                }, addVectors: function (t, e) {
                    return this.x = t.x + e.x, this.y = t.y + e.y, this.z = t.z + e.z, this
                }, addScaledVector: function (t, e) {
                    return this.x += t.x * e, this.y += t.y * e, this.z += t.z * e, this
                }, sub: function (t, e) {
                    return void 0 !== e ? (console.warn("THREE.Vector3: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."), this.subVectors(t, e)) : (this.x -= t.x, this.y -= t.y, this.z -= t.z, this)
                }, subScalar: function (t) {
                    return this.x -= t, this.y -= t, this.z -= t, this
                }, subVectors: function (t, e) {
                    return this.x = t.x - e.x, this.y = t.y - e.y, this.z = t.z - e.z, this
                }, multiply: function (t, e) {
                    return void 0 !== e ? (console.warn("THREE.Vector3: .multiply() now only accepts one argument. Use .multiplyVectors( a, b ) instead."), this.multiplyVectors(t, e)) : (this.x *= t.x, this.y *= t.y, this.z *= t.z, this)
                }, multiplyScalar: function (t) {
                    return this.x *= t, this.y *= t, this.z *= t, this
                }, multiplyVectors: function (t, e) {
                    return this.x = t.x * e.x, this.y = t.y * e.y, this.z = t.z * e.z, this
                }, applyEuler: (f = new Ue, function (t) {
                    return t && t.isEuler || console.error("THREE.Vector3: .applyEuler() now expects an Euler rotation rather than a Vector3 and order."), this.applyQuaternion(f.setFromEuler(t))
                }), applyAxisAngle: function () {
                    var t = new Ue;
                    return function (e, n) {
                        return this.applyQuaternion(t.setFromAxisAngle(e, n))
                    }
                }(), applyMatrix3: function (t) {
                    var e = this.x, n = this.y, i = this.z, r = t.elements;
                    return this.x = r[0] * e + r[3] * n + r[6] * i, this.y = r[1] * e + r[4] * n + r[7] * i, this.z = r[2] * e + r[5] * n + r[8] * i, this
                }, applyMatrix4: function (t) {
                    var e = this.x, n = this.y, i = this.z, r = t.elements,
                        o = 1 / (r[3] * e + r[7] * n + r[11] * i + r[15]);
                    return this.x = (r[0] * e + r[4] * n + r[8] * i + r[12]) * o, this.y = (r[1] * e + r[5] * n + r[9] * i + r[13]) * o, this.z = (r[2] * e + r[6] * n + r[10] * i + r[14]) * o, this
                }, applyQuaternion: function (t) {
                    var e = this.x, n = this.y, i = this.z, r = t.x, o = t.y, a = t.z, s = t.w,
                        h = s * e + o * i - a * n, c = s * n + a * e - r * i, u = s * i + r * n - o * e,
                        l = -r * e - o * n - a * i;
                    return this.x = h * s + l * -r + c * -a - u * -o, this.y = c * s + l * -o + u * -r - h * -a, this.z = u * s + l * -a + h * -o - c * -r, this
                }, project: function (t) {
                    return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)
                }, unproject: function () {
                    var t = new ze;
                    return function (e) {
                        return this.applyMatrix4(t.getInverse(e.projectionMatrix)).applyMatrix4(e.matrixWorld)
                    }
                }(), transformDirection: function (t) {
                    var e = this.x, n = this.y, i = this.z, r = t.elements;
                    return this.x = r[0] * e + r[4] * n + r[8] * i, this.y = r[1] * e + r[5] * n + r[9] * i, this.z = r[2] * e + r[6] * n + r[10] * i, this.normalize()
                }, divide: function (t) {
                    return this.x /= t.x, this.y /= t.y, this.z /= t.z, this
                }, divideScalar: function (t) {
                    return this.multiplyScalar(1 / t)
                }, min: function (t) {
                    return this.x = Math.min(this.x, t.x), this.y = Math.min(this.y, t.y), this.z = Math.min(this.z, t.z), this
                }, max: function (t) {
                    return this.x = Math.max(this.x, t.x), this.y = Math.max(this.y, t.y), this.z = Math.max(this.z, t.z), this
                }, clamp: function (t, e) {
                    return this.x = Math.max(t.x, Math.min(e.x, this.x)), this.y = Math.max(t.y, Math.min(e.y, this.y)), this.z = Math.max(t.z, Math.min(e.z, this.z)), this
                }, clampScalar: function () {
                    var t = new He, e = new He;
                    return function (n, i) {
                        return t.set(n, n, n), e.set(i, i, i), this.clamp(t, e)
                    }
                }(), clampLength: function (t, e) {
                    var n = this.length();
                    return this.divideScalar(n || 1).multiplyScalar(Math.max(t, Math.min(e, n)))
                }, floor: function () {
                    return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this.z = Math.floor(this.z), this
                }, ceil: function () {
                    return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this.z = Math.ceil(this.z), this
                }, round: function () {
                    return this.x = Math.round(this.x), this.y = Math.round(this.y), this.z = Math.round(this.z), this
                }, roundToZero: function () {
                    return this.x = this.x < 0 ? Math.ceil(this.x) : Math.floor(this.x), this.y = this.y < 0 ? Math.ceil(this.y) : Math.floor(this.y), this.z = this.z < 0 ? Math.ceil(this.z) : Math.floor(this.z), this
                }, negate: function () {
                    return this.x = -this.x, this.y = -this.y, this.z = -this.z, this
                }, dot: function (t) {
                    return this.x * t.x + this.y * t.y + this.z * t.z
                }, lengthSq: function () {
                    return this.x * this.x + this.y * this.y + this.z * this.z
                }, length: function () {
                    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z)
                }, manhattanLength: function () {
                    return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z)
                }, normalize: function () {
                    return this.divideScalar(this.length() || 1)
                }, setLength: function (t) {
                    return this.normalize().multiplyScalar(t)
                }, lerp: function (t, e) {
                    return this.x += (t.x - this.x) * e, this.y += (t.y - this.y) * e, this.z += (t.z - this.z) * e, this
                }, lerpVectors: function (t, e, n) {
                    return this.subVectors(e, t).multiplyScalar(n).add(t)
                }, cross: function (t, e) {
                    return void 0 !== e ? (console.warn("THREE.Vector3: .cross() now only accepts one argument. Use .crossVectors( a, b ) instead."), this.crossVectors(t, e)) : this.crossVectors(this, t)
                }, crossVectors: function (t, e) {
                    var n = t.x, i = t.y, r = t.z, o = e.x, a = e.y, s = e.z;
                    return this.x = i * s - r * a, this.y = r * o - n * s, this.z = n * a - i * o, this
                }, projectOnVector: function (t) {
                    var e = t.dot(this) / t.lengthSq();
                    return this.copy(t).multiplyScalar(e)
                }, projectOnPlane: function () {
                    var t = new He;
                    return function (e) {
                        return t.copy(this).projectOnVector(e), this.sub(t)
                    }
                }(), reflect: function () {
                    var t = new He;
                    return function (e) {
                        return this.sub(t.copy(e).multiplyScalar(2 * this.dot(e)))
                    }
                }(), angleTo: function (t) {
                    var e = this.dot(t) / Math.sqrt(this.lengthSq() * t.lengthSq());
                    return Math.acos(Pe.clamp(e, -1, 1))
                }, distanceTo: function (t) {
                    return Math.sqrt(this.distanceToSquared(t))
                }, distanceToSquared: function (t) {
                    var e = this.x - t.x, n = this.y - t.y, i = this.z - t.z;
                    return e * e + n * n + i * i
                }, manhattanDistanceTo: function (t) {
                    return Math.abs(this.x - t.x) + Math.abs(this.y - t.y) + Math.abs(this.z - t.z)
                }, setFromSpherical: function (t) {
                    return this.setFromSphericalCoords(t.radius, t.phi, t.theta)
                }, setFromSphericalCoords: function (t, e, n) {
                    var i = Math.sin(e) * t;
                    return this.x = i * Math.sin(n), this.y = Math.cos(e) * t, this.z = i * Math.cos(n), this
                }, setFromCylindrical: function (t) {
                    return this.setFromCylindricalCoords(t.radius, t.theta, t.y)
                }, setFromCylindricalCoords: function (t, e, n) {
                    return this.x = t * Math.sin(e), this.y = n, this.z = t * Math.cos(e), this
                }, setFromMatrixPosition: function (t) {
                    var e = t.elements;
                    return this.x = e[12], this.y = e[13], this.z = e[14], this
                }, setFromMatrixScale: function (t) {
                    var e = this.setFromMatrixColumn(t, 0).length(), n = this.setFromMatrixColumn(t, 1).length(),
                        i = this.setFromMatrixColumn(t, 2).length();
                    return this.x = e, this.y = n, this.z = i, this
                }, setFromMatrixColumn: function (t, e) {
                    return this.fromArray(t.elements, 4 * e)
                }, equals: function (t) {
                    return t.x === this.x && t.y === this.y && t.z === this.z
                }, fromArray: function (t, e) {
                    return void 0 === e && (e = 0), this.x = t[e], this.y = t[e + 1], this.z = t[e + 2], this
                }, toArray: function (t, e) {
                    return void 0 === t && (t = []), void 0 === e && (e = 0), t[e] = this.x, t[e + 1] = this.y, t[e + 2] = this.z, t
                }, fromBufferAttribute: function (t, e, n) {
                    return void 0 !== n && console.warn("THREE.Vector3: offset has been removed from .fromBufferAttribute()."), this.x = t.getX(e), this.y = t.getY(e), this.z = t.getZ(e), this
                }
            }), Object.assign(Ge.prototype, {
                isMatrix3: !0, set: function (t, e, n, i, r, o, a, s, h) {
                    var c = this.elements;
                    return c[0] = t, c[1] = i, c[2] = a, c[3] = e, c[4] = r, c[5] = s, c[6] = n, c[7] = o, c[8] = h, this
                }, identity: function () {
                    return this.set(1, 0, 0, 0, 1, 0, 0, 0, 1), this
                }, clone: function () {
                    return (new this.constructor).fromArray(this.elements)
                }, copy: function (t) {
                    var e = this.elements, n = t.elements;
                    return e[0] = n[0], e[1] = n[1], e[2] = n[2], e[3] = n[3], e[4] = n[4], e[5] = n[5], e[6] = n[6], e[7] = n[7], e[8] = n[8], this
                }, setFromMatrix4: function (t) {
                    var e = t.elements;
                    return this.set(e[0], e[4], e[8], e[1], e[5], e[9], e[2], e[6], e[10]), this
                }, applyToBufferAttribute: function () {
                    var t = new He;
                    return function (e) {
                        for (var n = 0, i = e.count; n < i; n++) t.x = e.getX(n), t.y = e.getY(n), t.z = e.getZ(n), t.applyMatrix3(this), e.setXYZ(n, t.x, t.y, t.z);
                        return e
                    }
                }(), multiply: function (t) {
                    return this.multiplyMatrices(this, t)
                }, premultiply: function (t) {
                    return this.multiplyMatrices(t, this)
                }, multiplyMatrices: function (t, e) {
                    var n = t.elements, i = e.elements, r = this.elements, o = n[0], a = n[3], s = n[6], h = n[1],
                        c = n[4], u = n[7], l = n[2], f = n[5], p = n[8], d = i[0], m = i[3], v = i[6], g = i[1],
                        y = i[4], w = i[7], x = i[2], M = i[5], _ = i[8];
                    return r[0] = o * d + a * g + s * x, r[3] = o * m + a * y + s * M, r[6] = o * v + a * w + s * _, r[1] = h * d + c * g + u * x, r[4] = h * m + c * y + u * M, r[7] = h * v + c * w + u * _, r[2] = l * d + f * g + p * x, r[5] = l * m + f * y + p * M, r[8] = l * v + f * w + p * _, this
                }, multiplyScalar: function (t) {
                    var e = this.elements;
                    return e[0] *= t, e[3] *= t, e[6] *= t, e[1] *= t, e[4] *= t, e[7] *= t, e[2] *= t, e[5] *= t, e[8] *= t, this
                }, determinant: function () {
                    var t = this.elements, e = t[0], n = t[1], i = t[2], r = t[3], o = t[4], a = t[5], s = t[6],
                        h = t[7], c = t[8];
                    return e * o * c - e * a * h - n * r * c + n * a * s + i * r * h - i * o * s
                }, getInverse: function (t, e) {
                    t && t.isMatrix4 && console.error("THREE.Matrix3: .getInverse() no longer takes a Matrix4 argument.");
                    var n = t.elements, i = this.elements, r = n[0], o = n[1], a = n[2], s = n[3], h = n[4], c = n[5],
                        u = n[6], l = n[7], f = n[8], p = f * h - c * l, d = c * u - f * s, m = l * s - h * u,
                        v = r * p + o * d + a * m;
                    if (0 === v) {
                        var g = "THREE.Matrix3: .getInverse() can't invert matrix, determinant is 0";
                        if (!0 === e) throw new Error(g);
                        return console.warn(g), this.identity()
                    }
                    var y = 1 / v;
                    return i[0] = p * y, i[1] = (a * l - f * o) * y, i[2] = (c * o - a * h) * y, i[3] = d * y, i[4] = (f * r - a * u) * y, i[5] = (a * s - c * r) * y, i[6] = m * y, i[7] = (o * u - l * r) * y, i[8] = (h * r - o * s) * y, this
                }, transpose: function () {
                    var t, e = this.elements;
                    return t = e[1], e[1] = e[3], e[3] = t, t = e[2], e[2] = e[6], e[6] = t, t = e[5], e[5] = e[7], e[7] = t, this
                }, getNormalMatrix: function (t) {
                    return this.setFromMatrix4(t).getInverse(this).transpose()
                }, transposeIntoArray: function (t) {
                    var e = this.elements;
                    return t[0] = e[0], t[1] = e[3], t[2] = e[6], t[3] = e[1], t[4] = e[4], t[5] = e[7], t[6] = e[2], t[7] = e[5], t[8] = e[8], this
                }, setUvTransform: function (t, e, n, i, r, o, a) {
                    var s = Math.cos(r), h = Math.sin(r);
                    this.set(n * s, n * h, -n * (s * o + h * a) + o + t, -i * h, i * s, -i * (-h * o + s * a) + a + e, 0, 0, 1)
                }, scale: function (t, e) {
                    var n = this.elements;
                    return n[0] *= t, n[3] *= t, n[6] *= t, n[1] *= e, n[4] *= e, n[7] *= e, this
                }, rotate: function (t) {
                    var e = Math.cos(t), n = Math.sin(t), i = this.elements, r = i[0], o = i[3], a = i[6], s = i[1],
                        h = i[4], c = i[7];
                    return i[0] = e * r + n * s, i[3] = e * o + n * h, i[6] = e * a + n * c, i[1] = -n * r + e * s, i[4] = -n * o + e * h, i[7] = -n * a + e * c, this
                }, translate: function (t, e) {
                    var n = this.elements;
                    return n[0] += t * n[2], n[3] += t * n[5], n[6] += t * n[8], n[1] += e * n[2], n[4] += e * n[5], n[7] += e * n[8], this
                }, equals: function (t) {
                    for (var e = this.elements, n = t.elements, i = 0; i < 9; i++) if (e[i] !== n[i]) return !1;
                    return !0
                }, fromArray: function (t, e) {
                    void 0 === e && (e = 0);
                    for (var n = 0; n < 9; n++) this.elements[n] = t[n + e];
                    return this
                }, toArray: function (t, e) {
                    void 0 === t && (t = []), void 0 === e && (e = 0);
                    var n = this.elements;
                    return t[e] = n[0], t[e + 1] = n[1], t[e + 2] = n[2], t[e + 3] = n[3], t[e + 4] = n[4], t[e + 5] = n[5], t[e + 6] = n[6], t[e + 7] = n[7], t[e + 8] = n[8], t
                }
            });
            var Oe, Ie, Fe, Be, ke, Ve = {
                getDataURL: function (t) {
                    var e;
                    if ("undefined" == typeof HTMLCanvasElement) return t.src;
                    if (t instanceof HTMLCanvasElement) e = t; else {
                        (e = document.createElementNS("http://www.w3.org/1999/xhtml", "canvas")).width = t.width, e.height = t.height;
                        var n = e.getContext("2d");
                        t instanceof ImageData ? n.putImageData(t, 0, 0) : n.drawImage(t, 0, 0, t.width, t.height)
                    }
                    return e.width > 2048 || e.height > 2048 ? e.toDataURL("image/jpeg", .6) : e.toDataURL("image/png")
                }
            }, We = 0;

            function De(t, e, n, i, r, o, a, s, h, c) {
                Object.defineProperty(this, "id", {value: We++}), this.uuid = Pe.generateUUID(), this.name = "", this.image = void 0 !== t ? t : De.DEFAULT_IMAGE, this.mipmaps = [], this.mapping = void 0 !== e ? e : De.DEFAULT_MAPPING, this.wrapS = void 0 !== n ? n : gt, this.wrapT = void 0 !== i ? i : gt, this.magFilter = void 0 !== r ? r : _t, this.minFilter = void 0 !== o ? o : St, this.anisotropy = void 0 !== h ? h : 1, this.format = void 0 !== a ? a : Ft, this.type = void 0 !== s ? s : bt, this.offset = new Ne(0, 0), this.repeat = new Ne(1, 1), this.center = new Ne(0, 0), this.rotation = 0, this.matrixAutoUpdate = !0, this.matrix = new Ge, this.generateMipmaps = !0, this.premultiplyAlpha = !1, this.flipY = !0, this.unpackAlignment = 4, this.encoding = void 0 !== c ? c : xe, this.version = 0, this.onUpdate = null
            }

            function Xe(t, e, n, i) {
                this.x = t || 0, this.y = e || 0, this.z = n || 0, this.w = void 0 !== i ? i : 1
            }

            function Ye(t, e, n) {
                this.width = t, this.height = e, this.scissor = new Xe(0, 0, t, e), this.scissorTest = !1, this.viewport = new Xe(0, 0, t, e), void 0 === (n = n || {}).minFilter && (n.minFilter = _t), this.texture = new De(void 0, void 0, n.wrapS, n.wrapT, n.magFilter, n.minFilter, n.format, n.type, n.anisotropy, n.encoding), this.texture.generateMipmaps = void 0 === n.generateMipmaps || n.generateMipmaps, this.depthBuffer = void 0 === n.depthBuffer || n.depthBuffer, this.stencilBuffer = void 0 === n.stencilBuffer || n.stencilBuffer, this.depthTexture = void 0 !== n.depthTexture ? n.depthTexture : null
            }

            function Ze(t, e, n) {
                Ye.call(this, t, e, n), this.activeCubeFace = 0, this.activeMipMapLevel = 0
            }

            function Je(t, e, n, i, r, o, a, s, h, c, u, l) {
                De.call(this, null, o, a, s, h, c, i, r, u, l), this.image = {
                    data: t,
                    width: e,
                    height: n
                }, this.magFilter = void 0 !== h ? h : wt, this.minFilter = void 0 !== c ? c : wt, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1
            }

            function Qe(t, e) {
                this.min = void 0 !== t ? t : new He(Infinity, Infinity, Infinity), this.max = void 0 !== e ? e : new He(-Infinity, -Infinity, -Infinity)
            }

            function Ke(t, e) {
                this.center = void 0 !== t ? t : new He, this.radius = void 0 !== e ? e : 0
            }

            function qe(t, e) {
                this.normal = void 0 !== t ? t : new He(1, 0, 0), this.constant = void 0 !== e ? e : 0
            }

            function $e(t, e, n, i, r, o) {
                this.planes = [void 0 !== t ? t : new qe, void 0 !== e ? e : new qe, void 0 !== n ? n : new qe, void 0 !== i ? i : new qe, void 0 !== r ? r : new qe, void 0 !== o ? o : new qe]
            }

            De.DEFAULT_IMAGE = void 0, De.DEFAULT_MAPPING = 300, De.prototype = Object.assign(Object.create(e.prototype), {
                constructor: De, isTexture: !0, updateMatrix: function () {
                    this.matrix.setUvTransform(this.offset.x, this.offset.y, this.repeat.x, this.repeat.y, this.rotation, this.center.x, this.center.y)
                }, clone: function () {
                    return (new this.constructor).copy(this)
                }, copy: function (t) {
                    return this.name = t.name, this.image = t.image, this.mipmaps = t.mipmaps.slice(0), this.mapping = t.mapping, this.wrapS = t.wrapS, this.wrapT = t.wrapT, this.magFilter = t.magFilter, this.minFilter = t.minFilter, this.anisotropy = t.anisotropy, this.format = t.format, this.type = t.type, this.offset.copy(t.offset), this.repeat.copy(t.repeat), this.center.copy(t.center), this.rotation = t.rotation, this.matrixAutoUpdate = t.matrixAutoUpdate, this.matrix.copy(t.matrix), this.generateMipmaps = t.generateMipmaps, this.premultiplyAlpha = t.premultiplyAlpha, this.flipY = t.flipY, this.unpackAlignment = t.unpackAlignment, this.encoding = t.encoding, this
                }, toJSON: function (t) {
                    var e = void 0 === t || "string" == typeof t;
                    if (!e && void 0 !== t.textures[this.uuid]) return t.textures[this.uuid];
                    var n = {
                        metadata: {version: 4.5, type: "Texture", generator: "Texture.toJSON"},
                        uuid: this.uuid,
                        name: this.name,
                        mapping: this.mapping,
                        repeat: [this.repeat.x, this.repeat.y],
                        offset: [this.offset.x, this.offset.y],
                        center: [this.center.x, this.center.y],
                        rotation: this.rotation,
                        wrap: [this.wrapS, this.wrapT],
                        format: this.format,
                        minFilter: this.minFilter,
                        magFilter: this.magFilter,
                        anisotropy: this.anisotropy,
                        flipY: this.flipY
                    };
                    if (void 0 !== this.image) {
                        var i = this.image;
                        if (void 0 === i.uuid && (i.uuid = Pe.generateUUID()), !e && void 0 === t.images[i.uuid]) {
                            var r;
                            if (Array.isArray(i)) {
                                r = [];
                                for (var o = 0, a = i.length; o < a; o++) r.push(Ve.getDataURL(i[o]))
                            } else r = Ve.getDataURL(i);
                            t.images[i.uuid] = {uuid: i.uuid, url: r}
                        }
                        n.image = i.uuid
                    }
                    return e || (t.textures[this.uuid] = n), n
                }, dispose: function () {
                    this.dispatchEvent({type: "dispose"})
                }, transformUv: function (t) {
                    if (300 !== this.mapping) return t;
                    if (t.applyMatrix3(this.matrix), t.x < 0 || t.x > 1) switch (this.wrapS) {
                        case vt:
                            t.x = t.x - Math.floor(t.x);
                            break;
                        case gt:
                            t.x = t.x < 0 ? 0 : 1;
                            break;
                        case yt:
                            t.x = 1 === Math.abs(Math.floor(t.x) % 2) ? Math.ceil(t.x) - t.x : t.x - Math.floor(t.x)
                    }
                    if (t.y < 0 || t.y > 1) switch (this.wrapT) {
                        case vt:
                            t.y = t.y - Math.floor(t.y);
                            break;
                        case gt:
                            t.y = t.y < 0 ? 0 : 1;
                            break;
                        case yt:
                            t.y = 1 === Math.abs(Math.floor(t.y) % 2) ? Math.ceil(t.y) - t.y : t.y - Math.floor(t.y)
                    }
                    return this.flipY && (t.y = 1 - t.y), t
                }
            }), Object.defineProperty(De.prototype, "needsUpdate", {
                set: function (t) {
                    !0 === t && this.version++
                }
            }), Object.assign(Xe.prototype, {
                isVector4: !0, set: function (t, e, n, i) {
                    return this.x = t, this.y = e, this.z = n, this.w = i, this
                }, setScalar: function (t) {
                    return this.x = t, this.y = t, this.z = t, this.w = t, this
                }, setX: function (t) {
                    return this.x = t, this
                }, setY: function (t) {
                    return this.y = t, this
                }, setZ: function (t) {
                    return this.z = t, this
                }, setW: function (t) {
                    return this.w = t, this
                }, setComponent: function (t, e) {
                    switch (t) {
                        case 0:
                            this.x = e;
                            break;
                        case 1:
                            this.y = e;
                            break;
                        case 2:
                            this.z = e;
                            break;
                        case 3:
                            this.w = e;
                            break;
                        default:
                            throw new Error("index is out of range: " + t)
                    }
                    return this
                }, getComponent: function (t) {
                    switch (t) {
                        case 0:
                            return this.x;
                        case 1:
                            return this.y;
                        case 2:
                            return this.z;
                        case 3:
                            return this.w;
                        default:
                            throw new Error("index is out of range: " + t)
                    }
                }, clone: function () {
                    return new this.constructor(this.x, this.y, this.z, this.w)
                }, copy: function (t) {
                    return this.x = t.x, this.y = t.y, this.z = t.z, this.w = void 0 !== t.w ? t.w : 1, this
                }, add: function (t, e) {
                    return void 0 !== e ? (console.warn("THREE.Vector4: .add() now only accepts one argument. Use .addVectors( a, b ) instead."), this.addVectors(t, e)) : (this.x += t.x, this.y += t.y, this.z += t.z, this.w += t.w, this)
                }, addScalar: function (t) {
                    return this.x += t, this.y += t, this.z += t, this.w += t, this
                }, addVectors: function (t, e) {
                    return this.x = t.x + e.x, this.y = t.y + e.y, this.z = t.z + e.z, this.w = t.w + e.w, this
                }, addScaledVector: function (t, e) {
                    return this.x += t.x * e, this.y += t.y * e, this.z += t.z * e, this.w += t.w * e, this
                }, sub: function (t, e) {
                    return void 0 !== e ? (console.warn("THREE.Vector4: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."), this.subVectors(t, e)) : (this.x -= t.x, this.y -= t.y, this.z -= t.z, this.w -= t.w, this)
                }, subScalar: function (t) {
                    return this.x -= t, this.y -= t, this.z -= t, this.w -= t, this
                }, subVectors: function (t, e) {
                    return this.x = t.x - e.x, this.y = t.y - e.y, this.z = t.z - e.z, this.w = t.w - e.w, this
                }, multiplyScalar: function (t) {
                    return this.x *= t, this.y *= t, this.z *= t, this.w *= t, this
                }, applyMatrix4: function (t) {
                    var e = this.x, n = this.y, i = this.z, r = this.w, o = t.elements;
                    return this.x = o[0] * e + o[4] * n + o[8] * i + o[12] * r, this.y = o[1] * e + o[5] * n + o[9] * i + o[13] * r, this.z = o[2] * e + o[6] * n + o[10] * i + o[14] * r, this.w = o[3] * e + o[7] * n + o[11] * i + o[15] * r, this
                }, divideScalar: function (t) {
                    return this.multiplyScalar(1 / t)
                }, setAxisAngleFromQuaternion: function (t) {
                    this.w = 2 * Math.acos(t.w);
                    var e = Math.sqrt(1 - t.w * t.w);
                    return e < 1e-4 ? (this.x = 1, this.y = 0, this.z = 0) : (this.x = t.x / e, this.y = t.y / e, this.z = t.z / e), this
                }, setAxisAngleFromRotationMatrix: function (t) {
                    var e, n, i, r, o = t.elements, a = o[0], s = o[4], h = o[8], c = o[1], u = o[5], l = o[9],
                        f = o[2], p = o[6], d = o[10];
                    if (Math.abs(s - c) < .01 && Math.abs(h - f) < .01 && Math.abs(l - p) < .01) {
                        if (Math.abs(s + c) < .1 && Math.abs(h + f) < .1 && Math.abs(l + p) < .1 && Math.abs(a + u + d - 3) < .1) return this.set(1, 0, 0, 0), this;
                        e = Math.PI;
                        var m = (a + 1) / 2, v = (u + 1) / 2, g = (d + 1) / 2, y = (s + c) / 4, w = (h + f) / 4,
                            x = (l + p) / 4;
                        return m > v && m > g ? m < .01 ? (n = 0, i = .707106781, r = .707106781) : (i = y / (n = Math.sqrt(m)), r = w / n) : v > g ? v < .01 ? (n = .707106781, i = 0, r = .707106781) : (n = y / (i = Math.sqrt(v)), r = x / i) : g < .01 ? (n = .707106781, i = .707106781, r = 0) : (n = w / (r = Math.sqrt(g)), i = x / r), this.set(n, i, r, e), this
                    }
                    var M = Math.sqrt((p - l) * (p - l) + (h - f) * (h - f) + (c - s) * (c - s));
                    return Math.abs(M) < .001 && (M = 1), this.x = (p - l) / M, this.y = (h - f) / M, this.z = (c - s) / M, this.w = Math.acos((a + u + d - 1) / 2), this
                }, min: function (t) {
                    return this.x = Math.min(this.x, t.x), this.y = Math.min(this.y, t.y), this.z = Math.min(this.z, t.z), this.w = Math.min(this.w, t.w), this
                }, max: function (t) {
                    return this.x = Math.max(this.x, t.x), this.y = Math.max(this.y, t.y), this.z = Math.max(this.z, t.z), this.w = Math.max(this.w, t.w), this
                }, clamp: function (t, e) {
                    return this.x = Math.max(t.x, Math.min(e.x, this.x)), this.y = Math.max(t.y, Math.min(e.y, this.y)), this.z = Math.max(t.z, Math.min(e.z, this.z)), this.w = Math.max(t.w, Math.min(e.w, this.w)), this
                }, clampScalar: function () {
                    var t, e;
                    return function (n, i) {
                        return void 0 === t && (t = new Xe, e = new Xe), t.set(n, n, n, n), e.set(i, i, i, i), this.clamp(t, e)
                    }
                }(), clampLength: function (t, e) {
                    var n = this.length();
                    return this.divideScalar(n || 1).multiplyScalar(Math.max(t, Math.min(e, n)))
                }, floor: function () {
                    return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this.z = Math.floor(this.z), this.w = Math.floor(this.w), this
                }, ceil: function () {
                    return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this.z = Math.ceil(this.z), this.w = Math.ceil(this.w), this
                }, round: function () {
                    return this.x = Math.round(this.x), this.y = Math.round(this.y), this.z = Math.round(this.z), this.w = Math.round(this.w), this
                }, roundToZero: function () {
                    return this.x = this.x < 0 ? Math.ceil(this.x) : Math.floor(this.x), this.y = this.y < 0 ? Math.ceil(this.y) : Math.floor(this.y), this.z = this.z < 0 ? Math.ceil(this.z) : Math.floor(this.z), this.w = this.w < 0 ? Math.ceil(this.w) : Math.floor(this.w), this
                }, negate: function () {
                    return this.x = -this.x, this.y = -this.y, this.z = -this.z, this.w = -this.w, this
                }, dot: function (t) {
                    return this.x * t.x + this.y * t.y + this.z * t.z + this.w * t.w
                }, lengthSq: function () {
                    return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w
                }, length: function () {
                    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w)
                }, manhattanLength: function () {
                    return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z) + Math.abs(this.w)
                }, normalize: function () {
                    return this.divideScalar(this.length() || 1)
                }, setLength: function (t) {
                    return this.normalize().multiplyScalar(t)
                }, lerp: function (t, e) {
                    return this.x += (t.x - this.x) * e, this.y += (t.y - this.y) * e, this.z += (t.z - this.z) * e, this.w += (t.w - this.w) * e, this
                }, lerpVectors: function (t, e, n) {
                    return this.subVectors(e, t).multiplyScalar(n).add(t)
                }, equals: function (t) {
                    return t.x === this.x && t.y === this.y && t.z === this.z && t.w === this.w
                }, fromArray: function (t, e) {
                    return void 0 === e && (e = 0), this.x = t[e], this.y = t[e + 1], this.z = t[e + 2], this.w = t[e + 3], this
                }, toArray: function (t, e) {
                    return void 0 === t && (t = []), void 0 === e && (e = 0), t[e] = this.x, t[e + 1] = this.y, t[e + 2] = this.z, t[e + 3] = this.w, t
                }, fromBufferAttribute: function (t, e, n) {
                    return void 0 !== n && console.warn("THREE.Vector4: offset has been removed from .fromBufferAttribute()."), this.x = t.getX(e), this.y = t.getY(e), this.z = t.getZ(e), this.w = t.getW(e), this
                }
            }), Ye.prototype = Object.assign(Object.create(e.prototype), {
                constructor: Ye,
                isWebGLRenderTarget: !0,
                setSize: function (t, e) {
                    this.width === t && this.height === e || (this.width = t, this.height = e, this.dispose()), this.viewport.set(0, 0, t, e), this.scissor.set(0, 0, t, e)
                },
                clone: function () {
                    return (new this.constructor).copy(this)
                },
                copy: function (t) {
                    return this.width = t.width, this.height = t.height, this.viewport.copy(t.viewport), this.texture = t.texture.clone(), this.depthBuffer = t.depthBuffer, this.stencilBuffer = t.stencilBuffer, this.depthTexture = t.depthTexture, this
                },
                dispose: function () {
                    this.dispatchEvent({type: "dispose"})
                }
            }), (Ze.prototype = Object.create(Ye.prototype)).constructor = Ze, Ze.prototype.isWebGLRenderTargetCube = !0, (Je.prototype = Object.create(De.prototype)).constructor = Je, Je.prototype.isDataTexture = !0, Object.assign(Qe.prototype, {
                isBox3: !0, set: function (t, e) {
                    return this.min.copy(t), this.max.copy(e), this
                }, setFromArray: function (t) {
                    for (var e = Infinity, n = Infinity, i = Infinity, r = -Infinity, o = -Infinity, a = -Infinity, s = 0, h = t.length; s < h; s += 3) {
                        var c = t[s], u = t[s + 1], l = t[s + 2];
                        c < e && (e = c), u < n && (n = u), l < i && (i = l), c > r && (r = c), u > o && (o = u), l > a && (a = l)
                    }
                    return this.min.set(e, n, i), this.max.set(r, o, a), this
                }, setFromBufferAttribute: function (t) {
                    for (var e = Infinity, n = Infinity, i = Infinity, r = -Infinity, o = -Infinity, a = -Infinity, s = 0, h = t.count; s < h; s++) {
                        var c = t.getX(s), u = t.getY(s), l = t.getZ(s);
                        c < e && (e = c), u < n && (n = u), l < i && (i = l), c > r && (r = c), u > o && (o = u), l > a && (a = l)
                    }
                    return this.min.set(e, n, i), this.max.set(r, o, a), this
                }, setFromPoints: function (t) {
                    this.makeEmpty();
                    for (var e = 0, n = t.length; e < n; e++) this.expandByPoint(t[e]);
                    return this
                }, setFromCenterAndSize: function () {
                    var t = new He;
                    return function (e, n) {
                        var i = t.copy(n).multiplyScalar(.5);
                        return this.min.copy(e).sub(i), this.max.copy(e).add(i), this
                    }
                }(), setFromObject: function (t) {
                    return this.makeEmpty(), this.expandByObject(t)
                }, clone: function () {
                    return (new this.constructor).copy(this)
                }, copy: function (t) {
                    return this.min.copy(t.min), this.max.copy(t.max), this
                }, makeEmpty: function () {
                    return this.min.x = this.min.y = this.min.z = Infinity, this.max.x = this.max.y = this.max.z = -Infinity, this
                }, isEmpty: function () {
                    return this.max.x < this.min.x || this.max.y < this.min.y || this.max.z < this.min.z
                }, getCenter: function (t) {
                    return void 0 === t && (console.warn("THREE.Box3: .getCenter() target is now required"), t = new He), this.isEmpty() ? t.set(0, 0, 0) : t.addVectors(this.min, this.max).multiplyScalar(.5)
                }, getSize: function (t) {
                    return void 0 === t && (console.warn("THREE.Box3: .getSize() target is now required"), t = new He), this.isEmpty() ? t.set(0, 0, 0) : t.subVectors(this.max, this.min)
                }, expandByPoint: function (t) {
                    return this.min.min(t), this.max.max(t), this
                }, expandByVector: function (t) {
                    return this.min.sub(t), this.max.add(t), this
                }, expandByScalar: function (t) {
                    return this.min.addScalar(-t), this.max.addScalar(t), this
                }, expandByObject: function () {
                    var t, e, n, i = new He;

                    function r(r) {
                        var o = r.geometry;
                        if (void 0 !== o) if (o.isGeometry) {
                            var a = o.vertices;
                            for (e = 0, n = a.length; e < n; e++) i.copy(a[e]), i.applyMatrix4(r.matrixWorld), t.expandByPoint(i)
                        } else if (o.isBufferGeometry) {
                            var s = o.attributes.position;
                            if (void 0 !== s) for (e = 0, n = s.count; e < n; e++) i.fromBufferAttribute(s, e).applyMatrix4(r.matrixWorld), t.expandByPoint(i)
                        }
                    }

                    return function (e) {
                        return t = this, e.updateMatrixWorld(!0), e.traverse(r), this
                    }
                }(), containsPoint: function (t) {
                    return !(t.x < this.min.x || t.x > this.max.x || t.y < this.min.y || t.y > this.max.y || t.z < this.min.z || t.z > this.max.z)
                }, containsBox: function (t) {
                    return this.min.x <= t.min.x && t.max.x <= this.max.x && this.min.y <= t.min.y && t.max.y <= this.max.y && this.min.z <= t.min.z && t.max.z <= this.max.z
                }, getParameter: function (t, e) {
                    return void 0 === e && (console.warn("THREE.Box3: .getParameter() target is now required"), e = new He), e.set((t.x - this.min.x) / (this.max.x - this.min.x), (t.y - this.min.y) / (this.max.y - this.min.y), (t.z - this.min.z) / (this.max.z - this.min.z))
                }, intersectsBox: function (t) {
                    return !(t.max.x < this.min.x || t.min.x > this.max.x || t.max.y < this.min.y || t.min.y > this.max.y || t.max.z < this.min.z || t.min.z > this.max.z)
                }, intersectsSphere: (Ie = new He, function (t) {
                    return this.clampPoint(t.center, Ie), Ie.distanceToSquared(t.center) <= t.radius * t.radius
                }), intersectsPlane: function (t) {
                    var e, n;
                    return t.normal.x > 0 ? (e = t.normal.x * this.min.x, n = t.normal.x * this.max.x) : (e = t.normal.x * this.max.x, n = t.normal.x * this.min.x), t.normal.y > 0 ? (e += t.normal.y * this.min.y, n += t.normal.y * this.max.y) : (e += t.normal.y * this.max.y, n += t.normal.y * this.min.y), t.normal.z > 0 ? (e += t.normal.z * this.min.z, n += t.normal.z * this.max.z) : (e += t.normal.z * this.max.z, n += t.normal.z * this.min.z), e <= -t.constant && n >= -t.constant
                }, intersectsTriangle: function () {
                    var t = new He, e = new He, n = new He, i = new He, r = new He, o = new He, a = new He, s = new He,
                        h = new He, c = new He;

                    function u(i) {
                        var r, o;
                        for (r = 0, o = i.length - 3; r <= o; r += 3) {
                            a.fromArray(i, r);
                            var s = h.x * Math.abs(a.x) + h.y * Math.abs(a.y) + h.z * Math.abs(a.z), c = t.dot(a),
                                u = e.dot(a), l = n.dot(a);
                            if (Math.max(-Math.max(c, u, l), Math.min(c, u, l)) > s) return !1
                        }
                        return !0
                    }

                    return function (a) {
                        if (this.isEmpty()) return !1;
                        this.getCenter(s), h.subVectors(this.max, s), t.subVectors(a.a, s), e.subVectors(a.b, s), n.subVectors(a.c, s), i.subVectors(e, t), r.subVectors(n, e), o.subVectors(t, n);
                        var l = [0, -i.z, i.y, 0, -r.z, r.y, 0, -o.z, o.y, i.z, 0, -i.x, r.z, 0, -r.x, o.z, 0, -o.x, -i.y, i.x, 0, -r.y, r.x, 0, -o.y, o.x, 0];
                        return !!u(l) && (!!u(l = [1, 0, 0, 0, 1, 0, 0, 0, 1]) && (c.crossVectors(i, r), u(l = [c.x, c.y, c.z])))
                    }
                }(), clampPoint: function (t, e) {
                    return void 0 === e && (console.warn("THREE.Box3: .clampPoint() target is now required"), e = new He), e.copy(t).clamp(this.min, this.max)
                }, distanceToPoint: function () {
                    var t = new He;
                    return function (e) {
                        return t.copy(e).clamp(this.min, this.max).sub(e).length()
                    }
                }(), getBoundingSphere: function () {
                    var t = new He;
                    return function (e) {
                        return void 0 === e && (console.warn("THREE.Box3: .getBoundingSphere() target is now required"), e = new Ke), this.getCenter(e.center), e.radius = .5 * this.getSize(t).length(), e
                    }
                }(), intersect: function (t) {
                    return this.min.max(t.min), this.max.min(t.max), this.isEmpty() && this.makeEmpty(), this
                }, union: function (t) {
                    return this.min.min(t.min), this.max.max(t.max), this
                }, applyMatrix4: (Oe = [new He, new He, new He, new He, new He, new He, new He, new He], function (t) {
                    return this.isEmpty() ? this : (Oe[0].set(this.min.x, this.min.y, this.min.z).applyMatrix4(t), Oe[1].set(this.min.x, this.min.y, this.max.z).applyMatrix4(t), Oe[2].set(this.min.x, this.max.y, this.min.z).applyMatrix4(t), Oe[3].set(this.min.x, this.max.y, this.max.z).applyMatrix4(t), Oe[4].set(this.max.x, this.min.y, this.min.z).applyMatrix4(t), Oe[5].set(this.max.x, this.min.y, this.max.z).applyMatrix4(t), Oe[6].set(this.max.x, this.max.y, this.min.z).applyMatrix4(t), Oe[7].set(this.max.x, this.max.y, this.max.z).applyMatrix4(t), this.setFromPoints(Oe), this)
                }), translate: function (t) {
                    return this.min.add(t), this.max.add(t), this
                }, equals: function (t) {
                    return t.min.equals(this.min) && t.max.equals(this.max)
                }
            }), Object.assign(Ke.prototype, {
                set: function (t, e) {
                    return this.center.copy(t), this.radius = e, this
                }, setFromPoints: (Fe = new Qe, function (t, e) {
                    var n = this.center;
                    void 0 !== e ? n.copy(e) : Fe.setFromPoints(t).getCenter(n);
                    for (var i = 0, r = 0, o = t.length; r < o; r++) i = Math.max(i, n.distanceToSquared(t[r]));
                    return this.radius = Math.sqrt(i), this
                }), clone: function () {
                    return (new this.constructor).copy(this)
                }, copy: function (t) {
                    return this.center.copy(t.center), this.radius = t.radius, this
                }, empty: function () {
                    return this.radius <= 0
                }, containsPoint: function (t) {
                    return t.distanceToSquared(this.center) <= this.radius * this.radius
                }, distanceToPoint: function (t) {
                    return t.distanceTo(this.center) - this.radius
                }, intersectsSphere: function (t) {
                    var e = this.radius + t.radius;
                    return t.center.distanceToSquared(this.center) <= e * e
                }, intersectsBox: function (t) {
                    return t.intersectsSphere(this)
                }, intersectsPlane: function (t) {
                    return Math.abs(t.distanceToPoint(this.center)) <= this.radius
                }, clampPoint: function (t, e) {
                    var n = this.center.distanceToSquared(t);
                    return void 0 === e && (console.warn("THREE.Sphere: .clampPoint() target is now required"), e = new He), e.copy(t), n > this.radius * this.radius && (e.sub(this.center).normalize(), e.multiplyScalar(this.radius).add(this.center)), e
                }, getBoundingBox: function (t) {
                    return void 0 === t && (console.warn("THREE.Sphere: .getBoundingBox() target is now required"), t = new Qe), t.set(this.center, this.center), t.expandByScalar(this.radius), t
                }, applyMatrix4: function (t) {
                    return this.center.applyMatrix4(t), this.radius = this.radius * t.getMaxScaleOnAxis(), this
                }, translate: function (t) {
                    return this.center.add(t), this
                }, equals: function (t) {
                    return t.center.equals(this.center) && t.radius === this.radius
                }
            }), Object.assign(qe.prototype, {
                set: function (t, e) {
                    return this.normal.copy(t), this.constant = e, this
                }, setComponents: function (t, e, n, i) {
                    return this.normal.set(t, e, n), this.constant = i, this
                }, setFromNormalAndCoplanarPoint: function (t, e) {
                    return this.normal.copy(t), this.constant = -e.dot(this.normal), this
                }, setFromCoplanarPoints: function () {
                    var t = new He, e = new He;
                    return function (n, i, r) {
                        var o = t.subVectors(r, i).cross(e.subVectors(n, i)).normalize();
                        return this.setFromNormalAndCoplanarPoint(o, n), this
                    }
                }(), clone: function () {
                    return (new this.constructor).copy(this)
                }, copy: function (t) {
                    return this.normal.copy(t.normal), this.constant = t.constant, this
                }, normalize: function () {
                    var t = 1 / this.normal.length();
                    return this.normal.multiplyScalar(t), this.constant *= t, this
                }, negate: function () {
                    return this.constant *= -1, this.normal.negate(), this
                }, distanceToPoint: function (t) {
                    return this.normal.dot(t) + this.constant
                }, distanceToSphere: function (t) {
                    return this.distanceToPoint(t.center) - t.radius
                }, projectPoint: function (t, e) {
                    return void 0 === e && (console.warn("THREE.Plane: .projectPoint() target is now required"), e = new He), e.copy(this.normal).multiplyScalar(-this.distanceToPoint(t)).add(t)
                }, intersectLine: function () {
                    var t = new He;
                    return function (e, n) {
                        void 0 === n && (console.warn("THREE.Plane: .intersectLine() target is now required"), n = new He);
                        var i = e.delta(t), r = this.normal.dot(i);
                        if (0 === r) return 0 === this.distanceToPoint(e.start) ? n.copy(e.start) : void 0;
                        var o = -(e.start.dot(this.normal) + this.constant) / r;
                        return o < 0 || o > 1 ? void 0 : n.copy(i).multiplyScalar(o).add(e.start)
                    }
                }(), intersectsLine: function (t) {
                    var e = this.distanceToPoint(t.start), n = this.distanceToPoint(t.end);
                    return e < 0 && n > 0 || n < 0 && e > 0
                }, intersectsBox: function (t) {
                    return t.intersectsPlane(this)
                }, intersectsSphere: function (t) {
                    return t.intersectsPlane(this)
                }, coplanarPoint: function (t) {
                    return void 0 === t && (console.warn("THREE.Plane: .coplanarPoint() target is now required"), t = new He), t.copy(this.normal).multiplyScalar(-this.constant)
                }, applyMatrix4: function () {
                    var t = new He, e = new Ge;
                    return function (n, i) {
                        var r = i || e.getNormalMatrix(n), o = this.coplanarPoint(t).applyMatrix4(n),
                            a = this.normal.applyMatrix3(r).normalize();
                        return this.constant = -o.dot(a), this
                    }
                }(), translate: function (t) {
                    return this.constant -= t.dot(this.normal), this
                }, equals: function (t) {
                    return t.normal.equals(this.normal) && t.constant === this.constant
                }
            }), Object.assign($e.prototype, {
                set: function (t, e, n, i, r, o) {
                    var a = this.planes;
                    return a[0].copy(t), a[1].copy(e), a[2].copy(n), a[3].copy(i), a[4].copy(r), a[5].copy(o), this
                }, clone: function () {
                    return (new this.constructor).copy(this)
                }, copy: function (t) {
                    for (var e = this.planes, n = 0; n < 6; n++) e[n].copy(t.planes[n]);
                    return this
                }, setFromMatrix: function (t) {
                    var e = this.planes, n = t.elements, i = n[0], r = n[1], o = n[2], a = n[3], s = n[4], h = n[5],
                        c = n[6], u = n[7], l = n[8], f = n[9], p = n[10], d = n[11], m = n[12], v = n[13], g = n[14],
                        y = n[15];
                    return e[0].setComponents(a - i, u - s, d - l, y - m).normalize(), e[1].setComponents(a + i, u + s, d + l, y + m).normalize(), e[2].setComponents(a + r, u + h, d + f, y + v).normalize(), e[3].setComponents(a - r, u - h, d - f, y - v).normalize(), e[4].setComponents(a - o, u - c, d - p, y - g).normalize(), e[5].setComponents(a + o, u + c, d + p, y + g).normalize(), this
                }, intersectsObject: (ke = new Ke, function (t) {
                    var e = t.geometry;
                    return null === e.boundingSphere && e.computeBoundingSphere(), ke.copy(e.boundingSphere).applyMatrix4(t.matrixWorld), this.intersectsSphere(ke)
                }), intersectsSprite: function () {
                    var t = new Ke;
                    return function (e) {
                        return t.center.set(0, 0, 0), t.radius = .7071067811865476, t.applyMatrix4(e.matrixWorld), this.intersectsSphere(t)
                    }
                }(), intersectsSphere: function (t) {
                    for (var e = this.planes, n = t.center, i = -t.radius, r = 0; r < 6; r++) {
                        if (e[r].distanceToPoint(n) < i) return !1
                    }
                    return !0
                }, intersectsBox: (Be = new He, function (t) {
                    for (var e = this.planes, n = 0; n < 6; n++) {
                        var i = e[n];
                        if (Be.x = i.normal.x > 0 ? t.max.x : t.min.x, Be.y = i.normal.y > 0 ? t.max.y : t.min.y, Be.z = i.normal.z > 0 ? t.max.z : t.min.z, i.distanceToPoint(Be) < 0) return !1
                    }
                    return !0
                }), containsPoint: function (t) {
                    for (var e = this.planes, n = 0; n < 6; n++) if (e[n].distanceToPoint(t) < 0) return !1;
                    return !0
                }
            });
            var je, tn, en, nn = {
                alphamap_fragment: "#ifdef USE_ALPHAMAP\n\tdiffuseColor.a *= texture2D( alphaMap, vUv ).g;\n#endif\n",
                alphamap_pars_fragment: "#ifdef USE_ALPHAMAP\n\tuniform sampler2D alphaMap;\n#endif\n",
                alphatest_fragment: "#ifdef ALPHATEST\n\tif ( diffuseColor.a < ALPHATEST ) discard;\n#endif\n",
                aomap_fragment: "#ifdef USE_AOMAP\n\tfloat ambientOcclusion = ( texture2D( aoMap, vUv2 ).r - 1.0 ) * aoMapIntensity + 1.0;\n\treflectedLight.indirectDiffuse *= ambientOcclusion;\n\t#if defined( USE_ENVMAP ) && defined( PHYSICAL )\n\t\tfloat dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );\n\t\treflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.specularRoughness );\n\t#endif\n#endif\n",
                aomap_pars_fragment: "#ifdef USE_AOMAP\n\tuniform sampler2D aoMap;\n\tuniform float aoMapIntensity;\n#endif",
                begin_vertex: "\nvec3 transformed = vec3( position );\n",
                beginnormal_vertex: "\nvec3 objectNormal = vec3( normal );\n",
                bsdfs: "float punctualLightIntensityToIrradianceFactor( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {\n#if defined ( PHYSICALLY_CORRECT_LIGHTS )\n\tfloat distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );\n\tif( cutoffDistance > 0.0 ) {\n\t\tdistanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );\n\t}\n\treturn distanceFalloff;\n#else\n\tif( cutoffDistance > 0.0 && decayExponent > 0.0 ) {\n\t\treturn pow( saturate( -lightDistance / cutoffDistance + 1.0 ), decayExponent );\n\t}\n\treturn 1.0;\n#endif\n}\nvec3 BRDF_Diffuse_Lambert( const in vec3 diffuseColor ) {\n\treturn RECIPROCAL_PI * diffuseColor;\n}\nvec3 F_Schlick( const in vec3 specularColor, const in float dotLH ) {\n\tfloat fresnel = exp2( ( -5.55473 * dotLH - 6.98316 ) * dotLH );\n\treturn ( 1.0 - specularColor ) * fresnel + specularColor;\n}\nfloat G_GGX_Smith( const in float alpha, const in float dotNL, const in float dotNV ) {\n\tfloat a2 = pow2( alpha );\n\tfloat gl = dotNL + sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );\n\tfloat gv = dotNV + sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );\n\treturn 1.0 / ( gl * gv );\n}\nfloat G_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {\n\tfloat a2 = pow2( alpha );\n\tfloat gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );\n\tfloat gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );\n\treturn 0.5 / max( gv + gl, EPSILON );\n}\nfloat D_GGX( const in float alpha, const in float dotNH ) {\n\tfloat a2 = pow2( alpha );\n\tfloat denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;\n\treturn RECIPROCAL_PI * a2 / pow2( denom );\n}\nvec3 BRDF_Specular_GGX( const in IncidentLight incidentLight, const in GeometricContext geometry, const in vec3 specularColor, const in float roughness ) {\n\tfloat alpha = pow2( roughness );\n\tvec3 halfDir = normalize( incidentLight.direction + geometry.viewDir );\n\tfloat dotNL = saturate( dot( geometry.normal, incidentLight.direction ) );\n\tfloat dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );\n\tfloat dotNH = saturate( dot( geometry.normal, halfDir ) );\n\tfloat dotLH = saturate( dot( incidentLight.direction, halfDir ) );\n\tvec3 F = F_Schlick( specularColor, dotLH );\n\tfloat G = G_GGX_SmithCorrelated( alpha, dotNL, dotNV );\n\tfloat D = D_GGX( alpha, dotNH );\n\treturn F * ( G * D );\n}\nvec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {\n\tconst float LUT_SIZE  = 64.0;\n\tconst float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;\n\tconst float LUT_BIAS  = 0.5 / LUT_SIZE;\n\tfloat dotNV = saturate( dot( N, V ) );\n\tvec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );\n\tuv = uv * LUT_SCALE + LUT_BIAS;\n\treturn uv;\n}\nfloat LTC_ClippedSphereFormFactor( const in vec3 f ) {\n\tfloat l = length( f );\n\treturn max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );\n}\nvec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {\n\tfloat x = dot( v1, v2 );\n\tfloat y = abs( x );\n\tfloat a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;\n\tfloat b = 3.4175940 + ( 4.1616724 + y ) * y;\n\tfloat v = a / b;\n\tfloat theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;\n\treturn cross( v1, v2 ) * theta_sintheta;\n}\nvec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {\n\tvec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];\n\tvec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];\n\tvec3 lightNormal = cross( v1, v2 );\n\tif( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );\n\tvec3 T1, T2;\n\tT1 = normalize( V - N * dot( V, N ) );\n\tT2 = - cross( N, T1 );\n\tmat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );\n\tvec3 coords[ 4 ];\n\tcoords[ 0 ] = mat * ( rectCoords[ 0 ] - P );\n\tcoords[ 1 ] = mat * ( rectCoords[ 1 ] - P );\n\tcoords[ 2 ] = mat * ( rectCoords[ 2 ] - P );\n\tcoords[ 3 ] = mat * ( rectCoords[ 3 ] - P );\n\tcoords[ 0 ] = normalize( coords[ 0 ] );\n\tcoords[ 1 ] = normalize( coords[ 1 ] );\n\tcoords[ 2 ] = normalize( coords[ 2 ] );\n\tcoords[ 3 ] = normalize( coords[ 3 ] );\n\tvec3 vectorFormFactor = vec3( 0.0 );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );\n\tfloat result = LTC_ClippedSphereFormFactor( vectorFormFactor );\n\treturn vec3( result );\n}\nvec3 BRDF_Specular_GGX_Environment( const in GeometricContext geometry, const in vec3 specularColor, const in float roughness ) {\n\tfloat dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );\n\tconst vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );\n\tconst vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );\n\tvec4 r = roughness * c0 + c1;\n\tfloat a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;\n\tvec2 AB = vec2( -1.04, 1.04 ) * a004 + r.zw;\n\treturn specularColor * AB.x + AB.y;\n}\nfloat G_BlinnPhong_Implicit( ) {\n\treturn 0.25;\n}\nfloat D_BlinnPhong( const in float shininess, const in float dotNH ) {\n\treturn RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );\n}\nvec3 BRDF_Specular_BlinnPhong( const in IncidentLight incidentLight, const in GeometricContext geometry, const in vec3 specularColor, const in float shininess ) {\n\tvec3 halfDir = normalize( incidentLight.direction + geometry.viewDir );\n\tfloat dotNH = saturate( dot( geometry.normal, halfDir ) );\n\tfloat dotLH = saturate( dot( incidentLight.direction, halfDir ) );\n\tvec3 F = F_Schlick( specularColor, dotLH );\n\tfloat G = G_BlinnPhong_Implicit( );\n\tfloat D = D_BlinnPhong( shininess, dotNH );\n\treturn F * ( G * D );\n}\nfloat GGXRoughnessToBlinnExponent( const in float ggxRoughness ) {\n\treturn ( 2.0 / pow2( ggxRoughness + 0.0001 ) - 2.0 );\n}\nfloat BlinnExponentToGGXRoughness( const in float blinnExponent ) {\n\treturn sqrt( 2.0 / ( blinnExponent + 2.0 ) );\n}\n",
                bumpmap_pars_fragment: "#ifdef USE_BUMPMAP\n\tuniform sampler2D bumpMap;\n\tuniform float bumpScale;\n\tvec2 dHdxy_fwd() {\n\t\tvec2 dSTdx = dFdx( vUv );\n\t\tvec2 dSTdy = dFdy( vUv );\n\t\tfloat Hll = bumpScale * texture2D( bumpMap, vUv ).x;\n\t\tfloat dBx = bumpScale * texture2D( bumpMap, vUv + dSTdx ).x - Hll;\n\t\tfloat dBy = bumpScale * texture2D( bumpMap, vUv + dSTdy ).x - Hll;\n\t\treturn vec2( dBx, dBy );\n\t}\n\tvec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy ) {\n\t\tvec3 vSigmaX = vec3( dFdx( surf_pos.x ), dFdx( surf_pos.y ), dFdx( surf_pos.z ) );\n\t\tvec3 vSigmaY = vec3( dFdy( surf_pos.x ), dFdy( surf_pos.y ), dFdy( surf_pos.z ) );\n\t\tvec3 vN = surf_norm;\n\t\tvec3 R1 = cross( vSigmaY, vN );\n\t\tvec3 R2 = cross( vN, vSigmaX );\n\t\tfloat fDet = dot( vSigmaX, R1 );\n\t\tfDet *= ( float( gl_FrontFacing ) * 2.0 - 1.0 );\n\t\tvec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );\n\t\treturn normalize( abs( fDet ) * surf_norm - vGrad );\n\t}\n#endif\n",
                clipping_planes_fragment: "#if NUM_CLIPPING_PLANES > 0\n\tvec4 plane;\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {\n\t\tplane = clippingPlanes[ i ];\n\t\tif ( dot( vViewPosition, plane.xyz ) > plane.w ) discard;\n\t}\n\t#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES\n\t\tbool clipped = true;\n\t\t#pragma unroll_loop\n\t\tfor ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {\n\t\t\tplane = clippingPlanes[ i ];\n\t\t\tclipped = ( dot( vViewPosition, plane.xyz ) > plane.w ) && clipped;\n\t\t}\n\t\tif ( clipped ) discard;\n\t#endif\n#endif\n",
                clipping_planes_pars_fragment: "#if NUM_CLIPPING_PLANES > 0\n\t#if ! defined( PHYSICAL ) && ! defined( PHONG ) && ! defined( MATCAP )\n\t\tvarying vec3 vViewPosition;\n\t#endif\n\tuniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];\n#endif\n",
                clipping_planes_pars_vertex: "#if NUM_CLIPPING_PLANES > 0 && ! defined( PHYSICAL ) && ! defined( PHONG ) && ! defined( MATCAP )\n\tvarying vec3 vViewPosition;\n#endif\n",
                clipping_planes_vertex: "#if NUM_CLIPPING_PLANES > 0 && ! defined( PHYSICAL ) && ! defined( PHONG ) && ! defined( MATCAP )\n\tvViewPosition = - mvPosition.xyz;\n#endif\n",
                color_fragment: "#ifdef USE_COLOR\n\tdiffuseColor.rgb *= vColor;\n#endif",
                color_pars_fragment: "#ifdef USE_COLOR\n\tvarying vec3 vColor;\n#endif\n",
                color_pars_vertex: "#ifdef USE_COLOR\n\tvarying vec3 vColor;\n#endif",
                color_vertex: "#ifdef USE_COLOR\n\tvColor.xyz = color.xyz;\n#endif",
                common: "#define PI 3.14159265359\n#define PI2 6.28318530718\n#define PI_HALF 1.5707963267949\n#define RECIPROCAL_PI 0.31830988618\n#define RECIPROCAL_PI2 0.15915494\n#define LOG2 1.442695\n#define EPSILON 1e-6\n#define saturate(a) clamp( a, 0.0, 1.0 )\n#define whiteCompliment(a) ( 1.0 - saturate( a ) )\nfloat pow2( const in float x ) { return x*x; }\nfloat pow3( const in float x ) { return x*x*x; }\nfloat pow4( const in float x ) { float x2 = x*x; return x2*x2; }\nfloat average( const in vec3 color ) { return dot( color, vec3( 0.3333 ) ); }\nhighp float rand( const in vec2 uv ) {\n\tconst highp float a = 12.9898, b = 78.233, c = 43758.5453;\n\thighp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );\n\treturn fract(sin(sn) * c);\n}\nstruct IncidentLight {\n\tvec3 color;\n\tvec3 direction;\n\tbool visible;\n};\nstruct ReflectedLight {\n\tvec3 directDiffuse;\n\tvec3 directSpecular;\n\tvec3 indirectDiffuse;\n\tvec3 indirectSpecular;\n};\nstruct GeometricContext {\n\tvec3 position;\n\tvec3 normal;\n\tvec3 viewDir;\n};\nvec3 transformDirection( in vec3 dir, in mat4 matrix ) {\n\treturn normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );\n}\nvec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {\n\treturn normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );\n}\nvec3 projectOnPlane(in vec3 point, in vec3 pointOnPlane, in vec3 planeNormal ) {\n\tfloat distance = dot( planeNormal, point - pointOnPlane );\n\treturn - distance * planeNormal + point;\n}\nfloat sideOfPlane( in vec3 point, in vec3 pointOnPlane, in vec3 planeNormal ) {\n\treturn sign( dot( point - pointOnPlane, planeNormal ) );\n}\nvec3 linePlaneIntersect( in vec3 pointOnLine, in vec3 lineDirection, in vec3 pointOnPlane, in vec3 planeNormal ) {\n\treturn lineDirection * ( dot( planeNormal, pointOnPlane - pointOnLine ) / dot( planeNormal, lineDirection ) ) + pointOnLine;\n}\nmat3 transposeMat3( const in mat3 m ) {\n\tmat3 tmp;\n\ttmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );\n\ttmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );\n\ttmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );\n\treturn tmp;\n}\nfloat linearToRelativeLuminance( const in vec3 color ) {\n\tvec3 weights = vec3( 0.2126, 0.7152, 0.0722 );\n\treturn dot( weights, color.rgb );\n}\n",
                cube_uv_reflection_fragment: "#ifdef ENVMAP_TYPE_CUBE_UV\n#define cubeUV_textureSize (1024.0)\nint getFaceFromDirection(vec3 direction) {\n\tvec3 absDirection = abs(direction);\n\tint face = -1;\n\tif( absDirection.x > absDirection.z ) {\n\t\tif(absDirection.x > absDirection.y )\n\t\t\tface = direction.x > 0.0 ? 0 : 3;\n\t\telse\n\t\t\tface = direction.y > 0.0 ? 1 : 4;\n\t}\n\telse {\n\t\tif(absDirection.z > absDirection.y )\n\t\t\tface = direction.z > 0.0 ? 2 : 5;\n\t\telse\n\t\t\tface = direction.y > 0.0 ? 1 : 4;\n\t}\n\treturn face;\n}\n#define cubeUV_maxLods1  (log2(cubeUV_textureSize*0.25) - 1.0)\n#define cubeUV_rangeClamp (exp2((6.0 - 1.0) * 2.0))\nvec2 MipLevelInfo( vec3 vec, float roughnessLevel, float roughness ) {\n\tfloat scale = exp2(cubeUV_maxLods1 - roughnessLevel);\n\tfloat dxRoughness = dFdx(roughness);\n\tfloat dyRoughness = dFdy(roughness);\n\tvec3 dx = dFdx( vec * scale * dxRoughness );\n\tvec3 dy = dFdy( vec * scale * dyRoughness );\n\tfloat d = max( dot( dx, dx ), dot( dy, dy ) );\n\td = clamp(d, 1.0, cubeUV_rangeClamp);\n\tfloat mipLevel = 0.5 * log2(d);\n\treturn vec2(floor(mipLevel), fract(mipLevel));\n}\n#define cubeUV_maxLods2 (log2(cubeUV_textureSize*0.25) - 2.0)\n#define cubeUV_rcpTextureSize (1.0 / cubeUV_textureSize)\nvec2 getCubeUV(vec3 direction, float roughnessLevel, float mipLevel) {\n\tmipLevel = roughnessLevel > cubeUV_maxLods2 - 3.0 ? 0.0 : mipLevel;\n\tfloat a = 16.0 * cubeUV_rcpTextureSize;\n\tvec2 exp2_packed = exp2( vec2( roughnessLevel, mipLevel ) );\n\tvec2 rcp_exp2_packed = vec2( 1.0 ) / exp2_packed;\n\tfloat powScale = exp2_packed.x * exp2_packed.y;\n\tfloat scale = rcp_exp2_packed.x * rcp_exp2_packed.y * 0.25;\n\tfloat mipOffset = 0.75*(1.0 - rcp_exp2_packed.y) * rcp_exp2_packed.x;\n\tbool bRes = mipLevel == 0.0;\n\tscale =  bRes && (scale < a) ? a : scale;\n\tvec3 r;\n\tvec2 offset;\n\tint face = getFaceFromDirection(direction);\n\tfloat rcpPowScale = 1.0 / powScale;\n\tif( face == 0) {\n\t\tr = vec3(direction.x, -direction.z, direction.y);\n\t\toffset = vec2(0.0+mipOffset,0.75 * rcpPowScale);\n\t\toffset.y = bRes && (offset.y < 2.0*a) ? a : offset.y;\n\t}\n\telse if( face == 1) {\n\t\tr = vec3(direction.y, direction.x, direction.z);\n\t\toffset = vec2(scale+mipOffset, 0.75 * rcpPowScale);\n\t\toffset.y = bRes && (offset.y < 2.0*a) ? a : offset.y;\n\t}\n\telse if( face == 2) {\n\t\tr = vec3(direction.z, direction.x, direction.y);\n\t\toffset = vec2(2.0*scale+mipOffset, 0.75 * rcpPowScale);\n\t\toffset.y = bRes && (offset.y < 2.0*a) ? a : offset.y;\n\t}\n\telse if( face == 3) {\n\t\tr = vec3(direction.x, direction.z, direction.y);\n\t\toffset = vec2(0.0+mipOffset,0.5 * rcpPowScale);\n\t\toffset.y = bRes && (offset.y < 2.0*a) ? 0.0 : offset.y;\n\t}\n\telse if( face == 4) {\n\t\tr = vec3(direction.y, direction.x, -direction.z);\n\t\toffset = vec2(scale+mipOffset, 0.5 * rcpPowScale);\n\t\toffset.y = bRes && (offset.y < 2.0*a) ? 0.0 : offset.y;\n\t}\n\telse {\n\t\tr = vec3(direction.z, -direction.x, direction.y);\n\t\toffset = vec2(2.0*scale+mipOffset, 0.5 * rcpPowScale);\n\t\toffset.y = bRes && (offset.y < 2.0*a) ? 0.0 : offset.y;\n\t}\n\tr = normalize(r);\n\tfloat texelOffset = 0.5 * cubeUV_rcpTextureSize;\n\tvec2 s = ( r.yz / abs( r.x ) + vec2( 1.0 ) ) * 0.5;\n\tvec2 base = offset + vec2( texelOffset );\n\treturn base + s * ( scale - 2.0 * texelOffset );\n}\n#define cubeUV_maxLods3 (log2(cubeUV_textureSize*0.25) - 3.0)\nvec4 textureCubeUV( sampler2D envMap, vec3 reflectedDirection, float roughness ) {\n\tfloat roughnessVal = roughness* cubeUV_maxLods3;\n\tfloat r1 = floor(roughnessVal);\n\tfloat r2 = r1 + 1.0;\n\tfloat t = fract(roughnessVal);\n\tvec2 mipInfo = MipLevelInfo(reflectedDirection, r1, roughness);\n\tfloat s = mipInfo.y;\n\tfloat level0 = mipInfo.x;\n\tfloat level1 = level0 + 1.0;\n\tlevel1 = level1 > 5.0 ? 5.0 : level1;\n\tlevel0 += min( floor( s + 0.5 ), 5.0 );\n\tvec2 uv_10 = getCubeUV(reflectedDirection, r1, level0);\n\tvec4 color10 = envMapTexelToLinear(texture2D(envMap, uv_10));\n\tvec2 uv_20 = getCubeUV(reflectedDirection, r2, level0);\n\tvec4 color20 = envMapTexelToLinear(texture2D(envMap, uv_20));\n\tvec4 result = mix(color10, color20, t);\n\treturn vec4(result.rgb, 1.0);\n}\n#endif\n",
                defaultnormal_vertex: "vec3 transformedNormal = normalMatrix * objectNormal;\n#ifdef FLIP_SIDED\n\ttransformedNormal = - transformedNormal;\n#endif\n",
                displacementmap_pars_vertex: "#ifdef USE_DISPLACEMENTMAP\n\tuniform sampler2D displacementMap;\n\tuniform float displacementScale;\n\tuniform float displacementBias;\n#endif\n",
                displacementmap_vertex: "#ifdef USE_DISPLACEMENTMAP\n\ttransformed += normalize( objectNormal ) * ( texture2D( displacementMap, uv ).x * displacementScale + displacementBias );\n#endif\n",
                emissivemap_fragment: "#ifdef USE_EMISSIVEMAP\n\tvec4 emissiveColor = texture2D( emissiveMap, vUv );\n\temissiveColor.rgb = emissiveMapTexelToLinear( emissiveColor ).rgb;\n\ttotalEmissiveRadiance *= emissiveColor.rgb;\n#endif\n",
                emissivemap_pars_fragment: "#ifdef USE_EMISSIVEMAP\n\tuniform sampler2D emissiveMap;\n#endif\n",
                encodings_fragment: "  gl_FragColor = linearToOutputTexel( gl_FragColor );\n",
                encodings_pars_fragment: "\nvec4 LinearToLinear( in vec4 value ) {\n\treturn value;\n}\nvec4 GammaToLinear( in vec4 value, in float gammaFactor ) {\n\treturn vec4( pow( value.rgb, vec3( gammaFactor ) ), value.a );\n}\nvec4 LinearToGamma( in vec4 value, in float gammaFactor ) {\n\treturn vec4( pow( value.rgb, vec3( 1.0 / gammaFactor ) ), value.a );\n}\nvec4 sRGBToLinear( in vec4 value ) {\n\treturn vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );\n}\nvec4 LinearTosRGB( in vec4 value ) {\n\treturn vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );\n}\nvec4 RGBEToLinear( in vec4 value ) {\n\treturn vec4( value.rgb * exp2( value.a * 255.0 - 128.0 ), 1.0 );\n}\nvec4 LinearToRGBE( in vec4 value ) {\n\tfloat maxComponent = max( max( value.r, value.g ), value.b );\n\tfloat fExp = clamp( ceil( log2( maxComponent ) ), -128.0, 127.0 );\n\treturn vec4( value.rgb / exp2( fExp ), ( fExp + 128.0 ) / 255.0 );\n}\nvec4 RGBMToLinear( in vec4 value, in float maxRange ) {\n\treturn vec4( value.rgb * value.a * maxRange, 1.0 );\n}\nvec4 LinearToRGBM( in vec4 value, in float maxRange ) {\n\tfloat maxRGB = max( value.r, max( value.g, value.b ) );\n\tfloat M = clamp( maxRGB / maxRange, 0.0, 1.0 );\n\tM = ceil( M * 255.0 ) / 255.0;\n\treturn vec4( value.rgb / ( M * maxRange ), M );\n}\nvec4 RGBDToLinear( in vec4 value, in float maxRange ) {\n\treturn vec4( value.rgb * ( ( maxRange / 255.0 ) / value.a ), 1.0 );\n}\nvec4 LinearToRGBD( in vec4 value, in float maxRange ) {\n\tfloat maxRGB = max( value.r, max( value.g, value.b ) );\n\tfloat D = max( maxRange / maxRGB, 1.0 );\n\tD = min( floor( D ) / 255.0, 1.0 );\n\treturn vec4( value.rgb * ( D * ( 255.0 / maxRange ) ), D );\n}\nconst mat3 cLogLuvM = mat3( 0.2209, 0.3390, 0.4184, 0.1138, 0.6780, 0.7319, 0.0102, 0.1130, 0.2969 );\nvec4 LinearToLogLuv( in vec4 value )  {\n\tvec3 Xp_Y_XYZp = value.rgb * cLogLuvM;\n\tXp_Y_XYZp = max( Xp_Y_XYZp, vec3( 1e-6, 1e-6, 1e-6 ) );\n\tvec4 vResult;\n\tvResult.xy = Xp_Y_XYZp.xy / Xp_Y_XYZp.z;\n\tfloat Le = 2.0 * log2(Xp_Y_XYZp.y) + 127.0;\n\tvResult.w = fract( Le );\n\tvResult.z = ( Le - ( floor( vResult.w * 255.0 ) ) / 255.0 ) / 255.0;\n\treturn vResult;\n}\nconst mat3 cLogLuvInverseM = mat3( 6.0014, -2.7008, -1.7996, -1.3320, 3.1029, -5.7721, 0.3008, -1.0882, 5.6268 );\nvec4 LogLuvToLinear( in vec4 value ) {\n\tfloat Le = value.z * 255.0 + value.w;\n\tvec3 Xp_Y_XYZp;\n\tXp_Y_XYZp.y = exp2( ( Le - 127.0 ) / 2.0 );\n\tXp_Y_XYZp.z = Xp_Y_XYZp.y / value.y;\n\tXp_Y_XYZp.x = value.x * Xp_Y_XYZp.z;\n\tvec3 vRGB = Xp_Y_XYZp.rgb * cLogLuvInverseM;\n\treturn vec4( max( vRGB, 0.0 ), 1.0 );\n}\n",
                envmap_fragment: "#ifdef USE_ENVMAP\n\t#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG )\n\t\tvec3 cameraToVertex = normalize( vWorldPosition - cameraPosition );\n\t\tvec3 worldNormal = inverseTransformDirection( normal, viewMatrix );\n\t\t#ifdef ENVMAP_MODE_REFLECTION\n\t\t\tvec3 reflectVec = reflect( cameraToVertex, worldNormal );\n\t\t#else\n\t\t\tvec3 reflectVec = refract( cameraToVertex, worldNormal, refractionRatio );\n\t\t#endif\n\t#else\n\t\tvec3 reflectVec = vReflect;\n\t#endif\n\t#ifdef ENVMAP_TYPE_CUBE\n\t\tvec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );\n\t#elif defined( ENVMAP_TYPE_EQUIREC )\n\t\tvec2 sampleUV;\n\t\treflectVec = normalize( reflectVec );\n\t\tsampleUV.y = asin( clamp( reflectVec.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;\n\t\tsampleUV.x = atan( reflectVec.z, reflectVec.x ) * RECIPROCAL_PI2 + 0.5;\n\t\tvec4 envColor = texture2D( envMap, sampleUV );\n\t#elif defined( ENVMAP_TYPE_SPHERE )\n\t\treflectVec = normalize( reflectVec );\n\t\tvec3 reflectView = normalize( ( viewMatrix * vec4( reflectVec, 0.0 ) ).xyz + vec3( 0.0, 0.0, 1.0 ) );\n\t\tvec4 envColor = texture2D( envMap, reflectView.xy * 0.5 + 0.5 );\n\t#else\n\t\tvec4 envColor = vec4( 0.0 );\n\t#endif\n\tenvColor = envMapTexelToLinear( envColor );\n\t#ifdef ENVMAP_BLENDING_MULTIPLY\n\t\toutgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );\n\t#elif defined( ENVMAP_BLENDING_MIX )\n\t\toutgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );\n\t#elif defined( ENVMAP_BLENDING_ADD )\n\t\toutgoingLight += envColor.xyz * specularStrength * reflectivity;\n\t#endif\n#endif\n",
                envmap_pars_fragment: "#if defined( USE_ENVMAP ) || defined( PHYSICAL )\n\tuniform float reflectivity;\n\tuniform float envMapIntensity;\n#endif\n#ifdef USE_ENVMAP\n\t#if ! defined( PHYSICAL ) && ( defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) )\n\t\tvarying vec3 vWorldPosition;\n\t#endif\n\t#ifdef ENVMAP_TYPE_CUBE\n\t\tuniform samplerCube envMap;\n\t#else\n\t\tuniform sampler2D envMap;\n\t#endif\n\tuniform float flipEnvMap;\n\tuniform int maxMipLevel;\n\t#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( PHYSICAL )\n\t\tuniform float refractionRatio;\n\t#else\n\t\tvarying vec3 vReflect;\n\t#endif\n#endif\n",
                envmap_pars_vertex: "#ifdef USE_ENVMAP\n\t#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG )\n\t\tvarying vec3 vWorldPosition;\n\t#else\n\t\tvarying vec3 vReflect;\n\t\tuniform float refractionRatio;\n\t#endif\n#endif\n",
                envmap_physical_pars_fragment: "#if defined( USE_ENVMAP ) && defined( PHYSICAL )\n\tvec3 getLightProbeIndirectIrradiance( const in GeometricContext geometry, const in int maxMIPLevel ) {\n\t\tvec3 worldNormal = inverseTransformDirection( geometry.normal, viewMatrix );\n\t\t#ifdef ENVMAP_TYPE_CUBE\n\t\t\tvec3 queryVec = vec3( flipEnvMap * worldNormal.x, worldNormal.yz );\n\t\t\t#ifdef TEXTURE_LOD_EXT\n\t\t\t\tvec4 envMapColor = textureCubeLodEXT( envMap, queryVec, float( maxMIPLevel ) );\n\t\t\t#else\n\t\t\t\tvec4 envMapColor = textureCube( envMap, queryVec, float( maxMIPLevel ) );\n\t\t\t#endif\n\t\t\tenvMapColor.rgb = envMapTexelToLinear( envMapColor ).rgb;\n\t\t#elif defined( ENVMAP_TYPE_CUBE_UV )\n\t\t\tvec3 queryVec = vec3( flipEnvMap * worldNormal.x, worldNormal.yz );\n\t\t\tvec4 envMapColor = textureCubeUV( envMap, queryVec, 1.0 );\n\t\t#else\n\t\t\tvec4 envMapColor = vec4( 0.0 );\n\t\t#endif\n\t\treturn PI * envMapColor.rgb * envMapIntensity;\n\t}\n\tfloat getSpecularMIPLevel( const in float blinnShininessExponent, const in int maxMIPLevel ) {\n\t\tfloat maxMIPLevelScalar = float( maxMIPLevel );\n\t\tfloat desiredMIPLevel = maxMIPLevelScalar + 0.79248 - 0.5 * log2( pow2( blinnShininessExponent ) + 1.0 );\n\t\treturn clamp( desiredMIPLevel, 0.0, maxMIPLevelScalar );\n\t}\n\tvec3 getLightProbeIndirectRadiance( const in GeometricContext geometry, const in float blinnShininessExponent, const in int maxMIPLevel ) {\n\t\t#ifdef ENVMAP_MODE_REFLECTION\n\t\t\tvec3 reflectVec = reflect( -geometry.viewDir, geometry.normal );\n\t\t#else\n\t\t\tvec3 reflectVec = refract( -geometry.viewDir, geometry.normal, refractionRatio );\n\t\t#endif\n\t\treflectVec = inverseTransformDirection( reflectVec, viewMatrix );\n\t\tfloat specularMIPLevel = getSpecularMIPLevel( blinnShininessExponent, maxMIPLevel );\n\t\t#ifdef ENVMAP_TYPE_CUBE\n\t\t\tvec3 queryReflectVec = vec3( flipEnvMap * reflectVec.x, reflectVec.yz );\n\t\t\t#ifdef TEXTURE_LOD_EXT\n\t\t\t\tvec4 envMapColor = textureCubeLodEXT( envMap, queryReflectVec, specularMIPLevel );\n\t\t\t#else\n\t\t\t\tvec4 envMapColor = textureCube( envMap, queryReflectVec, specularMIPLevel );\n\t\t\t#endif\n\t\t\tenvMapColor.rgb = envMapTexelToLinear( envMapColor ).rgb;\n\t\t#elif defined( ENVMAP_TYPE_CUBE_UV )\n\t\t\tvec3 queryReflectVec = vec3( flipEnvMap * reflectVec.x, reflectVec.yz );\n\t\t\tvec4 envMapColor = textureCubeUV( envMap, queryReflectVec, BlinnExponentToGGXRoughness(blinnShininessExponent ));\n\t\t#elif defined( ENVMAP_TYPE_EQUIREC )\n\t\t\tvec2 sampleUV;\n\t\t\tsampleUV.y = asin( clamp( reflectVec.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;\n\t\t\tsampleUV.x = atan( reflectVec.z, reflectVec.x ) * RECIPROCAL_PI2 + 0.5;\n\t\t\t#ifdef TEXTURE_LOD_EXT\n\t\t\t\tvec4 envMapColor = texture2DLodEXT( envMap, sampleUV, specularMIPLevel );\n\t\t\t#else\n\t\t\t\tvec4 envMapColor = texture2D( envMap, sampleUV, specularMIPLevel );\n\t\t\t#endif\n\t\t\tenvMapColor.rgb = envMapTexelToLinear( envMapColor ).rgb;\n\t\t#elif defined( ENVMAP_TYPE_SPHERE )\n\t\t\tvec3 reflectView = normalize( ( viewMatrix * vec4( reflectVec, 0.0 ) ).xyz + vec3( 0.0,0.0,1.0 ) );\n\t\t\t#ifdef TEXTURE_LOD_EXT\n\t\t\t\tvec4 envMapColor = texture2DLodEXT( envMap, reflectView.xy * 0.5 + 0.5, specularMIPLevel );\n\t\t\t#else\n\t\t\t\tvec4 envMapColor = texture2D( envMap, reflectView.xy * 0.5 + 0.5, specularMIPLevel );\n\t\t\t#endif\n\t\t\tenvMapColor.rgb = envMapTexelToLinear( envMapColor ).rgb;\n\t\t#endif\n\t\treturn envMapColor.rgb * envMapIntensity;\n\t}\n#endif\n",
                envmap_vertex: "#ifdef USE_ENVMAP\n\t#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG )\n\t\tvWorldPosition = worldPosition.xyz;\n\t#else\n\t\tvec3 cameraToVertex = normalize( worldPosition.xyz - cameraPosition );\n\t\tvec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );\n\t\t#ifdef ENVMAP_MODE_REFLECTION\n\t\t\tvReflect = reflect( cameraToVertex, worldNormal );\n\t\t#else\n\t\t\tvReflect = refract( cameraToVertex, worldNormal, refractionRatio );\n\t\t#endif\n\t#endif\n#endif\n",
                fog_vertex: "#ifdef USE_FOG\n\tfogDepth = -mvPosition.z;\n#endif\n",
                fog_pars_vertex: "#ifdef USE_FOG\n\tvarying float fogDepth;\n#endif\n",
                fog_fragment: "#ifdef USE_FOG\n\t#ifdef FOG_EXP2\n\t\tfloat fogFactor = whiteCompliment( exp2( - fogDensity * fogDensity * fogDepth * fogDepth * LOG2 ) );\n\t#else\n\t\tfloat fogFactor = smoothstep( fogNear, fogFar, fogDepth );\n\t#endif\n\tgl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );\n#endif\n",
                fog_pars_fragment: "#ifdef USE_FOG\n\tuniform vec3 fogColor;\n\tvarying float fogDepth;\n\t#ifdef FOG_EXP2\n\t\tuniform float fogDensity;\n\t#else\n\t\tuniform float fogNear;\n\t\tuniform float fogFar;\n\t#endif\n#endif\n",
                gradientmap_pars_fragment: "#ifdef TOON\n\tuniform sampler2D gradientMap;\n\tvec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {\n\t\tfloat dotNL = dot( normal, lightDirection );\n\t\tvec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );\n\t\t#ifdef USE_GRADIENTMAP\n\t\t\treturn texture2D( gradientMap, coord ).rgb;\n\t\t#else\n\t\t\treturn ( coord.x < 0.7 ) ? vec3( 0.7 ) : vec3( 1.0 );\n\t\t#endif\n\t}\n#endif\n",
                lightmap_fragment: "#ifdef USE_LIGHTMAP\n\treflectedLight.indirectDiffuse += PI * texture2D( lightMap, vUv2 ).xyz * lightMapIntensity;\n#endif\n",
                lightmap_pars_fragment: "#ifdef USE_LIGHTMAP\n\tuniform sampler2D lightMap;\n\tuniform float lightMapIntensity;\n#endif",
                lights_lambert_vertex: "vec3 diffuse = vec3( 1.0 );\nGeometricContext geometry;\ngeometry.position = mvPosition.xyz;\ngeometry.normal = normalize( transformedNormal );\ngeometry.viewDir = normalize( -mvPosition.xyz );\nGeometricContext backGeometry;\nbackGeometry.position = geometry.position;\nbackGeometry.normal = -geometry.normal;\nbackGeometry.viewDir = geometry.viewDir;\nvLightFront = vec3( 0.0 );\n#ifdef DOUBLE_SIDED\n\tvLightBack = vec3( 0.0 );\n#endif\nIncidentLight directLight;\nfloat dotNL;\nvec3 directLightColor_Diffuse;\n#if NUM_POINT_LIGHTS > 0\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n\t\tgetPointDirectLightIrradiance( pointLights[ i ], geometry, directLight );\n\t\tdotNL = dot( geometry.normal, directLight.direction );\n\t\tdirectLightColor_Diffuse = PI * directLight.color;\n\t\tvLightFront += saturate( dotNL ) * directLightColor_Diffuse;\n\t\t#ifdef DOUBLE_SIDED\n\t\t\tvLightBack += saturate( -dotNL ) * directLightColor_Diffuse;\n\t\t#endif\n\t}\n#endif\n#if NUM_SPOT_LIGHTS > 0\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n\t\tgetSpotDirectLightIrradiance( spotLights[ i ], geometry, directLight );\n\t\tdotNL = dot( geometry.normal, directLight.direction );\n\t\tdirectLightColor_Diffuse = PI * directLight.color;\n\t\tvLightFront += saturate( dotNL ) * directLightColor_Diffuse;\n\t\t#ifdef DOUBLE_SIDED\n\t\t\tvLightBack += saturate( -dotNL ) * directLightColor_Diffuse;\n\t\t#endif\n\t}\n#endif\n#if NUM_DIR_LIGHTS > 0\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n\t\tgetDirectionalDirectLightIrradiance( directionalLights[ i ], geometry, directLight );\n\t\tdotNL = dot( geometry.normal, directLight.direction );\n\t\tdirectLightColor_Diffuse = PI * directLight.color;\n\t\tvLightFront += saturate( dotNL ) * directLightColor_Diffuse;\n\t\t#ifdef DOUBLE_SIDED\n\t\t\tvLightBack += saturate( -dotNL ) * directLightColor_Diffuse;\n\t\t#endif\n\t}\n#endif\n#if NUM_HEMI_LIGHTS > 0\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {\n\t\tvLightFront += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry );\n\t\t#ifdef DOUBLE_SIDED\n\t\t\tvLightBack += getHemisphereLightIrradiance( hemisphereLights[ i ], backGeometry );\n\t\t#endif\n\t}\n#endif\n",
                lights_pars_begin: "uniform vec3 ambientLightColor;\nvec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {\n\tvec3 irradiance = ambientLightColor;\n\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\tirradiance *= PI;\n\t#endif\n\treturn irradiance;\n}\n#if NUM_DIR_LIGHTS > 0\n\tstruct DirectionalLight {\n\t\tvec3 direction;\n\t\tvec3 color;\n\t\tint shadow;\n\t\tfloat shadowBias;\n\t\tfloat shadowRadius;\n\t\tvec2 shadowMapSize;\n\t};\n\tuniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];\n\tvoid getDirectionalDirectLightIrradiance( const in DirectionalLight directionalLight, const in GeometricContext geometry, out IncidentLight directLight ) {\n\t\tdirectLight.color = directionalLight.color;\n\t\tdirectLight.direction = directionalLight.direction;\n\t\tdirectLight.visible = true;\n\t}\n#endif\n#if NUM_POINT_LIGHTS > 0\n\tstruct PointLight {\n\t\tvec3 position;\n\t\tvec3 color;\n\t\tfloat distance;\n\t\tfloat decay;\n\t\tint shadow;\n\t\tfloat shadowBias;\n\t\tfloat shadowRadius;\n\t\tvec2 shadowMapSize;\n\t\tfloat shadowCameraNear;\n\t\tfloat shadowCameraFar;\n\t};\n\tuniform PointLight pointLights[ NUM_POINT_LIGHTS ];\n\tvoid getPointDirectLightIrradiance( const in PointLight pointLight, const in GeometricContext geometry, out IncidentLight directLight ) {\n\t\tvec3 lVector = pointLight.position - geometry.position;\n\t\tdirectLight.direction = normalize( lVector );\n\t\tfloat lightDistance = length( lVector );\n\t\tdirectLight.color = pointLight.color;\n\t\tdirectLight.color *= punctualLightIntensityToIrradianceFactor( lightDistance, pointLight.distance, pointLight.decay );\n\t\tdirectLight.visible = ( directLight.color != vec3( 0.0 ) );\n\t}\n#endif\n#if NUM_SPOT_LIGHTS > 0\n\tstruct SpotLight {\n\t\tvec3 position;\n\t\tvec3 direction;\n\t\tvec3 color;\n\t\tfloat distance;\n\t\tfloat decay;\n\t\tfloat coneCos;\n\t\tfloat penumbraCos;\n\t\tint shadow;\n\t\tfloat shadowBias;\n\t\tfloat shadowRadius;\n\t\tvec2 shadowMapSize;\n\t};\n\tuniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];\n\tvoid getSpotDirectLightIrradiance( const in SpotLight spotLight, const in GeometricContext geometry, out IncidentLight directLight  ) {\n\t\tvec3 lVector = spotLight.position - geometry.position;\n\t\tdirectLight.direction = normalize( lVector );\n\t\tfloat lightDistance = length( lVector );\n\t\tfloat angleCos = dot( directLight.direction, spotLight.direction );\n\t\tif ( angleCos > spotLight.coneCos ) {\n\t\t\tfloat spotEffect = smoothstep( spotLight.coneCos, spotLight.penumbraCos, angleCos );\n\t\t\tdirectLight.color = spotLight.color;\n\t\t\tdirectLight.color *= spotEffect * punctualLightIntensityToIrradianceFactor( lightDistance, spotLight.distance, spotLight.decay );\n\t\t\tdirectLight.visible = true;\n\t\t} else {\n\t\t\tdirectLight.color = vec3( 0.0 );\n\t\t\tdirectLight.visible = false;\n\t\t}\n\t}\n#endif\n#if NUM_RECT_AREA_LIGHTS > 0\n\tstruct RectAreaLight {\n\t\tvec3 color;\n\t\tvec3 position;\n\t\tvec3 halfWidth;\n\t\tvec3 halfHeight;\n\t};\n\tuniform sampler2D ltc_1;\tuniform sampler2D ltc_2;\n\tuniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];\n#endif\n#if NUM_HEMI_LIGHTS > 0\n\tstruct HemisphereLight {\n\t\tvec3 direction;\n\t\tvec3 skyColor;\n\t\tvec3 groundColor;\n\t};\n\tuniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];\n\tvec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in GeometricContext geometry ) {\n\t\tfloat dotNL = dot( geometry.normal, hemiLight.direction );\n\t\tfloat hemiDiffuseWeight = 0.5 * dotNL + 0.5;\n\t\tvec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );\n\t\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\t\tirradiance *= PI;\n\t\t#endif\n\t\treturn irradiance;\n\t}\n#endif\n",
                lights_phong_fragment: "BlinnPhongMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb;\nmaterial.specularColor = specular;\nmaterial.specularShininess = shininess;\nmaterial.specularStrength = specularStrength;\n",
                lights_phong_pars_fragment: "varying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\nstruct BlinnPhongMaterial {\n\tvec3\tdiffuseColor;\n\tvec3\tspecularColor;\n\tfloat\tspecularShininess;\n\tfloat\tspecularStrength;\n};\nvoid RE_Direct_BlinnPhong( const in IncidentLight directLight, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {\n\t#ifdef TOON\n\t\tvec3 irradiance = getGradientIrradiance( geometry.normal, directLight.direction ) * directLight.color;\n\t#else\n\t\tfloat dotNL = saturate( dot( geometry.normal, directLight.direction ) );\n\t\tvec3 irradiance = dotNL * directLight.color;\n\t#endif\n\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\tirradiance *= PI;\n\t#endif\n\treflectedLight.directDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n\treflectedLight.directSpecular += irradiance * BRDF_Specular_BlinnPhong( directLight, geometry, material.specularColor, material.specularShininess ) * material.specularStrength;\n}\nvoid RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {\n\treflectedLight.indirectDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n}\n#define RE_Direct\t\t\t\tRE_Direct_BlinnPhong\n#define RE_IndirectDiffuse\t\tRE_IndirectDiffuse_BlinnPhong\n#define Material_LightProbeLOD( material )\t(0)\n",
                lights_physical_fragment: "PhysicalMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );\nmaterial.specularRoughness = clamp( roughnessFactor, 0.04, 1.0 );\n#ifdef STANDARD\n\tmaterial.specularColor = mix( vec3( DEFAULT_SPECULAR_COEFFICIENT ), diffuseColor.rgb, metalnessFactor );\n#else\n\tmaterial.specularColor = mix( vec3( MAXIMUM_SPECULAR_COEFFICIENT * pow2( reflectivity ) ), diffuseColor.rgb, metalnessFactor );\n\tmaterial.clearCoat = saturate( clearCoat );\tmaterial.clearCoatRoughness = clamp( clearCoatRoughness, 0.04, 1.0 );\n#endif\n",
                lights_physical_pars_fragment: "struct PhysicalMaterial {\n\tvec3\tdiffuseColor;\n\tfloat\tspecularRoughness;\n\tvec3\tspecularColor;\n\t#ifndef STANDARD\n\t\tfloat clearCoat;\n\t\tfloat clearCoatRoughness;\n\t#endif\n};\n#define MAXIMUM_SPECULAR_COEFFICIENT 0.16\n#define DEFAULT_SPECULAR_COEFFICIENT 0.04\nfloat clearCoatDHRApprox( const in float roughness, const in float dotNL ) {\n\treturn DEFAULT_SPECULAR_COEFFICIENT + ( 1.0 - DEFAULT_SPECULAR_COEFFICIENT ) * ( pow( 1.0 - dotNL, 5.0 ) * pow( 1.0 - roughness, 2.0 ) );\n}\n#if NUM_RECT_AREA_LIGHTS > 0\n\tvoid RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\t\tvec3 normal = geometry.normal;\n\t\tvec3 viewDir = geometry.viewDir;\n\t\tvec3 position = geometry.position;\n\t\tvec3 lightPos = rectAreaLight.position;\n\t\tvec3 halfWidth = rectAreaLight.halfWidth;\n\t\tvec3 halfHeight = rectAreaLight.halfHeight;\n\t\tvec3 lightColor = rectAreaLight.color;\n\t\tfloat roughness = material.specularRoughness;\n\t\tvec3 rectCoords[ 4 ];\n\t\trectCoords[ 0 ] = lightPos - halfWidth - halfHeight;\t\trectCoords[ 1 ] = lightPos + halfWidth - halfHeight;\n\t\trectCoords[ 2 ] = lightPos + halfWidth + halfHeight;\n\t\trectCoords[ 3 ] = lightPos - halfWidth + halfHeight;\n\t\tvec2 uv = LTC_Uv( normal, viewDir, roughness );\n\t\tvec4 t1 = texture2D( ltc_1, uv );\n\t\tvec4 t2 = texture2D( ltc_2, uv );\n\t\tmat3 mInv = mat3(\n\t\t\tvec3( t1.x, 0, t1.y ),\n\t\t\tvec3(    0, 1,    0 ),\n\t\t\tvec3( t1.z, 0, t1.w )\n\t\t);\n\t\tvec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );\n\t\treflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );\n\t\treflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );\n\t}\n#endif\nvoid RE_Direct_Physical( const in IncidentLight directLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\tfloat dotNL = saturate( dot( geometry.normal, directLight.direction ) );\n\tvec3 irradiance = dotNL * directLight.color;\n\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\tirradiance *= PI;\n\t#endif\n\t#ifndef STANDARD\n\t\tfloat clearCoatDHR = material.clearCoat * clearCoatDHRApprox( material.clearCoatRoughness, dotNL );\n\t#else\n\t\tfloat clearCoatDHR = 0.0;\n\t#endif\n\treflectedLight.directSpecular += ( 1.0 - clearCoatDHR ) * irradiance * BRDF_Specular_GGX( directLight, geometry, material.specularColor, material.specularRoughness );\n\treflectedLight.directDiffuse += ( 1.0 - clearCoatDHR ) * irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n\t#ifndef STANDARD\n\t\treflectedLight.directSpecular += irradiance * material.clearCoat * BRDF_Specular_GGX( directLight, geometry, vec3( DEFAULT_SPECULAR_COEFFICIENT ), material.clearCoatRoughness );\n\t#endif\n}\nvoid RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\treflectedLight.indirectDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n}\nvoid RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 clearCoatRadiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\t#ifndef STANDARD\n\t\tfloat dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );\n\t\tfloat dotNL = dotNV;\n\t\tfloat clearCoatDHR = material.clearCoat * clearCoatDHRApprox( material.clearCoatRoughness, dotNL );\n\t#else\n\t\tfloat clearCoatDHR = 0.0;\n\t#endif\n\treflectedLight.indirectSpecular += ( 1.0 - clearCoatDHR ) * radiance * BRDF_Specular_GGX_Environment( geometry, material.specularColor, material.specularRoughness );\n\t#ifndef STANDARD\n\t\treflectedLight.indirectSpecular += clearCoatRadiance * material.clearCoat * BRDF_Specular_GGX_Environment( geometry, vec3( DEFAULT_SPECULAR_COEFFICIENT ), material.clearCoatRoughness );\n\t#endif\n}\n#define RE_Direct\t\t\t\tRE_Direct_Physical\n#define RE_Direct_RectArea\t\tRE_Direct_RectArea_Physical\n#define RE_IndirectDiffuse\t\tRE_IndirectDiffuse_Physical\n#define RE_IndirectSpecular\t\tRE_IndirectSpecular_Physical\n#define Material_BlinnShininessExponent( material )   GGXRoughnessToBlinnExponent( material.specularRoughness )\n#define Material_ClearCoat_BlinnShininessExponent( material )   GGXRoughnessToBlinnExponent( material.clearCoatRoughness )\nfloat computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {\n\treturn saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );\n}\n",
                lights_fragment_begin: "\nGeometricContext geometry;\ngeometry.position = - vViewPosition;\ngeometry.normal = normal;\ngeometry.viewDir = normalize( vViewPosition );\nIncidentLight directLight;\n#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )\n\tPointLight pointLight;\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n\t\tpointLight = pointLights[ i ];\n\t\tgetPointDirectLightIrradiance( pointLight, geometry, directLight );\n\t\t#ifdef USE_SHADOWMAP\n\t\tdirectLight.color *= all( bvec2( pointLight.shadow, directLight.visible ) ) ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;\n\t\t#endif\n\t\tRE_Direct( directLight, geometry, material, reflectedLight );\n\t}\n#endif\n#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )\n\tSpotLight spotLight;\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n\t\tspotLight = spotLights[ i ];\n\t\tgetSpotDirectLightIrradiance( spotLight, geometry, directLight );\n\t\t#ifdef USE_SHADOWMAP\n\t\tdirectLight.color *= all( bvec2( spotLight.shadow, directLight.visible ) ) ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotShadowCoord[ i ] ) : 1.0;\n\t\t#endif\n\t\tRE_Direct( directLight, geometry, material, reflectedLight );\n\t}\n#endif\n#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )\n\tDirectionalLight directionalLight;\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n\t\tdirectionalLight = directionalLights[ i ];\n\t\tgetDirectionalDirectLightIrradiance( directionalLight, geometry, directLight );\n\t\t#ifdef USE_SHADOWMAP\n\t\tdirectLight.color *= all( bvec2( directionalLight.shadow, directLight.visible ) ) ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;\n\t\t#endif\n\t\tRE_Direct( directLight, geometry, material, reflectedLight );\n\t}\n#endif\n#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )\n\tRectAreaLight rectAreaLight;\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {\n\t\trectAreaLight = rectAreaLights[ i ];\n\t\tRE_Direct_RectArea( rectAreaLight, geometry, material, reflectedLight );\n\t}\n#endif\n#if defined( RE_IndirectDiffuse )\n\tvec3 irradiance = getAmbientLightIrradiance( ambientLightColor );\n\t#if ( NUM_HEMI_LIGHTS > 0 )\n\t\t#pragma unroll_loop\n\t\tfor ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {\n\t\t\tirradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry );\n\t\t}\n\t#endif\n#endif\n#if defined( RE_IndirectSpecular )\n\tvec3 radiance = vec3( 0.0 );\n\tvec3 clearCoatRadiance = vec3( 0.0 );\n#endif\n",
                lights_fragment_maps: "#if defined( RE_IndirectDiffuse )\n\t#ifdef USE_LIGHTMAP\n\t\tvec3 lightMapIrradiance = texture2D( lightMap, vUv2 ).xyz * lightMapIntensity;\n\t\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\t\tlightMapIrradiance *= PI;\n\t\t#endif\n\t\tirradiance += lightMapIrradiance;\n\t#endif\n\t#if defined( USE_ENVMAP ) && defined( PHYSICAL ) && defined( ENVMAP_TYPE_CUBE_UV )\n\t\tirradiance += getLightProbeIndirectIrradiance( geometry, maxMipLevel );\n\t#endif\n#endif\n#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )\n\tradiance += getLightProbeIndirectRadiance( geometry, Material_BlinnShininessExponent( material ), maxMipLevel );\n\t#ifndef STANDARD\n\t\tclearCoatRadiance += getLightProbeIndirectRadiance( geometry, Material_ClearCoat_BlinnShininessExponent( material ), maxMipLevel );\n\t#endif\n#endif\n",
                lights_fragment_end: "#if defined( RE_IndirectDiffuse )\n\tRE_IndirectDiffuse( irradiance, geometry, material, reflectedLight );\n#endif\n#if defined( RE_IndirectSpecular )\n\tRE_IndirectSpecular( radiance, clearCoatRadiance, geometry, material, reflectedLight );\n#endif\n",
                logdepthbuf_fragment: "#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )\n\tgl_FragDepthEXT = log2( vFragDepth ) * logDepthBufFC * 0.5;\n#endif",
                logdepthbuf_pars_fragment: "#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )\n\tuniform float logDepthBufFC;\n\tvarying float vFragDepth;\n#endif\n",
                logdepthbuf_pars_vertex: "#ifdef USE_LOGDEPTHBUF\n\t#ifdef USE_LOGDEPTHBUF_EXT\n\t\tvarying float vFragDepth;\n\t#else\n\t\tuniform float logDepthBufFC;\n\t#endif\n#endif\n",
                logdepthbuf_vertex: "#ifdef USE_LOGDEPTHBUF\n\t#ifdef USE_LOGDEPTHBUF_EXT\n\t\tvFragDepth = 1.0 + gl_Position.w;\n\t#else\n\t\tgl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;\n\t\tgl_Position.z *= gl_Position.w;\n\t#endif\n#endif\n",
                map_fragment: "#ifdef USE_MAP\n\tvec4 texelColor = texture2D( map, vUv );\n\ttexelColor = mapTexelToLinear( texelColor );\n\tdiffuseColor *= texelColor;\n#endif\n",
                map_pars_fragment: "#ifdef USE_MAP\n\tuniform sampler2D map;\n#endif\n",
                map_particle_fragment: "#ifdef USE_MAP\n\tvec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;\n\tvec4 mapTexel = texture2D( map, uv );\n\tdiffuseColor *= mapTexelToLinear( mapTexel );\n#endif\n",
                map_particle_pars_fragment: "#ifdef USE_MAP\n\tuniform mat3 uvTransform;\n\tuniform sampler2D map;\n#endif\n",
                metalnessmap_fragment: "float metalnessFactor = metalness;\n#ifdef USE_METALNESSMAP\n\tvec4 texelMetalness = texture2D( metalnessMap, vUv );\n\tmetalnessFactor *= texelMetalness.b;\n#endif\n",
                metalnessmap_pars_fragment: "#ifdef USE_METALNESSMAP\n\tuniform sampler2D metalnessMap;\n#endif",
                morphnormal_vertex: "#ifdef USE_MORPHNORMALS\n\tobjectNormal += ( morphNormal0 - normal ) * morphTargetInfluences[ 0 ];\n\tobjectNormal += ( morphNormal1 - normal ) * morphTargetInfluences[ 1 ];\n\tobjectNormal += ( morphNormal2 - normal ) * morphTargetInfluences[ 2 ];\n\tobjectNormal += ( morphNormal3 - normal ) * morphTargetInfluences[ 3 ];\n#endif\n",
                morphtarget_pars_vertex: "#ifdef USE_MORPHTARGETS\n\t#ifndef USE_MORPHNORMALS\n\tuniform float morphTargetInfluences[ 8 ];\n\t#else\n\tuniform float morphTargetInfluences[ 4 ];\n\t#endif\n#endif",
                morphtarget_vertex: "#ifdef USE_MORPHTARGETS\n\ttransformed += ( morphTarget0 - position ) * morphTargetInfluences[ 0 ];\n\ttransformed += ( morphTarget1 - position ) * morphTargetInfluences[ 1 ];\n\ttransformed += ( morphTarget2 - position ) * morphTargetInfluences[ 2 ];\n\ttransformed += ( morphTarget3 - position ) * morphTargetInfluences[ 3 ];\n\t#ifndef USE_MORPHNORMALS\n\ttransformed += ( morphTarget4 - position ) * morphTargetInfluences[ 4 ];\n\ttransformed += ( morphTarget5 - position ) * morphTargetInfluences[ 5 ];\n\ttransformed += ( morphTarget6 - position ) * morphTargetInfluences[ 6 ];\n\ttransformed += ( morphTarget7 - position ) * morphTargetInfluences[ 7 ];\n\t#endif\n#endif\n",
                normal_fragment_begin: "#ifdef FLAT_SHADED\n\tvec3 fdx = vec3( dFdx( vViewPosition.x ), dFdx( vViewPosition.y ), dFdx( vViewPosition.z ) );\n\tvec3 fdy = vec3( dFdy( vViewPosition.x ), dFdy( vViewPosition.y ), dFdy( vViewPosition.z ) );\n\tvec3 normal = normalize( cross( fdx, fdy ) );\n#else\n\tvec3 normal = normalize( vNormal );\n\t#ifdef DOUBLE_SIDED\n\t\tnormal = normal * ( float( gl_FrontFacing ) * 2.0 - 1.0 );\n\t#endif\n#endif\n",
                normal_fragment_maps: "#ifdef USE_NORMALMAP\n\t#ifdef OBJECTSPACE_NORMALMAP\n\t\tnormal = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;\n\t\t#ifdef FLIP_SIDED\n\t\t\tnormal = - normal;\n\t\t#endif\n\t\t#ifdef DOUBLE_SIDED\n\t\t\tnormal = normal * ( float( gl_FrontFacing ) * 2.0 - 1.0 );\n\t\t#endif\n\t\tnormal = normalize( normalMatrix * normal );\n\t#else\n\t\tnormal = perturbNormal2Arb( -vViewPosition, normal );\n\t#endif\n#elif defined( USE_BUMPMAP )\n\tnormal = perturbNormalArb( -vViewPosition, normal, dHdxy_fwd() );\n#endif\n",
                normalmap_pars_fragment: "#ifdef USE_NORMALMAP\n\tuniform sampler2D normalMap;\n\tuniform vec2 normalScale;\n\t#ifdef OBJECTSPACE_NORMALMAP\n\t\tuniform mat3 normalMatrix;\n\t#else\n\t\tvec3 perturbNormal2Arb( vec3 eye_pos, vec3 surf_norm ) {\n\t\t\tvec3 q0 = vec3( dFdx( eye_pos.x ), dFdx( eye_pos.y ), dFdx( eye_pos.z ) );\n\t\t\tvec3 q1 = vec3( dFdy( eye_pos.x ), dFdy( eye_pos.y ), dFdy( eye_pos.z ) );\n\t\t\tvec2 st0 = dFdx( vUv.st );\n\t\t\tvec2 st1 = dFdy( vUv.st );\n\t\t\tfloat scale = sign( st1.t * st0.s - st0.t * st1.s );\n\t\t\tvec3 S = normalize( ( q0 * st1.t - q1 * st0.t ) * scale );\n\t\t\tvec3 T = normalize( ( - q0 * st1.s + q1 * st0.s ) * scale );\n\t\t\tvec3 N = normalize( surf_norm );\n\t\t\tmat3 tsn = mat3( S, T, N );\n\t\t\tvec3 mapN = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;\n\t\t\tmapN.xy *= normalScale;\n\t\t\tmapN.xy *= ( float( gl_FrontFacing ) * 2.0 - 1.0 );\n\t\t\treturn normalize( tsn * mapN );\n\t\t}\n\t#endif\n#endif\n",
                packing: "vec3 packNormalToRGB( const in vec3 normal ) {\n\treturn normalize( normal ) * 0.5 + 0.5;\n}\nvec3 unpackRGBToNormal( const in vec3 rgb ) {\n\treturn 2.0 * rgb.xyz - 1.0;\n}\nconst float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;\nconst vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256.,  256. );\nconst vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );\nconst float ShiftRight8 = 1. / 256.;\nvec4 packDepthToRGBA( const in float v ) {\n\tvec4 r = vec4( fract( v * PackFactors ), v );\n\tr.yzw -= r.xyz * ShiftRight8;\treturn r * PackUpscale;\n}\nfloat unpackRGBAToDepth( const in vec4 v ) {\n\treturn dot( v, UnpackFactors );\n}\nfloat viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {\n\treturn ( viewZ + near ) / ( near - far );\n}\nfloat orthographicDepthToViewZ( const in float linearClipZ, const in float near, const in float far ) {\n\treturn linearClipZ * ( near - far ) - near;\n}\nfloat viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {\n\treturn (( near + viewZ ) * far ) / (( far - near ) * viewZ );\n}\nfloat perspectiveDepthToViewZ( const in float invClipZ, const in float near, const in float far ) {\n\treturn ( near * far ) / ( ( far - near ) * invClipZ - far );\n}\n",
                premultiplied_alpha_fragment: "#ifdef PREMULTIPLIED_ALPHA\n\tgl_FragColor.rgb *= gl_FragColor.a;\n#endif\n",
                project_vertex: "vec4 mvPosition = modelViewMatrix * vec4( transformed, 1.0 );\ngl_Position = projectionMatrix * mvPosition;\n",
                dithering_fragment: "#if defined( DITHERING )\n  gl_FragColor.rgb = dithering( gl_FragColor.rgb );\n#endif\n",
                dithering_pars_fragment: "#if defined( DITHERING )\n\tvec3 dithering( vec3 color ) {\n\t\tfloat grid_position = rand( gl_FragCoord.xy );\n\t\tvec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );\n\t\tdither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );\n\t\treturn color + dither_shift_RGB;\n\t}\n#endif\n",
                roughnessmap_fragment: "float roughnessFactor = roughness;\n#ifdef USE_ROUGHNESSMAP\n\tvec4 texelRoughness = texture2D( roughnessMap, vUv );\n\troughnessFactor *= texelRoughness.g;\n#endif\n",
                roughnessmap_pars_fragment: "#ifdef USE_ROUGHNESSMAP\n\tuniform sampler2D roughnessMap;\n#endif",
                shadowmap_pars_fragment: "#ifdef USE_SHADOWMAP\n\t#if NUM_DIR_LIGHTS > 0\n\t\tuniform sampler2D directionalShadowMap[ NUM_DIR_LIGHTS ];\n\t\tvarying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHTS ];\n\t#endif\n\t#if NUM_SPOT_LIGHTS > 0\n\t\tuniform sampler2D spotShadowMap[ NUM_SPOT_LIGHTS ];\n\t\tvarying vec4 vSpotShadowCoord[ NUM_SPOT_LIGHTS ];\n\t#endif\n\t#if NUM_POINT_LIGHTS > 0\n\t\tuniform sampler2D pointShadowMap[ NUM_POINT_LIGHTS ];\n\t\tvarying vec4 vPointShadowCoord[ NUM_POINT_LIGHTS ];\n\t#endif\n\tfloat texture2DCompare( sampler2D depths, vec2 uv, float compare ) {\n\t\treturn step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );\n\t}\n\tfloat texture2DShadowLerp( sampler2D depths, vec2 size, vec2 uv, float compare ) {\n\t\tconst vec2 offset = vec2( 0.0, 1.0 );\n\t\tvec2 texelSize = vec2( 1.0 ) / size;\n\t\tvec2 centroidUV = floor( uv * size + 0.5 ) / size;\n\t\tfloat lb = texture2DCompare( depths, centroidUV + texelSize * offset.xx, compare );\n\t\tfloat lt = texture2DCompare( depths, centroidUV + texelSize * offset.xy, compare );\n\t\tfloat rb = texture2DCompare( depths, centroidUV + texelSize * offset.yx, compare );\n\t\tfloat rt = texture2DCompare( depths, centroidUV + texelSize * offset.yy, compare );\n\t\tvec2 f = fract( uv * size + 0.5 );\n\t\tfloat a = mix( lb, lt, f.y );\n\t\tfloat b = mix( rb, rt, f.y );\n\t\tfloat c = mix( a, b, f.x );\n\t\treturn c;\n\t}\n\tfloat getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {\n\t\tfloat shadow = 1.0;\n\t\tshadowCoord.xyz /= shadowCoord.w;\n\t\tshadowCoord.z += shadowBias;\n\t\tbvec4 inFrustumVec = bvec4 ( shadowCoord.x >= 0.0, shadowCoord.x <= 1.0, shadowCoord.y >= 0.0, shadowCoord.y <= 1.0 );\n\t\tbool inFrustum = all( inFrustumVec );\n\t\tbvec2 frustumTestVec = bvec2( inFrustum, shadowCoord.z <= 1.0 );\n\t\tbool frustumTest = all( frustumTestVec );\n\t\tif ( frustumTest ) {\n\t\t#if defined( SHADOWMAP_TYPE_PCF )\n\t\t\tvec2 texelSize = vec2( 1.0 ) / shadowMapSize;\n\t\t\tfloat dx0 = - texelSize.x * shadowRadius;\n\t\t\tfloat dy0 = - texelSize.y * shadowRadius;\n\t\t\tfloat dx1 = + texelSize.x * shadowRadius;\n\t\t\tfloat dy1 = + texelSize.y * shadowRadius;\n\t\t\tshadow = (\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )\n\t\t\t) * ( 1.0 / 9.0 );\n\t\t#elif defined( SHADOWMAP_TYPE_PCF_SOFT )\n\t\t\tvec2 texelSize = vec2( 1.0 ) / shadowMapSize;\n\t\t\tfloat dx0 = - texelSize.x * shadowRadius;\n\t\t\tfloat dy0 = - texelSize.y * shadowRadius;\n\t\t\tfloat dx1 = + texelSize.x * shadowRadius;\n\t\t\tfloat dy1 = + texelSize.y * shadowRadius;\n\t\t\tshadow = (\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy, shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )\n\t\t\t) * ( 1.0 / 9.0 );\n\t\t#else\n\t\t\tshadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );\n\t\t#endif\n\t\t}\n\t\treturn shadow;\n\t}\n\tvec2 cubeToUV( vec3 v, float texelSizeY ) {\n\t\tvec3 absV = abs( v );\n\t\tfloat scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );\n\t\tabsV *= scaleToCube;\n\t\tv *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );\n\t\tvec2 planar = v.xy;\n\t\tfloat almostATexel = 1.5 * texelSizeY;\n\t\tfloat almostOne = 1.0 - almostATexel;\n\t\tif ( absV.z >= almostOne ) {\n\t\t\tif ( v.z > 0.0 )\n\t\t\t\tplanar.x = 4.0 - v.x;\n\t\t} else if ( absV.x >= almostOne ) {\n\t\t\tfloat signX = sign( v.x );\n\t\t\tplanar.x = v.z * signX + 2.0 * signX;\n\t\t} else if ( absV.y >= almostOne ) {\n\t\t\tfloat signY = sign( v.y );\n\t\t\tplanar.x = v.x + 2.0 * signY + 2.0;\n\t\t\tplanar.y = v.z * signY - 2.0;\n\t\t}\n\t\treturn vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );\n\t}\n\tfloat getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {\n\t\tvec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );\n\t\tvec3 lightToPosition = shadowCoord.xyz;\n\t\tfloat dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );\t\tdp += shadowBias;\n\t\tvec3 bd3D = normalize( lightToPosition );\n\t\t#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT )\n\t\t\tvec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;\n\t\t\treturn (\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )\n\t\t\t) * ( 1.0 / 9.0 );\n\t\t#else\n\t\t\treturn texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );\n\t\t#endif\n\t}\n#endif\n",
                shadowmap_pars_vertex: "#ifdef USE_SHADOWMAP\n\t#if NUM_DIR_LIGHTS > 0\n\t\tuniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHTS ];\n\t\tvarying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHTS ];\n\t#endif\n\t#if NUM_SPOT_LIGHTS > 0\n\t\tuniform mat4 spotShadowMatrix[ NUM_SPOT_LIGHTS ];\n\t\tvarying vec4 vSpotShadowCoord[ NUM_SPOT_LIGHTS ];\n\t#endif\n\t#if NUM_POINT_LIGHTS > 0\n\t\tuniform mat4 pointShadowMatrix[ NUM_POINT_LIGHTS ];\n\t\tvarying vec4 vPointShadowCoord[ NUM_POINT_LIGHTS ];\n\t#endif\n#endif\n",
                shadowmap_vertex: "#ifdef USE_SHADOWMAP\n\t#if NUM_DIR_LIGHTS > 0\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n\t\tvDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * worldPosition;\n\t}\n\t#endif\n\t#if NUM_SPOT_LIGHTS > 0\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n\t\tvSpotShadowCoord[ i ] = spotShadowMatrix[ i ] * worldPosition;\n\t}\n\t#endif\n\t#if NUM_POINT_LIGHTS > 0\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n\t\tvPointShadowCoord[ i ] = pointShadowMatrix[ i ] * worldPosition;\n\t}\n\t#endif\n#endif\n",
                shadowmask_pars_fragment: "float getShadowMask() {\n\tfloat shadow = 1.0;\n\t#ifdef USE_SHADOWMAP\n\t#if NUM_DIR_LIGHTS > 0\n\tDirectionalLight directionalLight;\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n\t\tdirectionalLight = directionalLights[ i ];\n\t\tshadow *= bool( directionalLight.shadow ) ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;\n\t}\n\t#endif\n\t#if NUM_SPOT_LIGHTS > 0\n\tSpotLight spotLight;\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n\t\tspotLight = spotLights[ i ];\n\t\tshadow *= bool( spotLight.shadow ) ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotShadowCoord[ i ] ) : 1.0;\n\t}\n\t#endif\n\t#if NUM_POINT_LIGHTS > 0\n\tPointLight pointLight;\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n\t\tpointLight = pointLights[ i ];\n\t\tshadow *= bool( pointLight.shadow ) ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;\n\t}\n\t#endif\n\t#endif\n\treturn shadow;\n}\n",
                skinbase_vertex: "#ifdef USE_SKINNING\n\tmat4 boneMatX = getBoneMatrix( skinIndex.x );\n\tmat4 boneMatY = getBoneMatrix( skinIndex.y );\n\tmat4 boneMatZ = getBoneMatrix( skinIndex.z );\n\tmat4 boneMatW = getBoneMatrix( skinIndex.w );\n#endif",
                skinning_pars_vertex: "#ifdef USE_SKINNING\n\tuniform mat4 bindMatrix;\n\tuniform mat4 bindMatrixInverse;\n\t#ifdef BONE_TEXTURE\n\t\tuniform sampler2D boneTexture;\n\t\tuniform int boneTextureSize;\n\t\tmat4 getBoneMatrix( const in float i ) {\n\t\t\tfloat j = i * 4.0;\n\t\t\tfloat x = mod( j, float( boneTextureSize ) );\n\t\t\tfloat y = floor( j / float( boneTextureSize ) );\n\t\t\tfloat dx = 1.0 / float( boneTextureSize );\n\t\t\tfloat dy = 1.0 / float( boneTextureSize );\n\t\t\ty = dy * ( y + 0.5 );\n\t\t\tvec4 v1 = texture2D( boneTexture, vec2( dx * ( x + 0.5 ), y ) );\n\t\t\tvec4 v2 = texture2D( boneTexture, vec2( dx * ( x + 1.5 ), y ) );\n\t\t\tvec4 v3 = texture2D( boneTexture, vec2( dx * ( x + 2.5 ), y ) );\n\t\t\tvec4 v4 = texture2D( boneTexture, vec2( dx * ( x + 3.5 ), y ) );\n\t\t\tmat4 bone = mat4( v1, v2, v3, v4 );\n\t\t\treturn bone;\n\t\t}\n\t#else\n\t\tuniform mat4 boneMatrices[ MAX_BONES ];\n\t\tmat4 getBoneMatrix( const in float i ) {\n\t\t\tmat4 bone = boneMatrices[ int(i) ];\n\t\t\treturn bone;\n\t\t}\n\t#endif\n#endif\n",
                skinning_vertex: "#ifdef USE_SKINNING\n\tvec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );\n\tvec4 skinned = vec4( 0.0 );\n\tskinned += boneMatX * skinVertex * skinWeight.x;\n\tskinned += boneMatY * skinVertex * skinWeight.y;\n\tskinned += boneMatZ * skinVertex * skinWeight.z;\n\tskinned += boneMatW * skinVertex * skinWeight.w;\n\ttransformed = ( bindMatrixInverse * skinned ).xyz;\n#endif\n",
                skinnormal_vertex: "#ifdef USE_SKINNING\n\tmat4 skinMatrix = mat4( 0.0 );\n\tskinMatrix += skinWeight.x * boneMatX;\n\tskinMatrix += skinWeight.y * boneMatY;\n\tskinMatrix += skinWeight.z * boneMatZ;\n\tskinMatrix += skinWeight.w * boneMatW;\n\tskinMatrix  = bindMatrixInverse * skinMatrix * bindMatrix;\n\tobjectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;\n#endif\n",
                specularmap_fragment: "float specularStrength;\n#ifdef USE_SPECULARMAP\n\tvec4 texelSpecular = texture2D( specularMap, vUv );\n\tspecularStrength = texelSpecular.r;\n#else\n\tspecularStrength = 1.0;\n#endif",
                specularmap_pars_fragment: "#ifdef USE_SPECULARMAP\n\tuniform sampler2D specularMap;\n#endif",
                tonemapping_fragment: "#if defined( TONE_MAPPING )\n  gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );\n#endif\n",
                tonemapping_pars_fragment: "#ifndef saturate\n\t#define saturate(a) clamp( a, 0.0, 1.0 )\n#endif\nuniform float toneMappingExposure;\nuniform float toneMappingWhitePoint;\nvec3 LinearToneMapping( vec3 color ) {\n\treturn toneMappingExposure * color;\n}\nvec3 ReinhardToneMapping( vec3 color ) {\n\tcolor *= toneMappingExposure;\n\treturn saturate( color / ( vec3( 1.0 ) + color ) );\n}\n#define Uncharted2Helper( x ) max( ( ( x * ( 0.15 * x + 0.10 * 0.50 ) + 0.20 * 0.02 ) / ( x * ( 0.15 * x + 0.50 ) + 0.20 * 0.30 ) ) - 0.02 / 0.30, vec3( 0.0 ) )\nvec3 Uncharted2ToneMapping( vec3 color ) {\n\tcolor *= toneMappingExposure;\n\treturn saturate( Uncharted2Helper( color ) / Uncharted2Helper( vec3( toneMappingWhitePoint ) ) );\n}\nvec3 OptimizedCineonToneMapping( vec3 color ) {\n\tcolor *= toneMappingExposure;\n\tcolor = max( vec3( 0.0 ), color - 0.004 );\n\treturn pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );\n}\n",
                uv_pars_fragment: "#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP ) || defined( USE_ALPHAMAP ) || defined( USE_EMISSIVEMAP ) || defined( USE_ROUGHNESSMAP ) || defined( USE_METALNESSMAP )\n\tvarying vec2 vUv;\n#endif",
                uv_pars_vertex: "#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP ) || defined( USE_ALPHAMAP ) || defined( USE_EMISSIVEMAP ) || defined( USE_ROUGHNESSMAP ) || defined( USE_METALNESSMAP )\n\tvarying vec2 vUv;\n\tuniform mat3 uvTransform;\n#endif\n",
                uv_vertex: "#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP ) || defined( USE_ALPHAMAP ) || defined( USE_EMISSIVEMAP ) || defined( USE_ROUGHNESSMAP ) || defined( USE_METALNESSMAP )\n\tvUv = ( uvTransform * vec3( uv, 1 ) ).xy;\n#endif",
                uv2_pars_fragment: "#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )\n\tvarying vec2 vUv2;\n#endif",
                uv2_pars_vertex: "#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )\n\tattribute vec2 uv2;\n\tvarying vec2 vUv2;\n#endif",
                uv2_vertex: "#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )\n\tvUv2 = uv2;\n#endif",
                worldpos_vertex: "#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP )\n\tvec4 worldPosition = modelMatrix * vec4( transformed, 1.0 );\n#endif\n",
                background_frag: "uniform sampler2D t2D;\nvarying vec2 vUv;\nvoid main() {\n\tgl_FragColor = texture2D( t2D, vUv );\n}\n",
                background_vert: "varying vec2 vUv;\nuniform mat3 uvTransform;\nvoid main() {\n\tvUv = ( uvTransform * vec3( uv, 1 ) ).xy;\n\tgl_Position = vec4( position, 1.0 );\n\tgl_Position.z = 1.0;\n}\n",
                cube_frag: "uniform samplerCube tCube;\nuniform float tFlip;\nuniform float opacity;\nvarying vec3 vWorldDirection;\nvoid main() {\n\tgl_FragColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );\n\tgl_FragColor.a *= opacity;\n}\n",
                cube_vert: "varying vec3 vWorldDirection;\n#include <common>\nvoid main() {\n\tvWorldDirection = transformDirection( position, modelMatrix );\n\t#include <begin_vertex>\n\t#include <project_vertex>\n\tgl_Position.z = gl_Position.w;\n}\n",
                depth_frag: "#if DEPTH_PACKING == 3200\n\tuniform float opacity;\n#endif\n#include <common>\n#include <packing>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( 1.0 );\n\t#if DEPTH_PACKING == 3200\n\t\tdiffuseColor.a = opacity;\n\t#endif\n\t#include <map_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <logdepthbuf_fragment>\n\t#if DEPTH_PACKING == 3200\n\t\tgl_FragColor = vec4( vec3( 1.0 - gl_FragCoord.z ), opacity );\n\t#elif DEPTH_PACKING == 3201\n\t\tgl_FragColor = packDepthToRGBA( gl_FragCoord.z );\n\t#endif\n}\n",
                depth_vert: "#include <common>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <skinbase_vertex>\n\t#ifdef USE_DISPLACEMENTMAP\n\t\t#include <beginnormal_vertex>\n\t\t#include <morphnormal_vertex>\n\t\t#include <skinnormal_vertex>\n\t#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n}\n",
                distanceRGBA_frag: "#define DISTANCE\nuniform vec3 referencePosition;\nuniform float nearDistance;\nuniform float farDistance;\nvarying vec3 vWorldPosition;\n#include <common>\n#include <packing>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main () {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( 1.0 );\n\t#include <map_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\tfloat dist = length( vWorldPosition - referencePosition );\n\tdist = ( dist - nearDistance ) / ( farDistance - nearDistance );\n\tdist = saturate( dist );\n\tgl_FragColor = packDepthToRGBA( dist );\n}\n",
                distanceRGBA_vert: "#define DISTANCE\nvarying vec3 vWorldPosition;\n#include <common>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <skinbase_vertex>\n\t#ifdef USE_DISPLACEMENTMAP\n\t\t#include <beginnormal_vertex>\n\t\t#include <morphnormal_vertex>\n\t\t#include <skinnormal_vertex>\n\t#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <worldpos_vertex>\n\t#include <clipping_planes_vertex>\n\tvWorldPosition = worldPosition.xyz;\n}\n",
                equirect_frag: "uniform sampler2D tEquirect;\nvarying vec3 vWorldDirection;\n#include <common>\nvoid main() {\n\tvec3 direction = normalize( vWorldDirection );\n\tvec2 sampleUV;\n\tsampleUV.y = asin( clamp( direction.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;\n\tsampleUV.x = atan( direction.z, direction.x ) * RECIPROCAL_PI2 + 0.5;\n\tgl_FragColor = texture2D( tEquirect, sampleUV );\n}\n",
                equirect_vert: "varying vec3 vWorldDirection;\n#include <common>\nvoid main() {\n\tvWorldDirection = transformDirection( position, modelMatrix );\n\t#include <begin_vertex>\n\t#include <project_vertex>\n}\n",
                linedashed_frag: "uniform vec3 diffuse;\nuniform float opacity;\nuniform float dashSize;\nuniform float totalSize;\nvarying float vLineDistance;\n#include <common>\n#include <color_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tif ( mod( vLineDistance, totalSize ) > dashSize ) {\n\t\tdiscard;\n\t}\n\tvec3 outgoingLight = vec3( 0.0 );\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <logdepthbuf_fragment>\n\t#include <color_fragment>\n\toutgoingLight = diffuseColor.rgb;\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <premultiplied_alpha_fragment>\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n}\n",
                linedashed_vert: "uniform float scale;\nattribute float lineDistance;\nvarying float vLineDistance;\n#include <common>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <color_vertex>\n\tvLineDistance = scale * lineDistance;\n\tvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\n\tgl_Position = projectionMatrix * mvPosition;\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <fog_vertex>\n}\n",
                meshbasic_frag: "uniform vec3 diffuse;\nuniform float opacity;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <common>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <envmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <specularmap_fragment>\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\t#ifdef USE_LIGHTMAP\n\t\treflectedLight.indirectDiffuse += texture2D( lightMap, vUv2 ).xyz * lightMapIntensity;\n\t#else\n\t\treflectedLight.indirectDiffuse += vec3( 1.0 );\n\t#endif\n\t#include <aomap_fragment>\n\treflectedLight.indirectDiffuse *= diffuseColor.rgb;\n\tvec3 outgoingLight = reflectedLight.indirectDiffuse;\n\t#include <envmap_fragment>\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <premultiplied_alpha_fragment>\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n}\n",
                meshbasic_vert: "#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\t#include <skinbase_vertex>\n\t#ifdef USE_ENVMAP\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <worldpos_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <envmap_vertex>\n\t#include <fog_vertex>\n}\n",
                meshlambert_frag: "uniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float opacity;\nvarying vec3 vLightFront;\n#ifdef DOUBLE_SIDED\n\tvarying vec3 vLightBack;\n#endif\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <envmap_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <fog_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <shadowmask_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <specularmap_fragment>\n\t#include <emissivemap_fragment>\n\treflectedLight.indirectDiffuse = getAmbientLightIrradiance( ambientLightColor );\n\t#include <lightmap_fragment>\n\treflectedLight.indirectDiffuse *= BRDF_Diffuse_Lambert( diffuseColor.rgb );\n\t#ifdef DOUBLE_SIDED\n\t\treflectedLight.directDiffuse = ( gl_FrontFacing ) ? vLightFront : vLightBack;\n\t#else\n\t\treflectedLight.directDiffuse = vLightFront;\n\t#endif\n\treflectedLight.directDiffuse *= BRDF_Diffuse_Lambert( diffuseColor.rgb ) * getShadowMask();\n\t#include <aomap_fragment>\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;\n\t#include <envmap_fragment>\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}\n",
                meshlambert_vert: "#define LAMBERT\nvarying vec3 vLightFront;\n#ifdef DOUBLE_SIDED\n\tvarying vec3 vLightBack;\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <envmap_pars_vertex>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <worldpos_vertex>\n\t#include <envmap_vertex>\n\t#include <lights_lambert_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}\n",
                meshmatcap_frag: "#define MATCAP\nuniform vec3 diffuse;\nuniform float opacity;\nuniform sampler2D matcap;\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <common>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <fog_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\tvec3 viewDir = normalize( vViewPosition );\n\tvec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );\n\tvec3 y = cross( viewDir, x );\n\tvec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;\n\tvec4 matcapColor = texture2D( matcap, uv );\n\tmatcapColor = matcapTexelToLinear( matcapColor );\n\tvec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <premultiplied_alpha_fragment>\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n}\n",
                meshmatcap_vert: "#define MATCAP\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#ifndef FLAT_SHADED\n\t\tvNormal = normalize( transformedNormal );\n\t#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <fog_vertex>\n\tvViewPosition = - mvPosition.xyz;\n}\n",
                meshphong_frag: "#define PHONG\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform vec3 specular;\nuniform float shininess;\nuniform float opacity;\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <envmap_pars_fragment>\n#include <gradientmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <lights_phong_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <specularmap_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\t#include <emissivemap_fragment>\n\t#include <lights_phong_fragment>\n\t#include <lights_fragment_begin>\n\t#include <lights_fragment_maps>\n\t#include <lights_fragment_end>\n\t#include <aomap_fragment>\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;\n\t#include <envmap_fragment>\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}\n",
                meshphong_vert: "#define PHONG\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n#ifndef FLAT_SHADED\n\tvNormal = normalize( transformedNormal );\n#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\tvViewPosition = - mvPosition.xyz;\n\t#include <worldpos_vertex>\n\t#include <envmap_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}\n",
                meshphysical_frag: "#define PHYSICAL\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float roughness;\nuniform float metalness;\nuniform float opacity;\n#ifndef STANDARD\n\tuniform float clearCoat;\n\tuniform float clearCoatRoughness;\n#endif\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <bsdfs>\n#include <cube_uv_reflection_fragment>\n#include <envmap_pars_fragment>\n#include <envmap_physical_pars_fragment>\n#include <fog_pars_fragment>\n#include <lights_pars_begin>\n#include <lights_physical_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <roughnessmap_pars_fragment>\n#include <metalnessmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <roughnessmap_fragment>\n\t#include <metalnessmap_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\t#include <emissivemap_fragment>\n\t#include <lights_physical_fragment>\n\t#include <lights_fragment_begin>\n\t#include <lights_fragment_maps>\n\t#include <lights_fragment_end>\n\t#include <aomap_fragment>\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}\n",
                meshphysical_vert: "#define PHYSICAL\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n#ifndef FLAT_SHADED\n\tvNormal = normalize( transformedNormal );\n#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\tvViewPosition = - mvPosition.xyz;\n\t#include <worldpos_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}\n",
                normal_frag: "#define NORMAL\nuniform float opacity;\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || ( defined( USE_NORMALMAP ) && ! defined( OBJECTSPACE_NORMALMAP ) )\n\tvarying vec3 vViewPosition;\n#endif\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <packing>\n#include <uv_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\nvoid main() {\n\t#include <logdepthbuf_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\tgl_FragColor = vec4( packNormalToRGB( normal ), opacity );\n}\n",
                normal_vert: "#define NORMAL\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || ( defined( USE_NORMALMAP ) && ! defined( OBJECTSPACE_NORMALMAP ) )\n\tvarying vec3 vViewPosition;\n#endif\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n#ifndef FLAT_SHADED\n\tvNormal = normalize( transformedNormal );\n#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || ( defined( USE_NORMALMAP ) && ! defined( OBJECTSPACE_NORMALMAP ) )\n\tvViewPosition = - mvPosition.xyz;\n#endif\n}\n",
                points_frag: "uniform vec3 diffuse;\nuniform float opacity;\n#include <common>\n#include <color_pars_fragment>\n#include <map_particle_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec3 outgoingLight = vec3( 0.0 );\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <logdepthbuf_fragment>\n\t#include <map_particle_fragment>\n\t#include <color_fragment>\n\t#include <alphatest_fragment>\n\toutgoingLight = diffuseColor.rgb;\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <premultiplied_alpha_fragment>\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n}\n",
                points_vert: "uniform float size;\nuniform float scale;\n#include <common>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <color_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <project_vertex>\n\tgl_PointSize = size;\n\t#ifdef USE_SIZEATTENUATION\n\t\tbool isPerspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 );\n\t\tif ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );\n\t#endif\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <worldpos_vertex>\n\t#include <fog_vertex>\n}\n",
                shadow_frag: "uniform vec3 color;\nuniform float opacity;\n#include <common>\n#include <packing>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <shadowmap_pars_fragment>\n#include <shadowmask_pars_fragment>\nvoid main() {\n\tgl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );\n\t#include <fog_fragment>\n}\n",
                shadow_vert: "#include <fog_pars_vertex>\n#include <shadowmap_pars_vertex>\nvoid main() {\n\t#include <begin_vertex>\n\t#include <project_vertex>\n\t#include <worldpos_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}\n",
                sprite_frag: "uniform vec3 diffuse;\nuniform float opacity;\n#include <common>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec3 outgoingLight = vec3( 0.0 );\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <alphatest_fragment>\n\toutgoingLight = diffuseColor.rgb;\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n}\n",
                sprite_vert: "uniform float rotation;\nuniform vec2 center;\n#include <common>\n#include <uv_pars_vertex>\n#include <fog_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\tvec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );\n\tvec2 scale;\n\tscale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );\n\tscale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );\n\t#ifndef USE_SIZEATTENUATION\n\t\tbool isPerspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 );\n\t\tif ( isPerspective ) scale *= - mvPosition.z;\n\t#endif\n\tvec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;\n\tvec2 rotatedPosition;\n\trotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;\n\trotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;\n\tmvPosition.xy += rotatedPosition;\n\tgl_Position = projectionMatrix * mvPosition;\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <fog_vertex>\n}\n"
            }, rn = {
                merge: function (t) {
                    for (var e = {}, n = 0; n < t.length; n++) {
                        var i = this.clone(t[n]);
                        for (var r in i) e[r] = i[r]
                    }
                    return e
                }, clone: function (t) {
                    var e = {};
                    for (var n in t) for (var i in e[n] = {}, t[n]) {
                        var r = t[n][i];
                        e[n][i] = r && (r.isColor || r.isMatrix3 || r.isMatrix4 || r.isVector2 || r.isVector3 || r.isVector4 || r.isTexture) ? r.clone() : Array.isArray(r) ? r.slice() : r
                    }
                    return e
                }
            }, on = {
                aliceblue: 15792383,
                antiquewhite: 16444375,
                aqua: 65535,
                aquamarine: 8388564,
                azure: 15794175,
                beige: 16119260,
                bisque: 16770244,
                black: 0,
                blanchedalmond: 16772045,
                blue: 255,
                blueviolet: 9055202,
                brown: 10824234,
                burlywood: 14596231,
                cadetblue: 6266528,
                chartreuse: 8388352,
                chocolate: 13789470,
                coral: 16744272,
                cornflowerblue: 6591981,
                cornsilk: 16775388,
                crimson: 14423100,
                cyan: 65535,
                darkblue: 139,
                darkcyan: 35723,
                darkgoldenrod: 12092939,
                darkgray: 11119017,
                darkgreen: 25600,
                darkgrey: 11119017,
                darkkhaki: 12433259,
                darkmagenta: 9109643,
                darkolivegreen: 5597999,
                darkorange: 16747520,
                darkorchid: 10040012,
                darkred: 9109504,
                darksalmon: 15308410,
                darkseagreen: 9419919,
                darkslateblue: 4734347,
                darkslategray: 3100495,
                darkslategrey: 3100495,
                darkturquoise: 52945,
                darkviolet: 9699539,
                deeppink: 16716947,
                deepskyblue: 49151,
                dimgray: 6908265,
                dimgrey: 6908265,
                dodgerblue: 2003199,
                firebrick: 11674146,
                floralwhite: 16775920,
                forestgreen: 2263842,
                fuchsia: 16711935,
                gainsboro: 14474460,
                ghostwhite: 16316671,
                gold: 16766720,
                goldenrod: 14329120,
                gray: 8421504,
                green: 32768,
                greenyellow: 11403055,
                grey: 8421504,
                honeydew: 15794160,
                hotpink: 16738740,
                indianred: 13458524,
                indigo: 4915330,
                ivory: 16777200,
                khaki: 15787660,
                lavender: 15132410,
                lavenderblush: 16773365,
                lawngreen: 8190976,
                lemonchiffon: 16775885,
                lightblue: 11393254,
                lightcoral: 15761536,
                lightcyan: 14745599,
                lightgoldenrodyellow: 16448210,
                lightgray: 13882323,
                lightgreen: 9498256,
                lightgrey: 13882323,
                lightpink: 16758465,
                lightsalmon: 16752762,
                lightseagreen: 2142890,
                lightskyblue: 8900346,
                lightslategray: 7833753,
                lightslategrey: 7833753,
                lightsteelblue: 11584734,
                lightyellow: 16777184,
                lime: 65280,
                limegreen: 3329330,
                linen: 16445670,
                magenta: 16711935,
                maroon: 8388608,
                mediumaquamarine: 6737322,
                mediumblue: 205,
                mediumorchid: 12211667,
                mediumpurple: 9662683,
                mediumseagreen: 3978097,
                mediumslateblue: 8087790,
                mediumspringgreen: 64154,
                mediumturquoise: 4772300,
                mediumvioletred: 13047173,
                midnightblue: 1644912,
                mintcream: 16121850,
                mistyrose: 16770273,
                moccasin: 16770229,
                navajowhite: 16768685,
                navy: 128,
                oldlace: 16643558,
                olive: 8421376,
                olivedrab: 7048739,
                orange: 16753920,
                orangered: 16729344,
                orchid: 14315734,
                palegoldenrod: 15657130,
                palegreen: 10025880,
                paleturquoise: 11529966,
                palevioletred: 14381203,
                papayawhip: 16773077,
                peachpuff: 16767673,
                peru: 13468991,
                pink: 16761035,
                plum: 14524637,
                powderblue: 11591910,
                purple: 8388736,
                rebeccapurple: 6697881,
                red: 16711680,
                rosybrown: 12357519,
                royalblue: 4286945,
                saddlebrown: 9127187,
                salmon: 16416882,
                sandybrown: 16032864,
                seagreen: 3050327,
                seashell: 16774638,
                sienna: 10506797,
                silver: 12632256,
                skyblue: 8900331,
                slateblue: 6970061,
                slategray: 7372944,
                slategrey: 7372944,
                snow: 16775930,
                springgreen: 65407,
                steelblue: 4620980,
                tan: 13808780,
                teal: 32896,
                thistle: 14204888,
                tomato: 16737095,
                turquoise: 4251856,
                violet: 15631086,
                wheat: 16113331,
                white: 16777215,
                whitesmoke: 16119285,
                yellow: 16776960,
                yellowgreen: 10145074
            };

            function an(t, e, n) {
                return void 0 === e && void 0 === n ? this.set(t) : this.setRGB(t, e, n)
            }

            Object.assign(an.prototype, {
                isColor: !0, r: 1, g: 1, b: 1, set: function (t) {
                    return t && t.isColor ? this.copy(t) : "number" == typeof t ? this.setHex(t) : "string" == typeof t && this.setStyle(t), this
                }, setScalar: function (t) {
                    return this.r = t, this.g = t, this.b = t, this
                }, setHex: function (t) {
                    return t = Math.floor(t), this.r = (t >> 16 & 255) / 255, this.g = (t >> 8 & 255) / 255, this.b = (255 & t) / 255, this
                }, setRGB: function (t, e, n) {
                    return this.r = t, this.g = e, this.b = n, this
                }, setHSL: function () {
                    function t(t, e, n) {
                        return n < 0 && (n += 1), n > 1 && (n -= 1), n < 1 / 6 ? t + 6 * (e - t) * n : n < .5 ? e : n < 2 / 3 ? t + 6 * (e - t) * (2 / 3 - n) : t
                    }

                    return function (e, n, i) {
                        if (e = Pe.euclideanModulo(e, 1), n = Pe.clamp(n, 0, 1), i = Pe.clamp(i, 0, 1), 0 === n) this.r = this.g = this.b = i; else {
                            var r = i <= .5 ? i * (1 + n) : i + n - i * n, o = 2 * i - r;
                            this.r = t(o, r, e + 1 / 3), this.g = t(o, r, e), this.b = t(o, r, e - 1 / 3)
                        }
                        return this
                    }
                }(), setStyle: function (t) {
                    function e(e) {
                        void 0 !== e && parseFloat(e) < 1 && console.warn("THREE.Color: Alpha component of " + t + " will be ignored.")
                    }

                    var n;
                    if (n = /^((?:rgb|hsl)a?)\(\s*([^\)]*)\)/.exec(t)) {
                        var i, r = n[2];
                        switch (n[1]) {
                            case"rgb":
                            case"rgba":
                                if (i = /^(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(,\s*([0-9]*\.?[0-9]+)\s*)?$/.exec(r)) return this.r = Math.min(255, parseInt(i[1], 10)) / 255, this.g = Math.min(255, parseInt(i[2], 10)) / 255, this.b = Math.min(255, parseInt(i[3], 10)) / 255, e(i[5]), this;
                                if (i = /^(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(,\s*([0-9]*\.?[0-9]+)\s*)?$/.exec(r)) return this.r = Math.min(100, parseInt(i[1], 10)) / 100, this.g = Math.min(100, parseInt(i[2], 10)) / 100, this.b = Math.min(100, parseInt(i[3], 10)) / 100, e(i[5]), this;
                                break;
                            case"hsl":
                            case"hsla":
                                if (i = /^([0-9]*\.?[0-9]+)\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(,\s*([0-9]*\.?[0-9]+)\s*)?$/.exec(r)) {
                                    var o = parseFloat(i[1]) / 360, a = parseInt(i[2], 10) / 100,
                                        s = parseInt(i[3], 10) / 100;
                                    return e(i[5]), this.setHSL(o, a, s)
                                }
                        }
                    } else if (n = /^\#([A-Fa-f0-9]+)$/.exec(t)) {
                        var h, c = (h = n[1]).length;
                        if (3 === c) return this.r = parseInt(h.charAt(0) + h.charAt(0), 16) / 255, this.g = parseInt(h.charAt(1) + h.charAt(1), 16) / 255, this.b = parseInt(h.charAt(2) + h.charAt(2), 16) / 255, this;
                        if (6 === c) return this.r = parseInt(h.charAt(0) + h.charAt(1), 16) / 255, this.g = parseInt(h.charAt(2) + h.charAt(3), 16) / 255, this.b = parseInt(h.charAt(4) + h.charAt(5), 16) / 255, this
                    }
                    t && t.length > 0 && (void 0 !== (h = on[t]) ? this.setHex(h) : console.warn("THREE.Color: Unknown color " + t));
                    return this
                }, clone: function () {
                    return new this.constructor(this.r, this.g, this.b)
                }, copy: function (t) {
                    return this.r = t.r, this.g = t.g, this.b = t.b, this
                }, copyGammaToLinear: function (t, e) {
                    return void 0 === e && (e = 2), this.r = Math.pow(t.r, e), this.g = Math.pow(t.g, e), this.b = Math.pow(t.b, e), this
                }, copyLinearToGamma: function (t, e) {
                    void 0 === e && (e = 2);
                    var n = e > 0 ? 1 / e : 1;
                    return this.r = Math.pow(t.r, n), this.g = Math.pow(t.g, n), this.b = Math.pow(t.b, n), this
                }, convertGammaToLinear: function (t) {
                    return this.copyGammaToLinear(this, t), this
                }, convertLinearToGamma: function (t) {
                    return this.copyLinearToGamma(this, t), this
                }, copySRGBToLinear: function () {
                    function t(t) {
                        return t < .04045 ? .0773993808 * t : Math.pow(.9478672986 * t + .0521327014, 2.4)
                    }

                    return function (e) {
                        return this.r = t(e.r), this.g = t(e.g), this.b = t(e.b), this
                    }
                }(), copyLinearToSRGB: function () {
                    function t(t) {
                        return t < .0031308 ? 12.92 * t : 1.055 * Math.pow(t, .41666) - .055
                    }

                    return function (e) {
                        return this.r = t(e.r), this.g = t(e.g), this.b = t(e.b), this
                    }
                }(), convertSRGBToLinear: function () {
                    return this.copySRGBToLinear(this), this
                }, convertLinearToSRGB: function () {
                    return this.copyLinearToSRGB(this), this
                }, getHex: function () {
                    return 255 * this.r << 16 ^ 255 * this.g << 8 ^ 255 * this.b << 0
                }, getHexString: function () {
                    return ("000000" + this.getHex().toString(16)).slice(-6)
                }, getHSL: function (t) {
                    void 0 === t && (console.warn("THREE.Color: .getHSL() target is now required"), t = {
                        h: 0,
                        s: 0,
                        l: 0
                    });
                    var e, n, i = this.r, r = this.g, o = this.b, a = Math.max(i, r, o), s = Math.min(i, r, o),
                        h = (s + a) / 2;
                    if (s === a) e = 0, n = 0; else {
                        var c = a - s;
                        switch (n = h <= .5 ? c / (a + s) : c / (2 - a - s), a) {
                            case i:
                                e = (r - o) / c + (r < o ? 6 : 0);
                                break;
                            case r:
                                e = (o - i) / c + 2;
                                break;
                            case o:
                                e = (i - r) / c + 4
                        }
                        e /= 6
                    }
                    return t.h = e, t.s = n, t.l = h, t
                }, getStyle: function () {
                    return "rgb(" + (255 * this.r | 0) + "," + (255 * this.g | 0) + "," + (255 * this.b | 0) + ")"
                }, offsetHSL: (en = {}, function (t, e, n) {
                    return this.getHSL(en), en.h += t, en.s += e, en.l += n, this.setHSL(en.h, en.s, en.l), this
                }), add: function (t) {
                    return this.r += t.r, this.g += t.g, this.b += t.b, this
                }, addColors: function (t, e) {
                    return this.r = t.r + e.r, this.g = t.g + e.g, this.b = t.b + e.b, this
                }, addScalar: function (t) {
                    return this.r += t, this.g += t, this.b += t, this
                }, sub: function (t) {
                    return this.r = Math.max(0, this.r - t.r), this.g = Math.max(0, this.g - t.g), this.b = Math.max(0, this.b - t.b), this
                }, multiply: function (t) {
                    return this.r *= t.r, this.g *= t.g, this.b *= t.b, this
                }, multiplyScalar: function (t) {
                    return this.r *= t, this.g *= t, this.b *= t, this
                }, lerp: function (t, e) {
                    return this.r += (t.r - this.r) * e, this.g += (t.g - this.g) * e, this.b += (t.b - this.b) * e, this
                }, lerpHSL: (je = {h: 0, s: 0, l: 0}, tn = {h: 0, s: 0, l: 0}, function (t, e) {
                    this.getHSL(je), t.getHSL(tn);
                    var n = Pe.lerp(je.h, tn.h, e), i = Pe.lerp(je.s, tn.s, e), r = Pe.lerp(je.l, tn.l, e);
                    return this.setHSL(n, i, r), this
                }), equals: function (t) {
                    return t.r === this.r && t.g === this.g && t.b === this.b
                }, fromArray: function (t, e) {
                    return void 0 === e && (e = 0), this.r = t[e], this.g = t[e + 1], this.b = t[e + 2], this
                }, toArray: function (t, e) {
                    return void 0 === t && (t = []), void 0 === e && (e = 0), t[e] = this.r, t[e + 1] = this.g, t[e + 2] = this.b, t
                }, toJSON: function () {
                    return this.getHex()
                }
            });
            var sn, hn = {
                common: {
                    diffuse: {value: new an(15658734)},
                    opacity: {value: 1},
                    map: {value: null},
                    uvTransform: {value: new Ge},
                    alphaMap: {value: null}
                },
                specularmap: {specularMap: {value: null}},
                envmap: {
                    envMap: {value: null},
                    flipEnvMap: {value: -1},
                    reflectivity: {value: 1},
                    refractionRatio: {value: .98},
                    maxMipLevel: {value: 0}
                },
                aomap: {aoMap: {value: null}, aoMapIntensity: {value: 1}},
                lightmap: {lightMap: {value: null}, lightMapIntensity: {value: 1}},
                emissivemap: {emissiveMap: {value: null}},
                bumpmap: {bumpMap: {value: null}, bumpScale: {value: 1}},
                normalmap: {normalMap: {value: null}, normalScale: {value: new Ne(1, 1)}},
                displacementmap: {
                    displacementMap: {value: null},
                    displacementScale: {value: 1},
                    displacementBias: {value: 0}
                },
                roughnessmap: {roughnessMap: {value: null}},
                metalnessmap: {metalnessMap: {value: null}},
                gradientmap: {gradientMap: {value: null}},
                fog: {
                    fogDensity: {value: 25e-5},
                    fogNear: {value: 1},
                    fogFar: {value: 2e3},
                    fogColor: {value: new an(16777215)}
                },
                lights: {
                    ambientLightColor: {value: []},
                    directionalLights: {
                        value: [],
                        properties: {
                            direction: {},
                            color: {},
                            shadow: {},
                            shadowBias: {},
                            shadowRadius: {},
                            shadowMapSize: {}
                        }
                    },
                    directionalShadowMap: {value: []},
                    directionalShadowMatrix: {value: []},
                    spotLights: {
                        value: [],
                        properties: {
                            color: {},
                            position: {},
                            direction: {},
                            distance: {},
                            coneCos: {},
                            penumbraCos: {},
                            decay: {},
                            shadow: {},
                            shadowBias: {},
                            shadowRadius: {},
                            shadowMapSize: {}
                        }
                    },
                    spotShadowMap: {value: []},
                    spotShadowMatrix: {value: []},
                    pointLights: {
                        value: [],
                        properties: {
                            color: {},
                            position: {},
                            decay: {},
                            distance: {},
                            shadow: {},
                            shadowBias: {},
                            shadowRadius: {},
                            shadowMapSize: {},
                            shadowCameraNear: {},
                            shadowCameraFar: {}
                        }
                    },
                    pointShadowMap: {value: []},
                    pointShadowMatrix: {value: []},
                    hemisphereLights: {value: [], properties: {direction: {}, skyColor: {}, groundColor: {}}},
                    rectAreaLights: {value: [], properties: {color: {}, position: {}, width: {}, height: {}}}
                },
                points: {
                    diffuse: {value: new an(15658734)},
                    opacity: {value: 1},
                    size: {value: 1},
                    scale: {value: 1},
                    map: {value: null},
                    uvTransform: {value: new Ge}
                },
                sprite: {
                    diffuse: {value: new an(15658734)},
                    opacity: {value: 1},
                    center: {value: new Ne(.5, .5)},
                    rotation: {value: 0},
                    map: {value: null},
                    uvTransform: {value: new Ge}
                }
            }, cn = {
                basic: {
                    uniforms: rn.merge([hn.common, hn.specularmap, hn.envmap, hn.aomap, hn.lightmap, hn.fog]),
                    vertexShader: nn.meshbasic_vert,
                    fragmentShader: nn.meshbasic_frag
                },
                lambert: {
                    uniforms: rn.merge([hn.common, hn.specularmap, hn.envmap, hn.aomap, hn.lightmap, hn.emissivemap, hn.fog, hn.lights, {emissive: {value: new an(0)}}]),
                    vertexShader: nn.meshlambert_vert,
                    fragmentShader: nn.meshlambert_frag
                },
                phong: {
                    uniforms: rn.merge([hn.common, hn.specularmap, hn.envmap, hn.aomap, hn.lightmap, hn.emissivemap, hn.bumpmap, hn.normalmap, hn.displacementmap, hn.gradientmap, hn.fog, hn.lights, {
                        emissive: {value: new an(0)},
                        specular: {value: new an(1118481)},
                        shininess: {value: 30}
                    }]), vertexShader: nn.meshphong_vert, fragmentShader: nn.meshphong_frag
                },
                standard: {
                    uniforms: rn.merge([hn.common, hn.envmap, hn.aomap, hn.lightmap, hn.emissivemap, hn.bumpmap, hn.normalmap, hn.displacementmap, hn.roughnessmap, hn.metalnessmap, hn.fog, hn.lights, {
                        emissive: {value: new an(0)},
                        roughness: {value: .5},
                        metalness: {value: .5},
                        envMapIntensity: {value: 1}
                    }]), vertexShader: nn.meshphysical_vert, fragmentShader: nn.meshphysical_frag
                },
                matcap: {
                    uniforms: rn.merge([hn.common, hn.bumpmap, hn.normalmap, hn.displacementmap, hn.fog, {matcap: {value: null}}]),
                    vertexShader: nn.meshmatcap_vert,
                    fragmentShader: nn.meshmatcap_frag
                },
                points: {
                    uniforms: rn.merge([hn.points, hn.fog]),
                    vertexShader: nn.points_vert,
                    fragmentShader: nn.points_frag
                },
                dashed: {
                    uniforms: rn.merge([hn.common, hn.fog, {
                        scale: {value: 1},
                        dashSize: {value: 1},
                        totalSize: {value: 2}
                    }]), vertexShader: nn.linedashed_vert, fragmentShader: nn.linedashed_frag
                },
                depth: {
                    uniforms: rn.merge([hn.common, hn.displacementmap]),
                    vertexShader: nn.depth_vert,
                    fragmentShader: nn.depth_frag
                },
                normal: {
                    uniforms: rn.merge([hn.common, hn.bumpmap, hn.normalmap, hn.displacementmap, {opacity: {value: 1}}]),
                    vertexShader: nn.normal_vert,
                    fragmentShader: nn.normal_frag
                },
                sprite: {
                    uniforms: rn.merge([hn.sprite, hn.fog]),
                    vertexShader: nn.sprite_vert,
                    fragmentShader: nn.sprite_frag
                },
                background: {
                    uniforms: {uvTransform: {value: new Ge}, t2D: {value: null}},
                    vertexShader: nn.background_vert,
                    fragmentShader: nn.background_frag
                },
                cube: {
                    uniforms: {tCube: {value: null}, tFlip: {value: -1}, opacity: {value: 1}},
                    vertexShader: nn.cube_vert,
                    fragmentShader: nn.cube_frag
                },
                equirect: {
                    uniforms: {tEquirect: {value: null}},
                    vertexShader: nn.equirect_vert,
                    fragmentShader: nn.equirect_frag
                },
                distanceRGBA: {
                    uniforms: rn.merge([hn.common, hn.displacementmap, {
                        referencePosition: {value: new He},
                        nearDistance: {value: 1},
                        farDistance: {value: 1e3}
                    }]), vertexShader: nn.distanceRGBA_vert, fragmentShader: nn.distanceRGBA_frag
                },
                shadow: {
                    uniforms: rn.merge([hn.lights, hn.fog, {color: {value: new an(0)}, opacity: {value: 1}}]),
                    vertexShader: nn.shadow_vert,
                    fragmentShader: nn.shadow_frag
                }
            };

            function un() {
                var t = null, e = !1, n = null;

                function i(r, o) {
                    !1 !== e && (n(r, o), t.requestAnimationFrame(i))
                }

                return {
                    start: function () {
                        !0 !== e && null !== n && (t.requestAnimationFrame(i), e = !0)
                    }, stop: function () {
                        e = !1
                    }, setAnimationLoop: function (t) {
                        n = t
                    }, setContext: function (e) {
                        t = e
                    }
                }
            }

            function ln(t) {
                var e = new WeakMap;
                return {
                    get: function (t) {
                        return t.isInterleavedBufferAttribute && (t = t.data), e.get(t)
                    }, remove: function (n) {
                        n.isInterleavedBufferAttribute && (n = n.data);
                        var i = e.get(n);
                        i && (t.deleteBuffer(i.buffer), e.delete(n))
                    }, update: function (n, i) {
                        n.isInterleavedBufferAttribute && (n = n.data);
                        var r = e.get(n);
                        void 0 === r ? e.set(n, function (e, n) {
                            var i = e.array, r = e.dynamic ? 35048 : 35044, o = t.createBuffer();
                            t.bindBuffer(n, o), t.bufferData(n, i, r), e.onUploadCallback();
                            var a = 5126;
                            return i instanceof Float32Array ? a = 5126 : i instanceof Float64Array ? console.warn("THREE.WebGLAttributes: Unsupported data buffer format: Float64Array.") : i instanceof Uint16Array ? a = 5123 : i instanceof Int16Array ? a = 5122 : i instanceof Uint32Array ? a = 5125 : i instanceof Int32Array ? a = 5124 : i instanceof Int8Array ? a = 5120 : i instanceof Uint8Array && (a = 5121), {
                                buffer: o,
                                type: a,
                                bytesPerElement: i.BYTES_PER_ELEMENT,
                                version: e.version
                            }
                        }(n, i)) : r.version < n.version && (function (e, n, i) {
                            var r = n.array, o = n.updateRange;
                            t.bindBuffer(i, e), !1 === n.dynamic ? t.bufferData(i, r, 35044) : -1 === o.count ? t.bufferSubData(i, 0, r) : 0 === o.count ? console.error("THREE.WebGLObjects.updateBuffer: dynamic THREE.BufferAttribute marked as needsUpdate but updateRange.count is 0, ensure you are using set methods or updating manually.") : (t.bufferSubData(i, o.offset * r.BYTES_PER_ELEMENT, r.subarray(o.offset, o.offset + o.count)), o.count = -1)
                        }(r.buffer, n, i), r.version = n.version)
                    }
                }
            }

            function fn(t, e, n, i, r, o) {
                this.a = t, this.b = e, this.c = n, this.normal = i && i.isVector3 ? i : new He, this.vertexNormals = Array.isArray(i) ? i : [], this.color = r && r.isColor ? r : new an, this.vertexColors = Array.isArray(r) ? r : [], this.materialIndex = void 0 !== o ? o : 0
            }

            function pn(t, e, n, i) {
                this._x = t || 0, this._y = e || 0, this._z = n || 0, this._order = i || pn.DefaultOrder
            }

            function dn() {
                this.mask = 1
            }

            cn.physical = {
                uniforms: rn.merge([cn.standard.uniforms, {
                    clearCoat: {value: 0},
                    clearCoatRoughness: {value: 0}
                }]), vertexShader: nn.meshphysical_vert, fragmentShader: nn.meshphysical_frag
            }, Object.assign(fn.prototype, {
                clone: function () {
                    return (new this.constructor).copy(this)
                }, copy: function (t) {
                    this.a = t.a, this.b = t.b, this.c = t.c, this.normal.copy(t.normal), this.color.copy(t.color), this.materialIndex = t.materialIndex;
                    for (var e = 0, n = t.vertexNormals.length; e < n; e++) this.vertexNormals[e] = t.vertexNormals[e].clone();
                    for (e = 0, n = t.vertexColors.length; e < n; e++) this.vertexColors[e] = t.vertexColors[e].clone();
                    return this
                }
            }), pn.RotationOrders = ["XYZ", "YZX", "ZXY", "XZY", "YXZ", "ZYX"], pn.DefaultOrder = "XYZ", Object.defineProperties(pn.prototype, {
                x: {
                    get: function () {
                        return this._x
                    }, set: function (t) {
                        this._x = t, this.onChangeCallback()
                    }
                }, y: {
                    get: function () {
                        return this._y
                    }, set: function (t) {
                        this._y = t, this.onChangeCallback()
                    }
                }, z: {
                    get: function () {
                        return this._z
                    }, set: function (t) {
                        this._z = t, this.onChangeCallback()
                    }
                }, order: {
                    get: function () {
                        return this._order
                    }, set: function (t) {
                        this._order = t, this.onChangeCallback()
                    }
                }
            }), Object.assign(pn.prototype, {
                isEuler: !0, set: function (t, e, n, i) {
                    return this._x = t, this._y = e, this._z = n, this._order = i || this._order, this.onChangeCallback(), this
                }, clone: function () {
                    return new this.constructor(this._x, this._y, this._z, this._order)
                }, copy: function (t) {
                    return this._x = t._x, this._y = t._y, this._z = t._z, this._order = t._order, this.onChangeCallback(), this
                }, setFromRotationMatrix: function (t, e, n) {
                    var i = Pe.clamp, r = t.elements, o = r[0], a = r[4], s = r[8], h = r[1], c = r[5], u = r[9],
                        l = r[2], f = r[6], p = r[10];
                    return "XYZ" === (e = e || this._order) ? (this._y = Math.asin(i(s, -1, 1)), Math.abs(s) < .99999 ? (this._x = Math.atan2(-u, p), this._z = Math.atan2(-a, o)) : (this._x = Math.atan2(f, c), this._z = 0)) : "YXZ" === e ? (this._x = Math.asin(-i(u, -1, 1)), Math.abs(u) < .99999 ? (this._y = Math.atan2(s, p), this._z = Math.atan2(h, c)) : (this._y = Math.atan2(-l, o), this._z = 0)) : "ZXY" === e ? (this._x = Math.asin(i(f, -1, 1)), Math.abs(f) < .99999 ? (this._y = Math.atan2(-l, p), this._z = Math.atan2(-a, c)) : (this._y = 0, this._z = Math.atan2(h, o))) : "ZYX" === e ? (this._y = Math.asin(-i(l, -1, 1)), Math.abs(l) < .99999 ? (this._x = Math.atan2(f, p), this._z = Math.atan2(h, o)) : (this._x = 0, this._z = Math.atan2(-a, c))) : "YZX" === e ? (this._z = Math.asin(i(h, -1, 1)), Math.abs(h) < .99999 ? (this._x = Math.atan2(-u, c), this._y = Math.atan2(-l, o)) : (this._x = 0, this._y = Math.atan2(s, p))) : "XZY" === e ? (this._z = Math.asin(-i(a, -1, 1)), Math.abs(a) < .99999 ? (this._x = Math.atan2(f, c), this._y = Math.atan2(s, o)) : (this._x = Math.atan2(-u, p), this._y = 0)) : console.warn("THREE.Euler: .setFromRotationMatrix() given unsupported order: " + e), this._order = e, !1 !== n && this.onChangeCallback(), this
                }, setFromQuaternion: function () {
                    var t = new ze;
                    return function (e, n, i) {
                        return t.makeRotationFromQuaternion(e), this.setFromRotationMatrix(t, n, i)
                    }
                }(), setFromVector3: function (t, e) {
                    return this.set(t.x, t.y, t.z, e || this._order)
                }, reorder: (sn = new Ue, function (t) {
                    return sn.setFromEuler(this), this.setFromQuaternion(sn, t)
                }), equals: function (t) {
                    return t._x === this._x && t._y === this._y && t._z === this._z && t._order === this._order
                }, fromArray: function (t) {
                    return this._x = t[0], this._y = t[1], this._z = t[2], void 0 !== t[3] && (this._order = t[3]), this.onChangeCallback(), this
                }, toArray: function (t, e) {
                    return void 0 === t && (t = []), void 0 === e && (e = 0), t[e] = this._x, t[e + 1] = this._y, t[e + 2] = this._z, t[e + 3] = this._order, t
                }, toVector3: function (t) {
                    return t ? t.set(this._x, this._y, this._z) : new He(this._x, this._y, this._z)
                }, onChange: function (t) {
                    return this.onChangeCallback = t, this
                }, onChangeCallback: function () {
                }
            }), Object.assign(dn.prototype, {
                set: function (t) {
                    this.mask = 1 << t | 0
                }, enable: function (t) {
                    this.mask |= 1 << t | 0
                }, toggle: function (t) {
                    this.mask ^= 1 << t | 0
                }, disable: function (t) {
                    this.mask &= ~(1 << t | 0)
                }, test: function (t) {
                    return 0 != (this.mask & t.mask)
                }
            });
            var mn, vn, gn, yn, wn = 0;

            function xn() {
                Object.defineProperty(this, "id", {value: wn++}), this.uuid = Pe.generateUUID(), this.name = "", this.type = "Object3D", this.parent = null, this.children = [], this.up = xn.DefaultUp.clone();
                var t = new He, e = new pn, n = new Ue, i = new He(1, 1, 1);
                e.onChange(function () {
                    n.setFromEuler(e, !1)
                }), n.onChange(function () {
                    e.setFromQuaternion(n, void 0, !1)
                }), Object.defineProperties(this, {
                    position: {configurable: !0, enumerable: !0, value: t},
                    rotation: {configurable: !0, enumerable: !0, value: e},
                    quaternion: {configurable: !0, enumerable: !0, value: n},
                    scale: {configurable: !0, enumerable: !0, value: i},
                    modelViewMatrix: {value: new ze},
                    normalMatrix: {value: new Ge}
                }), this.matrix = new ze, this.matrixWorld = new ze, this.matrixAutoUpdate = xn.DefaultMatrixAutoUpdate, this.matrixWorldNeedsUpdate = !1, this.layers = new dn, this.visible = !0, this.castShadow = !1, this.receiveShadow = !1, this.frustumCulled = !0, this.renderOrder = 0, this.userData = {}
            }

            xn.DefaultUp = new He(0, 1, 0), xn.DefaultMatrixAutoUpdate = !0, xn.prototype = Object.assign(Object.create(e.prototype), {
                constructor: xn, isObject3D: !0, onBeforeRender: function () {
                }, onAfterRender: function () {
                }, applyMatrix: function (t) {
                    this.matrix.multiplyMatrices(t, this.matrix), this.matrix.decompose(this.position, this.quaternion, this.scale)
                }, applyQuaternion: function (t) {
                    return this.quaternion.premultiply(t), this
                }, setRotationFromAxisAngle: function (t, e) {
                    this.quaternion.setFromAxisAngle(t, e)
                }, setRotationFromEuler: function (t) {
                    this.quaternion.setFromEuler(t, !0)
                }, setRotationFromMatrix: function (t) {
                    this.quaternion.setFromRotationMatrix(t)
                }, setRotationFromQuaternion: function (t) {
                    this.quaternion.copy(t)
                }, rotateOnAxis: (yn = new Ue, function (t, e) {
                    return yn.setFromAxisAngle(t, e), this.quaternion.multiply(yn), this
                }), rotateOnWorldAxis: function () {
                    var t = new Ue;
                    return function (e, n) {
                        return t.setFromAxisAngle(e, n), this.quaternion.premultiply(t), this
                    }
                }(), rotateX: function () {
                    var t = new He(1, 0, 0);
                    return function (e) {
                        return this.rotateOnAxis(t, e)
                    }
                }(), rotateY: function () {
                    var t = new He(0, 1, 0);
                    return function (e) {
                        return this.rotateOnAxis(t, e)
                    }
                }(), rotateZ: function () {
                    var t = new He(0, 0, 1);
                    return function (e) {
                        return this.rotateOnAxis(t, e)
                    }
                }(), translateOnAxis: function () {
                    var t = new He;
                    return function (e, n) {
                        return t.copy(e).applyQuaternion(this.quaternion), this.position.add(t.multiplyScalar(n)), this
                    }
                }(), translateX: function () {
                    var t = new He(1, 0, 0);
                    return function (e) {
                        return this.translateOnAxis(t, e)
                    }
                }(), translateY: function () {
                    var t = new He(0, 1, 0);
                    return function (e) {
                        return this.translateOnAxis(t, e)
                    }
                }(), translateZ: function () {
                    var t = new He(0, 0, 1);
                    return function (e) {
                        return this.translateOnAxis(t, e)
                    }
                }(), localToWorld: function (t) {
                    return t.applyMatrix4(this.matrixWorld)
                }, worldToLocal: (gn = new ze, function (t) {
                    return t.applyMatrix4(gn.getInverse(this.matrixWorld))
                }), lookAt: function () {
                    var t = new Ue, e = new ze, n = new He, i = new He;
                    return function (r, o, a) {
                        r.isVector3 ? n.copy(r) : n.set(r, o, a);
                        var s = this.parent;
                        this.updateWorldMatrix(!0, !1), i.setFromMatrixPosition(this.matrixWorld), this.isCamera ? e.lookAt(i, n, this.up) : e.lookAt(n, i, this.up), this.quaternion.setFromRotationMatrix(e), s && (e.extractRotation(s.matrixWorld), t.setFromRotationMatrix(e), this.quaternion.premultiply(t.inverse()))
                    }
                }(), add: function (t) {
                    if (arguments.length > 1) {
                        for (var e = 0; e < arguments.length; e++) this.add(arguments[e]);
                        return this
                    }
                    return t === this ? (console.error("THREE.Object3D.add: object can't be added as a child of itself.", t), this) : (t && t.isObject3D ? (null !== t.parent && t.parent.remove(t), t.parent = this, t.dispatchEvent({type: "added"}), this.children.push(t)) : console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.", t), this)
                }, remove: function (t) {
                    if (arguments.length > 1) {
                        for (var e = 0; e < arguments.length; e++) this.remove(arguments[e]);
                        return this
                    }
                    var n = this.children.indexOf(t);
                    return -1 !== n && (t.parent = null, t.dispatchEvent({type: "removed"}), this.children.splice(n, 1)), this
                }, getObjectById: function (t) {
                    return this.getObjectByProperty("id", t)
                }, getObjectByName: function (t) {
                    return this.getObjectByProperty("name", t)
                }, getObjectByProperty: function (t, e) {
                    if (this[t] === e) return this;
                    for (var n = 0, i = this.children.length; n < i; n++) {
                        var r = this.children[n].getObjectByProperty(t, e);
                        if (void 0 !== r) return r
                    }
                }, getWorldPosition: function (t) {
                    return void 0 === t && (console.warn("THREE.Object3D: .getWorldPosition() target is now required"), t = new He), this.updateMatrixWorld(!0), t.setFromMatrixPosition(this.matrixWorld)
                }, getWorldQuaternion: (mn = new He, vn = new He, function (t) {
                    return void 0 === t && (console.warn("THREE.Object3D: .getWorldQuaternion() target is now required"), t = new Ue), this.updateMatrixWorld(!0), this.matrixWorld.decompose(mn, t, vn), t
                }), getWorldScale: function () {
                    var t = new He, e = new Ue;
                    return function (n) {
                        return void 0 === n && (console.warn("THREE.Object3D: .getWorldScale() target is now required"), n = new He), this.updateMatrixWorld(!0), this.matrixWorld.decompose(t, e, n), n
                    }
                }(), getWorldDirection: function (t) {
                    void 0 === t && (console.warn("THREE.Object3D: .getWorldDirection() target is now required"), t = new He), this.updateMatrixWorld(!0);
                    var e = this.matrixWorld.elements;
                    return t.set(e[8], e[9], e[10]).normalize()
                }, raycast: function () {
                }, traverse: function (t) {
                    t(this);
                    for (var e = this.children, n = 0, i = e.length; n < i; n++) e[n].traverse(t)
                }, traverseVisible: function (t) {
                    if (!1 !== this.visible) {
                        t(this);
                        for (var e = this.children, n = 0, i = e.length; n < i; n++) e[n].traverseVisible(t)
                    }
                }, traverseAncestors: function (t) {
                    var e = this.parent;
                    null !== e && (t(e), e.traverseAncestors(t))
                }, updateMatrix: function () {
                    this.matrix.compose(this.position, this.quaternion, this.scale), this.matrixWorldNeedsUpdate = !0
                }, updateMatrixWorld: function (t) {
                    this.matrixAutoUpdate && this.updateMatrix(), (this.matrixWorldNeedsUpdate || t) && (null === this.parent ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix), this.matrixWorldNeedsUpdate = !1, t = !0);
                    for (var e = this.children, n = 0, i = e.length; n < i; n++) e[n].updateMatrixWorld(t)
                }, updateWorldMatrix: function (t, e) {
                    var n = this.parent;
                    if (!0 === t && null !== n && n.updateWorldMatrix(!0, !1), this.matrixAutoUpdate && this.updateMatrix(), null === this.parent ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix), !0 === e) for (var i = this.children, r = 0, o = i.length; r < o; r++) i[r].updateWorldMatrix(!1, !0)
                }, toJSON: function (t) {
                    var e = void 0 === t || "string" == typeof t, n = {};
                    e && (t = {
                        geometries: {},
                        materials: {},
                        textures: {},
                        images: {},
                        shapes: {}
                    }, n.metadata = {version: 4.5, type: "Object", generator: "Object3D.toJSON"});
                    var i = {};

                    function r(e, n) {
                        return void 0 === e[n.uuid] && (e[n.uuid] = n.toJSON(t)), n.uuid
                    }

                    if (i.uuid = this.uuid, i.type = this.type, "" !== this.name && (i.name = this.name), !0 === this.castShadow && (i.castShadow = !0), !0 === this.receiveShadow && (i.receiveShadow = !0), !1 === this.visible && (i.visible = !1), !1 === this.frustumCulled && (i.frustumCulled = !1), 0 !== this.renderOrder && (i.renderOrder = this.renderOrder), "{}" !== JSON.stringify(this.userData) && (i.userData = this.userData), i.layers = this.layers.mask, i.matrix = this.matrix.toArray(), !1 === this.matrixAutoUpdate && (i.matrixAutoUpdate = !1), this.isMesh || this.isLine || this.isPoints) {
                        i.geometry = r(t.geometries, this.geometry);
                        var o = this.geometry.parameters;
                        if (void 0 !== o && void 0 !== o.shapes) {
                            var a = o.shapes;
                            if (Array.isArray(a)) for (var s = 0, h = a.length; s < h; s++) {
                                r(t.shapes, a[s])
                            } else r(t.shapes, a)
                        }
                    }
                    if (void 0 !== this.material) if (Array.isArray(this.material)) {
                        var c = [];
                        for (s = 0, h = this.material.length; s < h; s++) c.push(r(t.materials, this.material[s]));
                        i.material = c
                    } else i.material = r(t.materials, this.material);
                    if (this.children.length > 0) {
                        i.children = [];
                        for (s = 0; s < this.children.length; s++) i.children.push(this.children[s].toJSON(t).object)
                    }
                    if (e) {
                        var u = d(t.geometries), l = d(t.materials), f = d(t.textures), p = d(t.images);
                        a = d(t.shapes);
                        u.length > 0 && (n.geometries = u), l.length > 0 && (n.materials = l), f.length > 0 && (n.textures = f), p.length > 0 && (n.images = p), a.length > 0 && (n.shapes = a)
                    }
                    return n.object = i, n;

                    function d(t) {
                        var e = [];
                        for (var n in t) {
                            var i = t[n];
                            delete i.metadata, e.push(i)
                        }
                        return e
                    }
                }, clone: function (t) {
                    return (new this.constructor).copy(this, t)
                }, copy: function (t, e) {
                    if (void 0 === e && (e = !0), this.name = t.name, this.up.copy(t.up), this.position.copy(t.position), this.quaternion.copy(t.quaternion), this.scale.copy(t.scale), this.matrix.copy(t.matrix), this.matrixWorld.copy(t.matrixWorld), this.matrixAutoUpdate = t.matrixAutoUpdate, this.matrixWorldNeedsUpdate = t.matrixWorldNeedsUpdate, this.layers.mask = t.layers.mask, this.visible = t.visible, this.castShadow = t.castShadow, this.receiveShadow = t.receiveShadow, this.frustumCulled = t.frustumCulled, this.renderOrder = t.renderOrder, this.userData = JSON.parse(JSON.stringify(t.userData)), !0 === e) for (var n = 0; n < t.children.length; n++) {
                        this.add(t.children[n].clone())
                    }
                    return this
                }
            });
            var Mn, _n, En = 0;

            function Sn() {
                Object.defineProperty(this, "id", {value: En += 2}), this.uuid = Pe.generateUUID(), this.name = "", this.type = "Geometry", this.vertices = [], this.colors = [], this.faces = [], this.faceVertexUvs = [[]], this.morphTargets = [], this.morphNormals = [], this.skinWeights = [], this.skinIndices = [], this.lineDistances = [], this.boundingBox = null, this.boundingSphere = null, this.elementsNeedUpdate = !1, this.verticesNeedUpdate = !1, this.uvsNeedUpdate = !1, this.normalsNeedUpdate = !1, this.colorsNeedUpdate = !1, this.lineDistancesNeedUpdate = !1, this.groupsNeedUpdate = !1
            }

            function bn(t, e, n) {
                if (Array.isArray(t)) throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");
                this.name = "", this.array = t, this.itemSize = e, this.count = void 0 !== t ? t.length / e : 0, this.normalized = !0 === n, this.dynamic = !1, this.updateRange = {
                    offset: 0,
                    count: -1
                }, this.version = 0
            }

            function Tn(t, e, n) {
                bn.call(this, new Int8Array(t), e, n)
            }

            function Ln(t, e, n) {
                bn.call(this, new Uint8Array(t), e, n)
            }

            function Cn(t, e, n) {
                bn.call(this, new Uint8ClampedArray(t), e, n)
            }

            function Rn(t, e, n) {
                bn.call(this, new Int16Array(t), e, n)
            }

            function An(t, e, n) {
                bn.call(this, new Uint16Array(t), e, n)
            }

            function Pn(t, e, n) {
                bn.call(this, new Int32Array(t), e, n)
            }

            function Nn(t, e, n) {
                bn.call(this, new Uint32Array(t), e, n)
            }

            function zn(t, e, n) {
                bn.call(this, new Float32Array(t), e, n)
            }

            function Un(t, e, n) {
                bn.call(this, new Float64Array(t), e, n)
            }

            function Hn() {
                this.vertices = [], this.normals = [], this.colors = [], this.uvs = [], this.uvs2 = [], this.groups = [], this.morphTargets = {}, this.skinWeights = [], this.skinIndices = [], this.boundingBox = null, this.boundingSphere = null, this.verticesNeedUpdate = !1, this.normalsNeedUpdate = !1, this.colorsNeedUpdate = !1, this.uvsNeedUpdate = !1, this.groupsNeedUpdate = !1
            }

            function Gn(t) {
                if (0 === t.length) return -Infinity;
                for (var e = t[0], n = 1, i = t.length; n < i; ++n) t[n] > e && (e = t[n]);
                return e
            }

            Sn.prototype = Object.assign(Object.create(e.prototype), {
                constructor: Sn, isGeometry: !0, applyMatrix: function (t) {
                    for (var e = (new Ge).getNormalMatrix(t), n = 0, i = this.vertices.length; n < i; n++) {
                        this.vertices[n].applyMatrix4(t)
                    }
                    for (n = 0, i = this.faces.length; n < i; n++) {
                        var r = this.faces[n];
                        r.normal.applyMatrix3(e).normalize();
                        for (var o = 0, a = r.vertexNormals.length; o < a; o++) r.vertexNormals[o].applyMatrix3(e).normalize()
                    }
                    return null !== this.boundingBox && this.computeBoundingBox(), null !== this.boundingSphere && this.computeBoundingSphere(), this.verticesNeedUpdate = !0, this.normalsNeedUpdate = !0, this
                }, rotateX: function () {
                    var t = new ze;
                    return function (e) {
                        return t.makeRotationX(e), this.applyMatrix(t), this
                    }
                }(), rotateY: function () {
                    var t = new ze;
                    return function (e) {
                        return t.makeRotationY(e), this.applyMatrix(t), this
                    }
                }(), rotateZ: function () {
                    var t = new ze;
                    return function (e) {
                        return t.makeRotationZ(e), this.applyMatrix(t), this
                    }
                }(), translate: function () {
                    var t = new ze;
                    return function (e, n, i) {
                        return t.makeTranslation(e, n, i), this.applyMatrix(t), this
                    }
                }(), scale: function () {
                    var t = new ze;
                    return function (e, n, i) {
                        return t.makeScale(e, n, i), this.applyMatrix(t), this
                    }
                }(), lookAt: (_n = new xn, function (t) {
                    _n.lookAt(t), _n.updateMatrix(), this.applyMatrix(_n.matrix)
                }), fromBufferGeometry: function (t) {
                    var e = this, n = null !== t.index ? t.index.array : void 0, i = t.attributes, r = i.position.array,
                        o = void 0 !== i.normal ? i.normal.array : void 0,
                        a = void 0 !== i.color ? i.color.array : void 0, s = void 0 !== i.uv ? i.uv.array : void 0,
                        h = void 0 !== i.uv2 ? i.uv2.array : void 0;
                    void 0 !== h && (this.faceVertexUvs[1] = []);
                    for (var c = 0, u = 0; c < r.length; c += 3, u += 2) e.vertices.push((new He).fromArray(r, c)), void 0 !== a && e.colors.push((new an).fromArray(a, c));

                    function l(t, n, i, r) {
                        var c = void 0 === a ? [] : [e.colors[t].clone(), e.colors[n].clone(), e.colors[i].clone()],
                            u = new fn(t, n, i, void 0 === o ? [] : [(new He).fromArray(o, 3 * t), (new He).fromArray(o, 3 * n), (new He).fromArray(o, 3 * i)], c, r);
                        e.faces.push(u), void 0 !== s && e.faceVertexUvs[0].push([(new Ne).fromArray(s, 2 * t), (new Ne).fromArray(s, 2 * n), (new Ne).fromArray(s, 2 * i)]), void 0 !== h && e.faceVertexUvs[1].push([(new Ne).fromArray(h, 2 * t), (new Ne).fromArray(h, 2 * n), (new Ne).fromArray(h, 2 * i)])
                    }

                    var f = t.groups;
                    if (f.length > 0) for (c = 0; c < f.length; c++) for (var p = f[c], d = p.start, m = (u = d, d + p.count); u < m; u += 3) void 0 !== n ? l(n[u], n[u + 1], n[u + 2], p.materialIndex) : l(u, u + 1, u + 2, p.materialIndex); else if (void 0 !== n) for (c = 0; c < n.length; c += 3) l(n[c], n[c + 1], n[c + 2]); else for (c = 0; c < r.length / 3; c += 3) l(c, c + 1, c + 2);
                    return this.computeFaceNormals(), null !== t.boundingBox && (this.boundingBox = t.boundingBox.clone()), null !== t.boundingSphere && (this.boundingSphere = t.boundingSphere.clone()), this
                }, center: (Mn = new He, function () {
                    return this.computeBoundingBox(), this.boundingBox.getCenter(Mn).negate(), this.translate(Mn.x, Mn.y, Mn.z), this
                }), normalize: function () {
                    this.computeBoundingSphere();
                    var t = this.boundingSphere.center, e = this.boundingSphere.radius, n = 0 === e ? 1 : 1 / e,
                        i = new ze;
                    return i.set(n, 0, 0, -n * t.x, 0, n, 0, -n * t.y, 0, 0, n, -n * t.z, 0, 0, 0, 1), this.applyMatrix(i), this
                }, computeFaceNormals: function () {
                    for (var t = new He, e = new He, n = 0, i = this.faces.length; n < i; n++) {
                        var r = this.faces[n], o = this.vertices[r.a], a = this.vertices[r.b];
                        t.subVectors(this.vertices[r.c], a), e.subVectors(o, a), t.cross(e), t.normalize(), r.normal.copy(t)
                    }
                }, computeVertexNormals: function (t) {
                    var e, n, i, r, o, a;
                    for (void 0 === t && (t = !0), a = new Array(this.vertices.length), e = 0, n = this.vertices.length; e < n; e++) a[e] = new He;
                    if (t) {
                        var s, h, c = new He, u = new He;
                        for (i = 0, r = this.faces.length; i < r; i++) s = this.vertices[(o = this.faces[i]).a], c.subVectors(this.vertices[o.c], h = this.vertices[o.b]), u.subVectors(s, h), c.cross(u), a[o.a].add(c), a[o.b].add(c), a[o.c].add(c)
                    } else for (this.computeFaceNormals(), i = 0, r = this.faces.length; i < r; i++) a[(o = this.faces[i]).a].add(o.normal), a[o.b].add(o.normal), a[o.c].add(o.normal);
                    for (e = 0, n = this.vertices.length; e < n; e++) a[e].normalize();
                    for (i = 0, r = this.faces.length; i < r; i++) {
                        var l = (o = this.faces[i]).vertexNormals;
                        3 === l.length ? (l[0].copy(a[o.a]), l[1].copy(a[o.b]), l[2].copy(a[o.c])) : (l[0] = a[o.a].clone(), l[1] = a[o.b].clone(), l[2] = a[o.c].clone())
                    }
                    this.faces.length > 0 && (this.normalsNeedUpdate = !0)
                }, computeFlatVertexNormals: function () {
                    var t, e, n;
                    for (this.computeFaceNormals(), t = 0, e = this.faces.length; t < e; t++) {
                        var i = (n = this.faces[t]).vertexNormals;
                        3 === i.length ? (i[0].copy(n.normal), i[1].copy(n.normal), i[2].copy(n.normal)) : (i[0] = n.normal.clone(), i[1] = n.normal.clone(), i[2] = n.normal.clone())
                    }
                    this.faces.length > 0 && (this.normalsNeedUpdate = !0)
                }, computeMorphNormals: function () {
                    var t, e, n, i, r;
                    for (n = 0, i = this.faces.length; n < i; n++) for ((r = this.faces[n]).__originalFaceNormal ? r.__originalFaceNormal.copy(r.normal) : r.__originalFaceNormal = r.normal.clone(), r.__originalVertexNormals || (r.__originalVertexNormals = []), t = 0, e = r.vertexNormals.length; t < e; t++) r.__originalVertexNormals[t] ? r.__originalVertexNormals[t].copy(r.vertexNormals[t]) : r.__originalVertexNormals[t] = r.vertexNormals[t].clone();
                    var o = new Sn;
                    for (o.faces = this.faces, t = 0, e = this.morphTargets.length; t < e; t++) {
                        if (!this.morphNormals[t]) {
                            this.morphNormals[t] = {}, this.morphNormals[t].faceNormals = [], this.morphNormals[t].vertexNormals = [];
                            var a = this.morphNormals[t].faceNormals, s = this.morphNormals[t].vertexNormals;
                            for (n = 0, i = this.faces.length; n < i; n++) h = new He, c = {
                                a: new He,
                                b: new He,
                                c: new He
                            }, a.push(h), s.push(c)
                        }
                        var h, c, u = this.morphNormals[t];
                        for (o.vertices = this.morphTargets[t].vertices, o.computeFaceNormals(), o.computeVertexNormals(), n = 0, i = this.faces.length; n < i; n++) c = u.vertexNormals[n], (h = u.faceNormals[n]).copy((r = this.faces[n]).normal), c.a.copy(r.vertexNormals[0]), c.b.copy(r.vertexNormals[1]), c.c.copy(r.vertexNormals[2])
                    }
                    for (n = 0, i = this.faces.length; n < i; n++) (r = this.faces[n]).normal = r.__originalFaceNormal, r.vertexNormals = r.__originalVertexNormals
                }, computeBoundingBox: function () {
                    null === this.boundingBox && (this.boundingBox = new Qe), this.boundingBox.setFromPoints(this.vertices)
                }, computeBoundingSphere: function () {
                    null === this.boundingSphere && (this.boundingSphere = new Ke), this.boundingSphere.setFromPoints(this.vertices)
                }, merge: function (t, e, n) {
                    if (t && t.isGeometry) {
                        var i, r = this.vertices.length, o = this.vertices, a = t.vertices, s = this.faces, h = t.faces,
                            c = this.faceVertexUvs[0], u = t.faceVertexUvs[0], l = this.colors, f = t.colors;
                        void 0 === n && (n = 0), void 0 !== e && (i = (new Ge).getNormalMatrix(e));
                        for (var p = 0, d = a.length; p < d; p++) {
                            var m = a[p].clone();
                            void 0 !== e && m.applyMatrix4(e), o.push(m)
                        }
                        for (p = 0, d = f.length; p < d; p++) l.push(f[p].clone());
                        for (p = 0, d = h.length; p < d; p++) {
                            var v, g, y = h[p], w = y.vertexNormals, x = y.vertexColors;
                            (v = new fn(y.a + r, y.b + r, y.c + r)).normal.copy(y.normal), void 0 !== i && v.normal.applyMatrix3(i).normalize();
                            for (var M = 0, _ = w.length; M < _; M++) g = w[M].clone(), void 0 !== i && g.applyMatrix3(i).normalize(), v.vertexNormals.push(g);
                            v.color.copy(y.color);
                            for (M = 0, _ = x.length; M < _; M++) v.vertexColors.push(x[M].clone());
                            v.materialIndex = y.materialIndex + n, s.push(v)
                        }
                        for (p = 0, d = u.length; p < d; p++) {
                            var E = u[p], S = [];
                            if (void 0 !== E) {
                                for (M = 0, _ = E.length; M < _; M++) S.push(E[M].clone());
                                c.push(S)
                            }
                        }
                    } else console.error("THREE.Geometry.merge(): geometry not an instance of THREE.Geometry.", t)
                }, mergeMesh: function (t) {
                    t && t.isMesh ? (t.matrixAutoUpdate && t.updateMatrix(), this.merge(t.geometry, t.matrix)) : console.error("THREE.Geometry.mergeMesh(): mesh not an instance of THREE.Mesh.", t)
                }, mergeVertices: function () {
                    var t, e, n, i, r, o, a, s, h = {}, c = [], u = [], l = Math.pow(10, 4);
                    for (n = 0, i = this.vertices.length; n < i; n++) t = this.vertices[n], void 0 === h[e = Math.round(t.x * l) + "_" + Math.round(t.y * l) + "_" + Math.round(t.z * l)] ? (h[e] = n, c.push(this.vertices[n]), u[n] = c.length - 1) : u[n] = u[h[e]];
                    var f = [];
                    for (n = 0, i = this.faces.length; n < i; n++) {
                        (r = this.faces[n]).a = u[r.a], r.b = u[r.b], r.c = u[r.c], o = [r.a, r.b, r.c];
                        for (var p = 0; p < 3; p++) if (o[p] === o[(p + 1) % 3]) {
                            f.push(n);
                            break
                        }
                    }
                    for (n = f.length - 1; n >= 0; n--) {
                        var d = f[n];
                        for (this.faces.splice(d, 1), a = 0, s = this.faceVertexUvs.length; a < s; a++) this.faceVertexUvs[a].splice(d, 1)
                    }
                    var m = this.vertices.length - c.length;
                    return this.vertices = c, m
                }, setFromPoints: function (t) {
                    this.vertices = [];
                    for (var e = 0, n = t.length; e < n; e++) {
                        var i = t[e];
                        this.vertices.push(new He(i.x, i.y, i.z || 0))
                    }
                    return this
                }, sortFacesByMaterialIndex: function () {
                    for (var t = this.faces, e = t.length, n = 0; n < e; n++) t[n]._id = n;
                    t.sort(function (t, e) {
                        return t.materialIndex - e.materialIndex
                    });
                    var i, r, o = this.faceVertexUvs[0], a = this.faceVertexUvs[1];
                    o && o.length === e && (i = []), a && a.length === e && (r = []);
                    for (n = 0; n < e; n++) {
                        var s = t[n]._id;
                        i && i.push(o[s]), r && r.push(a[s])
                    }
                    i && (this.faceVertexUvs[0] = i), r && (this.faceVertexUvs[1] = r)
                }, toJSON: function () {
                    var t = {metadata: {version: 4.5, type: "Geometry", generator: "Geometry.toJSON"}};
                    if (t.uuid = this.uuid, t.type = this.type, "" !== this.name && (t.name = this.name), void 0 !== this.parameters) {
                        var e = this.parameters;
                        for (var n in e) void 0 !== e[n] && (t[n] = e[n]);
                        return t
                    }
                    for (var i = [], r = 0; r < this.vertices.length; r++) {
                        var o = this.vertices[r];
                        i.push(o.x, o.y, o.z)
                    }
                    var a = [], s = [], h = {}, c = [], u = {}, l = [], f = {};
                    for (r = 0; r < this.faces.length; r++) {
                        var p = this.faces[r], d = void 0 !== this.faceVertexUvs[0][r], m = p.normal.length() > 0,
                            v = p.vertexNormals.length > 0, g = 1 !== p.color.r || 1 !== p.color.g || 1 !== p.color.b,
                            y = p.vertexColors.length > 0, w = 0;
                        if (w = E(w, 0, 0), w = E(w, 1, !0), w = E(w, 2, !1), w = E(w, 3, d), w = E(w, 4, m), w = E(w, 5, v), w = E(w, 6, g), w = E(w, 7, y), a.push(w), a.push(p.a, p.b, p.c), a.push(p.materialIndex), d) {
                            var x = this.faceVertexUvs[0][r];
                            a.push(T(x[0]), T(x[1]), T(x[2]))
                        }
                        if (m && a.push(S(p.normal)), v) {
                            var M = p.vertexNormals;
                            a.push(S(M[0]), S(M[1]), S(M[2]))
                        }
                        if (g && a.push(b(p.color)), y) {
                            var _ = p.vertexColors;
                            a.push(b(_[0]), b(_[1]), b(_[2]))
                        }
                    }

                    function E(t, e, n) {
                        return n ? t | 1 << e : t & ~(1 << e)
                    }

                    function S(t) {
                        var e = t.x.toString() + t.y.toString() + t.z.toString();
                        return void 0 !== h[e] ? h[e] : (h[e] = s.length / 3, s.push(t.x, t.y, t.z), h[e])
                    }

                    function b(t) {
                        var e = t.r.toString() + t.g.toString() + t.b.toString();
                        return void 0 !== u[e] ? u[e] : (u[e] = c.length, c.push(t.getHex()), u[e])
                    }

                    function T(t) {
                        var e = t.x.toString() + t.y.toString();
                        return void 0 !== f[e] ? f[e] : (f[e] = l.length / 2, l.push(t.x, t.y), f[e])
                    }

                    return t.data = {}, t.data.vertices = i, t.data.normals = s, c.length > 0 && (t.data.colors = c), l.length > 0 && (t.data.uvs = [l]), t.data.faces = a, t
                }, clone: function () {
                    return (new Sn).copy(this)
                }, copy: function (t) {
                    var e, n, i, r, o, a;
                    this.vertices = [], this.colors = [], this.faces = [], this.faceVertexUvs = [[]], this.morphTargets = [], this.morphNormals = [], this.skinWeights = [], this.skinIndices = [], this.lineDistances = [], this.boundingBox = null, this.boundingSphere = null, this.name = t.name;
                    var s = t.vertices;
                    for (e = 0, n = s.length; e < n; e++) this.vertices.push(s[e].clone());
                    var h = t.colors;
                    for (e = 0, n = h.length; e < n; e++) this.colors.push(h[e].clone());
                    var c = t.faces;
                    for (e = 0, n = c.length; e < n; e++) this.faces.push(c[e].clone());
                    for (e = 0, n = t.faceVertexUvs.length; e < n; e++) {
                        var u = t.faceVertexUvs[e];
                        for (void 0 === this.faceVertexUvs[e] && (this.faceVertexUvs[e] = []), i = 0, r = u.length; i < r; i++) {
                            var l = u[i], f = [];
                            for (o = 0, a = l.length; o < a; o++) {
                                f.push(l[o].clone())
                            }
                            this.faceVertexUvs[e].push(f)
                        }
                    }
                    var p = t.morphTargets;
                    for (e = 0, n = p.length; e < n; e++) {
                        var d = {};
                        if (d.name = p[e].name, void 0 !== p[e].vertices) for (d.vertices = [], i = 0, r = p[e].vertices.length; i < r; i++) d.vertices.push(p[e].vertices[i].clone());
                        if (void 0 !== p[e].normals) for (d.normals = [], i = 0, r = p[e].normals.length; i < r; i++) d.normals.push(p[e].normals[i].clone());
                        this.morphTargets.push(d)
                    }
                    var m = t.morphNormals;
                    for (e = 0, n = m.length; e < n; e++) {
                        var v = {};
                        if (void 0 !== m[e].vertexNormals) for (v.vertexNormals = [], i = 0, r = m[e].vertexNormals.length; i < r; i++) {
                            var g = m[e].vertexNormals[i], y = {};
                            y.a = g.a.clone(), y.b = g.b.clone(), y.c = g.c.clone(), v.vertexNormals.push(y)
                        }
                        if (void 0 !== m[e].faceNormals) for (v.faceNormals = [], i = 0, r = m[e].faceNormals.length; i < r; i++) v.faceNormals.push(m[e].faceNormals[i].clone());
                        this.morphNormals.push(v)
                    }
                    var w = t.skinWeights;
                    for (e = 0, n = w.length; e < n; e++) this.skinWeights.push(w[e].clone());
                    var x = t.skinIndices;
                    for (e = 0, n = x.length; e < n; e++) this.skinIndices.push(x[e].clone());
                    var M = t.lineDistances;
                    for (e = 0, n = M.length; e < n; e++) this.lineDistances.push(M[e]);
                    var _ = t.boundingBox;
                    null !== _ && (this.boundingBox = _.clone());
                    var E = t.boundingSphere;
                    return null !== E && (this.boundingSphere = E.clone()), this.elementsNeedUpdate = t.elementsNeedUpdate, this.verticesNeedUpdate = t.verticesNeedUpdate, this.uvsNeedUpdate = t.uvsNeedUpdate, this.normalsNeedUpdate = t.normalsNeedUpdate, this.colorsNeedUpdate = t.colorsNeedUpdate, this.lineDistancesNeedUpdate = t.lineDistancesNeedUpdate, this.groupsNeedUpdate = t.groupsNeedUpdate, this
                }, dispose: function () {
                    this.dispatchEvent({type: "dispose"})
                }
            }), Object.defineProperty(bn.prototype, "needsUpdate", {
                set: function (t) {
                    !0 === t && this.version++
                }
            }), Object.assign(bn.prototype, {
                isBufferAttribute: !0, onUploadCallback: function () {
                }, setArray: function (t) {
                    if (Array.isArray(t)) throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");
                    return this.count = void 0 !== t ? t.length / this.itemSize : 0, this.array = t, this
                }, setDynamic: function (t) {
                    return this.dynamic = t, this
                }, copy: function (t) {
                    return this.name = t.name, this.array = new t.array.constructor(t.array), this.itemSize = t.itemSize, this.count = t.count, this.normalized = t.normalized, this.dynamic = t.dynamic, this
                }, copyAt: function (t, e, n) {
                    t *= this.itemSize, n *= e.itemSize;
                    for (var i = 0, r = this.itemSize; i < r; i++) this.array[t + i] = e.array[n + i];
                    return this
                }, copyArray: function (t) {
                    return this.array.set(t), this
                }, copyColorsArray: function (t) {
                    for (var e = this.array, n = 0, i = 0, r = t.length; i < r; i++) {
                        var o = t[i];
                        void 0 === o && (console.warn("THREE.BufferAttribute.copyColorsArray(): color is undefined", i), o = new an), e[n++] = o.r, e[n++] = o.g, e[n++] = o.b
                    }
                    return this
                }, copyVector2sArray: function (t) {
                    for (var e = this.array, n = 0, i = 0, r = t.length; i < r; i++) {
                        var o = t[i];
                        void 0 === o && (console.warn("THREE.BufferAttribute.copyVector2sArray(): vector is undefined", i), o = new Ne), e[n++] = o.x, e[n++] = o.y
                    }
                    return this
                }, copyVector3sArray: function (t) {
                    for (var e = this.array, n = 0, i = 0, r = t.length; i < r; i++) {
                        var o = t[i];
                        void 0 === o && (console.warn("THREE.BufferAttribute.copyVector3sArray(): vector is undefined", i), o = new He), e[n++] = o.x, e[n++] = o.y, e[n++] = o.z
                    }
                    return this
                }, copyVector4sArray: function (t) {
                    for (var e = this.array, n = 0, i = 0, r = t.length; i < r; i++) {
                        var o = t[i];
                        void 0 === o && (console.warn("THREE.BufferAttribute.copyVector4sArray(): vector is undefined", i), o = new Xe), e[n++] = o.x, e[n++] = o.y, e[n++] = o.z, e[n++] = o.w
                    }
                    return this
                }, set: function (t, e) {
                    return void 0 === e && (e = 0), this.array.set(t, e), this
                }, getX: function (t) {
                    return this.array[t * this.itemSize]
                }, setX: function (t, e) {
                    return this.array[t * this.itemSize] = e, this
                }, getY: function (t) {
                    return this.array[t * this.itemSize + 1]
                }, setY: function (t, e) {
                    return this.array[t * this.itemSize + 1] = e, this
                }, getZ: function (t) {
                    return this.array[t * this.itemSize + 2]
                }, setZ: function (t, e) {
                    return this.array[t * this.itemSize + 2] = e, this
                }, getW: function (t) {
                    return this.array[t * this.itemSize + 3]
                }, setW: function (t, e) {
                    return this.array[t * this.itemSize + 3] = e, this
                }, setXY: function (t, e, n) {
                    return this.array[(t *= this.itemSize) + 0] = e, this.array[t + 1] = n, this
                }, setXYZ: function (t, e, n, i) {
                    return this.array[(t *= this.itemSize) + 0] = e, this.array[t + 1] = n, this.array[t + 2] = i, this
                }, setXYZW: function (t, e, n, i, r) {
                    return this.array[(t *= this.itemSize) + 0] = e, this.array[t + 1] = n, this.array[t + 2] = i, this.array[t + 3] = r, this
                }, onUpload: function (t) {
                    return this.onUploadCallback = t, this
                }, clone: function () {
                    return new this.constructor(this.array, this.itemSize).copy(this)
                }
            }), (Tn.prototype = Object.create(bn.prototype)).constructor = Tn, (Ln.prototype = Object.create(bn.prototype)).constructor = Ln, (Cn.prototype = Object.create(bn.prototype)).constructor = Cn, (Rn.prototype = Object.create(bn.prototype)).constructor = Rn, (An.prototype = Object.create(bn.prototype)).constructor = An, (Pn.prototype = Object.create(bn.prototype)).constructor = Pn, (Nn.prototype = Object.create(bn.prototype)).constructor = Nn, (zn.prototype = Object.create(bn.prototype)).constructor = zn, (Un.prototype = Object.create(bn.prototype)).constructor = Un, Object.assign(Hn.prototype, {
                computeGroups: function (t) {
                    for (var e, n = [], i = void 0, r = t.faces, o = 0; o < r.length; o++) {
                        var a = r[o];
                        a.materialIndex !== i && (i = a.materialIndex, void 0 !== e && (e.count = 3 * o - e.start, n.push(e)), e = {
                            start: 3 * o,
                            materialIndex: i
                        })
                    }
                    void 0 !== e && (e.count = 3 * o - e.start, n.push(e)), this.groups = n
                }, fromGeometry: function (t) {
                    var e, n = t.faces, i = t.vertices, r = t.faceVertexUvs, o = r[0] && r[0].length > 0,
                        a = r[1] && r[1].length > 0, s = t.morphTargets, h = s.length;
                    if (h > 0) {
                        e = [];
                        for (var c = 0; c < h; c++) e[c] = {name: s[c].name, data: []};
                        this.morphTargets.position = e
                    }
                    var u, l = t.morphNormals, f = l.length;
                    if (f > 0) {
                        u = [];
                        for (c = 0; c < f; c++) u[c] = {name: l[c].name, data: []};
                        this.morphTargets.normal = u
                    }
                    var p = t.skinIndices, d = t.skinWeights, m = p.length === i.length, v = d.length === i.length;
                    i.length > 0 && 0 === n.length && console.error("THREE.DirectGeometry: Faceless geometries are not supported.");
                    for (c = 0; c < n.length; c++) {
                        var g = n[c];
                        this.vertices.push(i[g.a], i[g.b], i[g.c]);
                        var y = g.vertexNormals;
                        if (3 === y.length) this.normals.push(y[0], y[1], y[2]); else {
                            var w = g.normal;
                            this.normals.push(w, w, w)
                        }
                        var x, M = g.vertexColors;
                        if (3 === M.length) this.colors.push(M[0], M[1], M[2]); else {
                            var _ = g.color;
                            this.colors.push(_, _, _)
                        }
                        if (!0 === o) void 0 !== (x = r[0][c]) ? this.uvs.push(x[0], x[1], x[2]) : (console.warn("THREE.DirectGeometry.fromGeometry(): Undefined vertexUv ", c), this.uvs.push(new Ne, new Ne, new Ne));
                        if (!0 === a) void 0 !== (x = r[1][c]) ? this.uvs2.push(x[0], x[1], x[2]) : (console.warn("THREE.DirectGeometry.fromGeometry(): Undefined vertexUv2 ", c), this.uvs2.push(new Ne, new Ne, new Ne));
                        for (var E = 0; E < h; E++) {
                            var S = s[E].vertices;
                            e[E].data.push(S[g.a], S[g.b], S[g.c])
                        }
                        for (E = 0; E < f; E++) {
                            var b = l[E].vertexNormals[c];
                            u[E].data.push(b.a, b.b, b.c)
                        }
                        m && this.skinIndices.push(p[g.a], p[g.b], p[g.c]), v && this.skinWeights.push(d[g.a], d[g.b], d[g.c])
                    }
                    return this.computeGroups(t), this.verticesNeedUpdate = t.verticesNeedUpdate, this.normalsNeedUpdate = t.normalsNeedUpdate, this.colorsNeedUpdate = t.colorsNeedUpdate, this.uvsNeedUpdate = t.uvsNeedUpdate, this.groupsNeedUpdate = t.groupsNeedUpdate, this
                }
            });
            var On = 1;

            function In() {
                Object.defineProperty(this, "id", {value: On += 2}), this.uuid = Pe.generateUUID(), this.name = "", this.type = "BufferGeometry", this.index = null, this.attributes = {}, this.morphAttributes = {}, this.groups = [], this.boundingBox = null, this.boundingSphere = null, this.drawRange = {
                    start: 0,
                    count: Infinity
                }, this.userData = {}
            }

            function Fn(t, e, n, i, r, o) {
                Sn.call(this), this.type = "BoxGeometry", this.parameters = {
                    width: t,
                    height: e,
                    depth: n,
                    widthSegments: i,
                    heightSegments: r,
                    depthSegments: o
                }, this.fromBufferGeometry(new Bn(t, e, n, i, r, o)), this.mergeVertices()
            }

            function Bn(t, e, n, i, r, o) {
                In.call(this), this.type = "BoxBufferGeometry", this.parameters = {
                    width: t,
                    height: e,
                    depth: n,
                    widthSegments: i,
                    heightSegments: r,
                    depthSegments: o
                };
                var a = this;
                t = t || 1, e = e || 1, n = n || 1, i = Math.floor(i) || 1, r = Math.floor(r) || 1, o = Math.floor(o) || 1;
                var s = [], h = [], c = [], u = [], l = 0, f = 0;

                function p(t, e, n, i, r, o, p, d, m, v, g) {
                    var y, w, x = o / m, M = p / v, _ = o / 2, E = p / 2, S = d / 2, b = m + 1, T = v + 1, L = 0, C = 0,
                        R = new He;
                    for (w = 0; w < T; w++) {
                        var A = w * M - E;
                        for (y = 0; y < b; y++) {
                            R[t] = (y * x - _) * i, R[e] = A * r, R[n] = S, h.push(R.x, R.y, R.z), R[t] = 0, R[e] = 0, R[n] = d > 0 ? 1 : -1, c.push(R.x, R.y, R.z), u.push(y / m), u.push(1 - w / v), L += 1
                        }
                    }
                    for (w = 0; w < v; w++) for (y = 0; y < m; y++) {
                        var P = l + y + b * (w + 1), N = l + (y + 1) + b * (w + 1), z = l + (y + 1) + b * w;
                        s.push(l + y + b * w, P, z), s.push(P, N, z), C += 6
                    }
                    a.addGroup(f, C, g), f += C, l += L
                }

                p("z", "y", "x", -1, -1, n, e, t, o, r, 0), p("z", "y", "x", 1, -1, n, e, -t, o, r, 1), p("x", "z", "y", 1, 1, t, n, e, i, o, 2), p("x", "z", "y", 1, -1, t, n, -e, i, o, 3), p("x", "y", "z", 1, -1, t, e, n, i, r, 4), p("x", "y", "z", -1, -1, t, e, -n, i, r, 5), this.setIndex(s), this.addAttribute("position", new zn(h, 3)), this.addAttribute("normal", new zn(c, 3)), this.addAttribute("uv", new zn(u, 2))
            }

            function kn(t, e, n, i) {
                Sn.call(this), this.type = "PlaneGeometry", this.parameters = {
                    width: t,
                    height: e,
                    widthSegments: n,
                    heightSegments: i
                }, this.fromBufferGeometry(new Vn(t, e, n, i)), this.mergeVertices()
            }

            function Vn(t, e, n, i) {
                In.call(this), this.type = "PlaneBufferGeometry", this.parameters = {
                    width: t,
                    height: e,
                    widthSegments: n,
                    heightSegments: i
                };
                var r, o, a = (t = t || 1) / 2, s = (e = e || 1) / 2, h = Math.floor(n) || 1, c = Math.floor(i) || 1,
                    u = h + 1, l = c + 1, f = t / h, p = e / c, d = [], m = [], v = [], g = [];
                for (o = 0; o < l; o++) {
                    var y = o * p - s;
                    for (r = 0; r < u; r++) {
                        m.push(r * f - a, -y, 0), v.push(0, 0, 1), g.push(r / h), g.push(1 - o / c)
                    }
                }
                for (o = 0; o < c; o++) for (r = 0; r < h; r++) {
                    var w = r + u * (o + 1), x = r + 1 + u * (o + 1), M = r + 1 + u * o;
                    d.push(r + u * o, w, M), d.push(w, x, M)
                }
                this.setIndex(d), this.addAttribute("position", new zn(m, 3)), this.addAttribute("normal", new zn(v, 3)), this.addAttribute("uv", new zn(g, 2))
            }

            In.prototype = Object.assign(Object.create(e.prototype), {
                constructor: In, isBufferGeometry: !0, getIndex: function () {
                    return this.index
                }, setIndex: function (t) {
                    this.index = Array.isArray(t) ? new (Gn(t) > 65535 ? Nn : An)(t, 1) : t
                }, addAttribute: function (t, e) {
                    return e && e.isBufferAttribute || e && e.isInterleavedBufferAttribute ? "index" === t ? (console.warn("THREE.BufferGeometry.addAttribute: Use .setIndex() for index attribute."), this.setIndex(e), this) : (this.attributes[t] = e, this) : (console.warn("THREE.BufferGeometry: .addAttribute() now expects ( name, attribute )."), this.addAttribute(t, new bn(arguments[1], arguments[2])))
                }, getAttribute: function (t) {
                    return this.attributes[t]
                }, removeAttribute: function (t) {
                    return delete this.attributes[t], this
                }, addGroup: function (t, e, n) {
                    this.groups.push({start: t, count: e, materialIndex: void 0 !== n ? n : 0})
                }, clearGroups: function () {
                    this.groups = []
                }, setDrawRange: function (t, e) {
                    this.drawRange.start = t, this.drawRange.count = e
                }, applyMatrix: function (t) {
                    var e = this.attributes.position;
                    void 0 !== e && (t.applyToBufferAttribute(e), e.needsUpdate = !0);
                    var n = this.attributes.normal;
                    void 0 !== n && ((new Ge).getNormalMatrix(t).applyToBufferAttribute(n), n.needsUpdate = !0);
                    return null !== this.boundingBox && this.computeBoundingBox(), null !== this.boundingSphere && this.computeBoundingSphere(), this
                }, rotateX: function () {
                    var t = new ze;
                    return function (e) {
                        return t.makeRotationX(e), this.applyMatrix(t), this
                    }
                }(), rotateY: function () {
                    var t = new ze;
                    return function (e) {
                        return t.makeRotationY(e), this.applyMatrix(t), this
                    }
                }(), rotateZ: function () {
                    var t = new ze;
                    return function (e) {
                        return t.makeRotationZ(e), this.applyMatrix(t), this
                    }
                }(), translate: function () {
                    var t = new ze;
                    return function (e, n, i) {
                        return t.makeTranslation(e, n, i), this.applyMatrix(t), this
                    }
                }(), scale: function () {
                    var t = new ze;
                    return function (e, n, i) {
                        return t.makeScale(e, n, i), this.applyMatrix(t), this
                    }
                }(), lookAt: function () {
                    var t = new xn;
                    return function (e) {
                        t.lookAt(e), t.updateMatrix(), this.applyMatrix(t.matrix)
                    }
                }(), center: function () {
                    var t = new He;
                    return function () {
                        return this.computeBoundingBox(), this.boundingBox.getCenter(t).negate(), this.translate(t.x, t.y, t.z), this
                    }
                }(), setFromObject: function (t) {
                    var e = t.geometry;
                    if (t.isPoints || t.isLine) {
                        var n = new zn(3 * e.vertices.length, 3), i = new zn(3 * e.colors.length, 3);
                        if (this.addAttribute("position", n.copyVector3sArray(e.vertices)), this.addAttribute("color", i.copyColorsArray(e.colors)), e.lineDistances && e.lineDistances.length === e.vertices.length) {
                            var r = new zn(e.lineDistances.length, 1);
                            this.addAttribute("lineDistance", r.copyArray(e.lineDistances))
                        }
                        null !== e.boundingSphere && (this.boundingSphere = e.boundingSphere.clone()), null !== e.boundingBox && (this.boundingBox = e.boundingBox.clone())
                    } else t.isMesh && e && e.isGeometry && this.fromGeometry(e);
                    return this
                }, setFromPoints: function (t) {
                    for (var e = [], n = 0, i = t.length; n < i; n++) {
                        var r = t[n];
                        e.push(r.x, r.y, r.z || 0)
                    }
                    return this.addAttribute("position", new zn(e, 3)), this
                }, updateFromObject: function (t) {
                    var e, n = t.geometry;
                    if (t.isMesh) {
                        var i = n.__directGeometry;
                        if (!0 === n.elementsNeedUpdate && (i = void 0, n.elementsNeedUpdate = !1), void 0 === i) return this.fromGeometry(n);
                        i.verticesNeedUpdate = n.verticesNeedUpdate, i.normalsNeedUpdate = n.normalsNeedUpdate, i.colorsNeedUpdate = n.colorsNeedUpdate, i.uvsNeedUpdate = n.uvsNeedUpdate, i.groupsNeedUpdate = n.groupsNeedUpdate, n.verticesNeedUpdate = !1, n.normalsNeedUpdate = !1, n.colorsNeedUpdate = !1, n.uvsNeedUpdate = !1, n.groupsNeedUpdate = !1, n = i
                    }
                    return !0 === n.verticesNeedUpdate && (void 0 !== (e = this.attributes.position) && (e.copyVector3sArray(n.vertices), e.needsUpdate = !0), n.verticesNeedUpdate = !1), !0 === n.normalsNeedUpdate && (void 0 !== (e = this.attributes.normal) && (e.copyVector3sArray(n.normals), e.needsUpdate = !0), n.normalsNeedUpdate = !1), !0 === n.colorsNeedUpdate && (void 0 !== (e = this.attributes.color) && (e.copyColorsArray(n.colors), e.needsUpdate = !0), n.colorsNeedUpdate = !1), n.uvsNeedUpdate && (void 0 !== (e = this.attributes.uv) && (e.copyVector2sArray(n.uvs), e.needsUpdate = !0), n.uvsNeedUpdate = !1), n.lineDistancesNeedUpdate && (void 0 !== (e = this.attributes.lineDistance) && (e.copyArray(n.lineDistances), e.needsUpdate = !0), n.lineDistancesNeedUpdate = !1), n.groupsNeedUpdate && (n.computeGroups(t.geometry), this.groups = n.groups, n.groupsNeedUpdate = !1), this
                }, fromGeometry: function (t) {
                    return t.__directGeometry = (new Hn).fromGeometry(t), this.fromDirectGeometry(t.__directGeometry)
                }, fromDirectGeometry: function (t) {
                    var e = new Float32Array(3 * t.vertices.length);
                    if (this.addAttribute("position", new bn(e, 3).copyVector3sArray(t.vertices)), t.normals.length > 0) {
                        var n = new Float32Array(3 * t.normals.length);
                        this.addAttribute("normal", new bn(n, 3).copyVector3sArray(t.normals))
                    }
                    if (t.colors.length > 0) {
                        var i = new Float32Array(3 * t.colors.length);
                        this.addAttribute("color", new bn(i, 3).copyColorsArray(t.colors))
                    }
                    if (t.uvs.length > 0) {
                        var r = new Float32Array(2 * t.uvs.length);
                        this.addAttribute("uv", new bn(r, 2).copyVector2sArray(t.uvs))
                    }
                    if (t.uvs2.length > 0) {
                        var o = new Float32Array(2 * t.uvs2.length);
                        this.addAttribute("uv2", new bn(o, 2).copyVector2sArray(t.uvs2))
                    }
                    for (var a in this.groups = t.groups, t.morphTargets) {
                        for (var s = [], h = t.morphTargets[a], c = 0, u = h.length; c < u; c++) {
                            var l = h[c], f = new zn(3 * l.data.length, 3);
                            f.name = l.name, s.push(f.copyVector3sArray(l.data))
                        }
                        this.morphAttributes[a] = s
                    }
                    if (t.skinIndices.length > 0) {
                        var p = new zn(4 * t.skinIndices.length, 4);
                        this.addAttribute("skinIndex", p.copyVector4sArray(t.skinIndices))
                    }
                    if (t.skinWeights.length > 0) {
                        var d = new zn(4 * t.skinWeights.length, 4);
                        this.addAttribute("skinWeight", d.copyVector4sArray(t.skinWeights))
                    }
                    return null !== t.boundingSphere && (this.boundingSphere = t.boundingSphere.clone()), null !== t.boundingBox && (this.boundingBox = t.boundingBox.clone()), this
                }, computeBoundingBox: function () {
                    null === this.boundingBox && (this.boundingBox = new Qe);
                    var t = this.attributes.position;
                    void 0 !== t ? this.boundingBox.setFromBufferAttribute(t) : this.boundingBox.makeEmpty(), (isNaN(this.boundingBox.min.x) || isNaN(this.boundingBox.min.y) || isNaN(this.boundingBox.min.z)) && console.error('THREE.BufferGeometry.computeBoundingBox: Computed min/max have NaN values. The "position" attribute is likely to have NaN values.', this)
                }, computeBoundingSphere: function () {
                    var t = new Qe, e = new He;
                    return function () {
                        null === this.boundingSphere && (this.boundingSphere = new Ke);
                        var n = this.attributes.position;
                        if (n) {
                            var i = this.boundingSphere.center;
                            t.setFromBufferAttribute(n), t.getCenter(i);
                            for (var r = 0, o = 0, a = n.count; o < a; o++) e.x = n.getX(o), e.y = n.getY(o), e.z = n.getZ(o), r = Math.max(r, i.distanceToSquared(e));
                            this.boundingSphere.radius = Math.sqrt(r), isNaN(this.boundingSphere.radius) && console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.', this)
                        }
                    }
                }(), computeFaceNormals: function () {
                }, computeVertexNormals: function () {
                    var t = this.index, e = this.attributes;
                    if (e.position) {
                        var n = e.position.array;
                        if (void 0 === e.normal) this.addAttribute("normal", new bn(new Float32Array(n.length), 3)); else for (var i = e.normal.array, r = 0, o = i.length; r < o; r++) i[r] = 0;
                        var a, s, h, c = e.normal.array, u = new He, l = new He, f = new He, p = new He, d = new He;
                        if (t) {
                            var m = t.array;
                            for (r = 0, o = t.count; r < o; r += 3) s = 3 * m[r + 1], h = 3 * m[r + 2], u.fromArray(n, a = 3 * m[r + 0]), l.fromArray(n, s), f.fromArray(n, h), p.subVectors(f, l), d.subVectors(u, l), p.cross(d), c[a] += p.x, c[a + 1] += p.y, c[a + 2] += p.z, c[s] += p.x, c[s + 1] += p.y, c[s + 2] += p.z, c[h] += p.x, c[h + 1] += p.y, c[h + 2] += p.z
                        } else for (r = 0, o = n.length; r < o; r += 9) u.fromArray(n, r), l.fromArray(n, r + 3), f.fromArray(n, r + 6), p.subVectors(f, l), d.subVectors(u, l), p.cross(d), c[r] = p.x, c[r + 1] = p.y, c[r + 2] = p.z, c[r + 3] = p.x, c[r + 4] = p.y, c[r + 5] = p.z, c[r + 6] = p.x, c[r + 7] = p.y, c[r + 8] = p.z;
                        this.normalizeNormals(), e.normal.needsUpdate = !0
                    }
                }, merge: function (t, e) {
                    if (t && t.isBufferGeometry) {
                        void 0 === e && (e = 0, console.warn("THREE.BufferGeometry.merge(): Overwriting original geometry, starting at offset=0. Use BufferGeometryUtils.mergeBufferGeometries() for lossless merge."));
                        var n = this.attributes;
                        for (var i in n) if (void 0 !== t.attributes[i]) for (var r = n[i].array, o = t.attributes[i], a = o.array, s = 0, h = o.itemSize * e; s < a.length; s++, h++) r[h] = a[s];
                        return this
                    }
                    console.error("THREE.BufferGeometry.merge(): geometry not an instance of THREE.BufferGeometry.", t)
                }, normalizeNormals: function () {
                    var t = new He;
                    return function () {
                        for (var e = this.attributes.normal, n = 0, i = e.count; n < i; n++) t.x = e.getX(n), t.y = e.getY(n), t.z = e.getZ(n), t.normalize(), e.setXYZ(n, t.x, t.y, t.z)
                    }
                }(), toNonIndexed: function () {
                    if (null === this.index) return console.warn("THREE.BufferGeometry.toNonIndexed(): Geometry is already non-indexed."), this;
                    var t = new In, e = this.index.array, n = this.attributes;
                    for (var i in n) {
                        for (var r = n[i], o = r.array, a = r.itemSize, s = new o.constructor(e.length * a), h = 0, c = 0, u = 0, l = e.length; u < l; u++) {
                            h = e[u] * a;
                            for (var f = 0; f < a; f++) s[c++] = o[h++]
                        }
                        t.addAttribute(i, new bn(s, a))
                    }
                    var p = this.groups;
                    for (u = 0, l = p.length; u < l; u++) {
                        var d = p[u];
                        t.addGroup(d.start, d.count, d.materialIndex)
                    }
                    return t
                }, toJSON: function () {
                    var t = {metadata: {version: 4.5, type: "BufferGeometry", generator: "BufferGeometry.toJSON"}};
                    if (t.uuid = this.uuid, t.type = this.type, "" !== this.name && (t.name = this.name), Object.keys(this.userData).length > 0 && (t.userData = this.userData), void 0 !== this.parameters) {
                        var e = this.parameters;
                        for (var n in e) void 0 !== e[n] && (t[n] = e[n]);
                        return t
                    }
                    t.data = {attributes: {}};
                    var i = this.index;
                    if (null !== i) {
                        var r = Array.prototype.slice.call(i.array);
                        t.data.index = {type: i.array.constructor.name, array: r}
                    }
                    var o = this.attributes;
                    for (var n in o) {
                        var a = o[n];
                        r = Array.prototype.slice.call(a.array);
                        t.data.attributes[n] = {
                            itemSize: a.itemSize,
                            type: a.array.constructor.name,
                            array: r,
                            normalized: a.normalized
                        }
                    }
                    var s = this.groups;
                    s.length > 0 && (t.data.groups = JSON.parse(JSON.stringify(s)));
                    var h = this.boundingSphere;
                    return null !== h && (t.data.boundingSphere = {center: h.center.toArray(), radius: h.radius}), t
                }, clone: function () {
                    return (new In).copy(this)
                }, copy: function (t) {
                    var e, n, i;
                    this.index = null, this.attributes = {}, this.morphAttributes = {}, this.groups = [], this.boundingBox = null, this.boundingSphere = null, this.name = t.name;
                    var r = t.index;
                    null !== r && this.setIndex(r.clone());
                    var o = t.attributes;
                    for (e in o) {
                        this.addAttribute(e, o[e].clone())
                    }
                    var a = t.morphAttributes;
                    for (e in a) {
                        var s = [], h = a[e];
                        for (n = 0, i = h.length; n < i; n++) s.push(h[n].clone());
                        this.morphAttributes[e] = s
                    }
                    var c = t.groups;
                    for (n = 0, i = c.length; n < i; n++) {
                        var u = c[n];
                        this.addGroup(u.start, u.count, u.materialIndex)
                    }
                    var l = t.boundingBox;
                    null !== l && (this.boundingBox = l.clone());
                    var f = t.boundingSphere;
                    return null !== f && (this.boundingSphere = f.clone()), this.drawRange.start = t.drawRange.start, this.drawRange.count = t.drawRange.count, this.userData = t.userData, this
                }, dispose: function () {
                    this.dispatchEvent({type: "dispose"})
                }
            }), (Fn.prototype = Object.create(Sn.prototype)).constructor = Fn, (Bn.prototype = Object.create(In.prototype)).constructor = Bn, (kn.prototype = Object.create(Sn.prototype)).constructor = kn, (Vn.prototype = Object.create(In.prototype)).constructor = Vn;
            var Wn, Dn, Xn, Yn, Zn, Jn, Qn, Kn, qn, $n, jn, ti, ei = 0;

            function ni() {
                Object.defineProperty(this, "id", {value: ei++}), this.uuid = Pe.generateUUID(), this.name = "", this.type = "Material", this.fog = !0, this.lights = !0, this.blending = T, this.side = w, this.flatShading = !1, this.vertexColors = _, this.opacity = 1, this.transparent = !1, this.blendSrc = B, this.blendDst = k, this.blendEquation = P, this.blendSrcAlpha = null, this.blendDstAlpha = null, this.blendEquationAlpha = null, this.depthFunc = K, this.depthTest = !0, this.depthWrite = !0, this.clippingPlanes = null, this.clipIntersection = !1, this.clipShadows = !1, this.shadowSide = null, this.colorWrite = !0, this.precision = null, this.polygonOffset = !1, this.polygonOffsetFactor = 0, this.polygonOffsetUnits = 0, this.dithering = !1, this.alphaTest = 0, this.premultipliedAlpha = !1, this.visible = !0, this.userData = {}, this.needsUpdate = !0
            }

            function ii(t) {
                ni.call(this), this.type = "ShaderMaterial", this.defines = {}, this.uniforms = {}, this.vertexShader = "void main() {\n\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}", this.fragmentShader = "void main() {\n\tgl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );\n}", this.linewidth = 1, this.wireframe = !1, this.wireframeLinewidth = 1, this.fog = !1, this.lights = !1, this.clipping = !1, this.skinning = !1, this.morphTargets = !1, this.morphNormals = !1, this.extensions = {
                    derivatives: !1,
                    fragDepth: !1,
                    drawBuffers: !1,
                    shaderTextureLOD: !1
                }, this.defaultAttributeValues = {
                    color: [1, 1, 1],
                    uv: [0, 0],
                    uv2: [0, 0]
                }, this.index0AttributeName = void 0, this.uniformsNeedUpdate = !1, void 0 !== t && (void 0 !== t.attributes && console.error("THREE.ShaderMaterial: attributes should now be defined in THREE.BufferGeometry instead."), this.setValues(t))
            }

            function ri(t, e) {
                this.origin = void 0 !== t ? t : new He, this.direction = void 0 !== e ? e : new He
            }

            function oi(t, e, n) {
                this.a = void 0 !== t ? t : new He, this.b = void 0 !== e ? e : new He, this.c = void 0 !== n ? n : new He
            }

            function ai(t) {
                ni.call(this), this.type = "MeshBasicMaterial", this.color = new an(16777215), this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.specularMap = null, this.alphaMap = null, this.envMap = null, this.combine = et, this.reflectivity = 1, this.refractionRatio = .98, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.skinning = !1, this.morphTargets = !1, this.lights = !1, this.setValues(t)
            }

            function si(t, e) {
                xn.call(this), this.type = "Mesh", this.geometry = void 0 !== t ? t : new In, this.material = void 0 !== e ? e : new ai({color: 16777215 * Math.random()}), this.drawMode = ge, this.updateMorphTargets()
            }

            function hi(t, e, n, i) {
                var r, o, a = new an(0), s = 0;

                function h(t, n) {
                    e.buffers.color.setClear(t.r, t.g, t.b, n, i)
                }

                return {
                    getClearColor: function () {
                        return a
                    }, setClearColor: function (t, e) {
                        a.set(t), h(a, s = void 0 !== e ? e : 1)
                    }, getClearAlpha: function () {
                        return s
                    }, setClearAlpha: function (t) {
                        h(a, s = t)
                    }, render: function (e, i, c, u) {
                        var l = i.background;
                        null === l ? h(a, s) : l && l.isColor && (h(l, 1), u = !0), (t.autoClear || u) && t.clear(t.autoClearColor, t.autoClearDepth, t.autoClearStencil), l && (l.isCubeTexture || l.isWebGLRenderTargetCube) ? (void 0 === o && ((o = new si(new Bn(1, 1, 1), new ii({
                            type: "BackgroundCubeMaterial",
                            uniforms: rn.clone(cn.cube.uniforms),
                            vertexShader: cn.cube.vertexShader,
                            fragmentShader: cn.cube.fragmentShader,
                            side: x,
                            depthTest: !0,
                            depthWrite: !1,
                            fog: !1
                        }))).geometry.removeAttribute("normal"), o.geometry.removeAttribute("uv"), o.onBeforeRender = function (t, e, n) {
                            this.matrixWorld.copyPosition(n.matrixWorld)
                        }, n.update(o)), o.material.uniforms.tCube.value = l.isWebGLRenderTargetCube ? l.texture : l, o.material.uniforms.tFlip.value = l.isWebGLRenderTargetCube ? 1 : -1, e.push(o, o.geometry, o.material, 0, null)) : l && l.isTexture && (void 0 === r && ((r = new si(new Vn(2, 2), new ii({
                            type: "BackgroundMaterial",
                            uniforms: rn.clone(cn.background.uniforms),
                            vertexShader: cn.background.vertexShader,
                            fragmentShader: cn.background.fragmentShader,
                            side: w,
                            depthTest: !0,
                            depthWrite: !1,
                            fog: !1
                        }))).geometry.removeAttribute("normal"), n.update(r)), r.material.uniforms.t2D.value = l, !0 === l.matrixAutoUpdate && l.updateMatrix(), r.material.uniforms.uvTransform.value.copy(l.matrix), e.push(r, r.geometry, r.material, 0, null))
                    }
                }
            }

            function ci(t, e, n, i) {
                var r;
                this.setMode = function (t) {
                    r = t
                }, this.render = function (e, i) {
                    t.drawArrays(r, e, i), n.update(i, r)
                }, this.renderInstances = function (o, a, s) {
                    var h;
                    if (i.isWebGL2) h = t; else if (null === (h = e.get("ANGLE_instanced_arrays"))) return void console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");
                    h[i.isWebGL2 ? "drawArraysInstanced" : "drawArraysInstancedANGLE"](r, a, s, o.maxInstancedCount), n.update(s, r, o.maxInstancedCount)
                }
            }

            function ui(t, e, n) {
                var i;

                function r(e) {
                    if ("highp" === e) {
                        if (t.getShaderPrecisionFormat(35633, 36338).precision > 0 && t.getShaderPrecisionFormat(35632, 36338).precision > 0) return "highp";
                        e = "mediump"
                    }
                    return "mediump" === e && t.getShaderPrecisionFormat(35633, 36337).precision > 0 && t.getShaderPrecisionFormat(35632, 36337).precision > 0 ? "mediump" : "lowp"
                }

                var o = "undefined" != typeof WebGL2RenderingContext && t instanceof WebGL2RenderingContext,
                    a = void 0 !== n.precision ? n.precision : "highp", s = r(a);
                s !== a && (console.warn("THREE.WebGLRenderer:", a, "not supported, using", s, "instead."), a = s);
                var h = !0 === n.logarithmicDepthBuffer, c = t.getParameter(34930), u = t.getParameter(35660),
                    l = t.getParameter(3379), f = t.getParameter(34076), p = t.getParameter(34921),
                    d = t.getParameter(36347), m = t.getParameter(36348), v = t.getParameter(36349), g = u > 0,
                    y = o || !!e.get("OES_texture_float");
                return {
                    isWebGL2: o,
                    getMaxAnisotropy: function () {
                        if (void 0 !== i) return i;
                        var n = e.get("EXT_texture_filter_anisotropic");
                        return i = null !== n ? t.getParameter(n.MAX_TEXTURE_MAX_ANISOTROPY_EXT) : 0
                    },
                    getMaxPrecision: r,
                    precision: a,
                    logarithmicDepthBuffer: h,
                    maxTextures: c,
                    maxVertexTextures: u,
                    maxTextureSize: l,
                    maxCubemapSize: f,
                    maxAttributes: p,
                    maxVertexUniforms: d,
                    maxVaryings: m,
                    maxFragmentUniforms: v,
                    vertexTextures: g,
                    floatFragmentTextures: y,
                    floatVertexTextures: g && y
                }
            }

            function li() {
                var t = this, e = null, n = 0, i = !1, r = !1, o = new qe, a = new Ge,
                    s = {value: null, needsUpdate: !1};

                function h() {
                    s.value !== e && (s.value = e, s.needsUpdate = n > 0), t.numPlanes = n, t.numIntersection = 0
                }

                function c(e, n, i, r) {
                    var h = null !== e ? e.length : 0, c = null;
                    if (0 !== h) {
                        if (c = s.value, !0 !== r || null === c) {
                            var u = i + 4 * h, l = n.matrixWorldInverse;
                            a.getNormalMatrix(l), (null === c || c.length < u) && (c = new Float32Array(u));
                            for (var f = 0, p = i; f !== h; ++f, p += 4) o.copy(e[f]).applyMatrix4(l, a), o.normal.toArray(c, p), c[p + 3] = o.constant
                        }
                        s.value = c, s.needsUpdate = !0
                    }
                    return t.numPlanes = h, c
                }

                this.uniform = s, this.numPlanes = 0, this.numIntersection = 0, this.init = function (t, r, o) {
                    var a = 0 !== t.length || r || 0 !== n || i;
                    return i = r, e = c(t, o, 0), n = t.length, a
                }, this.beginShadows = function () {
                    r = !0, c(null)
                }, this.endShadows = function () {
                    r = !1, h()
                }, this.setState = function (t, o, a, u, l, f) {
                    if (!i || null === t || 0 === t.length || r && !a) r ? c(null) : h(); else {
                        var p = r ? 0 : n, d = 4 * p, m = l.clippingState || null;
                        s.value = m, m = c(t, u, d, f);
                        for (var v = 0; v !== d; ++v) m[v] = e[v];
                        l.clippingState = m, this.numIntersection = o ? this.numPlanes : 0, this.numPlanes += p
                    }
                }
            }

            function fi(t) {
                var e = {};
                return {
                    get: function (n) {
                        if (void 0 !== e[n]) return e[n];
                        var i;
                        switch (n) {
                            case"WEBGL_depth_texture":
                                i = t.getExtension("WEBGL_depth_texture") || t.getExtension("MOZ_WEBGL_depth_texture") || t.getExtension("WEBKIT_WEBGL_depth_texture");
                                break;
                            case"EXT_texture_filter_anisotropic":
                                i = t.getExtension("EXT_texture_filter_anisotropic") || t.getExtension("MOZ_EXT_texture_filter_anisotropic") || t.getExtension("WEBKIT_EXT_texture_filter_anisotropic");
                                break;
                            case"WEBGL_compressed_texture_s3tc":
                                i = t.getExtension("WEBGL_compressed_texture_s3tc") || t.getExtension("MOZ_WEBGL_compressed_texture_s3tc") || t.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");
                                break;
                            case"WEBGL_compressed_texture_pvrtc":
                                i = t.getExtension("WEBGL_compressed_texture_pvrtc") || t.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");
                                break;
                            default:
                                i = t.getExtension(n)
                        }
                        return null === i && console.warn("THREE.WebGLRenderer: " + n + " extension not supported."), e[n] = i, i
                    }
                }
            }

            function pi(t, e, n) {
                var i = {}, r = {};

                function o(t) {
                    var a = t.target, s = i[a.id];
                    for (var h in null !== s.index && e.remove(s.index), s.attributes) e.remove(s.attributes[h]);
                    a.removeEventListener("dispose", o), delete i[a.id];
                    var c = r[s.id];
                    c && (e.remove(c), delete r[s.id]), n.memory.geometries--
                }

                return {
                    get: function (t, e) {
                        var r = i[e.id];
                        return r || (e.addEventListener("dispose", o), e.isBufferGeometry ? r = e : e.isGeometry && (void 0 === e._bufferGeometry && (e._bufferGeometry = (new In).setFromObject(t)), r = e._bufferGeometry), i[e.id] = r, n.memory.geometries++, r)
                    }, update: function (t) {
                        var n = t.index, i = t.attributes;
                        for (var r in null !== n && e.update(n, 34963), i) e.update(i[r], 34962);
                        var o = t.morphAttributes;
                        for (var r in o) for (var a = o[r], s = 0, h = a.length; s < h; s++) e.update(a[s], 34962)
                    }, getWireframeAttribute: function (t) {
                        var n = r[t.id];
                        if (n) return n;
                        var i, o = [], a = t.index, s = t.attributes;
                        if (null !== a) for (var h = 0, c = (i = a.array).length; h < c; h += 3) o.push(u = i[h + 0], l = i[h + 1], l, f = i[h + 2], f, u); else for (h = 0, c = (i = s.position.array).length / 3 - 1; h < c; h += 3) {
                            var u, l, f;
                            o.push(u = h + 0, l = h + 1, l, f = h + 2, f, u)
                        }
                        return n = new (Gn(o) > 65535 ? Nn : An)(o, 1), e.update(n, 34963), r[t.id] = n, n
                    }
                }
            }

            function di(t, e, n, i) {
                var r, o, a;
                this.setMode = function (t) {
                    r = t
                }, this.setIndex = function (t) {
                    o = t.type, a = t.bytesPerElement
                }, this.render = function (e, i) {
                    t.drawElements(r, i, o, e * a), n.update(i, r)
                }, this.renderInstances = function (s, h, c) {
                    var u;
                    if (i.isWebGL2) u = t; else if (null === (u = e.get("ANGLE_instanced_arrays"))) return void console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");
                    u[i.isWebGL2 ? "drawElementsInstanced" : "drawElementsInstancedANGLE"](r, c, o, h * a, s.maxInstancedCount), n.update(c, r, s.maxInstancedCount)
                }
            }

            function mi(t) {
                var e = {frame: 0, calls: 0, triangles: 0, points: 0, lines: 0};
                return {
                    memory: {geometries: 0, textures: 0},
                    render: e,
                    programs: null,
                    autoReset: !0,
                    reset: function () {
                        e.frame++, e.calls = 0, e.triangles = 0, e.points = 0, e.lines = 0
                    },
                    update: function (t, n, i) {
                        switch (i = i || 1, e.calls++, n) {
                            case 4:
                                e.triangles += i * (t / 3);
                                break;
                            case 5:
                            case 6:
                                e.triangles += i * (t - 2);
                                break;
                            case 1:
                                e.lines += i * (t / 2);
                                break;
                            case 3:
                                e.lines += i * (t - 1);
                                break;
                            case 2:
                                e.lines += i * t;
                                break;
                            case 0:
                                e.points += i * t;
                                break;
                            default:
                                console.error("THREE.WebGLInfo: Unknown draw mode:", n)
                        }
                    }
                }
            }

            function vi(t, e) {
                return Math.abs(e[1]) - Math.abs(t[1])
            }

            function gi(t) {
                var e = {}, n = new Float32Array(8);
                return {
                    update: function (i, r, o, a) {
                        var s = i.morphTargetInfluences, h = s.length, c = e[r.id];
                        if (void 0 === c) {
                            c = [];
                            for (var u = 0; u < h; u++) c[u] = [u, 0];
                            e[r.id] = c
                        }
                        var l = o.morphTargets && r.morphAttributes.position,
                            f = o.morphNormals && r.morphAttributes.normal;
                        for (u = 0; u < h; u++) 0 !== (p = c[u])[1] && (l && r.removeAttribute("morphTarget" + u), f && r.removeAttribute("morphNormal" + u));
                        for (u = 0; u < h; u++) (p = c[u])[0] = u, p[1] = s[u];
                        for (c.sort(vi), u = 0; u < 8; u++) {
                            var p;
                            if (p = c[u]) {
                                var d = p[0], m = p[1];
                                if (m) {
                                    l && r.addAttribute("morphTarget" + u, l[d]), f && r.addAttribute("morphNormal" + u, f[d]), n[u] = m;
                                    continue
                                }
                            }
                            n[u] = 0
                        }
                        a.getUniforms().setValue(t, "morphTargetInfluences", n)
                    }
                }
            }

            function yi(t, e) {
                var n = {};
                return {
                    update: function (i) {
                        var r = e.render.frame, o = i.geometry, a = t.get(i, o);
                        return n[a.id] !== r && (o.isGeometry && a.updateFromObject(i), t.update(a), n[a.id] = r), a
                    }, dispose: function () {
                        n = {}
                    }
                }
            }

            function wi(t, e, n, i, r, o, a, s, h, c) {
                De.call(this, t = void 0 !== t ? t : [], e = void 0 !== e ? e : ct, n, i, r, o, a, s, h, c), this.flipY = !1
            }

            function xi(t, e, n, i) {
                De.call(this, null), this.image = {
                    data: t,
                    width: e,
                    height: n,
                    depth: i
                }, this.magFilter = wt, this.minFilter = wt, this.generateMipmaps = !1, this.flipY = !1
            }

            ni.prototype = Object.assign(Object.create(e.prototype), {
                constructor: ni, isMaterial: !0, onBeforeCompile: function () {
                }, setValues: function (t) {
                    if (void 0 !== t) for (var e in t) {
                        var n = t[e];
                        if (void 0 !== n) if ("shading" !== e) {
                            var i = this[e];
                            void 0 !== i ? i && i.isColor ? i.set(n) : i && i.isVector3 && n && n.isVector3 ? i.copy(n) : this[e] = n : console.warn("THREE." + this.type + ": '" + e + "' is not a property of this material.")
                        } else console.warn("THREE." + this.type + ": .shading has been removed. Use the boolean .flatShading instead."), this.flatShading = 1 === n; else console.warn("THREE.Material: '" + e + "' parameter is undefined.")
                    }
                }, toJSON: function (t) {
                    var e = void 0 === t || "string" == typeof t;
                    e && (t = {textures: {}, images: {}});
                    var n = {metadata: {version: 4.5, type: "Material", generator: "Material.toJSON"}};

                    function i(t) {
                        var e = [];
                        for (var n in t) {
                            var i = t[n];
                            delete i.metadata, e.push(i)
                        }
                        return e
                    }

                    if (n.uuid = this.uuid, n.type = this.type, "" !== this.name && (n.name = this.name), this.color && this.color.isColor && (n.color = this.color.getHex()), void 0 !== this.roughness && (n.roughness = this.roughness), void 0 !== this.metalness && (n.metalness = this.metalness), this.emissive && this.emissive.isColor && (n.emissive = this.emissive.getHex()), 1 !== this.emissiveIntensity && (n.emissiveIntensity = this.emissiveIntensity), this.specular && this.specular.isColor && (n.specular = this.specular.getHex()), void 0 !== this.shininess && (n.shininess = this.shininess), void 0 !== this.clearCoat && (n.clearCoat = this.clearCoat), void 0 !== this.clearCoatRoughness && (n.clearCoatRoughness = this.clearCoatRoughness), this.map && this.map.isTexture && (n.map = this.map.toJSON(t).uuid), this.alphaMap && this.alphaMap.isTexture && (n.alphaMap = this.alphaMap.toJSON(t).uuid), this.lightMap && this.lightMap.isTexture && (n.lightMap = this.lightMap.toJSON(t).uuid), this.aoMap && this.aoMap.isTexture && (n.aoMap = this.aoMap.toJSON(t).uuid, n.aoMapIntensity = this.aoMapIntensity), this.bumpMap && this.bumpMap.isTexture && (n.bumpMap = this.bumpMap.toJSON(t).uuid, n.bumpScale = this.bumpScale), this.normalMap && this.normalMap.isTexture && (n.normalMap = this.normalMap.toJSON(t).uuid, n.normalMapType = this.normalMapType, n.normalScale = this.normalScale.toArray()), this.displacementMap && this.displacementMap.isTexture && (n.displacementMap = this.displacementMap.toJSON(t).uuid, n.displacementScale = this.displacementScale, n.displacementBias = this.displacementBias), this.roughnessMap && this.roughnessMap.isTexture && (n.roughnessMap = this.roughnessMap.toJSON(t).uuid), this.metalnessMap && this.metalnessMap.isTexture && (n.metalnessMap = this.metalnessMap.toJSON(t).uuid), this.emissiveMap && this.emissiveMap.isTexture && (n.emissiveMap = this.emissiveMap.toJSON(t).uuid), this.specularMap && this.specularMap.isTexture && (n.specularMap = this.specularMap.toJSON(t).uuid), this.envMap && this.envMap.isTexture && (n.envMap = this.envMap.toJSON(t).uuid, n.reflectivity = this.reflectivity, void 0 !== this.combine && (n.combine = this.combine), void 0 !== this.envMapIntensity && (n.envMapIntensity = this.envMapIntensity)), this.gradientMap && this.gradientMap.isTexture && (n.gradientMap = this.gradientMap.toJSON(t).uuid), void 0 !== this.size && (n.size = this.size), void 0 !== this.sizeAttenuation && (n.sizeAttenuation = this.sizeAttenuation), this.blending !== T && (n.blending = this.blending), !0 === this.flatShading && (n.flatShading = this.flatShading), this.side !== w && (n.side = this.side), this.vertexColors !== _ && (n.vertexColors = this.vertexColors), this.opacity < 1 && (n.opacity = this.opacity), !0 === this.transparent && (n.transparent = this.transparent), n.depthFunc = this.depthFunc, n.depthTest = this.depthTest, n.depthWrite = this.depthWrite, 0 !== this.rotation && (n.rotation = this.rotation), !0 === this.polygonOffset && (n.polygonOffset = !0), 0 !== this.polygonOffsetFactor && (n.polygonOffsetFactor = this.polygonOffsetFactor), 0 !== this.polygonOffsetUnits && (n.polygonOffsetUnits = this.polygonOffsetUnits), 1 !== this.linewidth && (n.linewidth = this.linewidth), void 0 !== this.dashSize && (n.dashSize = this.dashSize), void 0 !== this.gapSize && (n.gapSize = this.gapSize), void 0 !== this.scale && (n.scale = this.scale), !0 === this.dithering && (n.dithering = !0), this.alphaTest > 0 && (n.alphaTest = this.alphaTest), !0 === this.premultipliedAlpha && (n.premultipliedAlpha = this.premultipliedAlpha), !0 === this.wireframe && (n.wireframe = this.wireframe), this.wireframeLinewidth > 1 && (n.wireframeLinewidth = this.wireframeLinewidth), "round" !== this.wireframeLinecap && (n.wireframeLinecap = this.wireframeLinecap), "round" !== this.wireframeLinejoin && (n.wireframeLinejoin = this.wireframeLinejoin), !0 === this.morphTargets && (n.morphTargets = !0), !0 === this.skinning && (n.skinning = !0), !1 === this.visible && (n.visible = !1), "{}" !== JSON.stringify(this.userData) && (n.userData = this.userData), e) {
                        var r = i(t.textures), o = i(t.images);
                        r.length > 0 && (n.textures = r), o.length > 0 && (n.images = o)
                    }
                    return n
                }, clone: function () {
                    return (new this.constructor).copy(this)
                }, copy: function (t) {
                    this.name = t.name, this.fog = t.fog, this.lights = t.lights, this.blending = t.blending, this.side = t.side, this.flatShading = t.flatShading, this.vertexColors = t.vertexColors, this.opacity = t.opacity, this.transparent = t.transparent, this.blendSrc = t.blendSrc, this.blendDst = t.blendDst, this.blendEquation = t.blendEquation, this.blendSrcAlpha = t.blendSrcAlpha, this.blendDstAlpha = t.blendDstAlpha, this.blendEquationAlpha = t.blendEquationAlpha, this.depthFunc = t.depthFunc, this.depthTest = t.depthTest, this.depthWrite = t.depthWrite, this.colorWrite = t.colorWrite, this.precision = t.precision, this.polygonOffset = t.polygonOffset, this.polygonOffsetFactor = t.polygonOffsetFactor, this.polygonOffsetUnits = t.polygonOffsetUnits, this.dithering = t.dithering, this.alphaTest = t.alphaTest, this.premultipliedAlpha = t.premultipliedAlpha, this.visible = t.visible, this.userData = JSON.parse(JSON.stringify(t.userData)), this.clipShadows = t.clipShadows, this.clipIntersection = t.clipIntersection;
                    var e = t.clippingPlanes, n = null;
                    if (null !== e) {
                        var i = e.length;
                        n = new Array(i);
                        for (var r = 0; r !== i; ++r) n[r] = e[r].clone()
                    }
                    return this.clippingPlanes = n, this.shadowSide = t.shadowSide, this
                }, dispose: function () {
                    this.dispatchEvent({type: "dispose"})
                }
            }), (ii.prototype = Object.create(ni.prototype)).constructor = ii, ii.prototype.isShaderMaterial = !0, ii.prototype.copy = function (t) {
                return ni.prototype.copy.call(this, t), this.fragmentShader = t.fragmentShader, this.vertexShader = t.vertexShader, this.uniforms = rn.clone(t.uniforms), this.defines = Object.assign({}, t.defines), this.wireframe = t.wireframe, this.wireframeLinewidth = t.wireframeLinewidth, this.lights = t.lights, this.clipping = t.clipping, this.skinning = t.skinning, this.morphTargets = t.morphTargets, this.morphNormals = t.morphNormals, this.extensions = t.extensions, this
            }, ii.prototype.toJSON = function (t) {
                var e = ni.prototype.toJSON.call(this, t);
                for (var n in e.uniforms = {}, this.uniforms) {
                    var i = this.uniforms[n].value;
                    e.uniforms[n] = i.isTexture ? {type: "t", value: i.toJSON(t).uuid} : i.isColor ? {
                        type: "c",
                        value: i.getHex()
                    } : i.isVector2 ? {type: "v2", value: i.toArray()} : i.isVector3 ? {
                        type: "v3",
                        value: i.toArray()
                    } : i.isVector4 ? {type: "v4", value: i.toArray()} : i.isMatrix4 ? {
                        type: "m4",
                        value: i.toArray()
                    } : {value: i}
                }
                return Object.keys(this.defines).length > 0 && (e.defines = this.defines), e.vertexShader = this.vertexShader, e.fragmentShader = this.fragmentShader, e
            }, Object.assign(ri.prototype, {
                set: function (t, e) {
                    return this.origin.copy(t), this.direction.copy(e), this
                }, clone: function () {
                    return (new this.constructor).copy(this)
                }, copy: function (t) {
                    return this.origin.copy(t.origin), this.direction.copy(t.direction), this
                }, at: function (t, e) {
                    return void 0 === e && (console.warn("THREE.Ray: .at() target is now required"), e = new He), e.copy(this.direction).multiplyScalar(t).add(this.origin)
                }, lookAt: function (t) {
                    return this.direction.copy(t).sub(this.origin).normalize(), this
                }, recast: function () {
                    var t = new He;
                    return function (e) {
                        return this.origin.copy(this.at(e, t)), this
                    }
                }(), closestPointToPoint: function (t, e) {
                    void 0 === e && (console.warn("THREE.Ray: .closestPointToPoint() target is now required"), e = new He), e.subVectors(t, this.origin);
                    var n = e.dot(this.direction);
                    return n < 0 ? e.copy(this.origin) : e.copy(this.direction).multiplyScalar(n).add(this.origin)
                }, distanceToPoint: function (t) {
                    return Math.sqrt(this.distanceSqToPoint(t))
                }, distanceSqToPoint: function () {
                    var t = new He;
                    return function (e) {
                        var n = t.subVectors(e, this.origin).dot(this.direction);
                        return n < 0 ? this.origin.distanceToSquared(e) : (t.copy(this.direction).multiplyScalar(n).add(this.origin), t.distanceToSquared(e))
                    }
                }(), distanceSqToSegment: (Dn = new He, Xn = new He, Yn = new He, function (t, e, n, i) {
                    Dn.copy(t).add(e).multiplyScalar(.5), Xn.copy(e).sub(t).normalize(), Yn.copy(this.origin).sub(Dn);
                    var r, o, a, s, h = .5 * t.distanceTo(e), c = -this.direction.dot(Xn), u = Yn.dot(this.direction),
                        l = -Yn.dot(Xn), f = Yn.lengthSq(), p = Math.abs(1 - c * c);
                    if (p > 0) if (o = c * u - l, s = h * p, (r = c * l - u) >= 0) if (o >= -s) if (o <= s) {
                        var d = 1 / p;
                        a = (r *= d) * (r + c * (o *= d) + 2 * u) + o * (c * r + o + 2 * l) + f
                    } else o = h, a = -(r = Math.max(0, -(c * o + u))) * r + o * (o + 2 * l) + f; else o = -h, a = -(r = Math.max(0, -(c * o + u))) * r + o * (o + 2 * l) + f; else o <= -s ? a = -(r = Math.max(0, -(-c * h + u))) * r + (o = r > 0 ? -h : Math.min(Math.max(-h, -l), h)) * (o + 2 * l) + f : o <= s ? (r = 0, a = (o = Math.min(Math.max(-h, -l), h)) * (o + 2 * l) + f) : a = -(r = Math.max(0, -(c * h + u))) * r + (o = r > 0 ? h : Math.min(Math.max(-h, -l), h)) * (o + 2 * l) + f; else o = c > 0 ? -h : h, a = -(r = Math.max(0, -(c * o + u))) * r + o * (o + 2 * l) + f;
                    return n && n.copy(this.direction).multiplyScalar(r).add(this.origin), i && i.copy(Xn).multiplyScalar(o).add(Dn), a
                }), intersectSphere: function () {
                    var t = new He;
                    return function (e, n) {
                        t.subVectors(e.center, this.origin);
                        var i = t.dot(this.direction), r = t.dot(t) - i * i, o = e.radius * e.radius;
                        if (r > o) return null;
                        var a = Math.sqrt(o - r), s = i - a, h = i + a;
                        return s < 0 && h < 0 ? null : this.at(s < 0 ? h : s, n)
                    }
                }(), intersectsSphere: function (t) {
                    return this.distanceSqToPoint(t.center) <= t.radius * t.radius
                }, distanceToPlane: function (t) {
                    var e = t.normal.dot(this.direction);
                    if (0 === e) return 0 === t.distanceToPoint(this.origin) ? 0 : null;
                    var n = -(this.origin.dot(t.normal) + t.constant) / e;
                    return n >= 0 ? n : null
                }, intersectPlane: function (t, e) {
                    var n = this.distanceToPlane(t);
                    return null === n ? null : this.at(n, e)
                }, intersectsPlane: function (t) {
                    var e = t.distanceToPoint(this.origin);
                    return 0 === e || t.normal.dot(this.direction) * e < 0
                }, intersectBox: function (t, e) {
                    var n, i, r, o, a, s, h = 1 / this.direction.x, c = 1 / this.direction.y, u = 1 / this.direction.z,
                        l = this.origin;
                    return h >= 0 ? (n = (t.min.x - l.x) * h, i = (t.max.x - l.x) * h) : (n = (t.max.x - l.x) * h, i = (t.min.x - l.x) * h), c >= 0 ? (r = (t.min.y - l.y) * c, o = (t.max.y - l.y) * c) : (r = (t.max.y - l.y) * c, o = (t.min.y - l.y) * c), n > o || r > i ? null : ((r > n || n != n) && (n = r), (o < i || i != i) && (i = o), u >= 0 ? (a = (t.min.z - l.z) * u, s = (t.max.z - l.z) * u) : (a = (t.max.z - l.z) * u, s = (t.min.z - l.z) * u), n > s || a > i ? null : ((a > n || n != n) && (n = a), (s < i || i != i) && (i = s), i < 0 ? null : this.at(n >= 0 ? n : i, e)))
                }, intersectsBox: (Wn = new He, function (t) {
                    return null !== this.intersectBox(t, Wn)
                }), intersectTriangle: function () {
                    var t = new He, e = new He, n = new He, i = new He;
                    return function (r, o, a, s, h) {
                        e.subVectors(o, r), n.subVectors(a, r), i.crossVectors(e, n);
                        var c, u = this.direction.dot(i);
                        if (u > 0) {
                            if (s) return null;
                            c = 1
                        } else {
                            if (!(u < 0)) return null;
                            c = -1, u = -u
                        }
                        t.subVectors(this.origin, r);
                        var l = c * this.direction.dot(n.crossVectors(t, n));
                        if (l < 0) return null;
                        var f = c * this.direction.dot(e.cross(t));
                        if (f < 0) return null;
                        if (l + f > u) return null;
                        var p = -c * t.dot(i);
                        return p < 0 ? null : this.at(p / u, h)
                    }
                }(), applyMatrix4: function (t) {
                    return this.origin.applyMatrix4(t), this.direction.transformDirection(t), this
                }, equals: function (t) {
                    return t.origin.equals(this.origin) && t.direction.equals(this.direction)
                }
            }), Object.assign(oi, {
                getNormal: (Jn = new He, function (t, e, n, i) {
                    void 0 === i && (console.warn("THREE.Triangle: .getNormal() target is now required"), i = new He), i.subVectors(n, e), Jn.subVectors(t, e), i.cross(Jn);
                    var r = i.lengthSq();
                    return r > 0 ? i.multiplyScalar(1 / Math.sqrt(r)) : i.set(0, 0, 0)
                }), getBarycoord: function () {
                    var t = new He, e = new He, n = new He;
                    return function (i, r, o, a, s) {
                        t.subVectors(a, r), e.subVectors(o, r), n.subVectors(i, r);
                        var h = t.dot(t), c = t.dot(e), u = t.dot(n), l = e.dot(e), f = e.dot(n), p = h * l - c * c;
                        if (void 0 === s && (console.warn("THREE.Triangle: .getBarycoord() target is now required"), s = new He), 0 === p) return s.set(-2, -1, -1);
                        var d = 1 / p, m = (l * u - c * f) * d, v = (h * f - c * u) * d;
                        return s.set(1 - m - v, v, m)
                    }
                }(), containsPoint: function () {
                    var t = new He;
                    return function (e, n, i, r) {
                        return oi.getBarycoord(e, n, i, r, t), t.x >= 0 && t.y >= 0 && t.x + t.y <= 1
                    }
                }(), getUV: (Zn = new He, function (t, e, n, i, r, o, a, s) {
                    return this.getBarycoord(t, e, n, i, Zn), s.set(0, 0), s.addScaledVector(r, Zn.x), s.addScaledVector(o, Zn.y), s.addScaledVector(a, Zn.z), s
                })
            }), Object.assign(oi.prototype, {
                set: function (t, e, n) {
                    return this.a.copy(t), this.b.copy(e), this.c.copy(n), this
                },
                setFromPointsAndIndices: function (t, e, n, i) {
                    return this.a.copy(t[e]), this.b.copy(t[n]), this.c.copy(t[i]), this
                },
                clone: function () {
                    return (new this.constructor).copy(this)
                },
                copy: function (t) {
                    return this.a.copy(t.a), this.b.copy(t.b), this.c.copy(t.c), this
                },
                getArea: function () {
                    var t = new He, e = new He;
                    return function () {
                        return t.subVectors(this.c, this.b), e.subVectors(this.a, this.b), .5 * t.cross(e).length()
                    }
                }(),
                getMidpoint: function (t) {
                    return void 0 === t && (console.warn("THREE.Triangle: .getMidpoint() target is now required"), t = new He), t.addVectors(this.a, this.b).add(this.c).multiplyScalar(1 / 3)
                },
                getNormal: function (t) {
                    return oi.getNormal(this.a, this.b, this.c, t)
                },
                getPlane: function (t) {
                    return void 0 === t && (console.warn("THREE.Triangle: .getPlane() target is now required"), t = new He), t.setFromCoplanarPoints(this.a, this.b, this.c)
                },
                getBarycoord: function (t, e) {
                    return oi.getBarycoord(t, this.a, this.b, this.c, e)
                },
                containsPoint: function (t) {
                    return oi.containsPoint(t, this.a, this.b, this.c)
                },
                getUV: function (t, e, n, i, r) {
                    return oi.getUV(t, this.a, this.b, this.c, e, n, i, r)
                },
                intersectsBox: function (t) {
                    return t.intersectsTriangle(this)
                },
                closestPointToPoint: (Qn = new He, Kn = new He, qn = new He, $n = new He, jn = new He, ti = new He, function (t, e) {
                    void 0 === e && (console.warn("THREE.Triangle: .closestPointToPoint() target is now required"), e = new He);
                    var n, i, r = this.a, o = this.b, a = this.c;
                    Qn.subVectors(o, r), Kn.subVectors(a, r), $n.subVectors(t, r);
                    var s = Qn.dot($n), h = Kn.dot($n);
                    if (s <= 0 && h <= 0) return e.copy(r);
                    jn.subVectors(t, o);
                    var c = Qn.dot(jn), u = Kn.dot(jn);
                    if (c >= 0 && u <= c) return e.copy(o);
                    var l = s * u - c * h;
                    if (l <= 0 && s >= 0 && c <= 0) return n = s / (s - c), e.copy(r).addScaledVector(Qn, n);
                    ti.subVectors(t, a);
                    var f = Qn.dot(ti), p = Kn.dot(ti);
                    if (p >= 0 && f <= p) return e.copy(a);
                    var d = f * h - s * p;
                    if (d <= 0 && h >= 0 && p <= 0) return i = h / (h - p), e.copy(r).addScaledVector(Kn, i);
                    var m = c * p - f * u;
                    if (m <= 0 && u - c >= 0 && f - p >= 0) return qn.subVectors(a, o), i = (u - c) / (u - c + (f - p)), e.copy(o).addScaledVector(qn, i);
                    var v = 1 / (m + d + l);
                    return n = d * v, i = l * v, e.copy(r).addScaledVector(Qn, n).addScaledVector(Kn, i)
                }),
                equals: function (t) {
                    return t.a.equals(this.a) && t.b.equals(this.b) && t.c.equals(this.c)
                }
            }), (ai.prototype = Object.create(ni.prototype)).constructor = ai, ai.prototype.isMeshBasicMaterial = !0, ai.prototype.copy = function (t) {
                return ni.prototype.copy.call(this, t), this.color.copy(t.color), this.map = t.map, this.lightMap = t.lightMap, this.lightMapIntensity = t.lightMapIntensity, this.aoMap = t.aoMap, this.aoMapIntensity = t.aoMapIntensity, this.specularMap = t.specularMap, this.alphaMap = t.alphaMap, this.envMap = t.envMap, this.combine = t.combine, this.reflectivity = t.reflectivity, this.refractionRatio = t.refractionRatio, this.wireframe = t.wireframe, this.wireframeLinewidth = t.wireframeLinewidth, this.wireframeLinecap = t.wireframeLinecap, this.wireframeLinejoin = t.wireframeLinejoin, this.skinning = t.skinning, this.morphTargets = t.morphTargets, this
            }, si.prototype = Object.assign(Object.create(xn.prototype), {
                constructor: si, isMesh: !0, setDrawMode: function (t) {
                    this.drawMode = t
                }, copy: function (t) {
                    return xn.prototype.copy.call(this, t), this.drawMode = t.drawMode, void 0 !== t.morphTargetInfluences && (this.morphTargetInfluences = t.morphTargetInfluences.slice()), void 0 !== t.morphTargetDictionary && (this.morphTargetDictionary = Object.assign({}, t.morphTargetDictionary)), this
                }, updateMorphTargets: function () {
                    var t, e, n, i = this.geometry;
                    if (i.isBufferGeometry) {
                        var r = i.morphAttributes, o = Object.keys(r);
                        if (o.length > 0) {
                            var a = r[o[0]];
                            if (void 0 !== a) for (this.morphTargetInfluences = [], this.morphTargetDictionary = {}, t = 0, e = a.length; t < e; t++) n = a[t].name || String(t), this.morphTargetInfluences.push(0), this.morphTargetDictionary[n] = t
                        }
                    } else {
                        var s = i.morphTargets;
                        if (void 0 !== s && s.length > 0) for (this.morphTargetInfluences = [], this.morphTargetDictionary = {}, t = 0, e = s.length; t < e; t++) n = s[t].name || String(t), this.morphTargetInfluences.push(0), this.morphTargetDictionary[n] = t
                    }
                }, raycast: function () {
                    var t = new ze, e = new ri, n = new Ke, i = new He, r = new He, o = new He, a = new He, s = new He,
                        h = new He, c = new Ne, u = new Ne, l = new Ne, f = new He, p = new He;

                    function d(t, e, n, i, r, o, a, s) {
                        if (null === (e.side === x ? i.intersectTriangle(a, o, r, !0, s) : i.intersectTriangle(r, o, a, e.side !== M, s))) return null;
                        p.copy(s), p.applyMatrix4(t.matrixWorld);
                        var h = n.ray.origin.distanceTo(p);
                        return h < n.near || h > n.far ? null : {distance: h, point: p.clone(), object: t}
                    }

                    function m(t, e, n, a, s, h, p, m, v) {
                        i.fromBufferAttribute(s, p), r.fromBufferAttribute(s, m), o.fromBufferAttribute(s, v);
                        var g = d(t, e, n, a, i, r, o, f);
                        if (g) {
                            h && (c.fromBufferAttribute(h, p), u.fromBufferAttribute(h, m), l.fromBufferAttribute(h, v), g.uv = oi.getUV(f, i, r, o, c, u, l, new Ne));
                            var y = new fn(p, m, v);
                            oi.getNormal(i, r, o, y.normal), g.face = y
                        }
                        return g
                    }

                    return function (p, v) {
                        var g, y = this.geometry, w = this.material, x = this.matrixWorld;
                        if (void 0 !== w && (null === y.boundingSphere && y.computeBoundingSphere(), n.copy(y.boundingSphere), n.applyMatrix4(x), !1 !== p.ray.intersectsSphere(n) && (t.getInverse(x), e.copy(p.ray).applyMatrix4(t), null === y.boundingBox || !1 !== e.intersectsBox(y.boundingBox)))) if (y.isBufferGeometry) {
                            var M, _, E, S, b, T, L, C, R, A = y.index, P = y.attributes.position, N = y.attributes.uv,
                                z = y.groups, U = y.drawRange;
                            if (null !== A) if (Array.isArray(w)) for (S = 0, T = z.length; S < T; S++) for (R = w[(C = z[S]).materialIndex], b = Math.max(C.start, U.start), L = Math.min(C.start + C.count, U.start + U.count); b < L; b += 3) M = A.getX(b), _ = A.getX(b + 1), E = A.getX(b + 2), (g = m(this, R, p, e, P, N, M, _, E)) && (g.faceIndex = Math.floor(b / 3), v.push(g)); else for (S = Math.max(0, U.start), T = Math.min(A.count, U.start + U.count); S < T; S += 3) M = A.getX(S), _ = A.getX(S + 1), E = A.getX(S + 2), (g = m(this, w, p, e, P, N, M, _, E)) && (g.faceIndex = Math.floor(S / 3), v.push(g)); else if (void 0 !== P) if (Array.isArray(w)) for (S = 0, T = z.length; S < T; S++) for (R = w[(C = z[S]).materialIndex], b = Math.max(C.start, U.start), L = Math.min(C.start + C.count, U.start + U.count); b < L; b += 3) (g = m(this, R, p, e, P, N, M = b, _ = b + 1, E = b + 2)) && (g.faceIndex = Math.floor(b / 3), v.push(g)); else for (S = Math.max(0, U.start), T = Math.min(P.count, U.start + U.count); S < T; S += 3) (g = m(this, w, p, e, P, N, M = S, _ = S + 1, E = S + 2)) && (g.faceIndex = Math.floor(S / 3), v.push(g))
                        } else if (y.isGeometry) {
                            var H, G, O, I, F = Array.isArray(w), B = y.vertices, k = y.faces, V = y.faceVertexUvs[0];
                            V.length > 0 && (I = V);
                            for (var W = 0, D = k.length; W < D; W++) {
                                var X = k[W], Y = F ? w[X.materialIndex] : w;
                                if (void 0 !== Y) {
                                    if (H = B[X.a], G = B[X.b], O = B[X.c], !0 === Y.morphTargets) {
                                        var Z = y.morphTargets, J = this.morphTargetInfluences;
                                        i.set(0, 0, 0), r.set(0, 0, 0), o.set(0, 0, 0);
                                        for (var Q = 0, K = Z.length; Q < K; Q++) {
                                            var q = J[Q];
                                            if (0 !== q) {
                                                var $ = Z[Q].vertices;
                                                i.addScaledVector(a.subVectors($[X.a], H), q), r.addScaledVector(s.subVectors($[X.b], G), q), o.addScaledVector(h.subVectors($[X.c], O), q)
                                            }
                                        }
                                        i.add(H), r.add(G), o.add(O), H = i, G = r, O = o
                                    }
                                    if (g = d(this, Y, p, e, H, G, O, f)) {
                                        if (I && I[W]) {
                                            var j = I[W];
                                            c.copy(j[0]), u.copy(j[1]), l.copy(j[2]), g.uv = oi.getUV(f, H, G, O, c, u, l, new Ne)
                                        }
                                        g.face = X, g.faceIndex = W, v.push(g)
                                    }
                                }
                            }
                        }
                    }
                }(), clone: function () {
                    return new this.constructor(this.geometry, this.material).copy(this)
                }
            }), (wi.prototype = Object.create(De.prototype)).constructor = wi, wi.prototype.isCubeTexture = !0, Object.defineProperty(wi.prototype, "images", {
                get: function () {
                    return this.image
                }, set: function (t) {
                    this.image = t
                }
            }), (xi.prototype = Object.create(De.prototype)).constructor = xi, xi.prototype.isDataTexture3D = !0;
            var Mi = new De, _i = new xi, Ei = new wi;

            function Si() {
                this.seq = [], this.map = {}
            }

            var bi = [], Ti = [], Li = new Float32Array(16), Ci = new Float32Array(9), Ri = new Float32Array(4);

            function Ai(t, e, n) {
                var i = t[0];
                if (i <= 0 || i > 0) return t;
                var r = e * n, o = bi[r];
                if (void 0 === o && (o = new Float32Array(r), bi[r] = o), 0 !== e) {
                    i.toArray(o, 0);
                    for (var a = 1, s = 0; a !== e; ++a) t[a].toArray(o, s += n)
                }
                return o
            }

            function Pi(t, e) {
                if (t.length !== e.length) return !1;
                for (var n = 0, i = t.length; n < i; n++) if (t[n] !== e[n]) return !1;
                return !0
            }

            function Ni(t, e) {
                for (var n = 0, i = e.length; n < i; n++) t[n] = e[n]
            }

            function zi(t, e) {
                var n = Ti[e];
                void 0 === n && (n = new Int32Array(e), Ti[e] = n);
                for (var i = 0; i !== e; ++i) n[i] = t.allocTextureUnit();
                return n
            }

            function Ui(t, e) {
                var n = this.cache;
                n[0] !== e && (t.uniform1f(this.addr, e), n[0] = e)
            }

            function Hi(t, e) {
                var n = this.cache;
                n[0] !== e && (t.uniform1i(this.addr, e), n[0] = e)
            }

            function Gi(t, e) {
                var n = this.cache;
                if (void 0 !== e.x) n[0] === e.x && n[1] === e.y || (t.uniform2f(this.addr, e.x, e.y), n[0] = e.x, n[1] = e.y); else {
                    if (Pi(n, e)) return;
                    t.uniform2fv(this.addr, e), Ni(n, e)
                }
            }

            function Oi(t, e) {
                var n = this.cache;
                if (void 0 !== e.x) n[0] === e.x && n[1] === e.y && n[2] === e.z || (t.uniform3f(this.addr, e.x, e.y, e.z), n[0] = e.x, n[1] = e.y, n[2] = e.z); else if (void 0 !== e.r) n[0] === e.r && n[1] === e.g && n[2] === e.b || (t.uniform3f(this.addr, e.r, e.g, e.b), n[0] = e.r, n[1] = e.g, n[2] = e.b); else {
                    if (Pi(n, e)) return;
                    t.uniform3fv(this.addr, e), Ni(n, e)
                }
            }

            function Ii(t, e) {
                var n = this.cache;
                if (void 0 !== e.x) n[0] === e.x && n[1] === e.y && n[2] === e.z && n[3] === e.w || (t.uniform4f(this.addr, e.x, e.y, e.z, e.w), n[0] = e.x, n[1] = e.y, n[2] = e.z, n[3] = e.w); else {
                    if (Pi(n, e)) return;
                    t.uniform4fv(this.addr, e), Ni(n, e)
                }
            }

            function Fi(t, e) {
                var n = this.cache, i = e.elements;
                if (void 0 === i) {
                    if (Pi(n, e)) return;
                    t.uniformMatrix2fv(this.addr, !1, e), Ni(n, e)
                } else {
                    if (Pi(n, i)) return;
                    Ri.set(i), t.uniformMatrix2fv(this.addr, !1, Ri), Ni(n, i)
                }
            }

            function Bi(t, e) {
                var n = this.cache, i = e.elements;
                if (void 0 === i) {
                    if (Pi(n, e)) return;
                    t.uniformMatrix3fv(this.addr, !1, e), Ni(n, e)
                } else {
                    if (Pi(n, i)) return;
                    Ci.set(i), t.uniformMatrix3fv(this.addr, !1, Ci), Ni(n, i)
                }
            }

            function ki(t, e) {
                var n = this.cache, i = e.elements;
                if (void 0 === i) {
                    if (Pi(n, e)) return;
                    t.uniformMatrix4fv(this.addr, !1, e), Ni(n, e)
                } else {
                    if (Pi(n, i)) return;
                    Li.set(i), t.uniformMatrix4fv(this.addr, !1, Li), Ni(n, i)
                }
            }

            function Vi(t, e, n) {
                var i = this.cache, r = n.allocTextureUnit();
                i[0] !== r && (t.uniform1i(this.addr, r), i[0] = r), n.setTexture2D(e || Mi, r)
            }

            function Wi(t, e, n) {
                var i = this.cache, r = n.allocTextureUnit();
                i[0] !== r && (t.uniform1i(this.addr, r), i[0] = r), n.setTexture3D(e || _i, r)
            }

            function Di(t, e, n) {
                var i = this.cache, r = n.allocTextureUnit();
                i[0] !== r && (t.uniform1i(this.addr, r), i[0] = r), n.setTextureCube(e || Ei, r)
            }

            function Xi(t, e) {
                var n = this.cache;
                Pi(n, e) || (t.uniform2iv(this.addr, e), Ni(n, e))
            }

            function Yi(t, e) {
                var n = this.cache;
                Pi(n, e) || (t.uniform3iv(this.addr, e), Ni(n, e))
            }

            function Zi(t, e) {
                var n = this.cache;
                Pi(n, e) || (t.uniform4iv(this.addr, e), Ni(n, e))
            }

            function Ji(t, e) {
                var n = this.cache;
                Pi(n, e) || (t.uniform1fv(this.addr, e), Ni(n, e))
            }

            function Qi(t, e) {
                var n = this.cache;
                Pi(n, e) || (t.uniform1iv(this.addr, e), Ni(n, e))
            }

            function Ki(t, e) {
                var n = this.cache, i = Ai(e, this.size, 2);
                Pi(n, i) || (t.uniform2fv(this.addr, i), this.updateCache(i))
            }

            function qi(t, e) {
                var n = this.cache, i = Ai(e, this.size, 3);
                Pi(n, i) || (t.uniform3fv(this.addr, i), this.updateCache(i))
            }

            function $i(t, e) {
                var n = this.cache, i = Ai(e, this.size, 4);
                Pi(n, i) || (t.uniform4fv(this.addr, i), this.updateCache(i))
            }

            function ji(t, e) {
                var n = this.cache, i = Ai(e, this.size, 4);
                Pi(n, i) || (t.uniformMatrix2fv(this.addr, !1, i), this.updateCache(i))
            }

            function tr(t, e) {
                var n = this.cache, i = Ai(e, this.size, 9);
                Pi(n, i) || (t.uniformMatrix3fv(this.addr, !1, i), this.updateCache(i))
            }

            function er(t, e) {
                var n = this.cache, i = Ai(e, this.size, 16);
                Pi(n, i) || (t.uniformMatrix4fv(this.addr, !1, i), this.updateCache(i))
            }

            function nr(t, e, n) {
                var i = this.cache, r = e.length, o = zi(n, r);
                !1 === Pi(i, o) && (t.uniform1iv(this.addr, o), Ni(i, o));
                for (var a = 0; a !== r; ++a) n.setTexture2D(e[a] || Mi, o[a])
            }

            function ir(t, e, n) {
                var i = this.cache, r = e.length, o = zi(n, r);
                !1 === Pi(i, o) && (t.uniform1iv(this.addr, o), Ni(i, o));
                for (var a = 0; a !== r; ++a) n.setTextureCube(e[a] || Ei, o[a])
            }

            function rr(t, e, n) {
                this.id = t, this.addr = n, this.cache = [], this.setValue = function (t) {
                    switch (t) {
                        case 5126:
                            return Ui;
                        case 35664:
                            return Gi;
                        case 35665:
                            return Oi;
                        case 35666:
                            return Ii;
                        case 35674:
                            return Fi;
                        case 35675:
                            return Bi;
                        case 35676:
                            return ki;
                        case 35678:
                        case 36198:
                            return Vi;
                        case 35679:
                            return Wi;
                        case 35680:
                            return Di;
                        case 5124:
                        case 35670:
                            return Hi;
                        case 35667:
                        case 35671:
                            return Xi;
                        case 35668:
                        case 35672:
                            return Yi;
                        case 35669:
                        case 35673:
                            return Zi
                    }
                }(e.type)
            }

            function or(t, e, n) {
                this.id = t, this.addr = n, this.cache = [], this.size = e.size, this.setValue = function (t) {
                    switch (t) {
                        case 5126:
                            return Ji;
                        case 35664:
                            return Ki;
                        case 35665:
                            return qi;
                        case 35666:
                            return $i;
                        case 35674:
                            return ji;
                        case 35675:
                            return tr;
                        case 35676:
                            return er;
                        case 35678:
                            return nr;
                        case 35680:
                            return ir;
                        case 5124:
                        case 35670:
                            return Qi;
                        case 35667:
                        case 35671:
                            return Xi;
                        case 35668:
                        case 35672:
                            return Yi;
                        case 35669:
                        case 35673:
                            return Zi
                    }
                }(e.type)
            }

            function ar(t) {
                this.id = t, Si.call(this)
            }

            or.prototype.updateCache = function (t) {
                var e = this.cache;
                t instanceof Float32Array && e.length !== t.length && (this.cache = new Float32Array(t.length)), Ni(e, t)
            }, ar.prototype.setValue = function (t, e, n) {
                for (var i = this.seq, r = 0, o = i.length; r !== o; ++r) {
                    var a = i[r];
                    a.setValue(t, e[a.id], n)
                }
            };
            var sr = /([\w\d_]+)(\])?(\[|\.)?/g;

            function hr(t, e) {
                t.seq.push(e), t.map[e.id] = e
            }

            function cr(t, e, n) {
                var i = t.name, r = i.length;
                for (sr.lastIndex = 0; ;) {
                    var o = sr.exec(i), a = o[1], s = o[3];
                    if ("]" === o[2] && (a |= 0), void 0 === s || "[" === s && sr.lastIndex + 2 === r) {
                        hr(n, void 0 === s ? new rr(a, t, e) : new or(a, t, e));
                        break
                    }
                    var h = n.map[a];
                    void 0 === h && hr(n, h = new ar(a)), n = h
                }
            }

            function ur(t, e, n) {
                Si.call(this), this.renderer = n;
                for (var i = t.getProgramParameter(e, 35718), r = 0; r < i; ++r) {
                    var o = t.getActiveUniform(e, r);
                    cr(o, t.getUniformLocation(e, o.name), this)
                }
            }

            function lr(t, e, n) {
                var i = t.createShader(e);
                return t.shaderSource(i, n), t.compileShader(i), !1 === t.getShaderParameter(i, 35713) && console.error("THREE.WebGLShader: Shader couldn't compile."), "" !== t.getShaderInfoLog(i) && console.warn("THREE.WebGLShader: gl.getShaderInfoLog()", 35633 === e ? "vertex" : "fragment", t.getShaderInfoLog(i), function (t) {
                    for (var e = t.split("\n"), n = 0; n < e.length; n++) e[n] = n + 1 + ": " + e[n];
                    return e.join("\n")
                }(n)), i
            }

            ur.prototype.setValue = function (t, e, n) {
                var i = this.map[e];
                void 0 !== i && i.setValue(t, n, this.renderer)
            }, ur.prototype.setOptional = function (t, e, n) {
                var i = e[n];
                void 0 !== i && this.setValue(t, n, i)
            }, ur.upload = function (t, e, n, i) {
                for (var r = 0, o = e.length; r !== o; ++r) {
                    var a = e[r], s = n[a.id];
                    !1 !== s.needsUpdate && a.setValue(t, s.value, i)
                }
            }, ur.seqWithValue = function (t, e) {
                for (var n = [], i = 0, r = t.length; i !== r; ++i) {
                    var o = t[i];
                    o.id in e && n.push(o)
                }
                return n
            };
            var fr = 0;

            function pr(t) {
                switch (t) {
                    case xe:
                        return ["Linear", "( value )"];
                    case Me:
                        return ["sRGB", "( value )"];
                    case Ee:
                        return ["RGBE", "( value )"];
                    case Se:
                        return ["RGBM", "( value, 7.0 )"];
                    case be:
                        return ["RGBM", "( value, 16.0 )"];
                    case Te:
                        return ["RGBD", "( value, 256.0 )"];
                    case _e:
                        return ["Gamma", "( value, float( GAMMA_FACTOR ) )"];
                    default:
                        throw new Error("unsupported encoding: " + t)
                }
            }

            function dr(t, e) {
                var n = pr(e);
                return "vec4 " + t + "( vec4 value ) { return " + n[0] + "ToLinear" + n[1] + "; }"
            }

            function mr(t, e) {
                var n;
                switch (e) {
                    case ot:
                        n = "Linear";
                        break;
                    case at:
                        n = "Reinhard";
                        break;
                    case st:
                        n = "Uncharted2";
                        break;
                    case ht:
                        n = "OptimizedCineon";
                        break;
                    default:
                        throw new Error("unsupported toneMapping: " + e)
                }
                return "vec3 " + t + "( vec3 color ) { return " + n + "ToneMapping( color ); }"
            }

            function vr(t) {
                return "" !== t
            }

            function gr(t, e) {
                return t.replace(/NUM_DIR_LIGHTS/g, e.numDirLights).replace(/NUM_SPOT_LIGHTS/g, e.numSpotLights).replace(/NUM_RECT_AREA_LIGHTS/g, e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g, e.numPointLights).replace(/NUM_HEMI_LIGHTS/g, e.numHemiLights)
            }

            function yr(t, e) {
                return t.replace(/NUM_CLIPPING_PLANES/g, e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g, e.numClippingPlanes - e.numClipIntersection)
            }

            function wr(t) {
                return t.replace(/^[ \t]*#include +<([\w\d.\/]+)>/gm, function (t, e) {
                    var n = nn[e];
                    if (void 0 === n) throw new Error("Can not resolve #include <" + e + ">");
                    return wr(n)
                })
            }

            function xr(t) {
                return t.replace(/#pragma unroll_loop[\s]+?for \( int i \= (\d+)\; i < (\d+)\; i \+\+ \) \{([\s\S]+?)(?=\})\}/g, function (t, e, n, i) {
                    for (var r = "", o = parseInt(e); o < parseInt(n); o++) r += i.replace(/\[ i \]/g, "[ " + o + " ]");
                    return r
                })
            }

            function Mr(t, e, n, i, r, o, a) {
                var s = t.context, h = i.defines, c = r.vertexShader, u = r.fragmentShader, l = "SHADOWMAP_TYPE_BASIC";
                o.shadowMapType === g ? l = "SHADOWMAP_TYPE_PCF" : o.shadowMapType === y && (l = "SHADOWMAP_TYPE_PCF_SOFT");
                var f = "ENVMAP_TYPE_CUBE", p = "ENVMAP_MODE_REFLECTION", d = "ENVMAP_BLENDING_MULTIPLY";
                if (o.envMap) {
                    switch (i.envMap.mapping) {
                        case ct:
                        case ut:
                            f = "ENVMAP_TYPE_CUBE";
                            break;
                        case dt:
                        case mt:
                            f = "ENVMAP_TYPE_CUBE_UV";
                            break;
                        case lt:
                        case ft:
                            f = "ENVMAP_TYPE_EQUIREC";
                            break;
                        case pt:
                            f = "ENVMAP_TYPE_SPHERE"
                    }
                    switch (i.envMap.mapping) {
                        case ut:
                        case ft:
                            p = "ENVMAP_MODE_REFRACTION"
                    }
                    switch (i.combine) {
                        case et:
                            d = "ENVMAP_BLENDING_MULTIPLY";
                            break;
                        case nt:
                            d = "ENVMAP_BLENDING_MIX";
                            break;
                        case it:
                            d = "ENVMAP_BLENDING_ADD"
                    }
                }
                var m, v, w, x, M, _ = t.gammaFactor > 0 ? t.gammaFactor : 1, E = a.isWebGL2 ? "" : function (t, e, n) {
                    return [(t = t || {}).derivatives || e.envMapCubeUV || e.bumpMap || e.normalMap && !e.objectSpaceNormalMap || e.flatShading ? "#extension GL_OES_standard_derivatives : enable" : "", (t.fragDepth || e.logarithmicDepthBuffer) && n.get("EXT_frag_depth") ? "#extension GL_EXT_frag_depth : enable" : "", t.drawBuffers && n.get("WEBGL_draw_buffers") ? "#extension GL_EXT_draw_buffers : require" : "", (t.shaderTextureLOD || e.envMap) && n.get("EXT_shader_texture_lod") ? "#extension GL_EXT_shader_texture_lod : enable" : ""].filter(vr).join("\n")
                }(i.extensions, o, e), S = function (t) {
                    var e = [];
                    for (var n in t) {
                        var i = t[n];
                        !1 !== i && e.push("#define " + n + " " + i)
                    }
                    return e.join("\n")
                }(h), b = s.createProgram();
                if (i.isRawShaderMaterial ? ((m = [S].filter(vr).join("\n")).length > 0 && (m += "\n"), (v = [E, S].filter(vr).join("\n")).length > 0 && (v += "\n")) : (m = ["precision " + o.precision + " float;", "precision " + o.precision + " int;", "#define SHADER_NAME " + r.name, S, o.supportsVertexTextures ? "#define VERTEX_TEXTURES" : "", "#define GAMMA_FACTOR " + _, "#define MAX_BONES " + o.maxBones, o.useFog && o.fog ? "#define USE_FOG" : "", o.useFog && o.fogExp ? "#define FOG_EXP2" : "", o.map ? "#define USE_MAP" : "", o.envMap ? "#define USE_ENVMAP" : "", o.envMap ? "#define " + p : "", o.lightMap ? "#define USE_LIGHTMAP" : "", o.aoMap ? "#define USE_AOMAP" : "", o.emissiveMap ? "#define USE_EMISSIVEMAP" : "", o.bumpMap ? "#define USE_BUMPMAP" : "", o.normalMap ? "#define USE_NORMALMAP" : "", o.normalMap && o.objectSpaceNormalMap ? "#define OBJECTSPACE_NORMALMAP" : "", o.displacementMap && o.supportsVertexTextures ? "#define USE_DISPLACEMENTMAP" : "", o.specularMap ? "#define USE_SPECULARMAP" : "", o.roughnessMap ? "#define USE_ROUGHNESSMAP" : "", o.metalnessMap ? "#define USE_METALNESSMAP" : "", o.alphaMap ? "#define USE_ALPHAMAP" : "", o.vertexColors ? "#define USE_COLOR" : "", o.flatShading ? "#define FLAT_SHADED" : "", o.skinning ? "#define USE_SKINNING" : "", o.useVertexTexture ? "#define BONE_TEXTURE" : "", o.morphTargets ? "#define USE_MORPHTARGETS" : "", o.morphNormals && !1 === o.flatShading ? "#define USE_MORPHNORMALS" : "", o.doubleSided ? "#define DOUBLE_SIDED" : "", o.flipSided ? "#define FLIP_SIDED" : "", o.shadowMapEnabled ? "#define USE_SHADOWMAP" : "", o.shadowMapEnabled ? "#define " + l : "", o.sizeAttenuation ? "#define USE_SIZEATTENUATION" : "", o.logarithmicDepthBuffer ? "#define USE_LOGDEPTHBUF" : "", o.logarithmicDepthBuffer && (a.isWebGL2 || e.get("EXT_frag_depth")) ? "#define USE_LOGDEPTHBUF_EXT" : "", "uniform mat4 modelMatrix;", "uniform mat4 modelViewMatrix;", "uniform mat4 projectionMatrix;", "uniform mat4 viewMatrix;", "uniform mat3 normalMatrix;", "uniform vec3 cameraPosition;", "attribute vec3 position;", "attribute vec3 normal;", "attribute vec2 uv;", "#ifdef USE_COLOR", "\tattribute vec3 color;", "#endif", "#ifdef USE_MORPHTARGETS", "\tattribute vec3 morphTarget0;", "\tattribute vec3 morphTarget1;", "\tattribute vec3 morphTarget2;", "\tattribute vec3 morphTarget3;", "\t#ifdef USE_MORPHNORMALS", "\t\tattribute vec3 morphNormal0;", "\t\tattribute vec3 morphNormal1;", "\t\tattribute vec3 morphNormal2;", "\t\tattribute vec3 morphNormal3;", "\t#else", "\t\tattribute vec3 morphTarget4;", "\t\tattribute vec3 morphTarget5;", "\t\tattribute vec3 morphTarget6;", "\t\tattribute vec3 morphTarget7;", "\t#endif", "#endif", "#ifdef USE_SKINNING", "\tattribute vec4 skinIndex;", "\tattribute vec4 skinWeight;", "#endif", "\n"].filter(vr).join("\n"), v = [E, "precision " + o.precision + " float;", "precision " + o.precision + " int;", "#define SHADER_NAME " + r.name, S, o.alphaTest ? "#define ALPHATEST " + o.alphaTest + (o.alphaTest % 1 ? "" : ".0") : "", "#define GAMMA_FACTOR " + _, o.useFog && o.fog ? "#define USE_FOG" : "", o.useFog && o.fogExp ? "#define FOG_EXP2" : "", o.map ? "#define USE_MAP" : "", o.envMap ? "#define USE_ENVMAP" : "", o.envMap ? "#define " + f : "", o.envMap ? "#define " + p : "", o.envMap ? "#define " + d : "", o.lightMap ? "#define USE_LIGHTMAP" : "", o.aoMap ? "#define USE_AOMAP" : "", o.emissiveMap ? "#define USE_EMISSIVEMAP" : "", o.bumpMap ? "#define USE_BUMPMAP" : "", o.normalMap ? "#define USE_NORMALMAP" : "", o.normalMap && o.objectSpaceNormalMap ? "#define OBJECTSPACE_NORMALMAP" : "", o.specularMap ? "#define USE_SPECULARMAP" : "", o.roughnessMap ? "#define USE_ROUGHNESSMAP" : "", o.metalnessMap ? "#define USE_METALNESSMAP" : "", o.alphaMap ? "#define USE_ALPHAMAP" : "", o.vertexColors ? "#define USE_COLOR" : "", o.gradientMap ? "#define USE_GRADIENTMAP" : "", o.flatShading ? "#define FLAT_SHADED" : "", o.doubleSided ? "#define DOUBLE_SIDED" : "", o.flipSided ? "#define FLIP_SIDED" : "", o.shadowMapEnabled ? "#define USE_SHADOWMAP" : "", o.shadowMapEnabled ? "#define " + l : "", o.premultipliedAlpha ? "#define PREMULTIPLIED_ALPHA" : "", o.physicallyCorrectLights ? "#define PHYSICALLY_CORRECT_LIGHTS" : "", o.logarithmicDepthBuffer ? "#define USE_LOGDEPTHBUF" : "", o.logarithmicDepthBuffer && (a.isWebGL2 || e.get("EXT_frag_depth")) ? "#define USE_LOGDEPTHBUF_EXT" : "", o.envMap && (a.isWebGL2 || e.get("EXT_shader_texture_lod")) ? "#define TEXTURE_LOD_EXT" : "", "uniform mat4 viewMatrix;", "uniform vec3 cameraPosition;", o.toneMapping !== rt ? "#define TONE_MAPPING" : "", o.toneMapping !== rt ? nn.tonemapping_pars_fragment : "", o.toneMapping !== rt ? mr("toneMapping", o.toneMapping) : "", o.dithering ? "#define DITHERING" : "", o.outputEncoding || o.mapEncoding || o.matcapEncoding || o.envMapEncoding || o.emissiveMapEncoding ? nn.encodings_pars_fragment : "", o.mapEncoding ? dr("mapTexelToLinear", o.mapEncoding) : "", o.matcapEncoding ? dr("matcapTexelToLinear", o.matcapEncoding) : "", o.envMapEncoding ? dr("envMapTexelToLinear", o.envMapEncoding) : "", o.emissiveMapEncoding ? dr("emissiveMapTexelToLinear", o.emissiveMapEncoding) : "", o.outputEncoding ? (w = "linearToOutputTexel", x = o.outputEncoding, M = pr(x), "vec4 " + w + "( vec4 value ) { return LinearTo" + M[0] + M[1] + "; }") : "", o.depthPacking ? "#define DEPTH_PACKING " + i.depthPacking : "", "\n"].filter(vr).join("\n")), c = yr(c = gr(c = wr(c), o), o), u = yr(u = gr(u = wr(u), o), o), c = xr(c), u = xr(u), a.isWebGL2 && !i.isRawShaderMaterial) {
                    var T = !1, L = /^\s*#version\s+300\s+es\s*\n/;
                    i.isShaderMaterial && null !== c.match(L) && null !== u.match(L) && (T = !0, c = c.replace(L, ""), u = u.replace(L, "")), m = ["#version 300 es\n", "#define attribute in", "#define varying out", "#define texture2D texture"].join("\n") + "\n" + m, v = ["#version 300 es\n", "#define varying in", T ? "" : "out highp vec4 pc_fragColor;", T ? "" : "#define gl_FragColor pc_fragColor", "#define gl_FragDepthEXT gl_FragDepth", "#define texture2D texture", "#define textureCube texture", "#define texture2DProj textureProj", "#define texture2DLodEXT textureLod", "#define texture2DProjLodEXT textureProjLod", "#define textureCubeLodEXT textureLod", "#define texture2DGradEXT textureGrad", "#define texture2DProjGradEXT textureProjGrad", "#define textureCubeGradEXT textureGrad"].join("\n") + "\n" + v
                }
                var C = v + u, R = lr(s, 35633, m + c), A = lr(s, 35632, C);
                s.attachShader(b, R), s.attachShader(b, A), void 0 !== i.index0AttributeName ? s.bindAttribLocation(b, 0, i.index0AttributeName) : !0 === o.morphTargets && s.bindAttribLocation(b, 0, "position"), s.linkProgram(b);
                var P, N, z = s.getProgramInfoLog(b).trim(), U = s.getShaderInfoLog(R).trim(),
                    H = s.getShaderInfoLog(A).trim(), G = !0, O = !0;
                return !1 === s.getProgramParameter(b, 35714) ? (G = !1, console.error("THREE.WebGLProgram: shader error: ", s.getError(), "35715", s.getProgramParameter(b, 35715), "gl.getProgramInfoLog", z, U, H)) : "" !== z ? console.warn("THREE.WebGLProgram: gl.getProgramInfoLog()", z) : "" !== U && "" !== H || (O = !1), O && (this.diagnostics = {
                    runnable: G,
                    material: i,
                    programLog: z,
                    vertexShader: {log: U, prefix: m},
                    fragmentShader: {log: H, prefix: v}
                }), s.deleteShader(R), s.deleteShader(A), this.getUniforms = function () {
                    return void 0 === P && (P = new ur(s, b, t)), P
                }, this.getAttributes = function () {
                    return void 0 === N && (N = function (t, e) {
                        for (var n = {}, i = t.getProgramParameter(e, 35721), r = 0; r < i; r++) {
                            var o = t.getActiveAttrib(e, r).name;
                            n[o] = t.getAttribLocation(e, o)
                        }
                        return n
                    }(s, b)), N
                }, this.destroy = function () {
                    s.deleteProgram(b), this.program = void 0
                }, Object.defineProperties(this, {
                    uniforms: {
                        get: function () {
                            return console.warn("THREE.WebGLProgram: .uniforms is now .getUniforms()."), this.getUniforms()
                        }
                    }, attributes: {
                        get: function () {
                            return console.warn("THREE.WebGLProgram: .attributes is now .getAttributes()."), this.getAttributes()
                        }
                    }
                }), this.name = r.name, this.id = fr++, this.code = n, this.usedTimes = 1, this.program = b, this.vertexShader = R, this.fragmentShader = A, this
            }

            function _r(t, e, n) {
                var i = [], r = {
                        MeshDepthMaterial: "depth",
                        MeshDistanceMaterial: "distanceRGBA",
                        MeshNormalMaterial: "normal",
                        MeshBasicMaterial: "basic",
                        MeshLambertMaterial: "lambert",
                        MeshPhongMaterial: "phong",
                        MeshToonMaterial: "phong",
                        MeshStandardMaterial: "physical",
                        MeshPhysicalMaterial: "physical",
                        MeshMatcapMaterial: "matcap",
                        LineBasicMaterial: "basic",
                        LineDashedMaterial: "dashed",
                        PointsMaterial: "points",
                        ShadowMaterial: "shadow",
                        SpriteMaterial: "sprite"
                    },
                    o = ["precision", "supportsVertexTextures", "map", "mapEncoding", "matcapEncoding", "envMap", "envMapMode", "envMapEncoding", "lightMap", "aoMap", "emissiveMap", "emissiveMapEncoding", "bumpMap", "normalMap", "objectSpaceNormalMap", "displacementMap", "specularMap", "roughnessMap", "metalnessMap", "gradientMap", "alphaMap", "combine", "vertexColors", "fog", "useFog", "fogExp", "flatShading", "sizeAttenuation", "logarithmicDepthBuffer", "skinning", "maxBones", "useVertexTexture", "morphTargets", "morphNormals", "maxMorphTargets", "maxMorphNormals", "premultipliedAlpha", "numDirLights", "numPointLights", "numSpotLights", "numHemiLights", "numRectAreaLights", "shadowMapEnabled", "shadowMapType", "toneMapping", "physicallyCorrectLights", "alphaTest", "doubleSided", "flipSided", "numClippingPlanes", "numClipIntersection", "depthPacking", "dithering"];

                function a(t, e) {
                    var n;
                    return t ? t.isTexture ? n = t.encoding : t.isWebGLRenderTarget && (console.warn("THREE.WebGLPrograms.getTextureEncodingFromMap: don't use render targets as textures. Use their .texture property instead."), n = t.texture.encoding) : n = xe, n === xe && e && (n = _e), n
                }

                this.getParameters = function (e, i, o, s, h, c, u) {
                    var l = r[e.type], f = u.isSkinnedMesh ? function (t) {
                        var e = t.skeleton.bones;
                        if (n.floatVertexTextures) return 1024;
                        var i = Math.floor((n.maxVertexUniforms - 20) / 4), r = Math.min(i, e.length);
                        return r < e.length ? (console.warn("THREE.WebGLRenderer: Skeleton has " + e.length + " bones. This GPU supports " + r + "."), 0) : r
                    }(u) : 0, p = n.precision;
                    null !== e.precision && (p = n.getMaxPrecision(e.precision)) !== e.precision && console.warn("THREE.WebGLProgram.getParameters:", e.precision, "not supported, using", p, "instead.");
                    var d = t.getRenderTarget();
                    return {
                        shaderID: l,
                        precision: p,
                        supportsVertexTextures: n.vertexTextures,
                        outputEncoding: a(d ? d.texture : null, t.gammaOutput),
                        map: !!e.map,
                        mapEncoding: a(e.map, t.gammaInput),
                        matcap: !!e.matcap,
                        matcapEncoding: a(e.matcap, t.gammaInput),
                        envMap: !!e.envMap,
                        envMapMode: e.envMap && e.envMap.mapping,
                        envMapEncoding: a(e.envMap, t.gammaInput),
                        envMapCubeUV: !!e.envMap && (e.envMap.mapping === dt || e.envMap.mapping === mt),
                        lightMap: !!e.lightMap,
                        aoMap: !!e.aoMap,
                        emissiveMap: !!e.emissiveMap,
                        emissiveMapEncoding: a(e.emissiveMap, t.gammaInput),
                        bumpMap: !!e.bumpMap,
                        normalMap: !!e.normalMap,
                        objectSpaceNormalMap: e.normalMapType === Ae,
                        displacementMap: !!e.displacementMap,
                        roughnessMap: !!e.roughnessMap,
                        metalnessMap: !!e.metalnessMap,
                        specularMap: !!e.specularMap,
                        alphaMap: !!e.alphaMap,
                        gradientMap: !!e.gradientMap,
                        combine: e.combine,
                        vertexColors: e.vertexColors,
                        fog: !!s,
                        useFog: e.fog,
                        fogExp: s && s.isFogExp2,
                        flatShading: e.flatShading,
                        sizeAttenuation: e.sizeAttenuation,
                        logarithmicDepthBuffer: n.logarithmicDepthBuffer,
                        skinning: e.skinning && f > 0,
                        maxBones: f,
                        useVertexTexture: n.floatVertexTextures,
                        morphTargets: e.morphTargets,
                        morphNormals: e.morphNormals,
                        maxMorphTargets: t.maxMorphTargets,
                        maxMorphNormals: t.maxMorphNormals,
                        numDirLights: i.directional.length,
                        numPointLights: i.point.length,
                        numSpotLights: i.spot.length,
                        numRectAreaLights: i.rectArea.length,
                        numHemiLights: i.hemi.length,
                        numClippingPlanes: h,
                        numClipIntersection: c,
                        dithering: e.dithering,
                        shadowMapEnabled: t.shadowMap.enabled && u.receiveShadow && o.length > 0,
                        shadowMapType: t.shadowMap.type,
                        toneMapping: t.toneMapping,
                        physicallyCorrectLights: t.physicallyCorrectLights,
                        premultipliedAlpha: e.premultipliedAlpha,
                        alphaTest: e.alphaTest,
                        doubleSided: e.side === M,
                        flipSided: e.side === x,
                        depthPacking: void 0 !== e.depthPacking && e.depthPacking
                    }
                }, this.getProgramCode = function (e, n) {
                    var i = [];
                    if (n.shaderID ? i.push(n.shaderID) : (i.push(e.fragmentShader), i.push(e.vertexShader)), void 0 !== e.defines) for (var r in e.defines) i.push(r), i.push(e.defines[r]);
                    for (var a = 0; a < o.length; a++) i.push(n[o[a]]);
                    return i.push(e.onBeforeCompile.toString()), i.push(t.gammaOutput), i.push(t.gammaFactor), i.join()
                }, this.acquireProgram = function (r, o, a, s) {
                    for (var h, c = 0, u = i.length; c < u; c++) {
                        var l = i[c];
                        if (l.code === s) {
                            ++(h = l).usedTimes;
                            break
                        }
                    }
                    return void 0 === h && (h = new Mr(t, e, s, r, o, a, n), i.push(h)), h
                }, this.releaseProgram = function (t) {
                    if (0 == --t.usedTimes) {
                        var e = i.indexOf(t);
                        i[e] = i[i.length - 1], i.pop(), t.destroy()
                    }
                }, this.programs = i
            }

            function Er() {
                var t = new WeakMap;
                return {
                    get: function (e) {
                        var n = t.get(e);
                        return void 0 === n && t.set(e, n = {}), n
                    }, remove: function (e) {
                        t.delete(e)
                    }, update: function (e, n, i) {
                        t.get(e)[n] = i
                    }, dispose: function () {
                        t = new WeakMap
                    }
                }
            }

            function Sr(t, e) {
                return t.renderOrder !== e.renderOrder ? t.renderOrder - e.renderOrder : t.program && e.program && t.program !== e.program ? t.program.id - e.program.id : t.material.id !== e.material.id ? t.material.id - e.material.id : t.z !== e.z ? t.z - e.z : t.id - e.id
            }

            function br(t, e) {
                return t.renderOrder !== e.renderOrder ? t.renderOrder - e.renderOrder : t.z !== e.z ? e.z - t.z : t.id - e.id
            }

            function Tr() {
                var t = [], e = 0, n = [], i = [];
                return {
                    opaque: n, transparent: i, init: function () {
                        e = 0, n.length = 0, i.length = 0
                    }, push: function (r, o, a, s, h) {
                        var c = t[e];
                        void 0 === c ? t[e] = c = {
                            id: r.id,
                            object: r,
                            geometry: o,
                            material: a,
                            program: a.program,
                            renderOrder: r.renderOrder,
                            z: s,
                            group: h
                        } : (c.id = r.id, c.object = r, c.geometry = o, c.material = a, c.program = a.program, c.renderOrder = r.renderOrder, c.z = s, c.group = h), (!0 === a.transparent ? i : n).push(c), e++
                    }, sort: function () {
                        n.length > 1 && n.sort(Sr), i.length > 1 && i.sort(br)
                    }
                }
            }

            function Lr() {
                var t = {};
                return {
                    get: function (e, n) {
                        var i = e.id + "," + n.id, r = t[i];
                        return void 0 === r && (r = new Tr, t[i] = r), r
                    }, dispose: function () {
                        t = {}
                    }
                }
            }

            function Cr() {
                var t = {};
                return {
                    get: function (e) {
                        if (void 0 !== t[e.id]) return t[e.id];
                        var n;
                        switch (e.type) {
                            case"DirectionalLight":
                                n = {
                                    direction: new He,
                                    color: new an,
                                    shadow: !1,
                                    shadowBias: 0,
                                    shadowRadius: 1,
                                    shadowMapSize: new Ne
                                };
                                break;
                            case"SpotLight":
                                n = {
                                    position: new He,
                                    direction: new He,
                                    color: new an,
                                    distance: 0,
                                    coneCos: 0,
                                    penumbraCos: 0,
                                    decay: 0,
                                    shadow: !1,
                                    shadowBias: 0,
                                    shadowRadius: 1,
                                    shadowMapSize: new Ne
                                };
                                break;
                            case"PointLight":
                                n = {
                                    position: new He,
                                    color: new an,
                                    distance: 0,
                                    decay: 0,
                                    shadow: !1,
                                    shadowBias: 0,
                                    shadowRadius: 1,
                                    shadowMapSize: new Ne,
                                    shadowCameraNear: 1,
                                    shadowCameraFar: 1e3
                                };
                                break;
                            case"HemisphereLight":
                                n = {direction: new He, skyColor: new an, groundColor: new an};
                                break;
                            case"RectAreaLight":
                                n = {color: new an, position: new He, halfWidth: new He, halfHeight: new He}
                        }
                        return t[e.id] = n, n
                    }
                }
            }

            var Rr = 0;

            function Ar() {
                var t = new Cr, e = {
                    id: Rr++,
                    hash: {
                        stateID: -1,
                        directionalLength: -1,
                        pointLength: -1,
                        spotLength: -1,
                        rectAreaLength: -1,
                        hemiLength: -1,
                        shadowsLength: -1
                    },
                    ambient: [0, 0, 0],
                    directional: [],
                    directionalShadowMap: [],
                    directionalShadowMatrix: [],
                    spot: [],
                    spotShadowMap: [],
                    spotShadowMatrix: [],
                    rectArea: [],
                    point: [],
                    pointShadowMap: [],
                    pointShadowMatrix: [],
                    hemi: []
                }, n = new He, i = new ze, r = new ze;
                return {
                    setup: function (o, a, s) {
                        for (var h = 0, c = 0, u = 0, l = 0, f = 0, p = 0, d = 0, m = 0, v = s.matrixWorldInverse, g = 0, y = o.length; g < y; g++) {
                            var w = o[g], x = w.color, M = w.intensity, _ = w.distance,
                                E = w.shadow && w.shadow.map ? w.shadow.map.texture : null;
                            if (w.isAmbientLight) h += x.r * M, c += x.g * M, u += x.b * M; else if (w.isDirectionalLight) (b = t.get(w)).color.copy(w.color).multiplyScalar(w.intensity), b.direction.setFromMatrixPosition(w.matrixWorld), n.setFromMatrixPosition(w.target.matrixWorld), b.direction.sub(n), b.direction.transformDirection(v), b.shadow = w.castShadow, w.castShadow && (b.shadowBias = (S = w.shadow).bias, b.shadowRadius = S.radius, b.shadowMapSize = S.mapSize), e.directionalShadowMap[l] = E, e.directionalShadowMatrix[l] = w.shadow.matrix, e.directional[l] = b, l++; else if (w.isSpotLight) (b = t.get(w)).position.setFromMatrixPosition(w.matrixWorld), b.position.applyMatrix4(v), b.color.copy(x).multiplyScalar(M), b.distance = _, b.direction.setFromMatrixPosition(w.matrixWorld), n.setFromMatrixPosition(w.target.matrixWorld), b.direction.sub(n), b.direction.transformDirection(v), b.coneCos = Math.cos(w.angle), b.penumbraCos = Math.cos(w.angle * (1 - w.penumbra)), b.decay = w.decay, b.shadow = w.castShadow, w.castShadow && (b.shadowBias = (S = w.shadow).bias, b.shadowRadius = S.radius, b.shadowMapSize = S.mapSize), e.spotShadowMap[p] = E, e.spotShadowMatrix[p] = w.shadow.matrix, e.spot[p] = b, p++; else if (w.isRectAreaLight) (b = t.get(w)).color.copy(x).multiplyScalar(M), b.position.setFromMatrixPosition(w.matrixWorld), b.position.applyMatrix4(v), r.identity(), i.copy(w.matrixWorld), i.premultiply(v), r.extractRotation(i), b.halfWidth.set(.5 * w.width, 0, 0), b.halfHeight.set(0, .5 * w.height, 0), b.halfWidth.applyMatrix4(r), b.halfHeight.applyMatrix4(r), e.rectArea[d] = b, d++; else if (w.isPointLight) {
                                var S;
                                (b = t.get(w)).position.setFromMatrixPosition(w.matrixWorld), b.position.applyMatrix4(v), b.color.copy(w.color).multiplyScalar(w.intensity), b.distance = w.distance, b.decay = w.decay, b.shadow = w.castShadow, w.castShadow && (b.shadowBias = (S = w.shadow).bias, b.shadowRadius = S.radius, b.shadowMapSize = S.mapSize, b.shadowCameraNear = S.camera.near, b.shadowCameraFar = S.camera.far), e.pointShadowMap[f] = E, e.pointShadowMatrix[f] = w.shadow.matrix, e.point[f] = b, f++
                            } else if (w.isHemisphereLight) {
                                var b;
                                (b = t.get(w)).direction.setFromMatrixPosition(w.matrixWorld), b.direction.transformDirection(v), b.direction.normalize(), b.skyColor.copy(w.color).multiplyScalar(M), b.groundColor.copy(w.groundColor).multiplyScalar(M), e.hemi[m] = b, m++
                            }
                        }
                        e.ambient[0] = h, e.ambient[1] = c, e.ambient[2] = u, e.directional.length = l, e.spot.length = p, e.rectArea.length = d, e.point.length = f, e.hemi.length = m, e.hash.stateID = e.id, e.hash.directionalLength = l, e.hash.pointLength = f, e.hash.spotLength = p, e.hash.rectAreaLength = d, e.hash.hemiLength = m, e.hash.shadowsLength = a.length
                    }, state: e
                }
            }

            function Pr() {
                var t = new Ar, e = [], n = [];
                return {
                    init: function () {
                        e.length = 0, n.length = 0
                    }, state: {lightsArray: e, shadowsArray: n, lights: t}, setupLights: function (i) {
                        t.setup(e, n, i)
                    }, pushLight: function (t) {
                        e.push(t)
                    }, pushShadow: function (t) {
                        n.push(t)
                    }
                }
            }

            function Nr() {
                var t = {};
                return {
                    get: function (e, n) {
                        var i;
                        return void 0 === t[e.id] ? (i = new Pr, t[e.id] = {}, t[e.id][n.id] = i) : void 0 === t[e.id][n.id] ? (i = new Pr, t[e.id][n.id] = i) : i = t[e.id][n.id], i
                    }, dispose: function () {
                        t = {}
                    }
                }
            }

            function zr(t) {
                ni.call(this), this.type = "MeshDepthMaterial", this.depthPacking = Le, this.skinning = !1, this.morphTargets = !1, this.map = null, this.alphaMap = null, this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.wireframe = !1, this.wireframeLinewidth = 1, this.fog = !1, this.lights = !1, this.setValues(t)
            }

            function Ur(t) {
                ni.call(this), this.type = "MeshDistanceMaterial", this.referencePosition = new He, this.nearDistance = 1, this.farDistance = 1e3, this.skinning = !1, this.morphTargets = !1, this.map = null, this.alphaMap = null, this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.fog = !1, this.lights = !1, this.setValues(t)
            }

            function Hr(t, e, n) {
                for (var i = new $e, r = new ze, o = new Ne, a = new Ne(n, n), s = new He, h = new He, c = 1, u = 2, l = 1 + (c | u), f = new Array(l), p = new Array(l), d = {}, m = {
                    0: x,
                    1: w,
                    2: M
                }, v = [new He(1, 0, 0), new He(-1, 0, 0), new He(0, 0, 1), new He(0, 0, -1), new He(0, 1, 0), new He(0, -1, 0)], y = [new He(0, 1, 0), new He(0, 1, 0), new He(0, 1, 0), new He(0, 1, 0), new He(0, 0, 1), new He(0, 0, -1)], _ = [new Xe, new Xe, new Xe, new Xe, new Xe, new Xe], E = 0; E !== l; ++E) {
                    var S = 0 != (E & c), b = 0 != (E & u),
                        T = new zr({depthPacking: Ce, morphTargets: S, skinning: b});
                    f[E] = T;
                    var L = new Ur({morphTargets: S, skinning: b});
                    p[E] = L
                }
                var C = this;

                function R(e, n, i, r, o, a) {
                    var s = e.geometry, h = null, l = f, v = e.customDepthMaterial;
                    if (i && (l = p, v = e.customDistanceMaterial), v) h = v; else {
                        var g = !1;
                        n.morphTargets && (s && s.isBufferGeometry ? g = s.morphAttributes && s.morphAttributes.position && s.morphAttributes.position.length > 0 : s && s.isGeometry && (g = s.morphTargets && s.morphTargets.length > 0)), e.isSkinnedMesh && !1 === n.skinning && console.warn("THREE.WebGLShadowMap: THREE.SkinnedMesh with material.skinning set to false:", e);
                        var y = 0;
                        g && (y |= c), e.isSkinnedMesh && n.skinning && (y |= u), h = l[y]
                    }
                    if (t.localClippingEnabled && !0 === n.clipShadows && 0 !== n.clippingPlanes.length) {
                        var w = h.uuid, x = n.uuid, M = d[w];
                        void 0 === M && (d[w] = M = {});
                        var _ = M[x];
                        void 0 === _ && (_ = h.clone(), M[x] = _), h = _
                    }
                    return h.visible = n.visible, h.wireframe = n.wireframe, h.side = null != n.shadowSide ? n.shadowSide : m[n.side], h.clipShadows = n.clipShadows, h.clippingPlanes = n.clippingPlanes, h.clipIntersection = n.clipIntersection, h.wireframeLinewidth = n.wireframeLinewidth, h.linewidth = n.linewidth, i && h.isMeshDistanceMaterial && (h.referencePosition.copy(r), h.nearDistance = o, h.farDistance = a), h
                }

                function A(n, r, o, a) {
                    if (!1 !== n.visible) {
                        if (n.layers.test(r.layers) && (n.isMesh || n.isLine || n.isPoints) && n.castShadow && (!n.frustumCulled || i.intersectsObject(n))) {
                            n.modelViewMatrix.multiplyMatrices(o.matrixWorldInverse, n.matrixWorld);
                            var s = e.update(n), c = n.material;
                            if (Array.isArray(c)) for (var u = s.groups, l = 0, f = u.length; l < f; l++) {
                                var p = u[l], d = c[p.materialIndex];
                                if (d && d.visible) {
                                    var m = R(n, d, a, h, o.near, o.far);
                                    t.renderBufferDirect(o, null, s, m, n, p)
                                }
                            } else if (c.visible) {
                                m = R(n, c, a, h, o.near, o.far);
                                t.renderBufferDirect(o, null, s, m, n, null)
                            }
                        }
                        for (var v = n.children, g = 0, y = v.length; g < y; g++) A(v[g], r, o, a)
                    }
                }

                this.enabled = !1, this.autoUpdate = !0, this.needsUpdate = !1, this.type = g, this.render = function (e, n, c) {
                    if (!1 !== C.enabled && (!1 !== C.autoUpdate || !1 !== C.needsUpdate) && 0 !== e.length) {
                        var u, l = t.state;
                        l.disable(3042), l.buffers.color.setClear(1, 1, 1, 1), l.buffers.depth.setTest(!0), l.setScissorTest(!1);
                        for (var f = 0, p = e.length; f < p; f++) {
                            var d = e[f], m = d.shadow, g = d && d.isPointLight;
                            if (void 0 !== m) {
                                var w = m.camera;
                                if (o.copy(m.mapSize), o.min(a), g) {
                                    var x = o.x, M = o.y;
                                    _[0].set(2 * x, M, x, M), _[1].set(0, M, x, M), _[2].set(3 * x, M, x, M), _[3].set(x, M, x, M), _[4].set(3 * x, 0, x, M), _[5].set(x, 0, x, M), o.x *= 4, o.y *= 2
                                }
                                if (null === m.map) m.map = new Ye(o.x, o.y, {
                                    minFilter: wt,
                                    magFilter: wt,
                                    format: Ft
                                }), m.map.texture.name = d.name + ".shadowMap", w.updateProjectionMatrix();
                                m.isSpotLightShadow && m.update(d);
                                var E = m.map, S = m.matrix;
                                h.setFromMatrixPosition(d.matrixWorld), w.position.copy(h), g ? (u = 6, S.makeTranslation(-h.x, -h.y, -h.z)) : (u = 1, s.setFromMatrixPosition(d.target.matrixWorld), w.lookAt(s), w.updateMatrixWorld(), S.set(.5, 0, 0, .5, 0, .5, 0, .5, 0, 0, .5, .5, 0, 0, 0, 1), S.multiply(w.projectionMatrix), S.multiply(w.matrixWorldInverse)), t.setRenderTarget(E), t.clear();
                                for (var b = 0; b < u; b++) {
                                    if (g) s.copy(w.position), s.add(v[b]), w.up.copy(y[b]), w.lookAt(s), w.updateMatrixWorld(), l.viewport(_[b]);
                                    r.multiplyMatrices(w.projectionMatrix, w.matrixWorldInverse), i.setFromMatrix(r), A(n, c, w, g)
                                }
                            } else console.warn("THREE.WebGLShadowMap:", d, "has no shadow.")
                        }
                        C.needsUpdate = !1
                    }
                }
            }

            function Gr(t, e, n, i) {
                var r = new function () {
                        var e = !1, n = new Xe, i = null, r = new Xe(0, 0, 0, 0);
                        return {
                            setMask: function (n) {
                                i === n || e || (t.colorMask(n, n, n, n), i = n)
                            }, setLocked: function (t) {
                                e = t
                            }, setClear: function (e, i, o, a, s) {
                                !0 === s && (e *= a, i *= a, o *= a), n.set(e, i, o, a), !1 === r.equals(n) && (t.clearColor(e, i, o, a), r.copy(n))
                            }, reset: function () {
                                e = !1, i = null, r.set(-1, 0, 0, 0)
                            }
                        }
                    }, o = new function () {
                        var e = !1, n = null, i = null, r = null;
                        return {
                            setTest: function (t) {
                                t ? ot(2929) : at(2929)
                            }, setMask: function (i) {
                                n === i || e || (t.depthMask(i), n = i)
                            }, setFunc: function (e) {
                                if (i !== e) {
                                    if (e) switch (e) {
                                        case Z:
                                            t.depthFunc(512);
                                            break;
                                        case J:
                                            t.depthFunc(519);
                                            break;
                                        case Q:
                                            t.depthFunc(513);
                                            break;
                                        case K:
                                            t.depthFunc(515);
                                            break;
                                        case q:
                                            t.depthFunc(514);
                                            break;
                                        case $:
                                            t.depthFunc(518);
                                            break;
                                        case j:
                                            t.depthFunc(516);
                                            break;
                                        case tt:
                                            t.depthFunc(517);
                                            break;
                                        default:
                                            t.depthFunc(515)
                                    } else t.depthFunc(515);
                                    i = e
                                }
                            }, setLocked: function (t) {
                                e = t
                            }, setClear: function (e) {
                                r !== e && (t.clearDepth(e), r = e)
                            }, reset: function () {
                                e = !1, n = null, i = null, r = null
                            }
                        }
                    }, a = new function () {
                        var e = !1, n = null, i = null, r = null, o = null, a = null, s = null, h = null, c = null;
                        return {
                            setTest: function (t) {
                                t ? ot(2960) : at(2960)
                            }, setMask: function (i) {
                                n === i || e || (t.stencilMask(i), n = i)
                            }, setFunc: function (e, n, a) {
                                i === e && r === n && o === a || (t.stencilFunc(e, n, a), i = e, r = n, o = a)
                            }, setOp: function (e, n, i) {
                                a === e && s === n && h === i || (t.stencilOp(e, n, i), a = e, s = n, h = i)
                            }, setLocked: function (t) {
                                e = t
                            }, setClear: function (e) {
                                c !== e && (t.clearStencil(e), c = e)
                            }, reset: function () {
                                e = !1, n = null, i = null, r = null, o = null, a = null, s = null, h = null, c = null
                            }
                        }
                    }, s = t.getParameter(34921), h = new Uint8Array(s), c = new Uint8Array(s), u = new Uint8Array(s),
                    l = {}, f = null, p = null, g = null, y = null, w = null, _ = null, E = null, S = null, N = null,
                    z = null, U = !1, H = null, G = null, O = null, I = null, F = null, B = t.getParameter(35661),
                    k = !1, V = 0, W = t.getParameter(7938);
                -1 !== W.indexOf("WebGL") ? (V = parseFloat(/^WebGL\ ([0-9])/.exec(W)[1]), k = V >= 1) : -1 !== W.indexOf("OpenGL ES") && (V = parseFloat(/^OpenGL\ ES\ ([0-9])/.exec(W)[1]), k = V >= 2);
                var D = null, X = {}, Y = new Xe, et = new Xe;

                function nt(e, n, i) {
                    var r = new Uint8Array(4), o = t.createTexture();
                    t.bindTexture(e, o), t.texParameteri(e, 10241, 9728), t.texParameteri(e, 10240, 9728);
                    for (var a = 0; a < i; a++) t.texImage2D(n + a, 0, 6408, 1, 1, 0, 6408, 5121, r);
                    return o
                }

                var it = {};

                function rt(n, r) {
                    (h[n] = 1, 0 === c[n] && (t.enableVertexAttribArray(n), c[n] = 1), u[n] !== r) && ((i.isWebGL2 ? t : e.get("ANGLE_instanced_arrays"))[i.isWebGL2 ? "vertexAttribDivisor" : "vertexAttribDivisorANGLE"](n, r), u[n] = r)
                }

                function ot(e) {
                    !0 !== l[e] && (t.enable(e), l[e] = !0)
                }

                function at(e) {
                    !1 !== l[e] && (t.disable(e), l[e] = !1)
                }

                function st(e, i, r, o, a, s, h, c) {
                    if (e !== b) {
                        if (g || (ot(3042), g = !0), e === A) a = a || i, s = s || r, h = h || o, i === w && a === S || (t.blendEquationSeparate(n.convert(i), n.convert(a)), w = i, S = a), r === _ && o === E && s === N && h === z || (t.blendFuncSeparate(n.convert(r), n.convert(o), n.convert(s), n.convert(h)), _ = r, E = o, N = s, z = h), y = e, U = null; else if (e !== y || c !== U) {
                            if (w === P && S === P || (t.blendEquation(32774), w = P, S = P), c) switch (e) {
                                case T:
                                    t.blendFuncSeparate(1, 771, 1, 771);
                                    break;
                                case L:
                                    t.blendFunc(1, 1);
                                    break;
                                case C:
                                    t.blendFuncSeparate(0, 0, 769, 771);
                                    break;
                                case R:
                                    t.blendFuncSeparate(0, 768, 0, 770);
                                    break;
                                default:
                                    console.error("THREE.WebGLState: Invalid blending: ", e)
                            } else switch (e) {
                                case T:
                                    t.blendFuncSeparate(770, 771, 1, 771);
                                    break;
                                case L:
                                    t.blendFunc(770, 1);
                                    break;
                                case C:
                                    t.blendFunc(0, 769);
                                    break;
                                case R:
                                    t.blendFunc(0, 768);
                                    break;
                                default:
                                    console.error("THREE.WebGLState: Invalid blending: ", e)
                            }
                            _ = null, E = null, N = null, z = null, y = e, U = c
                        }
                    } else g && (at(3042), g = !1)
                }

                function ht(e) {
                    H !== e && (t.frontFace(e ? 2304 : 2305), H = e)
                }

                function ct(e) {
                    e !== d ? (ot(2884), e !== G && t.cullFace(e === m ? 1029 : e === v ? 1028 : 1032)) : at(2884), G = e
                }

                function ut(e, n, i) {
                    e ? (ot(32823), I === n && F === i || (t.polygonOffset(n, i), I = n, F = i)) : at(32823)
                }

                function lt(e) {
                    void 0 === e && (e = 33984 + B - 1), D !== e && (t.activeTexture(e), D = e)
                }

                return it[3553] = nt(3553, 3553, 1), it[34067] = nt(34067, 34069, 6), r.setClear(0, 0, 0, 1), o.setClear(1), a.setClear(0), ot(2929), o.setFunc(K), ht(!1), ct(m), ot(2884), st(b), {
                    buffers: {color: r, depth: o, stencil: a}, initAttributes: function () {
                        for (var t = 0, e = h.length; t < e; t++) h[t] = 0
                    }, enableAttribute: function (t) {
                        rt(t, 0)
                    }, enableAttributeAndDivisor: rt, disableUnusedAttributes: function () {
                        for (var e = 0, n = c.length; e !== n; ++e) c[e] !== h[e] && (t.disableVertexAttribArray(e), c[e] = 0)
                    }, enable: ot, disable: at, getCompressedTextureFormats: function () {
                        if (null === f && (f = [], e.get("WEBGL_compressed_texture_pvrtc") || e.get("WEBGL_compressed_texture_s3tc") || e.get("WEBGL_compressed_texture_etc1") || e.get("WEBGL_compressed_texture_astc"))) for (var n = t.getParameter(34467), i = 0; i < n.length; i++) f.push(n[i]);
                        return f
                    }, useProgram: function (e) {
                        return p !== e && (t.useProgram(e), p = e, !0)
                    }, setBlending: st, setMaterial: function (t, e) {
                        t.side === M ? at(2884) : ot(2884);
                        var n = t.side === x;
                        e && (n = !n), ht(n), t.blending === T && !1 === t.transparent ? st(b) : st(t.blending, t.blendEquation, t.blendSrc, t.blendDst, t.blendEquationAlpha, t.blendSrcAlpha, t.blendDstAlpha, t.premultipliedAlpha), o.setFunc(t.depthFunc), o.setTest(t.depthTest), o.setMask(t.depthWrite), r.setMask(t.colorWrite), ut(t.polygonOffset, t.polygonOffsetFactor, t.polygonOffsetUnits)
                    }, setFlipSided: ht, setCullFace: ct, setLineWidth: function (e) {
                        e !== O && (k && t.lineWidth(e), O = e)
                    }, setPolygonOffset: ut, setScissorTest: function (t) {
                        t ? ot(3089) : at(3089)
                    }, activeTexture: lt, bindTexture: function (e, n) {
                        null === D && lt();
                        var i = X[D];
                        void 0 === i && (X[D] = i = {
                            type: void 0,
                            texture: void 0
                        }), i.type === e && i.texture === n || (t.bindTexture(e, n || it[e]), i.type = e, i.texture = n)
                    }, compressedTexImage2D: function () {
                        try {
                            t.compressedTexImage2D.apply(t, arguments)
                        } catch (t) {
                            console.error("THREE.WebGLState:", t)
                        }
                    }, texImage2D: function () {
                        try {
                            t.texImage2D.apply(t, arguments)
                        } catch (t) {
                            console.error("THREE.WebGLState:", t)
                        }
                    }, texImage3D: function () {
                        try {
                            t.texImage3D.apply(t, arguments)
                        } catch (t) {
                            console.error("THREE.WebGLState:", t)
                        }
                    }, scissor: function (e) {
                        !1 === Y.equals(e) && (t.scissor(e.x, e.y, e.z, e.w), Y.copy(e))
                    }, viewport: function (e) {
                        !1 === et.equals(e) && (t.viewport(e.x, e.y, e.z, e.w), et.copy(e))
                    }, reset: function () {
                        for (var e = 0; e < c.length; e++) 1 === c[e] && (t.disableVertexAttribArray(e), c[e] = 0);
                        l = {}, f = null, D = null, X = {}, p = null, y = null, H = null, G = null, r.reset(), o.reset(), a.reset()
                    }
                }
            }

            function Or(t, e, n, i, r, o, a) {
                var s, h = {};

                function c(t, e) {
                    if (t.width > e || t.height > e) {
                        if ("data" in t) return void console.warn("THREE.WebGLRenderer: image in DataTexture is too big (" + t.width + "x" + t.height + ").");
                        var n = e / Math.max(t.width, t.height),
                            i = document.createElementNS("http://www.w3.org/1999/xhtml", "canvas");
                        return i.width = Math.floor(t.width * n), i.height = Math.floor(t.height * n), i.getContext("2d").drawImage(t, 0, 0, t.width, t.height, 0, 0, i.width, i.height), console.warn("THREE.WebGLRenderer: image is too big (" + t.width + "x" + t.height + "). Resized to " + i.width + "x" + i.height), i
                    }
                    return t
                }

                function u(t) {
                    return Pe.isPowerOfTwo(t.width) && Pe.isPowerOfTwo(t.height)
                }

                function l(t, e) {
                    return t.generateMipmaps && e && t.minFilter !== wt && t.minFilter !== _t
                }

                function f(e, n, r, o) {
                    t.generateMipmap(e), i.get(n).__maxMipLevel = Math.log(Math.max(r, o)) * Math.LOG2E
                }

                function p(t, e) {
                    if (!r.isWebGL2) return t;
                    if (6403 === t) {
                        if (5126 === e) return 33326;
                        if (5131 === e) return 33325;
                        if (5121 === e) return 33321
                    }
                    if (6407 === t) {
                        if (5126 === e) return 34837;
                        if (5131 === e) return 34843;
                        if (5121 === e) return 32849
                    }
                    if (6408 === t) {
                        if (5126 === e) return 34836;
                        if (5131 === e) return 34842;
                        if (5121 === e) return 32856
                    }
                    return t
                }

                function d(t) {
                    return t === wt || t === xt || t === Mt ? 9728 : 9729
                }

                function m(e) {
                    var n = e.target;
                    n.removeEventListener("dispose", m), function (e) {
                        var n = i.get(e);
                        if (e.image && n.__image__webglTextureCube) t.deleteTexture(n.__image__webglTextureCube); else {
                            if (void 0 === n.__webglInit) return;
                            t.deleteTexture(n.__webglTexture)
                        }
                        i.remove(e)
                    }(n), n.isVideoTexture && delete h[n.id], a.memory.textures--
                }

                function v(e) {
                    var n = e.target;
                    n.removeEventListener("dispose", v), function (e) {
                        var n = i.get(e), r = i.get(e.texture);
                        if (!e) return;
                        void 0 !== r.__webglTexture && t.deleteTexture(r.__webglTexture);
                        e.depthTexture && e.depthTexture.dispose();
                        if (e.isWebGLRenderTargetCube) for (var o = 0; o < 6; o++) t.deleteFramebuffer(n.__webglFramebuffer[o]), n.__webglDepthbuffer && t.deleteRenderbuffer(n.__webglDepthbuffer[o]); else t.deleteFramebuffer(n.__webglFramebuffer), n.__webglDepthbuffer && t.deleteRenderbuffer(n.__webglDepthbuffer);
                        i.remove(e.texture), i.remove(e)
                    }(n), a.memory.textures--
                }

                function g(t, e) {
                    var r = i.get(t);
                    if (t.isVideoTexture && function (t) {
                        var e = t.id, n = a.render.frame;
                        h[e] !== n && (h[e] = n, t.update())
                    }(t), t.version > 0 && r.__version !== t.version) {
                        var o = t.image;
                        if (void 0 === o) console.warn("THREE.WebGLRenderer: Texture marked for update but image is undefined"); else {
                            if (!1 !== o.complete) return void w(r, t, e);
                            console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete")
                        }
                    }
                    n.activeTexture(33984 + e), n.bindTexture(3553, r.__webglTexture)
                }

                function y(n, a, s) {
                    var h;
                    if (s ? (t.texParameteri(n, 10242, o.convert(a.wrapS)), t.texParameteri(n, 10243, o.convert(a.wrapT)), t.texParameteri(n, 10240, o.convert(a.magFilter)), t.texParameteri(n, 10241, o.convert(a.minFilter))) : (t.texParameteri(n, 10242, 33071), t.texParameteri(n, 10243, 33071), a.wrapS === gt && a.wrapT === gt || console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."), t.texParameteri(n, 10240, d(a.magFilter)), t.texParameteri(n, 10241, d(a.minFilter)), a.minFilter !== wt && a.minFilter !== _t && console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")), h = e.get("EXT_texture_filter_anisotropic")) {
                        if (a.type === Pt && null === e.get("OES_texture_float_linear")) return;
                        if (a.type === Nt && null === (r.isWebGL2 || e.get("OES_texture_half_float_linear"))) return;
                        (a.anisotropy > 1 || i.get(a).__currentAnisotropy) && (t.texParameterf(n, h.TEXTURE_MAX_ANISOTROPY_EXT, Math.min(a.anisotropy, r.getMaxAnisotropy())), i.get(a).__currentAnisotropy = a.anisotropy)
                    }
                }

                function w(e, i, h) {
                    var d;
                    d = i.isDataTexture3D ? 32879 : 3553, void 0 === e.__webglInit && (e.__webglInit = !0, i.addEventListener("dispose", m), e.__webglTexture = t.createTexture(), a.memory.textures++), n.activeTexture(33984 + h), n.bindTexture(d, e.__webglTexture), t.pixelStorei(37440, i.flipY), t.pixelStorei(37441, i.premultiplyAlpha), t.pixelStorei(3317, i.unpackAlignment);
                    var v = c(i.image, r.maxTextureSize);
                    (function (t) {
                        return !r.isWebGL2 && (t.wrapS !== gt || t.wrapT !== gt || t.minFilter !== wt && t.minFilter !== _t)
                    })(i) && !1 === u(v) && (v = function (t) {
                        return t instanceof HTMLImageElement || t instanceof HTMLCanvasElement || t instanceof ImageBitmap ? (void 0 === s && (s = document.createElementNS("http://www.w3.org/1999/xhtml", "canvas")), s.width = Pe.floorPowerOfTwo(t.width), s.height = Pe.floorPowerOfTwo(t.height), s.getContext("2d").drawImage(t, 0, 0, s.width, s.height), console.warn("THREE.WebGLRenderer: image is not power of two (" + t.width + "x" + t.height + "). Resized to " + s.width + "x" + s.height), s) : t
                    }(v));
                    var g = u(v), w = o.convert(i.format), x = o.convert(i.type), M = p(w, x);
                    y(d, i, g);
                    var _, E = i.mipmaps;
                    if (i.isDepthTexture) {
                        if (M = 6402, i.type === Pt) {
                            if (!r.isWebGL2) throw new Error("Float Depth Texture only supported in WebGL2.0");
                            M = 36012
                        } else r.isWebGL2 && (M = 33189);
                        i.format === Wt && 6402 === M && i.type !== Ct && i.type !== At && (console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."), i.type = Ct, x = o.convert(i.type)), i.format === Dt && (M = 34041, i.type !== Gt && (console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."), i.type = Gt, x = o.convert(i.type))), n.texImage2D(3553, 0, M, v.width, v.height, 0, w, x, null)
                    } else if (i.isDataTexture) if (E.length > 0 && g) {
                        for (var S = 0, b = E.length; S < b; S++) n.texImage2D(3553, S, M, (_ = E[S]).width, _.height, 0, w, x, _.data);
                        i.generateMipmaps = !1, e.__maxMipLevel = E.length - 1
                    } else n.texImage2D(3553, 0, M, v.width, v.height, 0, w, x, v.data), e.__maxMipLevel = 0; else if (i.isCompressedTexture) {
                        for (S = 0, b = E.length; S < b; S++) _ = E[S], i.format !== Ft && i.format !== It ? n.getCompressedTextureFormats().indexOf(w) > -1 ? n.compressedTexImage2D(3553, S, M, _.width, _.height, 0, _.data) : console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()") : n.texImage2D(3553, S, M, _.width, _.height, 0, w, x, _.data);
                        e.__maxMipLevel = E.length - 1
                    } else if (i.isDataTexture3D) n.texImage3D(32879, 0, M, v.width, v.height, v.depth, 0, w, x, v.data), e.__maxMipLevel = 0; else if (E.length > 0 && g) {
                        for (S = 0, b = E.length; S < b; S++) n.texImage2D(3553, S, M, w, x, _ = E[S]);
                        i.generateMipmaps = !1, e.__maxMipLevel = E.length - 1
                    } else n.texImage2D(3553, 0, M, w, x, v), e.__maxMipLevel = 0;
                    l(i, g) && f(3553, i, v.width, v.height), e.__version = i.version, i.onUpdate && i.onUpdate(i)
                }

                function x(e, r, a, s) {
                    var h = o.convert(r.texture.format), c = o.convert(r.texture.type), u = p(h, c);
                    n.texImage2D(s, 0, u, r.width, r.height, 0, h, c, null), t.bindFramebuffer(36160, e), t.framebufferTexture2D(36160, a, s, i.get(r.texture).__webglTexture, 0), t.bindFramebuffer(36160, null)
                }

                function M(e, n) {
                    t.bindRenderbuffer(36161, e), n.depthBuffer && !n.stencilBuffer ? (t.renderbufferStorage(36161, 33189, n.width, n.height), t.framebufferRenderbuffer(36160, 36096, 36161, e)) : n.depthBuffer && n.stencilBuffer ? (t.renderbufferStorage(36161, 34041, n.width, n.height), t.framebufferRenderbuffer(36160, 33306, 36161, e)) : t.renderbufferStorage(36161, 32854, n.width, n.height), t.bindRenderbuffer(36161, null)
                }

                function _(e) {
                    var n = i.get(e), r = !0 === e.isWebGLRenderTargetCube;
                    if (e.depthTexture) {
                        if (r) throw new Error("target.depthTexture not supported in Cube render targets");
                        !function (e, n) {
                            if (n && n.isWebGLRenderTargetCube) throw new Error("Depth Texture with cube render targets is not supported");
                            if (t.bindFramebuffer(36160, e), !n.depthTexture || !n.depthTexture.isDepthTexture) throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");
                            i.get(n.depthTexture).__webglTexture && n.depthTexture.image.width === n.width && n.depthTexture.image.height === n.height || (n.depthTexture.image.width = n.width, n.depthTexture.image.height = n.height, n.depthTexture.needsUpdate = !0), g(n.depthTexture, 0);
                            var r = i.get(n.depthTexture).__webglTexture;
                            if (n.depthTexture.format === Wt) t.framebufferTexture2D(36160, 36096, 3553, r, 0); else {
                                if (n.depthTexture.format !== Dt) throw new Error("Unknown depthTexture format");
                                t.framebufferTexture2D(36160, 33306, 3553, r, 0)
                            }
                        }(n.__webglFramebuffer, e)
                    } else if (r) {
                        n.__webglDepthbuffer = [];
                        for (var o = 0; o < 6; o++) t.bindFramebuffer(36160, n.__webglFramebuffer[o]), n.__webglDepthbuffer[o] = t.createRenderbuffer(), M(n.__webglDepthbuffer[o], e)
                    } else t.bindFramebuffer(36160, n.__webglFramebuffer), n.__webglDepthbuffer = t.createRenderbuffer(), M(n.__webglDepthbuffer, e);
                    t.bindFramebuffer(36160, null)
                }

                this.setTexture2D = g, this.setTexture3D = function (t, e) {
                    var r = i.get(t);
                    t.version > 0 && r.__version !== t.version ? w(r, t, e) : (n.activeTexture(33984 + e), n.bindTexture(32879, r.__webglTexture))
                }, this.setTextureCube = function (e, s) {
                    var h = i.get(e);
                    if (6 === e.image.length) if (e.version > 0 && h.__version !== e.version) {
                        h.__image__webglTextureCube || (e.addEventListener("dispose", m), h.__image__webglTextureCube = t.createTexture(), a.memory.textures++), n.activeTexture(33984 + s), n.bindTexture(34067, h.__image__webglTextureCube), t.pixelStorei(37440, e.flipY);
                        for (var d = e && e.isCompressedTexture, v = e.image[0] && e.image[0].isDataTexture, g = [], w = 0; w < 6; w++) g[w] = d || v ? v ? e.image[w].image : e.image[w] : c(e.image[w], r.maxCubemapSize);
                        var x = g[0], M = u(x), _ = o.convert(e.format), E = o.convert(e.type), S = p(_, E);
                        for (y(34067, e, M), w = 0; w < 6; w++) if (d) for (var b, T = g[w].mipmaps, L = 0, C = T.length; L < C; L++) b = T[L], e.format !== Ft && e.format !== It ? n.getCompressedTextureFormats().indexOf(_) > -1 ? n.compressedTexImage2D(34069 + w, L, S, b.width, b.height, 0, b.data) : console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()") : n.texImage2D(34069 + w, L, S, b.width, b.height, 0, _, E, b.data); else v ? n.texImage2D(34069 + w, 0, S, g[w].width, g[w].height, 0, _, E, g[w].data) : n.texImage2D(34069 + w, 0, S, _, E, g[w]);
                        h.__maxMipLevel = d ? T.length - 1 : 0, l(e, M) && f(34067, e, x.width, x.height), h.__version = e.version, e.onUpdate && e.onUpdate(e)
                    } else n.activeTexture(33984 + s), n.bindTexture(34067, h.__image__webglTextureCube)
                }, this.setTextureCubeDynamic = function (t, e) {
                    n.activeTexture(33984 + e), n.bindTexture(34067, i.get(t).__webglTexture)
                }, this.setupRenderTarget = function (e) {
                    var r = i.get(e), o = i.get(e.texture);
                    e.addEventListener("dispose", v), o.__webglTexture = t.createTexture(), a.memory.textures++;
                    var s = !0 === e.isWebGLRenderTargetCube, h = u(e);
                    if (s) {
                        r.__webglFramebuffer = [];
                        for (var c = 0; c < 6; c++) r.__webglFramebuffer[c] = t.createFramebuffer()
                    } else r.__webglFramebuffer = t.createFramebuffer();
                    if (s) {
                        for (n.bindTexture(34067, o.__webglTexture), y(34067, e.texture, h), c = 0; c < 6; c++) x(r.__webglFramebuffer[c], e, 36064, 34069 + c);
                        l(e.texture, h) && f(34067, e.texture, e.width, e.height), n.bindTexture(34067, null)
                    } else n.bindTexture(3553, o.__webglTexture), y(3553, e.texture, h), x(r.__webglFramebuffer, e, 36064, 3553), l(e.texture, h) && f(3553, e.texture, e.width, e.height), n.bindTexture(3553, null);
                    e.depthBuffer && _(e)
                }, this.updateRenderTargetMipmap = function (t) {
                    var e = t.texture;
                    if (l(e, u(t))) {
                        var r = t.isWebGLRenderTargetCube ? 34067 : 3553, o = i.get(e).__webglTexture;
                        n.bindTexture(r, o), f(r, e, t.width, t.height), n.bindTexture(r, null)
                    }
                }
            }

            function Ir(t, e, n) {
                return {
                    convert: function (t) {
                        var i;
                        if (t === vt) return 10497;
                        if (t === gt) return 33071;
                        if (t === yt) return 33648;
                        if (t === wt) return 9728;
                        if (t === xt) return 9984;
                        if (t === Mt) return 9986;
                        if (t === _t) return 9729;
                        if (t === Et) return 9985;
                        if (t === St) return 9987;
                        if (t === bt) return 5121;
                        if (t === zt) return 32819;
                        if (t === Ut) return 32820;
                        if (t === Ht) return 33635;
                        if (t === Tt) return 5120;
                        if (t === Lt) return 5122;
                        if (t === Ct) return 5123;
                        if (t === Rt) return 5124;
                        if (t === At) return 5125;
                        if (t === Pt) return 5126;
                        if (t === Nt) {
                            if (n.isWebGL2) return 5131;
                            if (null !== (i = e.get("OES_texture_half_float"))) return i.HALF_FLOAT_OES
                        }
                        if (t === Ot) return 6406;
                        if (t === It) return 6407;
                        if (t === Ft) return 6408;
                        if (t === Bt) return 6409;
                        if (t === kt) return 6410;
                        if (t === Wt) return 6402;
                        if (t === Dt) return 34041;
                        if (t === Xt) return 6403;
                        if (t === P) return 32774;
                        if (t === N) return 32778;
                        if (t === z) return 32779;
                        if (t === G) return 0;
                        if (t === O) return 1;
                        if (t === I) return 768;
                        if (t === F) return 769;
                        if (t === B) return 770;
                        if (t === k) return 771;
                        if (t === V) return 772;
                        if (t === W) return 773;
                        if (t === D) return 774;
                        if (t === X) return 775;
                        if (t === Y) return 776;
                        if ((t === Yt || t === Zt || t === Jt || t === Qt) && null !== (i = e.get("WEBGL_compressed_texture_s3tc"))) {
                            if (t === Yt) return i.COMPRESSED_RGB_S3TC_DXT1_EXT;
                            if (t === Zt) return i.COMPRESSED_RGBA_S3TC_DXT1_EXT;
                            if (t === Jt) return i.COMPRESSED_RGBA_S3TC_DXT3_EXT;
                            if (t === Qt) return i.COMPRESSED_RGBA_S3TC_DXT5_EXT
                        }
                        if ((t === Kt || t === qt || t === $t || t === jt) && null !== (i = e.get("WEBGL_compressed_texture_pvrtc"))) {
                            if (t === Kt) return i.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;
                            if (t === qt) return i.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;
                            if (t === $t) return i.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;
                            if (t === jt) return i.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG
                        }
                        if (t === te && null !== (i = e.get("WEBGL_compressed_texture_etc1"))) return i.COMPRESSED_RGB_ETC1_WEBGL;
                        if ((t === ee || t === ne || t === ie || t === re || t === oe || t === ae || t === se || t === he || t === ce || t === ue || t === le || t === fe || t === pe || t === de) && null !== (i = e.get("WEBGL_compressed_texture_astc"))) return t;
                        if (t === U || t === H) {
                            if (n.isWebGL2) {
                                if (t === U) return 32775;
                                if (t === H) return 32776
                            }
                            if (null !== (i = e.get("EXT_blend_minmax"))) {
                                if (t === U) return i.MIN_EXT;
                                if (t === H) return i.MAX_EXT
                            }
                        }
                        if (t === Gt) {
                            if (n.isWebGL2) return 34042;
                            if (null !== (i = e.get("WEBGL_depth_texture"))) return i.UNSIGNED_INT_24_8_WEBGL
                        }
                        return 0
                    }
                }
            }

            function Fr() {
                xn.call(this), this.type = "Group"
            }

            function Br() {
                xn.call(this), this.type = "Camera", this.matrixWorldInverse = new ze, this.projectionMatrix = new ze, this.projectionMatrixInverse = new ze
            }

            function kr(t, e, n, i) {
                Br.call(this), this.type = "PerspectiveCamera", this.fov = void 0 !== t ? t : 50, this.zoom = 1, this.near = void 0 !== n ? n : .1, this.far = void 0 !== i ? i : 2e3, this.focus = 10, this.aspect = void 0 !== e ? e : 1, this.view = null, this.filmGauge = 35, this.filmOffset = 0, this.updateProjectionMatrix()
            }

            function Vr(t) {
                kr.call(this), this.cameras = t || []
            }

            (zr.prototype = Object.create(ni.prototype)).constructor = zr, zr.prototype.isMeshDepthMaterial = !0, zr.prototype.copy = function (t) {
                return ni.prototype.copy.call(this, t), this.depthPacking = t.depthPacking, this.skinning = t.skinning, this.morphTargets = t.morphTargets, this.map = t.map, this.alphaMap = t.alphaMap, this.displacementMap = t.displacementMap, this.displacementScale = t.displacementScale, this.displacementBias = t.displacementBias, this.wireframe = t.wireframe, this.wireframeLinewidth = t.wireframeLinewidth, this
            }, (Ur.prototype = Object.create(ni.prototype)).constructor = Ur, Ur.prototype.isMeshDistanceMaterial = !0, Ur.prototype.copy = function (t) {
                return ni.prototype.copy.call(this, t), this.referencePosition.copy(t.referencePosition), this.nearDistance = t.nearDistance, this.farDistance = t.farDistance, this.skinning = t.skinning, this.morphTargets = t.morphTargets, this.map = t.map, this.alphaMap = t.alphaMap, this.displacementMap = t.displacementMap, this.displacementScale = t.displacementScale, this.displacementBias = t.displacementBias, this
            }, Fr.prototype = Object.assign(Object.create(xn.prototype), {
                constructor: Fr,
                isGroup: !0
            }), Br.prototype = Object.assign(Object.create(xn.prototype), {
                constructor: Br,
                isCamera: !0,
                copy: function (t, e) {
                    return xn.prototype.copy.call(this, t, e), this.matrixWorldInverse.copy(t.matrixWorldInverse), this.projectionMatrix.copy(t.projectionMatrix), this.projectionMatrixInverse.copy(t.projectionMatrixInverse), this
                },
                getWorldDirection: function (t) {
                    void 0 === t && (console.warn("THREE.Camera: .getWorldDirection() target is now required"), t = new He), this.updateMatrixWorld(!0);
                    var e = this.matrixWorld.elements;
                    return t.set(-e[8], -e[9], -e[10]).normalize()
                },
                updateMatrixWorld: function (t) {
                    xn.prototype.updateMatrixWorld.call(this, t), this.matrixWorldInverse.getInverse(this.matrixWorld)
                },
                clone: function () {
                    return (new this.constructor).copy(this)
                }
            }), kr.prototype = Object.assign(Object.create(Br.prototype), {
                constructor: kr, isPerspectiveCamera: !0, copy: function (t, e) {
                    return Br.prototype.copy.call(this, t, e), this.fov = t.fov, this.zoom = t.zoom, this.near = t.near, this.far = t.far, this.focus = t.focus, this.aspect = t.aspect, this.view = null === t.view ? null : Object.assign({}, t.view), this.filmGauge = t.filmGauge, this.filmOffset = t.filmOffset, this
                }, setFocalLength: function (t) {
                    var e = .5 * this.getFilmHeight() / t;
                    this.fov = 2 * Pe.RAD2DEG * Math.atan(e), this.updateProjectionMatrix()
                }, getFocalLength: function () {
                    var t = Math.tan(.5 * Pe.DEG2RAD * this.fov);
                    return .5 * this.getFilmHeight() / t
                }, getEffectiveFOV: function () {
                    return 2 * Pe.RAD2DEG * Math.atan(Math.tan(.5 * Pe.DEG2RAD * this.fov) / this.zoom)
                }, getFilmWidth: function () {
                    return this.filmGauge * Math.min(this.aspect, 1)
                }, getFilmHeight: function () {
                    return this.filmGauge / Math.max(this.aspect, 1)
                }, setViewOffset: function (t, e, n, i, r, o) {
                    this.aspect = t / e, null === this.view && (this.view = {
                        enabled: !0,
                        fullWidth: 1,
                        fullHeight: 1,
                        offsetX: 0,
                        offsetY: 0,
                        width: 1,
                        height: 1
                    }), this.view.enabled = !0, this.view.fullWidth = t, this.view.fullHeight = e, this.view.offsetX = n, this.view.offsetY = i, this.view.width = r, this.view.height = o, this.updateProjectionMatrix()
                }, clearViewOffset: function () {
                    null !== this.view && (this.view.enabled = !1), this.updateProjectionMatrix()
                }, updateProjectionMatrix: function () {
                    var t = this.near, e = t * Math.tan(.5 * Pe.DEG2RAD * this.fov) / this.zoom, n = 2 * e,
                        i = this.aspect * n, r = -.5 * i, o = this.view;
                    if (null !== this.view && this.view.enabled) {
                        var a = o.fullWidth, s = o.fullHeight;
                        r += o.offsetX * i / a, e -= o.offsetY * n / s, i *= o.width / a, n *= o.height / s
                    }
                    var h = this.filmOffset;
                    0 !== h && (r += t * h / this.getFilmWidth()), this.projectionMatrix.makePerspective(r, r + i, e, e - n, t, this.far), this.projectionMatrixInverse.getInverse(this.projectionMatrix)
                }, toJSON: function (t) {
                    var e = xn.prototype.toJSON.call(this, t);
                    return e.object.fov = this.fov, e.object.zoom = this.zoom, e.object.near = this.near, e.object.far = this.far, e.object.focus = this.focus, e.object.aspect = this.aspect, null !== this.view && (e.object.view = Object.assign({}, this.view)), e.object.filmGauge = this.filmGauge, e.object.filmOffset = this.filmOffset, e
                }
            }), Vr.prototype = Object.assign(Object.create(kr.prototype), {constructor: Vr, isArrayCamera: !0});
            var Wr, Dr, Xr, Yr, Zr, Jr, Qr = new He, Kr = new He;

            function qr(t, e, n) {
                Qr.setFromMatrixPosition(e.matrixWorld), Kr.setFromMatrixPosition(n.matrixWorld);
                var i = Qr.distanceTo(Kr), r = e.projectionMatrix.elements, o = n.projectionMatrix.elements,
                    a = r[14] / (r[10] - 1), s = r[14] / (r[10] + 1), h = (r[9] + 1) / r[5], c = (r[9] - 1) / r[5],
                    u = (r[8] - 1) / r[0], l = (o[8] + 1) / o[0], f = a * u, p = a * l, d = i / (-u + l), m = d * -u;
                e.matrixWorld.decompose(t.position, t.quaternion, t.scale), t.translateX(m), t.translateZ(d), t.matrixWorld.compose(t.position, t.quaternion, t.scale), t.matrixWorldInverse.getInverse(t.matrixWorld);
                var v = a + d, g = s + d;
                t.projectionMatrix.makePerspective(f - m, p + (i - m), h * s / g * v, c * s / g * v, v, g)
            }

            function $r(t) {
                var e = this, n = null, i = null, r = null, o = [], a = new ze, s = new ze, h = 1, c = "stage";
                "undefined" != typeof window && "VRFrameData" in window && (i = new window.VRFrameData, window.addEventListener("vrdisplaypresentchange", w, !1));
                var u = new ze, l = new Ue, f = new He, p = new kr;
                p.bounds = new Xe(0, 0, .5, 1), p.layers.enable(1);
                var d = new kr;
                d.bounds = new Xe(.5, 0, .5, 1), d.layers.enable(2);
                var m, v, g = new Vr([p, d]);

                function y() {
                    return null !== n && !0 === n.isPresenting
                }

                function w() {
                    if (y()) {
                        var i = n.getEyeParameters("left"), r = i.renderWidth * h, o = i.renderHeight * h;
                        v = t.getPixelRatio(), m = t.getSize(), t.setDrawingBufferSize(2 * r, o, 1), _.start()
                    } else e.enabled && t.setDrawingBufferSize(m.width, m.height, v), _.stop()
                }

                g.layers.enable(1), g.layers.enable(2);
                var x = [];

                function M(t) {
                    for (var e = navigator.getGamepads && navigator.getGamepads(), n = 0, i = 0, r = e.length; n < r; n++) {
                        var o = e[n];
                        if (o && ("Daydream Controller" === o.id || "Gear VR Controller" === o.id || "Oculus Go Controller" === o.id || "OpenVR Gamepad" === o.id || o.id.startsWith("Oculus Touch") || o.id.startsWith("Spatial Controller"))) {
                            if (i === t) return o;
                            i++
                        }
                    }
                }

                this.enabled = !1, this.getController = function (t) {
                    var e = o[t];
                    return void 0 === e && ((e = new Fr).matrixAutoUpdate = !1, e.visible = !1, o[t] = e), e
                }, this.getDevice = function () {
                    return n
                }, this.setDevice = function (t) {
                    void 0 !== t && (n = t), _.setContext(t)
                }, this.setFramebufferScaleFactor = function (t) {
                    h = t
                }, this.setFrameOfReferenceType = function (t) {
                    c = t
                }, this.setPoseTarget = function (t) {
                    void 0 !== t && (r = t)
                }, this.getCamera = function (t) {
                    var e = "stage" === c ? 1.6 : 0;
                    if (null === n) return t.position.set(0, e, 0), t;
                    if (n.depthNear = t.near, n.depthFar = t.far, n.getFrameData(i), "stage" === c) {
                        var h = n.stageParameters;
                        h ? a.fromArray(h.sittingToStandingTransform) : a.makeTranslation(0, e, 0)
                    }
                    var m = i.pose, v = null !== r ? r : t;
                    if (v.matrix.copy(a), v.matrix.decompose(v.position, v.quaternion, v.scale), null !== m.orientation && (l.fromArray(m.orientation), v.quaternion.multiply(l)), null !== m.position && (l.setFromRotationMatrix(a), f.fromArray(m.position), f.applyQuaternion(l), v.position.add(f)), v.updateMatrixWorld(), !1 === n.isPresenting) return t;
                    p.near = t.near, d.near = t.near, p.far = t.far, d.far = t.far, p.matrixWorldInverse.fromArray(i.leftViewMatrix), d.matrixWorldInverse.fromArray(i.rightViewMatrix), s.getInverse(a), "stage" === c && (p.matrixWorldInverse.multiply(s), d.matrixWorldInverse.multiply(s));
                    var y = v.parent;
                    null !== y && (u.getInverse(y.matrixWorld), p.matrixWorldInverse.multiply(u), d.matrixWorldInverse.multiply(u)), p.matrixWorld.getInverse(p.matrixWorldInverse), d.matrixWorld.getInverse(d.matrixWorldInverse), p.projectionMatrix.fromArray(i.leftProjectionMatrix), d.projectionMatrix.fromArray(i.rightProjectionMatrix), qr(g, p, d);
                    var w = n.getLayers();
                    if (w.length) {
                        var _ = w[0];
                        null !== _.leftBounds && 4 === _.leftBounds.length && p.bounds.fromArray(_.leftBounds), null !== _.rightBounds && 4 === _.rightBounds.length && d.bounds.fromArray(_.rightBounds)
                    }
                    return function () {
                        for (var t = 0; t < o.length; t++) {
                            var e = o[t], n = M(t);
                            if (void 0 !== n && void 0 !== n.pose) {
                                if (null === n.pose) return;
                                var i = n.pose;
                                !1 === i.hasPosition && e.position.set(.2, -.6, -.05), null !== i.position && e.position.fromArray(i.position), null !== i.orientation && e.quaternion.fromArray(i.orientation), e.matrix.compose(e.position, e.quaternion, e.scale), e.matrix.premultiply(a), e.matrix.decompose(e.position, e.quaternion, e.scale), e.matrixWorldNeedsUpdate = !0, e.visible = !0;
                                var r = "Daydream Controller" === n.id ? 0 : 1;
                                x[t] !== n.buttons[r].pressed && (x[t] = n.buttons[r].pressed, !0 === x[t] ? e.dispatchEvent({type: "selectstart"}) : (e.dispatchEvent({type: "selectend"}), e.dispatchEvent({type: "select"})))
                            } else e.visible = !1
                        }
                    }(), g
                }, this.getStandingMatrix = function () {
                    return a
                }, this.isPresenting = y;
                var _ = new un;
                this.setAnimationLoop = function (t) {
                    _.setAnimationLoop(t)
                }, this.submitFrame = function () {
                    y() && n.submitFrame()
                }, this.dispose = function () {
                    "undefined" != typeof window && window.removeEventListener("vrdisplaypresentchange", w)
                }
            }

            function jr(t) {
                var e = t.context, n = null, i = null, r = 1, o = null, a = "stage", s = null, h = [], c = [];

                function u() {
                    return null !== i && null !== o
                }

                var l = new kr;
                l.layers.enable(1), l.viewport = new Xe;
                var f = new kr;
                f.layers.enable(2), f.viewport = new Xe;
                var p = new Vr([l, f]);

                function d(t) {
                    var e = h[c.indexOf(t.inputSource)];
                    e && e.dispatchEvent({type: t.type})
                }

                function m() {
                    t.setFramebuffer(null), y.stop()
                }

                function v(t, e) {
                    null === e ? t.matrixWorld.copy(t.matrix) : t.matrixWorld.multiplyMatrices(e.matrixWorld, t.matrix), t.matrixWorldInverse.getInverse(t.matrixWorld)
                }

                p.layers.enable(1), p.layers.enable(2), this.enabled = !1, this.getController = function (t) {
                    var e = h[t];
                    return void 0 === e && ((e = new Fr).matrixAutoUpdate = !1, e.visible = !1, h[t] = e), e
                }, this.getDevice = function () {
                    return n
                }, this.setDevice = function (t) {
                    void 0 !== t && (n = t), t instanceof XRDevice && e.setCompatibleXRDevice(t)
                }, this.setFramebufferScaleFactor = function (t) {
                    r = t
                }, this.setFrameOfReferenceType = function (t) {
                    a = t
                }, this.setSession = function (n) {
                    null !== (i = n) && (i.addEventListener("select", d), i.addEventListener("selectstart", d), i.addEventListener("selectend", d), i.addEventListener("end", m), i.baseLayer = new XRWebGLLayer(i, e, {framebufferScaleFactor: r}), i.requestFrameOfReference(a).then(function (e) {
                        o = e, t.setFramebuffer(i.baseLayer.framebuffer), y.setContext(i), y.start()
                    }), c = i.getInputSources(), i.addEventListener("inputsourceschange", function () {
                        c = i.getInputSources(), console.log(c);
                        for (var t = 0; t < h.length; t++) {
                            h[t].userData.inputSource = c[t]
                        }
                    }))
                }, this.getCamera = function (t) {
                    if (u()) {
                        var e = t.parent, n = p.cameras;
                        v(p, e);
                        for (var i = 0; i < n.length; i++) v(n[i], e);
                        t.matrixWorld.copy(p.matrixWorld);
                        for (var r = t.children, o = (i = 0, r.length); i < o; i++) r[i].updateMatrixWorld(!0);
                        return qr(p, l, f), p
                    }
                    return t
                }, this.isPresenting = u;
                var g = null;
                var y = new un;
                y.setAnimationLoop(function (t, e) {
                    if (null !== (s = e.getDevicePose(o))) for (var n = i.baseLayer, r = e.views, a = 0; a < r.length; a++) {
                        var u = r[a], l = n.getViewport(u), f = s.getViewMatrix(u), d = p.cameras[a];
                        d.matrix.fromArray(f).getInverse(d.matrix), d.projectionMatrix.fromArray(u.projectionMatrix), d.viewport.set(l.x, l.y, l.width, l.height), 0 === a && p.matrix.copy(d.matrix)
                    }
                    for (a = 0; a < h.length; a++) {
                        var m = h[a], v = c[a];
                        if (v) {
                            var y = e.getInputPose(v, o);
                            if (null !== y) {
                                "targetRay" in y ? m.matrix.elements = y.targetRay.transformMatrix : "pointerMatrix" in y && (m.matrix.elements = y.pointerMatrix), m.matrix.decompose(m.position, m.rotation, m.scale), m.visible = !0;
                                continue
                            }
                        }
                        m.visible = !1
                    }
                    g && g(t)
                }), this.setAnimationLoop = function (t) {
                    g = t
                }, this.dispose = function () {
                }, this.getStandingMatrix = function () {
                    return console.warn("THREE.WebXRManager: getStandingMatrix() is no longer needed."), new THREE.Matrix4
                }, this.submitFrame = function () {
                }
            }

            function to(t) {
                console.log("THREE.WebGLRenderer", p);
                var e = void 0 !== (t = t || {}).canvas ? t.canvas : document.createElementNS("http://www.w3.org/1999/xhtml", "canvas"),
                    n = void 0 !== t.context ? t.context : null, i = void 0 !== t.alpha && t.alpha,
                    r = void 0 === t.depth || t.depth, o = void 0 === t.stencil || t.stencil,
                    a = void 0 !== t.antialias && t.antialias,
                    s = void 0 === t.premultipliedAlpha || t.premultipliedAlpha,
                    h = void 0 !== t.preserveDrawingBuffer && t.preserveDrawingBuffer,
                    c = void 0 !== t.powerPreference ? t.powerPreference : "default", u = null, l = null;
                this.domElement = e, this.context = null, this.autoClear = !0, this.autoClearColor = !0, this.autoClearDepth = !0, this.autoClearStencil = !0, this.sortObjects = !0, this.clippingPlanes = [], this.localClippingEnabled = !1, this.gammaFactor = 2, this.gammaInput = !1, this.gammaOutput = !1, this.physicallyCorrectLights = !1, this.toneMapping = ot, this.toneMappingExposure = 1, this.toneMappingWhitePoint = 1, this.maxMorphTargets = 8, this.maxMorphNormals = 4;
                var f, d, m, v, g, y, w, M, _, E, S, b, T, L, C, R, A, P, N = this, z = !1, U = null, H = null,
                    G = null, O = -1, I = {geometry: null, program: null, wireframe: !1}, F = null, B = null,
                    k = new Xe, V = new Xe, W = null, D = 0, X = e.width, Y = e.height, Z = 1, J = new Xe(0, 0, X, Y),
                    Q = new Xe(0, 0, X, Y), K = !1, q = new $e, $ = new li, j = !1, tt = !1, et = new ze, nt = new He;

                function it() {
                    return null === H ? Z : 1
                }

                try {
                    var rt = {
                        alpha: i,
                        depth: r,
                        stencil: o,
                        antialias: a,
                        premultipliedAlpha: s,
                        preserveDrawingBuffer: h,
                        powerPreference: c
                    };
                    if (e.addEventListener("webglcontextlost", ct, !1), e.addEventListener("webglcontextrestored", ut, !1), null === (f = n || e.getContext("webgl", rt) || e.getContext("experimental-webgl", rt))) throw null !== e.getContext("webgl") ? new Error("Error creating WebGL context with your selected attributes.") : new Error("Error creating WebGL context.");
                    void 0 === f.getShaderPrecisionFormat && (f.getShaderPrecisionFormat = function () {
                        return {rangeMin: 1, rangeMax: 1, precision: 1}
                    })
                } catch (t) {
                    console.error("THREE.WebGLRenderer: " + t.message)
                }

                function at() {
                    d = new fi(f), (m = new ui(f, d, t)).isWebGL2 || (d.get("WEBGL_depth_texture"), d.get("OES_texture_float"), d.get("OES_texture_half_float"), d.get("OES_texture_half_float_linear"), d.get("OES_standard_derivatives"), d.get("OES_element_index_uint"), d.get("ANGLE_instanced_arrays")), d.get("OES_texture_float_linear"), P = new Ir(f, d, m), (v = new Gr(f, d, P, m)).scissor(V.copy(Q).multiplyScalar(Z)), v.viewport(k.copy(J).multiplyScalar(Z)), g = new mi(f), y = new Er, w = new Or(f, d, v, y, m, P, g), M = new ln(f), _ = new pi(f, M, g), E = new yi(_, g), C = new gi(f), S = new _r(N, d, m), b = new Lr, T = new Nr, L = new hi(N, v, E, s), R = new ci(f, d, g, m), A = new di(f, d, g, m), g.programs = S.programs, N.context = f, N.capabilities = m, N.extensions = d, N.properties = y, N.renderLists = b, N.state = v, N.info = g
                }

                at();
                var st = null;
                "undefined" != typeof navigator && (st = "xr" in navigator ? new jr(N) : new $r(N)), this.vr = st;
                var ht = new Hr(N, E, m.maxTextureSize);

                function ct(t) {
                    t.preventDefault(), console.log("THREE.WebGLRenderer: Context Lost."), z = !0
                }

                function ut() {
                    console.log("THREE.WebGLRenderer: Context Restored."), z = !1, at()
                }

                function lt(t) {
                    var e = t.target;
                    e.removeEventListener("dispose", lt), function (t) {
                        ft(t), y.remove(t)
                    }(e)
                }

                function ft(t) {
                    var e = y.get(t).program;
                    t.program = void 0, void 0 !== e && S.releaseProgram(e)
                }

                this.shadowMap = ht, this.getContext = function () {
                    return f
                }, this.getContextAttributes = function () {
                    return f.getContextAttributes()
                }, this.forceContextLoss = function () {
                    var t = d.get("WEBGL_lose_context");
                    t && t.loseContext()
                }, this.forceContextRestore = function () {
                    var t = d.get("WEBGL_lose_context");
                    t && t.restoreContext()
                }, this.getPixelRatio = function () {
                    return Z
                }, this.setPixelRatio = function (t) {
                    void 0 !== t && (Z = t, this.setSize(X, Y, !1))
                }, this.getSize = function () {
                    return {width: X, height: Y}
                }, this.setSize = function (t, n, i) {
                    st.isPresenting() ? console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.") : (X = t, Y = n, e.width = t * Z, e.height = n * Z, !1 !== i && (e.style.width = t + "px", e.style.height = n + "px"), this.setViewport(0, 0, t, n))
                }, this.getDrawingBufferSize = function () {
                    return {width: X * Z, height: Y * Z}
                }, this.setDrawingBufferSize = function (t, n, i) {
                    X = t, Y = n, Z = i, e.width = t * i, e.height = n * i, this.setViewport(0, 0, t, n)
                }, this.getCurrentViewport = function () {
                    return k
                }, this.setViewport = function (t, e, n, i) {
                    J.set(t, Y - e - i, n, i), v.viewport(k.copy(J).multiplyScalar(Z))
                }, this.setScissor = function (t, e, n, i) {
                    Q.set(t, Y - e - i, n, i), v.scissor(V.copy(Q).multiplyScalar(Z))
                }, this.setScissorTest = function (t) {
                    v.setScissorTest(K = t)
                }, this.getClearColor = function () {
                    return L.getClearColor()
                }, this.setClearColor = function () {
                    L.setClearColor.apply(L, arguments)
                }, this.getClearAlpha = function () {
                    return L.getClearAlpha()
                }, this.setClearAlpha = function () {
                    L.setClearAlpha.apply(L, arguments)
                }, this.clear = function (t, e, n) {
                    var i = 0;
                    (void 0 === t || t) && (i |= 16384), (void 0 === e || e) && (i |= 256), (void 0 === n || n) && (i |= 1024), f.clear(i)
                }, this.clearColor = function () {
                    this.clear(!0, !1, !1)
                }, this.clearDepth = function () {
                    this.clear(!1, !0, !1)
                }, this.clearStencil = function () {
                    this.clear(!1, !1, !0)
                }, this.dispose = function () {
                    e.removeEventListener("webglcontextlost", ct, !1), e.removeEventListener("webglcontextrestored", ut, !1), b.dispose(), T.dispose(), y.dispose(), E.dispose(), st.dispose(), mt.stop()
                }, this.renderBufferImmediate = function (t, e) {
                    v.initAttributes();
                    var n = y.get(t);
                    t.hasPositions && !n.position && (n.position = f.createBuffer()), t.hasNormals && !n.normal && (n.normal = f.createBuffer()), t.hasUvs && !n.uv && (n.uv = f.createBuffer()), t.hasColors && !n.color && (n.color = f.createBuffer());
                    var i = e.getAttributes();
                    t.hasPositions && (f.bindBuffer(34962, n.position), f.bufferData(34962, t.positionArray, 35048), v.enableAttribute(i.position), f.vertexAttribPointer(i.position, 3, 5126, !1, 0, 0)), t.hasNormals && (f.bindBuffer(34962, n.normal), f.bufferData(34962, t.normalArray, 35048), v.enableAttribute(i.normal), f.vertexAttribPointer(i.normal, 3, 5126, !1, 0, 0)), t.hasUvs && (f.bindBuffer(34962, n.uv), f.bufferData(34962, t.uvArray, 35048), v.enableAttribute(i.uv), f.vertexAttribPointer(i.uv, 2, 5126, !1, 0, 0)), t.hasColors && (f.bindBuffer(34962, n.color), f.bufferData(34962, t.colorArray, 35048), v.enableAttribute(i.color), f.vertexAttribPointer(i.color, 3, 5126, !1, 0, 0)), v.disableUnusedAttributes(), f.drawArrays(4, 0, t.count), t.count = 0
                }, this.renderBufferDirect = function (t, e, n, i, r, o) {
                    var a = r.isMesh && r.normalMatrix.determinant() < 0;
                    v.setMaterial(i, a);
                    var s = wt(t, e, i, r), h = !1;
                    I.geometry === n.id && I.program === s.id && I.wireframe === (!0 === i.wireframe) || (I.geometry = n.id, I.program = s.id, I.wireframe = !0 === i.wireframe, h = !0), r.morphTargetInfluences && (C.update(r, n, i, s), h = !0);
                    var c, u = n.index, l = n.attributes.position, p = 1;
                    !0 === i.wireframe && (u = _.getWireframeAttribute(n), p = 2);
                    var g = R;
                    null !== u && (c = M.get(u), (g = A).setIndex(c)), h && (!function (t, e, n) {
                        if (n && n.isInstancedBufferGeometry & !m.isWebGL2 && null === d.get("ANGLE_instanced_arrays")) return void console.error("THREE.WebGLRenderer.setupVertexAttributes: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");
                        v.initAttributes();
                        var i = n.attributes, r = e.getAttributes(), o = t.defaultAttributeValues;
                        for (var a in r) {
                            var s = r[a];
                            if (s >= 0) {
                                var h = i[a];
                                if (void 0 !== h) {
                                    var c = h.normalized, u = h.itemSize, l = M.get(h);
                                    if (void 0 === l) continue;
                                    var p = l.buffer, g = l.type, y = l.bytesPerElement;
                                    if (h.isInterleavedBufferAttribute) {
                                        var w = h.data, x = w.stride, _ = h.offset;
                                        w && w.isInstancedInterleavedBuffer ? (v.enableAttributeAndDivisor(s, w.meshPerAttribute), void 0 === n.maxInstancedCount && (n.maxInstancedCount = w.meshPerAttribute * w.count)) : v.enableAttribute(s), f.bindBuffer(34962, p), f.vertexAttribPointer(s, u, g, c, x * y, _ * y)
                                    } else h.isInstancedBufferAttribute ? (v.enableAttributeAndDivisor(s, h.meshPerAttribute), void 0 === n.maxInstancedCount && (n.maxInstancedCount = h.meshPerAttribute * h.count)) : v.enableAttribute(s), f.bindBuffer(34962, p), f.vertexAttribPointer(s, u, g, c, 0, 0)
                                } else if (void 0 !== o) {
                                    var E = o[a];
                                    if (void 0 !== E) switch (E.length) {
                                        case 2:
                                            f.vertexAttrib2fv(s, E);
                                            break;
                                        case 3:
                                            f.vertexAttrib3fv(s, E);
                                            break;
                                        case 4:
                                            f.vertexAttrib4fv(s, E);
                                            break;
                                        default:
                                            f.vertexAttrib1fv(s, E)
                                    }
                                }
                            }
                        }
                        v.disableUnusedAttributes()
                    }(i, s, n), null !== u && f.bindBuffer(34963, c.buffer));
                    var y = Infinity;
                    null !== u ? y = u.count : void 0 !== l && (y = l.count);
                    var w = n.drawRange.start * p, x = n.drawRange.count * p, E = null !== o ? o.start * p : 0,
                        S = null !== o ? o.count * p : Infinity, b = Math.max(w, E), T = Math.min(y, w + x, E + S) - 1,
                        L = Math.max(0, T - b + 1);
                    if (0 !== L) {
                        if (r.isMesh) if (!0 === i.wireframe) v.setLineWidth(i.wireframeLinewidth * it()), g.setMode(1); else switch (r.drawMode) {
                            case ge:
                                g.setMode(4);
                                break;
                            case ye:
                                g.setMode(5);
                                break;
                            case we:
                                g.setMode(6)
                        } else if (r.isLine) {
                            var P = i.linewidth;
                            void 0 === P && (P = 1), v.setLineWidth(P * it()), g.setMode(r.isLineSegments ? 1 : r.isLineLoop ? 2 : 3)
                        } else r.isPoints ? g.setMode(0) : r.isSprite && g.setMode(4);
                        n && n.isInstancedBufferGeometry ? n.maxInstancedCount > 0 && g.renderInstances(n, b, L) : g.render(b, L)
                    }
                }, this.compile = function (t, e) {
                    (l = T.get(t, e)).init(), t.traverse(function (t) {
                        t.isLight && (l.pushLight(t), t.castShadow && l.pushShadow(t))
                    }), l.setupLights(e), t.traverse(function (e) {
                        if (e.material) if (Array.isArray(e.material)) for (var n = 0; n < e.material.length; n++) yt(e.material[n], t.fog, e); else yt(e.material, t.fog, e)
                    })
                };
                var pt = null;
                var dt, mt = new un;

                function vt(t, e, n, i) {
                    for (var r = 0, o = t.length; r < o; r++) {
                        var a = t[r], s = a.object, h = a.geometry, c = void 0 === i ? a.material : i, u = a.group;
                        if (n.isArrayCamera) {
                            B = n;
                            for (var f = n.cameras, p = 0, d = f.length; p < d; p++) {
                                var m = f[p];
                                if (s.layers.test(m.layers)) {
                                    if ("viewport" in m) v.viewport(k.copy(m.viewport)); else {
                                        var g = m.bounds;
                                        v.viewport(k.set(g.x * X, g.y * Y, g.z * X, g.w * Y).multiplyScalar(Z))
                                    }
                                    l.setupLights(m), gt(s, e, m, h, c, u)
                                }
                            }
                        } else B = null, gt(s, e, n, h, c, u)
                    }
                }

                function gt(t, e, n, i, r, o) {
                    if (t.onBeforeRender(N, e, n, i, r, o), l = T.get(e, B || n), t.modelViewMatrix.multiplyMatrices(n.matrixWorldInverse, t.matrixWorld), t.normalMatrix.getNormalMatrix(t.modelViewMatrix), t.isImmediateRenderObject) {
                        v.setMaterial(r);
                        var a = wt(n, e.fog, r, t);
                        I.geometry = null, I.program = null, I.wireframe = !1, function (t, e) {
                            t.render(function (t) {
                                N.renderBufferImmediate(t, e)
                            })
                        }(t, a)
                    } else N.renderBufferDirect(n, e.fog, i, r, t, o);
                    t.onAfterRender(N, e, n, i, r, o), l = T.get(e, B || n)
                }

                function yt(t, e, n) {
                    var i = y.get(t), r = l.state.lights, o = i.lightsHash, a = r.state.hash,
                        s = S.getParameters(t, r.state, l.state.shadowsArray, e, $.numPlanes, $.numIntersection, n),
                        h = S.getProgramCode(t, s), c = i.program, u = !0;
                    if (void 0 === c) t.addEventListener("dispose", lt); else if (c.code !== h) ft(t); else if (o.stateID !== a.stateID || o.directionalLength !== a.directionalLength || o.pointLength !== a.pointLength || o.spotLength !== a.spotLength || o.rectAreaLength !== a.rectAreaLength || o.hemiLength !== a.hemiLength || o.shadowsLength !== a.shadowsLength) o.stateID = a.stateID, o.directionalLength = a.directionalLength, o.pointLength = a.pointLength, o.spotLength = a.spotLength, o.rectAreaLength = a.rectAreaLength, o.hemiLength = a.hemiLength, o.shadowsLength = a.shadowsLength, u = !1; else {
                        if (void 0 !== s.shaderID) return;
                        u = !1
                    }
                    if (u) {
                        if (s.shaderID) {
                            var f = cn[s.shaderID];
                            i.shader = {
                                name: t.type,
                                uniforms: rn.clone(f.uniforms),
                                vertexShader: f.vertexShader,
                                fragmentShader: f.fragmentShader
                            }
                        } else i.shader = {
                            name: t.type,
                            uniforms: t.uniforms,
                            vertexShader: t.vertexShader,
                            fragmentShader: t.fragmentShader
                        };
                        t.onBeforeCompile(i.shader, N), h = S.getProgramCode(t, s), c = S.acquireProgram(t, i.shader, s, h), i.program = c, t.program = c
                    }
                    var p = c.getAttributes();
                    if (t.morphTargets) {
                        t.numSupportedMorphTargets = 0;
                        for (var d = 0; d < N.maxMorphTargets; d++) p["morphTarget" + d] >= 0 && t.numSupportedMorphTargets++
                    }
                    if (t.morphNormals) {
                        t.numSupportedMorphNormals = 0;
                        for (d = 0; d < N.maxMorphNormals; d++) p["morphNormal" + d] >= 0 && t.numSupportedMorphNormals++
                    }
                    var m = i.shader.uniforms;
                    (t.isShaderMaterial || t.isRawShaderMaterial) && !0 !== t.clipping || (i.numClippingPlanes = $.numPlanes, i.numIntersection = $.numIntersection, m.clippingPlanes = $.uniform), i.fog = e, void 0 === o && (i.lightsHash = o = {}), o.stateID = a.stateID, o.directionalLength = a.directionalLength, o.pointLength = a.pointLength, o.spotLength = a.spotLength, o.rectAreaLength = a.rectAreaLength, o.hemiLength = a.hemiLength, o.shadowsLength = a.shadowsLength, t.lights && (m.ambientLightColor.value = r.state.ambient, m.directionalLights.value = r.state.directional, m.spotLights.value = r.state.spot, m.rectAreaLights.value = r.state.rectArea, m.pointLights.value = r.state.point, m.hemisphereLights.value = r.state.hemi, m.directionalShadowMap.value = r.state.directionalShadowMap, m.directionalShadowMatrix.value = r.state.directionalShadowMatrix, m.spotShadowMap.value = r.state.spotShadowMap, m.spotShadowMatrix.value = r.state.spotShadowMatrix, m.pointShadowMap.value = r.state.pointShadowMap, m.pointShadowMatrix.value = r.state.pointShadowMatrix);
                    var v = i.program.getUniforms(), g = ur.seqWithValue(v.seq, m);
                    i.uniformsList = g
                }

                function wt(t, e, n, i) {
                    D = 0;
                    var r = y.get(n), o = r.lightsHash, a = l.state.lights.state.hash;
                    j && ((tt || t !== F) && $.setState(n.clippingPlanes, n.clipIntersection, n.clipShadows, t, r, t === F && n.id === O));
                    !1 === n.needsUpdate && (void 0 === r.program ? n.needsUpdate = !0 : n.fog && r.fog !== e ? n.needsUpdate = !0 : (!n.lights || o.stateID === a.stateID && o.directionalLength === a.directionalLength && o.pointLength === a.pointLength && o.spotLength === a.spotLength && o.rectAreaLength === a.rectAreaLength && o.hemiLength === a.hemiLength && o.shadowsLength === a.shadowsLength) && (void 0 === r.numClippingPlanes || r.numClippingPlanes === $.numPlanes && r.numIntersection === $.numIntersection) || (n.needsUpdate = !0)), n.needsUpdate && (yt(n, e, i), n.needsUpdate = !1);
                    var s, h, c = !1, u = !1, p = !1, d = r.program, g = d.getUniforms(), w = r.shader.uniforms;
                    if (v.useProgram(d.program) && (c = !0, u = !0, p = !0), n.id !== O && (O = n.id, u = !0), c || F !== t) {
                        if (g.setValue(f, "projectionMatrix", t.projectionMatrix), m.logarithmicDepthBuffer && g.setValue(f, "logDepthBufFC", 2 / (Math.log(t.far + 1) / Math.LN2)), F !== t && (F = t, u = !0, p = !0), n.isShaderMaterial || n.isMeshPhongMaterial || n.isMeshStandardMaterial || n.envMap) {
                            var M = g.map.cameraPosition;
                            void 0 !== M && M.setValue(f, nt.setFromMatrixPosition(t.matrixWorld))
                        }
                        (n.isMeshPhongMaterial || n.isMeshLambertMaterial || n.isMeshBasicMaterial || n.isMeshStandardMaterial || n.isShaderMaterial || n.skinning) && g.setValue(f, "viewMatrix", t.matrixWorldInverse)
                    }
                    if (n.skinning) {
                        g.setOptional(f, i, "bindMatrix"), g.setOptional(f, i, "bindMatrixInverse");
                        var _ = i.skeleton;
                        if (_) if (m.floatVertexTextures) {
                            if (void 0 === _.boneTexture) {
                                var E = Math.sqrt(4 * _.bones.length);
                                E = Pe.ceilPowerOfTwo(E), E = Math.max(E, 4);
                                var S = new Float32Array(E * E * 4);
                                S.set(_.boneMatrices);
                                var b = new Je(S, E, E, Ft, Pt);
                                b.needsUpdate = !0, _.boneMatrices = S, _.boneTexture = b, _.boneTextureSize = E
                            }
                            g.setValue(f, "boneTexture", _.boneTexture), g.setValue(f, "boneTextureSize", _.boneTextureSize)
                        } else g.setOptional(f, _, "boneMatrices")
                    }
                    return u && (g.setValue(f, "toneMappingExposure", N.toneMappingExposure), g.setValue(f, "toneMappingWhitePoint", N.toneMappingWhitePoint), n.lights && ((s = w).ambientLightColor.needsUpdate = h = p, s.directionalLights.needsUpdate = h, s.pointLights.needsUpdate = h, s.spotLights.needsUpdate = h, s.rectAreaLights.needsUpdate = h, s.hemisphereLights.needsUpdate = h), e && n.fog && function (t, e) {
                        t.fogColor.value = e.color, e.isFog ? (t.fogNear.value = e.near, t.fogFar.value = e.far) : e.isFogExp2 && (t.fogDensity.value = e.density)
                    }(w, e), n.isMeshBasicMaterial ? xt(w, n) : n.isMeshLambertMaterial ? (xt(w, n), function (t, e) {
                        e.emissiveMap && (t.emissiveMap.value = e.emissiveMap)
                    }(w, n)) : n.isMeshPhongMaterial ? (xt(w, n), n.isMeshToonMaterial ? function (t, e) {
                        Mt(t, e), e.gradientMap && (t.gradientMap.value = e.gradientMap)
                    }(w, n) : Mt(w, n)) : n.isMeshStandardMaterial ? (xt(w, n), n.isMeshPhysicalMaterial ? function (t, e) {
                        _t(t, e), t.reflectivity.value = e.reflectivity, t.clearCoat.value = e.clearCoat, t.clearCoatRoughness.value = e.clearCoatRoughness
                    }(w, n) : _t(w, n)) : n.isMeshMatcapMaterial ? (xt(w, n), function (t, e) {
                        e.matcap && (t.matcap.value = e.matcap);
                        e.bumpMap && (t.bumpMap.value = e.bumpMap, t.bumpScale.value = e.bumpScale, e.side === x && (t.bumpScale.value *= -1));
                        e.normalMap && (t.normalMap.value = e.normalMap, t.normalScale.value.copy(e.normalScale), e.side === x && t.normalScale.value.negate());
                        e.displacementMap && (t.displacementMap.value = e.displacementMap, t.displacementScale.value = e.displacementScale, t.displacementBias.value = e.displacementBias)
                    }(w, n)) : n.isMeshDepthMaterial ? (xt(w, n), function (t, e) {
                        e.displacementMap && (t.displacementMap.value = e.displacementMap, t.displacementScale.value = e.displacementScale, t.displacementBias.value = e.displacementBias)
                    }(w, n)) : n.isMeshDistanceMaterial ? (xt(w, n), function (t, e) {
                        e.displacementMap && (t.displacementMap.value = e.displacementMap, t.displacementScale.value = e.displacementScale, t.displacementBias.value = e.displacementBias);
                        t.referencePosition.value.copy(e.referencePosition), t.nearDistance.value = e.nearDistance, t.farDistance.value = e.farDistance
                    }(w, n)) : n.isMeshNormalMaterial ? (xt(w, n), function (t, e) {
                        e.bumpMap && (t.bumpMap.value = e.bumpMap, t.bumpScale.value = e.bumpScale, e.side === x && (t.bumpScale.value *= -1));
                        e.normalMap && (t.normalMap.value = e.normalMap, t.normalScale.value.copy(e.normalScale), e.side === x && t.normalScale.value.negate());
                        e.displacementMap && (t.displacementMap.value = e.displacementMap, t.displacementScale.value = e.displacementScale, t.displacementBias.value = e.displacementBias)
                    }(w, n)) : n.isLineBasicMaterial ? (function (t, e) {
                        t.diffuse.value = e.color, t.opacity.value = e.opacity
                    }(w, n), n.isLineDashedMaterial && function (t, e) {
                        t.dashSize.value = e.dashSize, t.totalSize.value = e.dashSize + e.gapSize, t.scale.value = e.scale
                    }(w, n)) : n.isPointsMaterial ? function (t, e) {
                        t.diffuse.value = e.color, t.opacity.value = e.opacity, t.size.value = e.size * Z, t.scale.value = .5 * Y, t.map.value = e.map, null !== e.map && (!0 === e.map.matrixAutoUpdate && e.map.updateMatrix(), t.uvTransform.value.copy(e.map.matrix))
                    }(w, n) : n.isSpriteMaterial ? function (t, e) {
                        t.diffuse.value = e.color, t.opacity.value = e.opacity, t.rotation.value = e.rotation, t.map.value = e.map, null !== e.map && (!0 === e.map.matrixAutoUpdate && e.map.updateMatrix(), t.uvTransform.value.copy(e.map.matrix))
                    }(w, n) : n.isShadowMaterial && (w.color.value = n.color, w.opacity.value = n.opacity), void 0 !== w.ltc_1 && (w.ltc_1.value = hn.LTC_1), void 0 !== w.ltc_2 && (w.ltc_2.value = hn.LTC_2), ur.upload(f, r.uniformsList, w, N)), n.isShaderMaterial && !0 === n.uniformsNeedUpdate && (ur.upload(f, r.uniformsList, w, N), n.uniformsNeedUpdate = !1), n.isSpriteMaterial && g.setValue(f, "center", i.center), g.setValue(f, "modelViewMatrix", i.modelViewMatrix), g.setValue(f, "normalMatrix", i.normalMatrix), g.setValue(f, "modelMatrix", i.matrixWorld), d
                }

                function xt(t, e) {
                    var n;
                    t.opacity.value = e.opacity, e.color && (t.diffuse.value = e.color), e.emissive && t.emissive.value.copy(e.emissive).multiplyScalar(e.emissiveIntensity), e.map && (t.map.value = e.map), e.alphaMap && (t.alphaMap.value = e.alphaMap), e.specularMap && (t.specularMap.value = e.specularMap), e.envMap && (t.envMap.value = e.envMap, t.flipEnvMap.value = e.envMap && e.envMap.isCubeTexture ? -1 : 1, t.reflectivity.value = e.reflectivity, t.refractionRatio.value = e.refractionRatio, t.maxMipLevel.value = y.get(e.envMap).__maxMipLevel), e.lightMap && (t.lightMap.value = e.lightMap, t.lightMapIntensity.value = e.lightMapIntensity), e.aoMap && (t.aoMap.value = e.aoMap, t.aoMapIntensity.value = e.aoMapIntensity), e.map ? n = e.map : e.specularMap ? n = e.specularMap : e.displacementMap ? n = e.displacementMap : e.normalMap ? n = e.normalMap : e.bumpMap ? n = e.bumpMap : e.roughnessMap ? n = e.roughnessMap : e.metalnessMap ? n = e.metalnessMap : e.alphaMap ? n = e.alphaMap : e.emissiveMap && (n = e.emissiveMap), void 0 !== n && (n.isWebGLRenderTarget && (n = n.texture), !0 === n.matrixAutoUpdate && n.updateMatrix(), t.uvTransform.value.copy(n.matrix))
                }

                function Mt(t, e) {
                    t.specular.value = e.specular, t.shininess.value = Math.max(e.shininess, 1e-4), e.emissiveMap && (t.emissiveMap.value = e.emissiveMap), e.bumpMap && (t.bumpMap.value = e.bumpMap, t.bumpScale.value = e.bumpScale, e.side === x && (t.bumpScale.value *= -1)), e.normalMap && (t.normalMap.value = e.normalMap, t.normalScale.value.copy(e.normalScale), e.side === x && t.normalScale.value.negate()), e.displacementMap && (t.displacementMap.value = e.displacementMap, t.displacementScale.value = e.displacementScale, t.displacementBias.value = e.displacementBias)
                }

                function _t(t, e) {
                    t.roughness.value = e.roughness, t.metalness.value = e.metalness, e.roughnessMap && (t.roughnessMap.value = e.roughnessMap), e.metalnessMap && (t.metalnessMap.value = e.metalnessMap), e.emissiveMap && (t.emissiveMap.value = e.emissiveMap), e.bumpMap && (t.bumpMap.value = e.bumpMap, t.bumpScale.value = e.bumpScale, e.side === x && (t.bumpScale.value *= -1)), e.normalMap && (t.normalMap.value = e.normalMap, t.normalScale.value.copy(e.normalScale), e.side === x && t.normalScale.value.negate()), e.displacementMap && (t.displacementMap.value = e.displacementMap, t.displacementScale.value = e.displacementScale, t.displacementBias.value = e.displacementBias), e.envMap && (t.envMapIntensity.value = e.envMapIntensity)
                }

                mt.setAnimationLoop(function (t) {
                    st.isPresenting() || pt && pt(t)
                }), "undefined" != typeof window && mt.setContext(window), this.setAnimationLoop = function (t) {
                    pt = t, st.setAnimationLoop(t), mt.start()
                }, this.render = function (t, e, n, i) {
                    if (e && e.isCamera) {
                        if (!z) {
                            I.geometry = null, I.program = null, I.wireframe = !1, O = -1, F = null, !0 === t.autoUpdate && t.updateMatrixWorld(), null === e.parent && e.updateMatrixWorld(), st.enabled && (e = st.getCamera(e)), (l = T.get(t, e)).init(), t.onBeforeRender(N, t, e, n), et.multiplyMatrices(e.projectionMatrix, e.matrixWorldInverse), q.setFromMatrix(et), j = $.init(this.clippingPlanes, tt = this.localClippingEnabled, e), (u = b.get(t, e)).init(), function t(e, n, i) {
                                if (!1 === e.visible) return;
                                var r = e.layers.test(n.layers);
                                if (r) if (e.isLight) l.pushLight(e), e.castShadow && l.pushShadow(e); else if (e.isSprite) {
                                    if (!e.frustumCulled || q.intersectsSprite(e)) {
                                        i && nt.setFromMatrixPosition(e.matrixWorld).applyMatrix4(et);
                                        var o = E.update(e), a = e.material;
                                        u.push(e, o, a, nt.z, null)
                                    }
                                } else if (e.isImmediateRenderObject) i && nt.setFromMatrixPosition(e.matrixWorld).applyMatrix4(et), u.push(e, null, e.material, nt.z, null); else if ((e.isMesh || e.isLine || e.isPoints) && (e.isSkinnedMesh && e.skeleton.update(), !e.frustumCulled || q.intersectsObject(e))) {
                                    i && nt.setFromMatrixPosition(e.matrixWorld).applyMatrix4(et);
                                    var o = E.update(e), a = e.material;
                                    if (Array.isArray(a)) for (var s = o.groups, h = 0, c = s.length; h < c; h++) {
                                        var f = s[h], p = a[f.materialIndex];
                                        p && p.visible && u.push(e, o, p, nt.z, f)
                                    } else a.visible && u.push(e, o, a, nt.z, null)
                                }
                                var d = e.children;
                                for (var h = 0, c = d.length; h < c; h++) t(d[h], n, i)
                            }(t, e, N.sortObjects), !0 === N.sortObjects && u.sort(), j && $.beginShadows(), ht.render(l.state.shadowsArray, t, e), l.setupLights(e), j && $.endShadows(), this.info.autoReset && this.info.reset(), void 0 === n && (n = null), this.setRenderTarget(n), L.render(u, t, e, i);
                            var r = u.opaque, o = u.transparent;
                            if (t.overrideMaterial) {
                                var a = t.overrideMaterial;
                                r.length && vt(r, t, e, a), o.length && vt(o, t, e, a)
                            } else r.length && vt(r, t, e), o.length && vt(o, t, e);
                            n && w.updateRenderTargetMipmap(n), v.buffers.depth.setTest(!0), v.buffers.depth.setMask(!0), v.buffers.color.setMask(!0), v.setPolygonOffset(!1), t.onAfterRender(N, t, e), st.enabled && st.submitFrame(), u = null, l = null
                        }
                    } else console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.")
                }, this.allocTextureUnit = function () {
                    var t = D;
                    return t >= m.maxTextures && console.warn("THREE.WebGLRenderer: Trying to use " + t + " texture units while this GPU supports only " + m.maxTextures), D += 1, t
                }, this.setTexture2D = (dt = !1, function (t, e) {
                    t && t.isWebGLRenderTarget && (dt || (console.warn("THREE.WebGLRenderer.setTexture2D: don't use render targets as textures. Use their .texture property instead."), dt = !0), t = t.texture), w.setTexture2D(t, e)
                }), this.setTexture3D = function (t, e) {
                    w.setTexture3D(t, e)
                }, this.setTexture = function () {
                    var t = !1;
                    return function (e, n) {
                        t || (console.warn("THREE.WebGLRenderer: .setTexture is deprecated, use setTexture2D instead."), t = !0), w.setTexture2D(e, n)
                    }
                }(), this.setTextureCube = function () {
                    var t = !1;
                    return function (e, n) {
                        e && e.isWebGLRenderTargetCube && (t || (console.warn("THREE.WebGLRenderer.setTextureCube: don't use cube render targets as textures. Use their .texture property instead."), t = !0), e = e.texture), e && e.isCubeTexture || Array.isArray(e.image) && 6 === e.image.length ? w.setTextureCube(e, n) : w.setTextureCubeDynamic(e, n)
                    }
                }(), this.setFramebuffer = function (t) {
                    U = t
                }, this.getRenderTarget = function () {
                    return H
                }, this.setRenderTarget = function (t) {
                    H = t, t && void 0 === y.get(t).__webglFramebuffer && w.setupRenderTarget(t);
                    var e = U, n = !1;
                    if (t) {
                        var i = y.get(t).__webglFramebuffer;
                        t.isWebGLRenderTargetCube ? (e = i[t.activeCubeFace], n = !0) : e = i, k.copy(t.viewport), V.copy(t.scissor), W = t.scissorTest
                    } else k.copy(J).multiplyScalar(Z), V.copy(Q).multiplyScalar(Z), W = K;
                    if (G !== e && (f.bindFramebuffer(36160, e), G = e), v.viewport(k), v.scissor(V), v.setScissorTest(W), n) {
                        var r = y.get(t.texture);
                        f.framebufferTexture2D(36160, 36064, 34069 + t.activeCubeFace, r.__webglTexture, t.activeMipMapLevel)
                    }
                }, this.readRenderTargetPixels = function (t, e, n, i, r, o) {
                    if (t && t.isWebGLRenderTarget) {
                        var a = y.get(t).__webglFramebuffer;
                        if (a) {
                            var s = !1;
                            a !== G && (f.bindFramebuffer(36160, a), s = !0);
                            try {
                                var h = t.texture, c = h.format, u = h.type;
                                if (c !== Ft && P.convert(c) !== f.getParameter(35739)) return void console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");
                                if (!(u === bt || P.convert(u) === f.getParameter(35738) || u === Pt && (m.isWebGL2 || d.get("OES_texture_float") || d.get("WEBGL_color_buffer_float")) || u === Nt && d.get(m.isWebGL2 ? "EXT_color_buffer_float" : "EXT_color_buffer_half_float"))) return void console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");
                                36053 === f.checkFramebufferStatus(36160) ? e >= 0 && e <= t.width - i && n >= 0 && n <= t.height - r && f.readPixels(e, n, i, r, P.convert(c), P.convert(u), o) : console.error("THREE.WebGLRenderer.readRenderTargetPixels: readPixels from renderTarget failed. Framebuffer not complete.")
                            } finally {
                                s && f.bindFramebuffer(36160, G)
                            }
                        }
                    } else console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.")
                }, this.copyFramebufferToTexture = function (t, e, n) {
                    var i = e.image.width, r = e.image.height, o = P.convert(e.format);
                    this.setTexture2D(e, 0), f.copyTexImage2D(3553, n || 0, o, t.x, t.y, i, r, 0)
                }, this.copyTextureToTexture = function (t, e, n, i) {
                    var r = e.image.width, o = e.image.height, a = P.convert(n.format), s = P.convert(n.type);
                    this.setTexture2D(n, 0), e.isDataTexture ? f.texSubImage2D(3553, i || 0, t.x, t.y, r, o, a, s, e.image.data) : f.texSubImage2D(3553, i || 0, t.x, t.y, a, s, e.image)
                }
            }

            function eo(t, e) {
                this.name = "", this.color = new an(t), this.density = void 0 !== e ? e : 25e-5
            }

            function no(t, e, n) {
                this.name = "", this.color = new an(t), this.near = void 0 !== e ? e : 1, this.far = void 0 !== n ? n : 1e3
            }

            function io() {
                xn.call(this), this.type = "Scene", this.background = null, this.fog = null, this.overrideMaterial = null, this.autoUpdate = !0
            }

            function ro(t, e) {
                this.array = t, this.stride = e, this.count = void 0 !== t ? t.length / e : 0, this.dynamic = !1, this.updateRange = {
                    offset: 0,
                    count: -1
                }, this.version = 0
            }

            function oo(t, e, n, i) {
                this.data = t, this.itemSize = e, this.offset = n, this.normalized = !0 === i
            }

            function ao(t) {
                ni.call(this), this.type = "SpriteMaterial", this.color = new an(16777215), this.map = null, this.rotation = 0, this.sizeAttenuation = !0, this.lights = !1, this.transparent = !0, this.setValues(t)
            }

            function so(t) {
                if (xn.call(this), this.type = "Sprite", void 0 === Wr) {
                    Wr = new In;
                    var e = new ro(new Float32Array([-.5, -.5, 0, 0, 0, .5, -.5, 0, 1, 0, .5, .5, 0, 1, 1, -.5, .5, 0, 0, 1]), 5);
                    Wr.setIndex([0, 1, 2, 0, 2, 3]), Wr.addAttribute("position", new oo(e, 3, 0, !1)), Wr.addAttribute("uv", new oo(e, 2, 3, !1))
                }
                this.geometry = Wr, this.material = void 0 !== t ? t : new ao, this.center = new Ne(.5, .5)
            }

            function ho() {
                xn.call(this), this.type = "LOD", Object.defineProperties(this, {levels: {enumerable: !0, value: []}})
            }

            function co(t, e) {
                if (this.bones = (t = t || []).slice(0), this.boneMatrices = new Float32Array(16 * this.bones.length), void 0 === e) this.calculateInverses(); else if (this.bones.length === e.length) this.boneInverses = e.slice(0); else {
                    console.warn("THREE.Skeleton boneInverses is the wrong length."), this.boneInverses = [];
                    for (var n = 0, i = this.bones.length; n < i; n++) this.boneInverses.push(new ze)
                }
            }

            function uo() {
                xn.call(this), this.type = "Bone"
            }

            function lo(t, e) {
                si.call(this, t, e), this.type = "SkinnedMesh", this.bindMode = "attached", this.bindMatrix = new ze, this.bindMatrixInverse = new ze;
                var n = new co(this.initBones());
                this.bind(n, this.matrixWorld), this.normalizeSkinWeights()
            }

            function fo(t) {
                ni.call(this), this.type = "LineBasicMaterial", this.color = new an(16777215), this.linewidth = 1, this.linecap = "round", this.linejoin = "round", this.lights = !1, this.setValues(t)
            }

            function po(t, e, n) {
                1 === n && console.error("THREE.Line: parameter THREE.LinePieces no longer supported. Use THREE.LineSegments instead."), xn.call(this), this.type = "Line", this.geometry = void 0 !== t ? t : new In, this.material = void 0 !== e ? e : new fo({color: 16777215 * Math.random()})
            }

            function mo(t, e) {
                po.call(this, t, e), this.type = "LineSegments"
            }

            function vo(t, e) {
                po.call(this, t, e), this.type = "LineLoop"
            }

            function go(t) {
                ni.call(this), this.type = "PointsMaterial", this.color = new an(16777215), this.map = null, this.size = 1, this.sizeAttenuation = !0, this.morphTargets = !1, this.lights = !1, this.setValues(t)
            }

            function yo(t, e) {
                xn.call(this), this.type = "Points", this.geometry = void 0 !== t ? t : new In, this.material = void 0 !== e ? e : new go({color: 16777215 * Math.random()})
            }

            function wo(t, e, n, i, r, o, a, s, h) {
                De.call(this, t, e, n, i, r, o, a, s, h), this.generateMipmaps = !1
            }

            function xo(t, e, n, i, r, o, a, s, h, c, u, l) {
                De.call(this, null, o, a, s, h, c, i, r, u, l), this.image = {
                    width: e,
                    height: n
                }, this.mipmaps = t, this.flipY = !1, this.generateMipmaps = !1
            }

            function Mo(t, e, n, i, r, o, a, s, h) {
                De.call(this, t, e, n, i, r, o, a, s, h), this.needsUpdate = !0
            }

            function _o(t, e, n, i, r, o, a, s, h, c) {
                if ((c = void 0 !== c ? c : Wt) !== Wt && c !== Dt) throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");
                void 0 === n && c === Wt && (n = Ct), void 0 === n && c === Dt && (n = Gt), De.call(this, null, i, r, o, a, s, c, n, h), this.image = {
                    width: t,
                    height: e
                }, this.magFilter = void 0 !== a ? a : wt, this.minFilter = void 0 !== s ? s : wt, this.flipY = !1, this.generateMipmaps = !1
            }

            function Eo(t) {
                In.call(this), this.type = "WireframeGeometry";
                var e, n, i, r, o, a, s, h, c, u, l = [], f = [0, 0], p = {}, d = ["a", "b", "c"];
                if (t && t.isGeometry) {
                    var m = t.faces;
                    for (e = 0, i = m.length; e < i; e++) {
                        var v = m[e];
                        for (n = 0; n < 3; n++) s = v[d[n]], h = v[d[(n + 1) % 3]], f[0] = Math.min(s, h), f[1] = Math.max(s, h), void 0 === p[c = f[0] + "," + f[1]] && (p[c] = {
                            index1: f[0],
                            index2: f[1]
                        })
                    }
                    for (c in p) l.push((u = t.vertices[(a = p[c]).index1]).x, u.y, u.z), l.push((u = t.vertices[a.index2]).x, u.y, u.z)
                } else if (t && t.isBufferGeometry) {
                    var g, y, w, x, M;
                    if (u = new He, null !== t.index) {
                        for (g = t.attributes.position, y = t.index, 0 === (w = t.groups).length && (w = [{
                            start: 0,
                            count: y.count,
                            materialIndex: 0
                        }]), r = 0, o = w.length; r < o; ++r) for (e = M = (x = w[r]).start, i = M + x.count; e < i; e += 3) for (n = 0; n < 3; n++) s = y.getX(e + n), h = y.getX(e + (n + 1) % 3), f[0] = Math.min(s, h), f[1] = Math.max(s, h), void 0 === p[c = f[0] + "," + f[1]] && (p[c] = {
                            index1: f[0],
                            index2: f[1]
                        });
                        for (c in p) u.fromBufferAttribute(g, (a = p[c]).index1), l.push(u.x, u.y, u.z), u.fromBufferAttribute(g, a.index2), l.push(u.x, u.y, u.z)
                    } else for (e = 0, i = (g = t.attributes.position).count / 3; e < i; e++) for (n = 0; n < 3; n++) u.fromBufferAttribute(g, 3 * e + n), l.push(u.x, u.y, u.z), u.fromBufferAttribute(g, 3 * e + (n + 1) % 3), l.push(u.x, u.y, u.z)
                }
                this.addAttribute("position", new zn(l, 3))
            }

            function So(t, e, n) {
                Sn.call(this), this.type = "ParametricGeometry", this.parameters = {
                    func: t,
                    slices: e,
                    stacks: n
                }, this.fromBufferGeometry(new bo(t, e, n)), this.mergeVertices()
            }

            function bo(t, e, n) {
                In.call(this), this.type = "ParametricBufferGeometry", this.parameters = {
                    func: t,
                    slices: e,
                    stacks: n
                };
                var i, r, o = [], a = [], s = [], h = [], c = new He, u = new He, l = new He, f = new He, p = new He;
                t.length < 3 && console.error("THREE.ParametricGeometry: Function must now modify a Vector3 as third parameter.");
                var d = e + 1;
                for (i = 0; i <= n; i++) {
                    var m = i / n;
                    for (r = 0; r <= e; r++) {
                        var v = r / e;
                        t(v, m, u), a.push(u.x, u.y, u.z), v - 1e-5 >= 0 ? (t(v - 1e-5, m, l), f.subVectors(u, l)) : (t(v + 1e-5, m, l), f.subVectors(l, u)), m - 1e-5 >= 0 ? (t(v, m - 1e-5, l), p.subVectors(u, l)) : (t(v, m + 1e-5, l), p.subVectors(l, u)), c.crossVectors(f, p).normalize(), s.push(c.x, c.y, c.z), h.push(v, m)
                    }
                }
                for (i = 0; i < n; i++) for (r = 0; r < e; r++) {
                    var g = i * d + r + 1, y = (i + 1) * d + r + 1, w = (i + 1) * d + r;
                    o.push(i * d + r, g, w), o.push(g, y, w)
                }
                this.setIndex(o), this.addAttribute("position", new zn(a, 3)), this.addAttribute("normal", new zn(s, 3)), this.addAttribute("uv", new zn(h, 2))
            }

            function To(t, e, n, i) {
                Sn.call(this), this.type = "PolyhedronGeometry", this.parameters = {
                    vertices: t,
                    indices: e,
                    radius: n,
                    detail: i
                }, this.fromBufferGeometry(new Lo(t, e, n, i)), this.mergeVertices()
            }

            function Lo(t, e, n, i) {
                In.call(this), this.type = "PolyhedronBufferGeometry", this.parameters = {
                    vertices: t,
                    indices: e,
                    radius: n,
                    detail: i
                }, n = n || 1;
                var r = [], o = [];

                function a(t, e, n, i) {
                    var r, o, a = Math.pow(2, i), h = [];
                    for (r = 0; r <= a; r++) {
                        h[r] = [];
                        var c = t.clone().lerp(n, r / a), u = e.clone().lerp(n, r / a), l = a - r;
                        for (o = 0; o <= l; o++) h[r][o] = 0 === o && r === a ? c : c.clone().lerp(u, o / l)
                    }
                    for (r = 0; r < a; r++) for (o = 0; o < 2 * (a - r) - 1; o++) {
                        var f = Math.floor(o / 2);
                        o % 2 == 0 ? (s(h[r][f + 1]), s(h[r + 1][f]), s(h[r][f])) : (s(h[r][f + 1]), s(h[r + 1][f + 1]), s(h[r + 1][f]))
                    }
                }

                function s(t) {
                    r.push(t.x, t.y, t.z)
                }

                function h(e, n) {
                    var i = 3 * e;
                    n.x = t[i + 0], n.y = t[i + 1], n.z = t[i + 2]
                }

                function c(t, e, n, i) {
                    i < 0 && 1 === t.x && (o[e] = t.x - 1), 0 === n.x && 0 === n.z && (o[e] = i / 2 / Math.PI + .5)
                }

                function u(t) {
                    return Math.atan2(t.z, -t.x)
                }

                !function (t) {
                    for (var n = new He, i = new He, r = new He, o = 0; o < e.length; o += 3) h(e[o + 0], n), h(e[o + 1], i), h(e[o + 2], r), a(n, i, r, t)
                }(i = i || 0), function (t) {
                    for (var e = new He, n = 0; n < r.length; n += 3) e.x = r[n + 0], e.y = r[n + 1], e.z = r[n + 2], e.normalize().multiplyScalar(t), r[n + 0] = e.x, r[n + 1] = e.y, r[n + 2] = e.z
                }(n), function () {
                    for (var t = new He, e = 0; e < r.length; e += 3) {
                        t.x = r[e + 0], t.y = r[e + 1], t.z = r[e + 2];
                        var n = u(t) / 2 / Math.PI + .5,
                            i = (a = t, Math.atan2(-a.y, Math.sqrt(a.x * a.x + a.z * a.z)) / Math.PI + .5);
                        o.push(n, 1 - i)
                    }
                    var a;
                    (function () {
                        for (var t = new He, e = new He, n = new He, i = new He, a = new Ne, s = new Ne, h = new Ne, l = 0, f = 0; l < r.length; l += 9, f += 6) {
                            t.set(r[l + 0], r[l + 1], r[l + 2]), e.set(r[l + 3], r[l + 4], r[l + 5]), n.set(r[l + 6], r[l + 7], r[l + 8]), a.set(o[f + 0], o[f + 1]), s.set(o[f + 2], o[f + 3]), h.set(o[f + 4], o[f + 5]), i.copy(t).add(e).add(n).divideScalar(3);
                            var p = u(i);
                            c(a, f + 0, t, p), c(s, f + 2, e, p), c(h, f + 4, n, p)
                        }
                    })(), function () {
                        for (var t = 0; t < o.length; t += 6) {
                            var e = o[t + 0], n = o[t + 2], i = o[t + 4], r = Math.max(e, n, i), a = Math.min(e, n, i);
                            r > .9 && a < .1 && (e < .2 && (o[t + 0] += 1), n < .2 && (o[t + 2] += 1), i < .2 && (o[t + 4] += 1))
                        }
                    }()
                }(), this.addAttribute("position", new zn(r, 3)), this.addAttribute("normal", new zn(r.slice(), 3)), this.addAttribute("uv", new zn(o, 2)), 0 === i ? this.computeVertexNormals() : this.normalizeNormals()
            }

            function Co(t, e) {
                Sn.call(this), this.type = "TetrahedronGeometry", this.parameters = {
                    radius: t,
                    detail: e
                }, this.fromBufferGeometry(new Ro(t, e)), this.mergeVertices()
            }

            function Ro(t, e) {
                Lo.call(this, [1, 1, 1, -1, -1, 1, -1, 1, -1, 1, -1, -1], [2, 1, 0, 0, 3, 2, 1, 3, 0, 2, 3, 1], t, e), this.type = "TetrahedronBufferGeometry", this.parameters = {
                    radius: t,
                    detail: e
                }
            }

            function Ao(t, e) {
                Sn.call(this), this.type = "OctahedronGeometry", this.parameters = {
                    radius: t,
                    detail: e
                }, this.fromBufferGeometry(new Po(t, e)), this.mergeVertices()
            }

            function Po(t, e) {
                Lo.call(this, [1, 0, 0, -1, 0, 0, 0, 1, 0, 0, -1, 0, 0, 0, 1, 0, 0, -1], [0, 2, 4, 0, 4, 3, 0, 3, 5, 0, 5, 2, 1, 2, 5, 1, 5, 3, 1, 3, 4, 1, 4, 2], t, e), this.type = "OctahedronBufferGeometry", this.parameters = {
                    radius: t,
                    detail: e
                }
            }

            function No(t, e) {
                Sn.call(this), this.type = "IcosahedronGeometry", this.parameters = {
                    radius: t,
                    detail: e
                }, this.fromBufferGeometry(new zo(t, e)), this.mergeVertices()
            }

            function zo(t, e) {
                var n = (1 + Math.sqrt(5)) / 2;
                Lo.call(this, [-1, n, 0, 1, n, 0, -1, -n, 0, 1, -n, 0, 0, -1, n, 0, 1, n, 0, -1, -n, 0, 1, -n, n, 0, -1, n, 0, 1, -n, 0, -1, -n, 0, 1], [0, 11, 5, 0, 5, 1, 0, 1, 7, 0, 7, 10, 0, 10, 11, 1, 5, 9, 5, 11, 4, 11, 10, 2, 10, 7, 6, 7, 1, 8, 3, 9, 4, 3, 4, 2, 3, 2, 6, 3, 6, 8, 3, 8, 9, 4, 9, 5, 2, 4, 11, 6, 2, 10, 8, 6, 7, 9, 8, 1], t, e), this.type = "IcosahedronBufferGeometry", this.parameters = {
                    radius: t,
                    detail: e
                }
            }

            function Uo(t, e) {
                Sn.call(this), this.type = "DodecahedronGeometry", this.parameters = {
                    radius: t,
                    detail: e
                }, this.fromBufferGeometry(new Ho(t, e)), this.mergeVertices()
            }

            function Ho(t, e) {
                var n = (1 + Math.sqrt(5)) / 2, i = 1 / n;
                Lo.call(this, [-1, -1, -1, -1, -1, 1, -1, 1, -1, -1, 1, 1, 1, -1, -1, 1, -1, 1, 1, 1, -1, 1, 1, 1, 0, -i, -n, 0, -i, n, 0, i, -n, 0, i, n, -i, -n, 0, -i, n, 0, i, -n, 0, i, n, 0, -n, 0, -i, n, 0, -i, -n, 0, i, n, 0, i], [3, 11, 7, 3, 7, 15, 3, 15, 13, 7, 19, 17, 7, 17, 6, 7, 6, 15, 17, 4, 8, 17, 8, 10, 17, 10, 6, 8, 0, 16, 8, 16, 2, 8, 2, 10, 0, 12, 1, 0, 1, 18, 0, 18, 16, 6, 10, 2, 6, 2, 13, 6, 13, 15, 2, 16, 18, 2, 18, 3, 2, 3, 13, 18, 1, 9, 18, 9, 11, 18, 11, 3, 4, 14, 12, 4, 12, 0, 4, 0, 8, 11, 9, 5, 11, 5, 19, 11, 19, 7, 19, 5, 14, 19, 14, 4, 19, 4, 17, 1, 12, 14, 1, 14, 5, 1, 5, 9], t, e), this.type = "DodecahedronBufferGeometry", this.parameters = {
                    radius: t,
                    detail: e
                }
            }

            function Go(t, e, n, i, r, o) {
                Sn.call(this), this.type = "TubeGeometry", this.parameters = {
                    path: t,
                    tubularSegments: e,
                    radius: n,
                    radialSegments: i,
                    closed: r
                }, void 0 !== o && console.warn("THREE.TubeGeometry: taper has been removed.");
                var a = new Oo(t, e, n, i, r);
                this.tangents = a.tangents, this.normals = a.normals, this.binormals = a.binormals, this.fromBufferGeometry(a), this.mergeVertices()
            }

            function Oo(t, e, n, i, r) {
                In.call(this), this.type = "TubeBufferGeometry", this.parameters = {
                    path: t,
                    tubularSegments: e,
                    radius: n,
                    radialSegments: i,
                    closed: r
                }, n = n || 1, i = i || 8;
                var o = t.computeFrenetFrames(e = e || 64, r = r || !1);
                this.tangents = o.tangents, this.normals = o.normals, this.binormals = o.binormals;
                var a, s, h = new He, c = new He, u = new Ne, l = new He, f = [], p = [], d = [], m = [];

                function v(r) {
                    l = t.getPointAt(r / e, l);
                    var a = o.normals[r], u = o.binormals[r];
                    for (s = 0; s <= i; s++) {
                        var d = s / i * Math.PI * 2, m = Math.sin(d), v = -Math.cos(d);
                        c.x = v * a.x + m * u.x, c.y = v * a.y + m * u.y, c.z = v * a.z + m * u.z, c.normalize(), p.push(c.x, c.y, c.z), h.x = l.x + n * c.x, h.y = l.y + n * c.y, h.z = l.z + n * c.z, f.push(h.x, h.y, h.z)
                    }
                }

                !function () {
                    for (a = 0; a < e; a++) v(a);
                    v(!1 === r ? e : 0), function () {
                        for (a = 0; a <= e; a++) for (s = 0; s <= i; s++) u.x = a / e, u.y = s / i, d.push(u.x, u.y)
                    }(), function () {
                        for (s = 1; s <= e; s++) for (a = 1; a <= i; a++) {
                            var t = (i + 1) * (s - 1) + (a - 1), n = (i + 1) * s + (a - 1), r = (i + 1) * s + a,
                                o = (i + 1) * (s - 1) + a;
                            m.push(t, n, o), m.push(n, r, o)
                        }
                    }()
                }(), this.setIndex(m), this.addAttribute("position", new zn(f, 3)), this.addAttribute("normal", new zn(p, 3)), this.addAttribute("uv", new zn(d, 2))
            }

            function Io(t, e, n, i, r, o, a) {
                Sn.call(this), this.type = "TorusKnotGeometry", this.parameters = {
                    radius: t,
                    tube: e,
                    tubularSegments: n,
                    radialSegments: i,
                    p: r,
                    q: o
                }, void 0 !== a && console.warn("THREE.TorusKnotGeometry: heightScale has been deprecated. Use .scale( x, y, z ) instead."), this.fromBufferGeometry(new Fo(t, e, n, i, r, o)), this.mergeVertices()
            }

            function Fo(t, e, n, i, r, o) {
                In.call(this), this.type = "TorusKnotBufferGeometry", this.parameters = {
                    radius: t,
                    tube: e,
                    tubularSegments: n,
                    radialSegments: i,
                    p: r,
                    q: o
                }, t = t || 1, e = e || .4, n = Math.floor(n) || 64, i = Math.floor(i) || 8, r = r || 2, o = o || 3;
                var a, s, h = [], c = [], u = [], l = [], f = new He, p = new He, d = new He, m = new He, v = new He,
                    g = new He, y = new He;
                for (a = 0; a <= n; ++a) {
                    var w = a / n * r * Math.PI * 2;
                    for (T(w, r, o, t, d), T(w + .01, r, o, t, m), g.subVectors(m, d), y.addVectors(m, d), v.crossVectors(g, y), y.crossVectors(v, g), v.normalize(), y.normalize(), s = 0; s <= i; ++s) {
                        var x = s / i * Math.PI * 2, M = -e * Math.cos(x), _ = e * Math.sin(x);
                        f.x = d.x + (M * y.x + _ * v.x), f.y = d.y + (M * y.y + _ * v.y), f.z = d.z + (M * y.z + _ * v.z), c.push(f.x, f.y, f.z), p.subVectors(f, d).normalize(), u.push(p.x, p.y, p.z), l.push(a / n), l.push(s / i)
                    }
                }
                for (s = 1; s <= n; s++) for (a = 1; a <= i; a++) {
                    var E = (i + 1) * s + (a - 1), S = (i + 1) * s + a, b = (i + 1) * (s - 1) + a;
                    h.push((i + 1) * (s - 1) + (a - 1), E, b), h.push(E, S, b)
                }

                function T(t, e, n, i, r) {
                    var o = Math.cos(t), a = Math.sin(t), s = n / e * t, h = Math.cos(s);
                    r.x = i * (2 + h) * .5 * o, r.y = i * (2 + h) * a * .5, r.z = i * Math.sin(s) * .5
                }

                this.setIndex(h), this.addAttribute("position", new zn(c, 3)), this.addAttribute("normal", new zn(u, 3)), this.addAttribute("uv", new zn(l, 2))
            }

            function Bo(t, e, n, i, r) {
                Sn.call(this), this.type = "TorusGeometry", this.parameters = {
                    radius: t,
                    tube: e,
                    radialSegments: n,
                    tubularSegments: i,
                    arc: r
                }, this.fromBufferGeometry(new ko(t, e, n, i, r)), this.mergeVertices()
            }

            function ko(t, e, n, i, r) {
                In.call(this), this.type = "TorusBufferGeometry", this.parameters = {
                    radius: t,
                    tube: e,
                    radialSegments: n,
                    tubularSegments: i,
                    arc: r
                }, t = t || 1, e = e || .4, n = Math.floor(n) || 8, i = Math.floor(i) || 6, r = r || 2 * Math.PI;
                var o, a, s = [], h = [], c = [], u = [], l = new He, f = new He, p = new He;
                for (o = 0; o <= n; o++) for (a = 0; a <= i; a++) {
                    var d = a / i * r, m = o / n * Math.PI * 2;
                    f.x = (t + e * Math.cos(m)) * Math.cos(d), f.y = (t + e * Math.cos(m)) * Math.sin(d), f.z = e * Math.sin(m), h.push(f.x, f.y, f.z), l.x = t * Math.cos(d), l.y = t * Math.sin(d), p.subVectors(f, l).normalize(), c.push(p.x, p.y, p.z), u.push(a / i), u.push(o / n)
                }
                for (o = 1; o <= n; o++) for (a = 1; a <= i; a++) {
                    var v = (i + 1) * (o - 1) + a - 1, g = (i + 1) * (o - 1) + a, y = (i + 1) * o + a;
                    s.push((i + 1) * o + a - 1, v, y), s.push(v, g, y)
                }
                this.setIndex(s), this.addAttribute("position", new zn(h, 3)), this.addAttribute("normal", new zn(c, 3)), this.addAttribute("uv", new zn(u, 2))
            }

            eo.prototype.isFogExp2 = !0, eo.prototype.clone = function () {
                return new eo(this.color, this.density)
            }, eo.prototype.toJSON = function () {
                return {type: "FogExp2", color: this.color.getHex(), density: this.density}
            }, no.prototype.isFog = !0, no.prototype.clone = function () {
                return new no(this.color, this.near, this.far)
            }, no.prototype.toJSON = function () {
                return {type: "Fog", color: this.color.getHex(), near: this.near, far: this.far}
            }, io.prototype = Object.assign(Object.create(xn.prototype), {
                constructor: io, copy: function (t, e) {
                    return xn.prototype.copy.call(this, t, e), null !== t.background && (this.background = t.background.clone()), null !== t.fog && (this.fog = t.fog.clone()), null !== t.overrideMaterial && (this.overrideMaterial = t.overrideMaterial.clone()), this.autoUpdate = t.autoUpdate, this.matrixAutoUpdate = t.matrixAutoUpdate, this
                }, toJSON: function (t) {
                    var e = xn.prototype.toJSON.call(this, t);
                    return null !== this.background && (e.object.background = this.background.toJSON(t)), null !== this.fog && (e.object.fog = this.fog.toJSON()), e
                }
            }), Object.defineProperty(ro.prototype, "needsUpdate", {
                set: function (t) {
                    !0 === t && this.version++
                }
            }), Object.assign(ro.prototype, {
                isInterleavedBuffer: !0, onUploadCallback: function () {
                }, setArray: function (t) {
                    if (Array.isArray(t)) throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");
                    return this.count = void 0 !== t ? t.length / this.stride : 0, this.array = t, this
                }, setDynamic: function (t) {
                    return this.dynamic = t, this
                }, copy: function (t) {
                    return this.array = new t.array.constructor(t.array), this.count = t.count, this.stride = t.stride, this.dynamic = t.dynamic, this
                }, copyAt: function (t, e, n) {
                    t *= this.stride, n *= e.stride;
                    for (var i = 0, r = this.stride; i < r; i++) this.array[t + i] = e.array[n + i];
                    return this
                }, set: function (t, e) {
                    return void 0 === e && (e = 0), this.array.set(t, e), this
                }, clone: function () {
                    return (new this.constructor).copy(this)
                }, onUpload: function (t) {
                    return this.onUploadCallback = t, this
                }
            }), Object.defineProperties(oo.prototype, {
                count: {
                    get: function () {
                        return this.data.count
                    }
                }, array: {
                    get: function () {
                        return this.data.array
                    }
                }
            }), Object.assign(oo.prototype, {
                isInterleavedBufferAttribute: !0, setX: function (t, e) {
                    return this.data.array[t * this.data.stride + this.offset] = e, this
                }, setY: function (t, e) {
                    return this.data.array[t * this.data.stride + this.offset + 1] = e, this
                }, setZ: function (t, e) {
                    return this.data.array[t * this.data.stride + this.offset + 2] = e, this
                }, setW: function (t, e) {
                    return this.data.array[t * this.data.stride + this.offset + 3] = e, this
                }, getX: function (t) {
                    return this.data.array[t * this.data.stride + this.offset]
                }, getY: function (t) {
                    return this.data.array[t * this.data.stride + this.offset + 1]
                }, getZ: function (t) {
                    return this.data.array[t * this.data.stride + this.offset + 2]
                }, getW: function (t) {
                    return this.data.array[t * this.data.stride + this.offset + 3]
                }, setXY: function (t, e, n) {
                    return this.data.array[(t = t * this.data.stride + this.offset) + 0] = e, this.data.array[t + 1] = n, this
                }, setXYZ: function (t, e, n, i) {
                    return this.data.array[(t = t * this.data.stride + this.offset) + 0] = e, this.data.array[t + 1] = n, this.data.array[t + 2] = i, this
                }, setXYZW: function (t, e, n, i, r) {
                    return this.data.array[(t = t * this.data.stride + this.offset) + 0] = e, this.data.array[t + 1] = n, this.data.array[t + 2] = i, this.data.array[t + 3] = r, this
                }
            }), (ao.prototype = Object.create(ni.prototype)).constructor = ao, ao.prototype.isSpriteMaterial = !0, ao.prototype.copy = function (t) {
                return ni.prototype.copy.call(this, t), this.color.copy(t.color), this.map = t.map, this.rotation = t.rotation, this.sizeAttenuation = t.sizeAttenuation, this
            }, so.prototype = Object.assign(Object.create(xn.prototype), {
                constructor: so, isSprite: !0, raycast: function () {
                    var t = new He, e = new He, n = new He, i = new Ne, r = new Ne, o = new ze, a = new He, s = new He,
                        h = new He, c = new Ne, u = new Ne, l = new Ne;

                    function f(t, e, n, a, s, h) {
                        i.subVectors(t, n).addScalar(.5).multiply(a), void 0 !== s ? (r.x = h * i.x - s * i.y, r.y = s * i.x + h * i.y) : r.copy(i), t.copy(e), t.x += r.x, t.y += r.y, t.applyMatrix4(o)
                    }

                    return function (i, r) {
                        e.setFromMatrixScale(this.matrixWorld), o.getInverse(this.modelViewMatrix).premultiply(this.matrixWorld), n.setFromMatrixPosition(this.modelViewMatrix);
                        var p, d, m = this.material.rotation;
                        0 !== m && (d = Math.cos(m), p = Math.sin(m));
                        var v = this.center;
                        f(a.set(-.5, -.5, 0), n, v, e, p, d), f(s.set(.5, -.5, 0), n, v, e, p, d), f(h.set(.5, .5, 0), n, v, e, p, d), c.set(0, 0), u.set(1, 0), l.set(1, 1);
                        var g = i.ray.intersectTriangle(a, s, h, !1, t);
                        if (null !== g || (f(s.set(-.5, .5, 0), n, v, e, p, d), u.set(0, 1), null !== (g = i.ray.intersectTriangle(a, h, s, !1, t)))) {
                            var y = i.ray.origin.distanceTo(t);
                            y < i.near || y > i.far || r.push({
                                distance: y,
                                point: t.clone(),
                                uv: oi.getUV(t, a, s, h, c, u, l, new Ne),
                                face: null,
                                object: this
                            })
                        }
                    }
                }(), clone: function () {
                    return new this.constructor(this.material).copy(this)
                }, copy: function (t) {
                    return xn.prototype.copy.call(this, t), void 0 !== t.center && this.center.copy(t.center), this
                }
            }), ho.prototype = Object.assign(Object.create(xn.prototype), {
                constructor: ho, copy: function (t) {
                    xn.prototype.copy.call(this, t, !1);
                    for (var e = t.levels, n = 0, i = e.length; n < i; n++) {
                        var r = e[n];
                        this.addLevel(r.object.clone(), r.distance)
                    }
                    return this
                }, addLevel: function (t, e) {
                    void 0 === e && (e = 0), e = Math.abs(e);
                    for (var n = this.levels, i = 0; i < n.length && !(e < n[i].distance); i++) ;
                    n.splice(i, 0, {distance: e, object: t}), this.add(t)
                }, getObjectForDistance: function (t) {
                    for (var e = this.levels, n = 1, i = e.length; n < i && !(t < e[n].distance); n++) ;
                    return e[n - 1].object
                }, raycast: (Dr = new He, function (t, e) {
                    Dr.setFromMatrixPosition(this.matrixWorld);
                    var n = t.ray.origin.distanceTo(Dr);
                    this.getObjectForDistance(n).raycast(t, e)
                }), update: function () {
                    var t = new He, e = new He;
                    return function (n) {
                        var i = this.levels;
                        if (i.length > 1) {
                            t.setFromMatrixPosition(n.matrixWorld), e.setFromMatrixPosition(this.matrixWorld);
                            var r = t.distanceTo(e);
                            i[0].object.visible = !0;
                            for (var o = 1, a = i.length; o < a && r >= i[o].distance; o++) i[o - 1].object.visible = !1, i[o].object.visible = !0;
                            for (; o < a; o++) i[o].object.visible = !1
                        }
                    }
                }(), toJSON: function (t) {
                    var e = xn.prototype.toJSON.call(this, t);
                    e.object.levels = [];
                    for (var n = this.levels, i = 0, r = n.length; i < r; i++) {
                        var o = n[i];
                        e.object.levels.push({object: o.object.uuid, distance: o.distance})
                    }
                    return e
                }
            }), Object.assign(co.prototype, {
                calculateInverses: function () {
                    this.boneInverses = [];
                    for (var t = 0, e = this.bones.length; t < e; t++) {
                        var n = new ze;
                        this.bones[t] && n.getInverse(this.bones[t].matrixWorld), this.boneInverses.push(n)
                    }
                }, pose: function () {
                    var t, e, n;
                    for (e = 0, n = this.bones.length; e < n; e++) (t = this.bones[e]) && t.matrixWorld.getInverse(this.boneInverses[e]);
                    for (e = 0, n = this.bones.length; e < n; e++) (t = this.bones[e]) && (t.parent && t.parent.isBone ? (t.matrix.getInverse(t.parent.matrixWorld), t.matrix.multiply(t.matrixWorld)) : t.matrix.copy(t.matrixWorld), t.matrix.decompose(t.position, t.quaternion, t.scale))
                }, update: (Xr = new ze, Yr = new ze, function () {
                    for (var t = this.bones, e = this.boneInverses, n = this.boneMatrices, i = this.boneTexture, r = 0, o = t.length; r < o; r++) Xr.multiplyMatrices(t[r] ? t[r].matrixWorld : Yr, e[r]), Xr.toArray(n, 16 * r);
                    void 0 !== i && (i.needsUpdate = !0)
                }), clone: function () {
                    return new co(this.bones, this.boneInverses)
                }, getBoneByName: function (t) {
                    for (var e = 0, n = this.bones.length; e < n; e++) {
                        var i = this.bones[e];
                        if (i.name === t) return i
                    }
                }
            }), uo.prototype = Object.assign(Object.create(xn.prototype), {
                constructor: uo,
                isBone: !0
            }), lo.prototype = Object.assign(Object.create(si.prototype), {
                constructor: lo, isSkinnedMesh: !0, initBones: function () {
                    var t, e, n, i, r = [];
                    if (this.geometry && void 0 !== this.geometry.bones) {
                        for (n = 0, i = this.geometry.bones.length; n < i; n++) e = this.geometry.bones[n], t = new uo, r.push(t), t.name = e.name, t.position.fromArray(e.pos), t.quaternion.fromArray(e.rotq), void 0 !== e.scl && t.scale.fromArray(e.scl);
                        for (n = 0, i = this.geometry.bones.length; n < i; n++) -1 !== (e = this.geometry.bones[n]).parent && null !== e.parent && void 0 !== r[e.parent] ? r[e.parent].add(r[n]) : this.add(r[n])
                    }
                    return this.updateMatrixWorld(!0), r
                }, bind: function (t, e) {
                    this.skeleton = t, void 0 === e && (this.updateMatrixWorld(!0), this.skeleton.calculateInverses(), e = this.matrixWorld), this.bindMatrix.copy(e), this.bindMatrixInverse.getInverse(e)
                }, pose: function () {
                    this.skeleton.pose()
                }, normalizeSkinWeights: function () {
                    var t, e;
                    if (this.geometry && this.geometry.isGeometry) for (e = 0; e < this.geometry.skinWeights.length; e++) {
                        var n = this.geometry.skinWeights[e];
                        Infinity !== (t = 1 / n.manhattanLength()) ? n.multiplyScalar(t) : n.set(1, 0, 0, 0)
                    } else if (this.geometry && this.geometry.isBufferGeometry) {
                        var i = new Xe, r = this.geometry.attributes.skinWeight;
                        for (e = 0; e < r.count; e++) i.x = r.getX(e), i.y = r.getY(e), i.z = r.getZ(e), i.w = r.getW(e), Infinity !== (t = 1 / i.manhattanLength()) ? i.multiplyScalar(t) : i.set(1, 0, 0, 0), r.setXYZW(e, i.x, i.y, i.z, i.w)
                    }
                }, updateMatrixWorld: function (t) {
                    si.prototype.updateMatrixWorld.call(this, t), "attached" === this.bindMode ? this.bindMatrixInverse.getInverse(this.matrixWorld) : "detached" === this.bindMode ? this.bindMatrixInverse.getInverse(this.bindMatrix) : console.warn("THREE.SkinnedMesh: Unrecognized bindMode: " + this.bindMode)
                }, clone: function () {
                    return new this.constructor(this.geometry, this.material).copy(this)
                }
            }), (fo.prototype = Object.create(ni.prototype)).constructor = fo, fo.prototype.isLineBasicMaterial = !0, fo.prototype.copy = function (t) {
                return ni.prototype.copy.call(this, t), this.color.copy(t.color), this.linewidth = t.linewidth, this.linecap = t.linecap, this.linejoin = t.linejoin, this
            }, po.prototype = Object.assign(Object.create(xn.prototype), {
                constructor: po, isLine: !0, computeLineDistances: (Zr = new He, Jr = new He, function () {
                    var t = this.geometry;
                    if (t.isBufferGeometry) if (null === t.index) {
                        for (var e = t.attributes.position, n = [0], i = 1, r = e.count; i < r; i++) Zr.fromBufferAttribute(e, i - 1), Jr.fromBufferAttribute(e, i), n[i] = n[i - 1], n[i] += Zr.distanceTo(Jr);
                        t.addAttribute("lineDistance", new zn(n, 1))
                    } else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry."); else if (t.isGeometry) {
                        var o = t.vertices;
                        for ((n = t.lineDistances)[0] = 0, i = 1, r = o.length; i < r; i++) n[i] = n[i - 1], n[i] += o[i - 1].distanceTo(o[i])
                    }
                    return this
                }), raycast: function () {
                    var t = new ze, e = new ri, n = new Ke;
                    return function (i, r) {
                        var o = i.linePrecision, a = this.geometry, s = this.matrixWorld;
                        if (null === a.boundingSphere && a.computeBoundingSphere(), n.copy(a.boundingSphere), n.applyMatrix4(s), n.radius += o, !1 !== i.ray.intersectsSphere(n)) {
                            t.getInverse(s), e.copy(i.ray).applyMatrix4(t);
                            var h = o / ((this.scale.x + this.scale.y + this.scale.z) / 3), c = h * h, u = new He,
                                l = new He, f = new He, p = new He, d = this && this.isLineSegments ? 2 : 1;
                            if (a.isBufferGeometry) {
                                var m = a.index, v = a.attributes.position.array;
                                if (null !== m) for (var g = m.array, y = 0, w = g.length - 1; y < w; y += d) {
                                    var x = g[y + 1];
                                    if (u.fromArray(v, 3 * g[y]), l.fromArray(v, 3 * x), !(e.distanceSqToSegment(u, l, p, f) > c)) p.applyMatrix4(this.matrixWorld), (E = i.ray.origin.distanceTo(p)) < i.near || E > i.far || r.push({
                                        distance: E,
                                        point: f.clone().applyMatrix4(this.matrixWorld),
                                        index: y,
                                        face: null,
                                        faceIndex: null,
                                        object: this
                                    })
                                } else for (y = 0, w = v.length / 3 - 1; y < w; y += d) {
                                    if (u.fromArray(v, 3 * y), l.fromArray(v, 3 * y + 3), !(e.distanceSqToSegment(u, l, p, f) > c)) p.applyMatrix4(this.matrixWorld), (E = i.ray.origin.distanceTo(p)) < i.near || E > i.far || r.push({
                                        distance: E,
                                        point: f.clone().applyMatrix4(this.matrixWorld),
                                        index: y,
                                        face: null,
                                        faceIndex: null,
                                        object: this
                                    })
                                }
                            } else if (a.isGeometry) {
                                var M = a.vertices, _ = M.length;
                                for (y = 0; y < _ - 1; y += d) {
                                    var E;
                                    if (!(e.distanceSqToSegment(M[y], M[y + 1], p, f) > c)) p.applyMatrix4(this.matrixWorld), (E = i.ray.origin.distanceTo(p)) < i.near || E > i.far || r.push({
                                        distance: E,
                                        point: f.clone().applyMatrix4(this.matrixWorld),
                                        index: y,
                                        face: null,
                                        faceIndex: null,
                                        object: this
                                    })
                                }
                            }
                        }
                    }
                }(), copy: function (t) {
                    return xn.prototype.copy.call(this, t), this.geometry.copy(t.geometry), this.material.copy(t.material), this
                }, clone: function () {
                    return (new this.constructor).copy(this)
                }
            }), mo.prototype = Object.assign(Object.create(po.prototype), {
                constructor: mo,
                isLineSegments: !0,
                computeLineDistances: function () {
                    var t = new He, e = new He;
                    return function () {
                        var n = this.geometry;
                        if (n.isBufferGeometry) if (null === n.index) {
                            for (var i = n.attributes.position, r = [], o = 0, a = i.count; o < a; o += 2) t.fromBufferAttribute(i, o), e.fromBufferAttribute(i, o + 1), r[o] = 0 === o ? 0 : r[o - 1], r[o + 1] = r[o] + t.distanceTo(e);
                            n.addAttribute("lineDistance", new zn(r, 1))
                        } else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry."); else if (n.isGeometry) {
                            var s = n.vertices;
                            for (r = n.lineDistances, o = 0, a = s.length; o < a; o += 2) t.copy(s[o]), e.copy(s[o + 1]), r[o] = 0 === o ? 0 : r[o - 1], r[o + 1] = r[o] + t.distanceTo(e)
                        }
                        return this
                    }
                }()
            }), vo.prototype = Object.assign(Object.create(po.prototype), {
                constructor: vo,
                isLineLoop: !0
            }), (go.prototype = Object.create(ni.prototype)).constructor = go, go.prototype.isPointsMaterial = !0, go.prototype.copy = function (t) {
                return ni.prototype.copy.call(this, t), this.color.copy(t.color), this.map = t.map, this.size = t.size, this.sizeAttenuation = t.sizeAttenuation, this.morphTargets = t.morphTargets, this
            }, yo.prototype = Object.assign(Object.create(xn.prototype), {
                constructor: yo, isPoints: !0, raycast: function () {
                    var t = new ze, e = new ri, n = new Ke;
                    return function (i, r) {
                        var o = this, a = this.geometry, s = this.matrixWorld, h = i.params.Points.threshold;
                        if (null === a.boundingSphere && a.computeBoundingSphere(), n.copy(a.boundingSphere), n.applyMatrix4(s), n.radius += h, !1 !== i.ray.intersectsSphere(n)) {
                            t.getInverse(s), e.copy(i.ray).applyMatrix4(t);
                            var c = h / ((this.scale.x + this.scale.y + this.scale.z) / 3), u = c * c, l = new He,
                                f = new He;
                            if (a.isBufferGeometry) {
                                var p = a.index, d = a.attributes.position.array;
                                if (null !== p) for (var m = p.array, v = 0, g = m.length; v < g; v++) {
                                    var y = m[v];
                                    l.fromArray(d, 3 * y), M(l, y)
                                } else {
                                    v = 0;
                                    for (var w = d.length / 3; v < w; v++) l.fromArray(d, 3 * v), M(l, v)
                                }
                            } else {
                                var x = a.vertices;
                                for (v = 0, w = x.length; v < w; v++) M(x[v], v)
                            }
                        }

                        function M(t, n) {
                            var a = e.distanceSqToPoint(t);
                            if (a < u) {
                                e.closestPointToPoint(t, f), f.applyMatrix4(s);
                                var h = i.ray.origin.distanceTo(f);
                                if (h < i.near || h > i.far) return;
                                r.push({
                                    distance: h,
                                    distanceToRay: Math.sqrt(a),
                                    point: f.clone(),
                                    index: n,
                                    face: null,
                                    object: o
                                })
                            }
                        }
                    }
                }(), clone: function () {
                    return new this.constructor(this.geometry, this.material).copy(this)
                }
            }), wo.prototype = Object.assign(Object.create(De.prototype), {
                constructor: wo,
                isVideoTexture: !0,
                update: function () {
                    var t = this.image;
                    t.readyState >= t.HAVE_CURRENT_DATA && (this.needsUpdate = !0)
                }
            }), (xo.prototype = Object.create(De.prototype)).constructor = xo, xo.prototype.isCompressedTexture = !0, (Mo.prototype = Object.create(De.prototype)).constructor = Mo, Mo.prototype.isCanvasTexture = !0, (_o.prototype = Object.create(De.prototype)).constructor = _o, _o.prototype.isDepthTexture = !0, (Eo.prototype = Object.create(In.prototype)).constructor = Eo, (So.prototype = Object.create(Sn.prototype)).constructor = So, (bo.prototype = Object.create(In.prototype)).constructor = bo, (To.prototype = Object.create(Sn.prototype)).constructor = To, (Lo.prototype = Object.create(In.prototype)).constructor = Lo, (Co.prototype = Object.create(Sn.prototype)).constructor = Co, (Ro.prototype = Object.create(Lo.prototype)).constructor = Ro, (Ao.prototype = Object.create(Sn.prototype)).constructor = Ao, (Po.prototype = Object.create(Lo.prototype)).constructor = Po, (No.prototype = Object.create(Sn.prototype)).constructor = No, (zo.prototype = Object.create(Lo.prototype)).constructor = zo, (Uo.prototype = Object.create(Sn.prototype)).constructor = Uo, (Ho.prototype = Object.create(Lo.prototype)).constructor = Ho, (Go.prototype = Object.create(Sn.prototype)).constructor = Go, (Oo.prototype = Object.create(In.prototype)).constructor = Oo, (Io.prototype = Object.create(Sn.prototype)).constructor = Io, (Fo.prototype = Object.create(In.prototype)).constructor = Fo, (Bo.prototype = Object.create(Sn.prototype)).constructor = Bo, (ko.prototype = Object.create(In.prototype)).constructor = ko;
            var Vo = function (t, e, n) {
                n = n || 2;
                var i, r, o, a, s, h, c, u = e && e.length, l = u ? e[0] * n : t.length, f = Wo(t, 0, l, n, !0), p = [];
                if (!f) return p;
                if (u && (f = function (t, e, n, i) {
                    var r, o, a, s = [];
                    for (r = 0, o = e.length; r < o; r++) (a = Wo(t, e[r] * i, r < o - 1 ? e[r + 1] * i : t.length, i, !1)) === a.next && (a.steiner = !0), s.push(jo(a));
                    for (s.sort(Ko), r = 0; r < s.length; r++) qo(s[r], n), n = Do(n, n.next);
                    return n
                }(t, e, f, n)), t.length > 80 * n) {
                    i = o = t[0], r = a = t[1];
                    for (var d = n; d < l; d += n) (s = t[d]) < i && (i = s), (h = t[d + 1]) < r && (r = h), s > o && (o = s), h > a && (a = h);
                    c = 0 !== (c = Math.max(o - i, a - r)) ? 1 / c : 0
                }
                return Xo(f, p, n, i, r, c), p
            };

            function Wo(t, e, n, i, r) {
                var o, a;
                if (r === function (t, e, n, i) {
                    for (var r = 0, o = e, a = n - i; o < n; o += i) r += (t[a] - t[o]) * (t[o + 1] + t[a + 1]), a = o;
                    return r
                }(t, e, n, i) > 0) for (o = e; o < n; o += i) a = sa(o, t[o], t[o + 1], a); else for (o = n - i; o >= e; o -= i) a = sa(o, t[o], t[o + 1], a);
                return a && ia(a, a.next) && (ha(a), a = a.next), a
            }

            function Do(t, e) {
                if (!t) return t;
                e || (e = t);
                var n, i = t;
                do {
                    if (n = !1, i.steiner || !ia(i, i.next) && 0 !== na(i.prev, i, i.next)) i = i.next; else {
                        if (ha(i), (i = e = i.prev) === i.next) break;
                        n = !0
                    }
                } while (n || i !== e);
                return e
            }

            function Xo(t, e, n, i, r, o, a) {
                if (t) {
                    !a && o && function (t, e, n, i) {
                        var r = t;
                        do {
                            null === r.z && (r.z = $o(r.x, r.y, e, n, i)), r.prevZ = r.prev, r.nextZ = r.next, r = r.next
                        } while (r !== t);
                        r.prevZ.nextZ = null, r.prevZ = null, function (t) {
                            var e, n, i, r, o, a, s, h, c = 1;
                            do {
                                for (n = t, t = null, o = null, a = 0; n;) {
                                    for (a++, i = n, s = 0, e = 0; e < c && (s++, i = i.nextZ); e++) ;
                                    for (h = c; s > 0 || h > 0 && i;) 0 !== s && (0 === h || !i || n.z <= i.z) ? (r = n, n = n.nextZ, s--) : (r = i, i = i.nextZ, h--), o ? o.nextZ = r : t = r, r.prevZ = o, o = r;
                                    n = i
                                }
                                o.nextZ = null, c *= 2
                            } while (a > 1)
                        }(r)
                    }(t, i, r, o);
                    for (var s, h, c = t; t.prev !== t.next;) if (s = t.prev, h = t.next, o ? Zo(t, i, r, o) : Yo(t)) e.push(s.i / n), e.push(t.i / n), e.push(h.i / n), ha(t), t = h.next, c = h.next; else if ((t = h) === c) {
                        a ? 1 === a ? Xo(t = Jo(t, e, n), e, n, i, r, o, 2) : 2 === a && Qo(t, e, n, i, r, o) : Xo(Do(t), e, n, i, r, o, 1);
                        break
                    }
                }
            }

            function Yo(t) {
                var e = t.prev, n = t, i = t.next;
                if (na(e, n, i) >= 0) return !1;
                for (var r = t.next.next; r !== t.prev;) {
                    if (ta(e.x, e.y, n.x, n.y, i.x, i.y, r.x, r.y) && na(r.prev, r, r.next) >= 0) return !1;
                    r = r.next
                }
                return !0
            }

            function Zo(t, e, n, i) {
                var r = t.prev, o = t, a = t.next;
                if (na(r, o, a) >= 0) return !1;
                for (var s = r.x > o.x ? r.x > a.x ? r.x : a.x : o.x > a.x ? o.x : a.x, h = r.y > o.y ? r.y > a.y ? r.y : a.y : o.y > a.y ? o.y : a.y, c = $o(r.x < o.x ? r.x < a.x ? r.x : a.x : o.x < a.x ? o.x : a.x, r.y < o.y ? r.y < a.y ? r.y : a.y : o.y < a.y ? o.y : a.y, e, n, i), u = $o(s, h, e, n, i), l = t.nextZ; l && l.z <= u;) {
                    if (l !== t.prev && l !== t.next && ta(r.x, r.y, o.x, o.y, a.x, a.y, l.x, l.y) && na(l.prev, l, l.next) >= 0) return !1;
                    l = l.nextZ
                }
                for (l = t.prevZ; l && l.z >= c;) {
                    if (l !== t.prev && l !== t.next && ta(r.x, r.y, o.x, o.y, a.x, a.y, l.x, l.y) && na(l.prev, l, l.next) >= 0) return !1;
                    l = l.prevZ
                }
                return !0
            }

            function Jo(t, e, n) {
                var i = t;
                do {
                    var r = i.prev, o = i.next.next;
                    !ia(r, o) && ra(r, i, i.next, o) && oa(r, o) && oa(o, r) && (e.push(r.i / n), e.push(i.i / n), e.push(o.i / n), ha(i), ha(i.next), i = t = o), i = i.next
                } while (i !== t);
                return i
            }

            function Qo(t, e, n, i, r, o) {
                var a = t;
                do {
                    for (var s = a.next.next; s !== a.prev;) {
                        if (a.i !== s.i && ea(a, s)) {
                            var h = aa(a, s);
                            return a = Do(a, a.next), h = Do(h, h.next), Xo(a, e, n, i, r, o), void Xo(h, e, n, i, r, o)
                        }
                        s = s.next
                    }
                    a = a.next
                } while (a !== t)
            }

            function Ko(t, e) {
                return t.x - e.x
            }

            function qo(t, e) {
                if (e = function (t, e) {
                    var n, i = e, r = t.x, o = t.y, a = -Infinity;
                    do {
                        if (o <= i.y && o >= i.next.y && i.next.y !== i.y) {
                            var s = i.x + (o - i.y) * (i.next.x - i.x) / (i.next.y - i.y);
                            if (s <= r && s > a) {
                                if (a = s, s === r) {
                                    if (o === i.y) return i;
                                    if (o === i.next.y) return i.next
                                }
                                n = i.x < i.next.x ? i : i.next
                            }
                        }
                        i = i.next
                    } while (i !== e);
                    if (!n) return null;
                    if (r === a) return n.prev;
                    var h, c = n, u = n.x, l = n.y, f = Infinity;
                    i = n.next;
                    for (; i !== c;) r >= i.x && i.x >= u && r !== i.x && ta(o < l ? r : a, o, u, l, o < l ? a : r, o, i.x, i.y) && ((h = Math.abs(o - i.y) / (r - i.x)) < f || h === f && i.x > n.x) && oa(i, t) && (n = i, f = h), i = i.next;
                    return n
                }(t, e)) {
                    var n = aa(e, t);
                    Do(n, n.next)
                }
            }

            function $o(t, e, n, i, r) {
                return (t = 1431655765 & ((t = 858993459 & ((t = 252645135 & ((t = 16711935 & ((t = 32767 * (t - n) * r) | t << 8)) | t << 4)) | t << 2)) | t << 1)) | (e = 1431655765 & ((e = 858993459 & ((e = 252645135 & ((e = 16711935 & ((e = 32767 * (e - i) * r) | e << 8)) | e << 4)) | e << 2)) | e << 1)) << 1
            }

            function jo(t) {
                var e = t, n = t;
                do {
                    e.x < n.x && (n = e), e = e.next
                } while (e !== t);
                return n
            }

            function ta(t, e, n, i, r, o, a, s) {
                return (r - a) * (e - s) - (t - a) * (o - s) >= 0 && (t - a) * (i - s) - (n - a) * (e - s) >= 0 && (n - a) * (o - s) - (r - a) * (i - s) >= 0
            }

            function ea(t, e) {
                return t.next.i !== e.i && t.prev.i !== e.i && !function (t, e) {
                    var n = t;
                    do {
                        if (n.i !== t.i && n.next.i !== t.i && n.i !== e.i && n.next.i !== e.i && ra(n, n.next, t, e)) return !0;
                        n = n.next
                    } while (n !== t);
                    return !1
                }(t, e) && oa(t, e) && oa(e, t) && function (t, e) {
                    var n = t, i = !1, r = (t.x + e.x) / 2, o = (t.y + e.y) / 2;
                    do {
                        n.y > o != n.next.y > o && n.next.y !== n.y && r < (n.next.x - n.x) * (o - n.y) / (n.next.y - n.y) + n.x && (i = !i), n = n.next
                    } while (n !== t);
                    return i
                }(t, e)
            }

            function na(t, e, n) {
                return (e.y - t.y) * (n.x - e.x) - (e.x - t.x) * (n.y - e.y)
            }

            function ia(t, e) {
                return t.x === e.x && t.y === e.y
            }

            function ra(t, e, n, i) {
                return !!(ia(t, e) && ia(n, i) || ia(t, i) && ia(n, e)) || na(t, e, n) > 0 != na(t, e, i) > 0 && na(n, i, t) > 0 != na(n, i, e) > 0
            }

            function oa(t, e) {
                return na(t.prev, t, t.next) < 0 ? na(t, e, t.next) >= 0 && na(t, t.prev, e) >= 0 : na(t, e, t.prev) < 0 || na(t, t.next, e) < 0
            }

            function aa(t, e) {
                var n = new ca(t.i, t.x, t.y), i = new ca(e.i, e.x, e.y), r = t.next, o = e.prev;
                return t.next = e, e.prev = t, n.next = r, r.prev = n, i.next = n, n.prev = i, o.next = i, i.prev = o, i
            }

            function sa(t, e, n, i) {
                var r = new ca(t, e, n);
                return i ? (r.next = i.next, r.prev = i, i.next.prev = r, i.next = r) : (r.prev = r, r.next = r), r
            }

            function ha(t) {
                t.next.prev = t.prev, t.prev.next = t.next, t.prevZ && (t.prevZ.nextZ = t.nextZ), t.nextZ && (t.nextZ.prevZ = t.prevZ)
            }

            function ca(t, e, n) {
                this.i = t, this.x = e, this.y = n, this.prev = null, this.next = null, this.z = null, this.prevZ = null, this.nextZ = null, this.steiner = !1
            }

            var ua = {
                area: function (t) {
                    for (var e = t.length, n = 0, i = e - 1, r = 0; r < e; i = r++) n += t[i].x * t[r].y - t[r].x * t[i].y;
                    return .5 * n
                }, isClockWise: function (t) {
                    return ua.area(t) < 0
                }, triangulateShape: function (t, e) {
                    var n = [], i = [], r = [];
                    la(t), fa(n, t);
                    var o = t.length;
                    e.forEach(la);
                    for (var a = 0; a < e.length; a++) i.push(o), o += e[a].length, fa(n, e[a]);
                    var s = Vo(n, i);
                    for (a = 0; a < s.length; a += 3) r.push(s.slice(a, a + 3));
                    return r
                }
            };

            function la(t) {
                var e = t.length;
                e > 2 && t[e - 1].equals(t[0]) && t.pop()
            }

            function fa(t, e) {
                for (var n = 0; n < e.length; n++) t.push(e[n].x), t.push(e[n].y)
            }

            function pa(t, e) {
                Sn.call(this), this.type = "ExtrudeGeometry", this.parameters = {
                    shapes: t,
                    options: e
                }, this.fromBufferGeometry(new da(t, e)), this.mergeVertices()
            }

            function da(t, e) {
                In.call(this), this.type = "ExtrudeBufferGeometry", this.parameters = {
                    shapes: t,
                    options: e
                }, t = Array.isArray(t) ? t : [t];
                for (var n = this, i = [], r = [], o = 0, a = t.length; o < a; o++) {
                    s(t[o])
                }

                function s(t) {
                    var o = [], a = void 0 !== e.curveSegments ? e.curveSegments : 12,
                        s = void 0 !== e.steps ? e.steps : 1, h = void 0 !== e.depth ? e.depth : 100,
                        c = void 0 === e.bevelEnabled || e.bevelEnabled,
                        u = void 0 !== e.bevelThickness ? e.bevelThickness : 6,
                        l = void 0 !== e.bevelSize ? e.bevelSize : u - 2,
                        f = void 0 !== e.bevelSegments ? e.bevelSegments : 3, p = e.extrudePath,
                        d = void 0 !== e.UVGenerator ? e.UVGenerator : ma;
                    void 0 !== e.amount && (console.warn("THREE.ExtrudeBufferGeometry: amount has been renamed to depth."), h = e.amount);
                    var m, v, g, y, w, x, M, _, E = !1;
                    p && (m = p.getSpacedPoints(s), E = !0, c = !1, v = p.computeFrenetFrames(s, !1), g = new He, y = new He, w = new He), c || (f = 0, u = 0, l = 0);
                    var S = t.extractPoints(a), b = S.shape, T = S.holes;
                    if (!ua.isClockWise(b)) for (b = b.reverse(), M = 0, _ = T.length; M < _; M++) ua.isClockWise(x = T[M]) && (T[M] = x.reverse());
                    var L = ua.triangulateShape(b, T), C = b;
                    for (M = 0, _ = T.length; M < _; M++) b = b.concat(x = T[M]);

                    function R(t, e, n) {
                        return e || console.error("THREE.ExtrudeGeometry: vec does not exist"), e.clone().multiplyScalar(n).add(t)
                    }

                    var A, P, N, z, U, H, G = b.length, O = L.length;

                    function I(t, e, n) {
                        var i, r, o, a = t.x - e.x, s = t.y - e.y, h = n.x - t.x, c = n.y - t.y, u = a * a + s * s;
                        if (Math.abs(a * c - s * h) > Number.EPSILON) {
                            var l = Math.sqrt(u), f = Math.sqrt(h * h + c * c), p = e.x - s / l, d = e.y + a / l,
                                m = ((n.x - c / f - p) * c - (n.y + h / f - d) * h) / (a * c - s * h),
                                v = (i = p + a * m - t.x) * i + (r = d + s * m - t.y) * r;
                            if (v <= 2) return new Ne(i, r);
                            o = Math.sqrt(v / 2)
                        } else {
                            var g = !1;
                            a > Number.EPSILON ? h > Number.EPSILON && (g = !0) : a < -Number.EPSILON ? h < -Number.EPSILON && (g = !0) : Math.sign(s) === Math.sign(c) && (g = !0), g ? (i = -s, r = a, o = Math.sqrt(u)) : (i = a, r = s, o = Math.sqrt(u / 2))
                        }
                        return new Ne(i / o, r / o)
                    }

                    for (var F = [], B = 0, k = C.length, V = k - 1, W = B + 1; B < k; B++, V++, W++) V === k && (V = 0), W === k && (W = 0), F[B] = I(C[B], C[V], C[W]);
                    var D, X, Y = [], Z = F.concat();
                    for (M = 0, _ = T.length; M < _; M++) {
                        for (D = [], V = (k = (x = T[M]).length) - 1, W = (B = 0) + 1; B < k; B++, V++, W++) V === k && (V = 0), W === k && (W = 0), D[B] = I(x[B], x[V], x[W]);
                        Y.push(D), Z = Z.concat(D)
                    }
                    for (A = 0; A < f; A++) {
                        for (N = A / f, z = u * Math.cos(N * Math.PI / 2), P = l * Math.sin(N * Math.PI / 2), B = 0, k = C.length; B < k; B++) Q((U = R(C[B], F[B], P)).x, U.y, -z);
                        for (M = 0, _ = T.length; M < _; M++) for (D = Y[M], B = 0, k = (x = T[M]).length; B < k; B++) Q((U = R(x[B], D[B], P)).x, U.y, -z)
                    }
                    for (P = l, B = 0; B < G; B++) U = c ? R(b[B], Z[B], P) : b[B], E ? (y.copy(v.normals[0]).multiplyScalar(U.x), g.copy(v.binormals[0]).multiplyScalar(U.y), w.copy(m[0]).add(y).add(g), Q(w.x, w.y, w.z)) : Q(U.x, U.y, 0);
                    for (X = 1; X <= s; X++) for (B = 0; B < G; B++) U = c ? R(b[B], Z[B], P) : b[B], E ? (y.copy(v.normals[X]).multiplyScalar(U.x), g.copy(v.binormals[X]).multiplyScalar(U.y), w.copy(m[X]).add(y).add(g), Q(w.x, w.y, w.z)) : Q(U.x, U.y, h / s * X);
                    for (A = f - 1; A >= 0; A--) {
                        for (N = A / f, z = u * Math.cos(N * Math.PI / 2), P = l * Math.sin(N * Math.PI / 2), B = 0, k = C.length; B < k; B++) Q((U = R(C[B], F[B], P)).x, U.y, h + z);
                        for (M = 0, _ = T.length; M < _; M++) for (D = Y[M], B = 0, k = (x = T[M]).length; B < k; B++) U = R(x[B], D[B], P), E ? Q(U.x, U.y + m[s - 1].y, m[s - 1].x + z) : Q(U.x, U.y, h + z)
                    }

                    function J(t, e) {
                        var n, i;
                        for (B = t.length; --B >= 0;) {
                            n = B, (i = B - 1) < 0 && (i = t.length - 1);
                            var r = 0, o = s + 2 * f;
                            for (r = 0; r < o; r++) {
                                var a = G * r, h = G * (r + 1);
                                q(e + n + a, e + i + a, e + i + h, e + n + h)
                            }
                        }
                    }

                    function Q(t, e, n) {
                        o.push(t), o.push(e), o.push(n)
                    }

                    function K(t, e, r) {
                        $(t), $(e), $(r);
                        var o = i.length / 3, a = d.generateTopUV(n, i, o - 3, o - 2, o - 1);
                        j(a[0]), j(a[1]), j(a[2])
                    }

                    function q(t, e, r, o) {
                        $(t), $(e), $(o), $(e), $(r), $(o);
                        var a = i.length / 3, s = d.generateSideWallUV(n, i, a - 6, a - 3, a - 2, a - 1);
                        j(s[0]), j(s[1]), j(s[3]), j(s[1]), j(s[2]), j(s[3])
                    }

                    function $(t) {
                        i.push(o[3 * t + 0]), i.push(o[3 * t + 1]), i.push(o[3 * t + 2])
                    }

                    function j(t) {
                        r.push(t.x), r.push(t.y)
                    }

                    !function () {
                        var t = i.length / 3;
                        if (c) {
                            var e = 0, r = G * e;
                            for (B = 0; B < O; B++) K((H = L[B])[2] + r, H[1] + r, H[0] + r);
                            for (r = G * (e = s + 2 * f), B = 0; B < O; B++) K((H = L[B])[0] + r, H[1] + r, H[2] + r)
                        } else {
                            for (B = 0; B < O; B++) K((H = L[B])[2], H[1], H[0]);
                            for (B = 0; B < O; B++) K((H = L[B])[0] + G * s, H[1] + G * s, H[2] + G * s)
                        }
                        n.addGroup(t, i.length / 3 - t, 0)
                    }(), function () {
                        var t = i.length / 3, e = 0;
                        for (J(C, e), e += C.length, M = 0, _ = T.length; M < _; M++) J(x = T[M], e), e += x.length;
                        n.addGroup(t, i.length / 3 - t, 1)
                    }()
                }

                this.addAttribute("position", new zn(i, 3)), this.addAttribute("uv", new zn(r, 2)), this.computeVertexNormals()
            }

            (pa.prototype = Object.create(Sn.prototype)).constructor = pa, pa.prototype.toJSON = function () {
                var t = Sn.prototype.toJSON.call(this);
                return va(this.parameters.shapes, this.parameters.options, t)
            }, (da.prototype = Object.create(In.prototype)).constructor = da, da.prototype.toJSON = function () {
                var t = In.prototype.toJSON.call(this);
                return va(this.parameters.shapes, this.parameters.options, t)
            };
            var ma = {
                generateTopUV: function (t, e, n, i, r) {
                    var o = e[3 * i], a = e[3 * i + 1], s = e[3 * r], h = e[3 * r + 1];
                    return [new Ne(e[3 * n], e[3 * n + 1]), new Ne(o, a), new Ne(s, h)]
                }, generateSideWallUV: function (t, e, n, i, r, o) {
                    var a = e[3 * n], s = e[3 * n + 1], h = e[3 * n + 2], c = e[3 * i], u = e[3 * i + 1],
                        l = e[3 * i + 2], f = e[3 * r], p = e[3 * r + 1], d = e[3 * r + 2], m = e[3 * o],
                        v = e[3 * o + 1], g = e[3 * o + 2];
                    return Math.abs(s - u) < .01 ? [new Ne(a, 1 - h), new Ne(c, 1 - l), new Ne(f, 1 - d), new Ne(m, 1 - g)] : [new Ne(s, 1 - h), new Ne(u, 1 - l), new Ne(p, 1 - d), new Ne(v, 1 - g)]
                }
            };

            function va(t, e, n) {
                if (n.shapes = [], Array.isArray(t)) for (var i = 0, r = t.length; i < r; i++) {
                    n.shapes.push(t[i].uuid)
                } else n.shapes.push(t.uuid);
                return void 0 !== e.extrudePath && (n.options.extrudePath = e.extrudePath.toJSON()), n
            }

            function ga(t, e) {
                Sn.call(this), this.type = "TextGeometry", this.parameters = {
                    text: t,
                    parameters: e
                }, this.fromBufferGeometry(new ya(t, e)), this.mergeVertices()
            }

            function ya(t, e) {
                var n = (e = e || {}).font;
                if (!n || !n.isFont) return console.error("THREE.TextGeometry: font parameter is not an instance of THREE.Font."), new Sn;
                var i = n.generateShapes(t, e.size);
                e.depth = void 0 !== e.height ? e.height : 50, void 0 === e.bevelThickness && (e.bevelThickness = 10), void 0 === e.bevelSize && (e.bevelSize = 8), void 0 === e.bevelEnabled && (e.bevelEnabled = !1), da.call(this, i, e), this.type = "TextBufferGeometry"
            }

            function wa(t, e, n, i, r, o, a) {
                Sn.call(this), this.type = "SphereGeometry", this.parameters = {
                    radius: t,
                    widthSegments: e,
                    heightSegments: n,
                    phiStart: i,
                    phiLength: r,
                    thetaStart: o,
                    thetaLength: a
                }, this.fromBufferGeometry(new xa(t, e, n, i, r, o, a)), this.mergeVertices()
            }

            function xa(t, e, n, i, r, o, a) {
                In.call(this), this.type = "SphereBufferGeometry", this.parameters = {
                    radius: t,
                    widthSegments: e,
                    heightSegments: n,
                    phiStart: i,
                    phiLength: r,
                    thetaStart: o,
                    thetaLength: a
                }, t = t || 1, e = Math.max(3, Math.floor(e) || 8), n = Math.max(2, Math.floor(n) || 6), i = void 0 !== i ? i : 0, r = void 0 !== r ? r : 2 * Math.PI;
                var s, h, c = (o = void 0 !== o ? o : 0) + (a = void 0 !== a ? a : Math.PI), u = 0, l = [], f = new He,
                    p = new He, d = [], m = [], v = [], g = [];
                for (h = 0; h <= n; h++) {
                    var y = [], w = h / n;
                    for (s = 0; s <= e; s++) {
                        var x = s / e;
                        f.x = -t * Math.cos(i + x * r) * Math.sin(o + w * a), f.y = t * Math.cos(o + w * a), f.z = t * Math.sin(i + x * r) * Math.sin(o + w * a), m.push(f.x, f.y, f.z), p.set(f.x, f.y, f.z).normalize(), v.push(p.x, p.y, p.z), g.push(x, 1 - w), y.push(u++)
                    }
                    l.push(y)
                }
                for (h = 0; h < n; h++) for (s = 0; s < e; s++) {
                    var M = l[h][s], _ = l[h + 1][s], E = l[h + 1][s + 1];
                    (0 !== h || o > 0) && d.push(l[h][s + 1], M, E), (h !== n - 1 || c < Math.PI) && d.push(M, _, E)
                }
                this.setIndex(d), this.addAttribute("position", new zn(m, 3)), this.addAttribute("normal", new zn(v, 3)), this.addAttribute("uv", new zn(g, 2))
            }

            function Ma(t, e, n, i, r, o) {
                Sn.call(this), this.type = "RingGeometry", this.parameters = {
                    innerRadius: t,
                    outerRadius: e,
                    thetaSegments: n,
                    phiSegments: i,
                    thetaStart: r,
                    thetaLength: o
                }, this.fromBufferGeometry(new _a(t, e, n, i, r, o)), this.mergeVertices()
            }

            function _a(t, e, n, i, r, o) {
                In.call(this), this.type = "RingBufferGeometry", this.parameters = {
                    innerRadius: t,
                    outerRadius: e,
                    thetaSegments: n,
                    phiSegments: i,
                    thetaStart: r,
                    thetaLength: o
                }, t = t || .5, e = e || 1, r = void 0 !== r ? r : 0, o = void 0 !== o ? o : 2 * Math.PI, n = void 0 !== n ? Math.max(3, n) : 8;
                var a, s, h, c = [], u = [], l = [], f = [], p = t,
                    d = (e - t) / (i = void 0 !== i ? Math.max(1, i) : 1), m = new He, v = new Ne;
                for (s = 0; s <= i; s++) {
                    for (h = 0; h <= n; h++) a = r + h / n * o, m.x = p * Math.cos(a), m.y = p * Math.sin(a), u.push(m.x, m.y, m.z), l.push(0, 0, 1), v.x = (m.x / e + 1) / 2, v.y = (m.y / e + 1) / 2, f.push(v.x, v.y);
                    p += d
                }
                for (s = 0; s < i; s++) {
                    var g = s * (n + 1);
                    for (h = 0; h < n; h++) {
                        var y = (a = h + g) + n + 1, w = a + n + 2, x = a + 1;
                        c.push(a, y, x), c.push(y, w, x)
                    }
                }
                this.setIndex(c), this.addAttribute("position", new zn(u, 3)), this.addAttribute("normal", new zn(l, 3)), this.addAttribute("uv", new zn(f, 2))
            }

            function Ea(t, e, n, i) {
                Sn.call(this), this.type = "LatheGeometry", this.parameters = {
                    points: t,
                    segments: e,
                    phiStart: n,
                    phiLength: i
                }, this.fromBufferGeometry(new Sa(t, e, n, i)), this.mergeVertices()
            }

            function Sa(t, e, n, i) {
                In.call(this), this.type = "LatheBufferGeometry", this.parameters = {
                    points: t,
                    segments: e,
                    phiStart: n,
                    phiLength: i
                }, e = Math.floor(e) || 12, n = n || 0, i = i || 2 * Math.PI, i = Pe.clamp(i, 0, 2 * Math.PI);
                var r, o, a, s = [], h = [], c = [], u = 1 / e, l = new He, f = new Ne;
                for (o = 0; o <= e; o++) {
                    var p = n + o * u * i, d = Math.sin(p), m = Math.cos(p);
                    for (a = 0; a <= t.length - 1; a++) l.x = t[a].x * d, l.y = t[a].y, l.z = t[a].x * m, h.push(l.x, l.y, l.z), f.x = o / e, f.y = a / (t.length - 1), c.push(f.x, f.y)
                }
                for (o = 0; o < e; o++) for (a = 0; a < t.length - 1; a++) {
                    var v = (r = a + o * t.length) + t.length, g = r + t.length + 1, y = r + 1;
                    s.push(r, v, y), s.push(v, g, y)
                }
                if (this.setIndex(s), this.addAttribute("position", new zn(h, 3)), this.addAttribute("uv", new zn(c, 2)), this.computeVertexNormals(), i === 2 * Math.PI) {
                    var w = this.attributes.normal.array, x = new He, M = new He, _ = new He;
                    for (r = e * t.length * 3, o = 0, a = 0; o < t.length; o++, a += 3) x.x = w[a + 0], x.y = w[a + 1], x.z = w[a + 2], M.x = w[r + a + 0], M.y = w[r + a + 1], M.z = w[r + a + 2], _.addVectors(x, M).normalize(), w[a + 0] = w[r + a + 0] = _.x, w[a + 1] = w[r + a + 1] = _.y, w[a + 2] = w[r + a + 2] = _.z
                }
            }

            function ba(t, e) {
                Sn.call(this), this.type = "ShapeGeometry", "object" == typeof e && (console.warn("THREE.ShapeGeometry: Options parameter has been removed."), e = e.curveSegments), this.parameters = {
                    shapes: t,
                    curveSegments: e
                }, this.fromBufferGeometry(new Ta(t, e)), this.mergeVertices()
            }

            function Ta(t, e) {
                In.call(this), this.type = "ShapeBufferGeometry", this.parameters = {
                    shapes: t,
                    curveSegments: e
                }, e = e || 12;
                var n = [], i = [], r = [], o = [], a = 0, s = 0;
                if (!1 === Array.isArray(t)) c(t); else for (var h = 0; h < t.length; h++) c(t[h]), this.addGroup(a, s, h), a += s, s = 0;

                function c(t) {
                    var a, h, c, u = i.length / 3, l = t.extractPoints(e), f = l.shape, p = l.holes;
                    if (!1 === ua.isClockWise(f)) for (f = f.reverse(), a = 0, h = p.length; a < h; a++) !0 === ua.isClockWise(c = p[a]) && (p[a] = c.reverse());
                    var d = ua.triangulateShape(f, p);
                    for (a = 0, h = p.length; a < h; a++) f = f.concat(c = p[a]);
                    for (a = 0, h = f.length; a < h; a++) {
                        var m = f[a];
                        i.push(m.x, m.y, 0), r.push(0, 0, 1), o.push(m.x, m.y)
                    }
                    for (a = 0, h = d.length; a < h; a++) {
                        var v = d[a];
                        n.push(v[0] + u, v[1] + u, v[2] + u), s += 3
                    }
                }

                this.setIndex(n), this.addAttribute("position", new zn(i, 3)), this.addAttribute("normal", new zn(r, 3)), this.addAttribute("uv", new zn(o, 2))
            }

            function La(t, e) {
                if (e.shapes = [], Array.isArray(t)) for (var n = 0, i = t.length; n < i; n++) {
                    e.shapes.push(t[n].uuid)
                } else e.shapes.push(t.uuid);
                return e
            }

            function Ca(t, e) {
                In.call(this), this.type = "EdgesGeometry", this.parameters = {thresholdAngle: e}, e = void 0 !== e ? e : 1;
                var n, i, r, o, a = [], s = Math.cos(Pe.DEG2RAD * e), h = [0, 0], c = {}, u = ["a", "b", "c"];
                t.isBufferGeometry ? (o = new Sn).fromBufferGeometry(t) : o = t.clone(), o.mergeVertices(), o.computeFaceNormals();
                for (var l = o.vertices, f = o.faces, p = 0, d = f.length; p < d; p++) for (var m = f[p], v = 0; v < 3; v++) n = m[u[v]], i = m[u[(v + 1) % 3]], h[0] = Math.min(n, i), h[1] = Math.max(n, i), void 0 === c[r = h[0] + "," + h[1]] ? c[r] = {
                    index1: h[0],
                    index2: h[1],
                    face1: p,
                    face2: void 0
                } : c[r].face2 = p;
                for (r in c) {
                    var g = c[r];
                    if (void 0 === g.face2 || f[g.face1].normal.dot(f[g.face2].normal) <= s) {
                        var y = l[g.index1];
                        a.push(y.x, y.y, y.z), a.push((y = l[g.index2]).x, y.y, y.z)
                    }
                }
                this.addAttribute("position", new zn(a, 3))
            }

            function Ra(t, e, n, i, r, o, a, s) {
                Sn.call(this), this.type = "CylinderGeometry", this.parameters = {
                    radiusTop: t,
                    radiusBottom: e,
                    height: n,
                    radialSegments: i,
                    heightSegments: r,
                    openEnded: o,
                    thetaStart: a,
                    thetaLength: s
                }, this.fromBufferGeometry(new Aa(t, e, n, i, r, o, a, s)), this.mergeVertices()
            }

            function Aa(t, e, n, i, r, o, a, s) {
                In.call(this), this.type = "CylinderBufferGeometry", this.parameters = {
                    radiusTop: t,
                    radiusBottom: e,
                    height: n,
                    radialSegments: i,
                    heightSegments: r,
                    openEnded: o,
                    thetaStart: a,
                    thetaLength: s
                };
                var h = this;
                t = void 0 !== t ? t : 1, e = void 0 !== e ? e : 1, n = n || 1, i = Math.floor(i) || 8, r = Math.floor(r) || 1, o = void 0 !== o && o, a = void 0 !== a ? a : 0, s = void 0 !== s ? s : 2 * Math.PI;
                var c = [], u = [], l = [], f = [], p = 0, d = [], m = n / 2, v = 0;

                function g(n) {
                    var r, o, d, g = new Ne, y = new He, w = 0, x = !0 === n ? t : e, M = !0 === n ? 1 : -1;
                    for (o = p, r = 1; r <= i; r++) u.push(0, m * M, 0), l.push(0, M, 0), f.push(.5, .5), p++;
                    for (d = p, r = 0; r <= i; r++) {
                        var _ = r / i * s + a, E = Math.cos(_), S = Math.sin(_);
                        y.x = x * S, y.y = m * M, y.z = x * E, u.push(y.x, y.y, y.z), l.push(0, M, 0), g.x = .5 * E + .5, g.y = .5 * S * M + .5, f.push(g.x, g.y), p++
                    }
                    for (r = 0; r < i; r++) {
                        var b = o + r, T = d + r;
                        !0 === n ? c.push(T, T + 1, b) : c.push(T + 1, T, b), w += 3
                    }
                    h.addGroup(v, w, !0 === n ? 1 : 2), v += w
                }

                !function () {
                    var o, g, y = new He, w = new He, x = 0, M = (e - t) / n;
                    for (g = 0; g <= r; g++) {
                        var _ = [], E = g / r, S = E * (e - t) + t;
                        for (o = 0; o <= i; o++) {
                            var b = o / i, T = b * s + a, L = Math.sin(T), C = Math.cos(T);
                            w.x = S * L, w.y = -E * n + m, w.z = S * C, u.push(w.x, w.y, w.z), y.set(L, M, C).normalize(), l.push(y.x, y.y, y.z), f.push(b, 1 - E), _.push(p++)
                        }
                        d.push(_)
                    }
                    for (o = 0; o < i; o++) for (g = 0; g < r; g++) {
                        var R = d[g][o], A = d[g + 1][o], P = d[g + 1][o + 1], N = d[g][o + 1];
                        c.push(R, A, N), c.push(A, P, N), x += 6
                    }
                    h.addGroup(v, x, 0), v += x
                }(), !1 === o && (t > 0 && g(!0), e > 0 && g(!1)), this.setIndex(c), this.addAttribute("position", new zn(u, 3)), this.addAttribute("normal", new zn(l, 3)), this.addAttribute("uv", new zn(f, 2))
            }

            function Pa(t, e, n, i, r, o, a) {
                Ra.call(this, 0, t, e, n, i, r, o, a), this.type = "ConeGeometry", this.parameters = {
                    radius: t,
                    height: e,
                    radialSegments: n,
                    heightSegments: i,
                    openEnded: r,
                    thetaStart: o,
                    thetaLength: a
                }
            }

            function Na(t, e, n, i, r, o, a) {
                Aa.call(this, 0, t, e, n, i, r, o, a), this.type = "ConeBufferGeometry", this.parameters = {
                    radius: t,
                    height: e,
                    radialSegments: n,
                    heightSegments: i,
                    openEnded: r,
                    thetaStart: o,
                    thetaLength: a
                }
            }

            function za(t, e, n, i) {
                Sn.call(this), this.type = "CircleGeometry", this.parameters = {
                    radius: t,
                    segments: e,
                    thetaStart: n,
                    thetaLength: i
                }, this.fromBufferGeometry(new Ua(t, e, n, i)), this.mergeVertices()
            }

            function Ua(t, e, n, i) {
                In.call(this), this.type = "CircleBufferGeometry", this.parameters = {
                    radius: t,
                    segments: e,
                    thetaStart: n,
                    thetaLength: i
                }, t = t || 1, e = void 0 !== e ? Math.max(3, e) : 8, n = void 0 !== n ? n : 0, i = void 0 !== i ? i : 2 * Math.PI;
                var r, o, a = [], s = [], h = [], c = [], u = new He, l = new Ne;
                for (s.push(0, 0, 0), h.push(0, 0, 1), c.push(.5, .5), o = 0, r = 3; o <= e; o++, r += 3) {
                    var f = n + o / e * i;
                    u.x = t * Math.cos(f), u.y = t * Math.sin(f), s.push(u.x, u.y, u.z), h.push(0, 0, 1), l.x = (s[r] / t + 1) / 2, l.y = (s[r + 1] / t + 1) / 2, c.push(l.x, l.y)
                }
                for (r = 1; r <= e; r++) a.push(r, r + 1, 0);
                this.setIndex(a), this.addAttribute("position", new zn(s, 3)), this.addAttribute("normal", new zn(h, 3)), this.addAttribute("uv", new zn(c, 2))
            }

            (ga.prototype = Object.create(Sn.prototype)).constructor = ga, (ya.prototype = Object.create(da.prototype)).constructor = ya, (wa.prototype = Object.create(Sn.prototype)).constructor = wa, (xa.prototype = Object.create(In.prototype)).constructor = xa, (Ma.prototype = Object.create(Sn.prototype)).constructor = Ma, (_a.prototype = Object.create(In.prototype)).constructor = _a, (Ea.prototype = Object.create(Sn.prototype)).constructor = Ea, (Sa.prototype = Object.create(In.prototype)).constructor = Sa, (ba.prototype = Object.create(Sn.prototype)).constructor = ba, ba.prototype.toJSON = function () {
                var t = Sn.prototype.toJSON.call(this);
                return La(this.parameters.shapes, t)
            }, (Ta.prototype = Object.create(In.prototype)).constructor = Ta, Ta.prototype.toJSON = function () {
                var t = In.prototype.toJSON.call(this);
                return La(this.parameters.shapes, t)
            }, (Ca.prototype = Object.create(In.prototype)).constructor = Ca, (Ra.prototype = Object.create(Sn.prototype)).constructor = Ra, (Aa.prototype = Object.create(In.prototype)).constructor = Aa, (Pa.prototype = Object.create(Ra.prototype)).constructor = Pa, (Na.prototype = Object.create(Aa.prototype)).constructor = Na, (za.prototype = Object.create(Sn.prototype)).constructor = za, (Ua.prototype = Object.create(In.prototype)).constructor = Ua;
            var Ha = Object.freeze({
                WireframeGeometry: Eo,
                ParametricGeometry: So,
                ParametricBufferGeometry: bo,
                TetrahedronGeometry: Co,
                TetrahedronBufferGeometry: Ro,
                OctahedronGeometry: Ao,
                OctahedronBufferGeometry: Po,
                IcosahedronGeometry: No,
                IcosahedronBufferGeometry: zo,
                DodecahedronGeometry: Uo,
                DodecahedronBufferGeometry: Ho,
                PolyhedronGeometry: To,
                PolyhedronBufferGeometry: Lo,
                TubeGeometry: Go,
                TubeBufferGeometry: Oo,
                TorusKnotGeometry: Io,
                TorusKnotBufferGeometry: Fo,
                TorusGeometry: Bo,
                TorusBufferGeometry: ko,
                TextGeometry: ga,
                TextBufferGeometry: ya,
                SphereGeometry: wa,
                SphereBufferGeometry: xa,
                RingGeometry: Ma,
                RingBufferGeometry: _a,
                PlaneGeometry: kn,
                PlaneBufferGeometry: Vn,
                LatheGeometry: Ea,
                LatheBufferGeometry: Sa,
                ShapeGeometry: ba,
                ShapeBufferGeometry: Ta,
                ExtrudeGeometry: pa,
                ExtrudeBufferGeometry: da,
                EdgesGeometry: Ca,
                ConeGeometry: Pa,
                ConeBufferGeometry: Na,
                CylinderGeometry: Ra,
                CylinderBufferGeometry: Aa,
                CircleGeometry: za,
                CircleBufferGeometry: Ua,
                BoxGeometry: Fn,
                BoxBufferGeometry: Bn
            });

            function Ga(t) {
                ni.call(this), this.type = "ShadowMaterial", this.color = new an(0), this.transparent = !0, this.setValues(t)
            }

            function Oa(t) {
                ii.call(this, t), this.type = "RawShaderMaterial"
            }

            function Ia(t) {
                ni.call(this), this.defines = {STANDARD: ""}, this.type = "MeshStandardMaterial", this.color = new an(16777215), this.roughness = .5, this.metalness = .5, this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.emissive = new an(0), this.emissiveIntensity = 1, this.emissiveMap = null, this.bumpMap = null, this.bumpScale = 1, this.normalMap = null, this.normalMapType = Re, this.normalScale = new Ne(1, 1), this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.roughnessMap = null, this.metalnessMap = null, this.alphaMap = null, this.envMap = null, this.envMapIntensity = 1, this.refractionRatio = .98, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.skinning = !1, this.morphTargets = !1, this.morphNormals = !1, this.setValues(t)
            }

            function Fa(t) {
                Ia.call(this), this.defines = {PHYSICAL: ""}, this.type = "MeshPhysicalMaterial", this.reflectivity = .5, this.clearCoat = 0, this.clearCoatRoughness = 0, this.setValues(t)
            }

            function Ba(t) {
                ni.call(this), this.type = "MeshPhongMaterial", this.color = new an(16777215), this.specular = new an(1118481), this.shininess = 30, this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.emissive = new an(0), this.emissiveIntensity = 1, this.emissiveMap = null, this.bumpMap = null, this.bumpScale = 1, this.normalMap = null, this.normalMapType = Re, this.normalScale = new Ne(1, 1), this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.specularMap = null, this.alphaMap = null, this.envMap = null, this.combine = et, this.reflectivity = 1, this.refractionRatio = .98, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.skinning = !1, this.morphTargets = !1, this.morphNormals = !1, this.setValues(t)
            }

            function ka(t) {
                Ba.call(this), this.defines = {TOON: ""}, this.type = "MeshToonMaterial", this.gradientMap = null, this.setValues(t)
            }

            function Va(t) {
                ni.call(this), this.type = "MeshNormalMaterial", this.bumpMap = null, this.bumpScale = 1, this.normalMap = null, this.normalMapType = Re, this.normalScale = new Ne(1, 1), this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.wireframe = !1, this.wireframeLinewidth = 1, this.fog = !1, this.lights = !1, this.skinning = !1, this.morphTargets = !1, this.morphNormals = !1, this.setValues(t)
            }

            function Wa(t) {
                ni.call(this), this.type = "MeshLambertMaterial", this.color = new an(16777215), this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.emissive = new an(0), this.emissiveIntensity = 1, this.emissiveMap = null, this.specularMap = null, this.alphaMap = null, this.envMap = null, this.combine = et, this.reflectivity = 1, this.refractionRatio = .98, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.skinning = !1, this.morphTargets = !1, this.morphNormals = !1, this.setValues(t)
            }

            function Da(t) {
                if (ni.call(this), this.defines = {MATCAP: ""}, this.type = "MeshMatcapMaterial", this.color = new an(16777215), this.matcap = null, this.map = null, this.bumpMap = null, this.bumpScale = 1, this.normalMap = null, this.normalMapType = Re, this.normalScale = new Ne(1, 1), this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.alphaMap = null, this.skinning = !1, this.morphTargets = !1, this.morphNormals = !1, this.lights = !1, this.setValues(t), null === this.matcap) {
                    var e = document.createElement("canvas");
                    e.width = 1, e.height = 1;
                    var n = e.getContext("2d");
                    n.fillStyle = "#fff", n.fillRect(0, 0, 1, 1), this.matcap = new THREE.CanvasTexture(e)
                }
            }

            function Xa(t) {
                fo.call(this), this.type = "LineDashedMaterial", this.scale = 1, this.dashSize = 3, this.gapSize = 1, this.setValues(t)
            }

            (Ga.prototype = Object.create(ni.prototype)).constructor = Ga, Ga.prototype.isShadowMaterial = !0, Ga.prototype.copy = function (t) {
                return ni.prototype.copy.call(this, t), this.color.copy(t.color), this
            }, (Oa.prototype = Object.create(ii.prototype)).constructor = Oa, Oa.prototype.isRawShaderMaterial = !0, (Ia.prototype = Object.create(ni.prototype)).constructor = Ia, Ia.prototype.isMeshStandardMaterial = !0, Ia.prototype.copy = function (t) {
                return ni.prototype.copy.call(this, t), this.defines = {STANDARD: ""}, this.color.copy(t.color), this.roughness = t.roughness, this.metalness = t.metalness, this.map = t.map, this.lightMap = t.lightMap, this.lightMapIntensity = t.lightMapIntensity, this.aoMap = t.aoMap, this.aoMapIntensity = t.aoMapIntensity, this.emissive.copy(t.emissive), this.emissiveMap = t.emissiveMap, this.emissiveIntensity = t.emissiveIntensity, this.bumpMap = t.bumpMap, this.bumpScale = t.bumpScale, this.normalMap = t.normalMap, this.normalMapType = t.normalMapType, this.normalScale.copy(t.normalScale), this.displacementMap = t.displacementMap, this.displacementScale = t.displacementScale, this.displacementBias = t.displacementBias, this.roughnessMap = t.roughnessMap, this.metalnessMap = t.metalnessMap, this.alphaMap = t.alphaMap, this.envMap = t.envMap, this.envMapIntensity = t.envMapIntensity, this.refractionRatio = t.refractionRatio, this.wireframe = t.wireframe, this.wireframeLinewidth = t.wireframeLinewidth, this.wireframeLinecap = t.wireframeLinecap, this.wireframeLinejoin = t.wireframeLinejoin, this.skinning = t.skinning, this.morphTargets = t.morphTargets, this.morphNormals = t.morphNormals, this
            }, (Fa.prototype = Object.create(Ia.prototype)).constructor = Fa, Fa.prototype.isMeshPhysicalMaterial = !0, Fa.prototype.copy = function (t) {
                return Ia.prototype.copy.call(this, t), this.defines = {PHYSICAL: ""}, this.reflectivity = t.reflectivity, this.clearCoat = t.clearCoat, this.clearCoatRoughness = t.clearCoatRoughness, this
            }, (Ba.prototype = Object.create(ni.prototype)).constructor = Ba, Ba.prototype.isMeshPhongMaterial = !0, Ba.prototype.copy = function (t) {
                return ni.prototype.copy.call(this, t), this.color.copy(t.color), this.specular.copy(t.specular), this.shininess = t.shininess, this.map = t.map, this.lightMap = t.lightMap, this.lightMapIntensity = t.lightMapIntensity, this.aoMap = t.aoMap, this.aoMapIntensity = t.aoMapIntensity, this.emissive.copy(t.emissive), this.emissiveMap = t.emissiveMap, this.emissiveIntensity = t.emissiveIntensity, this.bumpMap = t.bumpMap, this.bumpScale = t.bumpScale, this.normalMap = t.normalMap, this.normalMapType = t.normalMapType, this.normalScale.copy(t.normalScale), this.displacementMap = t.displacementMap, this.displacementScale = t.displacementScale, this.displacementBias = t.displacementBias, this.specularMap = t.specularMap, this.alphaMap = t.alphaMap, this.envMap = t.envMap, this.combine = t.combine, this.reflectivity = t.reflectivity, this.refractionRatio = t.refractionRatio, this.wireframe = t.wireframe, this.wireframeLinewidth = t.wireframeLinewidth, this.wireframeLinecap = t.wireframeLinecap, this.wireframeLinejoin = t.wireframeLinejoin, this.skinning = t.skinning, this.morphTargets = t.morphTargets, this.morphNormals = t.morphNormals, this
            }, (ka.prototype = Object.create(Ba.prototype)).constructor = ka, ka.prototype.isMeshToonMaterial = !0, ka.prototype.copy = function (t) {
                return Ba.prototype.copy.call(this, t), this.gradientMap = t.gradientMap, this
            }, (Va.prototype = Object.create(ni.prototype)).constructor = Va, Va.prototype.isMeshNormalMaterial = !0, Va.prototype.copy = function (t) {
                return ni.prototype.copy.call(this, t), this.bumpMap = t.bumpMap, this.bumpScale = t.bumpScale, this.normalMap = t.normalMap, this.normalMapType = t.normalMapType, this.normalScale.copy(t.normalScale), this.displacementMap = t.displacementMap, this.displacementScale = t.displacementScale, this.displacementBias = t.displacementBias, this.wireframe = t.wireframe, this.wireframeLinewidth = t.wireframeLinewidth, this.skinning = t.skinning, this.morphTargets = t.morphTargets, this.morphNormals = t.morphNormals, this
            }, (Wa.prototype = Object.create(ni.prototype)).constructor = Wa, Wa.prototype.isMeshLambertMaterial = !0, Wa.prototype.copy = function (t) {
                return ni.prototype.copy.call(this, t), this.color.copy(t.color), this.map = t.map, this.lightMap = t.lightMap, this.lightMapIntensity = t.lightMapIntensity, this.aoMap = t.aoMap, this.aoMapIntensity = t.aoMapIntensity, this.emissive.copy(t.emissive), this.emissiveMap = t.emissiveMap, this.emissiveIntensity = t.emissiveIntensity, this.specularMap = t.specularMap, this.alphaMap = t.alphaMap, this.envMap = t.envMap, this.combine = t.combine, this.reflectivity = t.reflectivity, this.refractionRatio = t.refractionRatio, this.wireframe = t.wireframe, this.wireframeLinewidth = t.wireframeLinewidth, this.wireframeLinecap = t.wireframeLinecap, this.wireframeLinejoin = t.wireframeLinejoin, this.skinning = t.skinning, this.morphTargets = t.morphTargets, this.morphNormals = t.morphNormals, this
            }, (Da.prototype = Object.create(ni.prototype)).constructor = Da, Da.prototype.isMeshMatcapMaterial = !0, Da.prototype.copy = function (t) {
                return ni.prototype.copy.call(this, t), this.defines = {MATCAP: ""}, this.color.copy(t.color), this.matcap = t.matcap, this.map = t.map, this.bumpMap = t.bumpMap, this.bumpScale = t.bumpScale, this.normalMap = t.normalMap, this.normalMapType = t.normalMapType, this.normalScale.copy(t.normalScale), this.displacementMap = t.displacementMap, this.displacementScale = t.displacementScale, this.displacementBias = t.displacementBias, this.alphaMap = t.alphaMap, this.skinning = t.skinning, this.morphTargets = t.morphTargets, this.morphNormals = t.morphNormals, this
            }, (Xa.prototype = Object.create(fo.prototype)).constructor = Xa, Xa.prototype.isLineDashedMaterial = !0, Xa.prototype.copy = function (t) {
                return fo.prototype.copy.call(this, t), this.scale = t.scale, this.dashSize = t.dashSize, this.gapSize = t.gapSize, this
            };
            var Ya = Object.freeze({
                ShadowMaterial: Ga,
                SpriteMaterial: ao,
                RawShaderMaterial: Oa,
                ShaderMaterial: ii,
                PointsMaterial: go,
                MeshPhysicalMaterial: Fa,
                MeshStandardMaterial: Ia,
                MeshPhongMaterial: Ba,
                MeshToonMaterial: ka,
                MeshNormalMaterial: Va,
                MeshLambertMaterial: Wa,
                MeshDepthMaterial: zr,
                MeshDistanceMaterial: Ur,
                MeshBasicMaterial: ai,
                MeshMatcapMaterial: Da,
                LineDashedMaterial: Xa,
                LineBasicMaterial: fo,
                Material: ni
            }), Za = {
                arraySlice: function (t, e, n) {
                    return Za.isTypedArray(t) ? new t.constructor(t.subarray(e, void 0 !== n ? n : t.length)) : t.slice(e, n)
                }, convertArray: function (t, e, n) {
                    return !t || !n && t.constructor === e ? t : "number" == typeof e.BYTES_PER_ELEMENT ? new e(t) : Array.prototype.slice.call(t)
                }, isTypedArray: function (t) {
                    return ArrayBuffer.isView(t) && !(t instanceof DataView)
                }, getKeyframeOrder: function (t) {
                    for (var e = t.length, n = new Array(e), i = 0; i !== e; ++i) n[i] = i;
                    return n.sort(function (e, n) {
                        return t[e] - t[n]
                    }), n
                }, sortedArray: function (t, e, n) {
                    for (var i = t.length, r = new t.constructor(i), o = 0, a = 0; a !== i; ++o) for (var s = n[o] * e, h = 0; h !== e; ++h) r[a++] = t[s + h];
                    return r
                }, flattenJSON: function (t, e, n, i) {
                    for (var r = 1, o = t[0]; void 0 !== o && void 0 === o[i];) o = t[r++];
                    if (void 0 !== o) {
                        var a = o[i];
                        if (void 0 !== a) if (Array.isArray(a)) do {
                            void 0 !== (a = o[i]) && (e.push(o.time), n.push.apply(n, a)), o = t[r++]
                        } while (void 0 !== o); else if (void 0 !== a.toArray) do {
                            void 0 !== (a = o[i]) && (e.push(o.time), a.toArray(n, n.length)), o = t[r++]
                        } while (void 0 !== o); else do {
                            void 0 !== (a = o[i]) && (e.push(o.time), n.push(a)), o = t[r++]
                        } while (void 0 !== o)
                    }
                }
            };

            function Ja(t, e, n, i) {
                this.parameterPositions = t, this._cachedIndex = 0, this.resultBuffer = void 0 !== i ? i : new e.constructor(n), this.sampleValues = e, this.valueSize = n
            }

            function Qa(t, e, n, i) {
                Ja.call(this, t, e, n, i), this._weightPrev = -0, this._offsetPrev = -0, this._weightNext = -0, this._offsetNext = -0
            }

            function Ka(t, e, n, i) {
                Ja.call(this, t, e, n, i)
            }

            function qa(t, e, n, i) {
                Ja.call(this, t, e, n, i)
            }

            function $a(t, e, n, i) {
                if (void 0 === t) throw new Error("THREE.KeyframeTrack: track name is undefined");
                if (void 0 === e || 0 === e.length) throw new Error("THREE.KeyframeTrack: no keyframes in track named " + t);
                this.name = t, this.times = Za.convertArray(e, this.TimeBufferType), this.values = Za.convertArray(n, this.ValueBufferType), this.setInterpolation(i || this.DefaultInterpolation)
            }

            function ja(t, e, n) {
                $a.call(this, t, e, n)
            }

            function ts(t, e, n, i) {
                $a.call(this, t, e, n, i)
            }

            function es(t, e, n, i) {
                $a.call(this, t, e, n, i)
            }

            function ns(t, e, n, i) {
                Ja.call(this, t, e, n, i)
            }

            function is(t, e, n, i) {
                $a.call(this, t, e, n, i)
            }

            function rs(t, e, n, i) {
                $a.call(this, t, e, n, i)
            }

            function os(t, e, n, i) {
                $a.call(this, t, e, n, i)
            }

            function as(t, e, n) {
                this.name = t, this.tracks = n, this.duration = void 0 !== e ? e : -1, this.uuid = Pe.generateUUID(), this.duration < 0 && this.resetDuration()
            }

            function ss(t) {
                if (void 0 === t.type) throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");
                var e = function (t) {
                    switch (t.toLowerCase()) {
                        case"scalar":
                        case"double":
                        case"float":
                        case"number":
                        case"integer":
                            return es;
                        case"vector":
                        case"vector2":
                        case"vector3":
                        case"vector4":
                            return os;
                        case"color":
                            return ts;
                        case"quaternion":
                            return is;
                        case"bool":
                        case"boolean":
                            return ja;
                        case"string":
                            return rs
                    }
                    throw new Error("THREE.KeyframeTrack: Unsupported typeName: " + t)
                }(t.type);
                if (void 0 === t.times) {
                    var n = [], i = [];
                    Za.flattenJSON(t.keys, n, i, "value"), t.times = n, t.values = i
                }
                return void 0 !== e.parse ? e.parse(t) : new e(t.name, t.times, t.values, t.interpolation)
            }

            Object.assign(Ja.prototype, {
                evaluate: function (t) {
                    var e = this.parameterPositions, n = this._cachedIndex, i = e[n], r = e[n - 1];
                    t:{
                        e:{
                            var o;
                            n:{
                                i:if (!(t < i)) {
                                    for (var a = n + 2; ;) {
                                        if (void 0 === i) {
                                            if (t < r) break i;
                                            return this._cachedIndex = n = e.length, this.afterEnd_(n - 1, t, r)
                                        }
                                        if (n === a) break;
                                        if (r = i, t < (i = e[++n])) break e
                                    }
                                    o = e.length;
                                    break n
                                }
                                if (t >= r) break t;
                                var s = e[1];
                                t < s && (n = 2, r = s);
                                for (a = n - 2; ;) {
                                    if (void 0 === r) return this._cachedIndex = 0, this.beforeStart_(0, t, i);
                                    if (n === a) break;
                                    if (i = r, t >= (r = e[--n - 1])) break e
                                }
                                o = n, n = 0
                            }
                            for (; n < o;) {
                                var h = n + o >>> 1;
                                t < e[h] ? o = h : n = h + 1
                            }
                            if (i = e[n], void 0 === (r = e[n - 1])) return this._cachedIndex = 0, this.beforeStart_(0, t, i);
                            if (void 0 === i) return this._cachedIndex = n = e.length, this.afterEnd_(n - 1, r, t)
                        }
                        this._cachedIndex = n, this.intervalChanged_(n, r, i)
                    }
                    return this.interpolate_(n, r, t, i)
                }, settings: null, DefaultSettings_: {}, getSettings_: function () {
                    return this.settings || this.DefaultSettings_
                }, copySampleValue_: function (t) {
                    for (var e = this.resultBuffer, n = this.sampleValues, i = this.valueSize, r = t * i, o = 0; o !== i; ++o) e[o] = n[r + o];
                    return e
                }, interpolate_: function () {
                    throw new Error("call to abstract method")
                }, intervalChanged_: function () {
                }
            }), Object.assign(Ja.prototype, {
                beforeStart_: Ja.prototype.copySampleValue_,
                afterEnd_: Ja.prototype.copySampleValue_
            }), Qa.prototype = Object.assign(Object.create(Ja.prototype), {
                constructor: Qa,
                DefaultSettings_: {endingStart: ve, endingEnd: ve},
                intervalChanged_: function (t, e, n) {
                    var i = this.parameterPositions, r = t - 2, o = t + 1, a = i[r], s = i[o];
                    if (void 0 === a) switch (this.getSettings_().endingStart) {
                        case 2401:
                            r = t, a = 2 * e - n;
                            break;
                        case 2402:
                            a = e + i[r = i.length - 2] - i[r + 1];
                            break;
                        default:
                            r = t, a = n
                    }
                    if (void 0 === s) switch (this.getSettings_().endingEnd) {
                        case 2401:
                            o = t, s = 2 * n - e;
                            break;
                        case 2402:
                            o = 1, s = n + i[1] - i[0];
                            break;
                        default:
                            o = t - 1, s = e
                    }
                    var h = .5 * (n - e), c = this.valueSize;
                    this._weightPrev = h / (e - a), this._weightNext = h / (s - n), this._offsetPrev = r * c, this._offsetNext = o * c
                },
                interpolate_: function (t, e, n, i) {
                    for (var r = this.resultBuffer, o = this.sampleValues, a = this.valueSize, s = t * a, h = s - a, c = this._offsetPrev, u = this._offsetNext, l = this._weightPrev, f = this._weightNext, p = (n - e) / (i - e), d = p * p, m = d * p, v = -l * m + 2 * l * d - l * p, g = (1 + l) * m + (-1.5 - 2 * l) * d + (-.5 + l) * p + 1, y = (-1 - f) * m + (1.5 + f) * d + .5 * p, w = f * m - f * d, x = 0; x !== a; ++x) r[x] = v * o[c + x] + g * o[h + x] + y * o[s + x] + w * o[u + x];
                    return r
                }
            }), Ka.prototype = Object.assign(Object.create(Ja.prototype), {
                constructor: Ka,
                interpolate_: function (t, e, n, i) {
                    for (var r = this.resultBuffer, o = this.sampleValues, a = this.valueSize, s = t * a, h = s - a, c = (n - e) / (i - e), u = 1 - c, l = 0; l !== a; ++l) r[l] = o[h + l] * u + o[s + l] * c;
                    return r
                }
            }), qa.prototype = Object.assign(Object.create(Ja.prototype), {
                constructor: qa, interpolate_: function (t) {
                    return this.copySampleValue_(t - 1)
                }
            }), Object.assign($a, {
                toJSON: function (t) {
                    var e, n = t.constructor;
                    if (void 0 !== n.toJSON) e = n.toJSON(t); else {
                        e = {
                            name: t.name,
                            times: Za.convertArray(t.times, Array),
                            values: Za.convertArray(t.values, Array)
                        };
                        var i = t.getInterpolation();
                        i !== t.DefaultInterpolation && (e.interpolation = i)
                    }
                    return e.type = t.ValueTypeName, e
                }
            }), Object.assign($a.prototype, {
                constructor: $a,
                TimeBufferType: Float32Array,
                ValueBufferType: Float32Array,
                DefaultInterpolation: 2301,
                InterpolantFactoryMethodDiscrete: function (t) {
                    return new qa(this.times, this.values, this.getValueSize(), t)
                },
                InterpolantFactoryMethodLinear: function (t) {
                    return new Ka(this.times, this.values, this.getValueSize(), t)
                },
                InterpolantFactoryMethodSmooth: function (t) {
                    return new Qa(this.times, this.values, this.getValueSize(), t)
                },
                setInterpolation: function (t) {
                    var e;
                    switch (t) {
                        case 2300:
                            e = this.InterpolantFactoryMethodDiscrete;
                            break;
                        case 2301:
                            e = this.InterpolantFactoryMethodLinear;
                            break;
                        case 2302:
                            e = this.InterpolantFactoryMethodSmooth
                    }
                    if (void 0 === e) {
                        var n = "unsupported interpolation for " + this.ValueTypeName + " keyframe track named " + this.name;
                        if (void 0 === this.createInterpolant) {
                            if (t === this.DefaultInterpolation) throw new Error(n);
                            this.setInterpolation(this.DefaultInterpolation)
                        }
                        return console.warn("THREE.KeyframeTrack:", n), this
                    }
                    return this.createInterpolant = e, this
                },
                getInterpolation: function () {
                    switch (this.createInterpolant) {
                        case this.InterpolantFactoryMethodDiscrete:
                            return 2300;
                        case this.InterpolantFactoryMethodLinear:
                            return 2301;
                        case this.InterpolantFactoryMethodSmooth:
                            return 2302
                    }
                },
                getValueSize: function () {
                    return this.values.length / this.times.length
                },
                shift: function (t) {
                    if (0 !== t) for (var e = this.times, n = 0, i = e.length; n !== i; ++n) e[n] += t;
                    return this
                },
                scale: function (t) {
                    if (1 !== t) for (var e = this.times, n = 0, i = e.length; n !== i; ++n) e[n] *= t;
                    return this
                },
                trim: function (t, e) {
                    for (var n = this.times, i = n.length, r = 0, o = i - 1; r !== i && n[r] < t;) ++r;
                    for (; -1 !== o && n[o] > e;) --o;
                    if (++o, 0 !== r || o !== i) {
                        r >= o && (r = (o = Math.max(o, 1)) - 1);
                        var a = this.getValueSize();
                        this.times = Za.arraySlice(n, r, o), this.values = Za.arraySlice(this.values, r * a, o * a)
                    }
                    return this
                },
                validate: function () {
                    var t = !0, e = this.getValueSize();
                    e - Math.floor(e) != 0 && (console.error("THREE.KeyframeTrack: Invalid value size in track.", this), t = !1);
                    var n = this.times, i = this.values, r = n.length;
                    0 === r && (console.error("THREE.KeyframeTrack: Track is empty.", this), t = !1);
                    for (var o = null, a = 0; a !== r; a++) {
                        var s = n[a];
                        if ("number" == typeof s && isNaN(s)) {
                            console.error("THREE.KeyframeTrack: Time is not a valid number.", this, a, s), t = !1;
                            break
                        }
                        if (null !== o && o > s) {
                            console.error("THREE.KeyframeTrack: Out of order keys.", this, a, s, o), t = !1;
                            break
                        }
                        o = s
                    }
                    if (void 0 !== i && Za.isTypedArray(i)) {
                        a = 0;
                        for (var h = i.length; a !== h; ++a) {
                            var c = i[a];
                            if (isNaN(c)) {
                                console.error("THREE.KeyframeTrack: Value is not a valid number.", this, a, c), t = !1;
                                break
                            }
                        }
                    }
                    return t
                },
                optimize: function () {
                    for (var t = this.times, e = this.values, n = this.getValueSize(), i = 2302 === this.getInterpolation(), r = 1, o = t.length - 1, a = 1; a < o; ++a) {
                        var s = !1, h = t[a];
                        if (h !== t[a + 1] && (1 !== a || h !== h[0])) if (i) s = !0; else for (var c = a * n, u = c - n, l = c + n, f = 0; f !== n; ++f) {
                            var p = e[c + f];
                            if (p !== e[u + f] || p !== e[l + f]) {
                                s = !0;
                                break
                            }
                        }
                        if (s) {
                            if (a !== r) {
                                t[r] = t[a];
                                var d = a * n, m = r * n;
                                for (f = 0; f !== n; ++f) e[m + f] = e[d + f]
                            }
                            ++r
                        }
                    }
                    if (o > 0) {
                        t[r] = t[o];
                        for (d = o * n, m = r * n, f = 0; f !== n; ++f) e[m + f] = e[d + f];
                        ++r
                    }
                    return r !== t.length && (this.times = Za.arraySlice(t, 0, r), this.values = Za.arraySlice(e, 0, r * n)), this
                }
            }), ja.prototype = Object.assign(Object.create($a.prototype), {
                constructor: ja,
                ValueTypeName: "bool",
                ValueBufferType: Array,
                DefaultInterpolation: 2300,
                InterpolantFactoryMethodLinear: void 0,
                InterpolantFactoryMethodSmooth: void 0
            }), ts.prototype = Object.assign(Object.create($a.prototype), {
                constructor: ts,
                ValueTypeName: "color"
            }), es.prototype = Object.assign(Object.create($a.prototype), {
                constructor: es,
                ValueTypeName: "number"
            }), ns.prototype = Object.assign(Object.create(Ja.prototype), {
                constructor: ns,
                interpolate_: function (t, e, n, i) {
                    for (var r = this.resultBuffer, o = this.sampleValues, a = this.valueSize, s = t * a, h = (n - e) / (i - e), c = s + a; s !== c; s += 4) Ue.slerpFlat(r, 0, o, s - a, o, s, h);
                    return r
                }
            }), is.prototype = Object.assign(Object.create($a.prototype), {
                constructor: is,
                ValueTypeName: "quaternion",
                DefaultInterpolation: 2301,
                InterpolantFactoryMethodLinear: function (t) {
                    return new ns(this.times, this.values, this.getValueSize(), t)
                },
                InterpolantFactoryMethodSmooth: void 0
            }), rs.prototype = Object.assign(Object.create($a.prototype), {
                constructor: rs,
                ValueTypeName: "string",
                ValueBufferType: Array,
                DefaultInterpolation: 2300,
                InterpolantFactoryMethodLinear: void 0,
                InterpolantFactoryMethodSmooth: void 0
            }), os.prototype = Object.assign(Object.create($a.prototype), {
                constructor: os,
                ValueTypeName: "vector"
            }), Object.assign(as, {
                parse: function (t) {
                    for (var e = [], n = t.tracks, i = 1 / (t.fps || 1), r = 0, o = n.length; r !== o; ++r) e.push(ss(n[r]).scale(i));
                    return new as(t.name, t.duration, e)
                }, toJSON: function (t) {
                    for (var e = [], n = t.tracks, i = {
                        name: t.name,
                        duration: t.duration,
                        tracks: e,
                        uuid: t.uuid
                    }, r = 0, o = n.length; r !== o; ++r) e.push($a.toJSON(n[r]));
                    return i
                }, CreateFromMorphTargetSequence: function (t, e, n, i) {
                    for (var r = e.length, o = [], a = 0; a < r; a++) {
                        var s = [], h = [];
                        s.push((a + r - 1) % r, a, (a + 1) % r), h.push(0, 1, 0);
                        var c = Za.getKeyframeOrder(s);
                        s = Za.sortedArray(s, 1, c), h = Za.sortedArray(h, 1, c), i || 0 !== s[0] || (s.push(r), h.push(h[0])), o.push(new es(".morphTargetInfluences[" + e[a].name + "]", s, h).scale(1 / n))
                    }
                    return new as(t, -1, o)
                }, findByName: function (t, e) {
                    var n = t;
                    if (!Array.isArray(t)) {
                        n = t.geometry && t.geometry.animations || t.animations
                    }
                    for (var i = 0; i < n.length; i++) if (n[i].name === e) return n[i];
                    return null
                }, CreateClipsFromMorphTargetSequences: function (t, e, n) {
                    for (var i = {}, r = /^([\w-]*?)([\d]+)$/, o = 0, a = t.length; o < a; o++) {
                        var s = t[o], h = s.name.match(r);
                        if (h && h.length > 1) {
                            var c = i[l = h[1]];
                            c || (i[l] = c = []), c.push(s)
                        }
                    }
                    var u = [];
                    for (var l in i) u.push(as.CreateFromMorphTargetSequence(l, i[l], e, n));
                    return u
                }, parseAnimation: function (t, e) {
                    if (!t) return console.error("THREE.AnimationClip: No animation in JSONLoader data."), null;
                    for (var n = function (t, e, n, i, r) {
                        if (0 !== n.length) {
                            var o = [], a = [];
                            Za.flattenJSON(n, o, a, i), 0 !== o.length && r.push(new t(e, o, a))
                        }
                    }, i = [], r = t.name || "default", o = t.length || -1, a = t.fps || 30, s = t.hierarchy || [], h = 0; h < s.length; h++) {
                        var c = s[h].keys;
                        if (c && 0 !== c.length) if (c[0].morphTargets) {
                            for (var u = {}, l = 0; l < c.length; l++) if (c[l].morphTargets) for (var f = 0; f < c[l].morphTargets.length; f++) u[c[l].morphTargets[f]] = -1;
                            for (var p in u) {
                                var d = [], m = [];
                                for (f = 0; f !== c[l].morphTargets.length; ++f) {
                                    var v = c[l];
                                    d.push(v.time), m.push(v.morphTarget === p ? 1 : 0)
                                }
                                i.push(new es(".morphTargetInfluence[" + p + "]", d, m))
                            }
                            o = u.length * (a || 1)
                        } else {
                            var g = ".bones[" + e[h].name + "]";
                            n(os, g + ".position", c, "pos", i), n(is, g + ".quaternion", c, "rot", i), n(os, g + ".scale", c, "scl", i)
                        }
                    }
                    return 0 === i.length ? null : new as(r, o, i)
                }
            }), Object.assign(as.prototype, {
                resetDuration: function () {
                    for (var t = 0, e = 0, n = this.tracks.length; e !== n; ++e) {
                        var i = this.tracks[e];
                        t = Math.max(t, i.times[i.times.length - 1])
                    }
                    return this.duration = t, this
                }, trim: function () {
                    for (var t = 0; t < this.tracks.length; t++) this.tracks[t].trim(0, this.duration);
                    return this
                }, validate: function () {
                    for (var t = !0, e = 0; e < this.tracks.length; e++) t = t && this.tracks[e].validate();
                    return t
                }, optimize: function () {
                    for (var t = 0; t < this.tracks.length; t++) this.tracks[t].optimize();
                    return this
                }
            });
            var hs = {
                enabled: !1, files: {}, add: function (t, e) {
                    !1 !== this.enabled && (this.files[t] = e)
                }, get: function (t) {
                    if (!1 !== this.enabled) return this.files[t]
                }, remove: function (t) {
                    delete this.files[t]
                }, clear: function () {
                    this.files = {}
                }
            };

            function cs(t, e, n) {
                var i = this, r = !1, o = 0, a = 0, s = void 0;
                this.onStart = void 0, this.onLoad = t, this.onProgress = e, this.onError = n, this.itemStart = function (t) {
                    a++, !1 === r && void 0 !== i.onStart && i.onStart(t, o, a), r = !0
                }, this.itemEnd = function (t) {
                    o++, void 0 !== i.onProgress && i.onProgress(t, o, a), o === a && (r = !1, void 0 !== i.onLoad && i.onLoad())
                }, this.itemError = function (t) {
                    void 0 !== i.onError && i.onError(t)
                }, this.resolveURL = function (t) {
                    return s ? s(t) : t
                }, this.setURLModifier = function (t) {
                    return s = t, this
                }
            }

            var us = new cs, ls = {};

            function fs(t) {
                this.manager = void 0 !== t ? t : us
            }

            function ps(t) {
                this.manager = void 0 !== t ? t : us
            }

            function ds(t) {
                this.manager = void 0 !== t ? t : us, this._parser = null
            }

            function ms(t) {
                this.manager = void 0 !== t ? t : us, this._parser = null
            }

            function vs(t) {
                this.manager = void 0 !== t ? t : us
            }

            function gs(t) {
                this.manager = void 0 !== t ? t : us
            }

            function ys(t) {
                this.manager = void 0 !== t ? t : us
            }

            function ws() {
                this.type = "Curve", this.arcLengthDivisions = 200
            }

            function xs(t, e, n, i, r, o, a, s) {
                ws.call(this), this.type = "EllipseCurve", this.aX = t || 0, this.aY = e || 0, this.xRadius = n || 1, this.yRadius = i || 1, this.aStartAngle = r || 0, this.aEndAngle = o || 2 * Math.PI, this.aClockwise = a || !1, this.aRotation = s || 0
            }

            function Ms(t, e, n, i, r, o) {
                xs.call(this, t, e, n, n, i, r, o), this.type = "ArcCurve"
            }

            function _s() {
                var t = 0, e = 0, n = 0, i = 0;

                function r(r, o, a, s) {
                    t = r, e = a, n = -3 * r + 3 * o - 2 * a - s, i = 2 * r - 2 * o + a + s
                }

                return {
                    initCatmullRom: function (t, e, n, i, o) {
                        r(e, n, o * (n - t), o * (i - e))
                    }, initNonuniformCatmullRom: function (t, e, n, i, o, a, s) {
                        var h = (e - t) / o - (n - t) / (o + a) + (n - e) / a,
                            c = (n - e) / a - (i - e) / (a + s) + (i - n) / s;
                        r(e, n, h *= a, c *= a)
                    }, calc: function (r) {
                        var o = r * r;
                        return t + e * r + n * o + i * (o * r)
                    }
                }
            }

            Object.assign(fs.prototype, {
                load: function (t, e, n, i) {
                    void 0 === t && (t = ""), void 0 !== this.path && (t = this.path + t), t = this.manager.resolveURL(t);
                    var r = this, o = hs.get(t);
                    if (void 0 !== o) return r.manager.itemStart(t), setTimeout(function () {
                        e && e(o), r.manager.itemEnd(t)
                    }, 0), o;
                    if (void 0 === ls[t]) {
                        var a = t.match(/^data:(.*?)(;base64)?,(.*)$/);
                        if (a) {
                            var s = a[1], h = !!a[2], c = a[3];
                            c = decodeURIComponent(c), h && (c = atob(c));
                            try {
                                var u, l = (this.responseType || "").toLowerCase();
                                switch (l) {
                                    case"arraybuffer":
                                    case"blob":
                                        for (var f = new Uint8Array(c.length), p = 0; p < c.length; p++) f[p] = c.charCodeAt(p);
                                        u = "blob" === l ? new Blob([f.buffer], {type: s}) : f.buffer;
                                        break;
                                    case"document":
                                        var d = new DOMParser;
                                        u = d.parseFromString(c, s);
                                        break;
                                    case"json":
                                        u = JSON.parse(c);
                                        break;
                                    default:
                                        u = c
                                }
                                setTimeout(function () {
                                    e && e(u), r.manager.itemEnd(t)
                                }, 0)
                            } catch (e) {
                                setTimeout(function () {
                                    i && i(e), r.manager.itemError(t), r.manager.itemEnd(t)
                                }, 0)
                            }
                        } else {
                            ls[t] = [], ls[t].push({onLoad: e, onProgress: n, onError: i});
                            var m = new XMLHttpRequest;
                            for (var v in m.open("GET", t, !0), m.addEventListener("load", function (e) {
                                var n = this.response;
                                hs.add(t, n);
                                var i = ls[t];
                                if (delete ls[t], 200 === this.status || 0 === this.status) {
                                    0 === this.status && console.warn("THREE.FileLoader: HTTP Status 0 received.");
                                    for (var o = 0, a = i.length; o < a; o++) {
                                        (s = i[o]).onLoad && s.onLoad(n)
                                    }
                                    r.manager.itemEnd(t)
                                } else {
                                    for (o = 0, a = i.length; o < a; o++) {
                                        var s;
                                        (s = i[o]).onError && s.onError(e)
                                    }
                                    r.manager.itemError(t), r.manager.itemEnd(t)
                                }
                            }, !1), m.addEventListener("progress", function (e) {
                                for (var n = ls[t], i = 0, r = n.length; i < r; i++) {
                                    var o = n[i];
                                    o.onProgress && o.onProgress(e)
                                }
                            }, !1), m.addEventListener("error", function (e) {
                                var n = ls[t];
                                delete ls[t];
                                for (var i = 0, o = n.length; i < o; i++) {
                                    var a = n[i];
                                    a.onError && a.onError(e)
                                }
                                r.manager.itemError(t), r.manager.itemEnd(t)
                            }, !1), m.addEventListener("abort", function (e) {
                                var n = ls[t];
                                delete ls[t];
                                for (var i = 0, o = n.length; i < o; i++) {
                                    var a = n[i];
                                    a.onError && a.onError(e)
                                }
                                r.manager.itemError(t), r.manager.itemEnd(t)
                            }, !1), void 0 !== this.responseType && (m.responseType = this.responseType), void 0 !== this.withCredentials && (m.withCredentials = this.withCredentials), m.overrideMimeType && m.overrideMimeType(void 0 !== this.mimeType ? this.mimeType : "text/plain"), this.requestHeader) m.setRequestHeader(v, this.requestHeader[v]);
                            m.send(null)
                        }
                        return r.manager.itemStart(t), m
                    }
                    ls[t].push({onLoad: e, onProgress: n, onError: i})
                }, setPath: function (t) {
                    return this.path = t, this
                }, setResponseType: function (t) {
                    return this.responseType = t, this
                }, setWithCredentials: function (t) {
                    return this.withCredentials = t, this
                }, setMimeType: function (t) {
                    return this.mimeType = t, this
                }, setRequestHeader: function (t) {
                    return this.requestHeader = t, this
                }
            }), Object.assign(ps.prototype, {
                load: function (t, e, n, i) {
                    var r = this, o = new fs(r.manager);
                    o.setPath(r.path), o.load(t, function (t) {
                        e(r.parse(JSON.parse(t)))
                    }, n, i)
                }, parse: function (t, e) {
                    for (var n = [], i = 0; i < t.length; i++) {
                        var r = as.parse(t[i]);
                        n.push(r)
                    }
                    e(n)
                }, setPath: function (t) {
                    return this.path = t, this
                }
            }), Object.assign(ds.prototype, {
                load: function (t, e, n, i) {
                    var r = this, o = [], a = new xo;
                    a.image = o;
                    var s = new fs(this.manager);

                    function h(h) {
                        s.load(t[h], function (t) {
                            var n = r._parser(t, !0);
                            o[h] = {
                                width: n.width,
                                height: n.height,
                                format: n.format,
                                mipmaps: n.mipmaps
                            }, 6 === (c += 1) && (1 === n.mipmapCount && (a.minFilter = _t), a.format = n.format, a.needsUpdate = !0, e && e(a))
                        }, n, i)
                    }

                    if (s.setPath(this.path), s.setResponseType("arraybuffer"), Array.isArray(t)) for (var c = 0, u = 0, l = t.length; u < l; ++u) h(u); else s.load(t, function (t) {
                        var n = r._parser(t, !0);
                        if (n.isCubemap) for (var i = n.mipmaps.length / n.mipmapCount, s = 0; s < i; s++) {
                            o[s] = {mipmaps: []};
                            for (var h = 0; h < n.mipmapCount; h++) o[s].mipmaps.push(n.mipmaps[s * n.mipmapCount + h]), o[s].format = n.format, o[s].width = n.width, o[s].height = n.height
                        } else a.image.width = n.width, a.image.height = n.height, a.mipmaps = n.mipmaps;
                        1 === n.mipmapCount && (a.minFilter = _t), a.format = n.format, a.needsUpdate = !0, e && e(a)
                    }, n, i);
                    return a
                }, setPath: function (t) {
                    return this.path = t, this
                }
            }), Object.assign(ms.prototype, {
                load: function (t, e, n, i) {
                    var r = this, o = new Je, a = new fs(this.manager);
                    return a.setResponseType("arraybuffer"), a.setPath(this.path), a.load(t, function (t) {
                        var n = r._parser(t);
                        n && (void 0 !== n.image ? o.image = n.image : void 0 !== n.data && (o.image.width = n.width, o.image.height = n.height, o.image.data = n.data), o.wrapS = void 0 !== n.wrapS ? n.wrapS : gt, o.wrapT = void 0 !== n.wrapT ? n.wrapT : gt, o.magFilter = void 0 !== n.magFilter ? n.magFilter : _t, o.minFilter = void 0 !== n.minFilter ? n.minFilter : St, o.anisotropy = void 0 !== n.anisotropy ? n.anisotropy : 1, void 0 !== n.format && (o.format = n.format), void 0 !== n.type && (o.type = n.type), void 0 !== n.mipmaps && (o.mipmaps = n.mipmaps), 1 === n.mipmapCount && (o.minFilter = _t), o.needsUpdate = !0, e && e(o, n))
                    }, n, i), o
                }, setPath: function (t) {
                    return this.path = t, this
                }
            }), Object.assign(vs.prototype, {
                crossOrigin: "anonymous", load: function (t, e, n, i) {
                    void 0 === t && (t = ""), void 0 !== this.path && (t = this.path + t), t = this.manager.resolveURL(t);
                    var r = this, o = hs.get(t);
                    if (void 0 !== o) return r.manager.itemStart(t), setTimeout(function () {
                        e && e(o), r.manager.itemEnd(t)
                    }, 0), o;
                    var a = document.createElementNS("http://www.w3.org/1999/xhtml", "img");

                    function s() {
                        a.removeEventListener("load", s, !1), a.removeEventListener("error", h, !1), hs.add(t, this), e && e(this), r.manager.itemEnd(t)
                    }

                    function h(e) {
                        a.removeEventListener("load", s, !1), a.removeEventListener("error", h, !1), i && i(e), r.manager.itemError(t), r.manager.itemEnd(t)
                    }

                    return a.addEventListener("load", s, !1), a.addEventListener("error", h, !1), "data:" !== t.substr(0, 5) && void 0 !== this.crossOrigin && (a.crossOrigin = this.crossOrigin), r.manager.itemStart(t), a.src = t, a
                }, setCrossOrigin: function (t) {
                    return this.crossOrigin = t, this
                }, setPath: function (t) {
                    return this.path = t, this
                }
            }), Object.assign(gs.prototype, {
                crossOrigin: "anonymous", load: function (t, e, n, i) {
                    var r = new wi, o = new vs(this.manager);
                    o.setCrossOrigin(this.crossOrigin), o.setPath(this.path);
                    var a = 0;

                    function s(n) {
                        o.load(t[n], function (t) {
                            r.images[n] = t, 6 === ++a && (r.needsUpdate = !0, e && e(r))
                        }, void 0, i)
                    }

                    for (var h = 0; h < t.length; ++h) s(h);
                    return r
                }, setCrossOrigin: function (t) {
                    return this.crossOrigin = t, this
                }, setPath: function (t) {
                    return this.path = t, this
                }
            }), Object.assign(ys.prototype, {
                crossOrigin: "anonymous", load: function (t, e, n, i) {
                    var r = new De, o = new vs(this.manager);
                    return o.setCrossOrigin(this.crossOrigin), o.setPath(this.path), o.load(t, function (n) {
                        r.image = n;
                        var i = t.search(/\.jpe?g$/i) > 0 || 0 === t.search(/^data\:image\/jpeg/);
                        r.format = i ? It : Ft, r.needsUpdate = !0, void 0 !== e && e(r)
                    }, n, i), r
                }, setCrossOrigin: function (t) {
                    return this.crossOrigin = t, this
                }, setPath: function (t) {
                    return this.path = t, this
                }
            }), Object.assign(ws.prototype, {
                getPoint: function () {
                    return console.warn("THREE.Curve: .getPoint() not implemented."), null
                }, getPointAt: function (t, e) {
                    var n = this.getUtoTmapping(t);
                    return this.getPoint(n, e)
                }, getPoints: function (t) {
                    void 0 === t && (t = 5);
                    for (var e = [], n = 0; n <= t; n++) e.push(this.getPoint(n / t));
                    return e
                }, getSpacedPoints: function (t) {
                    void 0 === t && (t = 5);
                    for (var e = [], n = 0; n <= t; n++) e.push(this.getPointAt(n / t));
                    return e
                }, getLength: function () {
                    var t = this.getLengths();
                    return t[t.length - 1]
                }, getLengths: function (t) {
                    if (void 0 === t && (t = this.arcLengthDivisions), this.cacheArcLengths && this.cacheArcLengths.length === t + 1 && !this.needsUpdate) return this.cacheArcLengths;
                    this.needsUpdate = !1;
                    var e, n, i = [], r = this.getPoint(0), o = 0;
                    for (i.push(0), n = 1; n <= t; n++) o += (e = this.getPoint(n / t)).distanceTo(r), i.push(o), r = e;
                    return this.cacheArcLengths = i, i
                }, updateArcLengths: function () {
                    this.needsUpdate = !0, this.getLengths()
                }, getUtoTmapping: function (t, e) {
                    var n, i = this.getLengths(), r = 0, o = i.length;
                    n = e || t * i[o - 1];
                    for (var a, s = 0, h = o - 1; s <= h;) if ((a = i[r = Math.floor(s + (h - s) / 2)] - n) < 0) s = r + 1; else {
                        if (!(a > 0)) {
                            h = r;
                            break
                        }
                        h = r - 1
                    }
                    if (i[r = h] === n) return r / (o - 1);
                    var c = i[r];
                    return (r + (n - c) / (i[r + 1] - c)) / (o - 1)
                }, getTangent: function (t) {
                    var e = t - 1e-4, n = t + 1e-4;
                    e < 0 && (e = 0), n > 1 && (n = 1);
                    var i = this.getPoint(e);
                    return this.getPoint(n).clone().sub(i).normalize()
                }, getTangentAt: function (t) {
                    var e = this.getUtoTmapping(t);
                    return this.getTangent(e)
                }, computeFrenetFrames: function (t, e) {
                    var n, i, r = new He, o = [], a = [], s = [], h = new He, c = new ze;
                    for (n = 0; n <= t; n++) o[n] = this.getTangentAt(n / t), o[n].normalize();
                    a[0] = new He, s[0] = new He;
                    var u = Number.MAX_VALUE, l = Math.abs(o[0].x), f = Math.abs(o[0].y), p = Math.abs(o[0].z);
                    for (l <= u && (u = l, r.set(1, 0, 0)), f <= u && (u = f, r.set(0, 1, 0)), p <= u && r.set(0, 0, 1), h.crossVectors(o[0], r).normalize(), a[0].crossVectors(o[0], h), s[0].crossVectors(o[0], a[0]), n = 1; n <= t; n++) a[n] = a[n - 1].clone(), s[n] = s[n - 1].clone(), h.crossVectors(o[n - 1], o[n]), h.length() > Number.EPSILON && (h.normalize(), i = Math.acos(Pe.clamp(o[n - 1].dot(o[n]), -1, 1)), a[n].applyMatrix4(c.makeRotationAxis(h, i))), s[n].crossVectors(o[n], a[n]);
                    if (!0 === e) for (i = Math.acos(Pe.clamp(a[0].dot(a[t]), -1, 1)), i /= t, o[0].dot(h.crossVectors(a[0], a[t])) > 0 && (i = -i), n = 1; n <= t; n++) a[n].applyMatrix4(c.makeRotationAxis(o[n], i * n)), s[n].crossVectors(o[n], a[n]);
                    return {tangents: o, normals: a, binormals: s}
                }, clone: function () {
                    return (new this.constructor).copy(this)
                }, copy: function (t) {
                    return this.arcLengthDivisions = t.arcLengthDivisions, this
                }, toJSON: function () {
                    var t = {metadata: {version: 4.5, type: "Curve", generator: "Curve.toJSON"}};
                    return t.arcLengthDivisions = this.arcLengthDivisions, t.type = this.type, t
                }, fromJSON: function (t) {
                    return this.arcLengthDivisions = t.arcLengthDivisions, this
                }
            }), (xs.prototype = Object.create(ws.prototype)).constructor = xs, xs.prototype.isEllipseCurve = !0, xs.prototype.getPoint = function (t, e) {
                for (var n = e || new Ne, i = 2 * Math.PI, r = this.aEndAngle - this.aStartAngle, o = Math.abs(r) < Number.EPSILON; r < 0;) r += i;
                for (; r > i;) r -= i;
                r < Number.EPSILON && (r = o ? 0 : i), !0 !== this.aClockwise || o || (r === i ? r = -i : r -= i);
                var a = this.aStartAngle + t * r, s = this.aX + this.xRadius * Math.cos(a),
                    h = this.aY + this.yRadius * Math.sin(a);
                if (0 !== this.aRotation) {
                    var c = Math.cos(this.aRotation), u = Math.sin(this.aRotation), l = s - this.aX, f = h - this.aY;
                    s = l * c - f * u + this.aX, h = l * u + f * c + this.aY
                }
                return n.set(s, h)
            }, xs.prototype.copy = function (t) {
                return ws.prototype.copy.call(this, t), this.aX = t.aX, this.aY = t.aY, this.xRadius = t.xRadius, this.yRadius = t.yRadius, this.aStartAngle = t.aStartAngle, this.aEndAngle = t.aEndAngle, this.aClockwise = t.aClockwise, this.aRotation = t.aRotation, this
            }, xs.prototype.toJSON = function () {
                var t = ws.prototype.toJSON.call(this);
                return t.aX = this.aX, t.aY = this.aY, t.xRadius = this.xRadius, t.yRadius = this.yRadius, t.aStartAngle = this.aStartAngle, t.aEndAngle = this.aEndAngle, t.aClockwise = this.aClockwise, t.aRotation = this.aRotation, t
            }, xs.prototype.fromJSON = function (t) {
                return ws.prototype.fromJSON.call(this, t), this.aX = t.aX, this.aY = t.aY, this.xRadius = t.xRadius, this.yRadius = t.yRadius, this.aStartAngle = t.aStartAngle, this.aEndAngle = t.aEndAngle, this.aClockwise = t.aClockwise, this.aRotation = t.aRotation, this
            }, (Ms.prototype = Object.create(xs.prototype)).constructor = Ms, Ms.prototype.isArcCurve = !0;
            var Es = new He, Ss = new _s, bs = new _s, Ts = new _s;

            function Ls(t, e, n, i) {
                ws.call(this), this.type = "CatmullRomCurve3", this.points = t || [], this.closed = e || !1, this.curveType = n || "centripetal", this.tension = i || .5
            }

            function Cs(t, e, n, i, r) {
                var o = .5 * (i - e), a = .5 * (r - n), s = t * t;
                return (2 * n - 2 * i + o + a) * (t * s) + (-3 * n + 3 * i - 2 * o - a) * s + o * t + n
            }

            function Rs(t, e, n, i) {
                return function (t, e) {
                    var n = 1 - t;
                    return n * n * e
                }(t, e) + function (t, e) {
                    return 2 * (1 - t) * t * e
                }(t, n) + function (t, e) {
                    return t * t * e
                }(t, i)
            }

            function As(t, e, n, i, r) {
                return function (t, e) {
                    var n = 1 - t;
                    return n * n * n * e
                }(t, e) + function (t, e) {
                    var n = 1 - t;
                    return 3 * n * n * t * e
                }(t, n) + function (t, e) {
                    return 3 * (1 - t) * t * t * e
                }(t, i) + function (t, e) {
                    return t * t * t * e
                }(t, r)
            }

            function Ps(t, e, n, i) {
                ws.call(this), this.type = "CubicBezierCurve", this.v0 = t || new Ne, this.v1 = e || new Ne, this.v2 = n || new Ne, this.v3 = i || new Ne
            }

            function Ns(t, e, n, i) {
                ws.call(this), this.type = "CubicBezierCurve3", this.v0 = t || new He, this.v1 = e || new He, this.v2 = n || new He, this.v3 = i || new He
            }

            function zs(t, e) {
                ws.call(this), this.type = "LineCurve", this.v1 = t || new Ne, this.v2 = e || new Ne
            }

            function Us(t, e) {
                ws.call(this), this.type = "LineCurve3", this.v1 = t || new He, this.v2 = e || new He
            }

            function Hs(t, e, n) {
                ws.call(this), this.type = "QuadraticBezierCurve", this.v0 = t || new Ne, this.v1 = e || new Ne, this.v2 = n || new Ne
            }

            function Gs(t, e, n) {
                ws.call(this), this.type = "QuadraticBezierCurve3", this.v0 = t || new He, this.v1 = e || new He, this.v2 = n || new He
            }

            function Os(t) {
                ws.call(this), this.type = "SplineCurve", this.points = t || []
            }

            (Ls.prototype = Object.create(ws.prototype)).constructor = Ls, Ls.prototype.isCatmullRomCurve3 = !0, Ls.prototype.getPoint = function (t, e) {
                var n, i, r, o, a = e || new He, s = this.points, h = s.length, c = (h - (this.closed ? 0 : 1)) * t,
                    u = Math.floor(c), l = c - u;
                if (this.closed ? u += u > 0 ? 0 : (Math.floor(Math.abs(u) / h) + 1) * h : 0 === l && u === h - 1 && (u = h - 2, l = 1), this.closed || u > 0 ? n = s[(u - 1) % h] : (Es.subVectors(s[0], s[1]).add(s[0]), n = Es), i = s[u % h], r = s[(u + 1) % h], this.closed || u + 2 < h ? o = s[(u + 2) % h] : (Es.subVectors(s[h - 1], s[h - 2]).add(s[h - 1]), o = Es), "centripetal" === this.curveType || "chordal" === this.curveType) {
                    var f = "chordal" === this.curveType ? .5 : .25, p = Math.pow(n.distanceToSquared(i), f),
                        d = Math.pow(i.distanceToSquared(r), f), m = Math.pow(r.distanceToSquared(o), f);
                    d < 1e-4 && (d = 1), p < 1e-4 && (p = d), m < 1e-4 && (m = d), Ss.initNonuniformCatmullRom(n.x, i.x, r.x, o.x, p, d, m), bs.initNonuniformCatmullRom(n.y, i.y, r.y, o.y, p, d, m), Ts.initNonuniformCatmullRom(n.z, i.z, r.z, o.z, p, d, m)
                } else "catmullrom" === this.curveType && (Ss.initCatmullRom(n.x, i.x, r.x, o.x, this.tension), bs.initCatmullRom(n.y, i.y, r.y, o.y, this.tension), Ts.initCatmullRom(n.z, i.z, r.z, o.z, this.tension));
                return a.set(Ss.calc(l), bs.calc(l), Ts.calc(l)), a
            }, Ls.prototype.copy = function (t) {
                ws.prototype.copy.call(this, t), this.points = [];
                for (var e = 0, n = t.points.length; e < n; e++) {
                    this.points.push(t.points[e].clone())
                }
                return this.closed = t.closed, this.curveType = t.curveType, this.tension = t.tension, this
            }, Ls.prototype.toJSON = function () {
                var t = ws.prototype.toJSON.call(this);
                t.points = [];
                for (var e = 0, n = this.points.length; e < n; e++) {
                    t.points.push(this.points[e].toArray())
                }
                return t.closed = this.closed, t.curveType = this.curveType, t.tension = this.tension, t
            }, Ls.prototype.fromJSON = function (t) {
                ws.prototype.fromJSON.call(this, t), this.points = [];
                for (var e = 0, n = t.points.length; e < n; e++) {
                    var i = t.points[e];
                    this.points.push((new He).fromArray(i))
                }
                return this.closed = t.closed, this.curveType = t.curveType, this.tension = t.tension, this
            }, (Ps.prototype = Object.create(ws.prototype)).constructor = Ps, Ps.prototype.isCubicBezierCurve = !0, Ps.prototype.getPoint = function (t, e) {
                var n = e || new Ne, i = this.v0, r = this.v1, o = this.v2, a = this.v3;
                return n.set(As(t, i.x, r.x, o.x, a.x), As(t, i.y, r.y, o.y, a.y)), n
            }, Ps.prototype.copy = function (t) {
                return ws.prototype.copy.call(this, t), this.v0.copy(t.v0), this.v1.copy(t.v1), this.v2.copy(t.v2), this.v3.copy(t.v3), this
            }, Ps.prototype.toJSON = function () {
                var t = ws.prototype.toJSON.call(this);
                return t.v0 = this.v0.toArray(), t.v1 = this.v1.toArray(), t.v2 = this.v2.toArray(), t.v3 = this.v3.toArray(), t
            }, Ps.prototype.fromJSON = function (t) {
                return ws.prototype.fromJSON.call(this, t), this.v0.fromArray(t.v0), this.v1.fromArray(t.v1), this.v2.fromArray(t.v2), this.v3.fromArray(t.v3), this
            }, (Ns.prototype = Object.create(ws.prototype)).constructor = Ns, Ns.prototype.isCubicBezierCurve3 = !0, Ns.prototype.getPoint = function (t, e) {
                var n = e || new He, i = this.v0, r = this.v1, o = this.v2, a = this.v3;
                return n.set(As(t, i.x, r.x, o.x, a.x), As(t, i.y, r.y, o.y, a.y), As(t, i.z, r.z, o.z, a.z)), n
            }, Ns.prototype.copy = function (t) {
                return ws.prototype.copy.call(this, t), this.v0.copy(t.v0), this.v1.copy(t.v1), this.v2.copy(t.v2), this.v3.copy(t.v3), this
            }, Ns.prototype.toJSON = function () {
                var t = ws.prototype.toJSON.call(this);
                return t.v0 = this.v0.toArray(), t.v1 = this.v1.toArray(), t.v2 = this.v2.toArray(), t.v3 = this.v3.toArray(), t
            }, Ns.prototype.fromJSON = function (t) {
                return ws.prototype.fromJSON.call(this, t), this.v0.fromArray(t.v0), this.v1.fromArray(t.v1), this.v2.fromArray(t.v2), this.v3.fromArray(t.v3), this
            }, (zs.prototype = Object.create(ws.prototype)).constructor = zs, zs.prototype.isLineCurve = !0, zs.prototype.getPoint = function (t, e) {
                var n = e || new Ne;
                return 1 === t ? n.copy(this.v2) : (n.copy(this.v2).sub(this.v1), n.multiplyScalar(t).add(this.v1)), n
            }, zs.prototype.getPointAt = function (t, e) {
                return this.getPoint(t, e)
            }, zs.prototype.getTangent = function () {
                return this.v2.clone().sub(this.v1).normalize()
            }, zs.prototype.copy = function (t) {
                return ws.prototype.copy.call(this, t), this.v1.copy(t.v1), this.v2.copy(t.v2), this
            }, zs.prototype.toJSON = function () {
                var t = ws.prototype.toJSON.call(this);
                return t.v1 = this.v1.toArray(), t.v2 = this.v2.toArray(), t
            }, zs.prototype.fromJSON = function (t) {
                return ws.prototype.fromJSON.call(this, t), this.v1.fromArray(t.v1), this.v2.fromArray(t.v2), this
            }, (Us.prototype = Object.create(ws.prototype)).constructor = Us, Us.prototype.isLineCurve3 = !0, Us.prototype.getPoint = function (t, e) {
                var n = e || new He;
                return 1 === t ? n.copy(this.v2) : (n.copy(this.v2).sub(this.v1), n.multiplyScalar(t).add(this.v1)), n
            }, Us.prototype.getPointAt = function (t, e) {
                return this.getPoint(t, e)
            }, Us.prototype.copy = function (t) {
                return ws.prototype.copy.call(this, t), this.v1.copy(t.v1), this.v2.copy(t.v2), this
            }, Us.prototype.toJSON = function () {
                var t = ws.prototype.toJSON.call(this);
                return t.v1 = this.v1.toArray(), t.v2 = this.v2.toArray(), t
            }, Us.prototype.fromJSON = function (t) {
                return ws.prototype.fromJSON.call(this, t), this.v1.fromArray(t.v1), this.v2.fromArray(t.v2), this
            }, (Hs.prototype = Object.create(ws.prototype)).constructor = Hs, Hs.prototype.isQuadraticBezierCurve = !0, Hs.prototype.getPoint = function (t, e) {
                var n = e || new Ne, i = this.v0, r = this.v1, o = this.v2;
                return n.set(Rs(t, i.x, r.x, o.x), Rs(t, i.y, r.y, o.y)), n
            }, Hs.prototype.copy = function (t) {
                return ws.prototype.copy.call(this, t), this.v0.copy(t.v0), this.v1.copy(t.v1), this.v2.copy(t.v2), this
            }, Hs.prototype.toJSON = function () {
                var t = ws.prototype.toJSON.call(this);
                return t.v0 = this.v0.toArray(), t.v1 = this.v1.toArray(), t.v2 = this.v2.toArray(), t
            }, Hs.prototype.fromJSON = function (t) {
                return ws.prototype.fromJSON.call(this, t), this.v0.fromArray(t.v0), this.v1.fromArray(t.v1), this.v2.fromArray(t.v2), this
            }, (Gs.prototype = Object.create(ws.prototype)).constructor = Gs, Gs.prototype.isQuadraticBezierCurve3 = !0, Gs.prototype.getPoint = function (t, e) {
                var n = e || new He, i = this.v0, r = this.v1, o = this.v2;
                return n.set(Rs(t, i.x, r.x, o.x), Rs(t, i.y, r.y, o.y), Rs(t, i.z, r.z, o.z)), n
            }, Gs.prototype.copy = function (t) {
                return ws.prototype.copy.call(this, t), this.v0.copy(t.v0), this.v1.copy(t.v1), this.v2.copy(t.v2), this
            }, Gs.prototype.toJSON = function () {
                var t = ws.prototype.toJSON.call(this);
                return t.v0 = this.v0.toArray(), t.v1 = this.v1.toArray(), t.v2 = this.v2.toArray(), t
            }, Gs.prototype.fromJSON = function (t) {
                return ws.prototype.fromJSON.call(this, t), this.v0.fromArray(t.v0), this.v1.fromArray(t.v1), this.v2.fromArray(t.v2), this
            }, (Os.prototype = Object.create(ws.prototype)).constructor = Os, Os.prototype.isSplineCurve = !0, Os.prototype.getPoint = function (t, e) {
                var n = e || new Ne, i = this.points, r = (i.length - 1) * t, o = Math.floor(r), a = r - o,
                    s = i[0 === o ? o : o - 1], h = i[o], c = i[o > i.length - 2 ? i.length - 1 : o + 1],
                    u = i[o > i.length - 3 ? i.length - 1 : o + 2];
                return n.set(Cs(a, s.x, h.x, c.x, u.x), Cs(a, s.y, h.y, c.y, u.y)), n
            }, Os.prototype.copy = function (t) {
                ws.prototype.copy.call(this, t), this.points = [];
                for (var e = 0, n = t.points.length; e < n; e++) {
                    this.points.push(t.points[e].clone())
                }
                return this
            }, Os.prototype.toJSON = function () {
                var t = ws.prototype.toJSON.call(this);
                t.points = [];
                for (var e = 0, n = this.points.length; e < n; e++) {
                    t.points.push(this.points[e].toArray())
                }
                return t
            }, Os.prototype.fromJSON = function (t) {
                ws.prototype.fromJSON.call(this, t), this.points = [];
                for (var e = 0, n = t.points.length; e < n; e++) {
                    var i = t.points[e];
                    this.points.push((new Ne).fromArray(i))
                }
                return this
            };
            var Is = Object.freeze({
                ArcCurve: Ms,
                CatmullRomCurve3: Ls,
                CubicBezierCurve: Ps,
                CubicBezierCurve3: Ns,
                EllipseCurve: xs,
                LineCurve: zs,
                LineCurve3: Us,
                QuadraticBezierCurve: Hs,
                QuadraticBezierCurve3: Gs,
                SplineCurve: Os
            });

            function Fs() {
                ws.call(this), this.type = "CurvePath", this.curves = [], this.autoClose = !1
            }

            function Bs(t) {
                Fs.call(this), this.type = "Path", this.currentPoint = new Ne, t && this.setFromPoints(t)
            }

            function ks(t) {
                Bs.call(this, t), this.uuid = Pe.generateUUID(), this.type = "Shape", this.holes = []
            }

            function Vs(t, e) {
                xn.call(this), this.type = "Light", this.color = new an(t), this.intensity = void 0 !== e ? e : 1, this.receiveShadow = void 0
            }

            function Ws(t, e, n) {
                Vs.call(this, t, n), this.type = "HemisphereLight", this.castShadow = void 0, this.position.copy(xn.DefaultUp), this.updateMatrix(), this.groundColor = new an(e)
            }

            function Ds(t) {
                this.camera = t, this.bias = 0, this.radius = 1, this.mapSize = new Ne(512, 512), this.map = null, this.matrix = new ze
            }

            function Xs() {
                Ds.call(this, new kr(50, 1, .5, 500))
            }

            function Ys(t, e, n, i, r, o) {
                Vs.call(this, t, e), this.type = "SpotLight", this.position.copy(xn.DefaultUp), this.updateMatrix(), this.target = new xn, Object.defineProperty(this, "power", {
                    get: function () {
                        return this.intensity * Math.PI
                    }, set: function (t) {
                        this.intensity = t / Math.PI
                    }
                }), this.distance = void 0 !== n ? n : 0, this.angle = void 0 !== i ? i : Math.PI / 3, this.penumbra = void 0 !== r ? r : 0, this.decay = void 0 !== o ? o : 1, this.shadow = new Xs
            }

            function Zs(t, e, n, i) {
                Vs.call(this, t, e), this.type = "PointLight", Object.defineProperty(this, "power", {
                    get: function () {
                        return 4 * this.intensity * Math.PI
                    }, set: function (t) {
                        this.intensity = t / (4 * Math.PI)
                    }
                }), this.distance = void 0 !== n ? n : 0, this.decay = void 0 !== i ? i : 1, this.shadow = new Ds(new kr(90, 1, .5, 500))
            }

            function Js(t, e, n, i, r, o) {
                Br.call(this), this.type = "OrthographicCamera", this.zoom = 1, this.view = null, this.left = void 0 !== t ? t : -1, this.right = void 0 !== e ? e : 1, this.top = void 0 !== n ? n : 1, this.bottom = void 0 !== i ? i : -1, this.near = void 0 !== r ? r : .1, this.far = void 0 !== o ? o : 2e3, this.updateProjectionMatrix()
            }

            function Qs() {
                Ds.call(this, new Js(-5, 5, 5, -5, .5, 500))
            }

            function Ks(t, e) {
                Vs.call(this, t, e), this.type = "DirectionalLight", this.position.copy(xn.DefaultUp), this.updateMatrix(), this.target = new xn, this.shadow = new Qs
            }

            function qs(t, e) {
                Vs.call(this, t, e), this.type = "AmbientLight", this.castShadow = void 0
            }

            function $s(t, e, n, i) {
                Vs.call(this, t, e), this.type = "RectAreaLight", this.width = void 0 !== n ? n : 10, this.height = void 0 !== i ? i : 10
            }

            function js(t) {
                this.manager = void 0 !== t ? t : us, this.textures = {}
            }

            Fs.prototype = Object.assign(Object.create(ws.prototype), {
                constructor: Fs, add: function (t) {
                    this.curves.push(t)
                }, closePath: function () {
                    var t = this.curves[0].getPoint(0), e = this.curves[this.curves.length - 1].getPoint(1);
                    t.equals(e) || this.curves.push(new zs(e, t))
                }, getPoint: function (t) {
                    for (var e = t * this.getLength(), n = this.getCurveLengths(), i = 0; i < n.length;) {
                        if (n[i] >= e) {
                            var r = n[i] - e, o = this.curves[i], a = o.getLength();
                            return o.getPointAt(0 === a ? 0 : 1 - r / a)
                        }
                        i++
                    }
                    return null
                }, getLength: function () {
                    var t = this.getCurveLengths();
                    return t[t.length - 1]
                }, updateArcLengths: function () {
                    this.needsUpdate = !0, this.cacheLengths = null, this.getCurveLengths()
                }, getCurveLengths: function () {
                    if (this.cacheLengths && this.cacheLengths.length === this.curves.length) return this.cacheLengths;
                    for (var t = [], e = 0, n = 0, i = this.curves.length; n < i; n++) e += this.curves[n].getLength(), t.push(e);
                    return this.cacheLengths = t, t
                }, getSpacedPoints: function (t) {
                    void 0 === t && (t = 40);
                    for (var e = [], n = 0; n <= t; n++) e.push(this.getPoint(n / t));
                    return this.autoClose && e.push(e[0]), e
                }, getPoints: function (t) {
                    t = t || 12;
                    for (var e, n = [], i = 0, r = this.curves; i < r.length; i++) for (var o = r[i], a = o.getPoints(o && o.isEllipseCurve ? 2 * t : o && (o.isLineCurve || o.isLineCurve3) ? 1 : o && o.isSplineCurve ? t * o.points.length : t), s = 0; s < a.length; s++) {
                        var h = a[s];
                        e && e.equals(h) || (n.push(h), e = h)
                    }
                    return this.autoClose && n.length > 1 && !n[n.length - 1].equals(n[0]) && n.push(n[0]), n
                }, copy: function (t) {
                    ws.prototype.copy.call(this, t), this.curves = [];
                    for (var e = 0, n = t.curves.length; e < n; e++) {
                        this.curves.push(t.curves[e].clone())
                    }
                    return this.autoClose = t.autoClose, this
                }, toJSON: function () {
                    var t = ws.prototype.toJSON.call(this);
                    t.autoClose = this.autoClose, t.curves = [];
                    for (var e = 0, n = this.curves.length; e < n; e++) {
                        t.curves.push(this.curves[e].toJSON())
                    }
                    return t
                }, fromJSON: function (t) {
                    ws.prototype.fromJSON.call(this, t), this.autoClose = t.autoClose, this.curves = [];
                    for (var e = 0, n = t.curves.length; e < n; e++) {
                        var i = t.curves[e];
                        this.curves.push((new Is[i.type]).fromJSON(i))
                    }
                    return this
                }
            }), Bs.prototype = Object.assign(Object.create(Fs.prototype), {
                constructor: Bs, setFromPoints: function (t) {
                    this.moveTo(t[0].x, t[0].y);
                    for (var e = 1, n = t.length; e < n; e++) this.lineTo(t[e].x, t[e].y)
                }, moveTo: function (t, e) {
                    this.currentPoint.set(t, e)
                }, lineTo: function (t, e) {
                    var n = new zs(this.currentPoint.clone(), new Ne(t, e));
                    this.curves.push(n), this.currentPoint.set(t, e)
                }, quadraticCurveTo: function (t, e, n, i) {
                    var r = new Hs(this.currentPoint.clone(), new Ne(t, e), new Ne(n, i));
                    this.curves.push(r), this.currentPoint.set(n, i)
                }, bezierCurveTo: function (t, e, n, i, r, o) {
                    var a = new Ps(this.currentPoint.clone(), new Ne(t, e), new Ne(n, i), new Ne(r, o));
                    this.curves.push(a), this.currentPoint.set(r, o)
                }, splineThru: function (t) {
                    var e = new Os([this.currentPoint.clone()].concat(t));
                    this.curves.push(e), this.currentPoint.copy(t[t.length - 1])
                }, arc: function (t, e, n, i, r, o) {
                    this.absarc(t + this.currentPoint.x, e + this.currentPoint.y, n, i, r, o)
                }, absarc: function (t, e, n, i, r, o) {
                    this.absellipse(t, e, n, n, i, r, o)
                }, ellipse: function (t, e, n, i, r, o, a, s) {
                    this.absellipse(t + this.currentPoint.x, e + this.currentPoint.y, n, i, r, o, a, s)
                }, absellipse: function (t, e, n, i, r, o, a, s) {
                    var h = new xs(t, e, n, i, r, o, a, s);
                    if (this.curves.length > 0) {
                        var c = h.getPoint(0);
                        c.equals(this.currentPoint) || this.lineTo(c.x, c.y)
                    }
                    this.curves.push(h);
                    var u = h.getPoint(1);
                    this.currentPoint.copy(u)
                }, copy: function (t) {
                    return Fs.prototype.copy.call(this, t), this.currentPoint.copy(t.currentPoint), this
                }, toJSON: function () {
                    var t = Fs.prototype.toJSON.call(this);
                    return t.currentPoint = this.currentPoint.toArray(), t
                }, fromJSON: function (t) {
                    return Fs.prototype.fromJSON.call(this, t), this.currentPoint.fromArray(t.currentPoint), this
                }
            }), ks.prototype = Object.assign(Object.create(Bs.prototype), {
                constructor: ks,
                getPointsHoles: function (t) {
                    for (var e = [], n = 0, i = this.holes.length; n < i; n++) e[n] = this.holes[n].getPoints(t);
                    return e
                },
                extractPoints: function (t) {
                    return {shape: this.getPoints(t), holes: this.getPointsHoles(t)}
                },
                copy: function (t) {
                    Bs.prototype.copy.call(this, t), this.holes = [];
                    for (var e = 0, n = t.holes.length; e < n; e++) {
                        this.holes.push(t.holes[e].clone())
                    }
                    return this
                },
                toJSON: function () {
                    var t = Bs.prototype.toJSON.call(this);
                    t.uuid = this.uuid, t.holes = [];
                    for (var e = 0, n = this.holes.length; e < n; e++) {
                        t.holes.push(this.holes[e].toJSON())
                    }
                    return t
                },
                fromJSON: function (t) {
                    Bs.prototype.fromJSON.call(this, t), this.uuid = t.uuid, this.holes = [];
                    for (var e = 0, n = t.holes.length; e < n; e++) {
                        var i = t.holes[e];
                        this.holes.push((new Bs).fromJSON(i))
                    }
                    return this
                }
            }), Vs.prototype = Object.assign(Object.create(xn.prototype), {
                constructor: Vs,
                isLight: !0,
                copy: function (t) {
                    return xn.prototype.copy.call(this, t), this.color.copy(t.color), this.intensity = t.intensity, this
                },
                toJSON: function (t) {
                    var e = xn.prototype.toJSON.call(this, t);
                    return e.object.color = this.color.getHex(), e.object.intensity = this.intensity, void 0 !== this.groundColor && (e.object.groundColor = this.groundColor.getHex()), void 0 !== this.distance && (e.object.distance = this.distance), void 0 !== this.angle && (e.object.angle = this.angle), void 0 !== this.decay && (e.object.decay = this.decay), void 0 !== this.penumbra && (e.object.penumbra = this.penumbra), void 0 !== this.shadow && (e.object.shadow = this.shadow.toJSON()), e
                }
            }), Ws.prototype = Object.assign(Object.create(Vs.prototype), {
                constructor: Ws,
                isHemisphereLight: !0,
                copy: function (t) {
                    return Vs.prototype.copy.call(this, t), this.groundColor.copy(t.groundColor), this
                }
            }), Object.assign(Ds.prototype, {
                copy: function (t) {
                    return this.camera = t.camera.clone(), this.bias = t.bias, this.radius = t.radius, this.mapSize.copy(t.mapSize), this
                }, clone: function () {
                    return (new this.constructor).copy(this)
                }, toJSON: function () {
                    var t = {};
                    return 0 !== this.bias && (t.bias = this.bias), 1 !== this.radius && (t.radius = this.radius), 512 === this.mapSize.x && 512 === this.mapSize.y || (t.mapSize = this.mapSize.toArray()), t.camera = this.camera.toJSON(!1).object, delete t.camera.matrix, t
                }
            }), Xs.prototype = Object.assign(Object.create(Ds.prototype), {
                constructor: Xs,
                isSpotLightShadow: !0,
                update: function (t) {
                    var e = this.camera, n = 2 * Pe.RAD2DEG * t.angle, i = this.mapSize.width / this.mapSize.height,
                        r = t.distance || e.far;
                    n === e.fov && i === e.aspect && r === e.far || (e.fov = n, e.aspect = i, e.far = r, e.updateProjectionMatrix())
                }
            }), Ys.prototype = Object.assign(Object.create(Vs.prototype), {
                constructor: Ys,
                isSpotLight: !0,
                copy: function (t) {
                    return Vs.prototype.copy.call(this, t), this.distance = t.distance, this.angle = t.angle, this.penumbra = t.penumbra, this.decay = t.decay, this.target = t.target.clone(), this.shadow = t.shadow.clone(), this
                }
            }), Zs.prototype = Object.assign(Object.create(Vs.prototype), {
                constructor: Zs,
                isPointLight: !0,
                copy: function (t) {
                    return Vs.prototype.copy.call(this, t), this.distance = t.distance, this.decay = t.decay, this.shadow = t.shadow.clone(), this
                }
            }), Js.prototype = Object.assign(Object.create(Br.prototype), {
                constructor: Js, isOrthographicCamera: !0, copy: function (t, e) {
                    return Br.prototype.copy.call(this, t, e), this.left = t.left, this.right = t.right, this.top = t.top, this.bottom = t.bottom, this.near = t.near, this.far = t.far, this.zoom = t.zoom, this.view = null === t.view ? null : Object.assign({}, t.view), this
                }, setViewOffset: function (t, e, n, i, r, o) {
                    null === this.view && (this.view = {
                        enabled: !0,
                        fullWidth: 1,
                        fullHeight: 1,
                        offsetX: 0,
                        offsetY: 0,
                        width: 1,
                        height: 1
                    }), this.view.enabled = !0, this.view.fullWidth = t, this.view.fullHeight = e, this.view.offsetX = n, this.view.offsetY = i, this.view.width = r, this.view.height = o, this.updateProjectionMatrix()
                }, clearViewOffset: function () {
                    null !== this.view && (this.view.enabled = !1), this.updateProjectionMatrix()
                }, updateProjectionMatrix: function () {
                    var t = (this.right - this.left) / (2 * this.zoom), e = (this.top - this.bottom) / (2 * this.zoom),
                        n = (this.right + this.left) / 2, i = (this.top + this.bottom) / 2, r = n - t, o = n + t,
                        a = i + e, s = i - e;
                    if (null !== this.view && this.view.enabled) {
                        var h = this.zoom / (this.view.width / this.view.fullWidth),
                            c = this.zoom / (this.view.height / this.view.fullHeight),
                            u = (this.right - this.left) / this.view.width,
                            l = (this.top - this.bottom) / this.view.height;
                        o = (r += u * (this.view.offsetX / h)) + u * (this.view.width / h), s = (a -= l * (this.view.offsetY / c)) - l * (this.view.height / c)
                    }
                    this.projectionMatrix.makeOrthographic(r, o, a, s, this.near, this.far), this.projectionMatrixInverse.getInverse(this.projectionMatrix)
                }, toJSON: function (t) {
                    var e = xn.prototype.toJSON.call(this, t);
                    return e.object.zoom = this.zoom, e.object.left = this.left, e.object.right = this.right, e.object.top = this.top, e.object.bottom = this.bottom, e.object.near = this.near, e.object.far = this.far, null !== this.view && (e.object.view = Object.assign({}, this.view)), e
                }
            }), Qs.prototype = Object.assign(Object.create(Ds.prototype), {constructor: Qs}), Ks.prototype = Object.assign(Object.create(Vs.prototype), {
                constructor: Ks,
                isDirectionalLight: !0,
                copy: function (t) {
                    return Vs.prototype.copy.call(this, t), this.target = t.target.clone(), this.shadow = t.shadow.clone(), this
                }
            }), qs.prototype = Object.assign(Object.create(Vs.prototype), {
                constructor: qs,
                isAmbientLight: !0
            }), $s.prototype = Object.assign(Object.create(Vs.prototype), {
                constructor: $s,
                isRectAreaLight: !0,
                copy: function (t) {
                    return Vs.prototype.copy.call(this, t), this.width = t.width, this.height = t.height, this
                },
                toJSON: function (t) {
                    var e = Vs.prototype.toJSON.call(this, t);
                    return e.object.width = this.width, e.object.height = this.height, e
                }
            }), Object.assign(js.prototype, {
                load: function (t, e, n, i) {
                    var r = this, o = new fs(r.manager);
                    o.setPath(r.path), o.load(t, function (t) {
                        e(r.parse(JSON.parse(t)))
                    }, n, i)
                }, parse: function (t) {
                    var e = this.textures;

                    function n(t) {
                        return void 0 === e[t] && console.warn("THREE.MaterialLoader: Undefined texture", t), e[t]
                    }

                    var i = new Ya[t.type];
                    if (void 0 !== t.uuid && (i.uuid = t.uuid), void 0 !== t.name && (i.name = t.name), void 0 !== t.color && i.color.setHex(t.color), void 0 !== t.roughness && (i.roughness = t.roughness), void 0 !== t.metalness && (i.metalness = t.metalness), void 0 !== t.emissive && i.emissive.setHex(t.emissive), void 0 !== t.specular && i.specular.setHex(t.specular), void 0 !== t.shininess && (i.shininess = t.shininess), void 0 !== t.clearCoat && (i.clearCoat = t.clearCoat), void 0 !== t.clearCoatRoughness && (i.clearCoatRoughness = t.clearCoatRoughness), void 0 !== t.vertexColors && (i.vertexColors = t.vertexColors), void 0 !== t.fog && (i.fog = t.fog), void 0 !== t.flatShading && (i.flatShading = t.flatShading), void 0 !== t.blending && (i.blending = t.blending), void 0 !== t.combine && (i.combine = t.combine), void 0 !== t.side && (i.side = t.side), void 0 !== t.opacity && (i.opacity = t.opacity), void 0 !== t.transparent && (i.transparent = t.transparent), void 0 !== t.alphaTest && (i.alphaTest = t.alphaTest), void 0 !== t.depthTest && (i.depthTest = t.depthTest), void 0 !== t.depthWrite && (i.depthWrite = t.depthWrite), void 0 !== t.colorWrite && (i.colorWrite = t.colorWrite), void 0 !== t.wireframe && (i.wireframe = t.wireframe), void 0 !== t.wireframeLinewidth && (i.wireframeLinewidth = t.wireframeLinewidth), void 0 !== t.wireframeLinecap && (i.wireframeLinecap = t.wireframeLinecap), void 0 !== t.wireframeLinejoin && (i.wireframeLinejoin = t.wireframeLinejoin), void 0 !== t.rotation && (i.rotation = t.rotation), 1 !== t.linewidth && (i.linewidth = t.linewidth), void 0 !== t.dashSize && (i.dashSize = t.dashSize), void 0 !== t.gapSize && (i.gapSize = t.gapSize), void 0 !== t.scale && (i.scale = t.scale), void 0 !== t.polygonOffset && (i.polygonOffset = t.polygonOffset), void 0 !== t.polygonOffsetFactor && (i.polygonOffsetFactor = t.polygonOffsetFactor), void 0 !== t.polygonOffsetUnits && (i.polygonOffsetUnits = t.polygonOffsetUnits), void 0 !== t.skinning && (i.skinning = t.skinning), void 0 !== t.morphTargets && (i.morphTargets = t.morphTargets), void 0 !== t.dithering && (i.dithering = t.dithering), void 0 !== t.visible && (i.visible = t.visible), void 0 !== t.userData && (i.userData = t.userData), void 0 !== t.uniforms) for (var r in t.uniforms) {
                        var o = t.uniforms[r];
                        switch (i.uniforms[r] = {}, o.type) {
                            case"t":
                                i.uniforms[r].value = n(o.value);
                                break;
                            case"c":
                                i.uniforms[r].value = (new an).setHex(o.value);
                                break;
                            case"v2":
                                i.uniforms[r].value = (new Ne).fromArray(o.value);
                                break;
                            case"v3":
                                i.uniforms[r].value = (new He).fromArray(o.value);
                                break;
                            case"v4":
                                i.uniforms[r].value = (new Xe).fromArray(o.value);
                                break;
                            case"m4":
                                i.uniforms[r].value = (new ze).fromArray(o.value);
                                break;
                            default:
                                i.uniforms[r].value = o.value
                        }
                    }
                    if (void 0 !== t.defines && (i.defines = t.defines), void 0 !== t.vertexShader && (i.vertexShader = t.vertexShader), void 0 !== t.fragmentShader && (i.fragmentShader = t.fragmentShader), void 0 !== t.shading && (i.flatShading = 1 === t.shading), void 0 !== t.size && (i.size = t.size), void 0 !== t.sizeAttenuation && (i.sizeAttenuation = t.sizeAttenuation), void 0 !== t.map && (i.map = n(t.map)), void 0 !== t.alphaMap && (i.alphaMap = n(t.alphaMap), i.transparent = !0), void 0 !== t.bumpMap && (i.bumpMap = n(t.bumpMap)), void 0 !== t.bumpScale && (i.bumpScale = t.bumpScale), void 0 !== t.normalMap && (i.normalMap = n(t.normalMap)), void 0 !== t.normalMapType && (i.normalMapType = t.normalMapType), void 0 !== t.normalScale) {
                        var a = t.normalScale;
                        !1 === Array.isArray(a) && (a = [a, a]), i.normalScale = (new Ne).fromArray(a)
                    }
                    return void 0 !== t.displacementMap && (i.displacementMap = n(t.displacementMap)), void 0 !== t.displacementScale && (i.displacementScale = t.displacementScale), void 0 !== t.displacementBias && (i.displacementBias = t.displacementBias), void 0 !== t.roughnessMap && (i.roughnessMap = n(t.roughnessMap)), void 0 !== t.metalnessMap && (i.metalnessMap = n(t.metalnessMap)), void 0 !== t.emissiveMap && (i.emissiveMap = n(t.emissiveMap)), void 0 !== t.emissiveIntensity && (i.emissiveIntensity = t.emissiveIntensity), void 0 !== t.specularMap && (i.specularMap = n(t.specularMap)), void 0 !== t.envMap && (i.envMap = n(t.envMap)), void 0 !== t.envMapIntensity && (i.envMapIntensity = t.envMapIntensity), void 0 !== t.reflectivity && (i.reflectivity = t.reflectivity), void 0 !== t.lightMap && (i.lightMap = n(t.lightMap)), void 0 !== t.lightMapIntensity && (i.lightMapIntensity = t.lightMapIntensity), void 0 !== t.aoMap && (i.aoMap = n(t.aoMap)), void 0 !== t.aoMapIntensity && (i.aoMapIntensity = t.aoMapIntensity), void 0 !== t.gradientMap && (i.gradientMap = n(t.gradientMap)), i
                }, setPath: function (t) {
                    return this.path = t, this
                }, setTextures: function (t) {
                    return this.textures = t, this
                }
            });
            var th = {
                decodeText: function (t) {
                    if ("undefined" != typeof TextDecoder) return (new TextDecoder).decode(t);
                    for (var e = "", n = 0, i = t.length; n < i; n++) e += String.fromCharCode(t[n]);
                    return decodeURIComponent(escape(e))
                }, extractUrlBase: function (t) {
                    var e = t.lastIndexOf("/");
                    return -1 === e ? "./" : t.substr(0, e + 1)
                }
            };

            function eh(t) {
                this.manager = void 0 !== t ? t : us
            }

            Object.assign(eh.prototype, {
                load: function (t, e, n, i) {
                    var r = this, o = new fs(r.manager);
                    o.setPath(r.path), o.load(t, function (t) {
                        e(r.parse(JSON.parse(t)))
                    }, n, i)
                }, parse: function (t) {
                    var e = new In, n = t.data.index;
                    if (void 0 !== n) {
                        var i = new ah[n.type](n.array);
                        e.setIndex(new bn(i, 1))
                    }
                    var r = t.data.attributes;
                    for (var o in r) {
                        var a = r[o];
                        i = new ah[a.type](a.array);
                        e.addAttribute(o, new bn(i, a.itemSize, a.normalized))
                    }
                    var s = t.data.groups || t.data.drawcalls || t.data.offsets;
                    if (void 0 !== s) for (var h = 0, c = s.length; h !== c; ++h) {
                        var u = s[h];
                        e.addGroup(u.start, u.count, u.materialIndex)
                    }
                    var l = t.data.boundingSphere;
                    if (void 0 !== l) {
                        var f = new He;
                        void 0 !== l.center && f.fromArray(l.center), e.boundingSphere = new Ke(f, l.radius)
                    }
                    return e
                }, setPath: function (t) {
                    return this.path = t, this
                }
            });
            var nh, ih, rh, oh, ah = {
                Int8Array: Int8Array,
                Uint8Array: Uint8Array,
                Uint8ClampedArray: "undefined" != typeof Uint8ClampedArray ? Uint8ClampedArray : Uint8Array,
                Int16Array: Int16Array,
                Uint16Array: Uint16Array,
                Int32Array: Int32Array,
                Uint32Array: Uint32Array,
                Float32Array: Float32Array,
                Float64Array: Float64Array
            };

            function sh() {
            }

            function hh(t) {
                "boolean" == typeof t && (console.warn("THREE.JSONLoader: showStatus parameter has been removed from constructor."), t = void 0), this.manager = void 0 !== t ? t : us, this.withCredentials = !1
            }

            function ch(t) {
                this.manager = void 0 !== t ? t : us, this.resourcePath = ""
            }

            sh.Handlers = {
                handlers: [], add: function (t, e) {
                    this.handlers.push(t, e)
                }, get: function (t) {
                    for (var e = this.handlers, n = 0, i = e.length; n < i; n += 2) {
                        var r = e[n + 1];
                        if (e[n].test(t)) return r
                    }
                    return null
                }
            }, Object.assign(sh.prototype, {
                crossOrigin: "anonymous",
                onLoadStart: function () {
                },
                onLoadProgress: function () {
                },
                onLoadComplete: function () {
                },
                initMaterials: function (t, e, n) {
                    for (var i = [], r = 0; r < t.length; ++r) i[r] = this.createMaterial(t[r], e, n);
                    return i
                },
                createMaterial: (nh = {
                    NoBlending: b,
                    NormalBlending: T,
                    AdditiveBlending: L,
                    SubtractiveBlending: C,
                    MultiplyBlending: R,
                    CustomBlending: A
                }, ih = new an, rh = new ys, oh = new js, function (t, e, n) {
                    var i = {};

                    function r(t, r, o, a, s) {
                        var h, c = e + t, u = sh.Handlers.get(c);
                        null !== u ? h = u.load(c) : (rh.setCrossOrigin(n), h = rh.load(c)), void 0 !== r && (h.repeat.fromArray(r), 1 !== r[0] && (h.wrapS = vt), 1 !== r[1] && (h.wrapT = vt)), void 0 !== o && h.offset.fromArray(o), void 0 !== a && ("repeat" === a[0] && (h.wrapS = vt), "mirror" === a[0] && (h.wrapS = yt), "repeat" === a[1] && (h.wrapT = vt), "mirror" === a[1] && (h.wrapT = yt)), void 0 !== s && (h.anisotropy = s);
                        var l = Pe.generateUUID();
                        return i[l] = h, l
                    }

                    var o = {uuid: Pe.generateUUID(), type: "MeshLambertMaterial"};
                    for (var a in t) {
                        var s = t[a];
                        switch (a) {
                            case"DbgColor":
                            case"DbgIndex":
                            case"opticalDensity":
                            case"illumination":
                                break;
                            case"DbgName":
                                o.name = s;
                                break;
                            case"blending":
                                o.blending = nh[s];
                                break;
                            case"colorAmbient":
                            case"mapAmbient":
                                console.warn("THREE.Loader.createMaterial:", a, "is no longer supported.");
                                break;
                            case"colorDiffuse":
                                o.color = ih.fromArray(s).getHex();
                                break;
                            case"colorSpecular":
                                o.specular = ih.fromArray(s).getHex();
                                break;
                            case"colorEmissive":
                                o.emissive = ih.fromArray(s).getHex();
                                break;
                            case"specularCoef":
                                o.shininess = s;
                                break;
                            case"shading":
                                "basic" === s.toLowerCase() && (o.type = "MeshBasicMaterial"), "phong" === s.toLowerCase() && (o.type = "MeshPhongMaterial"), "standard" === s.toLowerCase() && (o.type = "MeshStandardMaterial");
                                break;
                            case"mapDiffuse":
                                o.map = r(s, t.mapDiffuseRepeat, t.mapDiffuseOffset, t.mapDiffuseWrap, t.mapDiffuseAnisotropy);
                                break;
                            case"mapDiffuseRepeat":
                            case"mapDiffuseOffset":
                            case"mapDiffuseWrap":
                            case"mapDiffuseAnisotropy":
                                break;
                            case"mapEmissive":
                                o.emissiveMap = r(s, t.mapEmissiveRepeat, t.mapEmissiveOffset, t.mapEmissiveWrap, t.mapEmissiveAnisotropy);
                                break;
                            case"mapEmissiveRepeat":
                            case"mapEmissiveOffset":
                            case"mapEmissiveWrap":
                            case"mapEmissiveAnisotropy":
                                break;
                            case"mapLight":
                                o.lightMap = r(s, t.mapLightRepeat, t.mapLightOffset, t.mapLightWrap, t.mapLightAnisotropy);
                                break;
                            case"mapLightRepeat":
                            case"mapLightOffset":
                            case"mapLightWrap":
                            case"mapLightAnisotropy":
                                break;
                            case"mapAO":
                                o.aoMap = r(s, t.mapAORepeat, t.mapAOOffset, t.mapAOWrap, t.mapAOAnisotropy);
                                break;
                            case"mapAORepeat":
                            case"mapAOOffset":
                            case"mapAOWrap":
                            case"mapAOAnisotropy":
                                break;
                            case"mapBump":
                                o.bumpMap = r(s, t.mapBumpRepeat, t.mapBumpOffset, t.mapBumpWrap, t.mapBumpAnisotropy);
                                break;
                            case"mapBumpScale":
                                o.bumpScale = s;
                                break;
                            case"mapBumpRepeat":
                            case"mapBumpOffset":
                            case"mapBumpWrap":
                            case"mapBumpAnisotropy":
                                break;
                            case"mapNormal":
                                o.normalMap = r(s, t.mapNormalRepeat, t.mapNormalOffset, t.mapNormalWrap, t.mapNormalAnisotropy);
                                break;
                            case"mapNormalFactor":
                                o.normalScale = s;
                                break;
                            case"mapNormalRepeat":
                            case"mapNormalOffset":
                            case"mapNormalWrap":
                            case"mapNormalAnisotropy":
                                break;
                            case"mapSpecular":
                                o.specularMap = r(s, t.mapSpecularRepeat, t.mapSpecularOffset, t.mapSpecularWrap, t.mapSpecularAnisotropy);
                                break;
                            case"mapSpecularRepeat":
                            case"mapSpecularOffset":
                            case"mapSpecularWrap":
                            case"mapSpecularAnisotropy":
                                break;
                            case"mapMetalness":
                                o.metalnessMap = r(s, t.mapMetalnessRepeat, t.mapMetalnessOffset, t.mapMetalnessWrap, t.mapMetalnessAnisotropy);
                                break;
                            case"mapMetalnessRepeat":
                            case"mapMetalnessOffset":
                            case"mapMetalnessWrap":
                            case"mapMetalnessAnisotropy":
                                break;
                            case"mapRoughness":
                                o.roughnessMap = r(s, t.mapRoughnessRepeat, t.mapRoughnessOffset, t.mapRoughnessWrap, t.mapRoughnessAnisotropy);
                                break;
                            case"mapRoughnessRepeat":
                            case"mapRoughnessOffset":
                            case"mapRoughnessWrap":
                            case"mapRoughnessAnisotropy":
                                break;
                            case"mapAlpha":
                                o.alphaMap = r(s, t.mapAlphaRepeat, t.mapAlphaOffset, t.mapAlphaWrap, t.mapAlphaAnisotropy);
                                break;
                            case"mapAlphaRepeat":
                            case"mapAlphaOffset":
                            case"mapAlphaWrap":
                            case"mapAlphaAnisotropy":
                                break;
                            case"flipSided":
                                o.side = x;
                                break;
                            case"doubleSided":
                                o.side = M;
                                break;
                            case"transparency":
                                console.warn("THREE.Loader.createMaterial: transparency has been renamed to opacity"), o.opacity = s;
                                break;
                            case"depthTest":
                            case"depthWrite":
                            case"colorWrite":
                            case"opacity":
                            case"reflectivity":
                            case"transparent":
                            case"visible":
                            case"wireframe":
                                o[a] = s;
                                break;
                            case"vertexColors":
                                !0 === s && (o.vertexColors = S), "face" === s && (o.vertexColors = E);
                                break;
                            default:
                                console.error("THREE.Loader.createMaterial: Unsupported", a, s)
                        }
                    }
                    return "MeshBasicMaterial" === o.type && delete o.emissive, "MeshPhongMaterial" !== o.type && delete o.specular, o.opacity < 1 && (o.transparent = !0), oh.setTextures(i), oh.parse(o)
                })
            }), Object.assign(hh.prototype, {
                crossOrigin: "anonymous", load: function (t, e, n, i) {
                    var r = this, o = void 0 === this.path ? th.extractUrlBase(t) : this.path, a = new fs(this.manager);
                    a.setPath(this.path), a.setWithCredentials(this.withCredentials), a.load(t, function (n) {
                        var i = JSON.parse(n), a = i.metadata;
                        if (void 0 !== a) {
                            var s = a.type;
                            if (void 0 !== s && "object" === s.toLowerCase()) return void console.error("THREE.JSONLoader: " + t + " should be loaded with THREE.ObjectLoader instead.")
                        }
                        var h = r.parse(i, o);
                        e(h.geometry, h.materials)
                    }, n, i)
                }, setPath: function (t) {
                    return this.path = t, this
                }, setResourcePath: function (t) {
                    return this.resourcePath = t, this
                }, setCrossOrigin: function (t) {
                    return this.crossOrigin = t, this
                }, parse: function () {
                    return function (t, e) {
                        void 0 !== t.data && (t = t.data), t.scale = void 0 !== t.scale ? 1 / t.scale : 1;
                        var n = new Sn;
                        return function (t, e) {
                            function n(t, e) {
                                return t & 1 << e
                            }

                            var i, r, o, a, s, h, c, u, l, f, p, d, m, v, g, y, w, x, M, _, E, S, b, T, L, C = t.faces,
                                R = t.vertices, A = t.normals, P = t.colors, N = t.scale, z = 0;
                            if (void 0 !== t.uvs) {
                                for (i = 0; i < t.uvs.length; i++) t.uvs[i].length && z++;
                                for (i = 0; i < z; i++) e.faceVertexUvs[i] = []
                            }
                            for (a = 0, s = R.length; a < s;) (x = new He).x = R[a++] * N, x.y = R[a++] * N, x.z = R[a++] * N, e.vertices.push(x);
                            for (a = 0, s = C.length; a < s;) if (p = n(f = C[a++], 0), d = n(f, 1), m = n(f, 3), v = n(f, 4), g = n(f, 5), y = n(f, 6), w = n(f, 7), p) {
                                if ((_ = new fn).a = C[a], _.b = C[a + 1], _.c = C[a + 3], (E = new fn).a = C[a + 1], E.b = C[a + 2], E.c = C[a + 3], a += 4, d && (l = C[a++], _.materialIndex = l, E.materialIndex = l), o = e.faces.length, m) for (i = 0; i < z; i++) for (T = t.uvs[i], e.faceVertexUvs[i][o] = [], e.faceVertexUvs[i][o + 1] = [], r = 0; r < 4; r++) L = new Ne(T[2 * (u = C[a++])], T[2 * u + 1]), 2 !== r && e.faceVertexUvs[i][o].push(L), 0 !== r && e.faceVertexUvs[i][o + 1].push(L);
                                if (v && (c = 3 * C[a++], _.normal.set(A[c++], A[c++], A[c]), E.normal.copy(_.normal)), g) for (i = 0; i < 4; i++) c = 3 * C[a++], b = new He(A[c++], A[c++], A[c]), 2 !== i && _.vertexNormals.push(b), 0 !== i && E.vertexNormals.push(b);
                                if (y && (h = C[a++], _.color.setHex(S = P[h]), E.color.setHex(S)), w) for (i = 0; i < 4; i++) S = P[h = C[a++]], 2 !== i && _.vertexColors.push(new an(S)), 0 !== i && E.vertexColors.push(new an(S));
                                e.faces.push(_), e.faces.push(E)
                            } else {
                                if ((M = new fn).a = C[a++], M.b = C[a++], M.c = C[a++], d && (l = C[a++], M.materialIndex = l), o = e.faces.length, m) for (i = 0; i < z; i++) for (T = t.uvs[i], e.faceVertexUvs[i][o] = [], r = 0; r < 3; r++) L = new Ne(T[2 * (u = C[a++])], T[2 * u + 1]), e.faceVertexUvs[i][o].push(L);
                                if (v && (c = 3 * C[a++], M.normal.set(A[c++], A[c++], A[c])), g) for (i = 0; i < 3; i++) c = 3 * C[a++], b = new He(A[c++], A[c++], A[c]), M.vertexNormals.push(b);
                                if (y && (h = C[a++], M.color.setHex(P[h])), w) for (i = 0; i < 3; i++) h = C[a++], M.vertexColors.push(new an(P[h]));
                                e.faces.push(M)
                            }
                        }(t, n), function (t, e) {
                            var n = void 0 !== t.influencesPerVertex ? t.influencesPerVertex : 2;
                            if (t.skinWeights) for (var i = 0, r = t.skinWeights.length; i < r; i += n) e.skinWeights.push(new Xe(t.skinWeights[i], n > 1 ? t.skinWeights[i + 1] : 0, n > 2 ? t.skinWeights[i + 2] : 0, n > 3 ? t.skinWeights[i + 3] : 0));
                            if (t.skinIndices) for (i = 0, r = t.skinIndices.length; i < r; i += n) e.skinIndices.push(new Xe(t.skinIndices[i], n > 1 ? t.skinIndices[i + 1] : 0, n > 2 ? t.skinIndices[i + 2] : 0, n > 3 ? t.skinIndices[i + 3] : 0));
                            e.bones = t.bones, e.bones && e.bones.length > 0 && (e.skinWeights.length !== e.skinIndices.length || e.skinIndices.length !== e.vertices.length) && console.warn("When skinning, number of vertices (" + e.vertices.length + "), skinIndices (" + e.skinIndices.length + "), and skinWeights (" + e.skinWeights.length + ") should match.")
                        }(t, n), function (t, e) {
                            var n = t.scale;
                            if (void 0 !== t.morphTargets) for (var i = 0, r = t.morphTargets.length; i < r; i++) {
                                e.morphTargets[i] = {}, e.morphTargets[i].name = t.morphTargets[i].name, e.morphTargets[i].vertices = [];
                                for (var o = e.morphTargets[i].vertices, a = t.morphTargets[i].vertices, s = 0, h = a.length; s < h; s += 3) {
                                    var c = new He;
                                    c.x = a[s] * n, c.y = a[s + 1] * n, c.z = a[s + 2] * n, o.push(c)
                                }
                            }
                            if (void 0 !== t.morphColors && t.morphColors.length > 0) {
                                console.warn('THREE.JSONLoader: "morphColors" no longer supported. Using them as face colors.');
                                var u = e.faces, l = t.morphColors[0].colors;
                                for (i = 0, r = u.length; i < r; i++) u[i].color.fromArray(l, 3 * i)
                            }
                        }(t, n), function (t, e) {
                            var n = [], i = [];
                            void 0 !== t.animation && i.push(t.animation), void 0 !== t.animations && (t.animations.length ? i = i.concat(t.animations) : i.push(t.animations));
                            for (var r = 0; r < i.length; r++) {
                                var o = as.parseAnimation(i[r], e.bones);
                                o && n.push(o)
                            }
                            if (e.morphTargets) {
                                var a = as.CreateClipsFromMorphTargetSequences(e.morphTargets, 10);
                                n = n.concat(a)
                            }
                            n.length > 0 && (e.animations = n)
                        }(t, n), n.computeFaceNormals(), n.computeBoundingSphere(), void 0 === t.materials || 0 === t.materials.length ? {geometry: n} : {
                            geometry: n,
                            materials: sh.prototype.initMaterials(t.materials, this.resourcePath || e, this.crossOrigin)
                        }
                    }
                }()
            }), Object.assign(ch.prototype, {
                crossOrigin: "anonymous", load: function (t, e, n, i) {
                    var r = this, o = void 0 === this.path ? th.extractUrlBase(t) : this.path;
                    this.resourcePath = this.resourcePath || o;
                    var a = new fs(r.manager);
                    a.setPath(this.path), a.load(t, function (n) {
                        var o = null;
                        try {
                            o = JSON.parse(n)
                        } catch (e) {
                            return void 0 !== i && i(e), void console.error("THREE:ObjectLoader: Can't parse " + t + ".", e.message)
                        }
                        var a = o.metadata;
                        void 0 !== a && void 0 !== a.type && "geometry" !== a.type.toLowerCase() ? r.parse(o, e) : console.error("THREE.ObjectLoader: Can't load " + t + ". Use THREE.JSONLoader instead.")
                    }, n, i)
                }, setPath: function (t) {
                    return this.path = t, this
                }, setResourcePath: function (t) {
                    return this.resourcePath = t, this
                }, setCrossOrigin: function (t) {
                    return this.crossOrigin = t, this
                }, parse: function (t, e) {
                    var n = this.parseShape(t.shapes), i = this.parseGeometries(t.geometries, n),
                        r = this.parseImages(t.images, function () {
                            void 0 !== e && e(s)
                        }), o = this.parseTextures(t.textures, r), a = this.parseMaterials(t.materials, o),
                        s = this.parseObject(t.object, i, a);
                    return t.animations && (s.animations = this.parseAnimations(t.animations)), void 0 !== t.images && 0 !== t.images.length || void 0 !== e && e(s), s
                }, parseShape: function (t) {
                    var e = {};
                    if (void 0 !== t) for (var n = 0, i = t.length; n < i; n++) {
                        var r = (new ks).fromJSON(t[n]);
                        e[r.uuid] = r
                    }
                    return e
                }, parseGeometries: function (t, e) {
                    var n = {};
                    if (void 0 !== t) for (var i = new hh, r = new eh, o = 0, a = t.length; o < a; o++) {
                        var s, h = t[o];
                        switch (h.type) {
                            case"PlaneGeometry":
                            case"PlaneBufferGeometry":
                                s = new Ha[h.type](h.width, h.height, h.widthSegments, h.heightSegments);
                                break;
                            case"BoxGeometry":
                            case"BoxBufferGeometry":
                            case"CubeGeometry":
                                s = new Ha[h.type](h.width, h.height, h.depth, h.widthSegments, h.heightSegments, h.depthSegments);
                                break;
                            case"CircleGeometry":
                            case"CircleBufferGeometry":
                                s = new Ha[h.type](h.radius, h.segments, h.thetaStart, h.thetaLength);
                                break;
                            case"CylinderGeometry":
                            case"CylinderBufferGeometry":
                                s = new Ha[h.type](h.radiusTop, h.radiusBottom, h.height, h.radialSegments, h.heightSegments, h.openEnded, h.thetaStart, h.thetaLength);
                                break;
                            case"ConeGeometry":
                            case"ConeBufferGeometry":
                                s = new Ha[h.type](h.radius, h.height, h.radialSegments, h.heightSegments, h.openEnded, h.thetaStart, h.thetaLength);
                                break;
                            case"SphereGeometry":
                            case"SphereBufferGeometry":
                                s = new Ha[h.type](h.radius, h.widthSegments, h.heightSegments, h.phiStart, h.phiLength, h.thetaStart, h.thetaLength);
                                break;
                            case"DodecahedronGeometry":
                            case"DodecahedronBufferGeometry":
                            case"IcosahedronGeometry":
                            case"IcosahedronBufferGeometry":
                            case"OctahedronGeometry":
                            case"OctahedronBufferGeometry":
                            case"TetrahedronGeometry":
                            case"TetrahedronBufferGeometry":
                                s = new Ha[h.type](h.radius, h.detail);
                                break;
                            case"RingGeometry":
                            case"RingBufferGeometry":
                                s = new Ha[h.type](h.innerRadius, h.outerRadius, h.thetaSegments, h.phiSegments, h.thetaStart, h.thetaLength);
                                break;
                            case"TorusGeometry":
                            case"TorusBufferGeometry":
                                s = new Ha[h.type](h.radius, h.tube, h.radialSegments, h.tubularSegments, h.arc);
                                break;
                            case"TorusKnotGeometry":
                            case"TorusKnotBufferGeometry":
                                s = new Ha[h.type](h.radius, h.tube, h.tubularSegments, h.radialSegments, h.p, h.q);
                                break;
                            case"LatheGeometry":
                            case"LatheBufferGeometry":
                                s = new Ha[h.type](h.points, h.segments, h.phiStart, h.phiLength);
                                break;
                            case"PolyhedronGeometry":
                            case"PolyhedronBufferGeometry":
                                s = new Ha[h.type](h.vertices, h.indices, h.radius, h.details);
                                break;
                            case"ShapeGeometry":
                            case"ShapeBufferGeometry":
                                for (var c = [], u = 0, l = h.shapes.length; u < l; u++) {
                                    c.push(e[h.shapes[u]])
                                }
                                s = new Ha[h.type](c, h.curveSegments);
                                break;
                            case"ExtrudeGeometry":
                            case"ExtrudeBufferGeometry":
                                for (c = [], u = 0, l = h.shapes.length; u < l; u++) {
                                    c.push(e[h.shapes[u]])
                                }
                                var f = h.options.extrudePath;
                                void 0 !== f && (h.options.extrudePath = (new Is[f.type]).fromJSON(f)), s = new Ha[h.type](c, h.options);
                                break;
                            case"BufferGeometry":
                                s = r.parse(h);
                                break;
                            case"Geometry":
                                s = i.parse(h, this.resourcePath).geometry;
                                break;
                            default:
                                console.warn('THREE.ObjectLoader: Unsupported geometry type "' + h.type + '"');
                                continue
                        }
                        s.uuid = h.uuid, void 0 !== h.name && (s.name = h.name), !0 === s.isBufferGeometry && void 0 !== h.userData && (s.userData = h.userData), n[h.uuid] = s
                    }
                    return n
                }, parseMaterials: function (t, e) {
                    var n = {}, i = {};
                    if (void 0 !== t) {
                        var r = new js;
                        r.setTextures(e);
                        for (var o = 0, a = t.length; o < a; o++) {
                            var s = t[o];
                            if ("MultiMaterial" === s.type) {
                                for (var h = [], c = 0; c < s.materials.length; c++) {
                                    var u = s.materials[c];
                                    void 0 === n[u.uuid] && (n[u.uuid] = r.parse(u)), h.push(n[u.uuid])
                                }
                                i[s.uuid] = h
                            } else i[s.uuid] = r.parse(s), n[s.uuid] = i[s.uuid]
                        }
                    }
                    return i
                }, parseAnimations: function (t) {
                    for (var e = [], n = 0; n < t.length; n++) {
                        var i = t[n], r = as.parse(i);
                        void 0 !== i.uuid && (r.uuid = i.uuid), e.push(r)
                    }
                    return e
                }, parseImages: function (t, e) {
                    var n = this, i = {};

                    function r(t) {
                        return n.manager.itemStart(t), o.load(t, function () {
                            n.manager.itemEnd(t)
                        }, void 0, function () {
                            n.manager.itemError(t), n.manager.itemEnd(t)
                        })
                    }

                    if (void 0 !== t && t.length > 0) {
                        var o = new vs(new cs(e));
                        o.setCrossOrigin(this.crossOrigin);
                        for (var a = 0, s = t.length; a < s; a++) {
                            var h = t[a], c = h.url;
                            if (Array.isArray(c)) {
                                i[h.uuid] = [];
                                for (var u = 0, l = c.length; u < l; u++) {
                                    var f = c[u], p = /^(\/\/)|([a-z]+:(\/\/)?)/i.test(f) ? f : n.resourcePath + f;
                                    i[h.uuid].push(r(p))
                                }
                            } else {
                                p = /^(\/\/)|([a-z]+:(\/\/)?)/i.test(h.url) ? h.url : n.resourcePath + h.url;
                                i[h.uuid] = r(p)
                            }
                        }
                    }
                    return i
                }, parseTextures: function (t, e) {
                    function n(t, e) {
                        return "number" == typeof t ? t : (console.warn("THREE.ObjectLoader.parseTexture: Constant should be in numeric form.", t), e[t])
                    }

                    var i = {};
                    if (void 0 !== t) for (var r = 0, o = t.length; r < o; r++) {
                        var a, s = t[r];
                        void 0 === s.image && console.warn('THREE.ObjectLoader: No "image" specified for', s.uuid), void 0 === e[s.image] && console.warn("THREE.ObjectLoader: Undefined image", s.image), (a = Array.isArray(e[s.image]) ? new wi(e[s.image]) : new De(e[s.image])).needsUpdate = !0, a.uuid = s.uuid, void 0 !== s.name && (a.name = s.name), void 0 !== s.mapping && (a.mapping = n(s.mapping, lh)), void 0 !== s.offset && a.offset.fromArray(s.offset), void 0 !== s.repeat && a.repeat.fromArray(s.repeat), void 0 !== s.center && a.center.fromArray(s.center), void 0 !== s.rotation && (a.rotation = s.rotation), void 0 !== s.wrap && (a.wrapS = n(s.wrap[0], fh), a.wrapT = n(s.wrap[1], fh)), void 0 !== s.format && (a.format = s.format), void 0 !== s.minFilter && (a.minFilter = n(s.minFilter, ph)), void 0 !== s.magFilter && (a.magFilter = n(s.magFilter, ph)), void 0 !== s.anisotropy && (a.anisotropy = s.anisotropy), void 0 !== s.flipY && (a.flipY = s.flipY), i[s.uuid] = a
                    }
                    return i
                }, parseObject: function (t, e, n) {
                    var i;

                    function r(t) {
                        return void 0 === e[t] && console.warn("THREE.ObjectLoader: Undefined geometry", t), e[t]
                    }

                    function o(t) {
                        if (void 0 !== t) {
                            if (Array.isArray(t)) {
                                for (var e = [], i = 0, r = t.length; i < r; i++) {
                                    var o = t[i];
                                    void 0 === n[o] && console.warn("THREE.ObjectLoader: Undefined material", o), e.push(n[o])
                                }
                                return e
                            }
                            return void 0 === n[t] && console.warn("THREE.ObjectLoader: Undefined material", t), n[t]
                        }
                    }

                    switch (t.type) {
                        case"Scene":
                            i = new io, void 0 !== t.background && Number.isInteger(t.background) && (i.background = new an(t.background)), void 0 !== t.fog && ("Fog" === t.fog.type ? i.fog = new no(t.fog.color, t.fog.near, t.fog.far) : "FogExp2" === t.fog.type && (i.fog = new eo(t.fog.color, t.fog.density)));
                            break;
                        case"PerspectiveCamera":
                            i = new kr(t.fov, t.aspect, t.near, t.far), void 0 !== t.focus && (i.focus = t.focus), void 0 !== t.zoom && (i.zoom = t.zoom), void 0 !== t.filmGauge && (i.filmGauge = t.filmGauge), void 0 !== t.filmOffset && (i.filmOffset = t.filmOffset), void 0 !== t.view && (i.view = Object.assign({}, t.view));
                            break;
                        case"OrthographicCamera":
                            i = new Js(t.left, t.right, t.top, t.bottom, t.near, t.far), void 0 !== t.zoom && (i.zoom = t.zoom), void 0 !== t.view && (i.view = Object.assign({}, t.view));
                            break;
                        case"AmbientLight":
                            i = new qs(t.color, t.intensity);
                            break;
                        case"DirectionalLight":
                            i = new Ks(t.color, t.intensity);
                            break;
                        case"PointLight":
                            i = new Zs(t.color, t.intensity, t.distance, t.decay);
                            break;
                        case"RectAreaLight":
                            i = new $s(t.color, t.intensity, t.width, t.height);
                            break;
                        case"SpotLight":
                            i = new Ys(t.color, t.intensity, t.distance, t.angle, t.penumbra, t.decay);
                            break;
                        case"HemisphereLight":
                            i = new Ws(t.color, t.groundColor, t.intensity);
                            break;
                        case"SkinnedMesh":
                            console.warn("THREE.ObjectLoader.parseObject() does not support SkinnedMesh yet.");
                        case"Mesh":
                            var a = r(t.geometry), s = o(t.material);
                            i = a.bones && a.bones.length > 0 ? new lo(a, s) : new si(a, s);
                            break;
                        case"LOD":
                            i = new ho;
                            break;
                        case"Line":
                            i = new po(r(t.geometry), o(t.material), t.mode);
                            break;
                        case"LineLoop":
                            i = new vo(r(t.geometry), o(t.material));
                            break;
                        case"LineSegments":
                            i = new mo(r(t.geometry), o(t.material));
                            break;
                        case"PointCloud":
                        case"Points":
                            i = new yo(r(t.geometry), o(t.material));
                            break;
                        case"Sprite":
                            i = new so(o(t.material));
                            break;
                        case"Group":
                            i = new Fr;
                            break;
                        default:
                            i = new xn
                    }
                    if (i.uuid = t.uuid, void 0 !== t.name && (i.name = t.name), void 0 !== t.matrix ? (i.matrix.fromArray(t.matrix), void 0 !== t.matrixAutoUpdate && (i.matrixAutoUpdate = t.matrixAutoUpdate), i.matrixAutoUpdate && i.matrix.decompose(i.position, i.quaternion, i.scale)) : (void 0 !== t.position && i.position.fromArray(t.position), void 0 !== t.rotation && i.rotation.fromArray(t.rotation), void 0 !== t.quaternion && i.quaternion.fromArray(t.quaternion), void 0 !== t.scale && i.scale.fromArray(t.scale)), void 0 !== t.castShadow && (i.castShadow = t.castShadow), void 0 !== t.receiveShadow && (i.receiveShadow = t.receiveShadow), t.shadow && (void 0 !== t.shadow.bias && (i.shadow.bias = t.shadow.bias), void 0 !== t.shadow.radius && (i.shadow.radius = t.shadow.radius), void 0 !== t.shadow.mapSize && i.shadow.mapSize.fromArray(t.shadow.mapSize), void 0 !== t.shadow.camera && (i.shadow.camera = this.parseObject(t.shadow.camera))), void 0 !== t.visible && (i.visible = t.visible), void 0 !== t.frustumCulled && (i.frustumCulled = t.frustumCulled), void 0 !== t.renderOrder && (i.renderOrder = t.renderOrder), void 0 !== t.userData && (i.userData = t.userData), void 0 !== t.layers && (i.layers.mask = t.layers), void 0 !== t.children) for (var h = t.children, c = 0; c < h.length; c++) i.add(this.parseObject(h[c], e, n));
                    if ("LOD" === t.type) for (var u = t.levels, l = 0; l < u.length; l++) {
                        var f = u[l], p = i.getObjectByProperty("uuid", f.object);
                        void 0 !== p && i.addLevel(p, f.distance)
                    }
                    return i
                }
            });
            var uh, lh = {
                UVMapping: 300,
                CubeReflectionMapping: ct,
                CubeRefractionMapping: ut,
                EquirectangularReflectionMapping: lt,
                EquirectangularRefractionMapping: ft,
                SphericalReflectionMapping: pt,
                CubeUVReflectionMapping: dt,
                CubeUVRefractionMapping: mt
            }, fh = {RepeatWrapping: vt, ClampToEdgeWrapping: gt, MirroredRepeatWrapping: yt}, ph = {
                NearestFilter: wt,
                NearestMipMapNearestFilter: xt,
                NearestMipMapLinearFilter: Mt,
                LinearFilter: _t,
                LinearMipMapNearestFilter: Et,
                LinearMipMapLinearFilter: St
            };

            function dh(t) {
                "undefined" == typeof createImageBitmap && console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."), "undefined" == typeof fetch && console.warn("THREE.ImageBitmapLoader: fetch() not supported."), this.manager = void 0 !== t ? t : us, this.options = void 0
            }

            function mh() {
                this.type = "ShapePath", this.color = new an, this.subPaths = [], this.currentPath = null
            }

            function vh(t) {
                this.type = "Font", this.data = t
            }

            function gh(t, e, n, i, r) {
                var o = r.glyphs[t] || r.glyphs["?"];
                if (o) {
                    var a, s, h, c, u, l, f, p, d = new mh;
                    if (o.o) for (var m = o._cachedOutline || (o._cachedOutline = o.o.split(" ")), v = 0, g = m.length; v < g;) {
                        switch (m[v++]) {
                            case"m":
                                a = m[v++] * e + n, s = m[v++] * e + i, d.moveTo(a, s);
                                break;
                            case"l":
                                a = m[v++] * e + n, s = m[v++] * e + i, d.lineTo(a, s);
                                break;
                            case"q":
                                h = m[v++] * e + n, c = m[v++] * e + i, u = m[v++] * e + n, l = m[v++] * e + i, d.quadraticCurveTo(u, l, h, c);
                                break;
                            case"b":
                                h = m[v++] * e + n, c = m[v++] * e + i, u = m[v++] * e + n, l = m[v++] * e + i, f = m[v++] * e + n, p = m[v++] * e + i, d.bezierCurveTo(u, l, f, p, h, c)
                        }
                    }
                    return {offsetX: o.ha * e, path: d}
                }
            }

            function yh(t) {
                this.manager = void 0 !== t ? t : us
            }

            dh.prototype = {
                constructor: dh, setOptions: function (t) {
                    return this.options = t, this
                }, load: function (t, e, n, i) {
                    void 0 === t && (t = ""), void 0 !== this.path && (t = this.path + t), t = this.manager.resolveURL(t);
                    var r = this, o = hs.get(t);
                    if (void 0 !== o) return r.manager.itemStart(t), setTimeout(function () {
                        e && e(o), r.manager.itemEnd(t)
                    }, 0), o;
                    fetch(t).then(function (t) {
                        return t.blob()
                    }).then(function (t) {
                        return createImageBitmap(t, r.options)
                    }).then(function (n) {
                        hs.add(t, n), e && e(n), r.manager.itemEnd(t)
                    }).catch(function (e) {
                        i && i(e), r.manager.itemError(t), r.manager.itemEnd(t)
                    })
                }, setCrossOrigin: function () {
                    return this
                }, setPath: function (t) {
                    return this.path = t, this
                }
            }, Object.assign(mh.prototype, {
                moveTo: function (t, e) {
                    this.currentPath = new Bs, this.subPaths.push(this.currentPath), this.currentPath.moveTo(t, e)
                }, lineTo: function (t, e) {
                    this.currentPath.lineTo(t, e)
                }, quadraticCurveTo: function (t, e, n, i) {
                    this.currentPath.quadraticCurveTo(t, e, n, i)
                }, bezierCurveTo: function (t, e, n, i, r, o) {
                    this.currentPath.bezierCurveTo(t, e, n, i, r, o)
                }, splineThru: function (t) {
                    this.currentPath.splineThru(t)
                }, toShapes: function (t, e) {
                    function n(t) {
                        for (var e = [], n = 0, i = t.length; n < i; n++) {
                            var r = t[n], o = new ks;
                            o.curves = r.curves, e.push(o)
                        }
                        return e
                    }

                    function i(t, e) {
                        for (var n = e.length, i = !1, r = n - 1, o = 0; o < n; r = o++) {
                            var a = e[r], s = e[o], h = s.x - a.x, c = s.y - a.y;
                            if (Math.abs(c) > Number.EPSILON) {
                                if (c < 0 && (a = e[o], h = -h, s = e[r], c = -c), t.y < a.y || t.y > s.y) continue;
                                if (t.y === a.y) {
                                    if (t.x === a.x) return !0
                                } else {
                                    var u = c * (t.x - a.x) - h * (t.y - a.y);
                                    if (0 === u) return !0;
                                    if (u < 0) continue;
                                    i = !i
                                }
                            } else {
                                if (t.y !== a.y) continue;
                                if (s.x <= t.x && t.x <= a.x || a.x <= t.x && t.x <= s.x) return !0
                            }
                        }
                        return i
                    }

                    var r = ua.isClockWise, o = this.subPaths;
                    if (0 === o.length) return [];
                    if (!0 === e) return n(o);
                    var a, s, h, c = [];
                    if (1 === o.length) return s = o[0], (h = new ks).curves = s.curves, c.push(h), c;
                    var u = !r(o[0].getPoints());
                    u = t ? !u : u;
                    var l, f, p = [], d = [], m = [], v = 0;
                    d[v] = void 0, m[v] = [];
                    for (var g = 0, y = o.length; g < y; g++) a = r(l = (s = o[g]).getPoints()), (a = t ? !a : a) ? (!u && d[v] && v++, d[v] = {
                        s: new ks,
                        p: l
                    }, d[v].s.curves = s.curves, u && v++, m[v] = []) : m[v].push({h: s, p: l[0]});
                    if (!d[0]) return n(o);
                    if (d.length > 1) {
                        for (var w = !1, x = [], M = 0, _ = d.length; M < _; M++) p[M] = [];
                        for (M = 0, _ = d.length; M < _; M++) for (var E = m[M], S = 0; S < E.length; S++) {
                            for (var b = E[S], T = !0, L = 0; L < d.length; L++) i(b.p, d[L].p) && (M !== L && x.push({
                                froms: M,
                                tos: L,
                                hole: S
                            }), T ? (T = !1, p[L].push(b)) : w = !0);
                            T && p[M].push(b)
                        }
                        x.length > 0 && (w || (m = p))
                    }
                    g = 0;
                    for (var C = d.length; g < C; g++) {
                        c.push(h = d[g].s);
                        for (var R = 0, A = (f = m[g]).length; R < A; R++) h.holes.push(f[R].h)
                    }
                    return c
                }
            }), Object.assign(vh.prototype, {
                isFont: !0, generateShapes: function (t, e) {
                    void 0 === e && (e = 100);
                    for (var n = [], i = function (t, e, n) {
                        for (var i = Array.from ? Array.from(t) : String(t).split(""), r = e / n.resolution, o = (n.boundingBox.yMax - n.boundingBox.yMin + n.underlineThickness) * r, a = [], s = 0, h = 0, c = 0; c < i.length; c++) {
                            var u = i[c];
                            if ("\n" === u) s = 0, h -= o; else {
                                var l = gh(u, r, s, h, n);
                                s += l.offsetX, a.push(l.path)
                            }
                        }
                        return a
                    }(t, e, this.data), r = 0, o = i.length; r < o; r++) Array.prototype.push.apply(n, i[r].toShapes());
                    return n
                }
            }), Object.assign(yh.prototype, {
                load: function (t, e, n, i) {
                    var r = this, o = new fs(this.manager);
                    o.setPath(this.path), o.load(t, function (t) {
                        var n;
                        try {
                            n = JSON.parse(t)
                        } catch (e) {
                            console.warn("THREE.FontLoader: typeface.js support is being deprecated. Use typeface.json instead."), n = JSON.parse(t.substring(65, t.length - 2))
                        }
                        var i = r.parse(n);
                        e && e(i)
                    }, n, i)
                }, parse: function (t) {
                    return new vh(t)
                }, setPath: function (t) {
                    return this.path = t, this
                }
            });
            var wh, xh, Mh, _h, Eh, Sh, bh, Th, Lh, Ch, Rh, Ah, Ph, Nh, zh, Uh, Hh, Gh, Oh, Ih, Fh, Bh, kh, Vh, Wh,
                Dh = {
                    getContext: function () {
                        return void 0 === uh && (uh = new (window.AudioContext || window.webkitAudioContext)), uh
                    }, setContext: function (t) {
                        uh = t
                    }
                };

            function Xh(t) {
                this.manager = void 0 !== t ? t : us
            }

            function Yh() {
                this.type = "StereoCamera", this.aspect = 1, this.eyeSep = .064, this.cameraL = new kr, this.cameraL.layers.enable(1), this.cameraL.matrixAutoUpdate = !1, this.cameraR = new kr, this.cameraR.layers.enable(2), this.cameraR.matrixAutoUpdate = !1
            }

            function Zh(t, e, n, i) {
                xn.call(this), this.type = "CubeCamera";
                var r = new kr(90, 1, t, e);
                r.up.set(0, -1, 0), r.lookAt(new He(1, 0, 0)), this.add(r);
                var o = new kr(90, 1, t, e);
                o.up.set(0, -1, 0), o.lookAt(new He(-1, 0, 0)), this.add(o);
                var a = new kr(90, 1, t, e);
                a.up.set(0, 0, 1), a.lookAt(new He(0, 1, 0)), this.add(a);
                var s = new kr(90, 1, t, e);
                s.up.set(0, 0, -1), s.lookAt(new He(0, -1, 0)), this.add(s);
                var h = new kr(90, 1, t, e);
                h.up.set(0, -1, 0), h.lookAt(new He(0, 0, 1)), this.add(h);
                var c = new kr(90, 1, t, e);
                c.up.set(0, -1, 0), c.lookAt(new He(0, 0, -1)), this.add(c), this.renderTarget = new Ze(n, n, i = i || {
                    format: It,
                    magFilter: _t,
                    minFilter: _t
                }), this.renderTarget.texture.name = "CubeCamera", this.update = function (t, e) {
                    null === this.parent && this.updateMatrixWorld();
                    var n = this.renderTarget, i = n.texture.generateMipmaps;
                    n.texture.generateMipmaps = !1, n.activeCubeFace = 0, t.render(e, r, n), n.activeCubeFace = 1, t.render(e, o, n), n.activeCubeFace = 2, t.render(e, a, n), n.activeCubeFace = 3, t.render(e, s, n), n.activeCubeFace = 4, t.render(e, h, n), n.texture.generateMipmaps = i, n.activeCubeFace = 5, t.render(e, c, n), t.setRenderTarget(null)
                }, this.clear = function (t, e, n, i) {
                    for (var r = this.renderTarget, o = 0; o < 6; o++) r.activeCubeFace = o, t.setRenderTarget(r), t.clear(e, n, i);
                    t.setRenderTarget(null)
                }
            }

            function Jh(t) {
                this.autoStart = void 0 === t || t, this.startTime = 0, this.oldTime = 0, this.elapsedTime = 0, this.running = !1
            }

            function Qh() {
                xn.call(this), this.type = "AudioListener", this.context = Dh.getContext(), this.gain = this.context.createGain(), this.gain.connect(this.context.destination), this.filter = null, this.timeDelta = 0
            }

            function Kh(t) {
                xn.call(this), this.type = "Audio", this.listener = t, this.context = t.context, this.gain = this.context.createGain(), this.gain.connect(t.getInput()), this.autoplay = !1, this.buffer = null, this.loop = !1, this.startTime = 0, this.offset = 0, this.playbackRate = 1, this.isPlaying = !1, this.hasPlaybackControl = !0, this.sourceType = "empty", this.filters = []
            }

            function qh(t) {
                Kh.call(this, t), this.panner = this.context.createPanner(), this.panner.connect(this.gain)
            }

            function $h(t, e) {
                this.analyser = t.context.createAnalyser(), this.analyser.fftSize = void 0 !== e ? e : 2048, this.data = new Uint8Array(this.analyser.frequencyBinCount), t.getOutput().connect(this.analyser)
            }

            function jh(t, e, n) {
                this.binding = t, this.valueSize = n;
                var i, r = Float64Array;
                switch (e) {
                    case"quaternion":
                        i = this._slerp;
                        break;
                    case"string":
                    case"bool":
                        r = Array, i = this._select;
                        break;
                    default:
                        i = this._lerp
                }
                this.buffer = new r(4 * n), this._mixBufferRegion = i, this.cumulativeWeight = 0, this.useCount = 0, this.referenceCount = 0
            }

            function tc(t, e, n) {
                var i = n || ec.parseTrackName(e);
                this._targetGroup = t, this._bindings = t.subscribe_(e, i)
            }

            function ec(t, e, n) {
                this.path = e, this.parsedPath = n || ec.parseTrackName(e), this.node = ec.findNode(t, this.parsedPath.nodeName) || t, this.rootNode = t
            }

            function nc() {
                this.uuid = Pe.generateUUID(), this._objects = Array.prototype.slice.call(arguments), this.nCachedObjects_ = 0;
                var t = {};
                this._indicesByUUID = t;
                for (var e = 0, n = arguments.length; e !== n; ++e) t[arguments[e].uuid] = e;
                this._paths = [], this._parsedPaths = [], this._bindings = [], this._bindingsIndicesByPath = {};
                var i = this;
                this.stats = {
                    objects: {
                        get total() {
                            return i._objects.length
                        }, get inUse() {
                            return this.total - i.nCachedObjects_
                        }
                    }, get bindingsPerObject() {
                        return i._bindings.length
                    }
                }
            }

            function ic(t, e, n) {
                this._mixer = t, this._clip = e, this._localRoot = n || null;
                for (var i = e.tracks, r = i.length, o = new Array(r), a = {
                    endingStart: ve,
                    endingEnd: ve
                }, s = 0; s !== r; ++s) {
                    var h = i[s].createInterpolant(null);
                    o[s] = h, h.settings = a
                }
                this._interpolantSettings = a, this._interpolants = o, this._propertyBindings = new Array(r), this._cacheIndex = null, this._byClipCacheIndex = null, this._timeScaleInterpolant = null, this._weightInterpolant = null, this.loop = me, this._loopCount = -1, this._startTime = null, this.time = 0, this.timeScale = 1, this._effectiveTimeScale = 1, this.weight = 1, this._effectiveWeight = 1, this.repetitions = Infinity, this.paused = !1, this.enabled = !0, this.clampWhenFinished = !1, this.zeroSlopeAtStart = !0, this.zeroSlopeAtEnd = !0
            }

            function rc(t) {
                this._root = t, this._initMemoryManager(), this._accuIndex = 0, this.time = 0, this.timeScale = 1
            }

            function oc(t) {
                "string" == typeof t && (console.warn("THREE.Uniform: Type parameter is no longer needed."), t = arguments[1]), this.value = t
            }

            function ac() {
                In.call(this), this.type = "InstancedBufferGeometry", this.maxInstancedCount = void 0
            }

            function sc(t, e, n) {
                ro.call(this, t, e), this.meshPerAttribute = n || 1
            }

            function hc(t, e, n, i) {
                "number" == typeof n && (i = n, n = !1, console.error("THREE.InstancedBufferAttribute: The constructor now expects normalized as the third argument.")), bn.call(this, t, e, n), this.meshPerAttribute = i || 1
            }

            function cc(t, e, n, i) {
                this.ray = new ri(t, e), this.near = n || 0, this.far = i || Infinity, this.params = {
                    Mesh: {},
                    Line: {},
                    LOD: {},
                    Points: {threshold: 1},
                    Sprite: {}
                }, Object.defineProperties(this.params, {
                    PointCloud: {
                        get: function () {
                            return console.warn("THREE.Raycaster: params.PointCloud has been renamed to params.Points."), this.Points
                        }
                    }
                })
            }

            function uc(t, e) {
                return t.distance - e.distance
            }

            function lc(t, e, n, i) {
                if (!1 !== t.visible && (t.raycast(e, n), !0 === i)) for (var r = t.children, o = 0, a = r.length; o < a; o++) lc(r[o], e, n, !0)
            }

            function fc(t, e, n) {
                return this.radius = void 0 !== t ? t : 1, this.phi = void 0 !== e ? e : 0, this.theta = void 0 !== n ? n : 0, this
            }

            function pc(t, e, n) {
                return this.radius = void 0 !== t ? t : 1, this.theta = void 0 !== e ? e : 0, this.y = void 0 !== n ? n : 0, this
            }

            function dc(t, e) {
                this.min = void 0 !== t ? t : new Ne(Infinity, Infinity), this.max = void 0 !== e ? e : new Ne(-Infinity, -Infinity)
            }

            function mc(t, e) {
                this.start = void 0 !== t ? t : new He, this.end = void 0 !== e ? e : new He
            }

            function vc(t) {
                xn.call(this), this.material = t, this.render = function () {
                }
            }

            function gc(t, e, n, i) {
                this.object = t, this.size = void 0 !== e ? e : 1;
                var r = void 0 !== n ? n : 16711680, o = void 0 !== i ? i : 1, a = 0, s = this.object.geometry;
                s && s.isGeometry ? a = 3 * s.faces.length : s && s.isBufferGeometry && (a = s.attributes.normal.count);
                var h = new In, c = new zn(2 * a * 3, 3);
                h.addAttribute("position", c), mo.call(this, h, new fo({
                    color: r,
                    linewidth: o
                })), this.matrixAutoUpdate = !1, this.update()
            }

            function yc(t, e) {
                xn.call(this), this.light = t, this.light.updateMatrixWorld(), this.matrix = t.matrixWorld, this.matrixAutoUpdate = !1, this.color = e;
                for (var n = new In, i = [0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, -1, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, -1, 1], r = 0, o = 1; r < 32; r++, o++) {
                    var a = r / 32 * Math.PI * 2, s = o / 32 * Math.PI * 2;
                    i.push(Math.cos(a), Math.sin(a), 1, Math.cos(s), Math.sin(s), 1)
                }
                n.addAttribute("position", new zn(i, 3));
                var h = new fo({fog: !1});
                this.cone = new mo(n, h), this.add(this.cone), this.update()
            }

            function wc(t) {
                for (var e = function t(e) {
                    var n = [];
                    e && e.isBone && n.push(e);
                    for (var i = 0; i < e.children.length; i++) n.push.apply(n, t(e.children[i]));
                    return n
                }(t), n = new In, i = [], r = [], o = new an(0, 0, 1), a = new an(0, 1, 0), s = 0; s < e.length; s++) {
                    var h = e[s];
                    h.parent && h.parent.isBone && (i.push(0, 0, 0), i.push(0, 0, 0), r.push(o.r, o.g, o.b), r.push(a.r, a.g, a.b))
                }
                n.addAttribute("position", new zn(i, 3)), n.addAttribute("color", new zn(r, 3));
                var c = new fo({vertexColors: S, depthTest: !1, depthWrite: !1, transparent: !0});
                mo.call(this, n, c), this.root = t, this.bones = e, this.matrix = t.matrixWorld, this.matrixAutoUpdate = !1
            }

            function xc(t, e, n) {
                this.light = t, this.light.updateMatrixWorld(), this.color = n;
                var i = new xa(e, 4, 2), r = new ai({wireframe: !0, fog: !1});
                si.call(this, i, r), this.matrix = this.light.matrixWorld, this.matrixAutoUpdate = !1, this.update()
            }

            function Mc(t, e) {
                xn.call(this), this.light = t, this.light.updateMatrixWorld(), this.matrix = t.matrixWorld, this.matrixAutoUpdate = !1, this.color = e;
                var n = new fo({fog: !1}), i = new In;
                i.addAttribute("position", new bn(new Float32Array(15), 3)), this.line = new po(i, n), this.add(this.line), this.update()
            }

            function _c(t, e, n) {
                xn.call(this), this.light = t, this.light.updateMatrixWorld(), this.matrix = t.matrixWorld, this.matrixAutoUpdate = !1, this.color = n;
                var i = new Po(e);
                i.rotateY(.5 * Math.PI), this.material = new ai({
                    wireframe: !0,
                    fog: !1
                }), void 0 === this.color && (this.material.vertexColors = S);
                var r = i.getAttribute("position"), o = new Float32Array(3 * r.count);
                i.addAttribute("color", new bn(o, 3)), this.add(new si(i, this.material)), this.update()
            }

            function Ec(t, e, n, i) {
                t = t || 10, e = e || 10, n = new an(void 0 !== n ? n : 4473924), i = new an(void 0 !== i ? i : 8947848);
                for (var r = e / 2, o = t / e, a = t / 2, s = [], h = [], c = 0, u = 0, l = -a; c <= e; c++, l += o) {
                    s.push(-a, 0, l, a, 0, l), s.push(l, 0, -a, l, 0, a);
                    var f = c === r ? n : i;
                    f.toArray(h, u), f.toArray(h, u += 3), f.toArray(h, u += 3), f.toArray(h, u += 3), u += 3
                }
                var p = new In;
                p.addAttribute("position", new zn(s, 3)), p.addAttribute("color", new zn(h, 3));
                var d = new fo({vertexColors: S});
                mo.call(this, p, d)
            }

            function Sc(t, e, n, i, r, o) {
                t = t || 10, e = e || 16, n = n || 8, i = i || 64, r = new an(void 0 !== r ? r : 4473924), o = new an(void 0 !== o ? o : 8947848);
                var a, s, h, c, u, l, f, p = [], d = [];
                for (c = 0; c <= e; c++) h = c / e * (2 * Math.PI), a = Math.sin(h) * t, s = Math.cos(h) * t, p.push(0, 0, 0), p.push(a, 0, s), d.push((f = 1 & c ? r : o).r, f.g, f.b), d.push(f.r, f.g, f.b);
                for (c = 0; c <= n; c++) for (f = 1 & c ? r : o, l = t - t / n * c, u = 0; u < i; u++) h = u / i * (2 * Math.PI), a = Math.sin(h) * l, s = Math.cos(h) * l, p.push(a, 0, s), d.push(f.r, f.g, f.b), h = (u + 1) / i * (2 * Math.PI), a = Math.sin(h) * l, s = Math.cos(h) * l, p.push(a, 0, s), d.push(f.r, f.g, f.b);
                var m = new In;
                m.addAttribute("position", new zn(p, 3)), m.addAttribute("color", new zn(d, 3));
                var v = new fo({vertexColors: S});
                mo.call(this, m, v)
            }

            function bc(t, e, n, i) {
                this.object = t, this.size = void 0 !== e ? e : 1;
                var r = void 0 !== n ? n : 16776960, o = void 0 !== i ? i : 1, a = 0, s = this.object.geometry;
                s && s.isGeometry ? a = s.faces.length : console.warn("THREE.FaceNormalsHelper: only THREE.Geometry is supported. Use THREE.VertexNormalsHelper, instead.");
                var h = new In, c = new zn(2 * a * 3, 3);
                h.addAttribute("position", c), mo.call(this, h, new fo({
                    color: r,
                    linewidth: o
                })), this.matrixAutoUpdate = !1, this.update()
            }

            function Tc(t, e, n) {
                xn.call(this), this.light = t, this.light.updateMatrixWorld(), this.matrix = t.matrixWorld, this.matrixAutoUpdate = !1, this.color = n, void 0 === e && (e = 1);
                var i = new In;
                i.addAttribute("position", new zn([-e, e, 0, e, e, 0, e, -e, 0, -e, -e, 0, -e, e, 0], 3));
                var r = new fo({fog: !1});
                this.lightPlane = new po(i, r), this.add(this.lightPlane), (i = new In).addAttribute("position", new zn([0, 0, 0, 0, 0, 1], 3)), this.targetLine = new po(i, r), this.add(this.targetLine), this.update()
            }

            function Lc(t) {
                var e = new In, n = new fo({color: 16777215, vertexColors: E}), i = [], r = [], o = {},
                    a = new an(16755200), s = new an(16711680), h = new an(43775), c = new an(16777215),
                    u = new an(3355443);

                function l(t, e, n) {
                    f(t, n), f(e, n)
                }

                function f(t, e) {
                    i.push(0, 0, 0), r.push(e.r, e.g, e.b), void 0 === o[t] && (o[t] = []), o[t].push(i.length / 3 - 1)
                }

                l("n1", "n2", a), l("n2", "n4", a), l("n4", "n3", a), l("n3", "n1", a), l("f1", "f2", a), l("f2", "f4", a), l("f4", "f3", a), l("f3", "f1", a), l("n1", "f1", a), l("n2", "f2", a), l("n3", "f3", a), l("n4", "f4", a), l("p", "n1", s), l("p", "n2", s), l("p", "n3", s), l("p", "n4", s), l("u1", "u2", h), l("u2", "u3", h), l("u3", "u1", h), l("c", "t", c), l("p", "c", u), l("cn1", "cn2", u), l("cn3", "cn4", u), l("cf1", "cf2", u), l("cf3", "cf4", u), e.addAttribute("position", new zn(i, 3)), e.addAttribute("color", new zn(r, 3)), mo.call(this, e, n), this.camera = t, this.camera.updateProjectionMatrix && this.camera.updateProjectionMatrix(), this.matrix = t.matrixWorld, this.matrixAutoUpdate = !1, this.pointMap = o, this.update()
            }

            function Cc(t, e) {
                this.object = t, void 0 === e && (e = 16776960);
                var n = new Uint16Array([0, 1, 1, 2, 2, 3, 3, 0, 4, 5, 5, 6, 6, 7, 7, 4, 0, 4, 1, 5, 2, 6, 3, 7]),
                    i = new Float32Array(24), r = new In;
                r.setIndex(new bn(n, 1)), r.addAttribute("position", new bn(i, 3)), mo.call(this, r, new fo({color: e})), this.matrixAutoUpdate = !1, this.update()
            }

            function Rc(t, e) {
                this.type = "Box3Helper", this.box = t;
                var n = void 0 !== e ? e : 16776960,
                    i = new Uint16Array([0, 1, 1, 2, 2, 3, 3, 0, 4, 5, 5, 6, 6, 7, 7, 4, 0, 4, 1, 5, 2, 6, 3, 7]),
                    r = new In;
                r.setIndex(new bn(i, 1)), r.addAttribute("position", new zn([1, 1, 1, -1, 1, 1, -1, -1, 1, 1, -1, 1, 1, 1, -1, -1, 1, -1, -1, -1, -1, 1, -1, -1], 3)), mo.call(this, r, new fo({color: n})), this.geometry.computeBoundingSphere()
            }

            function Ac(t, e, n) {
                this.type = "PlaneHelper", this.plane = t, this.size = void 0 === e ? 1 : e;
                var i = void 0 !== n ? n : 16776960, r = new In;
                r.addAttribute("position", new zn([1, -1, 1, -1, 1, 1, -1, -1, 1, 1, 1, 1, -1, 1, 1, -1, -1, 1, 1, -1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0], 3)), r.computeBoundingSphere(), po.call(this, r, new fo({color: i}));
                var o = new In;
                o.addAttribute("position", new zn([1, 1, 1, -1, 1, 1, -1, -1, 1, 1, 1, 1, -1, -1, 1, 1, -1, 1], 3)), o.computeBoundingSphere(), this.add(new si(o, new ai({
                    color: i,
                    opacity: .2,
                    transparent: !0,
                    depthWrite: !1
                })))
            }

            function Pc(t, e, n, i, r, o) {
                xn.call(this), void 0 === t && (t = new THREE.Vector3(0, 0, 1)), void 0 === e && (e = new THREE.Vector3(0, 0, 0)), void 0 === n && (n = 1), void 0 === i && (i = 16776960), void 0 === r && (r = .2 * n), void 0 === o && (o = .2 * r), void 0 === Bh && ((Bh = new In).addAttribute("position", new zn([0, 0, 0, 0, 1, 0], 3)), (kh = new Aa(0, .5, 1, 5, 1)).translate(0, -.5, 0)), this.position.copy(e), this.line = new po(Bh, new fo({color: i})), this.line.matrixAutoUpdate = !1, this.add(this.line), this.cone = new si(kh, new ai({color: i})), this.cone.matrixAutoUpdate = !1, this.add(this.cone), this.setDirection(t), this.setLength(n, r, o)
            }

            function Nc(t) {
                var e = [0, 0, 0, t = t || 1, 0, 0, 0, 0, 0, 0, t, 0, 0, 0, 0, 0, 0, t], n = new In;
                n.addAttribute("position", new zn(e, 3)), n.addAttribute("color", new zn([1, 0, 0, 1, .6, 0, 0, 1, 0, .6, 1, 0, 0, 0, 1, 0, .6, 1], 3));
                var i = new fo({vertexColors: S});
                mo.call(this, n, i)
            }

            function zc(t) {
                console.warn("THREE.ClosedSplineCurve3 has been deprecated. Use THREE.CatmullRomCurve3 instead."), Ls.call(this, t), this.type = "catmullrom", this.closed = !0
            }

            function Uc(t) {
                console.warn("THREE.SplineCurve3 has been deprecated. Use THREE.CatmullRomCurve3 instead."), Ls.call(this, t), this.type = "catmullrom"
            }

            function Hc(t) {
                console.warn("THREE.Spline has been removed. Use THREE.CatmullRomCurve3 instead."), Ls.call(this, t), this.type = "catmullrom"
            }

            Object.assign(Xh.prototype, {
                load: function (t, e, n, i) {
                    var r = new fs(this.manager);
                    r.setResponseType("arraybuffer"), r.setPath(this.path), r.load(t, function (t) {
                        var n = t.slice(0);
                        Dh.getContext().decodeAudioData(n, function (t) {
                            e(t)
                        })
                    }, n, i)
                }, setPath: function (t) {
                    return this.path = t, this
                }
            }), Object.assign(Yh.prototype, {
                update: (Lh = new ze, Ch = new ze, function (t) {
                    if (wh !== this || xh !== t.focus || Mh !== t.fov || _h !== t.aspect * this.aspect || Eh !== t.near || Sh !== t.far || bh !== t.zoom || Th !== this.eyeSep) {
                        wh = this, xh = t.focus, Mh = t.fov, _h = t.aspect * this.aspect, Eh = t.near, Sh = t.far, bh = t.zoom;
                        var e, n, i = t.projectionMatrix.clone(), r = (Th = this.eyeSep / 2) * Eh / xh,
                            o = Eh * Math.tan(Pe.DEG2RAD * Mh * .5) / bh;
                        Ch.elements[12] = -Th, Lh.elements[12] = Th, i.elements[0] = 2 * Eh / ((n = o * _h + r) - (e = -o * _h + r)), i.elements[8] = (n + e) / (n - e), this.cameraL.projectionMatrix.copy(i), i.elements[0] = 2 * Eh / ((n = o * _h - r) - (e = -o * _h - r)), i.elements[8] = (n + e) / (n - e), this.cameraR.projectionMatrix.copy(i)
                    }
                    this.cameraL.matrixWorld.copy(t.matrixWorld).multiply(Ch), this.cameraR.matrixWorld.copy(t.matrixWorld).multiply(Lh)
                })
            }), (Zh.prototype = Object.create(xn.prototype)).constructor = Zh, Object.assign(Jh.prototype, {
                start: function () {
                    this.startTime = ("undefined" == typeof performance ? Date : performance).now(), this.oldTime = this.startTime, this.elapsedTime = 0, this.running = !0
                }, stop: function () {
                    this.getElapsedTime(), this.running = !1, this.autoStart = !1
                }, getElapsedTime: function () {
                    return this.getDelta(), this.elapsedTime
                }, getDelta: function () {
                    var t = 0;
                    if (this.autoStart && !this.running) return this.start(), 0;
                    if (this.running) {
                        var e = ("undefined" == typeof performance ? Date : performance).now();
                        t = (e - this.oldTime) / 1e3, this.oldTime = e, this.elapsedTime += t
                    }
                    return t
                }
            }), Qh.prototype = Object.assign(Object.create(xn.prototype), {
                constructor: Qh, getInput: function () {
                    return this.gain
                }, removeFilter: function () {
                    return null !== this.filter && (this.gain.disconnect(this.filter), this.filter.disconnect(this.context.destination), this.gain.connect(this.context.destination), this.filter = null), this
                }, getFilter: function () {
                    return this.filter
                }, setFilter: function (t) {
                    return null !== this.filter ? (this.gain.disconnect(this.filter), this.filter.disconnect(this.context.destination)) : this.gain.disconnect(this.context.destination), this.filter = t, this.gain.connect(this.filter), this.filter.connect(this.context.destination), this
                }, getMasterVolume: function () {
                    return this.gain.gain.value
                }, setMasterVolume: function (t) {
                    return this.gain.gain.setTargetAtTime(t, this.context.currentTime, .01), this
                }, updateMatrixWorld: function () {
                    var t = new He, e = new Ue, n = new He, i = new He, r = new Jh;
                    return function (o) {
                        xn.prototype.updateMatrixWorld.call(this, o);
                        var a = this.context.listener, s = this.up;
                        if (this.timeDelta = r.getDelta(), this.matrixWorld.decompose(t, e, n), i.set(0, 0, -1).applyQuaternion(e), a.positionX) {
                            var h = this.context.currentTime + this.timeDelta;
                            a.positionX.linearRampToValueAtTime(t.x, h), a.positionY.linearRampToValueAtTime(t.y, h), a.positionZ.linearRampToValueAtTime(t.z, h), a.forwardX.linearRampToValueAtTime(i.x, h), a.forwardY.linearRampToValueAtTime(i.y, h), a.forwardZ.linearRampToValueAtTime(i.z, h), a.upX.linearRampToValueAtTime(s.x, h), a.upY.linearRampToValueAtTime(s.y, h), a.upZ.linearRampToValueAtTime(s.z, h)
                        } else a.setPosition(t.x, t.y, t.z), a.setOrientation(i.x, i.y, i.z, s.x, s.y, s.z)
                    }
                }()
            }), Kh.prototype = Object.assign(Object.create(xn.prototype), {
                constructor: Kh, getOutput: function () {
                    return this.gain
                }, setNodeSource: function (t) {
                    return this.hasPlaybackControl = !1, this.sourceType = "audioNode", this.source = t, this.connect(), this
                }, setMediaElementSource: function (t) {
                    return this.hasPlaybackControl = !1, this.sourceType = "mediaNode", this.source = this.context.createMediaElementSource(t), this.connect(), this
                }, setBuffer: function (t) {
                    return this.buffer = t, this.sourceType = "buffer", this.autoplay && this.play(), this
                }, play: function () {
                    if (!0 !== this.isPlaying) {
                        if (!1 !== this.hasPlaybackControl) {
                            var t = this.context.createBufferSource();
                            return t.buffer = this.buffer, t.loop = this.loop, t.onended = this.onEnded.bind(this), t.playbackRate.setValueAtTime(this.playbackRate, this.startTime), this.startTime = this.context.currentTime, t.start(this.startTime, this.offset), this.isPlaying = !0, this.source = t, this.connect()
                        }
                        console.warn("THREE.Audio: this Audio has no playback control.")
                    } else console.warn("THREE.Audio: Audio is already playing.")
                }, pause: function () {
                    if (!1 !== this.hasPlaybackControl) return !0 === this.isPlaying && (this.source.stop(), this.source.onended = null, this.offset += (this.context.currentTime - this.startTime) * this.playbackRate, this.isPlaying = !1), this;
                    console.warn("THREE.Audio: this Audio has no playback control.")
                }, stop: function () {
                    if (!1 !== this.hasPlaybackControl) return this.source.stop(), this.source.onended = null, this.offset = 0, this.isPlaying = !1, this;
                    console.warn("THREE.Audio: this Audio has no playback control.")
                }, connect: function () {
                    if (this.filters.length > 0) {
                        this.source.connect(this.filters[0]);
                        for (var t = 1, e = this.filters.length; t < e; t++) this.filters[t - 1].connect(this.filters[t]);
                        this.filters[this.filters.length - 1].connect(this.getOutput())
                    } else this.source.connect(this.getOutput());
                    return this
                }, disconnect: function () {
                    if (this.filters.length > 0) {
                        this.source.disconnect(this.filters[0]);
                        for (var t = 1, e = this.filters.length; t < e; t++) this.filters[t - 1].disconnect(this.filters[t]);
                        this.filters[this.filters.length - 1].disconnect(this.getOutput())
                    } else this.source.disconnect(this.getOutput());
                    return this
                }, getFilters: function () {
                    return this.filters
                }, setFilters: function (t) {
                    return t || (t = []), !0 === this.isPlaying ? (this.disconnect(), this.filters = t, this.connect()) : this.filters = t, this
                }, getFilter: function () {
                    return this.getFilters()[0]
                }, setFilter: function (t) {
                    return this.setFilters(t ? [t] : [])
                }, setPlaybackRate: function (t) {
                    if (!1 !== this.hasPlaybackControl) return this.playbackRate = t, !0 === this.isPlaying && this.source.playbackRate.setValueAtTime(this.playbackRate, this.context.currentTime), this;
                    console.warn("THREE.Audio: this Audio has no playback control.")
                }, getPlaybackRate: function () {
                    return this.playbackRate
                }, onEnded: function () {
                    this.isPlaying = !1
                }, getLoop: function () {
                    return !1 === this.hasPlaybackControl ? (console.warn("THREE.Audio: this Audio has no playback control."), !1) : this.loop
                }, setLoop: function (t) {
                    if (!1 !== this.hasPlaybackControl) return this.loop = t, !0 === this.isPlaying && (this.source.loop = this.loop), this;
                    console.warn("THREE.Audio: this Audio has no playback control.")
                }, getVolume: function () {
                    return this.gain.gain.value
                }, setVolume: function (t) {
                    return this.gain.gain.setTargetAtTime(t, this.context.currentTime, .01), this
                }
            }), qh.prototype = Object.assign(Object.create(Kh.prototype), {
                constructor: qh, getOutput: function () {
                    return this.panner
                }, getRefDistance: function () {
                    return this.panner.refDistance
                }, setRefDistance: function (t) {
                    return this.panner.refDistance = t, this
                }, getRolloffFactor: function () {
                    return this.panner.rolloffFactor
                }, setRolloffFactor: function (t) {
                    return this.panner.rolloffFactor = t, this
                }, getDistanceModel: function () {
                    return this.panner.distanceModel
                }, setDistanceModel: function (t) {
                    return this.panner.distanceModel = t, this
                }, getMaxDistance: function () {
                    return this.panner.maxDistance
                }, setMaxDistance: function (t) {
                    return this.panner.maxDistance = t, this
                }, setDirectionalCone: function (t, e, n) {
                    return this.panner.coneInnerAngle = t, this.panner.coneOuterAngle = e, this.panner.coneOuterGain = n, this
                }, updateMatrixWorld: function () {
                    var t = new He, e = new Ue, n = new He, i = new He;
                    return function (r) {
                        xn.prototype.updateMatrixWorld.call(this, r);
                        var o = this.panner;
                        if (this.matrixWorld.decompose(t, e, n), i.set(0, 0, 1).applyQuaternion(e), o.positionX) {
                            var a = this.context.currentTime + this.listener.timeDelta;
                            o.positionX.linearRampToValueAtTime(t.x, a), o.positionY.linearRampToValueAtTime(t.y, a), o.positionZ.linearRampToValueAtTime(t.z, a), o.orientationX.linearRampToValueAtTime(i.x, a), o.orientationY.linearRampToValueAtTime(i.y, a), o.orientationZ.linearRampToValueAtTime(i.z, a)
                        } else o.setPosition(t.x, t.y, t.z), o.setOrientation(i.x, i.y, i.z)
                    }
                }()
            }), Object.assign($h.prototype, {
                getFrequencyData: function () {
                    return this.analyser.getByteFrequencyData(this.data), this.data
                }, getAverageFrequency: function () {
                    for (var t = 0, e = this.getFrequencyData(), n = 0; n < e.length; n++) t += e[n];
                    return t / e.length
                }
            }), Object.assign(jh.prototype, {
                accumulate: function (t, e) {
                    var n = this.buffer, i = this.valueSize, r = t * i + i, o = this.cumulativeWeight;
                    if (0 === o) {
                        for (var a = 0; a !== i; ++a) n[r + a] = n[a];
                        o = e
                    } else {
                        this._mixBufferRegion(n, r, 0, e / (o += e), i)
                    }
                    this.cumulativeWeight = o
                }, apply: function (t) {
                    var e = this.valueSize, n = this.buffer, i = t * e + e, r = this.cumulativeWeight, o = this.binding;
                    (this.cumulativeWeight = 0, r < 1) && this._mixBufferRegion(n, i, 3 * e, 1 - r, e);
                    for (var a = e, s = e + e; a !== s; ++a) if (n[a] !== n[a + e]) {
                        o.setValue(n, i);
                        break
                    }
                }, saveOriginalState: function () {
                    var t = this.buffer, e = this.valueSize, n = 3 * e;
                    this.binding.getValue(t, n);
                    for (var i = e, r = n; i !== r; ++i) t[i] = t[n + i % e];
                    this.cumulativeWeight = 0
                }, restoreOriginalState: function () {
                    this.binding.setValue(this.buffer, 3 * this.valueSize)
                }, _select: function (t, e, n, i, r) {
                    if (i >= .5) for (var o = 0; o !== r; ++o) t[e + o] = t[n + o]
                }, _slerp: function (t, e, n, i) {
                    Ue.slerpFlat(t, e, t, e, t, n, i)
                }, _lerp: function (t, e, n, i, r) {
                    for (var o = 1 - i, a = 0; a !== r; ++a) {
                        var s = e + a;
                        t[s] = t[s] * o + t[n + a] * i
                    }
                }
            }), Object.assign(tc.prototype, {
                getValue: function (t, e) {
                    this.bind();
                    var n = this._bindings[this._targetGroup.nCachedObjects_];
                    void 0 !== n && n.getValue(t, e)
                }, setValue: function (t, e) {
                    for (var n = this._bindings, i = this._targetGroup.nCachedObjects_, r = n.length; i !== r; ++i) n[i].setValue(t, e)
                }, bind: function () {
                    for (var t = this._bindings, e = this._targetGroup.nCachedObjects_, n = t.length; e !== n; ++e) t[e].bind()
                }, unbind: function () {
                    for (var t = this._bindings, e = this._targetGroup.nCachedObjects_, n = t.length; e !== n; ++e) t[e].unbind()
                }
            }), Object.assign(ec, {
                Composite: tc,
                create: function (t, e, n) {
                    return t && t.isAnimationObjectGroup ? new ec.Composite(t, e, n) : new ec(t, e, n)
                },
                sanitizeNodeName: (Oh = new RegExp("[\\[\\]\\.:\\/]", "g"), function (t) {
                    return t.replace(/\s/g, "_").replace(Oh, "")
                }),
                parseTrackName: (Rh = "[^\\[\\]\\.:\\/]", Ah = "[^" + "\\[\\]\\.:\\/".replace("\\.", "") + "]", Ph = /((?:WC+[\/:])*)/.source.replace("WC", Rh), Nh = /(WCOD+)?/.source.replace("WCOD", Ah), zh = /(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC", Rh), Uh = /\.(WC+)(?:\[(.+)\])?/.source.replace("WC", Rh), Hh = new RegExp("^" + Ph + Nh + zh + Uh + "$"), Gh = ["material", "materials", "bones"], function (t) {
                    var e = Hh.exec(t);
                    if (!e) throw new Error("PropertyBinding: Cannot parse trackName: " + t);
                    var n = {
                        nodeName: e[2],
                        objectName: e[3],
                        objectIndex: e[4],
                        propertyName: e[5],
                        propertyIndex: e[6]
                    }, i = n.nodeName && n.nodeName.lastIndexOf(".");
                    if (void 0 !== i && -1 !== i) {
                        var r = n.nodeName.substring(i + 1);
                        -1 !== Gh.indexOf(r) && (n.nodeName = n.nodeName.substring(0, i), n.objectName = r)
                    }
                    if (null === n.propertyName || 0 === n.propertyName.length) throw new Error("PropertyBinding: can not parse propertyName from trackName: " + t);
                    return n
                }),
                findNode: function (t, e) {
                    if (!e || "" === e || "root" === e || "." === e || -1 === e || e === t.name || e === t.uuid) return t;
                    if (t.skeleton) {
                        var n = t.skeleton.getBoneByName(e);
                        if (void 0 !== n) return n
                    }
                    if (t.children) {
                        var i = function (t) {
                            for (var n = 0; n < t.length; n++) {
                                var r = t[n];
                                if (r.name === e || r.uuid === e) return r;
                                var o = i(r.children);
                                if (o) return o
                            }
                            return null
                        }, r = i(t.children);
                        if (r) return r
                    }
                    return null
                }
            }), Object.assign(ec.prototype, {
                _getValue_unavailable: function () {
                },
                _setValue_unavailable: function () {
                },
                BindingType: {Direct: 0, EntireArray: 1, ArrayElement: 2, HasFromToArray: 3},
                Versioning: {None: 0, NeedsUpdate: 1, MatrixWorldNeedsUpdate: 2},
                GetterByBindingType: [function (t, e) {
                    t[e] = this.node[this.propertyName]
                }, function (t, e) {
                    for (var n = this.resolvedProperty, i = 0, r = n.length; i !== r; ++i) t[e++] = n[i]
                }, function (t, e) {
                    t[e] = this.resolvedProperty[this.propertyIndex]
                }, function (t, e) {
                    this.resolvedProperty.toArray(t, e)
                }],
                SetterByBindingTypeAndVersioning: [[function (t, e) {
                    this.targetObject[this.propertyName] = t[e]
                }, function (t, e) {
                    this.targetObject[this.propertyName] = t[e], this.targetObject.needsUpdate = !0
                }, function (t, e) {
                    this.targetObject[this.propertyName] = t[e], this.targetObject.matrixWorldNeedsUpdate = !0
                }], [function (t, e) {
                    for (var n = this.resolvedProperty, i = 0, r = n.length; i !== r; ++i) n[i] = t[e++]
                }, function (t, e) {
                    for (var n = this.resolvedProperty, i = 0, r = n.length; i !== r; ++i) n[i] = t[e++];
                    this.targetObject.needsUpdate = !0
                }, function (t, e) {
                    for (var n = this.resolvedProperty, i = 0, r = n.length; i !== r; ++i) n[i] = t[e++];
                    this.targetObject.matrixWorldNeedsUpdate = !0
                }], [function (t, e) {
                    this.resolvedProperty[this.propertyIndex] = t[e]
                }, function (t, e) {
                    this.resolvedProperty[this.propertyIndex] = t[e], this.targetObject.needsUpdate = !0
                }, function (t, e) {
                    this.resolvedProperty[this.propertyIndex] = t[e], this.targetObject.matrixWorldNeedsUpdate = !0
                }], [function (t, e) {
                    this.resolvedProperty.fromArray(t, e)
                }, function (t, e) {
                    this.resolvedProperty.fromArray(t, e), this.targetObject.needsUpdate = !0
                }, function (t, e) {
                    this.resolvedProperty.fromArray(t, e), this.targetObject.matrixWorldNeedsUpdate = !0
                }]],
                getValue: function (t, e) {
                    this.bind(), this.getValue(t, e)
                },
                setValue: function (t, e) {
                    this.bind(), this.setValue(t, e)
                },
                bind: function () {
                    var t = this.node, e = this.parsedPath, n = e.objectName, i = e.propertyName, r = e.propertyIndex;
                    if (t || (t = ec.findNode(this.rootNode, e.nodeName) || this.rootNode, this.node = t), this.getValue = this._getValue_unavailable, this.setValue = this._setValue_unavailable, t) {
                        if (n) {
                            var o = e.objectIndex;
                            switch (n) {
                                case"materials":
                                    if (!t.material) return void console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.", this);
                                    if (!t.material.materials) return void console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.", this);
                                    t = t.material.materials;
                                    break;
                                case"bones":
                                    if (!t.skeleton) return void console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.", this);
                                    t = t.skeleton.bones;
                                    for (var a = 0; a < t.length; a++) if (t[a].name === o) {
                                        o = a;
                                        break
                                    }
                                    break;
                                default:
                                    if (void 0 === t[n]) return void console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.", this);
                                    t = t[n]
                            }
                            if (void 0 !== o) {
                                if (void 0 === t[o]) return void console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.", this, t);
                                t = t[o]
                            }
                        }
                        var s = t[i];
                        if (void 0 !== s) {
                            var h = this.Versioning.None;
                            this.targetObject = t, void 0 !== t.needsUpdate ? h = this.Versioning.NeedsUpdate : void 0 !== t.matrixWorldNeedsUpdate && (h = this.Versioning.MatrixWorldNeedsUpdate);
                            var c = this.BindingType.Direct;
                            if (void 0 !== r) {
                                if ("morphTargetInfluences" === i) {
                                    if (!t.geometry) return void console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.", this);
                                    if (t.geometry.isBufferGeometry) {
                                        if (!t.geometry.morphAttributes) return void console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.", this);
                                        for (a = 0; a < this.node.geometry.morphAttributes.position.length; a++) if (t.geometry.morphAttributes.position[a].name === r) {
                                            r = a;
                                            break
                                        }
                                    } else {
                                        if (!t.geometry.morphTargets) return void console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphTargets.", this);
                                        for (a = 0; a < this.node.geometry.morphTargets.length; a++) if (t.geometry.morphTargets[a].name === r) {
                                            r = a;
                                            break
                                        }
                                    }
                                }
                                c = this.BindingType.ArrayElement, this.resolvedProperty = s, this.propertyIndex = r
                            } else void 0 !== s.fromArray && void 0 !== s.toArray ? (c = this.BindingType.HasFromToArray, this.resolvedProperty = s) : Array.isArray(s) ? (c = this.BindingType.EntireArray, this.resolvedProperty = s) : this.propertyName = i;
                            this.getValue = this.GetterByBindingType[c], this.setValue = this.SetterByBindingTypeAndVersioning[c][h]
                        } else {
                            console.error("THREE.PropertyBinding: Trying to update property for track: " + e.nodeName + "." + i + " but it wasn't found.", t)
                        }
                    } else console.error("THREE.PropertyBinding: Trying to update node for track: " + this.path + " but it wasn't found.")
                },
                unbind: function () {
                    this.node = null, this.getValue = this._getValue_unbound, this.setValue = this._setValue_unbound
                }
            }), Object.assign(ec.prototype, {
                _getValue_unbound: ec.prototype.getValue,
                _setValue_unbound: ec.prototype.setValue
            }), Object.assign(nc.prototype, {
                isAnimationObjectGroup: !0, add: function () {
                    for (var t = this._objects, e = t.length, n = this.nCachedObjects_, i = this._indicesByUUID, r = this._paths, o = this._parsedPaths, a = this._bindings, s = a.length, h = void 0, c = 0, u = arguments.length; c !== u; ++c) {
                        var l = arguments[c], f = l.uuid, p = i[f];
                        if (void 0 === p) {
                            p = e++, i[f] = p, t.push(l);
                            for (var d = 0, m = s; d !== m; ++d) a[d].push(new ec(l, r[d], o[d]))
                        } else if (p < n) {
                            h = t[p];
                            var v = --n, g = t[v];
                            i[g.uuid] = p, t[p] = g, i[f] = v, t[v] = l;
                            for (d = 0, m = s; d !== m; ++d) {
                                var y = a[d], w = y[p];
                                y[p] = y[v], void 0 === w && (w = new ec(l, r[d], o[d])), y[v] = w
                            }
                        } else t[p] !== h && console.error("THREE.AnimationObjectGroup: Different objects with the same UUID detected. Clean the caches or recreate your infrastructure when reloading scenes.")
                    }
                    this.nCachedObjects_ = n
                }, remove: function () {
                    for (var t = this._objects, e = this.nCachedObjects_, n = this._indicesByUUID, i = this._bindings, r = i.length, o = 0, a = arguments.length; o !== a; ++o) {
                        var s = arguments[o], h = s.uuid, c = n[h];
                        if (void 0 !== c && c >= e) {
                            var u = e++, l = t[u];
                            n[l.uuid] = c, t[c] = l, n[h] = u, t[u] = s;
                            for (var f = 0, p = r; f !== p; ++f) {
                                var d = i[f], m = d[c];
                                d[c] = d[u], d[u] = m
                            }
                        }
                    }
                    this.nCachedObjects_ = e
                }, uncache: function () {
                    for (var t = this._objects, e = t.length, n = this.nCachedObjects_, i = this._indicesByUUID, r = this._bindings, o = r.length, a = 0, s = arguments.length; a !== s; ++a) {
                        var h = arguments[a].uuid, c = i[h];
                        if (void 0 !== c) if (delete i[h], c < n) {
                            var u = --n, l = t[u], f = t[v = --e];
                            i[l.uuid] = c, t[c] = l, i[f.uuid] = u, t[u] = f, t.pop();
                            for (var p = 0, d = o; p !== d; ++p) {
                                var m = (g = r[p])[v];
                                g[c] = g[u], g[u] = m, g.pop()
                            }
                        } else {
                            var v;
                            i[(f = t[v = --e]).uuid] = c, t[c] = f, t.pop();
                            for (p = 0, d = o; p !== d; ++p) {
                                var g;
                                (g = r[p])[c] = g[v], g.pop()
                            }
                        }
                    }
                    this.nCachedObjects_ = n
                }, subscribe_: function (t, e) {
                    var n = this._bindingsIndicesByPath, i = n[t], r = this._bindings;
                    if (void 0 !== i) return r[i];
                    var o = this._paths, a = this._parsedPaths, s = this._objects, h = this.nCachedObjects_,
                        c = new Array(s.length);
                    n[t] = i = r.length, o.push(t), a.push(e), r.push(c);
                    for (var u = h, l = s.length; u !== l; ++u) {
                        c[u] = new ec(s[u], t, e)
                    }
                    return c
                }, unsubscribe_: function (t) {
                    var e = this._bindingsIndicesByPath, n = e[t];
                    if (void 0 !== n) {
                        var i = this._paths, r = this._parsedPaths, o = this._bindings, a = o.length - 1, s = o[a];
                        e[t[a]] = n, o[n] = s, o.pop(), r[n] = r[a], r.pop(), i[n] = i[a], i.pop()
                    }
                }
            }), Object.assign(ic.prototype, {
                play: function () {
                    return this._mixer._activateAction(this), this
                }, stop: function () {
                    return this._mixer._deactivateAction(this), this.reset()
                }, reset: function () {
                    return this.paused = !1, this.enabled = !0, this.time = 0, this._loopCount = -1, this._startTime = null, this.stopFading().stopWarping()
                }, isRunning: function () {
                    return this.enabled && !this.paused && 0 !== this.timeScale && null === this._startTime && this._mixer._isActiveAction(this)
                }, isScheduled: function () {
                    return this._mixer._isActiveAction(this)
                }, startAt: function (t) {
                    return this._startTime = t, this
                }, setLoop: function (t, e) {
                    return this.loop = t, this.repetitions = e, this
                }, setEffectiveWeight: function (t) {
                    return this.weight = t, this._effectiveWeight = this.enabled ? t : 0, this.stopFading()
                }, getEffectiveWeight: function () {
                    return this._effectiveWeight
                }, fadeIn: function (t) {
                    return this._scheduleFading(t, 0, 1)
                }, fadeOut: function (t) {
                    return this._scheduleFading(t, 1, 0)
                }, crossFadeFrom: function (t, e, n) {
                    if (t.fadeOut(e), this.fadeIn(e), n) {
                        var i = this._clip.duration, r = t._clip.duration, o = i / r;
                        t.warp(1, r / i, e), this.warp(o, 1, e)
                    }
                    return this
                }, crossFadeTo: function (t, e, n) {
                    return t.crossFadeFrom(this, e, n)
                }, stopFading: function () {
                    var t = this._weightInterpolant;
                    return null !== t && (this._weightInterpolant = null, this._mixer._takeBackControlInterpolant(t)), this
                }, setEffectiveTimeScale: function (t) {
                    return this.timeScale = t, this._effectiveTimeScale = this.paused ? 0 : t, this.stopWarping()
                }, getEffectiveTimeScale: function () {
                    return this._effectiveTimeScale
                }, setDuration: function (t) {
                    return this.timeScale = this._clip.duration / t, this.stopWarping()
                }, syncWith: function (t) {
                    return this.time = t.time, this.timeScale = t.timeScale, this.stopWarping()
                }, halt: function (t) {
                    return this.warp(this._effectiveTimeScale, 0, t)
                }, warp: function (t, e, n) {
                    var i = this._mixer, r = i.time, o = this._timeScaleInterpolant, a = this.timeScale;
                    null === o && (o = i._lendControlInterpolant(), this._timeScaleInterpolant = o);
                    var s = o.parameterPositions, h = o.sampleValues;
                    return s[0] = r, s[1] = r + n, h[0] = t / a, h[1] = e / a, this
                }, stopWarping: function () {
                    var t = this._timeScaleInterpolant;
                    return null !== t && (this._timeScaleInterpolant = null, this._mixer._takeBackControlInterpolant(t)), this
                }, getMixer: function () {
                    return this._mixer
                }, getClip: function () {
                    return this._clip
                }, getRoot: function () {
                    return this._localRoot || this._mixer._root
                }, _update: function (t, e, n, i) {
                    if (this.enabled) {
                        var r = this._startTime;
                        if (null !== r) {
                            var o = (t - r) * n;
                            if (o < 0 || 0 === n) return;
                            this._startTime = null, e = n * o
                        }
                        e *= this._updateTimeScale(t);
                        var a = this._updateTime(e), s = this._updateWeight(t);
                        if (s > 0) for (var h = this._interpolants, c = this._propertyBindings, u = 0, l = h.length; u !== l; ++u) h[u].evaluate(a), c[u].accumulate(i, s)
                    } else this._updateWeight(t)
                }, _updateWeight: function (t) {
                    var e = 0;
                    if (this.enabled) {
                        e = this.weight;
                        var n = this._weightInterpolant;
                        if (null !== n) {
                            var i = n.evaluate(t)[0];
                            e *= i, t > n.parameterPositions[1] && (this.stopFading(), 0 === i && (this.enabled = !1))
                        }
                    }
                    return this._effectiveWeight = e, e
                }, _updateTimeScale: function (t) {
                    var e = 0;
                    if (!this.paused) {
                        e = this.timeScale;
                        var n = this._timeScaleInterpolant;
                        if (null !== n) e *= n.evaluate(t)[0], t > n.parameterPositions[1] && (this.stopWarping(), 0 === e ? this.paused = !0 : this.timeScale = e)
                    }
                    return this._effectiveTimeScale = e, e
                }, _updateTime: function (t) {
                    var e = this.time + t, n = this._clip.duration, i = this.loop, r = this._loopCount, o = 2202 === i;
                    if (0 === t) return -1 === r ? e : o && 1 == (1 & r) ? n - e : e;
                    if (2200 === i) {
                        -1 === r && (this._loopCount = 0, this._setEndings(!0, !0, !1));
                        t:{
                            if (e >= n) e = n; else {
                                if (!(e < 0)) break t;
                                e = 0
                            }
                            this.clampWhenFinished ? this.paused = !0 : this.enabled = !1, this._mixer.dispatchEvent({
                                type: "finished",
                                action: this,
                                direction: t < 0 ? -1 : 1
                            })
                        }
                    } else {
                        if (-1 === r && (t >= 0 ? (r = 0, this._setEndings(!0, 0 === this.repetitions, o)) : this._setEndings(0 === this.repetitions, !0, o)), e >= n || e < 0) {
                            var a = Math.floor(e / n);
                            e -= n * a, r += Math.abs(a);
                            var s = this.repetitions - r;
                            if (s <= 0) this.clampWhenFinished ? this.paused = !0 : this.enabled = !1, e = t > 0 ? n : 0, this._mixer.dispatchEvent({
                                type: "finished",
                                action: this,
                                direction: t > 0 ? 1 : -1
                            }); else {
                                if (1 === s) {
                                    var h = t < 0;
                                    this._setEndings(h, !h, o)
                                } else this._setEndings(!1, !1, o);
                                this._loopCount = r, this._mixer.dispatchEvent({
                                    type: "loop",
                                    action: this,
                                    loopDelta: a
                                })
                            }
                        }
                        if (o && 1 == (1 & r)) return this.time = e, n - e
                    }
                    return this.time = e, e
                }, _setEndings: function (t, e, n) {
                    var i = this._interpolantSettings;
                    n ? (i.endingStart = 2401, i.endingEnd = 2401) : (i.endingStart = t ? this.zeroSlopeAtStart ? 2401 : ve : 2402, i.endingEnd = e ? this.zeroSlopeAtEnd ? 2401 : ve : 2402)
                }, _scheduleFading: function (t, e, n) {
                    var i = this._mixer, r = i.time, o = this._weightInterpolant;
                    null === o && (o = i._lendControlInterpolant(), this._weightInterpolant = o);
                    var a = o.parameterPositions, s = o.sampleValues;
                    return a[0] = r, s[0] = e, a[1] = r + t, s[1] = n, this
                }
            }), rc.prototype = Object.assign(Object.create(e.prototype), {
                constructor: rc, _bindAction: function (t, e) {
                    var n = t._localRoot || this._root, i = t._clip.tracks, r = i.length, o = t._propertyBindings,
                        a = t._interpolants, s = n.uuid, h = this._bindingsByRootAndName, c = h[s];
                    void 0 === c && (h[s] = c = {});
                    for (var u = 0; u !== r; ++u) {
                        var l = i[u], f = l.name, p = c[f];
                        if (void 0 !== p) o[u] = p; else {
                            if (void 0 !== (p = o[u])) {
                                null === p._cacheIndex && (++p.referenceCount, this._addInactiveBinding(p, s, f));
                                continue
                            }
                            ++(p = new jh(ec.create(n, f, e && e._propertyBindings[u].binding.parsedPath), l.ValueTypeName, l.getValueSize())).referenceCount, this._addInactiveBinding(p, s, f), o[u] = p
                        }
                        a[u].resultBuffer = p.buffer
                    }
                }, _activateAction: function (t) {
                    if (!this._isActiveAction(t)) {
                        if (null === t._cacheIndex) {
                            var e = (t._localRoot || this._root).uuid, n = t._clip.uuid, i = this._actionsByClip[n];
                            this._bindAction(t, i && i.knownActions[0]), this._addInactiveAction(t, n, e)
                        }
                        for (var r = t._propertyBindings, o = 0, a = r.length; o !== a; ++o) {
                            var s = r[o];
                            0 == s.useCount++ && (this._lendBinding(s), s.saveOriginalState())
                        }
                        this._lendAction(t)
                    }
                }, _deactivateAction: function (t) {
                    if (this._isActiveAction(t)) {
                        for (var e = t._propertyBindings, n = 0, i = e.length; n !== i; ++n) {
                            var r = e[n];
                            0 == --r.useCount && (r.restoreOriginalState(), this._takeBackBinding(r))
                        }
                        this._takeBackAction(t)
                    }
                }, _initMemoryManager: function () {
                    this._actions = [], this._nActiveActions = 0, this._actionsByClip = {}, this._bindings = [], this._nActiveBindings = 0, this._bindingsByRootAndName = {}, this._controlInterpolants = [], this._nActiveControlInterpolants = 0;
                    var t = this;
                    this.stats = {
                        actions: {
                            get total() {
                                return t._actions.length
                            }, get inUse() {
                                return t._nActiveActions
                            }
                        }, bindings: {
                            get total() {
                                return t._bindings.length
                            }, get inUse() {
                                return t._nActiveBindings
                            }
                        }, controlInterpolants: {
                            get total() {
                                return t._controlInterpolants.length
                            }, get inUse() {
                                return t._nActiveControlInterpolants
                            }
                        }
                    }
                }, _isActiveAction: function (t) {
                    var e = t._cacheIndex;
                    return null !== e && e < this._nActiveActions
                }, _addInactiveAction: function (t, e, n) {
                    var i = this._actions, r = this._actionsByClip, o = r[e];
                    if (void 0 === o) o = {
                        knownActions: [t],
                        actionByRoot: {}
                    }, t._byClipCacheIndex = 0, r[e] = o; else {
                        var a = o.knownActions;
                        t._byClipCacheIndex = a.length, a.push(t)
                    }
                    t._cacheIndex = i.length, i.push(t), o.actionByRoot[n] = t
                }, _removeInactiveAction: function (t) {
                    var e = this._actions, n = e[e.length - 1], i = t._cacheIndex;
                    n._cacheIndex = i, e[i] = n, e.pop(), t._cacheIndex = null;
                    var r = t._clip.uuid, o = this._actionsByClip, a = o[r], s = a.knownActions, h = s[s.length - 1],
                        c = t._byClipCacheIndex;
                    h._byClipCacheIndex = c, s[c] = h, s.pop(), t._byClipCacheIndex = null, delete a.actionByRoot[(t._localRoot || this._root).uuid], 0 === s.length && delete o[r], this._removeInactiveBindingsForAction(t)
                }, _removeInactiveBindingsForAction: function (t) {
                    for (var e = t._propertyBindings, n = 0, i = e.length; n !== i; ++n) {
                        var r = e[n];
                        0 == --r.referenceCount && this._removeInactiveBinding(r)
                    }
                }, _lendAction: function (t) {
                    var e = this._actions, n = t._cacheIndex, i = this._nActiveActions++, r = e[i];
                    t._cacheIndex = i, e[i] = t, r._cacheIndex = n, e[n] = r
                }, _takeBackAction: function (t) {
                    var e = this._actions, n = t._cacheIndex, i = --this._nActiveActions, r = e[i];
                    t._cacheIndex = i, e[i] = t, r._cacheIndex = n, e[n] = r
                }, _addInactiveBinding: function (t, e, n) {
                    var i = this._bindingsByRootAndName, r = i[e], o = this._bindings;
                    void 0 === r && (i[e] = r = {}), r[n] = t, t._cacheIndex = o.length, o.push(t)
                }, _removeInactiveBinding: function (t) {
                    var e = this._bindings, n = t.binding, i = n.rootNode.uuid, r = n.path,
                        o = this._bindingsByRootAndName, a = o[i], s = e[e.length - 1], h = t._cacheIndex;
                    s._cacheIndex = h, e[h] = s, e.pop(), delete a[r];
                    t:{
                        for (var c in a) break t;
                        delete o[i]
                    }
                }, _lendBinding: function (t) {
                    var e = this._bindings, n = t._cacheIndex, i = this._nActiveBindings++, r = e[i];
                    t._cacheIndex = i, e[i] = t, r._cacheIndex = n, e[n] = r
                }, _takeBackBinding: function (t) {
                    var e = this._bindings, n = t._cacheIndex, i = --this._nActiveBindings, r = e[i];
                    t._cacheIndex = i, e[i] = t, r._cacheIndex = n, e[n] = r
                }, _lendControlInterpolant: function () {
                    var t = this._controlInterpolants, e = this._nActiveControlInterpolants++, n = t[e];
                    return void 0 === n && ((n = new Ka(new Float32Array(2), new Float32Array(2), 1, this._controlInterpolantsResultBuffer)).__cacheIndex = e, t[e] = n), n
                }, _takeBackControlInterpolant: function (t) {
                    var e = this._controlInterpolants, n = t.__cacheIndex, i = --this._nActiveControlInterpolants,
                        r = e[i];
                    t.__cacheIndex = i, e[i] = t, r.__cacheIndex = n, e[n] = r
                }, _controlInterpolantsResultBuffer: new Float32Array(1), clipAction: function (t, e) {
                    var n = e || this._root, i = n.uuid, r = "string" == typeof t ? as.findByName(n, t) : t,
                        o = null !== r ? r.uuid : t, a = this._actionsByClip[o], s = null;
                    if (void 0 !== a) {
                        var h = a.actionByRoot[i];
                        if (void 0 !== h) return h;
                        s = a.knownActions[0], null === r && (r = s._clip)
                    }
                    if (null === r) return null;
                    var c = new ic(this, r, e);
                    return this._bindAction(c, s), this._addInactiveAction(c, o, i), c
                }, existingAction: function (t, e) {
                    var n = e || this._root, i = n.uuid, r = "string" == typeof t ? as.findByName(n, t) : t,
                        o = this._actionsByClip[r ? r.uuid : t];
                    return void 0 !== o && o.actionByRoot[i] || null
                }, stopAllAction: function () {
                    var t = this._actions, e = this._nActiveActions, n = this._bindings, i = this._nActiveBindings;
                    this._nActiveActions = 0, this._nActiveBindings = 0;
                    for (var r = 0; r !== e; ++r) t[r].reset();
                    for (r = 0; r !== i; ++r) n[r].useCount = 0;
                    return this
                }, update: function (t) {
                    for (var e = this._actions, n = this._nActiveActions, i = this.time += t *= this.timeScale, r = Math.sign(t), o = this._accuIndex ^= 1, a = 0; a !== n; ++a) {
                        e[a]._update(i, t, r, o)
                    }
                    var s = this._bindings, h = this._nActiveBindings;
                    for (a = 0; a !== h; ++a) s[a].apply(o);
                    return this
                }, getRoot: function () {
                    return this._root
                }, uncacheClip: function (t) {
                    var e = this._actions, n = t.uuid, i = this._actionsByClip, r = i[n];
                    if (void 0 !== r) {
                        for (var o = r.knownActions, a = 0, s = o.length; a !== s; ++a) {
                            var h = o[a];
                            this._deactivateAction(h);
                            var c = h._cacheIndex, u = e[e.length - 1];
                            h._cacheIndex = null, h._byClipCacheIndex = null, u._cacheIndex = c, e[c] = u, e.pop(), this._removeInactiveBindingsForAction(h)
                        }
                        delete i[n]
                    }
                }, uncacheRoot: function (t) {
                    var e = t.uuid, n = this._actionsByClip;
                    for (var i in n) {
                        var r = n[i].actionByRoot[e];
                        void 0 !== r && (this._deactivateAction(r), this._removeInactiveAction(r))
                    }
                    var o = this._bindingsByRootAndName[e];
                    if (void 0 !== o) for (var a in o) {
                        var s = o[a];
                        s.restoreOriginalState(), this._removeInactiveBinding(s)
                    }
                }, uncacheAction: function (t, e) {
                    var n = this.existingAction(t, e);
                    null !== n && (this._deactivateAction(n), this._removeInactiveAction(n))
                }
            }), oc.prototype.clone = function () {
                return new oc(void 0 === this.value.clone ? this.value : this.value.clone())
            }, ac.prototype = Object.assign(Object.create(In.prototype), {
                constructor: ac,
                isInstancedBufferGeometry: !0,
                copy: function (t) {
                    return In.prototype.copy.call(this, t), this.maxInstancedCount = t.maxInstancedCount, this
                },
                clone: function () {
                    return (new this.constructor).copy(this)
                }
            }), sc.prototype = Object.assign(Object.create(ro.prototype), {
                constructor: sc,
                isInstancedInterleavedBuffer: !0,
                copy: function (t) {
                    return ro.prototype.copy.call(this, t), this.meshPerAttribute = t.meshPerAttribute, this
                }
            }), hc.prototype = Object.assign(Object.create(bn.prototype), {
                constructor: hc,
                isInstancedBufferAttribute: !0,
                copy: function (t) {
                    return bn.prototype.copy.call(this, t), this.meshPerAttribute = t.meshPerAttribute, this
                }
            }), Object.assign(cc.prototype, {
                linePrecision: 1, set: function (t, e) {
                    this.ray.set(t, e)
                }, setFromCamera: function (t, e) {
                    e && e.isPerspectiveCamera ? (this.ray.origin.setFromMatrixPosition(e.matrixWorld), this.ray.direction.set(t.x, t.y, .5).unproject(e).sub(this.ray.origin).normalize()) : e && e.isOrthographicCamera ? (this.ray.origin.set(t.x, t.y, (e.near + e.far) / (e.near - e.far)).unproject(e), this.ray.direction.set(0, 0, -1).transformDirection(e.matrixWorld)) : console.error("THREE.Raycaster: Unsupported camera type.")
                }, intersectObject: function (t, e, n) {
                    var i = n || [];
                    return lc(t, this, i, e), i.sort(uc), i
                }, intersectObjects: function (t, e, n) {
                    var i = n || [];
                    if (!1 === Array.isArray(t)) return console.warn("THREE.Raycaster.intersectObjects: objects is not an Array."), i;
                    for (var r = 0, o = t.length; r < o; r++) lc(t[r], this, i, e);
                    return i.sort(uc), i
                }
            }), Object.assign(fc.prototype, {
                set: function (t, e, n) {
                    return this.radius = t, this.phi = e, this.theta = n, this
                }, clone: function () {
                    return (new this.constructor).copy(this)
                }, copy: function (t) {
                    return this.radius = t.radius, this.phi = t.phi, this.theta = t.theta, this
                }, makeSafe: function () {
                    return this.phi = Math.max(1e-6, Math.min(Math.PI - 1e-6, this.phi)), this
                }, setFromVector3: function (t) {
                    return this.setFromCartesianCoords(t.x, t.y, t.z)
                }, setFromCartesianCoords: function (t, e, n) {
                    return this.radius = Math.sqrt(t * t + e * e + n * n), 0 === this.radius ? (this.theta = 0, this.phi = 0) : (this.theta = Math.atan2(t, n), this.phi = Math.acos(Pe.clamp(e / this.radius, -1, 1))), this
                }
            }), Object.assign(pc.prototype, {
                set: function (t, e, n) {
                    return this.radius = t, this.theta = e, this.y = n, this
                }, clone: function () {
                    return (new this.constructor).copy(this)
                }, copy: function (t) {
                    return this.radius = t.radius, this.theta = t.theta, this.y = t.y, this
                }, setFromVector3: function (t) {
                    return this.setFromCartesianCoords(t.x, t.y, t.z)
                }, setFromCartesianCoords: function (t, e, n) {
                    return this.radius = Math.sqrt(t * t + n * n), this.theta = Math.atan2(t, n), this.y = e, this
                }
            }), Object.assign(dc.prototype, {
                set: function (t, e) {
                    return this.min.copy(t), this.max.copy(e), this
                }, setFromPoints: function (t) {
                    this.makeEmpty();
                    for (var e = 0, n = t.length; e < n; e++) this.expandByPoint(t[e]);
                    return this
                }, setFromCenterAndSize: function () {
                    var t = new Ne;
                    return function (e, n) {
                        var i = t.copy(n).multiplyScalar(.5);
                        return this.min.copy(e).sub(i), this.max.copy(e).add(i), this
                    }
                }(), clone: function () {
                    return (new this.constructor).copy(this)
                }, copy: function (t) {
                    return this.min.copy(t.min), this.max.copy(t.max), this
                }, makeEmpty: function () {
                    return this.min.x = this.min.y = Infinity, this.max.x = this.max.y = -Infinity, this
                }, isEmpty: function () {
                    return this.max.x < this.min.x || this.max.y < this.min.y
                }, getCenter: function (t) {
                    return void 0 === t && (console.warn("THREE.Box2: .getCenter() target is now required"), t = new Ne), this.isEmpty() ? t.set(0, 0) : t.addVectors(this.min, this.max).multiplyScalar(.5)
                }, getSize: function (t) {
                    return void 0 === t && (console.warn("THREE.Box2: .getSize() target is now required"), t = new Ne), this.isEmpty() ? t.set(0, 0) : t.subVectors(this.max, this.min)
                }, expandByPoint: function (t) {
                    return this.min.min(t), this.max.max(t), this
                }, expandByVector: function (t) {
                    return this.min.sub(t), this.max.add(t), this
                }, expandByScalar: function (t) {
                    return this.min.addScalar(-t), this.max.addScalar(t), this
                }, containsPoint: function (t) {
                    return !(t.x < this.min.x || t.x > this.max.x || t.y < this.min.y || t.y > this.max.y)
                }, containsBox: function (t) {
                    return this.min.x <= t.min.x && t.max.x <= this.max.x && this.min.y <= t.min.y && t.max.y <= this.max.y
                }, getParameter: function (t, e) {
                    return void 0 === e && (console.warn("THREE.Box2: .getParameter() target is now required"), e = new Ne), e.set((t.x - this.min.x) / (this.max.x - this.min.x), (t.y - this.min.y) / (this.max.y - this.min.y))
                }, intersectsBox: function (t) {
                    return !(t.max.x < this.min.x || t.min.x > this.max.x || t.max.y < this.min.y || t.min.y > this.max.y)
                }, clampPoint: function (t, e) {
                    return void 0 === e && (console.warn("THREE.Box2: .clampPoint() target is now required"), e = new Ne), e.copy(t).clamp(this.min, this.max)
                }, distanceToPoint: function () {
                    var t = new Ne;
                    return function (e) {
                        return t.copy(e).clamp(this.min, this.max).sub(e).length()
                    }
                }(), intersect: function (t) {
                    return this.min.max(t.min), this.max.min(t.max), this
                }, union: function (t) {
                    return this.min.min(t.min), this.max.max(t.max), this
                }, translate: function (t) {
                    return this.min.add(t), this.max.add(t), this
                }, equals: function (t) {
                    return t.min.equals(this.min) && t.max.equals(this.max)
                }
            }), Object.assign(mc.prototype, {
                set: function (t, e) {
                    return this.start.copy(t), this.end.copy(e), this
                }, clone: function () {
                    return (new this.constructor).copy(this)
                }, copy: function (t) {
                    return this.start.copy(t.start), this.end.copy(t.end), this
                }, getCenter: function (t) {
                    return void 0 === t && (console.warn("THREE.Line3: .getCenter() target is now required"), t = new He), t.addVectors(this.start, this.end).multiplyScalar(.5)
                }, delta: function (t) {
                    return void 0 === t && (console.warn("THREE.Line3: .delta() target is now required"), t = new He), t.subVectors(this.end, this.start)
                }, distanceSq: function () {
                    return this.start.distanceToSquared(this.end)
                }, distance: function () {
                    return this.start.distanceTo(this.end)
                }, at: function (t, e) {
                    return void 0 === e && (console.warn("THREE.Line3: .at() target is now required"), e = new He), this.delta(e).multiplyScalar(t).add(this.start)
                }, closestPointToPointParameter: (Ih = new He, Fh = new He, function (t, e) {
                    Ih.subVectors(t, this.start), Fh.subVectors(this.end, this.start);
                    var n = Fh.dot(Fh), i = Fh.dot(Ih) / n;
                    return e && (i = Pe.clamp(i, 0, 1)), i
                }), closestPointToPoint: function (t, e, n) {
                    var i = this.closestPointToPointParameter(t, e);
                    return void 0 === n && (console.warn("THREE.Line3: .closestPointToPoint() target is now required"), n = new He), this.delta(n).multiplyScalar(i).add(this.start)
                }, applyMatrix4: function (t) {
                    return this.start.applyMatrix4(t), this.end.applyMatrix4(t), this
                }, equals: function (t) {
                    return t.start.equals(this.start) && t.end.equals(this.end)
                }
            }), (vc.prototype = Object.create(xn.prototype)).constructor = vc, vc.prototype.isImmediateRenderObject = !0, (gc.prototype = Object.create(mo.prototype)).constructor = gc, gc.prototype.update = function () {
                var t = new He, e = new He, n = new Ge;
                return function () {
                    var i = ["a", "b", "c"];
                    this.object.updateMatrixWorld(!0), n.getNormalMatrix(this.object.matrixWorld);
                    var r = this.object.matrixWorld, o = this.geometry.attributes.position, a = this.object.geometry;
                    if (a && a.isGeometry) for (var s = a.vertices, h = a.faces, c = 0, u = 0, l = h.length; u < l; u++) for (var f = h[u], p = 0, d = f.vertexNormals.length; p < d; p++) {
                        var m = f.vertexNormals[p];
                        t.copy(s[f[i[p]]]).applyMatrix4(r), e.copy(m).applyMatrix3(n).normalize().multiplyScalar(this.size).add(t), o.setXYZ(c, t.x, t.y, t.z), o.setXYZ(c += 1, e.x, e.y, e.z), c += 1
                    } else if (a && a.isBufferGeometry) {
                        var v = a.attributes.position, g = a.attributes.normal;
                        for (c = 0, p = 0, d = v.count; p < d; p++) t.set(v.getX(p), v.getY(p), v.getZ(p)).applyMatrix4(r), e.set(g.getX(p), g.getY(p), g.getZ(p)), e.applyMatrix3(n).normalize().multiplyScalar(this.size).add(t), o.setXYZ(c, t.x, t.y, t.z), o.setXYZ(c += 1, e.x, e.y, e.z), c += 1
                    }
                    o.needsUpdate = !0
                }
            }(), (yc.prototype = Object.create(xn.prototype)).constructor = yc, yc.prototype.dispose = function () {
                this.cone.geometry.dispose(), this.cone.material.dispose()
            }, yc.prototype.update = function () {
                var t = new He, e = new He;
                return function () {
                    this.light.updateMatrixWorld();
                    var n = this.light.distance ? this.light.distance : 1e3, i = n * Math.tan(this.light.angle);
                    this.cone.scale.set(i, i, n), t.setFromMatrixPosition(this.light.matrixWorld), e.setFromMatrixPosition(this.light.target.matrixWorld), this.cone.lookAt(e.sub(t)), void 0 !== this.color ? this.cone.material.color.set(this.color) : this.cone.material.color.copy(this.light.color)
                }
            }(), (wc.prototype = Object.create(mo.prototype)).constructor = wc, wc.prototype.updateMatrixWorld = function () {
                var t = new He, e = new ze, n = new ze;
                return function (i) {
                    var r = this.bones, o = this.geometry, a = o.getAttribute("position");
                    n.getInverse(this.root.matrixWorld);
                    for (var s = 0, h = 0; s < r.length; s++) {
                        var c = r[s];
                        c.parent && c.parent.isBone && (e.multiplyMatrices(n, c.matrixWorld), t.setFromMatrixPosition(e), a.setXYZ(h, t.x, t.y, t.z), e.multiplyMatrices(n, c.parent.matrixWorld), t.setFromMatrixPosition(e), a.setXYZ(h + 1, t.x, t.y, t.z), h += 2)
                    }
                    o.getAttribute("position").needsUpdate = !0, xn.prototype.updateMatrixWorld.call(this, i)
                }
            }(), (xc.prototype = Object.create(si.prototype)).constructor = xc, xc.prototype.dispose = function () {
                this.geometry.dispose(), this.material.dispose()
            }, xc.prototype.update = function () {
                void 0 !== this.color ? this.material.color.set(this.color) : this.material.color.copy(this.light.color)
            }, (Mc.prototype = Object.create(xn.prototype)).constructor = Mc, Mc.prototype.dispose = function () {
                this.children[0].geometry.dispose(), this.children[0].material.dispose()
            }, Mc.prototype.update = function () {
                var t = .5 * this.light.width, e = .5 * this.light.height, n = this.line.geometry.attributes.position,
                    i = n.array;
                i[0] = t, i[1] = -e, i[2] = 0, i[3] = t, i[4] = e, i[5] = 0, i[6] = -t, i[7] = e, i[8] = 0, i[9] = -t, i[10] = -e, i[11] = 0, i[12] = t, i[13] = -e, i[14] = 0, n.needsUpdate = !0, void 0 !== this.color ? this.line.material.color.set(this.color) : this.line.material.color.copy(this.light.color)
            }, (_c.prototype = Object.create(xn.prototype)).constructor = _c, _c.prototype.dispose = function () {
                this.children[0].geometry.dispose(), this.children[0].material.dispose()
            }, _c.prototype.update = function () {
                var t = new He, e = new an, n = new an;
                return function () {
                    var i = this.children[0];
                    if (void 0 !== this.color) this.material.color.set(this.color); else {
                        var r = i.geometry.getAttribute("color");
                        e.copy(this.light.color), n.copy(this.light.groundColor);
                        for (var o = 0, a = r.count; o < a; o++) {
                            var s = o < a / 2 ? e : n;
                            r.setXYZ(o, s.r, s.g, s.b)
                        }
                        r.needsUpdate = !0
                    }
                    i.lookAt(t.setFromMatrixPosition(this.light.matrixWorld).negate())
                }
            }(), (Ec.prototype = Object.create(mo.prototype)).constructor = Ec, (Sc.prototype = Object.create(mo.prototype)).constructor = Sc, (bc.prototype = Object.create(mo.prototype)).constructor = bc, bc.prototype.update = function () {
                var t = new He, e = new He, n = new Ge;
                return function () {
                    this.object.updateMatrixWorld(!0), n.getNormalMatrix(this.object.matrixWorld);
                    for (var i = this.object.matrixWorld, r = this.geometry.attributes.position, o = this.object.geometry, a = o.vertices, s = o.faces, h = 0, c = 0, u = s.length; c < u; c++) {
                        var l = s[c], f = l.normal;
                        t.copy(a[l.a]).add(a[l.b]).add(a[l.c]).divideScalar(3).applyMatrix4(i), e.copy(f).applyMatrix3(n).normalize().multiplyScalar(this.size).add(t), r.setXYZ(h, t.x, t.y, t.z), r.setXYZ(h += 1, e.x, e.y, e.z), h += 1
                    }
                    r.needsUpdate = !0
                }
            }(), (Tc.prototype = Object.create(xn.prototype)).constructor = Tc, Tc.prototype.dispose = function () {
                this.lightPlane.geometry.dispose(), this.lightPlane.material.dispose(), this.targetLine.geometry.dispose(), this.targetLine.material.dispose()
            }, Tc.prototype.update = function () {
                var t = new He, e = new He, n = new He;
                return function () {
                    t.setFromMatrixPosition(this.light.matrixWorld), e.setFromMatrixPosition(this.light.target.matrixWorld), n.subVectors(e, t), this.lightPlane.lookAt(n), void 0 !== this.color ? (this.lightPlane.material.color.set(this.color), this.targetLine.material.color.set(this.color)) : (this.lightPlane.material.color.copy(this.light.color), this.targetLine.material.color.copy(this.light.color)), this.targetLine.lookAt(n), this.targetLine.scale.z = n.length()
                }
            }(), (Lc.prototype = Object.create(mo.prototype)).constructor = Lc, Lc.prototype.update = function () {
                var t, e, n = new He, i = new Br;

                function r(r, o, a, s) {
                    n.set(o, a, s).unproject(i);
                    var h = e[r];
                    if (void 0 !== h) for (var c = t.getAttribute("position"), u = 0, l = h.length; u < l; u++) c.setXYZ(h[u], n.x, n.y, n.z)
                }

                return function () {
                    t = this.geometry, e = this.pointMap;
                    i.projectionMatrix.copy(this.camera.projectionMatrix), r("c", 0, 0, -1), r("t", 0, 0, 1), r("n1", -1, -1, -1), r("n2", 1, -1, -1), r("n3", -1, 1, -1), r("n4", 1, 1, -1), r("f1", -1, -1, 1), r("f2", 1, -1, 1), r("f3", -1, 1, 1), r("f4", 1, 1, 1), r("u1", .7, 1.1, -1), r("u2", -.7, 1.1, -1), r("u3", 0, 2, -1), r("cf1", -1, 0, 1), r("cf2", 1, 0, 1), r("cf3", 0, -1, 1), r("cf4", 0, 1, 1), r("cn1", -1, 0, -1), r("cn2", 1, 0, -1), r("cn3", 0, -1, -1), r("cn4", 0, 1, -1), t.getAttribute("position").needsUpdate = !0
                }
            }(), (Cc.prototype = Object.create(mo.prototype)).constructor = Cc, Cc.prototype.update = function () {
                var t = new Qe;
                return function (e) {
                    if (void 0 !== e && console.warn("THREE.BoxHelper: .update() has no longer arguments."), void 0 !== this.object && t.setFromObject(this.object), !t.isEmpty()) {
                        var n = t.min, i = t.max, r = this.geometry.attributes.position, o = r.array;
                        o[0] = i.x, o[1] = i.y, o[2] = i.z, o[3] = n.x, o[4] = i.y, o[5] = i.z, o[6] = n.x, o[7] = n.y, o[8] = i.z, o[9] = i.x, o[10] = n.y, o[11] = i.z, o[12] = i.x, o[13] = i.y, o[14] = n.z, o[15] = n.x, o[16] = i.y, o[17] = n.z, o[18] = n.x, o[19] = n.y, o[20] = n.z, o[21] = i.x, o[22] = n.y, o[23] = n.z, r.needsUpdate = !0, this.geometry.computeBoundingSphere()
                    }
                }
            }(), Cc.prototype.setFromObject = function (t) {
                return this.object = t, this.update(), this
            }, Cc.prototype.copy = function (t) {
                return mo.prototype.copy.call(this, t), this.object = t.object, this
            }, Cc.prototype.clone = function () {
                return (new this.constructor).copy(this)
            }, (Rc.prototype = Object.create(mo.prototype)).constructor = Rc, Rc.prototype.updateMatrixWorld = function (t) {
                var e = this.box;
                e.isEmpty() || (e.getCenter(this.position), e.getSize(this.scale), this.scale.multiplyScalar(.5), xn.prototype.updateMatrixWorld.call(this, t))
            }, (Ac.prototype = Object.create(po.prototype)).constructor = Ac, Ac.prototype.updateMatrixWorld = function (t) {
                var e = -this.plane.constant;
                Math.abs(e) < 1e-8 && (e = 1e-8), this.scale.set(.5 * this.size, .5 * this.size, e), this.children[0].material.side = e < 0 ? x : w, this.lookAt(this.plane.normal), xn.prototype.updateMatrixWorld.call(this, t)
            }, (Pc.prototype = Object.create(xn.prototype)).constructor = Pc, Pc.prototype.setDirection = (Wh = new He, function (t) {
                t.y > .99999 ? this.quaternion.set(0, 0, 0, 1) : t.y < -.99999 ? this.quaternion.set(1, 0, 0, 0) : (Wh.set(t.z, 0, -t.x).normalize(), Vh = Math.acos(t.y), this.quaternion.setFromAxisAngle(Wh, Vh))
            }), Pc.prototype.setLength = function (t, e, n) {
                void 0 === e && (e = .2 * t), void 0 === n && (n = .2 * e), this.line.scale.set(1, Math.max(0, t - e), 1), this.line.updateMatrix(), this.cone.scale.set(n, e, n), this.cone.position.y = t, this.cone.updateMatrix()
            }, Pc.prototype.setColor = function (t) {
                this.line.material.color.copy(t), this.cone.material.color.copy(t)
            }, Pc.prototype.copy = function (t) {
                return xn.prototype.copy.call(this, t, !1), this.line.copy(t.line), this.cone.copy(t.cone), this
            }, Pc.prototype.clone = function () {
                return (new this.constructor).copy(this)
            }, (Nc.prototype = Object.create(mo.prototype)).constructor = Nc, ws.create = function (t, e) {
                return console.log("THREE.Curve.create() has been deprecated"), t.prototype = Object.create(ws.prototype), t.prototype.constructor = t, t.prototype.getPoint = e, t
            }, Object.assign(Fs.prototype, {
                createPointsGeometry: function (t) {
                    console.warn("THREE.CurvePath: .createPointsGeometry() has been removed. Use new THREE.Geometry().setFromPoints( points ) instead.");
                    var e = this.getPoints(t);
                    return this.createGeometry(e)
                }, createSpacedPointsGeometry: function (t) {
                    console.warn("THREE.CurvePath: .createSpacedPointsGeometry() has been removed. Use new THREE.Geometry().setFromPoints( points ) instead.");
                    var e = this.getSpacedPoints(t);
                    return this.createGeometry(e)
                }, createGeometry: function (t) {
                    console.warn("THREE.CurvePath: .createGeometry() has been removed. Use new THREE.Geometry().setFromPoints( points ) instead.");
                    for (var e = new Sn, n = 0, i = t.length; n < i; n++) {
                        var r = t[n];
                        e.vertices.push(new He(r.x, r.y, r.z || 0))
                    }
                    return e
                }
            }), Object.assign(Bs.prototype, {
                fromPoints: function (t) {
                    console.warn("THREE.Path: .fromPoints() has been renamed to .setFromPoints()."), this.setFromPoints(t)
                }
            }), zc.prototype = Object.create(Ls.prototype), Uc.prototype = Object.create(Ls.prototype), Hc.prototype = Object.create(Ls.prototype), Object.assign(Hc.prototype, {
                initFromArray: function () {
                    console.error("THREE.Spline: .initFromArray() has been removed.")
                }, getControlPointsArray: function () {
                    console.error("THREE.Spline: .getControlPointsArray() has been removed.")
                }, reparametrizeByArcLength: function () {
                    console.error("THREE.Spline: .reparametrizeByArcLength() has been removed.")
                }
            }), Ec.prototype.setColors = function () {
                console.error("THREE.GridHelper: setColors() has been deprecated, pass them in the constructor instead.")
            }, wc.prototype.update = function () {
                console.error("THREE.SkeletonHelper: update() no longer needs to be called.")
            }, Object.assign(sh.prototype, {
                extractUrlBase: function (t) {
                    return console.warn("THREE.Loader: .extractUrlBase() has been deprecated. Use THREE.LoaderUtils.extractUrlBase() instead."), th.extractUrlBase(t)
                }
            }), Object.assign(hh.prototype, {
                setTexturePath: function (t) {
                    return console.warn("THREE.JSONLoader: .setTexturePath() has been renamed to .setResourcePath()."), this.setResourcePath(t)
                }
            }), Object.assign(ch.prototype, {
                setTexturePath: function (t) {
                    return console.warn("THREE.ObjectLoader: .setTexturePath() has been renamed to .setResourcePath()."), this.setResourcePath(t)
                }
            }), Object.assign(dc.prototype, {
                center: function (t) {
                    return console.warn("THREE.Box2: .center() has been renamed to .getCenter()."), this.getCenter(t)
                }, empty: function () {
                    return console.warn("THREE.Box2: .empty() has been renamed to .isEmpty()."), this.isEmpty()
                }, isIntersectionBox: function (t) {
                    return console.warn("THREE.Box2: .isIntersectionBox() has been renamed to .intersectsBox()."), this.intersectsBox(t)
                }, size: function (t) {
                    return console.warn("THREE.Box2: .size() has been renamed to .getSize()."), this.getSize(t)
                }
            }), Object.assign(Qe.prototype, {
                center: function (t) {
                    return console.warn("THREE.Box3: .center() has been renamed to .getCenter()."), this.getCenter(t)
                }, empty: function () {
                    return console.warn("THREE.Box3: .empty() has been renamed to .isEmpty()."), this.isEmpty()
                }, isIntersectionBox: function (t) {
                    return console.warn("THREE.Box3: .isIntersectionBox() has been renamed to .intersectsBox()."), this.intersectsBox(t)
                }, isIntersectionSphere: function (t) {
                    return console.warn("THREE.Box3: .isIntersectionSphere() has been renamed to .intersectsSphere()."), this.intersectsSphere(t)
                }, size: function (t) {
                    return console.warn("THREE.Box3: .size() has been renamed to .getSize()."), this.getSize(t)
                }
            }), mc.prototype.center = function (t) {
                return console.warn("THREE.Line3: .center() has been renamed to .getCenter()."), this.getCenter(t)
            }, Object.assign(Pe, {
                random16: function () {
                    return console.warn("THREE.Math: .random16() has been deprecated. Use Math.random() instead."), Math.random()
                }, nearestPowerOfTwo: function (t) {
                    return console.warn("THREE.Math: .nearestPowerOfTwo() has been renamed to .floorPowerOfTwo()."), Pe.floorPowerOfTwo(t)
                }, nextPowerOfTwo: function (t) {
                    return console.warn("THREE.Math: .nextPowerOfTwo() has been renamed to .ceilPowerOfTwo()."), Pe.ceilPowerOfTwo(t)
                }
            }), Object.assign(Ge.prototype, {
                flattenToArrayOffset: function (t, e) {
                    return console.warn("THREE.Matrix3: .flattenToArrayOffset() has been deprecated. Use .toArray() instead."), this.toArray(t, e)
                }, multiplyVector3: function (t) {
                    return console.warn("THREE.Matrix3: .multiplyVector3() has been removed. Use vector.applyMatrix3( matrix ) instead."), t.applyMatrix3(this)
                }, multiplyVector3Array: function () {
                    console.error("THREE.Matrix3: .multiplyVector3Array() has been removed.")
                }, applyToBuffer: function (t) {
                    return console.warn("THREE.Matrix3: .applyToBuffer() has been removed. Use matrix.applyToBufferAttribute( attribute ) instead."), this.applyToBufferAttribute(t)
                }, applyToVector3Array: function () {
                    console.error("THREE.Matrix3: .applyToVector3Array() has been removed.")
                }
            }), Object.assign(ze.prototype, {
                extractPosition: function (t) {
                    return console.warn("THREE.Matrix4: .extractPosition() has been renamed to .copyPosition()."), this.copyPosition(t)
                }, flattenToArrayOffset: function (t, e) {
                    return console.warn("THREE.Matrix4: .flattenToArrayOffset() has been deprecated. Use .toArray() instead."), this.toArray(t, e)
                }, getPosition: function () {
                    var t;
                    return function () {
                        return void 0 === t && (t = new He), console.warn("THREE.Matrix4: .getPosition() has been removed. Use Vector3.setFromMatrixPosition( matrix ) instead."), t.setFromMatrixColumn(this, 3)
                    }
                }(), setRotationFromQuaternion: function (t) {
                    return console.warn("THREE.Matrix4: .setRotationFromQuaternion() has been renamed to .makeRotationFromQuaternion()."), this.makeRotationFromQuaternion(t)
                }, multiplyToArray: function () {
                    console.warn("THREE.Matrix4: .multiplyToArray() has been removed.")
                }, multiplyVector3: function (t) {
                    return console.warn("THREE.Matrix4: .multiplyVector3() has been removed. Use vector.applyMatrix4( matrix ) instead."), t.applyMatrix4(this)
                }, multiplyVector4: function (t) {
                    return console.warn("THREE.Matrix4: .multiplyVector4() has been removed. Use vector.applyMatrix4( matrix ) instead."), t.applyMatrix4(this)
                }, multiplyVector3Array: function () {
                    console.error("THREE.Matrix4: .multiplyVector3Array() has been removed.")
                }, rotateAxis: function (t) {
                    console.warn("THREE.Matrix4: .rotateAxis() has been removed. Use Vector3.transformDirection( matrix ) instead."), t.transformDirection(this)
                }, crossVector: function (t) {
                    return console.warn("THREE.Matrix4: .crossVector() has been removed. Use vector.applyMatrix4( matrix ) instead."), t.applyMatrix4(this)
                }, translate: function () {
                    console.error("THREE.Matrix4: .translate() has been removed.")
                }, rotateX: function () {
                    console.error("THREE.Matrix4: .rotateX() has been removed.")
                }, rotateY: function () {
                    console.error("THREE.Matrix4: .rotateY() has been removed.")
                }, rotateZ: function () {
                    console.error("THREE.Matrix4: .rotateZ() has been removed.")
                }, rotateByAxis: function () {
                    console.error("THREE.Matrix4: .rotateByAxis() has been removed.")
                }, applyToBuffer: function (t) {
                    return console.warn("THREE.Matrix4: .applyToBuffer() has been removed. Use matrix.applyToBufferAttribute( attribute ) instead."), this.applyToBufferAttribute(t)
                }, applyToVector3Array: function () {
                    console.error("THREE.Matrix4: .applyToVector3Array() has been removed.")
                }, makeFrustum: function (t, e, n, i, r, o) {
                    return console.warn("THREE.Matrix4: .makeFrustum() has been removed. Use .makePerspective( left, right, top, bottom, near, far ) instead."), this.makePerspective(t, e, i, n, r, o)
                }
            }), qe.prototype.isIntersectionLine = function (t) {
                return console.warn("THREE.Plane: .isIntersectionLine() has been renamed to .intersectsLine()."), this.intersectsLine(t)
            }, Ue.prototype.multiplyVector3 = function (t) {
                return console.warn("THREE.Quaternion: .multiplyVector3() has been removed. Use is now vector.applyQuaternion( quaternion ) instead."), t.applyQuaternion(this)
            }, Object.assign(ri.prototype, {
                isIntersectionBox: function (t) {
                    return console.warn("THREE.Ray: .isIntersectionBox() has been renamed to .intersectsBox()."), this.intersectsBox(t)
                }, isIntersectionPlane: function (t) {
                    return console.warn("THREE.Ray: .isIntersectionPlane() has been renamed to .intersectsPlane()."), this.intersectsPlane(t)
                }, isIntersectionSphere: function (t) {
                    return console.warn("THREE.Ray: .isIntersectionSphere() has been renamed to .intersectsSphere()."), this.intersectsSphere(t)
                }
            }), Object.assign(oi.prototype, {
                area: function () {
                    return console.warn("THREE.Triangle: .area() has been renamed to .getArea()."), this.getArea()
                }, barycoordFromPoint: function (t, e) {
                    return console.warn("THREE.Triangle: .barycoordFromPoint() has been renamed to .getBarycoord()."), this.getBarycoord(t, e)
                }, midpoint: function (t) {
                    return console.warn("THREE.Triangle: .midpoint() has been renamed to .getMidpoint()."), this.getMidpoint(t)
                }, normal: function (t) {
                    return console.warn("THREE.Triangle: .normal() has been renamed to .getNormal()."), this.getNormal(t)
                }, plane: function (t) {
                    return console.warn("THREE.Triangle: .plane() has been renamed to .getPlane()."), this.getPlane(t)
                }
            }), Object.assign(oi, {
                barycoordFromPoint: function (t, e, n, i, r) {
                    return console.warn("THREE.Triangle: .barycoordFromPoint() has been renamed to .getBarycoord()."), oi.getBarycoord(t, e, n, i, r)
                }, normal: function (t, e, n, i) {
                    return console.warn("THREE.Triangle: .normal() has been renamed to .getNormal()."), oi.getNormal(t, e, n, i)
                }
            }), Object.assign(ks.prototype, {
                extractAllPoints: function (t) {
                    return console.warn("THREE.Shape: .extractAllPoints() has been removed. Use .extractPoints() instead."), this.extractPoints(t)
                }, extrude: function (t) {
                    return console.warn("THREE.Shape: .extrude() has been removed. Use ExtrudeGeometry() instead."), new pa(this, t)
                }, makeGeometry: function (t) {
                    return console.warn("THREE.Shape: .makeGeometry() has been removed. Use ShapeGeometry() instead."), new ba(this, t)
                }
            }), Object.assign(Ne.prototype, {
                fromAttribute: function (t, e, n) {
                    return console.warn("THREE.Vector2: .fromAttribute() has been renamed to .fromBufferAttribute()."), this.fromBufferAttribute(t, e, n)
                }, distanceToManhattan: function (t) {
                    return console.warn("THREE.Vector2: .distanceToManhattan() has been renamed to .manhattanDistanceTo()."), this.manhattanDistanceTo(t)
                }, lengthManhattan: function () {
                    return console.warn("THREE.Vector2: .lengthManhattan() has been renamed to .manhattanLength()."), this.manhattanLength()
                }
            }), Object.assign(He.prototype, {
                setEulerFromRotationMatrix: function () {
                    console.error("THREE.Vector3: .setEulerFromRotationMatrix() has been removed. Use Euler.setFromRotationMatrix() instead.")
                }, setEulerFromQuaternion: function () {
                    console.error("THREE.Vector3: .setEulerFromQuaternion() has been removed. Use Euler.setFromQuaternion() instead.")
                }, getPositionFromMatrix: function (t) {
                    return console.warn("THREE.Vector3: .getPositionFromMatrix() has been renamed to .setFromMatrixPosition()."), this.setFromMatrixPosition(t)
                }, getScaleFromMatrix: function (t) {
                    return console.warn("THREE.Vector3: .getScaleFromMatrix() has been renamed to .setFromMatrixScale()."), this.setFromMatrixScale(t)
                }, getColumnFromMatrix: function (t, e) {
                    return console.warn("THREE.Vector3: .getColumnFromMatrix() has been renamed to .setFromMatrixColumn()."), this.setFromMatrixColumn(e, t)
                }, applyProjection: function (t) {
                    return console.warn("THREE.Vector3: .applyProjection() has been removed. Use .applyMatrix4( m ) instead."), this.applyMatrix4(t)
                }, fromAttribute: function (t, e, n) {
                    return console.warn("THREE.Vector3: .fromAttribute() has been renamed to .fromBufferAttribute()."), this.fromBufferAttribute(t, e, n)
                }, distanceToManhattan: function (t) {
                    return console.warn("THREE.Vector3: .distanceToManhattan() has been renamed to .manhattanDistanceTo()."), this.manhattanDistanceTo(t)
                }, lengthManhattan: function () {
                    return console.warn("THREE.Vector3: .lengthManhattan() has been renamed to .manhattanLength()."), this.manhattanLength()
                }
            }), Object.assign(Xe.prototype, {
                fromAttribute: function (t, e, n) {
                    return console.warn("THREE.Vector4: .fromAttribute() has been renamed to .fromBufferAttribute()."), this.fromBufferAttribute(t, e, n)
                }, lengthManhattan: function () {
                    return console.warn("THREE.Vector4: .lengthManhattan() has been renamed to .manhattanLength()."), this.manhattanLength()
                }
            }), Object.assign(Sn.prototype, {
                computeTangents: function () {
                    console.error("THREE.Geometry: .computeTangents() has been removed.")
                }, computeLineDistances: function () {
                    console.error("THREE.Geometry: .computeLineDistances() has been removed. Use THREE.Line.computeLineDistances() instead.")
                }
            }), Object.assign(xn.prototype, {
                getChildByName: function (t) {
                    return console.warn("THREE.Object3D: .getChildByName() has been renamed to .getObjectByName()."), this.getObjectByName(t)
                }, renderDepth: function () {
                    console.warn("THREE.Object3D: .renderDepth has been removed. Use .renderOrder, instead.")
                }, translate: function (t, e) {
                    return console.warn("THREE.Object3D: .translate() has been removed. Use .translateOnAxis( axis, distance ) instead."), this.translateOnAxis(e, t)
                }, getWorldRotation: function () {
                    console.error("THREE.Object3D: .getWorldRotation() has been removed. Use THREE.Object3D.getWorldQuaternion( target ) instead.")
                }
            }), Object.defineProperties(xn.prototype, {
                eulerOrder: {
                    get: function () {
                        return console.warn("THREE.Object3D: .eulerOrder is now .rotation.order."), this.rotation.order
                    }, set: function (t) {
                        console.warn("THREE.Object3D: .eulerOrder is now .rotation.order."), this.rotation.order = t
                    }
                }, useQuaternion: {
                    get: function () {
                        console.warn("THREE.Object3D: .useQuaternion has been removed. The library now uses quaternions by default.")
                    }, set: function () {
                        console.warn("THREE.Object3D: .useQuaternion has been removed. The library now uses quaternions by default.")
                    }
                }
            }), Object.defineProperties(ho.prototype, {
                objects: {
                    get: function () {
                        return console.warn("THREE.LOD: .objects has been renamed to .levels."), this.levels
                    }
                }
            }), Object.defineProperty(co.prototype, "useVertexTexture", {
                get: function () {
                    console.warn("THREE.Skeleton: useVertexTexture has been removed.")
                }, set: function () {
                    console.warn("THREE.Skeleton: useVertexTexture has been removed.")
                }
            }), Object.defineProperty(ws.prototype, "__arcLengthDivisions", {
                get: function () {
                    return console.warn("THREE.Curve: .__arcLengthDivisions is now .arcLengthDivisions."), this.arcLengthDivisions
                }, set: function (t) {
                    console.warn("THREE.Curve: .__arcLengthDivisions is now .arcLengthDivisions."), this.arcLengthDivisions = t
                }
            }),kr.prototype.setLens = function (t, e) {
                console.warn("THREE.PerspectiveCamera.setLens is deprecated. Use .setFocalLength and .filmGauge for a photographic setup."), void 0 !== e && (this.filmGauge = e), this.setFocalLength(t)
            },Object.defineProperties(Vs.prototype, {
                onlyShadow: {
                    set: function () {
                        console.warn("THREE.Light: .onlyShadow has been removed.")
                    }
                }, shadowCameraFov: {
                    set: function (t) {
                        console.warn("THREE.Light: .shadowCameraFov is now .shadow.camera.fov."), this.shadow.camera.fov = t
                    }
                }, shadowCameraLeft: {
                    set: function (t) {
                        console.warn("THREE.Light: .shadowCameraLeft is now .shadow.camera.left."), this.shadow.camera.left = t
                    }
                }, shadowCameraRight: {
                    set: function (t) {
                        console.warn("THREE.Light: .shadowCameraRight is now .shadow.camera.right."), this.shadow.camera.right = t
                    }
                }, shadowCameraTop: {
                    set: function (t) {
                        console.warn("THREE.Light: .shadowCameraTop is now .shadow.camera.top."), this.shadow.camera.top = t
                    }
                }, shadowCameraBottom: {
                    set: function (t) {
                        console.warn("THREE.Light: .shadowCameraBottom is now .shadow.camera.bottom."), this.shadow.camera.bottom = t
                    }
                }, shadowCameraNear: {
                    set: function (t) {
                        console.warn("THREE.Light: .shadowCameraNear is now .shadow.camera.near."), this.shadow.camera.near = t
                    }
                }, shadowCameraFar: {
                    set: function (t) {
                        console.warn("THREE.Light: .shadowCameraFar is now .shadow.camera.far."), this.shadow.camera.far = t
                    }
                }, shadowCameraVisible: {
                    set: function () {
                        console.warn("THREE.Light: .shadowCameraVisible has been removed. Use new THREE.CameraHelper( light.shadow.camera ) instead.")
                    }
                }, shadowBias: {
                    set: function (t) {
                        console.warn("THREE.Light: .shadowBias is now .shadow.bias."), this.shadow.bias = t
                    }
                }, shadowDarkness: {
                    set: function () {
                        console.warn("THREE.Light: .shadowDarkness has been removed.")
                    }
                }, shadowMapWidth: {
                    set: function (t) {
                        console.warn("THREE.Light: .shadowMapWidth is now .shadow.mapSize.width."), this.shadow.mapSize.width = t
                    }
                }, shadowMapHeight: {
                    set: function (t) {
                        console.warn("THREE.Light: .shadowMapHeight is now .shadow.mapSize.height."), this.shadow.mapSize.height = t
                    }
                }
            }),Object.defineProperties(bn.prototype, {
                length: {
                    get: function () {
                        return console.warn("THREE.BufferAttribute: .length has been deprecated. Use .count instead."), this.array.length
                    }
                }, copyIndicesArray: function () {
                    console.error("THREE.BufferAttribute: .copyIndicesArray() has been removed.")
                }
            }),Object.assign(In.prototype, {
                addIndex: function (t) {
                    console.warn("THREE.BufferGeometry: .addIndex() has been renamed to .setIndex()."), this.setIndex(t)
                }, addDrawCall: function (t, e, n) {
                    void 0 !== n && console.warn("THREE.BufferGeometry: .addDrawCall() no longer supports indexOffset."), console.warn("THREE.BufferGeometry: .addDrawCall() is now .addGroup()."), this.addGroup(t, e)
                }, clearDrawCalls: function () {
                    console.warn("THREE.BufferGeometry: .clearDrawCalls() is now .clearGroups()."), this.clearGroups()
                }, computeTangents: function () {
                    console.warn("THREE.BufferGeometry: .computeTangents() has been removed.")
                }, computeOffsets: function () {
                    console.warn("THREE.BufferGeometry: .computeOffsets() has been removed.")
                }
            }),Object.defineProperties(In.prototype, {
                drawcalls: {
                    get: function () {
                        return console.error("THREE.BufferGeometry: .drawcalls has been renamed to .groups."), this.groups
                    }
                }, offsets: {
                    get: function () {
                        return console.warn("THREE.BufferGeometry: .offsets has been renamed to .groups."), this.groups
                    }
                }
            }),Object.assign(da.prototype, {
                getArrays: function () {
                    console.error("THREE.ExtrudeBufferGeometry: .getArrays() has been removed.")
                }, addShapeList: function () {
                    console.error("THREE.ExtrudeBufferGeometry: .addShapeList() has been removed.")
                }, addShape: function () {
                    console.error("THREE.ExtrudeBufferGeometry: .addShape() has been removed.")
                }
            }),Object.defineProperties(oc.prototype, {
                dynamic: {
                    set: function () {
                        console.warn("THREE.Uniform: .dynamic has been removed. Use object.onBeforeRender() instead.")
                    }
                }, onUpdate: {
                    value: function () {
                        return console.warn("THREE.Uniform: .onUpdate() has been removed. Use object.onBeforeRender() instead."), this
                    }
                }
            }),Object.defineProperties(ni.prototype, {
                wrapAround: {
                    get: function () {
                        console.warn("THREE.Material: .wrapAround has been removed.")
                    }, set: function () {
                        console.warn("THREE.Material: .wrapAround has been removed.")
                    }
                }, overdraw: {
                    get: function () {
                        console.warn("THREE.Material: .overdraw has been removed.")
                    }, set: function () {
                        console.warn("THREE.Material: .overdraw has been removed.")
                    }
                }, wrapRGB: {
                    get: function () {
                        return console.warn("THREE.Material: .wrapRGB has been removed."), new an
                    }
                }, shading: {
                    get: function () {
                        console.error("THREE." + this.type + ": .shading has been removed. Use the boolean .flatShading instead.")
                    }, set: function (t) {
                        console.warn("THREE." + this.type + ": .shading has been removed. Use the boolean .flatShading instead."), this.flatShading = 1 === t
                    }
                }
            }),Object.defineProperties(Ba.prototype, {
                metal: {
                    get: function () {
                        return console.warn("THREE.MeshPhongMaterial: .metal has been removed. Use THREE.MeshStandardMaterial instead."), !1
                    }, set: function () {
                        console.warn("THREE.MeshPhongMaterial: .metal has been removed. Use THREE.MeshStandardMaterial instead")
                    }
                }
            }),Object.defineProperties(ii.prototype, {
                derivatives: {
                    get: function () {
                        return console.warn("THREE.ShaderMaterial: .derivatives has been moved to .extensions.derivatives."), this.extensions.derivatives
                    }, set: function (t) {
                        console.warn("THREE. ShaderMaterial: .derivatives has been moved to .extensions.derivatives."), this.extensions.derivatives = t
                    }
                }
            }),Object.assign(to.prototype, {
                clearTarget: function (t, e, n, i) {
                    console.warn("THREE.WebGLRenderer: .clearTarget() has been deprecated. Use .setRenderTarget() and .clear() instead."), this.setRenderTarget(t), this.clear(e, n, i)
                }, animate: function (t) {
                    console.warn("THREE.WebGLRenderer: .animate() is now .setAnimationLoop()."), this.setAnimationLoop(t)
                }, getCurrentRenderTarget: function () {
                    return console.warn("THREE.WebGLRenderer: .getCurrentRenderTarget() is now .getRenderTarget()."), this.getRenderTarget()
                }, getMaxAnisotropy: function () {
                    return console.warn("THREE.WebGLRenderer: .getMaxAnisotropy() is now .capabilities.getMaxAnisotropy()."), this.capabilities.getMaxAnisotropy()
                }, getPrecision: function () {
                    return console.warn("THREE.WebGLRenderer: .getPrecision() is now .capabilities.precision."), this.capabilities.precision
                }, resetGLState: function () {
                    return console.warn("THREE.WebGLRenderer: .resetGLState() is now .state.reset()."), this.state.reset()
                }, supportsFloatTextures: function () {
                    return console.warn("THREE.WebGLRenderer: .supportsFloatTextures() is now .extensions.get( 'OES_texture_float' )."), this.extensions.get("OES_texture_float")
                }, supportsHalfFloatTextures: function () {
                    return console.warn("THREE.WebGLRenderer: .supportsHalfFloatTextures() is now .extensions.get( 'OES_texture_half_float' )."), this.extensions.get("OES_texture_half_float")
                }, supportsStandardDerivatives: function () {
                    return console.warn("THREE.WebGLRenderer: .supportsStandardDerivatives() is now .extensions.get( 'OES_standard_derivatives' )."), this.extensions.get("OES_standard_derivatives")
                }, supportsCompressedTextureS3TC: function () {
                    return console.warn("THREE.WebGLRenderer: .supportsCompressedTextureS3TC() is now .extensions.get( 'WEBGL_compressed_texture_s3tc' )."), this.extensions.get("WEBGL_compressed_texture_s3tc")
                }, supportsCompressedTexturePVRTC: function () {
                    return console.warn("THREE.WebGLRenderer: .supportsCompressedTexturePVRTC() is now .extensions.get( 'WEBGL_compressed_texture_pvrtc' )."), this.extensions.get("WEBGL_compressed_texture_pvrtc")
                }, supportsBlendMinMax: function () {
                    return console.warn("THREE.WebGLRenderer: .supportsBlendMinMax() is now .extensions.get( 'EXT_blend_minmax' )."), this.extensions.get("EXT_blend_minmax")
                }, supportsVertexTextures: function () {
                    return console.warn("THREE.WebGLRenderer: .supportsVertexTextures() is now .capabilities.vertexTextures."), this.capabilities.vertexTextures
                }, supportsInstancedArrays: function () {
                    return console.warn("THREE.WebGLRenderer: .supportsInstancedArrays() is now .extensions.get( 'ANGLE_instanced_arrays' )."), this.extensions.get("ANGLE_instanced_arrays")
                }, enableScissorTest: function (t) {
                    console.warn("THREE.WebGLRenderer: .enableScissorTest() is now .setScissorTest()."), this.setScissorTest(t)
                }, initMaterial: function () {
                    console.warn("THREE.WebGLRenderer: .initMaterial() has been removed.")
                }, addPrePlugin: function () {
                    console.warn("THREE.WebGLRenderer: .addPrePlugin() has been removed.")
                }, addPostPlugin: function () {
                    console.warn("THREE.WebGLRenderer: .addPostPlugin() has been removed.")
                }, updateShadowMap: function () {
                    console.warn("THREE.WebGLRenderer: .updateShadowMap() has been removed.")
                }, setFaceCulling: function () {
                    console.warn("THREE.WebGLRenderer: .setFaceCulling() has been removed.")
                }
            }),Object.defineProperties(to.prototype, {
                shadowMapEnabled: {
                    get: function () {
                        return this.shadowMap.enabled
                    }, set: function (t) {
                        console.warn("THREE.WebGLRenderer: .shadowMapEnabled is now .shadowMap.enabled."), this.shadowMap.enabled = t
                    }
                }, shadowMapType: {
                    get: function () {
                        return this.shadowMap.type
                    }, set: function (t) {
                        console.warn("THREE.WebGLRenderer: .shadowMapType is now .shadowMap.type."), this.shadowMap.type = t
                    }
                }, shadowMapCullFace: {
                    get: function () {
                        console.warn("THREE.WebGLRenderer: .shadowMapCullFace has been removed. Set Material.shadowSide instead.")
                    }, set: function () {
                        console.warn("THREE.WebGLRenderer: .shadowMapCullFace has been removed. Set Material.shadowSide instead.")
                    }
                }
            }),Object.defineProperties(Hr.prototype, {
                cullFace: {
                    get: function () {
                        console.warn("THREE.WebGLRenderer: .shadowMap.cullFace has been removed. Set Material.shadowSide instead.")
                    }, set: function () {
                        console.warn("THREE.WebGLRenderer: .shadowMap.cullFace has been removed. Set Material.shadowSide instead.")
                    }
                }, renderReverseSided: {
                    get: function () {
                        console.warn("THREE.WebGLRenderer: .shadowMap.renderReverseSided has been removed. Set Material.shadowSide instead.")
                    }, set: function () {
                        console.warn("THREE.WebGLRenderer: .shadowMap.renderReverseSided has been removed. Set Material.shadowSide instead.")
                    }
                }, renderSingleSided: {
                    get: function () {
                        console.warn("THREE.WebGLRenderer: .shadowMap.renderSingleSided has been removed. Set Material.shadowSide instead.")
                    }, set: function () {
                        console.warn("THREE.WebGLRenderer: .shadowMap.renderSingleSided has been removed. Set Material.shadowSide instead.")
                    }
                }
            }),Object.defineProperties(Ye.prototype, {
                wrapS: {
                    get: function () {
                        return console.warn("THREE.WebGLRenderTarget: .wrapS is now .texture.wrapS."), this.texture.wrapS
                    }, set: function (t) {
                        console.warn("THREE.WebGLRenderTarget: .wrapS is now .texture.wrapS."), this.texture.wrapS = t
                    }
                }, wrapT: {
                    get: function () {
                        return console.warn("THREE.WebGLRenderTarget: .wrapT is now .texture.wrapT."), this.texture.wrapT
                    }, set: function (t) {
                        console.warn("THREE.WebGLRenderTarget: .wrapT is now .texture.wrapT."), this.texture.wrapT = t
                    }
                }, magFilter: {
                    get: function () {
                        return console.warn("THREE.WebGLRenderTarget: .magFilter is now .texture.magFilter."), this.texture.magFilter
                    }, set: function (t) {
                        console.warn("THREE.WebGLRenderTarget: .magFilter is now .texture.magFilter."), this.texture.magFilter = t
                    }
                }, minFilter: {
                    get: function () {
                        return console.warn("THREE.WebGLRenderTarget: .minFilter is now .texture.minFilter."), this.texture.minFilter
                    }, set: function (t) {
                        console.warn("THREE.WebGLRenderTarget: .minFilter is now .texture.minFilter."), this.texture.minFilter = t
                    }
                }, anisotropy: {
                    get: function () {
                        return console.warn("THREE.WebGLRenderTarget: .anisotropy is now .texture.anisotropy."), this.texture.anisotropy
                    }, set: function (t) {
                        console.warn("THREE.WebGLRenderTarget: .anisotropy is now .texture.anisotropy."), this.texture.anisotropy = t
                    }
                }, offset: {
                    get: function () {
                        return console.warn("THREE.WebGLRenderTarget: .offset is now .texture.offset."), this.texture.offset
                    }, set: function (t) {
                        console.warn("THREE.WebGLRenderTarget: .offset is now .texture.offset."), this.texture.offset = t
                    }
                }, repeat: {
                    get: function () {
                        return console.warn("THREE.WebGLRenderTarget: .repeat is now .texture.repeat."), this.texture.repeat
                    }, set: function (t) {
                        console.warn("THREE.WebGLRenderTarget: .repeat is now .texture.repeat."), this.texture.repeat = t
                    }
                }, format: {
                    get: function () {
                        return console.warn("THREE.WebGLRenderTarget: .format is now .texture.format."), this.texture.format
                    }, set: function (t) {
                        console.warn("THREE.WebGLRenderTarget: .format is now .texture.format."), this.texture.format = t
                    }
                }, type: {
                    get: function () {
                        return console.warn("THREE.WebGLRenderTarget: .type is now .texture.type."), this.texture.type
                    }, set: function (t) {
                        console.warn("THREE.WebGLRenderTarget: .type is now .texture.type."), this.texture.type = t
                    }
                }, generateMipmaps: {
                    get: function () {
                        return console.warn("THREE.WebGLRenderTarget: .generateMipmaps is now .texture.generateMipmaps."), this.texture.generateMipmaps
                    }, set: function (t) {
                        console.warn("THREE.WebGLRenderTarget: .generateMipmaps is now .texture.generateMipmaps."), this.texture.generateMipmaps = t
                    }
                }
            }),Object.defineProperties($r.prototype, {
                standing: {
                    set: function () {
                        console.warn("THREE.WebVRManager: .standing has been removed.")
                    }
                }, userHeight: {
                    set: function () {
                        console.warn("THREE.WebVRManager: .userHeight has been removed.")
                    }
                }
            }),Kh.prototype.load = function (t) {
                console.warn("THREE.Audio: .load has been deprecated. Use THREE.AudioLoader instead.");
                var e = this;
                return (new Xh).load(t, function (t) {
                    e.setBuffer(t)
                }), this
            },$h.prototype.getData = function () {
                return console.warn("THREE.AudioAnalyser: .getData() is now .getFrequencyData()."), this.getFrequencyData()
            },Zh.prototype.updateCubeMap = function (t, e) {
                return console.warn("THREE.CubeCamera: .updateCubeMap() is now .update()."), this.update(t, e)
            };
            var Gc = {
                merge: function (t, e, n) {
                    var i;
                    console.warn("THREE.GeometryUtils: .merge() has been moved to Geometry. Use geometry.merge( geometry2, matrix, materialIndexOffset ) instead."), e.isMesh && (e.matrixAutoUpdate && e.updateMatrix(), i = e.matrix, e = e.geometry), t.merge(e, i, n)
                }, center: function (t) {
                    return console.warn("THREE.GeometryUtils: .center() has been moved to Geometry. Use geometry.center() instead."), t.center()
                }
            };
            Ve.crossOrigin = void 0, Ve.loadTexture = function (t, e, n, i) {
                console.warn("THREE.ImageUtils.loadTexture has been deprecated. Use THREE.TextureLoader() instead.");
                var r = new ys;
                r.setCrossOrigin(this.crossOrigin);
                var o = r.load(t, n, void 0, i);
                return e && (o.mapping = e), o
            }, Ve.loadTextureCube = function (t, e, n, i) {
                console.warn("THREE.ImageUtils.loadTextureCube has been deprecated. Use THREE.CubeTextureLoader() instead.");
                var r = new gs;
                r.setCrossOrigin(this.crossOrigin);
                var o = r.load(t, n, void 0, i);
                return e && (o.mapping = e), o
            }, Ve.loadCompressedTexture = function () {
                console.error("THREE.ImageUtils.loadCompressedTexture has been removed. Use THREE.DDSLoader instead.")
            }, Ve.loadCompressedTextureCube = function () {
                console.error("THREE.ImageUtils.loadCompressedTextureCube has been removed. Use THREE.DDSLoader instead.")
            };
            var Oc = {
                createMultiMaterialObject: function () {
                    console.error("THREE.SceneUtils has been moved to /examples/js/utils/SceneUtils.js")
                }, detach: function () {
                    console.error("THREE.SceneUtils has been moved to /examples/js/utils/SceneUtils.js")
                }, attach: function () {
                    console.error("THREE.SceneUtils has been moved to /examples/js/utils/SceneUtils.js")
                }
            };
            t.WebGLRenderTargetCube = Ze, t.WebGLRenderTarget = Ye, t.WebGLRenderer = to, t.ShaderLib = cn, t.UniformsLib = hn, t.UniformsUtils = rn, t.ShaderChunk = nn, t.FogExp2 = eo, t.Fog = no, t.Scene = io, t.Sprite = so, t.LOD = ho, t.SkinnedMesh = lo, t.Skeleton = co, t.Bone = uo, t.Mesh = si, t.LineSegments = mo, t.LineLoop = vo, t.Line = po, t.Points = yo, t.Group = Fr, t.VideoTexture = wo, t.DataTexture = Je, t.DataTexture3D = xi, t.CompressedTexture = xo, t.CubeTexture = wi, t.CanvasTexture = Mo, t.DepthTexture = _o, t.Texture = De, t.AnimationLoader = ps, t.CompressedTextureLoader = ds, t.DataTextureLoader = ms, t.CubeTextureLoader = gs, t.TextureLoader = ys, t.ObjectLoader = ch, t.MaterialLoader = js, t.BufferGeometryLoader = eh, t.DefaultLoadingManager = us, t.LoadingManager = cs, t.JSONLoader = hh, t.ImageLoader = vs, t.ImageBitmapLoader = dh, t.FontLoader = yh, t.FileLoader = fs, t.Loader = sh, t.LoaderUtils = th, t.Cache = hs, t.AudioLoader = Xh, t.SpotLightShadow = Xs, t.SpotLight = Ys, t.PointLight = Zs, t.RectAreaLight = $s, t.HemisphereLight = Ws, t.DirectionalLightShadow = Qs, t.DirectionalLight = Ks, t.AmbientLight = qs, t.LightShadow = Ds, t.Light = Vs, t.StereoCamera = Yh, t.PerspectiveCamera = kr, t.OrthographicCamera = Js, t.CubeCamera = Zh, t.ArrayCamera = Vr, t.Camera = Br, t.AudioListener = Qh, t.PositionalAudio = qh, t.AudioContext = Dh, t.AudioAnalyser = $h, t.Audio = Kh, t.VectorKeyframeTrack = os, t.StringKeyframeTrack = rs, t.QuaternionKeyframeTrack = is, t.NumberKeyframeTrack = es, t.ColorKeyframeTrack = ts, t.BooleanKeyframeTrack = ja, t.PropertyMixer = jh, t.PropertyBinding = ec, t.KeyframeTrack = $a, t.AnimationUtils = Za, t.AnimationObjectGroup = nc, t.AnimationMixer = rc, t.AnimationClip = as, t.Uniform = oc, t.InstancedBufferGeometry = ac, t.BufferGeometry = In, t.Geometry = Sn, t.InterleavedBufferAttribute = oo, t.InstancedInterleavedBuffer = sc, t.InterleavedBuffer = ro, t.InstancedBufferAttribute = hc, t.Face3 = fn, t.Object3D = xn, t.Raycaster = cc, t.Layers = dn, t.EventDispatcher = e, t.Clock = Jh, t.QuaternionLinearInterpolant = ns, t.LinearInterpolant = Ka, t.DiscreteInterpolant = qa, t.CubicInterpolant = Qa, t.Interpolant = Ja,t.Triangle = oi,t.Math = Pe,t.Spherical = fc,t.Cylindrical = pc,t.Plane = qe,t.Frustum = $e,t.Sphere = Ke,t.Ray = ri,t.Matrix4 = ze,t.Matrix3 = Ge,t.Box3 = Qe,t.Box2 = dc,t.Line3 = mc,t.Euler = pn,t.Vector4 = Xe,t.Vector3 = He,t.Vector2 = Ne,t.Quaternion = Ue,t.Color = an,t.ImmediateRenderObject = vc,t.VertexNormalsHelper = gc,t.SpotLightHelper = yc,t.SkeletonHelper = wc,t.PointLightHelper = xc,t.RectAreaLightHelper = Mc,t.HemisphereLightHelper = _c,t.GridHelper = Ec,t.PolarGridHelper = Sc,t.FaceNormalsHelper = bc,t.DirectionalLightHelper = Tc,t.CameraHelper = Lc,t.BoxHelper = Cc,t.Box3Helper = Rc,t.PlaneHelper = Ac,t.ArrowHelper = Pc,t.AxesHelper = Nc,t.Shape = ks,t.Path = Bs,t.ShapePath = mh,t.Font = vh,t.CurvePath = Fs,t.Curve = ws,t.ImageUtils = Ve,t.ShapeUtils = ua,t.WebGLUtils = Ir,t.WireframeGeometry = Eo,t.ParametricGeometry = So,t.ParametricBufferGeometry = bo,t.TetrahedronGeometry = Co,t.TetrahedronBufferGeometry = Ro,t.OctahedronGeometry = Ao,t.OctahedronBufferGeometry = Po,t.IcosahedronGeometry = No,t.IcosahedronBufferGeometry = zo,t.DodecahedronGeometry = Uo,t.DodecahedronBufferGeometry = Ho,t.PolyhedronGeometry = To,t.PolyhedronBufferGeometry = Lo,t.TubeGeometry = Go,t.TubeBufferGeometry = Oo,t.TorusKnotGeometry = Io,t.TorusKnotBufferGeometry = Fo,t.TorusGeometry = Bo,t.TorusBufferGeometry = ko,t.TextGeometry = ga,t.TextBufferGeometry = ya,t.SphereGeometry = wa,t.SphereBufferGeometry = xa,t.RingGeometry = Ma,t.RingBufferGeometry = _a,t.PlaneGeometry = kn,t.PlaneBufferGeometry = Vn,t.LatheGeometry = Ea,t.LatheBufferGeometry = Sa,t.ShapeGeometry = ba,t.ShapeBufferGeometry = Ta,t.ExtrudeGeometry = pa,t.ExtrudeBufferGeometry = da,t.EdgesGeometry = Ca,t.ConeGeometry = Pa,t.ConeBufferGeometry = Na,t.CylinderGeometry = Ra,t.CylinderBufferGeometry = Aa,t.CircleGeometry = za,t.CircleBufferGeometry = Ua,t.BoxGeometry = Fn,t.BoxBufferGeometry = Bn,t.ShadowMaterial = Ga,t.SpriteMaterial = ao,t.RawShaderMaterial = Oa,t.ShaderMaterial = ii,t.PointsMaterial = go,t.MeshPhysicalMaterial = Fa,t.MeshStandardMaterial = Ia,t.MeshPhongMaterial = Ba,t.MeshToonMaterial = ka,t.MeshNormalMaterial = Va,t.MeshLambertMaterial = Wa,t.MeshDepthMaterial = zr,t.MeshDistanceMaterial = Ur,t.MeshBasicMaterial = ai,t.MeshMatcapMaterial = Da,t.LineDashedMaterial = Xa,t.LineBasicMaterial = fo,t.Material = ni,t.Float64BufferAttribute = Un,t.Float32BufferAttribute = zn,t.Uint32BufferAttribute = Nn,t.Int32BufferAttribute = Pn,t.Uint16BufferAttribute = An,t.Int16BufferAttribute = Rn,t.Uint8ClampedBufferAttribute = Cn,t.Uint8BufferAttribute = Ln,t.Int8BufferAttribute = Tn,t.BufferAttribute = bn,t.ArcCurve = Ms,t.CatmullRomCurve3 = Ls,t.CubicBezierCurve = Ps,t.CubicBezierCurve3 = Ns,t.EllipseCurve = xs,t.LineCurve = zs,t.LineCurve3 = Us,t.QuadraticBezierCurve = Hs,t.QuadraticBezierCurve3 = Gs,t.SplineCurve = Os,t.REVISION = p,t.MOUSE = {
                LEFT: 0,
                MIDDLE: 1,
                RIGHT: 2
            },t.CullFaceNone = d,t.CullFaceBack = m,t.CullFaceFront = v,t.CullFaceFrontBack = 3,t.FrontFaceDirectionCW = 0,t.FrontFaceDirectionCCW = 1,t.BasicShadowMap = 0,t.PCFShadowMap = g,t.PCFSoftShadowMap = y,t.FrontSide = w,t.BackSide = x,t.DoubleSide = M,t.FlatShading = 1,t.SmoothShading = 2,t.NoColors = _,t.FaceColors = E,t.VertexColors = S,t.NoBlending = b,t.NormalBlending = T,t.AdditiveBlending = L,t.SubtractiveBlending = C,t.MultiplyBlending = R,t.CustomBlending = A,t.AddEquation = P,t.SubtractEquation = N,t.ReverseSubtractEquation = z,t.MinEquation = U,t.MaxEquation = H,t.ZeroFactor = G,t.OneFactor = O,t.SrcColorFactor = I,t.OneMinusSrcColorFactor = F,t.SrcAlphaFactor = B,t.OneMinusSrcAlphaFactor = k,t.DstAlphaFactor = V,t.OneMinusDstAlphaFactor = W,t.DstColorFactor = D,t.OneMinusDstColorFactor = X,t.SrcAlphaSaturateFactor = Y,t.NeverDepth = Z,t.AlwaysDepth = J,t.LessDepth = Q,t.LessEqualDepth = K,t.EqualDepth = q,t.GreaterEqualDepth = $,t.GreaterDepth = j,t.NotEqualDepth = tt,t.MultiplyOperation = et,t.MixOperation = nt,t.AddOperation = it,t.NoToneMapping = rt,t.LinearToneMapping = ot,t.ReinhardToneMapping = at,t.Uncharted2ToneMapping = st,t.CineonToneMapping = ht,t.UVMapping = 300,t.CubeReflectionMapping = ct,t.CubeRefractionMapping = ut,t.EquirectangularReflectionMapping = lt,t.EquirectangularRefractionMapping = ft,t.SphericalReflectionMapping = pt,t.CubeUVReflectionMapping = dt,t.CubeUVRefractionMapping = mt,t.RepeatWrapping = vt,t.ClampToEdgeWrapping = gt,t.MirroredRepeatWrapping = yt,t.NearestFilter = wt,t.NearestMipMapNearestFilter = xt,t.NearestMipMapLinearFilter = Mt,t.LinearFilter = _t,t.LinearMipMapNearestFilter = Et,t.LinearMipMapLinearFilter = St,t.UnsignedByteType = bt,t.ByteType = Tt,t.ShortType = Lt,t.UnsignedShortType = Ct,t.IntType = Rt,t.UnsignedIntType = At,t.FloatType = Pt,t.HalfFloatType = Nt,t.UnsignedShort4444Type = zt,t.UnsignedShort5551Type = Ut,t.UnsignedShort565Type = Ht,t.UnsignedInt248Type = Gt,t.AlphaFormat = Ot,t.RGBFormat = It,t.RGBAFormat = Ft,t.LuminanceFormat = Bt,t.LuminanceAlphaFormat = kt,t.RGBEFormat = Vt,t.DepthFormat = Wt,t.DepthStencilFormat = Dt,t.RedFormat = Xt,t.RGB_S3TC_DXT1_Format = Yt,t.RGBA_S3TC_DXT1_Format = Zt,t.RGBA_S3TC_DXT3_Format = Jt,t.RGBA_S3TC_DXT5_Format = Qt,t.RGB_PVRTC_4BPPV1_Format = Kt,t.RGB_PVRTC_2BPPV1_Format = qt,t.RGBA_PVRTC_4BPPV1_Format = $t,t.RGBA_PVRTC_2BPPV1_Format = jt,t.RGB_ETC1_Format = te,t.RGBA_ASTC_4x4_Format = ee,t.RGBA_ASTC_5x4_Format = ne,t.RGBA_ASTC_5x5_Format = ie,t.RGBA_ASTC_6x5_Format = re,t.RGBA_ASTC_6x6_Format = oe,t.RGBA_ASTC_8x5_Format = ae,t.RGBA_ASTC_8x6_Format = se,t.RGBA_ASTC_8x8_Format = he,t.RGBA_ASTC_10x5_Format = ce,t.RGBA_ASTC_10x6_Format = ue,t.RGBA_ASTC_10x8_Format = le,t.RGBA_ASTC_10x10_Format = fe,t.RGBA_ASTC_12x10_Format = pe,t.RGBA_ASTC_12x12_Format = de,t.LoopOnce = 2200,t.LoopRepeat = me,t.LoopPingPong = 2202,t.InterpolateDiscrete = 2300,t.InterpolateLinear = 2301,t.InterpolateSmooth = 2302,t.ZeroCurvatureEnding = ve,t.ZeroSlopeEnding = 2401,t.WrapAroundEnding = 2402,t.TrianglesDrawMode = ge,t.TriangleStripDrawMode = ye,t.TriangleFanDrawMode = we,t.LinearEncoding = xe,t.sRGBEncoding = Me,t.GammaEncoding = _e,t.RGBEEncoding = Ee,t.LogLuvEncoding = 3003,t.RGBM7Encoding = Se,t.RGBM16Encoding = be,t.RGBDEncoding = Te,t.BasicDepthPacking = Le,t.RGBADepthPacking = Ce,t.TangentSpaceNormalMap = Re,t.ObjectSpaceNormalMap = Ae,t.CubeGeometry = Fn,t.Face4 = function (t, e, n, i, r, o, a) {
                return console.warn("THREE.Face4 has been removed. A THREE.Face3 will be created instead."), new fn(t, e, n, r, o, a)
            },t.LineStrip = 0,t.LinePieces = 1,t.MeshFaceMaterial = function (t) {
                return console.warn("THREE.MeshFaceMaterial has been removed. Use an Array instead."), t
            },t.MultiMaterial = function (t) {
                return void 0 === t && (t = []), console.warn("THREE.MultiMaterial has been removed. Use an Array instead."), t.isMultiMaterial = !0, t.materials = t, t.clone = function () {
                    return t.slice()
                }, t
            },t.PointCloud = function (t, e) {
                return console.warn("THREE.PointCloud has been renamed to THREE.Points."), new yo(t, e)
            },t.Particle = function (t) {
                return console.warn("THREE.Particle has been renamed to THREE.Sprite."), new so(t)
            },t.ParticleSystem = function (t, e) {
                return console.warn("THREE.ParticleSystem has been renamed to THREE.Points."), new yo(t, e)
            },t.PointCloudMaterial = function (t) {
                return console.warn("THREE.PointCloudMaterial has been renamed to THREE.PointsMaterial."), new go(t)
            },t.ParticleBasicMaterial = function (t) {
                return console.warn("THREE.ParticleBasicMaterial has been renamed to THREE.PointsMaterial."), new go(t)
            },t.ParticleSystemMaterial = function (t) {
                return console.warn("THREE.ParticleSystemMaterial has been renamed to THREE.PointsMaterial."), new go(t)
            },t.Vertex = function (t, e, n) {
                return console.warn("THREE.Vertex has been removed. Use THREE.Vector3 instead."), new He(t, e, n)
            },t.DynamicBufferAttribute = function (t, e) {
                return console.warn("THREE.DynamicBufferAttribute has been removed. Use new THREE.BufferAttribute().setDynamic( true ) instead."), new bn(t, e).setDynamic(!0)
            },t.Int8Attribute = function (t, e) {
                return console.warn("THREE.Int8Attribute has been removed. Use new THREE.Int8BufferAttribute() instead."), new Tn(t, e)
            },t.Uint8Attribute = function (t, e) {
                return console.warn("THREE.Uint8Attribute has been removed. Use new THREE.Uint8BufferAttribute() instead."), new Ln(t, e)
            },t.Uint8ClampedAttribute = function (t, e) {
                return console.warn("THREE.Uint8ClampedAttribute has been removed. Use new THREE.Uint8ClampedBufferAttribute() instead."), new Cn(t, e)
            },t.Int16Attribute = function (t, e) {
                return console.warn("THREE.Int16Attribute has been removed. Use new THREE.Int16BufferAttribute() instead."), new Rn(t, e)
            },t.Uint16Attribute = function (t, e) {
                return console.warn("THREE.Uint16Attribute has been removed. Use new THREE.Uint16BufferAttribute() instead."), new An(t, e)
            },t.Int32Attribute = function (t, e) {
                return console.warn("THREE.Int32Attribute has been removed. Use new THREE.Int32BufferAttribute() instead."), new Pn(t, e)
            },t.Uint32Attribute = function (t, e) {
                return console.warn("THREE.Uint32Attribute has been removed. Use new THREE.Uint32BufferAttribute() instead."), new Nn(t, e)
            },t.Float32Attribute = function (t, e) {
                return console.warn("THREE.Float32Attribute has been removed. Use new THREE.Float32BufferAttribute() instead."), new zn(t, e)
            },t.Float64Attribute = function (t, e) {
                return console.warn("THREE.Float64Attribute has been removed. Use new THREE.Float64BufferAttribute() instead."), new Un(t, e)
            },t.ClosedSplineCurve3 = zc,t.SplineCurve3 = Uc,t.Spline = Hc,t.AxisHelper = function (t) {
                return console.warn("THREE.AxisHelper has been renamed to THREE.AxesHelper."), new Nc(t)
            },t.BoundingBoxHelper = function (t, e) {
                return console.warn("THREE.BoundingBoxHelper has been deprecated. Creating a THREE.BoxHelper instead."), new Cc(t, e)
            },t.EdgesHelper = function (t, e) {
                return console.warn("THREE.EdgesHelper has been removed. Use THREE.EdgesGeometry instead."), new mo(new Ca(t.geometry), new fo({color: void 0 !== e ? e : 16777215}))
            },t.WireframeHelper = function (t, e) {
                return console.warn("THREE.WireframeHelper has been removed. Use THREE.WireframeGeometry instead."), new mo(new Eo(t.geometry), new fo({color: void 0 !== e ? e : 16777215}))
            },t.XHRLoader = function (t) {
                return console.warn("THREE.XHRLoader has been renamed to THREE.FileLoader."), new fs(t)
            },t.BinaryTextureLoader = function (t) {
                return console.warn("THREE.BinaryTextureLoader has been renamed to THREE.DataTextureLoader."), new ms(t)
            },t.GeometryUtils = Gc,t.Projector = function () {
                console.error("THREE.Projector has been moved to /examples/js/renderers/Projector.js."), this.projectVector = function (t, e) {
                    console.warn("THREE.Projector: .projectVector() is now vector.project()."), t.project(e)
                }, this.unprojectVector = function (t, e) {
                    console.warn("THREE.Projector: .unprojectVector() is now vector.unproject()."), t.unproject(e)
                }, this.pickingRay = function () {
                    console.error("THREE.Projector: .pickingRay() is now raycaster.setFromCamera().")
                }
            },t.CanvasRenderer = function () {
                console.error("THREE.CanvasRenderer has been removed")
            },t.SceneUtils = Oc,t.LensFlare = function () {
                console.error("THREE.LensFlare has been moved to /examples/js/objects/Lensflare.js")
            },Object.defineProperty(t, "__esModule", {value: !0})
        }, "object" == typeof n && void 0 !== e ? r(n) : "function" == typeof define && define.amd ? define(["exports"], r) : r(i.THREE = {})
    }, {}], 11: [function (t, e, n) {
        THREE.OrbitControls = function (t, e) {
            var n, i, r, o, a;
            this.object = t, this.domElement = void 0 !== e ? e : document, this.enabled = !0, this.target = new THREE.Vector3, this.minDistance = 0, this.maxDistance = Infinity, this.minZoom = 0, this.maxZoom = Infinity, this.minPolarAngle = 0, this.maxPolarAngle = Math.PI, this.minAzimuthAngle = -Infinity, this.maxAzimuthAngle = Infinity, this.enableDamping = !1, this.dampingFactor = .25, this.enableZoom = !0, this.zoomSpeed = 1, this.enableRotate = !0, this.rotateSpeed = 1, this.enablePan = !0, this.panSpeed = 1, this.screenSpacePanning = !1, this.keyPanSpeed = 7, this.autoRotate = !1, this.autoRotateSpeed = 2, this.enableKeys = !0, this.keys = {
                LEFT: 37,
                UP: 38,
                RIGHT: 39,
                BOTTOM: 40
            }, this.mouseButtons = {
                LEFT: THREE.MOUSE.LEFT,
                MIDDLE: THREE.MOUSE.MIDDLE,
                RIGHT: THREE.MOUSE.RIGHT
            }, this.target0 = this.target.clone(), this.position0 = this.object.position.clone(), this.zoom0 = this.object.zoom, this.getPolarAngle = function () {
                return d.phi
            }, this.getAzimuthalAngle = function () {
                return d.theta
            }, this.saveState = function () {
                s.target0.copy(s.target), s.position0.copy(s.object.position), s.zoom0 = s.object.zoom
            }, this.reset = function () {
                s.target.copy(s.target0), s.object.position.copy(s.position0), s.object.zoom = s.zoom0, s.object.updateProjectionMatrix(), s.dispatchEvent(h), s.update(), f = l.NONE
            }, this.update = (n = new THREE.Vector3, i = (new THREE.Quaternion).setFromUnitVectors(t.up, new THREE.Vector3(0, 1, 0)), r = i.clone().inverse(), o = new THREE.Vector3, a = new THREE.Quaternion, function () {
                var t = s.object.position;
                return n.copy(t).sub(s.target), n.applyQuaternion(i), d.setFromVector3(n), s.autoRotate && f === l.NONE && R(2 * Math.PI / 60 / 60 * s.autoRotateSpeed), d.theta += m.theta, d.phi += m.phi, d.theta = Math.max(s.minAzimuthAngle, Math.min(s.maxAzimuthAngle, d.theta)), d.phi = Math.max(s.minPolarAngle, Math.min(s.maxPolarAngle, d.phi)), d.makeSafe(), d.radius *= v, d.radius = Math.max(s.minDistance, Math.min(s.maxDistance, d.radius)), s.target.add(g), n.setFromSpherical(d), n.applyQuaternion(r), t.copy(s.target).add(n), s.object.lookAt(s.target), !0 === s.enableDamping ? (m.theta *= 1 - s.dampingFactor, m.phi *= 1 - s.dampingFactor, g.multiplyScalar(1 - s.dampingFactor)) : (m.set(0, 0, 0), g.set(0, 0, 0)), v = 1, !!(y || o.distanceToSquared(s.object.position) > p || 8 * (1 - a.dot(s.object.quaternion)) > p) && (s.dispatchEvent(h), o.copy(s.object.position), a.copy(s.object.quaternion), y = !1, !0)
            }), this.dispose = function () {
                s.domElement.removeEventListener("contextmenu", Y, !1), s.domElement.removeEventListener("mousedown", I, !1), s.domElement.removeEventListener("wheel", k, !1), s.domElement.removeEventListener("touchstart", W, !1), s.domElement.removeEventListener("touchend", X, !1), s.domElement.removeEventListener("touchmove", D, !1), document.removeEventListener("mousemove", F, !1), document.removeEventListener("mouseup", B, !1), window.removeEventListener("keydown", V, !1)
            };
            var s = this, h = {type: "change"}, c = {type: "start"}, u = {type: "end"},
                l = {NONE: -1, ROTATE: 0, DOLLY: 1, PAN: 2, TOUCH_ROTATE: 3, TOUCH_DOLLY_PAN: 4}, f = l.NONE, p = 1e-6,
                d = new THREE.Spherical, m = new THREE.Spherical, v = 1, g = new THREE.Vector3, y = !1,
                w = new THREE.Vector2, x = new THREE.Vector2, M = new THREE.Vector2, _ = new THREE.Vector2,
                E = new THREE.Vector2, S = new THREE.Vector2, b = new THREE.Vector2, T = new THREE.Vector2,
                L = new THREE.Vector2;

            function C() {
                return Math.pow(.95, s.zoomSpeed)
            }

            function R(t) {
                m.theta -= t
            }

            function A(t) {
                m.phi -= t
            }

            var P, N = (P = new THREE.Vector3, function (t, e) {
                P.setFromMatrixColumn(e, 0), P.multiplyScalar(-t), g.add(P)
            }), z = function () {
                var t = new THREE.Vector3;
                return function (e, n) {
                    !0 === s.screenSpacePanning ? t.setFromMatrixColumn(n, 1) : (t.setFromMatrixColumn(n, 0), t.crossVectors(s.object.up, t)), t.multiplyScalar(e), g.add(t)
                }
            }(), U = function () {
                var t = new THREE.Vector3;
                return function (e, n) {
                    var i = s.domElement === document ? s.domElement.body : s.domElement;
                    if (s.object.isPerspectiveCamera) {
                        t.copy(s.object.position).sub(s.target);
                        var r = t.length();
                        r *= Math.tan(s.object.fov / 2 * Math.PI / 180), N(2 * e * r / i.clientHeight, s.object.matrix), z(2 * n * r / i.clientHeight, s.object.matrix)
                    } else s.object.isOrthographicCamera ? (N(e * (s.object.right - s.object.left) / s.object.zoom / i.clientWidth, s.object.matrix), z(n * (s.object.top - s.object.bottom) / s.object.zoom / i.clientHeight, s.object.matrix)) : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."), s.enablePan = !1)
                }
            }();

            function H(t) {
                s.object.isPerspectiveCamera ? v /= t : s.object.isOrthographicCamera ? (s.object.zoom = Math.max(s.minZoom, Math.min(s.maxZoom, s.object.zoom * t)), s.object.updateProjectionMatrix(), y = !0) : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), s.enableZoom = !1)
            }

            function G(t) {
                s.object.isPerspectiveCamera ? v *= t : s.object.isOrthographicCamera ? (s.object.zoom = Math.max(s.minZoom, Math.min(s.maxZoom, s.object.zoom / t)), s.object.updateProjectionMatrix(), y = !0) : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), s.enableZoom = !1)
            }

            function O(t) {
                _.set(t.clientX, t.clientY)
            }

            function I(t) {
                if (!1 !== s.enabled) {
                    switch (t.preventDefault(), t.button) {
                        case s.mouseButtons.LEFT:
                            if (t.ctrlKey || t.metaKey || t.shiftKey) {
                                if (!1 === s.enablePan) return;
                                O(t), f = l.PAN
                            } else {
                                if (!1 === s.enableRotate) return;
                                !function (t) {
                                    w.set(t.clientX, t.clientY)
                                }(t), f = l.ROTATE
                            }
                            break;
                        case s.mouseButtons.MIDDLE:
                            if (!1 === s.enableZoom) return;
                            !function (t) {
                                b.set(t.clientX, t.clientY)
                            }(t), f = l.DOLLY;
                            break;
                        case s.mouseButtons.RIGHT:
                            if (!1 === s.enablePan) return;
                            O(t), f = l.PAN
                    }
                    f !== l.NONE && (document.addEventListener("mousemove", F, !1), document.addEventListener("mouseup", B, !1), s.dispatchEvent(c))
                }
            }

            function F(t) {
                if (!1 !== s.enabled) switch (t.preventDefault(), f) {
                    case l.ROTATE:
                        if (!1 === s.enableRotate) return;
                        !function (t) {
                            x.set(t.clientX, t.clientY), M.subVectors(x, w).multiplyScalar(s.rotateSpeed);
                            var e = s.domElement === document ? s.domElement.body : s.domElement;
                            R(2 * Math.PI * M.x / e.clientHeight), A(2 * Math.PI * M.y / e.clientHeight), w.copy(x), s.update()
                        }(t);
                        break;
                    case l.DOLLY:
                        if (!1 === s.enableZoom) return;
                        !function (t) {
                            T.set(t.clientX, t.clientY), L.subVectors(T, b), L.y > 0 ? H(C()) : L.y < 0 && G(C()), b.copy(T), s.update()
                        }(t);
                        break;
                    case l.PAN:
                        if (!1 === s.enablePan) return;
                        !function (t) {
                            E.set(t.clientX, t.clientY), S.subVectors(E, _).multiplyScalar(s.panSpeed), U(S.x, S.y), _.copy(E), s.update()
                        }(t)
                }
            }

            function B(t) {
                !1 !== s.enabled && (document.removeEventListener("mousemove", F, !1), document.removeEventListener("mouseup", B, !1), s.dispatchEvent(u), f = l.NONE)
            }

            function k(t) {
                !1 === s.enabled || !1 === s.enableZoom || f !== l.NONE && f !== l.ROTATE || (t.preventDefault(), t.stopPropagation(), s.dispatchEvent(c), function (t) {
                    t.deltaY < 0 ? G(C()) : t.deltaY > 0 && H(C()), s.update()
                }(t), s.dispatchEvent(u))
            }

            function V(t) {
                !1 !== s.enabled && !1 !== s.enableKeys && !1 !== s.enablePan && function (t) {
                    switch (t.keyCode) {
                        case s.keys.UP:
                            U(0, s.keyPanSpeed), s.update();
                            break;
                        case s.keys.BOTTOM:
                            U(0, -s.keyPanSpeed), s.update();
                            break;
                        case s.keys.LEFT:
                            U(s.keyPanSpeed, 0), s.update();
                            break;
                        case s.keys.RIGHT:
                            U(-s.keyPanSpeed, 0), s.update()
                    }
                }(t)
            }

            function W(t) {
                if (!1 !== s.enabled) {
                    switch (t.preventDefault(), t.touches.length) {
                        case 1:
                            if (!1 === s.enableRotate) return;
                            !function (t) {
                                w.set(t.touches[0].pageX, t.touches[0].pageY)
                            }(t), f = l.TOUCH_ROTATE;
                            break;
                        case 2:
                            if (!1 === s.enableZoom && !1 === s.enablePan) return;
                            !function (t) {
                                if (s.enableZoom) {
                                    var e = t.touches[0].pageX - t.touches[1].pageX,
                                        n = t.touches[0].pageY - t.touches[1].pageY, i = Math.sqrt(e * e + n * n);
                                    b.set(0, i)
                                }
                                s.enablePan && _.set(.5 * (t.touches[0].pageX + t.touches[1].pageX), .5 * (t.touches[0].pageY + t.touches[1].pageY))
                            }(t), f = l.TOUCH_DOLLY_PAN;
                            break;
                        default:
                            f = l.NONE
                    }
                    f !== l.NONE && s.dispatchEvent(c)
                }
            }

            function D(t) {
                if (!1 !== s.enabled) switch (t.preventDefault(), t.stopPropagation(), t.touches.length) {
                    case 1:
                        if (!1 === s.enableRotate) return;
                        if (f !== l.TOUCH_ROTATE) return;
                        !function (t) {
                            x.set(t.touches[0].pageX, t.touches[0].pageY), M.subVectors(x, w).multiplyScalar(s.rotateSpeed);
                            var e = s.domElement === document ? s.domElement.body : s.domElement;
                            R(2 * Math.PI * M.x / e.clientHeight), A(2 * Math.PI * M.y / e.clientHeight), w.copy(x), s.update()
                        }(t);
                        break;
                    case 2:
                        if (!1 === s.enableZoom && !1 === s.enablePan) return;
                        if (f !== l.TOUCH_DOLLY_PAN) return;
                        !function (t) {
                            if (s.enableZoom) {
                                var e = t.touches[0].pageX - t.touches[1].pageX,
                                    n = t.touches[0].pageY - t.touches[1].pageY, i = Math.sqrt(e * e + n * n);
                                T.set(0, i), L.set(0, Math.pow(T.y / b.y, s.zoomSpeed)), H(L.y), b.copy(T)
                            }
                            s.enablePan && (E.set(.5 * (t.touches[0].pageX + t.touches[1].pageX), .5 * (t.touches[0].pageY + t.touches[1].pageY)), S.subVectors(E, _).multiplyScalar(s.panSpeed), U(S.x, S.y), _.copy(E)), s.update()
                        }(t);
                        break;
                    default:
                        f = l.NONE
                }
            }

            function X(t) {
                !1 !== s.enabled && (s.dispatchEvent(u), f = l.NONE)
            }

            function Y(t) {
                !1 !== s.enabled && t.preventDefault()
            }

            s.domElement.addEventListener("contextmenu", Y, !1), s.domElement.addEventListener("mousedown", I, !1), s.domElement.addEventListener("wheel", k, !1), s.domElement.addEventListener("touchstart", W, !1), s.domElement.addEventListener("touchend", X, !1), s.domElement.addEventListener("touchmove", D, !1), window.addEventListener("keydown", V, !1), this.update()
        }, THREE.OrbitControls.prototype = Object.create(THREE.EventDispatcher.prototype), THREE.OrbitControls.prototype.constructor = THREE.OrbitControls, Object.defineProperties(THREE.OrbitControls.prototype, {
            center: {
                get: function () {
                    return console.warn("THREE.OrbitControls: .center has been renamed to .target"), this.target
                }
            }, noZoom: {
                get: function () {
                    return console.warn("THREE.OrbitControls: .noZoom has been deprecated. Use .enableZoom instead."), !this.enableZoom
                }, set: function (t) {
                    console.warn("THREE.OrbitControls: .noZoom has been deprecated. Use .enableZoom instead."), this.enableZoom = !t
                }
            }, noRotate: {
                get: function () {
                    return console.warn("THREE.OrbitControls: .noRotate has been deprecated. Use .enableRotate instead."), !this.enableRotate
                }, set: function (t) {
                    console.warn("THREE.OrbitControls: .noRotate has been deprecated. Use .enableRotate instead."), this.enableRotate = !t
                }
            }, noPan: {
                get: function () {
                    return console.warn("THREE.OrbitControls: .noPan has been deprecated. Use .enablePan instead."), !this.enablePan
                }, set: function (t) {
                    console.warn("THREE.OrbitControls: .noPan has been deprecated. Use .enablePan instead."), this.enablePan = !t
                }
            }, noKeys: {
                get: function () {
                    return console.warn("THREE.OrbitControls: .noKeys has been deprecated. Use .enableKeys instead."), !this.enableKeys
                }, set: function (t) {
                    console.warn("THREE.OrbitControls: .noKeys has been deprecated. Use .enableKeys instead."), this.enableKeys = !t
                }
            }, staticMoving: {
                get: function () {
                    return console.warn("THREE.OrbitControls: .staticMoving has been deprecated. Use .enableDamping instead."), !this.enableDamping
                }, set: function (t) {
                    console.warn("THREE.OrbitControls: .staticMoving has been deprecated. Use .enableDamping instead."), this.enableDamping = !t
                }
            }, dynamicDampingFactor: {
                get: function () {
                    return console.warn("THREE.OrbitControls: .dynamicDampingFactor has been renamed. Use .dampingFactor instead."), this.dampingFactor
                }, set: function (t) {
                    console.warn("THREE.OrbitControls: .dynamicDampingFactor has been renamed. Use .dampingFactor instead."), this.dampingFactor = t
                }
            }
        })
    }, {}], 12: [function (t, e, n) {
        (function (t) {
            t.CANVAS_SKETCH_DEFAULT_STORAGE_KEY = window.location.href
        }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }, {}]
}, {}, [1, 12]);