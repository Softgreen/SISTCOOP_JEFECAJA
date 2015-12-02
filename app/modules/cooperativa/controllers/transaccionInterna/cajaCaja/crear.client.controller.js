'use strict';

/* jshint -W098 */
angular.module('cooperativa').controller('Cooperativa.TransaccionInterna.CajaCaja.CrearController',
    function ($scope, $state, toastr, AGENCIA, CAJA, SGDialog, AgenciaService, CajaService, SessionService, VoucherService) {

        $scope.working = false;

        $scope.view = {
            monto: undefined,
            obervacion: undefined
        };

        $scope.combo = {
            caja: undefined,
            moneda: undefined
        };
        $scope.combo.selected = {
            caja: undefined,
            moneda: undefined
        };

        $scope.loadCombo = function () {
            AgenciaService.getCajas(AGENCIA.id).then(function (response) {
                $scope.combo.caja = response;
            });
            CajaService.getMonedas(CAJA.id).then(function (response) {
                $scope.combo.moneda = response;
            });
        };
        $scope.loadCombo();

        $scope.save = function () {
            SGDialog.confirm('Guardar', 'Estas seguro de realizar la transaccion', function () {
                $scope.working = true;
                SessionService.crearTransaccionCajaCaja($scope.combo.selected.caja.id, $scope.combo.selected.moneda.id, $scope.view.monto, $scope.view.observacion).then(
                    function (rseponse) {
                        $scope.working = false;
                        toastr('Transaccion creada satisfactoriamente');
                        $state.transitionTo('^.buscar');
                    }, function error(err) {
                        toastr.error(err.data.message);
                    }
                );
            });
        };

    });
