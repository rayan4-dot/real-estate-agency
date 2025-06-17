<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\BlogPost;
use App\Models\User;
use Faker\Factory as Faker;

class BlogPostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();
        $userIds = User::role(['agent', 'admin'])->pluck('id')->toArray();
        if (empty($userIds)) return;
        foreach (range(1, 8) as $i) {
            BlogPost::create([
                'title' => $faker->sentence(),
                'content' => $faker->paragraph(4),
                'created_at' => $faker->dateTimeThisYear(),
                'user_id' => $faker->randomElement($userIds),
            ]);
        }
    }
}
