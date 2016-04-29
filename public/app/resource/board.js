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
    fac.getDataList = getDataList;
    fac.getDataItem = getDataItem;
    fac.save = save;
    fac.remove = remove;
    fac.activeSprint = activeSprint;
    fac.testingSprint = testingSprint;
    fac.data = {};
    fac.dataList = [];
    fac.getBoardList = getBoardList;

    Array.prototype.getById = function(value) {
        return this.filter(function(x) {
            return x.id === value;
        })[0];
    };

    function getBoardList(param) {

        var queryString = CommonFactory.makeQueryString(param),
            url = "/board_list?" + queryString,
            deferred = $q.defer();

        $http.get(url).then(function(response) {
            fac.dataList = response.data.data;
            deferred.resolve(response.data.data);
        });

        return deferred.promise;
    }

    function getDataItem(id) {
        var deferred = $q.defer();
        return BaseModelFactory.getDataItem(res, id).then(function(response) {
            fac.data = response;
            // Resolve the response
            deferred.resolve(response);
        }, function(response) {
            deferred.reject(response);
        });
    }

    function getDataList(param) {
        return BaseModelFactory.getDataList(res, param);
    }

    function save(data) {
        var deferred = $q.defer();
        return BaseModelFactory.save(res, data).then(function(response) {
            fac.data = response;
            if (fac.dataList.getById(response.id)) {
                fac.dataList.getById(response.id).title = fac.data.title;
            } else {
                fac.dataList.push({ id: String(response.id), title: response.title });
            }
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
