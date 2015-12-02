'use strict';

/* jshint -W098 */
angular.module('persona').controller('Persona.Juridica.BuscarPersonaJuridicaController',
    function ($scope, $state, PersonaJuridicaService) {

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
                {field: 'tipoDocumento.abreviatura', displayName: 'TIPO DOC.', width: '10%'},
                {field: 'numeroDocumento', displayName: 'NUM. DOCUMENTO', width: '15%'},
                {field: 'razonSocial', displayName: 'RAZON SOCIAL', width: '20%'},
                {field: 'nombreComercial', displayName: 'N.COMERCIAL', width: '20%'},
                {field: 'tipoEmpresa', displayName: 'TIPO EMPRESA', width: '10%'},
                {field: "fechaConstitucion", displayName: 'F. CONSTITUCION', cellFilter: "date:'dd/MM/yyyy'", width: '15%'},
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
                $state.go('^.editar', {personaJuridica: row.id});
            }
        };

        $scope.search = function () {
            var ft = $scope.filterOptions.filterText;
            var desde = (paginationOptions.page * paginationOptions.pageSize) - paginationOptions.pageSize;
            var hasta = paginationOptions.pageSize;

            PersonaJuridicaService.findByFilterText(ft, desde, hasta).then(function (response) {
                $scope.gridOptions.data = response;
            });
            PersonaJuridicaService.count(ft).then(function (response) {
                $scope.gridOptions.totalItems = response;
            });
        };

    });
