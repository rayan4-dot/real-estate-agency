<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Home
Route::get('/', function () {
    return Inertia::render('Home');
});

// Properties
Route::get('/properties', function () {
    return Inertia::render('Properties');
});

// Favorites
Route::get('/favorites', function () {
    return Inertia::render('Favorites');
});

// Blog
Route::get('/blog-posts', function () {
    return Inertia::render('BlogPosts');
});

// Profile
Route::get('/profile', function () {
    return Inertia::render('Profile');
});

// Property Details (dynamic, expects id as param)
Route::get('/properties/{id}', function ($id) {
    return Inertia::render('PropertyDetails', ['id' => $id]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
