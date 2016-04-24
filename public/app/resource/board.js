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