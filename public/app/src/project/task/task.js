(function() {

    angular.module('task', [
        'resources.task',
        'resources.sprint',    
    ]);

    angular.module('task').controller('TaskController', TaskController);
    
    function TaskController($scope, TaskFactory, ConfirmFactory, $stateParams, ModalFactory,SprintFactory) {
        $scope.getData = getData;
        $scope.save = save;
        $scope.remove = remove;
        $scope.CreateForm = CreateForm;
        $scope.dataLoaded = false;
        $scope.isOpen=false;
        $scope.selectedMode = 'md-scale';
        $scope.$parent.selectedIndex=1;
        var param = {
            project_id: $stateParams.id
        };
        $scope.createSprintForm = createSprintForm;
        getData(param);

        function save($event, task) {   
            var data={};
            data.project_id = $stateParams.id;
            data.title = task.task_title;

            if(task.id)
            {
                data.sprint_id=task.id;
            }        
            debugger;

            TaskFactory.save(data).then(function(response) {
                getData(param);
                // if($scope.data.title){
                //     $scope.data.title = "";    
                // }
                // if($scope.sprint.task_title){
                //     $scope.sprint.task_title="";
                // }
                
            });
        }

        function getData(param) {
            param.sprint_id='null';                    
            debugger;

            TaskFactory.getDataList(param).then(function(response) {
                $scope.dataList = response.data;
                $scope.totalItems = response.total;
                $scope.dataLoaded = true;
            });

            SprintFactory.getDataList(param).then(function(response) {
                $scope.sprintList = response.data;
                $scope.totalSprintItems = response.total;
                $scope.sprintDataLoaded = true;
            });            
        }

        // Remove the dataItem form the dataList.
        function remove(id, $index, $event) {
            ConfirmFactory.show($event, 'You really want to remove this !!').then(function() {                    
                TaskFactory.remove(id).then(function(repsonse) {
                    $scope.dataList.splice($index, 1);
                });
            });
        }

        // Create form for create and Save.
        function CreateForm($event, dataModel) {
            var templateUrl = '/app/src/project/sprint/form.tpl.html',
                contrl = SaveTaskController,
                data = {
                    dataModel: dataModel
                };

            if (dataModel) {
                data.mode = "edit";
                ModalFactory.showModal($event, contrl, templateUrl, data).then(function() {
                    $scope.getData(param);
                });
            } else {
                data.mode = "add";
                ModalFactory.showModal($event, contrl, templateUrl, data).then(function(response) {
                    $scope.getData(param);
                });
            }
        }

        // Create form for Sprint create and Save.
        function createSprintForm($event, dataModel) {
            var templateUrl = '/app/src/project/task/form.tpl.html',
                contrl = SaveSprintController,
                data = {
                    dataModel: dataModel
                };

            if (dataModel) {
                data.mode = "edit";
                ModalFactory.showModal($event, contrl, templateUrl, data).then(function() {
                    $scope.getData(param);
                });
            } else {
                data.mode = "add";
                ModalFactory.showModal($event, contrl, templateUrl, data).then(function(response) {
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

    function SaveSprintController(data, $scope, $mdDialog, SprintFactory, $mdToast, data, $state) {        
        $scope.save = save;
        $scope.dataModel = data.dataModel ? data.dataModel : {};
        $scope.mode = data.mode;
        $scope.dataSaved = true;
        function save(data) {            
            data.project_id=$state.params.id;
            $scope.dataSaved = false;
            SprintFactory.save(data).then(function(response) {    
                $scope.dataSaved = true;
                $mdDialog.hide(response);
            });
        }
    }

})();