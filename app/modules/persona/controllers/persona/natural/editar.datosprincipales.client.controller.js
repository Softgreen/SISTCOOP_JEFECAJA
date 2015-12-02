'use strict';

/* jshint -W098 */
angular.module('persona').controller('Persona.Natural.EditarPersonaNatural.DatosPrincipalesController',
    function ($scope, $state, toastr, personaNatural, MaestroService, PersonaNaturalService) {

        $scope.working = false;

        $scope.view = {
            persona: personaNatural
        };
        $scope.view.persona.fechaNacimiento = new Date($scope.view.persona.fechaNacimiento);

        $scope.combo = {
            sexo: undefined,
            estadoCivil: undefined
        };
        $scope.combo.selected = {
            sexo: personaNatural.sexo,
            estadoCivil: personaNatural.estadoCivil
        };

        $scope.loadCombos = function () {
            MaestroService.getSexos().then(function (response) {
                $scope.combo.sexo = response;
            });
            MaestroService.getEstadosciviles().then(function (response) {
                $scope.combo.estadoCivil = response;
            });
        };
        $scope.loadCombos();

        $scope.save = function () {
            $scope.view.persona.sexo = $scope.combo.selected.sexo;
            $scope.view.persona.estadoCivil = $scope.combo.selected.estadoCivil;
            $scope.working = true;
            PersonaNaturalService.update($scope.view.persona).then(
                function(response){
                    $scope.working = false;
                    toastr.success('Persona actualizada');
                },
                function error(err){
                    toastr.error(err.data.message);
                }
            );
        };

    });
