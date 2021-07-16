<?php

use App\Http\Controllers\ChatController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ReactController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\TransactionController;

/* Route::get('/', function () {
    return view('welcome');
}); */
//send request to payment gateway
Route::post('/pay', [PaymentController::class, 'redirectToGateway'])->name('pay');
// the callback route after succesful payments
Route::get('/payment/callback', [PaymentController::class, 'handleGatewayCallback']);
// get payment by its ref
Route::get('/p/r', [PaymentController::class, 'getPay']);


//after succesful payment, redirect to this url
//and then store info in database
Route::post('/order/', [TransactionController::class, 'store']);

Route::middleware(['auth:sanctum'])->group(function () {

//Route::get('/', 'ChatsController@index');
Route::get('messages', [ChatController::class, 'fetchMessages']);
Route::post('message', [ChatController::class, 'sendMessage']);

});

Route::get('/{path}', [ReactController::class, 'show'])->where('path', '.*'); 



Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
