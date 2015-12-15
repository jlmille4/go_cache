'use strict';

describe('Service: Discovery', function () {

  // load the service's module
  beforeEach(module('goCacheApp'));

  // instantiate service
  var Discovery;
  beforeEach(inject(function (_Discovery_) {
    Discovery = _Discovery_;
  }));

  it('should do something', function () {
    expect(!!Discovery).toBe(true);
  });

});
