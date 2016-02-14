
angular.module("flamingoApp").controller("AdminCtrl", ['$scope', 'Http', 'Constants', 'toastr',
    function ($scope, Http, Constants, toastr) {
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
            Http.GET(Constants.Url.INITIAL, {})
                .then(function (success) {
                    $scope.locations = success.data.locations;
                    $scope.messagess = success.data.messagess;
                }, function () {
                    toastr.error(Constants.Messages.GENERAL_ERROR)
                });
        }

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
            alert($scope.push);
            Http.POST(Constants.Url.PUSH, $scope.push)
                .then(function (success) {
                    $scope.push = {};
                    toastr.success(Constants.Messages.PUSH_SUCCESS);
                }, function (error) {
                    toastr.error(Constants.Messages.PUSH_ERROR);
                });
        };
    }
]);
