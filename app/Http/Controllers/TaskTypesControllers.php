<?php
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Repositories\TaskTypeRepository;

class TaskTypesController extends Controller
{    
    protected $taskTypeRepo;

    public function __construct(TaskTypeRepository $taskTypeRepo)
    {
        $this->taskTypeRepo 	= $taskTypeRepo;
    }

    // Create board.
    public function store(Request $request)
    {
    	$data	=	$request->input('data');        
    	return $this->taskTypeRepo->create($data);
    }

    // Update board.
    public function update(Request $request, $id)
    {
        $data = $request->input('data');
        return $this->taskTypeRepo->update($data,$id);
    }

    public function destroy($id)
    {
        return $this->taskTypeRepo->remove($id);
    }    
}
