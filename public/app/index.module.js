(function() {
    'use strict';

    /**
     * Main module of the Fuse
     */
    angular.module('fuse', [

        // Core
        'app.core',

        // Navigation
        'app.navigation',

        // Toolbar
        'app.toolbar',

        // Quick panel
        'app.quick-panel',

        // Apps
        'app.dashboards',

        // User
        'app.users',

        // Project
        'app.project',

        // Board
        'app.board'
    ]);
    
})();
