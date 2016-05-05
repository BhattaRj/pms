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
  <div>
    <div class="jumbotron">
      <h1>Tree component</h1>

      <p class="lead">The AngularJS Tree component with drag and drop support.</p>

      <p><a class="btn btn-lg btn-success" href="https://github.com/angular-ui-tree/angular-ui-tree" role="button">Code on
        GitHub</a></p>
    </div>

    <div class="row">
      <div class="col-md-4">
        <h2>View Examples</h2>
        <ol>
          <li><a href="#/basic-example">Basic example</a></li>
          <li><a href="#/filter-nodes">Filter nodes</a></li>
          <li><a href="#/nodrop">Prevent drop</a></li>
          <li><a href="#/connected-trees">Connected trees</a></li>
          <li><a href="#/cloning">Cloning</a></li>
          <li><a href="#/table-example">Table example</a></li>
          <li><a href="#/drop-confirmation">Drop confirmation</a></li>
        </ol>
      </div>

      <div class="col-md-4">
        <h2>What?</h2>
        <p>
          Angular Tree is an AngularJS UI component that can sort nested lists, provides drag &amp; drop support and
          doesn't depend on jQuery.
        </p>
      </div>
      <div class="col-md-4">
        <h2>Features</h2>
        <ul>
          <li>Uses the native AngularJS scope for data binding</li>
          <li>Sorted and move items through the entire tree</li>
          <li>Prevent elements from accepting child nodes</li>
        </ul>
      </div>
    </div>
  </div>

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