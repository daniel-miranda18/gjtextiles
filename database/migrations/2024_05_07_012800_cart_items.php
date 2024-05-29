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
        Schema::create('cart_items', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->bigIncrements('id');
            $table->bigInteger('cart_id')->unsigned();
            $table->bigInteger('product_id')->unsigned();
            $table->bigInteger('color_id')->unsigned();
            $table->bigInteger('size_id')->unsigned();
            $table->bigInteger('design_id')->unsigned()->nullable();
            $table->integer('quantity')->unsigned()->default();
            $table->timestamps();
            $table->foreign('cart_id')->references('id')->on('carts')->onDelete('cascade');
            $table->foreign('product_id')->references('id')->on('products')->onDelete('cascade');
            $table->foreign('color_id')->references('id')->on('colors')->onDelete('cascade');
            $table->foreign('size_id')->references('id')->on('sizes')->onDelete('cascade');
            $table->foreign('design_id')->references('id')->on('designs')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cart_items');
    }
};
