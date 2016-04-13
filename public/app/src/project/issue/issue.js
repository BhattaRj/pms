angular.module('issue', [
    'resources.issue',
]);

angular.module('issue').controller('IssueListController', IssueListController);


function IssueListController($scope, $mdDialog, $mdMedia, ConfirmFactory, ModalFactory, IssueFactory) {
    $scope.getData = getData;
    $scope.remove = remove;
    $scope.CreateForm = CreateForm;
    $scope.changeStatus = changeStatus;
    $scope.pageChanged = pageChanged;
    $scope.dataLoaded = false;
    $scope.param = {};
    $scope.title = "All issue";
    getData();

    function pageChanged(page) {
        $scope.param.currentPage = $scope.currentPage;
        $scope.getData($scope.param);
    };

    //Retrive all dataList.         
    function getData(param) {
        $scope.dataLoaded = false;
        $scope.pages = [];
        IssueFactory.getDataList(param).then(function(response) {
            $scope.pages = response.data;
            $scope.totalItems = response.total;
            $scope.dataLoaded = true;
        });
    }

    // Remove the dataItem form the dataList.
    function remove(id, $index, $event) {

        ConfirmFactory.show($event, 'You really want to remove this !!').then(function() {
            IssueFactory.remove(id).then(function(repsonse) {
                $scope.getData($scope.param);
            });
        });
    }

    // Create form for create and Save.
    function CreateForm($event, dataModel) {
        var templateUrl = '/app/src/project/issue/form.tpl.html',
            contrl = SaveIssueController,
            data = {
                dataModel: dataModel
            };

        if (dataModel) {
            data.mode = "edit";
            ModalFactory.showModal($event, contrl, templateUrl, data).then(function() {
                $scope.getData($scope.param);
            });
        } else {
            data.mode = "add";
            ModalFactory.showModal($event, contrl, templateUrl, data).then(function(response) {
                $scope.getData($scope.param);
            });

        }
    }

    // Change the status.
    function changeStatus(data) {
        IssueFactory.save(data);
    }
}

function SaveIssueController(data, $scope, $mdDialog, IssueFactory, $mdToast, data, $state) {
    $scope.save = save;
    $scope.dataModel = data.dataModel ? data.dataModel : {};
    $scope.dataModel = {
        project_id: $state.params.id
    }
    $scope.mode = data.mode;
    $scope.dataSaved = true;
    init();

    function init() {
        // Page list for select box.
        IssueFactory.list().then(function(data) {
            $scope.issues = data;
        });
    }

    // Save the page.
    function save(data) {
        $scope.dataSaved = false;
        IssueFactory.save(data).then(function(response) {
            $scope.dataSaved = true;
            $mdDialog.hide(response);
        });
    }

}
