'use strict';

/* jshint -W098 */
angular.module('cooperativa').controller('Cooperativa.TransaccionInterna.BovedaCaja.BuscarController',
    function ($scope, $state, toastr, CAJA, SGDialog, CajaService, SessionService, VoucherService) {

        $scope.gridOptions_enviado_noConfirmado = {
            data: [],
            enableRowSelection: true,
            enableRowHeaderSelection: false,
            multiSelect: false,

            columnDefs: [
                {field: 'hora', cellFilter: 'date: "dd/MM/yyyy HH:mm:ss"', displayName: 'FECHA', width: '27%'},
                {field: 'estadoConfirmacion', cellFilter: 'si_no: "CONFIRMADO"', displayName: 'E.CONFIRMACION', width: '20%'},
                {
                    name: 'monto',
                    displayName: 'MONTO',
                    cellTemplate: '' +
                    '<div style="text-align: right; padding-top: 5px; padding-right: 5px;">' +
                    '<span data-ng-bind="row.entity.simboloMoneda"></span>' +
                    '<span data-ng-bind="row.entity.monto | currency: \'\'"></span>' +
                    '</div>',
                    width: '23%'
                },
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
                {field: 'hora', cellFilter: 'date: "dd/MM/yyyy HH:mm:ss"', displayName: 'FECHA', width: '27%'},
                {field: 'estadoConfirmacion', cellFilter: 'si_no: "CONFIRMADO"', displayName: 'E.CONFIRMACION', width: '20%'},
                {
                    name: 'monto',
                    displayName: 'MONTO',
                    cellTemplate: '' +
                    '<div style="text-align: right; padding-top: 5px; padding-right: 5px;">' +
                    '<span data-ng-bind="row.entity.simboloMoneda"></span>' +
                    '<span data-ng-bind="row.entity.monto | currency: \'\'"></span>' +
                    '</div>',
                    width: '23%'
                },
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
                {field: 'hora', cellFilter: 'date: "dd/MM/yyyy HH:mm:ss"', displayName: 'FECHA', width: '27%'},
                {field: 'estadoConfirmacion', cellFilter: 'si_no: "CONFIRMADO"', displayName: 'E.CONFIRMACION', width: '20%'},
                {
                    name: 'monto',
                    displayName: 'MONTO',
                    cellTemplate: '' +
                    '<div style="text-align: right; padding-top: 5px; padding-right: 5px;">' +
                    '<span data-ng-bind="row.entity.simboloMoneda"></span>' +
                    '<span data-ng-bind="row.entity.monto | currency: \'\'"></span>' +
                    '</div>',
                    width: '23%'
                },
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
                {field: 'hora', cellFilter: 'date: "dd/MM/yyyy HH:mm:ss"', displayName: 'FECHA', width: '27%'},
                {field: 'estadoConfirmacion', cellFilter: 'si_no: "CONFIRMADO"', displayName: 'E.CONFIRMACION', width: '20%'},
                {
                    name: 'monto',
                    displayName: 'MONTO',
                    cellTemplate: '' +
                    '<div style="text-align: right; padding-top: 5px; padding-right: 5px;">' +
                    '<span data-ng-bind="row.entity.simboloMoneda"></span>' +
                    '<span data-ng-bind="row.entity.monto | currency: \'\'"></span>' +
                    '</div>',
                    width: '23%'
                },
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
                    SessionService.confirmarTransaccionBovedaCaja(row.id).then(
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
                    SessionService.cancelarTransaccionBovedaCaja(row.id).then(
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
                CajaService.getVoucherTransaccionBovedaCaja(row.id).then(function (response) {
                    VoucherService.imprimirVoucherTransaccionBovedaCaja(response);
                });
            }
        };

        $scope.loadTransaccionEnviadas = function () {
            CajaService.getTransaccionBovedaCajaEnviadas(CAJA.id).then(function (response) {
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
            CajaService.getTransaccionBovedaCajaRecibidas(CAJA.id).then(function (response) {
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
