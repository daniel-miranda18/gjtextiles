<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\DesignController;
use App\Http\Controllers\ColorController;
use App\Http\Controllers\SizeController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CartItemController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\CheckoutController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('welcome');

Route::get('/product/catalog', [ProductController::class, 'catalog'])->name('product.catalog');
Route::get('/product/personalize/{id}', [ProductController::class, 'personalize'])->name('product.personalize');
Route::resource('cart', CartController::class);
Route::resource('cart_item', CartItemController::class);
Route::get('/designs/list/{id}', [DesignController::class, 'list'])->name('design.list');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', fn() => Inertia::render('Dashboard'))->name('dashboard');
    Route::resource('product', ProductController::class);
    Route::resource('design', DesignController::class);
    Route::post('design/store_admin', [DesignController::class, 'store_admin'])->name('design.store_admin');
    Route::resource('color', ColorController::class);
    Route::resource('size', SizeController::class);
    Route::resource('category', CategoryController::class);
    Route::resource('order', OrderController::class);
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('checkout/payment', [CheckoutController::class, 'createTransaction'])->name('checkout.payment');

    Route::post('paypal/process', [CheckoutController::class, 'processPaypalTransaction'])->name('paypal.processTransaction');
    Route::get('paypal/cancel', [CheckoutController::class, 'cancelPaypalTransaction'])->name('paypal_cancel');
    Route::get('paypal/success', [CheckoutController::class, 'successPaypalTransaction'])->name('paypal_success');

    Route::get('checkout/error', [CheckoutController::class, 'error'])->name('checkout.error');
    Route::get('checkout/success', [CheckoutController::class, 'success'])->name('checkout.success');
});

require __DIR__.'/auth.php';