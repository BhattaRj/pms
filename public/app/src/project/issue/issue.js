angular.module('issue', [
    'resources.task',
    'resources.project'
]);

angular.module('issue').controller('IssueListController', IssueListController);

function IssueListController($scope, $mdDialog, $mdMedia, ConfirmFactory, ModalFactory, TaskFactory, $stateParams) {
    $scope.getData = getData;
    $scope.remove = remove;
    $scope.CreateForm = CreateForm;
    $scope.pageChanged = pageChanged;
    $scope.dataLoaded = false;
    $scope.param = {};
    $scope.param.project_id = $stateParams.id;    

    getData($scope.param);

    function pageChanged(page) {
        $scope.param.currentPage = $scope.currentPage;
        $scope.getData($scope.param);
    };

    //Retrive all dataList.         
    function getData(param) {
        $scope.dataLoaded = false;
        $scope.issues = [];
        TaskFactory.getStories(param).then(function(response) {
            $scope.issues = response;
            $scope.totalItems = response.total;
            $scope.dataLoaded = true;
        });
    }

    function remove(id, $index, $event) {
        ConfirmFactory.show($event, 'You really want to remove this !!').then(function() {
            TaskFactory.remove(id).then(function(response) {
                if (response) {
                    $scope.getData($scope.param);
                }
            });
        });
    }

    // Create form for create and Save.
    function CreateForm($event, id) {
        var templateUrl = '/app/src/project/issue/form.tpl.html',
            contrl = SaveIssueController,
            data = {
                id: id
            };
        ModalFactory.showModal($event, contrl, templateUrl, data).then(function(response) {
            $scope.getData($scope.param);
        });
    }
}

function SaveIssueController(data, $scope, $mdDialog, TaskFactory, $mdToast, data, $state, ProjectFactory) {
    $scope.mode = data.mode;
    $scope.dataSaved = true;
    $scope.save = save;
    init();

    if (data.id) {
        getIssue(data.id);
        $scope.title = "Edit Issue";
    } else {
        $scope.title = "Add Issue";
        $scope.dataModel = {};
        $scope.dataModel.project_id = $state.params.id
    }

    function getIssue(id) {
        TaskFactory.getDataItem(id).then(function(response) {
            $scope.dataModel = response;
        });
    }

    function init() {
        TaskFactory.list().then(function(data) {
            $scope.issues = data;
        });

        ProjectFactory.getDataItem($state.params.id).then(function(response) {
            $scope.users = response.users;
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
