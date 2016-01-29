
angular.module('task', [

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
        },

        controller: function($scope, $http , ModalFactory) {

            $scope.taskForm = taskForm;

            function taskForm($event, dataModel) {
                var templateUrl = "app/common/directive/task/form.tpl.html",
                    contrl = TaskViewController,
                    data = {
                        dataModel: dataModel
                    };
                if (dataModel) {
                    data.title = "Issue";
                    ModalFactory.showModal($event, contrl, templateUrl, data).then(function() {
                        //$scope.getSprint($scope.sprintParam);
                    });
                } 
            }            
        }    
    };
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
