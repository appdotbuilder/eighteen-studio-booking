<?php

namespace Database\Factories;

use App\Models\Studio;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Booking>
 */
class BookingFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $startHour = random_int(9, 20);
        $duration = random_int(1, 4);
        $endHour = $startHour + $duration;
        
        $studio = Studio::factory()->create();
        $pricePerHour = (float)$studio->price_per_hour;
        
        return [
            'user_id' => User::factory(),
            'studio_id' => $studio->id,
            'booking_date' => fake()->dateTimeBetween('now', '+30 days')->format('Y-m-d'),
            'start_time' => sprintf('%02d:00', $startHour),
            'end_time' => sprintf('%02d:00', $endHour),
            'total_price' => $pricePerHour * $duration,
            'status' => fake()->randomElement(['pending', 'confirmed', 'cancelled', 'completed']),
            'payment_status' => fake()->randomElement(['unpaid', 'pending', 'paid']),
            'payment_proof' => null,
            'notes' => fake()->optional()->paragraph(),
            'confirmed_at' => null,
        ];
    }

    /**
     * Indicate that the booking is confirmed.
     */
    public function confirmed(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'confirmed',
            'confirmed_at' => fake()->dateTimeBetween('-7 days', 'now'),
        ]);
    }

    /**
     * Indicate that the booking is paid.
     */
    public function paid(): static
    {
        return $this->state(fn (array $attributes) => [
            'payment_status' => 'paid',
            'payment_proof' => 'payment_proof_' . fake()->uuid() . '.jpg',
        ]);
    }
}