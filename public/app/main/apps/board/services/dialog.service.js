(function() {
    'use strict';

    angular.module('app.board').factory('DialogService', DialogService);
    
    function DialogService($mdDialog, $document) {
        var service = {
            openCardDialog: openCardDialog
        };


        /**
         * Open card dialog
         *
         * @param ev
         * @param cardId
         */
        function openCardDialog(ev, card) {            
            $mdDialog.show({
                templateUrl: 'app/main/apps/board/dialogs/card/card-dialog.html',
                controller: 'ScrumboardCardDialogController',
                controllerAs: 'vm',
                parent: $document.find('#scrumboard'),
                targetEvent: ev,
                clickOutsideToClose: true,
                escapeToClose: true,
                locals: {
                    card: card
                }
            });
        }

        return service;
    }
})();
