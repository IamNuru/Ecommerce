<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use App\Exports\ProductsExport;
use Illuminate\Support\Facades\Auth;
use Maatwebsite\Excel\Facades\Excel;

class ProductController extends Controller
{
    //search item
    public function search(Request $request)
    {
        $text = $request->input('text');
        $data = Product::where('title', 'like', '%' . $text . '%')
            ->orWhere('description', 'like', '%' . $text . '%')
            ->latest()
            ->get();

        return response()->json($data);
    }



    //fetch all products
    public function index()
    {
        $data = Product::with('category','reviews')
            ->where('qty', '>', 0)
            ->latest()
            ->get();

        return response()->json($data);
    }



    public function homepageProducts(Request $request, $catName)
    {
        $limit = $request->input('limit', 6);

        $data = Category::with(['products' => function($query) use ($limit){
            $query->where('qty', '>', 0)->limit($limit);
            }, 'products.reviews'])
            ->where('name', $catName)
            ->orWhere('slug', $catName)
            ->first();

        return response()->json($data);
    }

    public function homepageCarousel()
    {

        $data = Product::where('qty', '>' , 0)->limit(5)->get();

        return response()->json($data);
    }



    //fetch home page category of products
    public function categoryProducts($id)
    {
        $data = Product::where('category_id', $id)
            ->where('qty', '>', 0)
            ->limit(6)
            ->latest()
            ->get();

        return response()->json($data);
    }



    //fetch all products
    public function relatedProducts(Request $request, $id)
    {
        $limit = $request->input('limit', 6);
        $first = Product::where('id', $id)->first();
        $data = Product::where('category_id', $first->category_id)
            ->where('id', '!=', $id)
            ->limit($limit)
            ->get();

        return response()->json($data);
    }



    // store product
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|min:3|string|max:100|unique:products,title',
            'price' => 'required|numeric',
            'deductions' => 'nullable|numeric|lte:price',
            'qty' => 'nullable|numeric',
            'description' => 'nullable|string|min:2|max:250',
            'image_name' => 'required|image',
            'brandID' => 'nullable|integer',
        ]);

        //check if image is selected
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
            $path = $request->file('image_name')->storeAs('public/images/products', $filenameToStore);
        } else {
            $filenameToStore = 'noimage.jpg';
        }
        $product = new Product();
        $product->user_id = Auth()->user()->id;
        $product->category_id = $request->category;
        $product->brand_id = $request->brandID;
        $product->title = $request->title;
        $product->slug =  Str::slug($request->title);
        $product->price = $request->price;
        $product->deduction = $request->deductions;
        $product->qty = $request->qty;
        $product->description = $request->description;
        $product->image = $filenameToStore;
        $product->save();

        return response()->json(['message' => 'Product Saved Successfully']);
    }



    /**
     * Display the specified resource.
     *
     */
    public function show(Product $product, $id)
    {
        $pro = Product::with('reviews.user.product_review')->findOrFail($id);
        return response()->json($pro);
    }



    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product, $id)
    {
        $request->validate([
            'title' => 'required|min:3|string|max:100',
            'category' => 'required|integer',
            'price' => 'required|numeric',
            'deductions' => 'nullable|numeric|lte:price',
            'qty' => 'nullable|numeric',
            'description' => 'nullable|string|max:250',
            'image_name' => 'nullable|image',
            'brandID' => 'nullable|integer',
        ]);
        $product = Product::findOrFail($id);
        if ($request->file('image_name')) {
            //get file name with extension
            $filenameWithExt = $request->file('image_name')->getClientOriginalName();

            //get file name
            $filename = pathinfo($filenameWithExt, PATHINFO_FILENAME);

            //get file extension
            $extension = $request->file('image_name')->getClientOriginalExtension();

            //file name to store
            $filenameToStore = $filename . '_' . time() . '.' . $extension;

            //get file path
            $path = $request->file('image_name')->storeAs('public/images/products', $filenameToStore);
            $product->image = $filenameToStore;
        }

        
        $product->title = $request->title;
        $product->user_id = Auth()->user()->id;
        $product->category_id = $request->category;
        $product->brand_id = $request->brandID;
        $product->slug =  Str::slug($request->title);
        $product->price = $request->price;
        $product->deduction = $request->deductions;
        $product->qty = $request->qty;
        $product->description = $request->description;
        $product->update();

        return response()->json(['message' => 'Product Updated Successfully']);
    }



    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product, $id)
    {
        $product = Product::destroy($id);
        return response()->json(['message' => 'Product Deleted Successfully']);
    }



    /**
     * 
     * get cart items
     */
    public function cartItems(Request $request, $cart)
    {
        $ids = $request->input('ids');
        $aa = array_map('intval', explode(',', $ids));
        $cartItems = Product::whereIn('id', $aa)->get();
        return response()->json($cartItems);
    }



    //get product brands
    public function brands()
    {
        //$brands = DB::table('products')->select('id', 'brand')->groupBy('brand')->get();
        $brands = Product::select('brand')->distinct('brand')->get();
        return response()->json($brands);
    }


    
}
