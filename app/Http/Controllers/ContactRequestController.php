<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ContactRequest;
use Illuminate\Support\Facades\Auth;

class ContactRequestController extends Controller
{
    public function __construct()
    {
        $this->middleware(function ($request, $next) {
            $user = Auth::user();
            $action = $request->route()->getActionMethod();
            if (in_array($action, ['index', 'update', 'destroy'])) {
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
        return response()->json(ContactRequest::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'email' => 'required|email|max:100',
            'message' => 'required|string',
            'created_at' => 'nullable|date',
            'property_id' => 'nullable|exists:properties,id',
            'user_id' => 'nullable|exists:users,id',
        ]);
        $contactRequest = ContactRequest::create($validated);
        return response()->json($contactRequest, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $contactRequest = ContactRequest::findOrFail($id);
        return response()->json($contactRequest);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $contactRequest = ContactRequest::findOrFail($id);
        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'email' => 'required|email|max:100',
            'message' => 'required|string',
            'created_at' => 'nullable|date',
            'property_id' => 'nullable|exists:properties,id',
            'user_id' => 'nullable|exists:users,id',
        ]);
        $contactRequest->update($validated);
        return response()->json($contactRequest);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $contactRequest = ContactRequest::findOrFail($id);
        $contactRequest->delete();
        return response()->json(null, 204);
    }
}
