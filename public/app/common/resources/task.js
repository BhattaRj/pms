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
    fac.reorderTasks=reorderTasks;

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

    function reorderTasks(data) {

        var deferred = $q.defer();
        $http({
                url: '/reorder_task',
                method: "POST",
                data: data
            })
            .then(function(response) {
                if (response.data.success) {
                    deferred.resolve(response.data.success);
                } else {
                    console.log('error occoured..!!!')
                }
            });

        return deferred.promise;
    }
    return fac;
}