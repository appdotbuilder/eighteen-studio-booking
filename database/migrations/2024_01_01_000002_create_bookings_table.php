<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('bookings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('studio_id')->constrained()->onDelete('cascade');
            $table->date('booking_date')->comment('Tanggal booking');
            $table->time('start_time')->comment('Waktu mulai booking');
            $table->time('end_time')->comment('Waktu selesai booking');
            $table->decimal('total_price', 10, 2)->comment('Total harga booking');
            $table->enum('status', ['pending', 'confirmed', 'cancelled', 'completed'])->default('pending')->comment('Status booking');
            $table->enum('payment_status', ['unpaid', 'pending', 'paid', 'refunded'])->default('unpaid')->comment('Status pembayaran');
            $table->string('payment_proof')->nullable()->comment('Path bukti pembayaran');
            $table->text('notes')->nullable()->comment('Catatan tambahan');
            $table->timestamp('confirmed_at')->nullable()->comment('Waktu konfirmasi booking');
            $table->timestamps();
            
            // Indexes for performance
            $table->index('user_id');
            $table->index('studio_id');
            $table->index('booking_date');
            $table->index('status');
            $table->index('payment_status');
            $table->index(['studio_id', 'booking_date', 'start_time']);
            $table->index(['user_id', 'created_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};