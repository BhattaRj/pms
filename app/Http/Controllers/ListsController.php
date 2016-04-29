<?php
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\List;
use Illuminate\Http\Request;

class ListsController extends Controller
{
    protected $list;
    protected $per_page = 100;
    protected $current_page = 1;

    public function __construct(List $list)
    {
        $this->list = $list;
    }

    public function index(Request $request)
    {
        $query = $this->list;

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
        $list = $this->list->create($input);

        if (isset($input['sprint_id'])) {
            $list->sprints()->attach($input['sprint_id']);
        }

        $result['data']    = $list->load('tasks');
        $result['success'] = true;
        return $result;
    }

    public function update(Request $request, $id)
    {
        $input             = $request->input('data');
        $list             = $this->list->findOrFail($id);
        $result['data']    = $list->update($input);
        $result['success'] = true;
        return $result;
    }

    public function show($id)
    {
        $result['data']    = $this->list->findOrFail($id)->load('users');
        $result['success'] = true;
        return $result;
    }

    public function destroy($id)
    {
        $this->list->destroy($id) ? $result['success'] = true : $result['success'] = false;
        return $result;
    }

    /**
     * Reorder the list in sprint.
     * @param  Request $request
     * @return [array]
     */
    public function reorderList(Request $request)
    {
        // dd($request->all());
        
        foreach ($request->all() as $data) {
            $this->list->findOrFail($data['id'])->update($data);
        }

        $result['success'] = true;
        return $result;
    }


}