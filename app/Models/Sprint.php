<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Sprint extends Model
{
    protected $table    = 'sprints';
    protected $fillable = ['title', 'status', 'start_date', 'end_date', 'duration', 'project_id'];

    public function tasks()
    {
        return $this->hasMany('App\Models\Task');
    }
}
