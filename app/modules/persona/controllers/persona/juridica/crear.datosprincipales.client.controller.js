'use strict';

/* jshint -W098 */
angular.module('persona').controller('Persona.Juridica.CrearPersonaJuridica.DatosPrincipalesController',
    function ($scope, $state, $stateParams, toastr, MaestroService, PersonaNaturalService, PersonaJuridicaService) {

        $scope.combo = {
            tipoDocumento: undefined,
            tipoEmpresa: undefined
        };
        $scope.combo.selected = {
            tipoDocumento: undefined,
            tipoEmpresa: undefined
        };

        $scope.loadCombo = function () {
            PersonaJuridicaService.getTipoDocumentos().then(function (response) {
                $scope.combo.tipoDocumento = response;
            });
            MaestroService.getTiposEmpresa().then(function (response) {
                $scope.combo.tipoEmpresa = response;
            });
        };
        $scope.loadCombo();

        $scope.check = function ($event) {
            if ($event) {
                $event.preventDefault();
            }
            if ($scope.combo.selected.tipoDocumento && $scope.view.persona.numeroDocumento) {
                PersonaJuridicaService.findByTipoNumeroDocumento($scope.combo.selected.tipoDocumento.id, $scope.view.persona.numeroDocumento).then(function (response) {
                    if (response) {
                        toastr.warning('Documento de identidad No disponible');
                    } else {
                        toastr.info('Documento de identidad disponible');
                    }
                });
            }
        };

        $scope.goTabRepresentante = function () {
            if ($scope.form.$valid) {
                $scope.view.persona.tipoDocumento = {
                    id: $scope.combo.selected.tipoDocumento.id,
                    abreviatura: $scope.combo.selected.tipoDocumento.abreviatura
                };
                $scope.view.persona.tipoEmpresa = $scope.combo.selected.tipoEmpresa;
                $state.go('^.representante');
            } else {
                $scope.form.$setSubmitted();
            }
        };

    });
