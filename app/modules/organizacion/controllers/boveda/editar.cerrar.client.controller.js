'use strict';

/* jshint -W098 */
angular.module('organizacion').controller('Organizacion.Boveda.Editar.CerrarController',
  function ($scope, $state, boveda, toastr, BovedaService) {

    $scope.working = false;

    $scope.view = {
      boveda: boveda
    };

    $scope.view.load = {
      detalleOld: [],//Detalle de monedas en boveda {cantidad:'10', valor: '200.00'},
      detalleNew: []//Detalle de monedas en boveda {cantidad:'10', valor: '200.00'},
    };

    $scope.loadDetalleHistorial = function () {
      BovedaService.getDetallePenultimo($scope.view.boveda.id).then(function (response) {
        angular.forEach(response, function (row) {
          row.subtotal = function () {
            return this.valor * this.cantidad;
          }
        });
        $scope.view.load.detalleOld = response;
      });
      BovedaService.getDetalle($scope.view.boveda.id).then(function (response) {
        angular.forEach(response, function (row) {
          row.subtotal = function () {
            return this.valor * this.cantidad;
          }
        });
        $scope.view.load.detalleNew = response;
      });
    };
    $scope.loadDetalleHistorial();

    $scope.getTotal = function (detalle) {
      if(!detalle){
        return 0;
      }
      var total = 0;
      for (var i = 0; i < detalle.length; i++) {
        total = total + detalle[i].subtotal();
      }
      return total;
    };

    $scope.save = function () {
      if ($scope.view.boveda.estado === false) {
        toastr.warning('Boveda inactiva, no se puede abrir.');
        return;
      }
      if ($scope.view.boveda.estadoMovimiento === false) {
        toastr.warning('Boveda cerrada, no se puede cerrar nuevamente.');
        return;
      }

      $scope.working = true;
      BovedaService.cerrarBoveda($scope.view.boveda.id).then(
        function(response){
          toastr.success('Boveda cerrada.');
          $scope.working = false;
          boveda.estadoMovimiento = false;
          $state.go('^.resumen');
        },
        function error(err){
          $scope.working = false;
          toastr.error(err.data.message);
        }
      );

    };
  });
