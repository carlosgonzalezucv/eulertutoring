(function() {
  'use strict';

  angular
    .module('inspinia')
    .directive('tutorDetail', tutorDetail);

  tutorDetail.$inject = [];
  function tutorDetail() {
    return {
      templateUrl: "/app/components/landing/directives/tutor-detail/tutorDetail.html",
      bindToController: true,
      controller: Controller,
      controllerAs: 'vm',
      restrict: 'E',
    };    
  }
  Controller.$inject = [];
  function Controller () {
    let vm = this;

    console.log("epa", vm)
;  }
})();