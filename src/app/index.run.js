(function() {
  'use strict';

  angular
    .module('inspinia')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log, $rootScope, $state) {

    $log.debug('runBlock end');
    $rootScope.$state = $state;
  }

})();
