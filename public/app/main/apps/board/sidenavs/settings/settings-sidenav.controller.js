(function() {
    'use strict';

    angular.module('app.board').controller('SettingsSidenavController', SettingsSidenavController);

    function SettingsSidenavController($mdColorPalette, BoardFactory) {
        var vm = this;        

        vm.board = BoardFactory.data;
        vm.palettes = $mdColorPalette;
        vm.selectedMenu = 'Settings';
    }
    
})();
