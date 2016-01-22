angular.module('board', [    
]);

angular.module('board').controller('BoardController', BoardController);

function BoardController($scope, $mdDialog, $mdMedia, ConfirmFactory, ModalFactory) {

   	  this.topDirections = ['left', 'up'];
      this.bottomDirections = ['down', 'right'];
      this.isOpen = false;
      this.availableModes = ['md-fling', 'md-scale'];
      this.selectedMode = 'md-scale';
      this.availableDirections = ['up', 'down', 'left', 'right'];
      this.selectedDirection = 'up';


}

