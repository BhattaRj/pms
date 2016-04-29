<?php
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Repositories\BoardRepository;

class BoardsController extends Controller
{    
    protected $boardRepo;

    public function __construct(BoardRepository $boardRepo)
    {
        $this->boardRepo 	= $boardRepo;
    }

    // Returns board.
    public function show($id)
    {
    	return $this->boardRepo->showBoard($id);
    }

    // Create board.
    public function store(Request $request)
    {
    	$data	=	$request->input('data');
    	return $this->boardRepo->createBoard($data);
    }

    // Update board.
    public function update(Request $request, $id)
    {
        $data = $request->input('data');
        return $this->boardRepo->updateBoard($data,$id);
    }
    
    // return board list.
    public function getBoardList(Request $request)
    {
        return $this->boardRepo->getBoardList($request);
    } 
}
