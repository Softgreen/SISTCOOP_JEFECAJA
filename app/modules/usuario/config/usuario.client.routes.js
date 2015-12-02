'use strict';

// Setting up route
angular.module('usuario').config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('usuario', {
                abstract: true,
                url: '/usuario',
                templateUrl: 'modules/usuario/views/_body.html'
            })
            .state('usuario.home', {
                url: '/home',
                templateUrl: 'modules/usuario/views/index.html',
                ncyBreadcrumb: {
                    label: 'Index'
                }
            })

            .state('usuario.app', {
                url: '/app',
                template: '<div ui-view></div>',
                controller: 'Usuario.BuscarUsuarioController'
            });
    }
]);
