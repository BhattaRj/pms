/**
 *  Resourse for creates read update delete.
 */
angular.module('resources.issue', ['ngResource', 'ngMaterial', 'rjServices']);
angular.module('resources.issue').factory('Issue', Issue);
angular.module('resources.issue').factory('IssueFactory', IssueFactory);

function Issue(ResourseFactory) {
    return ResourseFactory.makeResource('/issue/:id');
}

function IssueFactory(Issue, BaseModelFactory, $q, $http) {
    var fac = {},
        res = Issue;
    fac.getDataList = getDataList;
    fac.getDataItem = getDataItem;
    fac.save = save;
    fac.remove = remove;
    fac.list = list;

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

    function list() {
        var deferred = $q.defer();
        $http.get("/issue_list")
            .then(function(response) {
                deferred.resolve(response.data.data);
            });

        return deferred.promise;
    }


    return fac;
}
