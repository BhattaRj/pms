<?php
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Board;
use App\Models\Task;
use App\Models\Sprint;
use App\Models\Project;
use App\User;
use App\Repositories\TaskRepository;
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

    public function __construct(Task $task, Board $board, User $user , Sprint $sprint, Project $project,TaskRepository $taskRepository)
    {
        $this->task             = $task;
        $this->board            = $board;
        $this->user             = $user;
        $this->sprint           = $sprint;
        $this->project          = $project;
        $this->taskRepository   = $taskRepository;
    }

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

        // if($input['task_type'] == 'Test Case'){
        //     return $this->taskRepository->createTestCase($input);
        // }
        
        // if($input['task_type'] == 'Bug'){
        //     return $this->taskRepository->createBug($input);
        // }
        
        return $this->taskRepository->createTask($input);
    }

    public function update(Request $request, $id)
    {
        $input = $request->input('data');
        return $this->taskRepository->updateTask($input, $id);
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


    //  Move Bug to the Testing backlog of the current project.
    public function moveToTestingBacklog(Request $request)
    {
        $result['success'] = $this->taskRepository->moveToTestingBacklog($request->all());
        return $result;
    }

}
