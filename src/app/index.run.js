(function() {
  'use strict';

  angular
    .module('cathy')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log, $rootScope, $location, $cookies, $http) {
    $rootScope.globals = $cookies.get('globals') || {};
    if ($rootScope.globals.currentUser) {
      $http.defaults.headers.common['AuthKey'] = $rootScope.globals.currentUser.authKey;
    }

    $rootScope.$on('$locationChangeStart', function(event, next, current) {
      // redirect to login page if not logged in and trying to access a restricted page
      var restrictedPage = $location.path() != '/';
      var loggedIn = $rootScope.globals.currentUser;
      if (restrictedPage && !loggedIn) {
        $location.path('/');
      }
    });

    $log.debug('runBlock end');
  }

})();
