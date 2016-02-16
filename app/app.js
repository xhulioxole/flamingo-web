'use strict';

// Declare app level module which depends on views, and components
angular.module('flamingoApp', [
    'ngRoute',
    'ngMap',
    'toastr',
    'ui.bootstrap.datetimepicker',
    'LocalStorageModule'
])

.config(function (localStorageServiceProvider) {
    localStorageServiceProvider.setPrefix("flamingoApp")
})

.run(['$rootScope', '$location', 'Constants', 'localStorageService', function ($rootScope, $location, Constants, localStorageService) {
    $rootScope.$on('$routeChangeStart', function (event, next) {
        // Prevent opening login if logged in
        if ($location.path() === '/login' && localStorageService.get(Constants.Keys.USER_DATA) && localStorageService.get(Constants.Keys.TOKEN)) {
            event.preventDefault();
        }

        // Prevent opening admin if not logged in
        if ($location.path() === '/admin') {
            if (!localStorageService.get(Constants.Keys.USER_DATA) || !localStorageService.get(Constants.Keys.TOKEN)) {
                event.preventDefault();
                $location.path('/login');
            }
        }
    });
}]);

angular.module('flamingoApp').value('ENDPOINT', "http://localhost:8080/flamingo/rest"); //
