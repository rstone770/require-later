require('chai').should();

var requirejs = require('requirejs');

requirejs.config({
  baseUrl: __dirname,

  paths: {
    'src': '../src'
  },

  nodeRequire: require
});

describe('require-later', function() {
  beforeEach(function() {
    delete GLOBAL.__DEFERRED;
  });
  
  it('should return a deferred function.', function(done) {
    requirejs([
      'src/require-later!require-later-fixture',
    ], function(deferred) {
      deferred.should.be.a.function;

      done();
    });
  });

  it('should not evaluate until deferred is used.', function(done) {
    requirejs([
      'src/require-later!require-later-fixture'
    ], function(deferred) {
      GLOBAL.should.not.have.property('__DEFERRED');

      deferred(null, function() {
        GLOBAL.should.have.property('__DEFERRED');
        
        done();
      });
    });
  });

  it('should allow context binding.', function(done) {
    requirejs([
      'src/require-later!require-later-fixture'
    ], function(deferred) {
      var object = {};

      deferred.bind(object)(null, function() {
        GLOBAL.should.have.property('__DEFERRED');
        
        done();
      });
    });
  });

  it('should pass arguments through.', function(done) {
    requirejs([
      'src/require-later!require-later-fixture'
    ], function(deferred) {
      var object = {};

      deferred.bind(object)('mittens', function() {
        GLOBAL.should.have.property('__DEFERRED', 'mittens');
        
        done();
      });
    });
  });

  it('should contain a version string.', function(done) {
    requirejs([
      'src/require-later'
    ], function(later) {
      later.should.have.property('version');
      later.version.should.be.a.string;

      done();
    });
  });
});