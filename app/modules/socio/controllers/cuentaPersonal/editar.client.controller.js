'use strict';

/* jshint -W098 */
angular.module('socio').controller('Socio.CuentaPersonal.EditarCuentaPersonalController',
    function ($scope, $window, $state, toastr, cuentaPersonal, CuentaBancariaService) {

        $scope.view = {
            cuentaPersonal: cuentaPersonal
        };

        $scope.congelar = function () {
            CuentaBancariaService.congelarCuentaBancaria($scope.view.cuentaPersonal.id).then(
                function (response) {
                    toastr.success('Cuenta congelada.');
                    $state.reload();
                },
                function error(err) {
                    toastr.error(err.data.message);
                }
            );
        };

        $scope.descongelar = function () {
            CuentaBancariaService.descongelarCuentaBancaria($scope.view.cuentaPersonal.id).then(
                function (response) {
                    toastr.success('Cuenta descongelada.');
                    $state.reload();
                },
                function error(err) {
                    toastr.error(err.data.message);
                }
            );
        };

        $scope.contrato = function(){
            $window.open(CuentaBancariaService.getUrlContrato($scope.view.cuentaPersonal.id));
        };

    });
