/**
 * Author: Xhulio
 * Created Date: 2016-02-10 18:01.MD
 */


var BaseConstants = {
    REST: "http://localhost:8080/flaming/rest"
};

angular.module("flamingoApp").constant('Constants', {
    Url: {
        STATISTICS: BaseConstants.REST + '/statistics',
        CONTACT: BaseConstants.REST + '/contact'
    }
});