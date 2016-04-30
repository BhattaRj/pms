/**
 *  Resourse for creates read update delete.
 */
angular.module('app.core').factory('User', User);
angular.module('app.core').factory('UserFactory', UserFactory);

function User(ResourseFactory) {
    return ResourseFactory.makeResource('/user/:id');
}

function UserFactory(User, BaseModelFactory, $q, $http) {
    var fac = {},
        res = User;
    fac.getDataList = getDataList;
    fac.getDataItem = getDataItem;
    fac.save = save;
    fac.remove = remove;
    fac.getProjectUser = getProjectUser;
    fac.getUsersForBoard = getUsersForBoard;
    fac.userForBoard = [];

    function getDataItem(id) {
        return BaseModelFactory.getDataItem(res, id);
    }

    function getDataList(param) {
        return BaseModelFactory.getDataList(res, param);
    }

    function save(data) {
        return BaseModelFactory.save(res, data);
    }

    function remove(id) {
        return BaseModelFactory.remove(res, id);
    }

    // Returns user not added to the board.
    function getUsersForBoard(board_id) {
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: 'users_for_board/' + board_id,
        }).then(function successCallback(response) {
            if (response.data.success) {                
                fac.userForBoard = response.data.data;
                deferred.resolve(response.data.data);
            } else {
                console.log('error occoured..!!!')
            }
        }, function errorCallback(response) {
            console.log('error occoured..!!!' + response)
        });
        return deferred.promise;
    }


    function getProjectUser(project_id) {
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: 'project_user/' + project_id,
        }).then(function successCallback(response) {
            if (response.data.success) {
                deferred.resolve(response.data.data);
            } else {
                console.log('error occoured..!!!')
            }
        }, function errorCallback(response) {
            console.log('error occoured..!!!' + response)
        });
        return deferred.promise;
    }
    return fac;
}
