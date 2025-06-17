<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\FavoriteProperty;
use App\Models\User;
use App\Models\Property;
use Faker\Factory as Faker;

class FavoritePropertySeeder extends Seeder
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
        $used = [];
        foreach (range(1, 10) as $i) {
            $userId = $faker->randomElement($userIds);
            $propertyId = $faker->randomElement($propertyIds);
            $key = $userId.'-'.$propertyId;
            if (isset($used[$key])) continue;
            FavoriteProperty::create([
                'user_id' => $userId,
                'property_id' => $propertyId,
            ]);
            $used[$key] = true;
        }
    }
}
