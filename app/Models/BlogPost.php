<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BlogPost extends Model
{
    protected $fillable = ['title', 'content', 'created_at', 'user_id'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
} 