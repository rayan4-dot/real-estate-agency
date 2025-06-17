<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PropertySubmission extends Model
{
    protected $fillable = ['owner_name', 'owner_email', 'property_details', 'status', 'created_at', 'property_id'];

    public function property()
    {
        return $this->belongsTo(Property::class);
    }
} 