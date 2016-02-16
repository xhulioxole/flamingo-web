angular.module("flamingoApp").config(['$httpProvider', function($httpProvider) {
    // Interceptor
    $httpProvider.interceptors.push(['$q', '$location', 'localStorageService', 'Constants', function ($q, $location, localStorageService, Constants) {
        return {
            'request': function (config) {
                config.headers = config.headers || {};
                if (localStorageService.get(Constants.Keys.USER_DATA) && localStorageService.get(Constants.Keys.TOKEN)) {
                    config.headers.Authorization = "Bearer " + localStorageService.get(Constants.Keys.TOKEN);
                }
                return config;
            },
            'responseError': function (response) {
                if (response.status === 401 && response.data.error && response.data.error.message == "401") {
                    // response.message == 401 means that was sent an authorized request
                    if (localStorageService.get(Constants.Keys.USER_DATA)) {
                        localStorageService.remove(Constants.Keys.USER_DATA);
                    }
                    $location.path('/login');
                }
                return $q.reject(response);
            }
        };
    }]);
}]);