'use strict';

/* jshint -W098 */
angular.module('cooperativa').controller('Cooperativa.TransaccionCliente.Historial.BuscarController',
    function ($scope, $state, toastr, CAJA, SGDialog, CajaService, SessionService, VoucherService) {

        var paginationOptions = {
            page: 1,
            pageSize: 10
        };

        $scope.filterOptions = {
            filterText: undefined
        };

        $scope.gridOptions = {
            data: [],
            enableRowSelection: true,
            enableRowHeaderSelection: false,
            multiSelect: false,

            paginationPageSizes: [10, 25, 50],
            paginationPageSize: 10,
            useExternalPagination: true,
            useExternalSorting: true,

            columnDefs: [
                {field: 'idTransaccion', displayName: 'TRANS.', width: '9%'},
                {field: 'tipoTransaccion', displayName: 'TIPO TRANS.', width: '9%'},
                {field: 'numeroOperacion', displayName: 'NRO.OP.', width: '9%'},
                {field: 'moneda', displayName: 'MONEDA', width: '14%'},
                {field: 'monto', displayName: 'MONTO', width: '14%'},
                {field: 'fecha', cellFilter: 'date: "dd/MM/yyyy"', displayName: 'FECHA', width: '10%'},
                {field: 'hora', cellFilter: 'date: "HH:mm:ss"', displayName: 'HORA', width: '10%'},
                {field: 'estado', cellFilter: 'si_no: "ACTIVO"', displayName: 'ESTADO', width: '10%'},
                {
                    name: 'edit',
                    displayName: 'Edit',
                    cellTemplate: '' +
                    '<div style="text-align: center; padding-top: 5px;">' +
                    '<button type="button" data-ng-click="grid.appScope.gridActions.imprimir(row.entity)" data-ng-disabled="!row.entity.estado" class="btn btn-info btn-xs">' +
                    '<i class="pficon pficon-print"></i>' +
                    '<span>&nbsp;Imprimir</span>' +
                    '</button>' +
                    '&nbsp;' +
                    '<button type="button" data-ng-click="grid.appScope.gridActions.extornar(row.entity)" data-ng-disabled="!row.entity.estado" class="btn btn-danger btn-xs">' +
                    '<i class="pficon pficon-delete"></i>' +
                    '<span>&nbsp;Extornar</span>' +
                    '</button>' +
                    '</div>'
                }
            ],
            onRegisterApi: function (gridApi) {
                $scope.gridApi = gridApi;
                $scope.gridApi.core.on.sortChanged($scope, function (grid, sortColumns) {
                    console.log('Order by. Not available.');
                });
                gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
                    paginationOptions.page = newPage;
                    paginationOptions.pageSize = pageSize;
                    $scope.search();
                });
            }
        };
        $scope.gridActions = {
            imprimir: function (row) {
                if (row.tipoTransaccion === 'APORTE') {
                    CajaService.getVoucherCuentaAporte(row.idTransaccion).then(function (response) {
                        VoucherService.imprimirVoucherAporte(response);
                    });
                }
                else if (row.tipoTransaccion === 'DEPOSITO' || row.tipoTransaccion === 'RETIRO') {
                    CajaService.getVoucherTransaccionBancaria(row.idTransaccion).then(function (response) {
                        VoucherService.imprimirVoucherCuentaPersonal(response);
                    });
                }
                else if (row.tipoTransaccion === 'COMPRA' || row.tipoTransaccion === 'VENTA') {
                    CajaService.getVoucherCompraVenta(row.idTransaccion).then(function (response) {
                        VoucherService.imprimirVoucherCompraVenta(response);
                    });
                }
                else if (row.tipoTransaccion === 'TRANSFERENCIA') {
                    CajaService.getVoucherTransferenciaBancaria(row.idTransaccion).then(function (response) {
                        VoucherService.imprimirVoucherTransferencia(response);
                    });
                }
                else if (row.tipoTransaccion === 'COBRO_CHEQUE') {
                    CajaService.getVoucherTransaccionCheque(row.idTransaccion).then(function (response) {
                        VoucherService.imprimirVoucherCheque(response);
                    });
                } else {
                    alert('Tipo de transaccion no encontrado');
                }
            },
            extornar: function (row) {
                SGDialog.confirmDelete('Transaccion', '', function () {
                    SessionService.extornarTransaccion(row.idTransaccion).then(
                        function (response) {
                            toastr.success('Transaccion extornada satisfactoriamente.');
                            $scope.search();
                        }, function error(err) {
                            toastr.error(err.data.message);
                            $scope.search();
                        }
                    );
                });
            }
        };

        $scope.search = function () {
            var ft = $scope.filterOptions.filterText;
            var desde = (paginationOptions.page * paginationOptions.pageSize) - paginationOptions.pageSize;
            var hasta = paginationOptions.pageSize;
            CajaService.getHistorialTransaccion(CAJA.id, null, ft, desde, hasta).then(function (response) {
                $scope.gridOptions.data = response;
                $scope.gridOptions.totalItems = 1000;
            });
        };

    });
