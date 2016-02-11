/**
 * Created by Xhulio on 2/4/2016.
 */

window.onload = function () {
    google.charts.load('current', {'packages':['corechart']});
    // Set a callback to run when the Google Visualization API is loaded.
};


angular.module("flamingoApp").controller("StatisticsCtrl", ['$scope', function ($scope) {

    // TODO - google onLoadCallback
    drawPreferredLocations();
    drawMonthlyReservations();
    drawVehicleReservations();


    window.addEventListener("resize", function () {
        drawPreferredLocations();
        drawMonthlyReservations();
        drawVehicleReservations();
    });

    /**
     * Draw Prefered Locations
     */
    function drawPreferredLocations() {

        // Create the data table.
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Locations');
        data.addColumn('number', 'Number');
        data.addRows([
            ['Tirane', 3],
            ['Durres', 1]
        ]);

        // Set chart options
        var options = {
            'title': 'Preferred locations',
            'colors': ['#4285F4', '#DB4437']
        };

        // Instantiate and draw our chart, passing in some options.
        var chart = new google.visualization.PieChart(document.getElementById('pie-chart-container'));
        chart.draw(data, options);
    }

    /**
     * Draw Monthly reservations
     */
    function drawMonthlyReservations() {
        var data = google.visualization.arrayToDataTable([
            ['Day', 'Reservations'],
            ['1', 1000],
            ['2', 2000],
            ['3', 500],
            ['4', 3000],
            ['5', 1500],
            ['6', 4000],
            ['7', 2500],
            ['8', 5000],
            ['9', 3500],
            ['10', 6000],
            ['11', 4500],
            ['12', 7000],
            ['13', 5500],
            ['14', 8000],
            ['15', 6500],
            ['16', 1000],
            ['17', 130],
            ['18', 1230],
            ['19', 130],
            ['20', 330],
            ['21', 230],
            ['22', 110],
            ['23', 1210],
            ['24', 1130],
            ['25', 1230],
            ['26', 330],
            ['27', 1503],
            ['28', 1032],
            ['29', 140],
            ['30', 110],
            ['31', 110]
        ]);

        var options = {
            title: 'Monthly Rezervations',
            hAxis: {title: 'Month', titleTextStyle: {color: '#444'}},
            vAxis: {minValue: 0}
        };

        var chart = new google.visualization.AreaChart(document.getElementById('area-chart-container'));
        chart.draw(data, options);
    }

    /**
     * Draw most vehicles reservations
     */
    function drawVehicleReservations() {
        var data = google.visualization.arrayToDataTable([
            ['Vehicles', 'Reservations', {role: 'style'}],
            ['Mazda RX8', 1000, 'fill-color: #4285F4'],
            ['Porche CarreraGT', 2000, 'fill-color: #DB4437'],
            ['Lamborghini Murcielago', 3000, 'fill-color: #F4B400'],
            ['Mclaren', 4000, 'fill-color: #1B9E77'],
            ['Ferrari', 300, 'fill-color: #D95F02'],
            ['BMW', 1500, 'fill-color: #7570B3']
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

        var chart = new google.visualization.ColumnChart(document.getElementById('column-chart-container'));
        chart.draw(data, options);
    }
}]);