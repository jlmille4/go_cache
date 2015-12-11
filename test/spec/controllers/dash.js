'use strict';

describe('Controller: DashCtrl', function () {

  // load the controller's module
  beforeEach(module('goCacheApp'));

  var DashCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DashCtrl = $controller('DashCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(DashCtrl.awesomeThings.length).toBe(3);
  });
});
