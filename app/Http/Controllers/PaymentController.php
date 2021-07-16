<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Paystack;

class PaymentController extends Controller
{


    public function redirectToGateway(Request $request)
    {
        $request->validate([
            'amount' => 'required',
            'cart' => 'required',
        ]);
        try {
            return Paystack::getAuthorizationUrl()->redirectNow();
        } catch (\Exception $e) {
            return Redirect::back()->withMessage(['msg' => 'The paystack token has expired. Please refresh the page and try again.', 'type' => 'error']);
        }
    }

    public function handleGatewayCallback(Request $request)
    {
        $paymentDetails = Paystack::getPaymentData();
        $data = $paymentDetails['data'];

        $transaction_id = $data['id'];
        $transaction_reference = $data['reference'];
        $payment_method = $data['channel'];
        $amount = $data['amount'];

        $transaction = auth()->user()->transactions()->create([
            'transaction_id' => $transaction_id,
            'payment_method' => $payment_method,
            'amount' => $amount/100,
            'status' => 'placed',
        ]);

        return redirect::to('/cart/checkout/success/'.$transaction_id.'/'.$transaction_reference.'/'.$payment_method.'/'.$amount);
        
        // Now you have the payment details,
        // you can store the authorization_code in your db to allow for recurrent subscriptions
        // you can then redirect or do whatever you want
    }
}
