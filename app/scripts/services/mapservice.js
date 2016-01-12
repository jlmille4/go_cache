/*global plugin, _*/
'use strict';

/**
 * @ngdoc service
 * @name goCacheApp.MapService
 * @description
 * # MapService
 * Service in the goCacheApp.
 */
angular.module('goCacheApp')
    .service('MapService', function () {
        var isInitialized = false;
        var googleMap = null;
        var markers = [];
        var queuedMarkers = [];
        var startPosition = {
            latitude: 28.556405,
            longitude: -80.655781
        };

        var createLatLng = function (position) {
            return new plugin.google.maps.LatLng(
                position.latitude,
                position.longitude);
        };

        var addMarker = function (cache, color) {
            if (angular.isUndefined(cache)) {
                throw 'cache is not defined';
            }
            if (!isInitialized) {
                //need to wait then add the markers.
                console.log('map not initialized');
                queuedMarkers.push(cache);
                return;
            }

            var gPosition = createLatLng(cache.location);

            color = color === undefined ? 'red' : color;

            googleMap.addMarker({
                'position': gPosition,
                'title': cache.title,
                'icon': color
            }, function (marker) {
                markers[cache.id] = marker;
            });
        };

        var addMarkers = function (caches) {
            _.forEach(caches, function (cache) {
                addMarker(cache);
            });
        };

        var updateMarkerColor = function (cache, color) {
            if (!isInitialized) {
                return;
            }

            var marker = markers[cache.id];
            if (marker === undefined) {
                throw 'Marker with id ' + cache.id + ' not found';
            }

            marker.remove();

            addMarker(cache, color);
        };

        var initializeMap = function (map) {
            googleMap = map;

            console.log('initializeMap');

            var gPosition = createLatLng(startPosition);

            console.log('about to animate map');
            googleMap.animateCamera({
                'target': gPosition,
                'zoom': 13,
                'duration': 3000 // 1 seconds
            });

            console.log('called animation');
            isInitialized = true;

            //add queued markers.
            addMarkers(queuedMarkers);
            queuedMarkers = [];
        };

        var initialize = function (map) {
            if (angular.isUndefined(map)) {
                throw 'map is not defined.';
            }

            console.log('initializing google maps...');
            map.on(plugin.google.maps.event.MAP_READY,
                initializeMap);
        };

        return {
            isInitialized: isInitialized,
            initialize: initialize,
            addMarker: addMarker,
            addMarkers: addMarkers,
            updateMarkerColor: updateMarkerColor
        };
    });
