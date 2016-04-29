(function() {
    'use strict';

    angular.module('fuse').controller('IndexController', IndexController);

    function IndexController(fuseTheming) {
        var vm = this;
        vm.themes = fuseTheming.themes;

        /**
         * Array prototype get by id         
         * @param value
         * @returns {T}
         */
        Array.prototype.getById = function(value) {
            return this.filter(function(x) {
                return x.id === value;
            })[0];
        };

    }
})();
