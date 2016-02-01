
(function() {

angular.module('file', [    

]);

angular.module('file').controller('FileController', FileController);

function FileController($scope,$stateParams) {
	$scope.$parent.selectedIndex=4;
}


})();