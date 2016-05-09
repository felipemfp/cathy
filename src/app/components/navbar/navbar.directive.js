(function() {
  'use strict';

  angular
    .module('cathy')
    .directive('cathyNavbar', cathyNavbar);

  /** @ngInject */
  function cathyNavbar() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/navbar/navbar.html',
      controller: NavbarController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function NavbarController($location, authenticationService) {
      var vm = this;

      vm.signOut = signOut;

      function signOut() {
        authenticationService.clearUser();
        $location.path('/');
      }
    }
  }

})();
