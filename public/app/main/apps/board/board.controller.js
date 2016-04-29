(function() {
    'use strict';

    angular.module('app.board').controller('BoardController', BoardController);

    function BoardController($mdSidenav, CardFilters, BoardFactory, $stateParams) {
        var vm = this;

        // Data
        vm.currentView = 'board';
        vm.boards = BoardFactory.dataList;
        vm.board = BoardFactory.data;
        vm.boardSelectorVisible = false;


        // Methods
        vm.toggleSidenav = toggleSidenav;
        vm.updateBoardUri = updateBoardUri;
        vm.clearFilters = CardFilters.clear;
        vm.filteringIsOn = CardFilters.isOn;


        /**
         * Update Board Title
         */
        function updateBoardUri() {
            var data = { id: vm.board.id, title: vm.board.title };
            BoardFactory.save(data).then(function(response) {                
            });
        }

        /**
         * Toggle sidenav         
         * @param sidenavId
         */
        function toggleSidenav(sidenavId) {
            $mdSidenav(sidenavId).toggle();
        }
    }
})();
