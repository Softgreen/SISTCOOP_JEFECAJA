'use strict';

angular.module('mean').factory('AgenciaService', ['Restangular',
    function (Restangular) {

        var baseUrl = 'agencias';

        return {
            crear: function (agencia) {
                return Restangular.all(baseUrl).post(agencia);
            },
            getAgencia: function (idAgencia) {
                return Restangular.one(baseUrl + '/' + idAgencia).get();
            },

            findById: function (id) {
                return Restangular.one(baseUrl + '/' + id).get();
            },


            getAgencias: function (estado) {
                return Restangular.all(baseUrl).getList({estado: estado});
            },
            getCajas: function (idAgencia) {
                return Restangular.all(baseUrl + '/' + idAgencia + '/cajas').getList();
            },
            getGirosEnviados: function (idAgencia, estado, filterText, desde, hasta) {
                return Restangular.all(baseUrl + '/' + idAgencia + '/giros/enviados').getList({
                    estado: estado,
                    filterText: filterText,
                    offset: desde,
                    limit: hasta
                });
            },
            getGirosRecibidos: function (idAgencia, estado, filterText, desde, hasta) {
                return Restangular.all(baseUrl + '/' + idAgencia + '/giros/recibidos').getList({
                    estado: estado,
                    filterText: filterText,
                    offset: desde,
                    limit: hasta
                });
            },
            countEnviados: function (idAgencia) {
                return Restangular.one(baseUrl + '/' + idAgencia + '/giros/enviados/count').get();
            },
            countRecibidos: function (idAgencia) {
                return Restangular.one(baseUrl + '/' + idAgencia + '/giros/recibidos/count').get();
            }

        };

    }]);
