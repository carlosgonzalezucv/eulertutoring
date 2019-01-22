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