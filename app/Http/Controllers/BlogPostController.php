<?php

namespace App\Http\Controllers;

use App\Models\BlogPost;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BlogPostController extends Controller
{
    public function __construct()
    {
        $this->middleware(function ($request, $next) {
            $user = Auth::user();
            $action = $request->route()->getActionMethod();
            if (in_array($action, ['store', 'update', 'destroy'])) {
                if (!$user || !$user->hasAnyRole(['admin', 'agent'])) {
                    return response()->json(['message' => 'Forbidden'], 403);
                }
            }
            return $next($request);
        });
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(BlogPost::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'excerpt' => 'nullable|string|max:500',
            'created_at' => 'nullable|date',
            'user_id' => 'required|exists:users,id',
        ]);
        $blogPost = BlogPost::create($validated);
        return response()->json($blogPost, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $blogPost = BlogPost::findOrFail($id);
        return response()->json($blogPost);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $blogPost = BlogPost::findOrFail($id);
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'excerpt' => 'nullable|string|max:500',
            'created_at' => 'nullable|date',
            'user_id' => 'required|exists:users,id',
        ]);
        $blogPost->update($validated);
        return response()->json($blogPost);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $blogPost = BlogPost::findOrFail($id);
        $blogPost->delete();
        return response()->json(null, 204);
    }
}
