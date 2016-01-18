(function() {

    angular.module('task', [
        'resources.task'
    ]);

    angular.module('task').controller('TaskController', TaskController);
    angular.module('task').controller('SaveTaskController', SaveTaskController);

    function TaskController($scope, TaskFactory, ConfirmFactory, $stateParams, ModalFactory) {

        $scope.getData = getData;
        $scope.save = save;
        $scope.remove = remove;
        $scope.CreateForm = CreateForm;
        $scope.dataLoaded = false;
        var param = {
            project_id: $stateParams.id
        };

        getData(param);

        function save($event, data) {
            TaskFactory.save(data).then(function(response) {
                getData(param);
                $scope.data.title = "";
            });
        }

        function getData(param) {
            TaskFactory.getDataList(param).then(function(response) {
                $scope.dataList = response.data;
                $scope.totalItems = response.total;
                $scope.dataLoaded = true;
            });
        }

        // Remove the dataItem form the dataList.
        function remove(id, $index, $event) {
            ConfirmFactory.show($event, 'You really want to remove this !!')
                .then(function() {
                    
                    TaskFactory.remove(id).then(function(repsonse) {
                        $scope.dataList.splice($index, 1);
                    });

                });
        }

        // Create form for create and Save.
        function CreateForm($event, dataModel) {

            var templateUrl = '/app/src/project/task/form.tpl.html',
                contrl = SaveTaskController,
                data = {
                    dataModel: dataModel
                };

            if (dataModel) {
                data.mode = "edit";
                ModalFactory.showModal($event, contrl, templateUrl, data)
                    .then(function() {
                        $scope.getData(param);
                    });
            } else {
                data.mode = "add";
                ModalFactory.showModal($event, contrl, templateUrl, data)
                    .then(function(response) {
                        $scope.getData(param);
                    });

            }
        }

    }

    function SaveTaskController(data, $scope, $mdDialog, TaskFactory, $mdToast, data, $state) {        

        $scope.save = save;
        $scope.dataModel = data.dataModel ? data.dataModel : {};
        $scope.mode = data.mode;
        $scope.dataSaved = true;

        function save(data) {
            
            data.project_id=$state.params.id;
            $scope.dataSaved = false;

            TaskFactory.save(data).then(function(response) {    
                $scope.dataSaved = true;
                $mdDialog.hide(response);
            });
        }
    }


})();