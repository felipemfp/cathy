(function() {
  'use strict';

  angular
    .module('cathy')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($log, $mdToast, $location, userService, authenticationService) {
    var vm = this;

    vm.signUp = signUp;
    vm.signIn = signIn;

    function signUp() {
      var name = vm.register.name;
      var login = vm.register.login;
      var password = vm.register.password;
      userService.register(name, login, password).then(function(fetchedData) {
        $log.log(fetchedData.name + ' registered.');
        $mdToast.show(
          $mdToast.simple()
          .textContent(fetchedData.name + ' registered.')
          .hideDelay(3000)
        );
        $location.path('/dashboard');
      });
    }

    function signIn() {
      var login = vm.login;
      var password = vm.password;
      authenticationService.login(login, password).then(function(fetchedData) {
        $log.log(fetchedData.name + ' logged.');
        $mdToast.show(
          $mdToast.simple()
          .textContent(fetchedData.name + ' logged.')
          .hideDelay(3000)
        );
        $location.path('/dashboard');
      });
    }

  }
})();
