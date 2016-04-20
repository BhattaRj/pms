/**
 * Get active sprint with associated task from the all sprint in the list.
 */
(function() {

    angular.module('board', [
        'resources.sprint',
        'resources.task',
        'resources.board',
        'right-nav'
    ]);

    angular.module('board').controller('BoardController', BoardController);

    function BoardController($scope, $stateParams, SprintFactory, TaskFactory, BoardFactory, $mdSidenav) {
        $scope.project_id = $stateParams.id;
        $scope.$parent.selectedIndex = 2;
        $scope.getData = getData;
        $scope.dataLoaded = false;
        $scope.addBoard = addBoard;
        $scope.addingBoard = false;
        $scope.toggleInput = toggleInput;
        getData();

        $scope.toggleLeft = toggleLeft;

        function toggleLeft(task_id) {
            $scope.selectedTaskID = task_id;
            $mdSidenav('right').toggle();
        }

        function toggleInput($event, val) {
            $event.preventDefault();
            $scope[val] = true;
        }

        function addBoard($event, board) {
            if (board.title) {
                var data = {};
                data.title = board.title;
                data.sprint_id = $scope.activeSprint.id;

                BoardFactory.save(data).then(function(response) {
                    $scope.activeSprint.boards.push(response);
                    board.title = '';
                    $scope.addingBoard = false;
                });
            }
        }


        function getData() {
            SprintFactory.activeSprint($scope.project_id).then(function(response) {
                if (response == null) {
                    $scope.activeSprint = [];
                } else {
                    $scope.activeSprint = response;
                }
                $scope.dataLoaded = true;
            });
        }

        $scope.$on('RJ-DRAG-START', function(obj, scope) {
            $scope.sourceIndex = scope.$index;
            $scope.sourceTask = scope.task;
            $scope.sourceTaskList = scope.board.tasks;
        });

        var rjEventHandler = $scope.$on('RJ-DROP-START', function(obj, scope) {

            if ($scope.sourceTask.board_id == scope.task.board_id) {
                reorderBoardTask(scope);
            }

            if ($scope.sourceTask.board_id != scope.task.board_id) {
                swapBoardTask(scope);
            }
        });

        $scope.$on('$destroy', rjEventHandler);

        function swapBoardTask(scope) {
            var task = angular.copy($scope.sourceTask);
            task.board_id = scope.task.board_id;
            $scope.sourceTaskList.splice($scope.sourceIndex, 1);
            scope.board.tasks.splice(scope.$index, 0, task);
            $scope.$apply();
            reorderTasks(scope.board.tasks);
        }

        function reorderBoardTask(scope) {
            scope.board.tasks.splice($scope.sourceIndex, 1);
            scope.board.tasks.splice(scope.$index, 0, $scope.sourceTask);
            $scope.$apply();
            reorderTasks(scope.board.tasks);
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
})();
