'use strict';

/**
 * @ngdoc function
 * @name goCacheApp.controller:CachedetailCtrl
 * @description
 * # CachedetailCtrl
 * Controller of the goCacheApp
 */
angular.module('goCacheApp')
  .controller('CachedetailCtrl', function ($stateParams, cache) {
    var viewModel = this;
   	var cacheId = $stateParams.cacheId;
   	
   	viewModel.cache = cache.getCache(cacheId);

  });
