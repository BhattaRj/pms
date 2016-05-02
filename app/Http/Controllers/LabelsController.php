<?php
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Repositories\LabelRepository;

class LabelsController extends Controller
{    
    protected $labelRepo;

    public function __construct(LabelRepository $labelRepo)
    {
        $this->labelRepo 	= $labelRepo;
    }

    // Create board.
    public function store(Request $request)
    {
    	$data	=	$request->input('data');        
    	return $this->labelRepo->createLabel($data);
    }

    // Update board.
    public function update(Request $request, $id)
    {
        $data = $request->input('data');
        return $this->labelRepo->updateLabel($data,$id);
    }

    public function destroy($id)
    {
        return $this->labelRepo->removeLabel($id);
    }    
}
