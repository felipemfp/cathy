(function() {
  'use strict';

  angular
    .module('cathy')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($log) {
    var vm = this;

    vm.signUp = signUp;
    vm.signIn= signIn;

    function signUp() {
      $log.log('signUp()');
    }

    function signIn() {
      $log.log('signIn()');
    }
  }
})();
