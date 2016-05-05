<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;


class TaskType extends Model
{
    protected $table    = 'task_types';
    protected $fillable = ['color', 'title'];

    public function project()
    {
        return $this->belongsToMany('App\Models\Project', 'project_task_type', 'task_type_id', 'project_id');
    }

}