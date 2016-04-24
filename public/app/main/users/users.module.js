(function() {
    'use strict';

    angular.module('app.users', [
        'ngFileUpload'
    ]).config(config);

    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider) {

        $stateProvider
            .state('app.users', {
                url: '/users',
                views: {
                    'content@app': {
                        templateUrl: 'app/main/users/users.html',
                        controller: 'UsersController as vm'
                    }
                },
                resolve: {
                    UsersData: function(msApi) {
                        return msApi.resolve('users@get');
                    }
                }
            });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/users');

        // Api
        msApiProvider.register('users', ['/user']);

        // Navigation
        msNavigationServiceProvider.saveItem('user', {
            title: 'Users',
            icon: 'icon-account',
            state: 'app.users',
            /*stateParams: {
                'param1': 'page'
             },*/
            translate: 'USERS.USERS_NAV',
            weight: 1
        });
    }
})();
