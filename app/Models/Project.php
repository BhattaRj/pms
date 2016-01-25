<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $table    = 'projects';
    protected $fillable = ['title', 'description'];

    public function tasks()
    {
        return $this->hasMany('App\Models\Task');
    }

    public function sprints()
    {
        return $this->hasMany('App\Models\Sprint');
    }

}
