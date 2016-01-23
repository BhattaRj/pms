<?php
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Task;
use Illuminate\Http\Request;

class TasksController extends Controller
{
    protected $task;

    protected $per_page = 100;

    /**
     * Default page no. for pagination.
     * @var integer
     */
    protected $current_page = 1;

    public function __construct(Task $task)
    {
        $this->task = $task;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $query = $this->task->orderBy('order');

        if ($request->has('currentPage')) {
            $this->current_page = $request->input('currentPage');
        }

        if ($request->has('project_id')) {
            $query = $query->where('project_id', $request->input('project_id'));
        }

        if ($request->has('sprint_id')) {
            $query = $query->whereNull('sprint_id');
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
        $result['data']    = $this->task->create($request->input('data'));
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
        $task              = $this->task->findOrFail($id);
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

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $this->task->destroy($id) ? $result['success'] = true : $result['success'] = false;
        return $result;
    }

    /**
     * Update page sections
     * @param  Request $request
     * @return [array]
     */
    public function reorderTasks(Request $request)
    {

        //dd($request->all());

        foreach ($request->all() as $data) {
            $this->task->findOrFail($data['id'])->update($data);
        }

        $result['success'] = true;
        return $result;
    }

}
