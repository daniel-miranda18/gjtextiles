<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class SizesProduct
 *
 * @property $id
 * @property $product_id
 * @property $size_id
 * @property $created_at
 * @property $updated_at
 *
 * @property Product $product
 * @property Size $size
 * @package App
 * @mixin \Illuminate\Database\Eloquent\Builder
 */
class SizesProduct extends Model
{
    
    protected $perPage = 20;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = ['product_id', 'size_id', 'quantity'];


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