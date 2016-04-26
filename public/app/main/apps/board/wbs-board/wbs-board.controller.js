(function() {
    'use strict';

    angular.module('app.board').controller('WbsBoardController', WbsBoardController);
    angular.module('app.board').controller('SaveIssueController', SaveIssueController);

    function WbsBoardController($mdSidenav, CardFilters, ProjectData, TaskData, TaskFactory, ModalFactory, $stateParams) {
        var vm = this;
        vm.currentView = 'board';
        vm.tasks = TaskData;
        vm.project = ProjectData;
        vm.boardSelectorVisible = false;

        // Methods
        vm.toggleSidenav = toggleSidenav;
        vm.updateBoardUri = updateBoardUri;
        vm.clearFilters = CardFilters.clear;
        vm.filteringIsOn = CardFilters.isOn;

        /**
         * Update Board Uri
         *
         * Once you connect your app to your server,
         * you would do this on your API server.
         */
        function updateBoardUri() {
            if (vm.boardList.getById(vm.board.id)) {
                vm.boardList.getById(vm.board.id).name = vm.board.name;
                vm.boardList.getById(vm.board.id).uri = vm.board.uri = encodeURIComponent(vm.board.name).replace(/%20/g, '-').toLowerCase();
            }
        }

        /**
         * Toggle sidenav
         *
         * @param sidenavId
         */
        function toggleSidenav(sidenavId) {
            $mdSidenav(sidenavId).toggle();
        }


        /**
         * Array prototype
         *
         * Get by id
         *
         * @param value
         * @returns {T}
         */
        Array.prototype.getById = function(value) {
            return this.filter(function(x) {
                return x.id === value;
            })[0];
        };


        vm.getData = getData;
        vm.remove = remove;
        vm.CreateForm = CreateForm;
        vm.pageChanged = pageChanged;
        vm.dataLoaded = false;
        vm.param = {};
        vm.param.project_id = $stateParams.id;


        // SprintFactory.getDataItem(vm.sprint_id).then(function(response) {            
        //     vm.boards = response.boards;
        // });


        function pageChanged(page) {
            vm.param.currentPage = vm.currentPage;
            vm.getData(vm.param);
        };

        //Retrive all dataList.         
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
                        vm.getData(vm.param);
                    }
                });
            });
        }

        // Create form for create and Save.
        function CreateForm($event, id) {
            var templateUrl = '/app/main/apps/board/wbs-board/form.html',
                contrl = 'SaveIssueController as vm',
                data = {
                    id: id
                };

            ModalFactory.showModal($event, contrl, templateUrl, data).then(function(response) {
                // vm.getData(vm.param);
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
            vm.title = "Edit Issue";
        } else {
            vm.title = "Add Issue";
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
            debugger;
            $scope.dataSaved = false;
            TaskFactory.save(data).then(function(response) {
                $scope.dataSaved = true;
                $mdDialog.hide(response);
            });
        }
    }

})();
