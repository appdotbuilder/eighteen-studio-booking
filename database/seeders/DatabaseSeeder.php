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
        // Create admin user
        User::factory()->create([
            'name' => 'Admin EIGHTEEN STUDIO',
            'email' => 'admin@eighteenstudio.com',
            'role' => 'admin',
            'phone' => '081234567890',
        ]);

        // Create regular users
        User::factory()->create([
            'name' => 'User Demo',
            'email' => 'user@example.com',
            'role' => 'user',
            'phone' => '081234567891',
        ]);

        User::factory(5)->create();

        // Seed studios
        $this->call([
            StudioSeeder::class,
        ]);
    }
}
