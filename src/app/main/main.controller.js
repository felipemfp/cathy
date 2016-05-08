(function() {
  'use strict';

  angular
    .module('cathy')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($log, $mdToast, userService) {
    var vm = this;

    vm.signUp = signUp;
    vm.signIn= signIn;

    function signUp() {
      var name = vm.register.name,
          login = vm.register.login,
          password = vm.register.password;
      userService.register(name, login, password).then(function (fetchedData) {
          $log.log(fetchedData.name + ' registered.');
          $mdToast.show(
            $mdToast.simple()
              .textContent(fetchedData.name + ' registered.')
              .hideDelay(3000)
          );
      });
    }

    function signIn() {
      $log.log('signIn()');
    }
  }
})();
