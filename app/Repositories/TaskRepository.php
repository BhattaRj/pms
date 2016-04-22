<?php namespace App\Repositories;
use App\Models\Project;
use App\Models\Board;
use App\User;
use App\Models\Task;
use App\Models\Sprint;

class TaskRepository
{
    protected $project;
    protected $board;
    protected $user;
    protected $task;
    protected $sprint;

    public function __construct(Project $project, Board $board, User $user,Task $task, Sprint $sprint)
    {
        $this->project  = $project;
        $this->board    = $board;
        $this->user     = $user;
        $this->task     = $task;
        $this->sprint   = $sprint;
    }

	public function createTestCase($input)	
	{
		$project            = $this->project->findOrFail($input['project_id']);
		$input['sprint_id'] = $project->getTestingSprintID();     
		$input['board_id']  = $this->board->getDefaultTestingBoardId(); 
        $input['author_id'] = $this->user->currentUserId();        

        $result['data']     = $this->task->create($input);		       
        $this->updateRowOrder($result['data'] , $input);
        $result['success'] = true;
        return $result;		
	}

	public function createBug($input)	
	{
        if(!isset($input['sprint_id'])){                                    
            $input['sprint_id'] = $this->sprint->getActivateSprint($input['project_id'])->id;
        }       

		$input['board_id']  = $this->board->getDefaultBoardId(); 
        $input['author_id'] = $this->user->currentUserId();
             
        $result['data']     = $this->task->create($input);		       
        $this->updateRowOrder($result['data'] , $input);
        $result['success'] = true;
        return $result;		
	}

	public function createTask($input)	
	{
        if(!isset($input['sprint_id']))
        {            
            $project            = $this->project->findOrFail($input['project_id']);
            $input['sprint_id'] = $project->getBacklogId();                                 
        }       
		$input['board_id']  = $this->board->getDefaultBoardId(); 
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
}