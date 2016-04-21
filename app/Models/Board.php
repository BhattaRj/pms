<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Board extends Model
{
    protected $table    = 'boards';
    protected $fillable = ['title', 'status', 'description'];

    public function sprints()
    {
        return $this->belongsToMany('App\Models\Sprint', 'board_sprint', 'board_id', 'sprint_id');
    }
    public function getDefaultTaskBoardId()
    {
        return $this->where('task_default', 1)->first()->id;
    }

    public function tasks()
    {
        return $this->hasMany('App\Models\Task');
    }

    public function issues()
    {
        return $this->hasMany('App\Models\Issues');
    }

    public function getDefaultBoardId()
    {
        return $this->where('task_default', 1)->first()->id;
    }

    public function getDefaultTestingBoardId()
    {
        return $this->where('bug_default',1)->first()->id;
    }
}
