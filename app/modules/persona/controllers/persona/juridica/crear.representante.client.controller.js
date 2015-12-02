'use strict';

/* jshint -W098 */
angular.module('persona').controller('Persona.Juridica.CrearPersonaJuridica.RepresentanteController',
    function ($scope, $state, toastr, MaestroService, PersonaNaturalService) {

        $scope.verificarDatos = function () {
            if (!$scope.view.persona.razonSocial) {
                $state.go('^.datosPrincipales');
            }
        };
        $scope.verificarDatos();

        $scope.view = {
            representante: $scope.view.persona.representanteLegal
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
            if ($event) {
                $event.preventDefault();
            }
            if ($scope.combo.selected.tipoDocumento && $scope.view.representante.numeroDocumento) {
                PersonaNaturalService.findByTipoNumeroDocumento($scope.combo.selected.tipoDocumento.id, $scope.view.representante.numeroDocumento).then(function (response) {
                    if (response) {
                        $scope.view.representante = response;
                        $scope.$parent.view.persona.idRepresentanteLegal = response.id;
                        toastr.info('Persona encontrada');
                    } else {
                        toastr.warning('Persona no encontrada');
                    }
                });
            }
        };

    });
