(function() {
  'use strict';

  angular
    .module('inspinia')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log, $rootScope, $state, AuthService) {

    $log.debug('runBlock end');
    $rootScope.$state = $state;
    console.log("LOG- AuthService", AuthService.IsLoggedIn());
  }

})();
