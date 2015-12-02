'use strict';

/* jshint -W098 */

angular.module('rrhh').controller('Rrhh.Trabajador.EditarTrabajador.ResumenController',
    function ($scope, trabajador, PersonaNaturalService, SGUsuarioKeycloak) {

        $scope.view = {
            trabajador: trabajador
        };

        $scope.view.loaded = {
            persona: undefined,
            userKeycloak: {
                rolesAssigned: []
            }
        };

        $scope.loadPersona = function () {
            PersonaNaturalService.findByTipoNumeroDocumento($scope.view.trabajador.idTipoDocumento, $scope.view.trabajador.numeroDocumento).then(function (response) {
                $scope.view.loaded.persona = response;
            });
        };
        $scope.loadPersona();

        $scope.loadUsuario = function () {
            //Usuario de keycloak, para sacar roles
            var usuario = $scope.view.trabajador.usuario;
            if (usuario) {
                SGUsuarioKeycloak.$search({username: usuario, max: 1}).then(function (response1) {
                    SGUsuarioKeycloak.$realmRoles(response1[0].id).then(function (response2) {
                        for (var i = 0; i < response2.length; i++) {
                            $scope.view.loaded.userKeycloak.rolesAssigned.push(response2[i].name);
                        }
                    });
                });
            }
        };
        $scope.loadUsuario();

    });


