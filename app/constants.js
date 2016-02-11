/**
 * Author: Xhulio
 * Created Date: 2016-02-10 18:01.MD
 */


var BaseConstants = {
    REST: "http://52.29.253.166:8080/rest"
};

angular.module("flamingoApp").constant('Constants', {
    Url: {
        STATISTICS: BaseConstants.REST + '/statistics',
        CONTACT: BaseConstants.REST + '/contact'
    },
    Messages: {
        SUCCESS_CONTACT: "Mesazhi u dergua me sukses!",
        ERROR_CONTACT: "Ndodhi nje gabim gjate dergimit te mesazhit!"
    }
});