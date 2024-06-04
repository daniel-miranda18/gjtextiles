<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Srmklive\PayPal\Services\PayPal as PayPalClient;
use App\Models\PayPalTransaction;
use App\Models\Shipping;
use App\Models\OrderDetail;
use App\Models\Payment;
use App\Models\Order;
use App\Models\Product;
use Inertia\Inertia;
use Illuminate\Support\Str;
use Carbon\Carbon;
class CheckoutController extends Controller
{
    public function createTransaction()
    {
        $user = auth()->user();
        $cart = $user->cart;
        $cartItems = $cart->cartItems()->with(['product.images', 'design', 'color', 'size'])->get();

        $subTotalAmount = $cartItems->sum(function ($item) {
            $productPrice = $item->product->price;
            $designPrice = $item->design ? $item->design->price : 0;
            return ($productPrice + $designPrice) * $item->quantity;
        });

        $shippings = Shipping::all();

        return Inertia::render('Checkout/Payment', [
            'cartItems' => $cartItems,
            'subTotalAmount' => $subTotalAmount,
            'shippings' => $shippings,
        ]);
    }

    public function processPaypalTransaction(Request $request)
    {

        $totalAmount = $request->totalAmount;
        $shippingId = $request->shippingId;

        $order = new Order();
        $order->user_id = auth()->user()->id;
        $order->payment_id = null;
        $order->shipping_id = $shippingId;
        $order->currency = 'USD';
        $order->total_amount = $totalAmount;
        $order->save();

        $provider = new PayPalClient;
        $provider->setApiCredentials(config('paypal'));
        $paypalToken = $provider->getAccessToken();

        $order = $provider->createOrder([
            "intent" => "CAPTURE",
            "application_context" => [
                "return_url" => route('paypal_success'),
                "cancel_url" => route('paypal_cancel')
            ],
            "purchase_units" => [
                [
                    "amount" => [
                        "currency_code" => "USD",
                        "value" => $totalAmount
                    ]
                ]
            ]
        ]);

        if (isset($order['id']) && $order['id']!=null) {
            $approvalUrl = collect($order['links'])->where('rel', 'approve')->first()['href'];
            return response()->json(['approvalUrl' => $approvalUrl]);
        } else {
            return response()->json(['error' => 'Error creating PayPal order'], 500);
        }
    }


    public function successPaypalTransaction(Request $request)
    {
        $provider = new PayPalClient;
        $provider->setApiCredentials(config('paypal'));
        $provider->getAccessToken();
        $response = $provider->capturePaymentOrder($request->token);
        if (isset($response['status']) && $response['status'] == 'COMPLETED') {
            $totalAmount = $response['purchase_units'][0]['payments']['captures'][0]['amount']['value'];
            $payment = new Payment();
            $payment->payment_id = $response['id'];
            $payment->payment_status = 'PAID';
            $payment->payment_method = 'PayPal';
            $payment->amount = $totalAmount;
            $payment->currency = 'USD';
            $payment->user_id = auth()->user()->id;
            $payment->save();

            $order = Order::where('user_id', auth()->user()->id)->where('payment_id', null)->latest()->first(); 
            $order->payment_id = $payment->id; 
            $order->save();

            $cartItems = auth()->user()->cart->cartItems;

            foreach ($cartItems as $cartItem) {
                $orderDetail = new OrderDetail();
                $orderDetail->order_id = $order->id;
                $orderDetail->product_id = $cartItem->product_id;
                $orderDetail->color_id = $cartItem->color_id;
                $orderDetail->size_id = $cartItem->size_id;
                $orderDetail->design_id = $cartItem->design_id;
                $orderDetail->quantity = $cartItem->quantity;
                $orderDetail->save();

                $product = Product::find($cartItem->product_id);
                if ($cartItem->quantity > $product->stock) {
                    return redirect()->route('checkout.error')->with('error', 'La cantidad en el carrito es mayor que el stock disponible para el producto: ' . $product->name);
                }
                $product->stock -= $cartItem->quantity;
                $product->save();
            }

            $cartItems = auth()->user()->cart->cartItems()->delete();

            return redirect()->route('checkout.success');
        } else {
            return redirect()->route('checkout.error')->with('error', 'Payment was not successful.');
        }
    }

    public function success()
    {
        return Inertia::render('Checkout/Success');
    }

    public function error()
    {
        return Inertia::render('Checkout/Error');
    }

    public function cancelPaypalTransaction()
    {
        return Inertia::render('Checkout/Cancel');
    }
}
