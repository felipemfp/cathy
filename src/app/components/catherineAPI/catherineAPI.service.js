(function() {
  'use_strict';

  angular
    .module('cathy')
    .factory('catherineAPI', catherineAPI);

  /** @ngInject */
  function catherineAPI() {
    var apiHost = 'http://catherine-api.herokuapp.com';

    var service = {
      apiHost: apiHost
    };

    return service;
  }
})();
