define(function() {
  return function(value, callback) {
    this.__DEFERRED = value || true;

    callback();
  }.bind(GLOBAL);
});