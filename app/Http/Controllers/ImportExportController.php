<?php

namespace App\Http\Controllers;

use App\Exports\ProductsExport;
use App\Imports\ProductsImport;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;

class ImportExportController extends Controller
{
    public function productsExport() 
    {
        return Excel::download(new ProductsExport, 'products.xlsx');
        return back();
    }

    
    public function productsImport(Request $request) 
    {
        Excel::import(new ProductsImport, storage_path('products.xlsx'));
        return back();
    }
}
