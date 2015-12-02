'use strict';

/* jshint -W098 */
angular.module('rrhh').controller('Rrhh.Trabajador.EditarTrabajador.DatosPrincipalesController',
    function ($scope, toastr, trabajador, SucursalService, PersonaNaturalService, TrabajadorService) {

        $scope.working = false;

        $scope.view = {
            trabajador: trabajador
        };

        $scope.view.loaded = {
            persona: undefined
        };

        $scope.combo = {
            sucursal: undefined,
            agencia: undefined
        };
        $scope.combo.selected = {
            sucursal: undefined,
            agencia: undefined
        };

        $scope.loadCombo = function () {
            SucursalService.getSucursales().then(function (response1) {
                $scope.combo.sucursal = response1;
                $scope.$watch('combo.selected.sucursal', function () {
                    if (angular.isDefined($scope.combo.selected.sucursal)) {
                        SucursalService.getAgencias($scope.combo.selected.sucursal.id).then(function (response2) {
                            $scope.combo.agencia = response2;

                            for (var i = 0; i < $scope.combo.agencia.length; i++) {
                                if ($scope.view.trabajador.idAgencia === $scope.combo.agencia[i].id) {
                                    $scope.combo.selected.agencia = $scope.combo.agencia[i];
                                }
                            }
                        });
                    }
                }, true);

                for (var i = 0; i < $scope.combo.sucursal.length; i++) {
                    if ($scope.view.trabajador.idSucursal === $scope.combo.sucursal[i].id) {
                        $scope.combo.selected.sucursal = $scope.combo.sucursal[i];
                    }
                }
            });

        };
        $scope.loadCombo();

        $scope.loadPersona = function () {
            var idTipoDocumento = $scope.view.trabajador.idTipoDocumento;
            var numeroDocumento = $scope.view.trabajador.numeroDocumento;
            PersonaNaturalService.findByTipoNumeroDocumento(idTipoDocumento, numeroDocumento).then(function (response) {
                $scope.view.loaded.persona = response;
            });
        };
        $scope.loadPersona();

        $scope.save = function () {
            var trabajador = {
                idSucursal: $scope.combo.selected.sucursal.id,
                idAgencia: $scope.combo.selected.agencia.id,
                idTipoDocumento: $scope.view.trabajador.idTipoDocumento,
                numeroDocumento: $scope.view.trabajador.numeroDocumento,
                usuario: $scope.view.trabajador.usuario
            };

            $scope.working = true;

            TrabajadorService.actualizar($scope.view.trabajador.id, trabajador).then(
                function (response) {
                    $scope.working = false;
                    toastr.success('Trabajador actualizado satisfactoriamente');
                },
                function error(err) {
                    toastr.error(err.data.message);
                }
            );

        };

    }
);
