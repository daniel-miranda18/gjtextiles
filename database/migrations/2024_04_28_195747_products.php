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
        Schema::create('products', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->bigIncrements('id');
            $table->string('name', 250)->nullable()->default('');
            $table->string('image', 250)->nullable()->default('');
            $table->string('large', 250)->nullable()->default('');
            $table->string('sleeveless', 250)->nullable()->default('');
            $table->string('quarters', 250)->nullable()->default('');
            $table->longText('description')->nullable();
            $table->integer('price')->unsigned()->nullable()->default();
            $table->integer('stock')->unsigned()->nullable()->default();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
