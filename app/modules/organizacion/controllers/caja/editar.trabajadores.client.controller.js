'use strict';

/* jshint -W098 */
angular.module('organizacion').controller('Organizacion.Caja.Editar.TrabajadoresController',
  function ($scope, $state, caja, toastr, SGDialog, CajaService, PersonaNaturalService, TrabajadorService) {

    $scope.working = false;

    $scope.view = {
      caja: caja,
      trabajador: {}
    };

    $scope.view.load = {
      trabajador: undefined
    };

    $scope.combo = {
      tipoDocumento: undefined
    };
    $scope.combo.selected = {
      tipoDocumento: undefined
    };

    $scope.loadCombo = function () {
      PersonaNaturalService.getTipoDocumentos().then(function (response) {
        $scope.combo.tipoDocumento = response;
      });
    };
    $scope.loadCombo();


    $scope.loadTrabajadores = function () {
      CajaService.getTrabajadorse($scope.view.caja.id).then(function (response) {
        $scope.view.load.trabajadores = response;
      });
    };
    $scope.loadTrabajadores();

    $scope.searchTrabajador = function ($event) {
      if ($event) {
        $event.preventDefault();
      }
      if(!$scope.combo.selected.tipoDocumento || ! $scope.view.trabajador.numeroDocumento) {
        toastr.warning('Ingrese tipo y numero de documento');
        return;
      }
      TrabajadorService.findByTipoNumeroDocumento($scope.combo.selected.tipoDocumento.id, $scope.view.trabajador.numeroDocumento).then(function (response) {
        if(response) {
          $scope.view.load.trabajador = response;
        } else {
          toastr.warning('Trabajador no encontrado');
        }
      });
    };

    $scope.save = function () {
      var trabajador = {
        id: $scope.view.load.trabajador.id
      };

      $scope.working = true;
      CajaService.crearTrabajador($scope.view.caja.id, trabajador).then(
        function (response) {
          toastr.success('Trabajador vinculado a caja');
          $scope.loadTrabajadores();
          $scope.working = false;
        },
        function error(err) {
          toastr.error(err.data.message);
        }
      );
    };
    $scope.remove = function (trabajador) {
      SGDialog.confirm('Eliminar', 'Estas seguro de querer quitar la caja al trabajador?', function () {
        CajaService.eliminarTrabajador($scope.view.caja.id, trabajador.id).then(
          function (response) {
            toastr.success('Caja desvinculada con trabajador');
            $scope.loadTrabajadores();
          },
          function error(err) {
            toastr.error(err.data.message);
          }
        );
      });
    };

  });
