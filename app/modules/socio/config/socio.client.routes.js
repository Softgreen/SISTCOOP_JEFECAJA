'use strict';

// Setting up route
angular.module('socio').config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {

        var moduleName = 'socio';

        // Check if user has role
        var checkUserRole = function (role, $q, $timeout, $http, $location, Auth) {

            // Initialize a new promise
            var deferred = $q.defer();

            // Authenticated
            if (Auth.authz.hasResourceRole(role, moduleName)) {
                $timeout(deferred.resolve);
            }

            // Not Authenticated
            else {
                $timeout(deferred.reject);
                //$location.url('/auth/login');
                alert('No tiene los permisos para poder acceder a esta pagina');
            }

            return deferred.promise;
        };

        $urlRouterProvider.when('/socio/app', '/socio/app/socio/socios');

        $urlRouterProvider.when('/socio/app/socio/socios', '/socio/app/socio/socios/buscar');
        $urlRouterProvider.when('/socio/app/socio/socios/editar/:socio', '/socio/app/socio/socios/editar/:socio/resumen');
        $urlRouterProvider.when('/socio/app/socio/socios/editar/:socio/cuentasPersonales', '/socio/app/socio/socios/editar/:socio/cuentasPersonales/buscar');

        $urlRouterProvider.when('/socio/app/socio/cuentasPersonales', '/socio/app/socio/cuentasPersonales/buscar');
        $urlRouterProvider.when('/socio/app/socio/cuentasPersonales/editar/:cuentaPersonal', '/socio/app/socio/cuentasPersonales/editar/:cuentaPersonal/resumen');
        $urlRouterProvider.when('/socio/app/socio/cuentasPersonales/editar/:cuentaPersonal/chequeras', '/socio/app/socio/cuentasPersonales/editar/:cuentaPersonal/chequeras/buscar');

        $stateProvider
            .state('socio', {
                abstract: true,
                url: '/socio',
                templateUrl: 'modules/socio/views/_body.html',
                controller: 'SocioController'
            })
            .state('socio.home', {
                url: '/home',
                templateUrl: 'modules/socio/views/index.html',
                ncyBreadcrumb: {
                    label: 'Index'
                }
            })
            .state('socio.app', {
                url: '/app',
                template: '<div ui-view></div>',
                ncyBreadcrumb: {
                    skip: true // Never display this state in breadcrumb.
                }
            })

            .state('socio.app.socio', {
                url: '/socio',
                template: '<div ui-view></div>',
                abstract: true
            })
            .state('socio.app.configuracion', {
                url: '/configuracion',
                template: '<div ui-view></div>',
                abstract: true
            })

            //socios
            .state('socio.app.socio.socio', {
                url: '/socios',
                template: '<div ui-view></div>',
                ncyBreadcrumb: {
                    skip: true // Never display this state in breadcrumb.
                }
            })
            .state('socio.app.socio.socio.buscar', {
                url: '/buscar',
                templateUrl: 'modules/socio/views/socio/form-buscar-socio.html',
                controller: 'Socio.Socio.BuscarSocioController',
                ncyBreadcrumb: {
                    label: 'Home'
                }
            })
            .state('socio.app.socio.socio.crear', {
                url: '/crear',
                templateUrl: 'modules/socio/views/socio/form-crear-socio.html',
                controller: 'Socio.Socio.CrearSocioController',
                ncyBreadcrumb: {
                    label: 'Crear documento',
                    parent: 'socio.app.socio.socio.buscar'
                }
            })
            .state('socio.app.socio.socio.editar', {
                url: '/editar/:socio',
                templateUrl: 'modules/socio/views/socio/form-editar-socio.html',
                resolve: {
                    socio: function ($state, $stateParams, SocioService) {
                        return SocioService.findById($stateParams.socio);
                    }
                },
                controller: 'Socio.Socio.EditarSocioController',
                ncyBreadcrumb: {
                    label: 'Editar socio',
                    parent: 'socio.app.socio.socio.buscar'
                }
            })
            .state('socio.app.socio.socio.editar.resumen', {
                url: '/resumen',
                templateUrl: 'modules/socio/views/socio/form-editar-resumen.html',
                controller: 'Socio.Socio.EditarSocio.ResumenController',
                ncyBreadcrumb: {
                    skip: true // Never display this state in breadcrumb.
                }
            })
            .state('socio.app.socio.socio.editar.cuentaPersonal', {
                url: '/cuentasPersonales',
                template: '<ui-view></ui-view>',
                ncyBreadcrumb: {
                    skip: true // Never display this state in breadcrumb.
                }
            })
            .state('socio.app.socio.socio.editar.cuentaPersonal.buscar', {
                url: '/buscar',
                templateUrl: 'modules/socio/views/socio/cuentaPersonal/form-buscar-cuentaPersonal.html',
                controller: 'Socio.Socio.CuentaPersonal.BuscarCuentaPersonalController',
                ncyBreadcrumb: {
                    label: 'Cuentas personales'
                }
            })
            .state('socio.app.socio.socio.editar.cuentaPersonal.crear', {
                url: '/crear',
                templateUrl: 'modules/socio/views/socio/cuentaPersonal/form-crear-cuentaPersonal.html',
                controller: 'Socio.Socio.CuentaPersonal.CrearCuentaPersonalController',
                ncyBreadcrumb: {
                    label: 'Crear cuenta personal',
                    parent: 'socio.app.socio.socio.editar.cuentaPersonal.buscar'
                }
            })

            // cuentas personales
            .state('socio.app.socio.cuentaPersonal', {
                url: '/cuentasPersonales',
                template: '<div ui-view></div>',
                ncyBreadcrumb: {
                    skip: true // Never display this state in breadcrumb.
                }
            })
            .state('socio.app.socio.cuentaPersonal.buscar', {
                url: '/buscar',
                templateUrl: 'modules/socio/views/cuentaPersonal/form-buscar-cuentaPersonal.html',
                controller: 'Socio.CuentaPersonal.BuscarCuentaPersonalController',
                ncyBreadcrumb: {
                    label: 'Home'
                }
            })
            .state('socio.app.socio.cuentaPersonal.crear', {
                url: '/crear',
                templateUrl: 'modules/socio/views/cuentaPersonal/form-crear-cuentaPersonal.html',
                controller: 'Socio.CuentaPersonal.CrearCuentaPersonalController',
                ncyBreadcrumb: {
                    label: 'Crear cuenta personal',
                    parent: 'socio.app.socio.cuentaPersonal.buscar'
                }
            })
            .state('socio.app.socio.cuentaPersonal.editar', {
                url: '/editar/:cuentaPersonal',
                templateUrl: 'modules/socio/views/cuentaPersonal/form-editar-cuentaPersonal.html',
                resolve: {
                    cuentaPersonal: function ($state, $stateParams, CuentaBancariaService) {
                        return CuentaBancariaService.findById($stateParams.cuentaPersonal);
                    }
                },
                controller: 'Socio.CuentaPersonal.EditarCuentaPersonalController',
                ncyBreadcrumb: {
                    label: 'Editar cuenta personal',
                    parent: 'socio.app.socio.cuentaPersonal.buscar'
                }
            })
            .state('socio.app.socio.cuentaPersonal.editar.resumen', {
                url: '/resumen',
                templateUrl: 'modules/socio/views/cuentaPersonal/form-editar-resumen.html',
                controller: 'Socio.CuentaPersonal.EditarCuentaPersonal.ResumenController',
                ncyBreadcrumb: {
                    skip: true // Never display this state in breadcrumb.
                }
            })
            .state('socio.app.socio.cuentaPersonal.editar.titular', {
                url: '/titulares',
                templateUrl: 'modules/socio/views/cuentaPersonal/form-editar-titulares.html',
                controller: 'Socio.CuentaPersonal.EditarCuentaPersonal.TitularesController',
                ncyBreadcrumb: {
                    label: 'Titulares',
                    parent: 'socio.app.socio.cuentaPersonal.editar.resumen'
                }
            })
            .state('socio.app.socio.cuentaPersonal.editar.beneficiario', {
                url: '/beneficiarios',
                templateUrl: 'modules/socio/views/cuentaPersonal/form-editar-beneficiarios.html',
                controller: 'Socio.CuentaPersonal.EditarCuentaPersonal.BeneficiariosController',
                ncyBreadcrumb: {
                    label: 'Beneficiarios',
                    parent: 'socio.app.socio.cuentaPersonal.editar.resumen'
                }
            })

            //Chequera
            .state('socio.app.socio.cuentaPersonal.editar.chequera', {
                url: '/chequeras',
                template: '<div ui-view></div>',
                ncyBreadcrumb: {
                    skip: true // Never display this state in breadcrumb.
                }
            })
            .state('socio.app.socio.cuentaPersonal.editar.chequera.buscar', {
                url: '/buscar',
                templateUrl: 'modules/socio/views/cuentaPersonal/chequera/form-buscar-chequera.html',
                controller: 'Socio.CuentaPersonal.Chequera.BuscarController',
                ncyBreadcrumb: {
                    label: 'Chequeras'
                }
            })
            .state('socio.app.socio.cuentaPersonal.editar.chequera.crear', {
                url: '/crear',
                templateUrl: 'modules/socio/views/cuentaPersonal/chequera/form-crear-chequera.html',
                controller: 'Socio.CuentaPersonal.Chequera.CrearController',
                ncyBreadcrumb: {
                    label: 'Crear chequera',
                    parent: 'socio.app.socio.cuentaPersonal.editar.chequera.buscar'
                }
            })
            .state('socio.app.socio.cuentaPersonal.editar.chequera.editar', {
                url: '/editar/:chequera',
                templateUrl: 'modules/socio/views/cuentaPersonal/chequera/form-editar-chequera.html',
                resolve: {
                    chequera: function ($state, $stateParams, cuentaPersonal, CuentaBancariaService) {
                        return CuentaBancariaService.getChequera(cuentaPersonal.id, $stateParams.chequera);
                    }
                },
                controller: 'Socio.CuentaPersonal.Chequera.EditarController',
                ncyBreadcrumb: {
                    label: 'Editar chequera',
                    parent: 'socio.app.socio.cuentaPersonal.editar.chequera.buscar'
                }
            })

            //configuracion
            .state('socio.app.configuracion.configuracion', {
                url: '/configuracion',
                template: '<div ui-view></div>',
                ncyBreadcrumb: {
                    skip: true // Never display this state in breadcrumb.
                }
            });

    }
]);
