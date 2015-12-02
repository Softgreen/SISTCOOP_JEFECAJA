'use strict';

angular.module('rrhh').factory('SucursalService', ['Restangular',
    function (Restangular) {

        var baseUrl = 'sucursales';

        return {
            crear: function (sucursal) {
                return Restangular.all(baseUrl).post(sucursal);
            },
            actualizar: function (idSucursal, sucursal) {
                return Restangular.one(baseUrl + '/' + idSucursal).customPUT(sucursal, '', {}, {});
            },
            desactivar: function (idSucursal) {
                return Restangular.all(baseUrl + '/' + idSucursal + '/desactivar').post();
            },
            getSucursal: function (idSucursal) {
                return Restangular.one(baseUrl + '/' + idSucursal).get();
            },
            getSucursales: function () {
                return Restangular.all(baseUrl).getList();
            },
            getAgencias: function (idSucursal) {
                return Restangular.all(baseUrl + '/' + idSucursal + '/agencias').getList();
            },
            crearAgencia: function (idSucursal, agencia) {
                return Restangular.all(baseUrl + '/' + idSucursal + '/agencias').post(agencia);
            },
            actualizarAgencia: function (idSucursal, idAgencia, agencia) {
                return Restangular.one(baseUrl + '/' + idSucursal + '/agencias/' + idAgencia).customPUT(agencia, '', {}, {});
            },
            desactivarAgencia: function (idSucursal, idAgencia) {
                return Restangular.all(baseUrl + '/' + idSucursal + '/agencias/' + idAgencia + '/desactivar').post();
            },

            findById: function (idSucursal) {
                return Restangular.one(baseUrl + '/' + idSucursal).get();
            },
            findByFilterText: function (filterText, offset, limit) {
                if (arguments.length === 0) {
                    return Restangular.all(baseUrl).getList();
                } else if (arguments.length === 1) {
                    return Restangular.all(baseUrl).getList({filterText: filterText}, {});
                } else if (arguments.length === 2) {
                    return Restangular.all(baseUrl).getList({filterText: filterText, offset: offset}, {});
                } else if (arguments.length === 3) {
                    return Restangular.all(baseUrl).getList({filterText: filterText, offset: offset, limit: limit}, {});
                } else if (arguments.length > 2) {
                    return Restangular.all(baseUrl).getList({filterText: filterText, offset: offset, limit: limit}, {});
                }
            },
            count: function (filterText) {
                if (arguments.length === 0) {
                    return Restangular.one(baseUrl + '/count').get();
                } else if (arguments.length === 1) {
                    return Restangular.one(baseUrl + '/count').get({'filterText': filterText}, {});
                }
            }

        };

    }]);
