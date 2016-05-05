<?php 
namespace App\Repositories;

use App\Models\TaskType;
use Auth;

class taskTypeRepository
{
    protected $taskType;

    public function __construct(TaskType $taskType)
    {
        $this->taskType   = $taskType;
    }

    public function create($data)
    {                    
        $result['data']    = $this->taskType->create($data);

        if (isset($data['board_id'])) {
            $result['data']->boards()->sync([$data['board_id']]);            
        }            

        $result['success'] = true;
        return $result;
    }

    public function update($data,$id)
    {
        $taskType  = $this->taskType->findOrFail($id);        
        $taskType->update($data);
        $result['data']     = $this->taskType->findOrFail($id);
        $result['success']  = true;
        return $result;        
    }

    public function removetaskType($id)
    {
        $this->taskType->destroy($id) ? $result['success'] = true : $result['success'] = false;
        return $result;     
    }    
}