<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;


class Label extends Model
{
    protected $table    = 'labels';
    protected $fillable = ['color', 'name'];

    public function boards()
    {
        return $this->belongsToMany('App\Models\Board', 'board_label', 'label_id', 'board_id');
    }

    public function tasks()
    {
        return $this->belongsToMany('App\Models\Task', 'task_label', 'label_id', 'task_id');
    }

}