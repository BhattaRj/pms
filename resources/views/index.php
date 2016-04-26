<!doctype html>
<html ng-app="fuse">
    <head>
        <base href="/">
        <meta charset="utf-8">
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
        <title>Fuse - Admin Theme index.php</title>

        <!-- Place favicon.ico and apple-touch-icon.png in the root directory -->

        <link rel="stylesheet" href="styles/vendor.css">

        <link rel="stylesheet" href="styles/app.css">

        <link href='//fonts.googleapis.com/css?family=Roboto:400,100,100italic,300,300italic,400italic,500,500italic,700italic,700,900,900italic'
              rel='stylesheet' type='text/css'>

    </head>

    <!--[if lt IE 10]>
    <p class="browsehappy">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade
        your browser</a> to improve your experience.</p>
    <![endif]-->

    <body md-theme="{{vm.themes.active.name}}" md-theme-watch ng-controller="IndexController as vm"
          class="{{state.current.bodyClass || ''}}">

        <!-- SPLASH SCREEN -->
        <ms-splash-screen id="splash-screen">
            <div class="center">
                <div class="logo">
                    <span>F</span>
                </div>
                <!-- Material Design Spinner -->
                <div class="spinner-wrapper">
                    <div class="spinner">
                        <div class="inner">
                            <div class="gap"></div>
                            <div class="left">
                                <div class="half-circle"></div>
                            </div>
                            <div class="right">
                                <div class="half-circle"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- / Material Design Spinner -->
            </div>
        </ms-splash-screen>
        <!-- / SPLASH SCREEN -->

        <div id="main" class="animate-slide-up" ui-view="main" layout="column"></div>
        <!-- <ms-theme-options></ms-theme-options> -->

        <script src="scripts/vendor.js"></script>
        <script src="bower_components/ng-file-upload/ng-file-upload.js"></script>

        <!-- inject:js -->
        <script src="app/main/apps/scrumboard/scrumboard.module.js"></script>
        <script src="app/main/apps/scrumboard/views/calendar/dialogs/event/event-dialog.controller.js"></script>
        <script src="app/main/apps/scrumboard/sidenavs/settings/menus/members/members-menu.controller.js"></script>
        <script src="app/main/apps/scrumboard/sidenavs/settings/menus/labels/labels-menu.controller.js"></script>
        <script src="app/main/apps/scrumboard/sidenavs/settings/menus/color/color-menu.controller.js"></script>


        <script src="app/main/apps/todo/todo.module.js"></script>
        <script src="app/main/apps/todo/dialogs/task/task-dialog.controller.js"></script>

        <script src="app/main/apps/scrumboard/views/calendar/calendar-view.controller.js"></script>
        <script src="app/main/apps/scrumboard/views/boards/boards-view.controller.js"></script>
        <script src="app/main/apps/scrumboard/views/board/board-view.controller.js"></script>
        <script src="app/main/apps/scrumboard/sidenavs/settings/settings-sidenav.controller.js"></script>
        <script src="app/main/apps/scrumboard/sidenavs/filters/filters-sidenav.controller.js"></script>
        <script src="app/main/apps/scrumboard/directives/ms-sb-add-card/ms-sb-add-card.directive.js"></script>
        <script src="app/main/apps/scrumboard/dialogs/card/card-dialog.controller.js"></script>
        <script src="app/main/apps/mail/mail.module.js"></script>
        <script src="app/main/apps/mail/dialogs/compose/compose-dialog.controller.js"></script>
        <script src="app/main/apps/gantt-chart/gantt-chart.module.js"></script>
        <script src="app/main/apps/gantt-chart/dialogs/add-edit/add-edit-dialog.controller.js"></script>
        <script src="app/main/apps/calendar/calendar.module.js"></script>
        <script src="app/main/apps/calendar/dialogs/event-form/event-form-dialog.controller.js"></script>
        <script src="app/main/apps/calendar/dialogs/event-detail/event-detail-dialog.controller.js"></script>

        <script src="app/main/apps/scrumboard/services/filters.service.js"></script>
        <script src="app/main/apps/scrumboard/services/dialog.service.js"></script>
        <script src="app/main/apps/scrumboard/services/board.service.js"></script>
        <script src="app/main/apps/dashboards/server/dashboard-server.module.js"></script>
        <script src="app/main/apps/dashboards/server/dashboard-server.controller.js"></script>
        <script src="app/main/apps/dashboards/project/dashboard-project.module.js"></script>
        <script src="app/main/apps/dashboards/project/dashboard-project.controller.js"></script>
        <script src="app/main/apps/dashboards/analytics/dashboard-analytics.module.js"></script>
        <script src="app/main/apps/dashboards/analytics/dashboard-analytics.controller.js"></script>
        <script src="app/quick-panel/quick-panel.module.js"></script>
        <script src="app/quick-panel/tabs/chat/chat-tab.controller.js"></script>

        <script src="app/main/apps/todo/todo.controller.js"></script>
        <script src="app/main/apps/scrumboard/scrumboard.controller.js"></script>
        <script src="app/main/apps/mail/mail.controller.js"></script>
        <script src="app/main/apps/gantt-chart/gantt-chart.controller.js"></script>
        <script src="app/main/apps/file-manager/file-manager.module.js"></script>
        <script src="app/main/apps/file-manager/file-manager.controller.js"></script>
        <script src="app/main/apps/calendar/calendar.controller.js"></script>



        <script src="app/main/apps/users/users.module.js"></script>
        <script src="app/main/apps/users/users.controller.js"></script>

        <script src="app/main/apps/project/project.module.js"></script>
        <script src="app/main/apps/project/project.controller.js"></script>

        <script src="app/main/apps/board/board.module.js"></script>
        <script src="app/main/apps/board/views/boards/board-list.controller.js"></script>


        <script src="app/core/core.module.js"></script>

        <script src="app/core/directives/ms-widget/ms-widget.directive.js"></script>
        <script src="app/core/directives/ms-timeline/ms-timeline.js"></script>
        <script src="app/core/directives/ms-stepper/ms-stepper.directive.js"></script>
        <script src="app/core/directives/ms-splash-screen/ms-splash-screen.directive.js"></script>
        <script src="app/core/directives/ms-sidenav-helper/ms-sidenav-helper.directive.js"></script>
        <script src="app/core/directives/ms-search-bar/ms-search-bar.directive.js"></script>
        <script src="app/core/directives/ms-scroll/ms-scroll.directive.js"></script>
        <script src="app/core/directives/ms-responsive-table/ms-responsive-table.directive.js"></script>
        <script src="app/core/directives/ms-random-class/ms-random-class.directive.js"></script>
        <script src="app/core/directives/ms-navigation/ms-navigation.directive.js"></script>
        <script src="app/core/directives/ms-nav/ms-nav.directive.js"></script>
        <script src="app/core/directives/ms-material-color-picker/ms-material-color-picker.directive.js"></script>
        <script src="app/core/directives/ms-form-wizard/ms-form-wizard.directive.js"></script>
        <script src="app/core/directives/ms-datepicker-fix/ms-datepicker-fix.directive.js"></script>
        <script src="app/core/directives/ms-card/ms-card.directive.js"></script>
        <script src="app/core/directives/ms-form-button/ms-form-button.directive.js"></script>
        <script src="app/core/directives/ms-common/ms-common.directive.js"></script>
        
        <script src="app/core/theming/fuse-theming.provider.js"></script>
        <script src="app/core/theming/fuse-theming.config.js"></script>
        <script src="app/core/theming/fuse-themes.constant.js"></script>
        <script src="app/core/theming/fuse-palettes.constant.js"></script>
        <script src="app/core/theming/fuse-generator.factory.js"></script>
        <script src="app/core/theme-options/theme-options.directive.js"></script>

        <script src="app/core/services/ms-utils.service.js"></script>
        <script src="app/core/services/ms-api.provider.js"></script>
        <script src="app/core/services/api-resolver.service.js"></script>

        <script src="app/core/services/rj-common.service.js"></script>

        <!-- resource -->
        <script src="app/resource/board.js"></script>
        <script src="app/resource/project.js"></script>
        <script src="app/resource/sprint.js"></script>
        <script src="app/resource/task.js"></script>
        <script src="app/resource/user.js"></script>


        <script src="app/core/filters/tag.filter.js"></script>
        <script src="app/core/filters/basic.filter.js"></script>
        <script src="app/core/directives/highlight.directive.js"></script>
        <script src="app/core/config/fuse-config.provider.js"></script>

        <script src="app/toolbar/toolbar.module.js"></script>
        <script src="app/toolbar/toolbar.controller.js"></script>

        <script src="app/quick-panel/quick-panel.controller.js"></script>
        <script src="app/navigation/navigation.module.js"></script>
        <script src="app/navigation/navigation.controller.js"></script>
        <script src="app/index.module.js"></script>
        <script src="app/main/main.controller.js"></script>
        <script src="app/core/core.run.js"></script>
        <script src="app/core/core.config.js"></script>
        <script src="app/index.run.js"></script>
        <script src="app/index.route.js"></script>
        <script src="app/index.controller.js"></script>
        <script src="app/index.constants.js"></script>
        <script src="app/index.config.js"></script>
        <script src="app/index.api.js"></script>

        <script src="app/main/pages/auth/login-v2/login-v2.module.js"></script>

        <script src="app/main/apps/dashboards/dashboards.module.js"></script>
        <!-- endinject -->

    </body>
</html>