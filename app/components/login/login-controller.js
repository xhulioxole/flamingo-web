/**
 * Created by Xhulio on 2/14/2016.
 */

angular.module("flamingoApp").controller("LoginCtrl", ['$scope', 'Http', 'toastr', '$location',
    function ($scope, Http, toastr, $location) {
        $scope.user = {
            email: '',
            password: ''
        };

        /**
         * Do login
         */
        $scope.login = function () {
            Http.POST(Constants.Url.LOGIN, $scope.user)
                .then(function (success) {
                    var response = success.data ? success.data : success;
                    if (response.error) {
                        toastr.error(Constants.Messages.LOGIN_ERROR);
                    } else {
                        window.localStorage["flamingoData"] = response.token;
                        window.localStorage["flamingoData"] = response.user;
                        $location.path("/admin");
                    }
                }, function (error) {
                    toastr.error(Constants.Messages.LOGIN_ERROR);
                });
            console.log($scope.user);
        };
    }
]);