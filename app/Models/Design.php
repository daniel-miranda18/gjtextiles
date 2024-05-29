<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Design
 *
 * @property $id
 * @property $name
 * @property $price
 * @property $image
 * @property $technique
 * @property $created_by
 * @property $updated_by
 * @property $created_at
 * @property $updated_at
 *
 * @package App
 * @mixin \Illuminate\Database\Eloquent\Builder
 */
class Design extends Model
{
    
    protected $perPage = 20;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = ['name', 'price', 'image', 'technique', 'created_by', 'updated_by'];

    public function cartItems()
    {
        return $this->hasMany(CartItem::class);
    }

    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function updatedBy()
    {
        return $this->belongsTo(User::class, 'updated_by');
    }
}