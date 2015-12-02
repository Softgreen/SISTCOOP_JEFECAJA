'use strict';

/* jshint -W098 */
angular.module('rrhh').controller('Rrhh.Sucursal.Agencia.CrearAgenciaController',
    function ($scope, $state, toastr, sucursal, SucursalService) {

        $scope.working = false;

        $scope.view = {
            sucursal: sucursal,
            agencia: {}
        };

        $scope.save = function () {
            $scope.working = true;

            SucursalService.crearAgencia($scope.view.sucursal.id, $scope.view.agencia).then(
                function (response) {
                    toastr.success('Agencia creada satisfactoriamente');
                    $scope.working = false;
                    $state.go('^.editar', {agencia: response.id});
                },
                function error(err) {
                    toastr.error(err.data.message);
                }
            );

        };

    });
