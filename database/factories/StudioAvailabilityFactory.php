<?php

namespace Database\Factories;

use App\Models\Studio;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\StudioAvailability>
 */
class StudioAvailabilityFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $startHour = random_int(8, 21);
        $endHour = $startHour + 1;
        
        return [
            'studio_id' => Studio::factory(),
            'date' => fake()->dateTimeBetween('now', '+60 days')->format('Y-m-d'),
            'start_time' => sprintf('%02d:00', $startHour),
            'end_time' => sprintf('%02d:00', $endHour),
            'is_blocked' => fake()->boolean(10), // 10% chance of being blocked
            'blocked_reason' => fake()->optional()->sentence(),
        ];
    }

    /**
     * Indicate that the availability slot is blocked.
     */
    public function blocked(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_blocked' => true,
            'blocked_reason' => fake()->randomElement([
                'Maintenance studio',
                'Event khusus',
                'Renovasi peralatan',
                'Jadwal pribadi',
            ]),
        ]);
    }
}