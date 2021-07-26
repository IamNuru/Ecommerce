<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CategoryController;
use \App\Http\Controllers\AddressController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\Auth\ForgotPasswordController;
use App\Http\Controllers\Auth\ResetPasswordController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\DestinationController;
use App\Http\Controllers\ProductReviewController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Public routes goes below
Route::post('register', [UserController::class, 'register']);
Route::post('login', [UserController::class, 'login']);
Route::get('products', [ProductController::class, 'index']);
Route::get('product/{id}', [ProductController::class, 'show']);
Route::get('related/products/{id}', [ProductController::class, 'relatedProducts']);
Route::get('address/{id}', [AddressController::class, 'show']);
Route::get('categories', [CategoryController::class, 'index']);
Route::get('category/{id}', [CategoryController::class, 'show']);
Route::get('products/category/{catName}', [CategoryController::class, 'categoryProducts']);
Route::get('products/homepage/{catName}', [ProductController::class, 'homepageProducts']);
Route::get('category/products/{id}', [ProductController::class, 'categoryProducts']);
Route::get('brands', [ProductController::class, 'brands']);
Route::get('search', [ProductController::class, 'search']);
Route::get('checkorderstatus/{orderNumber}', [TransactionController::class, 'checkOrderStatus']);
Route::get('cart/items/{cart}', [ProductController::class, 'cartItems']);
Route::post('password/email', [ForgotPasswordController::class, 'sendResetLinkEmail']);
Route::post('password/reset', [ResetPasswordController::class, 'reset']);
Route::post('request-live-chat', [ChatController::class, 'requestLiveChat']);
Route::get('find/chat/user/{id}', [ChatController::class, 'chattingWith']);
Route::post('message/from/user/{from_id}/{to_id}', [ChatController::class, 'sendUserNewMessage']);
Route::get('destinations', [DestinationController::class, 'destinations']);
Route::get('destination/{id}', [DestinationController::class, 'show']);
Route::get('messages/{from_id}/{to_id}', [ChatController::class, 'getAuthUserChatWith']);






// Private routes
Route::middleware('auth:sanctum')->group(function () {
    //Route::get('/', 'ChatsController@index');
    Route::post('acceptchat/{id}', [ChatController::class, 'acceptChat']);

    Route::get('messages', [ChatController::class, 'fetchMessages']);
    Route::post('message/{from_id}/{to_id}', [ChatController::class, 'sendNewMessage']);
    Route::get('fetch/all/requestedchats', [ChatController::class, 'fetchAllRequestedChats']);
    Route::get('close/chat/{chat_id}', [ChatController::class, 'closeChat']);


    Route::post('resetpassword', [UserController::class, 'resetpassword']);
    Route::post('category', [CategoryController::class, 'store']);
    Route::post('logout', [UserController::class, 'logout']);
    Route::post('order', [TransactionController::class, 'store']);
    Route::get('orders', [TransactionController::class, 'index']);
    Route::get('order/{id}', [TransactionController::class, 'show']);
    Route::post('category/{id}', [CategoryController::class, 'update']);
    Route::post('product', [ProductController::class, 'store']);
    Route::post('product/{id}', [ProductController::class, 'update']);
    Route::delete('product/{id}', [ProductController::class, 'destroy']);
    Route::delete('category/{id}', [CategoryController::class, 'destroy']);
    Route::post('category/{id}', [CategoryController::class, 'update']);

    
    //transactions
    Route::get("sales", [TransactionController::class, 'sales']);
    Route::get("sales/daterange", [TransactionController::class, 'salesByDateRange']);
    Route::get("transaction/{id}", [TransactionController::class, 'show']);
    Route::get("transactions", [TransactionController::class, 'transactions']);
    Route::post("updateTransactionStatus/{id}", [TransactionController::class, 'updateTransactionStatus']);
    

    //customers
    Route::get("customers", [UserController::class, 'customers']);
    Route::get("customer/{id}", [UserController::class, 'customer']);



    //user
    Route::post('user/update', [UserController::class, 'update']);
    Route::post('user/update/address', [UserController::class, 'updateAddress']);
    Route::get('user/address', [UserController::class, 'address']);
    Route::get('user', [UserController::class, 'index']);
    Route::post('user/destination/{id}', [UserController::class, 'updateUserDestinationId']);



    //destinations
    Route::post('destination', [DestinationController::class, 'store']);
    Route::get('user/destination', [UserController::class, 'destination']);
    Route::post('destination/{id}', [DestinationController::class, 'update']);
    Route::delete('destination/{id}', [DestinationController::class, 'delete']);

    //Reviews
    Route::post('review/product/{productId}', [ProductReviewController::class, 'store']);
    Route::get('review/{reviewId}', [ProductReviewController::class, 'show']);
    Route::post('review/{reviewId}', [ProductReviewController::class, 'update']);
    Route::delete('review/{reviewId}', [DestinationController::class, 'delete']);
    Route::get('user/reviews', [UserController::class, 'reviews']);
    Route::get('user/reviewed/{id}', [UserController::class, 'reviewed']);

    //handle payments
    Route::post('verify/transaction/{reference}', [TransactionController::class, 'verify']);
});




/* Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
}); */
