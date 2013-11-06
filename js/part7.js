/*
 * jQuery spritely 0.6.1
 * http://spritely.net/
 *
 * Documentation:
 * http://spritely.net/documentation/
 *
 * Copyright 2010-2011, Peter Chater, Artlogic Media Ltd, http://www.artlogic.net/
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * Change history:
 * Version 0.6.1
 *   - added some refinements from Gary hussey (http://bossninja.com/). Thanks Gary.
 *     spritely now correctly clears timeouts/intervals when destroying sprites.
 *   - added a goToFrame() method so you can set the current frame at any point.
 *   - fixed the .spStop method where the 'last FPS' value was not being set, and the user specified FPS being ignore when .spStart was called.
 * Version 0.6
 *   - added events to the .sprite() method: on_first_frame, on_last_frame, on_frame:
 *     $('#sprite').sprite({
 *         fps: 9, 
 *         no_of_frames: 24, 
 *         on_first_frame: function(obj) {
 *             obj.spState(1); // change to state 1 (first row) on frame 1
 *         }, 
 *         on_last_frame: function(obj) {
 *             obj.spStop(); // stop the animation on the last frame
 *         },
 *         on_frame: {
 *             8: function(obj) {
 *                 obj.spState(2); // change to state 2 (row 2) on frame 8
 *             },
 *             16: function(obj) {
 *                 obj.spState(3); // change to state 3 (row 3) on frame 16
 *             }
 *         }
 *     });
 *   - added start_at_frame: $('#sprite').sprite({fps: 9, no_of_frames: 24, start_at_frame: 8});
 * Version 0.5
 *   - added a 'destroy()' method which will stop the element's sprite behaviour, without actually removing the element. Example: $('#my_sprite').destroy()
 * Version 0.4
 *   - add up/down for 'pan' method. <ricky.hewitt@artlogic.net>
 *   - added 'dir' option for Sprites. This means a Sprite can be played in reverse.
 *   - removed alert message regarding jQuery.draggable (now uses console.log, if available) <ricky.hewitt@artlogic.net>
 * Version 0.3b
 *   - added lockTo method for locking sprites to background images. $('#sprite').lockTo('#background, {'left': 380, 'top': -60, 'bg_img_width': 1110});
 * Version 0.2.1
 *   - animate function will stop cycling after play_frames has completed
 * Version 0.2 beta
 *   - added isDraggable method (requires jquery-ui) $('#sprite').sprite().isDraggable({start: null, stop: function() {alert('Ouch! You dropped me!')});
 *   - sprites may be set to play a limited number of frames when instantiated, e.g. $('#sprite').sprite({fps: 9, no_of_frames: 3, play_frames: 30})
 *   - sprite speed may be controlled at any point by setting the frames-per-second $('#sprite').fps(20);
 *   - sprites with multiple rows of frames may have there 'state' changed, e.g. to make the second row of frames
 *     active, use: $('#sprite').spState(2); - to return to the first row, use $('#sprite').spState(1);
 *   - background element speed may be controlled at any point with .spSpeed(), e.g. $('#bg1').spSpeed(10)
 *   - background elements may be set to a depth where 100 is the viewer (up close) and 0 is the horizon, e.g.:
 *     $('#bg1').pan({fps: 30, speed: 2, dir: 'left', depth: 30});
 *     $('#bg2').pan({fps: 30, speed: 3, dir: 'left', depth: 70});
 *     relative speed of backgrounds may now be set in a single action with $('#bg1, #bg2').spRelSpeed(20);
 *     which will make elements closer to the horizon (lower depths) move slower than closer elements (higher depths)
 */
