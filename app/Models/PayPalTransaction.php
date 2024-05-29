<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PayPalTransaction extends Model
{
    use HasFactory;

    protected $fillable = [
        'transaction_id',
        'amount',
        'currency',
        'status',
    ];
}
