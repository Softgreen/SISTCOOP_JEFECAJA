'use strict';

/* jshint -W098 */
angular.module('cooperativa').controller('Cooperativa.Operaciones.CerrarCajaController',
    function ($scope, $state, $location, $window, toastr, CAJA, CajaService, SessionService) {

        $scope.working = false;

        $scope.view = {
            caja: CAJA
        };

        $scope.view.load = {
            detalleHistorialActivo: undefined
        };

        $scope.view.error = {
            pendiente: []
        };

        $scope.loadDetalle = function () {
            CajaService.getDetalle($scope.view.caja.id).then(function (response) {
                for (var i = 0; i < response.length; i++) {
                    angular.forEach(response[i].detalle, function (row) {
                        row.subtotal = function () {
                            return this.valor * this.cantidad;
                        };
                    });
                }
                $scope.view.load.detalleHistorialActivo = response;

                /*for (var i = 0; i < $scope.view.load.detalleHistorialActivo.length; i++) {
                    angular.forEach($scope.view.load.detalleHistorialActivo[i].detalle, function (row) {
                        row.cantidad = 0;
                    });
                }*/
            });
        };
        $scope.loadDetalle();

        $scope.getTotal = function (detalle) {
            var total = 0;
            if (detalle) {
                for (var i = 0; i < detalle.length; i++) {
                    total = total + (detalle[i].valor * detalle[i].cantidad);
                }
            }
            return total;
        };


        $scope.save = function () {
            $scope.working = true;

            SessionService.cerrarCajaOfSession($scope.view.load.detalleHistorialActivo).then(
                function (response) {
                    $scope.working = false;
                    toastr.success('Caja cerrada satisfactoriamente');
                    CAJA.abierto = false;
                    CAJA.estadoMovimiento = false;
                    $state.go('cooperativa.app.administracion.historial.editar', {historial: response.id});
                },
                function error(err) {
                    $scope.working = false;
                    if (err.status === 400) {
                        for (var i = 0; i < err.data.length; i++) {
                            $scope.view.error.pendiente.push({
                                idboveda: err.data[i].idboveda,
                                boveda: err.data[i].boveda,
                                monto: err.data[i].monto
                            });
                        }
                    } else {
                        toastr.error(err.data.message);
                    }
                }
            );
        };

        $scope.crearPendiente = function (item) {
            var baseLen = $location.absUrl().length - $location.url().length;
            var url = $location.absUrl().substring(0, baseLen);
            $window.open(url + '/cooperativa/app/administracion/pendientes/crear' + '?idBoveda=' + item.idboveda + '&monto=' + item.monto + '&tipoPendiente=' + (item.monto <= 0 ? 'SOBRANTE' : 'FALTANTE'));
        };

    }
);
