/**
 * Author: Xhulio
 * Created Date: 2016-02-10 18:01.MD
 */

angular.module("flamingoApp").constant('Constants', {
    Url: {
        STATISTICS: '/statistics',
        CONTACT: '/support',
        LOGIN: '/user/login',
        PUSH: '/push',
        INITIAL: '/initial'
    },
    Messages: {
        GENERAL_ERROR: "Ndonje nje error!",
        SUCCESS_CONTACT: "Mesazhi u dergua me sukses!",
        ERROR_CONTACT: "Ndodhi nje gabim gjate dergimit te mesazhit!",
        LOGIN_ERROR: "Email / Password Gabim!",
        PUSH_SUCCESS: "Njoftimi u dergua!",
        PUSH_ERROR: "Njoftimi nuk u dergua!"
    }
});