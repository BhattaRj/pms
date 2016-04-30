<?php
namespace App\Repositories;
use App\Models\ListModel;

class ListRepository 
{
	
	protected $list;

	function __construct(ListModel $list)
	{
		$this->list = $list;
	}

	public function createList($data)
	{
        $list = $list = $this->list->create($data);
        if (isset($data['board_id'])) {
            $list->boards()->attach($data['board_id']);
        }
        $result['data']		= $list->load(['tasks']);
        $result['success'] 	= true;
        return $result;		
	}
}