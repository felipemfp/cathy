(function() {
  'use_strict';

  angular
    .module('cathy')
    .factory('userService', userService);

  /** @ngInject */
  function userService($http, $log, authenticationService) {
    var apiHost = 'http://my-cathy.herokuapp.com';

    var service = {
      register: register,
    };

    return service;

    function register(name, login, password) {
      return $http.post(apiHost + '/api/users/', {
        name: name,
        login: login,
        password: password
      }).then(registerComplete).catch(registerFailed);

      function registerComplete(response) {
        var user = response.data;
        authenticationService.setUser(user.login, user.name, user.auth_key);
        return user;
      }

      function registerFailed(error) {
        $log.error('XHR Failed for register.\n' + angular.toJson(error.data, true));
      }
    }
  }
})();
