<?php 
namespace App\Repositories;

use App\Models\Project;
use App\Models\ListModel;
use App\User;
use App\Models\Task;
use App\Models\Board;

class TaskRepository
{
    protected $project;
    protected $list;
    protected $user;
    protected $task;
    protected $board;

    public function __construct(Project $project, ListModel $list, User $user,Task $task, Board $board)
    {
        $this->project  = $project;
        $this->list    = $list;
        $this->user     = $user;
        $this->task     = $task;
        $this->board   = $board;
    }

	public function createTestCase($input)	
	{
		$project            = $this->project->findOrFail($input['project_id']);
        
		$input['board_id'] = $project->getTestingBoardID();     
		$input['list_id']  = $this->list->getDefaultTestingListModelId(); 
        $input['author_id'] = $this->user->currentUserId();        

        $result['data']     = $this->task->create($input);		       
        $this->updateRowOrder($result['data'] , $input);
        $result['success'] = true;
        return $result;		
	}

	public function createBug($input)	
	{
        if(!isset($input['board_id'])){                                    
            $input['board_id'] = $this->board->getActivateBoard($input['project_id'])->id;
        }       

		$input['list_id']  = $this->list->getDefaultListModelId(); 
        $input['author_id'] = $this->user->currentUserId();
             
        $result['data']     = $this->task->create($input);		       
        $this->updateRowOrder($result['data'] , $input);
        $result['success'] = true;
        return $result;		
	}

	public function createTask($input)	
	{
        $input['author_id'] = $this->user->currentUserId();             
        $task               = $this->task->create($input);	
        $this->updateRowOrder($task , $input);

        $result['data']     = $task->load(['users','labels','comments']);
        $result['success']  = true;
        return $result;		
	}

    protected function updateRowOrder(Task $task ,$input)
    {    	
        if (array_key_exists('order', $input) && array_key_exists('ordertask', $input)) {

            try {

                $task->updateOrder($input['order'], $input['ordertask']);

            } catch (MoveNotPossibleException $e) {

                $result['success'] = false;
                $result['msg']     = "Cannot make a page a child of self.";
                return $result;
            }
        }
    }

    public function updateTask($input,$id)
    {
        $task = $this->task->findOrFail($id);
        $this->updateRowOrder($task, $input);

        // If users are present sync with task.
        if (isset($input['users'])) {
            $this->syncUsers($input['users'], $task);
        }

        // If labels are present sync with task.
        if (isset($input['labels'])) {
            $this->syncLabels($input['labels'], $task);
        }

        $result['data']    = $task->update($input);
        $result['success'] = true;
        return $result;
    }

    public function moveToTestingBacklog($data)
    {
        $task               = $this->task->findOrFail($data['task_id']);
        $input['list_id']  = $this->list->getDefaultTestingListModelId(); 
        return $task->update($input);        
    }

    // Sync users with task.
    public function syncUsers($users,$task)
    {
        $userIds = [];
        foreach ($users as $user) {
            $userIds[] = $user['id'];
        }        
        $task->users()->sync($userIds);
    }

    // Sync users with labels.
    public function syncLabels($labels,$task)
    {
        $labelsId = [];
        foreach ($labels as $label) {
            $labelsId[] = $label['id'];
        }        
        $task->labels()->sync($labelsId);
    }


    // Returns tasks for wbs board.
    public function getStories($request)
    {

        $query = $this->task->with(['boardlist','assigne'])->orderBy('lft', 'asc');

        if ($request->has('project_id')) {            
            $query = $query->where('project_id', $request->input('project_id'));
        }

        $result['total'] = $query->get()->count();
        $result['data']  = $query->get()->toHierarchy();

        return $result;
    }
}