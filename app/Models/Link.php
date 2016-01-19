<?php

namespace App\Models\Admin;

use Illuminate\Database\Eloquent\Model;

class Link extends Model
{
    protected $table    = 'links';
    protected $fillable = ['title', 'description', 'url', 'icon', 'editable'];
}
