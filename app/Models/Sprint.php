<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Sprint extends Model
{
    protected $table    = 'sprints';
    protected $fillable = ['title', 'status', 'end_date', 'start_date', 'project_id', 'duration'];

    public function tasks()
    {
        return $this->hasMany('App\Models\Task');
    }

    public function deactivateOtherSprint($id)
    {
        $data['duration'] = null;
        $data['status']   = 1;

        foreach ($this->all() as $sprint) {
            if ($sprint->id != $id) {
                $sprint->update($data);
            }
        }
        return true;
    }
}
