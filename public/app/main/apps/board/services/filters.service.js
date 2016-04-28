(function() {
    'use strict';

    angular.module('app.board').factory('CardFilters', CardFiltersService);

    /** @ngInject */
    function CardFiltersService() {
        var service = {
            title: '',
            labels: [],
            members: [],
            clear: clear,
            isOn: isOn
        };

        /**
         * Clear
         */
        function clear() {
            service.title = '';
            service.labels = [];
            service.members = [];
        }

        /**
         * Is on
         *
         * @returns {boolean}
         */
        function isOn() {
            return (service.title === '' && service.labels.length === 0 && service.members.length === 0) ? false : true;
        }

        return service;
    }
})();
