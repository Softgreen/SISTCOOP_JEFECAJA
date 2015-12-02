'use strict';

/* jshint -W098 */
angular.module('persona').controller('Persona.Juridica.CrearPersonaJuridicaController',
    function ($scope, $state, $stateParams, toastr, MaestroService, PersonaNaturalService, PersonaJuridicaService) {

        $scope.working = false;

        $scope.view = {
            persona: {}
        };

        $scope.loadParams = function () {
            $scope.view.persona.tipoDocumento = $stateParams.tipoDocumento;
            $scope.view.persona.numeroDocumento = $stateParams.numeroDocumento;
        };
        $scope.loadParams();

        $scope.save = function () {

            if (!$scope.view.persona.idRepresentanteLegal) {
                toastr.warning('Representante legal no definido.');
                return;
            }

            PersonaJuridicaService.findByTipoNumeroDocumento($scope.view.persona.tipoDocumento.id, $scope.view.persona.numeroDocumento).then(function (response) {
                if (!response) {
                    $scope.working = true;

                    PersonaJuridicaService.crear($scope.view.persona).then(
                        function (response) {
                            toastr.success('Persona creada');
                            $scope.working = false;
                            $state.go('^.^.editar', {personaJuridica: response.id});
                        },
                        function error(err) {
                            toastr.error(err.data.message);
                        }
                    );
                } else {
                    toastr.error('Documento de identidad no disponible');
                }
            });

        };

    });
