'use strict';

/* jshint -W098 */
angular.module('rrhh').controller('Rrhh.Trabajador.CrearTrabajadorController',
    function ($scope, $state, toastr, PersonaNaturalService, TrabajadorService, SucursalService) {

        $scope.working = false;

        $scope.view = {
            trabajador: {}
        };

        $scope.view.loaded = {
            persona: undefined,
            trabajador: undefined
        };

        $scope.combo = {
            sucursal: undefined,
            agencia: undefined,
            tipoDocumento: undefined
        };
        $scope.combo.selected = {
            sucursal: undefined,
            agencia: undefined,
            tipoDocumento: undefined
        };

        $scope.loadCombo = function () {
            SucursalService.getSucursales().then(function (response1) {
                $scope.combo.sucursal = response1;
                $scope.$watch('combo.selected.sucursal', function () {
                    if (angular.isDefined($scope.combo.selected.sucursal)) {
                        SucursalService.getAgencias($scope.combo.selected.sucursal.id).then(function (response2) {
                            $scope.combo.agencia = response2;
                        });
                    }
                }, true);
            });

            PersonaNaturalService.getTipoDocumentos().then(function (response) {
                $scope.combo.tipoDocumento = response;
            });
        };
        $scope.loadCombo();

        $scope.check = function ($event) {
            if (!angular.isUndefined($event)) {
                $event.preventDefault();
            }
            PersonaNaturalService.findByTipoNumeroDocumento($scope.combo.selected.tipoDocumento.id, $scope.view.trabajador.numeroDocumento).then(function (response) {
                $scope.view.loaded.persona = response;
                if ($scope.view.loaded.persona) {
                    toastr.info('Persona encontrada');
                } else {
                    toastr.warning('Persona no encontrada');
                }
            });
            /*SGTrabajador.$search({
             tipoDocumento: $scope.combo.selected.tipoDocumento.abreviatura,
             numeroDocumento: $scope.view.trabajador.numeroDocumento
             }).then(function (response) {
             $scope.view.loaded.trabajador = response.items[0];
             });*/
        };

        $scope.save = function () {
            if (angular.isUndefined($scope.view.loaded.persona)) {
                toastr.warning('Debe de seleccionar una persona.');
                return;
            }
            /*if (angular.isDefined($scope.view.loaded.trabajador)) {
             toastr.warning('El trabajador ya fue registrado, no puede continuar.');
             return;
             }*/

            var trabajador = {
                idSucursal: $scope.combo.selected.sucursal.id,
                idAgencia: $scope.combo.selected.agencia.id,
                idTipoDocumento: $scope.combo.selected.tipoDocumento.id,
                numeroDocumento: $scope.view.trabajador.numeroDocumento
            };

            $scope.working = true;

            TrabajadorService.crear(trabajador).then(
                function (response) {
                    toastr.success('Trabajador creado');
                    $scope.working = false;
                    $state.go('^.editar.resumen', {trabajador: response.id});
                },
                function error(err) {
                    toastr.error(err.data.message);
                }
            );
        };
    });
