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
(function() {
  'use strict';

  angular
    .module('inspinia')
    .directive('testimonials', testimonials);

  testimonials.$inject = [];
  function testimonials() {
    return {
      restrict: "E",
      templateUrl: "/app/components/landing/directives/testimonials/testimonials.html"
    };    
  }
})();
(function() {
  'use strict';

  angular
    .module('inspinia')
    .directive('comments', comments);

  comments.$inject = [];
  function comments() {
    return {
      restrict: "E",
      templateUrl: "/app/components/landing/directives/testimonials/comments.html"
    };    
  }
})();
(function() {
  'use strict';

  angular
    .module('inspinia')
    .directive('pricing', pricing);

  pricing.$inject = [];
  function pricing() {
    return {
      restrict: "E",
      templateUrl: "/app/components/landing/directives/pricing/pricing.html"
    };    
  }
})();
(function() {
  'use strict';

  angular
    .module('inspinia')
    .directive('contact', contact);

  contact.$inject = [];
  function contact() {
    return {
      restrict: "E",
      templateUrl: "/app/components/landing/directives/contact/contact.html"
    };    
  }
})();
(function() {
  'use strict';

  angular
    .module('inspinia')
    .directive('about', about);

  about.$inject = [];
  function about() {
    return {
      restrict: "E",
      templateUrl: "/app/components/landing/directives/about/about.html"
    };    
  }
})();
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
/*!
 * classie - class helper functions
 * from bonzo https://github.com/ded/bonzo
 *
 * classie.has( elem, 'my-class' ) -> true/false
 * classie.add( elem, 'my-new-class' )
 * classie.remove( elem, 'my-unwanted-class' )
 * classie.toggle( elem, 'my-class' )
 */

/*jshint browser: true, strict: true, undef: true */
/*global define: false */

( function( window ) {

    'use strict';

// class helper functions from bonzo https://github.com/ded/bonzo

    function classReg( className ) {
        return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
    }

// classList support for class management
// altho to be fair, the api sucks because it won't accept multiple classes at once
    var hasClass, addClass, removeClass;

    if ( 'classList' in document.documentElement ) {
        hasClass = function( elem, c ) {
            return elem.classList.contains( c );
        };
        addClass = function( elem, c ) {
            elem.classList.add( c );
        };
        removeClass = function( elem, c ) {
            elem.classList.remove( c );
        };
    }
    else {
        hasClass = function( elem, c ) {
            return classReg( c ).test( elem.className );
        };
        addClass = function( elem, c ) {
            if ( !hasClass( elem, c ) ) {
                elem.className = elem.className + ' ' + c;
            }
        };
        removeClass = function( elem, c ) {
            elem.className = elem.className.replace( classReg( c ), ' ' );
        };
    }

    function toggleClass( elem, c ) {
        var fn = hasClass( elem, c ) ? removeClass : addClass;
        fn( elem, c );
    }

    var classie = {
        // full names
        hasClass: hasClass,
        addClass: addClass,
        removeClass: removeClass,
        toggleClass: toggleClass,
        // short names
        has: hasClass,
        add: addClass,
        remove: removeClass,
        toggle: toggleClass
    };

// transport
    if ( typeof define === 'function' && define.amd ) {
        // AMD
        define( classie );
    } else {
        // browser global
        window.classie = classie;
    }

})( window );

/**
 * cbpAnimatedHeader.js v1.0.0
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright 2013, Codrops
 * http://www.codrops.com
 */
var cbpAnimatedHeader = (function () {

  var docElem = document.documentElement,
    header = document.querySelector('.navbar-default'),
    didScroll = false,
    changeHeaderOn = 200;

  function init() {
    header = header || document.querySelector('.navbar-default');    
    window.addEventListener('scroll', function (event) {
      if (!didScroll) {
        didScroll = true;
        setTimeout(scrollPage, 250);
      }
    }, false);
  }

  function scrollPage() {
    var sy = scrollY();
    if (sy >= changeHeaderOn) {
      classie.add(header, 'navbar-scroll');
    }
    else {
      classie.remove(header, 'navbar-scroll');
    }
    didScroll = false;
  }

  function scrollY() {
    return window.pageYOffset || docElem.scrollTop;
  }

  setTimeout( () => init(), 1000);

})();
'use strict';

