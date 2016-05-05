<?php

Route::get('/', ['as' => 'home', 'uses' => 'HomeController@index']);


Route::get('test_data',function(){


	// $tree = $post->getDescendantsAndSelf()->toHierarchy();

	// $response = array('data' => $tree->values());

	// return Response::json($response);

	$tree = \App\Models\Task::get()->toHierarchy();	

	$response = array('data' => $tree->values());

	return $response;

});

Route::get('test',function(){	
	return view('test');	
});


Route::resource('project', 'ProjectsController');
Route::get('recent_project', 'ProjectsController@recentProject');


Route::resource('task', 'TasksController');
Route::post('reorder_task', 'TasksController@reorderTasks');
Route::get('get_sotries','TasksController@getStories');
Route::get('task_list','TasksController@taskList');
Route::get('get_sub_tasks','TasksController@getSubTasks');


Route::resource('user', 'UsersController');
Route::get('users_for_board/{board_id}', 'UsersController@getUsersForBoard');

Route::resource('board', 'BoardsController');
Route::get('active_board', 'BoardsController@getActivateSprint');
Route::get('testing_sprint', 'BoardsController@getTestingSprint');
Route::get('board_list', 'BoardsController@getBoardList');

Route::resource('list', 'ListsController');
Route::post('reorder_list','ListsController@reorderList');

Route::resource('setting','SettingsController');
Route::resource('label','LabelsController');
Route::resource('comment','CommentsController');

Route::controller('auth/password', 'Auth\PasswordController', [
    'getEmail' => 'auth.password.email',
    'getReset' => 'auth.password.reset',
]);

Route::controller('auth', 'Auth\AuthController', [
    'getLogin' => 'auth.login',
]);
