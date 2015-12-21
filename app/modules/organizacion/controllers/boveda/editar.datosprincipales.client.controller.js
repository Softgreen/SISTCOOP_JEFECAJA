'use strict';

/* jshint -W098 */
angular.module('organizacion').controller('Organizacion.Boveda.Editar.DatosPrincipalesController',
	function ($scope, boveda, toastr) {

		$scope.changed = false;

		$scope.view = {
			boveda: boveda
		};

		$scope.view.load = {
			agencia: undefined
		};

		$scope.loadAgencia = function () {
			//$scope.view.load.agencia = SGAgencia.$findByUrl($scope.view.boveda.agencia).$object;
		};
		$scope.loadAgencia();

		$scope.save = function () {
			$scope.changed = true;
			$scope.view.boveda.$save().then(
				function (response) {
					$scope.changed = false;
					toastr.success('Boveda actualizada');
				},
				function error(err) {
          $scope.working = false;
          toastr.error(err.data.message);
				}
			);
		};

	}
);
