<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreBookingRequest;
use App\Http\Requests\UpdateBookingRequest;
use App\Models\Booking;
use App\Models\Studio;
use Inertia\Inertia;
use Illuminate\Http\Request;

class BookingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $bookings = auth()->user()->bookings()
            ->with(['studio'])
            ->latest()
            ->paginate(10);
        
        return Inertia::render('bookings/index', [
            'bookings' => $bookings
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $studio = null;
        if ($request->has('studio_id')) {
            $studio = Studio::active()->findOrFail($request->studio_id);
        }
        
        return Inertia::render('bookings/create', [
            'studio' => $studio,
            'studios' => Studio::active()->get()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBookingRequest $request)
    {
        $validated = $request->validated();
        $validated['user_id'] = auth()->id();
        
        // Calculate total price
        $studio = Studio::findOrFail($validated['studio_id']);
        $startTime = new \DateTime($validated['start_time']);
        $endTime = new \DateTime($validated['end_time']);
        $duration = ($endTime->getTimestamp() - $startTime->getTimestamp()) / 3600; // hours
        $validated['total_price'] = (float)$studio->price_per_hour * $duration;
        
        $booking = Booking::create($validated);

        return redirect()->route('bookings.show', $booking)
            ->with('success', 'Booking berhasil dibuat. Silakan lakukan pembayaran.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Booking $booking)
    {
        // Check if user owns this booking or is admin
        if ($booking->user_id !== auth()->id() && !auth()->user()->isAdmin()) {
            abort(403);
        }
        
        $booking->load(['studio', 'user']);
        
        return Inertia::render('bookings/show', [
            'booking' => $booking
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Booking $booking)
    {
        // Check if user owns this booking
        if ($booking->user_id !== auth()->id()) {
            abort(403);
        }
        
        // Only allow editing pending bookings
        if ($booking->status !== 'pending') {
            return redirect()->route('bookings.show', $booking)
                ->with('error', 'Hanya booking dengan status pending yang dapat diubah.');
        }
        
        $booking->load(['studio']);
        
        return Inertia::render('bookings/edit', [
            'booking' => $booking,
            'studios' => Studio::active()->get()
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBookingRequest $request, Booking $booking)
    {
        // Check if user owns this booking
        if ($booking->user_id !== auth()->id()) {
            abort(403);
        }
        
        $booking->update($request->validated());

        return redirect()->route('bookings.show', $booking)
            ->with('success', 'Booking berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Booking $booking)
    {
        // Check if user owns this booking
        if ($booking->user_id !== auth()->id()) {
            abort(403);
        }
        
        // Only allow cancelling pending or confirmed bookings
        if (!in_array($booking->status, ['pending', 'confirmed'])) {
            return redirect()->route('bookings.show', $booking)
                ->with('error', 'Booking ini tidak dapat dibatalkan.');
        }
        
        $booking->update(['status' => 'cancelled']);

        return redirect()->route('bookings.index')
            ->with('success', 'Booking berhasil dibatalkan.');
    }
}