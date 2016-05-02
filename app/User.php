<?php

namespace App;

use Auth;
use Illuminate\Auth\Authenticatable;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\CanResetPassword as CanResetPasswordContract;
use Illuminate\Database\Eloquent\Model;

class User extends Model implements AuthenticatableContract, CanResetPasswordContract
{
    use Authenticatable, CanResetPassword;

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'users';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['name', 'email', 'password', 'image_url'];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = ['password', 'remember_token'];

    public function setPasswordAttribute($value)
    {
        $this->attributes['password'] = bcrypt($value);
    }

    public function currentUserId()
    {
        if (Auth::check()) {
            return Auth::user()->id;
        }
        return null;
    }

    public function projects()
    {
        return $this->belongsToMany('App\Models\Project', 'project_user', 'user_id', 'project_id');
    }

    public function boards()
    {
        return $this->belongsToMany('App\Models\Board', 'board_user', 'user_id', 'board_id');
    }

    public function tasks()
    {
        return $this->belongsToMany('App\Models\Task', 'task_user', 'user_id', 'task_id');
    }

    public function assignedTasks()
    {
        return $this->hasMany('App\Models\Task', 'assigne_id', 'id');
    }

    public function assignedIssues()
    {
        return $this->hasMany('App\Models\Issue', 'assigne_id', 'id');
    }

    public function comments()
    {
        return $this->hasMany('App\Models\Comments', 'user_id', 'id');
    }

}
