<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Cart
 *
 * @property $id
 * @property $user_id
 * @property $created_at
 * @property $updated_at
 *
 * @property User $user
 * @property CartItem[] $cartItems
 * @package App
 * @mixin \Illuminate\Database\Eloquent\Builder
 */
class Cart extends Model
{
    
    protected $perPage = 20;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = ['user_id'];


    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(\App\Models\User::class, 'user_id', 'id');
    }
    
    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function cartItems()
    {
        return $this->hasMany(\App\Models\CartItem::class, 'cart_id', 'id');
    }

    public function items()
    {
        return $this->hasMany(\App\Models\CartItem::class, 'id', 'cart_id');
    }
}
