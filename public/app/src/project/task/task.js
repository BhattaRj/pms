(function() {

    angular.module('task', [
        'resources.task',
        'resources.sprint',          
    ]);

    angular.module('task').controller('TaskController', TaskController);
    
    function TaskController($scope, TaskFactory, ConfirmFactory, $stateParams, ModalFactory,SprintFactory) {

        $scope.$parent.selectedIndex=1;

        /**
         * Functions related to the backlog.
         */
        $scope.getBacklogs = getBacklogs;
        $scope.backlogsLoaded = false;
        $scope.backlogParam={
            project_id : $stateParams.id,
            sprint_id : 'null'
        }
        $scope.addBacklog=addBacklog;
        $scope.removeBacklog=removeBacklog;
        $scope.taskForm=taskForm;
        getBacklogs($scope.backlogParam);        


        function getBacklogs(param){
            TaskFactory.getDataList(param).then(function(response) {
                $scope.backlogs = response.data;
                $scope.totalItems = response.total;
                $scope.backlogsLoaded = true;
            });            
        }

        function addBacklog($event,backlog){            
            if(backlog && backlog.title){
                var data={};
                data.project_id = $stateParams.id;
                data.title = backlog.title;
                TaskFactory.save(data).then(function(response) {
                    $scope.backlogs.push(response);
                    $scope.backlog.title="";
                });    
            }
        }

        function removeBacklog(id, $index, $event){
            ConfirmFactory.show($event, 'You really want to remove this !!').then(function() {                    
                TaskFactory.remove(id).then(function(repsonse) {
                    $scope.backlogs.splice($index, 1);
                });
            });
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
                    $scope.getBacklogs(param);
                });
            } 
        }

        /**
         * Function related to the sprint
         */
        $scope.getSprint=getSprint;        
        $scope.sprintDataLoaded = true;
        $scope.sprintParam={
            project_id: $stateParams.id
        }  
        $scope.addSprintTask=addSprintTask;
        getSprint($scope.sprintParam)
        $scope.removeSprintTask=removeSprintTask;
        $scope.sprintForm=sprintForm;
        function getSprint (param) {            
            SprintFactory.getDataList(param).then(function(response) {
                $scope.sprintList = response.data;
                $scope.totalSprintItems = response.total;
                $scope.sprintDataLoaded = true;
            });            
        }

        function addSprintTask ($event,task) {            
            if(task.issue_title){
                $scope.task = task;
                var data={};
                data.project_id = $stateParams.id;
                data.title = task.issue_title;
                data.sprint_id=task.id;
                TaskFactory.save(data).then(function(response) {
                    $scope.task.tasks.push(response);
                    $scope.task.issue_title="";
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
            } else {
                data.title = "Add Sprint";
                ModalFactory.showModal($event, contrl, templateUrl, data).then(function(response) {
                    $scope.getSprint($scope.sprintParam);
                });
            }
        }
    }

    function TaskViewController(data, $scope, $mdDialog, TaskFactory, $mdToast, data, $state) {           
        $scope.save = save;
        $scope.dataModel = data.dataModel ? data.dataModel : {};
        $scope.title = data.title;
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

    function SprintViewController(data, $scope, $mdDialog, SprintFactory, $mdToast, data, $state) {  
        debugger;      
        $scope.save = save;
        $scope.dataModel = data.dataModel ? data.dataModel : {};
        $scope.title = data.title;
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