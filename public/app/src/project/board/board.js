
(function() {

angular.module('board', [    
	'resources.sprint'
]);

angular.module('board').controller('BoardController', BoardController);

function BoardController($scope,$stateParams, SprintFactory ) {

	debugger;
	$scope.$parent.selectedIndex=2;
	$scope.getData=getData;
	$scope.dataLoaded=false;
	getData();

	function getData(){
		SprintFactory.activeSprint($stateParams.id).then(function(response){			
			if(response==null){
				$scope.activesprint=[];
			}else{
				$scope.activesprint = response;	
			}
			$scope.dataLoaded=true;
		});

	}
}


})();