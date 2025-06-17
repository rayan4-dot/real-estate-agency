<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;

class UserRoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Assign 'admin' role to the first user
        $user = User::find(1);
        if ($user) {
            $user->assignRole('admin');
        }

        // Assign 'agent' role to the second user
        $agent = User::find(2);
        if ($agent) {
            $agent->assignRole('agent');
        }

        // Assign 'proprietaire' role to the third user
        $owner = User::find(3);
        if ($owner) {
            $owner->assignRole('proprietaire');
        }

        // Assign 'client' role to the fourth user
        $client = User::find(4);
        if ($client) {
            $client->assignRole('client');
        }
    }
}
