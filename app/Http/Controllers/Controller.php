<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Image;

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

    protected function uploadProfile($destinationPath, $file)
    {

        if (!file_exists($destinationPath)) {
            mkdir($destinationPath, 0777, true);
        }

        $image_url = $destinationPath . '/' . round(microtime(true)) . $file->getClientOriginalName();

        $file->move($destinationPath, $image_url);

        // open an image file
        $img = Image::make($image_url);

        // now you are able to resize the instance
        $img->resize(50, 50);

        // finally we save the image as a new file

        $img->save($image_url);

        return $image_url;
    }

}
