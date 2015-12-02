'use strict';

/* jshint -W098 */
angular.module('socio').controller('Socio.Socio.BuscarSocioController',
    function ($scope, $state, SocioService) {

        var paginationOptions = {
            page: 1,
            pageSize: 10
        };

        $scope.filterOptions = {
            filterText: undefined,
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
                {field: 'tipoDocumento', displayName: 'T.DOC.', width: '10%'},
                {field: 'numeroDocumento', displayName: 'NRO.DOCUMENTO', width: '15%'},
                {field: 'tipoPersona', displayName: 'PERSONA', width: '10%'},
                {field: 'socio', displayName: 'SOCIO', width: '30%'},
                {field: 'estado', displayName: 'ESTADO', cellFilter: 'si_no : "activo" | uppercase'},
                {field: 'fechaAsociado', displayName: 'F.ASOCIADO', cellFilter: 'date : "dd/MM/yyyy"'},
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
                $state.go('^.editar', {socio: row.id});
            }
        };

        $scope.search = function () {
            var ft = $scope.filterOptions.filterText;
            var desde = (paginationOptions.page * paginationOptions.pageSize) - paginationOptions.pageSize;
            var hasta = paginationOptions.pageSize;

            SocioService.findByFilterText(ft, $scope.filterOptions.estado, $scope.filterOptions.estado, desde, hasta).then(function (response) {
                $scope.gridOptions.data = response;
            });
            SocioService.count(ft).then(function (response) {
                $scope.gridOptions.totalItems = response;
            });
        };

    }
);
