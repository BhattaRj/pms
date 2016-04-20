angular.module('testing', []);
angular.module('testing').controller('TestingController', TestingController);

function TestingController() {
    var vm = this;
    vm.title="Testing board.";
}
