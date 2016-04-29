<?php

Route::get('/', ['as' => 'home', 'uses' => 'HomeController@index']);



Route::resource('project', 'ProjectsController');
Route::get('recent_project', 'ProjectsController@recentProject');


Route::resource('task', 'TasksController');
Route::post('reorder_task', 'TasksController@reorderTasks');
Route::get('get_sotries','TasksController@getStories');
Route::get('task_list','TasksController@taskList');
Route::get('get_sub_tasks','TasksController@getSubTasks');


Route::resource('user', 'UsersController');
Route::get('project_user/{project_id}', 'UsersController@getProjectUser');

Route::resource('board', 'BoardsController');
Route::get('active_board', 'BoardsController@getActivateSprint');
Route::get('testing_sprint', 'BoardsController@getTestingSprint');
Route::get('board_list', 'BoardsController@getBoardList');



Route::resource('lsit', 'ListsController');
Route::post('reorder_list','ListsController@reorderList');

Route::controller('auth/password', 'Auth\PasswordController', [
    'getEmail' => 'auth.password.email',
    'getReset' => 'auth.password.reset',
]);

Route::controller('auth', 'Auth\AuthController', [
    'getLogin' => 'auth.login',
]);
