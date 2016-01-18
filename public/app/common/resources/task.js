/**
 *  Resourse for creates read update delete.
 */
angular.module('resources.task', ['ngResource', 'ngMaterial', 'rjServices']);

angular.module('resources.task').factory('Task', Task);
angular.module('resources.task').factory('TaskFactory', TaskFactory);


function Task(ResourseFactory) {
    return ResourseFactory.makeResource('/task/:id');
}


function TaskFactory(Task, BaseModelFactory, $q, $http) {
    var fac = {},
        res = Task;
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