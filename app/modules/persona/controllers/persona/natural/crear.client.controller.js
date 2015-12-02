'use strict';

/* jshint -W098 */
angular.module('persona').controller('Persona.Natural.CrearPersonaNaturalController',
    function ($scope, $state, $stateParams, toastr, MaestroService, PersonaNaturalService) {

        $scope.working = false;

        $scope.view = {
            persona: {}
        };

        $scope.combo = {
            pais: undefined,
            tipoDocumento: undefined,
            sexo: undefined,
            estadoCivil: undefined
        };
        $scope.combo.selected = {
            pais: undefined,
            tipoDocumento: undefined,
            sexo: undefined,
            estadoCivil: undefined
        };

        $scope.loadCombos = function () {
            MaestroService.getPaises().then(function (response) {
                $scope.combo.pais = response;
            });
            PersonaNaturalService.getTipoDocumentos().then(function (response) {
                $scope.combo.tipoDocumento = response;
            });
            MaestroService.getSexos().then(function (response) {
                $scope.combo.sexo = response;
            });
            MaestroService.getEstadosciviles().then(function (response) {
                $scope.combo.estadoCivil = response;
            });
        };
        $scope.loadCombos();

        $scope.loadParams = function () {
            $scope.view.persona.tipoDocumento = $stateParams.tipoDocumento;
            $scope.view.persona.numeroDocumento = $stateParams.numeroDocumento;
        };
        $scope.loadParams();

        $scope.loadDefaultConfiguration = function () {
            $scope.view.persona.codigoPais = 'PER';
        };
        $scope.loadDefaultConfiguration();

        $scope.check = function ($event) {
            if (!angular.isUndefined($event))
                $event.preventDefault();
            if (!angular.isUndefined($scope.combo.selected.tipoDocumento) && !angular.isUndefined($scope.view.persona.numeroDocumento)) {
                PersonaNaturalService.findByTipoNumeroDocumento($scope.combo.selected.tipoDocumento.id, $scope.view.persona.numeroDocumento).then(function (response) {
                    if (!response)
                        toastr.info('Documento de identidad disponible');
                    else
                        toastr.warning('Documento de identidad no disponible');
                });
            }
        };

        $scope.save = function () {
            var save = function () {
                $scope.view.persona.codigoPais = $scope.combo.selected.pais.abreviatura;
                $scope.view.persona.tipoDocumento = {
                    id: $scope.combo.selected.tipoDocumento.id,
                    abreviatura: $scope.combo.selected.tipoDocumento.abreviatura
                };
                $scope.view.persona.sexo = $scope.combo.selected.sexo;
                $scope.view.persona.estadoCivil = $scope.combo.selected.estadoCivil;
                $scope.working = true;
                PersonaNaturalService.crear($scope.view.persona).then(
                    function (response) {
                        toastr.success('Persona creada');
                        $scope.working = false;
                        $state.go('^.editar', {personaNatural: response.id});
                    },
                    function error(err) {
                        toastr.error(err.data.message);
                    }
                );
            };

            PersonaNaturalService.findByTipoNumeroDocumento($scope.combo.selected.tipoDocumento.id, $scope.view.persona.numeroDocumento).then(function (response) {
                if (!response)
                    save();
                else
                    toastr.warning('Documento de identidad no disponible');
            });

        };

    })
;
