(function() {
    'use strict';

    angular.module('app.board').controller('BoardListController', BoardListController);

    function BoardListController(ProjectData) {    	
        var vm = this;
        vm.project = ProjectData;
    }

})();
