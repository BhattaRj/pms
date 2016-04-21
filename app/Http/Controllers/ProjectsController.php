<?php
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\Sprint;
use App\Models\Board;
use Illuminate\Http\Request;

class ProjectsController extends Controller
{
    protected $project;
    protected $board;
    protected $per_page = 100;
    protected $current_page = 1;

    public function __construct(Project $project, Board $board)
    {
        $this->project  = $project;
        $this->board    = $board;
    }


    public function index(Request $request)
    {
        $query = $this->project;

        if ($request->has('currentPage')) {
            $this->current_page = $request->input('currentPage');
        }

        $skip            = ($this->current_page - 1) * $this->per_page;
        $result['total'] = $query->get()->count();
        $result['data']  = $query->skip($skip)->take($this->per_page)->get();
        return $result;
    }


    public function store(Request $request)
    {
        $project = $this->project->create($request->input('data'));

        $sprint  = new \App\Models\Sprint(['title' => 'Backlog']); // this will create backlog sprint.
        $sprint2  = new \App\Models\Sprint(['title' => 'Testing']); // this will create testing sprint.

        $project->sprints()->save($sprint);
        $project->sprints()->save($sprint2);

        $boards = $this->board->where('testing_board_default', 1)->get();
        
        $sprint2->addBoards($boards);  // this will create default boards for testing sprint.

        $result['data']    = $project;
        $result['success'] = true;
        return $result;
    }


    public function update(Request $request, $id)
    {
        $input   = $request->input('data');
        $project = $this->project->findOrFail($id);

        if (isset($input['users'])) {
            $users = [];
            foreach ($input['users'] as $user) {
                $users[] = $user['id'];
            }
            $project->users()->sync($users);
        }

        $result['data']    = $project->update($input);
        $result['success'] = true;
        return $result;
    }

    public function show($id)
    {
        $result['data']    = $this->project->findOrFail($id)->load('users');
        $result['success'] = true;
        return $result;
    }

    public function destroy($id)
    {
        $this->project->destroy($id) ? $result['success'] = true : $result['success'] = false;
        return $result;
    }

    public function recentProject()
    {
        $result['data']    = $this->project->recentPorject();
        $result['success'] = true;
        return $result;
    }
}
