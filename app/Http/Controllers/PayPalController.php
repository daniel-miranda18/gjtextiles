<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Srmklive\PayPal\Services\PayPal as PayPalClient;
use App\Models\PayPalTransaction;
use Inertia\Inertia;

class PayPalController extends Controller
{
    public function createTransaction()
    {
        $user = auth()->user();
        $cart = $user->cart;
        $cartItems = $cart->cartItems()->with('product')->get();
        $totalAmount = $cartItems->sum(function ($item) {
            return $item->product->price * $item->quantity;
        });



        return Inertia::render('Paypal/Payment', [
            'cartItems' => $cartItems,
            'totalAmount' => $totalAmount,
        ]);
        ;
    }

    public function processTransaction(Request $request)
    {
        $provider = new PayPalClient;
        $provider->setApiCredentials(config('paypal'));
        $provider->getAccessToken();

        $user = auth()->user();
        $cart = $user->cart;
        $cartItems = $cart->cartItems()->with('product')->get();
        $totalAmount = $cartItems->sum(function ($item) {
            return $item->product->price * $item->quantity;
        });

        try {
            $order = $provider->createOrder([
                "intent" => "CAPTURE",
                "purchase_units" => [
                    0 => [
                        "amount" => [
                            "currency_code" => "USD",
                            "value" => $totalAmount
                        ]
                    ]
                ]
            ]);

            if (isset($order['id'])) {
                $approvalUrl = collect($order['links'])->where('rel', 'approve')->first()['href'];
                return response()->json(['approvalUrl' => $approvalUrl]);
            } else {
                return response()->json(['error' => 'Error creating PayPal order'], 500);
            }
        } catch (\Exception $e) {
            \Log::error('PayPal error: ' . $e->getMessage(), ['request' => $request->all()]);
            return response()->json(['error' => 'Error processing PayPal payment: ' . $e->getMessage()], 500);
        }
    }


    public function successTransaction(Request $request)
    {
        $provider = new PayPalClient;
        $provider->setApiCredentials(config('paypal'));
        $provider->getAccessToken();

        try {
            $response = $provider->capturePaymentOrder($request['token']);

            if (isset($response['status']) && $response['status'] == 'COMPLETED') {
                $user = auth()->user();
                $cart = $user->cart;
                $cartItems = $cart->cartItems()->with('product')->get();
                $totalAmount = $cartItems->sum(function ($item) {
                    return $item->product->price * $item->quantity;
                });

                // Registro de la transacción en la base de datos
                PayPalTransaction::create([
                    'transaction_id' => $response['id'],
                    'amount' => $totalAmount,
                    'currency' => 'USD',
                    'status' => 'COMPLETED',
                ]);

                // Vaciar el carrito después de la transacción exitosa
                $cart->cartItems()->delete();

                return redirect()->route('paypal.success');
            } else {
                return redirect()->route('paypal.error')->withErrors('Payment not completed');
            }
        } catch (\Exception $e) {
            \Log::error('PayPal capture error: ' . $e->getMessage());
            return redirect()->route('paypal.error')->withErrors('Error capturing PayPal payment: ' . $e->getMessage());
        }
    }
    // public function successView()
    // {
    //     return Inertia::render('Paypal/Success');
    // }

    // public function cancelView()
    // {
    //     return Inertia::render('Paypal/Cancel');
    // }

    // public function errorTransaction()
    // {
    //     return Inertia::render('Paypal/Error');
    // }


    public function cancelTransaction()
    {
        return redirect()->route('paypal.cancel');
    }

    public function errorTransaction()
    {
        return Inertia::render('Paypal/Error');
    }

    public function successView()
    {
        return Inertia::render('Paypal/Success');
    }

    public function cancelView()
    {
        return Inertia::render('Paypal/Cancel');
    }
}
