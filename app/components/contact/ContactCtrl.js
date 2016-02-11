/**
 * Author: Xhulio
 * Created Date: 2016-02-10 17:51.MD
 */

angular.module("flamingoApp").controller("ContactCtrl", ['$scope', function ($scope) {
    $scope.support = {};

    /**
     * Send message
     */
    $scope.send = function () {
        console.log($scope.support);
    };
}]);