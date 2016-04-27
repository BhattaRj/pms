(function() {
    'use strict';

    angular.module('app.board').controller('ColorMenuController', ColorMenuController);

    function ColorMenuController($mdColorPalette, BoardService) {
        var vm = this;

        vm.board = BoardService.data;
        vm.palettes = $mdColorPalette;
    }
    
})();
