'use strict';

/**
 * @ngdoc function
 * @name goCacheApp.controller:CacheCtrl
 * @description
 * # CacheCtrl
 * Controller of the goCacheApp
 */
angular.module('goCacheApp')
  .controller('CacheCtrl', function ($scope, cacheService, $timeout) {
  	var viewModel = this;

  	viewModel.caches = [];

    var updateCaches = function(caches) {

      viewModel.caches = caches;
    };

    cacheService
      .getActive()
      .then( updateCaches );

   $timeout(function() {
      cacheService
        .find(0)
        .then(updateCaches);
    }, 5000);

  });
