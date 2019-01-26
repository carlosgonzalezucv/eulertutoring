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
        controllerAs: "vm",
        data: {specialClass: "login-body"}
      })
  }
})();

(function() {
  'use strict';

  angular
    .module('inspinia')
    .controller('LoginController', LoginController);

  LoginController.$inject = ['$state', 'AuthService'];
  function LoginController($state, AuthService) {
    var vm = this;
    vm.login = login;
    
    activate();

    function login() {
      let user = {
        username: vm.username,
        password: vm.password
      };
      AuthService.LogIn(user);
      $state.go("index.main");
    }
    function activate() {
      console.log("Login ctrl actived");
    }
  }
})();

(function() {
  'use strict';

  angular
    .module('inspinia')
    .service('AuthService', AuthService);

  AuthService.$inject = ["$state"];
  function AuthService($state) {
    let _isLoggedIn = sessionStorage.token ? true : false;

    this.LogIn = LogIn;
    this.LogOut = LogOut;
    this.IsLoggedIn = IsLoggedIn;

    function IsLoggedIn () {
      return _isLoggedIn;
    }
    function LogIn(user) { 
      sessionStorage.username = user.username;
      sessionStorage.token = "eltokenmagico";
      _isLoggedIn = true;
    }
    function LogOut() { 
      sessionStorage.clear();
      _isLoggedIn = false;
      $state.go("login"); 
    }
  }
})();