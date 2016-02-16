
(function() {

angular.module('member', [    
	'resources.user',
    'resources.project'
]);

angular.module('member').controller('MemberController', MemberController);

function MemberController($scope , $stateParams, UserFactory , ProjectFactory , ConfirmFactory) {    
    $scope.$parent.selectedIndex=3;
    $scope.querySearch = querySearch;
    $scope.getUser=getUser;
    $scope.selectedUser =[];        
    $scope.addUser= addUser;
    $scope.removeUser=removeUser;
    $scope.dataLoaded=false;
    getUser();
    getProject();

    function removeUser(id,$index,$event){
        ConfirmFactory.show($event, 'You really want to remove this !!').then(function() { 
            $scope.project.users.splice($index,1);
            ProjectFactory.save($scope.project).then(function(response) {    
                $scope.getUser();
            });        
        });            
    }

    function addUser($event){
        angular.forEach($scope.selectedUser, function(user){
            this.push(user);
        },$scope.project.users);
        
        ProjectFactory.save($scope.project).then(function(response) {    
            if(response){
                $scope.selectedUser=[];
                $scope.getUser();
            }
        });
    }

    function getUser(){
        $scope.users=[];
        UserFactory.getProjectUser($stateParams.id).then(function(response){
            $scope.dataList = response;
            $scope.totalItems = response.total;
            $scope.dataLoaded = true;
            return $scope.dataList.map(function(user) {
                user._lowername = user.name.toLowerCase();
                $scope.users.push(user);
            });            
        });        
    }

    function getProject(){    
        ProjectFactory.getDataItem($stateParams.id).then(function(response){
            $scope.project = response;
        });
    }

    /**
     * Search for contacts.
     */
    function querySearch (query) {
        var results = query ? $scope.users.filter(createFilterFor(query)) : [];
        return results;
    }

    /**
     * Create filter function for a query string
     */
    function createFilterFor(query) {
        var lowercaseQuery = angular.lowercase(query);
        return function filterFn(contact) {
            return (contact._lowername.indexOf(lowercaseQuery) != -1);;
        };
    }
}

})();




