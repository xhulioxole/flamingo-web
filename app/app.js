'use strict';

// Declare app level module which depends on views, and components
angular.module('flamingoApp', [
    'ngRoute',
    'uiGmapgoogle-maps',
    'toastr',
    'ui.bootstrap.datetimepicker'
])

.run(['$rootScope', '$location', 'Constants', function ($rootScope, $location, Constants) {
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
