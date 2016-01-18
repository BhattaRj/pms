'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */
angular.module('app')
    .directive('header', function() {
        return {
            templateUrl: '/app/common/directive/header/header.html',
            restrict: 'E',
            replace: true,
            controller: function($scope, $mdSidenav, $mdBottomSheet) {
                var originatorEv;

                $scope.openMenu = function($mdOpenMenu, ev) {
                    originatorEv = ev;
                    $mdOpenMenu(ev);
                }

                $scope.toggleList = function() {
                    var pending = $mdBottomSheet.hide() || $q.when(true);

                    pending.then(function() {
                        $mdSidenav('left').toggle();
                    });
                }

            }
        }
    });