
angular.module("flamingoApp").controller("AdminCtrl", ['$scope', 'Http', 'Constants', 'toastr', '$location', 'localStorageService', 'Utils',
    function ($scope, Http, Constants, toastr, $location, localStorageService, Utils) {
        $scope.push = {
            title: '',
            message: ''
        };
        $scope.locations = [];
        $scope.messages = [];
        $scope.views = {
            PUSH: 'components/admin/push/send_push.html',
            SUPPORT: 'components/admin/support/support.html',
            LOCATION: 'components/admin/location/location.html'
        };

        $scope.currentView = $scope.views.SUPPORT;

        getInitialData();

        /**
         * Get locations
         */
        function getInitialData() {
            Utils.showLoadingMask();
            Http.GET(Constants.Url.INITIAL, {})
                .then(function (success) {
                    $scope.locations = success.data.locations;
                    $scope.messages = success.data.messages;
                }, function () {
                    toastr.error(Constants.Messages.GENERAL_ERROR)
                })
                .finally(function () {
                    Utils.hideLoadingMask();
                });
        }

        /**
         * Logout
         */
        $scope.logout = function () {
            if (localStorageService.get(Constants.Keys.USER_DATA)) {
                localStorageService.remove(Constants.Keys.USER_DATA);
            }
            if (localStorageService.get(Constants.Keys.TOKEN)) {
                localStorageService.remove(Constants.Keys.TOKEN);
            }
            $location.path("/login");
        };

        /**
         * Change view
         * @param view
         */
        $scope.changeView = function (view) {
            $scope.currentView = view;
        };

        /**
         * Send push notification
         */
        $scope.sendPush = function () {
            Utils.showLoadingMask();
            Http.POST(Constants.Url.PUSH, $scope.push)
                .then(function (success) {
                    $scope.push = {};
                    toastr.success(Constants.Messages.PUSH_SUCCESS);
                }, function (error) {
                    toastr.error(Constants.Messages.PUSH_ERROR);
                })
                .finally(function () {
                    Utils.hideLoadingMask()
                })
        };
    }
]);
