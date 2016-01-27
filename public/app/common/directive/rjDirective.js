/**
 * Common directive used throughout the application.
 */

angular.module('rjDirective', []);
angular.module('rjDirective').directive('modalCancelButtton', modalCancelButtton);
angular.module('rjDirective').directive('canSaveForm', canSaveForm);
angular.module('rjDirective').directive('paddedTitle', paddedTitle);
angular.module('rjDirective').directive('myEnter', myEnter);
angular.module('rjDirective').directive('rjDrag', rjDrag);
angular.module('rjDirective').directive('makeDate', makeDate);
angular.module('rjDirective').directive('dayDifference', dayDifference);
angular.module('rjDirective').directive('daysRemaining', daysRemaining);

function dayDifference() {
    return {
        restrict: 'A',
        template: "<span> Total [[ diff ]] days.</span>", 
        replace: true,
        scope: {
            startDate: '=',
            endDate: '='
        },        
        link: function(scope, iElement, iAttrs) {              
            var date1 = new Date(scope.startDate);
            var date2 = new Date(scope.endDate);
            var timeDiff = Math.abs(date2.getTime() - date1.getTime());
            scope.diff = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
        }
    };
}


function daysRemaining() {
    return {
        restrict: 'A',
        template: "<span> [[ diff ]] Days remaining.</span>", 
        replace: true,
        scope: {
            endDate: '='
        },        
        link: function(scope, iElement, iAttrs) {              
            var date1 = new Date();
            var date2 = new Date(scope.endDate);
            var timeDiff = Math.abs(date2.getTime() - date1.getTime());
            scope.diff = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
        }
    };
}

/**
 * HTML drag and drop.
 * Example:
 * <tr ng-repeat="data in dataList" draggable="true" rj-drag>
 * When event fired do necessery thing in controller linke re order the section list.
 * 
 *  $rootScope.$on('RJ-DRAG-START', function(obj, scope) {
 *       $scope.sourceIndex = scope.$index;
 *       $scope.sourceData = scope.data;
 *  });
 *
 *  $rootScope.$on('RJ-DROP-START', function(obj, scope) {
 *       $scope.dataList.splice($scope.sourceIndex, 1);
 *       $scope.dataList.splice(scope.$index, 0, $scope.sourceData);
 *       $scope.$apply();
 *       updatePageSection();
 *   });
 * 
 */
function rjDrag($mdDialog, $rootScope) {
    return {
        restrict: 'A',
        link: function(scope, iElement, iAttrs) {
            iElement.bind("dragstart", function(e) {
                scope.$emit("RJ-DRAG-START",scope,scope);
            });

            iElement.bind("dragover", function(e) {
                if (e.preventDefault) {
                    e.preventDefault(); // Necessary. Allows us to drop.
                }
                e.preventDefault();
                if (e.stopPropogation) {
                    e.stopPropogation(); // Necessary. Allows us to drop.
                }                
            });

            iElement.bind("drop", function(e) {
                if (e.preventDefault) {
                    e.preventDefault(); // Necessary. Allows us to drop.
                }

                if (e.stopPropogation) {
                    e.stopPropogation(); // Necessary. Allows us to drop.
                }

                scope.$emit("RJ-DROP-START",scope);
            });

        }
    };
}


/**
 * 
 * 
 */


function makeDate() {
    return {
        restrict: 'A',
        require:'ngModel',
        link: function(scope, iElement, iAttrs,ngModel) {
            
            ngModel.$parsers.push(function(value) {                
                var date = new Date(value);
                return date.toYMD();
            });

           ngModel.$formatters.push(function(value) {                
                if(value){
                    return new Date(value);    
                }
            });
        }
    };
}

/**
 * 
 * Use this to close the Material's modal box by clicking cancel button.
 * Example :
 * 
 * <md-button class="md-raised md-warn" ng-click="cancel()" modal-cancel-buttton style="margin-right:20px;">Cancel</md-button>
 * 
 */

function modalCancelButtton($mdDialog) {
    return {
        restrict: 'A',
        link: function(scope, iElement, iAttrs) {
            scope.cancel = function() {
                $mdDialog.cancel();
            }
        }
    };
}


/**
 *  Allow to call function in enter key press in inputbox.
 *  Example:
 *  
 *  <input my-enter="updateItem($event,'name',company)" type="text" class="form-control" placeholder="Name" ng-model="company.name" ng-show="updating.name"
 */
function myEnter(){
    
    return function(scope, element, attrs) {
        element.bind("keydown keypress", function(event) {
            if (event.which === 13) {
                scope.$apply(function() {
                    scope.$eval(attrs.myEnter);
                });

                event.preventDefault();
            }
        });
    };
}



/**
 * 
 * Use this to disable save button in form.
 * 
 * Returns true if form is valid and dirty.
 * 
 * Example:
 * 
 * <md-button class="md-raised md-primary" ng-click="save(dataModel)" can-save-form ng-disabled="!canSave(courseForm)" >Save</md-button>
 */

function canSaveForm() {

    return {
        restrict: 'A',
        link: function(scope, iElement, iAttrs) {
            scope.canSave = function(form) {   
                if (form) {
                    return form.$dirty && form.$valid && scope.dataSaved;
                }
            };
        }
    };
}


/**
 *  Add Spaces in according to the width.
 *  
 *  Example
 *  <span ng-bind-html="[[ makePadding(dataModel.page_title,dataModel.depth) ]]" padded-title></span>
 */
function paddedTitle(){
    return{
        restrict:'A',
        link:function(scope,iElement,iAttrs){            
            scope.makePadding=function(title,depth){
                return "&nbsp;".repeat(depth*10)+title;
            }

        }
    }
}

/**
 * 
 * Example of directive.
 * 
 * eg.
 * 
 * <body ng-controller="MainCtrl">
 *      <input type="text" ng-model="color" placeholder="Enter a color" />
 *      <hello-world/>
 * </body>
 * 
 */
angular.module('rjDirective').directive('helloWorld', function() {
    return {
        restrict: 'AE',
        replace: true,
        template: '<p style="background-color:{{color}}">Hello World',
        link: function(scope, elem, attrs) {
            elem.bind('click', function() {
                elem.css('background-color', 'white');
                scope.$apply(function() {
                    scope.color = "white";
                });
            });
            elem.bind('mouseover', function() {
                elem.css('cursor', 'pointer');
            });
        }
    };
});