(function() {
  'use_strict';

  angular
    .module('cathy')
    .factory('userService', userService);

  /** @ngInject */
  function userService($http, $log, catherineAPI, authenticationService) {
    var apiHost = catherineAPI.apiHost;

    var service = {
      register: register
    };

    return service;

    function register(name, username, password, callback) {
      return $http.post(apiHost + '/api/users/', {
        name: name,
        username: username,
        password: password
      }).then(registerComplete).catch(registerFailed);

      function registerComplete(response) {
        authenticationService.login(username, password, callback);
      }

      function registerFailed(error) {
        $log.error('XHR Failed for register.\n' + angular.toJson(error.data, true));
        callback(false);
      }
    }
  }
})();
