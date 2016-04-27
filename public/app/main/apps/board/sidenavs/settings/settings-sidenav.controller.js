(function() {
    'use strict';

    angular.module('app.board').controller('SettingsSidenavController', SettingsSidenavController);

    function SettingsSidenavController($mdColorPalette, BoardService) {
        var vm = this;        
        vm.board = BoardService.data;
        vm.palettes = $mdColorPalette;
        vm.selectedMenu = 'Settings';
    }
})();
