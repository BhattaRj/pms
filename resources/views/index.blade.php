<!DOCTYPE html>
<html lang="en">
    <head>
        <title>SoftyCraft</title>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="description" content="">
        <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no" />
        {{-- <link rel='stylesheet' href='http://fonts.googleapis.com/css?family=Roboto:400,700'/> --}}
        <link rel="stylesheet" href="./bower_components/angular-material/angular-material.css"/>
        <link rel="stylesheet" href="./assets/app.css"/>
        <link rel="stylesheet" href="./assets/main_styles.css" />
        <link rel="stylesheet" href="./bower_components/font-awesome/css/font-awesome.min.css" type="text/css">
        <link rel="stylesheet" href="./bower_components/bootstrap/dist/css/bootstrap.min.css" />
        <link rel="stylesheet" href="./assets/material.min.css">
<?php

if (!Auth::guest()) {
    $login = 'true';
    $user  = Auth::user()->toArray();
} else {
    $login = 'false';
    $user  = null;
}

?>

<script type="text/javascript">

    var base_url    =   '<?php echo url(); ?>',
        user        =   <?php echo json_encode($user) ?>,
        login       =   <?php echo $login ?>;

</script>


    </head>


    <body ng-app="app" layout="column" ng-controller="BaseController as ctrl" ng-cloak>

        <header></header>

        <div id="main" flex layout="row" ui-view></div>

        <script src="/bower_components/jquery/dist/jquery.min.js"></script>
        <script src="./bower_components/angular/angular.js"></script>
        <script src="./bower_components/angular-animate/angular-animate.js"></script>
        <script src="./bower_components/angular-aria/angular-aria.js"></script>
        <script src="./bower_components/angular-material/angular-material.js"></script>
        <script src="./bower_components/angular-ui-router/release/angular-ui-router.min.js"></script>
        <script src="./bower_components/angular-resource/angular-resource.js"></script>
        <script src="./bower_components/bootstrap/dist/js/bootstrap.min.js"></script>
        <script src="./bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js"></script>
        <script src="./bower_components/angular-messages/angular-messages.min.js"></script>
        <script src="./bower_components/angular-sanitize/angular-sanitize.js"></script>
        <script src="./bower_components/ng-file-upload/ng-file-upload.js"></script>
        <script src="./app/js/textAngular.min.js"></script>


        <script type="text/javascript" src="./app/src/app.js"></script>
        <script type="text/javascript" src="./app/src/app-router.js"></script>

        <script type="text/javascript" src="./app/common/directive/header/header.js"></script>

        <script type="text/javascript" src="./app/common/directive/formButton/formButton.js"></script>

        <script type="text/javascript" src="./app/common/directive/rjDirective.js"></script>
        <script type="text/javascript" src="./app/common/services/rjServices.js"></script>
         <script type="text/javascript" src="./app/common/directive/task/task.js"></script>

        <script type="text/javascript" src="./app/common/resources/project.js"></script>
        <script type="text/javascript" src="./app/common/resources/task.js"></script>
        <script type="text/javascript" src="./app/common/resources/user.js"></script>
        <script type="text/javascript" src="./app/common/resources/sprint.js"></script>
        <script type="text/javascript" src="./app/common/resources/board.js"></script>        

        <script type="text/javascript" src="./app/src/project/project.js"></script>
        <script type="text/javascript" src="./app/src/user/user.js"></script>
        <script type="text/javascript" src="./app/src/dashboard/dashboard.js"></script>
        <script type="text/javascript" src="./app/src/project/overview/overview.js"></script>
        <script type="text/javascript" src="./app/src/allproject/allproject.js"></script>
        <script type="text/javascript" src="./app/src/project/backlog/backlog.js"></script>
        <script type="text/javascript" src="./app/src/project/board/board.js"></script>
        <script type="text/javascript" src="./app/src/project/member/member.js"></script>
        <script type="text/javascript" src="./app/src/project/file/file.js"></script>
        <script type="text/javascript" src="./app/src/project/issue/issue.js"></script>

    </body>
</html>
