<?php 
namespace App\Repositories;

use Image;

class BaseRepository 
{
	protected $per_page = 100;
    protected $current_page = 1;	

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