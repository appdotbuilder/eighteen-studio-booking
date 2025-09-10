<?php

namespace Tests\Feature;

use App\Models\Booking;
use App\Models\Studio;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class StudioBookingTest extends TestCase
{
    use RefreshDatabase;

    public function test_welcome_page_displays_studios(): void
    {
        // Create studios for test (RefreshDatabase clears seeder data)
        Studio::factory(3)->create(['is_active' => true]);
        
        $response = $this->get('/');
        
        $response->assertStatus(200);
        $response->assertInertia(fn($assert) =>
            $assert->component('welcome')
                ->has('studios', 3)
                ->has('canLogin')
                ->has('canRegister')
        );
    }

    public function test_authenticated_user_can_create_booking(): void
    {
        $user = User::factory()->create(['role' => 'user']);
        $studio = Studio::factory()->create();
        
        $this->actingAs($user);
        
        $response = $this->post('/bookings', [
            'studio_id' => $studio->id,
            'booking_date' => now()->addDay()->toDateString(),
            'start_time' => '10:00',
            'end_time' => '12:00',
            'notes' => 'Test booking'
        ]);
        
        $response->assertRedirect();
        $this->assertDatabaseHas('bookings', [
            'user_id' => $user->id,
            'studio_id' => $studio->id,
            'status' => 'pending'
        ]);
    }

    public function test_admin_can_confirm_booking(): void
    {
        $admin = User::factory()->create(['role' => 'admin']);
        $user = User::factory()->create(['role' => 'user']);
        $booking = Booking::factory()->create([
            'user_id' => $user->id,
            'status' => 'pending'
        ]);
        
        $this->actingAs($admin);
        
        $response = $this->post("/admin/bookings/{$booking->id}/confirm");
        
        $response->assertRedirect();
        $booking->refresh();
        $this->assertEquals('confirmed', $booking->status);
        $this->assertNotNull($booking->confirmed_at);
    }

    public function test_guest_cannot_access_admin_routes(): void
    {
        $response = $this->get('/admin');
        $response->assertRedirect('/login');
    }

    public function test_regular_user_cannot_access_admin_routes(): void
    {
        $user = User::factory()->create(['role' => 'user']);
        $this->actingAs($user);
        
        $response = $this->get('/admin');
        $response->assertStatus(403);
    }

    public function test_user_can_only_see_their_own_bookings(): void
    {
        $user1 = User::factory()->create(['role' => 'user']);
        $user2 = User::factory()->create(['role' => 'user']);
        
        $booking1 = Booking::factory()->create(['user_id' => $user1->id]);
        $booking2 = Booking::factory()->create(['user_id' => $user2->id]);
        
        $this->actingAs($user1);
        
        // User 1 should see their booking
        $response = $this->get("/bookings/{$booking1->id}");
        $response->assertStatus(200);
        
        // User 1 should not see user 2's booking
        $response = $this->get("/bookings/{$booking2->id}");
        $response->assertStatus(403);
    }
}