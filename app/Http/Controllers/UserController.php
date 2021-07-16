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
    public function index(Request $request)
    {
        $data = Auth::user();
        return response()->json($data);
    }



    //Reset Password
    public function resetpassword(Request $request)
    {
        $request->validate([
            'password' => 'required|min:2',
            'newpassword' => 'required|min:2|confirmed',
            'newpassword_confirmation' => 'required|min:2'
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
            'password' => 'required|confirmed',
            'gender' => 'required|string',
        ]);

        $user = new User();
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
            'firstName' => 'nullable|string|min:3|max:50',
            'lastName' => 'nullable|string|min:3|max:50',
            'destination' => 'nullable|integer',
            'phone' => 'nullable|integer',
        ]);

        $user = Auth()->user();
        $user->first_name = $request->firstName;
        $user->last_name = $request->lastName;
        $user->destination_id = $request->destination;
        $user->gender = $request->gender;
        $user->phone = $request->phone;
        $user->update();

        return response()->json(['Records updated']);
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



    //get authenticated user reviews 
    public function reviews(){
        $reviews = auth()->user()->reviews()->get();
        
        return response()->json($reviews);
    }


    //get authenticated user reviews 
    public function reviewed($id){
        $revs = auth()->user()->product_review()->where('product_id',$id)->first();

        /* foreach ($revs as $rev) {
            if ($rev->product_id === $id) {
                return response()->json($rev);
            }else{
                return response()->json("Not found");
            }
        } */
        
        return response()->json($revs);
    }



    public function destroy(User $user)
    {
        //
    }

    
}
