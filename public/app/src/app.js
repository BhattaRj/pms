(function() {
    'use strict';

    angular.module('app', [
        'ngMaterial',
        'ui.router',
        'project',
        'rjDirective',
        'ngResource',
        'ui.bootstrap',
    ]);


    angular.module('app').controller('BaseController', ['$scope',BaseController]);

    angular.module('app').config(function($mdThemingProvider, $mdIconProvider, $interpolateProvider, $stateProvider, $urlRouterProvider) {

        $interpolateProvider.startSymbol('[[').endSymbol(']]');

        $mdIconProvider
            .defaultIconSet("./assets/svg/avatars.svg", 128)
            .icon("menu", "./assets/svg/menu.svg", 24)
            .icon("share", "./assets/svg/share.svg", 24)
            .icon("google_plus", "./assets/svg/google_plus.svg", 512)
            .icon("hangouts", "./assets/svg/hangouts.svg", 512)
            .icon("twitter", "./assets/svg/twitter.svg", 512)
            .icon("phone", "./assets/svg/phone.svg", 512)
            .iconSet("call", 'img/icons/sets/communication-icons.svg', 24)
            .iconSet("social", 'img/icons/sets/social-icons.svg', 24);

        $mdThemingProvider.theme('default')
            .primaryPalette('green')
            .accentPalette('red');
            
        // $urlRouterProvider.otherwise('/main');

        $stateProvider
            .state('project', {
                url: '/project',
                templateUrl: '/app/src/project/project.tpl.html',
                controller: 'ProjectController',
            })
            .state('project.show', {
                url: '/show/:id',
                templateUrl: '/app/src/project/project-show.tpl.html',
                controller: 'ProjectShowController'
            })
            .state('project.show.task', {
                url: '/task',
                templateUrl: '/app/src/project/task/task.tpl.html',
                controller: 'TaskController'
            })            
            .state('main.dashboard', {
                url: '/dashboard',
                templateUrl: '/admins/src/app/dashboard/dashboard.tpl.html',
                controller: 'DashboardController',
            })
            .state('main.company', {
                url: '/company',
                templateUrl: '/admins/src/app/company/company.tpl.html',
                controller: 'CompanyController',
            });

    });

    function BaseController($scope) {

        $scope.login = login;
        $scope.user = user;

        // Initial parameters for pagination.
        $scope.maxSize = 5;
        $scope.currentPage = 1;
        $scope.itemsPerPage = 10;
    }

})();