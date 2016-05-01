(function() {
    'use strict';

    angular.module('app.board').controller('msSbAddCardController', msSbAddCardController);
    angular.module('app.board').directive('msSbAddCard', msSbAddCardDirective);

    function msSbAddCardController($scope, $timeout, BoardFactory, msUtils, TaskFactory) {

        var vm = this;
        vm.newCardName = '';
        vm.listId = $scope.msListId;
        vm.board = BoardFactory.data;
        // vm.cards = vm.board.tasks;
        vm.list = vm.board.lists.getById(vm.listId);

        // Methods
        vm.addNewCard = addNewCard;

        /**
         * Add New Card
         */
        function addNewCard() {            
            if (vm.newCardName === '') {
                return;
            }            
            var data = {
                title: vm.newCardName,
                list_id: vm.list.id,
            }

            TaskFactory.save(data).then(function(response) {
            debugger;                
                vm.list.tasks.push(response);
            });

            $timeout(function() {
                $scope.scrollListContentBottom();
            });

            vm.newCardName = '';
        }
    }

    function msSbAddCardDirective($document, $window, $timeout) {
        return {
            restrict: 'E',
            controller: 'msSbAddCardController as vm',
            templateUrl: 'app/main/apps/scrumboard/directives/ms-sb-add-card/ms-sb-add-card.html',
            scope: {
                msListId: '='
            },
            link: function(scope, iElement) {
                scope.formActive = false;
                scope.toggleForm = toggleForm;
                scope.scrollListContentBottom = scrollListContentBottom;

                var buttonEl = iElement.find('.ms-sb-add-card-button'),
                    formEl = iElement.find('.ms-sb-add-card-form'),
                    listCards = iElement.parent().prev().find('.list-cards');

                /**
                 * Click Event
                 */
                buttonEl.on('click', toggleForm);

                /**
                 * Toggle Form
                 */
                function toggleForm() {
                    scope.$evalAsync(function() {
                        scope.formActive = !scope.formActive;

                        if (scope.formActive) {
                            $timeout(function() {
                                formEl.find('input').focus();

                                scrollListContentBottom();
                            });

                            $document.on('click', outSideClick);
                        } else {
                            PerfectScrollbar.update(listCards[0]);
                            $document.off('click', outSideClick);
                        }

                        $timeout(function() {
                            // IE list-content max-height hack
                            if (angular.element('html').hasClass('explorer')) {
                                angular.element($window).trigger('resize');
                            }
                        });

                    });
                }

                /**
                 * Scroll List to the Bottom
                 */
                function scrollListContentBottom() {
                    listCards[0].scrollTop = listCards[0].scrollHeight;
                }

                /**
                 * Click Outside Event Handler
                 * @param event
                 */
                var outSideClick = function(event) {
                    var isChild = formEl.has(event.target).length > 0;
                    var isSelf = formEl[0] === event.target;
                    var isInside = isChild || isSelf;

                    if (!isInside) {
                        toggleForm();
                    }
                };
            }
        };
    }
})();
