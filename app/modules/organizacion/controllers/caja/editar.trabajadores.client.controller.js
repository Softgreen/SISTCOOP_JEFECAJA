'use strict';

/* jshint -W098 */
angular.module('organizacion').controller('Organizacion.Caja.Editar.TrabajadoresController',
  function ($scope, $state, caja, toastr, CajaService) {

    $scope.working = false;

    $scope.view = {
      caja: caja
    };

    $scope.view.load = {
      trabajadores: []
    };

    $scope.loadTrabajadores = function () {
      CajaService.getTrabajadorse($scope.view.caja.id).then(
        function (response) {
          $scope.view.load.trabajadores = response;
        });
    };
    $scope.loadTrabajadores();

  });
