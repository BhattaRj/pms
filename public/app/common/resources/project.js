/**
 *  Resourse for creates read update delete.
 */
angular.module('resources.project', ['ngResource', 'ngMaterial', 'rjServices']);

angular.module('resources.project').factory('Project', Project);
angular.module('resources.project').factory('ProjectFactory', ProjectFactory);


function Project(ResourseFactory) {
    return ResourseFactory.makeResource('/project/:id');
}


function ProjectFactory(Project, BaseModelFactory, $q, $http) {
    var fac = {},
        res = Project;
    fac.getDataList = getDataList;
    fac.getDataItem = getDataItem;
    fac.save = save;
    fac.remove = remove;
    fac.recentProjects = recentProjects;

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

    function recentProjects() {
        var deferred = $q.defer();
        $http.get("/recent_project").then(function(response) {
            if (response) {
                deferred.resolve(response.data.data);
            }
        });

        return deferred.promise;
    }

    return fac;
}
