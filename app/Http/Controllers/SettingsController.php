<?php
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Repositories\SettingRepository;

class SettingsController extends Controller
{    
    protected $settingRepo;

    public function __construct(SettingRepository $settingRepo)
    {
        $this->settingRepo 	= $settingRepo;
    }

    // Create board.
    public function store(Request $request)
    {
    	$data	=	$request->input('data');        
    	return $this->settingRepo->createSetting($data);
    }

    // Update board.
    public function update(Request $request, $id)
    {
        $data = $request->input('data');
        return $this->settingRepo->updateSetting($data,$id);
    }
}
