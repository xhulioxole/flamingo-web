/**
 * Author: Xhulio
 * Created Date: 2016-02-10 18:06.MD
 */

angular.module("flamingoApp").factory("Utils", [function () {
    return {
        /**
         * Show Loading Mask
         * @nodeTree Takes node where to be shown
         * Add image ../app/images/ball-triangle-loader.svg
         */
        showLoadingMask: function () {
            var container = document.getElementById("loader-container");
            if (container !== null) {
                container.style.backgroundColor = "rgba(255, 255, 255, 0.5)";
                container.style.display = "block";
            }
        },

        hideLoadingMask: function () {
            var container = document.getElementById("loader-container");
            if (container !== null) {
                container.style.display = "none";
            }
        },

        /**
         * Build form data (key=value&key2=value2&)
         */
        buildFormData: function (data) {
            var str = "";
            var key;
            for (key in data) {
                if (data.hasOwnProperty(key)) {
                    if (data[key] !== null) {
                        str += key + "=" + data[key] + "&";
                    }
                }
            }
            return str.substr(0, str.length - 1);
        }
    }
}]);