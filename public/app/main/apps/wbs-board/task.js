(function() {
    'use strict';


    angular.module('app.board').controller('TaskController', TaskController);

    function TaskController($scope, $http, TaskFactory) {

        $scope.data = [];

        $scope.title = 'janak';

        $http({
            method: 'GET',
            url: '/test_data',

        }).then(function successCallback(response) {


            $scope.data = response.data.data;

        }, function errorCallback(response) {

            console.log('error occoured..!!!' + response)

        });


        $scope.parseId = function(val) {
            val.id = parseInt(val.id);
        };

        $scope.remove = function(scope) {
            scope.remove();
        };

        $scope.toggle = function(scope) {
            scope.toggle();
        };

        $scope.moveLastToTheBeginning = function() {
            var a = $scope.data.pop();
            $scope.data.splice(0, 0, a);
        };


        $scope.newSubItem = function(scope) {

            var nodeData = scope.$modelValue;

            nodeData.children.push({
                id: nodeData.id * 10 + nodeData.children.length,
                title: nodeData.title + '.' + (nodeData.children.length + 1),
                children: []
            });

        };

        $scope.collapseAll = function() {
            $scope.$broadcast('angular-ui-tree:collapse-all');
        };

        $scope.expandAll = function() {
            $scope.$broadcast('angular-ui-tree:expand-all');
        };

        $scope.save = function(data) {

            TaskFactory.save(data).then(function(response) {

            });
        }

    }

}());
