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

    /**
     * Deactivate all other sprint of the project.
     * @param  [type] $id         [description]
     * @param  [type] $project_id [description]
     * @return [type]             [description]
     */
    public function deactivateOtherSprint($id, $project_id)
    {

        $data['duration'] = null;
        $data['status']   = 1;

        foreach ($this->where('project_id', $project_id)->get() as $sprint) {

            if ($sprint->id != $id) {
                $sprint->update($data);
            }

        }
        return true;
    }
}
