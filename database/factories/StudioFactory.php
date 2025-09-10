<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Studio>
 */
class StudioFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $equipmentOptions = [
            'Drum Set Mapex',
            'Gitar Listrik Fender',
            'Bass Yamaha',
            'Keyboard Roland',
            'Mikrofon Shure SM58',
            'Amplifier Marshall',
            'Mixer Behringer',
            'Monitor Audio',
            'Headphone Sony',
            'Kabel Audio',
            'Stand Mikrofon',
            'Pick Gitar',
            'Stick Drum Vic Firth',
            'Cajon',
            'Ukulele',
            'Metronome'
        ];

        return [
            'name' => 'Studio ' . fake()->randomLetter() . ' - EIGHTEEN COURSE & STUDIO\'S',
            'description' => fake()->paragraph(3),
            'price_per_hour' => fake()->randomFloat(2, 50000, 200000),
            'equipment_list' => fake()->randomElements($equipmentOptions, random_int(5, 10)),
            'photo' => null,
            'is_active' => fake()->boolean(90),
        ];
    }

    /**
     * Indicate that the studio is premium.
     */
    public function premium(): static
    {
        return $this->state(fn (array $attributes) => [
            'name' => 'Premium Studio - EIGHTEEN COURSE & STUDIO\'S',
            'price_per_hour' => fake()->randomFloat(2, 200000, 500000),
            'description' => 'Studio premium dengan fasilitas lengkap dan peralatan berkualitas tinggi untuk pengalaman recording yang tak terlupakan.',
        ]);
    }

    /**
     * Indicate that the studio is inactive.
     */
    public function inactive(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_active' => false,
        ]);
    }
}