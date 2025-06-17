<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\FavoriteProperty;
use Illuminate\Support\Facades\Auth;

class FavoritePropertyController extends Controller
{
    public function __construct()
    {
        $this->middleware(function ($request, $next) {
            $user = Auth::user();
            $action = $request->route()->getActionMethod();
            if ($action === 'index') {
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
        return response()->json(FavoriteProperty::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'property_id' => 'required|exists:properties,id',
        ]);
        $favorite = FavoriteProperty::create($validated);
        return response()->json($favorite, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($user_id, $property_id)
    {
        $favorite = FavoriteProperty::where('user_id', $user_id)->where('property_id', $property_id)->firstOrFail();
        return response()->json($favorite);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $user_id, $property_id)
    {
        $favorite = FavoriteProperty::where('user_id', $user_id)->where('property_id', $property_id)->firstOrFail();
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'property_id' => 'required|exists:properties,id',
        ]);
        $favorite->update($validated);
        return response()->json($favorite);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($user_id, $property_id)
    {
        $favorite = FavoriteProperty::where('user_id', $user_id)->where('property_id', $property_id)->firstOrFail();
        $favorite->delete();
        return response()->json(null, 204);
    }
}
