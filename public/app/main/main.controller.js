(function() {
    'use strict';

    angular.module('fuse').controller('MainController', MainController);

    function MainController($scope, $rootScope, ProjectFactory, msNavigationService) {


        // Remove the splash screen
        $scope.$on('$viewContentAnimationEnded', function(event) {
            if (event.targetScope.$id === $scope.$id) {
                $rootScope.$broadcast('msSplashScreen::remove');
            }
        });

        msNavigationService.saveItem('apps.recentproject', {
            title: 'Recent Project',
            icon: 'icon-xbox',
            weight: 3
        });
        msNavigationService.saveItem('apps.recentproject.fixed', {
            title: 'fixed',            
            state: 'app.samples',
            weight: 2
        });

        ProjectFactory.recentProjects().then(function(response) {

            angular.forEach(response, function(value, key) {
                msNavigationService.saveItem('apps.recentproject.'+value.title, {
                    title: value.title,
                    state: 'app.project',
                    weight: value.id
                });                
            });
        });
    }

})();
