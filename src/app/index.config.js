(function() {
  'use strict';

  angular
    .module('cathy')
    .config(config);

  /** @ngInject */
  function config($logProvider, $mdThemingProvider, cfpLoadingBarProvider) {
    // Enable log
    $logProvider.debugEnabled(true);

    $mdThemingProvider.theme('default')
      .primaryPalette('purple')
      .accentPalette('green');

    cfpLoadingBarProvider.includeSpinner = false;
  }

})();
