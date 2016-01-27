(function() {

    angular.module('task', [
        'resources.task',
        'resources.sprint',          
    ]);

    angular.module('task').controller('TaskController', TaskController);
    
    function TaskController($scope, TaskFactory, ConfirmFactory, $stateParams, $rootScope, ModalFactory,SprintFactory ,$state) {
        $scope.$parent.selectedIndex=1;
        $scope.getSprint=getSprint;        
        $scope.sprintDataLoaded = false;
        $scope.sprintParam={
            project_id: $stateParams.id
        }  
        $scope.addSprintTask=addSprintTask;
        getSprint($scope.sprintParam)
        $scope.removeSprintTask=removeSprintTask;
        $scope.sprintForm=sprintForm;
        $scope.taskForm=taskForm;
        $scope.addingSprint = false;
        $scope.toggleInput=toggleInput;
        $scope.addSprint=addSprint;

        function toggleInput($event,val){
            $event.preventDefault();            
            $scope[val]=true;
        }    
        
        function addSprint($event,newSprint){            
            if(newSprint != undefined && newSprint.title){  
                newSprint.project_id=$state.params.id;                
                SprintFactory.save(newSprint).then(function(response) { 
                    $scope.addingSprint = false;
                    $scope.newSprint='';
                    $scope.sprintList.push(response);
                });
            }
        }

        function taskForm($event, dataModel) {
            var templateUrl = '/app/src/project/task/form.tpl.html',
                contrl = TaskViewController,
                data = {
                    dataModel: dataModel
                };
            if (dataModel) {
                data.title = "Issue";
                ModalFactory.showModal($event, contrl, templateUrl, data).then(function() {
                    $scope.getBacklogs($scope.backlogParam);
                });
            } 
        }

        function getSprint (param) {            
            SprintFactory.getDataList(param).then(function(response) {
                $scope.sprintList = response.data;
                $scope.totalSprintItems = response.total;
                $scope.sprintDataLoaded = true;
            });            
        }

        function addSprintTask ($event,sprint) {            
            if(sprint.issue_title){
                $scope.sprint = sprint;
                var data = {};
                data.title = sprint.issue_title;
                data.sprint_id = sprint.id;
                TaskFactory.save(data).then(function(response) {                    
                    $scope.sprint.tasks.push(response)
                    $scope.sprint.issue_title="";
                });                            
            }
        }

        function removeSprintTask(task, $index, $event,sprint){
            ConfirmFactory.show($event, 'You really want to remove this !!').then(function() { 
                TaskFactory.remove(task.id).then(function(repsonse) {
                    sprint.tasks.splice($index, 1);
                });
            });            
        }
        
        function sprintForm($event, dataModel) {
            var templateUrl = '/app/src/project/task/sprint-form.tpl.html',
                contrl = SprintViewController,
                data = {
                    dataModel: dataModel
                };
            if (dataModel) {
                data.title = "Update Sprint";
                ModalFactory.showModal($event, contrl, templateUrl, data).then(function() {
                    $scope.getSprint($scope.sprintParam);
                });
            } 
        }

        $scope.$on('RJ-DRAG-START', function(obj, scope) { 
            $scope.sourceIndex = scope.$index;             
            $scope.sourceTask = scope.task;            
            if(scope.sprint){                
                $scope.sourceTaskList = scope.sprint.tasks;
            }
        });
        
        var rjEventHandler = $scope.$on('RJ-DROP-START', function(obj, scope) {               
            if(scope.task.sprint_id == $scope.sourceTask.sprint_id){
                reorderSprintTask(scope);                
            }

            if(scope.task.sprint_id != $scope.sourceTask.sprint_id){
                swapSprintTasks(scope);
            }                                        
        });

        $scope.$on('$destroy', rjEventHandler);

        function swapSprintTasks(scope){ 
            var task = angular.copy($scope.sourceTask);
            task.sprint_id = scope.task.sprint_id;
            $scope.sourceTaskList.splice($scope.sourceIndex, 1);
            scope.sprint.tasks.splice(scope.$index, 0, task);
            $scope.$apply();            
            reorderTasks(scope.sprint.tasks);            
        }

        function reorderSprintTask(scope) {
            scope.sprint.tasks.splice($scope.sourceIndex, 1);
            scope.sprint.tasks.splice(scope.$index, 0, $scope.sourceTask);
            $scope.$apply();            
            reorderTasks(scope.sprint.tasks);            
        }

        // Reorder tasks
        function reorderTasks(dataList) {
            $scope.updateStatus = false;        
            TaskFactory.reorderTasks(dataList).then(function(response) {
                if (response) {
                    $scope.updateStatus = true;
                }
            });
        }
    }

    function TaskViewController(data, $scope, $mdDialog, TaskFactory, $mdToast, data, $state) {           
        $scope.save = save;
        $scope.dataModel = data.dataModel ? data.dataModel : {};
        $scope.title = data.title;
        $scope.dataSaved = true;
        function save(data) {        
            $scope.dataSaved = false;
            TaskFactory.save(data).then(function(response) {    
                $scope.dataSaved = true;
                $mdDialog.hide(response);
            });
        }
    }

    function SprintViewController(data, $scope, $mdDialog, SprintFactory, $mdToast, data, $state) {  
        $scope.save = save;
        $scope.dataModel = data.dataModel ? data.dataModel : {};
        $scope.title = data.title;
        $scope.dataSaved = true;
        $scope.durationChanged=durationChanged;
        function save(data) {            
            data.project_id=$state.params.id;
            $scope.dataSaved = false;
            SprintFactory.save(data).then(function(response) {    
                $scope.dataSaved = true;
                $mdDialog.hide(response);
            });
        }

        function durationChanged(duration){               
            if(duration!=0){
                $scope.dataModel.start_date=new Date();            
                $scope.dataModel.end_date= new Date().addDays(duration);                
            }

        }
    }
})();