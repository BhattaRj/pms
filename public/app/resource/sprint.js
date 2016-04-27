/**
 *  Resourse for creates read update delete.
 */
angular.module('app.core').factory('Sprint', Sprint);
angular.module('app.core').factory('SprintFactory', SprintFactory);


function Sprint(ResourseFactory) {
    return ResourseFactory.makeResource('/sprint/:id');
}


function SprintFactory(Sprint, BaseModelFactory, $q, $http) {
    var fac = {},
        res = Sprint;
    fac.getDataList = getDataList;
    fac.getDataItem = getDataItem;
    fac.save = save;
    fac.remove = remove;
    fac.activeSprint = activeSprint;
    fac.testingSprint = testingSprint;
    fac.data = {};

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
            // Resolve the response
            deferred.resolve(response);
        }, function(response) {
            deferred.reject(response);
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
