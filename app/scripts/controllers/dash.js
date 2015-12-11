'use strict';

/**
 * @ngdoc function
 * @name goCacheApp.controller:DashCtrl
 * @description
 * # DashCtrl
 * Controller of the goCacheApp
 */
angular.module('goCacheApp')
  .controller('DashCtrl', function (cache) {
  	var viewModel = this;

    //looky looky
    viewModel.activity  =     cache.getActivity();
    viewModel.completed =     cache.getCompleted();
    viewModel.total     =     cache.getCount(); 
    viewModel.updated   =     cache.getUpdated();  

  });
