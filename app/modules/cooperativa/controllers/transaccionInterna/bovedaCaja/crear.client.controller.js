'use strict';

/* jshint -W098 */
angular.module('cooperativa').controller('Cooperativa.TransaccionInterna.BovedaCaja.CrearController',
    function ($scope, $state, toastr, CAJA, SGDialog, BovedaService, CajaService, SessionService, VoucherService) {

        $scope.working = false;

        $scope.view = {};
        $scope.view.load = {
            detalle: undefined
        };

        $scope.combo = {
            boveda: undefined
        };
        $scope.combo.selected = {
            boveda: undefined
        };

        $scope.loadBovedas = function () {
            CajaService.getBovedas(CAJA.id).then(function (response) {
                $scope.combo.boveda = response;
            });
        };
        $scope.loadBovedas();

        $scope.$watch('combo.selected.boveda', function (newValue, oldValue) {
            if (angular.isDefined($scope.combo.selected.boveda)) {
                BovedaService.getDetalle($scope.combo.selected.boveda.id).then(function (response) {
                    angular.forEach(response, function (row) {
                        row.cantidad = 0;
                        row.subtotal = function () {
                            return this.valor * this.cantidad;
                        };
                    });
                    $scope.view.load.detalle = response;
                });
            }
        }, true);

        $scope.getTotal = function () {
            var total = 0;
            if ($scope.view.load.detalle) {
                for (var i = 0; i < $scope.view.load.detalle.length; i++) {
                    total = total + ($scope.view.load.detalle[i].valor * $scope.view.load.detalle[i].cantidad);
                }
            }
            return total;
        };

        $scope.save = function () {
            if ($scope.getTotal() > 0) {
                var transaccion = [];
                for (var i = 0; i < $scope.view.load.detalle.length; i++) {
                    transaccion[i] = {
                        valor: $scope.view.load.detalle[i].valor,
                        cantidad: $scope.view.load.detalle[i].cantidad
                    };
                }

                SGDialog.confirm('Guardar', 'Estas seguro de realizar la transaccion', function () {
                    $scope.working = true;
                    SessionService.crearTransaccionBovedaCajaOrigenCaja($scope.combo.selected.boveda.id, transaccion).then(
                        function (data) {
                            $scope.working = false;
                            toastr('Transaccion creada satisfactoriamente');
                            $state.transitionTo('^.buscar');
                        },
                        function error(err) {
                            toastr.error(err.data.message);
                        }
                    );
                });
            } else {
                toastr.warning('Monto de transaccion no valido');
            }
        };

    });
