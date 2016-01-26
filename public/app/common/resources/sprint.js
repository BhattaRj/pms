/**
 *  Resourse for creates read update delete.
 */
angular.module('resources.sprint', ['ngResource', 'ngMaterial', 'rjServices']);

angular.module('resources.sprint').factory('Sprint', Sprint);
angular.module('resources.sprint').factory('SprintFactory', SprintFactory);


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
    fac.activeSprint=activeSprint;

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

    function activeSprint(project_id){
        var deferred = $q.defer();
        $http({
          method: 'GET',
          url: '/active_sprint?project_id='+ project_id
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