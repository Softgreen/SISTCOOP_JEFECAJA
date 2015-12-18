'use strict';

/* jshint -W098 */
angular.module('organizacion').controller('Organizacion.TransaccionInterna.EntidadBoveda.BuscarController',
  function ($scope, $state, toastr, AGENCIA, SGDialog, BovedaService, VoucherService) {

    $scope.gridOptions_bancos = {
      data: [],
      enableRowSelection: true,
      enableRowHeaderSelection: false,
      multiSelect: false,

      columnDefs: [
        {field: 'fecha', cellFilter: 'date: "dd/MM/yyyy"', displayName: 'Fecha', width: '17%'},
        {field: 'boveda', displayName: 'Boveda', width: '27%'},
        {
          name: 'monto',
          displayName: 'Monto',
          cellTemplate: '' +
          '<div style="text-align: right; padding-top: 5px; padding-right: 5px;" ng-class="{\'required\': row.entity.tipoTransaccion === \'EGRESO\'}">' +
          '<span data-ng-bind="row.entity.monto | currency: \'\'"></span>' +
          '</div>',
          width: '20%'
        },
        {field: 'tipoTransaccion', displayName: 'Tipo', width: '17%'},
        {
          name: 'edit',
          displayName: 'Edit',
          cellTemplate: '' +
          '<div style="text-align: center; padding-top: 5px;">' +
          '<button type="button" data-ng-click="grid.appScope.gridActions.imprimir(row.entity)" data-ng-disabled="!row.entity.estado" class="btn btn-info btn-xs">' +
          '<i class="pficon pficon-print"></i>' +
          '<span>&nbsp;Imprimir</span>' +
          '</button>' +
          '</div>'
        }
      ]
    };
    $scope.gridOptions_patrimonio = {
      data: [],
      enableRowSelection: true,
      enableRowHeaderSelection: false,
      multiSelect: false,

      columnDefs: [
        {field: 'fecha', cellFilter: 'date: "dd/MM/yyyy"', displayName: 'Fecha', width: '17%'},
        {field: 'boveda', displayName: 'Boveda', width: '27%'},
        {
          name: 'monto',
          displayName: 'Monto',
          cellTemplate: '' +
          '<div style="text-align: right; padding-top: 5px; padding-right: 5px;" ng-class="{\'required\': row.entity.tipoTransaccion === \'EGRESO\'}">' +
          '<span data-ng-bind="row.entity.monto | currency: \'\'"></span>' +
          '</div>',
          width: '20%'
        },
        {field: 'tipoTransaccion', displayName: 'Tipo', width: '17%'},
        {
          name: 'edit',
          displayName: 'Edit',
          cellTemplate: '' +
          '<div style="text-align: center; padding-top: 5px;">' +
          '<button type="button" data-ng-click="grid.appScope.gridActions.imprimir(row.entity)" data-ng-disabled="!row.entity.estado" class="btn btn-info btn-xs">' +
          '<i class="pficon pficon-print"></i>' +
          '<span>&nbsp;Imprimir</span>' +
          '</button>' +
          '</div>'
        }
      ]
    };

    $scope.gridOptions_utilidad = {
      data: [],
      enableRowSelection: true,
      enableRowHeaderSelection: false,
      multiSelect: false,

      columnDefs: [
        {field: 'fecha', cellFilter: 'date: "dd/MM/yyyy"', displayName: 'Fecha', width: '17%'},
        {field: 'boveda', displayName: 'Boveda', width: '27%'},
        {
          name: 'monto',
          displayName: 'Monto',
          cellTemplate: '' +
          '<div style="text-align: right; padding-top: 5px; padding-right: 5px;" ng-class="{\'required\': row.entity.tipoTransaccion === \'EGRESO\'}">' +
          '<span data-ng-bind="row.entity.monto | currency: \'\'"></span>' +
          '</div>',
          width: '20%'
        },
        {field: 'tipoTransaccion', displayName: 'Tipo', width: '17%'},
        {
          name: 'edit',
          displayName: 'Edit',
          cellTemplate: '' +
          '<div style="text-align: center; padding-top: 5px;">' +
          '<button type="button" data-ng-click="grid.appScope.gridActions.imprimir(row.entity)" data-ng-disabled="!row.entity.estado" class="btn btn-info btn-xs">' +
          '<i class="pficon pficon-print"></i>' +
          '<span>&nbsp;Imprimir</span>' +
          '</button>' +
          '</div>'
        }
      ]
    };
    $scope.gridOptions_pendiente = {
      data: [],
      enableRowSelection: true,
      enableRowHeaderSelection: false,
      multiSelect: false,

      columnDefs: [
        {field: 'fecha', cellFilter: 'date: "dd/MM/yyyy"', displayName: 'Fecha', width: '17%'},
        {field: 'boveda', displayName: 'Boveda', width: '27%'},
        {
          name: 'monto',
          displayName: 'Monto',
          cellTemplate: '' +
          '<div style="text-align: right; padding-top: 5px; padding-right: 5px;" ng-class="{\'required\': row.entity.tipoTransaccion === \'EGRESO\'}">' +
          '<span data-ng-bind="row.entity.monto | currency: \'\'"></span>' +
          '</div>',
          width: '20%'
        },
        {field: 'tipoTransaccion', displayName: 'Tipo', width: '17%'},
        {
          name: 'edit',
          displayName: 'Edit',
          cellTemplate: '' +
          '<div style="text-align: center; padding-top: 5px;">' +
          '<button type="button" data-ng-click="grid.appScope.gridActions.imprimir(row.entity)" data-ng-disabled="!row.entity.estado" class="btn btn-info btn-xs">' +
          '<i class="pficon pficon-print"></i>' +
          '<span>&nbsp;Imprimir</span>' +
          '</button>' +
          '</div>'
        }
      ]
    };

    $scope.gridActions = {
      imprimir: function (row) {
        BovedaService.getVoucherTransaccionEntidadBoveda(row.id).then(function (response) {
          VoucherService.imprimirVoucherTransaccionEntidadBoveda(response);
        });
        /*BovedaService.getDetalleTransaccionEntidadBoveda($scope.id).then(function (response) {
          $scope.objetosCargados.detalleTransaccion = response;
        });*/
      }
    };

    $scope.loadTransacciones = function () {
      BovedaService.getTransaccionesEntidadBoveda(AGENCIA.id).then(function (response) {
        $scope.gridOptions_bancos.data = [];
        $scope.gridOptions_patrimonio.data = [];
        $scope.gridOptions_utilidad.data = [];
        $scope.gridOptions_pendiente.data = [];

        for (var i = 0; i < response.length; i++) {
          if (response[i].entidad === 'BANCOS') {
            $scope.gridOptions_bancos.data.push(response[i]);
          } else if (response[i].entidad === 'PATRIMONIO') {
            $scope.gridOptions_patrimonio.data.push(response[i]);
          } else if (response[i].entidad === 'UTILIDAD') {
            $scope.gridOptions_utilidad.data.push(response[i]);
          } else if (response[i].entidad === 'PENDIENTE_SOBRANTE') {
            $scope.gridOptions_pendiente.data.push(response[i]);
          }
        }
      });
    };
    $scope.loadTransacciones();

  });
