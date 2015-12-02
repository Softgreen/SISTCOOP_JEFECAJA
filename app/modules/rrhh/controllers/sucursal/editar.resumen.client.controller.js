'use strict';

/* jshint -W098 */
angular.module('rrhh').controller('Rrhh.Sucursal.EditarSucursal.ResumenController',
    function ($scope, sucursal, SucursalService) {

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

    });
