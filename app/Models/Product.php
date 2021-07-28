<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Category;

class Product extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function category(){
        return $this->belongsTo(Category::class, 'category_id', 'id');
    }

    

    //product reviews.
    //Each product can have many reviews
    public function reviews(){
        return $this->hasMany(ProductReview::class);
    }


    public function brands(){
        return $this->hasOne(Brand::class);
    }
}
