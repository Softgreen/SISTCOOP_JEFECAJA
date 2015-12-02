'use strict';

/* jshint -W098 */
angular.module('socio').controller('Socio.CuentaPersonal.EditarCuentaPersonal.BeneficiariosController',
    function ($scope, $state, toastr, SGDialog, cuentaPersonal, CuentaBancariaService) {

        $scope.view = {
            cuentaPersonal: cuentaPersonal,
            beneficiario: {}
        };

        $scope.view.load = {
            beneficiarios: []
        };

        $scope.loadBeneficiarios = function () {
            CuentaBancariaService.getBeneficiarios($scope.view.cuentaPersonal.id).then(function (response) {
                $scope.view.load.beneficiarios = response;
            });
        };
        $scope.loadBeneficiarios();

        $scope.asignarBeneficiario = function (item) {
            SGDialog.confirm('Guardar', 'Estas seguro de querer asignar permanentemente este titular?', function () {
                var titular = {
                    idTipoDocumento: $scope.view.load.persona.tipoDocumento.id,
                    numeroDocumento: $scope.view.load.persona.numeroDocumento
                };
                CuentaBancariaService.addTitular($scope.view.cuentaPersonal.id, titular).then(
                    function (response) {
                        toastr.info('Titular asignado');
                        $scope.loadTitulares();
                    }, function error(err) {
                        toastr.warning(err.data.message);
                    }
                );
            });
        };

        $scope.eliminarBeneficiario = function (item) {
            SGDialog.confirmDelete('Titular', 'titular', function () {
                CuentaBancariaService.eliminarTitular($scope.view.cuentaPersonal.id, item.id).then(
                    function (response) {
                        toastr.info('Titular eliminado');
                        $scope.loadTitulares();
                    }, function error(err) {
                        toastr.warning(err.data.message);
                    }
                );
            });
        };

    });
