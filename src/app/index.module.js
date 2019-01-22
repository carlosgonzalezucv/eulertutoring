(function() {
  'use strict';
  angular
    .module('inspinia', [
      'ngAnimate', 
      'ngCookies', 
      'ngTouch', 
      'ngSanitize', 
      'ngMessages', 
      'ngAria', 
      'ngResource', 
      'ui.router', 
      'ui.bootstrap',
      'pascalprecht.translate'
    ]);
})();


(function(){
  'use strict';
  angular.module('inspinia')
    .config(config);

  config.$inject = ["$translateProvider", "EnglishTranslations"];
  function config($translateProvider, EnglishTranslations){
    $translateProvider
      .translations('en', EnglishTranslations())
      .preferredLanguage('en');
  }
})();

(function(){
  angular.module('inspinia')
    .constant("EnglishTranslations", EnglishTranslations);

  function EnglishTranslations() {
    return {
      LANDING_CAPTION_1: "Learn from leading scientists"
    };
  }
})();