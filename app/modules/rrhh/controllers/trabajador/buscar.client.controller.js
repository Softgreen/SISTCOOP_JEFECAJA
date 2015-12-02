'use strict';

/* jshint -W098 */
angular.module('rrhh').controller('Rrhh.Trabajador.BuscarTrabajadorController',
    function ($scope, $state, TrabajadorService, SucursalService) {

        $scope.combo = {
            sucursal: undefined,
            agencia: undefined
        };
        $scope.combo.selected = {
            sucursal: undefined,
            agencia: undefined
        };

        $scope.loadCombo = function () {
            SucursalService.getSucursales().then(function (response1) {
                $scope.combo.sucursal = response1;
                $scope.$watch('combo.selected.sucursal', function () {
                    if (angular.isDefined($scope.combo.selected.sucursal)) {
                        SucursalService.getAgencias($scope.combo.selected.sucursal.id).then(function (response2) {
                            $scope.combo.agencia = response2;
                        });
                    }
                }, true);
            });
        };
        $scope.loadCombo();

        var paginationOptions = {
            page: 1,
            pageSize: 10
        };

        $scope.filterOptions = {
            filterText: undefined,
            idSucursal: undefined,
            idAgencia: undefined
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
                { field: 'personaNatural.tipoDocumento.abreviatura', displayName: 'TIPO DOC.'},
                { field: 'personaNatural.numeroDocumento', displayName: 'NUM. DOC.'},
                { field: 'personaNatural.apellidoPaterno', displayName: 'AP. PATERNO'},
                { field: 'personaNatural.apellidoMaterno', displayName: 'AP. MATERNO'},
                { field: 'personaNatural.nombres', displayName: 'NOMBRES'},
                { field: 'usuario', displayName: 'USUARIO', width:110},
                { field: 'agencia.abreviatura', displayName: 'AGENCIA'},
                { field: 'estado', displayName: 'ESTADO', cellFilter: 'si_no: "ACTIVO"'},
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
                $state.go('^.editar', {trabajador: row.id});
            }
        };

        $scope.search = function () {
            TrabajadorService.getTrabajadores($scope.combo.selected.agencia.id, $scope.filterOptions.filterText).then(function (response) {
                $scope.gridOptions.data = response;
            });
        };

    }
);
