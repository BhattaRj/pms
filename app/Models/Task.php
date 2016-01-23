<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    protected $table    = 'tasks';
    protected $fillable = ['title', 'description', 'project_id', 'sprint_id', 'order', 'priority'];

    public function project()
    {
        return $this->belongsTo('App\Models\Project');
    }

    public function sprint()
    {
        return $this->belongsTo('App\Models\Sprint');
    }
}
