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
 * @property $sleeve
 * @property $price
 * @property $stock
 * @property $created_at
 * @property $updated_at
 *
 * @property CartItem[] $cartItems
 * @property ColorsProduct[] $colorsProducts
 * @property ImagesProduct[] $imagesProducts
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
    protected $fillable = ['name', 'description', 'sleeve', 'price', 'stock'];


    public function colors(): BelongsToMany
    {
        return $this->belongsToMany(Color::class, 'colors_products', 'product_id', 'color_id');
    }

    public function sizes(): BelongsToMany
    {
        return $this->belongsToMany(Size::class, 'sizes_products', 'product_id', 'size_id');
    }

    public function categories(): BelongsToMany
    {
        return $this->belongsToMany(Category::class, 'categories_products', 'product_id', 'category_id');
    }

    public function images(): HasMany
    {
        return $this->hasMany(ImagesProduct::class, 'product_id', 'id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function cartItems()
    {
        return $this->hasMany(\App\Models\CartItem::class, 'product_id', 'id');
    }
    
    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function colorsProducts()
    {
        return $this->hasMany(\App\Models\ColorsProduct::class, 'id', 'product_id');
    }
    
    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function imagesProducts()
    {
        return $this->hasMany(\App\Models\ImagesProduct::class, 'id', 'product_id');
    }
    
    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function sizesProducts()
    {
        return $this->hasMany(\App\Models\SizesProduct::class, 'id', 'product_id');
    }
    
}
