<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\ContactRequest;
use App\Models\User;
use App\Models\Property;
use Faker\Factory as Faker;

class ContactRequestSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();
        $userIds = User::pluck('id')->toArray();
        $propertyIds = Property::pluck('id')->toArray();
        if (empty($userIds) || empty($propertyIds)) return;
        foreach (range(1, 8) as $i) {
            ContactRequest::create([
                'name' => $faker->name(),
                'email' => $faker->safeEmail(),
                'message' => $faker->sentence(10),
                'created_at' => $faker->dateTimeThisYear(),
                'property_id' => $faker->randomElement($propertyIds),
                'user_id' => $faker->randomElement($userIds),
            ]);
        }
    }
}
