'use strict';

/* jshint -W098 */
angular.module('persona').controller('Persona.Juridica.EditarPersonaJuridica.DatosAdicionalesController',
    function ($scope, personaJuridica, toastr, PersonaJuridicaService) {

        $scope.working = false;

        $scope.view = {
            persona: personaJuridica
        };

        $scope.save = function () {
            $scope.working = true;

            var persona = angular.copy($scope.view.persona);
            persona.idRepresentanteLegal = $scope.view.persona.representanteLegal.id;
            persona.representanteLegal = undefined;
            PersonaJuridicaService.update(persona).then(
                function (response) {
                    toastr.success('Persona actualizada');
                    $scope.working = false;
                },
                function error(err) {
                    toastr.error(err.data.errorMessage);
                }
            );
        };

    });




