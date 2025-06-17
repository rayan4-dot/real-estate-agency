<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Property extends Model
{
    protected $fillable = [
        'title', 'description', 'surface', 'rooms', 'bedrooms', 'price', 'address', 'city', 'type', 'status', 'published_at', 'user_id', 'category_id'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function photos()
    {
        return $this->hasMany(Photo::class);
    }

    public function appointments()
    {
        return $this->hasMany(Appointment::class);
    }

    public function contactRequests()
    {
        return $this->hasMany(ContactRequest::class);
    }

    public function favoriteProperties()
    {
        return $this->hasMany(FavoriteProperty::class);
    }

    public function propertySubmission()
    {
        return $this->hasOne(PropertySubmission::class);
    }
} 