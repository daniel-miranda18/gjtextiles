<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Shipping
 *
 * @property $id
 * @property $name
 * @property $description
 * @property $price
 * @property $created_at
 * @property $updated_at
 *
 * @property Order[] $orders
 * @package App
 * @mixin \Illuminate\Database\Eloquent\Builder
 */
class Shipping extends Model
{
    
    protected $perPage = 20;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = ['name', 'description', 'price'];


    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function orders()
    {
        return $this->hasMany(\App\Models\Order::class, 'id', 'shipping_id');
    }
    
}
