<?php
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Repositories\CommentRepository;
use Illuminate\Http\Request;

class CommentsController extends Controller
{    
    protected $commentRepo;

    public function __construct(CommentRepository $commentRepo)
    {
        $this->commentRepo = $commentRepo;
    }

    public function store(Request $request)
    {    
        $data=$request->input('data');
        return $this->commentRepo->saveComment($data);
    }
}
