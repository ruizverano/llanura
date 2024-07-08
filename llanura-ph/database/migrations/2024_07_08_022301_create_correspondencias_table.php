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
        Schema::create('correspondencias', function (Blueprint $table) {
            $table->id();
            $table->date('fecha');
            $table->string('portero');
            $table->string('descripcion',255);
            $table->string('origen');
            $table->string('destino');
            $table->boolean('entregado')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('correspondencias');
    }
};
