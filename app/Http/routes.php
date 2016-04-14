<?php

Route::get('/', ['as' => 'home', 'uses' => 'HomeController@index']);

Route::resource('project', 'ProjectsController');
Route::get('recent_project', 'ProjectsController@recentProject');
Route::resource('issue', 'IssuesController');
Route::get('issue_list', 'IssuesController@issueList');

Route::resource('task', 'TasksController');
Route::post('reorder_task', 'TasksController@reorderTasks');

Route::resource('user', 'UsersController');
Route::get('project_user/{project_id}', 'UsersController@getProjectUser');

Route::resource('sprint', 'SprintsController');
Route::get('active_sprint', 'SprintsController@getActivateSprint');

Route::resource('board', 'BoardsController');

Route::controller('auth/password', 'Auth\PasswordController', [
    'getEmail' => 'auth.password.email',
    'getReset' => 'auth.password.reset',
]);

Route::controller('auth', 'Auth\AuthController', [
    'getLogin' => 'auth.login',
]);
