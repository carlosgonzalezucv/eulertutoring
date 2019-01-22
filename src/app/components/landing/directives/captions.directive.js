(function() {
  'use strict';

  angular
    .module('inspinia')
    .directive('firstCaption', firstCaption);

  firstCaption.$inject = [];
  function firstCaption() {
    return {
      link: link,
      restrict: 'A'
    };
    
    function link(scope, element, attrs) {
      console.log("Epa", $(element).html());
    }
  }
})();