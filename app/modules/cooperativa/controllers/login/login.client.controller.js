'use strict';

/* jshint -W098 */
angular.module('cooperativa').controller('Cooperativa.LoginController',
    function ($scope, $state, $modalInstance, toastr, UsuarioService) {

        $scope.view = {
            usuario: undefined,
            password: undefined
        };

        $scope.save = function () {
            UsuarioService.authenticationAsAdministrator($scope.view.usuario, $scope.view.password).then(
                function (data) {
                    toastr.success('Usuario autenticado.');
                    $modalInstance.close(true);
                },
                function error(err) {
                    toastr.error('Usuario y/o password no encontrado.');
                }
            );
        };

        $scope.cancel = function () {
            $modalInstance.dismiss(false);
        };

    });
