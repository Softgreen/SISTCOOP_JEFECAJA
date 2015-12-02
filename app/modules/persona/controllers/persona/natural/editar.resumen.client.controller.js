'use strict';

/* jshint -W098 */
angular.module('persona').controller('Persona.Natural.EditarPersonaNatural.ResumenController',
    function ($scope, $state, $modal, personaNatural, PersonaNaturalService) {

        $scope.view = {
            persona: personaNatural
        };

        $scope.openCambiarFotoModal = function () {
            var modalInstance = $modal.open({
                animation: true,
                templateUrl: 'modules/persona/views/natural/form-editar-cambiarFoto.html',
                controller: 'Persona.Natural.EditarPersonaNatural.CambiarFotoModalController',
                size: 'lg',
                resolve: {
                    personaNatural: function () {
                        return $scope.view.persona;
                    }
                }
            });

            modalInstance.result.then(function (persona) {
                //$scope.view.persona = persona;
                $state.reload();
            }, function () {
            });
        };

        $scope.openCambiarFirmaModal = function () {
            var modalInstance = $modal.open({
                animation: true,
                templateUrl: 'modules/persona/views/natural/form-editar-cambiarFirma.html',
                controller: 'Persona.Natural.EditarPersonaNatural.CambiarFirmaModalController',
                size: 'lg',
                resolve: {
                    personaNatural: function () {
                        return $scope.view.persona;
                    }
                }
            });

            modalInstance.result.then(function (persona) {
                //$scope.view.persona = persona;
                $state.reload();
            }, function () {
            });
        };

        $scope.getUrlFoto = function(){
            return PersonaNaturalService.getUrlFoto($scope.view.persona.id);
        };
        $scope.getUrlFirma = function(){
            return PersonaNaturalService.getUrlFirma($scope.view.persona.id);
        };

    });
