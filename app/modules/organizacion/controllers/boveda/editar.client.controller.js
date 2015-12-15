'use strict';

/* jshint -W098 */
angular.module('organizacion').controller('Organizacion.Boveda.EditarController',
  function ($scope, $state, boveda, toastr, SGDialog, BovedaService) {

    $scope.view = {
      boveda: boveda
    };

    $scope.congelar = function(){
      SGDialog.confirm('Congelar', 'Estas seguro de querer congelar la boveda?', function () {
        BovedaService.congelar($scope.view.boveda.id).then(
          function(response){
            toastr.success('Boveda congelada');
          }, function error(err){
            toastr.error(err.data.message);
          }
        );
      });
    };
    $scope.descongelar = function(){
      SGDialog.confirm('Descongelar', 'Estas seguro de querer descongelar la boveda?', function () {
        BovedaService.descongelar($scope.view.boveda.id).then(
          function(response){
            toastr.success('Boveda descongelada');
          }, function error(err){
            toastr.error(err.data.message);
          }
        );
      });
    };
    $scope.desactivar = function () {
      SGDialog.confirm('Desactivar', 'Estas seguro de querer desactivar permanentemente la boveda?', function () {
        alert('No se puede desactivar la boveda');
      });
    };

  });
