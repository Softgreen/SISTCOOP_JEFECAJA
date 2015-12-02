'use strict';

/* jshint -W098 */
angular.module('socio').controller('Socio.CuentaPersonal.VerificarCrearChequeraController',
    function ($scope, $state, $modalInstance, toastr, cuentaPersonal, chequera) {

        $scope.view = {
            cuentaPersonal: cuentaPersonal,
            chequera: chequera
            /*tipoPersona: tipoPersona,
            persona: persona,
            tipoDocumento: tipoDocumento,
            moneda: moneda*/
        };

        $scope.ok = function () {
            $modalInstance.close();
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

    });
