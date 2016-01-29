'use strict';

/* jshint -W098 */
angular.module('organizacion').controller('Organizacion.Pendiente.BuscarController',
  function ($scope, $state, AGENCIA, CajaService, PendienteCajaService) {

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
        {field: 'hora', cellFilter: 'date: "dd/MM/yyyy HH:mm:ss"', displayName: 'Fecha', width: '15%'},
        {field: 'tipoPendiente', displayName: 'Tipo Pendiente', width: '13%'},
        {field: 'denominacionMoneda', displayName: 'Moneda', width: '20%'},
        {field: 'simboloMoneda', displayName: 'Simbolo', width: '8%'},
        {field: 'monto', displayName: 'Monto', width: '10%'},
        {
          name: 'monto',
          displayName: 'Monto',
          cellTemplate: '' +
          '<div style="text-align: right; padding-top: 5px; padding-right: 5px;">' +
          '<span data-ng-bind="row.entity.simboloMoneda"></span>' +
          '<span data-ng-bind="row.entity.monto | currency: \'\'"></span>' +
          '</div>',
          width: '13%'
        },
        {field: 'denominacionCaja', displayName: 'Caja', width: '10%'},
        {field: 'trabajadorCrea', displayName: 'Trabajador', width: '30%'}
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
      PendienteCajaService.getPendientes(AGENCIA.id).then(function (response) {
        $scope.gridOptions.data = response;
      });
    };

  }
);
