'use strict';

/**
 * @ngdoc service
 * @name goCacheApp.cache
 * @description
 * # cache
 * Service in the goCacheApp.
 */
angular.module('goCacheApp')
  .service('cacheService', function (localStorageService, $q) {
    var self = this;

    //list of active caches
    var actives = localStorageService.get('actives') || [];
    
    //list of inactive caches
    var found = localStorageService.get('found') || [];

    var updated = localStorageService.get('seeded') || Date.now();

    var find = function(id) {
        if(isFound(id)) {
            throw 'cache: ' + id + ' is already found';
        }

        console.log(id);
        var cache = getById(id);        

        cache.found = { date: Date.now() };
        found.push(cache);

        actives = _.filter(actives, function(c) {
            return c.id !== cache.id;
        });

        return( $q.when( actives ) );
    };

    var isFound = function(id) {
        var f = _.find(found, function(cache){
            return cache.id === id;
        });
        return (angular.isDefined(f));
    };

    var getById = function(id) {
        return _.find(actives, function(cache) {
            return cache.id === id;
        });
    };

    var getFound = function() {
        return ( $q.when(found) );
    };

    var getCaches = function() {
        return ( $q.when(actives) );
    };


    return {
        getActive: getCaches,
        getFound: getFound,
        find: find,
        updated: updated
    };
  });
