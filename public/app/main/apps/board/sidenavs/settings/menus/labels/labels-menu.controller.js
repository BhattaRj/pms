(function() {
    'use strict';

    angular.module('app.board').controller('LabelsMenuController', LabelsMenuController);

    function LabelsMenuController($document, $mdColorPalette, $mdDialog, fuseGenerator, msUtils, BoardFactory, LabelFactory) {
        var vm = this;

        vm.board = BoardFactory.data;
        vm.palettes = $mdColorPalette;
        vm.rgba = fuseGenerator.rgba;
        vm.hue = 500;
        vm.newLabelColor = 'red';
        vm.newLabelName = '';

        // Methods
        vm.addNewLabel = addNewLabel;
        vm.removeLabel = removeLabel;
        vm.updateLabel = updateLabel;
        ////////

        /**
         * Add New Label
         */
        function addNewLabel() {
            var data = {
                name: vm.newLabelName,
                color: vm.newLabelColor,
                board_id: vm.board.id
            }
            LabelFactory.save(data).then(function(response) {
                vm.board.labels.push(response);
                vm.newLabelName = '';
            })
        }


        function updateLabel(lable) {
            debugger;
            LabelFactory.save(lable);
        }

        /**
         * Remove label
         *
         * @param ev
         * @param labelId
         */
        function removeLabel(ev, labelId) {
            var confirm = $mdDialog.confirm({
                title: 'Remove Label',
                parent: $document.find('#scrumboard'),
                textContent: 'Are you sure want to remove label?',
                ariaLabel: 'remove label',
                targetEvent: ev,
                clickOutsideToClose: true,
                escapeToClose: true,
                ok: 'Remove',
                cancel: 'Cancel'
            });

            $mdDialog.show(confirm).then(function() {
                LabelFactory.remove(labelId).then(function(response) {                    
                    var arr = vm.board.labels;
                    arr.splice(arr.indexOf(arr.getById(labelId)), 1);
                });

                // angular.forEach(vm.board.cards, functn(card) {
                //     if (card.idLabels && card.idLabels.indexOf(labelId) > -1) {
                //         card.idLabels.splice(card.idLabels.indexOf(labelId), 1);
                //     }
                // });
            }, function() {
                // Canceled
            });
        }

    }
})();
