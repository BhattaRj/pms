(function() {

    angular.module('project', [
        'resources.project',
        'task',        
    ]);

    angular.module('project').controller('ProjectController', ProjectController);
    angular.module('project').controller('ProjectShowController', ProjectShowController);

    function ProjectController($scope, ProjectFactory, ConfirmFactory,$state) {

        $scope.getData = getData;
        $scope.save = save;
        $scope.remove = remove;
        $scope.dataLoaded = false;
        $scope.selectedIndex=0;
        var param = {};
        getData(param);

        function save($event, data) {
            if(data && data.title){
                ProjectFactory.save(data).then(function(response) {
                    $scope.dataList.push(response);
                    $scope.data.title='';
                });                
            }
        }

        function getData(param) {
            ProjectFactory.getDataList(param).then(function(response) {
                $scope.dataList = response.data;
                $scope.totalItems = response.total;
                $scope.dataLoaded = true;
            });
        }

        // Remove the dataItem form the dataList.
        function remove(id, $index, $event) {
            ConfirmFactory.show($event, 'You really want to remove this !!')
                .then(function() {
                    ProjectFactory.remove(id).then(function(repsonse) {
                        $scope.dataList.splice($index, 1);
                    });
                });
        }
    }

    function ProjectShowController($scope, ProjectFactory, $mdBottomSheet, $mdSidenav, $stateParams) {
        $scope.dataLoaded = false;
        $scope.toggleSidebar=toggleSidebar;
        
        ProjectFactory.getDataItem($stateParams.id).then(function(response) {
            $scope.project = response;
            $scope.dataLoaded = true;
            $scope.toggleSidebar();
        });

        // toggle the sidebar.
        function toggleSidebar() {
            var pending = $mdBottomSheet.hide() || $q.when(true);
            pending.then(function() {
                $mdSidenav('left').toggle();
            });
        }
    }

})();