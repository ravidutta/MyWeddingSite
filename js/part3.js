(function() {
    var e;
    e = {}, e.triggerOldOnload = function() {
        if (typeof e.oldOnload == "function") return e.oldOnload()
    }, e.loadMaps = function() {
        var t, n, r, i, s;
        s = [];
        for (t in e) i = e[t], r = t.search(/load/), r === -1 ? (n = "load_" + t, s.push(e[n]())) : s.push(void 0);
        return s
    }, window.Gmaps = e, this.Gmaps4Rails = function() {
        function e() {
            this.map = null, this.serviceObject = null, this.visibleInfoWindow = null, this.userLocation = null, this.geolocationFailure = function() {
                return !1
            }, this.callback = function() {
                return !1
            }, this.customClusterer = function() {
                return !1
            }, this.infobox = function() {
                return !1
            }, this.jsTemplate = !1, this.default_map_options = {
                id: "map",
                draggable: !0,
                detect_location: !1,
                center_on_user: !1,
                center_latitude: 0,
                center_longitude: 0,
                zoom: 7,
                maxZoom: null,
                minZoom: null,
                auto_adjust: !0,
                auto_zoom: !0,
                bounds: [],
                raw: {}
            }, this.default_markers_conf = {
                title: "",
                picture: "",
                width: 22,
                length: 32,
                draggable: !1,
                do_clustering: !1,
                randomize: !1,
                max_random_distance: 100,
                list_container: null,
                offset: 0,
                raw: {}
            }, this.markers = [], this.boundsObject = null, this.polygons = [], this.polylines = [], this.circles = [], this.markerClusterer = null, this.markerImages = []
        }
        return e.prototype.initialize = function() {
            return this.serviceObject = this.createMap(), this.map = this.serviceObject, (this.map_options.detect_location === !0 || this.map_options.center_on_user === !0) && this.findUserLocation(this), this.resetSidebarContent()
        }, e.prototype.findUserLocation = function(e) {
            var t, n;
            return navigator.geolocation ? (n = function(t) {
                e.userLocation = e.createLatLng(t.coords.latitude, t.coords.longitude);
                if (e.map_options.center_on_user === !0) return e.centerMapOnUser()
            }, t = function() {
                return e.geolocationFailure(!0)
            }, navigator.geolocation.getCurrentPosition(n, t)) : e.geolocationFailure(!1)
        }, e.prototype.create_direction = function() {
            var e, t, n;
            return e = new google.maps.DirectionsRenderer, t = new google.maps.DirectionsService, e.setMap(this.serviceObject), this.direction_conf.display_panel && e.setPanel(document.getElementById(this.direction_conf.panel_id)), e.setOptions({
                suppressMarkers: !1,
                suppressInfoWindows: !1,
                suppressPolylines: !1
            }), n = {
                origin: this.direction_conf.origin,
                destination: this.direction_conf.destination,
                waypoints: this.direction_conf.waypoints,
                optimizeWaypoints: this.direction_conf.optimizeWaypoints,
                unitSystem: google.maps.DirectionsUnitSystem[this.direction_conf.unitSystem],
                avoidHighways: this.direction_conf.avoidHighways,
                avoidTolls: this.direction_conf.avoidTolls,
                region: this.direction_conf.region,
                travelMode: google.maps.DirectionsTravelMode[this.direction_conf.travelMode],
                language: "en"
            }, t.route(n, function(t, n) {
                if (n === google.maps.DirectionsStatus.OK) return e.setDirections(t)
            })
        }, e.prototype.create_circles = function() {
            var e, t, n, r, i;
            r = this.circles, i = [];
            for (t = 0, n = r.length; t < n; t++) e = r[t], i.push(this.create_circle(e));
            return i
        }, e.prototype.create_circle = function(e) {
            var t;
            e === this.circles[0] && (e.strokeColor != null && (this.circles_conf.strokeColor = e.strokeColor), e.strokeOpacity != null && (this.circles_conf.strokeOpacity = e.strokeOpacity), e.strokeWeight != null && (this.circles_conf.strokeWeight = e.strokeWeight), e.fillColor != null && (this.circles_conf.fillColor = e.fillColor), e.fillOpacity != null && (this.circles_conf.fillOpacity = e.fillOpacity));
            if (e.lat != null && e.lng != null) return t = new google.maps.Circle({
                center: this.createLatLng(e.lat, e.lng),
                strokeColor: e.strokeColor || this.circles_conf.strokeColor,
                strokeOpacity: e.strokeOpacity || this.circles_conf.strokeOpacity,
                strokeWeight: e.strokeWeight || this.circles_conf.strokeWeight,
                fillOpacity: e.fillOpacity || this.circles_conf.fillOpacity,
                fillColor: e.fillColor || this.circles_conf.fillColor,
                clickable: e.clickable || this.circles_conf.clickable,
                zIndex: e.zIndex || this.circles_conf.zIndex,
                radius: e.radius
            }), e.serviceObject = t, t.setMap(this.serviceObject)
        }, e.prototype.clear_circles = function() {
            var e, t, n, r, i;
            r = this.circles, i = [];
            for (t = 0, n = r.length; t < n; t++) e = r[t], i.push(this.clear_circle(e));
            return i
        }, e.prototype.clear_circle = function(e) {
            return e.serviceObject.setMap(null)
        }, e.prototype.hide_circles = function() {
            var e, t, n, r, i;
            r = this.circles, i = [];
            for (t = 0, n = r.length; t < n; t++) e = r[t], i.push(this.hide_circle(e));
            return i
        }, e.prototype.hide_circle = function(e) {
            return e.serviceObject.setMap(null)
        }, e.prototype.show_circles = function() {
            var e, t, n, r, i;
            r = this.circles, i = [];
            for (t = 0, n = r.length; t < n; t++) e = r[t], i.push(this.show_circle(this.circle));
            return i
        }, e.prototype.show_circle = function(e) {
            return e.serviceObject.setMap(this.serviceObject)
        }, e.prototype.create_polygons = function() {
            var e, t, n, r, i;
            r = this.polygons, i = [];
            for (t = 0, n = r.length; t < n; t++) e = r[t], i.push(this.create_polygon(e));
            return i
        }, e.prototype.create_polygon = function(e) {
            var t, n, r, i, s, o, u, a, f, l, c, h;
            u = [];
            for (c = 0, h = e.length; c < h; c++) o = e[c], i = this.createLatLng(o.lat, o.lng), u.push(i), o === e[0] && (a = o.strokeColor || this.polygons_conf.strokeColor, f = o.strokeOpacity || this.polygons_conf.strokeOpacity, l = o.strokeWeight || this.polygons_conf.strokeWeight, n = o.fillColor || this.polygons_conf.fillColor, r = o.fillOpacity || this.polygons_conf.fillOpacity, t = o.clickable || this.polygons_conf.clickable);
            return s = new google.maps.Polygon({
                paths: u,
                strokeColor: a,
                strokeOpacity: f,
                strokeWeight: l,
                fillColor: n,
                fillOpacity: r,
                clickable: t,
                map: this.serviceObject
            }), e.serviceObject = s
        }, e.prototype.replacePolylines = function(e) {
            return this.destroy_polylines(), this.polylines = e, this.create_polylines(), this.adjustMapToBounds()
        }, e.prototype.destroy_polylines = function() {
            var e, t, n, r;
            r = this.polylines;
            for (t = 0, n = r.length; t < n; t++) e = r[t], e.serviceObject.setMap(null);
            return this.polylines = []
        }, e.prototype.create_polylines = function() {
            var e, t, n, r, i;
            r = this.polylines, i = [];
            for (t = 0, n = r.length; t < n; t++) e = r[t], i.push(this.create_polyline(e));
            return i
        }, e.prototype.create_polyline = function(e) {
            var t, n, r, i, s, o, u, a, f, l, c, h, p, d, v;
            u = [];
            for (h = 0, d = e.length; h < d; h++) {
                r = e[h];
                if (r.coded_array != null) {
                    n = new google.maps.geometry.encoding.decodePath(r.coded_array);
                    for (p = 0, v = n.length; p < v; p++) o = n[p], u.push(o)
                } else r === e[0] && (a = r.strokeColor || this.polylines_conf.strokeColor, f = r.strokeOpacity || this.polylines_conf.strokeOpacity, l = r.strokeWeight || this.polylines_conf.strokeWeight, t = r.clickable || this.polylines_conf.clickable, c = r.zIndex || this.polylines_conf.zIndex), r.lat != null && r.lng != null && (i = this.createLatLng(r.lat, r.lng), u.push(i))
            }
            return s = new google.maps.Polyline({
                path: u,
                strokeColor: a,
                strokeOpacity: f,
                strokeWeight: l,
                clickable: t,
                zIndex: c
            }), e.serviceObject = s, s.setMap(this.serviceObject)
        }, e.prototype.create_markers = function() {
            return this.createServiceMarkersFromMarkers(), this.clusterize()
        }, e.prototype.createServiceMarkersFromMarkers = function() {
            var e, t, n, r, i, s, o, u;
            u = this.markers;
            for (r = s = 0, o = u.length; s < o; r = ++s) i = u[r], this.markers[r].serviceObject == null && (e = this.markers[r].lat, n = this.markers[r].lng, this.markers_conf.randomize && (t = this.randomize(e, n), e = t[0], n = t[1]), this.markers[r].serviceObject = this.createMarker({
                marker_picture: this.markers[r].picture ? this.markers[r].picture : this.markers_conf.picture,
                marker_width: this.markers[r].width ? this.markers[r].width : this.markers_conf.width,
                marker_height: this.markers[r].height ? this.markers[r].height : this.markers_conf.length,
                marker_title: this.markers[r].title ? this.markers[r].title : null,
                marker_anchor: this.markers[r].marker_anchor ? this.markers[r].marker_anchor : null,
                shadow_anchor: this.markers[r].shadow_anchor ? this.markers[r].shadow_anchor : null,
                shadow_picture: this.markers[r].shadow_picture ? this.markers[r].shadow_picture : null,
                shadow_width: this.markers[r].shadow_width ? this.markers[r].shadow_width : null,
                shadow_height: this.markers[r].shadow_height ? this.markers[r].shadow_height : null,
                marker_draggable: this.markers[r].draggable ? this.markers[r].draggable : this.markers_conf.draggable,
                rich_marker: this.markers[r].rich_marker ? this.markers[r].rich_marker : null,
                zindex: this.markers[r].zindex ? this.markers[r].zindex : null,
                Lat: e,
                Lng: n,
                index: r
            }), this.createInfoWindow(this.markers[r]), this.createSidebar(this.markers[r]));
            return this.markers_conf.offset = this.markers.length
        }, e.prototype.createImageAnchorPosition = function(e) {
            return e === null ? null : this.createPoint(e[0], e[1])
        }, e.prototype.replaceMarkers = function(e) {
            return this.clearMarkers(), this.markers = new Array, this.boundsObject = this.createLatLngBounds(), this.resetSidebarContent(), this.markers_conf.offset = 0, this.addMarkers(e)
        }, e.prototype.addMarkers = function(e) {
            return this.markers = this.markers.concat(e), this.create_markers(), this.adjustMapToBounds()
        }, e.prototype.createSidebar = function(e) {
            var t, n, r, i, s;
            if (this.markers_conf.list_container) return s = document.getElementById(this.markers_conf.list_container), i = document.createElement("li"), t = document.createElement("a"), t.href = "javascript:void(0);", r = e.sidebar != null ? e.sidebar : "Marker", t.innerHTML = r, n = this, t.onclick = this.sidebar_element_handler(n, e.serviceObject, "click"), i.appendChild(t), s.appendChild(i)
        }, e.prototype.sidebar_element_handler = function(e, t, n) {
            return function() {
                return e.map.panTo(t.position), google.maps.event.trigger(t, n)
            }
        }, e.prototype.resetSidebarContent = function() {
            var e;
            if (this.markers_conf.list_container !== null) return e = document.getElementById(this.markers_conf.list_container), e.innerHTML = ""
        }, e.prototype.adjustMapToBounds = function() {
            var e, t, n, r, i, s, o, u, a, f, l, c, h, p, d, v, m, g, y, b, w, E, S, x;
            if (this.map_options.auto_adjust || this.map_options.bounds !== null) {
                this.boundsObject = this.createLatLngBounds();
                if (this.map_options.auto_adjust) {
                    this.extendBoundsWithMarkers(), w = this.polylines;
                    for (a = 0, h = w.length; a < h; a++) {
                        o = w[a], u = o.serviceObject.latLngs.getArray()[0].getArray();
                        for (f = 0, p = u.length; f < p; f++) r = u[f], this.boundsObject.extend(r)
                    }
                    E = this.polygons;
                    for (l = 0, d = E.length; l < d; l++) {
                        i = E[l], s = i.serviceObject.latLngs.getArray()[0].getArray();
                        for (c = 0, v = s.length; c < v; c++) r = s[c], this.boundsObject.extend(r)
                    }
                    S = this.circles;
                    for (y = 0, m = S.length; y < m; y++) t = S[y], this.boundsObject.extend(t.serviceObject.getBounds().getNorthEast()), this.boundsObject.extend(t.serviceObject.getBounds().getSouthWest())
                }
                x = this.map_options.bounds;
                for (b = 0, g = x.length; b < g; b++) e = x[b], e = this.createLatLng(e.lat, e.lng), this.boundsObject.extend(e);
                return this.map_options.auto_zoom ? this.fitBounds() : (n = this.boundsObject.getCenter(), this.map_options.center_latitude = n.lat(), this.map_options.center_longitude = n.lng(), this.serviceObject.setCenter(n))
            }
        }, e.prototype.create_kml = function() {
            var e, t, n, r, i;
            r = this.kml, i = [];
            for (t = 0, n = r.length; t < n; t++) e = r[t], i.push(e.serviceObject = this.createKmlLayer(e));
            return i
        }, e.prototype.exists = function(e) {
            return e !== "" && typeof e != "undefined"
        }, e.prototype.randomize = function(e, t) {
            var n, r, i, s;
            return i = this.markers_conf.max_random_distance * this.random(), s = this.markers_conf.max_random_distance * this.random(), n = parseFloat(e) + 180 / Math.PI * (s / 6378137), r = parseFloat(t) + 90 / Math.PI * (i / 6378137) / Math.cos(e), [n, r]
        }, e.prototype.mergeObjectWithDefault = function(e, t) {
            var n, r, i;
            n = {};
            for (r in e) i = e[r], n[r] = i;
            for (r in t) i = t[r], n[r] == null && (n[r] = i);
            return n
        }, e.prototype.mergeWithDefault = function(e) {
            var t, n;
            return t = this["default_" + e], n = this[e], this[e] = this.mergeObjectWithDefault(n, t), !0
        }, e.prototype.random = function() {
            return Math.random() * 2 - 1
        }, e
    }()
}).call(this);