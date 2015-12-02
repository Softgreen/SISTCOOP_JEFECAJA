'use strict';

/* jshint -W098 */
angular.module('socio').controller('Socio.Socio.CuentaPersonal.BuscarCuentaPersonalController',
    function ($scope, $state, toastr, socio, SocioService) {

        $scope.view = {
            socio: socio
        };

        $scope.view.load = {
            cuentasPersonales: undefined
        };

        $scope.loadCuentasPersonales = function () {
            SocioService.getCuentasBancarias($scope.view.socio.id).then(function (response) {
                $scope.view.load.cuentasPersonales = response;
            });
        };
        $scope.loadCuentasPersonales();

        $scope.verCuentaPersonal = function (row) {
            $state.go('socio.app.socio.cuentaPersonal.editar', {cuentaPersonal: row.id});
        };

    });
