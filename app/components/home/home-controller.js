/**
 * Created by Xhulio on 2/4/2016.
 */

angular.module("flamingoApp").controller("HomeCtrl", ['$scope', function ($scope) {
    console.log("HomeCtrl");
    $scope.render = true;
    $scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };
}]);