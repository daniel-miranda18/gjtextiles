<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Product;
use App\Models\CartItem;
use App\Http\Requests\StoreCartRequest;
use App\Http\Requests\UpdateCartRequest;

class CartController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = auth()->user();
        if ($user && $user->cart) {
            $cart = $user->cart;
            $cartItems = $cart->cartItems()->with('product.colors.images')->get();
            return inertia('Cart/Index', [
                'cartItems' => $cartItems,
                'success' => session('success'),
            ]);
        } elseif ($user && !$user->cart) {
            return inertia('Cart/Index', [
                'cartItems' => [],
                'success' => session('success'),
                'info' => 'Aún no tienes productos en tu carrito.'
            ]);
        } else {
            return inertia('Cart/Index', [
                'cartItems' => [],
                'success' => session('success'),
                'warning' => 'Debes iniciar sesión para acceder a tu carrito.'
            ]);
        }
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCartRequest $request)
    {
        if (!auth()->check()) {
            return redirect()->route('login');
        }

        $user = auth()->user();
        $productId = $request->input('product_id');
        $colorId = $request->input('color_id');
        $sizeId = $request->input('size_id');
        $designId = $request->input('design_id');
        $quantity = $request->input('quantity');
        
        if (!$user->cart) {
            $cart = Cart::create([
                'user_id' => $user->id,
            ]);
        } else {
            $cart = $user->cart;
        }

        $existingCartItem = $cart->items()->where('product_id', $productId)->first();
        if ($existingCartItem) {
            return redirect()->route('cart.index')
                            ->with('warning', 'Este producto ya está en el carrito.');
        } else {
            $cartItem = CartItem::create([
                'cart_id' => $cart->id,
                'product_id' => $productId,
                'color_id' => $colorId,
                'size_id' => $sizeId,
                'design_id' => $designId,
                'quantity' => $quantity,
            ]);
            return redirect()->route('cart.index')
                            ->with('success', 'Producto agregado al carrito exitosamente.');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Cart $cart)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Cart $cart)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCartRequest $request, Cart $cart)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Cart $cart)
    {
        //
    }
}
