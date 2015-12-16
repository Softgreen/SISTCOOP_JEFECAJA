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

    $urlRouterProvider.when('/organizacion/app', '/organizacion/app/estructura/bovedas');

    $urlRouterProvider.when('/organizacion/app/estructura/bovedas', '/organizacion/app/estructura/bovedas/buscar');
    $urlRouterProvider.when('/organizacion/app/estructura/cajas', '/organizacion/app/estructura/cajas/buscar');

    $urlRouterProvider.when('/organizacion/app/estructura/bovedas/editar/:boveda', '/organizacion/app/estructura/bovedas/editar/:boveda/resumen');
    $urlRouterProvider.when('/organizacion/app/estructura/cajas/editar/:caja', '/organizacion/app/estructura/cajas/editar/:caja/resumen');

    $urlRouterProvider.when('/organizacion/app/estructura/cajas/editar/:caja/bovedaCajas/editar/:bovedaCaja', '/organizacion/app/estructura/cajas/editar/:caja/bovedaCajas/editar/:bovedaCaja/historiales/buscar');
    $urlRouterProvider.when('/organizacion/app/estructura/cajas/editar/:caja/bovedaCajas/editar/:bovedaCaja/historiales/editar/:historial', '/organizacion/app/estructura/cajas/editar/:caja/bovedaCajas/editar/:bovedaCaja/historiales/editar/:historial/resumen');

    $urlRouterProvider.when('/organizacion/app/transaccionInterna/transaccionesBovedaCaja', '/organizacion/app/transaccionInterna/transaccionesBovedaCaja/buscar');

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
      .state('organizacion.app.estructura.boveda.editar.cerrar', {
        url: '/cerrar',
        templateUrl: 'modules/organizacion/views/boveda/form-editar-boveda-cerrar.html',
        controller: 'Organizacion.Boveda.Editar.CerrarController',
        resolve: {},
        ncyBreadcrumb: {
          label: 'Cerrar boveda'
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
      .state('organizacion.app.estructura.caja.editar.trabajador', {
        url: '/trabajadores',
        templateUrl: 'modules/organizacion/views/caja/form-editar-caja-trabajadores.html',
        controller: 'Organizacion.Caja.Editar.TrabajadoresController',
        resolve: {},
        ncyBreadcrumb: {
          label: 'Asignar trabajadores'
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

      //Transacciones internas
      .state('organizacion.app.transaccionInterna.bovedaCaja', {
        url: '/transaccionesBovedaCaja',
        template: '<div ui-view></div>',
        ncyBreadcrumb: {
          skip: true // Never display this state in breadcrumb.
        }
      })
      .state('organizacion.app.transaccionInterna.bovedaCaja.buscar', {
        url: '/buscar',
        templateUrl: 'modules/organizacion/views/transaccionInterna/bovedaCaja/form-buscar-transaccionBovedaCaja.html',
        controller: 'Organizacion.TransaccionInterna.BovedaCaja.BuscarController',
        resolve: {},
        ncyBreadcrumb: {
          label: 'Home'
        }
      })
      .state('organizacion.app.transaccionInterna.bovedaCaja.crear', {
        url: '/crear',
        templateUrl: 'modules/organizacion/views/transaccionInterna/bovedaCaja/form-crear-transaccionBovedaCaja.html',
        controller: 'Organizacion.TransaccionInterna.BovedaCaja.CrearController',
        resolve: {},
        ncyBreadcrumb: {
          label: 'Crear transaccion boveda-caja',
          parent: 'organizacion.app.transaccionInterna.bovedaCaja.buscar'
        }
      });


  }
]);
