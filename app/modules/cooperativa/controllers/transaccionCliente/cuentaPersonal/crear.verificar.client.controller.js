'use strict';

/* jshint -W098 */
angular.module('cooperativa').controller('Cooperativa.TransaccionCliente.CuentaPersonal.Crear.VerificarController',
    function ($scope, $state, $modalInstance, toastr, transaccion, tipoTransaccion, cuentaPersonal, titulares, PersonaNaturalService) {

        $scope.view = {
            transaccion: transaccion,
            tipoTransaccion: tipoTransaccion,
            cuentaPersonal: cuentaPersonal,
            titulares: titulares
        };

        $scope.ok = function () {
            $modalInstance.close();
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

    }
);
