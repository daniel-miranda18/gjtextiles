<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
/**
 * Class Category
 *
 * @property $id
 * @property $name
 * @property $created_at
 * @property $updated_at
 *
 * @property CategoriesProduct[] $categoriesProducts
 * @package App
 * @mixin \Illuminate\Database\Eloquent\Builder
 */
class Category extends Model
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
        return $this->belongsToMany(Product::class, 'categories_products', 'category_id', 'product_id');
    }
    
}
