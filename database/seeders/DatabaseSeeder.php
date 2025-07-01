<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        $this->call([
            RolesAndPermissionsSeeder::class,
            UserRoleSeeder::class,
            AssignDefaultRolesSeeder::class,
        ]);

        // Create 3 admin users
        $adminUsers = User::factory(3)->create();
        foreach ($adminUsers as $user) {
            $user->assignRole('admin');
        }

        // Create 7 regular users
        $regularUsers = User::factory(7)->create();
        foreach ($regularUsers as $user) {
            $user->assignRole('user');
        }

        // Optionally, keep the test user as admin
        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ])->assignRole('admin');

        $this->call([
            CategorySeeder::class,
            PropertySeeder::class,
            AppointmentSeeder::class,
            PropertySubmissionSeeder::class,
            ContactRequestSeeder::class,
            FavoritePropertySeeder::class,
        ]);
    }
}
