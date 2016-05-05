angular.module('app.core').factory('Comment', Comment);
angular.module('app.core').factory('CommentFactory', CommentFactory);

function Comment(ResourseFactory) {
    return ResourseFactory.makeResource('/comment/:id');
}

function CommentFactory(Comment, BaseModelFactory, $q, $http) {
    var fac = {},
        res = Comment;
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
