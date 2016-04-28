(function() {
    'use strict';

    angular.module('fuse').controller('MainController', MainController);

    function MainController($scope, $rootScope) {

        // Remove the splash screen
        $scope.$on('$viewContentAnimationEnded', function(event) {
            if (event.targetScope.$id === $scope.$id) {
                $rootScope.$broadcast('msSplashScreen::remove');
            }
        });
    }
})();
