/**
 * Author: Xhulio
 * Created Date: 2016-02-10 18:01.MD
 */


var BaseConstants = {
    REST: "http://localhost:8080/flamingo/rest"
};

angular.module("flamingoApp").constant('Constants', {
    Url: {
        STATISTICS: BaseConstants.REST + '/statistics',
        CONTACT: BaseConstants.REST + '/support'
    },
    Messages: {
        SUCCESS_CONTACT: "Mesazhi u dergua me sukses!",
        ERROR_CONTACT: "Ndodhi nje gabim gjate dergimit te mesazhit!"
    }
});