<?php 
namespace App\Repositories;
use App\Models\Comment;
use Auth;

class CommentRepository extends BaseRepository
{	

    protected $comment;

	function __construct(Comment $comment)
	{
		$this->comment  = $comment;		
	}

	/**
	 * create comment.
	 * @param   $request  --laravel requst
	 * @return collection          
	 */
	public function saveComment($data)
	{		
		$data['user_id'] 	= Auth::user()->id;		
		$comment 			= $this->comment->create($data);	
        $result['data']     = $comment->load('user');
        $result['success']  = true;

        return $result;
	}
}
