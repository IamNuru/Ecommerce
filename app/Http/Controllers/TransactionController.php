<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use App\Models\Transaction;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Config;
use Paystack;
/* use Illuminate\Support\Facades\Auth; */

class TransactionController extends Controller
{
    //get auth user transactions
    public function index()
    {
        $uid = auth()->user()->id;
        $data = User::with('transactions.orders.products')->where('id', $uid)->get();
        return response()->json($data);
    }



    /**
     * Store a newly created resource in storage.
     * 
     */
    public function store(Request $request)
    {
        $request->validate([
            'amount' => 'required',
            'payment_method' => 'required|string',
        ]);

        $trans =  Transaction::where('transaction_id', $request->transaction_id)->first();
        if ($trans) {
            foreach ($request->cart as $item) {
                $order = auth()->user()->orders()->create(array(
                    'transaction_id' => $trans->id,
                    'product_id' => $item['id'],
                    'qty' => $item['qty'],
                ));
                $product = Product::findOrFail($item['id']);
                if ($product->price != ($item['price'] / $item['qty'])) {
                    return response()->json([
                        'status' => 'error',
                        'message' => 'error',
                        'errors' => ["Something went wrong, Your Order couldn't go through"],
                    ], 401);
                } else {
                    if ($product->qty > $item['qty']) {
                        $product->qty = $product->qty - $item['qty'];
                        $product->update();
                    } else {
                        return response()->json([
                            'status' => 'error',
                            'message' => 'error',
                            'errors' => ['Quantity requested is not available'],
                        ], 401);
                    }
                }
            };
        } else {
            
        }

        return response()->json(['message' => 'Order successfuly placed']);
    }



    public function checkOrderStatus($orderNumber)
    {
        $order = Transaction::where('transaction_id', $orderNumber)->first();

        if ($order) {
            return response()->json($order);
        } else {
            return response()->json('Not Found');
        }
    }


    //verify transactions
    public function verify(Request $request, $reference)
    {
        $SECRET_KEY = config('paystack.secretKey');
        $curl = curl_init();

        curl_setopt_array($curl, array(
            CURLOPT_URL => "https://api.paystack.co/transaction/verify/$reference",
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => "",
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 30,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => "GET",
            CURLOPT_HTTPHEADER => array(
                "Authorization: Bearer $SECRET_KEY",
                "Cache-Control: no-cache",
            ),
        ));

        $res = curl_exec($curl);
        $err = curl_error($curl);
        curl_close($curl);

        if ($err) {
            return response()->json($err);
            //echo "cURL Error #:" . $err;
        } else {
            $dt = json_decode($res);
            DB::transaction(function () use ($request, $dt, $reference) {
                $transaction = auth()->user()->transactions()->create([
                    'transaction_id' => $dt->data->id,
                    'transaction_ref' => $reference,
                    'payment_method' => $dt->data->channel,
                    'amount' => $dt->data->amount / 100,
                    'status' => 'placed',
                ]);


                foreach ($request->cart as $item) {

                    $order = auth()->user()->orders()->create(array(
                        'transaction_id' => $transaction->id,
                        'product_id' => $item['id'],
                        'qty' => $item['qty'],
                    ));
                    $product = Product::findOrFail($item['id']);
                    if ($product->price != ($item['price'] / $item['qty'])) {
                        return response()->json([
                            'status' => 'error',
                            'message' => 'error',
                            'errors' => ["Something went wrong, Your Order couldn't go through"],
                        ], 401);
                    } else {
                        if ($product->qty > $item['qty']) {
                            $product->qty = $product->qty - $item['qty'];
                            $product->update();
                        } else {
                            return response()->json([
                                'status' => 'error',
                                'message' => 'error',
                                'errors' => ['Quantity requested is not available'],
                            ], 401);
                        }
                    }
                };
            });
            return response()->json($dt->data);
        }
    }



    //fetch items sold
    public function sales(Request $request)
    {
        $dur =  $request->input('duration');
        if ($dur === "all") {
            $data = Transaction::with("orders.products", 'user')
                ->get();
        } else if ($dur === "daily") {
            $data = Transaction::with("orders.products", 'user')
                ->whereDate('created_at', Carbon::today())
                ->get();
        } else if ($dur === "weekly") {
            $data = Transaction::with("orders.products", 'user')
                ->whereBetween('created_at', [Carbon::now()->startOfWeek(), Carbon::now()->endOfWeek()])
                ->get();

            return response()->json($data);
        } else if ($dur === "monthly") {
            $data = Transaction::with("orders.products", 'user')
                ->whereBetween('created_at', [Carbon::now()->startOfMonth(), Carbon::now()->endOfMonth()])
                ->get();

            return response()->json($data);
        } else {
            $data = Transaction::with("orders.products")
                ->whereDate('created_at', Carbon::today())
                ->get();
        }

        return response()->json($data);
    }



    //get sales by date range
    public function salesByDateRange(Request $request){
        $data  = Transaction::with('orders.products')
                ->whereBetween('created_at',[$request->from, $request->to])
                ->OrderByDesc('id')
                ->get();

                return response()->json($data);
    }
    

    //get all transactions
    public function transactions(){
        $data  = Transaction::with('orders.products')->OrderByDesc('id')
                ->get();

        return response()->json($data);
    }



    //get transaction details
    public function show($id){
        $data  = Transaction::with('orders.products','user.destination')
        ->where('id',"=", $id)
        ->first();

        return response()->json($data);
    }


    public function updateTransactionStatus(Request $request, $id){
        $transaction = Transaction::findOrFail($id);
        $transaction->status = $request->status;
        $transaction->update();

        return response()->json('Transaction Status Successfully Updated');
    }
}
