'use strict';

/* jshint -W098 */
angular.module('persona').controller('Persona.Natural.EditarPersonaNatural.CambiarFotoModalController',
    function ($scope, $timeout, $modalInstance, personaNatural, toastr, Upload, PersonaNaturalService) {

        $scope.view = {
            persona: personaNatural
        };

        $scope.uploader = {
            progress: 0
        };

        $scope.upload = function (files) {
            if (files && files.length) {
                var file = files[0];

                PersonaNaturalService.setFoto($scope.view.persona.id, file).progress(function (evt) {
                    $scope.uploader.progress = parseInt(100.0 * evt.loaded / evt.total);
                }).success(function (data, status, headers, config) {
                    toastr.success('Foto actualizada satisfactoriamente');
                    $scope.loadPersona();
                    $timeout(function () {
                        $scope.uploader.progress = 0;
                    }, 100);
                    $timeout(function () {
                        $scope.ok();
                    }, 500);
                }).error(function (err) {
                    $timeout(function () {
                        $scope.ok();
                    }, 500);
                    //toastr.error('Error al subir el archivo');
                });

            }
        };

        $scope.getUrlFoto = function(){
            return PersonaNaturalService.getUrlFoto($scope.view.persona.id);
        };
        $scope.getUrlFirma = function(){
            return PersonaNaturalService.getUrlFirma($scope.view.persona.id);
        };

        $scope.loadPersona = function () {
            //$scope.view.persona = SGPersonaNatural.$find($scope.view.persona.id).$object;
        };

        $scope.ok = function () {
            $modalInstance.close($scope.view.persona);
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

    });
