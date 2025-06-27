<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

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

// Simple login route for testing
Route::get('/login-admin', function () {
    $user = \App\Models\User::where('email', 'admin@example.com')->first();
    if ($user) {
        Auth::login($user);
        return redirect('/admin');
    }
    return 'Admin user not found';
});

// Debug routes for testing authentication
Route::get('/test-auth', function () {
    if (auth()->check()) {
        $user = auth()->user();
        return response()->json([
            'authenticated' => true,
            'user_id' => $user->id,
            'email' => $user->email,
            'roles' => $user->getRoleNames(),
            'has_admin_role' => $user->hasRole('admin'),
            'guard' => auth()->getDefaultDriver()
        ]);
    } else {
        return response()->json(['authenticated' => false]);
    }
});

Route::get('/test-role', function () {
    return response()->json(['message' => 'Role middleware passed!']);
})->middleware(['auth', 'role:admin']);

// Admin Dashboard - Simplified
Route::get('/admin', function () {
    if (!auth()->check()) {
        return 'Not authenticated';
    }
    
    $user = auth()->user();
    if (!$user->hasRole('admin')) {
        return 'Not admin role. User roles: ' . implode(', ', $user->getRoleNames()->toArray());
    }
    
    return Inertia::render('AdminDashboard');
})->middleware(['auth', 'role:admin']);

Route::get('/admin/properties', function () {
    return Inertia::render('Admin/Properties');
})->middleware(['auth', 'role:admin']);

Route::get('/admin/users', function () {
    return Inertia::render('Admin/Users');
})->middleware(['auth', 'role:admin']);

Route::get('/admin/roles', function () {
    return Inertia::render('Admin/Roles');
})->middleware(['auth', 'role:admin']);

Route::get('/admin/blog-posts', function () {
    return Inertia::render('Admin/BlogPosts');
})->middleware(['auth', 'role:admin']);

Route::get('/admin/appointments', function () {
    return Inertia::render('Admin/Appointments');
})->middleware(['auth', 'role:admin']);

Route::get('/admin/property-submissions', function () {
    return Inertia::render('Admin/PropertySubmissions');
})->middleware(['auth', 'role:admin']);

Route::get('/admin/photos', function () {
    return Inertia::render('Admin/Photos');
})->middleware(['auth', 'role:admin']);

Route::get('/admin/categories', function () {
    return Inertia::render('Admin/Categories');
})->middleware(['auth', 'role:admin']);

Route::get('/categories', function () {
    return Inertia::render('Categories');
})->name('categories');

Route::get('/categories/{id}', function ($id) {
    return Inertia::render('CategoryProperties', ['categoryId' => $id]);
})->name('categories.show');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
