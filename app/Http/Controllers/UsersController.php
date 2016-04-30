<?php
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\User;
use App\Repositories\UserRepository;
use Illuminate\Http\Request;

class UsersController extends Controller
{
    protected $user;
    protected $userRepo;

    public function __construct(User $user, UserRepository $userRepo)
    {
        $this->user     = $user;
        $this->userRepo = $userRepo;
    }

    public function index(Request $request)
    {
        return $this->userRepo->showAllUser($request);
    }

    public function store(Request $request)
    {    
        return $ths->userRepo->saveUser($request);
    }

    public function update(Request $request, $id)
    {
        $data = $request->input('data');
        return $this->userRepo->updateUser($data, $id);
    }

    public function show($id)
    {
        return $this->userRepo->showUser($id);
    }

    public function destroy($id)
    {
        return $this->userRepo->removeUser($id);
    }

    public function getUsersForBoard($board_id)
    {
        return $this->userRepo->getUsersForBoard($board_id);
    }

}
