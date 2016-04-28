/**
 *  Resourse for creates read update delete.
 */
angular.module('app.core').factory('Board', Board);
angular.module('app.core').factory('BoardFactory', BoardFactory);


function Board(ResourseFactory) {
    return ResourseFactory.makeResource('/board/:id');
}


function BoardFactory(Board, BaseModelFactory, $q, $http) {
    var fac = {},
        res = Board;
    fac.getDataList = getDataList;
    fac.getDataItem = getDataItem;
    fac.save = save;
    fac.remove = remove;
    fac.reorderList = reorderList;

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

    function reorderList(data) {

        var deferred = $q.defer();

        $http({
                url: '/reorder_list',
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
