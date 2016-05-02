angular.module('app.core').factory('Setting', Setting);
angular.module('app.core').factory('SettingFactory', SettingFactory);

function Setting(ResourseFactory) {
    return ResourseFactory.makeResource('/setting/:id');
}

function SettingFactory(Setting, BaseModelFactory, $q, $http) {
    var fac = {},
        res = Setting;
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
