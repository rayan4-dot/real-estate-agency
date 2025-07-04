<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Photo;
use Illuminate\Support\Facades\Auth;

class PhotoController extends Controller
{
    public function __construct()
    {
        $this->middleware(function ($request, $next) {
            $user = Auth::user();
            if (!$user || !$user->hasAnyRole(['admin', 'agent'])) {
                return response()->json(['message' => 'Forbidden'], 403);
            }
            return $next($request);
        });
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(Photo::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'file' => 'required|image|max:5120', // max 5MB
            'property_id' => 'required|exists:properties,id',
        ]);

        $path = $request->file('file')->store('photos', 'public');
        $url = asset('storage/' . $path);

        $photo = Photo::create([
            'url' => $url,
            'property_id' => $validated['property_id'],
        ]);
        return response()->json($photo, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $photo = Photo::findOrFail($id);
        return response()->json($photo);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $photo = Photo::findOrFail($id);
        $validated = $request->validate([
            'url' => 'required|string|max:255',
            'property_id' => 'required|exists:properties,id',
        ]);
        $photo->update($validated);
        return response()->json($photo);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $photo = Photo::findOrFail($id);
        $photo->delete();
        return response()->json(null, 204);
    }
}
