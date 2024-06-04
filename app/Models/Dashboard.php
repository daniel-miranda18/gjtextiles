<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SalesReport extends Model
{
    protected $fillable = ['product_id', 'total_sales'];

    /**
     * Define la relación con el modelo de Producto.
     */
    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
