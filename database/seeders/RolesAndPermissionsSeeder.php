<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolesAndPermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Permissions
        $permissions = [
            // Client
            'search properties',
            'view property',
            'send contact request',
            'request appointment',
            'add favorite',
            'read blog',
            'register',
            'login',
            // Propriétaire
            'submit property',
            'receive submission feedback',
            // Agent
            'create property',
            'edit property',
            'delete property',
            'manage photos',
            'manage appointments',
            'view contact requests',
            'write blog',
            'publish blog',
            'view users',
            // Admin
            'manage users',
            'manage all properties',
            'delete blog',
            'view stats',
            'moderate submissions',
            'manage roles',
            'manage permissions',
        ];
        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }

        // Roles
        $client = Role::firstOrCreate(['name' => 'client']);
        $user = Role::firstOrCreate(['name' => 'user']);
        $owner = Role::firstOrCreate(['name' => 'proprietaire']);
        $agent = Role::firstOrCreate(['name' => 'agent']);
        $admin = Role::firstOrCreate(['name' => 'admin']);

        // Assign permissions to roles
        $client->syncPermissions([
            'search properties',
            'view property',
            'send contact request',
            'request appointment',
            'add favorite',
            'read blog',
            'register',
            'login',
        ]);
        $user->syncPermissions([
            'search properties',
            'view property',
            'send contact request',
            'request appointment',
            'add favorite',
            'read blog',
            'register',
            'login',
        ]);
        $owner->syncPermissions([
            'submit property',
            'receive submission feedback',
        ]);
        $agent->syncPermissions([
            'create property',
            'edit property',
            'delete property',
            'manage photos',
            'manage appointments',
            'view contact requests',
            'write blog',
            'publish blog',
            'view users',
        ]);
        $admin->syncPermissions($permissions); // Admin gets all permissions
    }
}
