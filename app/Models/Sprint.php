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

    public function boards()
    {
        return $this->belongsToMany('App\Models\Board', 'board_sprint', 'sprint_id', 'board_id');
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

    /**
     * Add sprint with default boards.
     * @param [type] $data [description]
     */
    public function addSprint($sprintData, $boards)
    {
        $baordData = [];

        foreach ($boards as $board) {
            $baordData[] = $board->id;
        }

        $sprint = $this->create($sprintData);
        $sprint->boards()->attach($baordData);

        return $sprint;
    }

    public function getActivateSprint($request)
    {
        $sprint = $this->where('project_id', $request->input('project_id'))
            ->where('status', 5)->first();

        if ($sprint) {
            // return $sprint;

            return $sprint->load(['boards' => function ($query) use ($sprint) {

                $query->with(['tasks' => function ($query) use ($sprint) {
                    $query->where('sprint_id', $sprint->id)->orderBy('order');
                }]);

            }]);

        } else {
            return null;
        }
    }
}
