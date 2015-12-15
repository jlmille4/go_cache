'use strict';

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('goCacheApp', ['uiGmapgoogle-maps','ionic', 'ngRoute', 'LocalStorageModule' ])

.run(function($ionicPlatform) {

  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html',  
  
    resolve: {
      seedService: 'seedService'
    }
    
  })

  // Each tab has its own nav history stack:
  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl as viewModel'
      }
    }
  })
  
  .state('tab.map', {
      url: '/map',
      views: {
        'tab-map': {
          templateUrl: 'templates/tab-map.html',
          controller: 'MapCtrl as viewModel'
        }
      }
    })

  .state('tab.cache', {
      url: '/cache',
      views: {
        'tab-cache': {
          templateUrl: 'templates/tab-cache.html',
          controller: 'CacheCtrl as viewModel'
        }
      }
    })

  .state('tab.detail', {
      url: '/cache/:cacheId',
      views: {
        'tab-cache': {
          templateUrl: 'templates/cache-detail.html',
          controller: 'CachedetailCtrl as viewModel'
        }
      }
    })

/*
  .state('tab.discover', {
      url: '/discover/:cacheId',
      views: {
        'tab-discover': {
          templateUrl: 'templates/discover.html',
          controller: 'CachedetailCtrl as viewModel'
        }
      }
    })
*/
  ;
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

})

.config(function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        //    key: 'your api key',
        v: '3.20', //defaults to latest 3.X anyhow
        libraries: 'weather,geometry,visualization'
    });
})

.config(['localStorageServiceProvider', function(localStorageServiceProvider){
  localStorageServiceProvider.setPrefix('goCacheApp');
}])

;



