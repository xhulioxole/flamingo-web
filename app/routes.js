/**
 * Author: Xhulio
 * Created Date: 2016-02-15 14:04.MD
 * This code is copyright (c) 2016 Prius Solution
 */

angular.module("flamingoApp").config(['$routeProvider', function($routeProvider) {
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