define(function() {
  GLOBAL.__INCLUDED = true;

  return function(value, callback) {
    this.__DEFERRED = value || true;

    callback();
  }.bind(GLOBAL);
});