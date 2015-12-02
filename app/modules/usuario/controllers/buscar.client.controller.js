'use strict';

angular.module('usuario').controller('Usuario.BuscarUsuarioController',
    function ($scope, $window, SGUsuarioKeycloak) {
        $window.open(SGUsuarioKeycloak.$getCreateRealmUserUrl());
    });
