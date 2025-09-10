<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Studio;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    /**
     * Display the admin dashboard.
     */
    public function index()
    {
        $stats = [
            'total_studios' => Studio::count(),
            'active_studios' => Studio::active()->count(),
            'total_bookings' => Booking::count(),
            'pending_bookings' => Booking::pending()->count(),
            'confirmed_bookings' => Booking::confirmed()->count(),
            'total_users' => User::where('role', 'user')->count(),
            'total_revenue' => Booking::where('payment_status', 'paid')->sum('total_price'),
        ];
        
        $recentBookings = Booking::with(['user', 'studio'])
            ->latest()
            ->limit(10)
            ->get();
        
        return Inertia::render('admin/dashboard', [
            'stats' => $stats,
            'recentBookings' => $recentBookings
        ]);
    }

    /**
     * Display all bookings for admin.
     */
    public function show()
    {
        $bookings = Booking::with(['user', 'studio'])
            ->latest()
            ->paginate(20);
        
        return Inertia::render('admin/bookings', [
            'bookings' => $bookings
        ]);
    }

    /**
     * Confirm a booking.
     */
    public function store(Request $request, Booking $booking = null)
    {
        $booking->update([
            'status' => 'confirmed',
            'confirmed_at' => now(),
        ]);
        
        return redirect()->back()
            ->with('success', 'Booking berhasil dikonfirmasi.');
    }

    /**
     * Reject a booking.
     */
    public function update(Request $request, Booking $booking = null)
    {
        $booking->update([
            'status' => 'cancelled',
        ]);
        
        return redirect()->back()
            ->with('success', 'Booking berhasil ditolak.');
    }

    /**
     * Confirm payment.
     */
    public function destroy(Request $request, Booking $booking = null)
    {
        $booking->update([
            'payment_status' => 'paid',
        ]);
        
        return redirect()->back()
            ->with('success', 'Pembayaran berhasil dikonfirmasi.');
    }

    /**
     * Display all studios for admin.
     */
    public function edit()
    {
        $studios = Studio::with(['bookings' => function($query) {
            $query->where('booking_date', '>=', now()->toDateString());
        }])->latest()->paginate(15);
        
        return Inertia::render('admin/studios', [
            'studios' => $studios
        ]);
    }

    /**
     * Display all users for admin.
     */
    public function create()
    {
        $users = User::where('role', 'user')
            ->with(['bookings'])
            ->latest()
            ->paginate(20);
        
        return Inertia::render('admin/users', [
            'users' => $users
        ]);
    }
}