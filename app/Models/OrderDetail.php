<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class OrderDetail
 *
 * @property $id
 * @property $order_id
 * @property $product_id
 * @property $color_id
 * @property $size_id
 * @property $design_id
 * @property $quantity
 * @property $created_at
 * @property $updated_at
 *
 * @property Color $color
 * @property Design $design
 * @property Order $order
 * @property Product $product
 * @property Size $size
 * @package App
 * @mixin \Illuminate\Database\Eloquent\Builder
 */
class OrderDetail extends Model
{
    
    protected $perPage = 20;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = ['order_id', 'product_id', 'color_id', 'size_id', 'design_id', 'quantity'];


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
    public function design()
    {
        return $this->belongsTo(\App\Models\Design::class, 'design_id', 'id');
    }
    
    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function order()
    {
        return $this->belongsTo(\App\Models\Order::class, 'order_id', 'id');
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
