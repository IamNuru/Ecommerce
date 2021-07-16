<?php

namespace App\Models;

use App\Models\User;
use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductReview extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $guarded = [] ;

    //Each review belongs to a single user
    public function user(){
        return $this->belongsTo(User::class);
    }



    //Each review belongs to a single product
    public function product(){
        return $this->belongsTo(Product::class);
    }
}
