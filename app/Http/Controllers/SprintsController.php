<?php
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Board;
use App\Models\Sprint;
use Illuminate\Http\Request;

class SprintsController extends Controller
{
    protected $per_page = 100;
    protected $current_page = 1;
    protected $sprint;
    protected $board;

    public function __construct(Sprint $sprint, Board $board)
    {
        $this->sprint = $sprint;
        $this->board  = $board;
    }

    public function index(Request $request)
    {
        $query = $this->sprint->with(['tasks' => function ($query) {
            $query->orderBy('order')->with('assigne')->where('task_type','Task');
        }]);

        if ($request->has('currentPage')) {
            $this->current_page = $request->input('currentPage');
        }

        if ($request->has('project_id')) {
            $query = $query->where('project_id', $request->input('project_id'));
        }

        $skip            = ($this->current_page - 1) * $this->per_page;
        $result['total'] = $query->get()->count();
        $result['data']  = $query->skip($skip)->take($this->per_page)->get();
        return $result;
    }

    public function store(Request $request)
    {
        // $boards            = $this->board->where('sprint_default', 1)->get();   

        // $sprint            = $this->sprint->addSprint($request->input('data'), $boards);

        $sprint=$this->sprint->create($request->input('data'));

        $result['data']    = $sprint->load(['tasks','boards'=>function($query){
            $query->with(['tasks'=>function($query){
                $query->orderBy('order');
            }])->orderBy('order');
        }]);

        $result['success'] = true;

        return $result;
    }


    public function update(Request $request, $id)
    {
        $input = $request->input('data');

        // If duration is set activate the sprint.
        if (isset($input['duration']) || isset($input['start_date']) || isset($input['end_date'])) {
            $input['status'] = 5;
            $this->sprint->deactivateOtherSprint($id, $input['project_id']);
        }

        $sprint            = $this->sprint->findOrFail($id);
        $result['data']    = $sprint->update($input);
        $result['success'] = true;
        return $result;
    }

    public function show($id)
    {
        $result['data']    = $this->sprint->findOrFail($id)->load(['boards'=>function($query){
            $query->with(['tasks'=>function($query){
                $query->orderBy('order');
            }])->orderBy('order');
        }]);
        $result['success'] = true;
        return $result;
    }


    public function destroy($id)
    {
        $this->sprint->destroy($id) ? $result['success'] = true : $result['success'] = false;
        return $result;
    }

    // Returns active sprint.
    public function getActivateSprint(Request $request)
    {
        $sprint = $this->sprint->getActivateSprint($request->input('project_id'));
        if ($sprint) {
            $query = $sprint->load(['boards' => function ($query) use ($sprint) {
                $query->with(['tasks' => function ($query) use ($sprint) {
                    $query->where('sprint_id', $sprint->id)->orderBy('order')->with(['assigne']);
                }]);
            }]);
            $result['data'] = $query;
        } else {
            $result['data'] = null;
        }

        $result['success'] = true;
        return $result;
    }

    public function getTestingSprint(Request $request)
    {
        $sprint = $this->sprint->getTestingSprint($request->input('project_id'));
        if ($sprint) {

            $query = $sprint->load(['boards' => function ($query) use ($sprint) {                
                $query->with(['tasks' => function ($query) use ($sprint) {

                    $query->where('sprint_id', $sprint->id)->orderBy('order')->with(['assigne','board']);

                }]);
            }]);
            $result['data'] = $query;
        } else {
            $result['data'] = null;
        }

        $result['success'] = true;
        return $result;
    }

}
