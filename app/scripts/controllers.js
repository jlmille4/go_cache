angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('CacheCtrl', function($scope, $stateParams, uiGmapGoogleMapApi, uiGmapIsReady, Maps){
  'use strict';

  //the last valid center of map
  var $lastValidCenter = {};

  //the google map instance
  var $mapInstance = {};

  //Google.Maps
  var $GoogleMaps = {};

  //the calculated bounds
  var $bounds = {};

  //google map initialization
  uiGmapGoogleMapApi.then(function(GoogleMaps) {
    $GoogleMaps = GoogleMaps;

    //intialize the bounds
    $bounds = buildMapBounds($GoogleMaps);
    
  });  

  uiGmapIsReady.promise(1).then(function(instances) {
    var instance = instances[0];
    if(instance === null || instance === undefined) {
      throw 'uiGmapIsReady:: instance is null or undefined: ' + instance; 
    }

    $mapInstance = $scope.mapContainer.getGMap();

    registerMapBounding($GoogleMaps, $mapInstance, $bounds);

  });

  // calculate the map bounds
  var buildMapBounds = function(GoogleMaps) {

    if(GoogleMaps === null || GoogleMaps === undefined) {
      throw 'buildMapBounds:: GoogleMaps is null or undefined: ' + GoogleMaps;
    }

    var bounds = new GoogleMaps.LatLngBounds(
        new GoogleMaps.LatLng(
          $scope.map.bounds.southwest.latitude,
          $scope.map.bounds.southwest.longitude),
        new GoogleMaps.LatLng(
          $scope.map.bounds.northeast.latitude,
          $scope.map.bounds.northeast.longitude)
      );
    return bounds;
  };

  //sets up the map navigation bounds
  var registerMapBounding = function(GoogleMaps, mapInstance, bounds) {
    
    if(GoogleMaps === null || GoogleMaps === undefined){
      throw 'registerMapBounding::GoogleMaps is null or undefined: ' + GoogleMaps;
    }
    if(mapInstance === null || mapInstance === undefined){
      throw 'registerMapBounding::mapInstance is null: ' + mapInstance;
    }

    //initialize the lastValidCenter
    $lastValidCenter = mapInstance.getCenter();

    GoogleMaps.event.addListener(mapInstance, 'center_changed', function() {
      if(bounds.contains(mapInstance.getCenter())) {
        $lastValidCenter = mapInstance.getCenter();
        return;
      }
      mapInstance.panTo($lastValidCenter);
    });
  };

 //The google map instance  
  $scope.mapContainer = {};

  //the map properties
  $scope.map = Maps.get();

  // used for toggling visiblity of marker windows
  $scope.toggleInfoWindow = function(marker) {
    if(marker === null || marker === undefined) {
      throw 'marker is null or undefined' + marker;
    }
    //turn off all markers
    $scope.map.markers.forEach( function(item) {
      item.windowOptions.visible = false;
    });

    marker.windowOptions.visible = !marker.windowOptions.visible;
  };


});