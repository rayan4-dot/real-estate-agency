<?php

namespace App\Http\Controllers;

use App\Models\Property;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PropertyController extends Controller
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

    public function index()
    {
        return response()->json(Property::all());
    }

    public function show($id)
    {
        $property = Property::findOrFail($id);
        return response()->json($property);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'surface' => 'nullable|numeric',
            'rooms' => 'nullable|integer',
            'bedrooms' => 'nullable|integer',
            'price' => 'nullable|numeric',
            'address' => 'nullable|string|max:255',
            'city' => 'nullable|string|max:100',
            'type' => 'required|in:house,apartment,studio,villa',
            'status' => 'nullable|in:available,sold,rented',
            'published_at' => 'nullable|date',
            'user_id' => 'nullable|exists:users,id',
            'category_id' => 'nullable|exists:categories,id',
        ]);
        $property = Property::create($validated);
        return response()->json($property, 201);
    }

    public function update(Request $request, $id)
    {
        $property = Property::findOrFail($id);
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'surface' => 'nullable|numeric',
            'rooms' => 'nullable|integer',
            'bedrooms' => 'nullable|integer',
            'price' => 'nullable|numeric',
            'address' => 'nullable|string|max:255',
            'city' => 'nullable|string|max:100',
            'type' => 'required|in:house,apartment,studio,villa',
            'status' => 'nullable|in:available,sold,rented',
            'published_at' => 'nullable|date',
            'user_id' => 'nullable|exists:users,id',
            'category_id' => 'nullable|exists:categories,id',
        ]);
        $property->update($validated);
        return response()->json($property);
    }

    public function destroy($id)
    {
        $property = Property::findOrFail($id);
        $property->delete();
        return response()->json(null, 204);
    }
} 