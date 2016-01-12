/*global angular*/

/**
 * @ngdoc function
 * @name goCacheApp.controller:CacheCtrl
 * @description
 * # CacheCtrl
 * Controller of the goCacheApp
 */
angular.module('goCacheApp')
    .controller('CacheCtrl', function (caches) {
        'use strict';
        var viewModel = this;
        viewModel.caches = caches;
    });
