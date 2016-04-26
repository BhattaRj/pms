(function() {
    'use strict';

    angular.module('app.project', []);
    angular.module('app.project').config(config);

    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider) {

        $stateProvider
            .state('app.project', {
                url: '/project',
                views: {
                    'content@app': {
                        templateUrl: 'app/main/apps/project/project.html',
                        controller: 'ProjectController as vm'
                    }
                },
                resolve: {
                    Data: function(msApi) {
                        return msApi.resolve('project@get');
                    }
                }
            });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/apps/project');

        // Api
        msApiProvider.register('project', ['/project']);

        // Navigation
        msNavigationServiceProvider.saveItem('project', {
            title: 'Project',
            icon: 'icon-window-restore',
            state: 'app.project',
            /*stateParams: {
                'param1': 'page'
             },*/
            translate: 'PROJECT.PROJECT_NAV',
            weight: 1
        });
    }
})();
