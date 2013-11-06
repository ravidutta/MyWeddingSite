// VERSION: 2.2 LAST UPDATE: 13.03.2012
/* 
 * Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
 * 
 * Made by Wilq32, wilq32@gmail.com, Wroclaw, Poland, 01.2009
 * Website: http://code.google.com/p/jqueryrotate/ 
 */
// Documentation removed from script file (was kinda useless and outdated)
(function($) {
    var supportedCSS, styles = document.getElementsByTagName("head")[0].style,
        toCheck = "transformProperty WebkitTransform OTransform msTransform MozTransform".split(" ");
    for (var a = 0; a < toCheck.length; a++) styles[toCheck[a]] !== undefined && (supportedCSS = toCheck[a]);
    var IE = eval('"v"==""');
    jQuery.fn.extend({
        rotate: function(e) {
            if (this.length === 0 || typeof e == "undefined") return;
            typeof e == "number" && (e = {
                angle: e
            });
            var t = [];
            for (var n = 0, r = this.length; n < r; n++) {
                var i = this.get(n);
                if (!i.Wilq32 || !i.Wilq32.PhotoEffect) {
                    var s = $.extend(!0, {}, e),
                        o = (new Wilq32.PhotoEffect(i, s))._rootObj;
                    t.push($(o))
                } else i.Wilq32.PhotoEffect._handleRotation(e)
            }
            return t
        },
        getRotateAngle: function() {
            var e = [];
            for (var t = 0, n = this.length; t < n; t++) {
                var r = this.get(t);
                r.Wilq32 && r.Wilq32.PhotoEffect && (e[t] = r.Wilq32.PhotoEffect._angle)
            }
            return e
        },
        stopRotate: function() {
            for (var e = 0, t = this.length; e < t; e++) {
                var n = this.get(e);
                n.Wilq32 && n.Wilq32.PhotoEffect && clearTimeout(n.Wilq32.PhotoEffect._timer)
            }
        }
    }), Wilq32 = window.Wilq32 || {}, Wilq32.PhotoEffect = function() {
        return supportedCSS ?
        function(e, t) {
            e.Wilq32 = {
                PhotoEffect: this
            }, this._img = this._rootObj = this._eventObj = e, this._handleRotation(t)
        } : function(e, t) {
            this._img = e, this._rootObj = document.createElement("span"), this._rootObj.style.display = "inline-block", this._rootObj.Wilq32 = {
                PhotoEffect: this
            }, e.parentNode.insertBefore(this._rootObj, e);
            if (e.complete) this._Loader(t);
            else {
                var n = this;
                jQuery(this._img).bind("load", function() {
                    n._Loader(t)
                })
            }
        }
    }(), Wilq32.PhotoEffect.prototype = {
        _setupParameters: function(e) {
            this._parameters = this._parameters || {}, typeof this._angle != "number" && (this._angle = 0), typeof e.angle == "number" && (this._angle = e.angle), this._parameters.animateTo = typeof e.animateTo == "number" ? e.animateTo : this._angle, this._parameters.step = e.step || this._parameters.step || null, this._parameters.easing = e.easing || this._parameters.easing ||
            function(e, t, n, r, i) {
                return -r * ((t = t / i - 1) * t * t * t - 1) + n
            }, this._parameters.duration = e.duration || this._parameters.duration || 1e3, this._parameters.callback = e.callback || this._parameters.callback ||
            function() {}, e.bind && e.bind != this._parameters.bind && this._BindEvents(e.bind)
        },
        _handleRotation: function(e) {
            this._setupParameters(e), this._angle == this._parameters.animateTo ? this._rotate(this._angle) : this._animateStart()
        },
        _BindEvents: function(e) {
            if (e && this._eventObj) {
                if (this._parameters.bind) {
                    var t = this._parameters.bind;
                    for (var n in t) t.hasOwnProperty(n) && jQuery(this._eventObj).unbind(n, t[n])
                }
                this._parameters.bind = e;
                for (var n in e) e.hasOwnProperty(n) && jQuery(this._eventObj).bind(n, e[n])
            }
        },
        _Loader: function() {
            return IE ?
            function(e) {
                var t = this._img.width,
                    n = this._img.height;
                this._img.parentNode.removeChild(this._img), this._vimage = this.createVMLNode("image"), this._vimage.src = this._img.src, this._vimage.style.height = n + "px", this._vimage.style.width = t + "px", this._vimage.style.position = "absolute", this._vimage.style.top = "0px", this._vimage.style.left = "0px", this._container = this.createVMLNode("group"), this._container.style.width = t, this._container.style.height = n, this._container.style.position = "absolute", this._container.setAttribute("coordsize", t - 1 + "," + (n - 1)), this._container.appendChild(this._vimage), this._rootObj.appendChild(this._container), this._rootObj.style.position = "relative", this._rootObj.style.width = t + "px", this._rootObj.style.height = n + "px", this._rootObj.setAttribute("id", this._img.getAttribute("id")), this._rootObj.className = this._img.className, this._eventObj = this._rootObj, this._handleRotation(e)
            } : function(e) {
                this._rootObj.setAttribute("id", this._img.getAttribute("id")), this._rootObj.className = this._img.className, this._width = this._img.width, this._height = this._img.height, this._widthHalf = this._width / 2, this._heightHalf = this._height / 2;
                var t = Math.sqrt(this._height * this._height + this._width * this._width);
                this._widthAdd = t - this._width, this._heightAdd = t - this._height, this._widthAddHalf = this._widthAdd / 2, this._heightAddHalf = this._heightAdd / 2, this._img.parentNode.removeChild(this._img), this._aspectW = (parseInt(this._img.style.width, 10) || this._width) / this._img.width, this._aspectH = (parseInt(this._img.style.height, 10) || this._height) / this._img.height, this._canvas = document.createElement("canvas"), this._canvas.setAttribute("width", this._width), this._canvas.style.position = "relative", this._canvas.style.left = -this._widthAddHalf + "px", this._canvas.style.top = -this._heightAddHalf + "px", this._canvas.Wilq32 = this._rootObj.Wilq32, this._rootObj.appendChild(this._canvas), this._rootObj.style.width = this._width + "px", this._rootObj.style.height = this._height + "px", this._eventObj = this._canvas, this._cnv = this._canvas.getContext("2d"), this._handleRotation(e)
            }
        }(),
        _animateStart: function() {
            this._timer && clearTimeout(this._timer), this._animateStartTime = +(new Date), this._animateStartAngle = this._angle, this._animate()
        },
        _animate: function() {
            var e = +(new Date),
                t = e - this._animateStartTime > this._parameters.duration;
            if (t && !this._parameters.animatedGif) clearTimeout(this._timer);
            else {
                if (this._canvas || this._vimage || this._img) {
                    var n = this._parameters.easing(0, e - this._animateStartTime, this._animateStartAngle, this._parameters.animateTo - this._animateStartAngle, this._parameters.duration);
                    this._rotate(~~ (n * 10) / 10)
                }
                this._parameters.step && this._parameters.step(this._angle);
                var r = this;
                this._timer = setTimeout(function() {
                    r._animate.call(r)
                }, 10)
            }
            this._parameters.callback && t && (this._angle = this._parameters.animateTo, this._rotate(this._angle), this._parameters.callback.call(this._rootObj))
        },
        _rotate: function() {
            var e = Math.PI / 180;
            return IE ?
            function(e) {
                this._angle = e, this._container.style.rotation = e % 360 + "deg"
            } : supportedCSS ?
            function(e) {
                this._angle = e, this._img.style[supportedCSS] = "rotate(" + e % 360 + "deg)"
            } : function(t) {
                this._angle = t, t = t % 360 * e, this._canvas.width = this._width + this._widthAdd, this._canvas.height = this._height + this._heightAdd, this._cnv.translate(this._widthAddHalf, this._heightAddHalf), this._cnv.translate(this._widthHalf, this._heightHalf), this._cnv.rotate(t), this._cnv.translate(-this._widthHalf, -this._heightHalf), this._cnv.scale(this._aspectW, this._aspectH), this._cnv.drawImage(this._img, 0, 0)
            }
        }()
    }, IE && (Wilq32.PhotoEffect.prototype.createVMLNode = function() {
        document.createStyleSheet().addRule(".rvml", "behavior:url(#default#VML)");
        try {
            return !document.namespaces.rvml && document.namespaces.add("rvml", "urn:schemas-microsoft-com:vml"), function(e) {
                return document.createElement("<rvml:" + e + ' class="rvml">')
            }
        } catch (e) {
            return function(e) {
                return document.createElement("<" + e + ' xmlns="urn:schemas-microsoft.com:vml" class="rvml">')
            }
        }
    }())
})(jQuery);