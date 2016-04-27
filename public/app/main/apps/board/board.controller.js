(function() {
    'use strict';

    angular.module('app.board').controller('BoardController', BoardController);

    function BoardController($mdSidenav, BoardData, CardFilters, ProjectData , SprintFactory) {
        var vm = this;        
        // Data
        vm.project = ProjectData;
        vm.currentView = 'board';
        vm.board = BoardData;                
        vm.boardSelectorVisible = false;

        // Methods
        vm.toggleSidenav = toggleSidenav;
        vm.updateBoardUri = updateBoardUri;
        vm.clearFilters = CardFilters.clear;
        vm.filteringIsOn = CardFilters.isOn;

        ////////

        /**
         * Update Board Uri
         *
         * Once you connect your app to your server,
         * you would do this on your API server.
         */
        function updateBoardUri() {            
            SprintFactory.save(vm.board);
        }

        /**
         * Toggle sidenav
         *
         * @param sidenavId
         */
        function toggleSidenav(sidenavId) {
            $mdSidenav(sidenavId).toggle();
        }

        /**
         * Array prototype
         *
         * Get by id
         *
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
