// All route for application.

angular.module('app').config(function($interpolateProvider, $stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/dashboard');
    $stateProvider
        .state('people', {
            url: '/people',
            templateUrl: '/app/src/user/user-list.tpl.html',
            controller: 'UserListController',
        })
        .state('dashboard', {
            url: '/dashboard',
            templateUrl: '/app/src/dashboard/dashboard.tpl.html',
            controller: 'DashboardController',
        })
        .state('allproject', {
            url: '/allproject',
            templateUrl: 'app/src/allproject/project-list.tpl.html',
            controller: 'ProjectListControlller',
            controllerAs: 'allproject',
        })
        .state('project', {
            url: '/project/:id',
            templateUrl: '/app/src/project/project.tpl.html',
            controller: 'ProjectController',
            controllerAs: 'project'
        })
        .state('project.issue', {
            url: '/issue',
            templateUrl: '/app/src/project/issue/issue-list.tpl.html',
            controller: 'IssueListController',
            controllerAs: 'issue'
        })
        .state('project.overview', {
            url: '/overview',
            templateUrl: '/app/src/project/overview/overview.tpl.html',
            controller: 'OverviewController',
            controllerAs: 'overview'
        })
        .state('project.member', {
            url: '/member',
            templateUrl: '/app/src/project/member/member.tpl.html',
            controller: 'MemberController',
            controllerAs: 'member'
        })
        .state('project.file', {
            url: '/file',
            templateUrl: '/app/src/project/file/file.tpl.html',
            controller: 'FileController',
            controllerAs: 'file'
        })
        .state('project.activesprint', {
            url: '/board',
            templateUrl: '/app/src/project/board/board.tpl.html',
            controller: 'BoardController',
        })
        .state('project.backlog', {
            url: '/backlog',
            templateUrl: '/app/src/project/backlog/backlog.tpl.html',
            controller: 'BacklogController'
        })
        .state('project.testing', {
            url: '/testing',
            templateUrl: '/app/src/project/testing/testing.tpl.html',
            controller: 'TestingController',
            controllerAs: 'testing'
        });
});
