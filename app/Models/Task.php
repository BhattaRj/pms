<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Baum\Node;
class Task extends Node
{
    protected $table    = 'tasks';
    protected $fillable = ['title', 'description', 'project_id', 'sprint_id', 'order', 'priority', 'task_type', 'story_point', 'board_id', 'author_id', 'reporter_id', 'assigne_id'];

    public function project()
    {
        return $this->belongsTo('App\Models\Project');
    }

    public function board()
    {
        return $this->belongsTo('App\Models\Board');
    }

    public function boardlist()
    {
        return $this->belongsTo('App\Models\ListModel');
    }

    public function assigne()
    {
        return $this->belongsTo('App\User', 'assigne_id');
    }


    public function taskList()
    {
        return $this->select('title', 'id', 'depth')
            ->orderBy('lft', 'asc')->get();
    }

    public function updateOrder($order, $orderPage)    
    {
        $orderPage = $this->findOrFail($orderPage);

        if ($order == 'before') {

            $this->moveToLeftOf($orderPage);

        } elseif ($order == 'after') {

            $this->moveToRightOf($orderPage);

        } elseif ($order == 'childOf') {

            $this->makeChildOf($orderPage);
        }

    }

    public function updateBug($data)
    {

        if(!isset($data['sprint_id'])){            

            $project            = $this->project->findOrFail($data['project_id']);

            if($data['task_type']=='Bug'){

                $data['sprint_id'] = $project->getTestingBoardId();     
            }
            $data['sprint_id'] = $project->getBacklogId(); 
        }
        
        $data['board_id']  = $this->board->getDefaultBoardId();
        $data['author_id'] = $this->user->currentUserId();

        $result['data']     = $this->create($data);

        $this->updateRowOrder($result['data'], $request);

        $result['success'] = true;

        return $result;
    }

    public function createTask($data){

        // if(!isset($data['sprint_id'])){            

        //     $project            = $this->project->findOrFail($data['project_id']);

        //     if($data['task_type']=='Bug'){

        //         $data['sprint_id'] = $project->getTestingBoardId();     
        //     }
        //     $data['sprint_id'] = $project->getBacklogId(); 
        // }
        
        // $data['board_id']  = $this->board->getDefaultBoardId();
        $data['author_id'] = $this->user->currentUserId();

        $result['data']     = $this->create($data);
        $this->updateRowOrder($result['data'], $request);
        $result['success'] = true;

        return $result;
    }
}
