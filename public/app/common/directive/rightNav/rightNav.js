/** 
 * Right side nav bar to add bug and sub task.
 */
angular.module('right-nav', [
    'resources.task'
]);

angular.module('right-nav').directive('rightNav', rightNav);
angular.module('right-nav').factory('RightNavFactory', RightNavFactory);

function RightNavFactory() {
    var fac = {};
    return fac;
}


function rightNav() {
    var dir = {};
    dir.restrict = 'E';
    dir.templateUrl = "app/common/directive/rightNav/right-nav.html";
    dir.replace = true;
    dir.scope = {
        taskId: '=',
        projectId: '=',
    };

    dir.controller = function($scope, TaskFactory) {

        $scope.addBug = addBug;
        $scope.getSubtasks = getSubtasks;
        $scope.param = {};
        $scope.tasks = [];
        $scope.dataLoaded = false;

        $scope.$watch(function(scope) {
                return scope.taskId;
            },
            function(newValue, oldValue) {
                if (newValue) {
                    $scope.getSubtasks(newValue);
                }
            }
        );


        function getSubtasks(parent_id) {
            $scope.param.parent_id = parent_id;
            TaskFactory.getSubtasks($scope.param).then(function(response) {
                $scope.dataLoaded = true;
                $scope.tasks = response;
            })
        }

        function addBug(title) {
            var data = {};
            data.title = title;
            data.order = "childOf";
            data.ordertask = $scope.taskId;
            data.project_id = $scope.projectId;
            data.task_type = 'Bug';

            TaskFactory.save(data).then(function(response) {
                $scope.dataModel.title = '';
                $scope.tasks.push(response);
            });
        }
    }

    return dir;
}
