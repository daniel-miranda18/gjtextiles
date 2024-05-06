<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class ImagesProduct
 *
 * @property $id
 * @property $product_id
 * @property $color_id
 * @property $image
 * @property $created_at
 * @property $updated_at
 *
 * @property Color $color
 * @property Product $product
 * @package App
 * @mixin \Illuminate\Database\Eloquent\Builder
 */
class ImagesProduct extends Model
{
    
    protected $perPage = 20;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = ['product_id', 'color_id', 'image'];


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
}
