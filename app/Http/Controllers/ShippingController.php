<?php

namespace App\Http\Controllers\Api;

use App\Models\Shipping;
use Illuminate\Http\Request;
use App\Http\Requests\ShippingRequest;
use Illuminate\Http\Response;
use App\Http\Controllers\Controller;
use App\Http\Resources\ShippingResource;

class ShippingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $shippings = Shipping::paginate();

        return ShippingResource::collection($shippings);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ShippingRequest $request): Shipping
    {
        return Shipping::create($request->validated());
    }

    /**
     * Display the specified resource.
     */
    public function show(Shipping $shipping): Shipping
    {
        return $shipping;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ShippingRequest $request, Shipping $shipping): Shipping
    {
        $shipping->update($request->validated());

        return $shipping;
    }

    public function destroy(Shipping $shipping): Response
    {
        $shipping->delete();

        return response()->noContent();
    }
}
