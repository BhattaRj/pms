(function() {
    'use strict';

    angular.module('app.sample').controller('UsersController', UsersController);

    /** @ngInject */
    function UsersController(UsersData) {
        var vm = this;

        // Data
        vm.users = UsersData.data;

        // Methods

        //////////
    }
})();
