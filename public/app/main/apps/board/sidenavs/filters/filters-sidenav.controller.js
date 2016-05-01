(function() {
    'use strict';

    angular.module('app.board').controller('FiltersSidenavController', FiltersSidenavController);

    /** @ngInject */
    function FiltersSidenavController(msUtils, BoardFactory, CardFilters) {
        var vm = this;

        // Data
        vm.board = BoardFactory.data;
        vm.cardFilters = CardFilters;
        vm.labels = vm.board.labels;
        vm.members = vm.board.users;
        vm.selectedMenu = 'Settings';

        // Methods
        vm.exists = msUtils.exists;
        vm.toggleInArray = msUtils.toggleInArray;
        vm.clearFilters = CardFilters.clear;
        vm.filteringIsOn = CardFilters.isOn;

        ////////
    }
    
})();
