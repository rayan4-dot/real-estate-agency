<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use App\Http\Controllers\UserController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\PropertyController;
use App\Http\Controllers\PhotoController;
use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\BlogPostController;
use App\Http\Controllers\ContactRequestController;
use App\Http\Controllers\FavoritePropertyController;
use App\Http\Controllers\PropertySubmissionController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\StatsController;

// --- AUTH ENDPOINTS (Breeze/Sanctum) ---
Route::post('/login', [AuthenticatedSessionController::class, 'store']);
Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])->middleware('auth:sanctum');
Route::post('/register', [RegisteredUserController::class, 'store']);
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// --- PROFILE ENDPOINTS ---
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit']);
    Route::patch('/profile', [ProfileController::class, 'update']);
    Route::delete('/profile', [ProfileController::class, 'destroy']);
});

// --- PUBLIC ENDPOINTS ---
Route::get('properties', [PropertyController::class, 'index']);
Route::get('properties/{property}', [PropertyController::class, 'show']);
Route::get('categories', [CategoryController::class, 'index']);
Route::get('categories/{category}', [CategoryController::class, 'show']);
Route::get('blog-posts', [BlogPostController::class, 'index']);
Route::get('blog-posts/{blog_post}', [BlogPostController::class, 'show']);

// --- PROTECTED API RESOURCES ---
Route::middleware('auth:sanctum')->group(function () {
    // Admin-only
    Route::middleware('role:admin')->group(function () {
        Route::apiResource('users', UserController::class);
        Route::apiResource('roles', RoleController::class);
        Route::apiResource('photos', PhotoController::class);
    });

    // Agent and Admin can manage properties
    Route::middleware('role:agent|admin')->group(function () {
        Route::apiResource('properties', PropertyController::class)->except(['index', 'show']);
    });

    // Agent and Admin can manage blog posts
    Route::middleware('role:agent|admin')->group(function () {
        Route::apiResource('blog-posts', BlogPostController::class)->except(['index', 'show']);
    });

    // Propriétaire and Admin can manage property submissions
    Route::middleware('role:proprietaire|admin')->group(function () {
        Route::apiResource('property-submissions', PropertySubmissionController::class);
    });

    // All authenticated users can manage favorites
    Route::get('favorite-properties', [FavoritePropertyController::class, 'index']);
    Route::post('favorite-properties', [FavoritePropertyController::class, 'store']);
    Route::get('favorite-properties/check/{property_id}', [FavoritePropertyController::class, 'check']);
    Route::get('favorite-properties/{user_id}/{property_id}', [FavoritePropertyController::class, 'show']);
    Route::put('favorite-properties/{user_id}/{property_id}', [FavoritePropertyController::class, 'update']);
    Route::delete('favorite-properties/{user_id}/{property_id}', [FavoritePropertyController::class, 'destroy']);

    // Client and Admin can manage appointments
    Route::middleware('role:client|admin')->group(function () {
        Route::apiResource('appointments', AppointmentController::class);
    });

    // Client and Admin can manage contact requests
    Route::middleware('role:client|admin')->group(function () {
        Route::apiResource('contact-requests', ContactRequestController::class);
    });
});

Route::middleware(['auth:sanctum', 'role:admin'])->get('/stats', [StatsController::class, 'index']); 
 