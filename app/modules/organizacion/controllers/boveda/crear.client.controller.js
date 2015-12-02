'use strict';

/* jshint -W098 */
angular.module('organizacion').controller('Organizacion.Boveda.CrearController',
  function ($scope, $state, toastr, AGENCIA, BovedaService, MonedaService) {

    $scope.working = false;

    $scope.view = {
      boveda: {},
      agencia: AGENCIA
    };

    $scope.combo = {
      moneda: undefined
    };
    $scope.combo.selected = {
      moneda: undefined
    };

    $scope.directAccess = {
      moneda: [{
        id: '1',
        denominacion: 'NUEVOS SOLES',
        simbolo: 'S/.'
      }, {
        id: '0',
        denominacion: 'DOLARES AMERICANOS',
        simbolo: '$'
      }, {
        id: '2',
        denominacion: 'EUROS',
        simbolo: '€'
      }]
    };

    $scope.loadCombo = function () {
      MonedaService.getMonedas().then(function (response) {
        $scope.combo.moneda = response;
      });
    };
    $scope.loadCombo();


    $scope.save = function () {
      $scope.working = true;
      BovedaService.crear($scope.combo.selected.moneda.id, $scope.view.boveda.denominacion).then(
        function (response) {
          $scope.working = false;
          toastr.success('Boveda creada');
          $state.go('^.buscar');
        },
        function error(err) {
          toastr.error(err.data.errorMessage);
        }
      );

    };

  });
