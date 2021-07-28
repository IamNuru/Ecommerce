<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use Illuminate\Http\Request;

class BrandController extends Controller
{
    public function brands(){
        $brands = Brand::with('products')->get();

        return response()->json($brands);
    }

    
    public function store(Request $request){
        $request->validate([
            'brandName' => 'required|string|max:250|unique:brands,name'
        ]);

        $brand = new Brand;
        $brand->name = $request->brandName;
        $brand->save();

        return response()->json('New Brand Added');
    }


    //update a particular brand
    public function update(Request $request, $id){
        $request->validate([
            'brandName' => 'required|string|max:250'
        ]);
        $brand = Brand::find($id);
        $brand->name = $request->brandName;
        $brand->save();

        return response()->json('Brand Name Updated');
    }


    //remove or delete brand
    public function remove($id){
        $brand = Brand::findOrFail($id);
        $brand->destroy($id);

        return response()->json('Brand Deleted Successfully');

    }


    public function show($id){
        $brand = Brand::where('id', $id)->first();

        return response()->json($brand);
    }
}
