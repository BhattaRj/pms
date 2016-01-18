'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */
angular.module('app')
	.directive('formButton',function(){
		return {
        templateUrl:'/app/common/directive/formButton/formButton.html',
        restrict: 'E',
        replace: true,
    	}
	});


