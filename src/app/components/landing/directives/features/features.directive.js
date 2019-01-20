(function() {
  'use strict';

  angular
    .module('inspinia')
    .directive('features', features);

  function features() {
    return {
      templateUrl: "/app/components/landing/directives/features/features.html",
      restrict: 'E',
      scope: {
      }
    };
  }
})();