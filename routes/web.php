<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\StudioController;
use App\Models\Studio;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

// Home page - Studio listing
Route::get('/', function () {
    $studios = Studio::active()->latest()->limit(6)->get();
    
    return Inertia::render('welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'studios' => $studios
    ]);
})->name('home');

// Public studio routes
Route::resource('studios', StudioController::class)->only(['index', 'show']);

// Authenticated user routes
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    
    // Booking routes for authenticated users
    Route::resource('bookings', BookingController::class);
});

// Admin routes
Route::middleware(['auth', 'verified', App\Http\Middleware\CheckAdminRole::class])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/', [AdminController::class, 'index'])->name('dashboard');
    Route::get('/bookings', [AdminController::class, 'show'])->name('bookings');
    Route::post('/bookings/{booking}/confirm', [AdminController::class, 'store'])->name('bookings.confirm');
    Route::post('/bookings/{booking}/reject', [AdminController::class, 'update'])->name('bookings.reject');
    Route::post('/bookings/{booking}/confirm-payment', [AdminController::class, 'destroy'])->name('bookings.confirm-payment');
    Route::get('/studios', [AdminController::class, 'edit'])->name('studios');
    Route::get('/users', [AdminController::class, 'create'])->name('users');
    
    // Admin studio management
    Route::resource('studios', StudioController::class)->except(['index', 'show']);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
