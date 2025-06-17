<?php

use Illuminate\Support\Facades\Route;
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

Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('users', UserController::class);
    Route::apiResource('roles', RoleController::class);
    Route::apiResource('categories', CategoryController::class);
    Route::apiResource('properties', PropertyController::class);
    Route::apiResource('photos', PhotoController::class);
    Route::apiResource('appointments', AppointmentController::class);
    Route::apiResource('blog-posts', BlogPostController::class);
    Route::apiResource('contact-requests', ContactRequestController::class);
    Route::apiResource('property-submissions', PropertySubmissionController::class);

    // FavoriteProperty: custom routes for composite keys
    Route::get('favorite-properties', [FavoritePropertyController::class, 'index']);
    Route::post('favorite-properties', [FavoritePropertyController::class, 'store']);
    Route::get('favorite-properties/{user_id}/{property_id}', [FavoritePropertyController::class, 'show']);
    Route::put('favorite-properties/{user_id}/{property_id}', [FavoritePropertyController::class, 'update']);
    Route::delete('favorite-properties/{user_id}/{property_id}', [FavoritePropertyController::class, 'destroy']);
}); 