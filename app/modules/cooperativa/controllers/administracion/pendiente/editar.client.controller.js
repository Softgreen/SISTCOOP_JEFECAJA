'use strict';

/* jshint -W098 */
angular.module('cooperativa').controller('Cooperativa.Administracion.Pendiente.EditarController',
    function ($scope, $state, CAJA, historial, CajaService) {

        $scope.view = {
            historial: historial
        };
        $scope.view.load = {
            balanceCaja: undefined
        };

        $scope.loadBalanceCaja = function () {
            CajaService.getVoucherCierreCaja(CAJA.id, $scope.view.historial.id).then(function (response) {
                $scope.view.load.balanceCaja = response;
                console.log(response);
                console.log(response.length);
            });
        };
        $scope.loadBalanceCaja();

    }
);
