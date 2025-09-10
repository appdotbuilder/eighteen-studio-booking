<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreStudioRequest;
use App\Http\Requests\UpdateStudioRequest;
use App\Models\Studio;
use Inertia\Inertia;

class StudioController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $studios = Studio::active()
            ->latest()
            ->paginate(12);
        
        return Inertia::render('studios/index', [
            'studios' => $studios
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('studios/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreStudioRequest $request)
    {
        $studio = Studio::create($request->validated());

        return redirect()->route('studios.show', $studio)
            ->with('success', 'Studio berhasil dibuat.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Studio $studio)
    {
        $studio->load(['bookings' => function($query) {
            $query->where('booking_date', '>=', now()->toDateString())
                  ->orderBy('booking_date')
                  ->orderBy('start_time');
        }]);
        
        return Inertia::render('studios/show', [
            'studio' => $studio
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Studio $studio)
    {
        return Inertia::render('studios/edit', [
            'studio' => $studio
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateStudioRequest $request, Studio $studio)
    {
        $studio->update($request->validated());

        return redirect()->route('studios.show', $studio)
            ->with('success', 'Studio berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Studio $studio)
    {
        $studio->delete();

        return redirect()->route('studios.index')
            ->with('success', 'Studio berhasil dihapus.');
    }
}