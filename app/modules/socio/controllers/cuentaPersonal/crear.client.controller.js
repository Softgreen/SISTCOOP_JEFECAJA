'use strict';

/* jshint -W098 */
angular.module('socio').controller('Socio.CuentaPersonal.CrearCuentaPersonalController',
    function ($scope, $state, $window, $modal, toastr, PersonaNaturalService, PersonaJuridicaService, MonedaService, CuentaBancariaService, SessionService) {

        $scope.working = false;

        $scope.view = {
            cuentaPersonal: {}
        };

        $scope.view.load = {
            persona: undefined
        };

        $scope.combo = {
            tipoCuenta: undefined,
            tipoPersona: undefined,
            tipoDocumento: undefined,
            moneda: undefined
        };
        $scope.combo.selected = {
            tipoCuenta: undefined,
            tipoPersona: undefined,
            tipoDocumento: undefined,
            moneda: undefined
        };

        $scope.loadCombo = function () {
            $scope.combo.tipoCuenta = [
                {denominacion: 'CUENTA LIBRE', valor: 'LIBRE'},
                {denominacion: 'CUENTA RECAUDADORA', valor: 'RECAUDADORA'},
                {denominacion: 'CUENTA A PLAZO FIJO', valor: 'PLAZO_FIJO'}
            ];
            $scope.combo.tipoPersona = [
                {denominacion: 'NATURAL', valor: 'NATURAL'},
                {denominacion: 'JURIDICA', valor: 'JURIDICA'}
            ];

            $scope.$watch('combo.selected.tipoPersona', function (newValue, oldValue) {
                if (newValue !== oldValue) {
                    if ($scope.combo.selected.tipoPersona.valor === 'NATURAL') {
                        PersonaNaturalService.getTipoDocumentos().then(function (response) {
                            $scope.combo.tipoDocumento = response;
                        });
                    } else if ($scope.combo.selected.tipoPersona.valor === 'JURIDICA') {
                        PersonaJuridicaService.getTipoDocumentos().then(function (response) {
                            $scope.combo.tipoDocumento = response;
                        });
                    }
                }
            }, true);

            MonedaService.getMonedas().then(function (response) {
                $scope.combo.moneda = response;
            });
        };
        $scope.loadCombo();

        $scope.check = function ($event) {
            if (!angular.isUndefined($event)) {
                $event.preventDefault();
            }
            if ($scope.combo.selected.tipoPersona.valor === 'NATURAL') {
                PersonaNaturalService.findByTipoNumeroDocumento($scope.combo.selected.tipoDocumento.id, $scope.view.cuentaPersonal.numeroDocumento).then(function (response) {
                    $scope.view.load.persona = response;
                    if ($scope.view.load.persona) {
                        toastr.info('Persona encontrada');
                    } else {
                        toastr.warning('Persona no encontrada');
                    }
                });
            } else if ($scope.combo.selected.tipoPersona.valor === 'JURIDICA') {
                PersonaJuridicaService.findByTipoNumeroDocumento($scope.combo.selected.tipoDocumento.id, $scope.view.cuentaPersonal.numeroDocumento).then(function (response) {
                    $scope.view.load.persona = response;
                    if ($scope.view.load.persona) {
                        toastr.info('Persona encontrada');
                    } else {
                        toastr.warning('Persona no encontrada');
                    }
                });
            }
        };

        $scope.save = function () {
            var modalInstance = $modal.open({
                animation: true,
                templateUrl: 'modules/socio/views/cuentaPersonal/form-crear-verificarDatos.html',
                controller: 'Socio.CuentaPersonal.VerificarCuentaPersonalController',
                resolve: {
                    cuentaPersonal: function () {
                        return $scope.view.cuentaPersonal;
                    },
                    tipoCuenta: function () {
                        return $scope.combo.selected.tipoCuenta;
                    },
                    tipoPersona: function () {
                        return $scope.combo.selected.tipoPersona;
                    },
                    persona: function () {
                        return $scope.view.load.persona;
                    },
                    tipoDocumento: function () {
                        return $scope.combo.selected.tipoDocumento;
                    },
                    moneda: function () {
                        return $scope.combo.selected.moneda;
                    }
                }
            });

            modalInstance.result.then(function (cuentaPersonal) {
                var cuenta = {
                    tipoCuenta: $scope.combo.selected.tipoCuenta.valor,
                    tipoPersona: $scope.combo.selected.tipoPersona.valor,
                    idMoneda: $scope.combo.selected.moneda.id,
                    idTipoDocumento: $scope.combo.selected.tipoDocumento.id,
                    numeroDocumento: $scope.view.cuentaPersonal.numeroDocumento,
                    cantRetirantes: 1,
                    tasaInteres: $scope.view.cuentaPersonal.tasa/100,
                    titulares: [],
                    beneficiarios: [],

                    periodo: $scope.view.cuentaPersonal.periodo,
                    monto: $scope.view.cuentaPersonal.monto
                };

                $scope.working = true;

                if ($scope.combo.selected.tipoPersona.valor === 'NATURAL') {
                  cuenta.titulares = [$scope.view.load.persona.id];
                } else if ($scope.combo.selected.tipoPersona.valor === 'JURIDICA') {
                  cuenta.titulares = [$scope.view.load.persona.representanteLegal.id];
                }

                if ($scope.combo.selected.tipoCuenta.valor === 'LIBRE') {
                    CuentaBancariaService.crearCuentaAhorro(cuenta).then(
                        function (response) {
                            toastr.success('Cuenta personal creada');
                            $scope.working = false;
                            $state.go('^.editar', {cuentaPersonal: response.id});
                        }, function error(err) {
                            $scope.working = false;
                            toastr.error(err.data.message);
                        }
                    );
                } else if ($scope.combo.selected.tipoCuenta.valor === 'RECAUDADORA') {
                    CuentaBancariaService.crearCuentaCorriente(cuenta).then(
                        function (response) {
                            toastr.success('Cuenta personal creada');
                            $scope.working = false;
                            $state.go('^.editar', {cuentaPersonal: response.id});
                        }, function error(err) {
                            $scope.working = false;
                            toastr.error(err.data.message);
                        }
                    );
                } else if ($scope.combo.selected.tipoCuenta.valor === 'PLAZO_FIJO') {
                    SessionService.crearCuentaPlazoFijo(cuenta).then(
                        function (response) {
                            toastr.success('Cuenta personal creada');
                            $scope.working = false;
                            //$window.open(SGUsuarioKeycloak.$getCreateRealmUserUrl());
                            $state.go('^.editar', {cuentaPersonal: response.id});

                            //response.idTransaccion
                            //response.id
                        }, function error(err) {
                            $scope.working = false;
                            toastr.error(err.data.message);
                        }
                    );
                } else {
                    toastr.error('Cuenta personal no valida');
                }

            }, function () {
            });

        };

        $scope.cancel = function () {
            $state.go('^.buscar');
        };

    });
