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
        Schema::create('studios', function (Blueprint $table) {
            $table->id();
            $table->string('name')->comment('Nama studio');
            $table->text('description')->comment('Deskripsi studio');
            $table->decimal('price_per_hour', 10, 2)->comment('Harga per jam dalam rupiah');
            $table->json('equipment_list')->comment('Daftar peralatan dalam format JSON');
            $table->string('photo')->nullable()->comment('Path foto studio');
            $table->boolean('is_active')->default(true)->comment('Status aktif studio');
            $table->timestamps();
            
            // Indexes for performance
            $table->index('name');
            $table->index('is_active');
            $table->index(['is_active', 'created_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('studios');
    }
};