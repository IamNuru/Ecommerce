<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->foreignId('category_id')->constrained('categories')->onDelete('cascade');
            $table->foreignId('user_id');
            $table->string('slug');
            $table->string('title')->unique();
            $table->text('description')->nullable();
            $table->decimal('price',10,2);
            $table->decimal('shipping_charge',10,2)->default(0.00);
            $table->integer('days_of_delivery')->default(1);
            $table->decimal('deduction',10,2)->nullable();
            $table->string('qty');
            $table->string('size')->nullable();
            $table->integer('loved')->nullable();
            $table->string('image')->nullable();
            $table->string('front_image')->nullable();
            $table->string('back_image')->nullable();
            $table->string('side1_image')->nullable();
            $table->string('side2_image')->nullable();
            $table->string('color')->nullable();
            $table->string('rom_size')->nullable();
            $table->string('ram_size')->nullable();
            $table->string('battery_volt')->nullable();
            $table->string('brand')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('products');
    }
}
