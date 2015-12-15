'use strict';

/**
 * @ngdoc function
 * @name goCacheApp.controller:CachedetailCtrl
 * @description
 * # CachedetailCtrl
 * Controller of the goCacheApp
 */
angular.module('goCacheApp')
  .controller('CachedetailCtrl', function ($stateParams, cacheService) {
    var viewModel = this;

    var cache = cacheService.getById($stateParams.cacheId);
  	
    console.log(cache);

    viewModel.cache = cache;

    viewModel.find = cacheService.find;

  });
