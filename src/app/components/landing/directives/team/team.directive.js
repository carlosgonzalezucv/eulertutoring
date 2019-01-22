(function() {
  'use strict';

  angular
    .module('inspinia')
    .directive('team', team);

  function team() {
    return {
      templateUrl: "/app/components/landing/directives/team/team.html",
      restrict: 'E',
      controller: Controller,
      controllerAs: "vm",
      scope: {
      }
    };
  }

  Controller.$inject = ["$uibModal"];
  function Controller($uibModal){
    let vm = this;

    vm.tutors = new Array(3).fill(0).map(Tutor)
    vm.showTutorDetail = showTutorDetail;

    function showTutorDetail(tutor) {
      $uibModal.open({
        templateUrl: `/app/components/landing/directives/tutor-detail/tutorDetail.html`,
        resolve: {
          tutor
        },
        controller: ["tutor", ShowTutorModalController],
        controllerAs: "vm"
      })
        .result.then(e => console.log("Modal cerrado"));
    }
    function Tutor(e, index) {
      return {
        Name: "Tutor " + index,
        Description: "Description for tutor " + index
      }
    }
    function ShowTutorModalController(tutor){
      let vm = this;

      vm.tutor = tutor;

      console.log("epa", vm)
    }
    console.log("vm.tutors", vm.tutors);
  }
})();