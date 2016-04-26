(function() {
    'use strict';

    angular.module('app.project').controller('ProjectController', ProjectController);
    angular.module('app.project').controller('SaveProjectController', SaveProjectController);

    function ProjectController(Data, ConfirmFactory, ModalFactory, ProjectFactory) {
        var vm = this;
        vm.dataList = Data.data;
        vm.create = create;
        vm.remove = remove;
        vm.dataLoaded = false;

        function getData() {
            ProjectFactory.getDataList().then(function(response) {
                vm.dataList = response.data;
                vm.totalItems = response.total;
                vm.dataLoaded = true;
            });
        }

        function remove(id, $index, $event) {
            $event.stopPropagation();
            ConfirmFactory.show($event, 'You really want to remove this !!').then(function() {
                ProjectFactory.remove(id).then(function(repsonse) {
                    vm.dataList.splice($index, 1);
                });
            });
        }

        function create($event, id) {
            var templateUrl = '/app/main/apps/project/project-form.html',
                contrl = 'SaveProjectController as vm',
                data = {};
            data.title = id ? "Edit Project" : "Add Project";
            data.id = id ? id : null;

            ModalFactory.showModal($event, contrl, templateUrl, data).then(function(response) {
                if (response != true) {
                    vm.dataList.push(response.data.data);
                } else {
                    getData();
                }

            });
        }
    }

    function SaveProjectController($scope, data, ProjectFactory, $mdDialog) {
        var vm = this;
        vm.save = save;
        vm.dialogTitle = data.title;
        $scope.dataSaved = true;
        init();

        function init() {
            // if edit mode fetch the post.
            if (data.id) {
                ProjectFactory.getDataItem(data.id).then(function(response) {
                    vm.dataModel = response;
                });
            }
        }

        function save(data) {
            ProjectFactory.save(data).then(function(response) {
                $scope.dataSaved = true;
                $mdDialog.hide(response);
            });
        }        
    }
})();
