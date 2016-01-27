
(function() {

angular.module('member', [    

]);

angular.module('member').controller('MemberController', MemberController);

function MemberController($scope,$stateParams) {
	$scope.$parent.selectedIndex=3;
}


})();