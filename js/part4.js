(function() {
    var e = {}.hasOwnProperty,
        t = function(t, n) {
            function i() {
                this.constructor = t
            }
            for (var r in n) e.call(n, r) && (t[r] = n[r]);
            return i.prototype = n.prototype, t.prototype = new i, t.__super__ = n.prototype, t
        };
    this.Gmaps4RailsGoogle = function(e) {
        function n() {
            n.__super__.constructor.apply(this, arguments), this.map_options = {
                disableDefaultUI: !1,
                disableDoubleClickZoom: !1,
                type: "ROADMAP"
            }, this.markers_conf = {
                clusterer_gridSize: 50,
                clusterer_maxZoom: 5,
                custom_cluster_pictures: null,
                custom_infowindow_class: null
            }, this.mergeWithDefault("map_options"), this.mergeWithDefault("markers_conf"), this.kml_options = {
                clickable: !0,
                preserveViewport: !1,
                suppressInfoWindows: !1
            }, this.polygons_conf = {
                strokeColor: "#FFAA00",
                strokeOpacity: .8,
                strokeWeight: 2,
                fillColor: "#000000",
                fillOpacity: .35,
                clickable: !1
            }, this.polylines_conf = {
                strokeColor: "#FF0000",
                strokeOpacity: 1,
                strokeWeight: 2,
                clickable: !1,
                zIndex: null
            }, this.circles_conf = {
                fillColor: "#00AAFF",
                fillOpacity: .35,
                strokeColor: "#FFAA00",
                strokeOpacity: .8,
                strokeWeight: 2,
                clickable: !1,
                zIndex: null
            }, this.direction_conf = {
                panel_id: null,
                display_panel: !1,
                origin: null,
                destination: null,
                waypoints: [],
                optimizeWaypoints: !1,
                unitSystem: "METRIC",
                avoidHighways: !1,
                avoidTolls: !1,
                region: null,
                travelMode: "DRIVING"
            }
        }
        return t(n, e), n.prototype.createPoint = function(e, t) {
            return new google.maps.Point(e, t)
        }, n.prototype.createLatLng = function(e, t) {
            return new google.maps.LatLng(e, t)
        }, n.prototype.createLatLngBounds = function() {
            return new google.maps.LatLngBounds
        }, n.prototype.createMap = function() {
            var e, t;
            return e = {
                maxZoom: this.map_options.maxZoom,
                minZoom: this.map_options.minZoom,
                zoom: this.map_options.zoom,
                center: this.createLatLng(this.map_options.center_latitude, this.map_options.center_longitude),
                mapTypeId: google.maps.MapTypeId[this.map_options.type],
                mapTypeControl: this.map_options.mapTypeControl,
                disableDefaultUI: this.map_options.disableDefaultUI,
                disableDoubleClickZoom: this.map_options.disableDoubleClickZoom,
                draggable: this.map_options.draggable
            }, t = this.mergeObjectWithDefault(this.map_options.raw, e), new google.maps.Map(document.getElementById(this.map_options.id), t)
        }, n.prototype.createMarkerImage = function(e, t, n, r, i) {
            return new google.maps.MarkerImage(e, t, n, r, i)
        }, n.prototype.createSize = function(e, t) {
            return new google.maps.Size(e, t)
        }, n.prototype.createMarker = function(e) {
            var t, n, r, i, s, o, u;
            return i = this.createLatLng(e.Lat, e.Lng), e.marker_picture === "" && e.rich_marker === null ? (t = {
                position: i,
                map: this.serviceObject,
                title: e.marker_title,
                draggable: e.marker_draggable,
                zIndex: e.zindex
            }, s = this.mergeObjectWithDefault(this.markers_conf.raw, t), new google.maps.Marker(s)) : e.rich_marker !== null ? new RichMarker({
                position: i,
                map: this.serviceObject,
                draggable: e.marker_draggable,
                content: e.rich_marker,
                flat: e.marker_anchor === null ? !1 : e.marker_anchor[1],
                anchor: e.marker_anchor === null ? 0 : e.marker_anchor[0],
                zIndex: e.zindex
            }) : (n = this.createImageAnchorPosition(e.marker_anchor), o = this.createImageAnchorPosition(e.shadow_anchor), r = this.createOrRetrieveImage(e.marker_picture, e.marker_width, e.marker_height, n), u = this.createOrRetrieveImage(e.shadow_picture, e.shadow_width, e.shadow_height, o), t = {
                position: i,
                map: this.serviceObject,
                icon: r,
                title: e.marker_title,
                draggable: e.marker_draggable,
                shadow: u,
                zIndex: e.zindex
            }, s = this.mergeObjectWithDefault(this.markers_conf.raw, t), new google.maps.Marker(s))
        }, n.prototype.includeMarkerImage = function(e, t) {
            var n, r, i, s;
            for (n = i = 0, s = e.length; i < s; n = ++i) {
                r = e[n];
                if (r.url === t) return n
            }
            return !1
        }, n.prototype.createOrRetrieveImage = function(e, t, n, r) {
            var i, s;
            if (e === "" || e === null) return null;
            s = this.includeMarkerImage(this.markerImages, e);
            switch (s) {
            case !1:
                return i = this.createMarkerImage(e, this.createSize(t, n), null, r, null), this.markerImages.push(i), i;
            default:
                if (typeof s == "number") return this.markerImages[s];
                return !1
            }
        }, n.prototype.clearMarkers = function() {
            var e, t, n, r, i;
            r = this.markers, i = [];
            for (t = 0, n = r.length; t < n; t++) e = r[t], i.push(this.clearMarker(e));
            return i
        }, n.prototype.showMarkers = function() {
            var e, t, n, r, i;
            r = this.markers, i = [];
            for (t = 0, n = r.length; t < n; t++) e = r[t], i.push(this.showMarker(e));
            return i
        }, n.prototype.hideMarkers = function() {
            var e, t, n, r, i;
            r = this.markers, i = [];
            for (t = 0, n = r.length; t < n; t++) e = r[t], i.push(this.hideMarker(e));
            return i
        }, n.prototype.clearMarker = function(e) {
            return e.serviceObject.setMap(null)
        }, n.prototype.showMarker = function(e) {
            return e.serviceObject.setVisible(!0)
        }, n.prototype.hideMarker = function(e) {
            return e.serviceObject.setVisible(!1)
        }, n.prototype.extendBoundsWithMarkers = function() {
            var e, t, n, r, i;
            r = this.markers, i = [];
            for (t = 0, n = r.length; t < n; t++) e = r[t], i.push(this.boundsObject.extend(e.serviceObject.position));
            return i
        }, n.prototype.createClusterer = function(e) {
            return new MarkerClusterer(this.serviceObject, e, {
                maxZoom: this.markers_conf.clusterer_maxZoom,
                gridSize: this.markers_conf.clusterer_gridSize,
                styles: this.customClusterer()
            })
        }, n.prototype.clearClusterer = function() {
            return this.markerClusterer.clearMarkers()
        }, n.prototype.clusterize = function() {
            var e, t, n, r, i;
            if (this.markers_conf.do_clustering === !0) {
                this.markerClusterer !== null && this.clearClusterer(), t = new Array, i = this.markers;
                for (n = 0, r = i.length; n < r; n++) e = i[n], t.push(e.serviceObject);
                return this.markerClusterer = this.createClusterer(t)
            }
        }, n.prototype.createInfoWindow = function(e) {
            var t, n;
            if (typeof this.jsTemplate == "function" || e.description != null) return typeof this.jsTemplate == "function" && (e.description = this.jsTemplate(e)), this.markers_conf.custom_infowindow_class !== null ? (t = document.createElement("div"), t.setAttribute("class", this.markers_conf.custom_infowindow_class), t.innerHTML = e.description, e.infowindow = new InfoBox(this.infobox(t)), n = this, google.maps.event.addListener(e.serviceObject, "click", this.openInfoWindow(n, e.infowindow, e.serviceObject))) : (e.infowindow = new google.maps.InfoWindow({
                content: e.description
            }), n = this, google.maps.event.addListener(e.serviceObject, "click", this.openInfoWindow(n, e.infowindow, e.serviceObject)))
        }, n.prototype.openInfoWindow = function(e, t, n) {
            return function() {
                return e.visibleInfoWindow !== null && e.visibleInfoWindow.close(), t.open(e.serviceObject, n), e.visibleInfoWindow = t
            }
        }, n.prototype.createKmlLayer = function(e) {
            var t;
            return t = e.options || {}, t = this.mergeObjectWithDefault(t, this.kml_options), e = new google.maps.KmlLayer(e.url, t), e.setMap(this.serviceObject), e
        }, n.prototype.fitBounds = function() {
            if (!this.boundsObject.isEmpty()) return this.serviceObject.fitBounds(this.boundsObject)
        }, n.prototype.centerMapOnUser = function() {
            return this.serviceObject.setCenter(this.userLocation)
        }, n
    }(Gmaps4Rails)
}).call(this);