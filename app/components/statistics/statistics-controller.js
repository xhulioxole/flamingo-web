/**
 * Created by Xhulio on 2/4/2016.
 */

window.onload = function () {
    google.charts.load('current', {'packages':['corechart']});
};


angular.module("flamingoApp").controller("StatisticsCtrl", ['$scope', function ($scope) {

    $scope.locations = [
        {
            _id: -1,
            name: ""
        },
        {
            _id: 1,
            name: "21 Dhjetori"
        },
        {
            _id: 2,
            name: "Zogu i Zi"
        }
    ];

    $scope.filterData = {
        locationId: -1, // Default all
        startDate: new Date(new Date().getTime() - (1000 * 60 * 60 * 24 * 31)), // On month before
        endDate: new Date()
    };
    $scope.invalidFilter = false;
    /**
     * Validate filter on change
     */
    $scope.validateFilter = function () {
        $scope.invalidFilter = (($scope.filterData.startDate > $scope.filterData.endDate) || ($scope.filterData.endDate > new Date().getTime()));
    };

    /**
     * Filter data
     */
    $scope.filter = function () {
      console.log($scope.filterData);
    };

    drawLocationStatistics();
    drawMonthlyReservations();
    drawVehicleReservations();


    window.addEventListener("resize", function () {
        drawLocationStatistics();
        drawMonthlyReservations();
        drawVehicleReservations();
    });

    /**
     * Draw Prefered Locations
     */
    function drawLocationStatistics() {

        // Create the data table.
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Locations');
        data.addColumn('number', 'Number');
        data.addRows([
            ['Zogu i Zi', 3],
            ['Inxhinieri Ndertimit', 1]
        ]);

        // Set chart options
        var options = {
            'title': 'Zonat me te renduara sipas %',
            'colors': ['#4285F4', '#DB4437']
        };

        // Instantiate and draw our chart, passing in some options.
        var chart = new google.visualization.PieChart(document.getElementById('locations-statistics'));
        chart.draw(data, options);
    }

    /**
     * Draw Monthly reservations
     */
    function drawMonthlyReservations() {
        var data = google.visualization.arrayToDataTable([
            ['Ora', 'Nr i Makinave'],
            ['00', 1000],
            ['01', 2000],
            ['02', 500],
            ['03', 3000],
            ['04', 1500],
            ['05', 4000],
            ['06', 2500],
            ['07', 5000],
            ['08', 3500],
            ['09', 6000],
            ['10', 4500],
            ['11', 7000],
            ['12', 5500],
            ['13', 8000],
            ['14', 6500],
            ['15', 1000],
            ['16', 130],
            ['17', 1230],
            ['18', 130],
            ['19', 330],
            ['20', 230],
            ['21', 110],
            ['22', 1210],
            ['23', 1130]
        ]);

        var options = {
            title: 'Nr i makinave gjate diteve',
            hAxis: {title: 'Ora', titleTextStyle: {color: '#444'}},
            vAxis: {minValue: 0}
        };

        var chart = new google.visualization.AreaChart(document.getElementById('hourly-statistics'));
        chart.draw(data, options);
    }

    /**
     * Draw most vehicles reservations
     */
    function drawVehicleReservations() {
        var data = google.visualization.arrayToDataTable([
            ['Ditet', 'Nr i Makinave', {role: 'style'}],
            ['E Hene', 1000, 'fill-color: #4285F4'],
            ['E Marte', 2000, 'fill-color: #DB4437'],
            ['E Merkure', 3000, 'fill-color: #F4B400'],
            ['E Enjte', 4000, 'fill-color: #1B9E77'],
            ['E Premte', 300, 'fill-color: #D95F02'],
            ['E Shtune', 1500, 'fill-color: #7570B3'],
            ['E Diele', 1500, 'fill-color: #DB4437']
        ]);

        var options = {
            chart: {
                title: 'Car Reservations',
                subtitle: '2015'
            },
            hAxis: {
                baselineColor: 'red'
            }
        };

        var chart = new google.visualization.ColumnChart(document.getElementById('weekly-statistics'));
        chart.draw(data, options);
    }
}]);