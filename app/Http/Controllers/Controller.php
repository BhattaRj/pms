<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

abstract class Controller extends BaseController
{

    /**
     * Variable to store items per page for pagination.
     * @var integer
     */
    protected $per_page = 12;

    /**
     * Default page no. for pagination.
     * @var integer
     */
    protected $current_page = 1;

    use DispatchesJobs, ValidatesRequests;

    protected function uploadImage($destinationPath, $file)
    {

        if (!file_exists($destinationPath)) {
            mkdir($destinationPath, 0777, true);
        }

        $filename = $destinationPath . '/' . round(microtime(true)) . $file->getClientOriginalName();

        $file->move($destinationPath, $filename);

        return $filename;
    }
}
