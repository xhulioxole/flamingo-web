/**
 * Created by Xhulio on 2/14/2016.
 */

angular.module("flamingoApp").controller("LoginCtrl", ['$scope', 'Http', 'toastr', '$location', 'localStorageService', 'Constants', 'Utils',
    function ($scope, Http, toastr, $location, localStorageService, Constants, Utils) {
        $scope.user = {
            email: '',
            password: ''
        };

        /**
         * Do login
         */
        $scope.login = function () {
            Utils.showLoadingMask();
            Http.POST(Constants.Url.LOGIN, $scope.user)
                .then(function (success) {
                    var response = success.data ? success.data : success;
                    if (response.error) {
                        toastr.error(Constants.Messages.LOGIN_ERROR);
                    } else {
                        localStorageService.set(Constants.Keys.USER_DATA, response.user);
                        localStorageService.set(Constants.Keys.TOKEN, response.token);
                        $location.path("/admin");
                    }
                }, function (error) {
                    toastr.error(Constants.Messages.LOGIN_ERROR);
                })
                .finally(function () {
                    Utils.hideLoadingMask();
                })
        };
    }
]);