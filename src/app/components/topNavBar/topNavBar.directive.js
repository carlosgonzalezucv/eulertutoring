(function () {
  'use strict';

  angular
    .module('inspinia')
    .directive('topNavBar', topNavBar);

  topNavBar.$inject = ['AuthService'];
  function topNavBar(AuthService) {
    return {
      templateUrl: "/app/components/topNavBar/topNavBar.html",
      bindToController: true,
      controller: Controller,
      controllerAs: 'vm',
      restrict: 'E',
      scope: {
      }
    };
  }
  /* @ngInject */
  function Controller(AuthService) {
    let vm = this;

    vm.logOut = AuthService.LogOut;
    vm.username = sessionStorage.username;
  }
})();