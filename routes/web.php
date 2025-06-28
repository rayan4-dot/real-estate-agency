<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

// ========================================
// PUBLIC ROUTES (No Authentication Required)
// ========================================

// Home
Route::get('/', function () {
    return Inertia::render('Home');
});

// Properties (Public listing)
Route::get('/properties', function () {
    return Inertia::render('Properties');
});

// Categories (Public listing)
Route::get('/categories', function () {
    return Inertia::render('Categories');
})->name('categories');

Route::get('/categories/{id}', function ($id) {
    return Inertia::render('CategoryProperties', ['categoryId' => $id]);
})->name('categories.show');

// Blog Posts (Public)
Route::get('/blog-posts', function () {
    return Inertia::render('BlogPosts');
});

// Property Details (Public)
Route::get('/properties/{id}', function ($id) {
    return Inertia::render('PropertyDetails', ['id' => $id]);
});

// ========================================
// AUTHENTICATED USER ROUTES (Non-Admin)
// ========================================

Route::middleware(['auth', 'verified', 'redirect.admin'])->group(function () {
    // User Dashboard
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    // Favorites (Only for authenticated non-admin users)
    Route::get('/favorites', function () {
        return Inertia::render('Favorites');
    });

    // Profile Management
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// ========================================
// ADMIN ROUTES (Admin Only)
// ========================================

Route::middleware(['auth', 'verified', 'role:admin'])->prefix('admin')->group(function () {
    // Admin Dashboard
    Route::get('/', function () {
        return Inertia::render('AdminDashboard');
    })->name('admin.dashboard');

    // Property Management
    Route::get('/properties', function () {
        return Inertia::render('Admin/Properties');
    })->name('admin.properties');

    // User Management
    Route::get('/users', function () {
        return Inertia::render('Admin/Users');
    })->name('admin.users');

    // Role Management
    Route::get('/roles', function () {
        return Inertia::render('Admin/Roles');
    })->name('admin.roles');

    // Blog Management
    Route::get('/blog-posts', function () {
        return Inertia::render('Admin/BlogPosts');
    })->name('admin.blog-posts');

    // Appointment Management
    Route::get('/appointments', function () {
        return Inertia::render('Admin/Appointments');
    })->name('admin.appointments');

    // Property Submissions
    Route::get('/property-submissions', function () {
        return Inertia::render('Admin/PropertySubmissions');
    })->name('admin.property-submissions');

    // Photo Management
    Route::get('/photos', function () {
        return Inertia::render('Admin/Photos');
    })->name('admin.photos');

    // Category Management
    Route::get('/categories', function () {
        return Inertia::render('Admin/Categories');
    })->name('admin.categories');

    // Contact Requests
    Route::get('/contact-requests', function () {
        return Inertia::render('Admin/ContactRequests');
    })->name('admin.contact-requests');
});

// ========================================
// DEVELOPMENT/TESTING ROUTES (Remove in production)
// ========================================

if (app()->environment('local')) {
    // Quick admin login for development
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
        if (Auth::check()) {
            $user = Auth::user();
            return response()->json([
                'authenticated' => true,
                'user_id' => $user->id,
                'email' => $user->email,
                'roles' => $user->getRoleNames(),
                'has_admin_role' => $user->hasRole('admin'),
                'guard' => Auth::getDefaultDriver()
            ]);
        } else {
            return response()->json(['authenticated' => false]);
        }
    });

    Route::get('/test-role', function () {
        return response()->json(['message' => 'Role middleware passed!']);
    })->middleware(['auth', 'role:admin']);

    Route::get('/test-dashboard', function () {
        if (Auth::check()) {
            $user = Auth::user();
            return response()->json([
                'user_id' => $user->id,
                'email' => $user->email,
                'roles' => $user->getRoleNames()->toArray(),
                'is_admin' => $user->hasRole('admin'),
                'is_client' => $user->hasRole('client'),
                'can_access_dashboard' => !$user->hasRole('admin')
            ]);
        }
        return response()->json(['error' => 'Not authenticated']);
    })->middleware(['auth', 'verified', 'redirect.admin']);
}

// ========================================
// AUTH ROUTES
// ========================================

require __DIR__.'/auth.php';
