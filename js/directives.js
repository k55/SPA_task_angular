'use strict';

angular.module("spApp").directive('validateName', function() {
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function(scope, element, attr, ctrl) {
      function customValidator (ngModelValue) {
        if(/^[a-zA-Z0-9\' ]+[a-zA-Z0-9\' ]+$/.test(ngModelValue)){
          ctrl.$setValidity('charNumberValidator', true);
        }
        else{
          ctrl.$setValidity('charNumberValidator', false);
        }

        return ngModelValue;
      }

      ctrl.$parsers.push(customValidator);
    }
  }
})

.directive('changeClass', function () {
  return function (scope, element, attrs) {
    element.on('click', function (e) {
      var elements =  angular.element( document.querySelectorAll('.choose') );
      for (var i = elements.length - 1; i >= 0; i--) {
        if (elements.eq(i).hasClass('btn-warning')){
          elements.eq(i).removeClass('btn-warning').addClass('btn-success');
        }
      };
      angular.element(this).toggleClass('btn-success').toggleClass('btn-warning');
    })
  }
})