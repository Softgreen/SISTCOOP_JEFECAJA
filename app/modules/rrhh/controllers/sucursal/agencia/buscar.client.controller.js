'use strict';

/* jshint -W098 */
angular.module('rrhh').controller('Rrhh.Sucursal.Agencia.BuscarAgenciaController',
    function ($scope, $state, toastr, sucursal, SGDialog, SucursalService) {

        $scope.view = {
            sucursal: sucursal
        };

        $scope.loadObjects = {
            agencias: []
        };

        $scope.loadAgencias = function () {
            SucursalService.getAgencias($scope.view.sucursal.id).then(function (response) {
                $scope.loadObjects.agencias = response;
            });
        };
        $scope.loadAgencias();

        $scope.edit = function (row) {
            $state.go('^.editar', {agencia: row.id});
        };

        $scope.remove = function (row) {
            SGDialog.confirmDelete(row.denominacion, 'agencia', function () {
                SucursalService.desactivarAgencia($scope.view.sucursal.id, row.id).then(
                    function(response){
                        toastr.success('Agencia eliminada');
                        $scope.loadAgencias();
                    }, function error(err){
                        toastr.error(err.data.message);
                    }
                );
            });
        };

    });
