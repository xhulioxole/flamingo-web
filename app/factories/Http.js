/**
 * Author: Xhulio
 * Created Date: 2016-02-10 18:03.MD
 */

angular.module("flamingoApp").factory("Http", ['$http', function ($http) {
    return {
        GET: function (url, data) {
            return $http({
                url: url,
                method: "GET",
                params: data
            });
        },

        PUT: function (url, formData) {
            return $http({
                url: url,
                method: "PUT",
                data: formData,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
        },

        POST: function (url, formData) {
            return $http({
                url: url,
                method: "POST",
                data: formData,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
        },

        DELETE: function (url, data) {
            return $http({
                url: url,
                method: "DELETE",
                params: data
            })
        }
    }
}]);