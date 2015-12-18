'use strict';

/* jshint -W098 */
angular.module('organizacion').controller('Organizacion.TransaccionInterna.EntidadBoveda.CrearController',
  function ($scope, $state, toastr, AGENCIA, SGDialog, BovedaService, EntidadService, SessionService, VoucherService) {

    $scope.working = false;

    $scope.view = {};
    $scope.view.load = {
      detalle: undefined,
      detalleDisponible: undefined
    };

    $scope.combo = {
      entidad: undefined,
      boveda: undefined,
      tipoTransaccion: [
        {denominacion: 'DEPOSITO', valor: 'DEPOSITO'},
        {denominacion: 'RETIRO', valor: 'RETIRO'},
      ]
    };
    $scope.combo.selected = {
      entidad: undefined,
      boveda: undefined,
      tipoTransaccion: undefined
    };

    $scope.loadCombo = function () {
      EntidadService.getEntidades().then(function (response) {
        $scope.combo.entidad = response;
      });

      BovedaService.getBovedas(AGENCIA.id).then(function (response) {
        $scope.combo.boveda = response;
      });
    };
    $scope.loadCombo();

    $scope.$watch('combo.selected.boveda', function (newValue, oldValue) {
      if (angular.isDefined($scope.combo.selected.boveda)) {
        BovedaService.getDetalle($scope.combo.selected.boveda.id).then(function (response) {
          angular.forEach(response, function (row) {
            //row.cantidad = 0;
            row.subtotal = function () {
              return this.valor * this.cantidad;
            };
          });
          $scope.view.load.detalleDisponible = angular.copy(response);

          angular.forEach(response, function (row) {
            row.cantidad = 0;
          });
          $scope.view.load.detalle = response;
        });
      }
    }, true);

    $scope.getTotal = function () {
      var total = 0;
      if ($scope.view.load.detalle) {
        for (var i = 0; i < $scope.view.load.detalle.length; i++) {
          total = total + ($scope.view.load.detalle[i].valor * $scope.view.load.detalle[i].cantidad);
        }
      }
      return total;
    };
    $scope.getTotalDisponible = function () {
      var total = 0;
      if ($scope.view.load.detalleDisponible) {
        for (var i = 0; i < $scope.view.load.detalleDisponible.length; i++) {
          total = total + ($scope.view.load.detalleDisponible[i].valor * $scope.view.load.detalleDisponible[i].cantidad);
        }
      }
      return total;
    };

    $scope.save = function () {
      if ($scope.getTotal() > 0) {

        SGDialog.confirm('Guardar', 'Estas seguro de realizar la transaccion', function () {
          $scope.working = true;

          var transaccion = [];
          for (var i = 0; i < $scope.view.load.detalle.length; i++) {
            transaccion[i] = {
              valor: $scope.view.load.detalle[i].valor,
              cantidad: $scope.view.load.detalle[i].cantidad
            };
          }

          var origen;
          if ($scope.combo.selected.tipoTransaccion.valor === 'DEPOSITO') {
            origen = 'ENTIDAD';
          } else if ($scope.combo.selected.tipoTransaccion.valor === 'RETIRO') {
            origen = 'BOVEDA';
          } else {
            alert('Tipo transaccion no valida');
            return;
          }

          BovedaService.crearTransaccioEntidadBoveda(origen, $scope.combo.selected.entidad.id, $scope.combo.selected.boveda.id, transaccion, $scope.view.observacion).then(
            function (response) {
              $scope.working = false;
              toastr.success('Transaccion creada satisfactoriamente');
              $state.go('^.buscar');
            }, function error(err) {
              $scope.working = false;
              toastr.error(err.data.message);
            }
          );

        });
      } else {
        toastr.warning('Monto de transaccion no valido');
      }
    };

  });
