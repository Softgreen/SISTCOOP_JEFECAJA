'use strict';

/* jshint -W098 */
angular.module('rrhh').controller('Rrhh.Sucursal.CrearSucursalController',
    function ($scope, $state, toastr, SucursalService) {

        $scope.working = false;

        $scope.view = {
            sucursal: {}
        };

        $scope.save = function () {
            $scope.working = true;

            SucursalService.crear($scope.view.sucursal).then(
                function (response) {
                    toastr.success('Sucursal creada satisfactoriamente');
                    $scope.working = false;
                    $state.go('^.editar.resumen', {sucursal: response.id});
                },
                function error(err) {
                    toastr.error(err.data.message);
                }
            );
        };

    });
