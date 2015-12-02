'use strict';

/* jshint -W098 */
angular.module('socio').controller('Socio.CuentaPersonal.Chequera.BuscarController',
    function ($scope, $state, $modal, toastr, SGDialog, cuentaPersonal, CuentaBancariaService) {

        $scope.view = {
            cuentaPersonal: cuentaPersonal,
            chequera: {}
        };

        $scope.view.load = {
            chequeras: [],
            ultimaChequera: undefined
        };

        $scope.combo = {
            cantidad: [20, 50, 100]
        };
        $scope.combo.selected = {
            cantidad: undefined
        };

        $scope.loadChequeras = function () {
            CuentaBancariaService.getChequeras($scope.view.cuentaPersonal.id).then(function (response) {
                $scope.view.load.chequeras = response;
            });
        };
        $scope.loadChequeras();

        $scope.loadUltimaChequera = function () {
            CuentaBancariaService.getChequeraUltima($scope.view.cuentaPersonal.id).then(function (response) {
                $scope.view.load.ultimaChequera = response;
                if (angular.isUndefined(response)) {
                    $scope.view.chequera.numeroInicio = 1;
                } else {
                    $scope.view.chequera.numeroInicio = response.numeroFin + 1;
                }
            });
        };
        $scope.loadUltimaChequera();

        $scope.$watch('combo.selected.cantidad', function () {
            if (!angular.isUndefined($scope.combo.selected.cantidad)) {
                if (!angular.isUndefined($scope.view.chequera.numeroInicio)) {
                    $scope.view.chequera.numeroFin = $scope.view.chequera.numeroInicio + $scope.combo.selected.cantidad - 1;
                }
            }
        }, true);

        $scope.edit = function (row) {
            $state.go('^.editar', {chequera: row.id});
        };

        $scope.save = function () {
            var modalInstance = $modal.open({
                animation: true,
                templateUrl: 'modules/socio/views/cuentaPersonal/chequera/form-crear-chequera-verificarDatos.html',
                controller: 'Socio.CuentaPersonal.VerificarCrearChequeraController',
                resolve: {
                    cuentaPersonal: function () {
                        return $scope.view.cuentaPersonal;
                    },
                    chequera: function () {
                        return $scope.view.chequera;
                    }
                }
            });

            modalInstance.result.then(function (cuentaPersonal) {
                $scope.working = true;
                CuentaBancariaService.crearChequera($scope.view.cuentaPersonal.id, $scope.view.chequera.numeroFin - $scope.view.chequera.numeroInicio + 1).then(
                    function (response) {
                        toastr.success('Chequera creada');
                        $scope.working = false;
                        $scope.loadChequeras();
                    }, function error(err) {
                        toastr.error(err.data.message);
                    }
                );
            }, function () {
            });
        };

        /*$scope.eliminarBeneficiario = function (item) {
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
         };*/

    });
