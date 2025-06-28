<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Property;
use App\Models\BlogPost;
use App\Models\Appointment;
use App\Models\ContactRequest;
use App\Models\Category;
use App\Models\Photo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class StatsController extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth:sanctum', 'role:admin']);
    }

    public function index()
    {
        // Basic counts
        $basicStats = [
            'users' => User::count(),
            'properties' => Property::count(),
            'blogPosts' => BlogPost::count(),
            'appointments' => Appointment::count(),
            'contactRequests' => ContactRequest::count(),
            'categories' => Category::count(),
            'photos' => Photo::count(),
        ];

        // Property status distribution
        $propertyStatus = Property::select('status', DB::raw('count(*) as count'))
            ->groupBy('status')
            ->get()
            ->pluck('count', 'status')
            ->toArray();

        // User roles distribution
        $userRoles = User::with('roles')
            ->get()
            ->groupBy(function($user) {
                return $user->roles->first() ? $user->roles->first()->name : 'No Role';
            })
            ->map(function($group) {
                return $group->count();
            })
            ->toArray();

        // Monthly property creation trend (last 6 months)
        $monthlyProperties = Property::select(
                DB::raw('MONTH(created_at) as month'),
                DB::raw('YEAR(created_at) as year'),
                DB::raw('count(*) as count')
            )
            ->where('created_at', '>=', Carbon::now()->subMonths(6))
            ->groupBy('year', 'month')
            ->orderBy('year')
            ->orderBy('month')
            ->get()
            ->map(function($item) {
                return [
                    'month' => Carbon::createFromDate($item->year, $item->month, 1)->format('M Y'),
                    'count' => $item->count
                ];
            });

        // Monthly user registration trend (last 6 months)
        $monthlyUsers = User::select(
                DB::raw('MONTH(created_at) as month'),
                DB::raw('YEAR(created_at) as year'),
                DB::raw('count(*) as count')
            )
            ->where('created_at', '>=', Carbon::now()->subMonths(6))
            ->groupBy('year', 'month')
            ->orderBy('year')
            ->orderBy('month')
            ->get()
            ->map(function($item) {
                return [
                    'month' => Carbon::createFromDate($item->year, $item->month, 1)->format('M Y'),
                    'count' => $item->count
                ];
            });

        // Recent activity (last 7 days)
        $recentActivity = [
            'newUsers' => User::where('created_at', '>=', Carbon::now()->subDays(7))->count(),
            'newProperties' => Property::where('created_at', '>=', Carbon::now()->subDays(7))->count(),
            'newAppointments' => Appointment::where('created_at', '>=', Carbon::now()->subDays(7))->count(),
            'newContactRequests' => ContactRequest::where('created_at', '>=', Carbon::now()->subDays(7))->count(),
        ];

        // Top categories by property count
        $topCategories = Category::withCount('properties')
            ->orderBy('properties_count', 'desc')
            ->limit(5)
            ->get()
            ->map(function($category) {
                return [
                    'name' => $category->name,
                    'count' => $category->properties_count
                ];
            });

        // Properties by price range
        $priceRanges = [
            '0-100k' => Property::where('price', '<=', 100000)->count(),
            '100k-300k' => Property::whereBetween('price', [100001, 300000])->count(),
            '300k-500k' => Property::whereBetween('price', [300001, 500000])->count(),
            '500k-1M' => Property::whereBetween('price', [500001, 1000000])->count(),
            '1M+' => Property::where('price', '>', 1000000)->count(),
        ];

        return response()->json([
            'basicStats' => $basicStats,
            'propertyStatus' => $propertyStatus,
            'userRoles' => $userRoles,
            'monthlyProperties' => $monthlyProperties,
            'monthlyUsers' => $monthlyUsers,
            'recentActivity' => $recentActivity,
            'topCategories' => $topCategories,
            'priceRanges' => $priceRanges,
        ]);
    }
} 