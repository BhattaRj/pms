<?php

namespace App\Models;

use Baum\Node;

class Issue extends Node
{

    protected $table    = 'issues';
    protected $fillable = ['title', 'description', 'project_id', 'order', 'priority', 'task_type', 'story_point', 'board_id', 'author_id', 'reporter_id', 'assigne_id'];


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

    public function project()
    {
        return $this->belongsTo('App\Models\Project');
    }

    public function board()
    {
        return $this->belongsTo('App\Models\Board');
    }

    public function assigne()
    {
        return $this->belongsTo('App\User', 'assigne_id');
    }

    public function issueList()
    {
        return $this->select('title', 'id', 'depth')
            ->orderBy('lft', 'asc')->get();
    }

}
