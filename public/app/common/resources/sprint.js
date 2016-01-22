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

    return fac;
}