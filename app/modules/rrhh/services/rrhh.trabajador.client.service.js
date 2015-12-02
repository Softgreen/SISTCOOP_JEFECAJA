'use strict';

angular.module('rrhh').factory('TrabajadorService', ['Restangular',
    function (Restangular) {

        var baseUrl = 'trabajadores';

        return {
            getTrabajador: function (idTrabajador) {
                return Restangular.one(baseUrl + '/' + idTrabajador).get();
            },
            getTrabajadores: function (idAgencia, filterText) {
                return Restangular.one(baseUrl).get({idAgencia: idAgencia, filterText: filterText});
            },
            crear: function (trabajador) {
                return Restangular.all(baseUrl).post(trabajador);
            },
            actualizar: function (idTrabajador, trabajador) {
                return Restangular.one(baseUrl + '/' + idTrabajador).customPUT(trabajador, '', {}, {});
            },
            desactivar: function (idTrabajador) {
                return Restangular.one(baseUrl + '/' + idTrabajador + '/desactivar').post();
            },

            findById: function (idSucursal) {
                return Restangular.one(baseUrl + '/' + idSucursal).get();
            }
        };

    }]);
