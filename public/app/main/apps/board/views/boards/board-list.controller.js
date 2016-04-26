(function() {
    'use strict';

    angular.module('app.board').controller('BoardListController', BoardListController);

    function BoardListController(ProjectData) {
    	debugger;
        var vm = this;
        vm.project = ProjectData;
    }

})();
