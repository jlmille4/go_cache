'use strict';

/**
 * @ngdoc service
 * @name goCacheApp.seedService
 * @description
 * # seedService
 * Service in the goCacheApp.
 */
angular.module('goCacheApp')
  .service('seedService', function ($http, $q, localStorageService) {
    var self = this;

  	var doSeed = function(resolve, response) {
      injectCompleted(response.data);
  		localStorageService.set('seeded', { date: Date.now() } );
  		localStorageService.set('actives', response.data);
  		resolve(self);
  	};

  	var doFailed = function(reject, error) {
  		reject(error);
  	};

    //TODO: possible make this into it's own
    //middleware service
    var injectCompleted = function(actives) {
      var found = localStorageService.get('found');
      if(found === null) {
        return;
      }

      //ugh maybe something cleaner idk
      angular.forEach(actives, function(cache) {
        angular.forEach(found, function(fnd) {
          if(fnd.id === cache.id){
            cache.found = {date: fnd.date};
          }
        });
      });
    };

  	var isSeeded = function() {
  		var seeded = localStorageService.get('seeded');
      return !(seeded === null || angular.isUndefined(seeded));
  	};

	 var seed = $q(function(resolve, reject) {
    if(isSeeded()) {
   		resolve(this);
		}
		else {
			var resolvedDoSeed = doSeed.bind(self, resolve);
			var rejectedDoFailed = doFailed.bind(self, reject);
			$http.get('resources/caches.1.json').then(resolvedDoSeed, rejectedDoFailed);
		}
	 });

   self.isSeeded = isSeeded;
  
  return seed;

});
