/*global angular, console*/

/**
 * @ngdoc service
 * @name goCacheApp.seedService
 * @description
 * # seedService
 * Service in the goCacheApp.
 */
angular.module('goCacheApp')
    .service('seedService', function ($http, $q, localStorageService) {
        'use strict';
        var self = this,
            seed;

        //possible make this into it's own
        //middleware service
        function injectCompleted(actives) {
            var found = localStorageService.get('found');
            if (found === null) {
                return;
            }

            //ugh maybe something cleaner idk
            angular.forEach(actives, function (cache) {
                angular.forEach(found, function (fnd) {
                    if (fnd.id === cache.id) {
                        cache.found = {
                            date: fnd.date
                        };
                    }
                });
            });
        }

        function doSeed(resolve, response) {
            injectCompleted(response.data);
            localStorageService.set('seeded', {
                date: Date.now()
            });
            localStorageService.set('actives', response.data);
            resolve(self);
        }

        function doFailed(reject, error) {
            reject(error);
        }



        function isSeeded() {
            var seeded = localStorageService.get('seeded');
            return !(seeded === null || angular.isUndefined(seeded));
        }

        seed = $q(function (resolve, reject) {
            var resolvedDoSeed, rejectedDoFailed;
            if (isSeeded()) {
                resolve(this);
            } else {
                resolvedDoSeed = doSeed.bind(self, resolve);
                rejectedDoFailed = doFailed.bind(self, reject);
                $http.get('resources/caches.1.json').then(
                    resolvedDoSeed,
                    rejectedDoFailed
                );
            }
        });

        self.isSeeded = isSeeded;

        return seed;

    });
