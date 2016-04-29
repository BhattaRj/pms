<?php 
namespace App\Repositories;

use App\Models\Board;

class BoardRepository
{
    protected $board;
    protected $per_page = 100;
    protected $current_page = 1;
    
    public function __construct(Board $board)
    {
        $this->board   = $board;
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
        $board->update($data);
        $result['data']     = $this->getBoardData($board);
        $result['success']  = true;
        return $result;        
    }

    public function getBoardData($board)
    {
        $data = $board->load(['lists'=>function($query)
                {
                    $query->with(['tasks'=>function($query)
                    {
                        $query->orderBy('order');

                    }])->orderBy('order');

                }]); 
        return $data;           
    }

    public function getBoardList($request)
    {
        $query = $this->board;

        if ($request->has('project_id')) {            
            $query = $query->where('project_id', $request->input('project_id'));
        }

        $skip            = ($this->current_page - 1) * $this->per_page;
        $result['total'] = $query->get()->count();
        $result['data']  = $query->skip($skip)->take($this->per_page)->get();

        return $result;        
    }

}