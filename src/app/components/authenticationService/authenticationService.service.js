(function() {
  'use_strict';

  angular
    .module('cathy')
    .factory('authenticationService', authenticationService);

  /** @ngInject */
  function authenticationService($http, $cookieStore, $rootScope) {
    var apiHost = 'https://my-cathy.herokuapp.com';

    var service = {
      login: login,
      setUser: setUser,
      clearUser: clearUser
    }

    return service;

    function login(login, password) {
      return $http.post(apiHost + '/api/login', {
        login: login,
        password: password
      }).then(loginComplete).catch(loginFailed);

      function loginComplete(response) {
        var user = response.data;
        setUser(user.login, user.name, user.auth_key);
        return user;
      }

      function loginFailed(response) {
        $log.error('XHR Failed for login.\n' + angular.toJson(error.data, true));
      }

    }

    function setUser(login, name, authKey) {
      $rootScope.globals = {
        currentUser: {
          login: login,
          name: name,
          authKey: authKey
        }
      };
      $http.defaults.headers.common['AuthKey'] = authKey;
      $cookieStore.put('globals', $rootScope.globals);
    }

    function clearUser() {
      $rootScope.globals = {};
      $cookieStore.remove('globals');
      $http.defaults.headers.common.AuthKey = '';
    }
  }
})();
