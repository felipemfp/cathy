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
      controllerAs: 'navbar',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function NavbarController($location, authenticationService) {
      var navbar = this;

      navbar.signOut = signOut;

      function signOut() {
        authenticationService.clearToken();
        $location.path('/');
      }
    }
  }

})();
