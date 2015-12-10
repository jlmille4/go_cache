angular.module('starter.services', [])

.factory('Maps', function() {
  'use strict';

  //the default location of the map
  var center = {
    latitude: 28.571369,
    longitude: -80.649219, 
  };

  //the map bounds corners
  var bounds = {
    northeast: {
      latitude:   28.673193,  
      longitude:  -80.504891
    },
    southwest: {
      latitude:   28.403556,
      longitude:  -80.772682
    }
  };

  // the markers
  var markers = [{ 
    id: 0,
    name: 'Cache 0',
    img: 'images/adam.jpg',
    coords: { 
      latitude:28.523719,
      longitude:-80.680414
    } 
  },{ 
    id: 1, 
    name: 'Cache 1',
    img: 'images/ben.png',
    coords: { 
      latitude:28.522550, 
      longitude:-80.659343 
    } 
  },{ 
    id: 2, 
    name: 'Cache 2',
    img: 'images/max.png',
    coords: { 
      latitude:28.524020 , 
      longitude:-80.644623 
    } 
  }];

  //add the windowOptions
  markers.forEach(function(marker) {
    marker.windowOptions = { visible: false };
  });

  //wrap it all up
  var map = {
    center: center,
    bounds: bounds,
    zoom: 12,
    markers: markers
  };
  
  return {
    get: function(){
      return map;
    }
  };
});