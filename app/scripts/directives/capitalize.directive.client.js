'use strict';

angular.module('mean') .service('textTransformService', function () {
    return {
      transform: function (element, ngModelController, callBack) {
        element.on('input', function () {
          var currentViewValue = ngModelController.$viewValue;
          var modifiedViewValue = callBack(currentViewValue);

          var start = this.selectionStart;
          var end = this.selectionEnd + modifiedViewValue.length - currentViewValue.length;

          ngModelController.$setViewValue(modifiedViewValue);
          ngModelController.$render();
          this.setSelectionRange(start, end);
        });
      }
    };
  })
  .directive('textTransformUppercase', ['textTransformService', function (srvc) {
    return {
      restrict: 'A',
      require: '?ngModel',
      link: function (scope, element, attrs, ngModelController) {
        srvc.transform(element, ngModelController, angular.uppercase);
      }
    };
  }]).directive('textTransformLowercase', ['textTransformService', function (srvc) {
  return {
    restrict: 'A',
    require: '?ngModel',
    link: function (scope, element, attrs, ngModelController) {
      srvc.transform(element, ngModelController, angular.lowercase);
    }
  };
}]).directive('textTransformCapitalize', ['textTransformService', function (srvc) {
  return {
    restrict: 'A',
    require: '?ngModel',
    link: function (scope, element, attrs, ngModelController) {
      function capitalizeCallback(currentViewValue) {
        function capitalize(txt) {
          return angular.uppercase(txt.charAt(0)) + txt.substr(1);
        }
        return currentViewValue.replace(/\w\S*/g, capitalize);
      }
      srvc.transform(element, ngModelController, capitalizeCallback);
    }
  };
}]);
