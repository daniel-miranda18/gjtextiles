<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Size
 *
 * @property $id
 * @property $name
 * @property $created_at
 * @property $updated_at
 *
 * @property SizesProduct[] $sizesProducts
 * @package App
 * @mixin \Illuminate\Database\Eloquent\Builder
 */
class Size extends Model
{
    
    protected $perPage = 20;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = ['name'];


    public function products(): BelongsToMany
    {
        return $this->belongsToMany(Product::class, 'sizes_products', 'size_id', 'product_id');
    }
}
