(function() {
  'use_strict';

  angular
    .module('cathy')
    .factory('authenticationService', authenticationService);

  /** @ngInject */
  function authenticationService($http, $log, $cookies, $rootScope, $window, catherineAPI) {
    var apiHost = catherineAPI.apiHost;

    var service = {
      login: login,
      setToken: setToken,
      clearToken: clearToken,
      parseJwt: parseJwt
    };

    return service;

    function login(username, password, callback) {
      return $http.post(apiHost + '/api/login/', {
        username: username,
        password: password
      }).then(loginComplete).catch(loginFailed);

      function loginComplete(response) {
        var token = response.data.token;
        setToken(token);
        callback(true);
      }

      function loginFailed(error) {
        $log.error('XHR Failed for login.\n' + angular.toJson(error.data, true));
        callback(false);
      }
    }

    function setToken(token) {
      var payload = parseJwt(token);
      $rootScope.globals = {
        currentUser: {
          name: payload.name,
          username: payload.username,
          token: token
        }
      };
      $http.defaults.headers.common.Authorization = 'Bearer ' + token;
      $cookies.putObject('globals', $rootScope.globals);
    }

    function clearToken() {
      $rootScope.globals = {};
      $http.defaults.headers.common.Authorization = '';
      $cookies.remove('globals');
    }

    function parseJwt(token) {
      var base64Url = token.split('.')[1];
      var base64 = base64Url.replace('-', '+').replace('_', '/');
      return angular.fromJson($window.atob(base64));
    }
  }
})();
