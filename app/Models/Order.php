<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Order
 *
 * @property $id
 * @property $user_id
 * @property $payment_id
 * @property $shipping_id
 * @property $currency
 * @property $total_amount
 * @property $created_at
 * @property $updated_at
 *
 * @property Payment $payment
 * @property Shipping $shipping
 * @property User $user
 * @property OrderDetail[] $orderDetails
 * @package App
 * @mixin \Illuminate\Database\Eloquent\Builder
 */
class Order extends Model
{
    
    protected $perPage = 20;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = ['user_id', 'payment_id', 'shipping_id', 'currency', 'total_amount'];


    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function payment()
    {
        return $this->belongsTo(\App\Models\Payment::class, 'payment_id', 'id');
    }
    
    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function shipping()
    {
        return $this->belongsTo(\App\Models\Shipping::class, 'shipping_id', 'id');
    }
    
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
    public function orderDetails()
    {
        return $this->hasMany(\App\Models\OrderDetail::class, 'order_id', 'id');
    }
}