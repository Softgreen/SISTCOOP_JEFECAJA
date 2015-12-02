'use strict';

/* jshint -W098 */
angular.module('cooperativa').controller('Cooperativa.TransaccionCliente.CuentaPersonal.CrearController',
    function ($scope, $state, $modal, toastr, SGDialog, CuentaBancariaService, TasaInteresService, SessionService, CajaService, VoucherService) {

        $scope.working = false;

        $scope.view = {
            sobregiro: false,
            transaccion: {
                numeroCuenta: undefined,
                tipoTransaccion: 0,
                monto: 0,
                referencia: undefined,
                limpiar: function () {
                    $scope.view.transaccion.numeroCuenta = undefined;
                    $scope.view.transaccion.tipoTransaccion = undefined;
                    $scope.view.transaccion.monto = 0;
                    $scope.view.transaccion.referencia = undefined;
                    $scope.view.load.limpiar();
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
            cuentaPersonal: undefined,
            titulares: undefined,
            limpiar: function () {
                $scope.view.load.cuentaPersonal = undefined;
                $scope.view.load.titulares = undefined;
            }
        };

        $scope.combo = {
            tipoTransaccion: undefined
        };
        $scope.combo.selected = {
            tipoTransaccion: undefined
        };

        $scope.access = {
            login: false
        };

        $scope.loadCombo = function () {
            $scope.combo.tipoTransaccion = [
                {denominacion: 'DEPOSITO'},
                {denominacion: 'RETIRO'}
            ];
        };
        $scope.loadCombo();

        $scope.searchCuentaPersonalNumeroCuenta = function ($event) {
            if (!angular.isUndefined($event)) {
                $event.preventDefault();
            }
            CuentaBancariaService.findCuentaByNumeroCuenta($scope.view.transaccion.numeroCuenta).then(
                function (response) {
                    $scope.view.load.cuentaPersonal = response;
                    toastr.info('Cuenta personal encontrada');
                },
                function error(err) {
                    toastr.warning('Cuenta personal no encontrada');
                }
            );
        };
        $scope.searchCuentaPersonalPopup = function ($event) {
            if (!angular.isUndefined($event)) {
                $event.preventDefault();
            }
            var modalInstance = $modal.open({
                animation: true,
                size: 'lg',
                templateUrl: 'modules/cooperativa/views/transaccionCliente/cuentaPersonal/form-buscar-popup.html',
                controller: 'Cooperativa.TransaccionCliente.CuentaPersonal.Crear.BuscarCuentaPopupController',
                resolve: {}
            });
            modalInstance.result.then(function (response) {
                $scope.view.load.cuentaPersonal = response;
                $scope.view.transaccion.numeroCuenta = $scope.view.load.cuentaPersonal.numeroCuenta;
                CuentaBancariaService.getTitulares($scope.view.load.cuentaPersonal.id).then(function (data) {
                    $scope.view.load.titulares = data;
                });
            }, function () {
            });
        };
        $scope.verFirmas = function () {
            var modalInstance = $modal.open({
                templateUrl: 'modules/cooperativa/views/transaccionCliente/cuentaPersonal/form-firmas-popup.html',
                controller: 'Cooperativa.TransaccionCliente.CuentaPersonal.Crear.FirmasPopupController',
                //size: 'lg',
                resolve: {
                    personas: function () {
                        var personas = [];
                        for (var i = 0; i < $scope.view.load.titulares.length; i++) {
                            personas.push($scope.view.load.titulares[i].personaNatural);
                        }
                        return personas;
                    }
                }
            });
            modalInstance.result.then(function () {
            }, function () {
            });
        };

        $scope.login = function () {
            var modalInstance = $modal.open({
                animation: true,
                templateUrl: 'modules/cooperativa/views/login/form-login.html',
                controller: 'Cooperativa.LoginController',
                resolve: {}
            });
            modalInstance.result.then(function (response) {
                $scope.view.load.cuentaPersonal = response;
            }, function () {
            });
        };

        $scope.save = function () {
            //verificar sobregiro
            if ($scope.combo.selected.tipoTransaccion.denominacion === 'RETIRO') {
                if ($scope.view.transaccion.monto > $scope.view.load.cuentaPersonal.saldo) {
                    SGDialog.confirm('Sobregiro', 'Esta cuenta no cuenta con saldo suficiente. Desea Realizar un SOBREGIRO?', function () {
                        $scope.crearTransaccion();
                    });
                } else {
                    $scope.crearTransaccion();
                }
            } else {
                $scope.crearTransaccion();
            }
        };

        $scope.crearTransaccion = function () {
            //verificar transaccion datos
            var modalInstance = $modal.open({
                animation: true,
                templateUrl: 'modules/cooperativa/views/transaccionCliente/cuentaPersonal/form-transaccion-cuentaPersonal-verificar.html',
                controller: 'Cooperativa.TransaccionCliente.CuentaPersonal.Crear.VerificarController',
                resolve: {
                    transaccion: function () {
                        return $scope.view.transaccion;
                    },
                    cuentaPersonal: function () {
                        return $scope.view.load.cuentaPersonal;
                    },
                    titulares: function () {
                        return $scope.view.load.titulares;
                    },
                    tipoTransaccion: function(){
                        return $scope.combo.selected.tipoTransaccion;
                    }
                }
            });
            modalInstance.result.then(function () {
                var transaccion = {};
                transaccion.numeroCuenta = $scope.view.transaccion.numeroCuenta;
                transaccion.referencia = $scope.view.transaccion.referencia;
                transaccion.interes = 0;
                if ($scope.combo.selected.tipoTransaccion.denominacion === 'DEPOSITO') {
                    transaccion.monto = $scope.view.transaccion.monto;
                } else if ($scope.combo.selected.tipoTransaccion.denominacion === 'RETIRO') {
                    transaccion.monto = 0 - $scope.view.transaccion.monto;
                } else {
                    alert('Operacion no permitida');
                    return;
                }

                $scope.working = true;
                SessionService.crearTransaccionBancaria(transaccion).then(
                    function (response) {
                        $scope.working = false;
                        toastr.success('Transaccion creada satisfactoriamente.');
                        CajaService.getVoucherTransaccionBancaria(response.id).then(function (voucher) {
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

        $scope.imprimir = function (item, saldo) {
            VoucherService.imprimirVoucherCuentaPersonal(item, saldo);
        };
        $scope.extornar = function (item, index) {
            SGDialog.confirmDelete('Transaccion', '', function () {
                SessionService.extornarTransaccion(item.idTransaccionBancaria).then(
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
