

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