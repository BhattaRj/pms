(function() {
    'use strict';

    angular.module('app.board').controller('ColorMenuController', ColorMenuController);

    function ColorMenuController($mdColorPalette, BoardFactory, SettingFactory) {
        var vm = this;

        vm.board = BoardFactory.data;
        vm.palettes = $mdColorPalette;

        // Method
        vm.updateColor = updateColor;

        function updateColor(paletteName) {
            if (vm.board.settings == null) {
                vm.board.settings = {};
                vm.board.settings.board_id = vm.board.id;
            }
            vm.board.settings.color = paletteName;
            SettingFactory.save(vm.board.settings).then(function(response) {
                vm.board.settings = response;
            });
        }
    }

})();
