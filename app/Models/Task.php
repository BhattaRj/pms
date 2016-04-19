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

    public function sprint()
    {
        return $this->belongsTo('App\Models\Sprint');
    }

    public function board()
    {
        return $this->belongsTo('App\Models\Board');
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

    // public function updateRowOrder($request)
    // {

    //     if (array_key_exists('order', $request->input('data')) && array_key_exists('ordertask', $request->input('data'))) {

    //         dd($request);
            
    //         try
    //         {

    //             $this->updateOrder($request->input('data')['order'], $request->input('data')['ordertask']);

    //         } catch (MoveNotPossibleException $e) {

    //             $result['success'] = false;
    //             $result['msg']     = "Cannot make a page a child of self.";
    //             return $result;
    //         }
    //     }
    // }


    // public function reorderTasks($request){

    //     foreach ($tasks as $task) {

    //         if (isset($task['default_board']) && $task['default_board'] == true) {

    //             $task['board_id'] = $this->board->getDefaultTaskBoardId();
    //         }

    //         $this->task->findOrFail($task['id'])->update($task);
    //     }
    //     return true;
    // }

}
