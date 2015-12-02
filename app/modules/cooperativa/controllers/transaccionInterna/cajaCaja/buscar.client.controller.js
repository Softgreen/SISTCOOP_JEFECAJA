'use strict';

/* jshint -W098 */
angular.module('cooperativa').controller('Cooperativa.TransaccionInterna.CajaCaja.BuscarController',
    function ($scope, $state, toastr, CAJA, SGDialog, CajaService, SessionService, VoucherService) {

        $scope.gridOptions_enviado_noConfirmado = {
            data: [],
            enableRowSelection: true,
            enableRowHeaderSelection: false,
            multiSelect: false,

            columnDefs: [
                {field: 'hora', cellFilter: 'date: "dd/MM/yyyy HH:mm:ss"', displayName: 'FECHA', width: '26%'},
                {field: 'estadoConfirmacion', cellFilter: 'si_no: "CONFIRMADO"', displayName: 'E.CONFIRMACION', width: '20%'},
                {
                    name: 'monto',
                    displayName: 'MONTO',
                    cellTemplate: '' +
                    '<div style="text-align: right; padding-top: 5px; padding-right: 5px;">' +
                    '<span data-ng-bind="row.entity.moneda.simbolo"></span>' +
                    '<span data-ng-bind="row.entity.monto | currency: \'\'"></span>' +
                    '</div>',
                    width: '21%'
                },
                {field: 'historialCajaDestino.caja.abreviatura', displayName: 'DESTINO', width: '14%'},
                {
                    name: 'edit',
                    displayName: 'Edit',
                    cellTemplate: '' +
                    '<div style="text-align: center; padding-top: 5px;">' +
                    '<button type="button" data-ng-click="grid.appScope.gridActions.cancelar(row.entity)" data-ng-disabled="row.entity.estadoConfirmacion || !row.entity.estadoSolicitud" class="btn btn-danger btn-xs">Cancelar' +
                    '</button>' +
                    '</div>'
                }
            ]
        };
        $scope.gridOptions_enviado_confirmado = {
            data: [],
            enableRowSelection: true,
            enableRowHeaderSelection: false,
            multiSelect: false,

            columnDefs: [
                {field: 'hora', cellFilter: 'date: "dd/MM/yyyy HH:mm:ss"', displayName: 'FECHA', width: '26%'},
                {field: 'estadoConfirmacion', cellFilter: 'si_no: "CONFIRMADO"', displayName: 'E.CONFIRMACION', width: '20%'},
                {
                    name: 'monto',
                    displayName: 'MONTO',
                    cellTemplate: '' +
                    '<div style="text-align: right; padding-top: 5px; padding-right: 5px;">' +
                    '<span data-ng-bind="row.entity.moneda.simbolo"></span>' +
                    '<span data-ng-bind="row.entity.monto | currency: \'\'"></span>' +
                    '</div>',
                    width: '21%'
                },
                {field: 'historialCajaDestino.caja.abreviatura', displayName: 'DESTINO', width: '14%'},
                {
                    name: 'edit',
                    displayName: 'Edit',
                    cellTemplate: '' +
                    '<div style="text-align: center; padding-top: 5px;">' +
                    '<button type="button" data-ng-click="grid.appScope.gridActions.imprimir(row.entity)" data-ng-disabled="!row.entity.estadoConfirmacion" class="btn btn-info btn-xs">' +
                    '<i class="pficon pficon-print"></i>' +
                    '<span>&nbsp;Imprimir</span>' +
                    '</button>' +
                    '</div>'
                }
            ]
        };

        $scope.gridOptions_recibido_confirmado = {
            data: [],
            enableRowSelection: true,
            enableRowHeaderSelection: false,
            multiSelect: false,

            columnDefs: [
                {field: 'hora', cellFilter: 'date: "dd/MM/yyyy HH:mm:ss"', displayName: 'FECHA', width: '26%'},
                {field: 'estadoConfirmacion', cellFilter: 'si_no: "CONFIRMADO"', displayName: 'E.CONFIRMACION', width: '20%'},
                {
                    name: 'monto',
                    displayName: 'MONTO',
                    cellTemplate: '' +
                    '<div style="text-align: right; padding-top: 5px; padding-right: 5px;">' +
                    '<span data-ng-bind="row.entity.moneda.simbolo"></span>' +
                    '<span data-ng-bind="row.entity.monto | currency: \'\'"></span>' +
                    '</div>',
                    width: '21%'
                },
                {field: 'historialCajaOrigen.caja.abreviatura', displayName: 'ORIGEN', width: '14%'},
                {
                    name: 'edit',
                    displayName: 'Edit',
                    cellTemplate: '' +
                    '<div style="text-align: center; padding-top: 5px;">' +
                    '<button type="button" data-ng-click="grid.appScope.gridActions.imprimir(row.entity)" data-ng-disabled="!row.entity.estadoConfirmacion" class="btn btn-info btn-xs">' +
                    '<i class="pficon pficon-print"></i>' +
                    '<span>&nbsp;Imprimir</span>' +
                    '</button>' +
                    '</div>'
                }
            ]
        };
        $scope.gridOptions_recibido_noConfirmado = {
            data: [],
            enableRowSelection: true,
            enableRowHeaderSelection: false,
            multiSelect: false,

            columnDefs: [
                {field: 'hora', cellFilter: 'date: "dd/MM/yyyy HH:mm:ss"', displayName: 'FECHA', width: '24%'},
                {field: 'estadoConfirmacion', cellFilter: 'si_no: "CONFIRMADO"', displayName: 'E.CONFIRMACION', width: '18%'},
                {
                    name: 'monto',
                    displayName: 'MONTO',
                    cellTemplate: '' +
                    '<div style="text-align: right; padding-top: 5px; padding-right: 5px;">' +
                    '<span data-ng-bind="row.entity.moneda.simbolo"></span>' +
                    '<span data-ng-bind="row.entity.monto | currency: \'\'"></span>' +
                    '</div>',
                    width: '20%'
                },
                {field: 'historialCajaOrigen.caja.abreviatura', displayName: 'ORIGEN', width: '14%'},
                {
                    name: 'edit',
                    displayName: 'Edit',
                    cellTemplate: '' +
                    '<div style="text-align: center; padding-top: 5px;">' +
                    '<button type="button" data-ng-click="grid.appScope.gridActions.confirmar(row.entity)" data-ng-disabled="row.entity.estadoConfirmacion || !row.entity.estadoSolicitud" class="btn btn-info btn-xs">Confirmar' +
                    '</button>' +
                    '&nbsp;' +
                    '<button type="button" data-ng-click="grid.appScope.gridActions.cancelar(row.entity)" data-ng-disabled="row.entity.estadoConfirmacion || !row.entity.estadoSolicitud" class="btn btn-danger btn-xs">Cancelar' +
                    '</button>' +
                    '</div>'
                }
            ]
        };

        $scope.gridActions = {
            confirmar: function (row) {
                SGDialog.confirm('Confirmar transaccion', 'Estas seguro de confirmar la transaccion', function () {
                    SessionService.confirmarTransaccionCajaCaja(row.id).then(
                        function (response) {
                            toastr.success('Transaccion confirmada');
                            $scope.loadTransaccionEnviadas();
                            $scope.loadTransaccionRecibidas();
                        }, function error(err) {
                            toastr.error(err.data.message);
                        }
                    );
                });
            },
            cancelar: function (row) {
                SGDialog.confirm('Cancelar transaccion', 'Estas seguro de cancelar la transaccion', function () {
                    SessionService.cancelarTransaccionCajaCaja(row.id).then(
                        function (response) {
                            toastr.success('Transaccion cancelada');
                            $scope.loadTransaccionEnviadas();
                            $scope.loadTransaccionRecibidas();
                        }, function error(err) {
                            toastr.error(err.data.message);
                        }
                    );
                });
            },
            imprimir: function (row) {
                CajaService.getVoucherTransaccionCajaCaja(row.id).then(function (response) {
                    VoucherService.imprimirVoucherTransaccionCajaCaja(response);
                });
            }
        };

        $scope.loadTransaccionEnviadas = function () {
            CajaService.getTransaccionCajaCajaEnviadas(CAJA.id).then(function (response) {
                $scope.gridOptions_enviado_confirmado.data = [];
                $scope.gridOptions_enviado_noConfirmado.data = [];
                for (var i = 0; i < response.length; i++) {
                    if (response[i].estadoConfirmacion === true) {
                        $scope.gridOptions_enviado_confirmado.data.push(response[i]);
                    } else {
                        $scope.gridOptions_enviado_noConfirmado.data.push(response[i]);
                    }
                }
            });
        };
        $scope.loadTransaccionRecibidas = function () {
            CajaService.getTransaccionCajaCajaRecibidas(CAJA.id).then(function (response) {
                $scope.gridOptions_recibido_confirmado.data = [];
                $scope.gridOptions_recibido_noConfirmado.data = [];
                for (var i = 0; i < response.length; i++) {
                    if (response[i].estadoConfirmacion === true) {
                        $scope.gridOptions_recibido_confirmado.data.push(response[i]);
                    } else {
                        $scope.gridOptions_recibido_noConfirmado.data.push(response[i]);
                    }
                }
            });
        };

        $scope.loadTransaccionEnviadas();
        $scope.loadTransaccionRecibidas();

    });
