(function() {
  'use strict';

  angular
    .module('cathy')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log, $rootScope, $location, $cookies, $http, authenticationService) {
    $rootScope.globals = $cookies.getObject('globals') || {};

    if ($rootScope.globals.currentUser) {
      var token = $rootScope.globals.currentUser.token;
      var payload = authenticationService.parseJwt(token);
      $log.log((Math.round(new Date().getTime() / 1000) <= payload.exp), angular.toJson(payload))
      if (Math.round(new Date().getTime() / 1000) <= payload.exp) {
        $http.defaults.headers.common.Authorization = 'Bearer ' + token;
      }
    }

    $rootScope.$on('$locationChangeStart', function(event, next, current) {
      // redirect to login page if not logged in and trying to access a restricted page
      var restrictedPage = $location.path() != '/';
      var loggedIn = $rootScope.globals.currentUser;
      if (restrictedPage && !loggedIn) {
        $location.path('/');
      }
      else if ($location.path() == '/' && loggedIn) {
        $location.path('/dashboard');
      }
    });

    $log.debug('runBlock end');
  }

})();
