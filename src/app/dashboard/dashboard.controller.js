(function() {
  'use strict';

  angular
    .module('cathy')
    .controller('DashboardController', DashboardController);

  /** @ngInject */
  function DashboardController($location, authenticationService) {
    var vm = this;

    vm.signOut = signOut;

    function signOut() {
      authenticationService.clearUser();
      $location.path('/');
    }
  }
})();
