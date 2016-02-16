/**
 * Author: Xhulio
 * Created Date: 2016-02-10 17:51.MD
 */

angular.module("flamingoApp").controller("ContactCtrl", ['$scope', 'Http', 'toastr', 'Constants', 'Utils',
    function ($scope, Http, toastr, Constants, Utils) {
        $scope.support = {};

        /**
         * Send message
         */
        $scope.send = function () {
            var formData = {
                name: $scope.support.name,
                from: $scope.support.email,
                message: $scope.support.message
            }
            Utils.showLoadingMask();
            Http.PUT(Constants.Url.CONTACT, formData)
                .then(function (success) {
                    $scope.support = {};
                    toastr.success(Constants.Messages.SUCCESS_CONTACT);
                }, function (error) {
                    toastr.error(Constants.Messages.ERROR_CONTACT);
                })
                .finally(function () {
                    Utils.hideLoadingMask();
                })
        };
    }
]);
