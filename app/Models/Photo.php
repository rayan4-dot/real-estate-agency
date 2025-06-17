<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Photo extends Model
{
    protected $fillable = ['url', 'property_id'];

    public function property()
    {
        return $this->belongsTo(Property::class);
    }
} 