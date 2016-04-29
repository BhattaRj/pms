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
  //       if(!isset($input['board_id']))
  //       {            
  //           $project            = $this->project->findOrFail($input['project_id']);
  //           $input['board_id'] = $project->getBacklogId();                                 
  //       }       
		// $input['list_id']  = $this->list->getDefaultListModelId(); 
        $input['author_id'] = $this->user->currentUserId();
             
        $result['data']     = $this->task->create($input);		       
        $this->updateRowOrder($result['data'] , $input);
        $result['success'] = true;
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
}