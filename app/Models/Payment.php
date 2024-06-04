<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Payment
 *
 * @property $id
 * @property $payment_id
 * @property $payment_status
 * @property $payment_method
 * @property $amount
 * @property $currency
 * @property $user_id
 * @property $created_at
 * @property $updated_at
 *
 * @property User $user
 * @property Order[] $orders
 * @package App
 * @mixin \Illuminate\Database\Eloquent\Builder
 */
class Payment extends Model
{
    
    protected $perPage = 20;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = ['payment_id', 'payment_status', 'payment_method', 'amount', 'currency', 'user_id'];


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
    public function orders()
    {
        return $this->hasMany(\App\Models\Order::class, 'id', 'payment_id');
    }
    
}
