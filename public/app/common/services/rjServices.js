/**
 * Common ServiceFactory.
 */
angular.module('rjServices', ['ngMaterial', 'ngResource']);
angular.module('rjServices').factory('ModalFactory', ModalFactory);
angular.module('rjServices').factory('NotifyFactory', NotifyFactory);
angular.module('rjServices').factory('AlertFactory', AlertFactory);

angular.module('rjServices').factory('ConfirmFactory', ConfirmFactory);
angular.module('rjServices').factory('ResourseFactory', ResourseFactory);
angular.module('rjServices').factory('BaseModelFactory', BaseModelFactory);

/**
 * ---------------------------------------------------------------------------
 * Material Modal box.
 * ---------------------------------------------------------------------------
 * Creates Materials Modal box.
 * Locals must be catched in modal controllers as dependency with name data.
 * Example:
 * 
 * var templateUrl = 'sis/src/app/settings/courses/course-add.tpl.html',
 *     contrl = AddController;
 *              
 * ModalFactory.showModal(ev, contrl, templateUrl)
 *   .then(function(response) {
 *       $scope.getData();
 *    });
 * 
 */
function ModalFactory($mdDialog, $mdMedia) {
    var fac = {};
    fac.showModal = showModal;

    function showModal(ev, controller, templateUrl, data) {

        return $mdDialog.show({
            controller: controller,
            templateUrl: templateUrl,
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            fullscreen: $mdMedia('sm'),

            locals: {
                data: data ? data : null
            }
        });
    }
    return fac;
}


/**
 * --------------------------------------------------------
 * Material Notification (Toast)
 * --------------------------------------------------------
 * Creates material nofitication or alert.
 * Example:
 * NotifyFactory.show('Data successfully updated.');
 *
 */
function NotifyFactory($mdToast) {
    var fac = {};
    fac.show = show;

    function show(msg) {

        return $mdToast.show(
            $mdToast.simple()
            .textContent(msg)
            .position('top right')
            .hideDelay(2500)
            //.parent(document.querySelector('#notify')) //-- dom element ot show notification.
        );
    }
    return fac;
}

/**
 * ----------------------------------------
 *  Confirmation Box
 * -----------------------------------------
 * Creates confirmation box with yes no button.
 * Returns promose service.
 * Example:
 *
 * ConfirmFactory.show($event, 'You really want to remove this !!')
 *   .then(function() {
 *        // When yes button clicked.
 *    },function(){
 *        // When no button clicked.
 *    });
 * });
 *  
 */

function ConfirmFactory($mdDialog) {
    var fac = {};
    fac.show = show;

    function show($event, msg) {
        // Appending dialog to document.body to cover sidenav in docs app
        var confirm = $mdDialog.confirm()
            //.title('Confirm')
            .textContent(msg)
            .ariaLabel('Lucky day')
            .targetEvent($event)
            .ok('Yes')
            .cancel('No');
        return $mdDialog.show(confirm);
    }
    return fac;
}


function AlertFactory($mdDialog) {

    var fac = {};
    fac.show = show;

    function show($event, msg) {
        // Appending dialog to document.body to cover sidenav in docs app
        var confirm = $mdDialog.confirm()
            //.title('Confirm')
            .textContent(msg)
            .ariaLabel('Lucky day')
            .targetEvent($event)
            .ok('Ok');
        return $mdDialog.show(confirm);
    }
    return fac;
}

// Returns method to create and return resource.
function ResourseFactory($resource) {
    var fac = {};
    fac.makeResource = makeResource;

    function makeResource(url) {
        return $resource(url, {
            id: '@id'
        }, {
            update: {
                method: 'PUT',
                transformResponse: function(data, headerFn) {
                    // Return modified data for the response
                    return JSON.parse(data);
                }
            },
            query: {
                method: 'GET',
                isArray: false,
            }
        });
    }
    return fac;
}


function BaseModelFactory($q, NotifyFactory, $mdToast, AlertFactory) {
    var fac = {};
    fac.getDataList = getDataList;
    fac.getDataItem = getDataItem;
    fac.save = save;
    fac.remove = remove;


    //Get all data from modal.
    function getDataList(rsource, param) {
        var deferred = $q.defer();
        rsource.query(param, function(resp) {
                deferred.resolve(resp);
            },
            function(err) {
                deferred.reject('err');
            });
        return deferred.promise;
    }

    // Retrive single dataItem.
    function getDataItem(resource, id) {

        var deferred = $q.defer();
        resource.get({
            id: id
        }, function(response) {
            if (response.success) {
                deferred.resolve(response.data);
            }
        }, function(err) {
            console.log('error occoured !!');
        });
        return deferred.promise;
    }


    /**
     * If id is available update the modal
     * else create new modal.
     */
    function save(resource, data) {
        var deferred = $q.defer();

        if (data.id) {
            resource.update({
                id: data.id,
                data: data
            }, function(response) {
                if (response.success) {
                    NotifyFactory.show('Data successfully updated.');
                    deferred.resolve(response.data);
                } else {
                    AlertFactory.show(null,response.msg);
                }
            }, function(error) {
                if (422 == error.status) {
                    console.log('validation error occoured!!');
                }
            });

        } else {
            resource.save({}, {
                data
            }, function(response) {
                if (response.success) {
                    NotifyFactory.show('Data successfully added.');
                    deferred.resolve(response.data);
                } else {
                    AlertFactory.show(null,response.msg);
                }

            }, function(error) {
                if (error.status = 422) {
                    console.log('validation errors.');
                }
            });
        }

        return deferred.promise;
    }

    // Remove the item from dataList.
    function remove(resource, id) {
        var deferred = $q.defer();
        resource.remove({}, {
            id: id
        }, function(response) {
            if (response.success == true) {
                deferred.resolve(response);
                NotifyFactory.show('Data successfully removed.')

            }
        }, function(response) {
            console.log('error in delete' + error);
        });
        return deferred.promise;
    }
    return fac;
}