'use strict';

/**
 * @ngdoc function
 * @name goCacheApp.controller:CacheCtrl
 * @description
 * # CacheCtrl
 * Controller of the goCacheApp
 */
angular.module('goCacheApp')
  .controller('CacheCtrl', function (cache) {
  	var viewModel = this;

  	viewModel.groups = cache.getCacheGroups();
  	
  });
