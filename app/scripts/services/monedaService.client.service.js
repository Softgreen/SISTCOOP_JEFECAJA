'use strict';

angular.module('mean').factory('MonedaService', ['Restangular',
    function (Restangular) {
        var _monedaService = Restangular.all('monedas');
        var baseUrl = 'monedas';
        return {
            getMonedas: function () {
                return Restangular.all(baseUrl).getList();
            },
            getDenominaciones: function (moneda) {
                return Restangular.all(baseUrl + '/' + moneda + '/denominaciones').getList();
            }
        };

    }]);
