;(function () {
  'use strict'
  angular
    .module('inspinia')
    .config(routerConfig);
  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('landing', {
        url: '/landing',
        templateUrl: "/app/components/landing/landing.html",
        data: { pageTitle: 'Landing', specialClass: 'landing-page' }
      })
      .state('index', {
        abstract: true,
        url: "/index",
        templateUrl: "/app/components/common/content.html",
        onEnter: ["AuthService", "$state", function(AuthService, $state){
          if(!AuthService.IsLoggedIn()) {
            $state.go("login");
          }
        }]
      })
      .state('index.main', {
        url: "/main",
        templateUrl: "/app/main/main.html",
        data: { pageTitle: 'Main view' }
      })
      .state('index.minor', {
        url: "/minor",
        templateUrl: "/app/minor/minor.html",
        data: { pageTitle: 'Example view' }
      });
    $urlRouterProvider.otherwise('/landing');
  }
})();
