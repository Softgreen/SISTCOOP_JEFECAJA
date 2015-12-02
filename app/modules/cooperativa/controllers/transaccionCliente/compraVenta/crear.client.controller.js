'use strict';

/* jshint -W098 */
angular.module('cooperativa').controller('Cooperativa.TransaccionCliente.CompraVenta.CrearController',
    function ($scope, $state, $modal, toastr, SGDialog, TasaInteresService, SessionService, CajaService, VoucherService) {

        $scope.working = false;

        $scope.view = {
            transaccion: {
                cliente: undefined,
                tipoCambio: 0,
                montoRecibido: 0,
                montoEntregado: 0,
                limpiar: function () {
                    $scope.view.transaccion.cliente = undefined;
                    $scope.view.transaccion.tipoCambio = 0;
                    $scope.view.transaccion.montoRecibido = 0;
                    $scope.view.transaccion.montoEntregado = 0;
                }
            },
            voucher: {
                list: [],
                limpiar: function () {
                    $scope.view.voucher.list = [];
                }
            }
        };
        $scope.view.load = {
            tipoCambio: undefined
        };

        $scope.combo = {
            operacion: undefined
        };
        $scope.combo.selected = {
            operacion: undefined
        };
        $scope.combo.groupFn = function (item) {
            return item.tipo;
        };

        $scope.access = {
            login: false
        };

        $scope.loadCombo = function () {
            $scope.combo.operacion = [
                {
                    denominacion: 'Compra Dolar (USD)',
                    tipo: 'COMPRA',
                    idMonedaRecibida: 0,
                    idMonedaEntregada: 1,
                    simboloMonedaRecibida: '$',
                    simboloMonedaEntregada: 'S/.',
                    denominacionMonedaRecibida: 'Dolares americanos',
                    denominacionMonedaEntregada: 'Nuevos soles'
                },
                {
                    denominacion: 'Venta Dolar (USD)',
                    tipo: 'VENTA',
                    idMonedaRecibida: 1,
                    idMonedaEntregada: 0,
                    simboloMonedaRecibida: 'S/.',
                    simboloMonedaEntregada: '$',
                    denominacionMonedaRecibida: 'Nuevos soles',
                    denominacionMonedaEntregada: 'Dolares americanos'
                },
                {
                    denominacion: 'Compra Euro (EUR)',
                    tipo: 'COMPRA',
                    idMonedaRecibida: 2,
                    idMonedaEntregada: 1,
                    simboloMonedaRecibida: 'E',
                    simboloMonedaEntregada: 'S/.',
                    denominacionMonedaRecibida: 'Euros',
                    denominacionMonedaEntregada: 'Nuevos soles'
                },
                {
                    denominacion: 'Venta Dolar (EUR)',
                    tipo: 'VENTA',
                    idMonedaRecibida: 1,
                    idMonedaEntregada: 2,
                    simboloMonedaRecibida: 'S/.',
                    simboloMonedaEntregada: 'E',
                    denominacionMonedaRecibida: 'Nuevos soles',
                    denominacionMonedaEntregada: 'Euros'
                }
            ];
        };
        $scope.loadCombo();

        $scope.loadTipoCambio = function () {
            $scope.$watch('combo.selected.operacion', function (newValue, oldValue) {
                if (angular.isDefined($scope.combo.selected.operacion)) {
                    TasaInteresService.getTasaCambio($scope.combo.selected.operacion.idMonedaRecibida, $scope.combo.selected.operacion.idMonedaEntregada).then(function (response) {
                        $scope.view.transaccion.tipoCambio = response.valor;
                    });
                } else {
                    $scope.view.transaccion.tipoCambio = 0;
                }
            }, true);
        };
        $scope.loadTipoCambio();

        $scope.loadMontoRecibidoEntregado = function () {
            $scope.$watch('view.transaccion.montoRecibido', function (newValue, oldValue) {
                if (angular.isDefined($scope.combo.selected.operacion)) {
                    if ($scope.combo.selected.operacion.tipo === 'COMPRA') {
                        $scope.view.transaccion.montoEntregado = $scope.view.transaccion.montoRecibido * $scope.view.transaccion.tipoCambio;
                    }
                } else {
                    $scope.view.transaccion.montoRecibido = 0;
                    $scope.view.transaccion.montoEntregado = 0;
                }
            }, true);
            $scope.$watch('view.transaccion.montoEntregado', function (newValue, oldValue) {
                if (angular.isDefined($scope.combo.selected.operacion)) {
                    if ($scope.combo.selected.operacion.tipo === 'VENTA') {
                        $scope.view.transaccion.montoRecibido = $scope.view.transaccion.montoEntregado * $scope.view.transaccion.tipoCambio;
                    }
                } else {
                    $scope.view.transaccion.montoRecibido = 0;
                    $scope.view.transaccion.montoEntregado = 0;
                }
            }, true);
        };
        $scope.loadMontoRecibidoEntregado();

        $scope.login = function () {
            var modalInstance = $modal.open({
                animation: true,
                templateUrl: 'modules/cooperativa/views/login/form-login.html',
                controller: 'Cooperativa.LoginController',
                resolve: {}
            });
            modalInstance.result.then(function () {
                $scope.access.login = true;
            }, function () {
            });
        };

        $scope.save = function () {
            var modalInstance = $modal.open({
                animation: true,
                templateUrl: 'modules/cooperativa/views/transaccionCliente/compraVenta/form-transaccion-compraVenta-verificar.html',
                controller: 'Cooperativa.TransaccionCliente.CompraVenta.Crear.VerificarController',
                resolve: {
                    transaccion: function () {
                        return $scope.view.transaccion;
                    },
                    operacion: function () {
                        return $scope.combo.selected.operacion;
                    }
                }
            });
            modalInstance.result.then(function () {
                var transaccion = {};
                transaccion.tipoOperacion = $scope.combo.selected.operacion.tipo;
                transaccion.idMonedaRecibida = $scope.combo.selected.operacion.idMonedaRecibida;
                transaccion.idMonedaEntregada = $scope.combo.selected.operacion.idMonedaEntregada;
                transaccion.montoRecibido = $scope.view.transaccion.montoRecibido;
                transaccion.montoEntregado = $scope.view.transaccion.montoEntregado;
                transaccion.tasaCambio = $scope.view.transaccion.tipoCambio;
                transaccion.referencia = $scope.view.transaccion.cliente;
                $scope.working = true;
                SessionService.crearTransaccionCompraVenta(transaccion).then(
                    function (response) {
                        $scope.working = false;
                        toastr.success('Transaccion creada satisfactoriamente.');
                        //$state.go('app.transaccion.compraVentaVoucher', {id: response.id});
                        CajaService.getVoucherCompraVenta(response.id).then(function (voucher) {
                            $scope.view.voucher.list.push(voucher);
                        });
                    },
                    function error(err) {
                        toastr.error(err.data.message);
                    }
                );
            }, function () {
            });
        };

        $scope.imprimir = function (item) {
            VoucherService.imprimirVoucherCompraVenta(item);
        };
        $scope.extornar = function (item, index) {
            SGDialog.confirmDelete('Transaccion', '', function () {
                SessionService.extornarTransaccion(item.id).then(
                    function (response) {
                        toastr.success('Transaccion extornada satisfactoriamente.');
                        $scope.view.voucher.list.splice(index, 1);
                    }, function error(err) {
                        toastr.error(err.data.message);
                        $scope.search();
                    }
                );
            });
        };

    }
);
