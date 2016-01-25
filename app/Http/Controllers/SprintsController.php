<?php
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Sprint;
use Illuminate\Http\Request;

class SprintsController extends Controller
{
    protected $sprint;

    protected $per_page = 100;

    /**
     * Default page no. for pagination.
     * @var integer
     */
    protected $current_page = 1;

    public function __construct(Sprint $sprint)
    {
        $this->sprint = $sprint;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {

        $query = $this->sprint->with(['tasks' => function ($query) {
            $query->orderBy('order');
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

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $sprint         = $this->sprint->create($request->input('data'));
        $result['data'] = $sprint->load('tasks');

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
        $result['data']    = $this->sprint->findOrFail($id);
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
        $this->sprint->destroy($id) ? $result['success'] = true : $result['success'] = false;
        return $result;
    }

}
