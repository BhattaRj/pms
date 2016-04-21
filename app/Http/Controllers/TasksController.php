<?php
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Board;
use App\Models\Task;
use App\Models\Sprint;
use App\Models\Project;
use App\User;
use Illuminate\Http\Request;

class TasksController extends Controller
{
    protected $task;
    protected $board;
    protected $user;
    protected $sprint;
    protected $project;
    protected $per_page = 100;
    protected $current_page = 1;

    public function __construct(Task $task, Board $board, User $user , Sprint $sprint, Project $project)
    {
        $this->task  = $task;
        $this->board = $board;
        $this->user  = $user;
        $this->sprint = $sprint;
        $this->project = $project;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = $this->task->orderBy('order');

        if ($request->has('currentPage')) {
            $this->current_page = $request->input('currentPage');
        }

        if ($request->has('project_id')) {
            $query = $query->where('project_id', $request->input('project_id'));
        }

        if ($request->has('sprint_id')) {
            $query = $query->whereNull('sprint_id');
        }

        $skip            = ($this->current_page - 1) * $this->per_page;
        $result['total'] = $query->get()->count();
        $result['data']  = $query->skip($skip)->take($this->per_page)->get();
        return $result;
    }


    public function store(Request $request)
    {
        $input = $request->input('data');

        

        if(!isset($input['sprint_id'])){            

            $project            = $this->project->findOrFail($input['project_id']);

            if($input['task_type']=='Bug'){

                $input['sprint_id'] = $project->getTestingBoardId();     

            }else{

                $input['sprint_id'] = $project->getBacklogId();                                 
            }        
        }
        
        if($input['task_type']=='Bug'){

            $input['board_id']  = $this->board->getDefaultTestingBoardId(); 
        }else{

            $input['board_id']  = $this->board->getDefaultBoardId();
        }

        $input['author_id'] = $this->user->currentUserId();
        $result['data']     = $this->task->create($input);
        $this->updateRowOrder($result['data'], $request);
        $result['success'] = true;

        return $result;
    }


    public function update(Request $request, $id)
    {
        $task = $this->task->findOrFail($id);
        $this->updateRowOrder($task, $request);

        $result['data']    = $task->update($request->input('data'));
        $result['success'] = true;
        return $result;
    }

    public function show($id)
    {
        $result['data']    = $this->task->findOrFail($id);
        $result['success'] = true;
        return $result;
    }

    public function destroy($id)
    {
        $this->task->destroy($id) ? $result['success'] = true : $result['success'] = false;
        return $result;
    }


    /**
     * Reorder the task in sprint.
     * if default_board change the board id into the default board.
     * @param  Request $request
     * @return [array]
     */
    public function reorderTasks(Request $request)
    {
        foreach ($request->all() as $data) {
            if (isset($data['default_board']) && $data['default_board'] == true) {
                $data['board_id'] = $this->board->getDefaultTaskBoardId();
            }
            $this->task->findOrFail($data['id'])->update($data);
        }

        $result['success'] = true;
        return $result;
    }


    /** Return tasks heirarchically for stroy board. */

    public function getStories(Request $request)
    {        

        $query = $this->task->with(['board','assigne'])->orderBy('lft', 'asc');

        if ($request->has('project_id')) {            
            $query = $query->where('project_id', $request->input('project_id'));
        }

        if ($request->has('task_type')) {            
            $query = $query->where('task_type', $request->input('task_type'));
        }


        if ($request->has('priority')) {            
            $query = $query->where('priority', $request->input('priority'));
        }
                        
        
        if ($request->has('currentPage')) {
            $this->current_page = $request->input('currentPage');
        }

        $skip            = ($this->current_page - 1) * $this->per_page;
        $result['total'] = $query->get()->count();
        $result['data']  = $query->skip($skip)->take($this->per_page)->get();

        return $result;
    }


    public function taskList()
    {
        $result['data'] = $this->task->taskList();
        return $result;
    }    


    public function getSubTasks(Request $request){

        $query = $this->task->with(['board','assigne'])->orderBy('lft', 'asc');

        if ($request->has('project_id')) {            
            $query = $query->where('project_id', $request->input('project_id'));
        }

        if ($request->has('parent_id')) {            
            $query = $query->where('parent_id', $request->input('parent_id'));
        }
        
        if ($request->has('task_type')) {            
            $query = $query->where('task_type', $request->input('task_type'));
        }


        if ($request->has('priority')) {            
            $query = $query->where('priority', $request->input('priority'));
        }
                        
        
        if ($request->has('currentPage')) {
            $this->current_page = $request->input('currentPage');
        }

        $skip            = ($this->current_page - 1) * $this->per_page;
        $result['total'] = $query->get()->count();
        $result['data']  = $query->skip($skip)->take($this->per_page)->get();

        return $result;

    }

    protected function updateRowOrder(task $task, Request $request)
    {

        if (array_key_exists('order', $request->input('data')) && array_key_exists('ordertask', $request->input('data'))) {

            try
            {

                $task->updateOrder($request->input('data')['order'], $request->input('data')['ordertask']);
            } catch (MoveNotPossibleException $e) {
                $result['success'] = false;
                $result['msg']     = "Cannot make a page a child of self.";
                return $result;
            }
        }
    }
    
}
