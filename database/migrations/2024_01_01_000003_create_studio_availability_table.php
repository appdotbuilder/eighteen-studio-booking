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
        Schema::create('studio_availability', function (Blueprint $table) {
            $table->id();
            $table->foreignId('studio_id')->constrained()->onDelete('cascade');
            $table->date('date')->comment('Tanggal ketersediaan');
            $table->time('start_time')->comment('Waktu mulai tersedia');
            $table->time('end_time')->comment('Waktu selesai tersedia');
            $table->boolean('is_blocked')->default(false)->comment('Apakah slot waktu ini diblokir');
            $table->string('blocked_reason')->nullable()->comment('Alasan pemblokiran');
            $table->timestamps();
            
            // Indexes for performance
            $table->index('studio_id');
            $table->index('date');
            $table->index('is_blocked');
            $table->index(['studio_id', 'date', 'start_time']);
            
            // Unique constraint to prevent overlapping availability
            $table->unique(['studio_id', 'date', 'start_time', 'end_time']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('studio_availability');
    }
};