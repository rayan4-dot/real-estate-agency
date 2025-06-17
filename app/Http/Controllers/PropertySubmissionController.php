<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\PropertySubmission;

class PropertySubmissionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(PropertySubmission::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'owner_name' => 'nullable|string|max:100',
            'owner_email' => 'nullable|email|max:100',
            'property_details' => 'nullable|string',
            'status' => 'nullable|in:pending,validated,rejected',
            'created_at' => 'nullable|date',
            'property_id' => 'nullable|exists:properties,id',
        ]);
        $submission = PropertySubmission::create($validated);
        return response()->json($submission, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $submission = PropertySubmission::findOrFail($id);
        return response()->json($submission);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $submission = PropertySubmission::findOrFail($id);
        $validated = $request->validate([
            'owner_name' => 'nullable|string|max:100',
            'owner_email' => 'nullable|email|max:100',
            'property_details' => 'nullable|string',
            'status' => 'nullable|in:pending,validated,rejected',
            'created_at' => 'nullable|date',
            'property_id' => 'nullable|exists:properties,id',
        ]);
        $submission->update($validated);
        return response()->json($submission);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $submission = PropertySubmission::findOrFail($id);
        $submission->delete();
        return response()->json(null, 204);
    }
}
