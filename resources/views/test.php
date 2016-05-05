<!DOCTYPE html>
<html>
<head>
	<title>
		
	</title>

  <link rel="stylesheet" href="bower_components/bootstrap/dist/css/bootstrap.min.css">
  <link rel="stylesheet" href="styles/style.css">


</head>


<body ng-app="demoApp">

<div class="container">

  <div class="row">
    <div class="col-sm-12">
      <h2>See it in action</h2>
      <ng-view></ng-view>
    </div>
  </div>

</div>



<script src="bower_components/angular/angular.min.js"></script>
<script src="bower_components/angular-route/angular-route.min.js"></script>

<script src="bower_components/angular-bootstrap/ui-bootstrap-tpls.js"></script>

<script src="bower_components/angular-ui-tree/dist/angular-ui-tree.js"></script>



</body>
</html>

<script type="text/javascript">



(function () {
  'use strict';

  angular.module('demoApp', ['ui.tree', 'ngRoute', 'ui.bootstrap'])

    .config(['$routeProvider', '$compileProvider', function ($routeProvider, $compileProvider) {
    	

      $routeProvider
        .when('/basic-example', {
          controller: 'BasicExampleCtrl',
          templateUrl: 'test1/basic-example.html'
        })
        .otherwise({
          redirectTo: '/basic-example'
        });
      
    }]);




})();

</script>


<script src="test1/basic.js"></script>