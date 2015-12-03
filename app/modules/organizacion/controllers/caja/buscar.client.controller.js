'use strict';

/* jshint -W098 */
angular.module('organizacion').controller('Organizacion.Caja.BuscarController',
  function ($scope, $state, AGENCIA, CajaService) {

    var paginationOptions = {
      page: 1,
      pageSize: 10
    };

    $scope.filterOptions = {
      filterText: undefined,
      agencia: undefined,
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
        {field: 'denominacion', displayName: 'Denominacion', width: '7%'},
        {field: 'abierto', displayName: 'Abierto', cellFilter: 'si_no : "abierto" | uppercase', width: '8%'},
        {field: 'estadoMovimiento', displayName: 'Estado movimiento', cellFilter: 'si_no : "congelado" | uppercase', width: '11%'},
        {field: 'bovedas', displayName: 'Bovedas', width: '35%'},
        {field: 'saldos', displayName: 'Saldos'},
        {field: 'estado', cellFilter: 'si_no : "activo" | uppercase', displayName: 'Estado', width: '8%'},
        {
          name: 'edit',
          displayName: 'Edit',
          cellTemplate: '<div style="text-align: center; padding-top: 4px;"><button type="button" ng-click="grid.appScope.gridActions.edit(row.entity)" class="btn btn-info btn-xs"><span class="glyphicon glyphicon-edit"></span>Editar</button></div>',
          width: '10%'
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
        $state.go('^.editar', {caja: row.id});
      }
    };

    $scope.search = function () {
      CajaService.getCajas(AGENCIA.id).then(function (response) {
        $scope.gridOptions.data = response;
      });
    };

  }
);
