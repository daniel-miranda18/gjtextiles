<?php

namespace App\Http\Controllers;

use App\Models\OrderDetail;
use Illuminate\Http\Request;
use App\Http\Requests\OrderDetailRequest;
use Illuminate\Http\Response;
use App\Http\Controllers\Controller;
use App\Http\Resources\OrderDetailResource;

class OrderDetailController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $orderDetails = OrderDetail::paginate();

        return OrderDetailResource::collection($orderDetails);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(OrderDetailRequest $request): OrderDetail
    {
        return OrderDetail::create($request->validated());
    }

    /**
     * Display the specified resource.
     */
    public function show(OrderDetail $orderDetail): OrderDetail
    {
        return $orderDetail;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(OrderDetailRequest $request, OrderDetail $orderDetail): OrderDetail
    {
        $orderDetail->update($request->validated());

        return $orderDetail;
    }

    public function destroy(OrderDetail $orderDetail): Response
    {
        $orderDetail->delete();

        return response()->noContent();
    }
}
