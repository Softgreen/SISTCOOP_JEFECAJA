'use strict';

// Setting up route
angular.module('cooperativa').config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {

        var moduleName = 'cooperativa';

        $urlRouterProvider.when('/cooperativa/app', '/cooperativa/app/transaccionCliente/transacciones/compraVenta');

        //Transacciones cliente
        $urlRouterProvider.when('/cooperativa/app/transaccionCliente/transacciones', '/cooperativa/app/transaccionCliente/transacciones/compraVenta');
        $urlRouterProvider.when('/cooperativa/app/transaccionCliente/historial', '/cooperativa/app/transaccionCliente/historial/buscar');

        //Transacciones interna
        $urlRouterProvider.when('/cooperativa/app/transaccionInterna/transaccionesBovedaCaja', '/cooperativa/app/transaccionInterna/transaccionesBovedaCaja/buscar');
        $urlRouterProvider.when('/cooperativa/app/transaccionInterna/transaccionesCajaCaja', '/cooperativa/app/transaccionInterna/transaccionesCajaCaja/buscar');

        //Administracion
        $urlRouterProvider.when('/cooperativa/app/administracion/historiales', '/cooperativa/app/administracion/historiales/buscar');
        $urlRouterProvider.when('/cooperativa/app/administracion/historiales/editar/:historial', '/cooperativa/app/administracion/historiales/editar/:historial/resumen');

        $urlRouterProvider.when('/cooperativa/app/administracion/pendientes', '/cooperativa/app/administracion/pendientes/buscar');

        $stateProvider
            .state('cooperativa', {
                abstract: true,
                url: '/cooperativa',
                templateUrl: 'modules/cooperativa/views/_body.html',
                controller: 'CooperativaController'
            })
            .state('cooperativa.home', {
                url: '/home',
                templateUrl: 'modules/cooperativa/views/index.html',
                ncyBreadcrumb: {
                    label: 'Index'
                }
            })
            .state('cooperativa.app', {
                url: '/app',
                template: '<div ui-view></div>',
                ncyBreadcrumb: {
                    skip: true // Never display this state in breadcrumb.
                }
            })

            .state('cooperativa.app.operaciones', {
                url: '/operaciones',
                template: '<div ui-view></div>',
                abstract: true
            })
            .state('cooperativa.app.transaccionCliente', {
                url: '/transaccionCliente',
                template: '<div ui-view></div>',
                abstract: true
            })
            .state('cooperativa.app.transaccionInterna', {
                url: '/transaccionInterna',
                template: '<div ui-view></div>',
                abstract: true
            })
            .state('cooperativa.app.administracion', {
                url: '/administracion',
                template: '<div ui-view></div>',
                abstract: true
            })

            .state('cooperativa.app.operaciones.cerrarCaja', {
                url: '/cerrarCaja',
                templateUrl: 'modules/cooperativa/views/operaciones/form-cerrar-caja.html',
                controller: 'Cooperativa.Operaciones.CerrarCajaController',
                ncyBreadcrumb: {
                    label: 'Cerrar Caja'
                }
            })

            //Transaccion Cliente
            .state('cooperativa.app.transaccionCliente.transaccion', {
                url: '/transacciones',
                templateUrl: 'modules/cooperativa/views/transaccionCliente/form-transaccion-cliente.html',
                ncyBreadcrumb: {
                    skip: true // Never display this state in breadcrumb.
                }
            })
            .state('cooperativa.app.transaccionCliente.historial', {
                url: '/historial',
                template: '<div ui-view></div>',
                ncyBreadcrumb: {
                    skip: true // Never display this state in breadcrumb.
                }
            })

            .state('cooperativa.app.transaccionCliente.transaccion.compraVenta', {
                url: '/compraVenta',
                templateUrl: 'modules/cooperativa/views/transaccionCliente/compraVenta/form-transaccion-compraVenta.html',
                controller: 'Cooperativa.TransaccionCliente.CompraVenta.CrearController',
                resolve: {},
                ncyBreadcrumb: {
                    label: 'Home'
                }
            })
            .state('cooperativa.app.transaccionCliente.transaccion.cuentaPersonal', {
                url: '/cuentaPersonal',
                templateUrl: 'modules/cooperativa/views/transaccionCliente/cuentaPersonal/form-transaccion-cuentaPersonal.html',
                controller: 'Cooperativa.TransaccionCliente.CuentaPersonal.CrearController',
                resolve: {},
                ncyBreadcrumb: {
                    label: 'Home'
                }
            })

            .state('cooperativa.app.transaccionCliente.historial.buscar', {
                url: '/buscar',
                templateUrl: 'modules/cooperativa/views/transaccionCliente/historial/form-buscar-transaccion.html',
                controller: 'Cooperativa.TransaccionCliente.Historial.BuscarController',
                resolve: {},
                ncyBreadcrumb: {
                    label: 'Home'
                }
            })

            //Transacciones internas
            .state('cooperativa.app.transaccionInterna.bovedaCaja', {
                url: '/transaccionesBovedaCaja',
                template: '<div ui-view></div>',
                ncyBreadcrumb: {
                    skip: true // Never display this state in breadcrumb.
                }
            })
            .state('cooperativa.app.transaccionInterna.cajaCaja', {
                url: '/transaccionesCajaCaja',
                template: '<div ui-view></div>',
                ncyBreadcrumb: {
                    skip: true // Never display this state in breadcrumb.
                }
            })

            .state('cooperativa.app.transaccionInterna.bovedaCaja.buscar', {
                url: '/buscar',
                templateUrl: 'modules/cooperativa/views/transaccionInterna/bovedaCaja/form-buscar-transaccionBovedaCaja.html',
                controller: 'Cooperativa.TransaccionInterna.BovedaCaja.BuscarController',
                resolve: {},
                ncyBreadcrumb: {
                    label: 'Home'
                }
            })
            .state('cooperativa.app.transaccionInterna.bovedaCaja.crear', {
                url: '/crear',
                templateUrl: 'modules/cooperativa/views/transaccionInterna/bovedaCaja/form-crear-transaccionBovedaCaja.html',
                controller: 'Cooperativa.TransaccionInterna.BovedaCaja.CrearController',
                resolve: {},
                ncyBreadcrumb: {
                    label: 'Crear transaccion boveda-caja',
                    parent: 'cooperativa.app.transaccionInterna.bovedaCaja.buscar'
                }
            })

            .state('cooperativa.app.transaccionInterna.cajaCaja.buscar', {
                url: '/buscar',
                templateUrl: 'modules/cooperativa/views/transaccionInterna/cajaCaja/form-buscar-transaccionCajaCaja.html',
                controller: 'Cooperativa.TransaccionInterna.CajaCaja.BuscarController',
                resolve: {},
                ncyBreadcrumb: {
                    label: 'Home'
                }
            })
            .state('cooperativa.app.transaccionInterna.cajaCaja.crear', {
                url: '/crear',
                templateUrl: 'modules/cooperativa/views/transaccionInterna/cajaCaja/form-crear-transaccionCajaCaja.html',
                controller: 'Cooperativa.TransaccionInterna.CajaCaja.CrearController',
                resolve: {},
                ncyBreadcrumb: {
                    label: 'Crear transaccion caja-caja',
                    parent: 'cooperativa.app.transaccionInterna.cajaCaja.buscar'
                }
            })

            //administracion
            .state('cooperativa.app.administracion.pendiente', {
                url: '/pendientes',
                template: '<div ui-view></div>',
                ncyBreadcrumb: {
                    skip: true // Never display this state in breadcrumb.
                }
            })
            .state('cooperativa.app.administracion.historial', {
                url: '/historiales',
                template: '<div ui-view></div>',
                ncyBreadcrumb: {
                    skip: true // Never display this state in breadcrumb.
                }
            })

            .state('cooperativa.app.administracion.pendiente.buscar', {
                url: '/buscar',
                templateUrl: 'modules/cooperativa/views/administracion/pendiente/form-buscar-pendiente.html',
                controller: 'Cooperativa.Administracion.Pendiente.BuscarController',
                resolve: {},
                ncyBreadcrumb: {
                    label: 'Home'
                }
            })
            .state('cooperativa.app.administracion.pendiente.crear', {
                url: '/crear?idBoveda&monto&idPendienteRelacionado&tipoPendiente',
                templateUrl: 'modules/cooperativa/views/administracion/pendiente/form-crear-pendiente.html',
                controller: 'Cooperativa.Administracion.Pendiente.CrearController',
                resolve: {},
                ncyBreadcrumb: {
                    label: 'Crear pendiente',
                    parent: 'cooperativa.app.administracion.pendiente.buscar'
                }
            })

            .state('cooperativa.app.administracion.historial.buscar', {
                url: '/buscar',
                templateUrl: 'modules/cooperativa/views/administracion/historial/form-buscar-historiales.html',
                controller: 'Cooperativa.Administracion.Historial.BuscarController',
                resolve: {},
                ncyBreadcrumb: {
                    label: 'Home'
                }
            })
            .state('cooperativa.app.administracion.historial.editar', {
                url: '/editar/:historial',
                templateUrl: 'modules/cooperativa/views/administracion/historial/form-editar-historial.html',
                controller: 'Cooperativa.Administracion.Historial.EditarController',
                resolve: {
                    historial: function ($state, $stateParams) {
                        return {id: $stateParams.historial};
                    }
                },
                ncyBreadcrumb: {
                    label: 'Editar historial',
                    parent: 'cooperativa.app.administracion.historial.buscar'
                }
            })
            .state('cooperativa.app.administracion.historial.editar.resumen', {
                url: '/resumen',
                templateUrl: 'modules/cooperativa/views/administracion/historial/form-editar-historial-resumen.html',
                //controller: 'Cooperativa.Boveda.Editar.ResumenController',
                resolve: {},
                ncyBreadcrumb: {
                    skip: true // Never display this state in breadcrumb.
                }
            })
            .state('cooperativa.app.administracion.historial.editar.balanceCaja', {
                url: '/datosPrincipales',
                templateUrl: 'modules/cooperativa/views/administracion/historial/form-editar-historial-balanceCaja.html',
                //controller: 'Cooperativa.Boveda.Editar.DatosPrincipalesController',
                resolve: {},
                ncyBreadcrumb: {
                    label: 'Datos principales'
                }
            });


    }
]);
