<?php
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Board;
use Illuminate\Http\Request;

class BoardsController extends Controller
{
    protected $board;

    protected $per_page = 100;

    /**
     * Default page no. for pagination.
     * @var integer
     */
    protected $current_page = 1;

    public function __construct(Board $board)
    {
        $this->board = $board;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
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

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
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

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
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

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $this->board->destroy($id) ? $result['success'] = true : $result['success'] = false;
        return $result;
    }

}
