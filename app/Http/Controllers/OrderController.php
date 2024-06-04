<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use App\Http\Requests\OrderRequest;
use Illuminate\Http\Response;
use App\Http\Controllers\Controller;
use App\Http\Resources\OrderResource;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Order::query();

        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", "desc");

        if (request("name")) {
            $query->where("name", "like", "%" . request("name") . "%");
        }

        $user_id = auth()->id();
        $query->where('user_id', $user_id);
        $query->with(['user', 'payment', 'shipping']);
        $orders = $query->orderBy($sortField, $sortDirection)->paginate(10)->onEachSide(1);

        return inertia("Order/Index", [
            "orders" => OrderResource::collection($orders),
            'queryParams' => request()->query() ?: null,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(OrderRequest $request): Order
    {
        return Order::create($request->validated());
    }

    /**
     * Display the specified resource.
     */
    public function show(Order $order): Order
    {
        return $order;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(OrderRequest $request, Order $order): Order
    {
        $order->update($request->validated());

        return $order;
    }

    public function destroy(Order $order): Response
    {
        $order->delete();

        return response()->noContent();
    }
}
