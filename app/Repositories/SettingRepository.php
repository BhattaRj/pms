<?php 
namespace App\Repositories;

use App\Models\Setting;
use Auth;

class SettingRepository
{
    protected $setting;

    public function __construct(Setting $setting)
    {
        $this->setting   = $setting;
    }

    public function createSetting($data)
    {        
        $data['user_id']   = Auth::user()->id;        
        $result['data']    = $this->setting->create($data);            
        $result['success'] = true;
        return $result;
    }

    public function updateSetting($data,$id)
    {
        $setting  = $this->setting->findOrFail($id);        
        $setting->update($data);
        $result['data']     = $this->setting->findOrFail($id);
        $result['success']  = true;
        return $result;        
    }
}