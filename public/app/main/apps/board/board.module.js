(function() {
    'use strict';

    angular.module('app.board', []).config(config).run(run);

    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider) {
        $stateProvider
            .state('app.board', {
                abstract: true,
                url: '/board/:id',
                resolve: {
                    BoardList: function($stateParams, BoardFactory) {
                        return BoardFactory.getBoardList({ project_id: $stateParams.id });
                    }
                },
                bodyClass: 'scrumboard'
            })

        // Home
        .state('app.board.list', {
            url: '/list',
            views: {
                'content@app': {
                    templateUrl: 'app/main/apps/board/views/boards/boards-list.html',
                    controller: 'BoardListController as vm'
                }
            }
        })

        // WBS Board.        
        .state('app.board.wbs', {
            url: '/wbs',
            views: {
                'content@app': {
                    templateUrl: 'app/main/apps/board/wbs-board/wbs-board.html',
                    controller: 'WbsBoardController as vm'
                }
            },
            resolve: {
                TaskData: function($stateParams, TaskFactory) {
                    return TaskFactory.getStories({ project_id: $stateParams.id });
                }
            }
        })

        // Board
        .state('app.board.show', {
            url: '/show/:board_id',
            views: {
                'content@app': {
                    templateUrl: 'app/main/apps/board/board.html',
                    controller: 'BoardController as vm'
                },
                'scrumboardContent@app.board.show': {
                    templateUrl: 'app/main/apps/board/views/board/board-view.html',
                    controller: 'BoardViewController as vm'
                }
            },
            resolve: {
                BoardData: function($stateParams, BoardFactory) {
                    return BoardFactory.getDataItem($stateParams.board_id);
                }
            }
        })

        // Add board
        .state('app.board.addBoard', {
            url: '/add',
            views: {
                'content@app': {
                    templateUrl: 'app/main/apps/board/board.html',
                    controller: 'BoardController as vm'
                },
                'scrumboardContent@app.board.addBoard': {
                    templateUrl: 'app/main/apps/board/views/board/board-view.html',
                    controller: 'BoardViewController as vm'
                }
            },
            resolve: {
                BoardData: function($stateParams, BoardFactory) {
                    debugger;
                    var data = { project_id: $stateParams.id, title: 'Untitled Board' };
                    return BoardFactory.save(data);
                }
            }
        });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/apps/board');

        // Api
        // msApiProvider.register('scrumboard.boardList', ['app/data/scrumboard/board-list.json']);
        // msApiProvider.register('scrumboard.board', ['app/data/scrumboard/boards/:id.json']);

    }

    /** @ngInject */
    function run(editableThemes) {
        /**
         * Inline Edit Configuration
         * @type {string}
         */
        editableThemes.default.submitTpl = '<md-button class="md-icon-button" type="submit" aria-label="save"><md-icon md-font-icon="icon-checkbox-marked-circle" class="md-accent-fg md-hue-1"></md-icon></md-button>';
        editableThemes.default.cancelTpl = '<md-button class="md-icon-button" ng-click="$form.$cancel()" aria-label="cancel"><md-icon md-font-icon="icon-close-circle" class="icon-cancel"></md-icon></md-button>';
    }

})();
