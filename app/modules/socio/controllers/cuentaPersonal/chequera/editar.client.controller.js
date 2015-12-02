'use strict';

/* jshint -W098 */
angular.module('socio').controller('Socio.CuentaPersonal.Chequera.EditarController',
    function ($scope, $state, cuentaPersonal, chequera, CuentaBancariaService) {

        $scope.view = {
            cuentaPersonal: cuentaPersonal,
            chequera: chequera
        };

        $scope.view.load = {
            cheques: []
        };

        $scope.loadCheques = function () {
            CuentaBancariaService.getCheques($scope.view.cuentaPersonal.id, $scope.view.chequera.id).then(function (response) {
                $scope.view.load.cheques = response;
            });
        };
        $scope.loadCheques();


    });
