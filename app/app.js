'use strict';

// Declare app level module which depends on views, and components
angular.module('flamingoApp', [
    'ngRoute',
    'uiGmapgoogle-maps',
    'toastr',
    'ui.bootstrap.datetimepicker'
])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider
      .when('/home', {
          templateUrl: 'components/home/home.html',
          controller: 'HomeCtrl'
      }).when('/contact', {
          templateUrl: 'components/contact/contact.html',
          controller: 'ContactCtrl'
      })
      .when('/statistics', {
          templateUrl: 'components/statistics/statistics.html',
          controller: 'StatisticsCtrl'
      })
      .when('/admin', {
          templateUrl: 'components/admin/admin.html',
          controller: 'AdminCtrl'
      })
     .when('/login', {
        templateUrl: 'components/login/login.html',
        controller: 'LoginCtrl'
      });
  $routeProvider.otherwise({redirectTo: '/home'});
}]);

angular.module('flamingoApp').run(['$rootScope', '$location', function ($rootScope, $location) {
    // TODO - Check admin route
    // TODO - Check login route
}]);

angular.module('flamingoApp').value('ENDPOINT', "http://localhost:8080/flamingo/rest"); //
