<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Appointment;
use App\Models\User;
use App\Models\Property;
use Faker\Factory as Faker;

class AppointmentSeeder extends Seeder
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
            Appointment::create([
                'name' => $faker->name(),
                'email' => $faker->safeEmail(),
                'phone' => $faker->phoneNumber(),
                'date' => $faker->date(),
                'time' => $faker->time(),
                'property_id' => $faker->randomElement($propertyIds),
                'user_id' => $faker->randomElement($userIds),
            ]);
        }
    }
}
