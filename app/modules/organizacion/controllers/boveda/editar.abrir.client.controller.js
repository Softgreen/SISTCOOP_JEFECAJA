'use strict';

/* jshint -W098 */
angular.module('cooperativa').controller('Organizacion.Boveda.Editar.AbrirController',
	function ($scope, $state, boveda, toastr, BovedaService) {

    $scope.working = false;

    $scope.view = {
      boveda: boveda
    };

    $scope.view.load = {
      detalleHistorialActivo: []
    };

    $scope.loadDetalle = function(){
      BovedaService.getDetalle($scope.view.boveda.id).then(function(response){
        angular.forEach(response, function(row){
          row.subtotal = function(){
            return this.valor * this.cantidad;
          };
        });
        $scope.view.load.detalleHistorialActivo = response;
      });
    };
    $scope.loadDetalle();

    $scope.getTotal = function () {
      var total = 0;
      for (var i = 0; i < $scope.view.load.detalleHistorialActivo.length; i++) {
        total = total + $scope.view.load.detalleHistorialActivo[i].subtotal();
      }
      return total;
    };

    $scope.save = function () {
      if ($scope.view.boveda.estado === false) {
        toastr.warning('Boveda inactiva, no se puede abrir.');
        return;
      }
      if ($scope.view.boveda.estadoMovimiento === true) {
        toastr.warning('Boveda abierta, no se puede abrir.');
        return;
      }

      $scope.working = true;
      BovedaService.abrirBoveda($scope.view.boveda.id).then(
        function(response){
          toastr.success('Boveda abierta.');
          $scope.working = false;
          $state.go('^.resumen');
        },
        function error(err){
          toastr.error(err.data.message);
        }
      );

    };

	}
);
