(function() {
    if (typeof window.CKEDITOR_BASEPATH == "undefined" || window.CKEDITOR_BASEPATH === null) window.CKEDITOR_BASEPATH = "/assets/ckeditor/"
}).call(this), function() {
    if (window.CKEDITOR && window.CKEDITOR.dom) return;
    window.CKEDITOR || (window.CKEDITOR = function() {
        var e = {
            timestamp: "C6HH5UF",
            version: "3.6.4",
            revision: "7575",
            rnd: Math.floor(Math.random() * 900) + 100,
            _: {},
            status: "unloaded",
            basePath: function() {
                var e = window.CKEDITOR_BASEPATH || "";
                if (!e) {
                    var t = document.getElementsByTagName("script");
                    for (var n = 0; n < t.length; n++) {
                        var r = t[n].src.match(/(^|.*[\\\/])ckeditor(?:_basic)?(?:_source)?.js(?:\?.*)?$/i);
                        if (r) {
                            e = r[1];
                            break
                        }
                    }
                }
                e.indexOf(":/") == -1 && (e.indexOf("/") === 0 ? e = location.href.match(/^.*?:\/\/[^\/]*/)[0] + e : e = location.href.match(/^[^\?]*\/(?:)/)[0] + e);
                if (!e) throw 'The CKEditor installation path could not be automatically detected. Please set the global variable "CKEDITOR_BASEPATH" before creating editor instances.';
                return e
            }(),
            getUrl: function(e) {
                return e.indexOf(":/") == -1 && e.indexOf("/") !== 0 && (e = this.basePath + e), this.timestamp && e.charAt(e.length - 1) != "/" && !/[&?]t=/.test(e) && (e += (e.indexOf("?") >= 0 ? "&" : "?") + "t=" + this.timestamp), e
            }
        },
            t = window.CKEDITOR_GETURL;
        if (t) {
            var n = e.getUrl;
            e.getUrl = function(r) {
                return t.call(e, r) || n.call(e, r)
            }
        }
        return e
    }());
    var e = CKEDITOR;
    e.event || (e.event = function() {}, e.event.implementOn = function(t) {
        var n = e.event.prototype;
        for (var r in n) t[r] == undefined && (t[r] = n[r])
    }, e.event.prototype = function() {
        var e = function(e) {
                var t = e.getPrivate && e.getPrivate() || e._ || (e._ = {});
                return t.events || (t.events = {})
            },
            t = function(e) {
                this.name = e, this.listeners = []
            };
        return t.prototype = {
            getListenerIndex: function(e) {
                for (var t = 0, n = this.listeners; t < n.length; t++) if (n[t].fn == e) return t;
                return -1
            }
        }, {
            on: function(n, r, i, s, o) {
                var u = e(this),
                    a = u[n] || (u[n] = new t(n));
                if (a.getListenerIndex(r) < 0) {
                    var f = a.listeners;
                    i || (i = this), isNaN(o) && (o = 10);
                    var l = this,
                        c = function(e, t, o, u) {
                            var a = {
                                name: n,
                                sender: this,
                                editor: e,
                                data: t,
                                listenerData: s,
                                stop: o,
                                cancel: u,
                                removeListener: function() {
                                    l.removeListener(n, r)
                                }
                            };
                            return r.call(i, a), a.data
                        };
                    c.fn = r, c.priority = o;
                    for (var h = f.length - 1; h >= 0; h--) if (f[h].priority <= o) {
                        f.splice(h + 1, 0, c);
                        return
                    }
                    f.unshift(c)
                }
            },
            fire: function() {
                var t = !1,
                    n = function() {
                        t = !0
                    },
                    r = !1,
                    i = function() {
                        r = !0
                    };
                return function(s, o, u) {
                    var a = e(this)[s],
                        f = t,
                        l = r;
                    t = r = !1;
                    if (a) {
                        var c = a.listeners;
                        if (c.length) {
                            c = c.slice(0);
                            for (var h = 0; h < c.length; h++) {
                                var p = c[h].call(this, u, o, n, i);
                                typeof p != "undefined" && (o = p);
                                if (t || r) break
                            }
                        }
                    }
                    var v = r || (typeof o == "undefined" ? !1 : o);
                    return t = f, r = l, v
                }
            }(),
            fireOnce: function(t, n, r) {
                var i = this.fire(t, n, r);
                return delete e(this)[t], i
            },
            removeListener: function(t, n) {
                var r = e(this)[t];
                if (r) {
                    var i = r.getListenerIndex(n);
                    i >= 0 && r.listeners.splice(i, 1)
                }
            },
            hasListeners: function(t) {
                var n = e(this)[t];
                return n && n.listeners.length > 0
            }
        }
    }()), e.editor || (e.ELEMENT_MODE_NONE = 0, e.ELEMENT_MODE_REPLACE = 1, e.ELEMENT_MODE_APPENDTO = 2, e.editor = function(t, n, r, i) {
        var s = this;
        s._ = {
            instanceConfig: t,
            element: n,
            data: i
        }, s.elementMode = r || 0, e.event.call(s), s._init()
    }, e.editor.replace = function(t, n) {
        var r = t;
        if (typeof r != "object") {
            r = document.getElementById(t), r && r.tagName.toLowerCase() in {
                style: 1,
                script: 1,
                base: 1,
                link: 1,
                meta: 1,
                title: 1
            } && (r = null);
            if (!r) {
                var i = 0,
                    s = document.getElementsByName(t);
                while ((r = s[i++]) && r.tagName.toLowerCase() != "textarea");
            }
            if (!r) throw '[CKEDITOR.editor.replace] The element with id or name "' + t + '" was not found.'
        }
        return r.style.visibility = "hidden", new e.editor(n, r, 1)
    }, e.editor.appendTo = function(t, n, r) {
        var i = t;
        if (typeof i != "object") {
            i = document.getElementById(t);
            if (!i) throw '[CKEDITOR.editor.appendTo] The element with id "' + t + '" was not found.'
        }
        return new e.editor(n, i, 2, r)
    }, e.editor.prototype = {
        _init: function() {
            var t = e.editor._pending || (e.editor._pending = []);
            t.push(this)
        },
        fire: function(t, n) {
            return e.event.prototype.fire.call(this, t, n, this)
        },
        fireOnce: function(t, n) {
            return e.event.prototype.fireOnce.call(this, t, n, this)
        }
    }, e.event.implementOn(e.editor.prototype, !0)), e.env || (e.env = function() {
        var e = navigator.userAgent.toLowerCase(),
            t = window.opera,
            n = {
                ie: !1,
                opera: !! t && t.version,
                webkit: e.indexOf(" applewebkit/") > -1,
                air: e.indexOf(" adobeair/") > -1,
                mac: e.indexOf("macintosh") > -1,
                quirks: document.compatMode == "BackCompat",
                mobile: e.indexOf("mobile") > -1,
                iOS: /(ipad|iphone|ipod)/.test(e),
                isCustomDomain: function() {
                    if (!this.ie) return !1;
                    var e = document.domain,
                        t = window.location.hostname;
                    return e != t && e != "[" + t + "]"
                },
                secure: location.protocol == "https:"
            };
        n.gecko = navigator.product == "Gecko" && !n.webkit && !n.opera;
        var r = 0;
        n.ie && (r = parseFloat(e.match(/msie (\d+)/)[1]), n.ie8 = !! document.documentMode, n.ie8Compat = document.documentMode == 8, n.ie9Compat = document.documentMode == 9, n.ie7Compat = r == 7 && !document.documentMode || document.documentMode == 7, n.ie6Compat = r < 7 || n.quirks);
        if (n.gecko) {
            var i = e.match(/rv:([\d\.]+)/);
            i && (i = i[1].split("."), r = i[0] * 1e4 + (i[1] || 0) * 100 + +(i[2] || 0))
        }
        return n.opera && (r = parseFloat(t.version())), n.air && (r = parseFloat(e.match(/ adobeair\/(\d+)/)[1])), n.webkit && (r = parseFloat(e.match(/ applewebkit\/(\d+)/)[1])), n.version = r, n.isCompatible = n.iOS && r >= 534 || !n.mobile && (n.ie && r >= 6 || n.gecko && r >= 10801 || n.opera && r >= 9.5 || n.air && r >= 1 || n.webkit && r >= 522 || !1), n.cssClass = "cke_browser_" + (n.ie ? "ie" : n.gecko ? "gecko" : n.opera ? "opera" : n.webkit ? "webkit" : "unknown"), n.quirks && (n.cssClass += " cke_browser_quirks"), n.ie && (n.cssClass += " cke_browser_ie" + (n.version < 7 ? "6" : n.version >= 8 ? document.documentMode : "7"), n.quirks && (n.cssClass += " cke_browser_iequirks")), n.gecko && r < 10900 && (n.cssClass += " cke_browser_gecko18"), n.air && (n.cssClass += " cke_browser_air"), n
    }());
    var t = e.env,
        n = t.ie;
    e.status == "unloaded" &&
    function() {
        e.event.implementOn(e), e.loadFullCore = function() {
            if (e.status != "basic_ready") {
                e.loadFullCore._load = 1;
                return
            }
            delete e.loadFullCore;
            var t = document.createElement("script");
            t.type = "text/javascript", t.src = e.basePath + "ckeditor.js", document.getElementsByTagName("head")[0].appendChild(t)
        }, e.loadFullCoreTimeout = 0, e.replaceClass = "ckeditor", e.replaceByClassEnabled = 1;
        var n = function(n, r, i, s) {
                if (t.isCompatible) {
                    e.loadFullCore && e.loadFullCore();
                    var o = i(n, r, s);
                    return e.add(o), o
                }
                return null
            };
        e.replace = function(t, r) {
            return n(t, r, e.editor.replace)
        }, e.appendTo = function(t, r, i) {
            return n(t, r, e.editor.appendTo, i)
        }, e.add = function(e) {
            var t = this._.pending || (this._.pending = []);
            t.push(e)
        }, e.replaceAll = function() {
            var e = document.getElementsByTagName("textarea");
            for (var t = 0; t < e.length; t++) {
                var n = null,
                    r = e[t];
                if (!r.name && !r.id) continue;
                if (typeof arguments[0] == "string") {
                    var i = new RegExp("(?:^|\\s)" + arguments[0] + "(?:$|\\s)");
                    if (!i.test(r.className)) continue
                } else if (typeof arguments[0] == "function") {
                    n = {};
                    if (arguments[0](r, n) === !1) continue
                }
                this.replace(r, n)
            }
        }, function() {
            var t = function() {
                    var t = e.loadFullCore,
                        n = e.loadFullCoreTimeout;
                    e.replaceByClassEnabled && e.replaceAll(e.replaceClass), e.status = "basic_ready", t && t._load ? t() : n && setTimeout(function() {
                        e.loadFullCore && e.loadFullCore()
                    }, n * 1e3)
                };
            window.addEventListener ? window.addEventListener("load", t, !1) : window.attachEvent && window.attachEvent("onload", t)
        }(), e.status = "basic_loaded"
    }(), e.dom = {};
    var r = e.dom;
    (function() {
        var t = [];
        e.on("reset", function() {
            t = []
        }), e.tools = {
            arrayCompare: function(e, t) {
                if (!e && !t) return !0;
                if (!e || !t || e.length != t.length) return !1;
                for (var n = 0; n < e.length; n++) if (e[n] != t[n]) return !1;
                return !0
            },
            clone: function(e) {
                var t;
                if (e && e instanceof Array) {
                    t = [];
                    for (var n = 0; n < e.length; n++) t[n] = this.clone(e[n]);
                    return t
                }
                if (e === null || typeof e != "object" || e instanceof String || e instanceof Number || e instanceof Boolean || e instanceof Date || e instanceof RegExp) return e;
                t = new e.constructor;
                for (var r in e) {
                    var i = e[r];
                    t[r] = this.clone(i)
                }
                return t
            },
            capitalize: function(e) {
                return e.charAt(0).toUpperCase() + e.substring(1).toLowerCase()
            },
            extend: function(e) {
                var t = arguments.length,
                    n, r;
                typeof(n = arguments[t - 1]) == "boolean" ? t-- : typeof(n = arguments[t - 2]) == "boolean" && (r = arguments[t - 1], t -= 2);
                for (var i = 1; i < t; i++) {
                    var s = arguments[i];
                    for (var o in s) if (n === !0 || e[o] == undefined) if (!r || o in r) e[o] = s[o]
                }
                return e
            },
            prototypedCopy: function(e) {
                var t = function() {};
                return t.prototype = e, new t
            },
            isArray: function(e) {
                return !!e && e instanceof Array
            },
            isEmpty: function(e) {
                for (var t in e) if (e.hasOwnProperty(t)) return !1;
                return !0
            },
            cssStyleToDomStyle: function() {
                var e = document.createElement("div").style,
                    t = typeof e.cssFloat != "undefined" ? "cssFloat" : typeof e.styleFloat != "undefined" ? "styleFloat" : "float";
                return function(e) {
                    return e == "float" ? t : e.replace(/-./g, function(e) {
                        return e.substr(1).toUpperCase()
                    })
                }
            }(),
            buildStyleHtml: function(e) {
                e = [].concat(e);
                var t, n = [];
                for (var r = 0; r < e.length; r++) t = e[r], /@import|[{}]/.test(t) ? n.push("<style>" + t + "</style>") : n.push('<link type="text/css" rel=stylesheet href="' + t + '">');
                return n.join("")
            },
            htmlEncode: function(e) {
                var t = function(e) {
                        var t = new r.element("span");
                        return t.setText(e), t.getHtml()
                    },
                    n = t("\n").toLowerCase() == "<br>" ?
                function(e) {
                    return t(e).replace(/<br>/gi, "\n")
                } : t, i = t(">") == ">" ?
                function(e) {
                    return n(e).replace(/>/g, "&gt;")
                } : n, s = t("  ") == "&nbsp; " ?
                function(e) {
                    return i(e).replace(/&nbsp;/g, " ")
                } : i;
                return this.htmlEncode = s, this.htmlEncode(e)
            },
            htmlEncodeAttr: function(e) {
                return e.replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
            },
            getNextNumber: function() {
                var e = 0;
                return function() {
                    return ++e
                }
            }(),
            getNextId: function() {
                return "cke_" + this.getNextNumber()
            },
            override: function(e, t) {
                return t(e)
            },
            setTimeout: function(e, t, n, r, i) {
                return i || (i = window), n || (n = i), i.setTimeout(function() {
                    r ? e.apply(n, [].concat(r)) : e.apply(n)
                }, t || 0)
            },
            trim: function() {
                var e = /(?:^[ \t\n\r]+)|(?:[ \t\n\r]+$)/g;
                return function(t) {
                    return t.replace(e, "")
                }
            }(),
            ltrim: function() {
                var e = /^[ \t\n\r]+/g;
                return function(t) {
                    return t.replace(e, "")
                }
            }(),
            rtrim: function() {
                var e = /[ \t\n\r]+$/g;
                return function(t) {
                    return t.replace(e, "")
                }
            }(),
            indexOf: Array.prototype.indexOf ?
            function(e, t) {
                return e.indexOf(t)
            } : function(e, t) {
                for (var n = 0, r = e.length; n < r; n++) if (e[n] === t) return n;
                return -1
            },
            bind: function(e, t) {
                return function() {
                    return e.apply(t, arguments)
                }
            },
            createClass: function(t) {
                var n = t.$,
                    r = t.base,
                    i = t.privates || t._,
                    s = t.proto,
                    o = t.statics;
                if (i) {
                    var u = n;
                    n = function() {
                        var t = this,
                            n = t._ || (t._ = {});
                        for (var r in i) {
                            var s = i[r];
                            n[r] = typeof s == "function" ? e.tools.bind(s, t) : s
                        }
                        u.apply(t, arguments)
                    }
                }
                return r && (n.prototype = this.prototypedCopy(r.prototype), n.prototype.constructor = n, n.prototype.base = function() {
                    this.base = r.prototype.base, r.apply(this, arguments), this.base = arguments.callee
                }), s && this.extend(n.prototype, s, !0), o && this.extend(n, o, !0), n
            },
            addFunction: function(e, n) {
                return t.push(function() {
                    return e.apply(n || this, arguments)
                }) - 1
            },
            removeFunction: function(e) {
                t[e] = null
            },
            callFunction: function(e) {
                var n = t[e];
                return n && n.apply(window, Array.prototype.slice.call(arguments, 1))
            },
            cssLength: function() {
                return function(e) {
                    return e + (!e || isNaN(Number(e)) ? "" : "px")
                }
            }(),
            convertToPx: function() {
                var t;
                return function(n) {
                    return t || (t = r.element.createFromHtml('<div style="position:absolute;left:-9999px;top:-9999px;margin:0px;padding:0px;border:0px;"></div>', e.document), e.document.getBody().append(t)), /%$/.test(n) ? n : (t.setStyle("width", n), t.$.clientWidth)
                }
            }(),
            repeat: function(e, t) {
                return (new Array(t + 1)).join(e)
            },
            tryThese: function() {
                var e;
                for (var t = 0, n = arguments.length; t < n; t++) {
                    var r = arguments[t];
                    try {
                        e = r();
                        break
                    } catch (i) {}
                }
                return e
            },
            genKey: function() {
                return Array.prototype.slice.call(arguments).join("-")
            }
        }
    })();
    var i = e.tools;
    e.dtd = function() {
        var e = i.extend,
            t = {
                isindex: 1,
                fieldset: 1
            },
            n = {
                input: 1,
                button: 1,
                select: 1,
                textarea: 1,
                label: 1
            },
            r = e({
                a: 1
            }, n),
            s = e({
                iframe: 1
            }, r),
            o = {
                hr: 1,
                ul: 1,
                menu: 1,
                div: 1,
                section: 1,
                header: 1,
                footer: 1,
                nav: 1,
                article: 1,
                aside: 1,
                figure: 1,
                dialog: 1,
                hgroup: 1,
                mark: 1,
                time: 1,
                meter: 1,
                command: 1,
                keygen: 1,
                output: 1,
                progress: 1,
                audio: 1,
                video: 1,
                details: 1,
                datagrid: 1,
                datalist: 1,
                blockquote: 1,
                noscript: 1,
                table: 1,
                center: 1,
                address: 1,
                dir: 1,
                pre: 1,
                h5: 1,
                dl: 1,
                h4: 1,
                noframes: 1,
                h6: 1,
                ol: 1,
                h1: 1,
                h3: 1,
                h2: 1
            },
            u = {
                ins: 1,
                del: 1,
                script: 1,
                style: 1
            },
            a = e({
                b: 1,
                acronym: 1,
                bdo: 1,
                "var": 1,
                "#": 1,
                abbr: 1,
                code: 1,
                br: 1,
                i: 1,
                cite: 1,
                kbd: 1,
                u: 1,
                strike: 1,
                s: 1,
                tt: 1,
                strong: 1,
                q: 1,
                samp: 1,
                em: 1,
                dfn: 1,
                span: 1,
                wbr: 1
            }, u),
            f = e({
                sub: 1,
                img: 1,
                object: 1,
                sup: 1,
                basefont: 1,
                map: 1,
                applet: 1,
                font: 1,
                big: 1,
                small: 1,
                mark: 1
            }, a),
            l = e({
                p: 1
            }, f),
            c = e({
                iframe: 1
            }, f, n),
            h = {
                img: 1,
                noscript: 1,
                br: 1,
                kbd: 1,
                center: 1,
                button: 1,
                basefont: 1,
                h5: 1,
                h4: 1,
                samp: 1,
                h6: 1,
                ol: 1,
                h1: 1,
                h3: 1,
                h2: 1,
                form: 1,
                font: 1,
                "#": 1,
                select: 1,
                menu: 1,
                ins: 1,
                abbr: 1,
                label: 1,
                code: 1,
                table: 1,
                script: 1,
                cite: 1,
                input: 1,
                iframe: 1,
                strong: 1,
                textarea: 1,
                noframes: 1,
                big: 1,
                small: 1,
                span: 1,
                hr: 1,
                sub: 1,
                bdo: 1,
                "var": 1,
                div: 1,
                section: 1,
                header: 1,
                footer: 1,
                nav: 1,
                article: 1,
                aside: 1,
                figure: 1,
                dialog: 1,
                hgroup: 1,
                mark: 1,
                time: 1,
                meter: 1,
                menu: 1,
                command: 1,
                keygen: 1,
                output: 1,
                progress: 1,
                audio: 1,
                video: 1,
                details: 1,
                datagrid: 1,
                datalist: 1,
                object: 1,
                sup: 1,
                strike: 1,
                dir: 1,
                map: 1,
                dl: 1,
                applet: 1,
                del: 1,
                isindex: 1,
                fieldset: 1,
                ul: 1,
                b: 1,
                acronym: 1,
                a: 1,
                blockquote: 1,
                i: 1,
                u: 1,
                s: 1,
                tt: 1,
                address: 1,
                q: 1,
                pre: 1,
                p: 1,
                em: 1,
                dfn: 1
            },
            p = e({
                a: 1
            }, c),
            d = {
                tr: 1
            },
            v = {
                "#": 1
            },
            m = e({
                param: 1
            }, h),
            g = e({
                form: 1
            }, t, s, o, l),
            y = {
                li: 1
            },
            b = {
                style: 1,
                script: 1
            },
            w = {
                base: 1,
                link: 1,
                meta: 1,
                title: 1
            },
            E = e(w, b),
            S = {
                head: 1,
                body: 1
            },
            x = {
                html: 1
            },
            T = {
                address: 1,
                blockquote: 1,
                center: 1,
                dir: 1,
                div: 1,
                section: 1,
                header: 1,
                footer: 1,
                nav: 1,
                article: 1,
                aside: 1,
                figure: 1,
                dialog: 1,
                hgroup: 1,
                time: 1,
                meter: 1,
                menu: 1,
                command: 1,
                keygen: 1,
                output: 1,
                progress: 1,
                audio: 1,
                video: 1,
                details: 1,
                datagrid: 1,
                datalist: 1,
                dl: 1,
                fieldset: 1,
                form: 1,
                h1: 1,
                h2: 1,
                h3: 1,
                h4: 1,
                h5: 1,
                h6: 1,
                hr: 1,
                isindex: 1,
                noframes: 1,
                ol: 1,
                p: 1,
                pre: 1,
                table: 1,
                ul: 1
            };
        return {
            $nonBodyContent: e(x, S, w),
            $block: T,
            $blockLimit: {
                body: 1,
                div: 1,
                section: 1,
                header: 1,
                footer: 1,
                nav: 1,
                article: 1,
                aside: 1,
                figure: 1,
                dialog: 1,
                hgroup: 1,
                time: 1,
                meter: 1,
                menu: 1,
                command: 1,
                keygen: 1,
                output: 1,
                progress: 1,
                audio: 1,
                video: 1,
                details: 1,
                datagrid: 1,
                datalist: 1,
                td: 1,
                th: 1,
                caption: 1,
                form: 1
            },
            $inline: p,
            $body: e({
                script: 1,
                style: 1
            }, T),
            $cdata: {
                script: 1,
                style: 1
            },
            $empty: {
                area: 1,
                base: 1,
                br: 1,
                col: 1,
                hr: 1,
                img: 1,
                input: 1,
                link: 1,
                meta: 1,
                param: 1,
                wbr: 1
            },
            $listItem: {
                dd: 1,
                dt: 1,
                li: 1
            },
            $list: {
                ul: 1,
                ol: 1,
                dl: 1
            },
            $nonEditable: {
                applet: 1,
                button: 1,
                embed: 1,
                iframe: 1,
                map: 1,
                object: 1,
                option: 1,
                script: 1,
                textarea: 1,
                param: 1,
                audio: 1,
                video: 1
            },
            $captionBlock: {
                caption: 1,
                legend: 1
            },
            $removeEmpty: {
                abbr: 1,
                acronym: 1,
                address: 1,
                b: 1,
                bdo: 1,
                big: 1,
                cite: 1,
                code: 1,
                del: 1,
                dfn: 1,
                em: 1,
                font: 1,
                i: 1,
                ins: 1,
                label: 1,
                kbd: 1,
                q: 1,
                s: 1,
                samp: 1,
                small: 1,
                span: 1,
                strike: 1,
                strong: 1,
                sub: 1,
                sup: 1,
                tt: 1,
                u: 1,
                "var": 1,
                mark: 1
            },
            $tabIndex: {
                a: 1,
                area: 1,
                button: 1,
                input: 1,
                object: 1,
                select: 1,
                textarea: 1
            },
            $tableContent: {
                caption: 1,
                col: 1,
                colgroup: 1,
                tbody: 1,
                td: 1,
                tfoot: 1,
                th: 1,
                thead: 1,
                tr: 1
            },
            html: S,
            head: E,
            style: v,
            script: v,
            body: g,
            base: {},
            link: {},
            meta: {},
            title: v,
            col: {},
            tr: {
                td: 1,
                th: 1
            },
            img: {},
            colgroup: {
                col: 1
            },
            noscript: g,
            td: g,
            br: {},
            wbr: {},
            th: g,
            center: g,
            kbd: p,
            button: e(l, o),
            basefont: {},
            h5: p,
            h4: p,
            samp: p,
            h6: p,
            ol: y,
            h1: p,
            h3: p,
            option: v,
            h2: p,
            form: e(t, s, o, l),
            select: {
                optgroup: 1,
                option: 1
            },
            font: p,
            ins: p,
            menu: y,
            abbr: p,
            label: p,
            table: {
                thead: 1,
                col: 1,
                tbody: 1,
                tr: 1,
                colgroup: 1,
                caption: 1,
                tfoot: 1
            },
            code: p,
            tfoot: d,
            cite: p,
            li: g,
            input: {},
            iframe: g,
            strong: p,
            textarea: v,
            noframes: g,
            big: p,
            small: p,
            span: p,
            hr: {},
            dt: p,
            sub: p,
            optgroup: {
                option: 1
            },
            param: {},
            bdo: p,
            "var": p,
            div: g,
            object: m,
            sup: p,
            dd: g,
            strike: p,
            area: {},
            dir: y,
            map: e({
                area: 1,
                form: 1,
                p: 1
            }, t, u, o),
            applet: m,
            dl: {
                dt: 1,
                dd: 1
            },
            del: p,
            isindex: {},
            fieldset: e({
                legend: 1
            }, h),
            thead: d,
            ul: y,
            acronym: p,
            b: p,
            a: c,
            blockquote: g,
            caption: p,
            i: p,
            u: p,
            tbody: d,
            s: p,
            address: e(s, l),
            tt: p,
            legend: p,
            q: p,
            pre: e(a, r),
            p: p,
            em: p,
            dfn: p,
            section: g,
            header: g,
            footer: g,
            nav: g,
            article: g,
            aside: g,
            figure: g,
            dialog: g,
            hgroup: g,
            mark: p,
            time: p,
            meter: p,
            menu: p,
            command: p,
            keygen: p,
            output: p,
            progress: m,
            audio: m,
            video: m,
            details: m,
            datagrid: m,
            datalist: m
        }
    }();
    var s = e.dtd;
    r.event = function(e) {
        this.$ = e
    }, r.event.prototype = {
        getKey: function() {
            return this.$.keyCode || this.$.which
        },
        getKeystroke: function() {
            var e = this,
                t = e.getKey();
            if (e.$.ctrlKey || e.$.metaKey) t += 1114112;
            return e.$.shiftKey && (t += 2228224), e.$.altKey && (t += 4456448), t
        },
        preventDefault: function(e) {
            var t = this.$;
            t.preventDefault ? t.preventDefault() : t.returnValue = !1, e && this.stopPropagation()
        },
        stopPropagation: function() {
            var e = this.$;
            e.stopPropagation ? e.stopPropagation() : e.cancelBubble = !0
        },
        getTarget: function() {
            var e = this.$.target || this.$.srcElement;
            return e ? new r.node(e) : null
        }
    }, e.CTRL = 1114112, e.SHIFT = 2228224, e.ALT = 4456448, r.domObject = function(e) {
        e && (this.$ = e)
    }, r.domObject.prototype = function() {
        var t = function(t, n) {
                return function(i) {
                    typeof e != "undefined" && t.fire(n, new r.event(i))
                }
            };
        return {
            getPrivate: function() {
                var e;
                return (e = this.getCustomData("_")) || this.setCustomData("_", e = {}), e
            },
            on: function(n) {
                var r = this,
                    i = r.getCustomData("_cke_nativeListeners");
                i || (i = {}, r.setCustomData("_cke_nativeListeners", i));
                if (!i[n]) {
                    var s = i[n] = t(r, n);
                    r.$.addEventListener ? r.$.addEventListener(n, s, !! e.event.useCapture) : r.$.attachEvent && r.$.attachEvent("on" + n, s)
                }
                return e.event.prototype.on.apply(r, arguments)
            },
            removeListener: function(t) {
                var n = this;
                e.event.prototype.removeListener.apply(n, arguments);
                if (!n.hasListeners(t)) {
                    var r = n.getCustomData("_cke_nativeListeners"),
                        i = r && r[t];
                    i && (n.$.removeEventListener ? n.$.removeEventListener(t, i, !1) : n.$.detachEvent && n.$.detachEvent("on" + t, i), delete r[t])
                }
            },
            removeAllListeners: function() {
                var e = this,
                    t = e.getCustomData("_cke_nativeListeners");
                for (var n in t) {
                    var r = t[n];
                    e.$.detachEvent ? e.$.detachEvent("on" + n, r) : e.$.removeEventListener && e.$.removeEventListener(n, r, !1), delete t[n]
                }
            }
        }
    }(), function(t) {
        var n = {};
        e.on("reset", function() {
            n = {}
        }), t.equals = function(e) {
            return e && e.$ === this.$
        }, t.setCustomData = function(e, t) {
            var r = this.getUniqueId(),
                i = n[r] || (n[r] = {});
            return i[e] = t, this
        }, t.getCustomData = function(e) {
            var t = this.$["data-cke-expando"],
                r = t && n[t];
            return r && r[e]
        }, t.removeCustomData = function(e) {
            var t = this.$["data-cke-expando"],
                r = t && n[t],
                i = r && r[e];
            return typeof i != "undefined" && delete r[e], i || null
        }, t.clearCustomData = function() {
            this.removeAllListeners();
            var e = this.$["data-cke-expando"];
            e && delete n[e]
        }, t.getUniqueId = function() {
            return this.$["data-cke-expando"] || (this.$["data-cke-expando"] = i.getNextNumber())
        }, e.event.implementOn(t)
    }(r.domObject.prototype), r.window = function(e) {
        r.domObject.call(this, e)
    }, r.window.prototype = new r.domObject, i.extend(r.window.prototype, {
        focus: function() {
            t.webkit && this.$.parent && this.$.parent.focus(), this.$.focus()
        },
        getViewPaneSize: function() {
            var e = this.$.document,
                t = e.compatMode == "CSS1Compat";
            return {
                width: (t ? e.documentElement.clientWidth : e.body.clientWidth) || 0,
                height: (t ? e.documentElement.clientHeight : e.body.clientHeight) || 0
            }
        },
        getScrollPosition: function() {
            var e = this.$;
            if ("pageXOffset" in e) return {
                x: e.pageXOffset || 0,
                y: e.pageYOffset || 0
            };
            var t = e.document;
            return {
                x: t.documentElement.scrollLeft || t.body.scrollLeft || 0,
                y: t.documentElement.scrollTop || t.body.scrollTop || 0
            }
        }
    }), r.document = function(e) {
        r.domObject.call(this, e)
    };
    var o = r.document;
    o.prototype = new r.domObject, i.extend(o.prototype, {
        appendStyleSheet: function(e) {
            if (this.$.createStyleSheet) this.$.createStyleSheet(e);
            else {
                var t = new r.element("link");
                t.setAttributes({
                    rel: "stylesheet",
                    type: "text/css",
                    href: e
                }), this.getHead().append(t)
            }
        },
        appendStyleText: function(e) {
            var t = this;
            if (t.$.createStyleSheet) {
                var n = t.$.createStyleSheet("");
                n.cssText = e
            } else {
                var i = new r.element("style", t);
                i.append(new r.text(e, t)), t.getHead().append(i)
            }
        },
        createElement: function(e, t) {
            var n = new r.element(e, this);
            return t && (t.attributes && n.setAttributes(t.attributes), t.styles && n.setStyles(t.styles)), n
        },
        createText: function(e) {
            return new r.text(e, this)
        },
        focus: function() {
            this.getWindow().focus()
        },
        getById: function(e) {
            var t = this.$.getElementById(e);
            return t ? new r.element(t) : null
        },
        getByAddress: function(e, t) {
            var n = this.$.documentElement;
            for (var i = 0; n && i < e.length; i++) {
                var s = e[i];
                if (!t) {
                    n = n.childNodes[s];
                    continue
                }
                var o = -1;
                for (var u = 0; u < n.childNodes.length; u++) {
                    var a = n.childNodes[u];
                    if (t === !0 && a.nodeType == 3 && a.previousSibling && a.previousSibling.nodeType == 3) continue;
                    o++;
                    if (o == s) {
                        n = a;
                        break
                    }
                }
            }
            return n ? new r.node(n) : null
        },
        getElementsByTag: function(e, t) {
            return (!n || document.documentMode > 8) && t && (e = t + ":" + e), new r.nodeList(this.$.getElementsByTagName(e))
        },
        getHead: function() {
            var e = this.$.getElementsByTagName("head")[0];
            return e ? e = new r.element(e) : e = this.getDocumentElement().append(new r.element("head"), !0), (this.getHead = function() {
                return e
            })()
        },
        getBody: function() {
            var e = new r.element(this.$.body);
            return (this.getBody = function() {
                return e
            })()
        },
        getDocumentElement: function() {
            var e = new r.element(this.$.documentElement);
            return (this.getDocumentElement = function() {
                return e
            })()
        },
        getWindow: function() {
            var e = new r.window(this.$.parentWindow || this.$.defaultView);
            return (this.getWindow = function() {
                return e
            })()
        },
        write: function(e) {
            var n = this;
            n.$.open("text/html", "replace"), t.isCustomDomain() && (n.$.domain = document.domain), n.$.write(e), n.$.close()
        }
    }), r.node = function(e) {
        if (e) {
            var t = e.nodeType == 9 ? "document" : e.nodeType == 1 ? "element" : e.nodeType == 3 ? "text" : e.nodeType == 8 ? "comment" : "domObject";
            return new r[t](e)
        }
        return this
    }, r.node.prototype = new r.domObject, e.NODE_ELEMENT = 1, e.NODE_DOCUMENT = 9, e.NODE_TEXT = 3, e.NODE_COMMENT = 8, e.NODE_DOCUMENT_FRAGMENT = 11, e.POSITION_IDENTICAL = 0, e.POSITION_DISCONNECTED = 1, e.POSITION_FOLLOWING = 2, e.POSITION_PRECEDING = 4, e.POSITION_IS_CONTAINED = 8, e.POSITION_CONTAINS = 16, i.extend(r.node.prototype, {
        appendTo: function(e, t) {
            return e.append(this, t), e
        },
        clone: function(e, t) {
            var n = this.$.cloneNode(e),
                i = function(n) {
                    if (n.nodeType != 1) return;
                    t || n.removeAttribute("id", !1), n.removeAttribute("data-cke-expando", !1);
                    if (e) {
                        var r = n.childNodes;
                        for (var s = 0; s < r.length; s++) i(r[s])
                    }
                };
            return i(n), new r.node(n)
        },
        hasPrevious: function() {
            return !!this.$.previousSibling
        },
        hasNext: function() {
            return !!this.$.nextSibling
        },
        insertAfter: function(e) {
            return e.$.parentNode.insertBefore(this.$, e.$.nextSibling), e
        },
        insertBefore: function(e) {
            return e.$.parentNode.insertBefore(this.$, e.$), e
        },
        insertBeforeMe: function(e) {
            return this.$.parentNode.insertBefore(e.$, this.$), e
        },
        getAddress: function(e) {
            var t = [],
                n = this.getDocument().$.documentElement,
                r = this.$;
            while (r && r != n) {
                var i = r.parentNode;
                i && t.unshift(this.getIndex.call({
                    $: r
                }, e)), r = i
            }
            return t
        },
        getDocument: function() {
            return new o(this.$.ownerDocument || this.$.parentNode.ownerDocument)
        },
        getIndex: function(e) {
            var t = this.$,
                n = 0;
            while (t = t.previousSibling) {
                if (e && t.nodeType == 3 && (!t.nodeValue.length || t.previousSibling && t.previousSibling.nodeType == 3)) continue;
                n++
            }
            return n
        },
        getNextSourceNode: function(e, t, n) {
            if (n && !n.call) {
                var r = n;
                n = function(e) {
                    return !e.equals(r)
                }
            }
            var i = !e && this.getFirst && this.getFirst(),
                s;
            if (!i) {
                if (this.type == 1 && n && n(this, !0) === !1) return null;
                i = this.getNext()
            }
            while (!i && (s = (s || this).getParent())) {
                if (n && n(s, !0) === !1) return null;
                i = s.getNext()
            }
            return i ? n && n(i) === !1 ? null : t && t != i.type ? i.getNextSourceNode(!1, t, n) : i : null
        },
        getPreviousSourceNode: function(e, t, n) {
            if (n && !n.call) {
                var r = n;
                n = function(e) {
                    return !e.equals(r)
                }
            }
            var i = !e && this.getLast && this.getLast(),
                s;
            if (!i) {
                if (this.type == 1 && n && n(this, !0) === !1) return null;
                i = this.getPrevious()
            }
            while (!i && (s = (s || this).getParent())) {
                if (n && n(s, !0) === !1) return null;
                i = s.getPrevious()
            }
            return i ? n && n(i) === !1 ? null : t && i.type != t ? i.getPreviousSourceNode(!1, t, n) : i : null
        },
        getPrevious: function(e) {
            var t = this.$,
                n;
            do t = t.previousSibling, n = t && t.nodeType != 10 && new r.node(t);
            while (n && e && !e(n));
            return n
        },
        getNext: function(e) {
            var t = this.$,
                n;
            do t = t.nextSibling, n = t && new r.node(t);
            while (n && e && !e(n));
            return n
        },
        getParent: function() {
            var e = this.$.parentNode;
            return e && e.nodeType == 1 ? new r.node(e) : null
        },
        getParents: function(e) {
            var t = this,
                n = [];
            do n[e ? "push" : "unshift"](t);
            while (t = t.getParent());
            return n
        },
        getCommonAncestor: function(e) {
            var t = this;
            if (e.equals(t)) return t;
            if (e.contains && e.contains(t)) return e;
            var n = t.contains ? t : t.getParent();
            do
            if (n.contains(e)) return n;
            while (n = n.getParent());
            return null
        },
        getPosition: function(e) {
            var t = this.$,
                n = e.$;
            if (t.compareDocumentPosition) return t.compareDocumentPosition(n);
            if (t == n) return 0;
            if (this.type == 1 && e.type == 1) {
                if (t.contains) {
                    if (t.contains(n)) return 20;
                    if (n.contains(t)) return 10
                }
                if ("sourceIndex" in t) return t.sourceIndex < 0 || n.sourceIndex < 0 ? 1 : t.sourceIndex < n.sourceIndex ? 4 : 2
            }
            var r = this.getAddress(),
                i = e.getAddress(),
                s = Math.min(r.length, i.length);
            for (var o = 0; o <= s - 1; o++) if (r[o] != i[o]) {
                if (o < s) return r[o] < i[o] ? 4 : 2;
                break
            }
            return r.length < i.length ? 20 : 10
        },
        getAscendant: function(e, t) {
            var n = this.$,
                i;
            t || (n = n.parentNode);
            while (n) {
                if (n.nodeName && (i = n.nodeName.toLowerCase(), typeof e == "string" ? i == e : i in e)) return new r.node(n);
                n = n.parentNode
            }
            return null
        },
        hasAscendant: function(e, t) {
            var n = this.$;
            t || (n = n.parentNode);
            while (n) {
                if (n.nodeName && n.nodeName.toLowerCase() == e) return !0;
                n = n.parentNode
            }
            return !1
        },
        move: function(e, t) {
            e.append(this.remove(), t)
        },
        remove: function(e) {
            var t = this.$,
                n = t.parentNode;
            if (n) {
                if (e) for (var r; r = t.firstChild;) n.insertBefore(t.removeChild(r), t);
                n.removeChild(t)
            }
            return this
        },
        replace: function(e) {
            this.insertBefore(e), e.remove()
        },
        trim: function() {
            this.ltrim(), this.rtrim()
        },
        ltrim: function() {
            var e = this,
                t;
            while (e.getFirst && (t = e.getFirst())) {
                if (t.type == 3) {
                    var n = i.ltrim(t.getText()),
                        r = t.getLength();
                    if (!n) {
                        t.remove();
                        continue
                    }
                    n.length < r && (t.split(r - n.length), e.$.removeChild(e.$.firstChild))
                }
                break
            }
        },
        rtrim: function() {
            var e = this,
                r;
            while (e.getLast && (r = e.getLast())) {
                if (r.type == 3) {
                    var s = i.rtrim(r.getText()),
                        o = r.getLength();
                    if (!s) {
                        r.remove();
                        continue
                    }
                    s.length < o && (r.split(s.length), e.$.lastChild.parentNode.removeChild(e.$.lastChild))
                }
                break
            }!n && !t.opera && (r = e.$.lastChild, r && r.type == 1 && r.nodeName.toLowerCase() == "br" && r.parentNode.removeChild(r))
        },
        isReadOnly: function() {
            var e = this;
            this.type != 1 && (e = this.getParent());
            if (e && typeof e.$.isContentEditable != "undefined") return !e.$.isContentEditable && !e.data("cke-editable");
            var t = e;
            while (t) {
                if (t.is("body") || !! t.data("cke-editable")) break;
                if (t.getAttribute("contentEditable") == "false") return !0;
                if (t.getAttribute("contentEditable") == "true") break;
                t = t.getParent()
            }
            return !1
        }
    }), r.nodeList = function(e) {
        this.$ = e
    }, r.nodeList.prototype = {
        count: function() {
            return this.$.length
        },
        getItem: function(e) {
            var t = this.$[e];
            return t ? new r.node(t) : null
        }
    }, r.element = function(e, t) {
        typeof e == "string" && (e = (t ? t.$ : document).createElement(e)), r.domObject.call(this, e)
    };
    var u = r.element;
    u.get = function(e) {
        return e && (e.$ ? e : new u(e))
    }, u.prototype = new r.node, u.createFromHtml = function(e, t) {
        var n = new u("div", t);
        return n.setHtml(e), n.getFirst().remove()
    }, u.setMarker = function(e, t, n, r) {
        var s = t.getCustomData("list_marker_id") || t.setCustomData("list_marker_id", i.getNextNumber()).getCustomData("list_marker_id"),
            o = t.getCustomData("list_marker_names") || t.setCustomData("list_marker_names", {}).getCustomData("list_marker_names");
        return e[s] = t, o[n] = 1, t.setCustomData(n, r)
    }, u.clearAllMarkers = function(e) {
        for (var t in e) u.clearMarkers(e, e[t], 1)
    }, u.clearMarkers = function(e, t, n) {
        var r = t.getCustomData("list_marker_names"),
            i = t.getCustomData("list_marker_id");
        for (var s in r) t.removeCustomData(s);
        t.removeCustomData("list_marker_names"), n && (t.removeCustomData("list_marker_id"), delete e[i])
    }, i.extend(u.prototype, {
        type: 1,
        addClass: function(e) {
            var t = this.$.className;
            if (t) {
                var n = new RegExp("(?:^|\\s)" + e + "(?:\\s|$)", "");
                n.test(t) || (t += " " + e)
            }
            this.$.className = t || e
        },
        removeClass: function(e) {
            var t = this.getAttribute("class");
            if (t) {
                var n = new RegExp("(?:^|\\s+)" + e + "(?=\\s|$)", "i");
                n.test(t) && (t = t.replace(n, "").replace(/^\s+/, ""), t ? this.setAttribute("class", t) : this.removeAttribute("class"))
            }
        },
        hasClass: function(e) {
            var t = new RegExp("(?:^|\\s+)" + e + "(?=\\s|$)", "");
            return t.test(this.getAttribute("class"))
        },
        append: function(e, t) {
            var n = this;
            return typeof e == "string" && (e = n.getDocument().createElement(e)), t ? n.$.insertBefore(e.$, n.$.firstChild) : n.$.appendChild(e.$), e
        },
        appendHtml: function(e) {
            var t = this;
            if (!t.$.childNodes.length) t.setHtml(e);
            else {
                var n = new u("div", t.getDocument());
                n.setHtml(e), n.moveChildren(t)
            }
        },
        appendText: function(e) {
            this.$.text != undefined ? this.$.text += e : this.append(new r.text(e))
        },
        appendBogus: function() {
            var e = this,
                n = e.getLast();
            while (n && n.type == 3 && !i.rtrim(n.getText())) n = n.getPrevious();
            if (!n || !n.is || !n.is("br")) {
                var r = t.opera ? e.getDocument().createText("") : e.getDocument().createElement("br");
                t.gecko && r.setAttribute("type", "_moz"), e.append(r)
            }
        },
        breakParent: function(e) {
            var t = this,
                n = new r.range(t.getDocument());
            n.setStartAfter(t), n.setEndAfter(e);
            var i = n.extractContents();
            n.insertNode(t.remove()), i.insertAfterNode(t)
        },
        contains: n || t.webkit ?
        function(e) {
            var t = this.$;
            return e.type != 1 ? t.contains(e.getParent().$) : t != e.$ && t.contains(e.$)
        } : function(e) {
            return !!(this.$.compareDocumentPosition(e.$) & 16)
        },
        focus: function() {
            function e() {
                try {
                    this.$.focus()
                } catch (e) {}
            }
            return function(t) {
                t ? i.setTimeout(e, 100, this) : e.call(this)
            }
        }(),
        getHtml: function() {
            var e = this.$.innerHTML;
            return n ? e.replace(/<\?[^>]*>/g, "") : e
        },
        getOuterHtml: function() {
            var e = this;
            if (e.$.outerHTML) return e.$.outerHTML.replace(/<\?[^>]*>/, "");
            var t = e.$.ownerDocument.createElement("div");
            return t.appendChild(e.$.cloneNode(!0)), t.innerHTML
        },
        setHtml: function(e) {
            return this.$.innerHTML = e
        },
        setText: function(e) {
            return u.prototype.setText = this.$.innerText != undefined ?
            function(e) {
                return this.$.innerText = e
            } : function(e) {
                return this.$.textContent = e
            }, this.setText(e)
        },
        getAttribute: function() {
            var e = function(e) {
                    return this.$.getAttribute(e, 2)
                };
            return n && (t.ie7Compat || t.ie6Compat) ?
            function(t) {
                var n = this;
                switch (t) {
                case "class":
                    t = "className";
                    break;
                case "http-equiv":
                    t = "httpEquiv";
                    break;
                case "name":
                    return n.$.name;
                case "tabindex":
                    var r = e.call(n, t);
                    return r !== 0 && n.$.tabIndex === 0 && (r = null), r;
                case "checked":
                    var i = n.$.attributes.getNamedItem(t),
                        s = i.specified ? i.nodeValue : n.$.checked;
                    return s ? "checked" : null;
                case "hspace":
                case "value":
                    return n.$[t];
                case "style":
                    return n.$.style.cssText;
                case "contenteditable":
                case "contentEditable":
                    return n.$.attributes.getNamedItem("contentEditable").specified ? n.$.getAttribute("contentEditable") : null
                }
                return e.call(n, t)
            } : e
        }(),
        getChildren: function() {
            return new r.nodeList(this.$.childNodes)
        },
        getComputedStyle: n ?
        function(e) {
            return this.$.currentStyle[i.cssStyleToDomStyle(e)]
        } : function(e) {
            return this.getWindow().$.getComputedStyle(this.$, "").getPropertyValue(e)
        },
        getDtd: function() {
            var e = s[this.getName()];
            return this.getDtd = function() {
                return e
            }, e
        },
        getElementsByTag: o.prototype.getElementsByTag,
        getTabIndex: n ?
        function() {
            var e = this.$.tabIndex;
            return e === 0 && !s.$tabIndex[this.getName()] && parseInt(this.getAttribute("tabindex"), 10) !== 0 && (e = -1), e
        } : t.webkit ?
        function() {
            var e = this.$.tabIndex;
            return e == undefined && (e = parseInt(this.getAttribute("tabindex"), 10), isNaN(e) && (e = -1)), e
        } : function() {
            return this.$.tabIndex
        },
        getText: function() {
            return this.$.textContent || this.$.innerText || ""
        },
        getWindow: function() {
            return this.getDocument().getWindow()
        },
        getId: function() {
            return this.$.id || null
        },
        getNameAtt: function() {
            return this.$.name || null
        },
        getName: function() {
            var e = this.$.nodeName.toLowerCase();
            if (n && !(document.documentMode > 8)) {
                var t = this.$.scopeName;
                t != "HTML" && (e = t.toLowerCase() + ":" + e)
            }
            return (this.getName = function() {
                return e
            })()
        },
        getValue: function() {
            return this.$.value
        },
        getFirst: function(e) {
            var t = this.$.firstChild,
                n = t && new r.node(t);
            return n && e && !e(n) && (n = n.getNext(e)), n
        },
        getLast: function(e) {
            var t = this.$.lastChild,
                n = t && new r.node(t);
            return n && e && !e(n) && (n = n.getPrevious(e)), n
        },
        getStyle: function(e) {
            return this.$.style[i.cssStyleToDomStyle(e)]
        },
        is: function() {
            var e = this.getName();
            for (var t = 0; t < arguments.length; t++) if (arguments[t] == e) return !0;
            return !1
        },
        isEditable: function(e) {
            var t = this,
                n = t.getName();
            if (t.isReadOnly() || t.getComputedStyle("display") == "none" || t.getComputedStyle("visibility") == "hidden" || t.is("a") && t.data("cke-saved-name") && !t.getChildCount() || s.$nonEditable[n] || s.$empty[n]) return !1;
            if (e !== !1) {
                var r = s[n] || s.span;
                return r && r["#"]
            }
            return !0
        },
        isIdentical: function(e) {
            if (this.getName() != e.getName()) return !1;
            var t = this.$.attributes,
                r = e.$.attributes,
                i = t.length,
                s = r.length;
            for (var o = 0; o < i; o++) {
                var u = t[o];
                if (u.nodeName == "_moz_dirty") continue;
                if ((!n || u.specified && u.nodeName != "data-cke-expando") && u.nodeValue != e.getAttribute(u.nodeName)) return !1
            }
            if (n) for (o = 0; o < s; o++) {
                u = r[o];
                if (u.specified && u.nodeName != "data-cke-expando" && u.nodeValue != this.getAttribute(u.nodeName)) return !1
            }
            return !0
        },
        isVisible: function() {
            var n = this,
                r = (n.$.offsetHeight || n.$.offsetWidth) && n.getComputedStyle("visibility") != "hidden",
                i, s;
            return r && (t.webkit || t.opera) && (i = n.getWindow(), !i.equals(e.document.getWindow()) && (s = i.$.frameElement) && (r = (new u(s)).isVisible())), !! r
        },
        isEmptyInlineRemoveable: function() {
            if (!s.$removeEmpty[this.getName()]) return !1;
            var e = this.getChildren();
            for (var t = 0, n = e.count(); t < n; t++) {
                var r = e.getItem(t);
                if (r.type == 1 && r.data("cke-bookmark")) continue;
                if (r.type == 1 && !r.isEmptyInlineRemoveable() || r.type == 3 && i.trim(r.getText())) return !1
            }
            return !0
        },
        hasAttributes: n && (t.ie7Compat || t.ie6Compat) ?
        function() {
            var e = this.$.attributes;
            for (var t = 0; t < e.length; t++) {
                var n = e[t];
                switch (n.nodeName) {
                case "class":
                    if (this.getAttribute("class")) return !0;
                case "data-cke-expando":
                    continue;
                default:
                    if (n.specified) return !0
                }
            }
            return !1
        } : function() {
            var e = this.$.attributes,
                t = e.length,
                n = {
                    "data-cke-expando": 1,
                    _moz_dirty: 1
                };
            return t > 0 && (t > 2 || !n[e[0].nodeName] || t == 2 && !n[e[1].nodeName])
        },
        hasAttribute: function() {
            function e(e) {
                var t = this.$.attributes.getNamedItem(e);
                return !!t && !! t.specified
            }
            return n && t.version < 8 ?
            function(t) {
                return t == "name" ? !! this.$.name : e.call(this, t)
            } : e
        }(),
        hide: function() {
            this.setStyle("display", "none")
        },
        moveChildren: function(e, t) {
            var n = this.$;
            e = e.$;
            if (n == e) return;
            var r;
            if (t) while (r = n.lastChild) e.insertBefore(n.removeChild(r), e.firstChild);
            else while (r = n.firstChild) e.appendChild(n.removeChild(r))
        },
        mergeSiblings: function() {
            function e(e, t, n) {
                if (t && t.type == 1) {
                    var r = [];
                    while (t.data("cke-bookmark") || t.isEmptyInlineRemoveable()) {
                        r.push(t), t = n ? t.getNext() : t.getPrevious();
                        if (!t || t.type != 1) return
                    }
                    if (e.isIdentical(t)) {
                        var i = n ? e.getLast() : e.getFirst();
                        while (r.length) r.shift().move(e, !n);
                        t.moveChildren(e, !n), t.remove(), i && i.type == 1 && i.mergeSiblings()
                    }
                }
            }
            return function(t) {
                var n = this;
                if (t !== !1 && !s.$removeEmpty[n.getName()] && !n.is("a")) return;
                e(n, n.getNext(), !0), e(n, n.getPrevious())
            }
        }(),
        show: function() {
            this.setStyles({
                display: "",
                visibility: ""
            })
        },
        setAttribute: function() {
            var e = function(e, t) {
                    return this.$.setAttribute(e, t), this
                };
            return n && (t.ie7Compat || t.ie6Compat) ?
            function(t, n) {
                var r = this;
                return t == "class" ? r.$.className = n : t == "style" ? r.$.style.cssText = n : t == "tabindex" ? r.$.tabIndex = n : t == "checked" ? r.$.checked = n : t == "contenteditable" ? e.call(r, "contentEditable", n) : e.apply(r, arguments), r
            } : t.ie8Compat && t.secure ?
            function(t, n) {
                if (t == "src" && n.match(/^http:\/\//)) try {
                    e.apply(this, arguments)
                } catch (r) {} else e.apply(this, arguments);
                return this
            } : e
        }(),
        setAttributes: function(e) {
            for (var t in e) this.setAttribute(t, e[t]);
            return this
        },
        setValue: function(e) {
            return this.$.value = e, this
        },
        removeAttribute: function() {
            var e = function(e) {
                    this.$.removeAttribute(e)
                };
            return n && (t.ie7Compat || t.ie6Compat) ?
            function(t) {
                t == "class" ? t = "className" : t == "tabindex" ? t = "tabIndex" : t == "contenteditable" && (t = "contentEditable"), e.call(this, t)
            } : e
        }(),
        removeAttributes: function(e) {
            if (i.isArray(e)) for (var t = 0; t < e.length; t++) this.removeAttribute(e[t]);
            else for (var n in e) e.hasOwnProperty(n) && this.removeAttribute(n)
        },
        removeStyle: function(e) {
            var t = this.$.style;
            t.removeProperty ? t.removeProperty(e) : t.removeAttribute(i.cssStyleToDomStyle(e)), this.$.style.cssText || this.removeAttribute("style")
        },
        setStyle: function(e, t) {
            return this.$.style[i.cssStyleToDomStyle(e)] = t, this
        },
        setStyles: function(e) {
            for (var t in e) this.setStyle(t, e[t]);
            return this
        },
        setOpacity: function(e) {
            n && t.version < 9 ? (e = Math.round(e * 100), this.setStyle("filter", e >= 100 ? "" : "progid:DXImageTransform.Microsoft.Alpha(opacity=" + e + ")")) : this.setStyle("opacity", e)
        },
        unselectable: t.gecko ?
        function() {
            this.$.style.MozUserSelect = "none", this.on("dragstart", function(e) {
                e.data.preventDefault()
            })
        } : t.webkit ?
        function() {
            this.$.style.KhtmlUserSelect = "none", this.on("dragstart", function(e) {
                e.data.preventDefault()
            })
        } : function() {
            if (n || t.opera) {
                var e = this.$,
                    r = e.getElementsByTagName("*"),
                    i, s = 0;
                e.unselectable = "on";
                while (i = r[s++]) switch (i.tagName.toLowerCase()) {
                case "iframe":
                case "textarea":
                case "input":
                case "select":
                    break;
                default:
                    i.unselectable = "on"
                }
            }
        },
        getPositionedAncestor: function() {
            var e = this;
            while (e.getName() != "html") {
                if (e.getComputedStyle("position") != "static") return e;
                e = e.getParent()
            }
            return null
        },
        getDocumentPosition: function(e) {
            var r = this,
                i = 0,
                s = 0,
                o = r.getDocument(),
                a = o.getBody(),
                f = o.$.compatMode == "BackCompat";
            if (document.documentElement.getBoundingClientRect) {
                var l = r.$.getBoundingClientRect(),
                    c = o.$,
                    p = c.documentElement,
                    d = p.clientTop || a.$.clientTop || 0,
                    v = p.clientLeft || a.$.clientLeft || 0,
                    m = !0;
                if (n) {
                    var g = o.getDocumentElement().contains(r),
                        y = o.getBody().contains(r);
                    m = f && y || !f && g
                }
                m && (i = l.left + (!f && p.scrollLeft || a.$.scrollLeft), i -= v, s = l.top + (!f && p.scrollTop || a.$.scrollTop), s -= d)
            } else {
                var w = r,
                    E = null,
                    S;
                while (w && w.getName() != "body" && w.getName() != "html") {
                    i += w.$.offsetLeft - w.$.scrollLeft, s += w.$.offsetTop - w.$.scrollTop, w.equals(r) || (i += w.$.clientLeft || 0, s += w.$.clientTop || 0);
                    var x = E;
                    while (x && !x.equals(w)) i -= x.$.scrollLeft, s -= x.$.scrollTop, x = x.getParent();
                    E = w, w = (S = w.$.offsetParent) ? new u(S) : null
                }
            }
            if (e) {
                var T = r.getWindow(),
                    N = e.getWindow();
                if (!T.equals(N) && T.$.frameElement) {
                    var C = (new u(T.$.frameElement)).getDocumentPosition(e);
                    i += C.x, s += C.y
                }
            }
            return document.documentElement.getBoundingClientRect || t.gecko && !f && (i += r.$.clientLeft ? 1 : 0, s += r.$.clientTop ? 1 : 0), {
                x: i,
                y: s
            }
        },
        scrollIntoView: function(e) {
            var t = this.getParent();
            if (!t) return;
            do {
                var n = t.$.clientWidth && t.$.clientWidth < t.$.scrollWidth || t.$.clientHeight && t.$.clientHeight < t.$.scrollHeight;
                n && this.scrollIntoParent(t, e, 1);
                if (t.is("html")) {
                    var r = t.getWindow();
                    try {
                        var i = r.$.frameElement;
                        i && (t = new u(i))
                    } catch (s) {}
                }
            } while (t = t.getParent())
        },
        scrollIntoParent: function(e, t, n) {
            function o(t, n) {
                /body|html/.test(e.getName()) ? e.getWindow().$.scrollBy(t, n) : (e.$.scrollLeft += t, e.$.scrollTop += n)
            }
            function a(e, t) {
                var n = {
                    x: 0,
                    y: 0
                };
                if (!e.is(s ? "body" : "html")) {
                    var r = e.$.getBoundingClientRect();
                    n.x = r.left, n.y = r.top
                }
                var i = e.getWindow();
                if (!i.equals(t)) {
                    var o = a(u.get(i.$.frameElement), t);
                    n.x += o.x, n.y += o.y
                }
                return n
            }
            function f(e, t) {
                return parseInt(e.getComputedStyle("margin-" + t) || 0, 10) || 0
            }!e && (e = this.getWindow());
            var i = e.getDocument(),
                s = i.$.compatMode == "BackCompat";
            e instanceof r.window && (e = s ? i.getBody() : i.getDocumentElement());
            var l = e.getWindow(),
                c = a(this, l),
                p = a(e, l),
                v = this.$.offsetHeight,
                m = this.$.offsetWidth,
                g = e.$.clientHeight,
                y = e.$.clientWidth,
                b, w;
            b = {
                x: c.x - f(this, "left") - p.x || 0,
                y: c.y - f(this, "top") - p.y || 0
            }, w = {
                x: c.x + m + f(this, "right") - (p.x + y) || 0,
                y: c.y + v + f(this, "bottom") - (p.y + g) || 0
            }, (b.y < 0 || w.y > 0) && o(0, t === !0 ? b.y : t === !1 ? w.y : b.y < 0 ? b.y : w.y), n && (b.x < 0 || w.x > 0) && o(b.x < 0 ? b.x : w.x, 0)
        },
        setState: function(e) {
            var t = this;
            switch (e) {
            case 1:
                t.addClass("cke_on"), t.removeClass("cke_off"), t.removeClass("cke_disabled");
                break;
            case 0:
                t.addClass("cke_disabled"), t.removeClass("cke_off"), t.removeClass("cke_on");
                break;
            default:
                t.addClass("cke_off"), t.removeClass("cke_on"), t.removeClass("cke_disabled")
            }
        },
        getFrameDocument: function() {
            var e = this.$;
            try {
                e.contentWindow.document
            } catch (r) {
                e.src = e.src, n && t.version < 7 && window.showModalDialog('javascript:document.write("<script>window.setTimeout(function(){window.close();},50);</script>")')
            }
            return e && new o(e.contentWindow.document)
        },
        copyAttributes: function(e, t) {
            var r = this,
                i = r.$.attributes;
            t = t || {};
            for (var s = 0; s < i.length; s++) {
                var o = i[s],
                    u = o.nodeName.toLowerCase(),
                    a;
                if (u in t) continue;
                if (u == "checked" && (a = r.getAttribute(u))) e.setAttribute(u, a);
                else if (o.specified || n && o.nodeValue && u == "value") a = r.getAttribute(u), a === null && (a = o.nodeValue), e.setAttribute(u, a)
            }
            r.$.style.cssText !== "" && (e.$.style.cssText = r.$.style.cssText)
        },
        renameNode: function(e) {
            var t = this;
            if (t.getName() == e) return;
            var n = t.getDocument(),
                r = new u(e, n);
            t.copyAttributes(r), t.moveChildren(r), t.getParent() && t.$.parentNode.replaceChild(r.$, t.$), r.$["data-cke-expando"] = t.$["data-cke-expando"], t.$ = r.$
        },
        getChild: function(e) {
            var t = this.$;
            if (!e.slice) t = t.childNodes[e];
            else while (e.length > 0 && t) t = t.childNodes[e.shift()];
            return t ? new r.node(t) : null
        },
        getChildCount: function() {
            return this.$.childNodes.length
        },
        disableContextMenu: function() {
            this.on("contextmenu", function(e) {
                e.data.getTarget().hasClass("cke_enable_context_menu") || e.data.preventDefault()
            })
        },
        getDirection: function(e) {
            var t = this;
            return e ? t.getComputedStyle("direction") || t.getDirection() || t.getDocument().$.dir || t.getDocument().getBody().getDirection(1) : t.getStyle("direction") || t.getAttribute("dir")
        },
        data: function(e, t) {
            return e = "data-" + e, t === undefined ? this.getAttribute(e) : (t === !1 ? this.removeAttribute(e) : this.setAttribute(e, t), null)
        }
    }), function() {
        function r(t) {
            var n = 0;
            for (var r = 0, i = e[t].length; r < i; r++) n += parseInt(this.getComputedStyle(e[t][r]) || 0, 10) || 0;
            return n
        }
        var e = {
            width: ["border-left-width", "border-right-width", "padding-left", "padding-right"],
            height: ["border-top-width", "border-bottom-width", "padding-top", "padding-bottom"]
        };
        u.prototype.setSize = function(e, i, s) {
            typeof i == "number" && (s && (!n || !t.quirks) && (i -= r.call(this, e)), this.setStyle(e, i + "px"))
        }, u.prototype.getSize = function(e, t) {
            var n = Math.max(this.$["offset" + i.capitalize(e)], this.$["client" + i.capitalize(e)]) || 0;
            return t && (n -= r.call(this, e)), n
        }
    }(), e.command = function(t, n) {
        this.uiItems = [], this.exec = function(e) {
            var r = this;
            return r.state == 0 ? !1 : (r.editorFocus && t.focus(), r.fire("exec") === !0 ? !0 : n.exec.call(r, t, e) !== !1)
        }, this.refresh = function() {
            return this.fire("refresh") === !0 ? !0 : n.refresh && n.refresh.apply(this, arguments) !== !1
        }, i.extend(this, n, {
            modes: {
                wysiwyg: 1
            },
            editorFocus: 1,
            state: 2
        }), e.event.call(this)
    }, e.command.prototype = {
        enable: function() {
            var e = this;
            e.state == 0 && e.setState(!e.preserveState || typeof e.previousState == "undefined" ? 2 : e.previousState)
        },
        disable: function() {
            this.setState(0)
        },
        setState: function(e) {
            var t = this;
            return t.state == e ? !1 : (t.previousState = t.state, t.state = e, t.fire("state"), !0)
        },
        toggleState: function() {
            var e = this;
            e.state == 2 ? e.setState(1) : e.state == 1 && e.setState(2)
        }
    }, e.event.implementOn(e.command.prototype, !0), e.ENTER_P = 1, e.ENTER_BR = 2, e.ENTER_DIV = 3, e.config = {
        customConfig: "config.js",
        autoUpdateElement: !0,
        baseHref: "",
        contentsCss: e.basePath + "contents.css",
        contentsLangDirection: "ui",
        contentsLanguage: "",
        language: "",
        defaultLanguage: "en",
        enterMode: 1,
        forceEnterMode: !1,
        shiftEnterMode: 2,
        corePlugins: "",
        docType: '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">',
        bodyId: "",
        bodyClass: "",
        fullPage: !1,
        height: 200,
        plugins: "about,a11yhelp,basicstyles,bidi,blockquote,button,clipboard,colorbutton,colordialog,contextmenu,dialogadvtab,div,elementspath,enterkey,entities,filebrowser,find,flash,font,format,forms,horizontalrule,htmldataprocessor,iframe,image,indent,justify,keystrokes,link,list,liststyle,maximize,newpage,pagebreak,pastefromword,pastetext,popup,preview,print,removeformat,resize,save,scayt,showblocks,showborders,smiley,sourcearea,specialchar,stylescombo,tab,table,tabletools,templates,toolbar,undo,wsc,wysiwygarea",
        extraPlugins: "",
        removePlugins: "",
        protectedSource: [],
        tabIndex: 0,
        theme: "default",
        skin: "kama",
        width: "",
        baseFloatZIndex: 1e4
    };
    var a = e.config;
    e.focusManager = function(e) {
        return e.focusManager ? e.focusManager : (this.hasFocus = !1, this._ = {
            editor: e
        }, this)
    }, e.focusManager.prototype = {
        focus: function() {
            var t = this;
            t._.timer && clearTimeout(t._.timer);
            if (!t.hasFocus) {
                e.currentInstance && e.currentInstance.focusManager.forceBlur();
                var n = t._.editor;
                n.container.getChild(1).addClass("cke_focus"), t.hasFocus = !0, n.fire("focus")
            }
        },
        blur: function() {
            var e = this;
            e._.timer && clearTimeout(e._.timer), e._.timer = setTimeout(function() {
                delete e._.timer, e.forceBlur()
            }, 100)
        },
        forceBlur: function() {
            if (this.hasFocus) {
                var e = this._.editor;
                e.container.getChild(1).removeClass("cke_focus"), this.hasFocus = !1, e.fire("blur")
            }
        }
    }, function() {
        var t = {};
        e.lang = {
            languages: {
                af: 1,
                ar: 1,
                bg: 1,
                bn: 1,
                bs: 1,
                ca: 1,
                cs: 1,
                cy: 1,
                da: 1,
                de: 1,
                el: 1,
                "en-au": 1,
                "en-ca": 1,
                "en-gb": 1,
                en: 1,
                eo: 1,
                es: 1,
                et: 1,
                eu: 1,
                fa: 1,
                fi: 1,
                fo: 1,
                "fr-ca": 1,
                fr: 1,
                gl: 1,
                gu: 1,
                he: 1,
                hi: 1,
                hr: 1,
                hu: 1,
                is: 1,
                it: 1,
                ja: 1,
                ka: 1,
                km: 1,
                ko: 1,
                lt: 1,
                lv: 1,
                mn: 1,
                ms: 1,
                nb: 1,
                nl: 1,
                no: 1,
                pl: 1,
                "pt-br": 1,
                pt: 1,
                ro: 1,
                ru: 1,
                sk: 1,
                sl: 1,
                "sr-latn": 1,
                sr: 1,
                sv: 1,
                th: 1,
                tr: 1,
                uk: 1,
                vi: 1,
                "zh-cn": 1,
                zh: 1
            },
            load: function(t, n, r) {
                if (!t || !e.lang.languages[t]) t = this.detect(n, t);
                this[t] ? r(t, this[t]) : e.scriptLoader.load(e.getUrl("lang/" + t + ".js"), function() {
                    r(t, this[t])
                }, this)
            },
            detect: function(t, n) {
                var r = this.languages;
                n = n || navigator.userLanguage || navigator.language || t;
                var i = n.toLowerCase().match(/([a-z]+)(?:-([a-z]+))?/),
                    s = i[1],
                    o = i[2];
                return r[s + "-" + o] ? s = s + "-" + o : r[s] || (s = null), e.lang.detect = s ?
                function() {
                    return s
                } : function(e) {
                    return e
                }, s || t
            }
        }
    }(), e.scriptLoader = function() {
        var t = {},
            r = {};
        return {
            load: function(i, s, o, a) {
                var f = typeof i == "string";
                f && (i = [i]), o || (o = e);
                var l = i.length,
                    c = [],
                    p = [],
                    d = function(e) {
                        s && (f ? s.call(o, e) : s.call(o, c, p))
                    };
                if (l === 0) {
                    d(!0);
                    return
                }
                var v = function(t, n) {
                        (n ? c : p).push(t), --l <= 0 && (a && e.document.getDocumentElement().removeStyle("cursor"), d(n))
                    },
                    m = function(e, n) {
                        t[e] = 1;
                        var i = r[e];
                        delete r[e];
                        for (var s = 0; s < i.length; s++) i[s](e, n)
                    },
                    g = function(i) {
                        if (t[i]) {
                            v(i, !0);
                            return
                        }
                        var o = r[i] || (r[i] = []);
                        o.push(v);
                        if (o.length > 1) return;
                        var a = new u("script");
                        a.setAttributes({
                            type: "text/javascript",
                            src: i
                        }), s && (n ? a.$.onreadystatechange = function() {
                            if (a.$.readyState == "loaded" || a.$.readyState == "complete") a.$.onreadystatechange = null, m(i, !0)
                        } : (a.$.onload = function() {
                            setTimeout(function() {
                                m(i, !0)
                            }, 0)
                        }, a.$.onerror = function() {
                            m(i, !1)
                        })), a.appendTo(e.document.getHead())
                    };
                a && e.document.getDocumentElement().setStyle("cursor", "wait");
                for (var y = 0; y < l; y++) g(i[y])
            }
        }
    }(), e.resourceManager = function(e, t) {
        var n = this;
        n.basePath = e, n.fileName = t, n.registered = {}, n.loaded = {}, n.externals = {}, n._ = {
            waitingList: {}
        }
    }, e.resourceManager.prototype = {
        add: function(t, n) {
            if (this.registered[t]) throw '[CKEDITOR.resourceManager.add] The resource name "' + t + '" is already registered.';
            e.fire(t + i.capitalize(this.fileName) + "Ready", this.registered[t] = n || {})
        },
        get: function(e) {
            return this.registered[e] || null
        },
        getPath: function(t) {
            var n = this.externals[t];
            return e.getUrl(n && n.dir || this.basePath + t + "/")
        },
        getFilePath: function(t) {
            var n = this.externals[t];
            return e.getUrl(this.getPath(t) + (n && typeof n.file == "string" ? n.file : this.fileName + ".js"))
        },
        addExternal: function(e, t, n) {
            e = e.split(",");
            for (var r = 0; r < e.length; r++) {
                var i = e[r];
                this.externals[i] = {
                    dir: t,
                    file: n
                }
            }
        },
        load: function(t, n, r) {
            i.isArray(t) || (t = t ? [t] : []);
            var s = this.loaded,
                o = this.registered,
                u = [],
                a = {},
                f = {};
            for (var l = 0; l < t.length; l++) {
                var c = t[l];
                if (!c) continue;
                if (!s[c] && !o[c]) {
                    var h = this.getFilePath(c);
                    u.push(h), h in a || (a[h] = []), a[h].push(c)
                } else f[c] = this.get(c)
            }
            e.scriptLoader.load(u, function(e, t) {
                if (t.length) throw '[CKEDITOR.resourceManager.load] Resource name "' + a[t[0]].join(",") + '" was not found at "' + t[0] + '".';
                for (var i = 0; i < e.length; i++) {
                    var o = a[e[i]];
                    for (var u = 0; u < o.length; u++) {
                        var l = o[u];
                        f[l] = this.get(l), s[l] = 1
                    }
                }
                n.call(r, f)
            }, this)
        }
    }, e.plugins = new e.resourceManager("plugins/", "plugin");
    var f = e.plugins;
    f.load = i.override(f.load, function(e) {
        return function(t, n, r) {
            var s = {},
                o = function(t) {
                    e.call(this, t, function(e) {
                        i.extend(s, e);
                        var t = [];
                        for (var u in e) {
                            var a = e[u],
                                f = a && a.requires;
                            if (f) for (var l = 0; l < f.length; l++) s[f[l]] || t.push(f[l])
                        }
                        if (t.length) o.call(this, t);
                        else {
                            for (u in s) a = s[u], a.onLoad && !a.onLoad._called && (a.onLoad(), a.onLoad._called = 1);
                            n && n.call(r || window, s)
                        }
                    }, this)
                };
            o.call(this, t)
        }
    }), f.setLang = function(e, t, n) {
        var r = this.get(e),
            s = r.langEntries || (r.langEntries = {}),
            o = r.lang || (r.lang = []);
        i.indexOf(o, t) == -1 && o.push(t), s[t] = n
    }, e.skins = function() {
        var t = {},
            n = {},
            r = function(r, s, o, u) {
                function l(e, t) {
                    return e.replace(/url\s*\(([\s'"]*)(.*?)([\s"']*)\)/g, function(e, n, r, i) {
                        return /^\/|^\w?:/.test(r) ? e : "url(" + t + n + r + i + ")"
                    })
                }
                var a = t[s];
                r.skin || (r.skin = a, a.init && a.init(r));
                var f = function(t) {
                        for (var r = 0; r < t.length; r++) t[r] = e.getUrl(n[s] + t[r])
                    };
                o = a[o];
                var c = !o || !! o._isLoaded;
                if (c) u && u();
                else {
                    var h = o._pending || (o._pending = []);
                    h.push(u);
                    if (h.length > 1) return;
                    var p = !o.css || !o.css.length,
                        d = !o.js || !o.js.length,
                        v = function() {
                            if (p && d) {
                                o._isLoaded = 1;
                                for (var e = 0; e < h.length; e++) h[e] && h[e]()
                            }
                        };
                    if (!p) {
                        var m = o.css;
                        if (i.isArray(m)) {
                            f(m);
                            for (var g = 0; g < m.length; g++) e.document.appendStyleSheet(m[g])
                        } else m = l(m, e.getUrl(n[s])), e.document.appendStyleText(m);
                        o.css = m, p = 1
                    }
                    d || (f(o.js), e.scriptLoader.load(o.js, function() {
                        d = 1, v()
                    })), v()
                }
            };
        return {
            add: function(r, i) {
                t[r] = i, i.skinPath = n[r] || (n[r] = e.getUrl("skins/" + r + "/"))
            },
            load: function(i, s, o) {
                var u = i.skinName,
                    a = i.skinPath;
                t[u] ? r(i, u, s, o) : (n[u] = a, e.scriptLoader.load(e.getUrl(a + "skin.js"), function() {
                    r(i, u, s, o)
                }))
            }
        }
    }(), e.themes = new e.resourceManager("themes/", "theme"), e.ui = function(e) {
        return e.ui ? e.ui : (this._ = {
            handlers: {},
            items: {},
            editor: e
        }, this)
    };
    var l = e.ui;
    l.prototype = {
        add: function(e, t, n) {
            this._.items[e] = {
                type: t,
                command: n.command || null,
                args: Array.prototype.slice.call(arguments, 2)
            }
        },
        create: function(e) {
            var t = this,
                n = t._.items[e],
                r = n && t._.handlers[n.type],
                s = n && n.command && t._.editor.getCommand(n.command),
                o = r && r.create.apply(t, n.args);
            return n && (o = i.extend(o, t._.editor.skin[n.type], !0)), s && s.uiItems.push(o), o
        },
        addHandler: function(e, t) {
            this._.handlers[e] = t
        }
    }, e.event.implementOn(l), function() {
        function w() {
            var e, t = this._.commands,
                n = this.mode;
            if (!n) return;
            for (var r in t) e = t[r], e[e.startDisabled ? "disable" : this.readOnly && !e.readOnly ? "disable" : e.modes[n] ? "enable" : "disable"]()
        }
        var n = 0,
            r = function() {
                var t = "editor" + ++n;
                return e.instances && e.instances[t] ? r() : t
            },
            s = {},
            o = function(t) {
                var n = t.config.customConfig;
                if (!n) return !1;
                n = e.getUrl(n);
                var r = s[n] || (s[n] = {});
                return r.fn ? (r.fn.call(t, t.config), (e.getUrl(t.config.customConfig) == n || !o(t)) && t.fireOnce("customConfigLoaded")) : e.scriptLoader.load(n, function() {
                    e.editorConfig ? r.fn = e.editorConfig : r.fn = function() {}, o(t)
                }), !0
            },
            c = function(e, t) {
                e.on("customConfigLoaded", function() {
                    if (t) {
                        if (t.on) for (var n in t.on) e.on(n, t.on[n]);
                        i.extend(e.config, t, !0), delete e.config.on
                    }
                    p(e)
                }), t && t.customConfig != undefined && (e.config.customConfig = t.customConfig), o(e) || e.fireOnce("customConfigLoaded")
            },
            p = function(t) {
                var n = t.config.skin.split(","),
                    r = n[0],
                    i = e.getUrl(n[1] || "skins/" + r + "/");
                t.skinName = r, t.skinPath = i, t.skinClass = "cke_skin_" + r, t.tabIndex = t.config.tabIndex || t.element.getAttribute("tabindex") || 0, t.readOnly = !! t.config.readOnly || !! t.element.getAttribute("disabled"), t.fireOnce("configLoaded"), m(t)
            },
            d = function(n) {
                e.lang.load(n.config.language, n.config.defaultLanguage, function(e, r) {
                    n.langCode = e, n.lang = i.prototypedCopy(r), t.gecko && t.version < 10900 && n.lang.dir == "rtl" && (n.lang.dir = "ltr"), n.fire("langLoaded");
                    var s = n.config;
                    s.contentsLangDirection == "ui" && (s.contentsLangDirection = n.lang.dir), v(n)
                })
            },
            v = function(n) {
                var r = n.config,
                    s = r.plugins,
                    o = r.extraPlugins,
                    u = r.removePlugins;
                if (o) {
                    var a = new RegExp("(?:^|,)(?:" + o.replace(/\s*,\s*/g, "|") + ")(?=,|$)", "g");
                    s = s.replace(a, ""), s += "," + o
                }
                u && (a = new RegExp("(?:^|,)(?:" + u.replace(/\s*,\s*/g, "|") + ")(?=,|$)", "g"), s = s.replace(a, "")), t.air && (s += ",adobeair"), f.load(s.split(","), function(t) {
                    var r = [],
                        s = [],
                        o = [];
                    n.plugins = t;
                    for (var u in t) {
                        var a = t[u],
                            l = a.lang,
                            c = f.getPath(u),
                            h = null;
                        a.path = c, l && (h = i.indexOf(l, n.langCode) >= 0 ? n.langCode : l[0], !a.langEntries || !a.langEntries[h] ? o.push(e.getUrl(c + "lang/" + h + ".js")) : (i.extend(n.lang, a.langEntries[h]), h = null)), s.push(h), r.push(a)
                    }
                    e.scriptLoader.load(o, function() {
                        var e = ["beforeInit", "init", "afterInit"];
                        for (var t = 0; t < e.length; t++) for (var o = 0; o < r.length; o++) {
                            var u = r[o];
                            t === 0 && s[o] && u.lang && i.extend(n.lang, u.langEntries[s[o]]), u[e[t]] && u[e[t]](n)
                        }
                        n.fire("pluginsLoaded"), g(n)
                    })
                })
            },
            m = function(t) {
                e.skins.load(t, "editor", function() {
                    d(t)
                })
            },
            g = function(t) {
                var n = t.config.theme;
                e.themes.load(n, function() {
                    var r = t.theme = e.themes.get(n);
                    r.path = e.themes.getPath(n), r.build(t), t.config.autoUpdateElement && y(t)
                })
            },
            y = function(e) {
                var t = e.element;
                if (e.elementMode == 1 && t.is("textarea")) {
                    var n = t.$.form && new u(t.$.form);
                    if (n) {
                        function r() {
                            e.updateElement()
                        }
                        n.on("submit", r), !n.$.submit.nodeName && !n.$.submit.length && (n.$.submit = i.override(n.$.submit, function(t) {
                            return function() {
                                e.updateElement(), t.apply ? t.apply(this, arguments) : t()
                            }
                        })), e.on("destroy", function() {
                            n.removeListener("submit", r)
                        })
                    }
                }
            };
        e.editor.prototype._init = function() {
            var t = this,
                n = u.get(t._.element),
                s = t._.instanceConfig;
            delete t._.element, delete t._.instanceConfig, t._.commands = {}, t._.styles = [], t.element = n, t.name = n && t.elementMode == 1 && (n.getId() || n.getNameAtt()) || r();
            if (t.name in e.instances) throw '[CKEDITOR.editor] The instance "' + t.name + '" already exists.';
            t.id = i.getNextId(), t.config = i.prototypedCopy(a), t.ui = new l(t), t.focusManager = new e.focusManager(t), e.fire("instanceCreated", null, t), t.on("mode", w, null, null, 1), t.on("readOnly", w, null, null, 1), c(t, s)
        }
    }(), i.extend(e.editor.prototype, {
        addCommand: function(t, n) {
            return this._.commands[t] = new e.command(this, n)
        },
        addCss: function(e) {
            this._.styles.push(e)
        },
        destroy: function(t) {
            var n = this;
            t || n.updateElement(), n.fire("destroy"), n.theme && n.theme.destroy(n), e.remove(n), e.fire("instanceDestroyed", null, n)
        },
        execCommand: function(e, t) {
            var n = this.getCommand(e),
                r = {
                    name: e,
                    commandData: t,
                    command: n
                };
            if (n && n.state != 0 && this.fire("beforeCommandExec", r) !== !0) {
                r.returnValue = n.exec(r.commandData);
                if (!n.async && this.fire("afterCommandExec", r) !== !0) return r.returnValue
            }
            return !1
        },
        getCommand: function(e) {
            return this._.commands[e]
        },
        getData: function() {
            var e = this;
            e.fire("beforeGetData");
            var t = e._.data;
            if (typeof t != "string") {
                var n = e.element;
                n && e.elementMode == 1 ? t = n.is("textarea") ? n.getValue() : n.getHtml() : t = ""
            }
            return t = {
                dataValue: t
            }, e.fire("getData", t), t.dataValue
        },
        getSnapshot: function() {
            var e = this.fire("getSnapshot");
            if (typeof e != "string") {
                var t = this.element;
                t && this.elementMode == 1 && (e = t.is("textarea") ? t.getValue() : t.getHtml())
            }
            return e
        },
        loadSnapshot: function(e) {
            this.fire("loadSnapshot", e)
        },
        setData: function(e, t, n) {
            t && this.on("dataReady", function(e) {
                e.removeListener(), t.call(e.editor)
            });
            var r = {
                dataValue: e
            };
            !n && this.fire("setData", r), this._.data = r.dataValue, !n && this.fire("afterSetData", r)
        },
        setReadOnly: function(e) {
            e = e == undefined || e, this.readOnly != e && (this.readOnly = e, this.fire("readOnly"))
        },
        insertHtml: function(e) {
            this.fire("insertHtml", e)
        },
        insertText: function(e) {
            this.fire("insertText", e)
        },
        insertElement: function(e) {
            this.fire("insertElement", e)
        },
        checkDirty: function() {
            return this.mayBeDirty && this._.previousValue !== this.getSnapshot()
        },
        resetDirty: function() {
            this.mayBeDirty && (this._.previousValue = this.getSnapshot())
        },
        updateElement: function() {
            var e = this,
                t = e.element;
            if (t && e.elementMode == 1) {
                var n = e.getData();
                e.config.htmlEncodeOutput && (n = i.htmlEncode(n)), t.is("textarea") ? t.setValue(n) : t.setHtml(n)
            }
        }
    }), e.on("loaded", function() {
        var t = e.editor._pending;
        if (t) {
            delete e.editor._pending;
            for (var n = 0; n < t.length; n++) t[n]._init()
        }
    }), e.htmlParser = function() {
        this._ = {
            htmlPartsRegex: new RegExp("<(?:(?:\\/([^>]+)>)|(?:!--([\\S|\\s]*?)-->)|(?:([^\\s>]+)\\s*((?:(?:\"[^\"]*\")|(?:'[^']*')|[^\"'>])*)\\/?>))", "g")
        }
    }, function() {
        var t = /([\w\-:.]+)(?:(?:\s*=\s*(?:(?:"([^"]*)")|(?:'([^']*)')|([^\s>]+)))|(?=\s|$))/g,
            n = {
                checked: 1,
                compact: 1,
                declare: 1,
                defer: 1,
                disabled: 1,
                ismap: 1,
                multiple: 1,
                nohref: 1,
                noresize: 1,
                noshade: 1,
                nowrap: 1,
                readonly: 1,
                selected: 1
            };
        e.htmlParser.prototype = {
            onTagOpen: function() {},
            onTagClose: function() {},
            onText: function() {},
            onCDATA: function() {},
            onComment: function() {},
            parse: function(e) {
                var r = this,
                    i, o, u = 0,
                    a;
                while (i = r._.htmlPartsRegex.exec(e)) {
                    var f = i.index;
                    if (f > u) {
                        var l = e.substring(u, f);
                        a ? a.push(l) : r.onText(l)
                    }
                    u = r._.htmlPartsRegex.lastIndex;
                    if (o = i[1]) {
                        o = o.toLowerCase(), a && s.$cdata[o] && (r.onCDATA(a.join("")), a = null);
                        if (!a) {
                            r.onTagClose(o);
                            continue
                        }
                    }
                    if (a) {
                        a.push(i[0]);
                        continue
                    }
                    if (o = i[3]) {
                        o = o.toLowerCase();
                        if (/="/.test(o)) continue;
                        var c = {},
                            h, p = i[4],
                            d = !! p && p.charAt(p.length - 1) == "/";
                        if (p) while (h = t.exec(p)) {
                            var v = h[1].toLowerCase(),
                                g = h[2] || h[3] || h[4] || "";
                            !g && n[v] ? c[v] = v : c[v] = g
                        }
                        r.onTagOpen(o, c, d), !a && s.$cdata[o] && (a = []);
                        continue
                    }(o = i[2]) && r.onComment(o)
                }
                e.length > u && r.onText(e.substring(u, e.length))
            }
        }
    }(), e.htmlParser.comment = function(e) {
        this.value = e, this._ = {
            isBlockLike: !1
        }
    }, e.htmlParser.comment.prototype = {
        type: 8,
        writeHtml: function(e, t) {
            var n = this.value;
            if (t) {
                if (!(n = t.onComment(n, this))) return;
                if (typeof n != "string") {
                    n.parent = this.parent, n.writeHtml(e, t);
                    return
                }
            }
            e.comment(n)
        }
    }, function() {
        e.htmlParser.text = function(e) {
            this.value = e, this._ = {
                isBlockLike: !1
            }
        }, e.htmlParser.text.prototype = {
            type: 3,
            writeHtml: function(e, t) {
                var n = this.value;
                if (t && !(n = t.onText(n, this))) return;
                e.text(n)
            }
        }
    }(), function() {
        e.htmlParser.cdata = function(e) {
            this.value = e
        }, e.htmlParser.cdata.prototype = {
            type: 3,
            writeHtml: function(e) {
                e.write(this.value)
            }
        }
    }(), e.htmlParser.fragment = function() {
        this.children = [], this.parent = null, this._ = {
            isBlockLike: !0,
            hasInlineStarted: !1
        }
    }, function() {
        function f(e) {
            return e.name == "a" && e.attributes.href || s.$removeEmpty[e.name]
        }
        var r = i.extend({
            table: 1,
            ul: 1,
            ol: 1,
            dl: 1
        }, s.table, s.ul, s.ol, s.dl),
            o = n && t.version < 8 ? {
                dd: 1,
                dt: 1
            } : {},
            u = {
                ol: 1,
                ul: 1
            },
            a = i.extend({}, {
                html: 1
            }, s.html, s.body, s.head, {
                style: 1,
                script: 1
            });
        e.htmlParser.fragment.fromHtml = function(t, l, c) {
            function E(e) {
                var t;
                if (v.length > 0) for (var n = 0; n < v.length; n++) {
                    var r = v[n],
                        i = r.name,
                        o = s[i],
                        u = y.name && s[y.name];
                    (!u || u[i]) && (!e || !o || o[e] || !s[e]) ? (t || (S(), t = 1), r = r.clone(), r.parent = y, y = r, v.splice(n, 1), n--) : i == y.name && (x(y, y.parent, 1), n--)
                }
            }
            function S() {
                while (g.length) x(g.shift(), y)
            }
            function x(e, t, n) {
                if (e.previous !== undefined) return;
                t = t || y || d;
                var r = y;
                if (l && (!t.type || t.name == "body")) {
                    var o, u;
                    e.attributes && (u = e.attributes["data-cke-real-element-type"]) ? o = u : o = e.name, o && !(o in s.$body || o == "body" || e.isOrphan) && (y = t, h.onTagOpen(l, {}), e.returnPoint = t = y)
                }
                if (e._.isBlockLike && e.name != "pre" && e.name != "textarea") {
                    var a = e.children.length,
                        f = e.children[a - 1],
                        c;
                    f && f.type == 3 && ((c = i.rtrim(f.value)) ? f.value = c : e.children.length = a - 1)
                }
                t.add(e), e.name == "pre" && (w = !1), e.name == "textarea" && (b = !1), e.returnPoint ? (y = e.returnPoint, delete e.returnPoint) : y = n ? t : r
            }
            var h = new e.htmlParser,
                d = c || new e.htmlParser.fragment,
                v = [],
                g = [],
                y = d,
                b = !1,
                w = !1;
            h.onTagOpen = function(t, n, i, l) {
                var c = new e.htmlParser.element(t, n);
                c.isUnknown && i && (c.isEmpty = !0), c.isOptionalClose = t in o || l;
                if (f(c)) {
                    v.push(c);
                    return
                }
                if (t == "pre") w = !0;
                else {
                    if (t == "br" && w) {
                        y.add(new e.htmlParser.text("\n"));
                        return
                    }
                    t == "textarea" && (b = !0)
                }
                if (t == "br") {
                    g.push(c);
                    return
                }
                for (;;) {
                    var d = y.name,
                        T = d ? s[d] || (y._.isBlockLike ? s.div : s.span) : a;
                    if (!(!c.isUnknown && !y.isUnknown && !T[t])) break;
                    if (y.isOptionalClose) h.onTagClose(d);
                    else if (t in u && d in u) {
                        var N = y.children,
                            k = N[N.length - 1];
                        (!k || k.name != "li") && x(k = new e.htmlParser.element("li"), y), !c.returnPoint && (c.returnPoint = y), y = k
                    } else if (t in s.$listItem && d != t) h.onTagOpen(t == "li" ? "ul" : "dl", {}, 0, 1);
                    else if (d in r && d != t)!c.returnPoint && (c.returnPoint = y), y = y.parent;
                    else {
                        d in s.$inline && v.unshift(y);
                        if (!y.parent) {
                            c.isOrphan = 1;
                            break
                        }
                        x(y, y.parent, 1)
                    }
                }
                E(t), S(), c.parent = y, c.isEmpty ? x(c) : y = c
            }, h.onTagClose = function(e) {
                for (var t = v.length - 1; t >= 0; t--) if (e == v[t].name) {
                    v.splice(t, 1);
                    return
                }
                var n = [],
                    r = [],
                    i = y;
                while (i != d && i.name != e) i._.isBlockLike || r.unshift(i), n.push(i), i = i.returnPoint || i.parent;
                if (i != d) {
                    for (t = 0; t < n.length; t++) {
                        var s = n[t];
                        x(s, s.parent)
                    }
                    y = i, i._.isBlockLike && S(), x(i, i.parent), i == y && (y = y.parent), v = v.concat(r)
                }
                e == "body" && (l = !1)
            }, h.onText = function(t) {
                if ((!y._.hasInlineStarted || g.length) && !w && !b) {
                    t = i.ltrim(t);
                    if (t.length === 0) return
                }
                var n = y.name,
                    o = n ? s[n] || (y._.isBlockLike ? s.div : s.span) : a;
                if (!b && !o["#"] && n in r) {
                    h.onTagOpen(n in u ? "li" : n == "dl" ? "dd" : n == "table" ? "tr" : n == "tr" ? "td" : ""), h.onText(t);
                    return
                }
                S(), E(), l && (!y.type || y.name == "body") && i.trim(t) && this.onTagOpen(l, {}, 0, 1), !w && !b && (t = t.replace(/[\t\r\n ]{2,}|[\t\r\n]/g, " ")), y.add(new e.htmlParser.text(t))
            }, h.onCDATA = function(t) {
                y.add(new e.htmlParser.cdata(t))
            }, h.onComment = function(t) {
                S(), E(), y.add(new e.htmlParser.comment(t))
            }, h.parse(t), S(!n && 1);
            while (y != d) x(y, y.parent, 1);
            return d
        }, e.htmlParser.fragment.prototype = {
            add: function(e, t) {
                var n = this;
                isNaN(t) && (t = n.children.length);
                var r = t > 0 ? n.children[t - 1] : null;
                if (r) {
                    if (e._.isBlockLike && r.type == 3) {
                        r.value = i.rtrim(r.value);
                        if (r.value.length === 0) {
                            n.children.pop(), n.add(e);
                            return
                        }
                    }
                    r.next = e
                }
                e.previous = r, e.parent = n, n.children.splice(t, 0, e), n._.hasInlineStarted = e.type == 3 || e.type == 1 && !e._.isBlockLike
            },
            writeHtml: function(t, n) {
                var r;
                this.filterChildren = function() {
                    var t = new e.htmlParser.basicWriter;
                    this.writeChildrenHtml.call(this, t, n, !0);
                    var i = t.getHtml();
                    this.children = (new e.htmlParser.fragment.fromHtml(i)).children, r = 1
                }, !this.name && n && n.onFragment(this), this.writeChildrenHtml(t, r ? null : n)
            },
            writeChildrenHtml: function(e, t) {
                for (var n = 0; n < this.children.length; n++) this.children[n].writeHtml(e, t)
            }
        }
    }(), e.htmlParser.element = function(e, t) {
        var n = this;
        n.name = e, n.attributes = t || {}, n.children = [];
        var r = e || "",
            i = r.match(/^cke:(.*)/);
        i && (r = i[1]);
        var o = !! (s.$nonBodyContent[r] || s.$block[r] || s.$listItem[r] || s.$tableContent[r] || s.$nonEditable[r] || r == "br");
        n.isEmpty = !! s.$empty[e], n.isUnknown = !s[e], n._ = {
            isBlockLike: o,
            hasInlineStarted: n.isEmpty || !o
        }
    }, e.htmlParser.cssStyle = function() {
        var t, n = arguments[0],
            r = {};
        return t = n instanceof e.htmlParser.element ? n.attributes.style : n, (t || "").replace(/&quot;/g, '"').replace(/\s*([^ :;]+)\s*:\s*([^;]+)\s*(?=;|$)/g, function(e, t, n) {
            t == "font-family" && (n = n.replace(/["']/g, "")), r[t.toLowerCase()] = n
        }), {
            rules: r,
            populate: function(t) {
                var n = this.toString();
                n && (t instanceof u ? t.setAttribute("style", n) : t instanceof e.htmlParser.element ? t.attributes.style = n : t.style = n)
            },
            toString: function() {
                var e = [];
                for (var t in r) r[t] && e.push(t, ":", r[t], ";");
                return e.join("")
            }
        }
    }, function() {
        var t = function(e, t) {
                return e = e[0], t = t[0], e < t ? -1 : e > t ? 1 : 0
            };
        e.htmlParser.element.prototype = {
            type: 1,
            add: e.htmlParser.fragment.prototype.add,
            clone: function() {
                return new e.htmlParser.element(this.name, this.attributes)
            },
            writeHtml: function(n, r) {
                var i = this.attributes,
                    s = this,
                    o = s.name,
                    u, a, f, l;
                s.filterChildren = function() {
                    if (!l) {
                        var t = new e.htmlParser.basicWriter;
                        e.htmlParser.fragment.prototype.writeChildrenHtml.call(s, t, r), s.children = (new e.htmlParser.fragment.fromHtml(t.getHtml(), 0, s.clone())).children, l = 1
                    }
                };
                if (r) {
                    for (;;) {
                        if (!(o = r.onElementName(o))) return;
                        s.name = o;
                        if (!(s = r.onElement(s))) return;
                        s.parent = this.parent;
                        if (s.name == o) break;
                        if (s.type != 1) {
                            s.writeHtml(n, r);
                            return
                        }
                        o = s.name;
                        if (!o) {
                            for (var c = 0, h = this.children.length; c < h; c++) this.children[c].parent = s.parent;
                            this.writeChildrenHtml.call(s, n, l ? null : r);
                            return
                        }
                    }
                    i = s.attributes
                }
                n.openTag(o, i);
                var p = [];
                for (var d = 0; d < 2; d++) for (u in i) {
                    a = u, f = i[u];
                    if (d == 1) p.push([u, f]);
                    else if (r) {
                        for (;;) {
                            if (!(a = r.onAttributeName(u))) {
                                delete i[u];
                                break
                            }
                            if (a != u) {
                                delete i[u], u = a;
                                continue
                            }
                            break
                        }
                        a && ((f = r.onAttribute(s, a, f)) === !1 ? delete i[a] : i[a] = f)
                    }
                }
                n.sortAttributes && p.sort(t);
                var v = p.length;
                for (d = 0; d < v; d++) {
                    var m = p[d];
                    n.attribute(m[0], m[1])
                }
                n.openTagClose(o, s.isEmpty), s.isEmpty || (this.writeChildrenHtml.call(s, n, l ? null : r), n.closeTag(o))
            },
            writeChildrenHtml: function(t, n) {
                e.htmlParser.fragment.prototype.writeChildrenHtml.apply(this, arguments)
            }
        }
    }(), function() {
        function t(e, t) {
            for (var n = 0; e && n < t.length; n++) {
                var r = t[n];
                e = e.replace(r[0], r[1])
            }
            return e
        }
        function n(e, t, n) {
            typeof t == "function" && (t = [t]);
            var r, i, s = e.length,
                o = t && t.length;
            if (o) {
                for (r = 0; r < s && e[r].pri < n; r++);
                for (i = o - 1; i >= 0; i--) {
                    var u = t[i];
                    u && (u.pri = n, e.splice(r, 0, u))
                }
            }
        }
        function r(e, t, n) {
            if (t) for (var r in t) {
                var i = e[r];
                e[r] = s(i, t[r], n), i || e.$length++
            }
        }
        function s(e, t, r) {
            if (t) return t.pri = r, e ? (e.splice ? n(e, t, r) : (e.pri > r ? e = [t, e] : e = [e, t], e.filter = o), e) : (t.filter = t, t)
        }
        function o(t) {
            var n = t.type || t instanceof e.htmlParser.fragment;
            for (var r = 0; r < this.length; r++) {
                if (n) var i = t.type,
                    s = t.name;
                var o = this[r],
                    u = o.apply(window, arguments);
                if (u === !1) return u;
                if (n) {
                    if (u && (u.name != s || u.type != i)) return u
                } else if (typeof u != "string") return u;
                u != undefined && (t = u)
            }
            return t
        }
        e.htmlParser.filter = i.createClass({
            $: function(e) {
                this._ = {
                    elementNames: [],
                    attributeNames: [],
                    elements: {
                        $length: 0
                    },
                    attributes: {
                        $length: 0
                    }
                }, e && this.addRules(e, 10)
            },
            proto: {
                addRules: function(e, t) {
                    var i = this;
                    typeof t != "number" && (t = 10), n(i._.elementNames, e.elementNames, t), n(i._.attributeNames, e.attributeNames, t), r(i._.elements, e.elements, t), r(i._.attributes, e.attributes, t), i._.text = s(i._.text, e.text, t) || i._.text, i._.comment = s(i._.comment, e.comment, t) || i._.comment, i._.root = s(i._.root, e.root, t) || i._.root
                },
                onElementName: function(e) {
                    return t(e, this._.elementNames)
                },
                onAttributeName: function(e) {
                    return t(e, this._.attributeNames)
                },
                onText: function(e) {
                    var t = this._.text;
                    return t ? t.filter(e) : e
                },
                onComment: function(e, t) {
                    var n = this._.comment;
                    return n ? n.filter(e, t) : e
                },
                onFragment: function(e) {
                    var t = this._.root;
                    return t ? t.filter(e) : e
                },
                onElement: function(e) {
                    var t = this,
                        n = [t._.elements["^"], t._.elements[e.name], t._.elements.$],
                        r, i;
                    for (var s = 0; s < 3; s++) {
                        r = n[s];
                        if (r) {
                            i = r.filter(e, t);
                            if (i === !1) return null;
                            if (i && i != e) return t.onNode(i);
                            if (e.parent && !e.name) break
                        }
                    }
                    return e
                },
                onNode: function(t) {
                    var n = t.type;
                    return n == 1 ? this.onElement(t) : n == 3 ? new e.htmlParser.text(this.onText(t.value)) : n == 8 ? new e.htmlParser.comment(this.onComment(t.value)) : null
                },
                onAttribute: function(e, t, n) {
                    var r = this._.attributes[t];
                    if (r) {
                        var i = r.filter(n, e, this);
                        if (i === !1) return !1;
                        if (typeof i != "undefined") return i
                    }
                    return n
                }
            }
        })
    }(), e.htmlParser.basicWriter = i.createClass({
        $: function() {
            this._ = {
                output: []
            }
        },
        proto: {
            openTag: function(e, t) {
                this._.output.push("<", e)
            },
            openTagClose: function(e, t) {
                t ? this._.output.push(" />") : this._.output.push(">")
            },
            attribute: function(e, t) {
                typeof t == "string" && (t = i.htmlEncodeAttr(t)), this._.output.push(" ", e, '="', t, '"')
            },
            closeTag: function(e) {
                this._.output.push("</", e, ">")
            },
            text: function(e) {
                this._.output.push(e)
            },
            comment: function(e) {
                this._.output.push("<!--", e, "-->")
            },
            write: function(e) {
                this._.output.push(e)
            },
            reset: function() {
                this._.output = [], this._.indent = !1
            },
            getHtml: function(e) {
                var t = this._.output.join("");
                return e && this.reset(), t
            }
        }
    }), delete e.loadFullCore, e.instances = {}, e.document = new o(document), e.add = function(t) {
        e.instances[t.name] = t, t.on("focus", function() {
            e.currentInstance != t && (e.currentInstance = t, e.fire("currentInstance"))
        }), t.on("blur", function() {
            e.currentInstance == t && (e.currentInstance = null, e.fire("currentInstance"))
        })
    }, e.remove = function(t) {
        delete e.instances[t.name]
    }, e.on("instanceDestroyed", function() {
        i.isEmpty(this.instances) && e.fire("reset")
    }), e.TRISTATE_ON = 1, e.TRISTATE_OFF = 2, e.TRISTATE_DISABLED = 0, r.comment = function(e, t) {
        typeof e == "string" && (e = (t ? t.$ : document).createComment(e)), r.domObject.call(this, e)
    }, r.comment.prototype = new r.node, i.extend(r.comment.prototype, {
        type: 8,
        getOuterHtml: function() {
            return "<!--" + this.$.nodeValue + "-->"
        }
    }), function() {
        var e = {
            address: 1,
            blockquote: 1,
            dl: 1,
            h1: 1,
            h2: 1,
            h3: 1,
            h4: 1,
            h5: 1,
            h6: 1,
            p: 1,
            pre: 1,
            li: 1,
            dt: 1,
            dd: 1,
            legend: 1,
            caption: 1
        },
            t = {
                body: 1,
                div: 1,
                table: 1,
                tbody: 1,
                tr: 1,
                td: 1,
                th: 1,
                form: 1,
                fieldset: 1
            },
            n = function(e) {
                var t = e.getChildren();
                for (var n = 0, r = t.count(); n < r; n++) {
                    var i = t.getItem(n);
                    if (i.type == 1 && s.$block[i.getName()]) return !0
                }
                return !1
            };
        r.elementPath = function(r) {
            var i = this,
                s = null,
                o = null,
                u = [],
                a = r;
            while (a) {
                if (a.type == 1) {
                    i.lastElement || (i.lastElement = a);
                    var f = a.getName();
                    o || (!s && e[f] && (s = a), t[f] && (!s && f == "div" && !n(a) ? s = a : o = a)), u.push(a);
                    if (f == "body") break
                }
                a = a.getParent()
            }
            i.block = s, i.blockLimit = o, i.elements = u
        }
    }(), r.elementPath.prototype = {
        compare: function(e) {
            var t = this.elements,
                n = e && e.elements;
            if (!n || t.length != n.length) return !1;
            for (var r = 0; r < t.length; r++) if (!t[r].equals(n[r])) return !1;
            return !0
        },
        contains: function(e) {
            var t = this.elements;
            for (var n = 0; n < t.length; n++) if (t[n].getName() in e) return t[n];
            return null
        }
    }, r.text = function(e, t) {
        typeof e == "string" && (e = (t ? t.$ : document).createTextNode(e)), this.$ = e
    }, r.text.prototype = new r.node, i.extend(r.text.prototype, {
        type: 3,
        getLength: function() {
            return this.$.nodeValue.length
        },
        getText: function() {
            return this.$.nodeValue
        },
        setText: function(e) {
            this.$.nodeValue = e
        },
        split: function(e) {
            var i = this;
            if (n && e == i.getLength()) {
                var s = i.getDocument().createText("");
                return s.insertAfter(i), s
            }
            var o = i.getDocument(),
                u = new r.text(i.$.splitText(e), o);
            if (t.ie8) {
                var a = new r.text("", o);
                a.insertAfter(u), a.remove()
            }
            return u
        },
        substring: function(e, t) {
            return typeof t != "number" ? this.$.nodeValue.substr(e) : this.$.nodeValue.substring(e, t)
        }
    }), r.documentFragment = function(t) {
        t = t || e.document, this.$ = t.$.createDocumentFragment()
    }, i.extend(r.documentFragment.prototype, u.prototype, {
        type: 11,
        insertAfterNode: function(e) {
            e = e.$, e.parentNode.insertBefore(this.$, e.nextSibling)
        }
    }, !0, {
        append: 1,
        appendBogus: 1,
        getFirst: 1,
        getLast: 1,
        appendTo: 1,
        moveChildren: 1,
        insertBefore: 1,
        insertAfterNode: 1,
        replace: 1,
        trim: 1,
        type: 1,
        ltrim: 1,
        rtrim: 1,
        getDocument: 1,
        getChildCount: 1,
        getChild: 1,
        getChildren: 1
    }), function() {
        function e(e, t) {
            var n = this.range;
            if (this._.end) return null;
            if (!this._.start) {
                this._.start = 1;
                if (n.collapsed) return this.end(), null;
                n.optimize()
            }
            var r, i = n.startContainer,
                s = n.endContainer,
                o = n.startOffset,
                u = n.endOffset,
                a, f = this.guard,
                l = this.type,
                c = e ? "getPreviousSourceNode" : "getNextSourceNode";
            if (!e && !this._.guardLTR) {
                var h = s.type == 1 ? s : s.getParent(),
                    p = s.type == 1 ? s.getChild(u) : s.getNext();
                this._.guardLTR = function(e, t) {
                    return (!t || !h.equals(e)) && (!p || !e.equals(p)) && (e.type != 1 || !t || e.getName() != "body")
                }
            }
            if (e && !this._.guardRTL) {
                var d = i.type == 1 ? i : i.getParent(),
                    v = i.type == 1 ? o ? i.getChild(o - 1) : null : i.getPrevious();
                this._.guardRTL = function(e, t) {
                    return (!t || !d.equals(e)) && (!v || !e.equals(v)) && (e.type != 1 || !t || e.getName() != "body")
                }
            }
            var m = e ? this._.guardRTL : this._.guardLTR;
            f ? a = function(e, t) {
                return m(e, t) === !1 ? !1 : f(e, t)
            } : a = m, this.current ? r = this.current[c](!1, l, a) : (e ? (r = s, r.type == 1 && (u > 0 ? r = r.getChild(u - 1) : r = a(r, !0) === !1 ? null : r.getPreviousSourceNode(!0, l, a))) : (r = i, r.type == 1 && ((r = r.getChild(o)) || (r = a(i, !0) === !1 ? null : i.getNextSourceNode(!0, l, a)))), r && a(r) === !1 && (r = null));
            while (r && !this._.end) {
                this.current = r;
                if (!this.evaluator || this.evaluator(r) !== !1) {
                    if (!t) return r
                } else if (t && this.evaluator) return !1;
                r = r[c](!1, l, a)
            }
            return this.end(), this.current = null
        }
        function t(t) {
            var n, r = null;
            while (n = e.call(this, t)) r = n;
            return r
        }
        r.walker = i.createClass({
            $: function(e) {
                this.range = e, this._ = {}
            },
            proto: {
                end: function() {
                    this._.end = 1
                },
                next: function() {
                    return e.call(this)
                },
                previous: function() {
                    return e.call(this, 1)
                },
                checkForward: function() {
                    return e.call(this, 0, 1) !== !1
                },
                checkBackward: function() {
                    return e.call(this, 1, 1) !== !1
                },
                lastForward: function() {
                    return t.call(this)
                },
                lastBackward: function() {
                    return t.call(this, 1)
                },
                reset: function() {
                    delete this.current, this._ = {}
                }
            }
        });
        var o = {
            block: 1,
            "list-item": 1,
            table: 1,
            "table-row-group": 1,
            "table-header-group": 1,
            "table-footer-group": 1,
            "table-row": 1,
            "table-column-group": 1,
            "table-column": 1,
            "table-cell": 1,
            "table-caption": 1
        };
        u.prototype.isBlockBoundary = function(e) {
            var t = e ? i.extend({}, s.$block, e || {}) : s.$block;
            return this.getComputedStyle("float") == "none" && o[this.getComputedStyle("display")] || t[this.getName()]
        }, r.walker.blockBoundary = function(e) {
            return function(t, n) {
                return t.type != 1 || !t.isBlockBoundary(e)
            }
        }, r.walker.listItemBoundary = function() {
            return this.blockBoundary({
                br: 1
            })
        }, r.walker.bookmark = function(e, t) {
            function n(e) {
                return e && e.getName && e.getName() == "span" && e.data("cke-bookmark")
            }
            return function(r) {
                var i, s;
                return i = r && !r.getName && (s = r.getParent()) && n(s), i = e ? i : i || n(r), !! (t ^ i)
            }
        }, r.walker.whitespaces = function(e) {
            return function(t) {
                var n = t && t.type == 3 && !i.trim(t.getText());
                return !!(e ^ n)
            }
        }, r.walker.invisible = function(e) {
            var t = r.walker.whitespaces();
            return function(n) {
                var r = t(n) || n.is && !n.$.offsetHeight;
                return !!(e ^ r)
            }
        }, r.walker.nodeType = function(e, t) {
            return function(n) {
                return !!(t ^ n.type == e)
            }
        }, r.walker.bogus = function(e) {
            function t(e) {
                return !f(e) && !l(e)
            }
            return function(r) {
                var i = n ? r.getText && a.test(r.getText()) : r.is && r.is("br");
                if (i) {
                    var s = r.getParent(),
                        o = r.getNext(t);
                    i = s.isBlockBoundary() && (!o || o.type == 1 && o.isBlockBoundary())
                }
                return !!(e ^ i)
            }
        };
        var a = /^[\t\r\n ]*(?:&nbsp;|\xa0)$/,
            f = r.walker.whitespaces(),
            l = r.walker.bookmark(),
            c = function(e) {
                return l(e) || f(e) || e.type == 1 && e.getName() in s.$inline && !(e.getName() in s.$empty)
            };
        u.prototype.getBogus = function() {
            var e = this;
            do e = e.getPreviousSourceNode();
            while (c(e));
            return e && (n ? e.getText && a.test(e.getText()) : e.is && e.is("br")) ? e : !1
        }
    }(), r.range = function(e) {
        var t = this;
        t.startContainer = null, t.startOffset = null, t.endContainer = null, t.endOffset = null, t.collapsed = !0, t.document = e
    }, function() {
        function a(e) {
            var t = !1,
                s = r.walker.bookmark(!0),
                u = /^[\t\r\n ]*(?:&nbsp;|\xa0)$/;
            return function(r) {
                if (s(r)) return !0;
                if (r.type == 3) {
                    if (n && u.test(r.getText()) && !t && (!e || !r.getNext())) t = !0;
                    else if (r.hasAscendant("pre") || i.trim(r.getText()).length) return !1
                } else if (r.type == 1 && !o[r.getName()]) {
                    if (!(!n && r.is("br") && !t && (!e || !r.getNext()))) return !1;
                    t = !0
                }
                return !0
            }
        }
        function l(e) {
            return function(t) {
                return !e && f(t) || (t.type == 3 ? !i.trim(t.getText()) || !! t.getParent().data("cke-bookmark") : t.getName() in s.$removeEmpty)
            }
        }
        function v(e) {
            return !c(e) && !p(e)
        }
        var e = function(e) {
                e.collapsed = e.startContainer && e.endContainer && e.startContainer.equals(e.endContainer) && e.startOffset == e.endOffset
            },
            t = function(e, t, n, r) {
                e.optimizeBookmark();
                var i = e.startContainer,
                    s = e.endContainer,
                    o = e.startOffset,
                    a = e.endOffset,
                    f, l;
                s.type == 3 ? s = s.split(a) : s.getChildCount() > 0 && (a >= s.getChildCount() ? (s = s.append(e.document.createText("")), l = !0) : s = s.getChild(a)), i.type == 3 ? (i.split(o), i.equals(s) && (s = i.getNext())) : o ? o >= i.getChildCount() ? (i = i.append(e.document.createText("")), f = !0) : i = i.getChild(o).getPrevious() : (i = i.getFirst().insertBeforeMe(e.document.createText("")), f = !0);
                var c = i.getParents(),
                    p = s.getParents(),
                    d, v, m;
                for (d = 0; d < c.length; d++) {
                    v = c[d], m = p[d];
                    if (!v.equals(m)) break
                }
                var g = n,
                    y, b, w, E;
                for (var S = d; S < c.length; S++) {
                    y = c[S], g && !y.equals(i) && (b = g.append(y.clone())), w = y.getNext();
                    while (w) {
                        if (w.equals(p[S]) || w.equals(s)) break;
                        E = w.getNext(), t == 2 ? g.append(w.clone(!0)) : (w.remove(), t == 1 && g.append(w)), w = E
                    }
                    g && (g = b)
                }
                g = n;
                for (var x = d; x < p.length; x++) {
                    y = p[x], t > 0 && !y.equals(s) && (b = g.append(y.clone()));
                    if (!c[x] || y.$.parentNode != c[x].$.parentNode) {
                        w = y.getPrevious();
                        while (w) {
                            if (w.equals(c[x]) || w.equals(i)) break;
                            E = w.getPrevious(), t == 2 ? g.$.insertBefore(w.$.cloneNode(!0), g.$.firstChild) : (w.remove(), t == 1 && g.$.insertBefore(w.$, g.$.firstChild)), w = E
                        }
                    }
                    g && (g = b)
                }
                if (t == 2) {
                    var T = e.startContainer;
                    T.type == 3 && (T.$.data += T.$.nextSibling.data, T.$.parentNode.removeChild(T.$.nextSibling));
                    var N = e.endContainer;
                    N.type == 3 && N.$.nextSibling && (N.$.data += N.$.nextSibling.data, N.$.parentNode.removeChild(N.$.nextSibling))
                } else {
                    if (v && m && (i.$.parentNode != v.$.parentNode || s.$.parentNode != m.$.parentNode)) {
                        var C = m.getIndex();
                        f && m.$.parentNode == i.$.parentNode && C--;
                        if (r && v.type == 1) {
                            var k = u.createFromHtml('<span data-cke-bookmark="1" style="display:none">&nbsp;</span>', e.document);
                            k.insertAfter(v), v.mergeSiblings(!1), e.moveToBookmark({
                                startNode: k
                            })
                        } else e.setStart(m.getParent(), C)
                    }
                    e.collapse(!0)
                }
                f && i.remove(), l && s.$.parentNode && s.remove()
            },
            o = {
                abbr: 1,
                acronym: 1,
                b: 1,
                bdo: 1,
                big: 1,
                cite: 1,
                code: 1,
                del: 1,
                dfn: 1,
                em: 1,
                font: 1,
                i: 1,
                ins: 1,
                label: 1,
                kbd: 1,
                q: 1,
                samp: 1,
                small: 1,
                span: 1,
                strike: 1,
                strong: 1,
                sub: 1,
                sup: 1,
                tt: 1,
                u: 1,
                "var": 1
            },
            f = r.walker.bogus(),
            c = new r.walker.whitespaces,
            p = new r.walker.bookmark;
        r.range.prototype = {
            clone: function() {
                var e = this,
                    t = new r.range(e.document);
                return t.startContainer = e.startContainer, t.startOffset = e.startOffset, t.endContainer = e.endContainer, t.endOffset = e.endOffset, t.collapsed = e.collapsed, t
            },
            collapse: function(e) {
                var t = this;
                e ? (t.endContainer = t.startContainer, t.endOffset = t.startOffset) : (t.startContainer = t.endContainer, t.startOffset = t.endOffset), t.collapsed = !0
            },
            cloneContents: function() {
                var e = new r.documentFragment(this.document);
                return this.collapsed || t(this, 2, e), e
            },
            deleteContents: function(e) {
                if (this.collapsed) return;
                t(this, 0, null, e)
            },
            extractContents: function(e) {
                var n = new r.documentFragment(this.document);
                return this.collapsed || t(this, 1, n, e), n
            },
            createBookmark: function(e) {
                var t = this,
                    n, r, s, o, u = t.collapsed;
                return n = t.document.createElement("span"), n.data("cke-bookmark", 1), n.setStyle("display", "none"), n.setHtml("&nbsp;"), e && (s = "cke_bm_" + i.getNextNumber(), n.setAttribute("id", s + (u ? "C" : "S"))), u || (r = n.clone(), r.setHtml("&nbsp;"), e && r.setAttribute("id", s + "E"), o = t.clone(), o.collapse(), o.insertNode(r)), o = t.clone(), o.collapse(!0), o.insertNode(n), r ? (t.setStartAfter(n), t.setEndBefore(r)) : t.moveToPosition(n, 4), {
                    startNode: e ? s + (u ? "C" : "S") : n,
                    endNode: e ? s + "E" : r,
                    serializable: e,
                    collapsed: u
                }
            },
            createBookmark2: function(e) {
                var t = this,
                    n = t.startContainer,
                    r = t.endContainer,
                    i = t.startOffset,
                    s = t.endOffset,
                    o = t.collapsed,
                    u, a;
                if (!n || !r) return {
                    start: 0,
                    end: 0
                };
                if (e) {
                    n.type == 1 && (u = n.getChild(i), u && u.type == 3 && i > 0 && u.getPrevious().type == 3 && (n = u, i = 0), u && u.type == 1 && (i = u.getIndex(1)));
                    while (n.type == 3 && (a = n.getPrevious()) && a.type == 3) n = a, i += a.getLength();
                    if (!o) {
                        r.type == 1 && (u = r.getChild(s), u && u.type == 3 && s > 0 && u.getPrevious().type == 3 && (r = u, s = 0), u && u.type == 1 && (s = u.getIndex(1)));
                        while (r.type == 3 && (a = r.getPrevious()) && a.type == 3) r = a, s += a.getLength()
                    }
                }
                return {
                    start: n.getAddress(e),
                    end: o ? null : r.getAddress(e),
                    startOffset: i,
                    endOffset: s,
                    normalized: e,
                    collapsed: o,
                    is2: !0
                }
            },
            moveToBookmark: function(e) {
                var t = this;
                if (e.is2) {
                    var n = t.document.getByAddress(e.start, e.normalized),
                        r = e.startOffset,
                        i = e.end && t.document.getByAddress(e.end, e.normalized),
                        s = e.endOffset;
                    t.setStart(n, r), i ? t.setEnd(i, s) : t.collapse(!0)
                } else {
                    var o = e.serializable,
                        u = o ? t.document.getById(e.startNode) : e.startNode,
                        a = o ? t.document.getById(e.endNode) : e.endNode;
                    t.setStartBefore(u), u.remove(), a ? (t.setEndBefore(a), a.remove()) : t.collapse(!0)
                }
            },
            getBoundaryNodes: function() {
                var e = this,
                    t = e.startContainer,
                    n = e.endContainer,
                    i = e.startOffset,
                    s = e.endOffset,
                    o;
                if (t.type == 1) {
                    o = t.getChildCount();
                    if (o > i) t = t.getChild(i);
                    else if (o < 1) t = t.getPreviousSourceNode();
                    else {
                        t = t.$;
                        while (t.lastChild) t = t.lastChild;
                        t = new r.node(t), t = t.getNextSourceNode() || t
                    }
                }
                if (n.type == 1) {
                    o = n.getChildCount();
                    if (o > s) n = n.getChild(s).getPreviousSourceNode(!0);
                    else if (o < 1) n = n.getPreviousSourceNode();
                    else {
                        n = n.$;
                        while (n.lastChild) n = n.lastChild;
                        n = new r.node(n)
                    }
                }
                return t.getPosition(n) & 2 && (t = n), {
                    startNode: t,
                    endNode: n
                }
            },
            getCommonAncestor: function(e, t) {
                var n = this,
                    r = n.startContainer,
                    i = n.endContainer,
                    s;
                return r.equals(i) ? e && r.type == 1 && n.startOffset == n.endOffset - 1 ? s = r.getChild(n.startOffset) : s = r : s = r.getCommonAncestor(i), t && !s.is ? s.getParent() : s
            },
            optimize: function() {
                var e = this,
                    t = e.startContainer,
                    n = e.startOffset;
                t.type != 1 && (n ? n >= t.getLength() && e.setStartAfter(t) : e.setStartBefore(t)), t = e.endContainer, n = e.endOffset, t.type != 1 && (n ? n >= t.getLength() && e.setEndAfter(t) : e.setEndBefore(t))
            },
            optimizeBookmark: function() {
                var e = this,
                    t = e.startContainer,
                    n = e.endContainer;
                t.is && t.is("span") && t.data("cke-bookmark") && e.setStartAt(t, 3), n && n.is && n.is("span") && n.data("cke-bookmark") && e.setEndAt(n, 4)
            },
            trim: function(e, t) {
                var n = this,
                    r = n.startContainer,
                    i = n.startOffset,
                    s = n.collapsed;
                if ((!e || s) && r && r.type == 3) {
                    if (!i) i = r.getIndex(), r = r.getParent();
                    else if (i >= r.getLength()) i = r.getIndex() + 1, r = r.getParent();
                    else {
                        var o = r.split(i);
                        i = r.getIndex() + 1, r = r.getParent(), n.startContainer.equals(n.endContainer) ? n.setEnd(o, n.endOffset - n.startOffset) : r.equals(n.endContainer) && (n.endOffset += 1)
                    }
                    n.setStart(r, i);
                    if (s) {
                        n.collapse(!0);
                        return
                    }
                }
                var u = n.endContainer,
                    a = n.endOffset;
                !t && !s && u && u.type == 3 && (a ? a >= u.getLength() ? (a = u.getIndex() + 1, u = u.getParent()) : (u.split(a), a = u.getIndex() + 1, u = u.getParent()) : (a = u.getIndex(), u = u.getParent()), n.setEnd(u, a))
            },
            enlarge: function(e, t) {
                switch (e) {
                case 1:
                    if (this.collapsed) return;
                    var n = this.getCommonAncestor(),
                        o = this.document.getBody(),
                        u, a, f, l, c, h = !1,
                        p, v, m = this.startContainer,
                        g = this.startOffset;
                    m.type == 3 ? (g && (m = !i.trim(m.substring(0, g)).length && m, h = !! m), m && ((l = m.getPrevious()) || (f = m.getParent()))) : (g && (l = m.getChild(g - 1) || m.getLast()), l || (f = m));
                    while (f || l) {
                        if (f && !l) {
                            !c && f.equals(n) && (c = !0);
                            if (!o.contains(f)) break;
                            if (!h || f.getComputedStyle("display") != "inline") h = !1, c ? u = f : this.setStartBefore(f);
                            l = f.getPrevious()
                        }
                        while (l) {
                            p = !1;
                            if (l.type == 8) {
                                l = l.getPrevious();
                                continue
                            }
                            if (l.type == 3) v = l.getText(), /[^\s\ufeff]/.test(v) && (l = null), p = /[\s\ufeff]$/.test(v);
                            else if ((l.$.offsetWidth > 0 || t && l.is("br")) && !l.data("cke-bookmark")) if (h && s.$removeEmpty[l.getName()]) {
                                v = l.getText();
                                if (/[^\s\ufeff]/.test(v)) l = null;
                                else {
                                    var y = l.$.getElementsByTagName("*");
                                    for (var b = 0, w; w = y[b++];) if (!s.$removeEmpty[w.nodeName.toLowerCase()]) {
                                        l = null;
                                        break
                                    }
                                }
                                l && (p = !! v.length)
                            } else l = null;
                            p && (h ? c ? u = f : f && this.setStartBefore(f) : h = !0);
                            if (l) {
                                var E = l.getPrevious();
                                if (!f && !E) {
                                    f = l, l = null;
                                    break
                                }
                                l = E
                            } else f = null
                        }
                        f && (f = f.getParent())
                    }
                    m = this.endContainer, g = this.endOffset, f = l = null, c = h = !1, m.type == 3 ? (m = !i.trim(m.substring(g)).length && m, h = !m || !m.getLength(), m && ((l = m.getNext()) || (f = m.getParent()))) : (l = m.getChild(g), l || (f = m));
                    while (f || l) {
                        if (f && !l) {
                            !c && f.equals(n) && (c = !0);
                            if (!o.contains(f)) break;
                            if (!h || f.getComputedStyle("display") != "inline") h = !1, c ? a = f : f && this.setEndAfter(f);
                            l = f.getNext()
                        }
                        while (l) {
                            p = !1;
                            if (l.type == 3) v = l.getText(), /[^\s\ufeff]/.test(v) && (l = null), p = /^[\s\ufeff]/.test(v);
                            else if (l.type == 1) {
                                if ((l.$.offsetWidth > 0 || t && l.is("br")) && !l.data("cke-bookmark")) if (h && s.$removeEmpty[l.getName()]) {
                                    v = l.getText();
                                    if (/[^\s\ufeff]/.test(v)) l = null;
                                    else {
                                        y = l.$.getElementsByTagName("*");
                                        for (b = 0; w = y[b++];) if (!s.$removeEmpty[w.nodeName.toLowerCase()]) {
                                            l = null;
                                            break
                                        }
                                    }
                                    l && (p = !! v.length)
                                } else l = null
                            } else p = 1;
                            p && h && (c ? a = f : this.setEndAfter(f));
                            if (l) {
                                E = l.getNext();
                                if (!f && !E) {
                                    f = l, l = null;
                                    break
                                }
                                l = E
                            } else f = null
                        }
                        f && (f = f.getParent())
                    }
                    u && a && (n = u.contains(a) ? a : u, this.setStartBefore(n), this.setEndAfter(n));
                    break;
                case 2:
                case 3:
                    var S = new r.range(this.document);
                    o = this.document.getBody(), S.setStartAt(o, 1), S.setEnd(this.startContainer, this.startOffset);
                    var x = new r.walker(S),
                        T, N, C = r.walker.blockBoundary(e == 3 ? {
                            br: 1
                        } : null),
                        k = function(e) {
                            var t = C(e);
                            return t || (T = e), t
                        },
                        L = function(e) {
                            var t = k(e);
                            return !t && e.is && e.is("br") && (N = e), t
                        };
                    x.guard = k, f = x.lastBackward(), T = T || o, this.setStartAt(T, !T.is("br") && (!f && this.checkStartOfBlock() || f && T.contains(f)) ? 1 : 4);
                    if (e == 3) {
                        var A = this.clone();
                        x = new r.walker(A);
                        var O = r.walker.whitespaces(),
                            M = r.walker.bookmark();
                        x.evaluator = function(e) {
                            return !O(e) && !M(e)
                        };
                        var _ = x.previous();
                        if (_ && _.type == 1 && _.is("br")) return
                    }
                    S = this.clone(), S.collapse(), S.setEndAt(o, 2), x = new r.walker(S), x.guard = e == 3 ? L : k, T = null, f = x.lastForward(), T = T || o, this.setEndAt(T, !f && this.checkEndOfBlock() || f && T.contains(f) ? 2 : 3), N && this.setEndAfter(N)
                }
            },
            shrink: function(e, t) {
                if (!this.collapsed) {
                    e = e || 2;
                    var n = this.clone(),
                        i = this.startContainer,
                        s = this.endContainer,
                        o = this.startOffset,
                        u = this.endOffset,
                        a = this.collapsed,
                        f = 1,
                        l = 1;
                    i && i.type == 3 && (o ? o >= i.getLength() ? n.setStartAfter(i) : (n.setStartBefore(i), f = 0) : n.setStartBefore(i)), s && s.type == 3 && (u ? u >= s.getLength() ? n.setEndAfter(s) : (n.setEndAfter(s), l = 0) : n.setEndBefore(s));
                    var c = new r.walker(n),
                        h = r.walker.bookmark();
                    c.evaluator = function(t) {
                        return t.type == (e == 1 ? 1 : 3)
                    };
                    var p;
                    c.guard = function(t, n) {
                        return h(t) ? !0 : e == 1 && t.type == 3 ? !1 : n && t.equals(p) ? !1 : (!n && t.type == 1 && (p = t), !0)
                    };
                    if (f) {
                        var v = c[e == 1 ? "lastForward" : "next"]();
                        v && this.setStartAt(v, t ? 1 : 3)
                    }
                    if (l) {
                        c.reset();
                        var m = c[e == 1 ? "lastBackward" : "previous"]();
                        m && this.setEndAt(m, t ? 2 : 4)
                    }
                    return !!f || !! l
                }
            },
            insertNode: function(e) {
                var t = this;
                t.optimizeBookmark(), t.trim(!1, !0);
                var n = t.startContainer,
                    r = t.startOffset,
                    i = n.getChild(r);
                i ? e.insertBefore(i) : n.append(e), e.getParent().equals(t.endContainer) && t.endOffset++, t.setStartBefore(e)
            },
            moveToPosition: function(e, t) {
                this.setStartAt(e, t), this.collapse(!0)
            },
            selectNodeContents: function(e) {
                this.setStart(e, 0), this.setEnd(e, e.type == 3 ? e.getLength() : e.getChildCount())
            },
            setStart: function(t, n) {
                var r = this;
                t.type == 1 && s.$empty[t.getName()] && (n = t.getIndex(), t = t.getParent()), r.startContainer = t, r.startOffset = n, r.endContainer || (r.endContainer = t, r.endOffset = n), e(r)
            },
            setEnd: function(t, n) {
                var r = this;
                t.type == 1 && s.$empty[t.getName()] && (n = t.getIndex() + 1, t = t.getParent()), r.endContainer = t, r.endOffset = n, r.startContainer || (r.startContainer = t, r.startOffset = n), e(r)
            },
            setStartAfter: function(e) {
                this.setStart(e.getParent(), e.getIndex() + 1)
            },
            setStartBefore: function(e) {
                this.setStart(e.getParent(), e.getIndex())
            },
            setEndAfter: function(e) {
                this.setEnd(e.getParent(), e.getIndex() + 1)
            },
            setEndBefore: function(e) {
                this.setEnd(e.getParent(), e.getIndex())
            },
            setStartAt: function(t, n) {
                var r = this;
                switch (n) {
                case 1:
                    r.setStart(t, 0);
                    break;
                case 2:
                    t.type == 3 ? r.setStart(t, t.getLength()) : r.setStart(t, t.getChildCount());
                    break;
                case 3:
                    r.setStartBefore(t);
                    break;
                case 4:
                    r.setStartAfter(t)
                }
                e(r)
            },
            setEndAt: function(t, n) {
                var r = this;
                switch (n) {
                case 1:
                    r.setEnd(t, 0);
                    break;
                case 2:
                    t.type == 3 ? r.setEnd(t, t.getLength()) : r.setEnd(t, t.getChildCount());
                    break;
                case 3:
                    r.setEndBefore(t);
                    break;
                case 4:
                    r.setEndAfter(t)
                }
                e(r)
            },
            fixBlock: function(e, t) {
                var r = this,
                    i = r.createBookmark(),
                    s = r.document.createElement(t);
                return r.collapse(e), r.enlarge(2), r.extractContents().appendTo(s), s.trim(), n || s.appendBogus(), r.insertNode(s), r.moveToBookmark(i), s
            },
            splitBlock: function(e) {
                var t = this,
                    i = new r.elementPath(t.startContainer),
                    s = new r.elementPath(t.endContainer),
                    o = i.blockLimit,
                    u = s.blockLimit,
                    a = i.block,
                    f = s.block,
                    l = null;
                if (!o.equals(u)) return null;
                e != "br" && (a || (a = t.fixBlock(!0, e), f = (new r.elementPath(t.endContainer)).block), f || (f = t.fixBlock(!1, e)));
                var c = a && t.checkStartOfBlock(),
                    h = f && t.checkEndOfBlock();
                return t.deleteContents(), a && a.equals(f) && (h ? (l = new r.elementPath(t.startContainer), t.moveToPosition(f, 4), f = null) : c ? (l = new r.elementPath(t.startContainer), t.moveToPosition(a, 3), a = null) : (f = t.splitElement(a), !n && !a.is("ul", "ol") && a.appendBogus())), {
                    previousBlock: a,
                    nextBlock: f,
                    wasStartOfBlock: c,
                    wasEndOfBlock: h,
                    elementPath: l
                }
            },
            splitElement: function(e) {
                var t = this;
                if (!t.collapsed) return null;
                t.setEndAt(e, 2);
                var n = t.extractContents(),
                    r = e.clone(!1);
                return n.appendTo(r), r.insertAfter(e), t.moveToPosition(e, 4), r
            },
            checkBoundaryOfElement: function(e, t) {
                var n = t == 1,
                    i = this.clone();
                i.collapse(n), i[n ? "setStartAt" : "setEndAt"](e, n ? 1 : 2);
                var s = new r.walker(i);
                return s.evaluator = l(n), s[n ? "checkBackward" : "checkForward"]()
            },
            checkStartOfBlock: function() {
                var e = this,
                    t = e.startContainer,
                    n = e.startOffset;
                if (n && t.type == 3) {
                    var s = i.ltrim(t.substring(0, n));
                    if (s.length) return !1
                }
                var o = new r.elementPath(e.startContainer),
                    u = e.clone();
                u.collapse(!0), u.setStartAt(o.block || o.blockLimit, 1);
                var f = new r.walker(u);
                return f.evaluator = a(!0), f.checkBackward()
            },
            checkEndOfBlock: function() {
                var e = this,
                    t = e.endContainer,
                    n = e.endOffset;
                if (t.type == 3) {
                    var s = i.rtrim(t.substring(n));
                    if (s.length) return !1
                }
                var o = new r.elementPath(e.endContainer),
                    u = e.clone();
                u.collapse(!1), u.setEndAt(o.block || o.blockLimit, 2);
                var f = new r.walker(u);
                return f.evaluator = a(!1), f.checkForward()
            },
            checkReadOnly: function() {
                function e(e, t) {
                    while (e) {
                        if (e.type == 1) {
                            if (e.getAttribute("contentEditable") == "false" && !e.data("cke-editable")) return 0;
                            if (e.is("html") || e.getAttribute("contentEditable") == "true" && (e.contains(t) || e.equals(t))) break
                        }
                        e = e.getParent()
                    }
                    return 1
                }
                return function() {
                    var t = this.startContainer,
                        n = this.endContainer;
                    return !e(t, n) || !e(n, t)
                }
            }(),
            moveToElementEditablePosition: function(e, t) {
                function r(e, n) {
                    var r;
                    return e.type == 1 && e.isEditable(!1) && (r = e[t ? "getLast" : "getFirst"](v)), !n && !r && (r = e[t ? "getPrevious" : "getNext"](v)), r
                }
                var n = /^[\t\r\n ]*(?:&nbsp;|\xa0)$/;
                if (e.type == 1 && !e.isEditable(!1)) return this.moveToPosition(e, t ? 4 : 3), !0;
                var i = 0;
                while (e) {
                    if (e.type == 3) {
                        t && this.checkEndOfBlock() && n.test(e.getText()) ? this.moveToPosition(e, 3) : this.moveToPosition(e, t ? 4 : 3), i = 1;
                        break
                    }
                    e.type == 1 && (e.isEditable() ? (this.moveToPosition(e, t ? 2 : 1), i = 1) : t && e.is("br") && this.checkEndOfBlock() && this.moveToPosition(e, 3)), e = r(e, i)
                }
                return !!i
            },
            moveToElementEditStart: function(e) {
                return this.moveToElementEditablePosition(e)
            },
            moveToElementEditEnd: function(e) {
                return this.moveToElementEditablePosition(e, !0)
            },
            getEnclosedNode: function() {
                var e = this.clone();
                e.optimize();
                if (e.startContainer.type != 1 || e.endContainer.type != 1) return null;
                var t = new r.walker(e),
                    n = r.walker.bookmark(!0),
                    i = r.walker.whitespaces(!0),
                    s = function(e) {
                        return i(e) && n(e)
                    };
                e.evaluator = s;
                var o = t.next();
                return t.reset(), o && o.equals(t.previous()) ? o : null
            },
            getTouchedStartNode: function() {
                var e = this.startContainer;
                return this.collapsed || e.type != 1 ? e : e.getChild(this.startOffset) || e
            },
            getTouchedEndNode: function() {
                var e = this.endContainer;
                return this.collapsed || e.type != 1 ? e : e.getChild(this.endOffset - 1) || e
            }
        }
    }(), e.POSITION_AFTER_START = 1, e.POSITION_BEFORE_END = 2, e.POSITION_BEFORE_START = 3, e.POSITION_AFTER_END = 4, e.ENLARGE_ELEMENT = 1, e.ENLARGE_BLOCK_CONTENTS = 2, e.ENLARGE_LIST_ITEM_CONTENTS = 3, e.START = 1, e.END = 2, e.STARTEND = 3, e.SHRINK_ELEMENT = 1, e.SHRINK_TEXT = 2, function() {
        function t(e, t, n) {
            var r = e.serializable,
                i = t[n ? "endContainer" : "startContainer"],
                s = n ? "endOffset" : "startOffset",
                o = r ? t.document.getById(e.startNode) : e.startNode,
                u = r ? t.document.getById(e.endNode) : e.endNode;
            return i.equals(o.getPrevious()) ? (t.startOffset = t.startOffset - i.getLength() - u.getPrevious().getLength(), i = u.getNext()) : i.equals(u.getPrevious()) && (t.startOffset = t.startOffset - i.getLength(), i = u.getNext()), i.equals(o.getParent()) && t[s]++, i.equals(u.getParent()) && t[s]++, t[n ? "endContainer" : "startContainer"] = i, t
        }
        r.rangeList = function(t) {
            return t instanceof r.rangeList ? t : (t ? t instanceof r.range && (t = [t]) : t = [], i.extend(t, e))
        };
        var e = {
            createIterator: function() {
                var e = this,
                    t = r.walker.bookmark(),
                    n = function(e) {
                        return !e.is || !e.is("tr")
                    },
                    i = [],
                    s;
                return {
                    getNextRange: function(n) {
                        s = s == undefined ? 0 : s + 1;
                        var r = e[s];
                        if (r && e.length > 1) {
                            if (!s) for (var o = e.length - 1; o >= 0; o--) i.unshift(e[o].createBookmark(!0));
                            if (n) {
                                var u = 0;
                                while (e[s + u + 1]) {
                                    var a = r.document,
                                        f = 0,
                                        l = a.getById(i[u].endNode),
                                        c = a.getById(i[u + 1].startNode),
                                        h;
                                    for (;;) {
                                        h = l.getNextSourceNode(!1);
                                        if (!c.equals(h)) {
                                            if (t(h) || h.type == 1 && h.isBlockBoundary()) {
                                                l = h;
                                                continue
                                            }
                                        } else f = 1;
                                        break
                                    }
                                    if (!f) break;
                                    u++
                                }
                            }
                            r.moveToBookmark(i.shift());
                            while (u--) h = e[++s], h.moveToBookmark(i.shift()), r.setEnd(h.endContainer, h.endOffset)
                        }
                        return r
                    }
                }
            },
            createBookmarks: function(e) {
                var n = this,
                    r = [],
                    i;
                for (var s = 0; s < n.length; s++) {
                    r.push(i = n[s].createBookmark(e, !0));
                    for (var o = s + 1; o < n.length; o++) n[o] = t(i, n[o]), n[o] = t(i, n[o], !0)
                }
                return r
            },
            createBookmarks2: function(e) {
                var t = [];
                for (var n = 0; n < this.length; n++) t.push(this[n].createBookmark2(e));
                return t
            },
            moveToBookmarks: function(e) {
                for (var t = 0; t < this.length; t++) this[t].moveToBookmark(e[t])
            }
        }
    }(), function() {
        if (t.webkit) {
            t.hc = !1;
            return
        }
        var n = u.createFromHtml('<div style="width:0px;height:0px;position:absolute;left:-10000px;border: 1px solid;border-color: red blue;"></div>', e.document);
        n.appendTo(e.document.getHead());
        try {
            t.hc = n.getComputedStyle("border-top-color") == n.getComputedStyle("border-right-color")
        } catch (r) {
            t.hc = !1
        }
        t.hc && (t.cssClass += " cke_hc"), n.remove()
    }(), f.load(a.corePlugins.split(","), function() {
        e.status = "loaded", e.fire("loaded");
        var t = e._.pending;
        if (t) {
            delete e._.pending;
            for (var n = 0; n < t.length; n++) e.add(t[n])
        }
    });
    if (n) try {
        document.execCommand("BackgroundImageCache", !1, !0)
    } catch (c) {}
    e.skins.add("kama", function() {
        var r = "cke_ui_color";
        return {
            editor: {
                css: ["editor.css"]
            },
            dialog: {
                css: ["dialog.css"]
            },
            richcombo: {
                canGroup: !1
            },
            templates: {
                css: ["templates.css"]
            },
            margins: [0, 0, 0, 0],
            init: function(s) {
                function l(e) {
                    var t = e.getById(r);
                    return t || (t = e.getHead().append("style"), t.setAttribute("id", r), t.setAttribute("type", "text/css")), t
                }
                function c(e, r, i) {
                    var s, o, u;
                    for (var a = 0; a < e.length; a++) if (t.webkit) for (o = 0; o < r.length; o++) {
                        u = r[o][1];
                        for (s = 0; s < i.length; s++) u = u.replace(i[s][0], i[s][1]);
                        e[a].$.sheet.addRule(r[o][0], u)
                    } else {
                        u = r;
                        for (s = 0; s < i.length; s++) u = u.replace(i[s][0], i[s][1]);
                        n ? e[a].$.styleSheet.cssText += u : e[a].$.innerHTML += u
                    }
                }
                s.config.width && !isNaN(s.config.width) && (s.config.width -= 12);
                var o = [],
                    u = /\$color/g,
                    a = "/* UI Color Support */.cke_skin_kama .cke_menuitem .cke_icon_wrapper{    background-color: $color !important;	border-color: $color !important;}.cke_skin_kama .cke_menuitem a:hover .cke_icon_wrapper,.cke_skin_kama .cke_menuitem a:focus .cke_icon_wrapper,.cke_skin_kama .cke_menuitem a:active .cke_icon_wrapper{	background-color: $color !important;	border-color: $color !important;}.cke_skin_kama .cke_menuitem a:hover .cke_label,.cke_skin_kama .cke_menuitem a:focus .cke_label,.cke_skin_kama .cke_menuitem a:active .cke_label{	background-color: $color !important;}.cke_skin_kama .cke_menuitem a.cke_disabled:hover .cke_label,.cke_skin_kama .cke_menuitem a.cke_disabled:focus .cke_label,.cke_skin_kama .cke_menuitem a.cke_disabled:active .cke_label{	background-color: transparent !important;}.cke_skin_kama .cke_menuitem a.cke_disabled:hover .cke_icon_wrapper,.cke_skin_kama .cke_menuitem a.cke_disabled:focus .cke_icon_wrapper,.cke_skin_kama .cke_menuitem a.cke_disabled:active .cke_icon_wrapper{	background-color: $color !important;	border-color: $color !important;}.cke_skin_kama .cke_menuitem a.cke_disabled .cke_icon_wrapper{	background-color: $color !important;	border-color: $color !important;}.cke_skin_kama .cke_menuseparator{	background-color: $color !important;}.cke_skin_kama .cke_menuitem a:hover,.cke_skin_kama .cke_menuitem a:focus,.cke_skin_kama .cke_menuitem a:active{	background-color: $color !important;}";
                if (t.webkit) {
                    a = a.split("}").slice(0, -1);
                    for (var f = 0; f < a.length; f++) a[f] = a[f].split("{")
                }
                var h = /\$color/g;
                i.extend(s, {
                    uiColor: null,
                    getUiColor: function() {
                        return this.uiColor
                    },
                    setUiColor: function(n) {
                        var r, i = l(e.document),
                            u = "." + s.id,
                            f = [u + " .cke_wrapper", u + "_dialog .cke_dialog_contents", u + "_dialog a.cke_dialog_tab", u + "_dialog .cke_dialog_footer"].join(","),
                            p = "background-color: $color !important;";
                        return t.webkit ? r = [
                            [f, p]
                        ] : r = f + "{" + p + "}", (this.setUiColor = function(e) {
                            var t = [
                                [h, e]
                            ];
                            s.uiColor = e, c([i], r, t), c(o, a, t)
                        })(n)
                    }
                }), s.on("menuShow", function(e) {
                    var t = e.data[0],
                        n = t.element.getElementsByTag("iframe").getItem(0).getFrameDocument();
                    if (!n.getById("cke_ui_color")) {
                        var r = l(n);
                        o.push(r);
                        var i = s.getUiColor();
                        i && c([r], a, [
                            [h, i]
                        ])
                    }
                }), s.config.uiColor && s.setUiColor(s.config.uiColor)
            }
        }
    }()), function() {
        function t() {
            e.dialog.on("resize", function(e) {
                var t = e.data,
                    n = t.width,
                    r = t.height,
                    i = t.dialog,
                    s = i.parts.contents;
                if (t.skin != "kama") return;
                s.setStyles({
                    width: n + "px",
                    height: r + "px"
                })
            })
        }
        e.dialog ? t() : e.on("dialogPluginReady", t)
    }(), f.add("about", {
        requires: ["dialog"],
        init: function(t) {
            var n = t.addCommand("about", new e.dialogCommand("about"));
            n.modes = {
                wysiwyg: 1,
                source: 1
            }, n.canUndo = !1, n.readOnly = 1, t.ui.addButton("About", {
                label: t.lang.about.title,
                command: "about"
            }), e.dialog.add("about", this.path + "dialogs/about.js")
        }
    }), function() {
        var t = "a11yhelp",
            n = "a11yHelp";
        f.add(t, {
            requires: ["dialog"],
            availableLangs: {
                cs: 1,
                cy: 1,
                da: 1,
                de: 1,
                el: 1,
                en: 1,
                eo: 1,
                fa: 1,
                fi: 1,
                fr: 1,
                gu: 1,
                he: 1,
                it: 1,
                mk: 1,
                nb: 1,
                nl: 1,
                no: 1,
                "pt-br": 1,
                ro: 1,
                tr: 1,
                ug: 1,
                vi: 1,
                "zh-cn": 1
            },
            init: function(t) {
                var r = this;
                t.addCommand(n, {
                    exec: function() {
                        var s = t.langCode;
                        s = r.availableLangs[s] ? s : "en", e.scriptLoader.load(e.getUrl(r.path + "lang/" + s + ".js"), function() {
                            i.extend(t.lang, r.langEntries[s]), t.openDialog(n)
                        })
                    },
                    modes: {
                        wysiwyg: 1,
                        source: 1
                    },
                    readOnly: 1,
                    canUndo: !1
                }), e.dialog.add(n, this.path + "dialogs/a11yhelp.js")
            }
        })
    }(), f.add("basicstyles", {
        requires: ["styles", "button"],
        init: function(t) {
            var n = function(n, r, i, s) {
                    var o = new e.style(s);
                    t.attachStyleStateChange(o, function(e) {
                        !t.readOnly && t.getCommand(i).setState(e)
                    }), t.addCommand(i, new e.styleCommand(o)), t.ui.addButton(n, {
                        label: r,
                        command: i
                    })
                },
                r = t.config,
                i = t.lang;
            n("Bold", i.bold, "bold", r.coreStyles_bold), n("Italic", i.italic, "italic", r.coreStyles_italic), n("Underline", i.underline, "underline", r.coreStyles_underline), n("Strike", i.strike, "strike", r.coreStyles_strike), n("Subscript", i.subscript, "subscript", r.coreStyles_subscript), n("Superscript", i.superscript, "superscript", r.coreStyles_superscript)
        }
    }), a.coreStyles_bold = {
        element: "strong",
        overrides: "b"
    }, a.coreStyles_italic = {
        element: "em",
        overrides: "i"
    }, a.coreStyles_underline = {
        element: "u"
    }, a.coreStyles_strike = {
        element: "strike"
    }, a.coreStyles_subscript = {
        element: "sub"
    }, a.coreStyles_superscript = {
        element: "sup"
    }, function() {
        function o(e) {
            a(e), l(e)
        }
        function a(e) {
            var t = e.editor,
                n = e.data.path;
            if (t.readOnly) return;
            var r = t.config.useComputedState,
                i;
            r = r === undefined || r, r || (i = c(n.lastElement)), i = i || n.block || n.blockLimit;
            if (i.is("body")) {
                var s = t.getSelection().getRanges()[0].getEnclosedNode();
                s && s.type == 1 && (i = s)
            }
            if (!i) return;
            var o = r ? i.getComputedStyle("direction") : i.getStyle("direction") || i.getAttribute("dir");
            t.getCommand("bidirtl").setState(o == "rtl" ? 1 : 2), t.getCommand("bidiltr").setState(o == "ltr" ? 1 : 2)
        }
        function l(e) {
            var t = e.editor,
                n = e.data.path.block || e.data.path.blockLimit;
            t.fire("contentDirChanged", n ? n.getComputedStyle("direction") : t.lang.dir)
        }
        function c(e) {
            while (e && !(e.getName() in s || e.is("body"))) {
                var t = e.getParent();
                if (!t) break;
                e = t
            }
            return e
        }
        function p(e, t, n, r) {
            if (e.isReadOnly()) return;
            u.setMarker(r, e, "bidi_processed", 1);
            var i = e;
            while ((i = i.getParent()) && !i.is("body")) if (i.getCustomData("bidi_processed")) {
                e.removeStyle("direction"), e.removeAttribute("dir");
                return
            }
            var s = "useComputedState" in n.config ? n.config.useComputedState : 1,
                o = s ? e.getComputedStyle("direction") : e.getStyle("direction") || e.hasAttribute("dir");
            if (o == t) return;
            e.removeStyle("direction"), s ? (e.removeAttribute("dir"), t != e.getComputedStyle("direction") && e.setAttribute("dir", t)) : e.setAttribute("dir", t), n.forceNextSelectionCheck()
        }
        function v(e, t, n) {
            var r = e.getCommonAncestor(!1, !0);
            e = e.clone(), e.enlarge(n == 2 ? 3 : 2);
            if (e.checkBoundaryOfElement(r, 1) && e.checkBoundaryOfElement(r, 2)) {
                var i;
                while (r && r.type == 1 && (i = r.getParent()) && i.getChildCount() == 1 && !(r.getName() in t)) r = i;
                return r.type == 1 && r.getName() in t && r
            }
        }
        function m(e) {
            return function(i) {
                var s = i.getSelection(),
                    o = i.config.enterMode,
                    a = s.getRanges();
                if (a && a.length) {
                    var f = {},
                        l = s.createBookmarks(),
                        c = a.createIterator(),
                        m, g = 0;
                    while (m = c.getNextRange(1)) {
                        var y = m.getEnclosedNode();
                        if (!y || y && !(y.type == 1 && y.getName() in n)) y = v(m, t, o);
                        y && p(y, e, i, f);
                        var b, w, E = new r.walker(m),
                            S = l[g].startNode,
                            x = l[g++].endNode;
                        E.evaluator = function(e) {
                            return !!(e.type == 1 && e.getName() in t && (e.getName() != (o == 1 ? "p" : "div") || e.getParent().type != 1 || e.getParent().getName() != "blockquote") && e.getPosition(S) & 2 && (e.getPosition(x) & 4 + 16) == 4)
                        };
                        while (w = E.next()) p(w, e, i, f);
                        b = m.createIterator(), b.enlargeBr = o != 2;
                        while (w = b.getNextParagraph(o == 1 ? "p" : "div")) p(w, e, i, f)
                    }
                    u.clearAllMarkers(f), i.forceNextSelectionCheck(), s.selectBookmarks(l), i.focus()
                }
            }
        }
        function g(e) {
            var t = e.getDocument().getBody().getParent();
            while (e) {
                if (e.equals(t)) return !1;
                e = e.getParent()
            }
            return !0
        }
        function y(t) {
            var n = t == b.setAttribute,
                r = t == b.removeAttribute,
                i = /\bdirection\s*:\s*(.*?)\s*(:?$|;)/;
            return function(s, o) {
                var u = this;
                if (!u.getDocument().equals(e.document)) {
                    var a;
                    if ((s == (n || r ? "dir" : "direction") || s == "style" && (r || i.test(o))) && !g(u)) {
                        a = u.getDirection(1);
                        var f = t.apply(u, arguments);
                        if (a != u.getDirection(1)) return u.getDocument().fire("dirChanged", u), f
                    }
                }
                return t.apply(u, arguments)
            }
        }
        var t = {
            table: 1,
            ul: 1,
            ol: 1,
            blockquote: 1,
            div: 1
        },
            n = {},
            s = {};
        i.extend(n, t, {
            tr: 1,
            p: 1,
            div: 1,
            li: 1
        }), i.extend(s, n, {
            td: 1
        }), f.add("bidi", {
            requires: ["styles", "button"],
            init: function(t) {
                var n = function(n, r, i, s) {
                        t.addCommand(i, new e.command(t, {
                            exec: s
                        })), t.ui.addButton(n, {
                            label: r,
                            command: i
                        })
                    },
                    r = t.lang.bidi;
                n("BidiLtr", r.ltr, "bidiltr", m("ltr")), n("BidiRtl", r.rtl, "bidirtl", m("rtl")), t.on("selectionChange", o), t.on("contentDom", function() {
                    t.document.on("dirChanged", function(e) {
                        t.fire("dirChanged", {
                            node: e.data,
                            dir: e.data.getDirection(1)
                        })
                    })
                })
            }
        });
        var b = u.prototype,
            w = ["setStyle", "removeStyle", "setAttribute", "removeAttribute"];
        for (var E = 0; E < w.length; E++) b[w[E]] = i.override(b[w[E]], y)
    }(), function() {
        function e(e, t) {
            var n = t.block || t.blockLimit;
            return !n || n.getName() == "body" ? 2 : n.getAscendant("blockquote", !0) ? 1 : 2
        }
        function t(t) {
            var n = t.editor;
            if (n.readOnly) return;
            var r = n.getCommand("blockquote");
            r.state = e(n, t.data.path), r.fire("state")
        }
        function i(e) {
            for (var t = 0, n = e.getChildCount(), r; t < n && (r = e.getChild(t)); t++) if (r.type == 1 && r.isBlockBoundary()) return !1;
            return !0
        }
        var s = {
            exec: function(e) {
                var t = e.getCommand("blockquote").state,
                    s = e.getSelection(),
                    o = s && s.getRanges(!0)[0];
                if (!o) return;
                var a = s.createBookmarks();
                if (n) {
                    var f = a[0].startNode,
                        l = a[0].endNode,
                        c;
                    if (f && f.getParent().getName() == "blockquote") {
                        c = f;
                        while (c = c.getNext()) if (c.type == 1 && c.isBlockBoundary()) {
                            f.move(c, !0);
                            break
                        }
                    }
                    if (l && l.getParent().getName() == "blockquote") {
                        c = l;
                        while (c = c.getPrevious()) if (c.type == 1 && c.isBlockBoundary()) {
                            l.move(c);
                            break
                        }
                    }
                }
                var p = o.createIterator(),
                    v;
                p.enlargeBr = e.config.enterMode != 2;
                if (t == 2) {
                    var m = [];
                    while (v = p.getNextParagraph()) m.push(v);
                    if (m.length < 1) {
                        var g = e.document.createElement(e.config.enterMode == 1 ? "p" : "div"),
                            y = a.shift();
                        o.insertNode(g), g.append(new r.text("ï»¿", e.document)), o.moveToBookmark(y), o.selectNodeContents(g), o.collapse(!0), y = o.createBookmark(), m.push(g), a.unshift(y)
                    }
                    var b = m[0].getParent(),
                        w = [];
                    for (var E = 0; E < m.length; E++) v = m[E], b = b.getCommonAncestor(v.getParent());
                    var S = {
                        table: 1,
                        tbody: 1,
                        tr: 1,
                        ol: 1,
                        ul: 1
                    };
                    while (S[b.getName()]) b = b.getParent();
                    var x = null;
                    while (m.length > 0) {
                        v = m.shift();
                        while (!v.getParent().equals(b)) v = v.getParent();
                        v.equals(x) || w.push(v), x = v
                    }
                    while (w.length > 0) {
                        v = w.shift();
                        if (v.getName() == "blockquote") {
                            var T = new r.documentFragment(e.document);
                            while (v.getFirst()) T.append(v.getFirst().remove()), m.push(T.getLast());
                            T.replace(v)
                        } else m.push(v)
                    }
                    var N = e.document.createElement("blockquote");
                    N.insertBefore(m[0]);
                    while (m.length > 0) v = m.shift(), N.append(v)
                } else if (t == 1) {
                    var C = [],
                        k = {};
                    while (v = p.getNextParagraph()) {
                        var L = null,
                            A = null;
                        while (v.getParent()) {
                            if (v.getParent().getName() == "blockquote") {
                                L = v.getParent(), A = v;
                                break
                            }
                            v = v.getParent()
                        }
                        L && A && !A.getCustomData("blockquote_moveout") && (C.push(A), u.setMarker(k, A, "blockquote_moveout", !0))
                    }
                    u.clearAllMarkers(k);
                    var O = [],
                        M = [];
                    k = {};
                    while (C.length > 0) {
                        var _ = C.shift();
                        N = _.getParent(), _.getPrevious() ? _.getNext() ? (_.breakParent(_.getParent()), M.push(_.getNext())) : _.remove().insertAfter(N) : _.remove().insertBefore(N), N.getCustomData("blockquote_processed") || (M.push(N), u.setMarker(k, N, "blockquote_processed", !0)), O.push(_)
                    }
                    u.clearAllMarkers(k);
                    for (E = M.length - 1; E >= 0; E--) N = M[E], i(N) && N.remove();
                    if (e.config.enterMode == 2) {
                        var D = !0;
                        while (O.length) {
                            _ = O.shift();
                            if (_.getName() == "div") {
                                T = new r.documentFragment(e.document);
                                var P = D && _.getPrevious() && (_.getPrevious().type != 1 || !_.getPrevious().isBlockBoundary());
                                P && T.append(e.document.createElement("br"));
                                var H = _.getNext() && (_.getNext().type != 1 || !_.getNext().isBlockBoundary());
                                while (_.getFirst()) _.getFirst().remove().appendTo(T);
                                H && T.append(e.document.createElement("br")), T.replace(_), D = !1
                            }
                        }
                    }
                }
                s.selectBookmarks(a), e.focus()
            }
        };
        f.add("blockquote", {
            init: function(e) {
                e.addCommand("blockquote", s), e.ui.addButton("Blockquote", {
                    label: e.lang.blockquote,
                    command: "blockquote"
                }), e.on("selectionChange", t)
            },
            requires: ["domiterator"]
        })
    }(), f.add("button", {
        beforeInit: function(e) {
            e.ui.addHandler("button", l.button.handler)
        }
    }), e.UI_BUTTON = "button", l.button = function(e) {
        i.extend(this, e, {
            title: e.label,
            className: e.className || e.command && "cke_button_" + e.command || "",
            click: e.click ||
            function(t) {
                t.execCommand(e.command)
            }
        }), this._ = {}
    }, l.button.handler = {
        create: function(e) {
            return new l.button(e)
        }
    }, function() {
        l.button.prototype = {
            render: function(s, o) {
                var u = t,
                    a = this._.id = i.getNextId(),
                    f = "",
                    l = this.command,
                    c;
                this._.editor = s;
                var h = {
                    id: a,
                    button: this,
                    editor: s,
                    focus: function() {
                        var t = e.document.getById(a);
                        t.focus()
                    },
                    execute: function() {
                        n && t.version < 7 ? i.setTimeout(function() {
                            this.button.click(s)
                        }, 0, this) : this.button.click(s)
                    }
                },
                    p = i.addFunction(function(e) {
                        if (h.onkey) return e = new r.event(e), h.onkey(h, e.getKeystroke()) !== !1
                    }),
                    v = i.addFunction(function(e) {
                        var n;
                        return h.onfocus && (n = h.onfocus(h, new r.event(e)) !== !1), t.gecko && t.version < 10900 && e.preventBubble(), n
                    });
                h.clickFn = c = i.addFunction(h.execute, h);
                if (this.modes) {
                    var m = {};
                    function g() {
                        var e = s.mode;
                        if (e) {
                            var t = this.modes[e] ? m[e] != undefined ? m[e] : 2 : 0;
                            this.setState(s.readOnly && !this.readOnly ? 0 : t)
                        }
                    }
                    s.on("beforeModeUnload", function() {
                        s.mode && this._.state != 0 && (m[s.mode] = this._.state)
                    }, this), s.on("mode", g, this), !this.readOnly && s.on("readOnly", g, this)
                } else l && (l = s.getCommand(l), l && (l.on("state", function() {
                    this.setState(l.state)
                }, this), f += "cke_" + (l.state == 1 ? "on" : l.state == 0 ? "disabled" : "off")));
                l || (f += "cke_off"), this.className && (f += " " + this.className), o.push('<span class="cke_button' + (this.icon && this.icon.indexOf(".png") == -1 ? " cke_noalphafix" : "") + '">', '<a id="', a, '" class="', f, '"', u.gecko && u.version >= 10900 && !u.hc ? "" : '" href="javascript:void(\'' + (this.title || "").replace("'", "") + "')\"", ' title="', this.title, '" tabindex="-1" hidefocus="true" role="button" aria-labelledby="' + a + '_label"' + (this.hasArrow ? ' aria-haspopup="true"' : "")), (u.opera || u.gecko && u.mac) && o.push(' onkeypress="return false;"'), u.gecko && o.push(' onblur="this.style.cssText = this.style.cssText;"'), o.push(' onkeydown="return CKEDITOR.tools.callFunction(', p, ', event);" onfocus="return CKEDITOR.tools.callFunction(', v, ', event);" ' + (n ? 'onclick="return false;" onmouseup' : "onclick") + '="CKEDITOR.tools.callFunction(', c, ', this); return false;"><span class="cke_icon"');
                if (this.icon) {
                    var y = (this.iconOffset || 0) * -16;
                    o.push(' style="background-image:url(', e.getUrl(this.icon), ");background-position:0 " + y + 'px;"')
                }
                return o.push('>&nbsp;</span><span id="', a, '_label" class="cke_label">', this.label, "</span>"), this.hasArrow && o.push('<span class="cke_buttonarrow">' + (t.hc ? "&#9660;" : "&nbsp;") + "</span>"), o.push("</a>", "</span>"), this.onRender && this.onRender(), h
            },
            setState: function(t) {
                if (this._.state == t) return !1;
                this._.state = t;
                var n = e.document.getById(this._.id);
                return n ? (n.setState(t), t == 0 ? n.setAttribute("aria-disabled", !0) : n.removeAttribute("aria-disabled"), t == 1 ? n.setAttribute("aria-pressed", !0) : n.removeAttribute("aria-pressed"), !0) : !1
            }
        }
    }(), l.prototype.addButton = function(e, t) {
        this.add(e, "button", t)
    }, function() {
        function p(e) {
            e.cancel()
        }
        function v(e, n, i) {
            var s = this.document;
            if (s.getById("cke_pastebin")) return;
            if (n == "text" && e.data && e.data.$.clipboardData) {
                var o = e.data.$.clipboardData.getData("text/plain");
                if (o) {
                    e.data.preventDefault(), i(o);
                    return
                }
            }
            var a = this.getSelection(),
                f = new r.range(s),
                l = new u(n == "text" ? "textarea" : t.webkit ? "body" : "div", s);
            l.setAttribute("id", "cke_pastebin"), t.webkit && l.append(s.createText("Â ")), s.getBody().append(l), l.setStyles({
                position: "absolute",
                top: a.getStartElement().getDocumentPosition().y + "px",
                width: "1px",
                height: "1px",
                overflow: "hidden"
            }), l.setStyle(this.config.contentsLangDirection == "ltr" ? "left" : "right", "-1000px");
            var c = a.createBookmarks();
            this.on("selectionChange", p, null, null, 0), n == "text" ? l.$.focus() : (f.setStartAt(l, 1), f.setEndAt(l, 2), f.select(!0));
            var v = this;
            window.setTimeout(function() {
                v.document.getBody().focus(), v.removeListener("selectionChange", p), t.ie7Compat ? (a.selectBookmarks(c), l.remove()) : (l.remove(), a.selectBookmarks(c));
                var e;
                l = t.webkit && (e = l.getFirst()) && e.is && e.hasClass("Apple-style-span") ? e : l, i(l["get" + (n == "text" ? "Value" : "Html")]())
            }, 0)
        }
        function m(e) {
            if (!n || t.quirks) return;
            var r = e.getSelection(),
                i;
            if (r.getType() == 3 && (i = r.getSelectedElement())) {
                var s = r.getRanges()[0],
                    o = e.document.createText("");
                o.insertBefore(i), s.setStartBefore(o), s.setEndAfter(i), r.selectRanges([s]), setTimeout(function() {
                    i.getParent() && (o.remove(), r.selectElement(i))
                }, 0)
            }
        }
        function w(e, r) {
            var i;
            if (y && e in {
                Paste: 1,
                Cut: 1
            }) return 0;
            if (e == "Paste") {
                n && (g = 1);
                try {
                    i = r.document.$.queryCommandEnabled(e) || t.webkit
                } catch (s) {}
                g = 0
            } else {
                var o = r.getSelection(),
                    u = o && o.getRanges();
                i = o && (u.length != 1 || !u[0].collapsed)
            }
            return i ? 2 : 0
        }
        function E() {
            var e = this;
            if (e.mode != "wysiwyg") return;
            var t = w("Paste", e);
            e.getCommand("cut").setState(w("Cut", e)), e.getCommand("copy").setState(w("Copy", e)), e.getCommand("paste").setState(t), e.fire("pasteState", t)
        }
        var s = function(e, n) {
                var r = e.document,
                    i = r.getBody(),
                    s = !1,
                    o = function() {
                        s = !0
                    };
                return i.on(n, o), (t.version > 7 ? r.$ : r.$.selection.createRange()).execCommand(n), i.removeListener(n, o), s
            },
            o = n ?
        function(e, t) {
            return s(e, t)
        } : function(e, t) {
            try {
                return e.document.$.execCommand(t, !1, null)
            } catch (n) {
                return !1
            }
        }, a = function(e) {
            var t = this;
            t.type = e, t.canUndo = t.type == "cut", t.startDisabled = !0
        };
        a.prototype = {
            exec: function(e, t) {
                this.type == "cut" && m(e);
                var n = o(e, this.type);
                return n || alert(e.lang.clipboard[this.type + "Error"]), n
            }
        };
        var l = {
            canUndo: !1,
            exec: n ?
            function(e) {
                e.focus();
                if (!e.document.getBody().fire("beforepaste") && !s(e, "paste")) return e.fire("pasteDialog"), !1
            } : function(e) {
                try {
                    if (!e.document.getBody().fire("beforepaste") && !e.document.$.execCommand("Paste", !1, null)) throw 0
                } catch (t) {
                    return setTimeout(function() {
                        e.fire("pasteDialog")
                    }, 0), !1
                }
            }
        },
            c = function(e) {
                if (this.mode != "wysiwyg") return;
                switch (e.data.keyCode) {
                case 1114198:
                case 2228269:
                    var n = this.document.getBody();
                    (t.opera || t.gecko) && n.fire("paste");
                    return;
                case 1114200:
                case 2228270:
                    var r = this;
                    this.fire("saveSnapshot"), setTimeout(function() {
                        r.fire("saveSnapshot")
                    }, 0)
                }
            },
            g, y;
        f.add("clipboard", {
            requires: ["dialog", "htmldataprocessor"],
            init: function(t) {
                function r(e, n, r, i) {
                    var s = t.lang[n];
                    t.addCommand(n, r), t.ui.addButton(e, {
                        label: s,
                        command: n
                    }), t.addMenuItems && t.addMenuItem(n, {
                        label: s,
                        command: n,
                        group: "clipboard",
                        order: i
                    })
                }
                t.on("paste", function(e) {
                    var n = e.data;
                    n.html ? t.insertHtml(n.html) : n.text && t.insertText(n.text), setTimeout(function() {
                        t.fire("afterPaste")
                    }, 0)
                }, null, null, 1e3), t.on("pasteDialog", function(e) {
                    setTimeout(function() {
                        t.openDialog("paste")
                    }, 0)
                }), t.on("pasteState", function(e) {
                    t.getCommand("paste").setState(e.data)
                }), r("Cut", "cut", new a("cut"), 1), r("Copy", "copy", new a("copy"), 4), r("Paste", "paste", l, 8), e.dialog.add("paste", e.getUrl(this.path + "dialogs/paste.js")), t.on("key", c, t), t.on("contentDom", function() {
                    var e = t.document.getBody();
                    e.on(n ? "beforepaste" : "paste", function(e) {
                        if (g) return;
                        var r = e.data && e.data.$;
                        if (n && r && !r.ctrlKey) return;
                        var s = {
                            mode: "html"
                        };
                        t.fire("beforePaste", s), v.call(t, e, s.mode, function(e) {
                            if (!(e = i.trim(e.replace(/<span[^>]+data-cke-bookmark[^<]*?<\/span>/ig, "")))) return;
                            var n = {};
                            n[s.mode] = e, t.fire("paste", n)
                        })
                    }), n && (e.on("contextmenu", function() {
                        g = 1, setTimeout(function() {
                            g = 0
                        }, 0)
                    }), e.on("paste", function(e) {
                        t.document.getById("cke_pastebin") || (e.data.preventDefault(), g = 0, l.exec(t))
                    })), e.on("beforecut", function() {
                        !g && m(t)
                    }), e.on("mouseup", function() {
                        setTimeout(function() {
                            E.call(t)
                        }, 0)
                    }, t), e.on("keyup", E, t)
                }), t.on("selectionChange", function(e) {
                    y = e.data.selection.getRanges()[0].checkReadOnly(), E.call(t)
                }), t.contextMenu && t.contextMenu.addListener(function(e, n) {
                    var r = n.getRanges()[0].checkReadOnly();
                    return {
                        cut: w("Cut", t),
                        copy: w("Copy", t),
                        paste: w("Paste", t)
                    }
                })
            }
        })
    }(), f.add("colorbutton", {
        requires: ["panelbutton", "floatpanel", "styles"],
        init: function(n) {
            function a(e, t, s) {
                var u = i.getNextId() + "_colorBox";
                n.ui.add(e, "panelbutton", {
                    label: s,
                    title: s,
                    className: "cke_button_" + e.toLowerCase(),
                    modes: {
                        wysiwyg: 1
                    },
                    panel: {
                        css: n.skin.editor.css,
                        attributes: {
                            role: "listbox",
                            "aria-label": o.panelTitle
                        }
                    },
                    onBlock: function(e, r) {
                        r.autoSize = !0, r.element.addClass("cke_colorblock"), r.element.setHtml(f(e, t, u)), r.element.getDocument().getBody().setStyle("overflow", "hidden"), l.fire("ready", this);
                        var i = r.keys,
                            s = n.lang.dir == "rtl";
                        i[s ? 37 : 39] = "next", i[40] = "next", i[9] = "next", i[s ? 39 : 37] = "prev", i[38] = "prev", i[2228233] = "prev", i[32] = "click"
                    },
                    onOpen: function() {
                        var e = n.getSelection(),
                            i = e && e.getStartElement(),
                            s = new r.elementPath(i),
                            o;
                        i = s.block || s.blockLimit || n.document.getBody();
                        do o = i && i.getComputedStyle(t == "back" ? "background-color" : "color") || "transparent";
                        while (t == "back" && o == "transparent" && i && (i = i.getParent()));
                        if (!o || o == "transparent") o = "#ffffff";
                        this._.panel._.iframe.getFrameDocument().getById(u).setStyle("background-color", o)
                    }
                })
            }
            function f(t, r, u) {
                var a = [],
                    f = s.colorButton_colors.split(","),
                    l = i.addFunction(function(r, i) {
                        if (r == "?") {
                            var o = arguments.callee;
                            function u(e) {
                                this.removeListener("ok", u), this.removeListener("cancel", u), e.name == "ok" && o(this.getContentElement("picker", "selectedColor").getValue(), i)
                            }
                            n.openDialog("colordialog", function() {
                                this.on("ok", u), this.on("cancel", u)
                            });
                            return
                        }
                        n.focus(), t.hide(!1), n.fire("saveSnapshot"), (new e.style(s["colorButton_" + i + "Style"], {
                            color: "inherit"
                        })).remove(n.document);
                        if (r) {
                            var a = s["colorButton_" + i + "Style"];
                            a.childRule = i == "back" ?
                            function(e) {
                                return c(e)
                            } : function(e) {
                                return !e.is("a") && !e.getElementsByTag("a").count() || c(e)
                            }, (new e.style(a, {
                                color: r
                            })).apply(n.document)
                        }
                        n.fire("saveSnapshot")
                    });
                a.push('<a class="cke_colorauto" _cke_focus=1 hidefocus=true title="', o.auto, '" onclick="CKEDITOR.tools.callFunction(', l, ",null,'", r, "');return false;\" href=\"javascript:void('", o.auto, '\')" role="option"><table role="presentation" cellspacing=0 cellpadding=0 width="100%"><tr><td><span class="cke_colorbox" id="', u, '"></span></td><td colspan=7 align=center>', o.auto, '</td></tr></table></a><table role="presentation" cellspacing=0 cellpadding=0 width="100%">');
                for (var h = 0; h < f.length; h++) {
                    h % 8 === 0 && a.push("</tr><tr>");
                    var p = f[h].split("/"),
                        d = p[0],
                        v = p[1] || d;
                    p[1] || (d = "#" + d.replace(/^(.)(.)(.)$/, "$1$1$2$2$3$3"));
                    var g = n.lang.colors[v] || v;
                    a.push('<td><a class="cke_colorbox" _cke_focus=1 hidefocus=true title="', g, '" onclick="CKEDITOR.tools.callFunction(', l, ",'", d, "','", r, "'); return false;\" href=\"javascript:void('", g, '\')" role="option"><span class="cke_colorbox" style="background-color:#', v, '"></span></a></td>')
                }
                return (s.colorButton_enableMore === undefined || s.colorButton_enableMore) && a.push('</tr><tr><td colspan=8 align=center><a class="cke_colormore" _cke_focus=1 hidefocus=true title="', o.more, '" onclick="CKEDITOR.tools.callFunction(', l, ",'?','", r, "');return false;\" href=\"javascript:void('", o.more, "')\"", ' role="option">', o.more, "</a></td>"), a.push("</tr></table>"), a.join("")
            }
            function c(e) {
                return e.getAttribute("contentEditable") == "false" || e.getAttribute("data-nostyle")
            }
            var s = n.config,
                o = n.lang.colorButton,
                u;
            t.hc || (a("TextColor", "fore", o.textColorTitle), a("BGColor", "back", o.bgColorTitle))
        }
    }), a.colorButton_colors = "000,800000,8B4513,2F4F4F,008080,000080,4B0082,696969,B22222,A52A2A,DAA520,006400,40E0D0,0000CD,800080,808080,F00,FF8C00,FFD700,008000,0FF,00F,EE82EE,A9A9A9,FFA07A,FFA500,FFFF00,00FF00,AFEEEE,ADD8E6,DDA0DD,D3D3D3,FFF0F5,FAEBD7,FFFFE0,F0FFF0,F0FFFF,F0F8FF,E6E6FA,FFF", a.colorButton_foreStyle = {
        element: "span",
        styles: {
            color: "#(color)"
        },
        overrides: [{
            element: "font",
            attributes: {
                color: null
            }
        }]
    }, a.colorButton_backStyle = {
        element: "span",
        styles: {
            "background-color": "#(color)"
        }
    }, f.colordialog = {
        requires: ["dialog"],
        init: function(t) {
            t.addCommand("colordialog", new e.dialogCommand("colordialog")), e.dialog.add("colordialog", this.path + "dialogs/colordialog.js")
        }
    }, f.add("colordialog", f.colordialog), f.add("contextmenu", {
        requires: ["menu"],
        onLoad: function() {
            f.contextMenu = i.createClass({
                base: e.menu,
                $: function(e) {
                    this.base.call(this, e, {
                        panel: {
                            className: e.skinClass + " cke_contextmenu",
                            attributes: {
                                "aria-label": e.lang.contextmenu.options
                            }
                        }
                    })
                },
                proto: {
                    addTarget: function(e, r) {
                        if (t.opera && !("oncontextmenu" in document.body)) {
                            var s;
                            e.on("mousedown", function(n) {
                                n = n.data;
                                if (n.$.button != 2) {
                                    n.getKeystroke() == 1114112 + 1 && e.fire("contextmenu", n);
                                    return
                                }
                                if (r && (t.mac ? n.$.metaKey : n.$.ctrlKey)) return;
                                var i = n.getTarget();
                                if (!s) {
                                    var o = i.getDocument();
                                    s = o.createElement("input"), s.$.type = "button", o.getBody().append(s)
                                }
                                s.setAttribute("style", "position:absolute;top:" + (n.$.clientY - 2) + "px;left:" + (n.$.clientX - 2) + "px;width:5px;height:5px;opacity:0.01")
                            }), e.on("mouseup", function(t) {
                                s && (s.remove(), s = undefined, e.fire("contextmenu", t.data))
                            })
                        }
                        e.on("contextmenu", function(e) {
                            var s = e.data;
                            if (r && (t.webkit ? o : t.mac ? s.$.metaKey : s.$.ctrlKey)) return;
                            s.preventDefault();
                            var u = s.getTarget().getDocument().getDocumentElement(),
                                a = s.$.clientX,
                                f = s.$.clientY;
                            i.setTimeout(function() {
                                this.open(u, null, a, f)
                            }, n ? 200 : 0, this)
                        }, this), t.opera && e.on("keypress", function(e) {
                            var t = e.data;
                            t.$.keyCode === 0 && t.preventDefault()
                        });
                        if (t.webkit) {
                            var o, u = function(e) {
                                    o = t.mac ? e.data.$.metaKey : e.data.$.ctrlKey
                                },
                                a = function() {
                                    o = 0
                                };
                            e.on("keydown", u), e.on("keyup", a), e.on("contextmenu", a)
                        }
                    },
                    open: function(t, n, r, i) {
                        this.editor.focus(), t = t || e.document.getDocumentElement(), this.show(t, n, r, i)
                    }
                }
            })
        },
        beforeInit: function(e) {
            e.contextMenu = new f.contextMenu(e), e.addCommand("contextMenu", {
                exec: function() {
                    e.contextMenu.open(e.document.getBody())
                }
            })
        }
    }), function() {
        function t(e) {
            var t = this.att,
                n = e && e.hasAttribute(t) && e.getAttribute(t) || "";
            n !== undefined && this.setValue(n)
        }
        function n() {
            var e;
            for (var t = 0; t < arguments.length; t++) if (arguments[t] instanceof u) {
                e = arguments[t];
                break
            }
            if (e) {
                var n = this.att,
                    r = this.getValue();
                r ? e.setAttribute(n, r) : e.removeAttribute(n, r)
            }
        }
        f.add("dialogadvtab", {
            createAdvancedTab: function(r, i) {
                i || (i = {
                    id: 1,
                    dir: 1,
                    classes: 1,
                    styles: 1
                });
                var s = r.lang.common,
                    o = {
                        id: "advanced",
                        label: s.advancedTab,
                        title: s.advancedTab,
                        elements: [{
                            type: "vbox",
                            padding: 1,
                            children: []
                        }]
                    },
                    u = [];
                if (i.id || i.dir) i.id && u.push({
                    id: "advId",
                    att: "id",
                    type: "text",
                    label: s.id,
                    setup: t,
                    commit: n
                }), i.dir && u.push({
                    id: "advLangDir",
                    att: "dir",
                    type: "select",
                    label: s.langDir,
                    "default": "",
                    style: "width:100%",
                    items: [
                        [s.notSet, ""],
                        [s.langDirLTR, "ltr"],
                        [s.langDirRTL, "rtl"]
                    ],
                    setup: t,
                    commit: n
                }), o.elements[0].children.push({
                    type: "hbox",
                    widths: ["50%", "50%"],
                    children: [].concat(u)
                });
                if (i.styles || i.classes) u = [], i.styles && u.push({
                    id: "advStyles",
                    att: "style",
                    type: "text",
                    label: s.styles,
                    "default": "",
                    validate: e.dialog.validate.inlineStyle(s.invalidInlineStyle),
                    onChange: function() {},
                    getStyle: function(e, t) {
                        var n = this.getValue().match(new RegExp(e + "\\s*:\\s*([^;]*)", "i"));
                        return n ? n[1] : t
                    },
                    updateStyle: function(e, t) {
                        var n = this.getValue();
                        n && (n = n.replace(new RegExp("\\s*" + e + "s*:[^;]*(?:$|;s*)", "i"), "").replace(/^[;\s]+/, "").replace(/\s+$/, "")), t && (n && !/;\s*$/.test(n) && (n += "; "), n += e + ": " + t), this.setValue(n, 1)
                    },
                    setup: t,
                    commit: n
                }), i.classes && u.push({
                    type: "hbox",
                    widths: ["45%", "55%"],
                    children: [{
                        id: "advCSSClasses",
                        att: "class",
                        type: "text",
                        label: s.cssClasses,
                        "default": "",
                        setup: t,
                        commit: n
                    }]
                }), o.elements[0].children.push({
                    type: "hbox",
                    widths: ["50%", "50%"],
                    children: [].concat(u)
                });
                return o
            }
        })
    }(), function() {
        f.add("div", {
            requires: ["editingblock", "dialog", "domiterator", "styles"],
            init: function(t) {
                var n = t.lang.div;
                t.addCommand("creatediv", new e.dialogCommand("creatediv")), t.addCommand("editdiv", new e.dialogCommand("editdiv")), t.addCommand("removediv", {
                    exec: function(e) {
                        function a(e) {
                            var t = new r.elementPath(e),
                                n = t.blockLimit,
                                i = n.is("div") && n;
                            i && !i.data("cke-div-added") && (u.push(i), i.data("cke-div-added"))
                        }
                        var t = e.getSelection(),
                            n = t && t.getRanges(),
                            i, s = t.createBookmarks(),
                            o, u = [];
                        for (var f = 0; f < n.length; f++) i = n[f], i.collapsed ? a(t.getStartElement()) : (o = new r.walker(i), o.evaluator = a, o.lastForward());
                        for (f = 0; f < u.length; f++) u[f].remove(!0);
                        t.selectBookmarks(s)
                    }
                }), t.ui.addButton("CreateDiv", {
                    label: n.toolbar,
                    command: "creatediv"
                }), t.addMenuItems && (t.addMenuItems({
                    editdiv: {
                        label: n.edit,
                        command: "editdiv",
                        group: "div",
                        order: 1
                    },
                    removediv: {
                        label: n.remove,
                        command: "removediv",
                        group: "div",
                        order: 5
                    }
                }), t.contextMenu && t.contextMenu.addListener(function(e, t) {
                    if (!e || e.isReadOnly()) return null;
                    var n = new r.elementPath(e),
                        i = n.blockLimit;
                    return i && i.getAscendant("div", !0) ? {
                        editdiv: 2,
                        removediv: 2
                    } : null
                })), e.dialog.add("creatediv", this.path + "dialogs/div.js"), e.dialog.add("editdiv", this.path + "dialogs/div.js")
            }
        })
    }(), function() {
        var s = {
            toolbarFocus: {
                editorFocus: !1,
                readOnly: 1,
                exec: function(r) {
                    var i = r._.elementsPath.idBase,
                        s = e.document.getById(i + "0");
                    s && s.focus(n || t.air)
                }
            }
        },
            o = '<span class="cke_empty">&nbsp;</span>';
        f.add("elementspath", {
            requires: ["selection"],
            init: function(n) {
                function c(e) {
                    n.focus();
                    var t = n._.elementsPath.list[e];
                    if (t.is("body")) {
                        var i = new r.range(n.document);
                        i.selectNodeContents(t), i.select()
                    } else n.getSelection().selectElement(t)
                }
                function v() {
                    a && a.setHtml(o), delete n._.elementsPath.list
                }
                var u = "cke_path_" + n.name,
                    a, f = function() {
                        return a || (a = e.document.getById(u)), a
                    },
                    l = "cke_elementspath_" + i.getNextNumber() + "_";
                n._.elementsPath = {
                    idBase: l,
                    filters: []
                }, n.on("themeSpace", function(e) {
                    e.data.space == "bottom" && (e.data.html += '<span id="' + u + '_label" class="cke_voice_label">' + n.lang.elementsPath.eleLabel + "</span>" + '<div id="' + u + '" class="cke_path" role="group" aria-labelledby="' + u + '_label">' + o + "</div>")
                });
                var h = i.addFunction(c),
                    p = i.addFunction(function(t, i) {
                        var s = n._.elementsPath.idBase,
                            o;
                        i = new r.event(i);
                        var u = n.lang.dir == "rtl";
                        switch (i.getKeystroke()) {
                        case u ? 39:
                            37 : case 9:
                            return o = e.document.getById(s + (t + 1)), o || (o = e.document.getById(s + "0")), o.focus(), !1;
                        case u ? 37:
                            39 : case 2228233:
                            return o = e.document.getById(s + (t - 1)), o || (o = e.document.getById(s + (n._.elementsPath.list.length - 1))), o.focus(), !1;
                        case 27:
                            return n.focus(), !1;
                        case 13:
                        case 32:
                            return c(t), !1
                        }
                        return !0
                    });
                n.on("selectionChange", function(e) {
                    var n = t,
                        r = e.data.selection,
                        i = r.getStartElement(),
                        s = [],
                        u = e.editor,
                        a = u._.elementsPath.list = [],
                        c = u._.elementsPath.filters;
                    while (i) {
                        var d = 0,
                            v;
                        i.data("cke-display-name") ? v = i.data("cke-display-name") : i.data("cke-real-element-type") ? v = i.data("cke-real-element-type") : v = i.getName();
                        for (var m = 0; m < c.length; m++) {
                            var g = c[m](i, v);
                            if (g === !1) {
                                d = 1;
                                break
                            }
                            v = g || v
                        }
                        if (!d) {
                            var y = a.push(i) - 1,
                                w = "";
                            if (n.opera || n.gecko && n.mac) w += ' onkeypress="return false;"';
                            n.gecko && (w += ' onblur="this.style.cssText = this.style.cssText;"');
                            var E = u.lang.elementsPath.eleTitle.replace(/%1/, v);
                            s.unshift('<a id="', l, y, '" href="javascript:void(\'', v, '\')" tabindex="-1" title="', E, '"' + (t.gecko && t.version < 10900 ? ' onfocus="event.preventBubble();"' : "") + ' hidefocus="true" ' + ' onkeydown="return CKEDITOR.tools.callFunction(', p, ",", y, ', event );"' + w, ' onclick="CKEDITOR.tools.callFunction(' + h, ",", y, '); return false;"', ' role="button" aria-labelledby="' + l + y + '_label">', v, '<span id="', l, y, '_label" class="cke_label">' + E + "</span>", "</a>")
                        }
                        if (v == "body") break;
                        i = i.getParent()
                    }
                    var S = f();
                    S.setHtml(s.join("") + o), u.fire("elementsPathUpdate", {
                        space: S
                    })
                }), n.on("readOnly", v), n.on("contentDomUnload", v), n.addCommand("elementsPathFocus", s.toolbarFocus)
            }
        })
    }(), function() {
        function a(e) {
            return e.mode != "wysiwyg" ? !1 : l(e, e.config.shiftEnterMode, 1)
        }
        function l(e, t, n) {
            return n = e.config.forceEnterMode || n, e.mode != "wysiwyg" ? !1 : (t || (t = e.config.enterMode), setTimeout(function() {
                e.fire("saveSnapshot"), t == 2 ? i(e, t, null, n) : o(e, t, null, n), e.fire("saveSnapshot")
            }, 0), !0)
        }
        function c(e) {
            var t = e.getSelection().getRanges(!0);
            for (var n = t.length - 1; n > 0; n--) t[n].deleteContents();
            return t[0]
        }
        f.add("enterkey", {
            requires: ["keystrokes", "indent"],
            init: function(e) {
                e.addCommand("enter", {
                    modes: {
                        wysiwyg: 1
                    },
                    editorFocus: !1,
                    exec: function(e) {
                        l(e)
                    }
                }), e.addCommand("shiftEnter", {
                    modes: {
                        wysiwyg: 1
                    },
                    editorFocus: !1,
                    exec: function(e) {
                        a(e)
                    }
                });
                var t = e.keystrokeHandler.keystrokes;
                t[13] = "enter", t[2228237] = "shiftEnter"
            }
        }), f.enterkey = {
            enterBlock: function(e, t, o, a) {
                o = o || c(e);
                if (!o) return;
                var f = o.document,
                    l = o.checkStartOfBlock(),
                    h = o.checkEndOfBlock(),
                    v = new r.elementPath(o.startContainer),
                    m = v.block;
                if (l && h) {
                    if (m && (m.is("li") || m.getParent().is("li"))) {
                        e.execCommand("outdent");
                        return
                    }
                    if (m && m.getParent().is("blockquote")) {
                        m.breakParent(m.getParent()), m.getPrevious().getFirst(r.walker.invisible(1)) || m.getPrevious().remove(), m.getNext().getFirst(r.walker.invisible(1)) || m.getNext().remove(), o.moveToElementEditStart(m), o.select();
                        return
                    }
                } else if (m && m.is("pre")) {
                    if (!h) {
                        i(e, t, o, a);
                        return
                    }
                } else if (m && s.$captionBlock[m.getName()]) {
                    i(e, t, o, a);
                    return
                }
                var g = t == 3 ? "div" : "p",
                    y = o.splitBlock(g);
                if (!y) return;
                var b = y.previousBlock,
                    w = y.nextBlock,
                    E = y.wasStartOfBlock,
                    S = y.wasEndOfBlock,
                    x;
                w ? (x = w.getParent(), x.is("li") && (w.breakParent(x), w.move(w.getNext(), 1))) : b && (x = b.getParent()) && x.is("li") && (b.breakParent(x), x = b.getNext(), o.moveToElementEditStart(x), b.move(b.getPrevious()));
                if (!E && !S) w.is("li") && (x = w.getFirst(r.walker.invisible(!0))) && x.is && x.is("ul", "ol") && (n ? f.createText("Â ") : f.createElement("br")).insertBefore(x), w && o.moveToElementEditStart(w);
                else {
                    var T, N;
                    if (b) {
                        if (b.is("li") || !u.test(b.getName()) && !b.is("pre")) T = b.clone()
                    } else w && (T = w.clone());
                    T ? a && !T.is("li") && T.renameNode(g) : x && x.is("li") ? T = x : (T = f.createElement(g), b && (N = b.getDirection()) && T.setAttribute("dir", N));
                    var C = y.elementPath;
                    if (C) for (var k = 0, L = C.elements.length; k < L; k++) {
                        var A = C.elements[k];
                        if (A.equals(C.block) || A.equals(C.blockLimit)) break;
                        s.$removeEmpty[A.getName()] && (A = A.clone(), T.moveChildren(A), T.append(A))
                    }
                    n || T.appendBogus(), T.getParent() || o.insertNode(T), T.is("li") && T.removeAttribute("value"), n && E && (!S || !b.getChildCount()) && (o.moveToElementEditStart(S ? b : T), o.select()), o.moveToElementEditStart(E && !S ? w : T)
                }
                if (!n) if (w) {
                    var O = f.createElement("span");
                    O.setHtml("&nbsp;"), o.insertNode(O), O.scrollIntoView(), o.deleteContents()
                } else T.scrollIntoView();
                o.select()
            },
            enterBr: function(e, i, s, a) {
                s = s || c(e);
                if (!s) return;
                var f = s.document,
                    l = i == 3 ? "div" : "p",
                    h = s.checkEndOfBlock(),
                    v = new r.elementPath(e.getSelection().getStartElement()),
                    m = v.block,
                    g = m && v.block.getName(),
                    y = !1;
                if (!a && g == "li") {
                    o(e, i, s, a);
                    return
                }
                if (!a && h && u.test(g)) {
                    var w, E;
                    (E = m.getDirection()) ? (w = f.createElement("div"), w.setAttribute("dir", E), w.insertAfter(m), s.setStart(w, 0)) : (f.createElement("br").insertAfter(m), t.gecko && f.createText("").insertAfter(m), s.setStartAt(m.getNext(), n ? 3 : 1))
                } else {
                    var S;
                    y = g == "pre", y && !t.gecko ? S = f.createText(n ? "\r" : "\n") : S = f.createElement("br"), s.deleteContents(), s.insertNode(S);
                    if (n) s.setStartAt(S, 4);
                    else {
                        f.createText("ï»¿").insertAfter(S), h && S.getParent().appendBogus(), S.getNext().$.nodeValue = "", s.setStartAt(S.getNext(), 1);
                        var x = null;
                        t.gecko ? x = f.createElement("br") : (x = f.createElement("span"), x.setHtml("&nbsp;")), x.insertBefore(S.getNext()), x.scrollIntoView(), x.remove()
                    }
                }
                s.collapse(!0), s.select(y)
            }
        };
        var e = f.enterkey,
            i = e.enterBr,
            o = e.enterBlock,
            u = /^h[1-6]$/
    }(), function() {
        function i(e, t) {
            var n = {},
                r = [],
                i = {
                    nbsp: "Â ",
                    shy: "Â­",
                    gt: ">",
                    lt: "<",
                    amp: "&",
                    apos: "'",
                    quot: '"'
                };
            e = e.replace(/\b(nbsp|shy|gt|lt|amp|apos|quot)(?:,|$)/g, function(e, s) {
                var o = t ? "&" + s + ";" : i[s],
                    u = t ? i[s] : "&" + s + ";";
                return n[o] = u, r.push(o), ""
            });
            if (!t && e) {
                e = e.split(",");
                var s = document.createElement("div"),
                    o;
                s.innerHTML = "&" + e.join(";&") + ";", o = s.innerHTML, s = null;
                for (var u = 0; u < o.length; u++) {
                    var a = o.charAt(u);
                    n[a] = "&" + e[u] + ";", r.push(a)
                }
            }
            return n.regex = r.join(t ? "|" : ""), n
        }
        var e = "nbsp,gt,lt,amp",
            t = "quot,iexcl,cent,pound,curren,yen,brvbar,sect,uml,copy,ordf,laquo,not,shy,reg,macr,deg,plusmn,sup2,sup3,acute,micro,para,middot,cedil,sup1,ordm,raquo,frac14,frac12,frac34,iquest,times,divide,fnof,bull,hellip,prime,Prime,oline,frasl,weierp,image,real,trade,alefsym,larr,uarr,rarr,darr,harr,crarr,lArr,uArr,rArr,dArr,hArr,forall,part,exist,empty,nabla,isin,notin,ni,prod,sum,minus,lowast,radic,prop,infin,ang,and,or,cap,cup,int,there4,sim,cong,asymp,ne,equiv,le,ge,sub,sup,nsub,sube,supe,oplus,otimes,perp,sdot,lceil,rceil,lfloor,rfloor,lang,rang,loz,spades,clubs,hearts,diams,circ,tilde,ensp,emsp,thinsp,zwnj,zwj,lrm,rlm,ndash,mdash,lsquo,rsquo,sbquo,ldquo,rdquo,bdquo,dagger,Dagger,permil,lsaquo,rsaquo,euro",
            n = "Agrave,Aacute,Acirc,Atilde,Auml,Aring,AElig,Ccedil,Egrave,Eacute,Ecirc,Euml,Igrave,Iacute,Icirc,Iuml,ETH,Ntilde,Ograve,Oacute,Ocirc,Otilde,Ouml,Oslash,Ugrave,Uacute,Ucirc,Uuml,Yacute,THORN,szlig,agrave,aacute,acirc,atilde,auml,aring,aelig,ccedil,egrave,eacute,ecirc,euml,igrave,iacute,icirc,iuml,eth,ntilde,ograve,oacute,ocirc,otilde,ouml,oslash,ugrave,uacute,ucirc,uuml,yacute,thorn,yuml,OElig,oelig,Scaron,scaron,Yuml",
            r = "Alpha,Beta,Gamma,Delta,Epsilon,Zeta,Eta,Theta,Iota,Kappa,Lambda,Mu,Nu,Xi,Omicron,Pi,Rho,Sigma,Tau,Upsilon,Phi,Chi,Psi,Omega,alpha,beta,gamma,delta,epsilon,zeta,eta,theta,iota,kappa,lambda,mu,nu,xi,omicron,pi,rho,sigmaf,sigma,tau,upsilon,phi,chi,psi,omega,thetasym,upsih,piv";
        f.add("entities", {
            afterInit: function(s) {
                var o = s.config,
                    u = s.dataProcessor,
                    a = u && u.htmlFilter;
                if (a) {
                    var f = [];
                    o.basicEntities !== !1 && f.push(e), o.entities && (f.length && f.push(t), o.entities_latin && f.push(n), o.entities_greek && f.push(r), o.entities_additional && f.push(o.entities_additional));
                    var l = i(f.join(",")),
                        c = l.regex ? "[" + l.regex + "]" : "a^";
                    delete l.regex, o.entities && o.entities_processNumerical && (c = "[^ -~]|" + c), c = new RegExp(c, "g");
                    function h(e) {
                        return o.entities_processNumerical == "force" || !l[e] ? "&#" + e.charCodeAt(0) + ";" : l[e]
                    }
                    var d = i([e, "shy"].join(","), !0),
                        v = new RegExp(d.regex, "g");
                    function g(e) {
                        return d[e]
                    }
                    a.addRules({
                        text: function(e) {
                            return e.replace(v, g).replace(c, h)
                        }
                    })
                }
            }
        })
    }(), a.basicEntities = !0, a.entities = !0, a.entities_latin = !0, a.entities_greek = !0, a.entities_additional = "#39", function() {
        function t(e, t) {
            var n = [];
            if (!t) return e;
            for (var r in t) n.push(r + "=" + encodeURIComponent(t[r]));
            return e + (e.indexOf("?") != -1 ? "&" : "?") + n.join("&")
        }
        function n(e) {
            e += "";
            var t = e.charAt(0).toUpperCase();
            return t + e.substr(1)
        }
        function r(e) {
            var r = this,
                i = r.getDialog(),
                s = i.getParentEditor();
            s._.filebrowserSe = r;
            var o = s.config["filebrowser" + n(i.getName()) + "WindowWidth"] || s.config.filebrowserWindowWidth || "80%",
                u = s.config["filebrowser" + n(i.getName()) + "WindowHeight"] || s.config.filebrowserWindowHeight || "70%",
                a = r.filebrowser.params || {};
            a.CKEditor = s.name, a.CKEditorFuncNum = s._.filebrowserFn, a.langCode || (a.langCode = s.langCode);
            var f = t(r.filebrowser.url, a);
            s.popup(f, o, u, s.config.filebrowserWindowFeatures || s.config.fileBrowserWindowFeatures)
        }
        function s(e) {
            var t = this,
                n = t.getDialog(),
                r = n.getParentEditor();
            return r._.filebrowserSe = t, n.getContentElement(t["for"][0], t["for"][1]).getInputElement().$.value ? n.getContentElement(t["for"][0], t["for"][1]).getAction() ? !0 : !1 : !1
        }
        function o(e, n, r) {
            var i = r.params || {};
            i.CKEditor = e.name, i.CKEditorFuncNum = e._.filebrowserFn, i.langCode || (i.langCode = e.langCode), n.action = t(r.url, i), n.filebrowser = r
        }
        function u(e, t, i, a) {
            var f, l;
            for (var c in a) {
                f = a[c], (f.type == "hbox" || f.type == "vbox" || f.type == "fieldset") && u(e, t, i, f.children);
                if (!f.filebrowser) continue;
                if (typeof f.filebrowser == "string") {
                    var h = {
                        action: f.type == "fileButton" ? "QuickUpload" : "Browse",
                        target: f.filebrowser
                    };
                    f.filebrowser = h
                }
                if (f.filebrowser.action == "Browse") {
                    var d = f.filebrowser.url;
                    d === undefined && (d = e.config["filebrowser" + n(t) + "BrowseUrl"], d === undefined && (d = e.config.filebrowserBrowseUrl)), d && (f.onClick = r, f.filebrowser.url = d, f.hidden = !1)
                } else if (f.filebrowser.action == "QuickUpload" && f["for"]) {
                    d = f.filebrowser.url, d === undefined && (d = e.config["filebrowser" + n(t) + "UploadUrl"], d === undefined && (d = e.config.filebrowserUploadUrl));
                    if (d) {
                        var v = f.onClick;
                        f.onClick = function(e) {
                            var t = e.sender;
                            return v && v.call(t, e) === !1 ? !1 : s.call(t, e)
                        }, f.filebrowser.url = d, f.hidden = !1, o(e, i.getContents(f["for"][0]).get(f["for"][1]), f.filebrowser)
                    }
                }
            }
        }
        function a(e, t) {
            var n = t.getDialog(),
                r = t.filebrowser.target || null;
            if (r) {
                var i = r.split(":"),
                    s = n.getContentElement(i[0], i[1]);
                s && (s.setValue(e), n.selectPage(i[0]))
            }
        }
        function l(e, t, n) {
            if (n.indexOf(";") !== -1) {
                var r = n.split(";");
                for (var i = 0; i < r.length; i++) if (l(e, t, r[i])) return !0;
                return !1
            }
            var s = e.getContents(t).get(n).filebrowser;
            return s && s.url
        }
        function c(e, t) {
            var n = this,
                r = n._.filebrowserSe.getDialog(),
                i = n._.filebrowserSe["for"],
                s = n._.filebrowserSe.filebrowser.onSelect;
            i && r.getContentElement(i[0], i[1]).reset();
            if (typeof t == "function" && t.call(n._.filebrowserSe) === !1) return;
            if (s && s.call(n._.filebrowserSe, e, t) === !1) return;
            typeof t == "string" && t && alert(t), e && a(e, n._.filebrowserSe)
        }
        f.add("filebrowser", {
            init: function(e, t) {
                e._.filebrowserFn = i.addFunction(c, e), e.on("destroy", function() {
                    i.removeFunction(this._.filebrowserFn)
                })
            }
        }), e.on("dialogDefinition", function(e) {
            var t = e.data.definition,
                n;
            for (var r in t.contents) if (n = t.contents[r]) u(e.editor, e.data.name, t, n.elements), n.hidden && n.filebrowser && (n.hidden = !l(t, n.id, n.filebrowser))
        })
    }(), f.add("find", {
        requires: ["dialog"],
        init: function(t) {
            var n = f.find;
            t.ui.addButton("Find", {
                label: t.lang.findAndReplace.find,
                command: "find"
            });
            var r = t.addCommand("find", new e.dialogCommand("find"));
            r.canUndo = !1, r.readOnly = 1, t.ui.addButton("Replace", {
                label: t.lang.findAndReplace.replace,
                command: "replace"
            });
            var i = t.addCommand("replace", new e.dialogCommand("replace"));
            i.canUndo = !1, e.dialog.add("find", this.path + "dialogs/find.js"), e.dialog.add("replace", this.path + "dialogs/find.js")
        },
        requires: ["styles"]
    }), a.find_highlight = {
        element: "span",
        styles: {
            "background-color": "#004",
            color: "#fff"
        }
    }, function() {
        function n(e) {
            var n = e.attributes;
            return n.type == "application/x-shockwave-flash" || t.test(n.src || "")
        }
        function r(e, t) {
            return e.createFakeParserElement(t, "cke_flash", "flash", !0)
        }
        var t = /\.swf(?:$|\?)/i;
        f.add("flash", {
            init: function(t) {
                t.addCommand("flash", new e.dialogCommand("flash")), t.ui.addButton("Flash", {
                    label: t.lang.common.flash,
                    command: "flash"
                }), e.dialog.add("flash", this.path + "dialogs/flash.js"), t.addCss("img.cke_flash{background-image: url(" + e.getUrl(this.path + "images/placeholder.png") + ");" + "background-position: center center;" + "background-repeat: no-repeat;" + "border: 1px solid #a9a9a9;" + "width: 80px;" + "height: 80px;" + "}"), t.addMenuItems && t.addMenuItems({
                    flash: {
                        label: t.lang.flash.properties,
                        command: "flash",
                        group: "flash"
                    }
                }), t.on("doubleclick", function(e) {
                    var t = e.data.element;
                    t.is("img") && t.data("cke-real-element-type") == "flash" && (e.data.dialog = "flash")
                }), t.contextMenu && t.contextMenu.addListener(function(e, t) {
                    if (e && e.is("img") && !e.isReadOnly() && e.data("cke-real-element-type") == "flash") return {
                        flash: 2
                    }
                })
            },
            afterInit: function(e) {
                var t = e.dataProcessor,
                    i = t && t.dataFilter;
                i && i.addRules({
                    elements: {
                        "cke:object": function(t) {
                            var i = t.attributes,
                                s = i.classid && String(i.classid).toLowerCase();
                            if (!s && !n(t)) {
                                for (var o = 0; o < t.children.length; o++) if (t.children[o].name == "cke:embed") return n(t.children[o]) ? r(e, t) : null;
                                return null
                            }
                            return r(e, t)
                        },
                        "cke:embed": function(t) {
                            return n(t) ? r(e, t) : null
                        }
                    }
                }, 5)
            },
            requires: ["fakeobjects"]
        })
    }(), i.extend(a, {
        flashEmbedTagOnly: !1,
        flashAddEmbedTag: !0,
        flashConvertOnEdit: !1
    }), function() {
        function t(t, n, r, i, s, o, u) {
            var a = t.config,
                f = s.split(";"),
                l = [],
                c = {};
            for (var h = 0; h < f.length; h++) {
                var p = f[h];
                if (p) {
                    p = p.split("/");
                    var d = {},
                        v = f[h] = p[0];
                    d[r] = l[h] = p[1] || v, c[v] = new e.style(u, d), c[v]._.definition.name = v
                } else f.splice(h--, 1)
            }
            t.ui.addRichCombo(n, {
                label: i.label,
                title: i.panelTitle,
                className: "cke_" + (r == "size" ? "fontSize" : "font"),
                panel: {
                    css: t.skin.editor.css.concat(a.contentsCss),
                    multiSelect: !1,
                    attributes: {
                        "aria-label": i.panelTitle
                    }
                },
                init: function() {
                    this.startGroup(i.panelTitle);
                    for (var e = 0; e < f.length; e++) {
                        var t = f[e];
                        this.add(t, c[t].buildPreview(), t)
                    }
                },
                onClick: function(e) {
                    t.focus(), t.fire("saveSnapshot");
                    var n = c[e];
                    this.getValue() == e ? n.remove(t.document) : n.apply(t.document), t.fire("saveSnapshot")
                },
                onRender: function() {
                    t.on("selectionChange", function(e) {
                        var t = this.getValue(),
                            n = e.data.path,
                            r = n.elements;
                        for (var i = 0, s; i < r.length; i++) {
                            s = r[i];
                            for (var u in c) if (c[u].checkElementMatch(s, !0)) {
                                u != t && this.setValue(u);
                                return
                            }
                        }
                        this.setValue("", o)
                    }, this)
                }
            })
        }
        f.add("font", {
            requires: ["richcombo", "styles"],
            init: function(e) {
                var n = e.config;
                t(e, "Font", "family", e.lang.font, n.font_names, n.font_defaultLabel, n.font_style), t(e, "FontSize", "size", e.lang.fontSize, n.fontSize_sizes, n.fontSize_defaultLabel, n.fontSize_style)
            }
        })
    }(), a.font_names = "Arial/Arial, Helvetica, sans-serif;Comic Sans MS/Comic Sans MS, cursive;Courier New/Courier New, Courier, monospace;Georgia/Georgia, serif;Lucida Sans Unicode/Lucida Sans Unicode, Lucida Grande, sans-serif;Tahoma/Tahoma, Geneva, sans-serif;Times New Roman/Times New Roman, Times, serif;Trebuchet MS/Trebuchet MS, Helvetica, sans-serif;Verdana/Verdana, Geneva, sans-serif", a.font_defaultLabel = "", a.font_style = {
        element: "span",
        styles: {
            "font-family": "#(family)"
        },
        overrides: [{
            element: "font",
            attributes: {
                face: null
            }
        }]
    }, a.fontSize_sizes = "8/8px;9/9px;10/10px;11/11px;12/12px;14/14px;16/16px;18/18px;20/20px;22/22px;24/24px;26/26px;28/28px;36/36px;48/48px;72/72px", a.fontSize_defaultLabel = "", a.fontSize_style = {
        element: "span",
        styles: {
            "font-size": "#(size)"
        },
        overrides: [{
            element: "font",
            attributes: {
                size: null
            }
        }]
    }, f.add("format", {
        requires: ["richcombo", "styles"],
        init: function(t) {
            var n = t.config,
                i = t.lang.format,
                s = n.format_tags.split(";"),
                o = {};
            for (var u = 0; u < s.length; u++) {
                var a = s[u];
                o[a] = new e.style(n["format_" + a]), o[a]._.enterMode = t.config.enterMode
            }
            t.ui.addRichCombo("Format", {
                label: i.label,
                title: i.panelTitle,
                className: "cke_format",
                panel: {
                    css: t.skin.editor.css.concat(n.contentsCss),
                    multiSelect: !1,
                    attributes: {
                        "aria-label": i.panelTitle
                    }
                },
                init: function() {
                    this.startGroup(i.panelTitle);
                    for (var e in o) {
                        var t = i["tag_" + e];
                        this.add(e, o[e].buildPreview(t), t)
                    }
                },
                onClick: function(e) {
                    t.focus(), t.fire("saveSnapshot");
                    var n = o[e],
                        i = new r.elementPath(t.getSelection().getStartElement());
                    n[n.checkActive(i) ? "remove" : "apply"](t.document), setTimeout(function() {
                        t.fire("saveSnapshot")
                    }, 0)
                },
                onRender: function() {
                    t.on("selectionChange", function(e) {
                        var n = this.getValue(),
                            r = e.data.path;
                        for (var i in o) if (o[i].checkActive(r)) {
                            i != n && this.setValue(i, t.lang.format["tag_" + i]);
                            return
                        }
                        this.setValue("")
                    }, this)
                }
            })
        }
    }), a.format_tags = "p;h1;h2;h3;h4;h5;h6;pre;address;div", a.format_p = {
        element: "p"
    }, a.format_div = {
        element: "div"
    }, a.format_pre = {
        element: "pre"
    }, a.format_address = {
        element: "address"
    }, a.format_h1 = {
        element: "h1"
    }, a.format_h2 = {
        element: "h2"
    }, a.format_h3 = {
        element: "h3"
    }, a.format_h4 = {
        element: "h4"
    }, a.format_h5 = {
        element: "h5"
    }, a.format_h6 = {
        element: "h6"
    }, f.add("forms", {
        requires: ["dialog"],
        init: function(t) {
            var n = t.lang;
            t.addCss("form{border: 1px dotted #FF0000;padding: 2px;}\n"), t.addCss("img.cke_hidden{background-image: url(" + e.getUrl(this.path + "images/hiddenfield.gif") + ");" + "background-position: center center;" + "background-repeat: no-repeat;" + "border: 1px solid #a9a9a9;" + "width: 16px !important;" + "height: 16px !important;" + "}");
            var r = function(r, i, s) {
                    t.addCommand(i, new e.dialogCommand(i)), t.ui.addButton(r, {
                        label: n.common[r.charAt(0).toLowerCase() + r.slice(1)],
                        command: i
                    }), e.dialog.add(i, s)
                },
                i = this.path + "dialogs/";
            r("Form", "form", i + "form.js"), r("Checkbox", "checkbox", i + "checkbox.js"), r("Radio", "radio", i + "radio.js"), r("TextField", "textfield", i + "textfield.js"), r("Textarea", "textarea", i + "textarea.js"), r("Select", "select", i + "select.js"), r("Button", "button", i + "button.js"), r("ImageButton", "imagebutton", f.getPath("image") + "dialogs/image.js"), r("HiddenField", "hiddenfield", i + "hiddenfield.js"), t.addMenuItems && t.addMenuItems({
                form: {
                    label: n.form.menu,
                    command: "form",
                    group: "form"
                },
                checkbox: {
                    label: n.checkboxAndRadio.checkboxTitle,
                    command: "checkbox",
                    group: "checkbox"
                },
                radio: {
                    label: n.checkboxAndRadio.radioTitle,
                    command: "radio",
                    group: "radio"
                },
                textfield: {
                    label: n.textfield.title,
                    command: "textfield",
                    group: "textfield"
                },
                hiddenfield: {
                    label: n.hidden.title,
                    command: "hiddenfield",
                    group: "hiddenfield"
                },
                imagebutton: {
                    label: n.image.titleButton,
                    command: "imagebutton",
                    group: "imagebutton"
                },
                button: {
                    label: n.button.title,
                    command: "button",
                    group: "button"
                },
                select: {
                    label: n.select.title,
                    command: "select",
                    group: "select"
                },
                textarea: {
                    label: n.textarea.title,
                    command: "textarea",
                    group: "textarea"
                }
            }), t.contextMenu && (t.contextMenu.addListener(function(e) {
                if (e && e.hasAscendant("form", !0) && !e.isReadOnly()) return {
                    form: 2
                }
            }), t.contextMenu.addListener(function(e) {
                if (e && !e.isReadOnly()) {
                    var t = e.getName();
                    if (t == "select") return {
                        select: 2
                    };
                    if (t == "textarea") return {
                        textarea: 2
                    };
                    if (t == "input") switch (e.getAttribute("type")) {
                    case "button":
                    case "submit":
                    case "reset":
                        return {
                            button: 2
                        };
                    case "checkbox":
                        return {
                            checkbox: 2
                        };
                    case "radio":
                        return {
                            radio: 2
                        };
                    case "image":
                        return {
                            imagebutton: 2
                        };
                    default:
                        return {
                            textfield: 2
                        }
                    }
                    if (t == "img" && e.data("cke-real-element-type") == "hiddenfield") return {
                        hiddenfield: 2
                    }
                }
            })), t.on("doubleclick", function(e) {
                var t = e.data.element;
                if (t.is("form")) e.data.dialog = "form";
                else if (t.is("select")) e.data.dialog = "select";
                else if (t.is("textarea")) e.data.dialog = "textarea";
                else if (t.is("img") && t.data("cke-real-element-type") == "hiddenfield") e.data.dialog = "hiddenfield";
                else if (t.is("input")) switch (t.getAttribute("type")) {
                case "button":
                case "submit":
                case "reset":
                    e.data.dialog = "button";
                    break;
                case "checkbox":
                    e.data.dialog = "checkbox";
                    break;
                case "radio":
                    e.data.dialog = "radio";
                    break;
                case "image":
                    e.data.dialog = "imagebutton";
                    break;
                default:
                    e.data.dialog = "textfield"
                }
            })
        },
        afterInit: function(e) {
            var t = e.dataProcessor,
                r = t && t.htmlFilter,
                i = t && t.dataFilter;
            n && r && r.addRules({
                elements: {
                    input: function(e) {
                        var t = e.attributes,
                            n = t.type;
                        n || (t.type = "text"), (n == "checkbox" || n == "radio") && t.value == "on" && delete t.value
                    }
                }
            }), i && i.addRules({
                elements: {
                    input: function(t) {
                        if (t.attributes.type == "hidden") return e.createFakeParserElement(t, "cke_hidden", "hiddenfield")
                    }
                }
            })
        },
        requires: ["image", "fakeobjects"]
    }), n && (u.prototype.hasAttribute = i.override(u.prototype.hasAttribute, function(e) {
        return function(t) {
            var n = this,
                r = n.$.attributes.getNamedItem(t);
            if (n.getName() == "input") switch (t) {
            case "class":
                return n.$.className.length > 0;
            case "checked":
                return !!n.$.checked;
            case "value":
                var i = n.getAttribute("type");
                return i == "checkbox" || i == "radio" ? n.$.value != "on" : n.$.value
            }
            return e.apply(n, arguments)
        }
    })), function() {
        var e = {
            canUndo: !1,
            exec: function(e) {
                var t = e.document.createElement("hr");
                e.insertElement(t)
            }
        },
            t = "horizontalrule";
        f.add(t, {
            init: function(n) {
                n.addCommand(t, e), n.ui.addButton("HorizontalRule", {
                    label: n.lang.horizontalrule,
                    command: t
                })
            }
        })
    }(), function() {
        function o(e) {
            var t = e.children.length,
                n = e.children[t - 1];
            while (n && n.type == 3 && !i.trim(n.value)) n = e.children[--t];
            return n
        }
        function l(e, r) {
            var i = e.children,
                s = o(e);
            s && ((r || !n) && s.type == 1 && s.name == "br" && i.pop(), s.type == 3 && t.test(s.value) && i.pop())
        }
        function c(e, t, r) {
            if (!t && (!r || typeof r == "function" && r(e) === !1)) return !1;
            if (t && n && (document.documentMode > 7 || e.name in s.tr || e.name in s.$listItem)) return !1;
            var i = o(e);
            return !i || i && (i.type == 1 && i.name == "br" || e.name == "form" && i.name == "input")
        }
        function p(t, r) {
            return function(i) {
                l(i, !t), c(i, !t, r) && (t || n ? i.add(new e.htmlParser.text("Â ")) : i.add(new e.htmlParser.element("br", {})))
            }
        }
        function E(e) {
            var t = e.attributes;
            t.contenteditable != "false" && (t["data-cke-editable"] = t.contenteditable ? "true" : 1), t.contenteditable = "false"
        }
        function S(e) {
            var t = e.attributes;
            switch (t["data-cke-editable"]) {
            case "true":
                t.contenteditable = "true";
                break;
            case "1":
                delete t.contenteditable
            }
        }
        function O(t) {
            return t.replace(x, function(t, n, r) {
                return "<" + n + r.replace(T, function(t, n) {
                    return !/^on/.test(n) && r.indexOf("data-cke-saved-" + n) == -1 ? " data-cke-saved-" + t + " data-cke-" + e.rnd + "-" + t : t
                }) + ">"
            })
        }
        function M(e) {
            return e.replace(N, function(e) {
                return "<cke:encoded>" + encodeURIComponent(e) + "</cke:encoded>"
            })
        }
        function _(e) {
            return e.replace(C, function(e, t) {
                return decodeURIComponent(t)
            })
        }
        function D(e) {
            return e.replace(k, "$1cke:$2")
        }
        function P(e) {
            return e.replace(L, "$1$2")
        }
        function H(e) {
            return e.replace(A, "<cke:$1$2></cke:$1>")
        }
        function B(e) {
            return e.replace(/(<pre\b[^>]*>)(\r\n|\n)/g, "$1$2$2")
        }
        function F(e) {
            return e.replace(/<!--(?!{cke_protected})[\s\S]+?-->/g, function(e) {
                return "<!--" + r + "{C}" + encodeURIComponent(e).replace(/--/g, "%2D%2D") + "-->"
            })
        }
        function I(e) {
            return e.replace(/<!--\{cke_protected\}\{C\}([\s\S]+?)-->/g, function(e, t) {
                return decodeURIComponent(t)
            })
        }
        function q(e, t) {
            var n = t._.dataStore;
            return e.replace(/<!--\{cke_protected\}([\s\S]+?)-->/g, function(e, t) {
                return decodeURIComponent(t)
            }).replace(/\{cke_protected_(\d+)\}/g, function(e, t) {
                return n && n[t] || ""
            })
        }
        function R(e, t) {
            var n = [],
                i = t.config.protectedSource,
                s = t._.dataStore || (t._.dataStore = {
                    id: 1
                }),
                o = /<\!--\{cke_temp(comment)?\}(\d*?)-->/g,
                u = [/<script[\s\S]*?<\/script>/gi, /<noscript[\s\S]*?<\/noscript>/gi].concat(i);
            e = e.replace(/<!--[\s\S]*?-->/g, function(e) {
                return "<!--{cke_tempcomment}" + (n.push(e) - 1) + "-->"
            });
            for (var a = 0; a < u.length; a++) e = e.replace(u[a], function(e) {
                return e = e.replace(o, function(e, t, r) {
                    return n[r]
                }), /cke_temp(comment)?/.test(e) ? e : "<!--{cke_temp}" + (n.push(e) - 1) + "-->"
            });
            return e = e.replace(o, function(e, t, i) {
                return "<!--" + r + (t ? "{C}" : "") + encodeURIComponent(n[i]).replace(/--/g, "%2D%2D") + "-->"
            }), e.replace(/(['"]).*?\1/g, function(e) {
                return e.replace(/<!--\{cke_protected\}([\s\S]+?)-->/g, function(e, t) {
                    return s[s.id] = decodeURIComponent(t), "{cke_protected_" + s.id+++"}"
                })
            })
        }
        var t = /^[\t\r\n ]*(?:&nbsp;|\xa0)$/,
            r = "{cke_protected}",
            d = s,
            v = ["caption", "colgroup", "col", "thead", "tfoot", "tbody"],
            m = i.extend({}, d.$block, d.$listItem, d.$tableContent);
        for (var g in m)"br" in d[g] || delete m[g];
        delete m.pre;
        var y = {
            elements: {},
            attributeNames: [
                [/^on/, "data-cke-pa-on"]
            ]
        },
            b = {
                elements: {}
            };
        for (g in m) b.elements[g] = p();
        var w = {
            elementNames: [
                [/^cke:/, ""],
                [/^\?xml:namespace$/, ""]
            ],
            attributeNames: [
                [/^data-cke-(saved|pa)-/, ""],
                [/^data-cke-.*/, ""],
                ["hidefocus", ""]
            ],
            elements: {
                $: function(e) {
                    var t = e.attributes;
                    if (t) {
                        if (t["data-cke-temp"]) return !1;
                        var n = ["name", "href", "src"],
                            r;
                        for (var i = 0; i < n.length; i++) r = "data-cke-saved-" + n[i], r in t && delete t[n[i]]
                    }
                    return e
                },
                table: function(e) {
                    var t = e.children;
                    t.sort(function(e, t) {
                        return e.type == 1 && t.type == e.type ? i.indexOf(v, e.name) > i.indexOf(v, t.name) ? 1 : -1 : 0
                    })
                },
                embed: function(e) {
                    var t = e.parent;
                    if (t && t.name == "object") {
                        var n = t.attributes.width,
                            r = t.attributes.height;
                        n && (e.attributes.width = n), r && (e.attributes.height = r)
                    }
                },
                param: function(e) {
                    return e.children = [], e.isEmpty = !0, e
                },
                a: function(e) {
                    if (!(e.children.length || e.attributes.name || e.attributes["data-cke-saved-name"])) return !1
                },
                span: function(e) {
                    e.attributes["class"] == "Apple-style-span" && delete e.name
                },
                pre: function(e) {
                    n && l(e)
                },
                html: function(e) {
                    delete e.attributes.contenteditable, delete e.attributes["class"]
                },
                body: function(e) {
                    delete e.attributes.spellcheck, delete e.attributes.contenteditable
                },
                style: function(e) {
                    var t = e.children[0];
                    t && t.value && (t.value = i.trim(t.value)), e.attributes.type || (e.attributes.type = "text/css")
                },
                title: function(e) {
                    var t = e.children[0];
                    t && (t.value = e.attributes["data-cke-title"] || "")
                }
            },
            attributes: {
                "class": function(e, t) {
                    return i.ltrim(e.replace(/(?:^|\s+)cke_[^\s]*/g, "")) || !1
                }
            }
        };
        n && (w.attributes.style = function(e, t) {
            return e.replace(/(^|;)([^\:]+)/g, function(e) {
                return e.toLowerCase()
            })
        });
        for (g in {
            input: 1,
            textarea: 1
        }) y.elements[g] = E, w.elements[g] = S;
        var x = /<(a|area|img|input)\b([^>]*)>/gi,
            T = /\b(on\w+|href|src|name)\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|(?:[^ "'>]+))/gi,
            N = /(?:<style(?=[ >])[^>]*>[\s\S]*<\/style>)|(?:<(:?link|meta|base)[^>]*>)/gi,
            C = /<cke:encoded>([^<]*)<\/cke:encoded>/gi,
            k = /(<\/?)((?:object|embed|param|html|body|head|title)[^>]*>)/gi,
            L = /(<\/?)cke:((?:html|body|head|title)[^>]*>)/gi,
            A = /<cke:(param|embed)([^>]*?)\/?>(?!\s*<\/cke:\1)/gi;
        f.add("htmldataprocessor", {
            requires: ["htmlwriter"],
            init: function(t) {
                var n = t.dataProcessor = new e.htmlDataProcessor(t);
                n.writer.forceSimpleAmpersand = t.config.forceSimpleAmpersand, n.dataFilter.addRules(y), n.dataFilter.addRules(b), n.htmlFilter.addRules(w);
                var r = {
                    elements: {}
                };
                for (g in m) r.elements[g] = p(!0, t.config.fillEmptyBlocks);
                n.htmlFilter.addRules(r)
            },
            onLoad: function() {
                !("fillEmptyBlocks" in a) && (a.fillEmptyBlocks = 1)
            }
        }), e.htmlDataProcessor = function(t) {
            var n = this;
            n.editor = t, n.writer = new e.htmlWriter, n.dataFilter = new e.htmlParser.filter, n.htmlFilter = new e.htmlParser.filter
        }, e.htmlDataProcessor.prototype = {
            toHtml: function(t, n) {
                t = R(t, this.editor), t = O(t), t = M(t), t = D(t), t = H(t), t = B(t);
                var r = new u("div");
                r.setHtml("a" + t), t = r.getHtml().substr(1), t = t.replace(new RegExp(" data-cke-" + e.rnd + "-", "ig"), " "), t = P(t), t = _(t), t = I(t);
                var i = e.htmlParser.fragment.fromHtml(t, n),
                    s = new e.htmlParser.basicWriter;
                return i.writeHtml(s, this.dataFilter), t = s.getHtml(!0), t = F(t), t
            },
            toDataFormat: function(t, n) {
                var r = this.writer,
                    i = e.htmlParser.fragment.fromHtml(t, n);
                r.reset(), i.writeHtml(r, this.htmlFilter);
                var s = r.getHtml(!0);
                return s = I(s), s = q(s, this.editor), s
            }
        }
    }(), function() {
        f.add("iframe", {
            requires: ["dialog", "fakeobjects"],
            init: function(t) {
                var n = "iframe",
                    r = t.lang.iframe;
                e.dialog.add(n, this.path + "dialogs/iframe.js"), t.addCommand(n, new e.dialogCommand(n)), t.addCss("img.cke_iframe{background-image: url(" + e.getUrl(this.path + "images/placeholder.png") + ");" + "background-position: center center;" + "background-repeat: no-repeat;" + "border: 1px solid #a9a9a9;" + "width: 80px;" + "height: 80px;" + "}"), t.ui.addButton("Iframe", {
                    label: r.toolbar,
                    command: n
                }), t.on("doubleclick", function(e) {
                    var t = e.data.element;
                    t.is("img") && t.data("cke-real-element-type") == "iframe" && (e.data.dialog = "iframe")
                }), t.addMenuItems && t.addMenuItems({
                    iframe: {
                        label: r.title,
                        command: "iframe",
                        group: "image"
                    }
                }), t.contextMenu && t.contextMenu.addListener(function(e, t) {
                    if (e && e.is("img") && e.data("cke-real-element-type") == "iframe") return {
                        iframe: 2
                    }
                })
            },
            afterInit: function(e) {
                var t = e.dataProcessor,
                    n = t && t.dataFilter;
                n && n.addRules({
                    elements: {
                        iframe: function(t) {
                            return e.createFakeParserElement(t, "cke_iframe", "iframe", !0)
                        }
                    }
                })
            }
        })
    }(), function() {
        function t(e, t) {
            if (!t) {
                var n = e.getSelection();
                t = n.getType() == 3 && n.getSelectedElement()
            }
            if (t && t.is("img") && !t.data("cke-realelement") && !t.isReadOnly()) return t
        }
        function n(e) {
            var t = e.getStyle("float");
            if (t == "inherit" || t == "none") t = 0;
            return t || (t = e.getAttribute("align")), t
        }
        f.add("image", {
            requires: ["dialog"],
            init: function(n) {
                var r = "image";
                e.dialog.add(r, this.path + "dialogs/image.js"), n.addCommand(r, new e.dialogCommand(r)), n.ui.addButton("Image", {
                    label: n.lang.common.image,
                    command: r
                }), n.on("doubleclick", function(e) {
                    var t = e.data.element;
                    t.is("img") && !t.data("cke-realelement") && !t.isReadOnly() && (e.data.dialog = "image")
                }), n.addMenuItems && n.addMenuItems({
                    image: {
                        label: n.lang.image.menu,
                        command: "image",
                        group: "image"
                    }
                }), n.contextMenu && n.contextMenu.addListener(function(e, r) {
                    if (t(n, e)) return {
                        image: 2
                    }
                })
            },
            afterInit: function(e) {
                function r(r) {
                    var i = e.getCommand("justify" + r);
                    i && ((r == "left" || r == "right") && i.on("exec", function(i) {
                        var s = t(e),
                            o;
                        s && (o = n(s), o == r ? (s.removeStyle("float"), r == n(s) && s.removeAttribute("align")) : s.setStyle("float", r), i.cancel())
                    }), i.on("refresh", function(i) {
                        var s = t(e),
                            o;
                        s && (o = n(s), this.setState(o == r ? 1 : r == "right" || r == "left" ? 2 : 0), i.cancel())
                    }))
                }
                r("left"), r("right"), r("center"), r("block")
            }
        })
    }(), a.image_removeLinkByEmptyURL = !0, function() {
        function a(t) {
            var n = this;
            if (t.editor.readOnly) return null;
            var r = t.editor,
                i = t.data.path,
                s = i && i.contains(e),
                o = i.block || i.blockLimit;
            if (s) return n.setState(2);
            if (!n.useIndentClasses && n.name == "indent") return n.setState(2);
            if (!o) return n.setState(0);
            if (n.useIndentClasses) {
                var u = o.$.className.match(n.classNameRegex),
                    a = 0;
                return u && (u = u[1], a = n.indentClassMap[u]), n.name == "outdent" && !a || n.name == "indent" && a == r.config.indentClasses.length ? n.setState(0) : n.setState(2)
            }
            var f = parseInt(o.getStyle(c(o)), 10);
            return isNaN(f) && (f = 0), f <= 0 ? n.setState(0) : n.setState(2)
        }
        function l(e, t) {
            var n = this;
            n.name = t, n.useIndentClasses = e.config.indentClasses && e.config.indentClasses.length > 0;
            if (n.useIndentClasses) {
                n.classNameRegex = new RegExp("(?:^|\\s+)(" + e.config.indentClasses.join("|") + ")(?=$|\\s)"), n.indentClassMap = {};
                for (var r = 0; r < e.config.indentClasses.length; r++) n.indentClassMap[e.config.indentClasses[r]] = r + 1
            }
            n.startDisabled = t == "outdent"
        }
        function c(e, t) {
            return (t || e.getComputedStyle("direction")) == "ltr" ? "margin-left" : "margin-right"
        }
        function p(e) {
            return e.type == 1 && e.is("li")
        }
        var e = {
            ol: 1,
            ul: 1
        },
            s = r.walker.whitespaces(!0),
            o = r.walker.bookmark(!1, !0);
        l.prototype = {
            exec: function(t) {
                function v(r) {
                    var i = S.startContainer,
                        c = S.endContainer;
                    while (i && !i.getParent().equals(r)) i = i.getParent();
                    while (c && !c.getParent().equals(r)) c = c.getParent();
                    if (!i || !c) return;
                    var p = i,
                        d = [],
                        v = !1;
                    while (!v) p.equals(c) && (v = !0), d.push(p), p = p.getNext();
                    if (d.length < 1) return;
                    var g = r.getParents(!0);
                    for (var y = 0; y < g.length; y++) if (g[y].getName && e[g[y].getName()]) {
                        r = g[y];
                        break
                    }
                    var b = a.name == "indent" ? 1 : -1,
                        w = d[0],
                        E = d[d.length - 1],
                        x = f.list.listToArray(r, l),
                        T = x[E.getCustomData("listarray_index")].indent;
                    for (y = w.getCustomData("listarray_index"); y <= E.getCustomData("listarray_index"); y++) {
                        x[y].indent += b;
                        if (b > 0) {
                            var N = x[y].parent;
                            x[y].parent = new u(N.getName(), N.getDocument())
                        }
                    }
                    for (y = E.getCustomData("listarray_index") + 1; y < x.length && x[y].indent > T; y++) x[y].indent += b;
                    var C = f.list.arrayToList(x, l, null, t.config.enterMode, r.getDirection());
                    if (a.name == "outdent") {
                        var k;
                        if ((k = r.getParent()) && k.is("li")) {
                            var L = C.listNode.getChildren(),
                                A = [],
                                O = L.count(),
                                M;
                            for (y = O - 1; y >= 0; y--)(M = L.getItem(y)) && M.is && M.is("li") && A.push(M)
                        }
                    }
                    C && C.listNode.replace(r);
                    if (A && A.length) for (y = 0; y < A.length; y++) {
                        var _ = A[y],
                            D = _;
                        while ((D = D.getNext()) && D.is && D.getName() in e) n && !_.getFirst(function(e) {
                            return s(e) && o(e)
                        }) && _.append(S.document.createText("Â ")), _.append(D);
                        _.insertAfter(k)
                    }
                }
                function g() {
                    var e = S.createIterator(),
                        n = t.config.enterMode;
                    e.enforceRealBlocks = !0, e.enlargeBr = n != 2;
                    var r;
                    while (r = e.getNextParagraph(n == 1 ? "p" : "div")) y(r)
                }
                function y(e, n) {
                    if (e.getCustomData("indent_processed")) return !1;
                    if (a.useIndentClasses) {
                        var r = e.$.className.match(a.classNameRegex),
                            s = 0;
                        r && (r = r[1], s = a.indentClassMap[r]), a.name == "outdent" ? s-- : s++;
                        if (s < 0) return !1;
                        s = Math.min(s, t.config.indentClasses.length), s = Math.max(s, 0), e.$.className = i.ltrim(e.$.className.replace(a.classNameRegex, "")), s > 0 && e.addClass(t.config.indentClasses[s - 1])
                    } else {
                        var o = c(e, n),
                            f = parseInt(e.getStyle(o), 10);
                        isNaN(f) && (f = 0);
                        var p = t.config.indentOffset || 40;
                        f += (a.name == "indent" ? 1 : -1) * p;
                        if (f < 0) return !1;
                        f = Math.max(f, 0), f = Math.ceil(f / p) * p, e.setStyle(o, f ? f + (t.config.indentUnit || "px") : ""), e.getAttribute("style") === "" && e.removeAttribute("style")
                    }
                    return u.setMarker(l, e, "indent_processed", 1), !0
                }
                var a = this,
                    l = {},
                    b = t.getSelection(),
                    w = b.createBookmarks(1),
                    E = b && b.getRanges(1),
                    S, x = E.createIterator();
                while (S = x.getNextRange()) {
                    var T = S.getCommonAncestor(),
                        N = T;
                    while (N && (N.type != 1 || !e[N.getName()])) N = N.getParent();
                    if (!N) {
                        var C = S.getEnclosedNode();
                        C && C.type == 1 && C.getName() in e && (S.setStartAt(C, 1), S.setEndAt(C, 2), N = C)
                    }
                    if (N && S.startContainer.type == 1 && S.startContainer.getName() in e) {
                        var k = new r.walker(S);
                        k.evaluator = p, S.startContainer = k.next()
                    }
                    N && S.endContainer.type == 1 && S.endContainer.getName() in e && (k = new r.walker(S), k.evaluator = p, S.endContainer = k.previous());
                    if (N) {
                        var L = N.getFirst(p),
                            A = !! L.getNext(p),
                            O = S.startContainer,
                            M = L.equals(O) || L.contains(O);
                        (!M || a.name != "indent" && !a.useIndentClasses && !parseInt(N.getStyle(c(N)), 10) || !y(N, !A && L.getDirection())) && v(N)
                    } else g()
                }
                u.clearAllMarkers(l), t.forceNextSelectionCheck(), b.selectBookmarks(w)
            }
        }, f.add("indent", {
            init: function(e) {
                var n = e.addCommand("indent", new l(e, "indent")),
                    s = e.addCommand("outdent", new l(e, "outdent"));
                e.ui.addButton("Indent", {
                    label: e.lang.indent,
                    command: "indent"
                }), e.ui.addButton("Outdent", {
                    label: e.lang.outdent,
                    command: "outdent"
                }), e.on("selectionChange", i.bind(a, n)), e.on("selectionChange", i.bind(a, s)), (t.ie6Compat || t.ie7Compat) && e.addCss("ul,ol{	margin-left: 0px;	padding-left: 40px;}"), e.on("dirChanged", function(t) {
                    var n = new r.range(e.document);
                    n.setStartBefore(t.data.node), n.setEndAfter(t.data.node);
                    var i = new r.walker(n),
                        s;
                    while (s = i.next()) if (s.type == 1) {
                        if (!s.equals(t.data.node) && s.getDirection()) {
                            n.setStartAfter(s), i = new r.walker(n);
                            continue
                        }
                        var o = e.config.indentClasses;
                        if (o) {
                            var u = t.data.dir == "ltr" ? ["_rtl", ""] : ["", "_rtl"];
                            for (var a = 0; a < o.length; a++) s.hasClass(o[a] + u[0]) && (s.removeClass(o[a] + u[0]), s.addClass(o[a] + u[1]))
                        }
                        var f = s.getStyle("margin-right"),
                            l = s.getStyle("margin-left");
                        f ? s.setStyle("margin-left", f) : s.removeStyle("margin-left"), l ? s.setStyle("margin-right", l) : s.removeStyle("margin-right")
                    }
                })
            },
            requires: ["domiterator", "list"]
        })
    }(), function() {
        function e(e, t) {
            t = t === undefined || t;
            var n;
            if (t) n = e.getComputedStyle("text-align");
            else {
                while (!e.hasAttribute || !e.hasAttribute("align") && !e.getStyle("text-align")) {
                    var r = e.getParent();
                    if (!r) break;
                    e = r
                }
                n = e.getStyle("text-align") || e.getAttribute("align") || ""
            }
            return n && (n = n.replace(/(?:-(?:moz|webkit)-)?(?:start|auto)/i, "")), !n && t && (n = e.getComputedStyle("direction") == "rtl" ? "right" : "left"), n
        }
        function t(e) {
            if (e.editor.readOnly) return;
            e.editor.getCommand(this.name).refresh(e.data.path)
        }
        function n(e, t, n) {
            var r = this;
            r.editor = e, r.name = t, r.value = n;
            var i = e.config.justifyClasses;
            if (i) {
                switch (n) {
                case "left":
                    r.cssClassName = i[0];
                    break;
                case "center":
                    r.cssClassName = i[1];
                    break;
                case "right":
                    r.cssClassName = i[2];
                    break;
                case "justify":
                    r.cssClassName = i[3]
                }
                r.cssClassRegex = new RegExp("(?:^|\\s+)(?:" + i.join("|") + ")(?=$|\\s)")
            }
        }
        function s(e) {
            var t = e.editor,
                n = new r.range(t.document);
            n.setStartBefore(e.data.node), n.setEndAfter(e.data.node);
            var i = new r.walker(n),
                s;
            while (s = i.next()) if (s.type == 1) {
                if (!s.equals(e.data.node) && s.getDirection()) {
                    n.setStartAfter(s), i = new r.walker(n);
                    continue
                }
                var o = t.config.justifyClasses;
                o && (s.hasClass(o[0]) ? (s.removeClass(o[0]), s.addClass(o[2])) : s.hasClass(o[2]) && (s.removeClass(o[2]), s.addClass(o[0])));
                var u = "text-align",
                    a = s.getStyle(u);
                a == "left" ? s.setStyle(u, "right") : a == "right" && s.setStyle(u, "left")
            }
        }
        n.prototype = {
            exec: function(t) {
                var n = this,
                    r = t.getSelection(),
                    s = t.config.enterMode;
                if (!r) return;
                var o = r.createBookmarks(),
                    u = r.getRanges(!0),
                    a = n.cssClassName,
                    f, l, c = t.config.useComputedState;
                c = c === undefined || c;
                for (var h = u.length - 1; h >= 0; h--) {
                    f = u[h].createIterator(), f.enlargeBr = s != 2;
                    while (l = f.getNextParagraph(s == 1 ? "p" : "div")) {
                        l.removeAttribute("align"), l.removeStyle("text-align");
                        var p = a && (l.$.className = i.ltrim(l.$.className.replace(n.cssClassRegex, ""))),
                            d = n.state == 2 && (!c || e(l, true) != n.value);
                        a ? d ? l.addClass(a) : p || l.removeAttribute("class") : d && l.setStyle("text-align", n.value)
                    }
                }
                t.focus(), t.forceNextSelectionCheck(), r.selectBookmarks(o)
            },
            refresh: function(t) {
                var n = t.block || t.blockLimit;
                this.setState(n.getName() != "body" && e(n, this.editor.config.useComputedState) == this.value ? 1 : 2)
            }
        }, f.add("justify", {
            init: function(e) {
                var r = new n(e, "justifyleft", "left"),
                    o = new n(e, "justifycenter", "center"),
                    u = new n(e, "justifyright", "right"),
                    a = new n(e, "justifyblock", "justify");
                e.addCommand("justifyleft", r), e.addCommand("justifycenter", o), e.addCommand("justifyright", u), e.addCommand("justifyblock", a), e.ui.addButton("JustifyLeft", {
                    label: e.lang.justify.left,
                    command: "justifyleft"
                }), e.ui.addButton("JustifyCenter", {
                    label: e.lang.justify.center,
                    command: "justifycenter"
                }), e.ui.addButton("JustifyRight", {
                    label: e.lang.justify.right,
                    command: "justifyright"
                }), e.ui.addButton("JustifyBlock", {
                    label: e.lang.justify.block,
                    command: "justifyblock"
                }), e.on("selectionChange", i.bind(t, r)), e.on("selectionChange", i.bind(t, u)), e.on("selectionChange", i.bind(t, o)), e.on("selectionChange", i.bind(t, a)), e.on("dirChanged", s)
            },
            requires: ["domiterator"]
        })
    }(), f.add("keystrokes", {
        beforeInit: function(t) {
            t.keystrokeHandler = new e.keystrokeHandler(t), t.specialKeys = {}
        },
        init: function(e) {
            var t = e.config.keystrokes,
                n = e.config.blockedKeystrokes,
                r = e.keystrokeHandler.keystrokes,
                i = e.keystrokeHandler.blockedKeystrokes;
            for (var s = 0; s < t.length; s++) r[t[s][0]] = t[s][1];
            for (s = 0; s < n.length; s++) i[n[s]] = 1
        }
    }), e.keystrokeHandler = function(e) {
        var t = this;
        return e.keystrokeHandler ? e.keystrokeHandler : (t.keystrokes = {}, t.blockedKeystrokes = {}, t._ = {
            editor: e
        }, t)
    }, function() {
        var n, r = function(e) {
                e = e.data;
                var t = e.getKeystroke(),
                    r = this.keystrokes[t],
                    i = this._.editor;
                n = i.fire("key", {
                    keyCode: t
                }) === !0;
                if (!n) {
                    if (r) {
                        var s = {
                            from: "keystrokeHandler"
                        };
                        n = i.execCommand(r, s) !== !1
                    }
                    if (!n) {
                        var o = i.specialKeys[t];
                        n = o && o(i) === !0, n || (n = !! this.blockedKeystrokes[t])
                    }
                }
                return n && e.preventDefault(!0), !n
            },
            i = function(e) {
                n && (n = !1, e.data.preventDefault(!0))
            };
        e.keystrokeHandler.prototype = {
            attach: function(e) {
                e.on("keydown", r, this), (t.opera || t.gecko && t.mac) && e.on("keypress", i, this)
            }
        }
    }(), a.blockedKeystrokes = [1114178, 1114185, 1114197], a.keystrokes = [
        [4456569, "toolbarFocus"],
        [4456570, "elementsPathFocus"],
        [2228345, "contextMenu"],
        [3342457, "contextMenu"],
        [1114202, "undo"],
        [1114201, "redo"],
        [3342426, "redo"],
        [1114188, "link"],
        [1114178, "bold"],
        [1114185, "italic"],
        [1114197, "underline"],
        [4456448 + (n || t.webkit ? 189 : 109), "toolbarCollapse"],
        [4456496, "a11yHelp"]
    ], f.add("link", {
        requires: ["fakeobjects", "dialog"],
        init: function(r) {
            r.addCommand("link", new e.dialogCommand("link")), r.addCommand("anchor", new e.dialogCommand("anchor")), r.addCommand("unlink", new e.unlinkCommand), r.addCommand("removeAnchor", new e.removeAnchorCommand), r.ui.addButton("Link", {
                label: r.lang.link.toolbar,
                command: "link"
            }), r.ui.addButton("Unlink", {
                label: r.lang.unlink,
                command: "unlink"
            }), r.ui.addButton("Anchor", {
                label: r.lang.anchor.toolbar,
                command: "anchor"
            }), e.dialog.add("link", this.path + "dialogs/link.js"), e.dialog.add("anchor", this.path + "dialogs/anchor.js");
            var i = r.lang.dir == "rtl" ? "right" : "left",
                s = "background:url(" + e.getUrl(this.path + "images/anchor.gif") + ") no-repeat " + i + " center;" + "border:1px dotted #00f;";
            r.addCss("a.cke_anchor,a.cke_anchor_empty" + (n && t.version < 7 ? "" : ",a[name],a[data-cke-saved-name]") + "{" + s + "padding-" + i + ":18px;" + "cursor:auto;" + "}" + (n ? "a.cke_anchor_empty{display:inline-block;}" : "") + "img.cke_anchor" + "{" + s + "width:16px;" + "min-height:15px;" + "height:1.15em;" + "vertical-align:" + (t.opera ? "middle" : "text-bottom") + ";" + "}"), r.on("selectionChange", function(e) {
                if (r.readOnly) return;
                var t = r.getCommand("unlink"),
                    n = e.data.path.lastElement && e.data.path.lastElement.getAscendant("a", !0);
                n && n.getName() == "a" && n.getAttribute("href") && n.getChildCount() ? t.setState(2) : t.setState(0)
            }), r.on("doubleclick", function(e) {
                var t = f.link.getSelectedLink(r) || e.data.element;
                t.isReadOnly() || (t.is("a") ? (e.data.dialog = t.getAttribute("name") && (!t.getAttribute("href") || !t.getChildCount()) ? "anchor" : "link", r.getSelection().selectElement(t)) : f.link.tryRestoreFakeAnchor(r, t) && (e.data.dialog = "anchor"))
            }), r.addMenuItems && r.addMenuItems({
                anchor: {
                    label: r.lang.anchor.menu,
                    command: "anchor",
                    group: "anchor",
                    order: 1
                },
                removeAnchor: {
                    label: r.lang.anchor.remove,
                    command: "removeAnchor",
                    group: "anchor",
                    order: 5
                },
                link: {
                    label: r.lang.link.menu,
                    command: "link",
                    group: "link",
                    order: 1
                },
                unlink: {
                    label: r.lang.unlink,
                    command: "unlink",
                    group: "link",
                    order: 5
                }
            }), r.contextMenu && r.contextMenu.addListener(function(e, t) {
                if (!e || e.isReadOnly()) return null;
                var n = f.link.tryRestoreFakeAnchor(r, e);
                if (!n && !(n = f.link.getSelectedLink(r))) return null;
                var i = {};
                return n.getAttribute("href") && n.getChildCount() && (i = {
                    link: 2,
                    unlink: 2
                }), n && n.hasAttribute("name") && (i.anchor = i.removeAnchor = 2), i
            })
        },
        afterInit: function(e) {
            var t = e.dataProcessor,
                n = t && t.dataFilter,
                r = t && t.htmlFilter,
                i = e._.elementsPath && e._.elementsPath.filters;
            n && n.addRules({
                elements: {
                    a: function(t) {
                        var n = t.attributes;
                        if (!n.name) return null;
                        var r = !t.children.length;
                        if (f.link.synAnchorSelector) {
                            var i = r ? "cke_anchor_empty" : "cke_anchor",
                                s = n["class"];
                            n.name && (!s || s.indexOf(i) < 0) && (n["class"] = (s || "") + " " + i), r && f.link.emptyAnchorFix && (n.contenteditable = "false", n["data-cke-editable"] = 1)
                        } else if (f.link.fakeAnchor && r) return e.createFakeParserElement(t, "cke_anchor", "anchor");
                        return null
                    }
                }
            }), f.link.emptyAnchorFix && r && r.addRules({
                elements: {
                    a: function(e) {
                        delete e.attributes.contenteditable
                    }
                }
            }), i && i.push(function(t, n) {
                if (n == "a") if (f.link.tryRestoreFakeAnchor(e, t) || t.getAttribute("name") && (!t.getAttribute("href") || !t.getChildCount())) return "anchor"
            })
        }
    }), f.link = {
        getSelectedLink: function(e) {
            try {
                var t = e.getSelection();
                if (t.getType() == 3) {
                    var n = t.getSelectedElement();
                    if (n.is("a")) return n
                }
                var r = t.getRanges(!0)[0];
                r.shrink(2);
                var i = r.getCommonAncestor();
                return i.getAscendant("a", !0)
            } catch (s) {
                return null
            }
        },
        fakeAnchor: t.opera || t.webkit,
        synAnchorSelector: n,
        emptyAnchorFix: n && t.version < 8,
        tryRestoreFakeAnchor: function(e, t) {
            if (t && t.data("cke-real-element-type") && t.data("cke-real-element-type") == "anchor") {
                var n = e.restoreRealElement(t);
                if (n.data("cke-saved-name")) return n
            }
        }
    }, e.unlinkCommand = function() {}, e.unlinkCommand.prototype = {
        exec: function(e) {
            var t = e.getSelection(),
                n = t.createBookmarks(),
                r = t.getRanges(),
                i, s;
            for (var o = 0; o < r.length; o++) {
                i = r[o].getCommonAncestor(!0), s = i.getAscendant("a", !0);
                if (!s) continue;
                r[o].selectNodeContents(s)
            }
            t.selectRanges(r), e.document.$.execCommand("unlink", !1, null), t.selectBookmarks(n)
        },
        startDisabled: !0
    }, e.removeAnchorCommand = function() {}, e.removeAnchorCommand.prototype = {
        exec: function(e) {
            var t = e.getSelection(),
                n = t.createBookmarks(),
                r;
            if (t && (r = t.getSelectedElement()) && (f.link.fakeAnchor && !r.getChildCount() ? f.link.tryRestoreFakeAnchor(e, r) : r.is("a"))) r.remove(1);
            else if (r = f.link.getSelectedLink(e)) r.hasAttribute("href") ? (r.removeAttributes({
                name: 1,
                "data-cke-saved-name": 1
            }), r.removeClass("cke_anchor")) : r.remove(1);
            t.selectBookmarks(n)
        }
    }, i.extend(a, {
        linkShowAdvancedTab: !0,
        linkShowTargetTab: !0
    }), function() {
        function v(e) {
            var t, n, r;
            if (t = e.getDirection()) {
                n = e.getParent();
                while (n && !(r = n.getDirection())) n = n.getParent();
                t == r && e.removeAttribute("dir")
            }
        }
        function m(e, t) {
            var n = e.getAttribute("style");
            n && t.setAttribute("style", n.replace(/([^;])$/, "$1;") + (t.getAttribute("style") || ""))
        }
        function g(e) {
            if (e.editor.readOnly) return null;
            var n = e.data.path,
                r = n.blockLimit,
                i = n.elements,
                s, o;
            for (o = 0; o < i.length && (s = i[o]) && !s.equals(r); o++) if (t[i[o].getName()]) return this.setState(this.type == i[o].getName() ? 1 : 2);
            return this.setState(2)
        }
        function y(e, t, n, r) {
            var i = f.list.listToArray(t.root, n),
                s = [];
            for (var o = 0; o < t.contents.length; o++) {
                var a = t.contents[o];
                a = a.getAscendant("li", !0);
                if (!a || a.getCustomData("list_item_processed")) continue;
                s.push(a), u.setMarker(n, a, "list_item_processed", !0)
            }
            var l = t.root,
                c = l.getDocument(),
                p, d;
            for (o = 0; o < s.length; o++) {
                var v = s[o].getCustomData("listarray_index");
                p = i[v].parent, p.is(this.type) || (d = c.createElement(this.type), p.copyAttributes(d, {
                    start: 1,
                    type: 1
                }), d.removeStyle("list-style-type"), i[v].parent = d)
            }
            var m = f.list.arrayToList(i, n, null, e.config.enterMode),
                g, y = m.listNode.getChildCount();
            for (o = 0; o < y && (g = m.listNode.getChild(o)); o++) g.getName() == this.type && r.push(g);
            m.listNode.replace(t.root)
        }
        function w(e, t, n) {
            var r = t.contents,
                i = t.root.getDocument(),
                s = [];
            if (r.length == 1 && r[0].equals(t.root)) {
                var o = i.createElement("div");
                r[0].moveChildren && r[0].moveChildren(o), r[0].append(o), r[0] = o
            }
            var u = t.contents[0].getParent();
            for (var a = 0; a < r.length; a++) u = u.getCommonAncestor(r[a].getParent());
            var f = e.config.useComputedState,
                l, c;
            f = f === undefined || f;
            for (a = 0; a < r.length; a++) {
                var h = r[a],
                    p;
                while (p = h.getParent()) {
                    if (p.equals(u)) {
                        s.push(h), !c && h.getDirection() && (c = 1);
                        var d = h.getDirection(f);
                        l !== null && (l && l != d ? l = null : l = d);
                        break
                    }
                    h = p
                }
            }
            if (s.length < 1) return;
            var v = s[s.length - 1].getNext(),
                m = i.createElement(this.type);
            n.push(m);
            var g, y;
            while (s.length) g = s.shift(), y = i.createElement("li"), g.is("pre") || b.test(g.getName()) ? g.appendTo(y) : (g.copyAttributes(y), l && g.getDirection() && (y.removeStyle("direction"), y.removeAttribute("dir")), g.moveChildren(y), g.remove()), y.appendTo(m);
            l && c && m.setAttribute("dir", l), v ? m.insertBefore(v) : m.appendTo(u)
        }
        function E(e, t, n) {
            function w(n) {
                (y = g[n ? "getFirst" : "getLast"]()) && (!y.is || !y.isBlockBoundary()) && (b = t.root[n ? "getPrevious" : "getNext"](r.walker.whitespaces(!0))) && (!b.is || !b.isBlockBoundary({
                    br: 1
                })) && e.document.createElement("br")[n ? "insertBefore" : "insertAfter"](y)
            }
            var i = f.list.listToArray(t.root, n),
                s = [];
            for (var o = 0; o < t.contents.length; o++) {
                var a = t.contents[o];
                a = a.getAscendant("li", !0);
                if (!a || a.getCustomData("list_item_processed")) continue;
                s.push(a), u.setMarker(n, a, "list_item_processed", !0)
            }
            var l = null;
            for (o = 0; o < s.length; o++) {
                var c = s[o].getCustomData("listarray_index");
                i[c].indent = -1, l = c
            }
            for (o = l + 1; o < i.length; o++) if (i[o].indent > i[o - 1].indent + 1) {
                var p = i[o - 1].indent + 1 - i[o].indent,
                    v = i[o].indent;
                while (i[o] && i[o].indent >= v) i[o].indent += p, o++;
                o--
            }
            var m = f.list.arrayToList(i, n, null, e.config.enterMode, t.root.getAttribute("dir")),
                g = m.listNode,
                y, b;
            w(!0), w(), g.replace(t.root)
        }
        function S(e, t) {
            this.name = e, this.type = t
        }
        function T(e, t, n, r) {
            var i, s;
            while (i = e[r ? "getLast" : "getFirst"](x))(s = i.getDirection(1)) !== t.getDirection(1) && i.setAttribute("dir", s), i.remove(), n ? i[r ? "insertBefore" : "insertAfter"](n) : t.append(i, r)
        }
        function N(e) {
            var t;
            (t = function(t) {
                var n = e[t ? "getPrevious" : "getNext"](c);
                n && n.type == 1 && n.is(e.getName()) && (T(e, n, null, !t), e.remove(), e = n)
            })(), t(1)
        }
        function L(e, t) {
            var n, r = e.children,
                i = r.length;
            for (var s = 0; s < i; s++) {
                n = r[s];
                if (n.name && n.name in t) return s
            }
            return i
        }
        function A(t) {
            return function(r) {
                var i = r.children,
                    s = L(r, C.$list),
                    o = i[s],
                    u = o && o.previous,
                    a;
                if (u && (u.name && u.name == "br" || u.value && (a = u.value.match(k)))) {
                    var f = u;
                    (!a || !a.index) && f == i[0] ? i[0] = t || n ? new e.htmlParser.text("Â ") : new e.htmlParser.element("br", {}) : f.name == "br" ? i.splice(s - 1, 1) : f.value = f.value.replace(k, "")
                }
            }
        }
        function D(e) {
            return e.type == 1 && (e.getName() in s.$block || e.getName() in s.$listItem) && s[e.getName()]["#"]
        }
        function P(e, t, n) {
            e.fire("saveSnapshot"), n.enlarge(3);
            var i = n.extractContents();
            t.trim(!1, !0);
            var o = t.createBookmark(),
                u = new r.elementPath(t.startContainer),
                a = u.lastElement.getAscendant("li", 1),
                f = u.block.getBogus();
            f && f.remove();
            var l = i.getLast();
            l && l.type == 1 && l.is("br") && l.remove();
            var h = t.startContainer.getChild(t.startOffset);
            h ? i.insertBefore(h) : t.startContainer.append(i);
            var v = new r.elementPath(n.startContainer),
                m = n.startContainer.getAscendant("li", 1);
            if (m) {
                var g = H(m);
                g && (a.contains(m) ? (T(g, m.getParent(), m), g.remove()) : a.append(g))
            }
            while (n.checkStartOfBlock() && n.checkEndOfBlock()) {
                v = new r.elementPath(n.startContainer);
                var y = v.block,
                    b;
                y.is("li") && (b = y.getParent(), y.equals(b.getLast(c)) && y.equals(b.getFirst(c)) && (y = b)), n.moveToPosition(y, 3), y.remove()
            }
            var w = n.clone(),
                E = e.document.getBody();
            w.setEndAt(E, 2);
            var S = new r.walker(w);
            S.evaluator = function(e) {
                return c(e) && !p(e)
            };
            var x = S.next();
            x && x.type == 1 && x.getName() in s.$list && N(x), t.moveToBookmark(o), t.select(), e.selectionChange(1), e.fire("saveSnapshot")
        }
        function H(e) {
            var n = e.getLast(c);
            return n && n.type == 1 && n.getName() in t ? n : null
        }
        var t = {
            ol: 1,
            ul: 1
        },
            o = /^[\n\r\t ]*$/,
            a = r.walker.whitespaces(),
            l = r.walker.bookmark(),
            c = function(e) {
                return !a(e) && !l(e)
            },
            p = r.walker.bogus();
        f.list = {
            listToArray: function(e, n, r, i, o) {
                if (!t[e.getName()]) return [];
                i || (i = 0), r || (r = []);
                for (var a = 0, l = e.getChildCount(); a < l; a++) {
                    var c = e.getChild(a);
                    c.type == 1 && c.getName() in s.$list && f.list.listToArray(c, n, r, i + 1);
                    if (c.$.nodeName.toLowerCase() != "li") continue;
                    var p = {
                        parent: e,
                        indent: i,
                        element: c,
                        contents: []
                    };
                    o ? p.grandparent = o : (p.grandparent = e.getParent(), p.grandparent && p.grandparent.$.nodeName.toLowerCase() == "li" && (p.grandparent = p.grandparent.getParent())), n && u.setMarker(n, c, "listarray_index", r.length), r.push(p);
                    for (var d = 0, v = c.getChildCount(), m; d < v; d++) m = c.getChild(d), m.type == 1 && t[m.getName()] ? f.list.listToArray(m, n, r, i + 1, p.grandparent) : p.contents.push(m)
                }
                return r
            },
            arrayToList: function(e, i, o, a, l) {
                o || (o = 0);
                if (!e || e.length < o + 1) return null;
                var p, g = e[o].parent.getDocument(),
                    y = new r.documentFragment(g),
                    b = null,
                    w = o,
                    E = Math.max(e[o].indent, 0),
                    S = null,
                    x, T, N = a == 1 ? "p" : "div";
                for (;;) {
                    var C = e[w],
                        k = C.grandparent;
                    x = C.element.getDirection(1);
                    if (C.indent == E) {
                        if (!b || e[w].parent.getName() != b.getName()) b = e[w].parent.clone(!1, 1), l && b.setAttribute("dir", l), y.append(b);
                        S = b.append(C.element.clone(0, 1)), x != b.getDirection(1) && S.setAttribute("dir", x);
                        for (p = 0; p < C.contents.length; p++) S.append(C.contents[p].clone(1, 1));
                        w++
                    } else if (C.indent == Math.max(E, 0) + 1) {
                        var L = e[w - 1].element.getDirection(1),
                            A = f.list.arrayToList(e, null, w, a, L != x ? x : null);
                        !S.getChildCount() && n && !(g.$.documentMode > 7) && S.append(g.createText("Â ")), S.append(A.listNode), w = A.nextIndex
                    } else {
                        if (C.indent != -1 || !! o || !k) return null;
                        t[k.getName()] ? (S = C.element.clone(!1, !0), x != k.getDirection(1) && S.setAttribute("dir", x)) : S = new r.documentFragment(g);
                        var O = k.getDirection(1) != x,
                            M = C.element,
                            _ = M.getAttribute("class"),
                            D = M.getAttribute("style"),
                            P = S.type == 11 && (a != 2 || O || D || _),
                            H, B = C.contents.length;
                        for (p = 0; p < B; p++) H = C.contents[p], H.type == 1 && H.isBlockBoundary() ? (O && !H.getDirection() && H.setAttribute("dir", x), m(M, H), _ && H.addClass(_)) : P && (T || (T = g.createElement(N), O && T.setAttribute("dir", x)), D && T.setAttribute("style", D), _ && T.setAttribute("class", _), T.append(H.clone(1, 1))), S.append(T || H.clone(1, 1));
                        if (S.type == 11 && w != e.length - 1) {
                            var F = S.getLast();
                            F && F.type == 1 && F.getAttribute("type") == "_moz" && F.remove(), (F = S.getLast(c) && F.type == 1 && F.getName() in s.$block) || S.append(g.createElement("br"))
                        }
                        var I = S.$.nodeName.toLowerCase();
                        !n && (I == "div" || I == "p") && S.appendBogus(), y.append(S), b = null, w++
                    }
                    T = null;
                    if (e.length <= w || Math.max(e[w].indent, 0) < E) break
                }
                if (i) {
                    var R = y.getFirst(),
                        U = e[0].parent;
                    while (R) R.type == 1 && (u.clearMarkers(i, R), R.getName() in s.$listItem && v(R)), R = R.getNextSourceNode()
                }
                return {
                    listNode: y,
                    nextIndex: w
                }
            }
        };
        var b = /^h[1-6]$/,
            x = r.walker.nodeType(1);
        S.prototype = {
            exec: function(e) {
                var n = this,
                    i = e.document,
                    s = e.config,
                    o = e.getSelection(),
                    a = o && o.getRanges(!0);
                if (!a || a.length < 1) return;
                if (n.state == 2) {
                    var f = i.getBody();
                    if (!f.getFirst(c)) s.enterMode == 2 ? f.appendBogus() : a[0].fixBlock(1, s.enterMode == 1 ? "p" : "div"), o.selectRanges(a);
                    else {
                        var l = a.length == 1 && a[0],
                            p = l && l.getEnclosedNode();
                        p && p.is && n.type == p.getName() && n.setState(1)
                    }
                }
                var v = o.createBookmarks(!0),
                    m = [],
                    g = {},
                    b = a.createIterator(),
                    S = 0;
                while ((l = b.getNextRange()) && ++S) {
                    var x = l.getBoundaryNodes(),
                        T = x.startNode,
                        C = x.endNode;
                    T.type == 1 && T.getName() == "td" && l.setStartAt(x.startNode, 1), C.type == 1 && C.getName() == "td" && l.setEndAt(x.endNode, 2);
                    var k = l.createIterator(),
                        L;
                    k.forceBrBreak = n.state == 2;
                    while (L = k.getNextParagraph()) {
                        if (L.getCustomData("list_block")) continue;
                        u.setMarker(g, L, "list_block", 1);
                        var A = new r.elementPath(L),
                            O = A.elements,
                            M = O.length,
                            _ = null,
                            D = 0,
                            P = A.blockLimit,
                            H;
                        for (var B = M - 1; B >= 0 && (H = O[B]); B--) if (t[H.getName()] && P.contains(H)) {
                            P.removeCustomData("list_group_object_" + S);
                            var j = H.getCustomData("list_group_object");
                            j ? j.contents.push(L) : (j = {
                                root: H,
                                contents: [L]
                            }, m.push(j), u.setMarker(g, H, "list_group_object", j)), D = 1;
                            break
                        }
                        if (D) continue;
                        var F = P;
                        F.getCustomData("list_group_object_" + S) ? F.getCustomData("list_group_object_" + S).contents.push(L) : (j = {
                            root: F,
                            contents: [L]
                        }, u.setMarker(g, F, "list_group_object_" + S, j), m.push(j))
                    }
                }
                var I = [];
                while (m.length > 0) j = m.shift(), n.state == 2 ? t[j.root.getName()] ? y.call(n, e, j, g, I) : w.call(n, e, j, I) : n.state == 1 && t[j.root.getName()] && E.call(n, e, j, g);
                for (B = 0; B < I.length; B++) N(I[B]);
                u.clearAllMarkers(g), o.selectBookmarks(v), e.focus()
            }
        };
        var C = s,
            k = /[\t\r\n ]*(?:&nbsp;|\xa0)$/,
            O = {
                elements: {}
            };
        for (var M in C.$listItem) O.elements[M] = A();
        var _ = {
            elements: {}
        };
        for (M in C.$listItem) _.elements[M] = A(!0);
        f.add("list", {
            init: function(e) {
                var n = e.addCommand("numberedlist", new S("numberedlist", "ol")),
                    s = e.addCommand("bulletedlist", new S("bulletedlist", "ul"));
                e.ui.addButton("NumberedList", {
                    label: e.lang.numberedlist,
                    command: "numberedlist"
                }), e.ui.addButton("BulletedList", {
                    label: e.lang.bulletedlist,
                    command: "bulletedlist"
                }), e.on("selectionChange", i.bind(g, n)), e.on("selectionChange", i.bind(g, s)), e.on("key", function(n) {
                    var i = n.data.keyCode;
                    if (e.mode == "wysiwyg" && i in {
                        8: 1,
                        46: 1
                    }) {
                        var s = e.getSelection(),
                            o = s.getRanges()[0];
                        if (!o.collapsed) return;
                        var u = i == 8,
                            a = e.document.getBody(),
                            f = new r.walker(o.clone());
                        f.evaluator = function(e) {
                            return c(e) && !p(e)
                        };
                        var l = o.clone();
                        if (u) {
                            var h, v, m = new r.elementPath(o.startContainer);
                            (h = m.contains(t)) && o.checkBoundaryOfElement(h, 1) && (h = h.getParent()) && h.is("li") && (h = H(h)) ? (v = h, h = h.getPrevious(c), l.moveToPosition(h && p(h) ? h : v, 3)) : (f.range.setStartAt(a, 1), f.range.setEnd(o.startContainer, o.startOffset), h = f.previous(), h && h.type == 1 && (h.getName() in t || h.is("li")) && (h.is("li") || (f.range.selectNodeContents(h), f.reset(), f.evaluator = D, h = f.previous()), v = h, l.moveToElementEditEnd(v))), v && (P(e, l, o), n.cancel())
                        } else {
                            var g = o.startContainer.getAscendant("li", 1);
                            if (g) {
                                f.range.setEndAt(a, 2);
                                var y = g.getLast(c),
                                    b = y && D(y) ? y : g,
                                    w = 0,
                                    E = f.next();
                                E && E.type == 1 && E.getName() in t && E.equals(y) ? (w = 1, E = f.next()) : o.checkBoundaryOfElement(b, 2) && (w = 1);
                                if (w && E) {
                                    var S = o.clone();
                                    S.moveToElementEditStart(E), P(e, l, S), n.cancel()
                                }
                            }
                        }
                        setTimeout(function() {
                            e.selectionChange(1)
                        })
                    }
                })
            },
            afterInit: function(e) {
                var t = e.dataProcessor;
                t && (t.dataFilter.addRules(O), t.htmlFilter.addRules(_))
            },
            requires: ["domiterator"]
        })
    }(), function() {
        f.liststyle = {
            requires: ["dialog"],
            init: function(t) {
                t.addCommand("numberedListStyle", new e.dialogCommand("numberedListStyle")), e.dialog.add("numberedListStyle", this.path + "dialogs/liststyle.js"), t.addCommand("bulletedListStyle", new e.dialogCommand("bulletedListStyle")), e.dialog.add("bulletedListStyle", this.path + "dialogs/liststyle.js"), t.addMenuItems && (t.addMenuGroup("list", 108), t.addMenuItems({
                    numberedlist: {
                        label: t.lang.list.numberedTitle,
                        group: "list",
                        command: "numberedListStyle"
                    },
                    bulletedlist: {
                        label: t.lang.list.bulletedTitle,
                        group: "list",
                        command: "bulletedListStyle"
                    }
                })), t.contextMenu && t.contextMenu.addListener(function(e, t) {
                    if (!e || e.isReadOnly()) return null;
                    while (e) {
                        var n = e.getName();
                        if (n == "ol") return {
                            numberedlist: 2
                        };
                        if (n == "ul") return {
                            bulletedlist: 2
                        };
                        e = e.getParent()
                    }
                    return null
                })
            }
        }, f.add("liststyle", f.liststyle)
    }(), function() {
        function r(e) {
            if (!e || e.type != 1 || e.getName() != "form") return [];
            var t = [],
                n = ["style", "className"];
            for (var r = 0; r < n.length; r++) {
                var i = n[r],
                    s = e.$.elements.namedItem(i);
                if (s) {
                    var o = new u(s);
                    t.push([o, o.nextSibling]), o.remove()
                }
            }
            return t
        }
        function i(e, t) {
            if (!e || e.type != 1 || e.getName() != "form") return;
            if (t.length > 0) for (var n = t.length - 1; n >= 0; n--) {
                var r = t[n][0],
                    i = t[n][1];
                i ? r.insertBefore(i) : r.appendTo(e)
            }
        }
        function s(e, t) {
            var n = r(e),
                s = {},
                o = e.$;
            return t || (s["class"] = o.className || "", o.className = ""), s.inline = o.style.cssText || "", t || (o.style.cssText = "position: static; overflow: visible"), i(n), s
        }
        function o(e, t) {
            var n = r(e),
                s = e.$;
            "class" in t && (s.className = t["class"]), "inline" in t && (s.style.cssText = t.inline), i(n)
        }
        function a(t) {
            var n = e.instances;
            for (var r in n) {
                var i = n[r];
                if (i.mode == "wysiwyg" && !i.readOnly) {
                    var s = i.document.getBody();
                    s.setAttribute("contentEditable", !1), s.setAttribute("contentEditable", !0)
                }
            }
            t.focusManager.hasFocus && (t.toolbox.focus(), t.focus())
        }
        function l(e) {
            if (!n || t.version > 6) return null;
            var r = u.createFromHtml('<iframe frameborder="0" tabindex="-1" src="javascript:void((function(){document.open();' + (t.isCustomDomain() ? "document.domain='" + this.getDocument().$.domain + "';" : "") + "document.close();" + '})())"' + ' style="display:block;position:absolute;z-index:-1;' + "progid:DXImageTransform.Microsoft.Alpha(opacity=0);" + '"></iframe>');
            return e.append(r, !0)
        }
        f.add("maximize", {
            init: function(r) {
                function m() {
                    var e = f.getViewPaneSize();
                    v && v.setStyles({
                        width: e.width + "px",
                        height: e.height + "px"
                    }), r.resize(e.width, e.height, null, !0)
                }
                var i = r.lang,
                    u = e.document,
                    f = u.getWindow(),
                    c, h, d, v, g = 2;
                r.addCommand("maximize", {
                    modes: {
                        wysiwyg: !t.iOS,
                        source: !t.iOS
                    },
                    readOnly: 1,
                    editorFocus: !1,
                    exec: function() {
                        var e = r.container.getChild(1),
                            E = r.getThemeSpace("contents");
                        if (r.mode == "wysiwyg") {
                            var S = r.getSelection();
                            c = S && S.getRanges(), h = f.getScrollPosition()
                        } else {
                            var T = r.textarea.$;
                            c = !n && [T.selectionStart, T.selectionEnd], h = [T.scrollLeft, T.scrollTop]
                        }
                        if (this.state == 2) {
                            f.on("resize", m), d = f.getScrollPosition();
                            var N = r.container;
                            while (N = N.getParent()) N.setCustomData("maximize_saved_styles", s(N)), N.setStyle("z-index", r.config.baseFloatZIndex - 1);
                            E.setCustomData("maximize_saved_styles", s(E, !0)), e.setCustomData("maximize_saved_styles", s(e, !0));
                            var C = {
                                overflow: t.webkit ? "" : "hidden",
                                width: 0,
                                height: 0
                            };
                            u.getDocumentElement().setStyles(C), !t.gecko && u.getDocumentElement().setStyle("position", "fixed"), (!t.gecko || !t.quirks) && u.getBody().setStyles(C), n ? setTimeout(function() {
                                f.$.scrollTo(0, 0)
                            }, 0) : f.$.scrollTo(0, 0), e.setStyle("position", t.gecko && t.quirks ? "fixed" : "absolute"), e.$.offsetLeft, e.setStyles({
                                "z-index": r.config.baseFloatZIndex - 1,
                                left: "0px",
                                top: "0px"
                            }), v = l(e), e.addClass("cke_maximized"), m();
                            var k = e.getDocumentPosition();
                            e.setStyles({
                                left: -1 * k.x + "px",
                                top: -1 * k.y + "px"
                            }), t.gecko && a(r)
                        } else if (this.state == 1) {
                            f.removeListener("resize", m);
                            var L = [E, e];
                            for (var O = 0; O < L.length; O++) o(L[O], L[O].getCustomData("maximize_saved_styles")), L[O].removeCustomData("maximize_saved_styles");
                            N = r.container;
                            while (N = N.getParent()) o(N, N.getCustomData("maximize_saved_styles")), N.removeCustomData("maximize_saved_styles");
                            n ? setTimeout(function() {
                                f.$.scrollTo(d.x, d.y)
                            }, 0) : f.$.scrollTo(d.x, d.y), e.removeClass("cke_maximized"), t.webkit && (e.setStyle("display", "inline"), setTimeout(function() {
                                e.setStyle("display", "block")
                            }, 0)), v && (v.remove(), v = null), r.fire("resize")
                        }
                        this.toggleState();
                        var M = this.uiItems[0];
                        if (M) {
                            var _ = this.state == 2 ? i.maximize : i.minimize,
                                D = r.element.getDocument().getById(M._.id);
                            D.getChild(1).setHtml(_), D.setAttribute("title", _), D.setAttribute("href", 'javascript:void("' + _ + '");')
                        }
                        if (r.mode == "wysiwyg") if (c) {
                            t.gecko && a(r), r.getSelection().selectRanges(c);
                            var P = r.getSelection().getStartElement();
                            P && P.scrollIntoView(!0)
                        } else f.$.scrollTo(h.x, h.y);
                        else c && (T.selectionStart = c[0], T.selectionEnd = c[1]), T.scrollLeft = h[0], T.scrollTop = h[1];
                        c = h = null, g = this.state
                    },
                    canUndo: !1
                }), r.ui.addButton("Maximize", {
                    label: i.maximize,
                    command: "maximize"
                }), r.on("mode", function() {
                    var e = r.getCommand("maximize");
                    e.setState(e.state == 0 ? 0 : g)
                }, null, null, 100)
            }
        })
    }(), f.add("newpage", {
        init: function(e) {
            e.addCommand("newpage", {
                modes: {
                    wysiwyg: 1,
                    source: 1
                },
                exec: function(e) {
                    var t = this;
                    e.setData(e.config.newpage_html || "", function() {
                        setTimeout(function() {
                            e.fire("afterCommandExec", {
                                name: "newpage",
                                command: t
                            }), e.selectionChange()
                        }, 200)
                    }), e.focus()
                },
                async: !0
            }), e.ui.addButton("NewPage", {
                label: e.lang.newPage,
                command: "newpage"
            })
        }
    }), f.add("pagebreak", {
        init: function(n) {
            n.addCommand("pagebreak", f.pagebreakCmd), n.ui.addButton("PageBreak", {
                label: n.lang.pagebreak,
                command: "pagebreak"
            });
            var r = ["{", "background: url(" + e.getUrl(this.path + "images/pagebreak.gif") + ") no-repeat center center;", "clear: both;", "width:100%; _width:99.9%;", "border-top: #999999 1px dotted;", "border-bottom: #999999 1px dotted;", "padding:0;", "height: 5px;", "cursor: default;", "}"].join("").replace(/;/g, " !important;");
            n.addCss("div.cke_pagebreak" + r), t.opera && n.on("contentDom", function() {
                n.document.on("click", function(e) {
                    var t = e.data.getTarget();
                    t.is("div") && t.hasClass("cke_pagebreak") && n.getSelection().selectElement(t)
                })
            })
        },
        afterInit: function(t) {
            var n = t.lang.pagebreakAlt,
                r = t.dataProcessor,
                i = r && r.dataFilter,
                s = r && r.htmlFilter;
            s && s.addRules({
                attributes: {
                    "class": function(t, n) {
                        var r = t.replace("cke_pagebreak", "");
                        if (r != t) {
                            var i = e.htmlParser.fragment.fromHtml('<span style="display: none;">&nbsp;</span>');
                            n.children.length = 0, n.add(i);
                            var s = n.attributes;
                            delete s["aria-label"], delete s.contenteditable, delete s.title
                        }
                        return r
                    }
                }
            }, 5), i && i.addRules({
                elements: {
                    div: function(e) {
                        var t = e.attributes,
                            r = t && t.style,
                            i = r && e.children.length == 1 && e.children[0],
                            s = i && i.name == "span" && i.attributes.style;
                        s && /page-break-after\s*:\s*always/i.test(r) && /display\s*:\s*none/i.test(s) && (t.contenteditable = "false", t["class"] = "cke_pagebreak", t["data-cke-display-name"] = "pagebreak", t["aria-label"] = n, t.title = n, e.children.length = 0)
                    }
                }
            })
        },
        requires: ["fakeobjects"]
    }), f.pagebreakCmd = {
        exec: function(e) {
            var t = e.lang.pagebreakAlt,
                n = u.createFromHtml('<div style="page-break-after: always;"contenteditable="false" title="' + t + '" ' + 'aria-label="' + t + '" ' + 'data-cke-display-name="pagebreak" ' + 'class="cke_pagebreak">' + "</div>", e.document),
                r = e.getSelection().getRanges(!0);
            e.fire("saveSnapshot");
            for (var i, s = r.length - 1; s >= 0; s--) {
                i = r[s], s < r.length - 1 && (n = n.clone(!0)), i.splitBlock("p"), i.insertNode(n);
                if (s == r.length - 1) {
                    var o = n.getNext();
                    i.moveToPosition(n, 4), (!o || o.type == 1 && !o.isEditable()) && i.fixBlock(!0, e.config.enterMode == 3 ? "div" : "p"), i.select()
                }
            }
            e.fire("saveSnapshot")
        }
    }, function() {
        function t(e) {
            e.data.mode = "html"
        }
        f.add("pastefromword", {
            init: function(n) {
                var r = 0,
                    i = function(e) {
                        e && e.removeListener(), n.removeListener("beforePaste", t), r && setTimeout(function() {
                            r = 0
                        }, 0)
                    };
                n.addCommand("pastefromword", {
                    canUndo: !1,
                    exec: function() {
                        r = 1, n.on("beforePaste", t), n.execCommand("paste", "html") === !1 && (n.on("dialogShow", function(e) {
                            e.removeListener(), e.data.on("cancel", i)
                        }), n.on("dialogHide", function(e) {
                            e.data.removeListener("cancel", i)
                        })), n.on("afterPaste", i)
                    }
                }), n.ui.addButton("PasteFromWord", {
                    label: n.lang.pastefromword.toolbar,
                    command: "pastefromword"
                }), n.on("pasteState", function(e) {
                    n.getCommand("pastefromword").setState(e.data)
                }), n.on("paste", function(t) {
                    var i = t.data,
                        s;
                    if ((s = i.html) && (r || /(class=\"?Mso|style=\"[^\"]*\bmso\-|w:WordDocument)/.test(s))) {
                        var o = this.loadFilterRules(function() {
                            if (o) n.fire("paste", i);
                            else if (!n.config.pasteFromWordPromptCleanup || r || confirm(n.lang.pastefromword.confirmCleanup)) i.html = e.cleanWord(s, n)
                        });
                        o && t.cancel()
                    }
                }, this)
            },
            loadFilterRules: function(t) {
                var n = e.cleanWord;
                if (n) t();
                else {
                    var r = e.getUrl(a.pasteFromWordCleanupFile || this.path + "filter/default.js");
                    e.scriptLoader.load(r, t, null, !0)
                }
                return !n
            },
            requires: ["clipboard"]
        })
    }(), function() {
        var t = {
            exec: function(e) {
                var t = i.tryThese(function() {
                    var e = window.clipboardData.getData("Text");
                    if (!e) throw 0;
                    return e
                });
                return t ? (e.fire("paste", {
                    text: t
                }), !0) : (e.openDialog("pastetext"), !1)
            }
        };
        f.add("pastetext", {
            init: function(n) {
                var r = "pastetext",
                    i = n.addCommand(r, t);
                n.ui.addButton("PasteText", {
                    label: n.lang.pasteText.button,
                    command: r
                }), e.dialog.add(r, e.getUrl(this.path + "dialogs/pastetext.js")), n.config.forcePasteAsPlainText && (n.on("beforeCommandExec", function(e) {
                    var t = e.data.commandData;
                    e.data.name == "paste" && t != "html" && (n.execCommand("pastetext"), e.cancel())
                }, null, null, 0), n.on("beforePaste", function(e) {
                    e.data.mode = "text"
                })), n.on("pasteState", function(e) {
                    n.getCommand("pastetext").setState(e.data)
                })
            },
            requires: ["clipboard"]
        })
    }(), f.add("popup"), i.extend(e.editor.prototype, {
        popup: function(e, t, n, r) {
            t = t || "80%", n = n || "70%", typeof t == "string" && t.length > 1 && t.substr(t.length - 1, 1) == "%" && (t = parseInt(window.screen.width * parseInt(t, 10) / 100, 10)), typeof n == "string" && n.length > 1 && n.substr(n.length - 1, 1) == "%" && (n = parseInt(window.screen.height * parseInt(n, 10) / 100, 10)), t < 640 && (t = 640), n < 420 && (n = 420);
            var i = parseInt((window.screen.height - n) / 2, 10),
                s = parseInt((window.screen.width - t) / 2, 10);
            r = (r || "location=no,menubar=no,toolbar=no,dependent=yes,minimizable=no,modal=yes,alwaysRaised=yes,resizable=yes,scrollbars=yes") + ",width=" + t + ",height=" + n + ",top=" + i + ",left=" + s;
            var o = window.open("", null, r, !0);
            if (!o) return !1;
            try {
                var u = navigator.userAgent.toLowerCase();
                u.indexOf(" chrome/") == -1 && (o.moveTo(s, i), o.resizeTo(t, n)), o.focus(), o.location.href = e
            } catch (a) {
                o = window.open(e, null, r, !0)
            }
            return !0
        }
    }), function() {
        var e, n = {
            modes: {
                wysiwyg: 1,
                source: 1
            },
            canUndo: !1,
            readOnly: 1,
            exec: function(n) {
                var r, s = n.config,
                    o = s.baseHref ? '<base href="' + s.baseHref + '"/>' : "",
                    u = t.isCustomDomain();
                if (s.fullPage) r = n.getData().replace(/<head>/, "$&" + o).replace(/[^>]*(?=<\/title>)/, "$& &mdash; " + n.lang.preview);
                else {
                    var a = "<body ",
                        f = n.document && n.document.getBody();
                    f && (f.getAttribute("id") && (a += 'id="' + f.getAttribute("id") + '" '), f.getAttribute("class") && (a += 'class="' + f.getAttribute("class") + '" ')), a += ">", r = n.config.docType + '<html dir="' + n.config.contentsLangDirection + '">' + "<head>" + o + "<title>" + n.lang.preview + "</title>" + i.buildStyleHtml(n.config.contentsCss) + "</head>" + a + n.getData() + "</body></html>"
                }
                var l = 640,
                    c = 420,
                    h = 80;
                try {
                    var p = window.screen;
                    l = Math.round(p.width * .8), c = Math.round(p.height * .7), h = Math.round(p.width * .1)
                } catch (d) {}
                var v = "";
                u && (window._cke_htmlToLoad = r, v = 'javascript:void( (function(){document.open();document.domain="' + document.domain + '";' + "document.write( window.opener._cke_htmlToLoad );" + "document.close();" + "window.opener._cke_htmlToLoad = null;" + "})() )"), t.gecko && (window._cke_htmlToLoad = r, v = e + "preview.html");
                var g = window.open(v, null, "toolbar=yes,location=no,status=yes,menubar=yes,scrollbars=yes,resizable=yes,width=" + l + ",height=" + c + ",left=" + h);
                if (!u && !t.gecko) {
                    var y = g.document;
                    y.open(), y.write(r), y.close(), t.webkit && setTimeout(function() {
                        y.body.innerHTML += ""
                    }, 0)
                }
            }
        },
            r = "preview";
        f.add(r, {
            init: function(t) {
                e = this.path, t.addCommand(r, n), t.ui.addButton("Preview", {
                    label: t.lang.preview,
                    command: r
                })
            }
        })
    }(), f.add("print", {
        init: function(e) {
            var t = "print",
                n = e.addCommand(t, f.print);
            e.ui.addButton("Print", {
                label: e.lang.print,
                command: t
            })
        }
    }), f.print = {
        exec: function(e) {
            if (t.opera) return;
            t.gecko ? e.window.$.print() : e.document.$.execCommand("Print")
        },
        canUndo: !1,
        readOnly: 1,
        modes: {
            wysiwyg: !t.opera
        }
    }, f.add("removeformat", {
        requires: ["selection"],
        init: function(e) {
            e.addCommand("removeFormat", f.removeformat.commands.removeformat), e.ui.addButton("RemoveFormat", {
                label: e.lang.removeFormat,
                command: "removeFormat"
            }), e._.removeFormat = {
                filters: []
            }
        }
    }), f.removeformat = {
        commands: {
            removeformat: {
                exec: function(e) {
                    var t = e._.removeFormatRegex || (e._.removeFormatRegex = new RegExp("^(?:" + e.config.removeFormatTags.replace(/,/g, "|") + ")$", "i")),
                        n = e._.removeAttributes || (e._.removeAttributes = e.config.removeFormatAttributes.split(",")),
                        i = f.removeformat.filter,
                        s = e.getSelection().getRanges(1),
                        o = s.createIterator(),
                        u;
                    while (u = o.getNextRange()) {
                        u.collapsed || u.enlarge(1);
                        var a = u.createBookmark(),
                            l = a.startNode,
                            c = a.endNode,
                            h, p = function(n) {
                                var s = new r.elementPath(n),
                                    o = s.elements;
                                for (var u = 1, a; a = o[u]; u++) {
                                    if (a.equals(s.block) || a.equals(s.blockLimit)) break;
                                    t.test(a.getName()) && i(e, a) && n.breakParent(a)
                                }
                            };
                        p(l);
                        if (c) {
                            p(c), h = l.getNextSourceNode(!0, 1);
                            while (h) {
                                if (h.equals(c)) break;
                                var v = h.getNextSourceNode(!1, 1);
                                (h.getName() != "img" || !h.data("cke-realelement")) && i(e, h) && (t.test(h.getName()) ? h.remove(1) : (h.removeAttributes(n), e.fire("removeFormatCleanup", h))), h = v
                            }
                        }
                        u.moveToBookmark(a)
                    }
                    e.getSelection().selectRanges(s)
                }
            }
        },
        filter: function(e, t) {
            var n = e._.removeFormat.filters;
            for (var r = 0; r < n.length; r++) if (n[r](t) === !1) return !1;
            return !0
        }
    }, e.editor.prototype.addRemoveFormatFilter = function(e) {
        this._.removeFormat.filters.push(e)
    }, a.removeFormatTags = "b,big,code,del,dfn,em,font,i,ins,kbd,q,samp,small,span,strike,strong,sub,sup,tt,u,var", a.removeFormatAttributes = "class,style,lang,width,height,align,hspace,valign", f.add("resize", {
        init: function(t) {
            var n = t.config,
                r = t.element.getDirection(1);
            !n.resize_dir && (n.resize_dir = "both"), n.resize_maxWidth == undefined && (n.resize_maxWidth = 3e3), n.resize_maxHeight == undefined && (n.resize_maxHeight = 3e3), n.resize_minWidth == undefined && (n.resize_minWidth = 750), n.resize_minHeight == undefined && (n.resize_minHeight = 250);
            if (n.resize_enabled !== !1) {
                var s = null,
                    o, u, a = (n.resize_dir == "both" || n.resize_dir == "horizontal") && n.resize_minWidth != n.resize_maxWidth,
                    f = (n.resize_dir == "both" || n.resize_dir == "vertical") && n.resize_minHeight != n.resize_maxHeight;
                function l(e) {
                    var i = e.data.$.screenX - o.x,
                        s = e.data.$.screenY - o.y,
                        l = u.width,
                        c = u.height,
                        h = l + i * (r == "rtl" ? -1 : 1),
                        p = c + s;
                    a && (l = Math.max(n.resize_minWidth, Math.min(h, n.resize_maxWidth))), f && (c = Math.max(n.resize_minHeight, Math.min(p, n.resize_maxHeight))), t.resize(a ? l : null, c)
                }
                function c(n) {
                    e.document.removeListener("mousemove", l), e.document.removeListener("mouseup", c), t.document && (t.document.removeListener("mousemove", l), t.document.removeListener("mouseup", c))
                }
                var h = i.addFunction(function(r) {
                    s || (s = t.getResizable()), u = {
                        width: s.$.offsetWidth || 0,
                        height: s.$.offsetHeight || 0
                    }, o = {
                        x: r.screenX,
                        y: r.screenY
                    }, n.resize_minWidth > u.width && (n.resize_minWidth = u.width), n.resize_minHeight > u.height && (n.resize_minHeight = u.height), e.document.on("mousemove", l), e.document.on("mouseup", c), t.document && (t.document.on("mousemove", l), t.document.on("mouseup", c))
                });
                t.on("destroy", function() {
                    i.removeFunction(h)
                }), t.on("themeSpace", function(e) {
                    if (e.data.space == "bottom") {
                        var n = "";
                        a && !f && (n = " cke_resizer_horizontal"), !a && f && (n = " cke_resizer_vertical");
                        var s = '<div class="cke_resizer' + n + " cke_resizer_" + r + '"' + ' title="' + i.htmlEncode(t.lang.resize) + '"' + ' onmousedown="CKEDITOR.tools.callFunction(' + h + ', event)"' + "></div>";
                        r == "ltr" && n == "ltr" ? e.data.html += s : e.data.html = s + e.data.html
                    }
                }, t, null, 100)
            }
        }
    }), function() {
        var e = {
            modes: {
                wysiwyg: 1,
                source: 1
            },
            readOnly: 1,
            exec: function(e) {
                var t = e.element.$.form;
                if (t) try {
                    t.submit()
                } catch (n) {
                    t.submit.click && t.submit.click()
                }
            }
        },
            t = "save";
        f.add(t, {
            init: function(n) {
                var r = n.addCommand(t, e);
                r.modes = {
                    wysiwyg: !! n.element.$.form
                }, n.ui.addButton("Save", {
                    label: n.lang.save,
                    command: t
                })
            }
        })
    }(), function() {
        function o(e, t) {
            var n = 0,
                r;
            for (r in t) if (t[r] == e) {
                n = 1;
                break
            }
            return n
        }
        var r = "scaytcheck",
            s = "",
            a = function() {
                var r = this,
                    o = function() {
                        var i = r.config,
                            s = {};
                        s.srcNodeRef = r.document.getWindow().$.frameElement, s.assocApp = "CKEDITOR." + e.version + "@" + e.revision, s.customerid = i.scayt_customerid || "1:WvF0D4-UtPqN1-43nkD4-NKvUm2-daQqk3-LmNiI-z7Ysb4-mwry24-T8YrS3-Q2tpq2", s.customDictionaryIds = i.scayt_customDictionaryIds || "", s.userDictionaryName = i.scayt_userDictionaryName || "", s.sLang = i.scayt_sLang || "en_US", s.onLoad = function() {
                            n && t.version < 8 || this.addStyle(this.selectorCss(), "padding-bottom: 2px !important;"), r.focusManager.hasFocus && !l.isControlRestored(r) && this.focus()
                        }, s.onBeforeChange = function() {
                            l.getScayt(r) && !r.checkDirty() && setTimeout(function() {
                                r.resetDirty()
                            }, 0)
                        };
                        var o = window.scayt_custom_params;
                        if (typeof o == "object") for (var a in o) s[a] = o[a];
                        l.getControlId(r) && (s.id = l.getControlId(r));
                        var f = new window.scayt(s);
                        f.afterMarkupRemove.push(function(e) {
                            (new u(e, f.document)).mergeSiblings()
                        });
                        var c = l.instances[r.name];
                        c && (f.sLang = c.sLang, f.option(c.option()), f.paused = c.paused), l.instances[r.name] = f;
                        try {
                            f.setDisabled(l.isPaused(r) === !1)
                        } catch (p) {}
                        r.fire("showScaytState")
                    };
                r.on("contentDom", o), r.on("contentDomUnload", function() {
                    var t = e.document.getElementsByTag("script"),
                        n = /^dojoIoScript(\d+)$/i,
                        r = /^https?:\/\/svc\.webspellchecker\.net\/spellcheck\/script\/ssrv\.cgi/i;
                    for (var i = 0; i < t.count(); i++) {
                        var s = t.getItem(i),
                            o = s.getId(),
                            u = s.getAttribute("src");
                        o && u && o.match(n) && u.match(r) && s.remove()
                    }
                }), r.on("beforeCommandExec", function(e) {
                    if (e.data.name != "source" && e.data.name != "newpage" || r.mode != "wysiwyg") e.data.name == "source" && r.mode == "source" && l.markControlRestore(r);
                    else {
                        var t = l.getScayt(r);
                        t && (l.setPaused(r, !t.disabled), l.setControlId(r, t.id), t.destroy(!0), delete l.instances[r.name])
                    }
                }), r.on("afterCommandExec", function(e) {
                    if (!l.isScaytEnabled(r)) return;
                    r.mode == "wysiwyg" && (e.data.name == "undo" || e.data.name == "redo") && window.setTimeout(function() {
                        l.getScayt(r).refresh()
                    }, 10)
                }), r.on("destroy", function(e) {
                    var t = e.editor,
                        n = l.getScayt(t);
                    if (!n) return;
                    delete l.instances[t.name], l.setControlId(t, n.id), n.destroy(!0)
                }), r.on("afterSetData", function() {
                    l.isScaytEnabled(r) && window.setTimeout(function() {
                        var e = l.getScayt(r);
                        e && e.refresh()
                    }, 10)
                }), r.on("insertElement", function() {
                    var e = l.getScayt(r);
                    l.isScaytEnabled(r) && (n && r.getSelection().unlock(!0), window.setTimeout(function() {
                        e.focus(), e.refresh()
                    }, 10))
                }, this, null, 50), r.on("insertHtml", function() {
                    var e = l.getScayt(r);
                    l.isScaytEnabled(r) && (n && r.getSelection().unlock(!0), window.setTimeout(function() {
                        e.focus(), e.refresh()
                    }, 10))
                }, this, null, 50), r.on("scaytDialog", function(e) {
                    e.data.djConfig = window.djConfig, e.data.scayt_control = l.getScayt(r), e.data.tab = s, e.data.scayt = window.scayt
                });
                var a = r.dataProcessor,
                    c = a && a.htmlFilter;
                c && c.addRules({
                    elements: {
                        span: function(e) {
                            if (e.attributes["data-scayt_word"] && e.attributes["data-scaytid"]) return delete e.name, e
                        }
                    }
                });
                var p = f.undo.Image.prototype;
                p.equals = i.override(p.equals, function(e) {
                    return function(t) {
                        var n = this,
                            r = n.contents,
                            i = t.contents,
                            s = l.getScayt(n.editor);
                        s && l.isScaytReady(n.editor) && (n.contents = s.reset(r) || "", t.contents = s.reset(i) || "");
                        var o = e.apply(n, arguments);
                        return n.contents = r, t.contents = i, o
                    }
                }), r.document && o()
            };
        f.scayt = {
            engineLoaded: !1,
            instances: {},
            controlInfo: {},
            setControlInfo: function(e, t) {
                e && e.name && typeof this.controlInfo[e.name] != "object" && (this.controlInfo[e.name] = {});
                for (var n in t) this.controlInfo[e.name][n] = t[n]
            },
            isControlRestored: function(e) {
                return e && e.name && this.controlInfo[e.name] ? this.controlInfo[e.name].restored : !1
            },
            markControlRestore: function(e) {
                this.setControlInfo(e, {
                    restored: !0
                })
            },
            setControlId: function(e, t) {
                this.setControlInfo(e, {
                    id: t
                })
            },
            getControlId: function(e) {
                return e && e.name && this.controlInfo[e.name] && this.controlInfo[e.name].id ? this.controlInfo[e.name].id : null
            },
            setPaused: function(e, t) {
                this.setControlInfo(e, {
                    paused: t
                })
            },
            isPaused: function(e) {
                return e && e.name && this.controlInfo[e.name] ? this.controlInfo[e.name].paused : undefined
            },
            getScayt: function(e) {
                return this.instances[e.name]
            },
            isScaytReady: function(e) {
                return this.engineLoaded === !0 && "undefined" != typeof window.scayt && this.getScayt(e)
            },
            isScaytEnabled: function(e) {
                var t = this.getScayt(e);
                return t ? t.disabled === !1 : !1
            },
            getUiTabs: function(e) {
                var t = [],
                    n = e.config.scayt_uiTabs || "1,1,1";
                n = n.split(","), n[3] = "1";
                for (var r = 0; r < 4; r++) t[r] = typeof window.scayt != "undefined" && typeof window.scayt.uiTags != "undefined" ? parseInt(n[r], 10) && window.scayt.uiTags[r] : parseInt(n[r], 10);
                return t
            },
            loadEngine: function(n) {
                if (t.gecko && t.version < 10900 || t.opera || t.air) return n.fire("showScaytState");
                if (this.engineLoaded === !0) return a.apply(n);
                if (this.engineLoaded == -1) return e.on("scaytReady", function() {
                    a.apply(n)
                });
                e.on("scaytReady", a, n), e.on("scaytReady", function() {
                    this.engineLoaded = !0
                }, this, null, 0), this.engineLoaded = -1;
                var r = document.location.protocol;
                r = r.search(/https?:/) != -1 ? r : "http:";
                var i = "svc.webspellchecker.net/scayt26/loader__base.js",
                    s = n.config.scayt_srcUrl || r + "//" + i,
                    o = l.parseUrl(s).path + "/";
                return window.scayt == undefined ? (e._djScaytConfig = {
                    baseUrl: o,
                    addOnLoad: [function() {
                        e.fireOnce("scaytReady")
                    }],
                    isDebug: !1
                }, e.document.getHead().append(e.document.createElement("script", {
                    attributes: {
                        type: "text/javascript",
                        async: "true",
                        src: s
                    }
                }))) : e.fireOnce("scaytReady"), null
            },
            parseUrl: function(e) {
                var t;
                return e.match && (t = e.match(/(.*)[\/\\](.*?\.\w+)$/)) ? {
                    path: t[1],
                    file: t[2]
                } : e
            }
        };
        var l = f.scayt,
            c = function(e, t, n, r, i, s, o) {
                e.addCommand(r, i), e.addMenuItem(r, {
                    label: n,
                    command: r,
                    group: s,
                    order: o
                })
            },
            p = {
                preserveState: !0,
                editorFocus: !1,
                canUndo: !1,
                exec: function(e) {
                    if (l.isScaytReady(e)) {
                        var t = l.isScaytEnabled(e);
                        this.setState(t ? 2 : 1);
                        var n = l.getScayt(e);
                        n.focus(), n.setDisabled(t)
                    } else!e.config.scayt_autoStartup && l.engineLoaded >= 0 && (this.setState(0), l.loadEngine(e))
                }
            };
        f.add("scayt", {
            requires: ["menubutton"],
            beforeInit: function(e) {
                var t = e.config.scayt_contextMenuItemsOrder || "suggest|moresuggest|control",
                    n = "";
                t = t.split("|");
                if (t && t.length) for (var r = 0; r < t.length; r++) n += "scayt_" + t[r] + (t.length != parseInt(r, 10) + 1 ? "," : "");
                e.config.menu_groups = n + "," + e.config.menu_groups
            },
            init: function(n) {
                var i = n.dataProcessor && n.dataProcessor.dataFilter,
                    u = {
                        elements: {
                            span: function(e) {
                                var t = e.attributes;
                                t && t["data-scaytid"] && delete e.name
                            }
                        }
                    };
                i && i.addRules(u);
                var a = {},
                    f = {},
                    h = n.addCommand(r, p);
                e.dialog.add(r, e.getUrl(this.path + "dialogs/options.js"));
                var d = l.getUiTabs(n),
                    v = "scaytButton";
                n.addMenuGroup(v);
                var g = {},
                    y = n.lang.scayt;
                g.scaytToggle = {
                    label: y.enable,
                    command: r,
                    group: v
                }, d[0] == 1 && (g.scaytOptions = {
                    label: y.options,
                    group: v,
                    onClick: function() {
                        s = "options", n.openDialog(r)
                    }
                }), d[1] == 1 && (g.scaytLangs = {
                    label: y.langs,
                    group: v,
                    onClick: function() {
                        s = "langs", n.openDialog(r)
                    }
                }), d[2] == 1 && (g.scaytDict = {
                    label: y.dictionariesTab,
                    group: v,
                    onClick: function() {
                        s = "dictionaries", n.openDialog(r)
                    }
                }), g.scaytAbout = {
                    label: n.lang.scayt.about,
                    group: v,
                    onClick: function() {
                        s = "about", n.openDialog(r)
                    }
                }, n.addMenuItems(g), n.ui.add("Scayt", "menubutton", {
                    label: y.title,
                    title: t.opera ? y.opera_title : y.title,
                    className: "cke_button_scayt",
                    modes: {
                        wysiwyg: 1
                    },
                    onRender: function() {
                        h.on("state", function() {
                            this.setState(h.state)
                        }, this)
                    },
                    onMenu: function() {
                        var e = l.isScaytEnabled(n);
                        n.getMenuItem("scaytToggle").label = y[e ? "disable" : "enable"];
                        var t = l.getUiTabs(n);
                        return {
                            scaytToggle: 2,
                            scaytOptions: e && t[0] ? 2 : 0,
                            scaytLangs: e && t[1] ? 2 : 0,
                            scaytDict: e && t[2] ? 2 : 0,
                            scaytAbout: e && t[3] ? 2 : 0
                        }
                    }
                }), n.contextMenu && n.addMenuItems && n.contextMenu.addListener(function(e, t) {
                    if (!l.isScaytEnabled(n) || t.getRanges()[0].checkReadOnly()) return null;
                    var r = l.getScayt(n),
                        i = r.getScaytNode();
                    if (!i) return null;
                    var s = r.getWord(i);
                    if (!s) return null;
                    var u = r.getLang(),
                        h = {},
                        p = window.scayt.getSuggestion(s, u);
                    if (!p || !p.length) return null;
                    for (var d in a) delete n._.menuItems[d], delete n._.commands[d];
                    for (d in f) delete n._.menuItems[d], delete n._.commands[d];
                    a = {}, f = {};
                    var v = n.config.scayt_moreSuggestions || "on",
                        m = !1,
                        g = n.config.scayt_maxSuggestions;
                    typeof g != "number" && (g = 5), !g && (g = p.length);
                    var b = n.config.scayt_contextCommands || "all";
                    b = b.split("|");
                    for (var w = 0, E = p.length; w < E; w += 1) {
                        var S = "scayt_suggestion_" + p[w].replace(" ", "_"),
                            T = function(e, t) {
                                return {
                                    exec: function() {
                                        r.replace(e, t)
                                    }
                                }
                            }(i, p[w]);
                        w < g ? (c(n, "button_" + S, p[w], S, T, "scayt_suggest", w + 1), h[S] = 2, f[S] = 2) : v == "on" && (c(n, "button_" + S, p[w], S, T, "scayt_moresuggest", w + 1), a[S] = 2, m = !0)
                    }
                    m && (n.addMenuItem("scayt_moresuggest", {
                        label: y.moreSuggestions,
                        group: "scayt_moresuggest",
                        order: 10,
                        getItems: function() {
                            return a
                        }
                    }), f.scayt_moresuggest = 2);
                    if (o("all", b) || o("ignore", b)) {
                        var N = {
                            exec: function() {
                                r.ignore(i)
                            }
                        };
                        c(n, "ignore", y.ignore, "scayt_ignore", N, "scayt_control", 1), f.scayt_ignore = 2
                    }
                    if (o("all", b) || o("ignoreall", b)) {
                        var k = {
                            exec: function() {
                                r.ignoreAll(i)
                            }
                        };
                        c(n, "ignore_all", y.ignoreAll, "scayt_ignore_all", k, "scayt_control", 2), f.scayt_ignore_all = 2
                    }
                    if (o("all", b) || o("add", b)) {
                        var L = {
                            exec: function() {
                                window.scayt.addWordToUserDictionary(i)
                            }
                        };
                        c(n, "add_word", y.addWord, "scayt_add_word", L, "scayt_control", 3), f.scayt_add_word = 2
                    }
                    return r.fireOnContextMenu && r.fireOnContextMenu(n), f
                });
                var w = function() {
                        n.removeListener("showScaytState", w), !t.opera && !t.air ? h.setState(l.isScaytEnabled(n) ? 1 : 2) : h.setState(0)
                    };
                n.on("showScaytState", w), (t.opera || t.air) && n.on("instanceReady", function() {
                    w()
                }), n.config.scayt_autoStartup && n.on("instanceReady", function() {
                    l.loadEngine(n)
                })
            },
            afterInit: function(e) {
                var t, n = function(e) {
                        if (e.hasAttribute("data-scaytid")) return !1
                    };
                e._.elementsPath && (t = e._.elementsPath.filters) && t.push(n), e.addRemoveFormatFilter && e.addRemoveFormatFilter(n)
            }
        })
    }(), f.add("smiley", {
        requires: ["dialog"],
        init: function(t) {
            t.config.smiley_path = t.config.smiley_path || this.path + "images/", t.addCommand("smiley", new e.dialogCommand("smiley")), t.ui.addButton("Smiley", {
                label: t.lang.smiley.toolbar,
                command: "smiley"
            }), e.dialog.add("smiley", this.path + "dialogs/smiley.js")
        }
    }), a.smiley_images = ["regular_smile.gif", "sad_smile.gif", "wink_smile.gif", "teeth_smile.gif", "confused_smile.gif", "tounge_smile.gif", "embaressed_smile.gif", "omg_smile.gif", "whatchutalkingabout_smile.gif", "angry_smile.gif", "angel_smile.gif", "shades_smile.gif", "devil_smile.gif", "cry_smile.gif", "lightbulb.gif", "thumbs_down.gif", "thumbs_up.gif", "heart.gif", "broken_heart.gif", "kiss.gif", "envelope.gif"], a.smiley_descriptions = ["smiley", "sad", "wink", "laugh", "frown", "cheeky", "blush", "surprise", "indecision", "angry", "angel", "cool", "devil", "crying", "enlightened", "no", "yes", "heart", "broken heart", "kiss", "mail"], function() {
        var t = ".%2 p,.%2 div,.%2 pre,.%2 address,.%2 blockquote,.%2 h1,.%2 h2,.%2 h3,.%2 h4,.%2 h5,.%2 h6{background-repeat: no-repeat;background-position: top %3;border: 1px dotted gray;padding-top: 8px;padding-%3: 8px;}.%2 p{%1p.png);}.%2 div{%1div.png);}.%2 pre{%1pre.png);}.%2 address{%1address.png);}.%2 blockquote{%1blockquote.png);}.%2 h1{%1h1.png);}.%2 h2{%1h2.png);}.%2 h3{%1h3.png);}.%2 h4{%1h4.png);}.%2 h5{%1h5.png);}.%2 h6{%1h6.png);}",
            n = /%1/g,
            r = /%2/g,
            i = /%3/g,
            s = {
                readOnly: 1,
                preserveState: !0,
                editorFocus: !1,
                exec: function(e) {
                    this.toggleState(), this.refresh(e)
                },
                refresh: function(e) {
                    if (e.document) {
                        var t = this.state == 1 ? "addClass" : "removeClass";
                        e.document.getBody()[t]("cke_show_blocks")
                    }
                }
            };
        f.add("showblocks", {
            requires: ["wysiwygarea"],
            init: function(o) {
                var u = o.addCommand("showblocks", s);
                u.canUndo = !1, o.config.startupOutlineBlocks && u.setState(1), o.addCss(t.replace(n, "background-image: url(" + e.getUrl(this.path) + "images/block_").replace(r, "cke_show_blocks ").replace(i, o.lang.dir == "rtl" ? "right" : "left")), o.ui.addButton("ShowBlocks", {
                    label: o.lang.showBlocks,
                    command: "showblocks"
                }), o.on("mode", function() {
                    u.state != 0 && u.refresh(o)
                }), o.on("contentDom", function() {
                    u.state != 0 && u.refresh(o)
                })
            }
        })
    }(), function() {
        var n = "cke_show_border",
            r, s = (t.ie6Compat ? [".%1 table.%2,", ".%1 table.%2 td, .%1 table.%2 th", "{", "border : #d3d3d3 1px dotted", "}"] : [".%1 table.%2,", ".%1 table.%2 > tr > td, .%1 table.%2 > tr > th,", ".%1 table.%2 > tbody > tr > td, .%1 table.%2 > tbody > tr > th,", ".%1 table.%2 > thead > tr > td, .%1 table.%2 > thead > tr > th,", ".%1 table.%2 > tfoot > tr > td, .%1 table.%2 > tfoot > tr > th", "{", "border : #d3d3d3 1px dotted", "}"]).join("");
        r = s.replace(/%2/g, n).replace(/%1/g, "cke_show_borders ");
        var o = {
            preserveState: !0,
            editorFocus: !1,
            readOnly: 1,
            exec: function(e) {
                this.toggleState(), this.refresh(e)
            },
            refresh: function(e) {
                if (e.document) {
                    var t = this.state == 1 ? "addClass" : "removeClass";
                    e.document.getBody()[t]("cke_show_borders")
                }
            }
        };
        f.add("showborders", {
            requires: ["wysiwygarea"],
            modes: {
                wysiwyg: 1
            },
            init: function(e) {
                var t = e.addCommand("showborders", o);
                t.canUndo = !1, e.config.startupShowBorders !== !1 && t.setState(1), e.addCss(r), e.on("mode", function() {
                    t.state != 0 && t.refresh(e)
                }, null, null, 100), e.on("contentDom", function() {
                    t.state != 0 && t.refresh(e)
                }), e.on("removeFormatCleanup", function(t) {
                    var r = t.data;
                    e.getCommand("showborders").state == 1 && r.is("table") && (!r.hasAttribute("border") || parseInt(r.getAttribute("border"), 10) <= 0) && r.addClass(n)
                })
            },
            afterInit: function(e) {
                var t = e.dataProcessor,
                    r = t && t.dataFilter,
                    i = t && t.htmlFilter;
                r && r.addRules({
                    elements: {
                        table: function(e) {
                            var t = e.attributes,
                                r = t["class"],
                                i = parseInt(t.border, 10);
                            (!i || i <= 0) && (!r || r.indexOf(n) == -1) && (t["class"] = (r || "") + " " + n)
                        }
                    }
                }), i && i.addRules({
                    elements: {
                        table: function(e) {
                            var t = e.attributes,
                                r = t["class"];
                            r && (t["class"] = r.replace(n, "").replace(/\s{2}/, " ").replace(/^\s+|\s+$/, ""))
                        }
                    }
                })
            }
        }), e.on("dialogDefinition", function(e) {
            var t = e.data.name;
            if (t == "table" || t == "tableProperties") {
                var r = e.data.definition,
                    s = r.getContents("info"),
                    o = s.get("txtBorder"),
                    u = o.commit;
                o.commit = i.override(u, function(e) {
                    return function(t, r) {
                        e.apply(this, arguments);
                        var i = parseInt(this.getValue(), 10);
                        r[!i || i <= 0 ? "addClass" : "removeClass"](n)
                    }
                });
                var a = r.getContents("advanced"),
                    f = a && a.get("advCSSClasses");
                f && (f.setup = i.override(f.setup, function(e) {
                    return function() {
                        e.apply(this, arguments), this.setValue(this.getValue().replace(/cke_show_border/, ""))
                    }
                }), f.commit = i.override(f.commit, function(e) {
                    return function(t, n) {
                        e.apply(this, arguments), parseInt(n.getAttribute("border"), 10) || n.addClass("cke_show_border")
                    }
                }))
            }
        })
    }(), f.add("sourcearea", {
        requires: ["editingblock"],
        init: function(r) {
            var i = f.sourcearea,
                s = e.document.getWindow();
            r.on("editingBlockReady", function() {
                var e, i;
                r.addMode("source", {
                    load: function(o, a) {
                        n && t.version < 8 && o.setStyle("position", "relative"), r.textarea = e = new u("textarea"), e.setAttributes({
                            dir: "ltr",
                            tabIndex: t.webkit ? -1 : r.tabIndex,
                            role: "textbox",
                            "aria-label": r.lang.editorTitle.replace("%1", r.name)
                        }), e.addClass("cke_source"), e.addClass("cke_enable_context_menu"), r.readOnly && e.setAttribute("readOnly", "readonly");
                        var f = {
                            width: t.ie7Compat ? "99%" : "100%",
                            height: "100%",
                            resize: "none",
                            outline: "none",
                            "text-align": "left"
                        };
                        n && (i = function() {
                            e.hide(), e.setStyle("height", o.$.clientHeight + "px"), e.setStyle("width", o.$.clientWidth + "px"), e.show()
                        }, r.on("resize", i), s.on("resize", i), setTimeout(i, 0)), o.setHtml(""), o.append(e), e.setStyles(f), r.fire("ariaWidget", e), e.on("blur", function() {
                            r.focusManager.blur()
                        }), e.on("focus", function() {
                            r.focusManager.focus()
                        }), r.mayBeDirty = !0, this.loadData(a);
                        var l = r.keystrokeHandler;
                        l && l.attach(e), setTimeout(function() {
                            r.mode = "source", r.fire("mode", {
                                previousMode: r._.previousMode
                            })
                        }, t.gecko || t.webkit ? 100 : 0)
                    },
                    loadData: function(t) {
                        e.setValue(t), r.fire("dataReady")
                    },
                    getData: function() {
                        return e.getValue()
                    },
                    getSnapshotData: function() {
                        return e.getValue()
                    },
                    unload: function(o) {
                        e.clearCustomData(), r.textarea = e = null, i && (r.removeListener("resize", i), s.removeListener("resize", i)), n && t.version < 8 && o.removeStyle("position")
                    },
                    focus: function() {
                        e.focus()
                    }
                })
            }), r.on("readOnly", function() {
                r.mode == "source" && (r.readOnly ? r.textarea.setAttribute("readOnly", "readonly") : r.textarea.removeAttribute("readOnly"))
            }), r.addCommand("source", i.commands.source), r.ui.addButton && r.ui.addButton("Source", {
                label: r.lang.source,
                command: "source"
            }), r.on("mode", function() {
                r.getCommand("source").setState(r.mode == "source" ? 1 : 2)
            })
        }
    }), f.sourcearea = {
        commands: {
            source: {
                modes: {
                    wysiwyg: 1,
                    source: 1
                },
                editorFocus: !1,
                readOnly: 1,
                exec: function(e) {
                    e.mode == "wysiwyg" && e.fire("saveSnapshot"), e.getCommand("source").setState(0), e.setMode(e.mode == "source" ? "wysiwyg" : "source")
                },
                canUndo: !1
            }
        }
    }, function() {
        function i(e, t) {
            var n = e.type,
                r = t.type;
            return n == r ? 0 : n == 3 ? -1 : r == 3 ? 1 : r == 1 ? 1 : -1
        }
        f.add("stylescombo", {
            requires: ["richcombo", "styles"],
            init: function(s) {
                function c(t) {
                    s.getStylesSet(function(n) {
                        if (!f.length) {
                            var r, s;
                            for (var u = 0, l = n.length; u < l; u++) {
                                var c = n[u];
                                s = c.name, r = a[s] = new e.style(c), r._name = s, r._.enterMode = o.enterMode, f.push(r)
                            }
                            f.sort(i)
                        }
                        t && t()
                    })
                }
                var o = s.config,
                    u = s.lang.stylesCombo,
                    a = {},
                    f = [],
                    l;
                s.ui.addRichCombo("Styles", {
                    label: u.label,
                    title: u.panelTitle,
                    className: "cke_styles",
                    panel: {
                        css: s.skin.editor.css.concat(o.contentsCss),
                        multiSelect: !0,
                        attributes: {
                            "aria-label": u.panelTitle
                        }
                    },
                    init: function() {
                        l = this, c(function() {
                            var e, t, n, r, i, s;
                            for (i = 0, s = f.length; i < s; i++) e = f[i], t = e._name, r = e.type, r != n && (l.startGroup(u["panelTitle" + String(r)]), n = r), l.add(t, e.type == 3 ? t : e.buildPreview(), t);
                            l.commit()
                        })
                    },
                    onClick: function(e) {
                        s.focus(), s.fire("saveSnapshot");
                        var t = a[e],
                            n = s.getSelection(),
                            i = new r.elementPath(n.getStartElement());
                        t[t.checkActive(i) ? "remove" : "apply"](s.document), s.fire("saveSnapshot")
                    },
                    onRender: function() {
                        s.on("selectionChange", function(e) {
                            var t = this.getValue(),
                                n = e.data.path,
                                r = n.elements;
                            for (var i = 0, s = r.length, o; i < s; i++) {
                                o = r[i];
                                for (var u in a) if (a[u].checkElementRemovable(o, !0)) {
                                    u != t && this.setValue(u);
                                    return
                                }
                            }
                            this.setValue("")
                        }, this)
                    },
                    onOpen: function() {
                        var e = this;
                        (n || t.webkit) && s.focus();
                        var i = s.getSelection(),
                            o = i.getSelectedElement(),
                            f = new r.elementPath(o || i.getStartElement()),
                            l = [0, 0, 0, 0];
                        e.showAll(), e.unmarkAll();
                        for (var c in a) {
                            var h = a[c],
                                v = h.type;
                            h.checkActive(f) ? e.mark(c) : v == 3 && !h.checkApplicable(f) && (e.hideItem(c), l[v]--), l[v]++
                        }
                        l[1] || e.hideGroup(u["panelTitle" + String(1)]), l[2] || e.hideGroup(u["panelTitle" + String(2)]), l[3] || e.hideGroup(u["panelTitle" + String(3)])
                    },
                    reset: function() {
                        l && (delete l._.panel, delete l._.list, l._.committed = 0, l._.items = {}, l._.state = 2), a = {}, f = [], c()
                    }
                }), s.on("instanceReady", function() {
                    c()
                })
            }
        })
    }(), f.add("table", {
        requires: ["dialog"],
        init: function(t) {
            var n = f.table,
                r = t.lang.table;
            t.addCommand("table", new e.dialogCommand("table")), t.addCommand("tableProperties", new e.dialogCommand("tableProperties")), t.ui.addButton("Table", {
                label: r.toolbar,
                command: "table"
            }), e.dialog.add("table", this.path + "dialogs/table.js"), e.dialog.add("tableProperties", this.path + "dialogs/table.js"), t.addMenuItems && t.addMenuItems({
                table: {
                    label: r.menu,
                    command: "tableProperties",
                    group: "table",
                    order: 5
                },
                tabledelete: {
                    label: r.deleteTable,
                    command: "tableDelete",
                    group: "table",
                    order: 1
                }
            }), t.on("doubleclick", function(e) {
                var t = e.data.element;
                t.is("table") && (e.data.dialog = "tableProperties")
            }), t.contextMenu && t.contextMenu.addListener(function(e, t) {
                if (!e || e.isReadOnly()) return null;
                var n = e.hasAscendant("table", 1);
                return n ? {
                    tabledelete: 2,
                    table: 2
                } : null
            })
        }
    }), function() {
        function s(e) {
            function o(e) {
                if (i.length > 0) return;
                e.type == 1 && t.test(e.getName()) && !e.getCustomData("selected_cell") && (u.setMarker(s, e, "selected_cell", !0), i.push(e))
            }
            var n = e.getRanges(),
                i = [],
                s = {};
            for (var a = 0; a < n.length; a++) {
                var f = n[a];
                if (f.collapsed) {
                    var l = f.getCommonAncestor(),
                        c = l.getAscendant("td", !0) || l.getAscendant("th", !0);
                    c && i.push(c)
                } else {
                    var p = new r.walker(f),
                        v;
                    p.guard = o;
                    while (v = p.next()) {
                        var m = v.getAscendant("td") || v.getAscendant("th");
                        m && !m.getCustomData("selected_cell") && (u.setMarker(s, m, "selected_cell", !0), i.push(m))
                    }
                }
            }
            return u.clearAllMarkers(s), i
        }
        function o(e) {
            var t = 0,
                n = e.length - 1,
                r = {},
                i, s, o;
            while (i = e[t++]) u.setMarker(r, i, "delete_cell", !0);
            t = 0;
            while (i = e[t++]) if ((s = i.getPrevious()) && !s.getCustomData("delete_cell") || (s = i.getNext()) && !s.getCustomData("delete_cell")) return u.clearAllMarkers(r), s;
            return u.clearAllMarkers(r), o = e[0].getParent(), (o = o.getPrevious()) ? o.getLast() : (o = e[n].getParent(), (o = o.getNext()) ? o.getChild(0) : null)
        }
        function a(e, t) {
            var r = s(e),
                o = r[0],
                a = o.getAscendant("table"),
                f = o.getDocument(),
                l = r[0].getParent(),
                c = l.$.rowIndex,
                p = r[r.length - 1],
                d = p.getParent().$.rowIndex + p.$.rowSpan - 1,
                v = new u(a.$.rows[d]),
                m = t ? c : d,
                g = t ? l : v,
                y = i.buildTableMap(a),
                b = y[m],
                w = t ? y[m - 1] : y[m + 1],
                E = y[0].length,
                S = f.createElement("tr");
            for (var x = 0; b[x] && x < E; x++) {
                var T;
                b[x].rowSpan > 1 && w && b[x] == w[x] ? (T = b[x], T.rowSpan += 1) : (T = (new u(b[x])).clone(), T.removeAttribute("rowSpan"), !n && T.appendBogus(), S.append(T), T = T.$), x += T.colSpan - 1
            }
            t ? S.insertBefore(g) : S.insertAfter(g)
        }
        function l(e) {
            if (e instanceof r.selection) {
                var t = s(e),
                    n = t[0],
                    o = n.getAscendant("table"),
                    a = i.buildTableMap(o),
                    f = t[0].getParent(),
                    c = f.$.rowIndex,
                    p = t[t.length - 1],
                    v = p.getParent().$.rowIndex + p.$.rowSpan - 1,
                    m = [];
                for (var g = c; g <= v; g++) {
                    var y = a[g],
                        b = new u(o.$.rows[g]);
                    for (var w = 0; w < y.length; w++) {
                        var E = new u(y[w]),
                            S = E.getParent().$.rowIndex;
                        if (E.$.rowSpan == 1) E.remove();
                        else {
                            E.$.rowSpan -= 1;
                            if (S == g) {
                                var x = a[g + 1];
                                x[w - 1] ? E.insertAfter(new u(x[w - 1])) : (new u(o.$.rows[g + 1])).append(E, 1)
                            }
                        }
                        w += E.$.colSpan - 1
                    }
                    m.push(b)
                }
                var T = o.$.rows,
                    N = new u(T[v + 1] || (c > 0 ? T[c - 1] : null) || o.$.parentNode);
                for (g = m.length; g >= 0; g--) l(m[g]);
                return N
            }
            return e instanceof u && (o = e.getAscendant("table"), o.$.rows.length == 1 ? o.remove() : e.remove()), null
        }
        function c(e, t) {
            var n = e.getParent(),
                r = n.$.cells,
                i = 0;
            for (var s = 0; s < r.length; s++) {
                var o = r[s];
                i += t ? 1 : o.colSpan;
                if (o == e.$) break
            }
            return i - 1
        }
        function p(e, t) {
            var n = t ? Infinity : 0;
            for (var r = 0; r < e.length; r++) {
                var i = c(e[r], t);
                if (t ? i < n : i > n) n = i
            }
            return n
        }
        function v(e, t) {
            var r = s(e),
                o = r[0],
                a = o.getAscendant("table"),
                f = p(r, 1),
                l = p(r),
                c = t ? f : l,
                d = i.buildTableMap(a),
                v = [],
                m = [],
                g = d.length;
            for (var y = 0; y < g; y++) {
                v.push(d[y][c]);
                var b = t ? d[y][c - 1] : d[y][c + 1];
                b && m.push(b)
            }
            for (y = 0; y < g; y++) {
                var w;
                v[y].colSpan > 1 && m.length && m[y] == v[y] ? (w = v[y], w.colSpan += 1) : (w = (new u(v[y])).clone(), w.removeAttribute("colSpan"), !n && w.appendBogus(), w[t ? "insertBefore" : "insertAfter"].call(w, new u(v[y])), w = w.$), y += w.rowSpan - 1
            }
        }
        function m(e) {
            var t = s(e),
                n = t[0],
                r = t[t.length - 1],
                o = n.getAscendant("table"),
                a = i.buildTableMap(o),
                f, l, c = [];
            for (var p = 0, d = a.length; p < d; p++) for (var v = 0, m = a[p].length; v < m; v++) a[p][v] == n.$ && (f = v), a[p][v] == r.$ && (l = v);
            for (p = f; p <= l; p++) for (v = 0; v < a.length; v++) {
                var g = a[v],
                    y = new u(o.$.rows[v]),
                    b = new u(g[p]);
                b.$ && (b.$.colSpan == 1 ? b.remove() : b.$.colSpan -= 1, v += b.$.rowSpan - 1, y.$.cells.length || c.push(y))
            }
            var w = o.$.rows[0] && o.$.rows[0].cells,
                E = new u(w[f] || (f ? w[f - 1] : o.$.parentNode));
            return c.length == d && o.remove(), E
        }
        function g(e) {
            var t = [],
                n = e[0] && e[0].getAscendant("table"),
                r, i, s, o;
            for (r = 0, i = e.length; r < i; r++) t.push(e[r].$.cellIndex);
            t.sort();
            for (r = 1, i = t.length; r < i; r++) if (t[r] - t[r - 1] > 1) {
                s = t[r - 1] + 1;
                break
            }
            s || (s = t[0] > 0 ? t[0] - 1 : t[t.length - 1] + 1);
            var a = n.$.rows;
            for (r = 0, i = a.length; r < i; r++) {
                o = a[r].cells[s];
                if (o) break
            }
            return o ? new u(o) : n.getPrevious()
        }
        function y(e, t) {
            var r = e.getStartElement(),
                i = r.getAscendant("td", 1) || r.getAscendant("th", 1);
            if (!i) return;
            var s = i.clone();
            n || s.appendBogus(), t ? s.insertBefore(i) : s.insertAfter(i)
        }
        function b(e) {
            if (e instanceof r.selection) {
                var t = s(e),
                    n = t[0] && t[0].getAscendant("table"),
                    i = o(t);
                for (var a = t.length - 1; a >= 0; a--) b(t[a]);
                i ? E(i, !0) : n && n.remove()
            } else if (e instanceof u) {
                var f = e.getParent();
                f.getChildCount() == 1 ? f.remove() : e.remove()
            }
        }
        function w(e) {
            var t = e.getBogus();
            t && t.remove(), e.trim()
        }
        function E(e, t) {
            var n = new r.range(e.getDocument());
            n["moveToElementEdit" + (t ? "End" : "Start")](e) || (n.selectNodeContents(e), n.collapse(t ? !1 : !0)), n.select(!0)
        }
        function S(e, t, n) {
            var r = e[t];
            if (typeof n == "undefined") return r;
            for (var i = 0; r && i < r.length; i++) {
                if (n.is && r[i] == n.$) return i;
                if (i == n) return new u(r[i])
            }
            return n.is ? -1 : null
        }
        function x(e, t) {
            var n = [];
            for (var r = 0; r < e.length; r++) {
                var i = e[r];
                n.push(i[t]), i[t].rowSpan > 1 && (r += i[t].rowSpan - 1)
            }
            return n
        }
        function T(e, t, o) {
            var a = s(e),
                f;
            if ((t ? a.length != 1 : a.length < 2) || (f = e.getCommonAncestor()) && f.type == 1 && f.is("table")) return !1;
            var l, c = a[0],
                p = c.getAscendant("table"),
                v = i.buildTableMap(p),
                m = v.length,
                g = v[0].length,
                y = c.getParent().$.rowIndex,
                b = S(v, y, c);
            if (t) {
                var E;
                try {
                    var x = parseInt(c.getAttribute("rowspan"), 10) || 1,
                        T = parseInt(c.getAttribute("colspan"), 10) || 1;
                    E = v[t == "up" ? y - x : t == "down" ? y + x : y][t == "left" ? b - T : t == "right" ? b + T : b]
                } catch (N) {
                    return !1
                }
                if (!E || c.$ == E) return !1;
                a[t == "up" || t == "left" ? "unshift" : "push"](new u(E))
            }
            var C = c.getDocument(),
                k = y,
                L = 0,
                O = 0,
                M = !o && new r.documentFragment(C),
                _ = 0;
            for (var D = 0; D < a.length; D++) {
                l = a[D];
                var P = l.getParent(),
                    H = l.getFirst(),
                    B = l.$.colSpan,
                    j = l.$.rowSpan,
                    F = P.$.rowIndex,
                    I = S(v, F, l);
                _ += B * j, O = Math.max(O, I - b + B), L = Math.max(L, F - y + j);
                if (!o) {
                    if (w(l), l.getChildren().count()) {
                        if (F != k && H && (!H.isBlockBoundary || !H.isBlockBoundary({
                            br: 1
                        }))) {
                            var q = M.getLast(r.walker.whitespaces(!0));
                            q && (!q.is || !q.is("br")) && M.append("br")
                        }
                        l.moveChildren(M)
                    }
                    D ? l.remove() : l.setHtml("")
                }
                k = F
            }
            if (!o) {
                M.moveChildren(c), n || c.appendBogus(), O >= g ? c.removeAttribute("rowSpan") : c.$.rowSpan = L, L >= m ? c.removeAttribute("colSpan") : c.$.colSpan = O;
                var R = new r.nodeList(p.$.rows),
                    U = R.count();
                for (D = U - 1; D >= 0; D--) {
                    var z = R.getItem(D);
                    if (!z.$.cells.length) {
                        z.remove(), U++;
                        continue
                    }
                }
                return c
            }
            return L * O == _
        }
        function N(e, t) {
            var r = s(e);
            if (r.length > 1) return !1;
            if (t) return !0;
            var o = r[0],
                a = o.getParent(),
                f = a.getAscendant("table"),
                l = i.buildTableMap(f),
                c = a.$.rowIndex,
                p = S(l, c, o),
                d = o.$.rowSpan,
                v, m, g, y;
            if (d > 1) {
                m = Math.ceil(d / 2), g = Math.floor(d / 2), y = c + m;
                var b = new u(f.$.rows[y]),
                    w = S(l, y),
                    E;
                v = o.clone();
                for (var x = 0; x < w.length; x++) {
                    E = w[x];
                    if (E.parentNode == b.$ && x > p) {
                        v.insertBefore(new u(E));
                        break
                    }
                    E = null
                }
                E || b.append(v, !0)
            } else {
                g = m = 1, b = a.clone(), b.insertAfter(a), b.append(v = o.clone());
                var T = S(l, c);
                for (var N = 0; N < T.length; N++) T[N].rowSpan++
            }
            return n || v.appendBogus(), o.$.rowSpan = m, v.$.rowSpan = g, m == 1 && o.removeAttribute("rowSpan"), g == 1 && v.removeAttribute("rowSpan"), v
        }
        function C(e, t) {
            var r = s(e);
            if (r.length > 1) return !1;
            if (t) return !0;
            var o = r[0],
                u = o.getParent(),
                a = u.getAscendant("table"),
                f = i.buildTableMap(a),
                l = u.$.rowIndex,
                c = S(f, l, o),
                h = o.$.colSpan,
                p, d, v;
            if (h > 1) d = Math.ceil(h / 2), v = Math.floor(h / 2);
            else {
                v = d = 1;
                var m = x(f, c);
                for (var g = 0; g < m.length; g++) m[g].colSpan++
            }
            return p = o.clone(), p.insertAfter(o), n || p.appendBogus(), o.$.colSpan = d, p.$.colSpan = v, d == 1 && o.removeAttribute("colSpan"), v == 1 && p.removeAttribute("colSpan"), p
        }
        var t = /^(?:td|th)$/,
            k = {
                thead: 1,
                tbody: 1,
                tfoot: 1,
                td: 1,
                tr: 1,
                th: 1
            };
        f.tabletools = {
            requires: ["table", "dialog", "contextmenu"],
            init: function(t) {
                var n = t.lang.table;
                t.addCommand("cellProperties", new e.dialogCommand("cellProperties")), e.dialog.add("cellProperties", this.path + "dialogs/tableCell.js"), t.addCommand("tableDelete", {
                    exec: function(e) {
                        var t = e.getSelection(),
                            n = t && t.getStartElement(),
                            i = n && n.getAscendant("table", 1);
                        if (!i) return;
                        var s = i.getParent();
                        s.getChildCount() == 1 && !s.is("body", "td", "th") && (i = s);
                        var o = new r.range(e.document);
                        o.moveToPosition(i, 3), i.remove(), o.select()
                    }
                }), t.addCommand("rowDelete", {
                    exec: function(e) {
                        var t = e.getSelection();
                        E(l(t))
                    }
                }), t.addCommand("rowInsertBefore", {
                    exec: function(e) {
                        var t = e.getSelection();
                        a(t, !0)
                    }
                }), t.addCommand("rowInsertAfter", {
                    exec: function(e) {
                        var t = e.getSelection();
                        a(t)
                    }
                }), t.addCommand("columnDelete", {
                    exec: function(e) {
                        var t = e.getSelection(),
                            n = m(t);
                        n && E(n, !0)
                    }
                }), t.addCommand("columnInsertBefore", {
                    exec: function(e) {
                        var t = e.getSelection();
                        v(t, !0)
                    }
                }), t.addCommand("columnInsertAfter", {
                    exec: function(e) {
                        var t = e.getSelection();
                        v(t)
                    }
                }), t.addCommand("cellDelete", {
                    exec: function(e) {
                        var t = e.getSelection();
                        b(t)
                    }
                }), t.addCommand("cellMerge", {
                    exec: function(e) {
                        E(T(e.getSelection()), !0)
                    }
                }), t.addCommand("cellMergeRight", {
                    exec: function(e) {
                        E(T(e.getSelection(), "right"), !0)
                    }
                }), t.addCommand("cellMergeDown", {
                    exec: function(e) {
                        E(T(e.getSelection(), "down"), !0)
                    }
                }), t.addCommand("cellVerticalSplit", {
                    exec: function(e) {
                        E(N(e.getSelection()))
                    }
                }), t.addCommand("cellHorizontalSplit", {
                    exec: function(e) {
                        E(C(e.getSelection()))
                    }
                }), t.addCommand("cellInsertBefore", {
                    exec: function(e) {
                        var t = e.getSelection();
                        y(t, !0)
                    }
                }), t.addCommand("cellInsertAfter", {
                    exec: function(e) {
                        var t = e.getSelection();
                        y(t)
                    }
                }), t.addMenuItems && t.addMenuItems({
                    tablecell: {
                        label: n.cell.menu,
                        group: "tablecell",
                        order: 1,
                        getItems: function() {
                            var e = t.getSelection(),
                                n = s(e);
                            return {
                                tablecell_insertBefore: 2,
                                tablecell_insertAfter: 2,
                                tablecell_delete: 2,
                                tablecell_merge: T(e, null, !0) ? 2 : 0,
                                tablecell_merge_right: T(e, "right", !0) ? 2 : 0,
                                tablecell_merge_down: T(e, "down", !0) ? 2 : 0,
                                tablecell_split_vertical: N(e, !0) ? 2 : 0,
                                tablecell_split_horizontal: C(e, !0) ? 2 : 0,
                                tablecell_properties: n.length > 0 ? 2 : 0
                            }
                        }
                    },
                    tablecell_insertBefore: {
                        label: n.cell.insertBefore,
                        group: "tablecell",
                        command: "cellInsertBefore",
                        order: 5
                    },
                    tablecell_insertAfter: {
                        label: n.cell.insertAfter,
                        group: "tablecell",
                        command: "cellInsertAfter",
                        order: 10
                    },
                    tablecell_delete: {
                        label: n.cell.deleteCell,
                        group: "tablecell",
                        command: "cellDelete",
                        order: 15
                    },
                    tablecell_merge: {
                        label: n.cell.merge,
                        group: "tablecell",
                        command: "cellMerge",
                        order: 16
                    },
                    tablecell_merge_right: {
                        label: n.cell.mergeRight,
                        group: "tablecell",
                        command: "cellMergeRight",
                        order: 17
                    },
                    tablecell_merge_down: {
                        label: n.cell.mergeDown,
                        group: "tablecell",
                        command: "cellMergeDown",
                        order: 18
                    },
                    tablecell_split_horizontal: {
                        label: n.cell.splitHorizontal,
                        group: "tablecell",
                        command: "cellHorizontalSplit",
                        order: 19
                    },
                    tablecell_split_vertical: {
                        label: n.cell.splitVertical,
                        group: "tablecell",
                        command: "cellVerticalSplit",
                        order: 20
                    },
                    tablecell_properties: {
                        label: n.cell.title,
                        group: "tablecellproperties",
                        command: "cellProperties",
                        order: 21
                    },
                    tablerow: {
                        label: n.row.menu,
                        group: "tablerow",
                        order: 1,
                        getItems: function() {
                            return {
                                tablerow_insertBefore: 2,
                                tablerow_insertAfter: 2,
                                tablerow_delete: 2
                            }
                        }
                    },
                    tablerow_insertBefore: {
                        label: n.row.insertBefore,
                        group: "tablerow",
                        command: "rowInsertBefore",
                        order: 5
                    },
                    tablerow_insertAfter: {
                        label: n.row.insertAfter,
                        group: "tablerow",
                        command: "rowInsertAfter",
                        order: 10
                    },
                    tablerow_delete: {
                        label: n.row.deleteRow,
                        group: "tablerow",
                        command: "rowDelete",
                        order: 15
                    },
                    tablecolumn: {
                        label: n.column.menu,
                        group: "tablecolumn",
                        order: 1,
                        getItems: function() {
                            return {
                                tablecolumn_insertBefore: 2,
                                tablecolumn_insertAfter: 2,
                                tablecolumn_delete: 2
                            }
                        }
                    },
                    tablecolumn_insertBefore: {
                        label: n.column.insertBefore,
                        group: "tablecolumn",
                        command: "columnInsertBefore",
                        order: 5
                    },
                    tablecolumn_insertAfter: {
                        label: n.column.insertAfter,
                        group: "tablecolumn",
                        command: "columnInsertAfter",
                        order: 10
                    },
                    tablecolumn_delete: {
                        label: n.column.deleteColumn,
                        group: "tablecolumn",
                        command: "columnDelete",
                        order: 15
                    }
                }), t.contextMenu && t.contextMenu.addListener(function(e, t) {
                    if (!e || e.isReadOnly()) return null;
                    while (e) {
                        if (e.getName() in k) return {
                            tablecell: 2,
                            tablerow: 2,
                            tablecolumn: 2
                        };
                        e = e.getParent()
                    }
                    return null
                })
            },
            getSelectedCells: s
        }, f.add("tabletools", f.tabletools)
    }(), i.buildTableMap = function(e) {
        var t = e.$.rows,
            n = -1,
            r = [];
        for (var i = 0; i < t.length; i++) {
            n++, !r[n] && (r[n] = []);
            var s = -1;
            for (var o = 0; o < t[i].cells.length; o++) {
                var u = t[i].cells[o];
                s++;
                while (r[n][s]) s++;
                var a = isNaN(u.colSpan) ? 1 : u.colSpan,
                    f = isNaN(u.rowSpan) ? 1 : u.rowSpan;
                for (var l = 0; l < f; l++) {
                    r[n + l] || (r[n + l] = []);
                    for (var c = 0; c < a; c++) r[n + l][s + c] = t[i].cells[o]
                }
                s += a - 1
            }
        }
        return r
    }, f.add("specialchar", {
        requires: ["dialog"],
        availableLangs: {
            cs: 1,
            cy: 1,
            de: 1,
            el: 1,
            en: 1,
            eo: 1,
            et: 1,
            fa: 1,
            fi: 1,
            fr: 1,
            he: 1,
            hr: 1,
            it: 1,
            nb: 1,
            nl: 1,
            no: 1,
            "pt-br": 1,
            tr: 1,
            ug: 1,
            "zh-cn": 1
        },
        init: function(t) {
            var n = "specialchar",
                r = this;
            e.dialog.add(n, this.path + "dialogs/specialchar.js"), t.addCommand(n, {
                exec: function() {
                    var s = t.langCode;
                    s = r.availableLangs[s] ? s : "en", e.scriptLoader.load(e.getUrl(r.path + "lang/" + s + ".js"), function() {
                        i.extend(t.lang.specialChar, r.langEntries[s]), t.openDialog(n)
                    })
                },
                modes: {
                    wysiwyg: 1
                },
                canUndo: !1
            }), t.ui.addButton("SpecialChar", {
                label: t.lang.specialChar.toolbar,
                command: n
            })
        }
    }), a.specialChars = ["!", "&quot;", "#", "$", "%", "&amp;", "'", "(", ")", "*", "+", "-", ".", "/", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ":", ";", "&lt;", "=", "&gt;", "?", "@", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "[", "]", "^", "_", "`", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "{", "|", "}", "~", "&euro;", "&lsquo;", "&rsquo;", "&ldquo;", "&rdquo;", "&ndash;", "&mdash;", "&iexcl;", "&cent;", "&pound;", "&curren;", "&yen;", "&brvbar;", "&sect;", "&uml;", "&copy;", "&ordf;", "&laquo;", "&not;", "&reg;", "&macr;", "&deg;", "&sup2;", "&sup3;", "&acute;", "&micro;", "&para;", "&middot;", "&cedil;", "&sup1;", "&ordm;", "&raquo;", "&frac14;", "&frac12;", "&frac34;", "&iquest;", "&Agrave;", "&Aacute;", "&Acirc;", "&Atilde;", "&Auml;", "&Aring;", "&AElig;", "&Ccedil;", "&Egrave;", "&Eacute;", "&Ecirc;", "&Euml;", "&Igrave;", "&Iacute;", "&Icirc;", "&Iuml;", "&ETH;", "&Ntilde;", "&Ograve;", "&Oacute;", "&Ocirc;", "&Otilde;", "&Ouml;", "&times;", "&Oslash;", "&Ugrave;", "&Uacute;", "&Ucirc;", "&Uuml;", "&Yacute;", "&THORN;", "&szlig;", "&agrave;", "&aacute;", "&acirc;", "&atilde;", "&auml;", "&aring;", "&aelig;", "&ccedil;", "&egrave;", "&eacute;", "&ecirc;", "&euml;", "&igrave;", "&iacute;", "&icirc;", "&iuml;", "&eth;", "&ntilde;", "&ograve;", "&oacute;", "&ocirc;", "&otilde;", "&ouml;", "&divide;", "&oslash;", "&ugrave;", "&uacute;", "&ucirc;", "&uuml;", "&yacute;", "&thorn;", "&yuml;", "&OElig;", "&oelig;", "&#372;", "&#374", "&#373", "&#375;", "&sbquo;", "&#8219;", "&bdquo;", "&hellip;", "&trade;", "&#9658;", "&bull;", "&rarr;", "&rArr;", "&hArr;", "&diams;", "&asymp;"], function() {
        function a(e) {
            return {
                editorFocus: !1,
                canUndo: !1,
                modes: {
                    wysiwyg: 1
                },
                exec: function(t) {
                    if (t.focusManager.hasFocus) {
                        var s = t.getSelection(),
                            o = s.getCommonAncestor(),
                            a;
                        if (a = o.getAscendant("td", !0) || o.getAscendant("th", !0)) {
                            var f = new r.range(t.document),
                                l = i.tryThese(function() {
                                    var t = a.getParent(),
                                        n = t.$.cells[a.$.cellIndex + (e ? -1 : 1)];
                                    return n.parentNode.parentNode, n
                                }, function() {
                                    var t = a.getParent(),
                                        n = t.getAscendant("table"),
                                        r = n.$.rows[t.$.rowIndex + (e ? -1 : 1)];
                                    return r.cells[e ? r.cells.length - 1 : 0]
                                });
                            if (!l && !e) {
                                var c = a.getAscendant("table").$,
                                    p = a.getParent().$.cells,
                                    v = new u(c.insertRow(-1), t.document);
                                for (var m = 0, g = p.length; m < g; m++) {
                                    var y = v.append((new u(p[m], t.document)).clone(!1, !1));
                                    !n && y.appendBogus()
                                }
                                f.moveToElementEditStart(v)
                            } else {
                                if (!l) return !0;
                                l = new u(l), f.moveToElementEditStart(l), (!f.checkStartOfBlock() || !f.checkEndOfBlock()) && f.selectNodeContents(l)
                            }
                            return f.select(!0), !0
                        }
                    }
                    return !1
                }
            }
        }
        var e = {
            editorFocus: !1,
            modes: {
                wysiwyg: 1,
                source: 1
            }
        },
            s = {
                exec: function(e) {
                    e.container.focusNext(!0, e.tabIndex)
                }
            },
            o = {
                exec: function(e) {
                    e.container.focusPrevious(!0, e.tabIndex)
                }
            };
        f.add("tab", {
            requires: ["keystrokes"],
            init: function(n) {
                var r = n.config.enableTabKeyTools !== !1,
                    u = n.config.tabSpaces || 0,
                    f = "";
                while (u--) f += "Â ";
                f && n.on("key", function(e) {
                    e.data.keyCode == 9 && (n.insertHtml(f), e.cancel())
                }), r && n.on("key", function(e) {
                    (e.data.keyCode == 9 && n.execCommand("selectNextCell") || e.data.keyCode == 2228224 + 9 && n.execCommand("selectPreviousCell")) && e.cancel()
                }), (t.webkit || t.gecko) && n.on("key", function(e) {
                    var t = e.data.keyCode;
                    t == 9 && !f && (e.cancel(), n.execCommand("blur")), t == 2228224 + 9 && (n.execCommand("blurBack"), e.cancel())
                }), n.addCommand("blur", i.extend(s, e)), n.addCommand("blurBack", i.extend(o, e)), n.addCommand("selectNextCell", a()), n.addCommand("selectPreviousCell", a(!0))
            }
        })
    }(), u.prototype.focusNext = function(e, t) {
        var n = this,
            r = n.$,
            i = t === undefined ? n.getTabIndex() : t,
            s, o, u, a, f, l;
        if (i <= 0) {
            f = n.getNextSourceNode(e, 1);
            while (f) {
                if (f.isVisible() && f.getTabIndex() === 0) {
                    u = f;
                    break
                }
                f = f.getNextSourceNode(!1, 1)
            }
        } else {
            f = n.getDocument().getBody().getFirst();
            while (f = f.getNextSourceNode(!1, 1)) {
                if (!s) if (!o && f.equals(n)) {
                    o = !0;
                    if (e) {
                        if (!(f = f.getNextSourceNode(!0, 1))) break;
                        s = 1
                    }
                } else o && !n.contains(f) && (s = 1);
                if (!f.isVisible() || (l = f.getTabIndex()) < 0) continue;
                if (s && l == i) {
                    u = f;
                    break
                }
                l > i && (!u || !a || l < a) ? (u = f, a = l) : !u && l === 0 && (u = f, a = l)
            }
        }
        u && u.focus()
    }, u.prototype.focusPrevious = function(e, t) {
        var n = this,
            r = n.$,
            i = t === undefined ? n.getTabIndex() : t,
            s, o, u, a = 0,
            f, l = n.getDocument().getBody().getLast();
        while (l = l.getPreviousSourceNode(!1, 1)) {
            if (!s) if (!o && l.equals(n)) {
                o = !0;
                if (e) {
                    if (!(l = l.getPreviousSourceNode(!0, 1))) break;
                    s = 1
                }
            } else o && !n.contains(l) && (s = 1);
            if (!l.isVisible() || (f = l.getTabIndex()) < 0) continue;
            if (i <= 0) {
                if (s && f === 0) {
                    u = l;
                    break
                }
                f > a && (u = l, a = f)
            } else {
                if (s && f == i) {
                    u = l;
                    break
                }
                f < i && (!u || f > a) && (u = l, a = f)
            }
        }
        u && u.focus()
    }, function() {
        f.add("templates", {
            requires: ["dialog"],
            init: function(t) {
                e.dialog.add("templates", e.getUrl(this.path + "dialogs/templates.js")), t.addCommand("templates", new e.dialogCommand("templates")), t.ui.addButton("Templates", {
                    label: t.lang.templates.button,
                    command: "templates"
                })
            }
        });
        var t = {},
            n = {};
        e.addTemplates = function(e, n) {
            t[e] = n
        }, e.getTemplates = function(e) {
            return t[e]
        }, e.loadTemplates = function(t, r) {
            var i = [];
            for (var s = 0, o = t.length; s < o; s++) n[t[s]] || (i.push(t[s]), n[t[s]] = 1);
            i.length ? e.scriptLoader.load(i, r) : setTimeout(r, 0)
        }
    }(), a.templates_files = [e.getUrl("plugins/templates/templates/default.js")], a.templates_replaceContent = !0, function() {
        var r = function() {
                this.toolbars = [], this.focusCommandExecuted = !1
            };
        r.prototype.focus = function() {
            for (var e = 0, t; t = this.toolbars[e++];) for (var n = 0, r; r = t.items[n++];) if (r.focus) {
                r.focus();
                return
            }
        };
        var s = {
            toolbarFocus: {
                modes: {
                    wysiwyg: 1,
                    source: 1
                },
                readOnly: 1,
                exec: function(e) {
                    e.toolbox && (e.toolbox.focusCommandExecuted = !0, n || t.air ? setTimeout(function() {
                        e.toolbox.focus()
                    }, 100) : e.toolbox.focus())
                }
            }
        };
        f.add("toolbar", {
            requires: ["button"],
            init: function(t) {
                var n, o = function(e, r) {
                        var i, s, u = t.lang.dir == "rtl",
                            a = t.config.toolbarGroupCycling;
                        a = a === undefined || a;
                        switch (r) {
                        case 9:
                        case 2228233:
                            while (!s || !s.items.length) {
                                s = r == 9 ? (s ? s.next : e.toolbar.next) || t.toolbox.toolbars[0] : (s ? s.previous : e.toolbar.previous) || t.toolbox.toolbars[t.toolbox.toolbars.length - 1];
                                if (s.items.length) {
                                    e = s.items[n ? s.items.length - 1 : 0];
                                    while (e && !e.focus) e = n ? e.previous : e.next, e || (s = 0)
                                }
                            }
                            return e && e.focus(), !1;
                        case u ? 37:
                            39 : case 40:
                            i = e;
                            do i = i.next, !i && a && (i = e.toolbar.items[0]);
                            while (i && !i.focus);
                            return i ? i.focus() : o(e, 9), !1;
                        case u ? 39:
                            37 : case 38:
                            i = e;
                            do i = i.previous, !i && a && (i = e.toolbar.items[e.toolbar.items.length - 1]);
                            while (i && !i.focus);
                            return i ? i.focus() : (n = 1, o(e, 2228233), n = 0), !1;
                        case 27:
                            return t.focus(), !1;
                        case 13:
                        case 32:
                            return e.execute(), !1
                        }
                        return !0
                    };
                t.on("themeSpace", function(n) {
                    if (n.data.space == t.config.toolbarLocation) {
                        t.toolbox = new r;
                        var s = i.getNextId(),
                            u = ['<div class="cke_toolbox" role="group" aria-labelledby="', s, '" onmousedown="return false;"'],
                            a = t.config.toolbarStartupExpanded !== !1,
                            f;
                        u.push(a ? ">" : ' style="display:none">'), u.push('<span id="', s, '" class="cke_voice_label">', t.lang.toolbars, "</span>");
                        var l = t.toolbox.toolbars,
                            c = t.config.toolbar instanceof Array ? t.config.toolbar : t.config["toolbar_" + t.config.toolbar];
                        for (var h = 0; h < c.length; h++) {
                            var p, d = 0,
                                v, g = c[h],
                                y;
                            if (!g) continue;
                            f && (u.push("</div>"), f = 0);
                            if (g === "/") {
                                u.push('<div class="cke_break"></div>');
                                continue
                            }
                            y = g.items || g;
                            for (var b = 0; b < y.length; b++) {
                                var w, E = y[b],
                                    S;
                                w = t.ui.create(E);
                                if (w) {
                                    S = w.canGroup !== !1;
                                    if (!d) {
                                        p = i.getNextId(), d = {
                                            id: p,
                                            items: []
                                        }, v = g.name && (t.lang.toolbarGroups[g.name] || g.name), u.push('<span id="', p, '" class="cke_toolbar"', v ? ' aria-labelledby="' + p + '_label"' : "", ' role="toolbar">'), v && u.push('<span id="', p, '_label" class="cke_voice_label">', v, "</span>"), u.push('<span class="cke_toolbar_start"></span>');
                                        var x = l.push(d) - 1;
                                        x > 0 && (d.previous = l[x - 1], d.previous.next = d)
                                    }
                                    S ? f || (u.push('<span class="cke_toolgroup" role="presentation">'), f = 1) : f && (u.push("</span>"), f = 0);
                                    var T = w.render(t, u);
                                    x = d.items.push(T) - 1, x > 0 && (T.previous = d.items[x - 1], T.previous.next = T), T.toolbar = d, T.onkey = o, T.onfocus = function() {
                                        t.toolbox.focusCommandExecuted || t.focus()
                                    }
                                }
                            }
                            f && (u.push("</span>"), f = 0), d && u.push('<span class="cke_toolbar_end"></span></span>')
                        }
                        u.push("</div>");
                        if (t.config.toolbarCanCollapse) {
                            var N = i.addFunction(function() {
                                t.execCommand("toolbarCollapse")
                            });
                            t.on("destroy", function() {
                                i.removeFunction(N)
                            });
                            var C = i.getNextId();
                            t.addCommand("toolbarCollapse", {
                                readOnly: 1,
                                exec: function(t) {
                                    var n = e.document.getById(C),
                                        r = n.getPrevious(),
                                        i = t.getThemeSpace("contents"),
                                        s = r.getParent(),
                                        o = parseInt(i.$.style.height, 10),
                                        u = s.$.offsetHeight,
                                        a = !r.isVisible();
                                    a ? (r.show(), n.removeClass("cke_toolbox_collapser_min"), n.setAttribute("title", t.lang.toolbarCollapse)) : (r.hide(), n.addClass("cke_toolbox_collapser_min"), n.setAttribute("title", t.lang.toolbarExpand)), n.getFirst().setText(a ? "â–²" : "â—€");
                                    var f = s.$.offsetHeight - u;
                                    i.setStyle("height", o - f + "px"), t.fire("resize")
                                },
                                modes: {
                                    wysiwyg: 1,
                                    source: 1
                                }
                            }), u.push('<a title="' + (a ? t.lang.toolbarCollapse : t.lang.toolbarExpand) + '" id="' + C + '" tabIndex="-1" class="cke_toolbox_collapser'), a || u.push(" cke_toolbox_collapser_min"), u.push('" onclick="CKEDITOR.tools.callFunction(' + N + ')">', "<span>&#9650;</span>", "</a>")
                        }
                        n.data.html += u.join("")
                    }
                }), t.on("destroy", function() {
                    var e, t = 0,
                        n, r, s;
                    e = this.toolbox.toolbars;
                    for (; t < e.length; t++) {
                        r = e[t].items;
                        for (n = 0; n < r.length; n++) s = r[n], s.clickFn && i.removeFunction(s.clickFn), s.keyDownFn && i.removeFunction(s.keyDownFn)
                    }
                }), t.addCommand("toolbarFocus", s.toolbarFocus), t.ui.add("-", e.UI_SEPARATOR, {}), t.ui.addHandler(e.UI_SEPARATOR, {
                    create: function() {
                        return {
                            render: function(e, t) {
                                return t.push('<span class="cke_separator" role="separator"></span>'), {}
                            }
                        }
                    }
                })
            }
        })
    }(), e.UI_SEPARATOR = "separator", a.toolbarLocation = "top", a.toolbar_Basic = [
        ["Bold", "Italic", "-", "NumberedList", "BulletedList", "-", "Link", "Unlink", "-", "About"]
    ], a.toolbar_Full = [{
        name: "document",
        items: ["Source", "-", "Save", "NewPage", "DocProps", "Preview", "Print", "-", "Templates"]
    }, {
        name: "clipboard",
        items: ["Cut", "Copy", "Paste", "PasteText", "PasteFromWord", "-", "Undo", "Redo"]
    }, {
        name: "editing",
        items: ["Find", "Replace", "-", "SelectAll", "-", "SpellChecker", "Scayt"]
    }, {
        name: "forms",
        items: ["Form", "Checkbox", "Radio", "TextField", "Textarea", "Select", "Button", "ImageButton", "HiddenField"]
    }, "/",
    {
        name: "basicstyles",
        items: ["Bold", "Italic", "Underline", "Strike", "Subscript", "Superscript", "-", "RemoveFormat"]
    }, {
        name: "paragraph",
        items: ["NumberedList", "BulletedList", "-", "Outdent", "Indent", "-", "Blockquote", "CreateDiv", "-", "JustifyLeft", "JustifyCenter", "JustifyRight", "JustifyBlock", "-", "BidiLtr", "BidiRtl"]
    }, {
        name: "links",
        items: ["Link", "Unlink", "Anchor"]
    }, {
        name: "insert",
        items: ["Image", "Flash", "Table", "HorizontalRule", "Smiley", "SpecialChar", "PageBreak", "Iframe"]
    }, "/",
    {
        name: "styles",
        items: ["Styles", "Format", "Font", "FontSize"]
    }, {
        name: "colors",
        items: ["TextColor", "BGColor"]
    }, {
        name: "tools",
        items: ["Maximize", "ShowBlocks", "-", "About"]
    }], a.toolbar = "Full", a.toolbarCanCollapse = !0, function() {
        function s(e) {
            this.editor = e, this.reset()
        }
        f.add("undo", {
            requires: ["selection", "wysiwygarea"],
            init: function(e) {
                function i(e) {
                    t.enabled && e.data.command.canUndo !== !1 && t.save()
                }
                var t = new s(e),
                    n = e.addCommand("undo", {
                        exec: function() {
                            t.undo() && (e.selectionChange(), this.fire("afterUndo"))
                        },
                        state: 0,
                        canUndo: !1
                    }),
                    r = e.addCommand("redo", {
                        exec: function() {
                            t.redo() && (e.selectionChange(), this.fire("afterRedo"))
                        },
                        state: 0,
                        canUndo: !1
                    });
                t.onChange = function() {
                    n.setState(t.undoable() ? 2 : 0), r.setState(t.redoable() ? 2 : 0)
                }, e.on("beforeCommandExec", i), e.on("afterCommandExec", i), e.on("saveSnapshot", function(e) {
                    t.save(e.data && e.data.contentOnly)
                }), e.on("contentDom", function() {
                    e.document.on("keydown", function(e) {
                        !e.data.$.ctrlKey && !e.data.$.metaKey && t.type(e)
                    })
                }), e.on("beforeModeUnload", function() {
                    e.mode == "wysiwyg" && t.save(!0)
                }), e.on("mode", function() {
                    t.enabled = e.readOnly ? !1 : e.mode == "wysiwyg", t.onChange()
                }), e.ui.addButton("Undo", {
                    label: e.lang.undo,
                    command: "undo"
                }), e.ui.addButton("Redo", {
                    label: e.lang.redo,
                    command: "redo"
                }), e.resetUndo = function() {
                    t.reset(), e.fire("saveSnapshot")
                }, e.on("updateSnapshot", function() {
                    t.currentImage && t.update()
                })
            }
        }), f.undo = {};
        var e = f.undo.Image = function(e) {
                this.editor = e, e.fire("beforeUndoImage");
                var t = e.getSnapshot(),
                    r = t && e.getSelection();
                n && t && (t = t.replace(/\s+data-cke-expando=".*?"/g, "")), this.contents = t, this.bookmarks = r && r.createBookmarks2(!0), e.fire("afterUndoImage")
            },
            r = /\b(?:href|src|name)="[^"]*?"/gi;
        e.prototype = {
            equals: function(e, s) {
                var o = this.contents,
                    u = e.contents;
                n && (t.ie7Compat || t.ie6Compat) && (o = o.replace(r, ""), u = u.replace(r, ""));
                if (o != u) return !1;
                if (s) return !0;
                var a = this.bookmarks,
                    f = e.bookmarks;
                if (a || f) {
                    if (!a || !f || a.length != f.length) return !1;
                    for (var l = 0; l < a.length; l++) {
                        var c = a[l],
                            h = f[l];
                        if (c.startOffset != h.startOffset || c.endOffset != h.endOffset || !i.arrayCompare(c.start, h.start) || !i.arrayCompare(c.end, h.end)) return !1
                    }
                }
                return !0
            }
        };
        var o = {
            8: 1,
            46: 1
        },
            u = {
                16: 1,
                17: 1,
                18: 1
            },
            a = {
                37: 1,
                38: 1,
                39: 1,
                40: 1
            };
        s.prototype = {
            type: function(t) {
                var r = t && t.data.getKey(),
                    s = r in u,
                    f = r in o,
                    l = this.lastKeystroke in o,
                    c = f && r == this.lastKeystroke,
                    h = r in a,
                    d = this.lastKeystroke in a,
                    v = !f && !h,
                    g = f && !c,
                    y = !s && !this.typing || v && (l || d);
                if (y || g) {
                    var b = new e(this.editor),
                        w = this.snapshots.length;
                    i.setTimeout(function() {
                        var e = this,
                            t = e.editor.getSnapshot();
                        n && (t = t.replace(/\s+data-cke-expando=".*?"/g, "")), b.contents != t && w == e.snapshots.length && (e.typing = !0, e.save(!1, b, !1) || e.snapshots.splice(e.index + 1, e.snapshots.length - e.index - 1), e.hasUndo = !0, e.hasRedo = !1, e.typesCount = 1, e.modifiersCount = 1, e.onChange())
                    }, 0, this)
                }
                this.lastKeystroke = r, f ? (this.typesCount = 0, this.modifiersCount++, this.modifiersCount > 25 && (this.save(!1, null, !1), this.modifiersCount = 1)) : h || (this.modifiersCount = 0, this.typesCount++, this.typesCount > 25 && (this.save(!1, null, !1), this.typesCount = 1))
            },
            reset: function() {
                var e = this;
                e.lastKeystroke = 0, e.snapshots = [], e.index = -1, e.limit = e.editor.config.undoStackSize || 20, e.currentImage = null, e.hasUndo = !1, e.hasRedo = !1, e.resetType()
            },
            resetType: function() {
                var e = this;
                e.typing = !1, delete e.lastKeystroke, e.typesCount = 0, e.modifiersCount = 0
            },
            fireChange: function() {
                var e = this;
                e.hasUndo = !! e.getNextImage(!0), e.hasRedo = !! e.getNextImage(!1), e.resetType(), e.onChange()
            },
            save: function(t, n, r) {
                var i = this,
                    s = i.snapshots;
                return n || (n = new e(i.editor)), n.contents === !1 ? !1 : i.currentImage && n.equals(i.currentImage, t) ? !1 : (s.splice(i.index + 1, s.length - i.index - 1), s.length == i.limit && s.shift(), i.index = s.push(n) - 1, i.currentImage = n, r !== !1 && i.fireChange(), !0)
            },
            restoreImage: function(e) {
                var t = this,
                    r = t.editor,
                    i;
                e.bookmarks && (r.focus(), i = r.getSelection()), t.editor.loadSnapshot(e.contents);
                if (e.bookmarks) i.selectBookmarks(e.bookmarks);
                else if (n) {
                    var s = t.editor.document.getBody().$.createTextRange();
                    s.collapse(!0), s.select()
                }
                t.index = e.index, t.update(), t.fireChange()
            },
            getNextImage: function(e) {
                var t = this,
                    n = t.snapshots,
                    r = t.currentImage,
                    i, s;
                if (r) if (e) for (s = t.index - 1; s >= 0; s--) {
                    i = n[s];
                    if (!r.equals(i, !0)) return i.index = s, i
                } else for (s = t.index + 1; s < n.length; s++) {
                    i = n[s];
                    if (!r.equals(i, !0)) return i.index = s, i
                }
                return null
            },
            redoable: function() {
                return this.enabled && this.hasRedo
            },
            undoable: function() {
                return this.enabled && this.hasUndo
            },
            undo: function() {
                var e = this;
                if (e.undoable()) {
                    e.save(!0);
                    var t = e.getNextImage(!0);
                    if (t) return e.restoreImage(t), !0
                }
                return !1
            },
            redo: function() {
                var e = this;
                if (e.redoable()) {
                    e.save(!0);
                    if (e.redoable()) {
                        var t = e.getNextImage(!1);
                        if (t) return e.restoreImage(t), !0
                    }
                }
                return !1
            },
            update: function() {
                var t = this;
                t.snapshots.splice(t.index, 1, t.currentImage = new e(t.editor))
            }
        }
    }(), function() {
        function v(e) {
            return e.isBlockBoundary() && s.$empty[e.getName()]
        }
        function m(e) {
            return function(t) {
                if (this.mode == "wysiwyg") {
                    this.focus();
                    var n = this.getSelection(),
                        r = n.isLocked;
                    r && n.unlock(), this.fire("saveSnapshot"), e.call(this, t.data), r && this.getSelection().lock(), i.setTimeout(function() {
                        this.fire("saveSnapshot")
                    }, 0, this)
                }
            }
        }
        function y(i) {
            var s = this;
            s.dataProcessor && (i = s.dataProcessor.toHtml(i));
            if (!i) return;
            var o = s.getSelection(),
                u = o.getRanges()[0];
            if (u.checkReadOnly()) return;
            if (t.opera) {
                var a = new r.elementPath(u.startContainer);
                if (a.block) {
                    var f = e.htmlParser.fragment.fromHtml(i, !1).children;
                    for (var l = 0, c = f.length; l < c; l++) if (f[l]._.isBlockLike) {
                        u.splitBlock(s.enterMode == 3 ? "div" : "p"), u.insertNode(u.document.createText("")), u.select();
                        break
                    }
                }
            }
            if (n) {
                var h = o.getNative();
                if (h.type == "Control") h.clear();
                else if (o.getType() == 2) {
                    u = o.getRanges()[0];
                    var p = u && u.endContainer;
                    p && p.type == 1 && p.getAttribute("contenteditable") == "false" && u.checkBoundaryOfElement(p, 2) && (u.setEndAfter(u.endContainer), u.deleteContents())
                }
                h.createRange().pasteHTML(i)
            } else s.document.$.execCommand("inserthtml", !1, i);
            t.webkit && (o = s.getSelection(), o.scrollIntoView())
        }
        function w(e) {
            var o = this.getSelection(),
                u = o.getStartElement().hasAscendant("pre", !0) ? 2 : this.config.enterMode,
                a = u == 2,
                f = i.htmlEncode(e.replace(/\r\n|\r/g, "\n"));
            f = f.replace(/^[ \t]+|[ \t]+$/g, function(e, t, n) {
                return e.length == 1 ? "&nbsp;" : t ? " " + i.repeat("&nbsp;", e.length - 1) : i.repeat("&nbsp;", e.length - 1) + " "
            }), f = f.replace(/[ \t]{2,}/g, function(e) {
                return i.repeat("&nbsp;", e.length - 1) + " "
            });
            var l = u == 1 ? "p" : "div";
            a || (f = f.replace(/(\n{2})([\s\S]*?)(?:$|\1)/g, function(e, t, n) {
                return "<" + l + ">" + n + "</" + l + ">"
            })), f = f.replace(/\n/g, "<br>"), !a && !n && (f = f.replace(new RegExp("<br>(?=</" + l + ">)"), function(e) {
                return i.repeat(e, 2)
            }));
            if (t.gecko || t.webkit) {
                var c = new r.elementPath(o.getStartElement()),
                    h = [];
                for (var p = 0; p < c.elements.length; p++) {
                    var v = c.elements[p].getName();
                    if (v in s.$inline) h.unshift(c.elements[p].getOuterHtml().match(/^<.*?>/));
                    else if (v in s.$block) break
                }
                f = h.join("") + f
            }
            y.call(this, f)
        }
        function E(e) {
            var t = this.getSelection(),
                n = t.getRanges(),
                r = e.getName(),
                i = s.$block[r],
                o = t.isLocked;
            o && t.unlock();
            var u, a, f, l;
            for (var c = n.length - 1; c >= 0; c--) {
                u = n[c];
                if (!u.checkReadOnly()) {
                    u.deleteContents(1), a = !c && e || e.clone(1);
                    var h, d;
                    if (i) while ((h = u.getCommonAncestor(0, 1)) && (d = s[h.getName()]) && (!d || !d[r])) h.getName() in s.span ? u.splitElement(h) : u.checkStartOfBlock() && u.checkEndOfBlock() ? (u.setStartBefore(h), u.collapse(!0), h.remove()) : u.splitBlock();
                    u.insertNode(a), f || (f = a)
                }
            }
            if (f) {
                u.moveToPosition(f, 4);
                if (i) {
                    var v = f.getNext(p),
                        m = v && v.type == 1 && v.getName();
                    m && s.$block[m] ? s[m]["#"] ? u.moveToElementEditStart(v) : u.moveToElementEditEnd(f) : v || (v = u.fixBlock(!0, this.config.enterMode == 3 ? "div" : "p"), u.moveToElementEditStart(v))
                }
            }
            t.selectRanges([u]), o && this.getSelection().lock()
        }
        function S(e) {
            e.checkDirty() || setTimeout(function() {
                e.resetDirty()
            }, 0)
        }
        function N(e) {
            return x(e) && T(e)
        }
        function C(e) {
            return e.type == 3 && i.trim(e.getText()).match(/^(?:&nbsp;|\xa0)$/)
        }
        function k(e) {
            e.isLocked && (e.unlock(), setTimeout(function() {
                e.lock()
            }, 0))
        }
        function L(e) {
            return e.getOuterHtml().match(a)
        }
        function A(e) {
            var t = e.window,
                n = e.document,
                i = e.document.getBody(),
                s = i.getFirst(),
                o = i.getChildren().count();
            if (!o || o == 1 && s.type == 1 && s.hasAttribute("_moz_editor_bogus_node")) {
                S(e);
                var u = e.element.getDocument(),
                    a = u.getDocumentElement(),
                    f = a.$.scrollTop,
                    l = a.$.scrollLeft,
                    c = n.$.createEvent("KeyEvents");
                c.initKeyEvent("keypress", !0, !0, t.$, !1, !1, !1, !1, 0, 32), n.$.dispatchEvent(c), (f != a.$.scrollTop || l != a.$.scrollLeft) && u.getWindow().$.scrollTo(l, f), o && i.getFirst().remove(), n.getBody().appendBogus();
                var h = new r.range(n);
                h.setStartAt(i, 1), h.select()
            }
        }
        function O(e) {
            var i = e.editor,
                s = e.data.path,
                o = s.blockLimit,
                u = e.data.selection,
                a = u.getRanges()[0],
                f = i.document.getBody(),
                l = i.config.enterMode;
            if (t.gecko) {
                A(i);
                var c = s.block || s.blockLimit,
                    h = c && c.getLast(N);
                c && c.isBlockBoundary() && (!h || h.type != 1 || !h.isBlockBoundary()) && !c.is("pre") && !c.getBogus() && c.appendBogus()
            }
            if (i.config.autoParagraph !== !1 && l != 2 && a.collapsed && o.getName() == "body" && !s.block) {
                var p = a.fixBlock(!0, i.config.enterMode == 3 ? "div" : "p");
                if (n) {
                    var m = p.getFirst(N);
                    m && C(m) && m.remove()
                }
                if (L(p)) {
                    var g = p.getNext(x);
                    g && g.type == 1 && !v(g) ? (a.moveToElementEditStart(g), p.remove()) : (g = p.getPrevious(x), g && g.type == 1 && !v(g) && (a.moveToElementEditEnd(g), p.remove()))
                }
                a.select(), e.cancel()
            }
            var y = new r.range(i.document);
            y.moveToElementEditEnd(i.document.getBody());
            var w = new r.elementPath(y.startContainer);
            if (!w.blockLimit.is("body")) {
                var E;
                l != 2 ? E = f.append(i.document.createElement(l == 1 ? "p" : "div")) : E = f, n || E.appendBogus()
            }
        }
        var a = /(^|<body\b[^>]*>)\s*<(p|div|address|h\d|center|pre)[^>]*>\s*(?:<br[^>]*>|&nbsp;|\u00A0|&#160;)?\s*(:?<\/\2>)?\s*(?=$|<\/body>)/gi,
            l = r.walker.whitespaces(!0),
            c = r.walker.bogus(!0),
            p = function(e) {
                return l(e) && c(e)
            },
            x = r.walker.whitespaces(!0),
            T = r.walker.bookmark(!1, !0);
        x = r.walker.whitespaces(!0), f.add("wysiwygarea", {
            requires: ["editingblock"],
            init: function(f) {
                var c = f.config.enterMode != 2 && f.config.autoParagraph !== !1 ? f.config.enterMode == 3 ? "div" : "p" : !1,
                    p = f.lang.editorTitle.replace("%1", f.name),
                    v = f.lang.editorHelp;
                n && (p += ", " + v);
                var S = e.document.getWindow(),
                    x;
                f.on("editingBlockReady", function() {
                    function j(e) {
                        if (!k) return;
                        k = 0, f.fire("ariaWidget", T);
                        var s = e.document,
                            u = s.body,
                            c = s.getElementById("cke_actscrpt");
                        c && c.parentNode.removeChild(c), u.spellcheck = !f.config.disableNativeSpellChecker;
                        var h = !f.readOnly;
                        n ? (u.hideFocus = !0, u.disabled = !0, u.contentEditable = h, u.removeAttribute("disabled")) : setTimeout(function() {
                            t.gecko && t.version >= 10900 || t.opera ? s.$.body.contentEditable = h : t.webkit ? s.$.body.parentNode.contentEditable = h : s.$.designMode = h ? "off" : "on"
                        }, 0), h && t.gecko && i.setTimeout(A, 0, null, f), e = f.window = new r.window(e), s = f.document = new o(s), h && s.on("dblclick", function(e) {
                            var t = e.data.getTarget(),
                                n = {
                                    element: t,
                                    dialog: ""
                                };
                            f.fire("doubleclick", n), n.dialog && f.openDialog(n.dialog)
                        }), n && s.on("click", function(e) {
                            var t = e.data.getTarget();
                            if (t.is("input")) {
                                var n = t.getAttribute("type");
                                (n == "submit" || n == "reset") && e.data.preventDefault()
                            }
                        }), !n && !t.opera && s.on("mousedown", function(e) {
                            var t = e.data.getTarget();
                            t.is("img", "hr", "input", "textarea", "select") && f.getSelection().selectElement(t)
                        }), t.gecko && s.on("mouseup", function(e) {
                            if (e.data.$.button == 2) {
                                var t = e.data.getTarget();
                                if (!t.getOuterHtml().replace(a, "")) {
                                    var n = new r.range(s);
                                    n.moveToElementEditStart(t), n.select(!0)
                                }
                            }
                        }), s.on("click", function(e) {
                            e = e.data, e.getTarget().is("a") && e.$.button != 2 && e.preventDefault()
                        }), t.webkit && (s.on("mousedown", function() {
                            v = 1
                        }), s.on("click", function(e) {
                            e.data.getTarget().is("input", "select") && e.data.preventDefault()
                        }), s.on("mouseup", function(e) {
                            e.data.getTarget().is("input", "textarea") && e.data.preventDefault()
                        }));
                        var p = n ? T : e;
                        p.on("blur", function() {
                            f.focusManager.blur()
                        });
                        var v;
                        p.on("focus", function() {
                            var e = f.document;
                            t.gecko || t.opera ? e.getBody().focus() : t.webkit && (v || (f.document.getDocumentElement().focus(), v = 1)), f.focusManager.focus()
                        });
                        var m = f.keystrokeHandler;
                        m.blockedKeystrokes[8] = !h, m.attach(s), s.getDocumentElement().addClass(s.$.compatMode), h && s.on("keydown", function(n) {
                            var i = n.data.getKeystroke();
                            if (i in {
                                8: 1,
                                46: 1
                            }) {
                                var o = f.getSelection(),
                                    u = o.getSelectedElement(),
                                    a = o.getRanges()[0],
                                    c = new r.elementPath(a.startContainer),
                                    h, p, v, m = i == 8;
                                u ? (f.fire("saveSnapshot"), a.moveToPosition(u, 3), u.remove(), a.select(), f.fire("saveSnapshot"), n.data.preventDefault()) : (h = c.block) && a[m ? "checkStartOfBlock" : "checkEndOfBlock"]() && (v = h[m ? "getPrevious" : "getNext"](l)) && v.is("table") ? (f.fire("saveSnapshot"), a[m ? "checkEndOfBlock" : "checkStartOfBlock"]() && h.remove(), a["moveToElementEdit" + (m ? "End" : "Start")](v), a.select(), f.fire("saveSnapshot"), n.data.preventDefault()) : c.blockLimit.is("td") && (p = c.blockLimit.getAscendant("table")) && a.checkBoundaryOfElement(p, m ? 1 : 2) && (v = p[m ? "getPrevious" : "getNext"](l)) && (f.fire("saveSnapshot"), a["moveToElementEdit" + (m ? "End" : "Start")](v), a.checkStartOfBlock() && a.checkEndOfBlock() ? v.remove() : a.select(), f.fire("saveSnapshot"), n.data.preventDefault())
                            }
                            if (i == 33 || i == 34) if (t.gecko) {
                                var g = s.getBody();
                                e.$.innerHeight > g.$.offsetHeight && (a = new r.range(s), a[i == 33 ? "moveToElementEditStart" : "moveToElementEditEnd"](g), a.select(), n.data.preventDefault())
                            }
                        });
                        if (n && s.$.compatMode == "CSS1Compat") {
                            var y = {
                                33: 1,
                                34: 1
                            };
                            s.on("keydown", function(e) {
                                e.data.getKeystroke() in y && setTimeout(function() {
                                    f.getSelection().scrollIntoView()
                                }, 0)
                            })
                        }
                        n && f.config.enterMode != 1 && s.on("selectionchange", function() {
                            var e = s.getBody(),
                                t = f.getSelection(),
                                n = t && t.getRanges()[0];
                            n && e.getHtml().match(/^<p>&nbsp;<\/p>$/i) && n.startContainer.equals(e) && setTimeout(function() {
                                n = f.getSelection().getRanges()[0], n.startContainer.equals("body") || (e.getFirst().remove(1), n.moveToElementEditEnd(e), n.select(1))
                            }, 0)
                        }), f.contextMenu && f.contextMenu.addTarget(s, f.config.browserContextMenuOnCtrl !== !1), setTimeout(function() {
                            f.fire("contentDom"), L && (f.mode = "wysiwyg", f.fire("mode", {
                                previousMode: f._.previousMode
                            }), L = !1), N = !1, C && (f.focus(), C = !1), setTimeout(function() {
                                f.fire("dataReady")
                            }, 0);
                            try {
                                f.document.$.execCommand("2D-position", !1, !0)
                            } catch (e) {}
                            try {
                                f.document.$.execCommand("enableInlineTableEditing", !1, !f.config.disableNativeTableHandles)
                            } catch (t) {}
                            if (f.config.disableObjectResizing) try {
                                f.document.$.execCommand("enableObjectResizing", !1, !1)
                            } catch (r) {
                                f.document.getBody().on(n ? "resizestart" : "resize", function(e) {
                                    e.data.preventDefault()
                                })
                            }
                            n && setTimeout(function() {
                                if (f.document) {
                                    var e = f.document.$.body;
                                    e.runtimeStyle.marginBottom = "0px", e.runtimeStyle.marginBottom = ""
                                }
                            }, 1e3)
                        }, 0)
                    }
                    var s, T, N, C, k, L, M, _ = t.isCustomDomain(),
                        P = function(r) {
                            T && T.remove();
                            var o = "document.open();" + (_ ? 'document.domain="' + document.domain + '";' : "") + "document.close();";
                            o = t.air ? "javascript:void(0)" : n ? "javascript:void(function(){" + encodeURIComponent(o) + "}())" : "";
                            var a = i.getNextId();
                            T = u.createFromHtml('<iframe style="width:100%;height:100%" frameBorder="0" aria-describedby="' + a + '"' + ' title="' + p + '"' + ' src="' + o + '"' + ' tabIndex="' + (t.webkit ? -1 : f.tabIndex) + '"' + ' allowTransparency="true"' + "></iframe>"), document.location.protocol == "chrome:" && (e.event.useCapture = !0), T.on("load", function(e) {
                                k = 1, e.removeListener();
                                var n = T.getFrameDocument();
                                n.write(r), t.air && j(n.getWindow().$)
                            }), document.location.protocol == "chrome:" && (e.event.useCapture = !1), s.append(u.createFromHtml('<span id="' + a + '" class="cke_voice_label">' + v + "</span>")), s.append(T), t.webkit && (M = function() {
                                s.setStyle("width", "100%"), T.hide(), T.setSize("width", s.getSize("width")), s.removeStyle("width"), T.show()
                            }, S.on("resize", M))
                        };
                    x = i.addFunction(j);
                    var B = '<script id="cke_actscrpt" type="text/javascript" data-cke-temp="1">' + (_ ? 'document.domain="' + document.domain + '";' : "") + "window.parent.CKEDITOR.tools.callFunction( " + x + ", window );" + "</script>";
                    f.addMode("wysiwyg", {
                        load: function(e, r, i) {
                            s = e, n && t.quirks && e.setStyle("position", "relative"), f.mayBeDirty = !0, L = !0, i ? this.loadSnapshotData(r) : this.loadData(r)
                        },
                        loadData: function(e) {
                            N = !0, f._.dataStore = {
                                id: 1
                            };
                            var n = f.config,
                                r = n.fullPage,
                                s = n.docType,
                                o = '<style type="text/css" data-cke-temp="1">' + f._.styles.join("\n") + "</style>";
                            !r && (o = i.buildStyleHtml(f.config.contentsCss) + o);
                            var u = n.baseHref ? '<base href="' + n.baseHref + '" data-cke-temp="1" />' : "";
                            r && (e = e.replace(/<!DOCTYPE[^>]*>/i, function(e) {
                                return f.docType = s = e, ""
                            }).replace(/<\?xml\s[^\?]*\?>/i, function(e) {
                                return f.xmlDeclaration = e, ""
                            })), f.dataProcessor && (e = f.dataProcessor.toHtml(e, c)), r ? (/<body[\s|>]/.test(e) || (e = "<body>" + e), /<html[\s|>]/.test(e) || (e = "<html>" + e + "</html>"), /<head[\s|>]/.test(e) ? /<title[\s|>]/.test(e) || (e = e.replace(/<head[^>]*>/, "$&<title></title>")) : e = e.replace(/<html[^>]*>/, "$&<head><title></title></head>"), u && (e = e.replace(/<head>/, "$&" + u)), e = e.replace(/<\/head\s*>/, o + "$&"), e = s + e) : e = n.docType + '<html dir="' + n.contentsLangDirection + '"' + ' lang="' + (n.contentsLanguage || f.langCode) + '">' + "<head>" + "<title>" + p + "</title>" + u + o + "</head>" + "<body" + (n.bodyId ? ' id="' + n.bodyId + '"' : "") + (n.bodyClass ? ' class="' + n.bodyClass + '"' : "") + ">" + e + "</html>", t.gecko && (e = e.replace(/<br \/>(?=\s*<\/(:?html|body)>)/, '$&<br type="_moz" />')), e += B, this.onDispose(), P(e)
                        },
                        getData: function() {
                            var e = f.config,
                                n = e.fullPage,
                                r = n && f.docType,
                                i = n && f.xmlDeclaration,
                                s = T.getFrameDocument(),
                                o = n ? s.getDocumentElement().getOuterHtml() : s.getBody().getHtml();
                            return t.gecko && (o = o.replace(/<br>(?=\s*(:?$|<\/body>))/, "")), f.dataProcessor && (o = f.dataProcessor.toDataFormat(o, c)), e.ignoreEmptyParagraph && (o = o.replace(a, function(e, t) {
                                return t
                            })), i && (o = i + "\n" + o), r && (o = r + "\n" + o), o
                        },
                        getSnapshotData: function() {
                            return T.getFrameDocument().getBody().getHtml()
                        },
                        loadSnapshotData: function(e) {
                            T.getFrameDocument().getBody().setHtml(e)
                        },
                        onDispose: function() {
                            if (!f.document) return;
                            f.document.getDocumentElement().clearCustomData(), f.document.getBody().clearCustomData(), f.window.clearCustomData(), f.document.clearCustomData(), T.clearCustomData(), T.remove()
                        },
                        unload: function(e) {
                            this.onDispose(), M && S.removeListener("resize", M), f.window = f.document = T = s = C = null, f.fire("contentDomUnload")
                        },
                        focus: function() {
                            var e = f.window;
                            if (N) C = !0;
                            else if (e) {
                                var n = f.getSelection(),
                                    r = n && n.getNative();
                                if (r && r.type == "Control") return;
                                t.air ? setTimeout(function() {
                                    e.focus()
                                }, 0) : e.focus(), f.selectionChange()
                            }
                        }
                    }), f.on("insertHtml", m(y), null, null, 20), f.on("insertElement", m(E), null, null, 20), f.on("insertText", m(w), null, null, 20), f.on("selectionChange", function(e) {
                        if (f.readOnly) return;
                        var t = f.getSelection();
                        if (t && !t.isLocked) {
                            var n = f.checkDirty();
                            f.fire("saveSnapshot", {
                                contentOnly: 1
                            }), O.call(this, e), f.fire("updateSnapshot"), !n && f.resetDirty()
                        }
                    }, null, null, 1)
                }), f.on("contentDom", function() {
                    var e = f.document.getElementsByTag("title").getItem(0);
                    e.data("cke-title", f.document.$.title), n && (f.document.$.title = p)
                }), f.on("readOnly", function() {
                    if (f.mode == "wysiwyg") {
                        var e = f.getMode();
                        e.loadData(e.getData())
                    }
                });
                if (e.document.$.documentMode >= 8) {
                    f.addCss("html.CSS1Compat [contenteditable=false]{ min-height:0 !important;}");
                    var T = [];
                    for (var N in s.$removeEmpty) T.push("html.CSS1Compat " + N + "[contenteditable=false]");
                    f.addCss(T.join(",") + "{ display:inline-block;}")
                } else t.gecko ? (f.addCss("html { height: 100% !important; }"), f.addCss("img:-moz-broken { -moz-force-broken-image-icon : 1;	min-width : 24px; min-height : 24px; }")) : n && t.version < 8 && f.config.contentsLangDirection == "ltr" && f.addCss("body{margin-right:0;}");
                f.addCss("html {	_overflow-y: scroll; cursor: text;	*cursor:auto;}"), f.addCss("img, input, textarea { cursor: default;}"), f.on("insertElement", function(e) {
                    var t = e.data;
                    if (t.type == 1 && (t.is("input") || t.is("textarea"))) {
                        var n = t.getAttribute("contenteditable") == "false";
                        n || (t.data("cke-editable", t.hasAttribute("contenteditable") ? "true" : "1"), t.setAttribute("contenteditable", !1))
                    }
                })
            }
        }), t.gecko &&
        function() {
            var e = document.body;
            if (!e) window.addEventListener("load", arguments.callee, !1);
            else {
                var t = e.getAttribute("onpageshow");
                e.setAttribute("onpageshow", (t ? t + ";" : "") + "event.persisted && (function(){" + "var allInstances = CKEDITOR.instances, editor, doc;" + "for ( var i in allInstances )" + "{" + "	editor = allInstances[ i ];" + "	doc = editor.document;" + "	if ( doc )" + "	{" + '		doc.$.designMode = "off";' + '		doc.$.designMode = "on";' + "	}" + "}" + "})();")
            }
        }()
    }(), a.disableObjectResizing = !1, a.disableNativeTableHandles = !0, a.disableNativeSpellChecker = !0, a.ignoreEmptyParagraph = !0, f.add("wsc", {
        requires: ["dialog"],
        init: function(n) {
            var r = "checkspell",
                i = n.addCommand(r, new e.dialogCommand(r));
            i.modes = {
                wysiwyg: !t.opera && !t.air && document.domain == window.location.hostname
            }, n.ui.addButton("SpellChecker", {
                label: n.lang.spellCheck.toolbar,
                command: r
            }), e.dialog.add(r, this.path + "dialogs/wsc.js")
        }
    }), a.wsc_customerId = a.wsc_customerId || "1:ua3xw1-2XyGJ3-GWruD3-6OFNT1-oXcuB1-nR6Bp4-hgQHc-EcYng3-sdRXG3-NOfFk", a.wsc_customLoaderScript = a.wsc_customLoaderScript || null, e.DIALOG_RESIZE_NONE = 0, e.DIALOG_RESIZE_WIDTH = 1, e.DIALOG_RESIZE_HEIGHT = 2, e.DIALOG_RESIZE_BOTH = 3, function() {
        function a(e) {
            return !!this._.tabs[e][0].$.offsetHeight
        }
        function f() {
            var e = this,
                t = e._.currentTabId,
                n = e._.tabIdList.length,
                r = i.indexOf(e._.tabIdList, t) + n;
            for (var s = r - 1; s > r - n; s--) if (a.call(e, e._.tabIdList[s % n])) return e._.tabIdList[s % n];
            return null
        }
        function c() {
            var e = this,
                t = e._.currentTabId,
                n = e._.tabIdList.length,
                r = i.indexOf(e._.tabIdList, t);
            for (var s = r + 1; s < r + n; s++) if (a.call(e, e._.tabIdList[s % n])) return e._.tabIdList[s % n];
            return null
        }
        function p(e, t) {
            var n = e.$.getElementsByTagName("input");
            for (var r = 0, i = n.length; r < i; r++) {
                var s = new u(n[r]);
                s.getAttribute("type").toLowerCase() == "text" && (t ? (s.setAttribute("value", s.getCustomData("fake_value") || ""), s.removeCustomData("fake_value")) : (s.setCustomData("fake_value", s.getAttribute("value")), s.setAttribute("value", "")))
            }
        }
        function v(e, t) {
            var n = this,
                r = n.getInputElement();
            r && (e ? r.removeAttribute("aria-invalid") : r.setAttribute("aria-invalid", !0)), e || (n.select ? n.select() : n.focus()), t && alert(t), n.fire("validated", {
                valid: e,
                msg: t
            })
        }
        function m() {
            var e = this.getInputElement();
            e && e.removeAttribute("aria-invalid")
        }
        function y(e, t, n) {
            this.element = t, this.focusIndex = n, this.tabIndex = 0, this.isFocusable = function() {
                return !t.getAttribute("disabled") && t.isVisible()
            }, this.focus = function() {
                e._.currentFocusIndex = this.focusIndex, this.element.focus()
            }, t.on("keydown", function(e) {
                e.data.getKeystroke() in {
                    32: 1,
                    13: 1
                } && this.fire("click")
            }), t.on("focus", function() {
                this.fire("mouseover")
            }), t.on("blur", function() {
                this.fire("mouseout")
            })
        }
        function N(e, t) {
            this._ = {
                dialog: e
            }, i.extend(this, t)
        }
        function C(n) {
            function f(t) {
                var s = n.getSize(),
                    f = e.document.getWindow().getViewPaneSize(),
                    l = t.data.$.screenX,
                    c = t.data.$.screenY,
                    h = l - r.x,
                    p = c - r.y,
                    d, v;
                r = {
                    x: l,
                    y: c
                }, i.x += h, i.y += p, i.x + a[3] < u ? d = -a[3] : i.x - a[1] > f.width - s.width - u ? d = f.width - s.width + (o.lang.dir == "rtl" ? 0 : a[1]) : d = i.x, i.y + a[0] < u ? v = -a[0] : i.y - a[2] > f.height - s.height - u ? v = f.height - s.height + a[2] : v = i.y, n.move(d, v, 1), t.data.preventDefault()
            }
            function l(n) {
                e.document.removeListener("mousemove", f), e.document.removeListener("mouseup", l);
                if (t.ie6Compat) {
                    var r = M.getChild(0).getFrameDocument();
                    r.removeListener("mousemove", f), r.removeListener("mouseup", l)
                }
            }
            var r = null,
                i = null,
                s = n.getElement().getFirst(),
                o = n.getParentEditor(),
                u = o.config.dialog_magnetDistance,
                a = o.skin.margins || [0, 0, 0, 0];
            typeof u == "undefined" && (u = 20), n.parts.title.on("mousedown", function(s) {
                r = {
                    x: s.data.$.screenX,
                    y: s.data.$.screenY
                }, e.document.on("mousemove", f), e.document.on("mouseup", l), i = n.getPosition();
                if (t.ie6Compat) {
                    var o = M.getChild(0).getFrameDocument();
                    o.on("mousemove", f), o.on("mouseup", l)
                }
                s.data.preventDefault()
            }, n)
        }
        function L(r) {
            function g(e) {
                var t = a.lang.dir == "rtl",
                    n = (e.data.$.screenX - p.x) * (t ? -1 : 1),
                    i = e.data.$.screenY - p.y,
                    u = d.width,
                    h = d.height,
                    v = u + n * (r._.moved ? 1 : 2),
                    m = h + i * (r._.moved ? 1 : 2),
                    g = r._.element.getFirst(),
                    y = t && g.getComputedStyle("right"),
                    b = r.getPosition();
                b.y + m > c.height && (m = c.height - b.y), (t ? y : b.x) + v > c.width && (v = c.width - (t ? y : b.x));
                if (o == 1 || o == 3) u = Math.max(s.minWidth || 0, v - f);
                if (o == 2 || o == 3) h = Math.max(s.minHeight || 0, m - l);
                r.resize(u, h), r._.moved || r.layout(), e.data.preventDefault()
            }
            function y() {
                e.document.removeListener("mouseup", y), e.document.removeListener("mousemove", g), v && (v.remove(), v = null);
                if (t.ie6Compat) {
                    var n = M.getChild(0).getFrameDocument();
                    n.removeListener("mouseup", y), n.removeListener("mousemove", g)
                }
            }
            var s = r.definition,
                o = s.resizable;
            if (o == 0) return;
            var a = r.getParentEditor(),
                f, l, c, p, d, v, m = i.addFunction(function(i) {
                    d = r.getSize();
                    var s = r.parts.contents,
                        o = s.$.getElementsByTagName("iframe").length;
                    o && (v = u.createFromHtml('<div class="cke_dialog_resize_cover" style="height: 100%; position: absolute; width: 100%;"></div>'), s.append(v)), l = d.height - r.parts.contents.getSize("height", !(t.gecko || t.opera || n && t.quirks)), f = d.width - r.parts.contents.getSize("width", 1), p = {
                        x: i.screenX,
                        y: i.screenY
                    }, c = e.document.getWindow().getViewPaneSize(), e.document.on("mousemove", g), e.document.on("mouseup", y);
                    if (t.ie6Compat) {
                        var a = M.getChild(0).getFrameDocument();
                        a.on("mousemove", g), a.on("mouseup", y)
                    }
                    i.preventDefault && i.preventDefault()
                });
            r.on("load", function() {
                var e = "";
                o == 1 ? e = " cke_resizer_horizontal" : o == 2 && (e = " cke_resizer_vertical");
                var t = u.createFromHtml('<div class="cke_resizer' + e + " cke_resizer_" + a.lang.dir + '"' + ' title="' + i.htmlEncode(a.lang.resize) + '"' + ' onmousedown="CKEDITOR.tools.callFunction(' + m + ', event )"></div>');
                r.parts.footer.append(t, 1)
            }), a.on("destroy", function() {
                i.removeFunction(m)
            })
        }
        function _(e) {
            e.data.preventDefault(1)
        }
        function D(n) {
            var r = e.document.getWindow(),
                s = n.config,
                o = s.dialog_backgroundCoverColor || "white",
                a = s.dialog_backgroundCoverOpacity,
                f = s.baseFloatZIndex,
                l = i.genKey(o, a, f),
                c = O[l];
            if (!c) {
                var p = ['<div tabIndex="-1" style="position: ', t.ie6Compat ? "absolute" : "fixed", "; z-index: ", f, "; top: 0px; left: 0px; ", t.ie6Compat ? "" : "background-color: " + o, '" class="cke_dialog_background_cover">'];
                if (t.ie6Compat) {
                    var d = t.isCustomDomain(),
                        v = "<html><body style=\\'background-color:" + o + ";\\'></body></html>";
                    p.push('<iframe hidefocus="true" frameborder="0" id="cke_dialog_background_iframe" src="javascript:'), p.push("void((function(){document.open();" + (d ? "document.domain='" + document.domain + "';" : "") + "document.write( '" + v + "' );" + "document.close();" + "})())"), p.push('" style="position:absolute;left:0;top:0;width:100%;height: 100%;progid:DXImageTransform.Microsoft.Alpha(opacity=0)"></iframe>')
                }
                p.push("</div>"), c = u.createFromHtml(p.join("")), c.setOpacity(a != undefined ? a : .5), c.on("keydown", _), c.on("keypress", _), c.on("keyup", _), c.appendTo(e.document.getBody()), O[l] = c
            } else c.show();
            M = c;
            var m = function() {
                    var e = r.getViewPaneSize();
                    c.setStyles({
                        width: e.width + "px",
                        height: e.height + "px"
                    })
                },
                g = function() {
                    var t = r.getScrollPosition(),
                        n = e.dialog._.currentTop;
                    c.setStyles({
                        left: t.x + "px",
                        top: t.y + "px"
                    });
                    if (n) do {
                        var i = n.getPosition();
                        n.move(i.x, i.y)
                    } while (n = n._.parentDialog)
                };
            A = m, r.on("resize", m), m(), (!t.mac || !t.webkit) && c.focus();
            if (t.ie6Compat) {
                var y = function() {
                        g(), arguments.callee.prevScrollHandler.apply(this, arguments)
                    };
                r.$.setTimeout(function() {
                    y.prevScrollHandler = window.onscroll ||
                    function() {}, window.onscroll = y
                }, 0), g()
            }
        }
        function P() {
            if (!M) return;
            var n = e.document.getWindow();
            M.hide(), n.removeListener("resize", A), t.ie6Compat && n.$.setTimeout(function() {
                var e = window.onscroll && window.onscroll.prevScrollHandler;
                window.onscroll = e || null
            }, 0), A = null
        }
        function H() {
            for (var e in O) O[e].remove();
            O = {}
        }
        var s = i.cssLength;
        e.dialog = function(s, u) {
            function H() {
                var e = D._.focusList;
                e.sort(function(e, t) {
                    return e.tabIndex != t.tabIndex ? t.tabIndex - e.tabIndex : e.focusIndex - t.focusIndex
                });
                var t = e.length;
                for (var n = 0; n < t; n++) e[n].focusIndex = n
            }
            function B(e) {
                var t = D._.focusList;
                e = e || 0;
                if (t.length < 1) return;
                var n = D._.currentFocusIndex;
                try {
                    t[n].getInputElement().$.blur()
                } catch (r) {}
                var i = (n + e + t.length) % t.length,
                    s = i;
                while (e && !t[s].isFocusable()) {
                    s = (s + e + t.length) % t.length;
                    if (s == i) break
                }
                t[s].focus(), t[s].type == "text" && t[s].select()
            }
            function j(t) {
                var n = this;
                if (D != e.dialog._.currentTop) return;
                var r = t.data.getKeystroke(),
                    o = s.lang.dir == "rtl",
                    u;
                S = x = 0;
                if (r == 9 || r == 2228224 + 9) {
                    var a = r == 2228224 + 9;
                    if (D._.tabBarMode) {
                        var l = a ? f.call(D) : c.call(D);
                        D.selectPage(l), D._.tabs[l][0].focus()
                    } else B(a ? -1 : 1);
                    S = 1
                } else if (r == 4456448 + 121 && !D._.tabBarMode && D.getPageCount() > 1) D._.tabBarMode = !0, D._.tabs[D._.currentTabId][0].focus(), S = 1;
                else if (r != 37 && r != 39 || !D._.tabBarMode) if (r != 13 && r != 32 || !D._.tabBarMode) if (r == 13) {
                    var h = t.data.getTarget();
                    !h.is("a", "button", "select") && (!h.is("input") || h.$.type != "button") && (u = n.getButton("ok"), u && i.setTimeout(u.click, 0, u), S = 1), x = 1
                } else {
                    if (r != 27) return;
                    u = n.getButton("cancel"), u ? i.setTimeout(u.click, 0, u) : n.fire("cancel", {
                        hide: !0
                    }).hide !== !1 && n.hide(), x = 1
                } else n.selectPage(n._.currentTabId), n._.tabBarMode = !1, n._.currentFocusIndex = -1, B(1), S = 1;
                else l = r == (o ? 39 : 37) ? f.call(D) : c.call(D), D.selectPage(l), D._.tabs[l][0].focus(), S = 1;
                F(t)
            }
            function F(e) {
                S ? e.data.preventDefault(1) : x && e.data.stopPropagation()
            }
            var a = e.dialog._.dialogDefinitions[u],
                l = i.clone(w),
                h = s.config.dialog_buttonsOrder || "OS",
                p = s.lang.dir,
                y = {},
                E, S, x;
            (h == "OS" && t.mac || h == "rtl" && p == "ltr" || h == "ltr" && p == "rtl") && l.buttons.reverse(), a = i.extend(a(s), l), a = i.clone(a), a = new T(this, a);
            var N = e.document,
                k = s.theme.buildDialog(s);
            this._ = {
                editor: s,
                element: k.element,
                name: u,
                contentSize: {
                    width: 0,
                    height: 0
                },
                size: {
                    width: 0,
                    height: 0
                },
                contents: {},
                buttons: {},
                accessKeyMap: {},
                tabs: {},
                tabIdList: [],
                currentTabId: null,
                currentTabIndex: null,
                pageCount: 0,
                lastTab: null,
                tabBarMode: !1,
                focusList: [],
                currentFocusIndex: 0,
                hasFocus: !1
            }, this.parts = k.parts, i.setTimeout(function() {
                s.fire("ariaWidget", this.parts.contents)
            }, 0, this);
            var A = {
                position: t.ie6Compat ? "absolute" : "fixed",
                top: 0,
                visibility: "hidden"
            };
            A[p == "rtl" ? "right" : "left"] = 0, this.parts.dialog.setStyles(A), e.event.call(this), this.definition = a = e.fire("dialogDefinition", {
                name: u,
                definition: a
            }, s).definition;
            if (!("removeDialogTabs" in s._) && s.config.removeDialogTabs) {
                var O = s.config.removeDialogTabs.split(";");
                for (E = 0; E < O.length; E++) {
                    var M = O[E].split(":");
                    if (M.length == 2) {
                        var _ = M[0];
                        y[_] || (y[_] = []), y[_].push(M[1])
                    }
                }
                s._.removeDialogTabs = y
            }
            if (s._.removeDialogTabs && (y = s._.removeDialogTabs[u])) for (E = 0; E < y.length; E++) a.removeContents(y[E]);
            a.onLoad && this.on("load", a.onLoad), a.onShow && this.on("show", a.onShow), a.onHide && this.on("hide", a.onHide), a.onOk && this.on("ok", function(e) {
                s.fire("saveSnapshot"), setTimeout(function() {
                    s.fire("saveSnapshot")
                }, 0), a.onOk.call(this, e) === !1 && (e.data.hide = !1)
            }), a.onCancel && this.on("cancel", function(e) {
                a.onCancel.call(this, e) === !1 && (e.data.hide = !1)
            });
            var D = this,
                P = function(e) {
                    var t = D._.contents,
                        n = !1;
                    for (var r in t) for (var i in t[r]) {
                        n = e.call(this, t[r][i]);
                        if (n) return
                    }
                };
            this.on("ok", function(e) {
                P(function(t) {
                    if (t.validate) {
                        var n = t.validate(this),
                            r = typeof n == "string" || n === !1;
                        return r && (e.data.hide = !1, e.stop()), v.call(t, !r, typeof n == "string" ? n : undefined), r
                    }
                })
            }, this, null, 0), this.on("cancel", function(e) {
                P(function(t) {
                    if (t.isChanged()) return confirm(s.lang.common.confirmCancel) || (e.data.hide = !1), !0
                })
            }, this, null, 0), this.parts.close.on("click", function(e) {
                this.fire("cancel", {
                    hide: !0
                }).hide !== !1 && this.hide(), e.data.preventDefault()
            }, this), this.changeFocus = B;
            var I = this._.element;
            this.on("show", function() {
                I.on("keydown", j, this), (t.opera || t.gecko) && I.on("keypress", F, this)
            }), this.on("hide", function() {
                I.removeListener("keydown", j), (t.opera || t.gecko) && I.removeListener("keypress", F), P(function(e) {
                    m.apply(e)
                })
            }), this.on("iframeAdded", function(e) {
                var t = new o(e.data.iframe.$.contentWindow.document);
                t.on("keydown", j, this, null, 0)
            }), this.on("show", function() {
                var e = this;
                H();
                if (s.config.dialog_startupFocusTab && D._.pageCount > 1) D._.tabBarMode = !0, D._.tabs[D._.currentTabId][0].focus();
                else if (!e._.hasFocus) {
                    e._.currentFocusIndex = -1;
                    if (a.onFocus) {
                        var t = a.onFocus.call(e);
                        t && t.focus()
                    } else B(1);
                    if (e._.editor.mode == "wysiwyg" && n) {
                        var r = s.document.$.selection,
                            i = r.createRange();
                        if (i) if (i.parentElement && i.parentElement().ownerDocument == s.document.$ || i.item && i.item(0).ownerDocument == s.document.$) {
                            var o = document.body.createTextRange();
                            o.moveToElementText(e.getElement().getFirst().$), o.collapse(!0), o.select()
                        }
                    }
                }
            }, this, null, 4294967295), t.ie6Compat && this.on("load", function(e) {
                var t = this.getElement(),
                    n = t.getFirst();
                n.remove(), n.appendTo(t)
            }, this), C(this), L(this), (new r.text(a.title, e.document)).appendTo(this.parts.title);
            for (E = 0; E < a.contents.length; E++) {
                var q = a.contents[E];
                q && this.addPage(q)
            }
            this.parts.tabs.on("click", function(e) {
                var t = this,
                    n = e.data.getTarget();
                if (n.hasClass("cke_dialog_tab")) {
                    var r = n.$.id;
                    t.selectPage(r.substring(4, r.lastIndexOf("_"))), t._.tabBarMode && (t._.tabBarMode = !1, t._.currentFocusIndex = -1, B(1)), e.data.preventDefault()
                }
            }, this);
            var R = [],
                U = e.dialog._.uiElementBuilders.hbox.build(this, {
                    type: "hbox",
                    className: "cke_dialog_footer_buttons",
                    widths: [],
                    children: a.buttons
                }, R).getChild();
            this.parts.footer.setHtml(R.join(""));
            for (E = 0; E < U.length; E++) this._.buttons[U[E].id] = U[E]
        }, e.dialog.prototype = {
            destroy: function() {
                this.hide(), this._.element.remove()
            },
            resize: function() {
                return function(t, n) {
                    var r = this;
                    if (r._.contentSize && r._.contentSize.width == t && r._.contentSize.height == n) return;
                    e.dialog.fire("resize", {
                        dialog: r,
                        skin: r._.editor.skinName,
                        width: t,
                        height: n
                    }, r._.editor), r.fire("resize", {
                        skin: r._.editor.skinName,
                        width: t,
                        height: n
                    }, r._.editor), r._.editor.lang.dir == "rtl" && r._.position && (r._.position.x = e.document.getWindow().getViewPaneSize().width - r._.contentSize.width - parseInt(r._.element.getFirst().getStyle("right"), 10)), r._.contentSize = {
                        width: t,
                        height: n
                    }
                }
            }(),
            getSize: function() {
                var e = this._.element.getFirst();
                return {
                    width: e.$.offsetWidth || 0,
                    height: e.$.offsetHeight || 0
                }
            },
            move: function() {
                var t;
                return function(n, r, i) {
                    var s = this,
                        o = s._.element.getFirst(),
                        u = s._.editor.lang.dir == "rtl";
                    t === undefined && (t = o.getComputedStyle("position") == "fixed");
                    if (t && s._.position && s._.position.x == n && s._.position.y == r) return;
                    s._.position = {
                        x: n,
                        y: r
                    };
                    if (!t) {
                        var a = e.document.getWindow().getScrollPosition();
                        n += a.x, r += a.y
                    }
                    if (u) {
                        var f = s.getSize(),
                            l = e.document.getWindow().getViewPaneSize();
                        n = l.width - f.width - n
                    }
                    var c = {
                        top: (r > 0 ? r : 0) + "px"
                    };
                    c[u ? "right" : "left"] = (n > 0 ? n : 0) + "px", o.setStyles(c), i && (s._.moved = 1)
                }
            }(),
            getPosition: function() {
                return i.extend({}, this._.position)
            },
            show: function() {
                var n = this._.element,
                    r = this.definition;
                !n.getParent() || !n.getParent().equals(e.document.getBody()) ? n.appendTo(e.document.getBody()) : n.setStyle("display", "block");
                if (t.gecko && t.version < 10900) {
                    var s = this.parts.dialog;
                    s.setStyle("position", "absolute"), setTimeout(function() {
                        s.setStyle("position", "fixed")
                    }, 0)
                }
                this.resize(this._.contentSize && this._.contentSize.width || r.width || r.minWidth, this._.contentSize && this._.contentSize.height || r.height || r.minHeight), this.reset(), this.selectPage(this.definition.contents[0].id), e.dialog._.currentZIndex === null && (e.dialog._.currentZIndex = this._.editor.config.baseFloatZIndex), this._.element.getFirst().setStyle("z-index", e.dialog._.currentZIndex += 10);
                if (e.dialog._.currentTop === null) e.dialog._.currentTop = this, this._.parentDialog = null, D(this._.editor);
                else {
                    this._.parentDialog = e.dialog._.currentTop;
                    var o = this._.parentDialog.getElement().getFirst();
                    o.$.style.zIndex -= Math.floor(this._.editor.config.baseFloatZIndex / 2), e.dialog._.currentTop = this
                }
                n.on("keydown", j), n.on(t.opera ? "keypress" : "keyup", F), this._.hasFocus = !1, i.setTimeout(function() {
                    this.layout(), this.parts.dialog.setStyle("visibility", ""), this.fireOnce("load", {}), l.fire("ready", this), this.fire("show", {}), this._.editor.fire("dialogShow", this), this.foreach(function(e) {
                        e.setInitValue && e.setInitValue()
                    })
                }, 100, this)
            },
            layout: function() {
                var t = this,
                    n = e.document.getWindow().getViewPaneSize(),
                    r = t.getSize();
                t.move(t._.moved ? t._.position.x : (n.width - r.width) / 2, t._.moved ? t._.position.y : (n.height - r.height) / 2)
            },
            foreach: function(e) {
                var t = this;
                for (var n in t._.contents) for (var r in t._.contents[n]) e.call(t, t._.contents[n][r]);
                return t
            },
            reset: function() {
                var e = function(e) {
                        e.reset && e.reset(1)
                    };
                return function() {
                    return this.foreach(e), this
                }
            }(),
            setupContent: function() {
                var e = arguments;
                this.foreach(function(t) {
                    t.setup && t.setup.apply(t, e)
                })
            },
            commitContent: function() {
                var e = arguments;
                this.foreach(function(t) {
                    n && this._.currentFocusIndex == t.focusIndex && t.getInputElement().$.blur(), t.commit && t.commit.apply(t, e)
                })
            },
            hide: function() {
                if (!this.parts.dialog.isVisible()) return;
                this.fire("hide", {}), this._.editor.fire("dialogHide", this), this.selectPage(this._.tabIdList[0]);
                var r = this._.element;
                r.setStyle("display", "none"), this.parts.dialog.setStyle("visibility", "hidden"), q(this);
                while (e.dialog._.currentTop != this) e.dialog._.currentTop.hide();
                if (!this._.parentDialog) P();
                else {
                    var i = this._.parentDialog.getElement().getFirst();
                    i.setStyle("z-index", parseInt(i.$.style.zIndex, 10) + Math.floor(this._.editor.config.baseFloatZIndex / 2))
                }
                e.dialog._.currentTop = this._.parentDialog;
                if (!this._.parentDialog) {
                    e.dialog._.currentZIndex = null, r.removeListener("keydown", j), r.removeListener(t.opera ? "keypress" : "keyup", F);
                    var s = this._.editor;
                    s.focus();
                    if (s.mode == "wysiwyg" && n) {
                        var o = s.getSelection();
                        o && o.unlock(!0)
                    }
                } else e.dialog._.currentZIndex -= 10;
                delete this._.parentDialog, this.foreach(function(e) {
                    e.resetInitValue && e.resetInitValue()
                })
            },
            addPage: function(n) {
                var r = this,
                    s = [],
                    o = n.label ? ' title="' + i.htmlEncode(n.label) + '"' : "",
                    a = n.elements,
                    f = e.dialog._.uiElementBuilders.vbox.build(r, {
                        type: "vbox",
                        className: "cke_dialog_page_contents",
                        children: n.elements,
                        expand: !! n.expand,
                        padding: n.padding,
                        style: n.style || "width: 100%;height:100%"
                    }, s),
                    l = u.createFromHtml(s.join(""));
                l.setAttribute("role", "tabpanel");
                var c = t,
                    p = "cke_" + n.id + "_" + i.getNextNumber(),
                    d = u.createFromHtml(['<a class="cke_dialog_tab"', r._.pageCount > 0 ? " cke_last" : "cke_first", o, n.hidden ? ' style="display:none"' : "", ' id="', p, '"', c.gecko && c.version >= 10900 && !c.hc ? "" : ' href="javascript:void(0)"', ' tabIndex="-1"', ' hidefocus="true"', ' role="tab">', n.label, "</a>"].join(""));
                l.setAttribute("aria-labelledby", p), r._.tabs[n.id] = [d, l], r._.tabIdList.push(n.id), !n.hidden && r._.pageCount++, r._.lastTab = d, r.updateStyle();
                var v = r._.contents[n.id] = {},
                    m, g = f.getChild();
                while (m = g.shift()) v[m.id] = m, typeof m.getChild == "function" && g.push.apply(g, m.getChild());
                l.setAttribute("name", n.id), l.appendTo(r.parts.contents), d.unselectable(), r.parts.tabs.append(d), n.accessKey && (I(r, r, "CTRL+" + n.accessKey, U, R), r._.accessKeyMap["CTRL+" + n.accessKey] = n.id)
            },
            selectPage: function(e) {
                if (this._.currentTabId == e) return;
                if (this.fire("selectPage", {
                    page: e,
                    currentPage: this._.currentTabId
                }) === !0) return;
                for (var n in this._.tabs) {
                    var r = this._.tabs[n][0],
                        s = this._.tabs[n][1];
                    n != e && (r.removeClass("cke_dialog_tab_selected"), s.hide()), s.setAttribute("aria-hidden", n != e)
                }
                var o = this._.tabs[e];
                o[0].addClass("cke_dialog_tab_selected"), t.ie6Compat || t.ie7Compat ? (p(o[1]), o[1].show(), setTimeout(function() {
                    p(o[1], 1)
                }, 0)) : o[1].show(), this._.currentTabId = e, this._.currentTabIndex = i.indexOf(this._.tabIdList, e)
            },
            updateStyle: function() {
                this.parts.dialog[(this._.pageCount === 1 ? "add" : "remove") + "Class"]("cke_single_page")
            },
            hidePage: function(e) {
                var t = this,
                    n = t._.tabs[e] && t._.tabs[e][0];
                if (!n || t._.pageCount == 1 || !n.isVisible()) return;
                e == t._.currentTabId && t.selectPage(f.call(t)), n.hide(), t._.pageCount--, t.updateStyle()
            },
            showPage: function(e) {
                var t = this,
                    n = t._.tabs[e] && t._.tabs[e][0];
                if (!n) return;
                n.show(), t._.pageCount++, t.updateStyle()
            },
            getElement: function() {
                return this._.element
            },
            getName: function() {
                return this._.name
            },
            getContentElement: function(e, t) {
                var n = this._.contents[e];
                return n && n[t]
            },
            getValueOf: function(e, t) {
                return this.getContentElement(e, t).getValue()
            },
            setValueOf: function(e, t, n) {
                return this.getContentElement(e, t).setValue(n)
            },
            getButton: function(e) {
                return this._.buttons[e]
            },
            click: function(e) {
                return this._.buttons[e].click()
            },
            disableButton: function(e) {
                return this._.buttons[e].disable()
            },
            enableButton: function(e) {
                return this._.buttons[e].enable()
            },
            getPageCount: function() {
                return this._.pageCount
            },
            getParentEditor: function() {
                return this._.editor
            },
            getSelectedElement: function() {
                return this.getParentEditor().getSelection().getSelectedElement()
            },
            addFocusable: function(e, t) {
                var n = this;
                if (typeof t == "undefined") t = n._.focusList.length, n._.focusList.push(new y(n, e, t));
                else {
                    n._.focusList.splice(t, 0, new y(n, e, t));
                    for (var r = t + 1; r < n._.focusList.length; r++) n._.focusList[r].focusIndex++
                }
            }
        }, i.extend(e.dialog, {
            add: function(e, t) {
                if (!this._.dialogDefinitions[e] || typeof t == "function") this._.dialogDefinitions[e] = t
            },
            exists: function(e) {
                return !!this._.dialogDefinitions[e]
            },
            getCurrent: function() {
                return e.dialog._.currentTop
            },
            okButton: function() {
                var e = function(e, t) {
                        return t = t || {}, i.extend({
                            id: "ok",
                            type: "button",
                            label: e.lang.common.ok,
                            "class": "cke_dialog_ui_button_ok",
                            onClick: function(e) {
                                var t = e.data.dialog;
                                t.fire("ok", {
                                    hide: !0
                                }).hide !== !1 && t.hide()
                            }
                        }, t, !0)
                    };
                return e.type = "button", e.override = function(t) {
                    return i.extend(function(n) {
                        return e(n, t)
                    }, {
                        type: "button"
                    }, !0)
                }, e
            }(),
            cancelButton: function() {
                var e = function(e, t) {
                        return t = t || {}, i.extend({
                            id: "cancel",
                            type: "button",
                            label: e.lang.common.cancel,
                            "class": "cke_dialog_ui_button_cancel",
                            onClick: function(e) {
                                var t = e.data.dialog;
                                t.fire("cancel", {
                                    hide: !0
                                }).hide !== !1 && t.hide()
                            }
                        }, t, !0)
                    };
                return e.type = "button", e.override = function(t) {
                    return i.extend(function(n) {
                        return e(n, t)
                    }, {
                        type: "button"
                    }, !0)
                }, e
            }(),
            addUIElement: function(e, t) {
                this._.uiElementBuilders[e] = t
            }
        }), e.dialog._ = {
            uiElementBuilders: {},
            dialogDefinitions: {},
            currentTop: null,
            currentZIndex: null
        }, e.event.implementOn(e.dialog), e.event.implementOn(e.dialog.prototype, !0);
        var w = {
            resizable: 3,
            minWidth: 600,
            minHeight: 400,
            buttons: [e.dialog.okButton, e.dialog.cancelButton]
        },
            E = function(e, t, n) {
                for (var r = 0, i; i = e[r]; r++) {
                    if (i.id == t) return i;
                    if (n && i[n]) {
                        var s = E(i[n], t, n);
                        if (s) return s
                    }
                }
                return null
            },
            S = function(e, t, n, r, i) {
                if (n) {
                    for (var s = 0, o; o = e[s]; s++) {
                        if (o.id == n) return e.splice(s, 0, t), t;
                        if (r && o[r]) {
                            var u = S(o[r], t, n, r, !0);
                            if (u) return u
                        }
                    }
                    if (i) return null
                }
                return e.push(t), t
            },
            x = function(e, t, n) {
                for (var r = 0, i; i = e[r]; r++) {
                    if (i.id == t) return e.splice(r, 1);
                    if (n && i[n]) {
                        var s = x(i[n], t, n);
                        if (s) return s
                    }
                }
                return null
            },
            T = function(e, t) {
                this.dialog = e;
                var n = t.contents;
                for (var r = 0, s; s = n[r]; r++) n[r] = s && new N(e, s);
                i.extend(this, t)
            };
        T.prototype = {
            getContents: function(e) {
                return E(this.contents, e)
            },
            getButton: function(e) {
                return E(this.buttons, e)
            },
            addContents: function(e, t) {
                return S(this.contents, e, t)
            },
            addButton: function(e, t) {
                return S(this.buttons, e, t)
            },
            removeContents: function(e) {
                x(this.contents, e)
            },
            removeButton: function(e) {
                x(this.buttons, e)
            }
        }, N.prototype = {
            get: function(e) {
                return E(this.elements, e, "children")
            },
            add: function(e, t) {
                return S(this.elements, e, t, "children")
            },
            remove: function(e) {
                x(this.elements, e, "children")
            }
        };
        var A, O = {},
            M, B = {},
            j = function(e) {
                var t = e.data.$.ctrlKey || e.data.$.metaKey,
                    n = e.data.$.altKey,
                    r = e.data.$.shiftKey,
                    i = String.fromCharCode(e.data.$.keyCode),
                    s = B[(t ? "CTRL+" : "") + (n ? "ALT+" : "") + (r ? "SHIFT+" : "") + i];
                if (!s || !s.length) return;
                s = s[s.length - 1], s.keydown && s.keydown.call(s.uiElement, s.dialog, s.key), e.data.preventDefault()
            },
            F = function(e) {
                var t = e.data.$.ctrlKey || e.data.$.metaKey,
                    n = e.data.$.altKey,
                    r = e.data.$.shiftKey,
                    i = String.fromCharCode(e.data.$.keyCode),
                    s = B[(t ? "CTRL+" : "") + (n ? "ALT+" : "") + (r ? "SHIFT+" : "") + i];
                if (!s || !s.length) return;
                s = s[s.length - 1], s.keyup && (s.keyup.call(s.uiElement, s.dialog, s.key), e.data.preventDefault())
            },
            I = function(e, t, n, r, i) {
                var s = B[n] || (B[n] = []);
                s.push({
                    uiElement: e,
                    dialog: t,
                    key: n,
                    keyup: i || e.accessKeyUp,
                    keydown: r || e.accessKeyDown
                })
            },
            q = function(e) {
                for (var t in B) {
                    var n = B[t];
                    for (var r = n.length - 1; r >= 0; r--)(n[r].dialog == e || n[r].uiElement == e) && n.splice(r, 1);
                    n.length === 0 && delete B[t]
                }
            },
            R = function(e, t) {
                e._.accessKeyMap[t] && e.selectPage(e._.accessKeyMap[t])
            },
            U = function(e, t) {};
        (function() {
            l.dialog = {
                uiElement: function(r, s, o, u, a, f, l) {
                    if (arguments.length < 4) return;
                    var c = (u.call ? u(s) : u) || "div",
                        h = ["<", c, " "],
                        p = (a && a.call ? a(s) : a) || {},
                        d = (f && f.call ? f(s) : f) || {},
                        v = (l && l.call ? l.call(this, r, s) : l) || "",
                        m = this.domId = d.id || i.getNextId() + "_uiElement",
                        g = this.id = s.id,
                        y;
                    d.id = m;
                    var w = {};
                    s.type && (w["cke_dialog_ui_" + s.type] = 1), s.className && (w[s.className] = 1), s.disabled && (w.cke_disabled = 1);
                    var E = d["class"] && d["class"].split ? d["class"].split(" ") : [];
                    for (y = 0; y < E.length; y++) E[y] && (w[E[y]] = 1);
                    var S = [];
                    for (y in w) S.push(y);
                    d["class"] = S.join(" "), s.title && (d.title = s.title);
                    var x = (s.style || "").split(";");
                    if (s.align) {
                        var T = s.align;
                        p["margin-left"] = T == "left" ? 0 : "auto", p["margin-right"] = T == "right" ? 0 : "auto"
                    }
                    for (y in p) x.push(y + ":" + p[y]);
                    s.hidden && x.push("display:none");
                    for (y = x.length - 1; y >= 0; y--) x[y] === "" && x.splice(y, 1);
                    x.length > 0 && (d.style = (d.style ? d.style + "; " : "") + x.join("; "));
                    for (y in d) h.push(y + '="' + i.htmlEncode(d[y]) + '" ');
                    h.push(">", v, "</", c, ">"), o.push(h.join("")), (this._ || (this._ = {})).dialog = r, typeof s.isChanged == "boolean" && (this.isChanged = function() {
                        return s.isChanged
                    }), typeof s.isChanged == "function" && (this.isChanged = s.isChanged), typeof s.setValue == "function" && (this.setValue = i.override(this.setValue, function(e) {
                        return function(t) {
                            e.call(this, s.setValue.call(this, t))
                        }
                    })), typeof s.getValue == "function" && (this.getValue = i.override(this.getValue, function(e) {
                        return function() {
                            return s.getValue.call(this, e.call(this))
                        }
                    })), e.event.implementOn(this), this.registerEvents(s), this.accessKeyUp && this.accessKeyDown && s.accessKey && I(this, r, "CTRL+" + s.accessKey);
                    var N = this;
                    r.on("load", function() {
                        var e = N.getInputElement();
                        if (e) {
                            var i = N.type in {
                                checkbox: 1,
                                ratio: 1
                            } && n && t.version < 8 ? "cke_dialog_ui_focused" : "";
                            e.on("focus", function() {
                                r._.tabBarMode = !1, r._.hasFocus = !0, N.fire("focus"), i && this.addClass(i)
                            }), e.on("blur", function() {
                                N.fire("blur"), i && this.removeClass(i)
                            })
                        }
                    }), this.keyboardFocusable && (this.tabIndex = s.tabIndex || 0, this.focusIndex = r._.focusList.push(this) - 1, this.on("focus", function() {
                        r._.currentFocusIndex = N.focusIndex
                    })), i.extend(this, s)
                },
                hbox: function(e, r, i, o, u) {
                    if (arguments.length < 4) return;
                    this._ || (this._ = {});
                    var a = this._.children = r,
                        f = u && u.widths || null,
                        c = u && u.height || null,
                        h = {},
                        p, d = function() {
                            var e = ['<tbody><tr class="cke_dialog_ui_hbox">'];
                            for (p = 0; p < i.length; p++) {
                                var r = "cke_dialog_ui_hbox_child",
                                    o = [];
                                p === 0 && (r = "cke_dialog_ui_hbox_first"), p == i.length - 1 && (r = "cke_dialog_ui_hbox_last"), e.push('<td class="', r, '" role="presentation" '), f ? f[p] && o.push("width:" + s(f[p])) : o.push("width:" + Math.floor(100 / i.length) + "%"), c && o.push("height:" + s(c)), u && u.padding != undefined && o.push("padding:" + s(u.padding)), n && t.quirks && a[p].align && o.push("text-align:" + a[p].align), o.length > 0 && e.push('style="' + o.join("; ") + '" '), e.push(">", i[p], "</td>")
                            }
                            return e.push("</tr></tbody>"), e.join("")
                        },
                        v = {
                            role: "presentation"
                        };
                    u && u.align && (v.align = u.align), l.dialog.uiElement.call(this, e, u || {
                        type: "hbox"
                    }, o, "table", h, v, d)
                },
                vbox: function(e, r, o, u, a) {
                    if (arguments.length < 3) return;
                    this._ || (this._ = {});
                    var f = this._.children = r,
                        c = a && a.width || null,
                        h = a && a.heights || null,
                        p = function() {
                            var r = ['<table role="presentation" cellspacing="0" border="0" '];
                            r.push('style="'), a && a.expand && r.push("height:100%;"), r.push("width:" + s(c || "100%"), ";"), r.push('"'), r.push('align="', i.htmlEncode(a && a.align || (e.getParentEditor().lang.dir == "ltr" ? "left" : "right")), '" '), r.push("><tbody>");
                            for (var u = 0; u < o.length; u++) {
                                var l = [];
                                r.push('<tr><td role="presentation" '), c && l.push("width:" + s(c || "100%")), h ? l.push("height:" + s(h[u])) : a && a.expand && l.push("height:" + Math.floor(100 / o.length) + "%"), a && a.padding != undefined && l.push("padding:" + s(a.padding)), n && t.quirks && f[u].align && l.push("text-align:" + f[u].align), l.length > 0 && r.push('style="', l.join("; "), '" '), r.push(' class="cke_dialog_ui_vbox_child">', o[u], "</td></tr>")
                            }
                            return r.push("</tbody></table>"), r.join("")
                        };
                    l.dialog.uiElement.call(this, e, a || {
                        type: "vbox"
                    }, u, "div", null, {
                        role: "presentation"
                    }, p)
                }
            }
        })(), l.dialog.uiElement.prototype = {
            getElement: function() {
                return e.document.getById(this.domId)
            },
            getInputElement: function() {
                return this.getElement()
            },
            getDialog: function() {
                return this._.dialog
            },
            setValue: function(e, t) {
                return this.getInputElement().setValue(e), !t && this.fire("change", {
                    value: e
                }), this
            },
            getValue: function() {
                return this.getInputElement().getValue()
            },
            isChanged: function() {
                return !1
            },
            selectParentTab: function() {
                var e = this,
                    t = e.getInputElement(),
                    n = t,
                    r;
                while ((n = n.getParent()) && n.$.className.search("cke_dialog_page_contents") == -1);
                return n ? (r = n.getAttribute("name"), e._.dialog._.currentTabId != r && e._.dialog.selectPage(r), e) : e
            },
            focus: function() {
                return this.selectParentTab().getInputElement().focus(), this
            },
            registerEvents: function(e) {
                var t = /^on([A-Z]\w+)/,
                    n, r = function(e, t, n, r) {
                        t.on("load", function() {
                            e.getInputElement().on(n, r, e)
                        })
                    };
                for (var i in e) {
                    if (!(n = i.match(t))) continue;
                    this.eventProcessors[i] ? this.eventProcessors[i].call(this, this._.dialog, e[i]) : r(this, this._.dialog, n[1].toLowerCase(), e[i])
                }
                return this
            },
            eventProcessors: {
                onLoad: function(e, t) {
                    e.on("load", t, this)
                },
                onShow: function(e, t) {
                    e.on("show", t, this)
                },
                onHide: function(e, t) {
                    e.on("hide", t, this)
                }
            },
            accessKeyDown: function(e, t) {
                this.focus()
            },
            accessKeyUp: function(e, t) {},
            disable: function() {
                var e = this.getElement(),
                    t = this.getInputElement();
                t.setAttribute("disabled", "true"), e.addClass("cke_disabled")
            },
            enable: function() {
                var e = this.getElement(),
                    t = this.getInputElement();
                t.removeAttribute("disabled"), e.removeClass("cke_disabled")
            },
            isEnabled: function() {
                return !this.getElement().hasClass("cke_disabled")
            },
            isVisible: function() {
                return this.getInputElement().isVisible()
            },
            isFocusable: function() {
                return !this.isEnabled() || !this.isVisible() ? !1 : !0
            }
        }, l.dialog.hbox.prototype = i.extend(new l.dialog.uiElement, {
            getChild: function(e) {
                var t = this;
                return arguments.length < 1 ? t._.children.concat() : (e.splice || (e = [e]), e.length < 2 ? t._.children[e[0]] : t._.children[e[0]] && t._.children[e[0]].getChild ? t._.children[e[0]].getChild(e.slice(1, e.length)) : null)
            }
        }, !0), l.dialog.vbox.prototype = new l.dialog.hbox, function() {
            var t = {
                build: function(t, n, r) {
                    var i = n.children,
                        s, o = [],
                        u = [];
                    for (var a = 0; a < i.length && (s = i[a]); a++) {
                        var f = [];
                        o.push(f), u.push(e.dialog._.uiElementBuilders[s.type].build(t, s, f))
                    }
                    return new l.dialog[n.type](t, u, o, r, n)
                }
            };
            e.dialog.addUIElement("hbox", t), e.dialog.addUIElement("vbox", t)
        }(), e.dialogCommand = function(e) {
            this.dialogName = e
        }, e.dialogCommand.prototype = {
            exec: function(e) {
                t.opera ? i.setTimeout(function() {
                    e.openDialog(this.dialogName)
                }, 0, this) : e.openDialog(this.dialogName)
            },
            canUndo: !1,
            editorFocus: n || t.webkit
        }, function() {
            var t = /^([a]|[^a])+$/,
                n = /^\d*$/,
                r = /^\d*(?:\.\d+)?$/,
                s = /^(((\d*(\.\d+))|(\d*))(px|\%)?)?$/,
                o = /^(((\d*(\.\d+))|(\d*))(px|em|ex|in|cm|mm|pt|pc|\%)?)?$/i,
                u = /^(\s*[\w-]+\s*:\s*[^:;]+(?:;|$))*$/;
            e.VALIDATE_OR = 1, e.VALIDATE_AND = 2, e.dialog.validate = {
                functions: function() {
                    var e = arguments;
                    return function() {
                        var t = this && this.getValue ? this.getValue() : e[0],
                            n = undefined,
                            r = 2,
                            i = [],
                            s;
                        for (s = 0; s < e.length; s++) {
                            if (typeof e[s] != "function") break;
                            i.push(e[s])
                        }
                        s < e.length && typeof e[s] == "string" && (n = e[s], s++), s < e.length && typeof e[s] == "number" && (r = e[s]);
                        var o = r == 2 ? !0 : !1;
                        for (s = 0; s < i.length; s++) r == 2 ? o = o && i[s](t) : o = o || i[s](t);
                        return o ? !0 : n
                    }
                },
                regex: function(e, t) {
                    return function() {
                        var n = this && this.getValue ? this.getValue() : arguments[0];
                        return e.test(n) ? !0 : t
                    }
                },
                notEmpty: function(e) {
                    return this.regex(t, e)
                },
                integer: function(e) {
                    return this.regex(n, e)
                },
                number: function(e) {
                    return this.regex(r, e)
                },
                cssLength: function(e) {
                    return this.functions(function(e) {
                        return o.test(i.trim(e))
                    }, e)
                },
                htmlLength: function(e) {
                    return this.functions(function(e) {
                        return s.test(i.trim(e))
                    }, e)
                },
                inlineStyle: function(e) {
                    return this.functions(function(e) {
                        return u.test(i.trim(e))
                    }, e)
                },
                equals: function(e, t) {
                    return this.functions(function(t) {
                        return t == e
                    }, t)
                },
                notEqual: function(e, t) {
                    return this.functions(function(t) {
                        return t != e
                    }, t)
                }
            }, e.on("instanceDestroyed", function(t) {
                if (i.isEmpty(e.instances)) {
                    var n;
                    while (n = e.dialog._.currentTop) n.hide();
                    H()
                }
                var r = t.editor._.storedDialogs;
                for (var s in r) r[s].destroy()
            })
        }(), i.extend(e.editor.prototype, {
            openDialog: function(t, r) {
                function l(n) {
                    var i = e.dialog._.dialogDefinitions[t],
                        s = f.skin.dialog;
                    if (!s._isLoaded || c && typeof n == "undefined") return;
                    typeof i != "function" && (e.dialog._.dialogDefinitions[t] = "failed"), f.openDialog(t, r)
                }
                if (this.mode == "wysiwyg" && n) {
                    var i = this.getSelection();
                    i && i.lock()
                }
                var s = e.dialog._.dialogDefinitions[t],
                    o = this.skin.dialog;
                e.dialog._.currentTop === null && D(this);
                if (typeof s == "function" && o._isLoaded) {
                    var u = this._.storedDialogs || (this._.storedDialogs = {}),
                        a = u[t] || (u[t] = new e.dialog(this, t));
                    return r && r.call(a, a), a.show(), a
                }
                if (s == "failed") throw P(), new Error('[CKEDITOR.dialog.openDialog] Dialog "' + t + '" failed when loading definition.');
                var f = this;
                if (typeof s == "string") {
                    var c = 1;
                    e.scriptLoader.load(e.getUrl(s), l, null, 0, 1)
                }
                return e.skins.load(this, "dialog", l), null
            }
        })
    }(), f.add("dialog", {
        requires: ["dialogui"]
    }), f.add("styles", {
        requires: ["selection"],
        init: function(e) {
            e.on("contentDom", function() {
                e.document.setCustomData("cke_includeReadonly", !e.config.disableReadonlyStyling)
            })
        }
    }), e.editor.prototype.attachStyleStateChange = function(e, t) {
        var n = this._.styleStateChangeCallbacks;
        n || (n = this._.styleStateChangeCallbacks = [], this.on("selectionChange", function(e) {
            for (var t = 0; t < n.length; t++) {
                var r = n[t],
                    i = r.style.checkActive(e.data.path) ? 1 : 2;
                r.fn.call(this, i)
            }
        })), n.push({
            style: e,
            fn: t
        })
    }, e.STYLE_BLOCK = 1, e.STYLE_INLINE = 2, e.STYLE_OBJECT = 3, function() {
        function p(e) {
            var t, n;
            while (e = e.getParent()) {
                if (e.getName() == "body") break;
                if (e.getAttribute("data-nostyle")) t = e;
                else if (!n) {
                    var r = e.getAttribute("contentEditable");
                    r == "false" ? t = e : r == "true" && (n = 1)
                }
            }
            return t
        }
        function v(e) {
            var t = this,
                i = e.document;
            if (e.collapsed) {
                var o = M(t, i);
                e.insertNode(o), e.moveToPosition(o, 2);
                return
            }
            var a = t.element,
                f = t._.definition,
                c, v = f.ignoreReadonly,
                m = v || f.includeReadonly;
            m == undefined && (m = i.getCustomData("cke_includeReadonly"));
            var g = s[a] || (c = !0, s.span);
            e.enlarge(1, 1), e.trim();
            var y = e.createBookmark(),
                b = y.startNode,
                w = y.endNode,
                E = b,
                S;
            if (!v) {
                var x = p(b),
                    T = p(w);
                x && (E = x.getNextSourceNode(!0)), T && (w = T)
            }
            E.getPosition(w) == 2 && (E = 0);
            while (E) {
                var N = !1;
                if (E.equals(w)) E = null, N = !0;
                else {
                    var C = E.type,
                        k = C == 1 ? E.getName() : null,
                        A = k && E.getAttribute("contentEditable") == "false",
                        O = k && E.getAttribute("data-nostyle");
                    if (k && E.data("cke-bookmark")) {
                        E = E.getNextSourceNode(!0);
                        continue
                    }
                    if (!k || g[k] && !O && (!A || m) && (E.getPosition(w) | 4 | 0 | 8) == 4 + 0 + 8 && (!f.childRule || f.childRule(E))) {
                        var _ = E.getParent();
                        if (_ && ((_.getDtd() || s.span)[a] || c) && (!f.parentRule || f.parentRule(_))) {
                            !S && (!k || !s.$removeEmpty[k] || (E.getPosition(w) | 4 | 0 | 8) == 4 + 0 + 8) && (S = new r.range(i), S.setStartBefore(E));
                            if (C == 3 || A || C == 1 && !E.getChildCount()) {
                                var D = E,
                                    P;
                                while ((N = !D.getNext(l)) && (P = D.getParent(), g[P.getName()]) && (P.getPosition(b) | 2 | 0 | 8) == 2 + 0 + 8 && (!f.childRule || f.childRule(P))) D = P;
                                S.setEndAfter(D)
                            }
                        } else N = !0
                    } else N = !0;
                    E = E.getNextSourceNode(O || A)
                }
                if (N && S && !S.collapsed) {
                    var H = M(t, i),
                        B = H.hasAttributes(),
                        j = S.getCommonAncestor(),
                        F = {
                            styles: {},
                            attrs: {},
                            blockedStyles: {},
                            blockedAttrs: {}
                        },
                        I, q, R;
                    while (H && j) {
                        if (j.getName() == a) {
                            for (I in f.attributes) {
                                if (F.blockedAttrs[I] || !(R = j.getAttribute(q))) continue;
                                H.getAttribute(I) == R ? F.attrs[I] = 1 : F.blockedAttrs[I] = 1
                            }
                            for (q in f.styles) {
                                if (F.blockedStyles[q] || !(R = j.getStyle(q))) continue;
                                H.getStyle(q) == R ? F.styles[q] = 1 : F.blockedStyles[q] = 1
                            }
                        }
                        j = j.getParent()
                    }
                    for (I in F.attrs) H.removeAttribute(I);
                    for (q in F.styles) H.removeStyle(q);
                    B && !H.hasAttributes() && (H = null), H ? (S.extractContents().appendTo(H), L(t, H), S.insertNode(H), H.mergeSiblings(), n || H.$.normalize()) : (H = new u("span"), S.extractContents().appendTo(H), S.insertNode(H), L(t, H), H.remove(!0)), S = null
                }
            }
            e.moveToBookmark(y), e.shrink(2)
        }
        function m(e) {
            e.enlarge(1, 1);
            var t = e.createBookmark(),
                n = t.startNode;
            if (e.collapsed) {
                var i = new r.elementPath(n.getParent()),
                    s;
                for (var o = 0, u; o < i.elements.length && (u = i.elements[o]); o++) {
                    if (u == i.block || u == i.blockLimit) break;
                    if (this.checkElementRemovable(u)) {
                        var a;
                        e.collapsed && (e.checkBoundaryOfElement(u, 2) || (a = e.checkBoundaryOfElement(u, 1))) ? (s = u, s.match = a ? "start" : "end") : (u.mergeSiblings(), u.getName() == this.element ? k(this, u) : A(u, H(this)[u.getName()]))
                    }
                }
                if (s) {
                    var f = n;
                    for (o = 0; !0; o++) {
                        var l = i.elements[o];
                        if (l.equals(s)) break;
                        if (l.match) continue;
                        l = l.clone(), l.append(f), f = l
                    }
                    f[s.match == "start" ? "insertBefore" : "insertAfter"](s)
                }
            } else {
                var c = t.endNode,
                    h = this;
                function p() {
                    var e = new r.elementPath(n.getParent()),
                        t = new r.elementPath(c.getParent()),
                        i = null,
                        s = null;
                    for (var o = 0; o < e.elements.length; o++) {
                        var u = e.elements[o];
                        if (u == e.block || u == e.blockLimit) break;
                        h.checkElementRemovable(u) && (i = u)
                    }
                    for (o = 0; o < t.elements.length; o++) {
                        u = t.elements[o];
                        if (u == t.block || u == t.blockLimit) break;
                        h.checkElementRemovable(u) && (s = u)
                    }
                    s && c.breakParent(s), i && n.breakParent(i)
                }
                p();
                var v = n;
                while (!v.equals(c)) {
                    var m = v.getNextSourceNode();
                    v.type == 1 && this.checkElementRemovable(v) && (v.getName() == this.element ? k(this, v) : A(v, H(this)[v.getName()]), m.type == 1 && m.contains(n) && (p(), m = n.getNext())), v = m
                }
            }
            e.moveToBookmark(t)
        }
        function g(e) {
            var t = e.getCommonAncestor(!0, !0),
                n = t.getAscendant(this.element, !0);
            n && !n.isReadOnly() && _(n, this)
        }
        function y(e) {
            var t = e.getCommonAncestor(!0, !0),
                n = t.getAscendant(this.element, !0);
            if (!n) return;
            var r = this,
                i = r._.definition,
                s = i.attributes;
            if (s) for (var o in s) n.removeAttribute(o, s[o]);
            if (i.styles) for (var u in i.styles) {
                if (!i.styles.hasOwnProperty(u)) continue;
                n.removeStyle(u)
            }
        }
        function b(e) {
            var t = e.createBookmark(!0),
                n = e.createIterator();
            n.enforceRealBlocks = !0, this._.enterMode && (n.enlargeBr = this._.enterMode != 2);
            var r, i = e.document,
                s;
            while (r = n.getNextParagraph()) if (!r.isReadOnly()) {
                var o = M(this, i, r);
                E(r, o)
            }
            e.moveToBookmark(t)
        }
        function w(e) {
            var t = this,
                n = e.createBookmark(1),
                r = e.createIterator();
            r.enforceRealBlocks = !0, r.enlargeBr = t._.enterMode != 2;
            var i;
            while (i = r.getNextParagraph()) if (t.checkElementRemovable(i)) if (i.is("pre")) {
                var s = t._.enterMode == 2 ? null : e.document.createElement(t._.enterMode == 1 ? "p" : "div");
                s && i.copyAttributes(s), E(i, s)
            } else k(t, i, 1);
            e.moveToBookmark(n)
        }
        function E(e, t) {
            var n = !t;
            n && (t = e.getDocument().createElement("div"), e.copyAttributes(t));
            var r = t && t.is("pre"),
                i = e.is("pre"),
                s = r && !i,
                o = !r && i;
            s ? t = C(e, t) : o ? t = N(n ? [e.getHtml()] : x(e), t) : e.moveChildren(t), t.replace(e), r ? S(t) : n && O(t)
        }
        function S(e) {
            var t;
            if (!((t = e.getPrevious(c)) && t.is && t.is("pre"))) return;
            var r = T(t.getHtml(), /\n$/, "") + "\n\n" + T(e.getHtml(), /^\n/, "");
            n ? e.$.outerHTML = "<pre>" + r + "</pre>" : e.setHtml(r), t.remove()
        }
        function x(e) {
            var t = /(\S\s*)\n(?:\s|(<span[^>]+data-cke-bookmark.*?\/span>))*\n(?!$)/gi,
                n = e.getName(),
                r = T(e.getOuterHtml(), t, function(e, t, n) {
                    return t + "</pre>" + n + "<pre>"
                }),
                i = [];
            return r.replace(/<pre\b.*?>([\s\S]*?)<\/pre>/gi, function(e, t) {
                i.push(t)
            }), i
        }
        function T(e, t, n) {
            var r = "",
                i = "";
            return e = e.replace(/(^<span[^>]+data-cke-bookmark.*?\/span>)|(<span[^>]+data-cke-bookmark.*?\/span>$)/gi, function(e, t, n) {
                return t && (r = t), n && (i = n), ""
            }), r + e.replace(t, n) + i
        }
        function N(e, t) {
            var n;
            e.length > 1 && (n = new r.documentFragment(t.getDocument()));
            for (var s = 0; s < e.length; s++) {
                var o = e[s];
                o = o.replace(/(\r\n|\r)/g, "\n"), o = T(o, /^[ \t]*\n/, ""), o = T(o, /\n$/, ""), o = T(o, /^[ \t]+|[ \t]+$/g, function(e, t, n) {
                    return e.length == 1 ? "&nbsp;" : t ? " " + i.repeat("&nbsp;", e.length - 1) : i.repeat("&nbsp;", e.length - 1) + " "
                }), o = o.replace(/\n/g, "<br>"), o = o.replace(/[ \t]{2,}/g, function(e) {
                    return i.repeat("&nbsp;", e.length - 1) + " "
                });
                if (n) {
                    var u = t.clone();
                    u.setHtml(o), n.append(u)
                } else t.setHtml(o)
            }
            return n || t
        }
        function C(e, t) {
            var r = e.getBogus();
            r && r.remove();
            var i = e.getHtml();
            i = T(i, /(?:^[ \t\n\r]+)|(?:[ \t\n\r]+$)/g, ""), i = i.replace(/[ \t\r\n]*(<br[^>]*>)[ \t\r\n]*/gi, "$1"), i = i.replace(/([ \t\n\r]+|&nbsp;)/g, " "), i = i.replace(/<br\b[^>]*>/gi, "\n");
            if (n) {
                var s = e.getDocument().createElement("div");
                s.append(t), t.$.outerHTML = "<pre>" + i + "</pre>", t.copyAttributes(s.getFirst()), t = s.getFirst().remove()
            } else t.setHtml(i);
            return t
        }
        function k(e, n) {
            var r = e._.definition,
                o = r.attributes,
                u = r.styles,
                a = H(e)[n.getName()],
                f = i.isEmpty(o) && i.isEmpty(u);
            for (var l in o) {
                if (!(l != "class" && !e._.definition.fullMatch || n.getAttribute(l) == B(l, o[l]))) continue;
                f = n.hasAttribute(l), n.removeAttribute(l)
            }
            for (var c in u) {
                if (e._.definition.fullMatch && n.getStyle(c) != B(c, u[c], true)) continue;
                f = f || !! n.getStyle(c), n.removeStyle(c)
            }
            A(n, a, t[n.getName()]), f && (!s.$block[n.getName()] || e._.enterMode == 2 && !n.hasAttributes() ? O(n) : n.renameNode(e._.enterMode == 1 ? "p" : "div"))
        }
        function L(e, t) {
            var n = e._.definition,
                r = n.attributes,
                i = n.styles,
                s = H(e),
                o = t.getElementsByTag(e.element);
            for (var u = o.count(); --u >= 0;) k(e, o.getItem(u));
            for (var a in s) if (a != e.element) {
                o = t.getElementsByTag(a);
                for (u = o.count() - 1; u >= 0; u--) {
                    var f = o.getItem(u);
                    A(f, s[a])
                }
            }
        }
        function A(e, t, n) {
            var r = t && t.attributes;
            if (r) for (var i = 0; i < r.length; i++) {
                var s = r[i][0],
                    o;
                if (o = e.getAttribute(s)) {
                    var u = r[i][1];
                    (u === null || u.test && u.test(o) || typeof u == "string" && o == u) && e.removeAttribute(s)
                }
            }
            n || O(e)
        }
        function O(e) {
            if (!e.hasAttributes()) if (s.$block[e.getName()]) {
                var t = e.getPrevious(c),
                    n = e.getNext(c);
                t && (t.type == 3 || !t.isBlockBoundary({
                    br: 1
                })) && e.append("br", 1), n && (n.type == 3 || !n.isBlockBoundary({
                    br: 1
                })) && e.append("br"), e.remove(!0)
            } else {
                var r = e.getFirst(),
                    i = e.getLast();
                e.remove(!0), r && (r.type == 1 && r.mergeSiblings(), i && !r.equals(i) && i.type == 1 && i.mergeSiblings())
            }
        }
        function M(e, t, n) {
            var r, i = e._.definition,
                s = e.element;
            return s == "*" && (s = "span"), r = new u(s, t), n && n.copyAttributes(r), r = _(r, e), t.getCustomData("doc_processing_style") && r.hasAttribute("id") ? r.removeAttribute("id") : t.setCustomData("doc_processing_style", 1), r
        }
        function _(t, n) {
            var r = n._.definition,
                i = r.attributes,
                s = e.style.getStyleText(r);
            if (i) for (var o in i) t.setAttribute(o, i[o]);
            return s && t.setAttribute("style", s), t
        }
        function D(e, t) {
            for (var n in e) e[n] = e[n].replace(f, function(e, n) {
                return t[n]
            })
        }
        function P(t) {
            var n = t._AC;
            if (n) return n;
            n = {};
            var r = 0,
                i = t.attributes;
            if (i) for (var s in i) r++, n[s] = i[s];
            var o = e.style.getStyleText(t);
            return o && (n.style || r++, n.style = o), n._length = r, t._AC = n
        }
        function H(e) {
            if (e._.overrides) return e._.overrides;
            var t = e._.overrides = {},
                n = e._.definition.overrides;
            if (n) {
                i.isArray(n) || (n = [n]);
                for (var r = 0; r < n.length; r++) {
                    var s = n[r],
                        o, u, a;
                    typeof s == "string" ? o = s.toLowerCase() : (o = s.element ? s.element.toLowerCase() : e.element, a = s.attributes), u = t[o] || (t[o] = {});
                    if (a) {
                        var f = u.attributes = u.attributes || [];
                        for (var l in a) f.push([l.toLowerCase(), a[l]])
                    }
                }
            }
            return t
        }
        function B(e, t, n) {
            var r = new u("span");
            return r[n ? "setStyle" : "setAttribute"](e, t), r[n ? "getStyle" : "getAttribute"](e)
        }
        function j(e, t) {
            var n;
            if (t !== !1) {
                var r = new u("span");
                r.setAttribute("style", e), n = r.getAttribute("style") || ""
            } else n = e;
            return n = n.replace(/(font-family:)(.*?)(?=;|$)/, function(e, t, n) {
                var r = n.split(",");
                for (var s = 0; s < r.length; s++) r[s] = i.trim(r[s].replace(/["']/g, ""));
                return t + r.join(",")
            }), n.replace(/\s*([;:])\s*/, "$1").replace(/([^\s;])$/, "$1;").replace(/,\s+/g, ",").replace(/\"/g, "").toLowerCase()
        }
        function F(e) {
            var t = {};
            return e.replace(/&quot;/g, '"').replace(/\s*([^ :;]+)\s*:\s*([^;]+)\s*(?=;|$)/g, function(e, n, r) {
                t[n] = r
            }), t
        }
        function I(e, t) {
            typeof e == "string" && (e = F(e)), typeof t == "string" && (t = F(t));
            for (var n in e) if (!(n in t) || t[n] != e[n] && e[n] != "inherit" && t[n] != "inherit") return !1;
            return !0
        }
        function q(e, t) {
            var n = e.getSelection(),
                r = n.createBookmarks(1),
                i = n.getRanges(),
                s = t ? this.removeFromRange : this.applyToRange,
                o, u = i.createIterator();
            while (o = u.getNextRange()) s.call(this, o);
            r.length == 1 && r[0].collapsed ? (n.selectRanges(i), e.getById(r[0].startNode).remove()) : n.selectBookmarks(r), e.removeCustomData("doc_processing_style")
        }
        var t = {
            address: 1,
            div: 1,
            h1: 1,
            h2: 1,
            h3: 1,
            h4: 1,
            h5: 1,
            h6: 1,
            p: 1,
            pre: 1,
            section: 1,
            header: 1,
            footer: 1,
            nav: 1,
            article: 1,
            aside: 1,
            figure: 1,
            dialog: 1,
            hgroup: 1,
            time: 1,
            meter: 1,
            menu: 1,
            command: 1,
            keygen: 1,
            output: 1,
            progress: 1,
            details: 1,
            datagrid: 1,
            datalist: 1
        },
            o = {
                a: 1,
                embed: 1,
                hr: 1,
                img: 1,
                li: 1,
                object: 1,
                ol: 1,
                table: 1,
                td: 1,
                tr: 1,
                th: 1,
                ul: 1,
                dl: 1,
                dt: 1,
                dd: 1,
                form: 1,
                audio: 1,
                video: 1
            },
            a = /\s*(?:;\s*|$)/,
            f = /#\((.+?)\)/g,
            l = r.walker.bookmark(0, 1),
            c = r.walker.whitespaces(1);
        e.style = function(e, n) {
            var r = this;
            n && (e = i.clone(e), D(e.attributes, n), D(e.styles, n));
            var s = r.element = e.element ? typeof e.element == "string" ? e.element.toLowerCase() : e.element : "*";
            r.type = t[s] ? 1 : o[s] ? 3 : 2, typeof r.element == "object" && (r.type = 3), r._ = {
                definition: e
            }
        }, e.style.prototype = {
            apply: function(e) {
                q.call(this, e, !1)
            },
            remove: function(e) {
                q.call(this, e, !0)
            },
            applyToRange: function(e) {
                var t = this;
                return (t.applyToRange = t.type == 2 ? v : t.type == 1 ? b : t.type == 3 ? g : null).call(t, e)
            },
            removeFromRange: function(e) {
                var t = this;
                return (t.removeFromRange = t.type == 2 ? m : t.type == 1 ? w : t.type == 3 ? y : null).call(t, e)
            },
            applyToObject: function(e) {
                _(e, this)
            },
            checkActive: function(e) {
                var t = this;
                switch (t.type) {
                case 1:
                    return t.checkElementRemovable(e.block || e.blockLimit, !0);
                case 3:
                case 2:
                    var n = e.elements;
                    for (var r = 0, i; r < n.length; r++) {
                        i = n[r];
                        if (t.type == 2 && (i == e.block || i == e.blockLimit)) continue;
                        if (t.type == 3) {
                            var s = i.getName();
                            if (!(typeof t.element == "string" ? s == t.element : s in t.element)) continue
                        }
                        if (t.checkElementRemovable(i, !0)) return !0
                    }
                }
                return !1
            },
            checkApplicable: function(e) {
                switch (this.type) {
                case 2:
                case 1:
                    break;
                case 3:
                    return e.lastElement.getAscendant(this.element, !0)
                }
                return !0
            },
            checkElementMatch: function(e, t) {
                var n = this,
                    r = n._.definition;
                if (!e || !r.ignoreReadonly && e.isReadOnly()) return !1;
                var i, s = e.getName();
                if (typeof n.element == "string" ? s == n.element : s in n.element) {
                    if (!t && !e.hasAttributes()) return !0;
                    i = P(r);
                    if (!i._length) return !0;
                    for (var o in i) {
                        if (o == "_length") continue;
                        var u = e.getAttribute(o) || "";
                        if (o == "style" ? I(i[o], j(u, !1)) : i[o] == u) {
                            if (!t) return !0
                        } else if (t) return !1
                    }
                    if (t) return !0
                }
                return !1
            },
            checkElementRemovable: function(e, t) {
                if (this.checkElementMatch(e, t)) return !0;
                var n = H(this)[e.getName()];
                if (n) {
                    var r, i;
                    if (!(r = n.attributes)) return !0;
                    for (var s = 0; s < r.length; s++) {
                        i = r[s][0];
                        var o = e.getAttribute(i);
                        if (o) {
                            var u = r[s][1];
                            if (u === null || typeof u == "string" && o == u || u.test(o)) return !0
                        }
                    }
                }
                return !1
            },
            buildPreview: function(t) {
                var n = this._.definition,
                    r = [],
                    i = n.element;
                i == "bdo" && (i = "span"), r = ["<", i];
                var s = n.attributes;
                if (s) for (var o in s) r.push(" ", o, '="', s[o], '"');
                var u = e.style.getStyleText(n);
                return u && r.push(' style="', u, '"'), r.push(">", t || n.name, "</", i, ">"), r.join("")
            }
        }, e.style.getStyleText = function(e) {
            var t = e._ST;
            if (t) return t;
            t = e.styles;
            var n = e.attributes && e.attributes.style || "",
                r = "";
            n.length && (n = n.replace(a, ";"));
            for (var i in t) {
                var s = t[i],
                    o = (i + ":" + s).replace(a, ";");
                s == "inherit" ? r += o : n += o
            }
            return n.length && (n = j(n)), n += r, e._ST = n
        }
    }(), e.styleCommand = function(e) {
        this.style = e
    }, e.styleCommand.prototype.exec = function(e) {
        var t = this;
        e.focus();
        var n = e.document;
        return n && (t.state == 2 ? t.style.apply(n) : t.state == 1 && t.style.remove(n)), !! n
    }, e.stylesSet = new e.resourceManager("", "stylesSet"), e.addStylesSet = i.bind(e.stylesSet.add, e.stylesSet), e.loadStylesSet = function(t, n, r) {
        e.stylesSet.addExternal(t, n, ""), e.stylesSet.load(t, r)
    }, e.editor.prototype.getStylesSet = function(t) {
        if (!this._.stylesDefinitions) {
            var n = this,
                r = n.config.stylesCombo_stylesSet || n.config.stylesSet || "default";
            if (r instanceof Array) {
                n._.stylesDefinitions = r, t(r);
                return
            }
            var i = r.split(":"),
                s = i[0],
                o = i[1],
                u = f.registered.styles.path;
            e.stylesSet.addExternal(s, o ? i.slice(1).join(":") : u + "styles/" + s + ".js", ""), e.stylesSet.load(s, function(e) {
                n._.stylesDefinitions = e[s], t(n._.stylesDefinitions)
            })
        } else t(this._.stylesDefinitions)
    }, f.add("domiterator"), function() {
        function e(e) {
            var t = this;
            if (arguments.length < 1) return;
            t.range = e, t.forceBrBreak = 0, t.enlargeBr = 1, t.enforceRealBlocks = 0, t._ || (t._ = {})
        }
        function a(e, t, n) {
            var r = e.getNextSourceNode(t, null, n);
            while (!s(r)) r = r.getNextSourceNode(t, null, n);
            return r
        }
        var t = /^[\r\n\t ]+$/,
            s = r.walker.bookmark(!1, !0),
            o = r.walker.whitespaces(!0),
            u = function(e) {
                return s(e) && o(e)
            };
        e.prototype = {
            getNextParagraph: function(e) {
                var o = this,
                    f, l, c, h, p, v;
                if (!o._.started) {
                    l = o.range.clone(), l.shrink(1, !0), h = l.endContainer.hasAscendant("pre", !0) || l.startContainer.hasAscendant("pre", !0), l.enlarge(o.forceBrBreak && !h || !o.enlargeBr ? 3 : 2);
                    if (!l.collapsed) {
                        var m = new r.walker(l.clone()),
                            g = r.walker.bookmark(!0, !0);
                        m.evaluator = g, o._.nextNode = m.next(), m = new r.walker(l.clone()), m.evaluator = g;
                        var y = m.previous();
                        o._.lastNode = y.getNextSourceNode(!0);
                        if (o._.lastNode && o._.lastNode.type == 3 && !i.trim(o._.lastNode.getText()) && o._.lastNode.getParent().isBlockBoundary()) {
                            var b = new r.range(l.document);
                            b.moveToPosition(o._.lastNode, 4);
                            if (b.checkEndOfBlock()) {
                                var w = new r.elementPath(b.endContainer),
                                    E = w.block || w.blockLimit;
                                o._.lastNode = E.getNextSourceNode(!0)
                            }
                        }
                        o._.lastNode || (o._.lastNode = o._.docEndMarker = l.document.createText(""), o._.lastNode.insertAfter(y)), l = null
                    }
                    o._.started = 1
                }
                var S = o._.nextNode;
                y = o._.lastNode, o._.nextNode = null;
                while (S) {
                    var x = 0,
                        T = S.hasAscendant("pre"),
                        N = S.type != 1,
                        C = 0;
                    if (!N) {
                        var k = S.getName();
                        if (S.isBlockBoundary(o.forceBrBreak && !T && {
                            br: 1
                        })) {
                            if (k == "br") N = 1;
                            else if (!l && !S.getChildCount() && k != "hr") {
                                f = S, c = S.equals(y);
                                break
                            }
                            l && (l.setEndAt(S, 3), k != "br" && (o._.nextNode = S)), x = 1
                        } else {
                            if (S.getFirst()) {
                                l || (l = new r.range(o.range.document), l.setStartAt(S, 3)), S = S.getFirst();
                                continue
                            }
                            N = 1
                        }
                    } else S.type == 3 && t.test(S.getText()) && (N = 0);
                    N && !l && (l = new r.range(o.range.document), l.setStartAt(S, 3)), c = (!x || N) && S.equals(y);
                    if (l && !x) while (!S.getNext(u) && !c) {
                        var L = S.getParent();
                        if (L.isBlockBoundary(o.forceBrBreak && !T && {
                            br: 1
                        })) {
                            x = 1, N = 0, c = c || L.equals(y), l.setEndAt(L, 2);
                            break
                        }
                        S = L, N = 1, c = S.equals(y), C = 1
                    }
                    N && l.setEndAt(S, 4), S = a(S, C, y), c = !S;
                    if (c || x && l) break
                }
                if (!f) {
                    if (!l) return o._.docEndMarker && o._.docEndMarker.remove(), o._.nextNode = null, null;
                    var A = new r.elementPath(l.startContainer),
                        O = A.blockLimit,
                        M = {
                            div: 1,
                            th: 1,
                            td: 1
                        };
                    f = A.block;
                    if (!f && !o.enforceRealBlocks && M[O.getName()] && l.checkStartOfBlock() && l.checkEndOfBlock()) f = O;
                    else if (!f || o.enforceRealBlocks && f.getName() == "li") f = o.range.document.createElement(e || "p"), l.extractContents().appendTo(f), f.trim(), l.insertNode(f), p = v = !0;
                    else if (f.getName() != "li") {
                        if (!l.checkStartOfBlock() || !l.checkEndOfBlock()) {
                            f = f.clone(!1), l.extractContents().appendTo(f), f.trim();
                            var _ = l.splitBlock();
                            p = !_.wasStartOfBlock, v = !_.wasEndOfBlock, l.insertNode(f)
                        }
                    } else c || (o._.nextNode = f.equals(y) ? null : a(l.getBoundaryNodes().endNode, 1, y))
                }
                if (p) {
                    var D = f.getPrevious();
                    D && D.type == 1 && (D.getName() == "br" ? D.remove() : D.getLast() && D.getLast().$.nodeName.toLowerCase() == "br" && D.getLast().remove())
                }
                if (v) {
                    var P = f.getLast();
                    P && P.type == 1 && P.getName() == "br" && (n || P.getPrevious(s) || P.getNext(s)) && P.remove()
                }
                return o._.nextNode || (o._.nextNode = c || f.equals(y) || !y ? null : a(f, 1, y)), f
            }
        }, r.range.prototype.createIterator = function() {
            return new e(this)
        }
    }(), f.add("panelbutton", {
        requires: ["button"],
        onLoad: function() {
            function t(e) {
                var t = this,
                    n = t._;
                if (n.state == 0) return;
                t.createPanel(e);
                if (n.on) {
                    n.panel.hide();
                    return
                }
                n.panel.showBlock(t._.id, t.document.getById(t._.id), 4)
            }
            l.panelButton = i.createClass({
                base: l.button,
                $: function(n) {
                    var r = this,
                        i = n.panel;
                    delete n.panel, r.base(n), r.document = i && i.parent && i.parent.getDocument() || e.document, i.block = {
                        attributes: i.attributes
                    }, r.hasArrow = !0, r.click = t, r._ = {
                        panelDefinition: i
                    }
                },
                statics: {
                    handler: {
                        create: function(e) {
                            return new l.panelButton(e)
                        }
                    }
                },
                proto: {
                    createPanel: function(t) {
                        var n = this._;
                        if (n.panel) return;
                        var r = this._.panelDefinition || {},
                            i = this._.panelDefinition.block,
                            s = r.parent || e.document.getBody(),
                            o = this._.panel = new l.floatPanel(t, s, r),
                            u = o.addBlock(n.id, i),
                            a = this;
                        o.onShow = function() {
                            a.className && this.element.getFirst().addClass(a.className + "_panel"), a.setState(1), n.on = 1, a.onOpen && a.onOpen()
                        }, o.onHide = function(e) {
                            a.className && this.element.getFirst().removeClass(a.className + "_panel"), a.setState(a.modes && a.modes[t.mode] ? 2 : 0), n.on = 0, !e && a.onClose && a.onClose()
                        }, o.onEscape = function() {
                            o.hide(), a.document.getById(n.id).focus()
                        }, this.onBlock && this.onBlock(o, u), u.onHide = function() {
                            n.on = 0, a.setState(2)
                        }
                    }
                }
            })
        },
        beforeInit: function(e) {
            e.ui.addHandler("panelbutton", l.panelButton.handler)
        }
    }), e.UI_PANELBUTTON = "panelbutton", f.add("floatpanel", {
        requires: ["panel"]
    }), function() {
        function a(e, t, n, r, o) {
            var a = i.genKey(t.getUniqueId(), n.getUniqueId(), e.skinName, e.lang.dir, e.uiColor || "", r.css || "", o || ""),
                f = s[a];
            return f || (f = s[a] = new l.panel(t, r), f.element = n.append(u.createFromHtml(f.renderHtml(e), t)), f.element.setStyles({
                display: "none",
                position: "absolute"
            })), f
        }
        var s = {},
            o = !1;
        l.floatPanel = i.createClass({
            $: function(e, t, n, r) {
                n.forceIFrame = 1;
                var i = t.getDocument(),
                    s = a(e, i, t, n, r || 0),
                    o = s.element,
                    u = o.getFirst().getFirst();
                o.disableContextMenu(), this.element = o, this._ = {
                    editor: e,
                    panel: s,
                    parentElement: t,
                    definition: n,
                    document: i,
                    iframe: u,
                    children: [],
                    dir: e.lang.dir
                }, e.on("mode", function() {
                    this.hide()
                }, this)
            },
            proto: {
                addBlock: function(e, t) {
                    return this._.panel.addBlock(e, t)
                },
                addListBlock: function(e, t) {
                    return this._.panel.addListBlock(e, t)
                },
                getBlock: function(e) {
                    return this._.panel.getBlock(e)
                },
                showBlock: function(s, a, f, l, c) {
                    var p = this._.panel,
                        v = p.showBlock(s);
                    this.allowBlur(!1), o = 1, this._.returnFocus = this._.editor.focusManager.hasFocus ? this._.editor : new u(e.document.$.activeElement);
                    var m = this.element,
                        g = this._.iframe,
                        y = this._.definition,
                        w = a.getDocumentPosition(m.getDocument()),
                        E = this._.dir == "rtl",
                        S = w.x + (l || 0),
                        x = w.y + (c || 0);
                    !E || f != 1 && f != 4 ? !E && (f == 2 || f == 3) && (S += a.$.offsetWidth - 1) : S += a.$.offsetWidth;
                    if (f == 3 || f == 4) x += a.$.offsetHeight - 1;
                    this._.panel._.offsetParentId = a.getId(), m.setStyles({
                        top: x + "px",
                        left: 0,
                        display: ""
                    }), m.setOpacity(0), m.getFirst().removeStyle("width");
                    if (!this._.blurSet) {
                        var T = n ? g : new r.window(g.$.contentWindow);
                        e.event.useCapture = !0, T.on("blur", function(e) {
                            var t = this;
                            if (!t.allowBlur()) return;
                            var n = e.data.getTarget();
                            if (n.getName && n.getName() != "iframe") return;
                            t.visible && !t._.activeChild && !o && (delete t._.returnFocus, t.hide())
                        }, this), T.on("focus", function() {
                            this._.focused = !0, this.hideChild(), this.allowBlur(!0)
                        }, this), e.event.useCapture = !1, this._.blurSet = 1
                    }
                    p.onEscape = i.bind(function(e) {
                        if (this.onEscape && this.onEscape(e) === !1) return !1
                    }, this), i.setTimeout(function() {
                        var e = i.bind(function() {
                            var e = m.getFirst();
                            if (v.autoSize) {
                                var r = v.element.$;
                                if (t.gecko || t.opera) r = r.parentNode;
                                n && (r = r.document.body);
                                var i = r.scrollWidth;
                                n && t.quirks && i > 0 && (i += (e.$.offsetWidth || 0) - (e.$.clientWidth || 0) + 3), i += 4, e.setStyle("width", i + "px"), v.element.addClass("cke_frameLoaded");
                                var s = v.element.$.scrollHeight;
                                n && t.quirks && s > 0 && (s += (e.$.offsetHeight || 0) - (e.$.clientHeight || 0) + 3), e.setStyle("height", s + "px"), p._.currentBlock.element.setStyle("display", "none").removeStyle("display")
                            } else e.removeStyle("height");
                            E && (S -= m.$.offsetWidth), m.setStyle("left", S + "px");
                            var o = p.element,
                                a = o.getWindow(),
                                f = m.$.getBoundingClientRect(),
                                l = a.getViewPaneSize(),
                                c = f.width || f.right - f.left,
                                d = f.height || f.bottom - f.top,
                                g = E ? f.right : l.width - f.left,
                                y = E ? l.width - f.right : f.left;
                            E ? g < c && (y > c ? S += c : l.width > c ? S -= f.left : S = S - f.right + l.width) : g < c && (y > c ? S -= c : l.width > c ? S = S - f.right + l.width : S -= f.left);
                            var w = l.height - f.top,
                                T = f.top;
                            w < d && (T > d ? x -= d : l.height > d ? x = x - f.bottom + l.height : x -= f.top);
                            if (n) {
                                var N = new u(m.$.offsetParent),
                                    k = N;
                                k.getName() == "html" && (k = k.getDocument().getBody()), k.getComputedStyle("direction") == "rtl" && (t.ie8Compat ? S -= m.getDocument().getDocumentElement().$.scrollLeft * 2 : S -= N.$.scrollWidth - N.$.clientWidth)
                            }
                            var L = m.getFirst(),
                                O;
                            (O = L.getCustomData("activePanel")) && O.onHide && O.onHide.call(this, 1), L.setCustomData("activePanel", this), m.setStyles({
                                top: x + "px",
                                left: S + "px"
                            }), m.setOpacity(1)
                        }, this);
                        p.isLoaded ? e() : p.onLoad = e, i.setTimeout(function() {
                            g.$.contentWindow.focus(), this.allowBlur(!0)
                        }, 0, this)
                    }, t.air ? 200 : 0, this), this.visible = 1, this.onShow && this.onShow.call(this), o = 0
                },
                hide: function(e) {
                    var n = this;
                    if (n.visible && (!n.onHide || n.onHide.call(n) !== !0)) {
                        n.hideChild(), t.gecko && n._.iframe.getFrameDocument().$.activeElement.blur(), n.element.setStyle("display", "none"), n.visible = 0, n.element.getFirst().removeCustomData("activePanel");
                        var r = e !== !1 && n._.returnFocus;
                        r && (t.webkit && r.type && r.getWindow().$.focus(), r.focus())
                    }
                },
                allowBlur: function(e) {
                    var t = this._.panel;
                    return e != undefined && (t.allowBlur = e), t.allowBlur
                },
                showAsChild: function(e, n, r, s, o, u) {
                    if (this._.activeChild == e && e._.panel._.offsetParentId == r.getId()) return;
                    this.hideChild(), e.onHide = i.bind(function() {
                        i.setTimeout(function() {
                            this._.focused || this.hide()
                        }, 0, this)
                    }, this), this._.activeChild = e, this._.focused = !1, e.showBlock(n, r, s, o, u), (t.ie7Compat || t.ie8 && t.ie6Compat) && setTimeout(function() {
                        e.element.getChild(0).$.style.cssText += ""
                    }, 100)
                },
                hideChild: function() {
                    var e = this._.activeChild;
                    e && (delete e.onHide, delete e._.returnFocus, delete this._.activeChild, e.hide())
                }
            }
        }), e.on("instanceDestroyed", function() {
            var t = i.isEmpty(e.instances);
            for (var n in s) {
                var r = s[n];
                t ? r.destroy() : r.element.hide()
            }
            t && (s = {})
        })
    }(), f.add("menu", {
        beforeInit: function(t) {
            var n = t.config.menu_groups.split(","),
                r = t._.menuGroups = {},
                i = t._.menuItems = {};
            for (var s = 0; s < n.length; s++) r[n[s]] = s + 1;
            t.addMenuGroup = function(e, t) {
                r[e] = t || 100
            }, t.addMenuItem = function(t, n) {
                r[n.group] && (i[t] = new e.menuItem(this, t, n))
            }, t.addMenuItems = function(e) {
                for (var t in e) this.addMenuItem(t, e[t])
            }, t.getMenuItem = function(e) {
                return i[e]
            }, t.removeMenuItem = function(e) {
                delete i[e]
            }
        },
        requires: ["floatpanel"]
    }), function() {
        function r(e) {
            e.sort(function(e, t) {
                return e.group < t.group ? -1 : e.group > t.group ? 1 : e.order < t.order ? -1 : e.order > t.order ? 1 : 0
            })
        }
        e.menu = i.createClass({
            $: function(e, t) {
                var n = this;
                t = n._.definition = t || {}, n.id = i.getNextId(), n.editor = e, n.items = [], n._.listeners = [], n._.level = t.level || 1;
                var r = i.extend({}, t.panel, {
                    css: e.skin.editor.css,
                    level: n._.level - 1,
                    block: {}
                }),
                    s = r.block.attributes = r.attributes || {};
                !s.role && (s.role = "menu"), n._.panelDefinition = r
            },
            _: {
                onShow: function() {
                    var e = this,
                        t = e.editor.getSelection();
                    n && t && t.lock();
                    var r = t && t.getStartElement(),
                        i = e._.listeners,
                        s = [];
                    e.removeAll();
                    for (var o = 0; o < i.length; o++) {
                        var u = i[o](r, t);
                        if (u) for (var a in u) {
                            var f = e.editor.getMenuItem(a);
                            f && (!f.command || e.editor.getCommand(f.command).state) && (f.state = u[a], e.add(f))
                        }
                    }
                },
                onClick: function(e) {
                    this.hide(!1), e.onClick ? e.onClick() : e.command && this.editor.execCommand(e.command)
                },
                onEscape: function(e) {
                    var t = this.parent;
                    if (t) {
                        t._.panel.hideChild();
                        var n = t._.panel._.panel._.currentBlock,
                            r = n._.focusIndex;
                        n._.markItem(r)
                    } else e == 27 && this.hide();
                    return !1
                },
                onHide: function() {
                    var e = this;
                    if (n && !e.parent) {
                        var t = e.editor.getSelection();
                        t && t.unlock(!0)
                    }
                    e.onHide && e.onHide()
                },
                showSubMenu: function(t) {
                    var n = this,
                        r = n._.subMenu,
                        s = n.items[t],
                        o = s.getItems && s.getItems();
                    if (!o) {
                        n._.panel.hideChild();
                        return
                    }
                    var u = n._.panel.getBlock(n.id);
                    u._.focusIndex = t, r ? r.removeAll() : (r = n._.subMenu = new e.menu(n.editor, i.extend({}, n._.definition, {
                        level: n._.level + 1
                    }, !0)), r.parent = n, r._.onClick = i.bind(n._.onClick, n));
                    for (var a in o) {
                        var f = n.editor.getMenuItem(a);
                        f && (f.state = o[a], r.add(f))
                    }
                    var l = n._.panel.getBlock(n.id).element.getDocument().getById(n.id + String(t));
                    r.show(l, 2)
                }
            },
            proto: {
                add: function(e) {
                    e.order || (e.order = this.items.length), this.items.push(e)
                },
                removeAll: function() {
                    this.items = []
                },
                show: function(t, s, o, u) {
                    if (!this.parent) {
                        this._.onShow();
                        if (!this.items.length) return
                    }
                    s = s || (this.editor.lang.dir == "rtl" ? 2 : 1);
                    var a = this.items,
                        f = this.editor,
                        c = this._.panel,
                        h = this._.element;
                    if (!c) {
                        c = this._.panel = new l.floatPanel(this.editor, e.document.getBody(), this._.panelDefinition, this._.level), c.onEscape = i.bind(function(e) {
                            if (this._.onEscape(e) === !1) return !1
                        }, this), c.onHide = i.bind(function() {
                            this._.onHide && this._.onHide()
                        }, this);
                        var p = c.addBlock(this.id, this._.panelDefinition.block);
                        p.autoSize = !0;
                        var d = p.keys;
                        d[40] = "next", d[9] = "next", d[38] = "prev", d[2228233] = "prev", d[f.lang.dir == "rtl" ? 37 : 39] = n ? "mouseup" : "click", d[32] = n ? "mouseup" : "click", n && (d[13] = "mouseup"), h = this._.element = p.element, h.addClass(f.skinClass);
                        var v = h.getDocument();
                        v.getBody().setStyle("overflow", "hidden"), v.getElementsByTag("html").getItem(0).setStyle("overflow", "hidden"), this._.itemOverFn = i.addFunction(function(e) {
                            var t = this;
                            clearTimeout(t._.showSubTimeout), t._.showSubTimeout = i.setTimeout(t._.showSubMenu, f.config.menu_subMenuDelay || 400, t, [e])
                        }, this), this._.itemOutFn = i.addFunction(function(e) {
                            clearTimeout(this._.showSubTimeout)
                        }, this), this._.itemClickFn = i.addFunction(function(e) {
                            var t = this,
                                n = t.items[e];
                            if (n.state == 0) {
                                t.hide();
                                return
                            }
                            n.getItems ? t._.showSubMenu(e) : t._.onClick(n)
                        }, this)
                    }
                    r(a);
                    var g = f.container.getChild(1),
                        y = g.hasClass("cke_mixed_dir_content") ? " cke_mixed_dir_content" : "",
                        b = ['<div class="cke_menu' + y + '" role="presentation">'],
                        w = a.length,
                        E = w && a[0].group;
                    for (var S = 0; S < w; S++) {
                        var x = a[S];
                        E != x.group && (b.push('<div class="cke_menuseparator" role="separator"></div>'), E = x.group), x.render(this, S, b)
                    }
                    b.push("</div>"), h.setHtml(b.join("")), l.fire("ready", this), this.parent ? this.parent._.panel.showAsChild(c, this.id, t, s, o, u) : c.showBlock(this.id, t, s, o, u), f.fire("menuShow", [c])
                },
                addListener: function(e) {
                    this._.listeners.push(e)
                },
                hide: function(e) {
                    var t = this;
                    t._.onHide && t._.onHide(), t._.panel && t._.panel.hide(e)
                }
            }
        }), e.menuItem = i.createClass({
            $: function(e, t, n) {
                var r = this;
                i.extend(r, n, {
                    order: 0,
                    className: "cke_button_" + t
                }), r.group = e._.menuGroups[r.group], r.editor = e, r.name = t
            },
            proto: {
                render: function(r, i, s) {
                    var o = this,
                        u = r.id + String(i),
                        a = typeof o.state == "undefined" ? 2 : o.state,
                        f = " cke_" + (a == 1 ? "on" : a == 0 ? "disabled" : "off"),
                        l = o.label;
                    o.className && (f += " " + o.className);
                    var c = o.getItems;
                    s.push('<span class="cke_menuitem' + (o.icon && o.icon.indexOf(".png") == -1 ? " cke_noalphafix" : "") + '">' + '<a id="', u, '" class="', f, '" href="javascript:void(\'', (o.label || "").replace("'", ""), '\')" title="', o.label, '" tabindex="-1"_cke_focus=1 hidefocus="true" role="menuitem"' + (c ? 'aria-haspopup="true"' : "") + (a == 0 ? 'aria-disabled="true"' : "") + (a == 1 ? 'aria-pressed="true"' : "")), (t.opera || t.gecko && t.mac) && s.push(' onkeypress="return false;"'), t.gecko && s.push(' onblur="this.style.cssText = this.style.cssText;"');
                    var h = (o.iconOffset || 0) * -16;
                    s.push(' onmouseover="CKEDITOR.tools.callFunction(', r._.itemOverFn, ",", i, ');" onmouseout="CKEDITOR.tools.callFunction(', r._.itemOutFn, ",", i, ');" ' + (n ? 'onclick="return false;" onmouseup' : "onclick") + '="CKEDITOR.tools.callFunction(', r._.itemClickFn, ",", i, '); return false;"><span class="cke_icon_wrapper"><span class="cke_icon"' + (o.icon ? ' style="background-image:url(' + e.getUrl(o.icon) + ");background-position:0 " + h + 'px;"' : "") + "></span></span>" + '<span class="cke_label">'), c && s.push('<span class="cke_menuarrow">', "<span>&#", o.editor.lang.dir == "rtl" ? "9668" : "9658", ";</span>", "</span>"), s.push(l, "</span></a></span>")
                }
            }
        })
    }(), a.menu_groups = "clipboard,form,tablecell,tablecellproperties,tablerow,tablecolumn,table,anchor,link,image,flash,checkbox,radio,textfield,hiddenfield,imagebutton,button,select,textarea,div", function() {
        var n;
        f.add("editingblock", {
            init: function(r) {
                if (!r.config.editingBlock) return;
                r.on("themeSpace", function(e) {
                    e.data.space == "contents" && (e.data.html += "<br>")
                }), r.on("themeLoaded", function() {
                    r.fireOnce("editingBlockReady")
                }), r.on("uiReady", function() {
                    r.setMode(r.config.startupMode)
                }), r.on("afterSetData", function() {
                    if (!n) {
                        function e() {
                            n = !0, r.getMode().loadData(r.getData()), n = !1
                        }
                        r.mode ? e() : r.on("mode", function() {
                            r.mode && (e(), r.removeListener("mode", arguments.callee))
                        })
                    }
                }), r.on("beforeGetData", function() {
                    !n && r.mode && (n = !0, r.setData(r.getMode().getData(), null, 1), n = !1)
                }), r.on("getSnapshot", function(e) {
                    r.mode && (e.data = r.getMode().getSnapshotData())
                }), r.on("loadSnapshot", function(e) {
                    r.mode && r.getMode().loadSnapshotData(e.data)
                }), r.on("mode", function(n) {
                    n.removeListener(), t.webkit && r.container.on("focus", function() {
                        r.focus()
                    }), r.config.startupFocus && r.focus(), setTimeout(function() {
                        r.fireOnce("instanceReady"), e.fire("instanceReady", null, r)
                    }, 0)
                }), r.on("destroy", function() {
                    var e = this;
                    e.mode && e._.modes[e.mode].unload(e.getThemeSpace("contents"))
                })
            }
        }), e.editor.prototype.mode = "", e.editor.prototype.addMode = function(e, t) {
            t.name = e, (this._.modes || (this._.modes = {}))[e] = t
        }, e.editor.prototype.setMode = function(e) {
            this.fire("beforeSetMode", {
                newMode: e
            });
            var t, n = this.getThemeSpace("contents"),
                r = this.checkDirty();
            if (this.mode) {
                if (e == this.mode) return;
                this._.previousMode = this.mode, this.fire("beforeModeUnload");
                var i = this.getMode();
                t = i.getData(), i.unload(n), this.mode = ""
            }
            n.setHtml("");
            var s = this.getMode(e);
            if (!s) throw '[CKEDITOR.editor.setMode] Unknown mode "' + e + '".';
            r || this.on("mode", function() {
                this.resetDirty(), this.removeListener("mode", arguments.callee)
            }), s.load(n, typeof t != "string" ? this.getData() : t)
        }, e.editor.prototype.getMode = function(e) {
            return this._.modes && this._.modes[e || this.mode]
        }, e.editor.prototype.focus = function() {
            this.forceNextSelectionCheck();
            var e = this.getMode();
            e && e.focus()
        }
    }(), a.startupMode = "wysiwyg", a.editingBlock = !0, function() {
        function a() {
            var e = this;
            try {
                var t = e.getSelection();
                if (!t || !t.document.getWindow().$) return;
                var n = t.getStartElement(),
                    i = new r.elementPath(n);
                i.compare(e._.selectionPreviousPath) || (e._.selectionPreviousPath = i, e.fire("selectionChange", {
                    selection: t,
                    path: i,
                    element: n
                }))
            } catch (s) {}
        }
        function p() {
            c = !0;
            if (l) return;
            v.call(this), l = i.setTimeout(v, 200, this)
        }
        function v() {
            l = null, c && (i.setTimeout(a, 0, this), c = !1)
        }
        function m(e) {
            function t(e) {
                return e && e.type == 1 && e.getName() in s.$removeEmpty
            }
            function n(t) {
                var n = e.document.getBody();
                return !t.is("body") && n.getChildCount() == 1
            }
            var r = e.startContainer,
                o = e.startOffset;
            return r.type == 3 ? !1 : i.trim(r.getHtml()) ? t(r.getChild(o - 1)) || t(r.getChild(o)) : t(r) || n(r)
        }
        function w(e) {
            x(e);
            var t = e.createText("â€‹");
            return e.setCustomData("cke-fillingChar", t), t
        }
        function E(e) {
            return e && e.getCustomData("cke-fillingChar")
        }
        function S(e) {
            var t = e && E(e);
            t && (t.getCustomData("ready") ? x(e) : t.setCustomData("ready", 1))
        }
        function x(e) {
            var t = e && e.removeCustomData("cke-fillingChar");
            if (t) {
                var n, r = e.getSelection().getNative(),
                    i = r && r.type != "None" && r.getRangeAt(0);
                if (t.getLength() > 1 && i && i.intersectsNode(t.$)) {
                    n = [r.anchorOffset, r.focusOffset];
                    var s = r.anchorNode == t.$ && r.anchorOffset > 0,
                        o = r.focusNode == t.$ && r.focusOffset > 0;
                    s && n[0]--, o && n[1]--, T(r) && n.unshift(n.pop())
                }
                t.setText(t.getText().replace(/\u200B/g, ""));
                if (n) {
                    var u = r.getRangeAt(0);
                    u.setStart(u.startContainer, n[0]), u.setEnd(u.startContainer, n[1]), r.removeAllRanges(), r.addRange(u)
                }
            }
        }
        function T(e) {
            if (!e.isCollapsed) {
                var t = e.getRangeAt(0);
                return t.setStart(e.anchorNode, e.anchorOffset), t.setEnd(e.focusNode, e.focusOffset), t.collapsed
            }
        }
        var l, c, y = {
            modes: {
                wysiwyg: 1,
                source: 1
            },
            readOnly: n || t.webkit,
            exec: function(e) {
                switch (e.mode) {
                case "wysiwyg":
                    e.document.$.execCommand("SelectAll", !1, null), e.forceNextSelectionCheck(), e.selectionChange();
                    break;
                case "source":
                    var t = e.textarea.$;
                    n ? t.createTextRange().execCommand("SelectAll") : (t.selectionStart = 0, t.selectionEnd = t.value.length), t.focus()
                }
            },
            canUndo: !1
        };
        f.add("selection", {
            init: function(r) {
                if (t.webkit) {
                    r.on("selectionChange", function() {
                        S(r.document)
                    }), r.on("beforeSetMode", function() {
                        x(r.document)
                    });
                    var s, o;
                    function u() {
                        var e = r.document,
                            t = E(e);
                        if (t) {
                            var n = e.$.defaultView.getSelection();
                            n.type == "Caret" && n.anchorNode == t.$ && (o = 1), s = t.getText(), t.setText(s.replace(/\u200B/g, ""))
                        }
                    }
                    function f() {
                        var e = r.document,
                            t = E(e);
                        t && (t.setText(s), o && (e.$.defaultView.getSelection().setPosition(t.$, t.getLength()), o = 0))
                    }
                    r.on("beforeUndoImage", u), r.on("afterUndoImage", f), r.on("beforeGetData", u, null, null, 0), r.on("getData", f)
                }
                r.on("contentDom", function() {
                    var s = r.document,
                        o = s.getBody(),
                        u = s.getDocumentElement();
                    if (n) {
                        var a, f, l = 1;
                        o.on("focusin", function(e) {
                            if (e.data.$.srcElement.nodeName != "BODY") return;
                            var t = s.getCustomData("cke_locked_selection");
                            if (t) t.unlock(1), t.lock();
                            else if (a && l) {
                                try {
                                    a.select()
                                } catch (n) {}
                                a = null
                            }
                        }), o.on("focus", function() {
                            f = 1, v()
                        }), o.on("beforedeactivate", function(e) {
                            if (e.data.$.toElement) return;
                            f = 0, l = 1
                        }), n && r.on("blur", function() {
                            try {
                                s.$.selection.empty()
                            } catch (e) {}
                        }), u.on("mousedown", function() {
                            l = 0
                        }), u.on("mouseup", function() {
                            l = 1
                        });
                        var c;
                        o.on("mousedown", function(e) {
                            if (e.data.$.button == 2) {
                                var t = r.document.$.selection;
                                t.type == "None" && (c = r.window.getScrollPosition())
                            }
                            d()
                        }), o.on("mouseup", function(e) {
                            e.data.$.button == 2 && c && (r.document.$.documentElement.scrollLeft = c.x, r.document.$.documentElement.scrollTop = c.y), c = null, f = 1, setTimeout(function() {
                                v(!0)
                            }, 0)
                        }), o.on("keydown", d), o.on("keyup", function() {
                            f = 1, v()
                        });
                        if ((t.ie7Compat || t.ie6Compat) && s.$.compatMode != "BackCompat") {
                            function h(e, t, n) {
                                try {
                                    e.moveToPoint(t, n)
                                } catch (r) {}
                            }
                            u.on("mousedown", function(e) {
                                function t(e) {
                                    e = e.data.$;
                                    if (n) {
                                        var t = o.$.createTextRange();
                                        h(t, e.x, e.y), n.setEndPoint(n.compareEndPoints("StartToStart", t) < 0 ? "EndToEnd" : "StartToStart", t), n.select()
                                    }
                                }
                                e = e.data.$;
                                if (e.y < u.$.clientHeight && e.y > o.$.offsetTop + o.$.clientHeight && e.x < u.$.clientWidth) {
                                    var n = o.$.createTextRange();
                                    h(n, e.x, e.y), u.on("mousemove", t), u.on("mouseup", function(e) {
                                        u.removeListener("mousemove", t), e.removeListener(), n.select()
                                    })
                                }
                            })
                        }
                        t.ie8 && u.on("mouseup", function(t) {
                            if (t.data.getTarget().getName() == "html") {
                                var n = e.document.$.selection,
                                    r = n.createRange();
                                n.type != "None" && r.parentElement().ownerDocument == s.$ && r.select()
                            }
                        }), s.on("selectionchange", v);
                        function d() {
                            f = 0
                        }
                        function v(e) {
                            if (f) {
                                var t = r.document,
                                    n = r.getSelection(),
                                    s = n && n.getNative();
                                if (e && s && s.type == "None" && !t.$.queryCommandEnabled("InsertImage")) {
                                    i.setTimeout(v, 50, this, !0);
                                    return
                                }
                                var o;
                                if (s && s.type && s.type != "Control" && (o = s.createRange()) && (o = o.parentElement()) && (o = o.nodeName) && o.toLowerCase() in {
                                    input: 1,
                                    textarea: 1
                                }) return;
                                a = s && n.getRanges()[0], p.call(r)
                            }
                        }
                    } else s.on("mouseup", p, r), s.on("keyup", p, r), s.on("selectionchange", p, r);
                    t.webkit && s.on("keydown", function(e) {
                        var t = e.data.getKey();
                        switch (t) {
                        case 13:
                        case 33:
                        case 34:
                        case 35:
                        case 36:
                        case 37:
                        case 39:
                        case 8:
                        case 45:
                        case 46:
                            x(r.document)
                        }
                    }, null, null, 10)
                }), r.on("contentDomUnload", r.forceNextSelectionCheck, r), r.addCommand("selectAll", y), r.ui.addButton("SelectAll", {
                    label: r.lang.selectAll,
                    command: "selectAll"
                }), r.selectionChange = function(e) {
                    (e ? a : p).call(this)
                }, t.ie9Compat && r.on("destroy", function() {
                    var e = r.getSelection();
                    e && e.getNative().clear()
                }, null, null, 9)
            }
        }), e.editor.prototype.getSelection = function() {
            return this.document && this.document.getSelection()
        }, e.editor.prototype.forceNextSelectionCheck = function() {
            delete this._.selectionPreviousPath
        }, o.prototype.getSelection = function() {
            var e = new r.selection(this);
            return !e || e.isInvalid ? null : e
        }, e.SELECTION_NONE = 1, e.SELECTION_TEXT = 2, e.SELECTION_ELEMENT = 3, r.selection = function(e) {
            var t = this,
                r = e.getCustomData("cke_locked_selection");
            if (r) return r;
            t.document = e, t.isLocked = 0, t._ = {
                cache: {}
            };
            if (n) try {
                var i = t.getNative().createRange();
                if (!i || i.item && i.item(0).ownerDocument != t.document.$ || i.parentElement && i.parentElement().ownerDocument != t.document.$) throw 0
            } catch (s) {
                t.isInvalid = !0
            }
            return t
        };
        var N = {
            img: 1,
            hr: 1,
            li: 1,
            table: 1,
            tr: 1,
            td: 1,
            th: 1,
            embed: 1,
            object: 1,
            ol: 1,
            ul: 1,
            a: 1,
            input: 1,
            form: 1,
            select: 1,
            textarea: 1,
            button: 1,
            fieldset: 1,
            thead: 1,
            tfoot: 1
        };
        r.selection.prototype = {
            getNative: n ?
            function() {
                return this._.cache.nativeSel || (this._.cache.nativeSel = this.document.$.selection)
            } : function() {
                return this._.cache.nativeSel || (this._.cache.nativeSel = this.document.getWindow().$.getSelection())
            },
            getType: n ?
            function() {
                var e = this._.cache;
                if (e.type) return e.type;
                var t = 1;
                try {
                    var n = this.getNative(),
                        r = n.type;
                    r == "Text" && (t = 2), r == "Control" && (t = 3), n.createRange().parentElement && (t = 2)
                } catch (i) {}
                return e.type = t
            } : function() {
                var e = this._.cache;
                if (e.type) return e.type;
                var t = 2,
                    n = this.getNative();
                if (!n) t = 1;
                else if (n.rangeCount == 1) {
                    var r = n.getRangeAt(0),
                        i = r.startContainer;
                    i == r.endContainer && i.nodeType == 1 && r.endOffset - r.startOffset == 1 && N[i.childNodes[r.startOffset].nodeName.toLowerCase()] && (t = 3)
                }
                return e.type = t
            },
            getRanges: function() {
                var e = n ?
                function() {
                    function e(e) {
                        return (new r.node(e)).getIndex()
                    }
                    var n = function(n, r) {
                            n = n.duplicate(), n.collapse(r);
                            var i = n.parentElement(),
                                s = i.ownerDocument;
                            if (!i.hasChildNodes()) return {
                                container: i,
                                offset: 0
                            };
                            var o = i.children,
                                u, a, f = n.duplicate(),
                                l = 0,
                                c = o.length - 1,
                                h = -1,
                                p, d, v;
                            while (l <= c) {
                                h = Math.floor((l + c) / 2), u = o[h], f.moveToElementText(u), p = f.compareEndPoints("StartToStart", n);
                                if (p > 0) c = h - 1;
                                else {
                                    if (!(p < 0)) {
                                        if (t.ie9Compat && u.tagName == "BR") {
                                            var m = s.defaultView.getSelection();
                                            return {
                                                container: m[r ? "anchorNode" : "focusNode"],
                                                offset: m[r ? "anchorOffset" : "focusOffset"]
                                            }
                                        }
                                        return {
                                            container: i,
                                            offset: e(u)
                                        }
                                    }
                                    l = h + 1
                                }
                            }
                            if (h == -1 || h == o.length - 1 && p < 0) {
                                f.moveToElementText(i), f.setEndPoint("StartToStart", n), d = f.text.replace(/(\r\n|\r)/g, "\n").length, o = i.childNodes;
                                if (!d) return u = o[o.length - 1], u.nodeType != 3 ? {
                                    container: i,
                                    offset: o.length
                                } : {
                                    container: u,
                                    offset: u.nodeValue.length
                                };
                                var g = o.length;
                                while (d > 0 && g > 0) a = o[--g], a.nodeType == 3 && (v = a, d -= a.nodeValue.length);
                                return {
                                    container: v,
                                    offset: -d
                                }
                            }
                            f.collapse(p > 0 ? !0 : !1), f.setEndPoint(p > 0 ? "StartToStart" : "EndToStart", n), d = f.text.replace(/(\r\n|\r)/g, "\n").length;
                            if (!d) return {
                                container: i,
                                offset: e(u) + (p > 0 ? 0 : 1)
                            };
                            while (d > 0) try {
                                a = u[p > 0 ? "previousSibling" : "nextSibling"], a.nodeType == 3 && (d -= a.nodeValue.length, v = a), u = a
                            } catch (y) {
                                return {
                                    container: i,
                                    offset: e(u)
                                }
                            }
                            return {
                                container: v,
                                offset: p > 0 ? -d : v.nodeValue.length + d
                            }
                        };
                    return function() {
                        var e = this,
                            t = e.getNative(),
                            i = t && t.createRange(),
                            s = e.getType(),
                            o;
                        if (!t) return [];
                        if (s == 2) {
                            o = new r.range(e.document);
                            var u = n(i, !0);
                            return o.setStart(new r.node(u.container), u.offset), u = n(i), o.setEnd(new r.node(u.container), u.offset), o.endContainer.getPosition(o.startContainer) & 4 && o.endOffset <= o.startContainer.getIndex() && o.collapse(), [o]
                        }
                        if (s == 3) {
                            var a = [];
                            for (var f = 0; f < i.length; f++) {
                                var l = i.item(f),
                                    c = l.parentNode,
                                    h = 0;
                                o = new r.range(e.document);
                                for (; h < c.childNodes.length && c.childNodes[h] != l; h++);
                                o.setStart(new r.node(c), h), o.setEnd(new r.node(c), h + 1), a.push(o)
                            }
                            return a
                        }
                        return []
                    }
                }() : function() {
                    var e = [],
                        t, n = this.document,
                        i = this.getNative();
                    if (!i) return e;
                    i.rangeCount || (t = new r.range(n), t.moveToElementEditStart(n.getBody()), e.push(t));
                    for (var s = 0; s < i.rangeCount; s++) {
                        var o = i.getRangeAt(s);
                        t = new r.range(n), t.setStart(new r.node(o.startContainer), o.startOffset), t.setEnd(new r.node(o.endContainer), o.endOffset), e.push(t)
                    }
                    return e
                };
                return function(t) {
                    var n = this._.cache;
                    if (n.ranges && !t) return n.ranges;
                    n.ranges || (n.ranges = new r.rangeList(e.call(this)));
                    if (t) {
                        var i = n.ranges;
                        for (var s = 0; s < i.length; s++) {
                            var o = i[s],
                                u = o.getCommonAncestor();
                            u.isReadOnly() && i.splice(s, 1);
                            if (o.collapsed) continue;
                            if (o.startContainer.isReadOnly()) {
                                var a = o.startContainer;
                                while (a) {
                                    if (a.is("body") || !a.isReadOnly()) break;
                                    a.type == 1 && a.getAttribute("contentEditable") == "false" && o.setStartAfter(a), a = a.getParent()
                                }
                            }
                            var f = o.startContainer,
                                l = o.endContainer,
                                c = o.startOffset,
                                h = o.endOffset,
                                p = o.clone();
                            f && f.type == 3 && (c >= f.getLength() ? p.setStartAfter(f) : p.setStartBefore(f)), l && l.type == 3 && (h ? p.setEndAfter(l) : p.setEndBefore(l));
                            var v = new r.walker(p);
                            v.evaluator = function(e) {
                                if (e.type == 1 && e.isReadOnly()) {
                                    var t = o.clone();
                                    return o.setEndBefore(e), o.collapsed && i.splice(s--, 1), e.getPosition(p.endContainer) & 16 || (t.setStartAfter(e), t.collapsed || i.splice(s + 1, 0, t)), !0
                                }
                                return !1
                            }, v.next()
                        }
                    }
                    return n.ranges
                }
            }(),
            getStartElement: function() {
                var e = this,
                    t = e._.cache;
                if (t.startElement !== undefined) return t.startElement;
                var n, r = e.getNative();
                switch (e.getType()) {
                case 3:
                    return e.getSelectedElement();
                case 2:
                    var i = e.getRanges()[0];
                    if (i) {
                        if (!i.collapsed) {
                            i.optimize();
                            for (;;) {
                                var s = i.startContainer,
                                    o = i.startOffset;
                                if (o != (s.getChildCount ? s.getChildCount() : s.getLength()) || !! s.isBlockBoundary()) break;
                                i.setStartAfter(s)
                            }
                            n = i.startContainer;
                            if (n.type != 1) return n.getParent();
                            n = n.getChild(i.startOffset);
                            if (!n || n.type != 1) n = i.startContainer;
                            else {
                                var a = n.getFirst();
                                while (a && a.type == 1) n = a, a = a.getFirst()
                            }
                        } else n = i.startContainer, n.type != 1 && (n = n.getParent());
                        n = n.$
                    }
                }
                return t.startElement = n ? new u(n) : null
            },
            getSelectedElement: function() {
                var e = this._.cache;
                if (e.selectedElement !== undefined) return e.selectedElement;
                var t = this,
                    n = i.tryThese(function() {
                        return t.getNative().createRange().item(0)
                    }, function() {
                        var e, n, o = t.getRanges()[0],
                            u = o.getCommonAncestor(1, 1),
                            a = {
                                table: 1,
                                ul: 1,
                                ol: 1,
                                dl: 1
                            };
                        for (var f in a) if (e = u.getAscendant(f, 1)) break;
                        if (e) {
                            var l = new r.range(this.document);
                            l.setStartAt(e, 1), l.setEnd(o.startContainer, o.startOffset);
                            var c = i.extend(a, s.$listItem, s.$tableContent),
                                h = new r.walker(l),
                                p = function(e, t) {
                                    return function(n, r) {
                                        if (n.type == 3 && (!i.trim(n.getText()) || n.getParent().data("cke-bookmark"))) return !0;
                                        var o;
                                        if (n.type == 1) {
                                            o = n.getName();
                                            if (o == "br" && t && n.equals(n.getParent().getBogus())) return !0;
                                            if (r && o in c || o in s.$removeEmpty) return !0
                                        }
                                        return e.halted = 1, !1
                                    }
                                };
                            h.guard = p(h), h.checkBackward() && !h.halted && (h = new r.walker(l), l.setStart(o.endContainer, o.endOffset), l.setEndAt(e, 2), h.guard = p(h, 1), h.checkForward() && !h.halted && (n = e.$))
                        }
                        if (!n) throw 0;
                        return n
                    }, function() {
                        var e = t.getRanges()[0],
                            n, r;
                        for (var i = 2; i && !((n = e.getEnclosedNode()) && n.type == 1 && N[n.getName()] && (r = n)); i--) e.shrink(1);
                        return r.$
                    });
                return e.selectedElement = n ? new u(n) : null
            },
            getSelectedText: function() {
                var e = this._.cache;
                if (e.selectedText !== undefined) return e.selectedText;
                var t = "",
                    r = this.getNative();
                return this.getType() == 2 && (t = n ? r.createRange().text : r.toString()), e.selectedText = t
            },
            lock: function() {
                var e = this;
                e.getRanges(), e.getStartElement(), e.getSelectedElement(), e.getSelectedText(), e._.cache.nativeSel = {}, e.isLocked = 1, e.document.setCustomData("cke_locked_selection", e)
            },
            unlock: function(e) {
                var t = this,
                    n = t.document,
                    r = n.getCustomData("cke_locked_selection");
                if (r) {
                    n.setCustomData("cke_locked_selection", null);
                    if (e) {
                        var i = r.getSelectedElement(),
                            s = !i && r.getRanges();
                        t.isLocked = 0, t.reset(), i ? t.selectElement(i) : t.selectRanges(s)
                    }
                }
                if (!r || !e) t.isLocked = 0, t.reset()
            },
            reset: function() {
                this._.cache = {}
            },
            selectElement: function(e) {
                var t = this;
                if (t.isLocked) {
                    var n = new r.range(t.document);
                    n.setStartBefore(e), n.setEndAfter(e), t._.cache.selectedElement = e, t._.cache.startElement = e, t._.cache.ranges = new r.rangeList(n), t._.cache.type = 3;
                    return
                }
                n = new r.range(e.getDocument()), n.setStartBefore(e), n.setEndAfter(e), n.select(), t.document.fire("selectionchange"), t.reset()
            },
            selectRanges: function(e) {
                var i = this;
                if (i.isLocked) {
                    i._.cache.selectedElement = null, i._.cache.startElement = e[0] && e[0].getTouchedStartNode(), i._.cache.ranges = new r.rangeList(e), i._.cache.type = 2;
                    return
                }
                if (n) {
                    if (e.length > 1) {
                        var s = e[e.length - 1];
                        e[0].setEnd(s.endContainer, s.endOffset), e.length = 1
                    }
                    e[0] && e[0].select(), i.reset()
                } else {
                    var o = i.getNative();
                    if (!o) return;
                    e.length && (o.removeAllRanges(), t.webkit && x(i.document));
                    for (var u = 0; u < e.length; u++) {
                        if (u < e.length - 1) {
                            var a = e[u],
                                f = e[u + 1],
                                l = a.clone();
                            l.setStart(a.endContainer, a.endOffset), l.setEnd(f.startContainer, f.startOffset);
                            if (!l.collapsed) {
                                l.shrink(1, !0);
                                var c = l.getCommonAncestor(),
                                    h = l.getEnclosedNode();
                                if (c.isReadOnly() || h && h.isReadOnly()) {
                                    f.setStart(a.startContainer, a.startOffset), e.splice(u--, 1);
                                    continue
                                }
                            }
                        }
                        var p = e[u],
                            v = i.document.$.createRange(),
                            g = p.startContainer;
                        p.collapsed && (t.opera || t.gecko && t.version < 10900) && g.type == 1 && !g.getChildCount() && g.appendText("");
                        if (p.collapsed && t.webkit && m(p)) {
                            var y = w(i.document);
                            p.insertNode(y);
                            var E = y.getNext();
                            E && !y.getPrevious() && E.type == 1 && E.getName() == "br" ? (x(i.document), p.moveToPosition(E, 3)) : p.moveToPosition(y, 4)
                        }
                        v.setStart(p.startContainer.$, p.startOffset);
                        try {
                            v.setEnd(p.endContainer.$, p.endOffset)
                        } catch (S) {
                            if (!(S.toString().indexOf("NS_ERROR_ILLEGAL_VALUE") >= 0)) throw S;
                            p.collapse(1), v.setEnd(p.endContainer.$, p.endOffset)
                        }
                        o.addRange(v)
                    }
                    i.document.fire("selectionchange"), i.reset()
                }
            },
            createBookmarks: function(e) {
                return this.getRanges().createBookmarks(e)
            },
            createBookmarks2: function(e) {
                return this.getRanges().createBookmarks2(e)
            },
            selectBookmarks: function(e) {
                var t = [];
                for (var n = 0; n < e.length; n++) {
                    var i = new r.range(this.document);
                    i.moveToBookmark(e[n]), t.push(i)
                }
                return this.selectRanges(t), this
            },
            getCommonAncestor: function() {
                var e = this.getRanges(),
                    t = e[0].startContainer,
                    n = e[e.length - 1].endContainer;
                return t.getCommonAncestor(n)
            },
            scrollIntoView: function() {
                var e = this.getStartElement();
                e.scrollIntoView()
            }
        }
    }(), function() {
        var e = r.walker.whitespaces(!0),
            t = /\ufeff|\u00a0/,
            i = {
                table: 1,
                tbody: 1,
                tr: 1
            };
        r.range.prototype.select = n ?
        function(n) {
            var r = this,
                s = r.collapsed,
                o, u, a, f = r.getEnclosedNode();
            if (f) try {
                a = r.document.$.body.createControlRange(), a.addElement(f.$), a.select();
                return
            } catch (l) {}(r.startContainer.type == 1 && r.startContainer.getName() in i || r.endContainer.type == 1 && r.endContainer.getName() in i) && r.shrink(1, !0);
            var c = r.createBookmark(),
                h = c.startNode,
                p;
            s || (p = c.endNode), a = r.document.$.body.createTextRange(), a.moveToElementText(h.$), a.moveStart("character", 1);
            if (p) {
                var d = r.document.$.body.createTextRange();
                d.moveToElementText(p.$), a.setEndPoint("EndToEnd", d), a.moveEnd("character", -1)
            } else {
                var v = h.getNext(e);
                o = !(v && v.getText && v.getText().match(t)) && (n || !h.hasPrevious() || h.getPrevious().is && h.getPrevious().is("br")), u = r.document.createElement("span"), u.setHtml("&#65279;"), u.insertBefore(h), o && r.document.createText("ï»¿").insertBefore(h)
            }
            r.setStartBefore(h), h.remove(), s ? (o ? (a.moveStart("character", -1), a.select(), r.document.$.selection.clear()) : a.select(), r.moveToPosition(u, 3), u.remove()) : (r.setEndBefore(p), p.remove(), a.select()), r.document.fire("selectionchange")
        } : function() {
            this.document.getSelection().selectRanges([this])
        }
    }(), function() {
        function o(e, t) {
            var n = s.exec(e),
                r = s.exec(t);
            if (n) {
                if (!n[2] && r[2] == "px") return r[1];
                if (n[2] == "px" && !r[2]) return r[1] + "px"
            }
            return t
        }
        var n = e.htmlParser.cssStyle,
            r = i.cssLength,
            s = /^((?:\d*(?:\.\d+))|(?:\d+))(.*)?$/i,
            a = {
                elements: {
                    $: function(t) {
                        var r = t.attributes,
                            i = r && r["data-cke-realelement"],
                            s = i && new e.htmlParser.fragment.fromHtml(decodeURIComponent(i)),
                            u = s && s.children[0];
                        if (u && t.attributes["data-cke-resizable"]) {
                            var a = (new n(t)).rules,
                                f = u.attributes,
                                l = a.width,
                                c = a.height;
                            l && (f.width = o(f.width, l)), c && (f.height = o(f.height, c))
                        }
                        return u
                    }
                }
            };
        f.add("fakeobjects", {
            requires: ["htmlwriter"],
            afterInit: function(e) {
                var t = e.dataProcessor,
                    n = t && t.htmlFilter;
                n && n.addRules(a)
            }
        }), e.editor.prototype.createFakeElement = function(i, s, o, u) {
            var a = this.lang.fakeobjects,
                f = a[o] || a.unknown,
                l = {
                    "class": s,
                    "data-cke-realelement": encodeURIComponent(i.getOuterHtml()),
                    "data-cke-real-node-type": i.type,
                    alt: f,
                    title: f,
                    align: i.getAttribute("align") || ""
                };
            t.hc || (l.src = e.getUrl("images/spacer.gif")), o && (l["data-cke-real-element-type"] = o);
            if (u) {
                l["data-cke-resizable"] = u;
                var c = new n,
                    h = i.getAttribute("width"),
                    p = i.getAttribute("height");
                h && (c.rules.width = r(h)), p && (c.rules.height = r(p)), c.populate(l)
            }
            return this.document.createElement("img", {
                attributes: l
            })
        }, e.editor.prototype.createFakeParserElement = function(i, s, o, u) {
            var a = this.lang.fakeobjects,
                f = a[o] || a.unknown,
                l, c = new e.htmlParser.basicWriter;
            i.writeHtml(c), l = c.getHtml();
            var h = {
                "class": s,
                "data-cke-realelement": encodeURIComponent(l),
                "data-cke-real-node-type": i.type,
                alt: f,
                title: f,
                align: i.attributes.align || ""
            };
            t.hc || (h.src = e.getUrl("images/spacer.gif")), o && (h["data-cke-real-element-type"] = o);
            if (u) {
                h["data-cke-resizable"] = u;
                var p = i.attributes,
                    d = new n,
                    v = p.width,
                    g = p.height;
                v != undefined && (d.rules.width = r(v)), g != undefined && (d.rules.height = r(g)), d.populate(h)
            }
            return new e.htmlParser.element("img", h)
        }, e.editor.prototype.restoreRealElement = function(e) {
            if (e.data("cke-real-node-type") != 1) return null;
            var t = u.createFromHtml(decodeURIComponent(e.data("cke-realelement")), this.document);
            if (e.data("cke-resizable")) {
                var n = e.getStyle("width"),
                    r = e.getStyle("height");
                n && t.setAttribute("width", o(t.getAttribute("width"), n)), r && t.setAttribute("height", o(t.getAttribute("height"), r))
            }
            return t
        }
    }(), f.add("richcombo", {
        requires: ["floatpanel", "listblock", "button"],
        beforeInit: function(e) {
            e.ui.addHandler("richcombo", l.richCombo.handler)
        }
    }), e.UI_RICHCOMBO = "richcombo", l.richCombo = i.createClass({
        $: function(t) {
            var n = this;
            i.extend(n, t, {
                title: t.label,
                modes: {
                    wysiwyg: 1
                }
            });
            var r = n.panel || {};
            delete n.panel, n.id = i.getNextNumber(), n.document = r && r.parent && r.parent.getDocument() || e.document, r.className = (r.className || "") + " cke_rcombopanel", r.block = {
                multiSelect: r.multiSelect,
                attributes: r.attributes
            }, n._ = {
                panelDefinition: r,
                items: {},
                state: 2
            }
        },
        statics: {
            handler: {
                create: function(e) {
                    return new l.richCombo(e)
                }
            }
        },
        proto: {
            renderHtml: function(e) {
                var t = [];
                return this.render(e, t), t.join("")
            },
            render: function(s, o) {
                function p() {
                    var e = this,
                        t = e.modes[s.mode] ? 2 : 0;
                    e.setState(s.readOnly && !e.readOnly ? 0 : t), e.setValue("")
                }
                var a = t,
                    f = "cke_" + this.id,
                    l = i.addFunction(function(e) {
                        var t = this,
                            n = t._;
                        if (n.state == 0) return;
                        t.createPanel(s);
                        if (n.on) {
                            n.panel.hide();
                            return
                        }
                        t.commit();
                        var r = t.getValue();
                        r ? n.list.mark(r) : n.list.unmarkAll(), n.panel.showBlock(t.id, new u(e), 4)
                    }, this),
                    c = {
                        id: f,
                        combo: this,
                        focus: function() {
                            var t = e.document.getById(f).getChild(1);
                            t.focus()
                        },
                        clickFn: l
                    };
                s.on("mode", p, this), !this.readOnly && s.on("readOnly", p, this);
                var v = i.addFunction(function(e, t) {
                    e = new r.event(e);
                    var n = e.getKeystroke();
                    switch (n) {
                    case 13:
                    case 32:
                    case 40:
                        i.callFunction(l, t);
                        break;
                    default:
                        c.onkey(c, n)
                    }
                    e.preventDefault()
                }),
                    m = i.addFunction(function() {
                        c.onfocus && c.onfocus()
                    });
                return c.keyDownFn = v, o.push('<span class="cke_rcombo" role="presentation">', "<span id=", f), this.className && o.push(' class="', this.className, ' cke_off"'), o.push(' role="presentation">', '<span id="' + f + '_label" class=cke_label>', this.label, "</span>", '<a hidefocus=true title="', this.title, '" tabindex="-1"', a.gecko && a.version >= 10900 && !a.hc ? "" : " href=\"javascript:void('" + this.label + "')\"", ' role="button" aria-labelledby="', f, '_label" aria-describedby="', f, '_text" aria-haspopup="true"'), (t.opera || t.gecko && t.mac) && o.push(' onkeypress="return false;"'), t.gecko && o.push(' onblur="this.style.cssText = this.style.cssText;"'), o.push(' onkeydown="CKEDITOR.tools.callFunction( ', v, ', event, this );" onfocus="return CKEDITOR.tools.callFunction(', m, ', event);" ' + (n ? 'onclick="return false;" onmouseup' : "onclick") + '="CKEDITOR.tools.callFunction(', l, ', this); return false;"><span><span id="' + f + '_text" class="cke_text cke_inline_label">' + this.label + "</span>" + "</span>" + "<span class=cke_openbutton><span class=cke_icon>" + (t.hc ? "&#9660;" : t.air ? "&nbsp;" : "") + "</span></span>" + "</a>" + "</span>" + "</span>"), this.onRender && this.onRender(), c
            },
            createPanel: function(t) {
                if (this._.panel) return;
                var n = this._.panelDefinition,
                    r = this._.panelDefinition.block,
                    i = n.parent || e.document.getBody(),
                    s = new l.floatPanel(t, i, n),
                    o = s.addListBlock(this.id, r),
                    u = this;
                s.onShow = function() {
                    u.className && this.element.getFirst().addClass(u.className + "_panel"), u.setState(1), o.focus(!u.multiSelect && u.getValue()), u._.on = 1, u.onOpen && u.onOpen()
                }, s.onHide = function(e) {
                    u.className && this.element.getFirst().removeClass(u.className + "_panel"), u.setState(u.modes && u.modes[t.mode] ? 2 : 0), u._.on = 0, !e && u.onClose && u.onClose()
                }, s.onEscape = function() {
                    s.hide()
                }, o.onClick = function(e, t) {
                    u.document.getWindow().focus(), u.onClick && u.onClick.call(u, e, t), t ? u.setValue(e, u._.items[e]) : u.setValue(""), s.hide(!1)
                }, this._.panel = s, this._.list = o, s.getBlock(this.id).onHide = function() {
                    u._.on = 0, u.setState(2)
                }, this.init && this.init()
            },
            setValue: function(e, t) {
                var n = this;
                n._.value = e;
                var r = n.document.getById("cke_" + n.id + "_text");
                r && (!e && !t ? (t = n.label, r.addClass("cke_inline_label")) : r.removeClass("cke_inline_label"), r.setHtml(typeof t != "undefined" ? t : e))
            },
            getValue: function() {
                return this._.value || ""
            },
            unmarkAll: function() {
                this._.list.unmarkAll()
            },
            mark: function(e) {
                this._.list.mark(e)
            },
            hideItem: function(e) {
                this._.list.hideItem(e)
            },
            hideGroup: function(e) {
                this._.list.hideGroup(e)
            },
            showAll: function() {
                this._.list.showAll()
            },
            add: function(e, t, n) {
                this._.items[e] = n || e, this._.list.add(e, t, n)
            },
            startGroup: function(e) {
                this._.list.startGroup(e)
            },
            commit: function() {
                var e = this;
                e._.committed || (e._.list.commit(), e._.committed = 1, l.fire("ready", e)), e._.committed = 1
            },
            setState: function(e) {
                var t = this;
                if (t._.state == e) return;
                t.document.getById("cke_" + t.id).setState(e), t._.state = e
            }
        }
    }), l.prototype.addRichCombo = function(e, t) {
        this.add(e, "richcombo", t)
    }, f.add("htmlwriter"), e.htmlWriter = i.createClass({
        base: e.htmlParser.basicWriter,
        $: function() {
            var e = this;
            e.base(), e.indentationChars = "	", e.selfClosingEnd = " />", e.lineBreakChars = "\n", e.forceSimpleAmpersand = 0, e.sortAttributes = 1, e._.indent = 0, e._.indentation = "", e._.inPre = 0, e._.rules = {};
            var t = s;
            for (var n in i.extend({}, t.$nonBodyContent, t.$block, t.$listItem, t.$tableContent)) e.setRules(n, {
                indent: 1,
                breakBeforeOpen: 1,
                breakAfterOpen: 1,
                breakBeforeClose: !t[n]["#"],
                breakAfterClose: 1
            });
            e.setRules("br", {
                breakAfterOpen: 1
            }), e.setRules("title", {
                indent: 0,
                breakAfterOpen: 0
            }), e.setRules("style", {
                indent: 0,
                breakBeforeClose: 1
            }), e.setRules("pre", {
                indent: 0
            })
        },
        proto: {
            openTag: function(e, t) {
                var n = this,
                    r = n._.rules[e];
                n._.indent ? n.indentation() : r && r.breakBeforeOpen && (n.lineBreak(), n.indentation()), n._.output.push("<", e)
            },
            openTagClose: function(e, t) {
                var n = this,
                    r = n._.rules[e];
                t ? n._.output.push(n.selfClosingEnd) : (n._.output.push(">"), r && r.indent && (n._.indentation += n.indentationChars)), r && r.breakAfterOpen && n.lineBreak(), e == "pre" && (n._.inPre = 1)
            },
            attribute: function(e, t) {
                typeof t == "string" && (this.forceSimpleAmpersand && (t = t.replace(/&amp;/g, "&")), t = i.htmlEncodeAttr(t)), this._.output.push(" ", e, '="', t, '"')
            },
            closeTag: function(e) {
                var t = this,
                    n = t._.rules[e];
                n && n.indent && (t._.indentation = t._.indentation.substr(t.indentationChars.length)), t._.indent ? t.indentation() : n && n.breakBeforeClose && (t.lineBreak(), t.indentation()), t._.output.push("</", e, ">"), e == "pre" && (t._.inPre = 0), n && n.breakAfterClose && t.lineBreak()
            },
            text: function(e) {
                var t = this;
                t._.indent && (t.indentation(), !t._.inPre && (e = i.ltrim(e))), t._.output.push(e)
            },
            comment: function(e) {
                this._.indent && this.indentation(), this._.output.push("<!--", e, "-->")
            },
            lineBreak: function() {
                var e = this;
                !e._.inPre && e._.output.length > 0 && e._.output.push(e.lineBreakChars), e._.indent = 1
            },
            indentation: function() {
                var e = this;
                e._.inPre || e._.output.push(e._.indentation), e._.indent = 0
            },
            setRules: function(e, t) {
                var n = this._.rules[e];
                n ? i.extend(n, t, !0) : this._.rules[e] = t
            }
        }
    }), f.add("menubutton", {
        requires: ["button", "menu"],
        beforeInit: function(e) {
            e.ui.addHandler("menubutton", l.menuButton.handler)
        }
    }), e.UI_MENUBUTTON = "menubutton", function() {
        var t = function(t) {
                var n = this._;
                if (n.state === 0) return;
                n.previousState = n.state;
                var r = n.menu;
                r || (r = n.menu = new e.menu(t, {
                    panel: {
                        className: t.skinClass + " cke_contextmenu",
                        attributes: {
                            "aria-label": t.lang.common.options
                        }
                    }
                }), r.onHide = i.bind(function() {
                    this.setState(this.modes && this.modes[t.mode] ? n.previousState : 0)
                }, this), this.onMenu && r.addListener(this.onMenu));
                if (n.on) {
                    r.hide();
                    return
                }
                this.setState(1), r.show(e.document.getById(this._.id), 4)
            };
        l.menuButton = i.createClass({
            base: l.button,
            $: function(e) {
                var n = e.panel;
                delete e.panel, this.base(e), this.hasArrow = !0, this.click = t
            },
            statics: {
                handler: {
                    create: function(e) {
                        return new l.menuButton(e)
                    }
                }
            }
        })
    }(), f.add("dialogui"), function() {
        var s = function(e) {
                var t = this;
                t._ || (t._ = {}), t._["default"] = t._.initValue = e["default"] || "", t._.required = e.required || !1;
                var n = [t._];
                for (var r = 1; r < arguments.length; r++) n.push(arguments[r]);
                return n.push(!0), i.extend.apply(i, n), t._
            },
            o = {
                build: function(e, t, n) {
                    return new l.dialog.textInput(e, t, n)
                }
            },
            a = {
                build: function(e, t, n) {
                    return new l.dialog[t.type](e, t, n)
                }
            },
            f = {
                build: function(t, n, r) {
                    var i = n.children,
                        s, o = [],
                        u = [];
                    for (var a = 0; a < i.length && (s = i[a]); a++) {
                        var f = [];
                        o.push(f), u.push(e.dialog._.uiElementBuilders[s.type].build(t, s, f))
                    }
                    return new l.dialog[n.type](t, u, o, r, n)
                }
            },
            c = {
                isChanged: function() {
                    return this.getValue() != this.getInitValue()
                },
                reset: function(e) {
                    this.setValue(this.getInitValue(), e)
                },
                setInitValue: function() {
                    this._.initValue = this.getValue()
                },
                resetInitValue: function() {
                    this._.initValue = this._["default"]
                },
                getInitValue: function() {
                    return this._.initValue
                }
            },
            p = i.extend({}, l.dialog.uiElement.prototype.eventProcessors, {
                onChange: function(e, t) {
                    this._.domOnChangeRegistered || (e.on("load", function() {
                        this.getInputElement().on("change", function() {
                            if (!e.parts.dialog.isVisible()) return;
                            this.fire("change", {
                                value: this.getValue()
                            })
                        }, this)
                    }, this), this._.domOnChangeRegistered = !0), this.on("change", t)
                }
            }, !0),
            v = /^on([A-Z]\w+)/,
            m = function(e) {
                for (var t in e)(v.test(t) || t == "title" || t == "type") && delete e[t];
                return e
            };
        i.extend(l.dialog, {
            labeledElement: function(t, n, r, o) {
                if (arguments.length < 4) return;
                var u = s.call(this, n);
                u.labelId = i.getNextId() + "_label";
                var a = this._.children = [],
                    f = function() {
                        var r = [],
                            s = n.required ? " cke_required" : "";
                        if (n.labelLayout != "horizontal") r.push('<label class="cke_dialog_ui_labeled_label' + s + '" ', ' id="' + u.labelId + '"', u.inputId ? ' for="' + u.inputId + '"' : "", (n.labelStyle ? ' style="' + n.labelStyle + '"' : "") + ">", n.label, "</label>", '<div class="cke_dialog_ui_labeled_content"' + (n.controlStyle ? ' style="' + n.controlStyle + '"' : "") + ' role="presentation">', o.call(this, t, n), "</div>");
                        else {
                            var a = {
                                type: "hbox",
                                widths: n.widths,
                                padding: 0,
                                children: [{
                                    type: "html",
                                    html: '<label class="cke_dialog_ui_labeled_label' + s + '"' + ' id="' + u.labelId + '"' + ' for="' + u.inputId + '"' + (n.labelStyle ? ' style="' + n.labelStyle + '"' : "") + ">" + i.htmlEncode(n.label) + "</span>"
                                }, {
                                    type: "html",
                                    html: '<span class="cke_dialog_ui_labeled_content"' + (n.controlStyle ? ' style="' + n.controlStyle + '"' : "") + ">" + o.call(this, t, n) + "</span>"
                                }]
                            };
                            e.dialog._.uiElementBuilders.hbox.build(t, a, r)
                        }
                        return r.join("")
                    };
                l.dialog.uiElement.call(this, t, n, r, "div", null, {
                    role: "presentation"
                }, f)
            },
            textInput: function(e, t, n) {
                if (arguments.length < 3) return;
                s.call(this, t);
                var r = this._.inputId = i.getNextId() + "_textInput",
                    o = {
                        "class": "cke_dialog_ui_input_" + t.type,
                        id: r,
                        type: t.type
                    },
                    u;
                t.validate && (this.validate = t.validate), t.maxLength && (o.maxlength = t.maxLength), t.size && (o.size = t.size), t.inputStyle && (o.style = t.inputStyle);
                var a = function() {
                        var e = ['<div class="cke_dialog_ui_input_', t.type, '" role="presentation"'];
                        t.width && e.push('style="width:' + t.width + '" '), e.push("><input "), o["aria-labelledby"] = this._.labelId, this._.required && (o["aria-required"] = this._.required);
                        for (var n in o) e.push(n + '="' + o[n] + '" ');
                        return e.push(" /></div>"), e.join("")
                    };
                l.dialog.labeledElement.call(this, e, t, n, a)
            },
            textarea: function(e, t, n) {
                if (arguments.length < 3) return;
                s.call(this, t);
                var r = this,
                    o = this._.inputId = i.getNextId() + "_textarea",
                    u = {};
                t.validate && (this.validate = t.validate), u.rows = t.rows || 5, u.cols = t.cols || 20, typeof t.inputStyle != "undefined" && (u.style = t.inputStyle);
                var a = function() {
                        u["aria-labelledby"] = this._.labelId, this._.required && (u["aria-required"] = this._.required);
                        var e = ['<div class="cke_dialog_ui_input_textarea" role="presentation"><textarea class="cke_dialog_ui_input_textarea" id="', o, '" '];
                        for (var t in u) e.push(t + '="' + i.htmlEncode(u[t]) + '" ');
                        return e.push(">", i.htmlEncode(r._["default"]), "</textarea></div>"), e.join("")
                    };
                l.dialog.labeledElement.call(this, e, t, n, a)
            },
            checkbox: function(e, t, n) {
                if (arguments.length < 3) return;
                var r = s.call(this, t, {
                    "default": !! t["default"]
                });
                t.validate && (this.validate = t.validate);
                var o = function() {
                        var n = i.extend({}, t, {
                            id: t.id ? t.id + "_checkbox" : i.getNextId() + "_checkbox"
                        }, !0),
                            s = [],
                            o = i.getNextId() + "_label",
                            u = {
                                "class": "cke_dialog_ui_checkbox_input",
                                type: "checkbox",
                                "aria-labelledby": o
                            };
                        return m(n), t["default"] && (u.checked = "checked"), typeof n.inputStyle != "undefined" && (n.style = n.inputStyle), r.checkbox = new l.dialog.uiElement(e, n, s, "input", null, u), s.push(' <label id="', o, '" for="', u.id, '"' + (t.labelStyle ? ' style="' + t.labelStyle + '"' : "") + ">", i.htmlEncode(t.label), "</label>"), s.join("")
                    };
                l.dialog.uiElement.call(this, e, t, n, "span", null, null, o)
            },
            radio: function(e, t, n) {
                if (arguments.length < 3) return;
                s.call(this, t), this._["default"] || (this._["default"] = this._.initValue = t.items[0][1]), t.validate && (this.validate = t.valdiate);
                var r = [],
                    o = this,
                    u = function() {
                        var n = [],
                            s = [],
                            u = {
                                "class": "cke_dialog_ui_radio_item",
                                "aria-labelledby": this._.labelId
                            },
                            a = t.id ? t.id + "_radio" : i.getNextId() + "_radio";
                        for (var f = 0; f < t.items.length; f++) {
                            var c = t.items[f],
                                h = c[2] !== undefined ? c[2] : c[0],
                                p = c[1] !== undefined ? c[1] : c[0],
                                d = i.getNextId() + "_radio_input",
                                v = d + "_label",
                                g = i.extend({}, t, {
                                    id: d,
                                    title: null,
                                    type: null
                                }, !0),
                                b = i.extend({}, g, {
                                    title: h
                                }, !0),
                                w = {
                                    type: "radio",
                                    "class": "cke_dialog_ui_radio_input",
                                    name: a,
                                    value: p,
                                    "aria-labelledby": v
                                },
                                E = [];
                            o._["default"] == p && (w.checked = "checked"), m(g), m(b), typeof g.inputStyle != "undefined" && (g.style = g.inputStyle), r.push(new l.dialog.uiElement(e, g, E, "input", null, w)), E.push(" "), new l.dialog.uiElement(e, b, E, "label", null, {
                                id: v,
                                "for": w.id
                            }, c[0]), n.push(E.join(""))
                        }
                        return new l.dialog.hbox(e, r, n, s), s.join("")
                    };
                l.dialog.labeledElement.call(this, e, t, n, u), this._.children = r
            },
            button: function(t, n, r) {
                if (!arguments.length) return;
                typeof n == "function" && (n = n(t.getParentEditor())), s.call(this, n, {
                    disabled: n.disabled || !1
                }), e.event.implementOn(this);
                var o = this;
                t.on("load", function(e) {
                    var t = this.getElement();
                    (function() {
                        t.on("click", function(e) {
                            o.fire("click", {
                                dialog: o.getDialog()
                            }), e.data.preventDefault()
                        }), t.on("keydown", function(e) {
                            e.data.getKeystroke() in {
                                32: 1
                            } && (o.click(), e.data.preventDefault())
                        })
                    })(), t.unselectable()
                }, this);
                var u = i.extend({}, n);
                delete u.style;
                var a = i.getNextId() + "_label";
                l.dialog.uiElement.call(this, t, u, r, "a", null, {
                    style: n.style,
                    href: "javascript:void(0)",
                    title: n.label,
                    hidefocus: "true",
                    "class": n["class"],
                    role: "button",
                    "aria-labelledby": a
                }, '<span id="' + a + '" class="cke_dialog_ui_button">' + i.htmlEncode(n.label) + "</span>")
            },
            select: function(e, t, n) {
                if (arguments.length < 3) return;
                var r = s.call(this, t);
                t.validate && (this.validate = t.validate), r.inputId = i.getNextId() + "_select";
                var o = function() {
                        var n = i.extend({}, t, {
                            id: t.id ? t.id + "_select" : i.getNextId() + "_select"
                        }, !0),
                            s = [],
                            o = [],
                            u = {
                                id: r.inputId,
                                "class": "cke_dialog_ui_input_select",
                                "aria-labelledby": this._.labelId
                            };
                        t.size != undefined && (u.size = t.size), t.multiple != undefined && (u.multiple = t.multiple), m(n);
                        for (var a = 0, f; a < t.items.length && (f = t.items[a]); a++) o.push('<option value="', i.htmlEncode(f[1] !== undefined ? f[1] : f[0]).replace(/"/g, "&quot;"), '" /> ', i.htmlEncode(f[0]));
                        return typeof n.inputStyle != "undefined" && (n.style = n.inputStyle), r.select = new l.dialog.uiElement(e, n, s, "select", null, u, o.join("")), s.join("")
                    };
                l.dialog.labeledElement.call(this, e, t, n, o)
            },
            file: function(n, r, o) {
                if (arguments.length < 3) return;
                r["default"] === undefined && (r["default"] = "");
                var u = i.extend(s.call(this, r), {
                    definition: r,
                    buttons: []
                });
                r.validate && (this.validate = r.validate);
                var a = function() {
                        u.frameId = i.getNextId() + "_fileInput";
                        var e = t.isCustomDomain(),
                            n = ['<iframe frameborder="0" allowtransparency="0" class="cke_dialog_ui_input_file" role="presentation" id="', u.frameId, '" title="', r.label, '" src="javascript:void('];
                        return n.push(e ? "(function(){document.open();document.domain='" + document.domain + "';" + "document.close();" + "})()" : "0"), n.push(')"></iframe>'), n.join("")
                    };
                n.on("load", function() {
                    var t = e.document.getById(u.frameId),
                        n = t.getParent();
                    n.addClass("cke_dialog_ui_input_file")
                }), l.dialog.labeledElement.call(this, n, r, o, a)
            },
            fileButton: function(e, t, n) {
                if (arguments.length < 3) return;
                var r = s.call(this, t),
                    o = this;
                t.validate && (this.validate = t.validate);
                var u = i.extend({}, t),
                    a = u.onClick;
                u.className = (u.className ? u.className + " " : "") + "cke_dialog_ui_button", u.onClick = function(n) {
                    var r = t["for"];
                    if (!a || a.call(this, n) !== !1) e.getContentElement(r[0], r[1]).submit(), this.disable()
                }, e.on("load", function() {
                    e.getContentElement(t["for"][0], t["for"][1])._.buttons.push(o)
                }), l.dialog.button.call(this, e, u, n)
            },
            html: function() {
                var e = /^\s*<[\w:]+\s+([^>]*)?>/,
                    t = /^(\s*<[\w:]+(?:\s+[^>]*)?)((?:.|\r|\n)+)$/,
                    n = /\/$/;
                return function(r, i, s) {
                    if (arguments.length < 3) return;
                    var o = [],
                        u, a = i.html,
                        f, c;
                    a.charAt(0) != "<" && (a = "<span>" + a + "</span>");
                    var h = i.focus;
                    if (h) {
                        var p = this.focus;
                        this.focus = function() {
                            p.call(this), typeof h == "function" && h.call(this), this.fire("focus")
                        };
                        if (i.isFocusable) {
                            var d = this.isFocusable;
                            this.isFocusable = d
                        }
                        this.keyboardFocusable = !0
                    }
                    l.dialog.uiElement.call(this, r, i, o, "span", null, null, ""), u = o.join(""), f = u.match(e), c = a.match(t) || ["", "", ""], n.test(c[1]) && (c[1] = c[1].slice(0, -1), c[2] = "/" + c[2]), s.push([c[1], " ", f[1] || "", c[2]].join(""))
                }
            }(),
            fieldset: function(e, t, n, r, i) {
                var s = i.label,
                    o = function() {
                        var e = [];
                        s && e.push("<legend" + (i.labelStyle ? ' style="' + i.labelStyle + '"' : "") + ">" + s + "</legend>");
                        for (var t = 0; t < n.length; t++) e.push(n[t]);
                        return e.join("")
                    };
                this._ = {
                    children: t
                }, l.dialog.uiElement.call(this, e, i, r, "fieldset", null, null, o)
            }
        }, !0), l.dialog.html.prototype = new l.dialog.uiElement, l.dialog.labeledElement.prototype = i.extend(new l.dialog.uiElement, {
            setLabel: function(t) {
                var n = e.document.getById(this._.labelId);
                return n.getChildCount() < 1 ? (new r.text(t, e.document)).appendTo(n) : n.getChild(0).$.nodeValue = t, this
            },
            getLabel: function() {
                var t = e.document.getById(this._.labelId);
                return !t || t.getChildCount() < 1 ? "" : t.getChild(0).getText()
            },
            eventProcessors: p
        }, !0), l.dialog.button.prototype = i.extend(new l.dialog.uiElement, {
            click: function() {
                var e = this;
                return e._.disabled ? (e.getElement().$.blur(), !1) : e.fire("click", {
                    dialog: e._.dialog
                })
            },
            enable: function() {
                this._.disabled = !1;
                var e = this.getElement();
                e && e.removeClass("cke_disabled")
            },
            disable: function() {
                this._.disabled = !0, this.getElement().addClass("cke_disabled")
            },
            isVisible: function() {
                return this.getElement().getFirst().isVisible()
            },
            isEnabled: function() {
                return !this._.disabled
            },
            eventProcessors: i.extend({}, l.dialog.uiElement.prototype.eventProcessors, {
                onClick: function(e, t) {
                    this.on("click", function() {
                        this.getElement().focus(), t.apply(this, arguments)
                    })
                }
            }, !0),
            accessKeyUp: function() {
                this.click()
            },
            accessKeyDown: function() {
                this.focus()
            },
            keyboardFocusable: !0
        }, !0), l.dialog.textInput.prototype = i.extend(new l.dialog.labeledElement, {
            getInputElement: function() {
                return e.document.getById(this._.inputId)
            },
            focus: function() {
                var e = this.selectParentTab();
                setTimeout(function() {
                    var t = e.getInputElement();
                    t && t.$.focus()
                }, 0)
            },
            select: function() {
                var e = this.selectParentTab();
                setTimeout(function() {
                    var t = e.getInputElement();
                    t && (t.$.focus(), t.$.select())
                }, 0)
            },
            accessKeyUp: function() {
                this.select()
            },
            setValue: function(e) {
                return !e && (e = ""), l.dialog.uiElement.prototype.setValue.apply(this, arguments)
            },
            keyboardFocusable: !0
        }, c, !0), l.dialog.textarea.prototype = new l.dialog.textInput, l.dialog.select.prototype = i.extend(new l.dialog.labeledElement, {
            getInputElement: function() {
                return this._.select.getElement()
            },
            add: function(e, t, r) {
                var i = new u("option", this.getDialog().getParentEditor().document),
                    s = this.getInputElement().$;
                return i.$.text = e, i.$.value = t === undefined || t === null ? e : t, r === undefined || r === null ? n ? s.add(i.$) : s.add(i.$, null) : s.add(i.$, r), this
            },
            remove: function(e) {
                var t = this.getInputElement().$;
                return t.remove(e), this
            },
            clear: function() {
                var e = this.getInputElement().$;
                while (e.length > 0) e.remove(0);
                return this
            },
            keyboardFocusable: !0
        }, c, !0), l.dialog.checkbox.prototype = i.extend(new l.dialog.uiElement, {
            getInputElement: function() {
                return this._.checkbox.getElement()
            },
            setValue: function(e, t) {
                this.getInputElement().$.checked = e, !t && this.fire("change", {
                    value: e
                })
            },
            getValue: function() {
                return this.getInputElement().$.checked
            },
            accessKeyUp: function() {
                this.setValue(!this.getValue())
            },
            eventProcessors: {
                onChange: function(e, t) {
                    return n ? (e.on("load", function() {
                        var e = this._.checkbox.getElement();
                        e.on("propertychange", function(t) {
                            t = t.data.$, t.propertyName == "checked" && this.fire("change", {
                                value: e.$.checked
                            })
                        }, this)
                    }, this), this.on("change", t), null) : p.onChange.apply(this, arguments)
                }
            },
            keyboardFocusable: !0
        }, c, !0), l.dialog.radio.prototype = i.extend(new l.dialog.uiElement, {
            setValue: function(e, t) {
                var n = this._.children,
                    r;
                for (var i = 0; i < n.length && (r = n[i]); i++) r.getElement().$.checked = r.getValue() == e;
                !t && this.fire("change", {
                    value: e
                })
            },
            getValue: function() {
                var e = this._.children;
                for (var t = 0; t < e.length; t++) if (e[t].getElement().$.checked) return e[t].getValue();
                return null
            },
            accessKeyUp: function() {
                var e = this._.children,
                    t;
                for (t = 0; t < e.length; t++) if (e[t].getElement().$.checked) {
                    e[t].getElement().focus();
                    return
                }
                e[0].getElement().focus()
            },
            eventProcessors: {
                onChange: function(e, t) {
                    return n ? (e.on("load", function() {
                        var e = this._.children,
                            t = this;
                        for (var n = 0; n < e.length; n++) {
                            var r = e[n].getElement();
                            r.on("propertychange", function(e) {
                                e = e.data.$, e.propertyName == "checked" && this.$.checked && t.fire("change", {
                                    value: this.getAttribute("value")
                                })
                            })
                        }
                    }, this), this.on("change", t), null) : p.onChange.apply(this, arguments)
                }
            },
            keyboardFocusable: !0
        }, c, !0), l.dialog.file.prototype = i.extend(new l.dialog.labeledElement, c, {
            getInputElement: function() {
                var t = e.document.getById(this._.frameId).getFrameDocument();
                return t.$.forms.length > 0 ? new u(t.$.forms[0].elements[0]) : this.getElement()
            },
            submit: function() {
                return this.getInputElement().getParent().$.submit(), this
            },
            getAction: function() {
                return this.getInputElement().getParent().$.action
            },
            registerEvents: function(e) {
                var t = /^on([A-Z]\w+)/,
                    n, r = function(e, t, n, r) {
                        e.on("formLoaded", function() {
                            e.getInputElement().on(n, r, e)
                        })
                    };
                for (var i in e) {
                    if (!(n = i.match(t))) continue;
                    this.eventProcessors[i] ? this.eventProcessors[i].call(this, this._.dialog, e[i]) : r(this, this._.dialog, n[1].toLowerCase(), e[i])
                }
                return this
            },
            reset: function() {
                function p() {
                    o.$.open(), t.isCustomDomain() && (o.$.domain = document.domain);
                    var e = "";
                    u.size && (e = u.size - (n ? 7 : 0));
                    var s = r.frameId + "_input";
                    o.$.write(['<html dir="' + c + '" lang="' + h + '"><head><title></title></head><body style="margin: 0; overflow: hidden; background: transparent;">', '<form enctype="multipart/form-data" method="POST" dir="' + c + '" lang="' + h + '" action="', i.htmlEncode(u.action), '">', '<label id="', r.labelId, '" for="', s, '" style="display:none">', i.htmlEncode(u.label), "</label>", '<input id="', s, '" aria-labelledby="', r.labelId, '" type="file" name="', i.htmlEncode(u.id || "cke_upload"), '" size="', i.htmlEncode(e > 0 ? e : ""), '" />', "</form>", "</body></html>", "<script>window.parent.CKEDITOR.tools.callFunction(" + f + ");", "window.onbeforeunload = function() {window.parent.CKEDITOR.tools.callFunction(" + l + ")}</script>"].join("")), o.$.close();
                    for (var p = 0; p < a.length; p++) a[p].enable()
                }
                var r = this._,
                    s = e.document.getById(r.frameId),
                    o = s.getFrameDocument(),
                    u = r.definition,
                    a = r.buttons,
                    f = this.formLoadedNumber,
                    l = this.formUnloadNumber,
                    c = r.dialog._.editor.lang.dir,
                    h = r.dialog._.editor.langCode;
                f || (f = this.formLoadedNumber = i.addFunction(function() {
                    this.fire("formLoaded")
                }, this), l = this.formUnloadNumber = i.addFunction(function() {
                    this.getInputElement().clearCustomData()
                }, this), this.getDialog()._.editor.on("destroy", function() {
                    i.removeFunction(f), i.removeFunction(l)
                })), t.gecko ? setTimeout(p, 500) : p()
            },
            getValue: function() {
                return this.getInputElement().$.value || ""
            },
            setInitValue: function() {
                this._.initValue = ""
            },
            eventProcessors: {
                onChange: function(e, t) {
                    this._.domOnChangeRegistered || (this.on("formLoaded", function() {
                        this.getInputElement().on("change", function() {
                            this.fire("change", {
                                value: this.getValue()
                            })
                        }, this)
                    }, this), this._.domOnChangeRegistered = !0), this.on("change", t)
                }
            },
            keyboardFocusable: !0
        }, !0), l.dialog.fileButton.prototype = new l.dialog.button, l.dialog.fieldset.prototype = i.clone(l.dialog.hbox.prototype), e.dialog.addUIElement("text", o), e.dialog.addUIElement("password", o), e.dialog.addUIElement("textarea", a), e.dialog.addUIElement("checkbox", a), e.dialog.addUIElement("radio", a), e.dialog.addUIElement("button", a), e.dialog.addUIElement("select", a), e.dialog.addUIElement("file", a), e.dialog.addUIElement("fileButton", a), e.dialog.addUIElement("html", a), e.dialog.addUIElement("fieldset", f)
    }(), f.add("panel", {
        beforeInit: function(e) {
            e.ui.addHandler("panel", l.panel.handler)
        }
    }), e.UI_PANEL = "panel", l.panel = function(e, t) {
        var n = this;
        t && i.extend(n, t), i.extend(n, {
            className: "",
            css: []
        }), n.id = i.getNextId(), n.document = e, n._ = {
            blocks: {}
        }
    }, l.panel.handler = {
        create: function(e) {
            return new l.panel(e)
        }
    }, l.panel.prototype = {
        renderHtml: function(e) {
            var t = [];
            return this.render(e, t), t.join("")
        },
        render: function(e, n) {
            var r = this,
                i = r.id;
            n.push('<div class="', e.skinClass, '" lang="', e.langCode, '" role="presentation" style="display:none;z-index:' + (e.config.baseFloatZIndex + 1) + '">' + "<div" + " id=", i, " dir=", e.lang.dir, ' role="presentation" class="cke_panel cke_', e.lang.dir), r.className && n.push(" ", r.className), n.push('">');
            if (r.forceIFrame || r.css.length) n.push('<iframe id="', i, '_frame" frameborder="0" role="application" src="javascript:void('), n.push(t.isCustomDomain() ? "(function(){document.open();document.domain='" + document.domain + "';" + "document.close();" + "})()" : "0"), n.push(')"></iframe>');
            return n.push("</div></div>"), i
        },
        getHolderElement: function() {
            var n = this._.holder;
            if (!n) {
                if (this.forceIFrame || this.css.length) {
                    var r = this.document.getById(this.id + "_frame"),
                        s = r.getParent(),
                        o = s.getAttribute("dir"),
                        u = s.getParent().getAttribute("class"),
                        a = s.getParent().getAttribute("lang"),
                        f = r.getFrameDocument();
                    t.iOS && s.setStyles({
                        overflow: "scroll",
                        "-webkit-overflow-scrolling": "touch"
                    });
                    var l = i.addFunction(i.bind(function(e) {
                        this.isLoaded = !0, this.onLoad && this.onLoad()
                    }, this)),
                        c = '<!DOCTYPE html><html dir="' + o + '" class="' + u + '_container" lang="' + a + '">' + "<head>" + "<style>." + u + "_container{visibility:hidden}</style>" + i.buildStyleHtml(this.css) + "</head>" + '<body class="cke_' + o + " cke_panel_frame " + t.cssClass + '" style="margin:0;padding:0"' + ' onload="( window.CKEDITOR || window.parent.CKEDITOR ).tools.callFunction(' + l + ');"></body>' + "</html>";
                    f.write(c);
                    var h = f.getWindow();
                    h.$.CKEDITOR = e, f.on("key" + (t.opera ? "press" : "down"), function(e) {
                        var t = this,
                            n = e.data.getKeystroke(),
                            r = t.document.getById(t.id).getAttribute("dir");
                        if (t._.onKeyDown && t._.onKeyDown(n) === !1) {
                            e.data.preventDefault();
                            return
                        }(n == 27 || n == (r == "rtl" ? 39 : 37)) && t.onEscape && t.onEscape(n) === !1 && e.data.preventDefault()
                    }, this), n = f.getBody(), n.unselectable(), t.air && i.callFunction(l)
                } else n = this.document.getById(this.id);
                this._.holder = n
            }
            return n
        },
        addBlock: function(e, t) {
            var n = this;
            return t = n._.blocks[e] = t instanceof l.panel.block ? t : new l.panel.block(n.getHolderElement(), t), n._.currentBlock || n.showBlock(e), t
        },
        getBlock: function(e) {
            return this._.blocks[e]
        },
        showBlock: function(t) {
            var r = this,
                s = r._.blocks,
                o = s[t],
                u = r._.currentBlock,
                a = !r.forceIFrame || n ? r._.holder : r.document.getById(r.id + "_frame");
            return u && (a.removeAttributes(u.attributes), u.hide()), r._.currentBlock = o, a.setAttributes(o.attributes), e.fire("ariaWidget", a), o._.focusIndex = -1, r._.onKeyDown = o.onKeyDown && i.bind(o.onKeyDown, o), o.show(), o
        },
        destroy: function() {
            this.element && this.element.remove()
        }
    }, l.panel.block = i.createClass({
        $: function(e, t) {
            var n = this;
            n.element = e.append(e.getDocument().createElement("div", {
                attributes: {
                    tabIndex: -1,
                    "class": "cke_panel_block",
                    role: "presentation"
                },
                styles: {
                    display: "none"
                }
            })), t && i.extend(n, t), n.attributes.title || (n.attributes.title = n.attributes["aria-label"]), n.keys = {}, n._.focusIndex = -1, n.element.disableContextMenu()
        },
        _: {
            markItem: function(e) {
                var n = this;
                if (e == -1) return;
                var r = n.element.getElementsByTag("a"),
                    i = r.getItem(n._.focusIndex = e);
                (t.webkit || t.opera) && i.getDocument().getWindow().focus(), i.focus(), n.onMark && n.onMark(i)
            }
        },
        proto: {
            show: function() {
                this.element.setStyle("display", "")
            },
            hide: function() {
                var e = this;
                (!e.onHide || e.onHide.call(e) !== !0) && e.element.setStyle("display", "none")
            },
            onKeyDown: function(e) {
                var t = this,
                    n = t.keys[e];
                switch (n) {
                case "next":
                    var r = t._.focusIndex,
                        i = t.element.getElementsByTag("a"),
                        s;
                    while (s = i.getItem(++r)) if (s.getAttribute("_cke_focus") && s.$.offsetWidth) {
                        t._.focusIndex = r, s.focus();
                        break
                    }
                    return !1;
                case "prev":
                    r = t._.focusIndex, i = t.element.getElementsByTag("a");
                    while (r > 0 && (s = i.getItem(--r))) if (s.getAttribute("_cke_focus") && s.$.offsetWidth) {
                        t._.focusIndex = r, s.focus();
                        break
                    }
                    return !1;
                case "click":
                case "mouseup":
                    return r = t._.focusIndex, s = r >= 0 && t.element.getElementsByTag("a").getItem(r), s && (s.$[n] ? s.$[n]() : s.$["on" + n]()), !1
                }
                return !0
            }
        }
    }), f.add("listblock", {
        requires: ["panel"],
        onLoad: function() {
            l.panel.prototype.addListBlock = function(e, t) {
                return this.addBlock(e, new l.listBlock(this.getHolderElement(), t))
            }, l.listBlock = i.createClass({
                base: l.panel.block,
                $: function(e, t) {
                    var r = this;
                    t = t || {};
                    var i = t.attributes || (t.attributes = {});
                    (r.multiSelect = !! t.multiSelect) && (i["aria-multiselectable"] = !0), !i.role && (i.role = "listbox"), r.base.apply(r, arguments);
                    var s = r.keys;
                    s[40] = "next", s[9] = "next", s[38] = "prev", s[2228233] = "prev", s[32] = n ? "mouseup" : "click", n && (s[13] = "mouseup"), r._.pendingHtml = [], r._.items = {}, r._.groups = {}
                },
                _: {
                    close: function() {
                        this._.started && (this._.pendingHtml.push("</ul>"), delete this._.started)
                    },
                    getClick: function() {
                        return this._.click || (this._.click = i.addFunction(function(e) {
                            var t = this,
                                n = !0;
                            t.multiSelect ? n = t.toggle(e) : t.mark(e), t.onClick && t.onClick(e, n)
                        }, this)), this._.click
                    }
                },
                proto: {
                    add: function(e, t, r) {
                        var s = this,
                            o = s._.pendingHtml,
                            u = i.getNextId();
                        s._.started || (o.push('<ul role="presentation" class=cke_panel_list>'), s._.started = 1, s._.size = s._.size || 0), s._.items[e] = u, o.push("<li id=", u, ' class=cke_panel_listItem role=presentation><a id="', u, '_option" _cke_focus=1 hidefocus=true title="', r || e, '" href="javascript:void(\'', e, "')\" " + (n ? 'onclick="return false;" onmouseup' : "onclick") + '="CKEDITOR.tools.callFunction(', s._.getClick(), ",'", e, "'); return false;\"", ' role="option">', t || e, "</a></li>")
                    },
                    startGroup: function(e) {
                        this._.close();
                        var t = i.getNextId();
                        this._.groups[e] = t, this._.pendingHtml.push('<h1 role="presentation" id=', t, " class=cke_panel_grouptitle>", e, "</h1>")
                    },
                    commit: function() {
                        var e = this;
                        e._.close(), e.element.appendHtml(e._.pendingHtml.join("")), delete e._.size, e._.pendingHtml = []
                    },
                    toggle: function(e) {
                        var t = this.isMarked(e);
                        return t ? this.unmark(e) : this.mark(e), !t
                    },
                    hideGroup: function(e) {
                        var t = this.element.getDocument().getById(this._.groups[e]),
                            n = t && t.getNext();
                        t && (t.setStyle("display", "none"), n && n.getName() == "ul" && n.setStyle("display", "none"))
                    },
                    hideItem: function(e) {
                        this.element.getDocument().getById(this._.items[e]).setStyle("display", "none")
                    },
                    showAll: function() {
                        var e = this._.items,
                            t = this._.groups,
                            n = this.element.getDocument();
                        for (var r in e) n.getById(e[r]).setStyle("display", "");
                        for (var i in t) {
                            var s = n.getById(t[i]),
                                o = s.getNext();
                            s.setStyle("display", ""), o && o.getName() == "ul" && o.setStyle("display", "")
                        }
                    },
                    mark: function(e) {
                        var t = this;
                        t.multiSelect || t.unmarkAll();
                        var n = t._.items[e],
                            r = t.element.getDocument().getById(n);
                        r.addClass("cke_selected"), t.element.getDocument().getById(n + "_option").setAttribute("aria-selected", !0), t.onMark && t.onMark(r)
                    },
                    unmark: function(e) {
                        var t = this,
                            n = t.element.getDocument(),
                            r = t._.items[e],
                            i = n.getById(r);
                        i.removeClass("cke_selected"), n.getById(r + "_option").removeAttribute("aria-selected"), t.onUnmark && t.onUnmark(i)
                    },
                    unmarkAll: function() {
                        var e = this,
                            t = e._.items,
                            n = e.element.getDocument();
                        for (var r in t) {
                            var i = t[r];
                            n.getById(i).removeClass("cke_selected"), n.getById(i + "_option").removeAttribute("aria-selected")
                        }
                        e.onUnmark && e.onUnmark()
                    },
                    isMarked: function(e) {
                        return this.element.getDocument().getById(this._.items[e]).hasClass("cke_selected")
                    },
                    focus: function(e) {
                        this._.focusIndex = -1;
                        if (e) {
                            var t = this.element.getDocument().getById(this._.items[e]).getFirst(),
                                n = this.element.getElementsByTag("a"),
                                r, i = -1;
                            while (r = n.getItem(++i)) if (r.equals(t)) {
                                this._.focusIndex = i;
                                break
                            }
                            setTimeout(function() {
                                t.focus()
                            }, 0)
                        }
                    }
                }
            })
        }
    }), e.themes.add("default", function() {
        function s(n, r) {
            var i, s;
            s = n.config.sharedSpaces, s = s && s[r], s = s && e.document.getById(s);
            if (s) {
                var o = '<span class="cke_shared " dir="' + n.lang.dir + '"' + ">" + '<span class="' + n.skinClass + " " + n.id + " cke_editor_" + n.name + '">' + '<span class="' + t.cssClass + '">' + '<span class="cke_wrapper cke_' + n.lang.dir + '">' + '<span class="cke_editor">' + '<div class="cke_' + r + '">' + "</div></span></span></span></span></span>",
                    a = s.append(u.createFromHtml(o, s.getDocument()));
                s.getCustomData("cke_hasshared") ? a.hide() : s.setCustomData("cke_hasshared", 1), i = a.getChild([0, 0, 0, 0]), !n.sharedSpaces && (n.sharedSpaces = {}), n.sharedSpaces[r] = i, n.on("focus", function() {
                    for (var e = 0, t, n = s.getChildren(); t = n.getItem(e); e++) t.type == 1 && !t.equals(a) && t.hasClass("cke_shared") && t.hide();
                    a.show()
                }), n.on("destroy", function() {
                    a.remove()
                })
            }
            return i
        }
        var r = {};
        return {
            build: function(e, n) {
                var i = e.name,
                    o = e.element,
                    a = e.elementMode;
                if (!o || a == 0) return;
                a == 1 && o.hide();
                var f = e.fire("themeSpace", {
                    space: "top",
                    html: ""
                }).html,
                    l = e.fire("themeSpace", {
                        space: "contents",
                        html: ""
                    }).html,
                    c = e.fireOnce("themeSpace", {
                        space: "bottom",
                        html: ""
                    }).html,
                    p = l && e.config.height,
                    d = e.config.tabIndex || e.element.getAttribute("tabindex") || 0;
                l ? isNaN(p) || (p += "px") : p = "auto";
                var v = "",
                    g = e.config.width;
                g && (isNaN(g) || (g += "px"), v += "width: " + g + ";");
                var y = f && s(e, "top"),
                    w = s(e, "bottom");
                y && (y.setHtml(f), f = ""), w && (w.setHtml(c), c = "");
                var E = "<style>." + e.skinClass + "{visibility:hidden;}</style>";
                r[e.skinClass] ? E = "" : r[e.skinClass] = 1;
                var S = u.createFromHtml(['<span id="cke_', i, '" class="', e.skinClass, " ", e.id, " cke_editor_", i, '" dir="', e.lang.dir, '" title="', t.gecko ? " " : "", '" lang="', e.langCode, '"' + (t.webkit ? ' tabindex="' + d + '"' : "") + ' role="application"' + ' aria-labelledby="cke_', i, '_arialbl"' + (v ? ' style="' + v + '"' : "") + ">" + '<span id="cke_', i, '_arialbl" class="cke_voice_label">' + e.lang.editor + "</span>" + '<span class="', t.cssClass, '" role="presentation"><span class="cke_wrapper cke_', e.lang.dir, '" role="presentation"><table class="cke_editor" border="0" cellspacing="0" cellpadding="0" role="presentation"><tbody><tr', f ? "" : ' style="display:none"', ' role="presentation"><td id="cke_top_', i, '" class="cke_top" role="presentation">', f, "</td></tr><tr", l ? "" : ' style="display:none"', ' role="presentation"><td id="cke_contents_', i, '" class="cke_contents" style="height:', p, '" role="presentation">', l, "</td></tr><tr", c ? "" : ' style="display:none"', ' role="presentation"><td id="cke_bottom_', i, '" class="cke_bottom" role="presentation">', c, "</td></tr></tbody></table>" + E + "</span>" + "</span>" + "</span>"].join(""));
                S.getChild([1, 0, 0, 0, 0]).unselectable(), S.getChild([1, 0, 0, 0, 2]).unselectable(), a == 1 ? S.insertAfter(o) : o.append(S), e.container = S, S.disableContextMenu(), e.on("contentDirChanged", function(t) {
                    var n = (e.lang.dir != t.data ? "add" : "remove") + "Class";
                    S.getChild(1)[n]("cke_mixed_dir_content");
                    var r = this.sharedSpaces && this.sharedSpaces[this.config.toolbarLocation];
                    r && r.getParent().getParent()[n]("cke_mixed_dir_content")
                }), e.fireOnce("themeLoaded"), e.fireOnce("uiReady")
            },
            buildDialog: function(e) {
                var r = i.getNextNumber(),
                    s = u.createFromHtml(['<div class="', e.id, "_dialog cke_editor_", e.name.replace(".", "\\."), "_dialog cke_skin_", e.skinName, '" dir="', e.lang.dir, '" lang="', e.langCode, '" role="dialog" aria-labelledby="%title#"><table class="cke_dialog', " " + t.cssClass, " cke_", e.lang.dir, '" style="position:absolute" role="presentation"><tr><td role="presentation"><div class="%body" role="presentation"><div id="%title#" class="%title" role="presentation"></div><a id="%close_button#" class="%close_button" href="javascript:void(0)" title="' + e.lang.common.close + '" role="button"><span class="cke_label">X</span></a>' + '<div id="%tabs#" class="%tabs" role="tablist"></div>' + '<table class="%contents" role="presentation">' + "<tr>" + '<td id="%contents#" class="%contents" role="presentation"></td>' + "</tr>" + "<tr>" + '<td id="%footer#" class="%footer" role="presentation"></td>' + "</tr>" + "</table>" + "</div>" + '<div id="%tl#" class="%tl"></div>' + '<div id="%tc#" class="%tc"></div>' + '<div id="%tr#" class="%tr"></div>' + '<div id="%ml#" class="%ml"></div>' + '<div id="%mr#" class="%mr"></div>' + '<div id="%bl#" class="%bl"></div>' + '<div id="%bc#" class="%bc"></div>' + '<div id="%br#" class="%br"></div>' + "</td></tr>" + "</table>", n ? "" : "<style>.cke_dialog{visibility:hidden;}</style>", "</div>"].join("").replace(/#/g, "_" + r).replace(/%/g, "cke_dialog_")),
                    o = s.getChild([0, 0, 0, 0, 0]),
                    a = o.getChild(0),
                    f = o.getChild(1);
                if (n && !t.ie6Compat) {
                    var l = t.isCustomDomain(),
                        c = "javascript:void(function(){" + encodeURIComponent("document.open();" + (l ? 'document.domain="' + document.domain + '";' : "") + "document.close();") + "}())",
                        p = u.createFromHtml('<iframe frameBorder="0" class="cke_iframe_shim" src="' + c + '"' + ' tabIndex="-1"' + "></iframe>");
                    p.appendTo(o.getParent())
                }
                return a.unselectable(), f.unselectable(), {
                    element: s,
                    parts: {
                        dialog: s.getChild(0),
                        title: a,
                        close: f,
                        tabs: o.getChild(2),
                        contents: o.getChild([3, 0, 0, 0]),
                        footer: o.getChild([3, 0, 1, 0])
                    }
                }
            },
            destroy: function(e) {
                var t = e.container,
                    n = e.element;
                t && (t.clearCustomData(), t.remove()), n && (n.clearCustomData(), e.elementMode == 1 && n.show(), delete e.element)
            }
        }
    }()), e.editor.prototype.getThemeSpace = function(t) {
        var n = "cke_" + t,
            r = this._[n] || (this._[n] = e.document.getById(n + "_" + this.name));
        return r
    }, e.editor.prototype.resize = function(n, r, i, s) {
        var o = this,
            u = o.container,
            a = e.document.getById("cke_contents_" + o.name),
            f = t.webkit && o.document && o.document.getWindow().$.frameElement,
            l = s ? u.getChild(1) : u;
        l.setSize("width", n, !0), f && (f.style.width = "1%");
        var c = i ? 0 : (l.$.offsetHeight || 0) - (a.$.clientHeight || 0);
        a.setStyle("height", Math.max(r - c, 0) + "px"), f && (f.style.width = "100%"), o.fire("resize")
    }, e.editor.prototype.getResizable = function(t) {
        return t ? e.document.getById("cke_contents_" + this.name) : this.container
    }
}(), function($) {
    function Timepicker() {
        this.regional = [], this.regional[""] = {
            currentText: "Now",
            closeText: "Done",
            ampm: !1,
            amNames: ["AM", "A"],
            pmNames: ["PM", "P"],
            timeFormat: "hh:mm tt",
            timeSuffix: "",
            timeOnlyTitle: "Choose Time",
            timeText: "Time",
            hourText: "Hour",
            minuteText: "Minute",
            secondText: "Second",
            millisecText: "Millisecond",
            timezoneText: "Time Zone"
        }, this._defaults = {
            showButtonPanel: !0,
            timeOnly: !1,
            showHour: !0,
            showMinute: !0,
            showSecond: !1,
            showMillisec: !1,
            showTimezone: !1,
            showTime: !0,
            stepHour: 1,
            stepMinute: 1,
            stepSecond: 1,
            stepMillisec: 1,
            hour: 0,
            minute: 0,
            second: 0,
            millisec: 0,
            timezone: "+0000",
            hourMin: 0,
            minuteMin: 0,
            secondMin: 0,
            millisecMin: 0,
            hourMax: 23,
            minuteMax: 59,
            secondMax: 59,
            millisecMax: 999,
            minDateTime: null,
            maxDateTime: null,
            onSelect: null,
            hourGrid: 0,
            minuteGrid: 0,
            secondGrid: 0,
            millisecGrid: 0,
            alwaysSetTime: !0,
            separator: " ",
            altFieldTimeOnly: !0,
            showTimepicker: !0,
            timezoneIso8609: !1,
            timezoneList: null,
            addSliderAccess: !1,
            sliderAccessArgs: null
        }, $.extend(this._defaults, this.regional[""])
    }
    function extendRemove(e, t) {
        $.extend(e, t);
        for (var n in t) if (t[n] === null || t[n] === undefined) e[n] = t[n];
        return e
    }
    $.ui.timepicker = $.ui.timepicker || {};
    if ($.ui.timepicker.version) return;
    $.extend($.ui, {
        timepicker: {
            version: "1.0.0"
        }
    }), $.extend(Timepicker.prototype, {
        $input: null,
        $altInput: null,
        $timeObj: null,
        inst: null,
        hour_slider: null,
        minute_slider: null,
        second_slider: null,
        millisec_slider: null,
        timezone_select: null,
        hour: 0,
        minute: 0,
        second: 0,
        millisec: 0,
        timezone: "+0000",
        hourMinOriginal: null,
        minuteMinOriginal: null,
        secondMinOriginal: null,
        millisecMinOriginal: null,
        hourMaxOriginal: null,
        minuteMaxOriginal: null,
        secondMaxOriginal: null,
        millisecMaxOriginal: null,
        ampm: "",
        formattedDate: "",
        formattedTime: "",
        formattedDateTime: "",
        timezoneList: null,
        setDefaults: function(e) {
            return extendRemove(this._defaults, e || {}), this
        },
        _newInst: function($input, o) {
            var tp_inst = new Timepicker,
                inlineSettings = {};
            for (var attrName in this._defaults) {
                var attrValue = $input.attr("time:" + attrName);
                if (attrValue) try {
                    inlineSettings[attrName] = eval(attrValue)
                } catch (err) {
                    inlineSettings[attrName] = attrValue
                }
            }
            tp_inst._defaults = $.extend({}, this._defaults, inlineSettings, o, {
                beforeShow: function(e, t) {
                    if ($.isFunction(o.beforeShow)) return o.beforeShow(e, t, tp_inst)
                },
                onChangeMonthYear: function(e, t, n) {
                    tp_inst._updateDateTime(n), $.isFunction(o.onChangeMonthYear) && o.onChangeMonthYear.call($input[0], e, t, n, tp_inst)
                },
                onClose: function(e, t) {
                    tp_inst.timeDefined === !0 && $input.val() != "" && tp_inst._updateDateTime(t), $.isFunction(o.onClose) && o.onClose.call($input[0], e, t, tp_inst)
                },
                timepicker: tp_inst
            }), tp_inst.amNames = $.map(tp_inst._defaults.amNames, function(e) {
                return e.toUpperCase()
            }), tp_inst.pmNames = $.map(tp_inst._defaults.pmNames, function(e) {
                return e.toUpperCase()
            });
            if (tp_inst._defaults.timezoneList === null) {
                var timezoneList = [];
                for (var i = -11; i <= 12; i++) timezoneList.push((i >= 0 ? "+" : "-") + ("0" + Math.abs(i).toString()).slice(-2) + "00");
                tp_inst._defaults.timezoneIso8609 && (timezoneList = $.map(timezoneList, function(e) {
                    return e == "+0000" ? "Z" : e.substring(0, 3) + ":" + e.substring(3)
                })), tp_inst._defaults.timezoneList = timezoneList
            }
            tp_inst.hour = tp_inst._defaults.hour, tp_inst.minute = tp_inst._defaults.minute, tp_inst.second = tp_inst._defaults.second, tp_inst.millisec = tp_inst._defaults.millisec, tp_inst.ampm = "", tp_inst.$input = $input, o.altField && (tp_inst.$altInput = $(o.altField).css({
                cursor: "pointer"
            }).focus(function() {
                $input.trigger("focus")
            }));
            if (tp_inst._defaults.minDate == 0 || tp_inst._defaults.minDateTime == 0) tp_inst._defaults.minDate = new Date;
            if (tp_inst._defaults.maxDate == 0 || tp_inst._defaults.maxDateTime == 0) tp_inst._defaults.maxDate = new Date;
            return tp_inst._defaults.minDate !== undefined && tp_inst._defaults.minDate instanceof Date && (tp_inst._defaults.minDateTime = new Date(tp_inst._defaults.minDate.getTime())), tp_inst._defaults.minDateTime !== undefined && tp_inst._defaults.minDateTime instanceof Date && (tp_inst._defaults.minDate = new Date(tp_inst._defaults.minDateTime.getTime())), tp_inst._defaults.maxDate !== undefined && tp_inst._defaults.maxDate instanceof Date && (tp_inst._defaults.maxDateTime = new Date(tp_inst._defaults.maxDate.getTime())), tp_inst._defaults.maxDateTime !== undefined && tp_inst._defaults.maxDateTime instanceof Date && (tp_inst._defaults.maxDate = new Date(tp_inst._defaults.maxDateTime.getTime())), tp_inst
        },
        _addTimePicker: function(e) {
            var t = this.$altInput && this._defaults.altFieldTimeOnly ? this.$input.val() + " " + this.$altInput.val() : this.$input.val();
            this.timeDefined = this._parseTime(t), this._limitMinMaxDateTime(e, !1), this._injectTimePicker()
        },
        _parseTime: function(e, t) {
            var n = this._defaults.timeFormat.toString().replace(/h{1,2}/ig, "(\\d?\\d)").replace(/m{1,2}/ig, "(\\d?\\d)").replace(/s{1,2}/ig, "(\\d?\\d)").replace(/l{1}/ig, "(\\d?\\d?\\d)").replace(/t{1,2}/ig, this._getPatternAmpm()).replace(/z{1}/ig, "(z|[-+]\\d\\d:?\\d\\d)?").replace(/\s/g, "\\s?") + this._defaults.timeSuffix + "$",
                r = this._getFormatPositions(),
                i = "",
                s;
            this.inst || (this.inst = $.datepicker._getInst(this.$input[0]));
            if (t || !this._defaults.timeOnly) {
                var o = $.datepicker._get(this.inst, "dateFormat"),
                    u = new RegExp("[.*+?|()\\[\\]{}\\\\]", "g");
                n = "^.{" + o.length + ",}?" + this._defaults.separator.replace(u, "\\$&") + n
            }
            s = e.match(new RegExp(n, "i"));
            if (s) {
                r.t !== -1 && (s[r.t] === undefined || s[r.t].length === 0 ? (i = "", this.ampm = "") : (i = $.inArray(s[r.t].toUpperCase(), this.amNames) !== -1 ? "AM" : "PM", this.ampm = this._defaults[i == "AM" ? "amNames" : "pmNames"][0])), r.h !== -1 && (i == "AM" && s[r.h] == "12" ? this.hour = 0 : i == "PM" && s[r.h] != "12" ? this.hour = (parseFloat(s[r.h]) + 12).toFixed(0) : this.hour = Number(s[r.h])), r.m !== -1 && (this.minute = Number(s[r.m])), r.s !== -1 && (this.second = Number(s[r.s])), r.l !== -1 && (this.millisec = Number(s[r.l]));
                if (r.z !== -1 && s[r.z] !== undefined) {
                    var a = s[r.z].toUpperCase();
                    switch (a.length) {
                    case 1:
                        a = this._defaults.timezoneIso8609 ? "Z" : "+0000";
                        break;
                    case 5:
                        this._defaults.timezoneIso8609 && (a = a.substring(1) == "0000" ? "Z" : a.substring(0, 3) + ":" + a.substring(3));
                        break;
                    case 6:
                        this._defaults.timezoneIso8609 ? a.substring(1) == "00:00" && (a = "Z") : a = a == "Z" || a.substring(1) == "00:00" ? "+0000" : a.replace(/:/, "")
                    }
                    this.timezone = a
                }
                return !0
            }
            return !1
        },
        _getPatternAmpm: function() {
            var e = [],
                t = this._defaults;
            return t.amNames && $.merge(e, t.amNames), t.pmNames && $.merge(e, t.pmNames), e = $.map(e, function(e) {
                return e.replace(/[.*+?|()\[\]{}\\]/g, "\\$&")
            }), "(" + e.join("|") + ")?"
        },
        _getFormatPositions: function() {
            var e = this._defaults.timeFormat.toLowerCase().match(/(h{1,2}|m{1,2}|s{1,2}|l{1}|t{1,2}|z)/g),
                t = {
                    h: -1,
                    m: -1,
                    s: -1,
                    l: -1,
                    t: -1,
                    z: -1
                };
            if (e) for (var n = 0; n < e.length; n++) t[e[n].toString().charAt(0)] == -1 && (t[e[n].toString().charAt(0)] = n + 1);
            return t
        },
        _injectTimePicker: function() {
            var e = this.inst.dpDiv,
                t = this._defaults,
                n = this,
                r = parseInt(t.hourMax - (t.hourMax - t.hourMin) % t.stepHour, 10),
                i = parseInt(t.minuteMax - (t.minuteMax - t.minuteMin) % t.stepMinute, 10),
                s = parseInt(t.secondMax - (t.secondMax - t.secondMin) % t.stepSecond, 10),
                o = parseInt(t.millisecMax - (t.millisecMax - t.millisecMin) % t.stepMillisec, 10),
                u = this.inst.id.toString().replace(/([^A-Za-z0-9_])/g, "");
            if (e.find("div#ui-timepicker-div-" + u).length === 0 && t.showTimepicker) {
                var a = ' style="display:none;"',
                    f = '<div class="ui-timepicker-div" id="ui-timepicker-div-' + u + '"><dl>' + '<dt class="ui_tpicker_time_label" id="ui_tpicker_time_label_' + u + '"' + (t.showTime ? "" : a) + ">" + t.timeText + "</dt>" + '<dd class="ui_tpicker_time" id="ui_tpicker_time_' + u + '"' + (t.showTime ? "" : a) + "></dd>" + '<dt class="ui_tpicker_hour_label" id="ui_tpicker_hour_label_' + u + '"' + (t.showHour ? "" : a) + ">" + t.hourText + "</dt>",
                    l = 0,
                    c = 0,
                    h = 0,
                    p = 0,
                    d = null;
                f += '<dd class="ui_tpicker_hour"><div id="ui_tpicker_hour_' + u + '"' + (t.showHour ? "" : a) + "></div>";
                if (t.showHour && t.hourGrid > 0) {
                    f += '<div style="padding-left: 1px"><table class="ui-tpicker-grid-label"><tr>';
                    for (var v = t.hourMin; v <= r; v += parseInt(t.hourGrid, 10)) {
                        l++;
                        var m = t.ampm && v > 12 ? v - 12 : v;
                        m < 10 && (m = "0" + m), t.ampm && (v == 0 ? m = "12a" : v < 12 ? m += "a" : m += "p"), f += "<td>" + m + "</td>"
                    }
                    f += "</tr></table></div>"
                }
                f += "</dd>", f += '<dt class="ui_tpicker_minute_label" id="ui_tpicker_minute_label_' + u + '"' + (t.showMinute ? "" : a) + ">" + t.minuteText + "</dt>" + '<dd class="ui_tpicker_minute"><div id="ui_tpicker_minute_' + u + '"' + (t.showMinute ? "" : a) + "></div>";
                if (t.showMinute && t.minuteGrid > 0) {
                    f += '<div style="padding-left: 1px"><table class="ui-tpicker-grid-label"><tr>';
                    for (var g = t.minuteMin; g <= i; g += parseInt(t.minuteGrid, 10)) c++, f += "<td>" + (g < 10 ? "0" : "") + g + "</td>";
                    f += "</tr></table></div>"
                }
                f += "</dd>", f += '<dt class="ui_tpicker_second_label" id="ui_tpicker_second_label_' + u + '"' + (t.showSecond ? "" : a) + ">" + t.secondText + "</dt>" + '<dd class="ui_tpicker_second"><div id="ui_tpicker_second_' + u + '"' + (t.showSecond ? "" : a) + "></div>";
                if (t.showSecond && t.secondGrid > 0) {
                    f += '<div style="padding-left: 1px"><table><tr>';
                    for (var y = t.secondMin; y <= s; y += parseInt(t.secondGrid, 10)) h++, f += "<td>" + (y < 10 ? "0" : "") + y + "</td>";
                    f += "</tr></table></div>"
                }
                f += "</dd>", f += '<dt class="ui_tpicker_millisec_label" id="ui_tpicker_millisec_label_' + u + '"' + (t.showMillisec ? "" : a) + ">" + t.millisecText + "</dt>" + '<dd class="ui_tpicker_millisec"><div id="ui_tpicker_millisec_' + u + '"' + (t.showMillisec ? "" : a) + "></div>";
                if (t.showMillisec && t.millisecGrid > 0) {
                    f += '<div style="padding-left: 1px"><table><tr>';
                    for (var b = t.millisecMin; b <= o; b += parseInt(t.millisecGrid, 10)) p++, f += "<td>" + (b < 10 ? "0" : "") + b + "</td>";
                    f += "</tr></table></div>"
                }
                f += "</dd>", f += '<dt class="ui_tpicker_timezone_label" id="ui_tpicker_timezone_label_' + u + '"' + (t.showTimezone ? "" : a) + ">" + t.timezoneText + "</dt>", f += '<dd class="ui_tpicker_timezone" id="ui_tpicker_timezone_' + u + '"' + (t.showTimezone ? "" : a) + "></dd>", f += "</dl></div>", $tp = $(f), t.timeOnly === !0 && ($tp.prepend('<div class="ui-widget-header ui-helper-clearfix ui-corner-all"><div class="ui-datepicker-title">' + t.timeOnlyTitle + "</div>" + "</div>"), e.find(".ui-datepicker-header, .ui-datepicker-calendar").hide()), this.hour_slider = $tp.find("#ui_tpicker_hour_" + u).slider({
                    orientation: "horizontal",
                    value: this.hour,
                    min: t.hourMin,
                    max: r,
                    step: t.stepHour,
                    slide: function(e, t) {
                        n.hour_slider.slider("option", "value", t.value), n._onTimeChange()
                    }
                }), this.minute_slider = $tp.find("#ui_tpicker_minute_" + u).slider({
                    orientation: "horizontal",
                    value: this.minute,
                    min: t.minuteMin,
                    max: i,
                    step: t.stepMinute,
                    slide: function(e, t) {
                        n.minute_slider.slider("option", "value", t.value), n._onTimeChange()
                    }
                }), this.second_slider = $tp.find("#ui_tpicker_second_" + u).slider({
                    orientation: "horizontal",
                    value: this.second,
                    min: t.secondMin,
                    max: s,
                    step: t.stepSecond,
                    slide: function(e, t) {
                        n.second_slider.slider("option", "value", t.value), n._onTimeChange()
                    }
                }), this.millisec_slider = $tp.find("#ui_tpicker_millisec_" + u).slider({
                    orientation: "horizontal",
                    value: this.millisec,
                    min: t.millisecMin,
                    max: o,
                    step: t.stepMillisec,
                    slide: function(e, t) {
                        n.millisec_slider.slider("option", "value", t.value), n._onTimeChange()
                    }
                }), this.timezone_select = $tp.find("#ui_tpicker_timezone_" + u).append("<select></select>").find("select"), $.fn.append.apply(this.timezone_select, $.map(t.timezoneList, function(e, t) {
                    return $("<option />").val(typeof e == "object" ? e.value : e).text(typeof e == "object" ? e.label : e)
                })), this.timezone_select.val(typeof this.timezone != "undefined" && this.timezone != null && this.timezone != "" ? this.timezone : t.timezone), this.timezone_select.change(function() {
                    n._onTimeChange()
                }), t.showHour && t.hourGrid > 0 && (d = 100 * l * t.hourGrid / (r - t.hourMin), $tp.find(".ui_tpicker_hour table").css({
                    width: d + "%",
                    marginLeft: d / (-2 * l) + "%",
                    borderCollapse: "collapse"
                }).find("td").each(function(e) {
                    $(this).click(function() {
                        var e = $(this).html();
                        if (t.ampm) {
                            var r = e.substring(2).toLowerCase(),
                                i = parseInt(e.substring(0, 2), 10);
                            r == "a" ? i == 12 ? e = 0 : e = i : i == 12 ? e = 12 : e = i + 12
                        }
                        n.hour_slider.slider("option", "value", e), n._onTimeChange(), n._onSelectHandler()
                    }).css({
                        cursor: "pointer",
                        width: 100 / l + "%",
                        textAlign: "center",
                        overflow: "hidden"
                    })
                })), t.showMinute && t.minuteGrid > 0 && (d = 100 * c * t.minuteGrid / (i - t.minuteMin), $tp.find(".ui_tpicker_minute table").css({
                    width: d + "%",
                    marginLeft: d / (-2 * c) + "%",
                    borderCollapse: "collapse"
                }).find("td").each(function(e) {
                    $(this).click(function() {
                        n.minute_slider.slider("option", "value", $(this).html()), n._onTimeChange(), n._onSelectHandler()
                    }).css({
                        cursor: "pointer",
                        width: 100 / c + "%",
                        textAlign: "center",
                        overflow: "hidden"
                    })
                })), t.showSecond && t.secondGrid > 0 && $tp.find(".ui_tpicker_second table").css({
                    width: d + "%",
                    marginLeft: d / (-2 * h) + "%",
                    borderCollapse: "collapse"
                }).find("td").each(function(e) {
                    $(this).click(function() {
                        n.second_slider.slider("option", "value", $(this).html()), n._onTimeChange(), n._onSelectHandler()
                    }).css({
                        cursor: "pointer",
                        width: 100 / h + "%",
                        textAlign: "center",
                        overflow: "hidden"
                    })
                }), t.showMillisec && t.millisecGrid > 0 && $tp.find(".ui_tpicker_millisec table").css({
                    width: d + "%",
                    marginLeft: d / (-2 * p) + "%",
                    borderCollapse: "collapse"
                }).find("td").each(function(e) {
                    $(this).click(function() {
                        n.millisec_slider.slider("option", "value", $(this).html()), n._onTimeChange(), n._onSelectHandler()
                    }).css({
                        cursor: "pointer",
                        width: 100 / p + "%",
                        textAlign: "center",
                        overflow: "hidden"
                    })
                });
                var w = e.find(".ui-datepicker-buttonpane");
                w.length ? w.before($tp) : e.append($tp), this.$timeObj = $tp.find("#ui_tpicker_time_" + u);
                if (this.inst !== null) {
                    var E = this.timeDefined;
                    this._onTimeChange(), this.timeDefined = E
                }
                var S = function() {
                        n._onSelectHandler()
                    };
                this.hour_slider.bind("slidestop", S), this.minute_slider.bind("slidestop", S), this.second_slider.bind("slidestop", S), this.millisec_slider.bind("slidestop", S);
                if (this._defaults.addSliderAccess) {
                    var x = this._defaults.sliderAccessArgs;
                    setTimeout(function() {
                        if ($tp.find(".ui-slider-access").length == 0) {
                            $tp.find(".ui-slider:visible").sliderAccess(x);
                            var e = $tp.find(".ui-slider-access:eq(0)").outerWidth(!0);
                            e && $tp.find("table:visible").each(function() {
                                var t = $(this),
                                    n = t.outerWidth(),
                                    r = t.css("marginLeft").toString().replace("%", ""),
                                    i = n - e,
                                    s = r * i / n + "%";
                                t.css({
                                    width: i,
                                    marginLeft: s
                                })
                            })
                        }
                    }, 0)
                }
            }
        },
        _limitMinMaxDateTime: function(e, t) {
            var n = this._defaults,
                r = new Date(e.selectedYear, e.selectedMonth, e.selectedDay);
            if (!this._defaults.showTimepicker) return;
            if ($.datepicker._get(e, "minDateTime") !== null && $.datepicker._get(e, "minDateTime") !== undefined && r) {
                var i = $.datepicker._get(e, "minDateTime"),
                    s = new Date(i.getFullYear(), i.getMonth(), i.getDate(), 0, 0, 0, 0);
                if (this.hourMinOriginal === null || this.minuteMinOriginal === null || this.secondMinOriginal === null || this.millisecMinOriginal === null) this.hourMinOriginal = n.hourMin, this.minuteMinOriginal = n.minuteMin, this.secondMinOriginal = n.secondMin, this.millisecMinOriginal = n.millisecMin;
                e.settings.timeOnly || s.getTime() == r.getTime() ? (this._defaults.hourMin = i.getHours(), this.hour <= this._defaults.hourMin ? (this.hour = this._defaults.hourMin, this._defaults.minuteMin = i.getMinutes(), this.minute <= this._defaults.minuteMin ? (this.minute = this._defaults.minuteMin, this._defaults.secondMin = i.getSeconds()) : this.second <= this._defaults.secondMin ? (this.second = this._defaults.secondMin, this._defaults.millisecMin = i.getMilliseconds()) : (this.millisec < this._defaults.millisecMin && (this.millisec = this._defaults.millisecMin), this._defaults.millisecMin = this.millisecMinOriginal)) : (this._defaults.minuteMin = this.minuteMinOriginal, this._defaults.secondMin = this.secondMinOriginal, this._defaults.millisecMin = this.millisecMinOriginal)) : (this._defaults.hourMin = this.hourMinOriginal, this._defaults.minuteMin = this.minuteMinOriginal, this._defaults.secondMin = this.secondMinOriginal, this._defaults.millisecMin = this.millisecMinOriginal)
            }
            if ($.datepicker._get(e, "maxDateTime") !== null && $.datepicker._get(e, "maxDateTime") !== undefined && r) {
                var o = $.datepicker._get(e, "maxDateTime"),
                    u = new Date(o.getFullYear(), o.getMonth(), o.getDate(), 0, 0, 0, 0);
                if (this.hourMaxOriginal === null || this.minuteMaxOriginal === null || this.secondMaxOriginal === null) this.hourMaxOriginal = n.hourMax, this.minuteMaxOriginal = n.minuteMax, this.secondMaxOriginal = n.secondMax, this.millisecMaxOriginal = n.millisecMax;
                e.settings.timeOnly || u.getTime() == r.getTime() ? (this._defaults.hourMax = o.getHours(), this.hour >= this._defaults.hourMax ? (this.hour = this._defaults.hourMax, this._defaults.minuteMax = o.getMinutes(), this.minute >= this._defaults.minuteMax ? (this.minute = this._defaults.minuteMax, this._defaults.secondMax = o.getSeconds()) : this.second >= this._defaults.secondMax ? (this.second = this._defaults.secondMax, this._defaults.millisecMax = o.getMilliseconds()) : (this.millisec > this._defaults.millisecMax && (this.millisec = this._defaults.millisecMax), this._defaults.millisecMax = this.millisecMaxOriginal)) : (this._defaults.minuteMax = this.minuteMaxOriginal, this._defaults.secondMax = this.secondMaxOriginal, this._defaults.millisecMax = this.millisecMaxOriginal)) : (this._defaults.hourMax = this.hourMaxOriginal, this._defaults.minuteMax = this.minuteMaxOriginal, this._defaults.secondMax = this.secondMaxOriginal, this._defaults.millisecMax = this.millisecMaxOriginal)
            }
            if (t !== undefined && t === !0) {
                var a = parseInt(this._defaults.hourMax - (this._defaults.hourMax - this._defaults.hourMin) % this._defaults.stepHour, 10),
                    f = parseInt(this._defaults.minuteMax - (this._defaults.minuteMax - this._defaults.minuteMin) % this._defaults.stepMinute, 10),
                    l = parseInt(this._defaults.secondMax - (this._defaults.secondMax - this._defaults.secondMin) % this._defaults.stepSecond, 10),
                    c = parseInt(this._defaults.millisecMax - (this._defaults.millisecMax - this._defaults.millisecMin) % this._defaults.stepMillisec, 10);
                this.hour_slider && this.hour_slider.slider("option", {
                    min: this._defaults.hourMin,
                    max: a
                }).slider("value", this.hour), this.minute_slider && this.minute_slider.slider("option", {
                    min: this._defaults.minuteMin,
                    max: f
                }).slider("value", this.minute), this.second_slider && this.second_slider.slider("option", {
                    min: this._defaults.secondMin,
                    max: l
                }).slider("value", this.second), this.millisec_slider && this.millisec_slider.slider("option", {
                    min: this._defaults.millisecMin,
                    max: c
                }).slider("value", this.millisec)
            }
        },
        _onTimeChange: function() {
            var e = this.hour_slider ? this.hour_slider.slider("value") : !1,
                t = this.minute_slider ? this.minute_slider.slider("value") : !1,
                n = this.second_slider ? this.second_slider.slider("value") : !1,
                r = this.millisec_slider ? this.millisec_slider.slider("value") : !1,
                i = this.timezone_select ? this.timezone_select.val() : !1,
                s = this._defaults;
            typeof e == "object" && (e = !1), typeof t == "object" && (t = !1), typeof n == "object" && (n = !1), typeof r == "object" && (r = !1), typeof i == "object" && (i = !1), e !== !1 && (e = parseInt(e, 10)), t !== !1 && (t = parseInt(t, 10)), n !== !1 && (n = parseInt(n, 10)), r !== !1 && (r = parseInt(r, 10));
            var o = s[e < 12 ? "amNames" : "pmNames"][0],
                u = e != this.hour || t != this.minute || n != this.second || r != this.millisec || this.ampm.length > 0 && e < 12 != ($.inArray(this.ampm.toUpperCase(), this.amNames) !== -1) || i != this.timezone;
            u && (e !== !1 && (this.hour = e), t !== !1 && (this.minute = t), n !== !1 && (this.second = n), r !== !1 && (this.millisec = r), i !== !1 && (this.timezone = i), this.inst || (this.inst = $.datepicker._getInst(this.$input[0])), this._limitMinMaxDateTime(this.inst, !0)), s.ampm && (this.ampm = o), this.formattedTime = $.datepicker.formatTime(this._defaults.timeFormat, this, this._defaults), this.$timeObj && this.$timeObj.text(this.formattedTime + s.timeSuffix), this.timeDefined = !0, u && this._updateDateTime()
        },
        _onSelectHandler: function() {
            var e = this._defaults.onSelect,
                t = this.$input ? this.$input[0] : null;
            e && t && e.apply(t, [this.formattedDateTime, this])
        },
        _formatTime: function(e, t) {
            e = e || {
                hour: this.hour,
                minute: this.minute,
                second: this.second,
                millisec: this.millisec,
                ampm: this.ampm,
                timezone: this.timezone
            };
            var n = (t || this._defaults.timeFormat).toString();
            n = $.datepicker.formatTime(n, e, this._defaults);
            if (arguments.length) return n;
            this.formattedTime = n
        },
        _updateDateTime: function(e) {
            e = this.inst || e;
            var t = $.datepicker._daylightSavingAdjust(new Date(e.selectedYear, e.selectedMonth, e.selectedDay)),
                n = $.datepicker._get(e, "dateFormat"),
                r = $.datepicker._getFormatConfig(e),
                i = t !== null && this.timeDefined;
            this.formattedDate = $.datepicker.formatDate(n, t === null ? new Date : t, r);
            var s = this.formattedDate;
            if (e.lastVal !== undefined && e.lastVal.length > 0 && this.$input.val().length === 0) return;
            this._defaults.timeOnly === !0 ? s = this.formattedTime : this._defaults.timeOnly !== !0 && (this._defaults.alwaysSetTime || i) && (s += this._defaults.separator + this.formattedTime + this._defaults.timeSuffix), this.formattedDateTime = s, this._defaults.showTimepicker ? this.$altInput && this._defaults.altFieldTimeOnly === !0 ? (this.$altInput.val(this.formattedTime), this.$input.val(this.formattedDate)) : this.$altInput ? (this.$altInput.val(s), this.$input.val(s)) : this.$input.val(s) : this.$input.val(this.formattedDate), this.$input.trigger("change")
        }
    }), $.fn.extend({
        timepicker: function(e) {
            e = e || {};
            var t = arguments;
            return typeof e == "object" && (t[0] = $.extend(e, {
                timeOnly: !0
            })), $(this).each(function() {
                $.fn.datetimepicker.apply($(this), t)
            })
        },
        datetimepicker: function(e) {
            return e = e || {}, tmp_args = arguments, typeof e == "string" ? e == "getDate" ? $.fn.datepicker.apply($(this[0]), tmp_args) : this.each(function() {
                var e = $(this);
                e.datepicker.apply(e, tmp_args)
            }) : this.each(function() {
                var t = $(this);
                t.datepicker($.timepicker._newInst(t, e)._defaults)
            })
        }
    }), $.datepicker.formatTime = function(e, t, n) {
        n = n || {}, n = $.extend($.timepicker._defaults, n), t = $.extend({
            hour: 0,
            minute: 0,
            second: 0,
            millisec: 0,
            timezone: "+0000"
        }, t);
        var r = e,
            i = n.amNames[0],
            s = parseInt(t.hour, 10);
        return n.ampm && (s > 11 && (i = n.pmNames[0], s > 12 && (s %= 12)), s === 0 && (s = 12)), r = r.replace(/(?:hh?|mm?|ss?|[tT]{1,2}|[lz])/g, function(e) {
            switch (e.toLowerCase()) {
            case "hh":
                return ("0" + s).slice(-2);
            case "h":
                return s;
            case "mm":
                return ("0" + t.minute).slice(-2);
            case "m":
                return t.minute;
            case "ss":
                return ("0" + t.second).slice(-2);
            case "s":
                return t.second;
            case "l":
                return ("00" + t.millisec).slice(-3);
            case "z":
                return t.timezone;
            case "t":
            case "tt":
                if (n.ampm) return e.length == 1 && (i = i.charAt(0)), e.charAt(0) == "T" ? i.toUpperCase() : i.toLowerCase();
                return ""
            }
        }), r = $.trim(r), r
    }, $.datepicker._base_selectDate = $.datepicker._selectDate, $.datepicker._selectDate = function(e, t) {
        var n = this._getInst($(e)[0]),
            r = this._get(n, "timepicker");
        r ? (r._limitMinMaxDateTime(n, !0), n.inline = n.stay_open = !0, this._base_selectDate(e, t), n.inline = n.stay_open = !1, this._notifyChange(n), this._updateDatepicker(n)) : this._base_selectDate(e, t)
    }, $.datepicker._base_updateDatepicker = $.datepicker._updateDatepicker, $.datepicker._updateDatepicker = function(e) {
        var t = e.input[0];
        if ($.datepicker._curInst && $.datepicker._curInst != e && $.datepicker._datepickerShowing && $.datepicker._lastInput != t) return;
        if (typeof e.stay_open != "boolean" || e.stay_open === !1) {
            this._base_updateDatepicker(e);
            var n = this._get(e, "timepicker");
            n && n._addTimePicker(e)
        }
    }, $.datepicker._base_doKeyPress = $.datepicker._doKeyPress, $.datepicker._doKeyPress = function(e) {
        var t = $.datepicker._getInst(e.target),
            n = $.datepicker._get(t, "timepicker");
        if (n && $.datepicker._get(t, "constrainInput")) {
            var r = n._defaults.ampm,
                i = $.datepicker._possibleChars($.datepicker._get(t, "dateFormat")),
                s = n._defaults.timeFormat.toString().replace(/[hms]/g, "").replace(/TT/g, r ? "APM" : "").replace(/Tt/g, r ? "AaPpMm" : "").replace(/tT/g, r ? "AaPpMm" : "").replace(/T/g, r ? "AP" : "").replace(/tt/g, r ? "apm" : "").replace(/t/g, r ? "ap" : "") + " " + n._defaults.separator + n._defaults.timeSuffix + (n._defaults.showTimezone ? n._defaults.timezoneList.join("") : "") + n._defaults.amNames.join("") + n._defaults.pmNames.join("") + i,
                o = String.fromCharCode(e.charCode === undefined ? e.keyCode : e.charCode);
            return e.ctrlKey || o < " " || !i || s.indexOf(o) > -1
        }
        return $.datepicker._base_doKeyPress(e)
    }, $.datepicker._base_doKeyUp = $.datepicker._doKeyUp, $.datepicker._doKeyUp = function(e) {
        var t = $.datepicker._getInst(e.target),
            n = $.datepicker._get(t, "timepicker");
        if (n && n._defaults.timeOnly && t.input.val() != t.lastVal) try {
            $.datepicker._updateDatepicker(t)
        } catch (r) {
            $.datepicker.log(r)
        }
        return $.datepicker._base_doKeyUp(e)
    }, $.datepicker._base_gotoToday = $.datepicker._gotoToday, $.datepicker._gotoToday = function(e) {
        var t = this._getInst($(e)[0]),
            n = t.dpDiv;
        this._base_gotoToday(e);
        var r = new Date,
            i = this._get(t, "timepicker");
        if (i && i._defaults.showTimezone && i.timezone_select) {
            var s = r.getTimezoneOffset(),
                o = s > 0 ? "-" : "+";
            s = Math.abs(s);
            var u = s % 60;
            s = o + ("0" + (s - u) / 60).slice(-2) + ("0" + u).slice(-2), i._defaults.timezoneIso8609 && (s = s.substring(0, 3) + ":" + s.substring(3)), i.timezone_select.val(s)
        }
        this._setTime(t, r), $(".ui-datepicker-today", n).click()
    }, $.datepicker._disableTimepickerDatepicker = function(e, t, n) {
        var r = this._getInst(e),
            i = this._get(r, "timepicker");
        $(e).datepicker("getDate"), i && (i._defaults.showTimepicker = !1, i._updateDateTime(r))
    }, $.datepicker._enableTimepickerDatepicker = function(e, t, n) {
        var r = this._getInst(e),
            i = this._get(r, "timepicker");
        $(e).datepicker("getDate"), i && (i._defaults.showTimepicker = !0, i._addTimePicker(r), i._updateDateTime(r))
    }, $.datepicker._setTime = function(e, t) {
        var n = this._get(e, "timepicker");
        if (n) {
            var r = n._defaults,
                i = t ? t.getHours() : r.hour,
                s = t ? t.getMinutes() : r.minute,
                o = t ? t.getSeconds() : r.second,
                u = t ? t.getMilliseconds() : r.millisec;
            if (i < r.hourMin || i > r.hourMax || s < r.minuteMin || s > r.minuteMax || o < r.secondMin || o > r.secondMax || u < r.millisecMin || u > r.millisecMax) i = r.hourMin, s = r.minuteMin, o = r.secondMin, u = r.millisecMin;
            n.hour = i, n.minute = s, n.second = o, n.millisec = u, n.hour_slider && n.hour_slider.slider("value", i), n.minute_slider && n.minute_slider.slider("value", s), n.second_slider && n.second_slider.slider("value", o), n.millisec_slider && n.millisec_slider.slider("value", u), n._onTimeChange(), n._updateDateTime(e)
        }
    }, $.datepicker._setTimeDatepicker = function(e, t, n) {
        var r = this._getInst(e),
            i = this._get(r, "timepicker");
        if (i) {
            this._setDateFromField(r);
            var s;
            t && (typeof t == "string" ? (i._parseTime(t, n), s = new Date, s.setHours(i.hour, i.minute, i.second, i.millisec)) : s = new Date(t.getTime()), s.toString() == "Invalid Date" && (s = undefined), this._setTime(r, s))
        }
    }, $.datepicker._base_setDateDatepicker = $.datepicker._setDateDatepicker, $.datepicker._setDateDatepicker = function(e, t) {
        var n = this._getInst(e),
            r = t instanceof Date ? new Date(t.getTime()) : t;
        this._updateDatepicker(n), this._base_setDateDatepicker.apply(this, arguments), this._setTimeDatepicker(e, r, !0)
    }, $.datepicker._base_getDateDatepicker = $.datepicker._getDateDatepicker, $.datepicker._getDateDatepicker = function(e, t) {
        var n = this._getInst(e),
            r = this._get(n, "timepicker");
        if (r) {
            this._setDateFromField(n, t);
            var i = this._getDate(n);
            return i && r._parseTime($(e).val(), r.timeOnly) && i.setHours(r.hour, r.minute, r.second, r.millisec), i
        }
        return this._base_getDateDatepicker(e, t)
    }, $.datepicker._base_parseDate = $.datepicker.parseDate, $.datepicker.parseDate = function(e, t, n) {
        var r;
        try {
            r = this._base_parseDate(e, t, n)
        } catch (i) {
            if (!(i.indexOf(":") >= 0)) throw i;
            r = this._base_parseDate(e, t.substring(0, t.length - (i.length - i.indexOf(":") - 2)), n)
        }
        return r
    }, $.datepicker._base_formatDate = $.datepicker._formatDate, $.datepicker._formatDate = function(e, t, n, r) {
        var i = this._get(e, "timepicker");
        return i ? (i._updateDateTime(e), i.$input.val()) : this._base_formatDate(e)
    }, $.datepicker._base_optionDatepicker = $.datepicker._optionDatepicker, $.datepicker._optionDatepicker = function(e, t, n) {
        var r = this._getInst(e),
            i = this._get(r, "timepicker");
        if (i) {
            var s = null,
                o = null,
                u = null;
            typeof t == "string" ? t === "minDate" || t === "minDateTime" ? s = n : t === "maxDate" || t === "maxDateTime" ? o = n : t === "onSelect" && (u = n) : typeof t == "object" && (t.minDate ? s = t.minDate : t.minDateTime ? s = t.minDateTime : t.maxDate ? o = t.maxDate : t.maxDateTime && (o = t.maxDateTime)), s ? (s == 0 ? s = new Date : s = new Date(s), i._defaults.minDate = s, i._defaults.minDateTime = s) : o ? (o == 0 ? o = new Date : o = new Date(o), i._defaults.maxDate = o, i._defaults.maxDateTime = o) : u && (i._defaults.onSelect = u)
        }
        return n === undefined ? this._base_optionDatepicker(e, t) : this._base_optionDatepicker(e, t, n)
    }, $.timepicker = new Timepicker, $.timepicker.version = "1.0.0"
}(jQuery), function(e) {
    e.purr = function(t, n) {
        function i() {
            var i = document.createElement("a");
            e(i).attr({
                className: "close",
                href: "#close",
                innerHTML: "Close"
            }).appendTo(t).click(function() {
                return s(), !1
            }), t.appendTo(r).hide(), jQuery.browser.msie && n.usingTransparentPNG ? t.show() : t.fadeIn(n.fadeInSpeed);
            if (!n.isSticky) var o = setInterval(function() {
                t.prevAll(".not-sticky").length == 0 && (clearInterval(o), setTimeout(function() {
                    s()
                }, n.removeTimer))
            }, 200)
        }
        function s() {
            jQuery.browser.msie && n.usingTransparentPNG ? t.css({
                opacity: 0
            }).animate({
                height: "0px"
            }, {
                duration: n.fadeOutSpeed,
                complete: function() {
                    t.remove()
                }
            }) : t.animate({
                opacity: "0"
            }, {
                duration: n.fadeOutSpeed,
                complete: function() {
                    t.animate({
                        height: "0px"
                    }, {
                        duration: n.fadeOutSpeed,
                        complete: function() {
                            t.remove()
                        }
                    })
                }
            })
        }
        t = e(t), n.isSticky || t.addClass("not-sticky");
        var r = document.getElementById("purr-container");
        r || (r = '<div id="purr-container"></div>'), r = e(r), e("body").append(r), i()
    }, e.fn.purr = function(t) {
        return t = t || {}, t.fadeInSpeed = t.fadeInSpeed || 500, t.fadeOutSpeed = t.fadeOutSpeed || 500, t.removeTimer = t.removeTimer || 4e3, t.isSticky = t.isSticky || !1, t.usingTransparentPNG = t.usingTransparentPNG || !1, this.each(function() {
            new e.purr(this, t)
        }), this
    }
}(jQuery);