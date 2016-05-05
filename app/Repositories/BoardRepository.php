<?php 
namespace App\Repositories;

use App\Models\Board;
use App\Models\Project;
use Auth;

class BoardRepository extends BaseRepository
{
    protected $board;

    protected $project;

    public function __construct(Board $board, Project $project)
    {
        $this->board   = $board;
        $this->project = $project;
    }

    /**
     * Returns boards with list and tasks.
     * @param  integer $id    -id of the board.
     * @return collection     -collection of object
     */
    public function showBoard($id)
    {
        $board              = $this->board->findOrFail($id);
        $result['data']     = $this->getBoardData($board);
        $result['success']  = true;
        return $result;        
    } 

    /**
     * Create and returns board with lists and tasks.
     * @param  array $data --array of data to create board.
     * @return collection  -- collection of board , list and tasks.
     */
    public function createBoard($data)
    {
        $board             = $this->board->create($data);
        $result['data']    = $this->getBoardData($board);
        $result['success'] = true;
        return $result;
    }

    /**
     * Update Board
     * @param  array   $data board data to update.
     * @param  integer $id   -- pk of board
     * @return collection    -- collection of data.
     */
    public function updateBoard($data,$id)
    {
        $board  = $this->board->findOrFail($id);  

        // If users are present sync with board.
        if (isset($data['users'])) {
            $this->syncUsers($data['users'], $board);
        }
        $board->update($data);
        $result['data']     = $this->getBoardData($board);
        $result['success']  = true;
        return $result;        
    }

    //  Returns board with related model data.
    public function getBoardData($board)
    {
        $data = $board->load(['users','labels','lists'=>function($query)
        {
            $query->with(['tasks'=>function($query)
            {
                $query->with(['users','labels','comments'=>function($query)
                {
                    $query->with('user');

                }])->orderBy('order');

            }])->orderBy('order');

        }]); 
        
        $data['settings'] = $board->settings()->where('user_id', Auth::user()->id)->first();

        return $data;           
    }


    public function getBoardList($request)
    {
        $query = $this->board;

        if ($request->has('project_id')) {            
            $query = $query->where('project_id', $request->input('project_id'));
            $result['project'] = $this->project->findOrFail($request->input('project_id'))->load(['taskTypes']);
        }

        $skip            = ($this->current_page - 1) * $this->per_page;
        $result['total'] = $query->get()->count();
        $result['data']  = $query->skip($skip)->take($this->per_page)->get();

        return $result;        
    }

    // Sync users with board.
    public function syncUsers($users,$board)
    {
        $userIds = [];
        foreach ($users as $user) {
            $userIds[] = $user['id'];
        }        
        $board->users()->sync($userIds);
    }
}