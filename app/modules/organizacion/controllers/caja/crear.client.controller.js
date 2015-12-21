'use strict';

/* jshint -W098 */
angular.module('organizacion').controller('Organizacion.Caja.CrearController',
  function ($scope, $state, toastr, AGENCIA, CajaService, BovedaService) {

    $scope.working = false;

    $scope.view = {
      caja: {},
      agencia: AGENCIA
    };

    $scope.combo = {
      bovedaDisponible: [],
      bovedaAsignada: []
    };
    $scope.combo.selected = {
      bovedaDisponible: [],
      bovedaAsignada: []
    };

    $scope.loadCombo = function () {
      BovedaService.getBovedas(AGENCIA.id).then(function (response) {
        $scope.combo.bovedaDisponible = response;
      });
    };
    $scope.loadCombo();

    $scope.addBovedas = function () {
      for (var i = 0; i < $scope.combo.selected.bovedaDisponible.length; i++) {
        $scope.combo.bovedaAsignada.push($scope.combo.selected.bovedaDisponible[i]);
      }
      for (var i = 0; i < $scope.combo.bovedaDisponible.length; i++) {
        for (var j = 0; j < $scope.combo.selected.bovedaDisponible.length; j++) {
          if ($scope.combo.bovedaDisponible[i].id === $scope.combo.selected.bovedaDisponible[j].id) {
            $scope.combo.bovedaDisponible.splice(i, 1);
          }
        }
      }
    };
    $scope.removeBovedas = function () {
      for (var i = 0; i < $scope.combo.selected.bovedaAsignada.length; i++) {
        $scope.combo.bovedaDisponible.push($scope.combo.selected.bovedaAsignada[i]);
      }
      for (var i = 0; i < $scope.combo.bovedaAsignada.length; i++) {
        for (var j = 0; j < $scope.combo.selected.bovedaAsignada.length; j++) {
          if ($scope.combo.bovedaAsignada[i].id === $scope.combo.selected.bovedaAsignada[j].id) {
            $scope.combo.bovedaAsignada.splice(i, 1);
          }
        }
      }
    };

    $scope.save = function () {
      $scope.working = true;

      var bovedas = [];
      for (var i = 0; i < $scope.combo.bovedaAsignada.length; i++) {
        bovedas.push($scope.combo.bovedaAsignada[i].id);
      }

      $scope.view.caja.bovedas = bovedas;
      CajaService.crear($scope.view.caja).then(function (response) {
        $scope.working = false;
        toastr.success('Caja creada');
        $state.go('^.buscar');
      }, function error(err) {
        $scope.working = false;
        toastr.error(err.data.errorMessage);
      });
    };

  });
