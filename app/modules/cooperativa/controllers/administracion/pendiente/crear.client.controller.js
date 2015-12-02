'use strict';

/* jshint -W098 */
angular.module('cooperativa').controller('Cooperativa.Administracion.Pendiente.CrearController',
    function ($scope, $state, $stateParams, toastr, CAJA, CajaService, PendienteCajaService, SessionService) {

        $scope.working = false;

        $scope.view = {
            pendiente: {}
        };

        $scope.view.params = {
            monto: $stateParams.monto,
            idBoveda: $stateParams.idBoveda,
            idPendienteRelacionado: $stateParams.idPendienteRelacionado,
            tipoPendiente: $stateParams.tipoPendiente
        };

        $scope.view.load = {
            pendienteRelacionado: undefined
        };

        $scope.combo = {
            boveda: undefined,
            tipo: [
                {denominacion: 'FALTANTE', valor: 'FALTANTE', factor: -1},
                {denominacion: 'SOBRANTE', valor: 'SOBRANTE', factor: 1},
                {denominacion: 'PAGO', valor: 'PAGO', factor: 1}
            ]
        };
        $scope.combo.selected = {
            boveda: undefined,
            tipo: undefined
        };

        $scope.loadCombos = function () {
            CajaService.getBovedas(CAJA.id).then(function (response) {
                $scope.combo.boveda = response;
            });
        };
        $scope.loadCombos();

        $scope.loadParams = function () {
            $scope.view.pendiente.monto = $scope.view.params.monto;

            if (angular.isDefined($scope.view.params.idPendienteRelacionado)) {
                PendienteCajaService.findById($scope.view.params.idPendienteRelacionado).then(function (response) {
                    $scope.view.load.pendienteRelacionado = response;
                    //$scope.view.pendiente.monto = response.monto;
                });
            }

            $scope.$watch('combo.boveda', function (newValue, oldValue) {
                if (angular.isDefined($scope.combo.boveda) && angular.isDefined($scope.view.params.idBoveda)) {
                    for (var i = 0; i < $scope.combo.boveda.length; i++) {
                        if ($scope.view.params.idBoveda.toString() === $scope.combo.boveda[i].id.toString()) {
                            $scope.combo.selected.boveda = $scope.combo.boveda[i];
                        }
                    }
                }
            }, true);

            $scope.$watch('combo.tipo', function (newValue, oldValue) {
                if (angular.isDefined($scope.view.params.tipoPendiente)) {
                    for (var i = 0; i < $scope.combo.tipo.length; i++) {
                        if ($scope.view.params.tipoPendiente === $scope.combo.tipo[i].valor) {
                            $scope.combo.selected.tipo = $scope.combo.tipo[i];
                        }
                    }
                }
            }, true);
        };
        $scope.loadParams();

        $scope.save = function () {
            $scope.working = true;

            SessionService.crearPendiente(
                $scope.combo.selected.boveda.id, $scope.view.pendiente.monto * $scope.combo.selected.tipo.factor,
                $scope.view.pendiente.observacion, $scope.combo.selected.tipo.valor, $scope.view.params.idPendienteRelacionado
            ).then(
                function (response) {
                    $scope.working = false;
                    toastr.success('Pendiente creado');
                    $state.go('cooperativa.app.administracion.pendiente.buscar');
                }, function error(err) {
                    toastr.error(err.data.message);
                }
            );
        };
    }
)
;
