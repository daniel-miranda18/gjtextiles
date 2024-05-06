<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
/**
 * Class Product
 *
 * @property $id
 * @property $name
 * @property $description
 * @property $price
 * @property $stock
 * @property $created_at
 * @property $updated_at
 *
 * @property ColorsProduct[] $colorsProducts
 * @property Size[] $sizes
 * @property SizesProduct[] $sizesProducts
 * @package App
 * @mixin \Illuminate\Database\Eloquent\Builder
 */
class Product extends Model
{
    
    protected $perPage = 20;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = ['name', 'description', 'price', 'stock'];

    public function colors(): BelongsToMany
    {
        return $this->belongsToMany(Color::class, 'colors_products', 'product_id', 'color_id');
    }

    public function sizes(): BelongsToMany
    {
        return $this->belongsToMany(Size::class, 'sizes_products', 'product_id', 'size_id');
    }

    public function images(): HasMany
    {
        return $this->hasMany(ImagesProduct::class, 'product_id', 'id');
    }
}
