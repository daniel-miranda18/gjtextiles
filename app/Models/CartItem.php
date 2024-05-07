<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class CartItem
 *
 * @property $id
 * @property $cart_id
 * @property $product_id
 * @property $color_id
 * @property $size_id
 * @property $quantity
 * @property $created_at
 * @property $updated_at
 *
 * @property Cart $cart
 * @property Color $color
 * @property Product $product
 * @property Size $size
 * @package App
 * @mixin \Illuminate\Database\Eloquent\Builder
 */
class CartItem extends Model
{
    
    protected $perPage = 20;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = ['cart_id', 'product_id', 'color_id', 'size_id', 'quantity'];


    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function cart()
    {
        return $this->belongsTo(\App\Models\Cart::class, 'cart_id', 'id');
    }
    
    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function color()
    {
        return $this->belongsTo(\App\Models\Color::class, 'color_id', 'id');
    }
    
    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function product()
    {
        return $this->belongsTo(\App\Models\Product::class, 'product_id', 'id');
    }
    
    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function size()
    {
        return $this->belongsTo(\App\Models\Size::class, 'size_id', 'id');
    }
}
