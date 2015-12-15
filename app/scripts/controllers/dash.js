'use strict';

/**
 * @ngdoc function
 * @name goCacheApp.controller:DashCtrl
 * @description
 * # DashCtrl
 * Controller of the goCacheApp
 */
angular.module('goCacheApp')
  .controller('DashCtrl', function ($scope, cacheService, $timeout) {
  	var viewModel = this;

    viewModel.caches = [];
    viewModel.found = [];

    viewModel.updated = cacheService.updated;

    var updateFound = function(found) {
      viewModel.found = found;
    };

    var updateCache = function(caches) {
      viewModel.caches = caches;
    };


    viewModel.find = function(id) {
      cacheService
        .find(id)
        .then(updateFound);
    };

    cacheService
      .getActive()
      .then( updateCache );


    cacheService
      .getFound()
      .then( updateFound );

   

 });
