'use strict';

/* jshint -W098 */
angular.module('persona').controller('Persona.Juridica.EditarPersonaJuridica.DatosPrincipalesController',
    function ($scope, $state, toastr, personaJuridica, MaestroService, PersonaJuridicaService) {

        $scope.working = false;

        $scope.combo = {
            tipoDocumento: undefined,
            tipoEmpresa: undefined
        };
        $scope.combo.selected = {
            tipoDocumento: undefined,
            tipoEmpresa: $scope.view.persona.tipoEmpresa
        };

        $scope.loadCombo = function () {
            MaestroService.getTiposEmpresa().then(function (response) {
                $scope.combo.tipoEmpresa = response;
            });
        };
        $scope.loadCombo();

        $scope.view = {
            persona: personaJuridica
        };
        $scope.view.persona.fechaConstitucion = new Date($scope.view.persona.fechaConstitucion);


        $scope.save = function () {
            $scope.working = true;

            var persona = angular.copy($scope.view.persona);
            persona.tipoEmpresa = $scope.combo.selected.tipoEmpresa;
            persona.idRepresentanteLegal = $scope.view.persona.representanteLegal.id;
            persona.representanteLegal = undefined;
            PersonaJuridicaService.update(persona).then(
                function (response) {
                    toastr.success('Persona actualizada');
                    $scope.working = false;
                },
                function error(err) {
                    toastr.error(err.data.message);
                }
            );
        };

    });

