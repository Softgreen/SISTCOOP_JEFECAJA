'use strict';
angular.module('mean').factory('PendienteCajaService', ['Restangular',
    function (Restangular) {

        return {
            findById: function (id) {
                return Restangular.one('pendiente', id).get();
            },
            getVoucherPendienteCaja: function (id) {
                return Restangular.one('pendiente/' + id + '/voucher').get();
            },
            getPendientes: function (idAgencia) {
              return Restangular.all('pendiente/reportePendienteCaja').getList({idAgencia: idAgencia});
            }
        };

    }]);
