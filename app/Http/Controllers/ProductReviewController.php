<?php

namespace App\Http\Controllers;

use App\Models\ProductReview;
use Illuminate\Http\Request;

class ProductReviewController extends Controller
{
    //submit my review 
    public function store(Request $request, $productId)
    {
        $request->validate([
            'rating' => 'required|integer|min:0|max:5',
            'review' => 'required|string|max:300',
        ]);

        $review = auth()->user()->product_review()->create(
            [
                'product_id' => $productId,
                'rating' => $request->rating,
                'review' => $request->review,
            ]
        );

        return response()->json('Review submitted');
    }

    


    //update my review 
    public function update(Request $request, $reviewId)
    {
        $request->validate([
            'rating' => 'required|integer|min:0|max:5',
            'review' => 'required|string|max:300',
        ]);
        $rev = ProductReview::where('id', $reviewId)->update([
            'rating' => $request->rating,
            'review' => $request->review,
        ]);

        return response()->json('Review Updated');
    }

    //show a review
    public function show($reviewId)
    {
        $rev = ProductReview::findOrFail($reviewId);

        return response()->json($rev);
    }


    //delete my review
    public function delete($reviewId)
    {
        $rev = ProductReview::find($reviewId);
        $rev->delete();

        return response()->json('Review Deleted');
    }

    //get user reviews
}
