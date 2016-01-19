angular.module('user', [
    'resources.user',
]);

angular.module('user').controller('UserListController', UserListController);

function UserListController($scope, $mdDialog, $mdMedia, ConfirmFactory, ModalFactory, UserFactory) {
    $scope.getData = getData;
    $scope.remove = remove;
    $scope.CreateForm = CreateForm;
    $scope.changeStatus = changeStatus;
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
        $scope.dataList = [];
        UserFactory.getDataList(param).then(function(response) {
            $scope.dataList = response.data;
            $scope.totalItems = response.total;
            $scope.dataLoaded = true;
        });
    }

    // Remove the dataItem form the dataList.
    function remove(id, $index, $event) {        
        $event.stopPropagation();
        ConfirmFactory.show($event, 'You really want to remove this !!').then(function() {
            UserFactory.remove(id).then(function(repsonse) {
                $scope.dataList.splice($index, 1);
            });
        });
    }

    function CreateForm($event, dataModel) {
        var templateUrl = '/app/src/user/form.tpl.html',
            contrl = SaveUserController,
            data = {
                dataModel: dataModel
            };

        if (dataModel) {
            data.title = "Edit User";
            ModalFactory.showModal($event, contrl, templateUrl, data).then(function() {
                $scope.getData($scope.param);
            });
        } else {
            data.title = "Add User";
            ModalFactory.showModal($event, contrl, templateUrl, data).then(function(response) {
                $scope.getData($scope.param);
            });

        }
    }

    function changeStatus(data) {
        UserFactory.save(data);
    }

}

function SaveUserController(data, $scope, $mdDialog, UserFactory, $mdToast, data, $state, Upload) {
    $scope.save = save;
    $scope.dataModel = data.dataModel ? data.dataModel : {};
    $scope.title = data.title;
    $scope.dataSaved = true;

    function save(data) {
        $scope.dataSaved = false;
        if (data.file) {
            data.image_url = data.file.name;
        }
        var url = '/user';
        Upload.upload({
            url: url,
            data: {
                file: data.file,
                data
            }
        }).then(function(response) {
            $scope.dataSaved = true;
            $mdDialog.hide(response);
        }, function(response) {

        });
    }
}