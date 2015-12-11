'use strict';

describe('Controller: CacheCtrl', function () {

  // load the controller's module
  beforeEach(module('goCacheApp'));

  var CacheCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CacheCtrl = $controller('CacheCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(CacheCtrl.awesomeThings.length).toBe(3);
  });
});
