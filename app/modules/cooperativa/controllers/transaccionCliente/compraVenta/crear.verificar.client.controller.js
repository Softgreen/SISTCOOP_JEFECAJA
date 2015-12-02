'use strict';

/* jshint -W098 */
angular.module('cooperativa').controller('Cooperativa.TransaccionCliente.CompraVenta.Crear.VerificarController',
    function ($scope, $state, $modalInstance, toastr, transaccion, operacion) {

        $scope.view = {
            transaccion: transaccion,
            operacion: operacion
        };

        $scope.ok = function () {
            $modalInstance.close();
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

    }
);
