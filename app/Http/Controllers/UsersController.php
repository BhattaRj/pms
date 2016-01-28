<?php
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\User;
use Illuminate\Http\Request;

class UsersController extends Controller
{

    protected $user;
    protected $project;
    protected $iamge_url_path = "upload/profile_pic";

    public function __construct(User $user, Project $project)
    {
        $this->user    = $user;
        $this->project = $project;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $query = $this->user;

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

        if ($request->hasFile('file')) {
            $file               = $request->file('file');
            $input['image_url'] = $this->uploadProfile($this->iamge_url_path, $file);
        }

        if (isset($input['id'])) {
            $user           = $this->user->findOrFail($input['id']);
            $result['data'] = $user->update($input);
        } else {
            $result['data'] = $this->user->create($input);
        }

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
        $user              = $this->user->findOrFail($id);
        $result['data']    = $user->update($request->input('data'));
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
        $this->user->destroy($id) ? $result['success'] = true : $result['success'] = false;
        return $result;
    }

    /**
     * Returns all user except users already in project.
     * @param  [integer] $project_id
     * @return [array]
     */
    public function getProjectUser($project_id)
    {
        $project_users = $this->project->findOrFail($project_id)->users;
        $users         = [];
        foreach ($project_users as $user) {
            $users[] = $user['id'];
        }
        $result['data']    = $this->user->whereNotIn('id', $users)->get();
        $result['success'] = true;
        return $result;
    }
}
