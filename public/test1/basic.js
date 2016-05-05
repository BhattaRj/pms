(function() {
    'use strict';

    angular.module('demoApp').controller('BasicExampleCtrl', ['$scope', '$http', function($scope, $http) {
        $scope.tasks = [];
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

        // $scope.data = [{
        //     'id': 1,
        //     'title': 'node1',
        //     'children': [{
        //         'id': 11,
        //         'title': 'node1.1',
        //         'children': [{
        //             'id': 111,
        //             'title': 'node1.1.1',
        //             'children': []
        //         }]
        //     }, {
        //         'id': 12,
        //         'title': 'node1.2',
        //         'children': []
        //     }]
        // }, {
        //     'id': 2,
        //     'title': 'node2',
        //     'children': [{
        //         'id': 21,
        //         'title': 'node2.1',
        //         'children': []
        //     }, {
        //         'id': 22,
        //         'title': 'node2.2',
        //         'children': []
        //     }]
        // }, {
        //     'id': 3,
        //     'title': 'node3',
        //     'children': [{
        //         'id': 31,
        //         'title': 'node3.1',
        //         'children': []
        //     }]
        // }];

        // debugger;

    }]);

}());
