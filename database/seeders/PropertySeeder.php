<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Property;
use App\Models\User;
use App\Models\Category;
use Faker\Factory as Faker;

class PropertySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();
        $userIds = User::role(['agent', 'admin'])->pluck('id')->toArray();
        $categoryIds = Category::pluck('id')->toArray();
        if (empty($userIds) || empty($categoryIds)) return;
        foreach (range(1, 7) as $i) {
            Property::create([
                'title' => $faker->streetName(),
                'description' => $faker->paragraph(),
                'surface' => $faker->numberBetween(30, 300),
                'rooms' => $faker->numberBetween(1, 8),
                'bedrooms' => $faker->numberBetween(1, 6),
                'price' => $faker->numberBetween(50000, 900000),
                'address' => $faker->address(),
                'city' => $faker->city(),
                'type' => $faker->randomElement(['house','apartment','studio','villa']),
                'status' => $faker->randomElement(['available','sold','rented']),
                'published_at' => $faker->dateTimeThisYear(),
                'user_id' => $faker->randomElement($userIds),
                'category_id' => $faker->randomElement($categoryIds),
            ]);
        }
    }
}
