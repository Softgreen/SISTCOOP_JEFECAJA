'use strict';
angular.module('cooperativa').factory('PendienteCajaService', ['Restangular',
    function (Restangular) {

        return {
            findById: function (id) {
                return Restangular.one('pendiente', id).get();
            },
            getVoucherPendienteCaja: function (id) {
                return Restangular.one('pendiente/' + id + '/voucher').get();
            }
        };

    }]);
