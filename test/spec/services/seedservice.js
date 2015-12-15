'use strict';

describe('Service: seedService', function () {

  // load the service's module
  beforeEach(module('goCacheApp'));

  // instantiate service
  var seedService;
  beforeEach(inject(function (_seedService_) {
    seedService = _seedService_;
  }));

  it('should do something', function () {
    expect(!!seedService).toBe(true);
  });

  it('should correctly seed data', function(){
    
  });

});
