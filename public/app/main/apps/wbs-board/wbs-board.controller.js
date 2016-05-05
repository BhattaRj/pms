(function() {
    'use strict';

    angular.module('app.board').controller('WbsBoardController', WbsBoardController);
    angular.module('app.board').controller('SaveIssueController', SaveIssueController);

    function WbsBoardController($mdSidenav, CardFilters, ProjectFactory, TaskData, TaskFactory, ModalFactory, $stateParams, ConfirmFactory, BoardFactory) {
        var vm = this;
        vm.currentView = 'board';
        vm.tasks = TaskData;
        vm.project = ProjectFactory.data;
        vm.boards = BoardFactory.dataList;
        vm.boardSelectorVisible = false;

        // Methods
        vm.toggleSidenav = toggleSidenav;
        vm.clearFilters = CardFilters.clear;
        vm.filteringIsOn = CardFilters.isOn;

        /**
         * Toggle sidenav
         *
         * @param sidenavId
         */
        function toggleSidenav(sidenavId) {
            $mdSidenav(sidenavId).toggle();
        }

        vm.getData = getData;
        vm.remove = remove;
        vm.create = create;
        vm.pageChanged = pageChanged;
        vm.dataLoaded = false;
        vm.param = {};
        vm.param.project_id = $stateParams.id;

        function pageChanged(page) {
            vm.param.currentPage = vm.currentPage;
            vm.getData(vm.param);
        };

        // Retrive all dataList.         
        function getData(param) {
            vm.dataLoaded = false;
            TaskFactory.getStories(param).then(function(response) {
                vm.tasks = response;
                vm.totalItems = response.total;
                vm.dataLoaded = true;
            });
        }

        function remove(id, $index, $event) {
            ConfirmFactory.show($event, 'You really want to remove this !!').then(function() {
                TaskFactory.remove(id).then(function(response) {
                    if (response) {
                        // vm.tasks.splice($index, 1);
                        vm.getData(vm.param);
                    }
                });
            });
        }

        // Create form for create and Save.
        function create($event, id) {
            var templateUrl = '/app/main/apps/wbs-board/form.html',
                contrl = 'SaveIssueController as vm',
                data = {
                    id: id
                };

            ModalFactory.showModal($event, contrl, templateUrl, data).then(function(response) {
                vm.getData(vm.param);
            });
        }
    }

    function SaveIssueController(data, $scope, $mdDialog, TaskFactory, $mdToast, $state, ProjectFactory) {

        var vm = this;
        vm.mode = data.mode;
        $scope.dataSaved = true;
        vm.save = save;
        init();

        if (data.id) {
            getIssue(data.id);
        } else {
            vm.dataModel = {};
            vm.dataModel.project_id = $state.params.id
        }

        function getIssue(id) {
            TaskFactory.getDataItem(id).then(function(response) {
                vm.dataModel = response;
            });
        }

        function init() {
            TaskFactory.list().then(function(data) {
                vm.issues = data;
            });

            ProjectFactory.getDataItem($state.params.id).then(function(response) {
                vm.users = response.users;
            });
        }

        function save(data) {
            $scope.dataSaved = false;
            TaskFactory.save(data).then(function(response) {
                $scope.dataSaved = true;
                $mdDialog.hide(response);
            });
        }
    }

})();
