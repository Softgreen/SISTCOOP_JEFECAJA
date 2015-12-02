'use strict';

/* jshint -W098 */
angular.module('rrhh').controller('Rrhh.Sucursal.Agencia.EditarAgenciaController',
    function ($scope, $state, sucursal, agencia, toastr, SucursalService) {

        $scope.working = false;

        $scope.view = {
            sucursal: sucursal,
            agencia: agencia
        };

        $scope.save = function () {
            $scope.working = true;

            SucursalService.actualizarAgencia($scope.view.sucursal.id, $scope.view.agencia.id, $scope.view.agencia).then(
                function (response) {
                    toastr.success('Agencia actualizada');
                    $scope.working = false;
                },
                function error(err) {
                    toastr.error(err.data.message);
                }
            );
        };

    });

