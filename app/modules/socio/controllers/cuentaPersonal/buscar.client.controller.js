'use strict';

/* jshint -W098 */
angular.module('socio').controller('Socio.CuentaPersonal.BuscarCuentaPersonalController',
    function ($scope, $state, CuentaBancariaService) {

        var paginationOptions = {
            page: 1,
            pageSize: 10
        };

        $scope.filterOptions = {
            filterText: undefined,
            tipoCuentasBancarias: ['LIBRE', 'PLAZO_FIJO', 'RECAUDADORA'],
            tipoPersonas: ['NATURAL', 'JURIDICA'],
            tipoEstadoCuenta: ['ACTIVO', 'CONGELADO', 'INACTIVO'],
            estado: true
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
                {field: "tipoCuenta", displayName: 'TIPO CUENTA', width: '10%'},
                {field: "numeroCuenta", displayName: 'NUMERO CUENTA', width: '14%'},
                {field: "tipoDocumento", displayName: 'T.DOCUMENTO', width: '10%'},
                {field: "numeroDocumento", displayName: 'NRO.DOCUMENTO', width: '15%'},
                {field: "titulares", displayName: 'TITULARES', width: '25%'},
                {field: "moneda", displayName: 'MONEDA', width: '8%'},
                {field: "estadoCuenta", displayName: 'ESTADO', width: '8%'},
                {
                    name: 'edit',
                    displayName: 'Edit',
                    cellTemplate: '' +
                    '<div style="text-align: center; padding-top: 5px;">' +
                    '<button type="button" ng-click="grid.appScope.gridActions.edit(row.entity)" class="btn btn-info btn-xs">' +
                    '<i class="pficon pficon-edit"></i>' +
                    '<span>&nbsp;Editar</span>' +
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
            edit: function (row) {
                $state.go('^.editar', {cuentaPersonal: row.id});
            }
        };

        $scope.search = function () {
            var ft = $scope.filterOptions.filterText;
            var desde = (paginationOptions.page * paginationOptions.pageSize) - paginationOptions.pageSize;
            var hasta = paginationOptions.pageSize;
            CuentaBancariaService.findByFilterTextView(ft, $scope.filterOptions.tipoCuentasBancarias, $scope.filterOptions.tipoPersonas, $scope.filterOptions.tipoEstadoCuenta, desde, hasta).then(function (response) {
                $scope.gridOptions.data = response;
            });
            CuentaBancariaService.count().then(function (response) {
                $scope.gridOptions.totalItems = response;
            });
        };

    }
);
