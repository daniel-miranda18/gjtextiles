<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class CategoriesProduct
 *
 * @property $id
 * @property $product_id
 * @property $category_id
 * @property $created_at
 * @property $updated_at
 *
 * @property Category $category
 * @property Product $product
 * @package App
 * @mixin \Illuminate\Database\Eloquent\Builder
 */
class CategoriesProduct extends Model
{
    
    protected $perPage = 20;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = ['product_id', 'category_id'];


    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function category()
    {
        return $this->belongsTo(\App\Models\Category::class, 'category_id', 'id');
    }
    
    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function product()
    {
        return $this->belongsTo(\App\Models\Product::class, 'product_id', 'id');
    }
    
}
