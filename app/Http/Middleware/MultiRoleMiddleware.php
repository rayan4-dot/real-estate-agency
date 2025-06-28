<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class MultiRoleMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, string $roles): Response
    {
        if (!$request->user()) {
            return redirect('/login');
        }

        $allowedRoles = explode(',', $roles);
        $userRoles = $request->user()->getRoleNames();

        $hasAllowedRole = false;
        foreach ($allowedRoles as $role) {
            if ($userRoles->contains(trim($role))) {
                $hasAllowedRole = true;
                break;
            }
        }

        if (!$hasAllowedRole) {
            abort(403, 'Unauthorized action.');
        }

        return $next($request);
    }
} 