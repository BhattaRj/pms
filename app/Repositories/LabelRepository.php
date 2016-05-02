<?php 
namespace App\Repositories;

use App\Models\Label;
use Auth;

class LabelRepository
{
    protected $label;

    public function __construct(Label $label)
    {
        $this->label   = $label;
    }

    public function createLabel($data)
    {                    
        $result['data']    = $this->label->create($data);

        if (isset($data['board_id'])) {
            $result['data']->boards()->sync([$data['board_id']]);            
        }            

        $result['success'] = true;
        return $result;
    }

    public function updateLabel($data,$id)
    {
        $label  = $this->label->findOrFail($id);        
        $label->update($data);
        $result['data']     = $this->label->findOrFail($id);
        $result['success']  = true;
        return $result;        
    }

    public function removeLabel($id)
    {
        $this->label->destroy($id) ? $result['success'] = true : $result['success'] = false;
        return $result;     
    }    
}