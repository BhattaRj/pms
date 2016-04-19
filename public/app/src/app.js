(function() {
    'use strict';

    angular.module('app', [
        'ngMaterial',
        'ngSanitize',
        'ui.router',
        'rjDirective',
        'rjServices',
        'task',
        'ngResource',
        'ui.bootstrap',
        'ngFileUpload',
        'textAngular',
        'task',
        'project',
        'dashboard',
        'user',
        'resources.project',
        'allproject'
    ]);

    angular.module('app').controller('BaseController', ['$scope', BaseController]);

    angular.module('app').config(function($mdThemingProvider, $mdIconProvider) {
        // This is will add this functios on every string.
        String.prototype.capitalizeFirstLetter = function() {
            return this.charAt(0).toUpperCase() + this.slice(1);
        }
        Date.prototype.toYMD = Date_toYMD;

        function Date_toYMD() {
            var year, month, day;
            year = String(this.getFullYear());
            month = String(this.getMonth() + 1);
            if (month.length == 1) {
                month = "0" + month;
            }
            day = String(this.getDate());
            if (day.length == 1) {
                day = "0" + day;
            }
            return year + "-" + month + "-" + day;
        }
        Date.prototype.addDays = function(days) {
            this.setDate(this.getDate() + parseInt(days));
            return this;
        };
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

    });

    function BaseController($scope) {

        var vm = this;
        vm.toggleSidenav = toggleSidenav;

        function toggleSidenav() {
            $mdSidenav('left').toggle();
        }

        $scope.login = login;
        $scope.user = user;
        
        // Initial parameters for pagination.
        $scope.maxSize = 5;
        $scope.currentPage = 1;
        $scope.itemsPerPage = 10;
    }

})();
