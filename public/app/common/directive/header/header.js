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
            controller: function($scope, $mdSidenav, $mdBottomSheet, ConfirmFactory, ProjectFactory) {
                var originatorEv;

                init();

                function init() {
                    ProjectFactory.recentProjects().then(function(response) {
                        $scope.recentProjects = response;
                    });
                }
                $scope.toggleSidenav = function() {
                    $mdSidenav('left').toggle();
                }

                $scope.openMenu = function($mdOpenMenu, ev) {
                    originatorEv = ev;
                    $mdOpenMenu(ev);
                }

                $scope.logout = function($event) {
                    ConfirmFactory.show($event, 'You really want to logout !!').then(function() {
                        location.replace('auth/logout')
                    });
                }
            }
        }
    });
