(function() {
  'use strict';

  angular
    .module('cathy')
    .config(config);

  /** @ngInject */
  function config($logProvider, $mdThemingProvider, $locationProvider, cfpLoadingBarProvider) {
    // Enable log
    $logProvider.debugEnabled(true);

    $mdThemingProvider.theme('default')
      .primaryPalette('purple')
      .accentPalette('green');

    // $locationProvider.html5Mode(true);
    cfpLoadingBarProvider.includeSpinner = false;
  }

})();
