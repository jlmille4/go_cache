'use strict';
/*global plugin, _*/
/**
 * @ngdoc function
 * @name goCacheApp.controller:MapCtrl
 * @description
 * # MapCtrl
 * Controller of the goCacheApp
 */
angular.module('goCacheApp')
    .controller('MapCtrl', ['$ionicPlatform', 'MapService', 'caches',
        '$timeout',
        function (
            $ionicPlatform, MapService, caches, $timeout) {
            $ionicPlatform.ready(function () {

                if (plugin === undefined) {
                    console.log('MapCtrl::plugin undefined');
                    return;
                }

                if (MapService.isInitialized) {
                    console.log(
                        'MapCtrl::MapService Is Initialized');
                    return;
                }

                var div = document.getElementById('map_canvas');
                var map = plugin.google.maps.Map.getMap(div);

                console.log('about to initialize');
                MapService.initialize(map);

                console.log('about to add markers');
                MapService.addMarkers(caches);

                var cacheToChange = _.find(caches, function (cache) {
                    return Number(cache.id) === 0;
                });

                $timeout(function () {
                    MapService.updateMarkerColor(
                        cacheToChange);
                }, 5000);

            });

        }
    ]);
