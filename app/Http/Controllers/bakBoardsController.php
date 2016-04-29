<?php
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\ListModel;
use App\Models\Board;
use Illuminate\Http\Request;

class BoardsController extends Controller
{
    protected $per_page = 100;
    protected $current_page = 1;
    protected $board;
    protected $list;

    public function __construct(Board $board, ListModel $list)
    {
        $this->board = $board;
        $this->list  = $list;
    }

    public function index(Request $request)
    {
        $query = $this->board->with(['tasks' => function ($query) {
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
        // $boards            = $this->board->where('board_default', 1)->get();   

        // $board            = $this->board->addBoard($request->input('data'), $boards);

        $board=$this->board->create($request->input('data'));

        $result['data']    = $board->load(['tasks','boards'=>function($query){
            $query->with(['tasks'=>function($query){
                $query->orderBy('order');
            }])->orderBy('order');
        }]);

        $result['success'] = true;

        return $result;
    }


    // public function update(Request $request, $id)
    // {
    //     $input = $request->input('data');

    //     // If duration is set activate the board.
    //     if (isset($input['duration']) || isset($input['start_date']) || isset($input['end_date'])) {
    //         $input['status'] = 5;
    //         $this->board->deactivateOtherBoard($id, $input['project_id']);
    //     }

    //     $board            = $this->board->findOrFail($id);
    //     $result['data']    = $board->update($input);
    //     $result['success'] = true;
    //     return $result;
    // }

    public function show($id)
    {
        $result['data']    = $this->board->findOrFail($id)->load(['lists'=>function($query){
            $query->with(['tasks'=>function($query){
                $query->orderBy('order');
            }])->orderBy('order');
        }]);
        $result['success'] = true;
        return $result;
    }


    public function destroy($id)
    {
        $this->board->destroy($id) ? $result['success'] = true : $result['success'] = false;
        return $result;
    }

    // Returns active board.
    // public function getActivateBoard(Request $request)
    // {
    //     $board = $this->board->getActivateBoard($request->input('project_id'));
    //     if ($board) {
    //         $query = $board->load(['boards' => function ($query) use ($board) {
    //             $query->with(['tasks' => function ($query) use ($board) {
    //                 $query->where('board_id', $board->id)->orderBy('order')->with(['assigne']);
    //             }]);
    //         }]);
    //         $result['data'] = $query;
    //     } else {
    //         $result['data'] = null;
    //     }

    //     $result['success'] = true;
    //     return $result;
    // }

    public function getTestingBoard(Request $request)
    {
        $board = $this->board->getTestingBoard($request->input('project_id'));
        if ($board) {

            $query = $board->load(['boards' => function ($query) use ($board) {                
                $query->with(['tasks' => function ($query) use ($board) {

                    $query->where('board_id', $board->id)->orderBy('order')->with(['assigne','board']);

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
