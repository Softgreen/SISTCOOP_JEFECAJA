'use strict';

/* jshint -W098 */
angular.module('rrhh').controller('Rrhh.Sucursal.EditarSucursal.DatosPrincipalesController',
    function ($state, $scope, toastr, sucursal, SucursalService) {

        $scope.working = false;

        $scope.view = {
            sucursal: sucursal
        };

        $scope.save = function () {
            $scope.working = true;

            SucursalService.actualizar($scope.view.sucursal.id, $scope.view.sucursal).then(
                function (response) {
                    $scope.working = false;
                    toastr.success('Sucursal actualizada');
                },
                function error(err) {
                    toastr.error(err.data.message);
                }
            );

        };

    });
