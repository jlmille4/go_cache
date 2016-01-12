/*global angular, _ */

/**
 * @ngdoc function
 * @name goCacheApp.controller:DashCtrl
 * @description
 * # DashCtrl
 * Controller of the goCacheApp
 */
angular.module('goCacheApp')
    .controller('DashCtrl', function (caches) {
        'use strict';
        var viewModel = this;
        viewModel.caches = caches;


        viewModel.getFoundCount = function () {
            var found = _.filter(viewModel.caches, function (cache) {
                return angular.isDefined(cache.completed);
            });
            return found.length;
        };
    });
