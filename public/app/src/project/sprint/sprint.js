(function() {

    angular.module('sprint', [    
    	'resources.sprint',    
    ]);

    angular.module('task').controller('SprintController', SprintController);

    function SprintController($scope,SprintFactory,$stateParams, ConfirmFactory) {
        
        $scope.getData = getData;
        $scope.save = save;
        $scope.remove = remove;
        $scope.dataLoaded = false;       
        $scope.$parent.selectedIndex=2;
        var param = {
            project_id: $stateParams.id
        };
        getData(param);

        function save($event, data) {
        	data.project_id = $stateParams.id;
            SprintFactory.save(data).then(function(response) {
                getData(param);
                $scope.data.title = "";
            });
        }

        function getData(param) {
            SprintFactory.getDataList(param).then(function(response) {
                $scope.dataList = response.data;
                $scope.totalItems = response.total;
                $scope.dataLoaded = true;
            });
        }

        // Remove the dataItem form the dataList.
        function remove(id, $index, $event) {
            ConfirmFactory.show($event, 'You really want to remove this !!')
                .then(function() {
                    SprintFactory.remove(id).then(function(repsonse) {
                        $scope.dataList.splice($index, 1);
                    });
                });
        }        
    }



})();