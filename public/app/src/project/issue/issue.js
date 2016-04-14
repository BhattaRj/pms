angular.module('issue', [
    'resources.issue',
    'resources.project'
]);

angular.module('issue').controller('IssueListController', IssueListController);

function IssueListController($scope, $mdDialog, $mdMedia, ConfirmFactory, ModalFactory, IssueFactory) {
    $scope.getData = getData;
    $scope.remove = remove;
    $scope.CreateForm = CreateForm;
    $scope.pageChanged = pageChanged;
    $scope.dataLoaded = false;
    $scope.param = {};
    getData();

    function pageChanged(page) {
        $scope.param.currentPage = $scope.currentPage;
        $scope.getData($scope.param);
    };

    //Retrive all dataList.         
    function getData(param) {
        $scope.dataLoaded = false;
        $scope.issues = [];
        IssueFactory.getDataList(param).then(function(response) {
            $scope.issues = response.data;
            $scope.totalItems = response.total;
            $scope.dataLoaded = true;
        });
    }

    function remove(id, $index, $event) {
        ConfirmFactory.show($event, 'You really want to remove this !!').then(function() {
            IssueFactory.remove(id).then(function(response) {
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

function SaveIssueController(data, $scope, $mdDialog, IssueFactory, $mdToast, data, $state, ProjectFactory) {
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
        IssueFactory.getDataItem(id).then(function(response) {
            $scope.dataModel = response;
        });
    }

    function init() {
        IssueFactory.list().then(function(data) {
            $scope.issues = data;
        });

        ProjectFactory.getDataItem($state.params.id).then(function(response) {
            $scope.users = response.users;
        });

        // SprintFactory.getDataItem($scope.sprint_id).then(function(response) {
        //     $scope.boards = response.boards;
        // });
    }

    function save(data) {
        $scope.dataSaved = false;
        IssueFactory.save(data).then(function(response) {
            $scope.dataSaved = true;
            $mdDialog.hide(response);
        });
    }

}
