'use strict';

/* jshint -W098 */
angular.module('cooperativa').controller('Cooperativa.Administracion.Historial.BuscarController',
    function ($scope, $state, CAJA, CajaService) {

        $scope.view = {
            desde: undefined,
            hasta: undefined
        };

        $scope.loadFechas = function () {
            var d = new Date();
            d.setDate(d.getDate() - 30);
            $scope.view.desde = d;
            $scope.view.hasta = new Date();
        };
        $scope.loadFechas();

        $scope.gridOptions = {
            data: [],
            enableRowSelection: true,
            enableRowHeaderSelection: false,
            multiSelect: false,

            columnDefs: [
                {field: 'horaApertura', displayName: 'FECHA APERTURA', cellFilter: 'date: "dd/MM/yyyy HH:mm:ss"'},
                {field: 'horaCierre', displayName: 'FECHA CIERRE', cellFilter: 'date: "dd/MM/yyyy HH:mm:ss"'},
                {field: 'estado', cellFilter: 'si_no : "activo" | uppercase', displayName: 'Estado'},
                {
                    name: 'edit',
                    displayName: 'Edit',
                    cellTemplate: '<div style="text-align: center; padding-top: 4px;"><button type="button" ng-click="grid.appScope.gridActions.edit(row.entity)" class="btn btn-info btn-xs"><span class="glyphicon glyphicon-edit"></span>Editar</button></div>'
                }
            ]
        };

        $scope.gridActions = {
            edit: function (row) {
                $state.go('^.editar', {historial: row.id});
            }
        };

        $scope.search = function () {
            CajaService.getHistoriales(CAJA.id, $scope.view.desde.getTime(), $scope.view.hasta.getTime()).then(function (response) {
                $scope.gridOptions.data = response;
            });
        };

    }
);
