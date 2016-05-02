<?php 
namespace App\Repositories;
use App\User;
use App\Models\Board;

class UserRepository extends BaseRepository
{	
	protected $user;		
	protected $board;
	protected $iamge_url_path = "upload/profile_pic";

	function __construct(User $user, Board $board)
	{
		$this->user  = $user;
		$this->board = $board;
	}

	public function	showAllUser($request)
	{
        $query = $this->user;
        if ($request->has('currentPage')) 
        {
            $this->current_page = $request->input('currentPage');
        }
        $skip            = ($this->current_page - 1) * $this->per_page;
        $result['total'] = $query->get()->count();
        $result['data']  = $query->skip($skip)->take($this->per_page)->get();
        return $result;		
	}

	/**
	 * if id is present update otherwise create user.
	 * @param   $request  --laravel requst
	 * @return collection          
	 */
	public function saveUser($request)
	{
		$input = $request->input('data');

        if ($request->hasFile('file')) {
            $file               = $request->file('file');
            $input['image_url'] = $this->uploadProfile($this->iamge_url_path, $file);
        }

        if (isset($input['id'])) {
            $user           = $this->user->findOrFail($input['id']);
            $result['data'] = $user->update($input);
        } else {
            $result['data'] = $this->user->create($input);
        }

        $result['success'] = true;
        return $result;
	}

	public function updateUser($data, $id)
	{
        $user              = $this->user->findOrFail($id);        
        $result['data']    = $user->update($data);
        $result['success'] = true;
        return $result;		
	}

	public function showUser($id)
	{
        $result['data']    = $this->user->findOrFail($id);
        $result['success'] = true;
        return $result;		
	}

	public function removeUser($id)
	{
        $this->user->destroy($id) ? $result['success'] = true : $result['success'] = false;
        return $result;		
	}

	/**
	 * Returns user those are not added in particular board.
	 * @param  int $board_id 
	 * @return collection           - laravel collection 
	 */
	public function getUsersForBoard($board_id)
	{
        $board_users = $this->board->findOrFail($board_id)->users;
        $users         = [];
        foreach ($board_users as $user) {
            $users[] = $user['id'];
        }
        $result['data']    = $this->user->whereNotIn('id', $users)->get();
        $result['success'] = true;
        return $result;
	}

}
