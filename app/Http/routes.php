<?php

/*
|--------------------------------------------------------------------------
| Routes File
|--------------------------------------------------------------------------
|
| Here is where you will register all of the routes in an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
 */

// Route::get('/', function () {
//     return view('welcome');
// });

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| This route group applies the "web" middleware group to every route
| it contains. The "web" middleware group is defined in your HTTP
| kernel and includes session state, CSRF protection, and more.
|
 */

// Route::group(['middleware' => ['web']], function () {
//     //
// });

Route::get('/', ['as' => 'home', 'uses' => 'HomeController@index']);

Route::resource('project', 'ProjectsController');
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
