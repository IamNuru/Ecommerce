<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Product;
use App\Models\Order;

class Transaction extends Model
{
    use HasFactory;

    protected $fillable =[
        'transaction_id',
        'products',
        'status',
        'amount',
        'payment_method',
    ];

    protected $casts = [
        'products' => 'array',
    ];

    // get all users in transaction table
    public function user(){
        return $this->belongsTo(User::class, 'user_id', 'id');
    }


    // products with transaction
    public function orders(){
        return $this->hasMany(Order::class);
    }


    

}
