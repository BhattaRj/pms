angular.module('app.core').factory('Label', Label);
angular.module('app.core').factory('LabelFactory', LabelFactory);

function Label(ResourseFactory) {
    return ResourseFactory.makeResource('/label/:id');
}

function LabelFactory(Label, BaseModelFactory, $q, $http) {
    var fac = {},
        res = Label;
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
