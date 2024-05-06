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
        Schema::table('products', function (Blueprint $table) {
            $table->dropColumn('image');
            $table->dropColumn('large');
            $table->dropColumn('sleeveless');
            $table->dropColumn('quarters');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->string('image', 250)->nullable()->default('');
            $table->string('large', 250)->nullable()->default('');
            $table->string('sleeveless', 250)->nullable()->default('');
            $table->string('quarters', 250)->nullable()->default('');
        });
    }
};