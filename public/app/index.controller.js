(function() {
    'use strict';

    angular.module('fuse').controller('IndexController', IndexController);

    function IndexController(fuseTheming) {
        var vm = this;

        vm.themes = fuseTheming.themes;
        vm.user = user;
        vm.login = login
    }
})();
