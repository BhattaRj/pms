(function() {
    'use strict';

    angular.module('app.board').controller('MembersMenuController', MembersMenuController);

    function MembersMenuController($document, $mdDialog, BoardFactory, UserFactory, $stateParams) {
        var vm = this;

        // Data
        vm.board = BoardFactory.data;
        vm.newMemberSearchInput = '';
        vm.selectedUser = [];

        // Methods
        vm.addNewMember = addNewMember;
        vm.removeMember = removeMember;
        vm.memberQuerySearch = memberQuerySearch;
        init();

        function init() {
            UserFactory.getUsersForBoard(vm.board.id).then(function(response){
                debugger;
                vm.users = UserFactory.userForBoard;                
            });                    
        }

        /**
         * Add member chips         
         * @param query
         * @returns {Array}
         */
        function memberQuerySearch(query) {
            return query ? vm.users.filter(createFilterFor(query)) : [];
        }

        /**
         * Filter for chips
         * @param query
         * @returns {filterFn}
         */
        function createFilterFor(query) {
            var lowercaseQuery = angular.lowercase(query);
            return function filterFn(item) {
                return angular.lowercase(item.name).indexOf(lowercaseQuery) >= 0;
            };
        }

        /**
         * Add New user and remove from board user list.
         */
        function addNewMember() {
            angular.forEach(vm.selectedUser, function(user) {
                this.push(user);
            }, vm.board.users);

            BoardFactory.save(vm.board).then(function(response) {
                angular.forEach(vm.selectedUser, function(user) {
                    this.splice(this.indexOf(user), 1);
                }, vm.users);
                vm.selectedUser = [];
            });
        }

        /**
         * Remove member         
         * @param ev
         * @param memberId
         */
        function removeMember(ev, user) {
            var confirm = $mdDialog.confirm({
                title: 'Remove Member',
                parent: $document.find('#scrumboard'),
                textContent: 'Are you sure want to remove member?',
                ariaLabel: 'remove member',
                targetEvent: ev,
                clickOutsideToClose: true,
                escapeToClose: true,
                ok: 'Remove',
                cancel: 'Cancel'
            });

            $mdDialog.show(confirm).then(function() {
                var arr = vm.board.users;
                arr.splice(arr.indexOf(user), 1);                
                BoardFactory.save(vm.board).then(function(response) {
                    vm.users.push(user);
                    vm.selectedUser = [];
                });
                // angular.forEach(vm.board.cards, function(card) {
                //     if (card.idMembers && card.idMembers.indexOf(memberId) > -1) {
                //         card.idMembers.splice(card.idMembers.indexOf(memberId), 1);
                //     }
                // });
            }, function() {});
        }

    }
})();
