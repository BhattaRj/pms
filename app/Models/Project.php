<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $table    = 'projects';
    protected $fillable = ['title', 'description','start_date','end_date'];

    public function tasks()
    {
        return $this->hasMany('App\Models\Task');
    }

    public function issues()
    {
        return $this->hasMany('App\Models\Issue');
    }

    public function sprints()
    {
        return $this->hasMany('App\Models\Sprint');
    }

    public function users()
    {
        return $this->belongsToMany('App\User', 'project_user', 'project_id', 'user_id');
    }

    public function recentPorject()
    {
        return $this->latest('updated_at')->select('title', 'id')->take(4)->get();
    }

    // Get backlog id of this project.
    public function getBacklogId()
    {
        return $this->sprints()->where('title', 'Backlog')->first()->id;
    }
 
    public function getTestingSprintID()
    {
        return $this->sprints()->where('title', 'Testing')->first()->id;
    }

}
