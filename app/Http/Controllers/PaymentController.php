<?php

namespace App\Http\Controllers\Api;

use App\Models\Payment;
use Illuminate\Http\Request;
use App\Http\Requests\PaymentRequest;
use Illuminate\Http\Response;
use App\Http\Controllers\Controller;
use App\Http\Resources\PaymentResource;

class PaymentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $payments = Payment::paginate();

        return PaymentResource::collection($payments);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(PaymentRequest $request): Payment
    {
        return Payment::create($request->validated());
    }

    /**
     * Display the specified resource.
     */
    public function show(Payment $payment): Payment
    {
        return $payment;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(PaymentRequest $request, Payment $payment): Payment
    {
        $payment->update($request->validated());

        return $payment;
    }

    public function destroy(Payment $payment): Response
    {
        $payment->delete();

        return response()->noContent();
    }
}
