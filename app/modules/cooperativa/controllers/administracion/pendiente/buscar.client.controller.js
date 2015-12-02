'use strict';

/* jshint -W098 */
angular.module('cooperativa').controller('Cooperativa.Administracion.Pendiente.BuscarController',
    function ($scope, $state, CAJA, CajaService, PendienteCajaService, VoucherService) {

        $scope.view = {};

        $scope.gridOptionsDelDia = {
            data: [],
            enableRowSelection: true,
            enableRowHeaderSelection: false,
            multiSelect: false,

            columnDefs: [
                {field: 'moneda.denominacion', displayName: 'MONEDA', width: '20%'},
                {field: 'monto', cellFilter: 'number: 2', displayName: 'MONTO', width: '15%'},
                {field: 'tipoPendiente', displayName: 'TIPO', width: '15%'},
                {field: 'fecha', cellFilter: "date : 'dd/MM/yyyy'", displayName: 'FECHA', width: '15%'},
                {field: 'hora', cellFilter: "date : 'HH:mm:ss'", displayName: 'HORA', width: '15%'},
                {
                    name: 'edit',
                    displayName: 'Edit',
                    cellTemplate: '' +
                    '<div style="text-align: center; padding-top: 5px;">' +
                    '<button type="button" data-ng-click="grid.appScope.gridActions.imprimir(row.entity)" class="btn btn-info btn-xs">' +
                    '<i class="pficon pficon-print"></i>' +
                    '<span>&nbsp;Imprimir</span>' +
                    '</button>' +
                    '</div>'
                }
            ]
        };

        $scope.gridOptionsPorPagar = {
            data: [],
            enableRowSelection: true,
            enableRowHeaderSelection: false,
            multiSelect: false,

            columnDefs: [
                {
                    name: 'monto',
                    displayName: 'MONTO',
                    cellTemplate: '' +
                    '<div style="text-align: right; padding-top: 5px; padding-right: 5px;">' +
                    '<span data-ng-bind="row.entity.moneda.simbolo"></span>' +
                    '<span data-ng-bind="row.entity.monto | currency: \'\'"></span>' +
                    '</div>',
                    width: '23%'
                },
                {
                    name: 'montoPorPagar',
                    displayName: 'POR PAGAR',
                    cellTemplate: '' +
                    '<div style="text-align: right; padding-top: 5px; padding-right: 5px;">' +
                    '<span data-ng-bind="row.entity.moneda.simbolo"></span>' +
                    '<span data-ng-bind="row.entity.montoPorPagar | currency: \'\'"></span>' +
                    '</div>',
                    width: '25%'
                },
                {field: 'hora', cellFilter: 'date: "dd/MM/yyyy HH:mm:ss"', displayName: 'FECHA', width: '28%'},
                {
                    name: 'edit',
                    displayName: 'Edit',
                    cellTemplate: '<div style="text-align: center; padding-top: 4px;"><button type="button" ng-click="grid.appScope.gridActions.pagar(row.entity)" class="btn btn-info btn-xs"><span class="glyphicon glyphicon-edit"></span>Pagar</button></div>'
                }
            ]
        };

        $scope.gridActions = {
            pagar: function (row) {
                $state.go('^.crear', {idPendienteRelacionado: row.id, monto: Math.abs(row.montoPorPagar), tipoPendiente: 'PAGO'});
            },
            imprimir: function (row) {
                PendienteCajaService.getVoucherPendienteCaja(row.id).then(function (response) {
                    VoucherService.imprimirVoucherPendiente(response);
                });
            }
        };

        $scope.search = function () {
            CajaService.getPendientes(CAJA.id).then(function (response) {
                $scope.gridOptionsDelDia.data = response;
            });
            CajaService.getPendientesPorPagar(CAJA.id).then(function (response) {
                $scope.gridOptionsPorPagar.data = response;
            });
        };
        $scope.search();
    }
);
