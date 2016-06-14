(function() {
  'use strict';

  angular
    .module('cathy')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($log, $mdToast, $location, $rootScope, userService, authenticationService) {
    var vm = this;

    vm.register = {};

    vm.signUp = signUp;
    vm.signIn = signIn;

    function signUp() {
      var name = vm.register.name;
      var username = vm.register.username;
      var password = vm.register.password;
      if (name && username && password) {
        userService.register(name, username, password, function(response) {
          if (response === true) {
            $mdToast.show(
              $mdToast.simple()
              .textContent($rootScope.globals.currentUser.name + ' registered and logged.')
              .hideDelay(3000)
            );
            $location.path('/dashboard');
          } else {
            $mdToast.show(
              $mdToast.simple()
              .textContent('Something is wrong!')
              .hideDelay(3000)
            );
          }
        });
      } else {
        $mdToast.show(
          $mdToast.simple()
          .textContent('Both name, username and password are required.')
          .hideDelay(3000)
        );
      }
    }

    function signIn() {
      var username = vm.username;
      var password = vm.password;
      if (username && password) {
        authenticationService.login(username, password, function(response) {
          if (response === true) {
            $mdToast.show(
              $mdToast.simple()
              .textContent($rootScope.globals.currentUser.name + ' logged.')
              .hideDelay(3000)
            );
            $location.path('/dashboard');
          } else {
            $mdToast.show(
              $mdToast.simple()
              .textContent('Username and password does not match.')
              .hideDelay(3000)
            );
          }
        });
      } else {
        $mdToast.show(
          $mdToast.simple()
          .textContent('Both username and password are required.')
          .hideDelay(3000)
        );
      }
    }

  }
})();
