(function() {
  'use_strict';

  angular
    .module('cathy')
    .factory('cathyAPIBase', cathyAPIBase);

  /** @ngInject */
  function cathyAPIBase() {
    var apiHost = 'http://my-cathy.herokuapp.com';

    var service = {
      apiHost: apiHost
    };

    return service;
  }
})();
