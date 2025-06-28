<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Spatie\Permission\Models\Role;

class AssignDefaultRolesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get users without roles
        $usersWithoutRoles = User::whereDoesntHave('roles')->get();
        
        // Get the client role
        $clientRole = Role::where('name', 'client')->first();
        
        if ($clientRole && $usersWithoutRoles->count() > 0) {
            $usersWithoutRoles->each(function ($user) use ($clientRole) {
                $user->assignRole($clientRole);
                $this->command->info("Assigned client role to: {$user->name} ({$user->email})");
            });
        }
    }
} 