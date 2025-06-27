<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CategoryController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum')->except(['index', 'show']);
    }

    public function index()
    {
        $categories = Category::all();
        return response()->json($categories);
    }

    public function show($id)
    {
        $category = Category::with('properties')->findOrFail($id);
        return response()->json($category);
    }

    public function store(Request $request)
    {
        if (!Auth::user()->hasAnyRole(['admin'])) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $request->validate([
            'name' => 'required|string|max:255|unique:categories',
            'description' => 'nullable|string',
        ]);

        $category = Category::create([
            'name' => $request->name,
            'description' => $request->description,
        ]);

        return response()->json($category, 201);
    }

    public function update(Request $request, $id)
    {
        if (!Auth::user()->hasAnyRole(['admin'])) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $category = Category::findOrFail($id);
        
        $request->validate([
            'name' => 'required|string|max:255|unique:categories,name,' . $id,
            'description' => 'nullable|string',
        ]);

        $category->update([
            'name' => $request->name,
            'description' => $request->description,
        ]);

        return response()->json($category);
    }

    public function destroy($id)
    {
        if (!Auth::user()->hasAnyRole(['admin'])) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $category = Category::findOrFail($id);
        
        // Check if category has properties
        if ($category->properties()->count() > 0) {
            return response()->json(['message' => 'Cannot delete category with associated properties'], 422);
        }
        
        $category->delete();
        
        return response()->json(['message' => 'Category deleted successfully']);
    }
} 