angular.module('inspinia')
  .controller('MainController', function () {

    var vm = this;

    vm.userName = 'Example user';
    vm.helloText = 'Welcome in INSPINIA Gulp SeedProject';
    vm.descriptionText = 'It is an application skeleton for a typical AngularJS web app. You can use it to quickly bootstrap your angular webapp projects.';

  });

/**
 * INSPINIA - Responsive Admin Theme
 * 2.7
 *
 * Custom scripts
 */

 (function(){
   
   angular.element(document).ready(function ($timeout) {
   
   
     // Full height of sidebar
     function fix_height() {
       var heightWithoutNavbar = angular.element("body > #wrapper").height() - 61;
       angular.element(".sidebar-panel").css("min-height", heightWithoutNavbar + "px");
   
       var navbarHeight = angular.element('nav.navbar-default').height();
       var wrapperHeigh = angular.element('#page-wrapper').height();
   
       if(navbarHeight > wrapperHeigh){
         angular.element('#page-wrapper').css("min-height", navbarHeight + "px");
       }
   
       if(navbarHeight < wrapperHeigh){
         angular.element('#page-wrapper').css("min-height", angular.element(window).height()  + "px");
       }
   
       if (angular.element('body').hasClass('fixed-nav')) {
         if (navbarHeight > wrapperHeigh) {
           angular.element('#page-wrapper').css("min-height", navbarHeight  + "px");
         } else {
           angular.element('#page-wrapper').css("min-height", angular.element(window).height() - 60 + "px");
         }
       }
   
     }
   
     angular.element(window).bind("load resize scroll", function() {
       if(!angular.element("body").hasClass('body-small')) {
         fix_height();
       }
     });
   
     // Move right sidebar top after scroll
     angular.element(window).scroll(function(){
       if (angular.element(window).scrollTop() > 0 && !angular.element('body').hasClass('fixed-nav') ) {
         angular.element('#right-sidebar').addClass('sidebar-top');
       } else {
         angular.element('#right-sidebar').removeClass('sidebar-top');
       }
     });
   
     $timeout(function(){
       fix_height();
     });
   
     // Minimalize menu when screen is less than 768px
     angular.element(window).bind("load resize", function() {
       if (angular.element(document).width() < 769) {
         angular.element('body').addClass('body-small')
       } else {
         angular.element('body').removeClass('body-small')
       }
     })
   
   });
   
   
   $(document).ready(function () {
   
     // Highlight the top nav as scrolling
     $('body').scrollspy({
         target: '.navbar-fixed-top',
         offset: 80
     })
   
     // Page scrolling feature
     $('a.page-scroll').bind('click', function(event) {
         var link = $(this);
         $('html, body').stop().animate({
             scrollTop: $(link.attr('href')).offset().top - 70
         }, 500);
         event.preventDefault();
     });
   
   });
   
   // Activate WOW.js plugin for animation on scrol
   new WOW().init();

  })();


(function() {
  'use strict';

  angular
    .module('inspinia')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log, $rootScope, $state, AuthService) {

    $log.debug('runBlock end');
    $rootScope.$state = $state;
    console.log("LOG- AuthService", AuthService.IsLoggedIn());
  }

})();

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
        templateUrl: "app/components/common/content.html",
        onEnter: ["AuthService", "$state", function(AuthService, $state){
          if(!AuthService.IsLoggedIn()) {
            $state.go("login");
          }
        }]
      })
      .state('index.main', {
        url: "/main",
        templateUrl: "app/main/main.html",
        data: { pageTitle: 'Main view' }
      })
      .state('index.minor', {
        url: "/minor",
        templateUrl: "app/minor/minor.html",
        data: { pageTitle: 'Example view' }
      });
    $urlRouterProvider.otherwise('/landing');
  }
})();



