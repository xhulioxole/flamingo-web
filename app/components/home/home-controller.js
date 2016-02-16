/**
 * Created by Xhulio on 2/4/2016.
 */

angular.module("flamingoApp").controller("HomeCtrl", ['$scope', 'Http', 'NgMap', 'Utils', 'Constants', 'toastr',
    function ($scope, Http, NgMap, Utils, Constants, toastr) {
        $scope.map = null;
        $scope.render = true;
        $scope.statistics = [];
        $scope.filterData = {
            startDate: new Date(new Date().getTime() - (1000 * 60 * 60 * 24 * 31)), // On month before
            endDate: new Date()
        };

        $scope.invalidFilter = false;

        NgMap.getMap().then(function(map) {
            $scope.map = map;
        });

        var markerLimits = {
            NORMAL: 5,
            MEDIUM: 10,
            HIGH: 15
        };

        var markerIcons = {
            NORMAL: 'assets/images/markers/blue-marker.png',
            MEDIUM: 'assets/images/markers/yellow-marker.png',
            HIGH: 'assets/images/markers/red-marker.png'
        };

        $scope.mapConfig = {
            center:
            {
                lat: 41.327344,
                lng: 19.802750
            },
            zoom: 14
        };

        /**
         * Get initial data
         */
        function getMapStats() {
            var filterData = {
                startDate: $scope.filterData.startDate.getTime(),
                endDate: $scope.filterData.endDate.getTime()
            };
            Utils.showLoadingMask();
            $scope.statistics = [];
            Http.GET(Constants.Url.MAP_STATS, filterData)
                .then(function (success) {
                    $scope.statistics = success.data.mapStats;
                    formatMapStats();
                    $scope.selectedStatistic = $scope.statistics[0];
                }, function (error) {
                    toastr.error(Constants.Messages.GENERAL_ERROR);
                })
                .finally(function () {
                    Utils.hideLoadingMask();
                });
        }

        /**
         * Format map stats
         */
        function formatMapStats() {
            var vehiclesNumber;
            for (var i=0; i<$scope.statistics.length; i++) {
                vehiclesNumber = $scope.statistics[i].vehiclesNumber;
                if (vehiclesNumber <= markerLimits.NORMAL) {
                    $scope.statistics[i].icon = markerIcons.NORMAL;
                } else if (vehiclesNumber >= markerLimits.NORMAL && vehiclesNumber <= markerLimits.MEDIUM) {
                    $scope.statistics[i].icon = markerIcons.MEDIUM;
                } else {
                    $scope.statistics[i].icon = markerIcons.HIGH;
                }
            }
        }

        getMapStats();

        /**
         * Filter data
         */
        $scope.filter = function () {
            getMapStats();
        };

        /**
         * Validate filter on change
         */
        $scope.validateFilter = function () {
            $scope.invalidFilter = ($scope.filterData.startDate > $scope.filterData.endDate);
        };

        /**
         * Show info window on marker click
         * @param statistic
         */
        $scope.showIW = function (e, statistic) {
            $scope.selectedStatistic = statistic;
            $scope.map.showInfoWindow("marker-iw", $scope.selectedStatistic.location.name);
        }
    }
]);