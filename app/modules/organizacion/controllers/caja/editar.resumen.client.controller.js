'use strict';

/* jshint -W098 */
angular.module('organizacion').controller('Organizacion.Caja.Editar.ResumenController',
  function ($scope, toastr, caja, CajaService) {

    $scope.view = {
      caja: caja
    };

    $scope.view.load = {
      agencia: undefined,
      bovedas: [],
      trabajadores: []
    };

    $scope.loadAgencia = function () {
      //$scope.view.load.agencia = SGAgencia.$findByUrl($scope.view.caja.agencia).$object;
    };
    $scope.loadAgencia();

    $scope.loadBovedas = function () {
      CajaService.getBovedas($scope.view.caja.id).then(function (response) {
        $scope.view.load.bovedas = response;
      });
    };
    $scope.loadBovedas();

    $scope.loadTrabajadores = function () {
      CajaService.getTrabajadorse($scope.view.caja.id).then(
        function (response) {
          $scope.view.load.trabajadores = response;
        });
    };
    $scope.loadTrabajadores();

  });
