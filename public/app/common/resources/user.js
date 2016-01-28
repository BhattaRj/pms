/**
 *  Resourse for creates read update delete.
 */
angular.module('resources.user', ['ngResource', 'ngMaterial', 'rjServices']);

angular.module('resources.user').factory('User', User);
angular.module('resources.user').factory('UserFactory', UserFactory);


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
    fac.getProjectUser=getProjectUser;

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

    function getProjectUser(project_id){
        var deferred = $q.defer();        
        $http({
          method: 'GET',
          url: 'project_user/'+project_id,
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