(function(){
  'use strict';

  //Directive used to set metisMenu and minimalize button
  angular.module('inspinia')
    .directive('sideNavigation', sideNavigation)
    .directive('minimalizaSidebar', minimalizaSidebar)
    .directive("pageTitle", pageTitle);

  minimalizaSidebar.$inject = ["$timeout"];
  function minimalizaSidebar ($timeout) {
    return {
      restrict: 'A',
      template: '<a class="navbar-minimalize minimalize-styl-2 btn btn-primary " href="" ng-click="minimalize()"><i class="fa fa-bars"></i></a>',
      controller: function ($scope) {
        angular.element('body').toggleClass('mini-navbar');
        $scope.minimalize = function () {
          angular.element('body').toggleClass('mini-navbar');
          if (!angular.element('body').hasClass('mini-navbar') || angular.element('body').hasClass('body-small')) {
            // Hide menu in order to smoothly turn on when maximize menu
            angular.element('#side-menu').hide();
            // For smoothly turn on menu
            $timeout(function () {
              angular.element('#side-menu').fadeIn(400);
            }, 200);
          } else {
            // Remove all inline style from jquery fadeIn function to reset menu state
            angular.element('#side-menu').removeAttr('style');
          }
        };
      }
    };
  }  
  sideNavigation.$inject = ["$timeout"];
  function sideNavigation($timeout) {
    return {
      restrict: 'A',
      link: function (scope, element) {
        // Call metsi to build when user signup
        scope.$watch('authentication.user', function () {
          $timeout(function () {
            element.metisMenu && element.metisMenu();
          });
        });

        // Colapse menu in mobile mode after click on element
        var menuElement = angular.element('#side-menu a:not([href$="\\#"])');
        menuElement.click(function () {
          if (angular.element(window).width() < 769) {
            angular.element("body").toggleClass("mini-navbar");
          }
        });

        // Enable initial fixed sidebar
        if (angular.element("body").hasClass('fixed-sidebar')) {
          var sidebar = element.parent();
          sidebar.slimScroll({
            height: '100%',
            railOpacity: 0.9
          });
        }

      }
    };
  }
  pageTitle.$inject = ["$rootScope", "$timeout"];
  function pageTitle($rootScope, $timeout) {
    return {
      link: function(scope, element) {
        var listener = function(event, toState)  {
          // Default title - load on Dashboard 1
          var title = 'EulerAcademy';

          //TEAM => se modifica el titulo de la pestana de HOME
          // Create your own title pattern
          if (toState.data && toState.data.pageTitle) title = 'EulerAcademy | ' + toState.data.pageTitle;
          $timeout(function() {
            element.text(title);
          });
        };
        $rootScope.$on('$stateChangeStart', listener);
      }
    };
  }
})();  
angular.module("inspinia").run(["$templateCache", function($templateCache) {$templateCache.put("/app/main/main.html","<div class=\"wrapper wrapper-content animated fadeInRight\"><div class=\"row\"><div class=\"col-lg-12\"><div class=\"text-center m-t-lg\"><h1>Main content</h1><small>Here we can do something nice <i class=\"glyphicon glyphicon-pencil\"></i></small></div></div></div></div>");
$templateCache.put("/app/minor/minor.html","<div class=\"wrapper wrapper-content animated fadeInRight\"><div class=\"row\"><div class=\"col-lg-12\"><div class=\"text-center m-t-lg\"><h1>Simple example of second view</h1><small>Configure in app.js as index.minor state.</small></div></div></div></div>");
$templateCache.put("/app/components/landing/landing.html","<div class=\"navbar-wrapper\"><nav class=\"navbar navbar-default navbar-fixed-top\" role=\"navigation\"><div class=\"container\"><div class=\"navbar-header page-scroll\"><button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#navbar\" aria-expanded=\"false\" aria-controls=\"navbar\"><span class=\"sr-only\">Toggle navigation</span> <span class=\"icon-bar\"></span> <span class=\"icon-bar\"></span> <span class=\"icon-bar\"></span></button></div><div id=\"navbar\" class=\"navbar-collapse collapse\"><ul class=\"nav navbar-nav navbar-right\"><li class=\"active\"><a class=\"page-scroll\" page-scroll=\"\" href=\"#top\" target=\"_self\">Home</a></li><li><a class=\"page-scroll\" page-scroll=\"\" href=\"#about\" target=\"_self\">About</a></li><li><a class=\"page-scroll\" page-scroll=\"\" href=\"#team\" target=\"_self\">Team</a></li><li><a class=\"page-scroll\" page-scroll=\"\" href=\"#testimonials\" target=\"_self\">Testimonials</a></li><li><a class=\"page-scroll\" page-scroll=\"\" href=\"#pricing\" target=\"_self\">Pricing</a></li><li><a class=\"page-scroll\" page-scroll=\"\" href=\"#contact\" target=\"_self\">Contact</a></li></ul></div></div></nav></div><div id=\"inSlider\" class=\"carousel slide carousel-fade\" data-ride=\"carousel\" ng-non-bindable=\"\"><ol class=\"carousel-indicators\"><li data-target=\"inSlider\" data-slide-to=\"0\" class=\"active\"></li><li data-target=\"inSlider\" data-slide-to=\"1\"></li></ol><div class=\"carousel-inner\" role=\"listbox\"><div class=\"item active\"><div class=\"container\"><div class=\"carousel-caption blank\"><h1>Learn from leading scientists</h1><p>Our tutors will bring you to the next level</p></div></div><div class=\"header-back one\"></div></div><div class=\"item\"><div class=\"container\"><div class=\"carousel-caption blank\"><h1>Enjoy while learning<br>with our tutors.</h1><p>We would provide you with high qualified tutors that will bring you confidence.</p></div></div><div class=\"header-back two\"></div></div></div><a class=\"left carousel-control\" data-target=\"#inSlider\" role=\"button\" data-slide=\"prev\"><span class=\"glyphicon glyphicon-chevron-left\" aria-hidden=\"true\"></span> <span class=\"sr-only\">Previous</span></a> <a class=\"right carousel-control\" data-target=\"#inSlider\" role=\"button\" data-slide=\"next\"><span class=\"glyphicon glyphicon-chevron-right\" aria-hidden=\"true\"></span> <span class=\"sr-only\">Next</span></a></div><section id=\"about\" class=\"white-section\"><about></about></section><section id=\"team\" class=\"gray-section\"><team></team></section><section id=\"testimonials\" class=\"white-section testimonials\"><testimonials></testimonials></section><section class=\"comments gray-section\" style=\"margin-top: 0\"><comments></comments></section><section id=\"pricing\" class=\"pricing\"><pricing></pricing></section><section id=\"contact\" class=\"gray-section contact\"><contact></contact></section>");
$templateCache.put("/app/components/common/content.html","<div id=\"wrapper\"><div ng-include=\"\'app/components/common/navigation.html\'\"></div><div id=\"page-wrapper\" class=\"gray-bg {{$state.current.name}}\"><div ng-include=\"\'app/components/common/topnavbar.html\'\"></div><div ui-view=\"\"></div><div ng-include=\"\'app/components/common/footer.html\'\"></div></div></div>");
$templateCache.put("/app/components/common/footer.html","<div class=\"footer\"><div class=\"pull-right\">10GB of <strong>250GB</strong> Free.</div><div><strong>Copyright</strong> Example Company &copy; 2015-2016</div></div>");
$templateCache.put("/app/components/common/ibox_tools.html","<div class=\"ibox-tools\" uib-dropdown=\"\"><a ng-click=\"showhide()\"><i class=\"fa fa-chevron-up\"></i></a> <a uib-dropdown-toggle=\"\" href=\"\"><i class=\"fa fa-wrench\"></i></a><ul uib-dropdown-menu=\"\"><li><a href=\"\">Config option 1</a></li><li><a href=\"\">Config option 2</a></li></ul><a ng-click=\"closebox()\"><i class=\"fa fa-times\"></i></a></div>");
$templateCache.put("/app/components/common/navigation.html","<nav class=\"navbar-default navbar-static-side\" role=\"navigation\"><div class=\"sidebar-collapse\"><ul side-navigation=\"\" class=\"nav metismenu\" id=\"side-menu\"><li class=\"nav-header\"><div class=\"logo-element\">ET</div></li><li ui-sref-active=\"active\"><a ui-sref=\"index.main\"><i class=\"fa fa-desktop\"></i> <span class=\"nav-label\">Main</span></a></li></ul></div></nav>");
$templateCache.put("/app/components/common/topnavbar.html","<top-nav-bar></top-nav-bar>");
$templateCache.put("/app/components/login/login.html","<div class=\"wrapper\"><div class=\"row login-container\"><form class=\"login-form\" ng-submit=\"vm.login()\"><div class=\"text-center\"><span style=\"font-size: 8em\" class=\"fa fa-lock color-white\" ui-sref=\"landing\"></span><h1 class=\"p-md\" style=\"color: white\">Welcome to Euler tutoring</h1></div><div class=\"form-group\"><div class=\"input-group\"><input placeholder=\"username\" type=\"text\" required=\"\" name=\"username\" ng-model=\"vm.username\" ng-model-options=\"{ updateOn: \'blur\' }\" class=\"form-control\"> <span class=\"input-group-addon\"><span class=\"fa fa-user\"></span></span></div></div><div class=\"form-group\"><div class=\"input-group\"><input placeholder=\"password\" type=\"password\" required=\"\" name=\"password\" ng-model=\"vm.password\" ng-model-options=\"{ updateOn: \'blur\' }\" class=\"form-control\"> <span class=\"input-group-addon\"><span class=\"fa fa-lock\"></span></span></div></div><button class=\"btn btn-primary m-md btn-rounded\" type=\"submit\">Login</button></form></div></div>");
$templateCache.put("/app/components/topNavBar/topNavBar.html","<div class=\"row border-bottom\"><nav class=\"navbar navbar-static-top white-bg\" role=\"navigation\" style=\"margin-bottom: 0\"><div class=\"navbar-header\"><span minimaliza-sidebar=\"\"></span></div><ul class=\"nav navbar-top-links pull-right m-r-sm\"><li><span uib-dropdown=\"\"><img src=\"assets/landing/img/avatar3.jpg\" alt=\"user\" class=\"img-circle avatar\" uib-dropdown-toggle=\"\"><ul role=\"menu\" class=\"dropdown-menu dropdown-menu-left\" uib-dropdown-menu=\"\" aria-labelledby=\"simple-dropdown\"><li><a ng-click=\"vm.logOut()\">Sign out</a></li></ul></span></li></ul></nav></div>");
$templateCache.put("/app/components/landing/directives/about/about.html","<div class=\"container services\"><div class=\"row\"><div class=\"col-sm-4\"><h2 class=\"text-center\">Mentoring by teachers<br>from top rated universities</h2><img src=\"assets/landing/img/Mentoring-by-Physicists.jpg\" alt=\"math-tutoring\" class=\"full-width\"><p>Donec sed odio dui. Etiam porta sem malesuada magna mollis euismod. Nullam id dolor id nibh ultricies vehicula ut id elit. Morbi leo risus.</p><p><a class=\"navy-link\" href=\"#\" role=\"button\">Details &raquo;</a></p></div><div class=\"col-sm-4\"><h2 class=\"text-center\">Science tutoring<br>From Jr. High Up</h2><img src=\"assets/landing/img/Math-and-physics-tutoring.jpg\" alt=\"math-tutoring\" class=\"full-width\"><p>Donec sed odio dui. Etiam porta sem malesuada magna mollis euismod. Nullam id dolor id nibh ultricies vehicula ut id elit. Morbi leo risus.</p><p><a class=\"navy-link\" href=\"#\" role=\"button\">Details &raquo;</a></p></div><div class=\"col-sm-4\"><h2 class=\"text-center\">Learning differences<br>specialists</h2><img src=\"assets/landing/img/Learning-Disabilities-Specialists.jpg\" alt=\"math-tutoring\" class=\"full-width\"><p>Donec sed odio dui. Etiam porta sem malesuada magna mollis euismod. Nullam id dolor id nibh ultricies vehicula ut id elit. Morbi leo risus.</p><p><a class=\"navy-link\" href=\"#\" role=\"button\">Details &raquo;</a></p></div></div></div>");
$templateCache.put("/app/components/landing/directives/contact/contact.html","<div class=\"container\"><div class=\"row m-b-lg\"><div class=\"col-lg-12 text-center\"><div class=\"navy-line\"></div><h1>Contact Us</h1><p>Here you can find our contact information.</p></div></div><div class=\"row m-b-lg\"><div class=\"col-lg-3 col-lg-offset-3\"><address><strong><span class=\"navy\">Euler tutoring.</span></strong><br>Some address<br>etc etc etc<br><abbr title=\"Phone\">P:</abbr> (123) 456-7890</address></div><div class=\"col-lg-4\"><p class=\"text-color\">Any other relevant information</p></div></div><div class=\"row\"><div class=\"col-lg-12 text-center\"><a href=\"mailto:test@mailinator.com\" class=\"btn btn-primary\">Send us mail</a><p class=\"m-t-sm\">Or follow us on social platform</p><ul class=\"list-inline social-icon\"><li><a href=\"#\"><i class=\"fa fa-twitter\"></i></a></li><li><a href=\"#\"><i class=\"fa fa-facebook\"></i></a></li><li><a href=\"#\"><i class=\"fa fa-linkedin\"></i></a></li></ul></div></div><div class=\"row\"><div class=\"col-lg-8 col-lg-offset-2 text-center m-t-lg m-b-lg\"><p><strong>&copy; 2019 Euler tutoring</strong><br>any other thing you want to put here.</p></div></div></div>");
$templateCache.put("/app/components/landing/directives/pricing/pricing.html","<div class=\"container\"><div class=\"row m-b-lg\"><div class=\"col-lg-12 text-center\"><div class=\"navy-line\"></div><h1>Service Pricing</h1><p>Here you can put another text</p></div></div><div class=\"row\"><div class=\"col-lg-4 wow zoomIn\"><ul class=\"pricing-plan list-unstyled\"><li class=\"pricing-title\">High School</li><li class=\"pricing-desc\">Some description about the pricing</li><li class=\"pricing-price\"><span>$30</span> / hour</li><li>Anything else</li><li><a class=\"btn btn-primary btn-xs\" ui-sref=\"login\">Signup</a></li></ul></div><div class=\"col-lg-4 wow zoomIn\"><ul class=\"pricing-plan list-unstyled selected\"><li class=\"pricing-title\">Bachelor</li><li class=\"pricing-desc\">Some description about the pricing</li><li class=\"pricing-price\"><span>$60</span> / hour</li><li>Anything else</li><li><a class=\"btn btn-primary btn-xs\" ui-sref=\"login\">Signup</a></li></ul></div><div class=\"col-lg-4 wow zoomIn\"><ul class=\"pricing-plan list-unstyled\"><li class=\"pricing-title\">Master and PhD</li><li class=\"pricing-desc\">Some description about the pricing</li><li class=\"pricing-price\"><span>$80</span> / hour</li><li>Anything else</li><li><a class=\"btn btn-primary btn-xs\" ui-sref=\"login\">Signup</a></li></ul></div></div><div class=\"row m-t-lg\"><div class=\"col-lg-8 col-lg-offset-2 text-center m-t-lg\"><p>*Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. <span class=\"navy\">Various versions</span> have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p></div></div></div>");
$templateCache.put("/app/components/landing/directives/team/team.html","<div class=\"container\"><div class=\"row m-b-lg\"><div class=\"col-lg-12 text-center\"><div class=\"navy-line\"></div><h1>Our Team</h1><p>Brief description of our team goals.</p></div></div><div class=\"row\"><div class=\"col-sm-4 wow zoomIn\" ng-repeat=\"tutor in vm.tutors\"><div class=\"team-member\"><img ng-src=\"assets/landing/img/avatar{{$index + 1}}.jpg\" class=\"img-responsive img-circle img-small\" alt=\"\"><h4><span class=\"navy\">{{tutor.Name}}</span> {{tutor.LastName}}</h4><p>{{tutor.Description}}</p><ul class=\"list-inline social-icon\"><li><a href=\"#\"><i class=\"fa fa-twitter\"></i></a></li><li><a href=\"#\"><i class=\"fa fa-facebook\"></i></a></li><li><a href=\"#\"><i class=\"fa fa-linkedin\"></i></a></li></ul></div></div></div></div>");
$templateCache.put("/app/components/landing/directives/testimonials/comments.html","<div class=\"container\"><div class=\"row\"><div class=\"col-lg-12 text-center\"><div class=\"navy-line\"></div><h1>What our partners say</h1><p>Maybe some other institutions.</p></div></div><div class=\"row features-block\"><div class=\"col-lg-4\"><div class=\"bubble\">\"Some comments from XXX\"</div><div class=\"comments-avatar\"><a href=\"\" class=\"pull-left\"><img alt=\"image\" src=\"assets/landing/img/avatar3.jpg\"></a><div class=\"media-body\"><div class=\"commens-name\">XXX</div><small class=\"text-muted\">Some institute from Switzerland</small></div></div></div></div></div>");
$templateCache.put("/app/components/landing/directives/testimonials/testimonials.html","<div class=\"container\"><div class=\"row\"><div class=\"col-lg-12 text-center wow zoomIn\"><i class=\"fa fa-comment big-icon\"></i><h1>What our users say</h1><div class=\"testimonials-text\"><i>\"Some of the bests comments from our clients\"</i></div><small><strong>12.02.2014 - Tutor XXX</strong></small></div></div></div>");
$templateCache.put("/app/components/landing/directives/tutor-detail/tutorDetail.html","<div class=\"inmodal\"><div class=\"modal-header\"><img src=\"/assets/images/patterns/header-profile.png\" alt=\"profile\" class=\"img-circle\" height=\"100px\" width=\"100px\"><h3>{{vm.tutor.Name}}</h3></div><div class=\"modal-body\"><h2>{{vm.tutor.Description}}</h2></div></div>");}]);