/**
 * Created by Xhulio on 2/4/2016.
 */

window.onload = function () {
    google.charts.load('current', {'packages':['corechart']});
};


angular.module("flamingoApp").controller("StatisticsCtrl", ['$scope', 'Http', 'Constants', 'Utils',
    function ($scope, Http, Constants, Utils) {
        $scope.locationStatistics = [];
        $scope.dailyStatistics = [];
        $scope.weeklyStatistics = [];
        $scope.filterData = {
            locationId: -1, // Default all
            startDate: new Date(new Date().getTime() - (1000 * 60 * 60 * 24 * 31)), // On month before
            endDate: new Date()
        };
        $scope.invalidFilter = false;

        /**
         * Get locations
         */
        function getLocations() {
            Utils.showLoadingMask();
            Http.GET(Constants.Url.LOCATION, {})
                .then(function (success) {
                    if (success.data.error) {
                        toast.error(Constants.Messages.GENERAL_ERROR);
                    } else {
                        $scope.locations = success.data;
                        $scope.locations.unshift({_id: -1, name: ""});
                        getStats();
                    }
                }, function (error) {
                    console.log(error);
                })
                .finally(function () {
                    Utils.hideLoadingMask();
                })
        }

        /**
         * Get stats
         */
        function getStats() {
            var filterData = {
                locationId: $scope.filterData.locationId,
                startDate: $scope.filterData.startDate.getTime(),
                endDate: $scope.filterData.endDate.getTime()
            };
            Utils.showLoadingMask();
            Http.GET(Constants.Url.STATISTICS, filterData)
                .then(function (success) {
                    if (success.data.error) {
                        toast.error(Constants.Messages.GENERAL_ERROR);
                    } else {
                        $scope.locationStatistics = success.data.locationStatistics;
                        $scope.dailyStatistics = success.data.dailyStatistics;
                        $scope.weeklyStatistics = success.data.weeklyStatistics;
                        formatWeeklyStats();
                        formatDailyStats();
                        drawCharts();
                    }
                }, function (error) {
                    console.log(error);
                })
                .finally(function () {
                    Utils.hideLoadingMask();
                })
        }

        /**
         * Validate filter on change
         */
        $scope.validateFilter = function () {
            $scope.invalidFilter = ($scope.filterData.startDate > $scope.filterData.endDate);
        };

        getLocations();

        /**
         * Filter data
         */
        $scope.filter = function () {
          getStats();
        };

        /**
         * Draw Charts
         */
        function drawCharts() {
            drawLocationBasedStats();
            drawHourlyStats();
            drawWeeklyStats();
        }

        window.addEventListener("resize", function () {
            drawCharts();
        });

        /**
         * Draw location based stats
         */
        function drawLocationBasedStats () {
            // Create the data table.
            var data = new google.visualization.DataTable();
            data.addColumn('string', 'Zona');
            data.addColumn('number', 'Number');
            data.addRows($scope.locationStatistics);
            // Set chart options
            var options = {
                'title': 'Zonat me te renduara sipas %',
                'colors': ['#4285F4', '#DB4437'],
                backgroundColor: '#D6DDE3'
            };
            // Instantiate and draw our chart, passing in some options.
            var chart = new google.visualization.PieChart(document.getElementById('locations-statistics'));
            chart.draw(data, options);
        }

        /**
         * Draw hourly stats
         */
        function drawHourlyStats() {
            console.log(JSON.stringify($scope.dailyStatistics));
            var data = google.visualization.arrayToDataTable($scope.dailyStatistics);
            var options = {
                title: 'Nr i makinave gjate oreve',
                hAxis: {title: 'Ora', titleTextStyle: {color: '#444'}},
                vAxis: {minValue: 0},
                backgroundColor: '#D6DDE3'
            };
            var chart = new google.visualization.AreaChart(document.getElementById('hourly-statistics'));
            chart.draw(data, options);
        }

        /**
         * Draw most vehicles reservations
         */
        function drawWeeklyStats() {
            var data = google.visualization.arrayToDataTable($scope.weeklyStatistics);
            var options = {
                chart: {
                    title: 'Weekly Stats',
                    subtitle: '2016'
                },
                hAxis: {
                    baselineColor: 'red'
                },
                backgroundColor: '#D6DDE3'
            };
            var chart = new google.visualization.ColumnChart(document.getElementById('weekly-statistics'));
            chart.draw(data, options);
        }

        /**
         * Format daily stats
         */
        function formatDailyStats() {
            $scope.dailyStatistics.unshift(['Ora', 'Nr i Makinave']);
        }

        /**
         * Format weekly stats
         * Add color property
         */
        function formatWeeklyStats(){
            var colors = ["fill-color: #4285F4", "fill-color: #DB4437", "fill-color: #F4B400", "fill-color: #1B9E77", "fill-color: #D95F02", "fill-color: #7570B3", "fill-color: #DB4437"];
            for(var i=0; i<$scope.weeklyStatistics.length; i++) {
                $scope.weeklyStatistics[i].push(colors[i]);
            }
            $scope.weeklyStatistics.unshift(['Ditet', 'Nr i Makinave', {role: 'style'}]);
        }
    }
]);