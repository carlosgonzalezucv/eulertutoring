(function(){
  'use strict';

  angular.module("inspinia")
    .config(["$stateProvider", config]);

  function config($stateProvider){
    $stateProvider
      .state("login", {
        url: "/login",
        templateUrl: "/app/components/login/login.html",
        controller: "LoginController",
        controllerAs: "vm"
      })
  }
})();

(function() {
  'use strict';

  angular
    .module('inspinia')
    .controller('LoginController', LoginController);

  LoginController.$inject = ['$scope'];
  function LoginController($scope) {
    var vm = this;
    activate();

    function activate() {
      console.log("Login ctrl actived");
    }
  }
})();