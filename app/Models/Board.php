<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Board extends Model
{
    protected $table    = 'boards';
    protected $fillable = ['title', 'status', 'end_date', 'start_date', 'project_id', 'duration'];

    public function tasks()
    {
        return $this->hasMany('App\Models\Task');
    }

    public function lists()
    {
        return $this->belongsToMany('App\Models\ListModel', 'board_list', 'board_id', 'list_id');
    }

    public function settings()
    {       
        return $this->hasMany('App\Models\Setting');
    }

    public function users()
    {
        return $this->belongsToMany('App\User', 'board_user', 'board_id', 'user_id');
    }

    public function labels()
    {
        return $this->belongsToMany('App\Models\Label', 'board_label', 'board_id', 'label_id');
    }


}
