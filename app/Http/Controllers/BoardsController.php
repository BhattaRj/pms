<?php
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Board;
use Illuminate\Http\Request;

class BoardsController extends Controller
{
    protected $board;
    protected $per_page = 100;
    protected $current_page = 1;

    public function __construct(Board $board)
    {
        $this->board = $board;
    }

    public function index(Request $request)
    {
        $query = $this->board;

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
        $input = $request->input('data');
        $board = $this->board->create($input);

        if (isset($input['sprint_id'])) {
            $board->sprints()->attach($input['sprint_id']);
        }

        $result['data']    = $board->load('tasks');
        $result['success'] = true;
        return $result;
    }

    public function update(Request $request, $id)
    {
        $input             = $request->input('data');
        $board             = $this->board->findOrFail($id);
        $result['data']    = $board->update($input);
        $result['success'] = true;
        return $result;
    }

    public function show($id)
    {
        $result['data']    = $this->board->findOrFail($id)->load('users');
        $result['success'] = true;
        return $result;
    }

    public function destroy($id)
    {
        $this->board->destroy($id) ? $result['success'] = true : $result['success'] = false;
        return $result;
    }

}
