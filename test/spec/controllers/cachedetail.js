'use strict';

describe('Controller: CachedetailCtrl', function () {

  // load the controller's module
  beforeEach(module('goCacheApp'));

  var CachedetailCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CachedetailCtrl = $controller('CachedetailCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(CachedetailCtrl.awesomeThings.length).toBe(3);
  });
});
