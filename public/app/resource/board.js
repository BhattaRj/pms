/**
 *  Resourse for creates read update delete.
 */
angular.module('app.core').factory('Board', Board);
angular.module('app.core').factory('BoardFactory', BoardFactory);


function Board(ResourseFactory) {
    return ResourseFactory.makeResource('/board/:id');
}


function BoardFactory(Board, BaseModelFactory, $q, $http, CommonFactory) {
    var fac = {},
        res = Board;
    fac.data = {};
    fac.dataList = [];
    fac.project = {};

    fac.getDataList = getDataList;
    fac.getDataItem = getDataItem;
    fac.save = save;
    fac.remove = remove;
    fac.activeSprint = activeSprint;
    fac.testingSprint = testingSprint;
    fac.getBoardList = getBoardList;
    fac.update = update;

    function getBoardList(param) {

        var queryString = CommonFactory.makeQueryString(param),
            url = "/board_list?" + queryString,
            deferred = $q.defer();

        $http.get(url).then(function(response) {
            fac.dataList = response.data.data;
            fac.project = response.data.project;
            deferred.resolve(response.data.data);
        });

        return deferred.promise;
    }

    function getDataItem(id) {
        var deferred = $q.defer();
        return BaseModelFactory.getDataItem(res, id).then(function(response) {
            fac.data = response;
            deferred.resolve(response);
        }, function(response) {
            deferred.reject(response);
        });
    }

    function getDataList(param) {
        return BaseModelFactory.getDataList(res, param);
    }


    function update(data) {
        var deferred = $q.defer();
        res.update({
            id: data.id,
            data: data
        }, function(response) {
            if (response.success) {
                if (fac.dataList.getById(response.data.id)) {
                    fac.dataList.getById(response.data.id).title = response.data.title;
                }
                deferred.resolve(response.data);
                console.log('data updated successfully.')
            }
        }, function(error) {
            if (422 == error.status) {
                console.log('validation error occoured!!');
            }
        });

        return deferred.promise;
    }

    function save(data) {
        var deferred = $q.defer();
        return BaseModelFactory.save(res, data).then(function(response) {
            fac.data = response;
            fac.dataList.push({ id: String(response.id), title: response.title });
            deferred.resolve(response);
        }, function(response) {
            deferred.reject(fac.data);
        });
    }

    function remove(id) {
        return BaseModelFactory.remove(res, id);
    }

    function activeSprint(project_id) {
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: '/active_sprint?project_id=' + project_id
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

    function testingSprint(project_id) {
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: '/testing_sprint?project_id=' + project_id
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
