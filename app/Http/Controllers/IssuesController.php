<?php
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Board;
use App\Models\Task;
use App\User;
use App\Models\Project;
use App\Models\Sprint;

use Illuminate\Http\Request;

class IssuesController extends Controller
{
    protected $task;
    protected $board;
    protected $user;
    protected $project;
    protected $sprint;
    protected $per_page = 100;
    protected $current_page = 1;

    public function __construct(task $task, Board $board, User $user,Project $project,Sprint $sprint)
    {
        $this->task = $task;
        $this->board = $board;
        $this->user  = $user;
        $this->project=$project;
        $this->sprint=$sprint;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $query = $this->task->orderBy('lft', 'asc');
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

        if(!isset($input['sprint_id'])){

            $input['sprint_id']=$this->sprint->where('project_id',$input['project_id'])->where('title','Backlog')->first()->id;    
        }
        
        $input['board_id']  = $this->board->getDefaultBoardId();
        $input['author_id'] = $this->user->currentUserId();
        $result['data']     = $this->task->create($input);

        $this->updateRowOrder($result['data'], $request);

        $result['success'] = true;

        return $result;
    }


    public function update(Request $request, $id)
    {


        $task = $this->task->findOrFail($id);

        if ($response = $this->updateRowOrder($task, $request)) {

            return $response;
        }

        $result['data']    = $task->update($request->input('data'));
        $result['success'] = true;
        return $result;
    }

    public function show($id)
    {
        $result['data']    = $this->task->findOrFail($id);
        $result['success'] = true;
        return $result;
    }


    public function destroy($id)
    {
        $this->task->destroy($id) ? $result['success'] = true : $result['success'] = false;
        return $result;
    }

    public function issueList()
    {
        $result['data'] = $this->task->taskList();
        return $result;
    }

    /**
     * Reorder the task in sprint.
     * if default_board change the board id into the default board.
     * @param  Request $request
     * @return [array]
     */
    public function reordertasks(Request $request)
    {
        foreach ($request->all() as $data) {
            if (isset($data['default_board']) && $data['default_board'] == true) {
                $data['board_id'] = $this->board->getDefaulttaskBoardId();
            }
            $this->task->findOrFail($data['id'])->update($data);
        }

        $result['success'] = true;
        return $result;
    }

    protected function updateRowOrder(task $task, Request $request)
    {

        if (array_key_exists('order', $request->input('data')) && array_key_exists('ordertask', $request->input('data'))) {

            try
            {

                $task->updateOrder($request->input('data')['order'], $request->input('data')['ordertask']);
            } catch (MoveNotPossibleException $e) {
                $result['success'] = false;
                $result['msg']     = "Cannot make a page a child of self.";
                return $result;
            }
        }
    }

}
