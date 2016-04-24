(function() {
    'use strict';

    angular.module('app.sample').controller('UsersController', UsersController);
    angular.module('app.sample').controller('SaveUserController', SaveUserController);

    function UsersController(UsersData, ConfirmFactory, ModalFactory, UserFactory) {
        var vm = this;
        vm.users = UsersData.data;
        vm.create = create;
        vm.remove = remove;
        vm.dataLoaded = false;

        function getData() {
            UserFactory.getDataList().then(function(response) {
                vm.users = response.data;
                vm.totalItems = response.total;
                vm.dataLoaded = true;
            });
        }

        function remove(id, $index, $event) {
            $event.stopPropagation();
            ConfirmFactory.show($event, 'You really want to remove this !!').then(function() {
                UserFactory.remove(id).then(function(repsonse) {
                    vm.users.splice($index, 1);
                });
            });
        }

        function create($event, id) {
            var templateUrl = '/app/main/users/users-form.html',
                contrl = 'SaveUserController as vm',
                data = {};
            data.title = id ? "Edit User" : "Add User";
            data.id = id ? id : null;

            ModalFactory.showModal($event, contrl, templateUrl, data).then(function(response) {
                if (response.data.data != true) {
                    vm.users.push(response.data.data);
                } else {
                    getData();
                }

            });
        }
    }

    function SaveUserController($scope, data, UserFactory, Upload, $mdDialog) {
        var vm = this;
        vm.save = save;
        vm.dialogTitle = data.title;
        $scope.dataSaved = true;
        init();

        function init() {
            // if edit mode fetch the post.
            if (data.id) {
                UserFactory.getDataItem(data.id).then(function(response) {
                    vm.dataModel = response;
                });
            }
        }

        function save(data) {
            $scope.dataSaved = false;
            if (data.file) {
                data.image_url = data.file.name;
            }
            var url = '/user';
            Upload.upload({
                url: url,
                data: {
                    file: data.file,
                    data
                }
            }).then(function(response) {
                $scope.dataSaved = true;
                $mdDialog.hide(response);
            }, function(response) {

            });
        }
    }
})();
