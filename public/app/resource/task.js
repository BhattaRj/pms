/**
 *  Resourse for creates read update delete.
 */
angular.module('app.core').factory('Task', Task);
angular.module('app.core').factory('TaskFactory', TaskFactory);


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
    fac.reorderTasks = reorderTasks;
    fac.list = list;
    fac.getStories = getStories;
    fac.getSubtasks = getSubtasks;
    fac.moveToTestingBacklog = moveToTestingBacklog;

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

    function moveToTestingBacklog(data) {

        var deferred = $q.defer();

        $http({
                url: '/move_to_testing_backlog',
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


    function list() {

        var deferred = $q.defer();

        $http.get("/task_list").then(function(response) {
            deferred.resolve(response.data.data);
        });

        return deferred.promise;
    }


    function getStories(param) {

        var queryString = makeQueryString(param),
            url = "/get_sotries?" + queryString,
            deferred = $q.defer();

        $http.get(url).then(function(response) {
            deferred.resolve(response.data.data);
        });

        return deferred.promise;

    }

    function getSubtasks(param) {

        var queryString = makeQueryString(param),
            url = "/get_sub_tasks?" + queryString,
            deferred = $q.defer();

        $http.get(url).then(function(response) {
            deferred.resolve(response.data.data);
        });

        return deferred.promise;

    }

    // trnasform json boject into the query string.
    function makeQueryString(param) {

        this.queryString = '';

        angular.forEach(param, function(value, key) {

            this.queryString += key + '=' + value + '&';

        }, this);

        return this.queryString;

    }

    return fac;
}
