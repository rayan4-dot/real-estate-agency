<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\FavoriteProperty;
use Illuminate\Support\Facades\Auth;

class FavoritePropertyController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum');
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $favorites = FavoriteProperty::where('user_id', Auth::id())
            ->with(['property.photos', 'property.category'])
            ->get();
        return response()->json($favorites);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'property_id' => 'required|exists:properties,id',
        ]);

        // Check if already favorited
        $existing = FavoriteProperty::where('user_id', Auth::id())
            ->where('property_id', $request->property_id)
            ->first();

        if ($existing) {
            return response()->json(['message' => 'Property already in favorites'], 422);
        }

        $favorite = FavoriteProperty::create([
            'user_id' => Auth::id(),
            'property_id' => $request->property_id,
        ]);

        return response()->json($favorite->load(['property.photos', 'property.category']), 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($user_id, $property_id)
    {
        $favorite = FavoriteProperty::where('user_id', Auth::id())
            ->where('property_id', $property_id)
            ->with(['property.photos', 'property.category'])
            ->first();

        if (!$favorite) {
            return response()->json(['message' => 'Favorite not found'], 404);
        }

        return response()->json($favorite);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $user_id, $property_id)
    {
        $favorite = FavoriteProperty::where('user_id', Auth::id())
            ->where('property_id', $property_id)
            ->firstOrFail();

        $request->validate([
            'property_id' => 'required|exists:properties,id',
        ]);

        $favorite->update([
            'property_id' => $request->property_id,
        ]);

        return response()->json($favorite->load(['property.photos', 'property.category']));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($user_id, $property_id)
    {
        $favorite = FavoriteProperty::where('user_id', Auth::id())
            ->where('property_id', $property_id)
            ->firstOrFail();

        $favorite->delete();
        
        return response()->json(['message' => 'Favorite removed successfully']);
    }

    /**
     * Check if a property is favorited by the current user.
     */
    public function check($property_id)
    {
        $isFavorited = FavoriteProperty::where('user_id', Auth::id())
            ->where('property_id', $property_id)
            ->exists();

        return response()->json(['is_favorited' => $isFavorited]);
    }
}
