'use strict';

/* jshint -W098 */
angular.module('socio').controller('Socio.CuentaPersonal.EditarCuentaPersonal.EstadoCuentaController',
  function ($scope, $state, $window, toastr, SGDialog, cuentaPersonal, CuentaBancariaService) {

    $scope.view = {
      cuentaPersonal: cuentaPersonal,
      desde: undefined,
      hasta: undefined
    };

    $scope.view.load = {
      estadoCuenta: []
    };

    $scope.loadFechas = function () {
      var d = new Date();
      d.setDate(d.getDate() - 30);
      $scope.view.desde = d;
      $scope.view.hasta = new Date();
    };
    $scope.loadFechas();

    $scope.loadEstadoCuenta = function () {
      CuentaBancariaService.getEstadoCuenta($scope.view.cuentaPersonal.id, $scope.view.desde.getTime(), $scope.view.hasta.getTime(), true).then(function (response) {
        $scope.view.load.estadoCuenta = response;
      });
    };

    $scope.imprimirPdf = function () {
      var url = CuentaBancariaService.getUrlEstadoCuentaPdf($scope.view.cuentaPersonal.id, $scope.view.desde.getTime(), $scope.view.hasta.getTime());
      $window.open(url);
    };

    $scope.enviarEmail = function () {
      SGDialog.confirm('Enviar', 'Estas seguro de querer enviar un email?', function () {
        CuentaBancariaService.enviarEstadoCuentaByEmail($scope.id, 'pdf', $scope.view.desde.getTime(), $scope.view.hasta.getTime()).then(function () {
          toastr.success('Email enviado correctamente');
        });
      });
    };

  });
