<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ListModel extends Model
{
    protected $table    = 'lists';
    protected $fillable = ['title', 'status', 'description','order'];

    public function Board()
    {
        return $this->belongsToMany('App\Models\Board', 'board_list', 'list_id', 'board_id');
    }
    public function getDefaultTaskBoardId()
    {
        return $this->where('task_default', 1)->first()->id;
    }

    public function tasks()
    {
        return $this->hasMany('App\Models\Task');
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
