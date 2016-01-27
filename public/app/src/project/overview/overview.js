
(function() {

angular.module('overview', [    

]);

angular.module('overview').controller('OverviewController', OverviewController);

function OverviewController($scope,$stateParams) {
	$scope.$parent.selectedIndex=0;
}

})();