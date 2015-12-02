'use strict';

/* jshint -W098 */
angular.module('socio').controller('Socio.CuentaPersonal.EditarCuentaPersonal.ResumenController',
    function ($scope, $state, toastr, cuentaPersonal, CuentaBancariaService) {

        $scope.view = {
            cuentaPersonal: cuentaPersonal
        };

        $scope.view.load = {
            titulares: [],
            beneficiarios: []
        };

        $scope.loadTitulares = function () {
            CuentaBancariaService.getTitulares($scope.view.cuentaPersonal.id).then(function (response) {
                $scope.view.load.titulares = response;
            });
        };
        $scope.loadTitulares();

        $scope.loadBeneficiarios = function () {
            CuentaBancariaService.getBeneficiarios($scope.view.cuentaPersonal.id).then(function (response) {
                $scope.view.load.beneficiarios = response;
            });
        };
        $scope.loadBeneficiarios();

    });
