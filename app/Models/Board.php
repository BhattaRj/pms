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

    public function addBoards($boards)
    {
        $baordData = [];        
        foreach ($boards as $board) {
            $baordData[] = $board->id;
        }

        return $this->boards()->attach($baordData);
    }


    public function getActivateSprint($project_id)
    {
        return $this->where('project_id', $project_id)->where('status', 5)->first();
    }

    public function getTestingSprint($project_id){
        return $this->where('project_id', $project_id)->where('title', 'Testing')->first();   
    }
}
