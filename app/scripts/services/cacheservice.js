/*global angular, console*/

/**
 * @ngdoc service
 * @name goCacheApp.cache
 * @description
 * # cache
 * Service in the goCacheApp.
 */
var app = angular.module('goCacheApp');
app.service('cacheService', function ($http, $q, $timeout) {
    'use strict';
    var self = this,
        initialize;
    self.caches = [];

    function handleResponse(resolve, response) {
        self.caches = response.data;
        resolve(self.caches);
    }

    function handleError(reject, error) {
        reject(error);
    }

    initialize = $q(function (resolve, reject) {
        var resolvedHandleResponse, rejectedHandleError;

        resolvedHandleResponse = handleResponse.bind(self,
            resolve);
        rejectedHandleError = handleError.bind(self, reject);
        $http.get('resources/caches.1.json').then(
            resolvedHandleResponse,
            rejectedHandleError
        );
    });

    return initialize;
});
