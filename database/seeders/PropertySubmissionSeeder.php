<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\PropertySubmission;
use Faker\Factory as Faker;

class PropertySubmissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();
        foreach (range(1, 5) as $i) {
            PropertySubmission::create([
                'owner_name' => $faker->name(),
                'owner_email' => $faker->safeEmail(),
                'property_details' => $faker->paragraph(),
                'status' => $faker->randomElement(['pending','validated','rejected']),
                'created_at' => $faker->dateTimeThisYear(),
            ]);
        }
    }
}
