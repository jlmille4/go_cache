'use strict';

/**
 * @ngdoc service
 * @name goCacheApp.cache
 * @description
 * # cache
 * Service in the goCacheApp.
 */
angular.module('goCacheApp')
  .service('cache', function ($http, $q) {
    //self reference
    var self = this;

    //loaded data from the server/filesystem
  	var loadedData = [];
  
    //returned promise
  	var initialize = $q(function(resolve, reject){
      console.log("initializing...");
      $http.get('resources/caches.json').then(
        function(response) {
          loadedData = response.data;
          resolve(self);
        },
        function(error){
          reject(null);
        }
      );
    });
      
  	var internalGetCacheGroups = function() {
  		return loadedData;
  	};

  	var internalGetActivity = function() {
  		return [];
  	};

  	var internalGetCompleted = function() {
  		return 2;
  	};

  	//calculates the total amount of waypoints
  	var internalGetCount = function() {
  		var length = 0;
  		for(var i in loadedData) {
  			length += loadedData[i].caches.length;
  		}
  		return length;
  	};

    //retrives the cache with the given cacheId
  	var internalGetCache = function(cacheId) {
      cacheId = Number(cacheId);
      if(_.isNaN(cacheId)) {
        throw 'cacheId is not a number';
      }

      for(var i in loadedData) {
  			var caches = loadedData[i].caches;
        for(var j in caches) {
          var cache = caches[j]; 
          if(cache.id === cacheId) {
            return cache;
          }
        }
  		}
      return null;
  	};

    //public api
    self.getActivity = internalGetActivity;
    self.getCount = internalGetCount;
    self.getCompleted = internalGetCompleted;
    self.getCacheGroups = internalGetCacheGroups;
    self.getCache = internalGetCache;


  	return initialize;

  });
