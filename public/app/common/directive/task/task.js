
angular.module('task', [
        'resources.task',
        'resources.project',
        'resources.sprint'
    ]);

angular.module('task').directive('rjTask', rjTask);
angular.module('task').factory('TaskDataFactory', TaskDataFactory);

function TaskDataFactory() {
    var fac = {};
    fac.getTask = getTask;

    function getTask() {

    }
    return fac;
}


function rjTask() {

    return {

        restrict: "E",
        templateUrl: "app/common/directive/task/task-list.tpl.html",
        replace: true,
        scope: {
            task: '=',
            hideRemoveButton: '=',     
            taskList: '=',
            sprintId:'='       
        },

        controller: function($scope, $http , ModalFactory, ConfirmFactory , TaskFactory ) {            

            $scope.taskForm = taskForm;   
            $scope.removeTask = removeTask;                                
            function taskForm($event, dataModel) {
                var templateUrl = "app/common/directive/task/form.tpl.html",
                    contrl = TaskViewController,
                    data = {
                        dataModel: dataModel
                    };
                if (dataModel) {
                    data.title = "Issue";
                    data.sprint_id = $scope.sprintId;
                    ModalFactory.showModal($event, contrl, templateUrl, data).then(function() {
                        //$scope.getSprint($scope.sprintParam);
                    });
                } 
            }  

            function removeTask(task, $index, $event){    
                $event.preventDefault()
                $event.stopPropagation()            
                ConfirmFactory.show($event, 'You really want to remove this !!').then(function() { 
                    TaskFactory.remove(task.id).then(function(repsonse) {
                        $scope.taskList.splice($index, 1);
                    });

                });            
            }
        }    
    };
}



function TaskViewController(data, $scope, $mdDialog ,TaskFactory , $stateParams , ProjectFactory , SprintFactory) {           
    $scope.save = save;
    $scope.dataModel = data.dataModel ? data.dataModel : {};
    $scope.title = data.title;
    $scope.sprint_id = data.sprint_id;
    $scope.dataSaved = true;
    $scope.getData=getData;
    getData();

    function getData(){
        ProjectFactory.getDataItem($stateParams.id).then(function(response){
            $scope.users = response.users;
        });

        SprintFactory.getDataItem($scope.sprint_id).then(function(response){
            $scope.boards = response.boards;
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
