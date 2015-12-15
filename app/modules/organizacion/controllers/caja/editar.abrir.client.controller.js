'use strict';

/* jshint -W098 */
angular.module('organizacion').controller('Organizacion.Caja.Editar.AbrirController',
  function ($scope, $state, caja, toastr, CajaService) {

    $scope.working = false;

    $scope.view = {
      caja: caja
    };

    $scope.view.loaded = {
      detalle: []
    };

    $scope.loadDetalle = function () {
      CajaService.getDetalle($scope.view.caja.id).then(function (response) {
        for (var i = 0; i < response.length; i++) {
          angular.forEach(response[i].detalle, function (row) {
            row.subtotal = function () {
              return this.valor * this.cantidad;
            };
          });
        }
        $scope.view.loaded.detalle = response;
      });
    };
    $scope.loadDetalle();

    $scope.total = function (detalle) {
      var total = 0;
      for (var i = 0; i < detalle.length; i++) {
        total = total + detalle[i].subtotal();
      }
      return total;
    };

    $scope.save = function () {
      if ($scope.view.caja.estado === false) {
        toastr.info('Caja inactiva, no se puede actualizar');
        return;
      }
      if ($scope.view.caja.estadoMovimiento === true) {
        toastr.warning('Caja abierta, no se puede abrir nuevamente');
        return;
      }

      $scope.working = true;
      CajaService.abrirCaja($scope.view.caja.id).then(
        function(response){
          toastr.success('Caja abierta.');
          $scope.working = false;
          $state.go('^.resumen');
        }, function error(err){
          toastr.error(err.data.message);
        }
      );

    };

  });
