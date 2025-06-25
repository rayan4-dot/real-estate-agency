<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Property;
use App\Models\BlogPost;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class StatsController extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth:sanctum', 'role:admin']);
    }

    public function index()
    {
        return response()->json([
            'users' => User::count(),
            'properties' => Property::count(),
            'blogPosts' => BlogPost::count(),
        ]);
    }
} 