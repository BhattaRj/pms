angular.module('allproject', []);
angular.module('allproject').controller('ProjectListControlller', ProjectListControlller);
angular.module('allproject').controller('SaveProjectController', SaveProjectController);

function ProjectListControlller(ProjectFactory, ConfirmFactory, ModalFactory) {
    var vm = this;
    vm.dataLoaded = false;
    vm.remove = remove;
    vm.createForm = createForm;
    vm.param = {};
    vm.param.project_id = 10;
    vm.param.sprint_id=20;
    
    getData(vm.param);

    function getData(param) {
        ProjectFactory.getDataList(param).then(function(response) {
            vm.projects = response.data;
            vm.dataLoaded = true;
        });
    }

    function remove(id, $index, $event) {
        ConfirmFactory.show($event, 'You really want to remove this !!').then(function() {
            ProjectFactory.remove(id).then(function(response) {
                if (response) {
                    vm.projects.splice($index, 1);
                }
            });
        });
    }

    function createForm($event, id) {
        var templateUrl = '/app/src/allproject/form.tpl.html',
            contrl = 'SaveProjectController as saveProject',
            data = {
                id: id
            };
        ModalFactory.showModal($event, contrl, templateUrl, data).then(function(response) {
            getData();
        });
    }
}

function SaveProjectController($scope, $mdDialog, ProjectFactory, $mdToast, data) {
    $scope.mode = data.mode;
    $scope.dataSaved = true;
    $scope.save = save;

    if (data.id) {
        getIssue(data.id);
        $scope.title = "Edit Project";
    } else {
        $scope.title = "Add Project";
        $scope.dataModel = {};
    }

    function getIssue(id) {
        ProjectFactory.getDataItem(id).then(function(response) {
            $scope.dataModel = response;
        });
    }

    function save(data) {
        $scope.dataSaved = false;
        ProjectFactory.save(data).then(function(response) {
            $scope.dataSaved = true;
            $mdDialog.hide(response);
        });
    }

}
