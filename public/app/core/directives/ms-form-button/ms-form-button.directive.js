(function() {
    'use strict';

    angular.module('app.core').directive('formButton', formButtonDirective);

    function formButtonDirective() {
        return {
            templateUrl: '/app/core/directives/ms-form-button/ms-form-button.html',
            restrict: 'E',
            replace: true,
        }
    }

})();
