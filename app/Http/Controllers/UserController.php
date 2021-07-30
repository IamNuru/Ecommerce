<?php

namespace App\Http\Controllers;

use App\Models\Address;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class UserController extends Controller
{

    //get authenticated user
    public function index(User $user)
    {
        $id = Auth::user()->id;
        $data = User::with('transactions.orders.products', 'destination', 'address', 'product_review', 'transactions')
            ->where('id', $id)
            ->first();
        return response()->json($data);
    }



    //Reset Password
    public function resetpassword(Request $request)
    {
        $request->validate([
            'password' => 'required|min:6|current_password:api',
            'newpassword' => 'required|min:6|confirmed',
            'newpassword_confirmation' => 'required|min:6'
        ]);
        $currentPassword = auth()->user()->password;

        if (Hash::check($request->password, $currentPassword)) {
            $user = auth()->user();
            $user->password = Hash::make($request->newpassword);
            $user->update();
        } else {
            return response()->json([
                'status' => 'error',
                'message' => 'error',
                'errors' => ['Invalid Credentials'],
            ], 401);
        }

        return response()->json('Password Changed');
    }




    //forgot Password
    public function forgotpassword(Request $request)
    {
        $request->validate([
            'email' => 'required|min:2|email',

        ]);

        $found = User::where('email', $request->email)->first();

        $bytes = random_bytes(5);
        if ($found) {
            $found->password = Hash::make(bin2hex($bytes));
            $found->update();
        } else {
            return response()->json([
                'status' => 'error',
                'message' => 'error',
                'errors' => ['Invalid Credentials'],
            ], 401);
        }

        return response()->json('A new password has been sent to your Email');
    }




    //register new user
    public function register(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email|max:255|unique:users,email',
            'firstName' => 'required|string|min:3|max:255',
            'lastName' => 'required|string|min:3|max:255',
            'password' => 'required|string|min:6|confirmed',
            'gender' => 'required|string',
        ]);
        

        $user = new User();
        $user->first_name = $request->firstName;
        $user->last_name = $request->lastName;
        $user->email = $request->email;
        $user->password = bcrypt($request->password);
        $user->gender = $request->gender;
        $user->save();

        $token = $user->createToken('apiToken')->plainTextToken;

        $response = [
            'user' => $user,
            'token' => $token
        ];
        return response($response, 201);
    }





    //log in user
    public function login(Request $request)
    {
        try {
            $request->validate([
                'email' => 'required|string|email|max:255',
                'password' => 'required'
            ]);

            $user = User::where('email', $request->email)->first();

            if (!$user || !Hash::check($request->password, $user->password)) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'error',
                    'errors' => ['Invalid Credentials'],
                ], 401);
            }

            $token = $user->createToken('apiToken')->plainTextToken;
            $response = [
                'user' => $user,
                'token' => $token
            ];
            return response([$response]);
        } catch (ValidationException $exception) {
            return response()->json([
                'status' => 'error',
                'message' => 'error',
                'errors' => $exception->errors(),
            ], 422);
        }
    }




    //log out the user
    public function logout(Request $request)
    {

        auth()->user()->tokens()->delete();
        return response(['message' => 'logged out']);
    }



    // update the user profile or user resource
    public function update(Request $request, User $user)
    {
        $request->validate([
            'email' => 'nullable|string|email|max:255',
            'gender' => 'required|string',
            'firstName' => 'required|string|min:3|max:50',
            'lastName' => 'required|string|min:3|max:50',
            'destination' => 'nullable|integer',
            'phone' => 'nullable|integer',
            'image_name' => 'nullable|image',
        ]);

        $user = Auth()->user();
        if ($request->file('image_name')) {
            // if ($request->hasFile('image_name')) {

            //Get file name with Extension
            $filenameWithExt = $request->file('image_name')->getClientOriginalName();

            //Get just the file name
            $filename = pathinfo($filenameWithExt, PATHINFO_FILENAME);

            //Get just the Extension
            $extension = $request->file('image_name')->getClientOriginalExtension();

            //File name to store
            $filenameToStore = $filename . '_' . time() . '.' . $extension;

            //get file path
            $path = $request->file('image_name')->storeAs('public/images/users', $filenameToStore);
            $user->image = $filenameToStore;
        };
        $user->first_name = $request->firstName;
        $user->last_name = $request->lastName;
        $user->destination_id = $request->destination;
        $user->gender = $request->gender;
        $user->phone = $request->phone;
        $user->update();

        return response()->json('Records updated');
    }


    // update the user address
    public function updateAddress(Request $request, User $user)
    {
        $request->validate([
            'country' => 'required|string|max:255',
            'city' => 'required|string|max:255',
            'state' => 'required|string|max:255',
            'box' => 'required|string|max:255',
        ]);
        $user = Auth()->user();
        $address = Address::updateOrCreate(
            ['user_id' => $user->id],
            [
                'country' => $request->country,
                'state' => $request->state,
                'city' => $request->city,
                'box' => $request->box,
            ]
        );

        return response()->json('Address Updated Successfully');
    }



    //get authenticated user address
    public function address()
    {
        $id = Auth()->user()->id;
        $address = Address::where('user_id', $id)->first();
        return response()->json($address);
    }


    // get authenticated user destination
    public function destination()
    {
        $id = Auth()->user()->id;
        $userdestination = User::with('destination')
            ->where('id', $id)->first();
        return response()->json($userdestination);
    }

    

    // update user destination
    public function updateUserDestinationId($destinationId)
    {
        $user = Auth()->user();
        $user->destination_id = $destinationId;
        $user->update();

        return response()->json("updated");
    }



    //get authenticated user reviews 
    public function reviews()
    {
        $reviews = auth()->user()->reviews()->get();

        return response()->json($reviews);
    }


    //get authenticated user reviews 
    public function reviewed($id)
    {
        $revs = auth()->user()->product_review()->where('product_id', $id)->first();

        return response()->json($revs);
    }



    //get all customers in the table
    //NB customers are users in the table without roles
    public function customers(Request $request)
    {
        $limit = $request->input('limit');

        if ($limit) {
            $data = User::withCount([
                'transactions AS total_purchases' => function ($query) {
                    $query->select(DB::raw("SUM(amount) as totalpurchases"));
                }
            ])
                ->orderBy('total_purchases', 'desc')
                ->limit($limit)
                ->get();
        } else {
            $data = User::withCount([
                'transactions AS total_purchases' => function ($query) {
                    $query->select(DB::raw("SUM(amount) as totalpurchases"));
                }
            ])
                ->with('transactions.orders.products')
                ->orderBy('total_purchases', 'desc')
                ->get();
        }


        return response()->json($data);
    }


    //get customer / user
    public function customer($id)
    {
        $data = User::withCount([
            'transactions AS total_purchases' => function ($query) {
                $query->select(DB::raw("SUM(amount) as totalpurchases"));
            }
        ])
            ->with('destination', 'address', 'transactions.orders.products')
            ->where('id', $id)
            ->first();

        return response()->json($data);
    }



}
