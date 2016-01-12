/*global angular*/
/**
 * @ngdoc function
 * @name goCacheApp.controller:CachedetailCtrl
 * @description
 * # CachedetailCtrl
 * Controller of the goCacheApp
 */
angular.module('goCacheApp')
    .controller('CachedetailCtrl', function (cache) {
        'use strict';

        var viewModel = this;

        viewModel.cache = cache;
    });
