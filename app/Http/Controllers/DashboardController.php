<?php

namespace App\Http\Controllers;

use App\Models\Dashboard;
use Illuminate\Http\Request;

class SalesReportController extends Controller
{
    public function salesReport()
    {
        $salesReport = Dashboard::select('product_id')
            ->selectRaw('COUNT(*) as total_sales')
            ->where('action', 'added_to_cart')
            ->groupBy('product_id')
            ->orderByDesc('total_sales')
            ->with('product') // Cargar la relación de producto para obtener los detalles del producto
            ->get();

        return view('sales_report', compact('salesReport'));
    }
}
