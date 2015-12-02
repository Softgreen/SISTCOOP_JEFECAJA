'use strict';

/* jshint -W098 */
angular.module('cooperativa').controller('Cooperativa.TransaccionCliente.CuentaPersonal.Crear.FirmasPopupController',
    function ($scope, $state, $modalInstance, toastr, personas, PersonaNaturalService) {

        $scope.view = {
            personas: personas
        };

        $scope.getUrlFoto = function(item){
            return PersonaNaturalService.getUrlFoto(item.id);
        };
        $scope.getUrlFirma = function(item){
            return PersonaNaturalService.getUrlFirma(item.id);
        };

        $scope.ok = function () {
            $modalInstance.close();
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

    }
);
