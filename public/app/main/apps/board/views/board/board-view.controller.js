(function() {
    'use strict';

    angular.module('app.board').controller('BoardViewController', BoardViewController);

    function BoardViewController($document, $window, $timeout, $mdDialog, msUtils, CardFilters, DialogService, SprintFactory, ProjectData, BoardFactory) {
        var vm = this;
        vm.currentView = 'board';
        vm.board = SprintFactory.data;
        vm.boardList = ProjectData.sprints;


        vm.cardFilters = CardFilters;
        vm.card = {};
        vm.cardOptions = {};
        vm.newListName = '';


        vm.sortableListOptions = {
            axis: 'x',
            delay: 75,
            distance: 7,
            items: '> .list-wrapper',
            handle: '.list-header',
            placeholder: 'list-wrapper list-sortable-placeholder',
            tolerance: 'pointer',
            start: function(event, ui) {
                var width = ui.item[0].children[0].clientWidth;
                var height = ui.item[0].children[0].clientHeight;
                ui.placeholder.css({
                    'min-width': width + 'px',
                    'width': width + 'px',
                    'height': height + 'px'
                });
            }
        };

        vm.sortableCardOptions = {
            appendTo: 'body',
            connectWith: '.list-cards',
            delay: 75,
            distance: 7,
            forceHelperSize: true,
            forcePlaceholderSize: true,
            handle: msUtils.isMobile() ? '.list-card-sort-handle' : false,
            helper: function(event, el) {
                return el.clone().addClass('list-card-sort-helper');
            },
            placeholder: 'list-card card-sortable-placeholder',
            tolerance: 'pointer',
            scroll: true,
            sort: function(event, ui) {
                var listContentEl = ui.placeholder.closest('.list-content');
                var boardContentEl = ui.placeholder.closest('#board');

                if (listContentEl) {
                    var listContentElHeight = listContentEl[0].clientHeight,
                        listContentElScrollHeight = listContentEl[0].scrollHeight;

                    if (listContentElHeight !== listContentElScrollHeight) {
                        var itemTop = ui.position.top,
                            itemBottom = itemTop + ui.item.height(),
                            listTop = listContentEl.offset().top,
                            listBottom = listTop + listContentElHeight;

                        if (itemTop < listTop + 25) {
                            listContentEl.scrollTop(listContentEl.scrollTop() - 25);
                        }

                        if (itemBottom > listBottom - 25) {
                            listContentEl.scrollTop(listContentEl.scrollTop() + 25);
                        }
                    }
                }

                if (boardContentEl) {
                    var boardContentElWidth = boardContentEl[0].clientWidth;
                    var boardContentElScrollWidth = boardContentEl[0].scrollWidth;

                    if (boardContentElWidth !== boardContentElScrollWidth) {
                        var itemLeft = ui.position.left,
                            itemRight = itemLeft + ui.item.width(),
                            boardLeft = boardContentEl.offset().left,
                            boardRight = boardLeft + boardContentElWidth;

                        if (itemLeft < boardLeft + 25) {
                            boardContentEl.scrollLeft(boardContentEl.scrollLeft() - 25);
                        }

                        if (itemRight > boardRight) {
                            boardContentEl.scrollLeft(boardContentEl.scrollLeft() + 25);
                        }
                    }
                }
            }
        };

        // Methods
        vm.openCardDialog = DialogService.openCardDialog;
        vm.addNewList = addNewList;
        vm.removeList = removeList;
        vm.cardFilter = cardFilter;
        vm.isOverdue = isOverdue;
        vm.updateListTitle = updateListTitle;

        function  updateListTitle(list) {            
            BoardFactory.save(list).then(function(response){                
            });
        }

        init();

        /**
         * Initialize
         */
        function init() {

            $timeout(function() {
                // IE list-content max-height hack
                if (angular.element('html').hasClass('explorer')) {
                    // Calculate the height for the first time
                    calculateListContentHeight();

                    // Attach calculateListContentHeight function to window resize
                    $window.onresize = function() {
                        calculateListContentHeight();
                    };
                }
            }, 0);

        }

        /**
         * IE ONLY
         * Calculate the list-content height
         * IE ONLY
         */
        function calculateListContentHeight() {
            var boardEl = angular.element('#board');
            var boardElHeight = boardEl.height();

            boardEl.find('.list-wrapper').each(function(index, el) {
                // Get the required heights for calculations
                var listWrapperEl = angular.element(el),
                    listHeaderElHeight = listWrapperEl.find('.list-header').height(),
                    listFooterElHeight = listWrapperEl.find('.list-footer').height();

                // Calculate the max height
                var maxHeight = boardElHeight - listHeaderElHeight - listFooterElHeight;

                // Add the max height
                listWrapperEl.find('.list-content').css({ 'max-height': maxHeight });
            });
        }

        /**
         * Add new list
         */
        function addNewList() {
            if (vm.newListName === '') {
                return;
            }

            // Add new List.
            var data = {};
            data.title = vm.newListName;
            data.sprint_id = vm.board.id;
            BoardFactory.save(data).then(function(response) {
                vm.board.boards.push(response);
                vm.newListName = '';
            });
        }

        /**
         * Remove list
         *
         * @param ev
         * @param list
         */
        function removeList(ev, list) {
            var confirm = $mdDialog.confirm({
                title: 'Remove List',
                parent: $document.find('#scrumboard'),
                textContent: 'Are you sure want to remove list?',
                ariaLabel: 'remove list',
                targetEvent: ev,
                clickOutsideToClose: true,
                escapeToClose: true,
                ok: 'Remove',
                cancel: 'Cancel'
            });
            $mdDialog.show(confirm).then(function() {
                BoardFactory.remove(list.id).then(function(response){
                    vm.board.boards.splice(vm.board.boards.indexOf(list),1);
                });
                // vm.board.lists.splice(vm.board.lists.indexOf(list), 1);

            }, function() {
                // Canceled
            });

        }

        /**
         * Card filter
         *
         * @param cardId
         * @returns {*}
         */
        function cardFilter(cardId) {
            var card = vm.board.cards.getById(cardId);

            try {
                if (angular.lowercase(card.name).indexOf(angular.lowercase(vm.cardFilters.name)) < 0) {
                    throw false;
                }

                angular.forEach(vm.cardFilters.labels, function(label) {
                    if (!msUtils.exists(label, card.idLabels)) {
                        throw false;
                    }
                });

                angular.forEach(vm.cardFilters.members, function(member) {
                    if (!msUtils.exists(member, card.idMembers)) {
                        throw false;
                    }
                });


            } catch (err) {
                return err;
            }

            return true;
        }

        /**
         * Is the card overdue?
         *
         * @param cardDate
         * @returns {boolean}
         */
        function isOverdue(cardDate) {
            return moment() > moment(cardDate, 'x');
        }
    }
})();