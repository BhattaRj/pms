(function() {
    'use strict';

    angular.module('app.board').controller('BoardListController', BoardListController);

    function BoardListController(BoardFactory) {
        var vm = this;
        vm.boards = BoardFactory.dataList;
        vm.project = BoardFactory.project;
    }

})();
