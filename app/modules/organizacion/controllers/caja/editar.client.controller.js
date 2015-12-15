'use strict';

/* jshint -W098 */
angular.module('organizacion').controller('Organizacion.Caja.EditarController',
  function ($scope, $state, toastr, caja, SGDialog, CajaService) {

    $scope.view = {
      caja: caja
    };

    $scope.congelar = function () {
      SGDialog.confirm('Congelar', 'Estas seguro de querer congelar la caja?', function () {
        CajaService.congelar($scope.view.caja.id).then(
          function(response){
            toastr.success('Caja congelada');
          },
          function error(err){
            toastr.error(err.data.message);
          }
        );
      });
    };
    $scope.descongelar = function () {
      SGDialog.confirm('Descongelar', 'Estas seguro de querer descongelar la caja?', function () {
        CajaService.descongelar($scope.view.caja.id).then(
          function(response){
            toastr.success('Caja congelada');
          },
          function error(err){
            toastr.error(err.data.message);
          }
        );
      });
    };
    $scope.desactivar = function () {
      SGDialog.confirm('Desactivar', 'Estas seguro de querer desactivar permanentemente la caja?', function () {
        alert('No se puede desactivar la caja');
      });
    };

  });
