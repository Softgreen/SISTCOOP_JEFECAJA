'use strict';

/* jshint -W098 */
angular.module('persona').controller('Persona.Juridica.EditarPersonaJuridica.RepresentanteController',
    function ($scope, $state, toastr, MaestroService, PersonaNaturalService, PersonaJuridicaService) {

        $scope.working = false;

        $scope.representante = {
            tipoDocumento: undefined,
            numeroDocumento: undefined
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

        $scope.setRepresentante = function ($event) {
            if (!angular.isUndefined($event))
                $event.preventDefault();

            if (angular.isDefined($scope.combo.selected.tipoDocumento) && angular.isDefined($scope.representante.numeroDocumento)) {
                PersonaNaturalService.findByTipoNumeroDocumento($scope.combo.selected.tipoDocumento.id, $scope.representante.numeroDocumento).then(function (response) {
                    if (response)
                        $scope.view.persona.representanteLegal = response;
                    else
                        toastr.warning('Persona no encontrada');
                });

            }
        };

        $scope.save = function () {
            $scope.working = true;

            var persona = angular.copy($scope.view.persona);
            persona.idRepresentanteLegal = $scope.view.persona.representanteLegal.id;
            persona.representanteLegal = undefined;
            PersonaJuridicaService.update(persona).then(
                function (response) {
                    toastr.success('Representante actualizado');
                    $scope.working = false;
                },
                function error(err) {
                    toastr.error(err.data.errorMessage);
                }
            );

        };

    });
