define([
  'module'
], function() {

  /**
   * The deferred module loader.
   * 
   * @param  {!String} module
   * @return {!Function}
   */
  var deferred = function(module) {
    return function() {
      var parameters = [].slice.call(arguments),
          self       = this;

      require([
        module
      ], function(resource) {
        resource.apply(self, parameters);
      });
    };
  },

  /**
   * The requirejs api.
   * 
   * @type {Object}
   */
  api = {

    /**
     * Version of plugin
     * 
     * @type {String}
     */
    version: '{{version}}',

    /**
     * Loads the resource by mocking it up and then when its actually
     * used load it.
     * 
     * @param  {!String}    name
     * @param  {!Require}   req
     * @param  {!Function}  onload
     */
    load: function (name, req, onload) {
      onload(deferred(name));
    }
  };

  return api;
});