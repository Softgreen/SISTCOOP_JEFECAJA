'use strict';

/* jshint -W098 */
angular.module('organizacion').controller('Organizacion.Caja.EditarController',
    function ($scope, $state, caja, SGDialog) {

        $scope.view = {
            caja: caja
        };

        $scope.desactivar = function () {
            SGDialog.confirm('Desactivar', 'Estas seguro de querer eliminar permanentemente la caja?', function () {
                alert('Metdo no implementado');
            });
        };

    });
