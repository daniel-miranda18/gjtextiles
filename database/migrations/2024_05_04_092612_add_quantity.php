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
        Schema::table('colors_products', function (Blueprint $table) {
            $table->integer('quantity')->unsigned()->nullable()->default()->after('color_id');
            $table->string('image', 250)->nullable()->default('')->after('quantity');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('colors_products');
    }
};
