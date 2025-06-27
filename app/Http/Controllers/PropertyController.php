<?php

namespace App\Http\Controllers;

use App\Models\Property;
use App\Models\Photo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

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
        $properties = Property::with('photos')->get();
        return response()->json($properties);
    }

    public function show($id)
    {
        $property = Property::with(['photos', 'user'])->findOrFail($id);
        return response()->json($property);
    }

    public function store(Request $request)
    {
        // Debug: Log what's being received
        \Log::info('Property store request data:', $request->all());
        \Log::info('Files received:', $request->allFiles());

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

        // Set the user_id to the current authenticated user
        $validated['user_id'] = Auth::id();

        $property = Property::create($validated);

        // Handle multiple image uploads
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $path = $image->store('properties', 'public');
                $url = asset('storage/' . $path);
                
                Photo::create([
                    'url' => $url,
                    'property_id' => $property->id,
                ]);
            }
        }

        return response()->json($property->load(['photos', 'user']), 201);
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
            'image' => 'nullable|image|max:5120', // max 5MB
        ]);

        $property->update($validated);

        // Handle image upload for update
        if ($request->hasFile('image')) {
            // Delete old photo if exists
            $oldPhoto = $property->photos()->first();
            if ($oldPhoto) {
                // Delete the file from storage
                $oldPath = str_replace(asset('storage/'), '', $oldPhoto->url);
                Storage::disk('public')->delete($oldPath);
                $oldPhoto->delete();
            }

            // Store new photo
            $path = $request->file('image')->store('properties', 'public');
            $url = asset('storage/' . $path);
            
            Photo::create([
                'url' => $url,
                'property_id' => $property->id,
            ]);
        }

        return response()->json($property->load('photos'));
    }

    public function destroy($id)
    {
        $property = Property::findOrFail($id);
        
        // Delete associated photos
        foreach ($property->photos as $photo) {
            $path = str_replace(asset('storage/'), '', $photo->url);
            Storage::disk('public')->delete($path);
        }
        
        $property->delete();
        return response()->json(null, 204);
    }
} 