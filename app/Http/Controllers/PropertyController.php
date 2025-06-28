<?php

namespace App\Http\Controllers;

use App\Models\Property;
use App\Models\Photo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Spatie\Permission\Models\Role;

class PropertyController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum')->except(['index', 'show']);
    }

    public function index()
    {
        $properties = Property::with(['photos', 'category'])->get();
        return response()->json($properties);
    }

    public function show($id)
    {
        $property = Property::with(['photos', 'user', 'category'])->findOrFail($id);
        return response()->json($property);
    }

    public function store(Request $request)
    {
        if (!auth()->user()->hasAnyRole(['admin', 'agent'])) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'surface' => 'nullable|numeric',
            'rooms' => 'nullable|integer',
            'bedrooms' => 'nullable|integer',
            'address' => 'nullable|string',
            'city' => 'nullable|string',
            'price' => 'nullable|numeric',
            'status' => 'required|in:available,sold,rented',
            'type' => 'required|in:house,apartment,land,commercial,villa,office',
            'category_id' => 'nullable|exists:categories,id',
            'images.*' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        try {
            $property = Property::create([
                'title' => $request->title,
                'description' => $request->description ?? '',
                'surface' => $request->surface ?? 0,
                'rooms' => $request->rooms ?? 0,
                'bedrooms' => $request->bedrooms ?? 0,
                'address' => $request->address ?? '',
                'city' => $request->city ?? '',
                'price' => $request->price ?? 0,
                'status' => $request->status,
                'type' => $request->type,
                'category_id' => $request->category_id ?: null,
                'user_id' => auth()->id(),
            ]);

            if ($request->hasFile('images')) {
                $images = $request->file('images');
                // Convert single file to array if needed
                if (!is_array($images)) {
                    $images = [$images];
                }
                
                Log::info('Images found in request: ' . count($images));
                try {
                    foreach ($images as $index => $image) {
                        Log::info('Processing image ' . $index . ': ' . $image->getClientOriginalName());
                        if ($image->isValid()) {
                            $path = $image->store('properties', 'public');
                            $url = asset('storage/' . $path);
                            Log::info('Image stored at: ' . $path . ' with URL: ' . $url);
                            
                            $photo = Photo::create([
                                'property_id' => $property->id,
                                'url' => $url,
                            ]);
                            Log::info('Photo created with ID: ' . $photo->id);
                        } else {
                            Log::warning('Invalid image file at index: ' . $index);
                        }
                    }
                } catch (\Exception $e) {
                    Log::error('Image upload failed: ' . $e->getMessage());
                    Log::error('Stack trace: ' . $e->getTraceAsString());
                    // Don't fail the entire request if image upload fails
                }
            } else {
                Log::info('No images found in request');
            }

            return response()->json($property->load(['photos', 'category']), 201);
        } catch (\Exception $e) {
            Log::error('Property creation failed: ' . $e->getMessage());
            return response()->json(['message' => 'Failed to create property: ' . $e->getMessage()], 500);
        }
    }

    public function update(Request $request, $id)
    {
        if (!auth()->user()->hasAnyRole(['admin', 'agent'])) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $property = Property::findOrFail($id);
        
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'surface' => 'nullable|numeric',
            'rooms' => 'nullable|integer',
            'bedrooms' => 'nullable|integer',
            'address' => 'nullable|string',
            'city' => 'nullable|string',
            'price' => 'nullable|numeric',
            'status' => 'required|in:available,sold,rented',
            'type' => 'required|in:house,apartment,land,commercial,villa,office',
            'category_id' => 'nullable|exists:categories,id',
            'images.*' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        try {
            $property->update([
                'title' => $request->title,
                'description' => $request->description ?? '',
                'surface' => $request->surface ?? 0,
                'rooms' => $request->rooms ?? 0,
                'bedrooms' => $request->bedrooms ?? 0,
                'address' => $request->address ?? '',
                'city' => $request->city ?? '',
                'price' => $request->price ?? 0,
                'status' => $request->status,
                'type' => $request->type,
                'category_id' => $request->category_id ?: null,
            ]);

            if ($request->hasFile('images')) {
                $images = $request->file('images');
                // Convert single file to array if needed
                if (!is_array($images)) {
                    $images = [$images];
                }
                
                Log::info('Images found in request: ' . count($images));
                try {
                    foreach ($images as $index => $image) {
                        Log::info('Processing image ' . $index . ': ' . $image->getClientOriginalName());
                        if ($image->isValid()) {
                            $path = $image->store('properties', 'public');
                            $url = asset('storage/' . $path);
                            Log::info('Image stored at: ' . $path . ' with URL: ' . $url);
                            
                            $photo = Photo::create([
                                'property_id' => $property->id,
                                'url' => $url,
                            ]);
                            Log::info('Photo created with ID: ' . $photo->id);
                        } else {
                            Log::warning('Invalid image file at index: ' . $index);
                        }
                    }
                } catch (\Exception $e) {
                    Log::error('Image upload failed: ' . $e->getMessage());
                    Log::error('Stack trace: ' . $e->getTraceAsString());
                    // Don't fail the entire request if image upload fails
                }
            } else {
                Log::info('No images found in request');
            }

            return response()->json($property->load(['photos', 'category']));
        } catch (\Exception $e) {
            Log::error('Property update failed: ' . $e->getMessage());
            return response()->json(['message' => 'Failed to update property: ' . $e->getMessage()], 500);
        }
    }

    public function destroy($id)
    {
        if (!auth()->user()->hasAnyRole(['admin', 'agent'])) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $property = Property::findOrFail($id);
        
        // Delete associated photos
        foreach ($property->photos as $photo) {
            // Extract the path from the URL
            $path = str_replace(asset('storage/'), '', $photo->url);
            Storage::disk('public')->delete($path);
            $photo->delete();
        }
        
        $property->delete();
        
        return response()->json(['message' => 'Property deleted successfully']);
    }
} 