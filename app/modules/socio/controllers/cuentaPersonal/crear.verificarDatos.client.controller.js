'use strict';

/* jshint -W098 */
angular.module('socio').controller('Socio.CuentaPersonal.VerificarCuentaPersonalController',
    function ($scope, $state, $modalInstance, toastr, cuentaPersonal, tipoCuenta, tipoPersona, persona, tipoDocumento, moneda) {

        $scope.view = {
            cuentaPersonal: cuentaPersonal,
            tipoCuenta: tipoCuenta,
            tipoPersona: tipoPersona,
            persona: persona,
            tipoDocumento: tipoDocumento,
            moneda: moneda
        };

        $scope.ok = function () {
            $modalInstance.close();
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

    });