(function(e) {
    e._spritely = {
        animate: function(t) {
            var n = e(t.el),
                r = n.attr("id");
            if (!e._spritely.instances[r]) return this;
            t = e.extend(t, e._spritely.instances[r] || {}), t.play_frames && !e._spritely.instances[r].remaining_frames && (e._spritely.instances[r].remaining_frames = t.play_frames + 1);
            if (t.type == "sprite" && t.fps) {
                var i, s = function(n) {
                        var s = t.width,
                            o = t.height;
                        if (!i) {
                            i = [], total = 0;
                            for (var u = 0; u < t.no_of_frames; u++) i[i.length] = 0 - total, total += s
                        }
                        e._spritely.instances[r]["current_frame"] == 0 ? t.on_first_frame && t.on_first_frame(n) : e._spritely.instances[r]["current_frame"] == i.length - 1 && t.on_last_frame && t.on_last_frame(n), t.on_frame && t.on_frame[e._spritely.instances[r].current_frame] && t.on_frame[e._spritely.instances[r].current_frame](n), t.rewind == 1 ? e._spritely.instances[r].current_frame <= 0 ? e._spritely.instances[r].current_frame = i.length - 1 : e._spritely.instances[r].current_frame = e._spritely.instances[r].current_frame - 1 : e._spritely.instances[r].current_frame >= i.length - 1 ? e._spritely.instances[r].current_frame = 0 : e._spritely.instances[r].current_frame = e._spritely.instances[r].current_frame + 1;
                        var a = e._spritely.getBgY(n);
                        n.css("background-position", i[e._spritely.instances[r].current_frame] + "px " + a);
                        if (t.bounce && t.bounce[0] > 0 && t.bounce[1] > 0) {
                            var f = t.bounce[0],
                                l = t.bounce[1],
                                c = t.bounce[2];
                            n.animate({
                                top: "+=" + f + "px",
                                left: "-=" + l + "px"
                            }, c).animate({
                                top: "-=" + f + "px",
                                left: "+=" + l + "px"
                            }, c)
                        }
                    };
                if (e._spritely.instances[r].remaining_frames && e._spritely.instances[r].remaining_frames > 0) {
                    e._spritely.instances[r].remaining_frames--;
                    if (e._spritely.instances[r]["remaining_frames"] == 0) {
                        e._spritely.instances[r].remaining_frames = -1, delete e._spritely.instances[r].remaining_frames;
                        return
                    }
                    s(n)
                } else e._spritely.instances[r]["remaining_frames"] != -1 && s(n)
            } else if (t.type == "pan" && !e._spritely.instances[r]._stopped) {
                t.dir == "up" ? (e._spritely.instances[r].l = e._spritely.getBgX(n).replace("px", ""), e._spritely.instances[r].t = e._spritely.instances[r].t - (t.speed || 1) || 0) : t.dir == "down" ? (e._spritely.instances[r].l = e._spritely.getBgX(n).replace("px", ""), e._spritely.instances[r].t = e._spritely.instances[r].t + (t.speed || 1) || 0) : t.dir == "left" ? (e._spritely.instances[r].l = e._spritely.instances[r].l - (t.speed || 1) || 0, e._spritely.instances[r].t = e._spritely.getBgY(n).replace("px", "")) : (e._spritely.instances[r].l = e._spritely.instances[r].l + (t.speed || 1) || 0, e._spritely.instances[r].t = e._spritely.getBgY(n).replace("px", ""));
                var o = e._spritely.instances[r].l.toString();
                o.indexOf("%") == -1 ? o += "px " : o += " ";
                var u = e._spritely.instances[r].t.toString();
                u.indexOf("%") == -1 ? u += "px " : u += " ", e(n).css("background-position", o + u)
            }
            e._spritely.instances[r].options = t, e._spritely.instances[r].timeout = window.setTimeout(function() {
                e._spritely.animate(t)
            }, parseInt(1e3 / t.fps))
        },
        randomIntBetween: function(e, t) {
            return parseInt(rand_no = Math.floor((t - (e - 1)) * Math.random()) + e)
        },
        getBgY: function(t) {
            if (e.browser.msie) var n = e(t).css("background-position-y") || "0";
            else var n = (e(t).css("background-position") || " ").split(" ")[1];
            return n
        },
        getBgX: function(t) {
            if (e.browser.msie) var n = e(t).css("background-position-x") || "0";
            else var n = (e(t).css("background-position") || " ").split(" ")[0];
            return n
        },
        get_rel_pos: function(e, t) {
            var n = e;
            if (e < 0) while (n < 0) n += t;
            else while (n > t) n -= t;
            return n
        }
    }, e.fn.extend({
        spritely: function(t) {
            var t = e.extend({
                type: "sprite",
                do_once: !1,
                width: null,
                height: null,
                fps: 12,
                no_of_frames: 2,
                stop_after: null
            }, t || {}),
                n = e(this).attr("id");
            e._spritely.instances || (e._spritely.instances = {}), e._spritely.instances[n] || (t.start_at_frame ? e._spritely.instances[n] = {
                current_frame: t.start_at_frame - 1
            } : e._spritely.instances[n] = {
                current_frame: -1
            }), e._spritely.instances[n].type = t.type, e._spritely.instances[n].depth = t.depth, t.el = this, t.width = t.width || e(this).width() || 100, t.height = t.height || e(this).height() || 100;
            var r = function() {
                    return parseInt(1e3 / t.fps)
                };
            return t.do_once ? e._spritely.animate(t) : window.setTimeout(function() {
                e._spritely.animate(t)
            }, r(t.fps)), this
        },
        sprite: function(t) {
            var t = e.extend({
                type: "sprite",
                bounce: [0, 0, 1e3]
            }, t || {});
            return e(this).spritely(t)
        },
        pan: function(t) {
            var t = e.extend({
                type: "pan",
                dir: "left",
                continuous: !0,
                speed: 1
            }, t || {});
            return e(this).spritely(t)
        },
        flyToTap: function(t) {
            var t = e.extend({
                el_to_move: null,
                type: "moveToTap",
                ms: 1e3,
                do_once: !0
            }, t || {});
            return t.el_to_move && e(t.el_to_move).active(), e._spritely.activeSprite && (window.Touch ? e(this)[0].ontouchstart = function(t) {
                var n = e._spritely.activeSprite,
                    r = t.touches[0],
                    i = r.pageY - n.height() / 2,
                    s = r.pageX - n.width() / 2;
                n.animate({
                    top: i + "px",
                    left: s + "px"
                }, 1e3)
            } : e(this).click(function(t) {
                var n = e._spritely.activeSprite;
                e(n).stop(!0);
                var r = n.width(),
                    i = n.height(),
                    s = t.pageX - r / 2,
                    o = t.pageY - i / 2;
                n.animate({
                    top: o + "px",
                    left: s + "px"
                }, 1e3)
            })), this
        },
        isDraggable: function(t) {
            if (!e(this).draggable) return this;
            var t = e.extend({
                type: "isDraggable",
                start: null,
                stop: null,
                drag: null
            }, t || {}),
                n = e(this).attr("id");
            return e._spritely.instances[n] ? (e._spritely.instances[n].isDraggableOptions = t, e(this).draggable({
                start: function() {
                    var t = e(this).attr("id");
                    e._spritely.instances[t].stop_random = !0, e(this).stop(!0), e._spritely.instances[t].isDraggableOptions.start && e._spritely.instances[t].isDraggableOptions.start(this)
                },
                drag: t.drag,
                stop: function() {
                    var t = e(this).attr("id");
                    e._spritely.instances[t].stop_random = !1, e._spritely.instances[t].isDraggableOptions.stop && e._spritely.instances[t].isDraggableOptions.stop(this)
                }
            }), this) : this
        },
        active: function() {
            return e._spritely.activeSprite = this, this
        },
        activeOnClick: function() {
            var t = e(this);
            return window.Touch ? t[0].ontouchstart = function(n) {
                e._spritely.activeSprite = t
            } : t.click(function(n) {
                e._spritely.activeSprite = t
            }), this
        },
        spRandom: function(t) {
            var t = e.extend({
                top: 50,
                left: 50,
                right: 290,
                bottom: 320,
                speed: 4e3,
                pause: 0
            }, t || {}),
                n = e(this).attr("id");
            if (!e._spritely.instances[n]) return this;
            if (!e._spritely.instances[n].stop_random) {
                var r = e._spritely.randomIntBetween,
                    i = r(t.top, t.bottom),
                    s = r(t.left, t.right);
                e("#" + n).animate({
                    top: i + "px",
                    left: s + "px"
                }, t.speed)
            }
            return window.setTimeout(function() {
                e("#" + n).spRandom(t)
            }, t.speed + t.pause), this
        },
        makeAbsolute: function() {
            return this.each(function() {
                var t = e(this),
                    n = t.position();
                t.css({
                    position: "absolute",
                    marginLeft: 0,
                    marginTop: 0,
                    top: n.top,
                    left: n.left
                }).remove().appendTo("body")
            })
        },
        spSet: function(t, n) {
            var r = e(this).attr("id");
            return e._spritely.instances[r][t] = n, this
        },
        spGet: function(t, n) {
            var r = e(this).attr("id");
            return e._spritely.instances[r][t]
        },
        spStop: function(t) {
            return e(this).each(function() {
                var n = e(this).attr("id");
                e._spritely.instances[n].options.fps && (e._spritely.instances[n]._last_fps = e._spritely.instances[n].options.fps), e._spritely.instances[n]._stopped = !0, e._spritely.instances[n]._stopped_f1 = t, e._spritely.instances[n]["type"] == "sprite" && e(this).spSet("fps", 0);
                if (t) {
                    var r = e._spritely.getBgY(e(this));
                    e(this).css("background-position", "0 " + r)
                }
            }), this
        },
        spStart: function() {
            return e(this).each(function() {
                var t = e(this).attr("id"),
                    n = e._spritely.instances[t]._last_fps || 12;
                e._spritely.instances[t]["type"] == "sprite" && e(this).spSet("fps", n), e._spritely.instances[t]._stopped = !1
            }), this
        },
        spToggle: function() {
            var t = e(this).attr("id"),
                n = e._spritely.instances[t]._stopped || !1,
                r = e._spritely.instances[t]._stopped_f1 || !1;
            return n ? e(this).spStart() : e(this).spStop(r), this
        },
        fps: function(t) {
            return e(this).each(function() {
                e(this).spSet("fps", t)
            }), this
        },
        goToFrame: function(t) {
            var n = e(this).attr("id");
            return e._spritely.instances && e._spritely.instances[n] && (e._spritely.instances[n].current_frame = t - 1), this
        },
        spSpeed: function(t) {
            return e(this).each(function() {
                e(this).spSet("speed", t)
            }), this
        },
        spRelSpeed: function(t) {
            return e(this).each(function() {
                var n = e(this).spGet("depth") / 100;
                e(this).spSet("speed", t * n)
            }), this
        },
        spChangeDir: function(t) {
            return e(this).each(function() {
                e(this).spSet("dir", t)
            }), this
        },
        spState: function(t) {
            return e(this).each(function() {
                var r = (t - 1) * e(this).height() + "px",
                    i = e._spritely.getBgX(e(this)),
                    s = i + " -" + r;
                e(this).css("background-position", s)
            }), this
        },
        lockTo: function(t, n) {
            return e(this).each(function() {
                var r = e(this).attr("id");
                if (!e._spritely.instances[r]) return this;
                e._spritely.instances[r].locked_el = e(this), e._spritely.instances[r].lock_to = e(t), e._spritely.instances[r].lock_to_options = n, e._spritely.instances[r].interval = window.setInterval(function() {
                    if (e._spritely.instances[r].lock_to) {
                        var t = e._spritely.instances[r].locked_el,
                            n = e._spritely.instances[r].lock_to,
                            i = e._spritely.instances[r].lock_to_options,
                            s = i.bg_img_width,
                            o = n.height(),
                            u = e._spritely.getBgY(n),
                            a = e._spritely.getBgX(n),
                            f = parseInt(a) + parseInt(i.left),
                            l = parseInt(u) + parseInt(i.top);
                        f = e._spritely.get_rel_pos(f, s), e(t).css({
                            top: l + "px",
                            left: f + "px"
                        })
                    }
                }, n.interval || 20)
            }), this
        },
        destroy: function() {
            var t = e(this),
                n = e(this).attr("id");
            return e._spritely.instances[n] && e._spritely.instances[n].timeout && window.clearInterval(e._spritely.instances[n].timeout), e._spritely.instances[n] && e._spritely.instances[n].interval && window.clearInterval(e._spritely.instances[n].interval), delete e._spritely.instances[n], this
        }
    })
})(jQuery);
try {
    document.execCommand("BackgroundImageCache", !1, !0)
} catch (err) {};