'use strict';

// Setting up route
angular.module('organizacion').config(['$stateProvider', '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {

    var moduleName = 'cooperativa';

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

    $urlRouterProvider.when('/organizacion/app/estructura/bovedas', '/organizacion/app/estructura/bovedas/buscar');
    $urlRouterProvider.when('/organizacion/app/estructura/cajas', '/organizacion/app/estructura/cajas/buscar');

    $urlRouterProvider.when('/organizacion/app/estructura/bovedas/editar/:boveda', '/organizacion/app/estructura/bovedas/editar/:boveda/resumen');
    $urlRouterProvider.when('/organizacion/app/estructura/cajas/editar/:caja', '/organizacion/app/estructura/cajas/editar/:caja/resumen');

    //$urlRouterProvider.when('/organizacion/app/estructura/bovedas/editar/:boveda/historiales', '/organizacion/app/estructura/bovedas/editar/:boveda/historiales/buscar');

    //$urlRouterProvider.when('/organizacion/app/estructura/bovedas/editar/:boveda/historiales/editar/:historial', '/organizacion/app/estructura/bovedas/editar/:boveda/historiales/editar/:historial/resumen');

    //$urlRouterProvider.when('/organizacion/app/estructura/bovedas/editar/:boveda/historiales/editar/:historial/transaccionesBovedaCaja', '/organizacion/app/estructura/bovedas/editar/:boveda/historiales/editar/:historial/transaccionesBovedaCaja/buscar');

    //$urlRouterProvider.when('/organizacion/app/estructura/cajas/editar/:caja/bovedaCajas', '/organizacion/app/estructura/cajas/editar/:caja/bovedaCajas/buscar');

    //$urlRouterProvider.when('/organizacion/app/estructura/cajas/editar/:caja/bovedaCajas/editar/:bovedaCaja', '/organizacion/app/estructura/cajas/editar/:caja/bovedaCajas/editar/:bovedaCaja/resumen');
    //$urlRouterProvider.when('/organizacion/app/estructura/cajas/editar/:caja/bovedaCajas/editar/:bovedaCaja/historiales', '/organizacion/app/estructura/cajas/editar/:caja/bovedaCajas/editar/:bovedaCaja/historiales/buscar');
    $urlRouterProvider.when('/organizacion/app/estructura/cajas/editar/:caja/bovedaCajas/editar/:bovedaCaja', '/organizacion/app/estructura/cajas/editar/:caja/bovedaCajas/editar/:bovedaCaja/historiales/buscar');
    $urlRouterProvider.when('/organizacion/app/estructura/cajas/editar/:caja/bovedaCajas/editar/:bovedaCaja/historiales/editar/:historial', '/organizacion/app/estructura/cajas/editar/:caja/bovedaCajas/editar/:bovedaCaja/historiales/editar/:historial/resumen');
    $stateProvider
      .state('organizacion', {
        abstract: true,
        url: '/organizacion',
        templateUrl: 'modules/organizacion/views/_body.html',
        controller: 'OrganizacionController'
      })
      .state('organizacion.home', {
        url: '/home',
        templateUrl: 'modules/organizacion/views/index.html',
        ncyBreadcrumb: {
          label: 'Index'
        }
      })
      .state('organizacion.app', {
        url: '/app',
        template: '<div ui-view></div>',
        ncyBreadcrumb: {
          skip: true // Never display this state in breadcrumb.
        }
      })

      .state('organizacion.app.estructura', {
        url: '/estructura',
        template: '<div ui-view></div>',
        abstract: true
      })
      .state('organizacion.app.transaccionInterna', {
        url: '/transaccionInterna',
        template: '<div ui-view></div>',
        abstract: true
      })
      .state('organizacion.app.transaccionCliente', {
        url: '/transaccionCliente',
        template: '<div ui-view></div>',
        abstract: true
      })

      //Estructura

      //Bovedas
      .state('organizacion.app.estructura.boveda', {
        url: '/bovedas',
        template: '<div ui-view></div>',
        ncyBreadcrumb: {
          skip: true // Never display this state in breadcrumb.
        }
      })
      .state('organizacion.app.estructura.boveda.buscar', {
        url: '/buscar',
        templateUrl: 'modules/organizacion/views/boveda/form-buscar-boveda.html',
        controller: 'Organizacion.Boveda.BuscarController',
        resolve: {},
        ncyBreadcrumb: {
          label: 'Home'
        }
      })
      .state('organizacion.app.estructura.boveda.crear', {
        url: '/crear',
        templateUrl: 'modules/organizacion/views/boveda/form-crear-boveda.html',
        controller: 'Organizacion.Boveda.CrearController',
        resolve: {},
        ncyBreadcrumb: {
          label: 'Crear boveda',
          parent: 'organizacion.app.estructura.boveda.buscar'
        }
      })
      .state('organizacion.app.estructura.boveda.editar', {
        url: '/editar/:boveda',
        templateUrl: 'modules/organizacion/views/boveda/form-editar-boveda.html',
        controller: 'Organizacion.Boveda.EditarController',
        resolve: {
          boveda: function ($state, $stateParams, BovedaService) {
            return BovedaService.findById($stateParams.boveda);
          }
        },
        ncyBreadcrumb: {
          label: 'Editar boveda',
          parent: 'organizacion.app.estructura.boveda.buscar'
        }
      })
      .state('organizacion.app.estructura.boveda.editar.resumen', {
        url: '/resumen',
        templateUrl: 'modules/organizacion/views/boveda/form-editar-boveda-resumen.html',
        controller: 'Organizacion.Boveda.Editar.ResumenController',
        resolve: {},
        ncyBreadcrumb: {
          skip: true // Never display this state in breadcrumb.
        }
      })
      .state('organizacion.app.estructura.boveda.editar.datosPrincipales', {
        url: '/datosPrincipales',
        templateUrl: 'modules/organizacion/views/boveda/form-editar-boveda-datosPrincipales.html',
        controller: 'Organizacion.Boveda.Editar.DatosPrincipalesController',
        resolve: {},
        ncyBreadcrumb: {
          label: 'Datos principales'
        }
      })
      .state('organizacion.app.estructura.boveda.editar.abrir', {
        url: '/abrir',
        templateUrl: 'modules/organizacion/views/boveda/form-editar-boveda-abrir.html',
        controller: 'Organizacion.Boveda.Editar.AbrirController',
        resolve: {},
        ncyBreadcrumb: {
          label: 'Abrir boveda'
        }
      })

      //Cajas
      .state('organizacion.app.estructura.caja', {
        url: '/cajas',
        template: '<div ui-view></div>',
        ncyBreadcrumb: {
          skip: true // Never display this state in breadcrumb.
        }
      })
      .state('organizacion.app.estructura.caja.buscar', {
        url: '/buscar',
        templateUrl: 'modules/organizacion/views/caja/form-buscar-caja.html',
        controller: 'Organizacion.Caja.BuscarController',
        resolve: {},
        ncyBreadcrumb: {
          label: 'Home'
        }
      })
      .state('organizacion.app.estructura.caja.crear', {
        url: '/crear',
        templateUrl: 'modules/organizacion/views/caja/form-crear-caja.html',
        controller: 'Organizacion.Caja.CrearController',
        resolve: {},
        ncyBreadcrumb: {
          label: 'Crear caja',
          parent: 'organizacion.app.estructura.caja.buscar'
        }
      })
      .state('organizacion.app.estructura.caja.editar', {
        url: '/editar/:caja',
        templateUrl: 'modules/organizacion/views/caja/form-editar-caja.html',
        controller: 'Organizacion.Caja.EditarController',
        resolve: {
          caja: function ($state, $stateParams, CajaService) {
            return CajaService.findById($stateParams.caja);
          }
        },
        ncyBreadcrumb: {
          label: 'Editar caja',
          parent: 'organizacion.app.estructura.caja.buscar'
        }
      })
      .state('organizacion.app.estructura.caja.editar.resumen', {
        url: '/resumen',
        templateUrl: 'modules/organizacion/views/caja/form-editar-caja-resumen.html',
        controller: 'Organizacion.Caja.Editar.ResumenController',
        resolve: {},
        ncyBreadcrumb: {
          skip: true // Never display this state in breadcrumb.
        }
      })
      .state('organizacion.app.estructura.caja.editar.datosPrincipales', {
        url: '/datosPrincipales',
        templateUrl: 'modules/organizacion/views/caja/form-editar-caja-datosPrincipales.html',
        controller: 'Organizacion.Caja.Editar.DatosPrincipalesController',
        resolve: {},
        ncyBreadcrumb: {
          label: 'Datos principales'
        }
      })
      .state('organizacion.app.estructura.caja.editar.abrir', {
        url: '/abrir',
        templateUrl: 'modules/organizacion/views/caja/form-editar-caja-abrir.html',
        controller: 'Organizacion.Caja.Editar.AbrirController',
        resolve: {},
        ncyBreadcrumb: {
          label: 'Abrir caja'
        }
      })

      //BovedaCajas
      .state('organizacion.app.estructura.caja.editar.bovedaCaja', {
        url: '/bovedaCajas',
        template: '<div ui-view></div>',
        ncyBreadcrumb: {
          skip: true // Never display this state in breadcrumb.
        }
      })
      .state('organizacion.app.estructura.caja.editar.bovedaCaja.buscar', {
        url: '/buscar',
        templateUrl: 'modules/organizacion/views/caja/bovedaCaja/form-buscar-bovedaCaja.html',
        controller: 'Organizacion.Caja.Editar.BovedaCaja.BuscarController',
        resolve: {},
        ncyBreadcrumb: {
          label: 'Bovedas'
        }
      })
      .state('organizacion.app.estructura.caja.editar.bovedaCaja.crear', {
        url: '/crear',
        templateUrl: 'modules/organizacion/views/caja/bovedaCaja/form-crear-bovedaCaja.html',
        controller: 'Organizacion.Caja.Editar.BovedaCaja.CrearController',
        resolve: {},
        ncyBreadcrumb: {
          label: 'Crear Boveda-Caja',
          parent: 'organizacion.app.estructura.caja.editar.bovedaCaja.buscar'
        }
      })
      .state('organizacion.app.estructura.caja.editar.bovedaCaja.editar', {
        url: '/editar/:bovedaCaja',
        templateUrl: 'modules/organizacion/views/caja/bovedaCaja/form-editar-bovedaCaja.html',
        controller: 'Organizacion.Caja.Editar.BovedaCaja.EditarController',
        resolve: {

          bovedaCaja: function ($state, $stateParams, caja) {
            return caja.SGBovedaCaja().$find($stateParams.bovedaCaja);
          }
        },
        ncyBreadcrumb: {
          label: 'Editar boveda-caja',
          parent: 'organizacion.app.estructura.caja.editar.bovedaCaja.buscar'
        }
      })
      //HistorialBovedacaja
      .state('organizacion.app.estructura.caja.editar.bovedaCaja.editar.historial', {
        url: '/historiales',
        template: '<div ui-view></div>',
        ncyBreadcrumb: {
          skip: true // Never display this state in breadcrumb.
        }
      })
      .state('organizacion.app.estructura.caja.editar.bovedaCaja.editar.historial.buscar', {
        url: '/buscar',
        templateUrl: 'modules/organizacion/views/caja/bovedaCaja/historial/form-buscar-historial.html',
        controller: 'Organizacion.Caja.Editar.BovedaCaja.Historial.BuscarController',
        resolve: {},
        ncyBreadcrumb: {
          label: 'Home'
        }
      })
      .state('organizacion.app.estructura.caja.editar.bovedaCaja.editar.historial.crear', {
        url: '/crear',
        templateUrl: 'modules/organizacion/views/caja/bovedaCaja/historial/form-crear-historial.html',
        controller: 'Organizacion.Caja.Editar.BovedaCaja.Historial.CrearController',
        resolve: {},
        ncyBreadcrumb: {
          label: 'Crear Historial',
          parent: 'organizacion.app.estructura.caja.editar.bovedaCaja.editar.historial.buscar'
        }
      })
      .state('organizacion.app.estructura.caja.editar.bovedaCaja.editar.historial.editar', {
        url: '/editar/:historial',
        templateUrl: 'modules/organizacion/views/caja/bovedaCaja/historial/form-editar-historial.html',
        controller: 'Organizacion.Caja.Editar.BovedaCaja.Historial.EditarController',
        resolve: {

          historial: function ($state, $stateParams, bovedaCaja) {
            return bovedaCaja.SGHistorialBovedaCaja().$find($stateParams.historial);
          }
        },
        ncyBreadcrumb: {
          label: 'Editar caja',
          parent: 'organizacion.app.estructura.caja.editar.bovedaCaja.editar.historial.buscar'
        }
      })
      .state('organizacion.app.estructura.caja.editar.bovedaCaja.editar.historial.editar.resumen', {
        url: '/resumen',
        templateUrl: 'modules/organizacion/views/caja/bovedaCaja/historial/form-editar-historial-resumen.html',
        controller: 'Organizacion.Caja.Editar.BovedaCaja.Historial.Editar.ResumenController',
        resolve: {},
        ncyBreadcrumb: {
          label: 'Editar caja',
          parent: 'organizacion.app.estructura.caja.buscar'
        }
      })
      .state('organizacion.app.estructura.caja.editar.bovedaCaja.editar.historial.editar.cerrar', {
        url: '/cerrar',
        templateUrl: 'modules/organizacion/views/caja/bovedaCaja/historial/form-editar-historial-cerrar.html',
        controller: 'Organizacion.Caja.Editar.BovedaCaja.Historial.Editar.CerrarController',
        resolve: {},
        ncyBreadcrumb: {
          label: 'Cerrar caja'
        }
      })
      //TransaccionBoevdaCaja
      .state('organizacion.app.estructura.caja.editar.bovedaCaja.editar.historial.editar.transaccionBovedaCaja', {
        url: '/historiales',
        template: '<div ui-view></div>',
        ncyBreadcrumb: {
          skip: true // Never display this state in breadcrumb.
        }
      })
      .state('organizacion.app.estructura.caja.editar.bovedaCaja.editar.historial.editar.transaccionBovedaCaja.buscar', {
        url: '/buscar',
        templateUrl: 'modules/organizacion/views/caja/bovedaCaja/historial/transaccionBovedaCaja/form-buscar-transaccionBovedaCaja.html',
        controller: 'Organizacion.Caja.BovedaCaja.Historial.TransaccionBovedaCaja.BuscarController',
        resolve: {},
        ncyBreadcrumb: {
          label: 'Editar caja',
          parent: 'organizacion.app.estructura.caja.buscar'
        }
      })
      .state('organizacion.app.estructura.caja.editar.bovedaCaja.editar.historial.editar.transaccionBovedaCaja.crear', {
        url: '/crear',
        templateUrl: 'modules/organizacion/views/caja/bovedaCaja/historial/transaccionBovedaCaja/form-crear-transaccionBovedaCaja.html',
        controller: 'Organizacion.Caja.BovedaCaja.Historial.TransaccionBovedaCaja.CrearController',
        resolve: {},
        ncyBreadcrumb: {
          label: 'crear caja'
        }
      })
      .state('organizacion.app.estructura.caja.editar.bovedaCaja.editar.historial.editar.transaccionBovedaCaja.editar', {
        url: '/editar/:transaccion',
        templateUrl: 'modules/organizacion/views/caja/bovedaCaja/historial/transaccionBovedaCaja/form-editar-transaccionBovedaCaja.html',
        controller: 'Organizacion.Caja.BovedaCaja.Historial.TransaccionBovedaCaja.EditarController',
        resolve: {
          transaccion: function ($state, $stateParams, historial) {
            return historial.SGTransaccionBovedaCaja().$find($stateParams.transaccion);
          }
        },
        ncyBreadcrumb: {
          label: 'Editar transaccion'
        }
      })
      //TransaccionCajacaja
      .state('organizacion.app.estructura.caja.editar.bovedaCaja.editar.historial.editar.transaccionCajaCaja', {
        url: '/transaccionesCajaCaja',
        templateUrl: 'modules/organizacion/views/caja/bovedaCaja/historial/transaccionBovedaCaja/form-editar-historial-resumen.html',
        controller: 'Organizacion.Caja.Editar.BovedaCaja.Historial.Editar.TransaccionBovedaCaja.BuscarController',
        resolve: {

          caja: function ($state, $stateParams, SGCaja) {
            return SGCaja.$find($stateParams.caja);
          }
        },
        ncyBreadcrumb: {
          label: 'Editar caja',
          parent: 'organizacion.app.estructura.caja.buscar'
        }
      })
      .state('organizacion.app.estructura.caja.editar.bovedaCaja.editar.historial.editar.transaccionCajaCaja.buscar', {
        url: '/buscar',
        templateUrl: 'modules/organizacion/views/caja/bovedaCaja/historial/transaccionBovedaCaja/form-editar-historial-resumen.html',
        controller: 'Organizacion.Caja.Editar.BovedaCaja.Historial.Editar.TransaccionBovedaCaja.BuscarController',
        resolve: {
          caja: function ($state, $stateParams, SGCaja) {
            return SGCaja.$find($stateParams.caja);
          }
        },
        ncyBreadcrumb: {
          label: 'Editar caja',
          parent: 'organizacion.app.estructura.caja.buscar'
        }
      })
      .state('organizacion.app.estructura.caja.editar.bovedaCaja.editar.historial.editar.transaccionCajaCaja.crear', {
        url: '/crear',
        templateUrl: 'modules/organizacion/views/caja/bovedaCaja/historial/transaccionBovedaCaja/form-editar-historial-resumen.html',
        controller: 'Organizacion.Caja.Editar.BovedaCaja.Historial.Editar.TransaccionBovedaCaja.BuscarController',
        resolve: {
          caja: function ($state, $stateParams, SGCaja) {
            return SGCaja.$find($stateParams.caja);
          }
        },
        ncyBreadcrumb: {
          label: 'Editar caja',
          parent: 'organizacion.app.estructura.caja.buscar'
        }
      })
      .state('organizacion.app.estructura.caja.editar.bovedaCaja.editar.historial.editar.transaccionCajaCaja.editar', {
        url: '/editar/:transaccion',
        templateUrl: 'modules/organizacion/views/caja/bovedaCaja/historial/transaccionBovedaCaja/form-editar-historial-resumen.html',
        controller: 'Organizacion.Caja.Editar.BovedaCaja.Historial.Editar.TransaccionBovedaCaja.BuscarController',
        resolve: {

          caja: function ($state, $stateParams, SGCaja) {
            return SGCaja.$find($stateParams.caja);
          }
        },
        ncyBreadcrumb: {
          label: 'Editar caja',
          parent: 'organizacion.app.estructura.caja.buscar'
        }
      })

      .state('organizacion.app.estructura.caja.editar.editar.boveda', {
        url: '/buscar',
        templateUrl: 'modules/organizacion/views/caja/form-editar-caja-bovedas.html',
        controller: 'Organizacion.Caja.Editar.BovedaController',
        resolve: {},
        ncyBreadcrumb: {
          label: 'Bovedas'
        }
      })
      .state('organizacion.app.estructura.caja.editar.editar.abrir', {
        url: '/abrir',
        templateUrl: 'modules/organizacion/views/caja/form-editar-caja-abrir.html',
        controller: 'Organizacion.Caja.EditarCaja.AbrirController',
        resolve: {}
      })
      .state('organizacion.app.estructura.caja.editar.editar.cerrar', {
        url: '/cerrar',
        templateUrl: 'modules/organizacion/views/caja/form-editar-caja-cerrar.html',
        controller: 'Organizacion.Caja.EditarCaja.CerrarController',
        resolve: {}
      })

      .state('organizacion.app.transaccionInterna.buscarTransaccionesBovedaCaja', {
        url: '/buscarTransaccionesBovedaCaja',
        templateUrl: 'modules/organizacion/views/transaccionInterna/form-buscar-transaccionBovedaCaja.html',
        controller: 'Organizacion.BuscarTransaccionBovedaCajaController',
        resolve: {}
      })

      .state('organizacion.app.transaccionInterna.buscarTransaccionesCajaCaja', {
        url: '/buscarTransaccionesCajaCaja',
        templateUrl: 'modules/organizacion/views/transaccionInterna/form-buscar-transaccionCajaCaja.html',
        controller: 'Organizacion.BuscarTransaccionCajaCajaController',
        resolve: {}
      });


  }
]);
