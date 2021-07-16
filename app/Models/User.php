<?php

namespace App\Models;
use App\Models\Message;
use App\Models\Transaction;
use App\Models\Order;
use App\Models\Address;
use App\Models\Destination;
use App\Models\ProductReview;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasFactory, Notifiable, HasApiTokens;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function messages()
    {
        return $this->hasMany(Message::class, 'from_id');
    }

    // transactions
    public function transactions(){
        return $this->hasMany(Transaction::class);
    }

    // orders
    public function orders(){
        return $this->hasMany(Order::class);
    }

    //address of the user
    public function address(){
        return $this->hasOne(Address::class);
    }

    // purchased products
    public function purchasedProducts(){
        return $this->hasManyThrough(Order::class, Transaction::class);
    }

    // user destination
    public function destination(){
        return $this->belongsTo(Destination::class);
    }


    //User Reviews on a product the bought
    public function product_review(){
        return $this->hasOne(productReview::class);
    }

   
    
}
