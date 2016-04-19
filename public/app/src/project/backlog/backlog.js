(function() {

    angular.module('backlog', [
        'resources.task',
        'resources.sprint',
    ]);

    angular.module('backlog').controller('BacklogController', BacklogController);

    function BacklogController($scope, TaskFactory, ConfirmFactory, $stateParams, $rootScope, ModalFactory, SprintFactory, $state) {
        $scope.$parent.selectedIndex = 1;
        $scope.getSprint = getSprint;
        $scope.sprintDataLoaded = false;

        $scope.sprintParam = {
            project_id: $stateParams.id
        }
        
        $scope.addSprintTask = addSprintTask;
        getSprint($scope.sprintParam)
        $scope.sprintForm = sprintForm;
        $scope.addingSprint = false;
        $scope.toggleInput = toggleInput;
        $scope.addSprint = addSprint;

        // Show input box.
        function toggleInput($event, val) {
            $event.preventDefault();
            $scope[val] = true;
        }

        // Add new sprint.
        function addSprint($event, newSprint) {
            if (newSprint != undefined && newSprint.title) {
                newSprint.project_id = $state.params.id;
                SprintFactory.save(newSprint).then(function(response) {
                    $scope.addingSprint = false;
                    $scope.newSprint = '';
                    $scope.sprintList.push(response);
                });
            }
        }

        // Get all sprintlist.
        function getSprint(param) {
            SprintFactory.getDataList(param).then(function(response) {
                $scope.sprintList = response.data;
                $scope.totalSprintItems = response.total;
                $scope.sprintDataLoaded = true;
            });
        }

        // Add task for the sprint.
        function addSprintTask($event, sprint) {
            if (sprint.issue_title) {
                $scope.sprint = sprint;
                var data = {};
                data.title = sprint.issue_title;
                data.sprint_id = sprint.id;
                data.project_id = $stateParams.id;
                TaskFactory.save(data).then(function(response) {
                    $scope.sprint.tasks.push(response)
                    $scope.sprint.issue_title = "";
                });
            }
        }


        // Show form modal to activate sprint.
        function sprintForm($event, dataModel) {
            var templateUrl = '/app/src/project/backlog/sprint-form.tpl.html',
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

        // Drag start event handler.
        $scope.$on('RJ-DRAG-START', function(obj, scope) {
            $scope.sourceIndex = scope.$index;
            $scope.sourceTask = scope.task;
            if (scope.sprint) {
                $scope.sourceTaskList = scope.sprint.tasks;
            }
        });

        // Drop start event handler.
        var rjEventHandler = $scope.$on('RJ-DROP-START', function(obj, scope) {
            if (scope.task.sprint_id == $scope.sourceTask.sprint_id) {
                reorderSprintTask(scope);
            }

            if (scope.task.sprint_id != $scope.sourceTask.sprint_id) {
                swapSprintTasks(scope);
            }
        });

        $scope.$on('$destroy', rjEventHandler);

        // Swap tasks from one sprint to another sprint.
        function swapSprintTasks(scope) {
            var task = angular.copy($scope.sourceTask);
            task.sprint_id = scope.task.sprint_id;
            task.default_board = true;
            $scope.sourceTaskList.splice($scope.sourceIndex, 1);
            scope.sprint.tasks.splice(scope.$index, 0, task);
            $scope.$apply();
            reorderTasks(scope.sprint.tasks);
        }

        // Reorder tasks in same sprint or backlog.
        function reorderSprintTask(scope) {
            scope.sprint.tasks.splice($scope.sourceIndex, 1);
            scope.sprint.tasks.splice(scope.$index, 0, $scope.sourceTask);
            $scope.$apply();
            reorderTasks(scope.sprint.tasks);
        }

        // Reorder tasks.
        function reorderTasks(dataList) {
            $scope.updateStatus = false;
            TaskFactory.reorderTasks(dataList).then(function(response) {
                if (response) {
                    $scope.updateStatus = true;
                }
            });
        }
    }

    // Sprint view to activate sprint.
    function SprintViewController(data, $scope, $mdDialog, SprintFactory, $mdToast, data, $state) {

        $scope.save = save;
        $scope.dataModel = data.dataModel ? data.dataModel : {};
        $scope.title = data.title;
        $scope.dataSaved = true;
        $scope.durationChanged = durationChanged;

        function save(data) {
            data.project_id = $state.params.id;
            $scope.dataSaved = false;
            SprintFactory.save(data).then(function(response) {
                $scope.dataSaved = true;
                $mdDialog.hide(response);
            });
        }

        // when duration of sprint change
        // change sprint start data and end date.
        function durationChanged(duration) {
            if (duration != 0) {
                $scope.dataModel.start_date = new Date();
                $scope.dataModel.end_date = new Date().addDays(duration);
            }

        }
    }
})();
