'use strict';

/* jshint -W098 */
angular.module('socio').controller('Socio.CuentaPersonal.EditarCuentaPersonal.TitularesController',
    function ($scope, $state, toastr, SGDialog, cuentaPersonal, CuentaBancariaService, PersonaNaturalService) {

        $scope.view = {
            cuentaPersonal: cuentaPersonal,
            titular: {}
        };

        $scope.view.load = {
            titulares: [],
            persona: undefined
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

        $scope.loadTitulares = function () {
            CuentaBancariaService.getTitulares($scope.view.cuentaPersonal.id).then(function (response) {
                $scope.view.load.titulares = response;
            });
        };
        $scope.loadTitulares();

        $scope.check = function ($event) {
            if (!angular.isUndefined($event)) {
                $event.preventDefault();
            }
            PersonaNaturalService.findByTipoNumeroDocumento($scope.combo.selected.tipoDocumento.id, $scope.view.titular.numeroDocumento).then(function (response) {
                $scope.view.load.persona = response;
                if ($scope.view.load.persona) {
                    toastr.info('Persona encontrada');
                } else {
                    toastr.warning('Persona no encontrada');
                }
            });
        };

        $scope.asignarTitular = function (item) {
            SGDialog.confirm('Guardar', 'Estas seguro de querer asignar permanentemente este titular?', function () {
                var titular = {
                    idTipoDocumento: $scope.view.load.persona.tipoDocumento.id,
                    numeroDocumento: $scope.view.load.persona.numeroDocumento
                };
                CuentaBancariaService.addTitular($scope.view.cuentaPersonal.id, titular).then(
                    function (response) {
                        toastr.info('Titular asignado');
                        $scope.loadTitulares();
                    }, function error(err) {
                        toastr.warning(err.data.message);
                    }
                );
            });
        };

        $scope.eliminarTitular = function (item) {
            SGDialog.confirmDelete('Titular', 'titular', function () {
                CuentaBancariaService.eliminarTitular($scope.view.cuentaPersonal.id, item.id).then(
                    function (response) {
                        toastr.info('Titular eliminado');
                        $scope.loadTitulares();
                    }, function error(err) {
                        toastr.warning(err.data.message);
                    }
                );
            });
        };

    });
