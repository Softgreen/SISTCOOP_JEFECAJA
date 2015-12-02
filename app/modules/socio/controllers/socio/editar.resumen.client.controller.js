'use strict';

/* jshint -W098 */
angular.module('socio').controller('Socio.Socio.EditarSocio.ResumenController',
    function ($scope, $state, socio, PersonaNaturalService, PersonaJuridicaService, SocioService) {

        $scope.view = {
            socio: socio
        };

        $scope.view.load = {
            socioPersona: undefined,
            representanteLegal: undefined,
            cuentaAporte: undefined,
            cuentasPersonales: undefined
        };

        $scope.loadSocioAsPersonaNatural = function () {
            if($scope.view.socio.tipoPersona === 'NATURAL') {
                PersonaNaturalService.findByTipoNumeroDocumento($scope.view.socio.idTipoDocumento, $scope.view.socio.numeroDocumento).then(function (response) {
                    $scope.view.load.socioPersona = response;
                });
            } else {
                PersonaJuridicaService.findByTipoNumeroDocumento($scope.view.socio.idTipoDocumento, $scope.view.socio.numeroDocumento).then(function (response) {
                    $scope.view.load.socioPersona = response;
                });
            }
        };
        $scope.loadSocioAsPersonaNatural();

        /*$scope.loadRepresentanteLegal = function () {
         if ($scope.view.socio.tipoDocumentoRepresentanteLegal && $scope.view.socio.numeroDocumentoRepresentanteLegal) {
         SGPersonaNatural.$search({
         tipoDocumento: $scope.view.socio.tipoDocumentoRepresentanteLegal,
         numeroDocumento: $scope.view.socio.numeroDocumentoRepresentanteLegal
         }).then(function (response) {
         $scope.view.load.representanteLegal = response.items[0];
         });
         }
         };
         $scope.loadRepresentanteLegal();*/

        /*$scope.loadCuentaAporte = function () {
         $scope.view.socio.$getCuentaAporte().then(function (response) {
         $scope.view.load.cuentaAporte = response;
         });
         };
         $scope.loadCuentaAporte();*/

        $scope.loadCuentasPersonales = function () {
            SocioService.getCuentasBancarias($scope.view.socio.id).then(function (response) {
                $scope.view.load.cuentasPersonales = response;
            });
        };
        $scope.loadCuentasPersonales();

        $scope.verCuentaPersonal = function () {
            alert('no implementado');
        };

    });

